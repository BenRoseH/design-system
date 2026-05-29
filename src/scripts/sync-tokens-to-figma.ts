import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const FIGMA_TOKEN = process.env.FIGMA_TOKEN;
const FIGMA_FILE_ID = process.env.FIGMA_FILE_ID;
const BASE_URL = 'https://api.figma.com/v1';

if (!FIGMA_TOKEN || !FIGMA_FILE_ID) {
  console.error('Missing FIGMA_TOKEN or FIGMA_FILE_ID in .env');
  process.exit(1);
}

// ─── Types ────────────────────────────────────────────────────────

type ResolvedType = 'COLOR' | 'FLOAT' | 'STRING';

interface RGBAValue { r: number; g: number; b: number; a: number }

interface FigmaVariable {
  id: string;
  name: string;
  resolvedType: ResolvedType;
  variableCollectionId: string;
  valuesByMode: Record<string, RGBAValue | number | string>;
}

interface FigmaMode { modeId: string; name: string }

interface FigmaCollection {
  id: string;
  name: string;
  modes: FigmaMode[];
  defaultModeId: string;
  variableIds: string[];
}

interface FigmaLocalVarsMeta {
  variableCollections: Record<string, FigmaCollection>;
  variables: Record<string, FigmaVariable>;
}

interface FigmaPostResponse {
  status: number;
  error: boolean;
  meta: { tempIdToRealId: Record<string, string> };
}

// ─── CSS Parsing ──────────────────────────────────────────────────

function extractBlock(css: string, selector: string): string {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const re = new RegExp(`${escaped}\\s*\\{([\\s\\S]*?)\\}`, 'g');
  const parts: string[] = [];
  let m;
  while ((m = re.exec(css)) !== null) parts.push(m[1]);
  return parts.join('\n');
}

function parseCustomProperties(block: string): Map<string, string> {
  const map = new Map<string, string>();
  const re = /--([a-zA-Z0-9-]+)\s*:\s*([^;]+);/g;
  let m;
  while ((m = re.exec(block)) !== null) map.set(m[1].trim(), m[2].trim());
  return map;
}

// ─── Value Conversion ─────────────────────────────────────────────

function parseRgba(value: string): RGBAValue | null {
  const m = value.match(
    /rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)(?:\s*,\s*([\d.]+))?\s*\)/
  );
  if (!m) return null;
  return {
    r: Math.round((parseFloat(m[1]) / 255) * 10000) / 10000,
    g: Math.round((parseFloat(m[2]) / 255) * 10000) / 10000,
    b: Math.round((parseFloat(m[3]) / 255) * 10000) / 10000,
    a: m[4] !== undefined ? parseFloat(m[4]) : 1,
  };
}

function parseNumeric(value: string): number | null {
  const m = value.match(/^(-?[\d.]+)(?:px)?$/);
  return m ? parseFloat(m[1]) : null;
}

function inferType(value: string): ResolvedType {
  if (/^rgba?\(/.test(value)) return 'COLOR';
  if (/^-?[\d.]+(?:px)?$/.test(value)) return 'FLOAT';
  return 'STRING';
}

function convertValue(
  value: string,
  type: ResolvedType
): RGBAValue | number | string | null {
  if (type === 'COLOR') return parseRgba(value);
  if (type === 'FLOAT') return parseNumeric(value);
  return value;
}

// --color-bg-default  →  color/bg/default
function toFigmaName(cssName: string): string {
  return cssName.replace(/-/g, '/');
}

// ─── Figma API ────────────────────────────────────────────────────

async function figmaGet<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    headers: { 'X-Figma-Token': FIGMA_TOKEN! },
  });
  if (!res.ok) throw new Error(`GET ${endpoint} → ${res.status}: ${await res.text()}`);
  return res.json() as T;
}

async function figmaPost<T = unknown>(endpoint: string, body: unknown): Promise<T> {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: {
      'X-Figma-Token': FIGMA_TOKEN!,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`POST ${endpoint} → ${res.status}: ${await res.text()}`);
  return res.json() as T;
}

// ─── Sync per collection ──────────────────────────────────────────

interface ModeInput { name: string; tokens: Map<string, string> }

async function syncCollection(
  collectionName: string,
  modes: ModeInput[],
  meta: FigmaLocalVarsMeta
): Promise<void> {
  const existingCol = Object.values(meta.variableCollections)
    .find(c => c.name === collectionName);

  let realColId: string;
  const modeIdMap = new Map<string, string>();

  if (existingCol) {
    realColId = existingCol.id;
    for (const m of existingCol.modes) modeIdMap.set(m.name, m.modeId);
  } else {
    // ── Step 1: create the collection alone ─────────────────────────
    // Using distinct temp IDs so both appear in tempIdToRealId
    const COL_TEMP        = '0:1';
    const FIRST_MODE_TEMP = '0:2';

    console.log(`  [1/2] Creating collection "${collectionName}"…`);
    const step1 = await figmaPost<FigmaPostResponse>(
      `/files/${FIGMA_FILE_ID}/variables`,
      {
        variableCollections: [{
          action: 'CREATE',
          id: COL_TEMP,
          name: collectionName,
          initialModeId: FIRST_MODE_TEMP,
        }],
        variableModes: [],
        variables: [],
        variableModeValues: [],
      }
    );
    console.log('  Step 1 response:', JSON.stringify(step1, null, 2));

    const idMap = step1.meta.tempIdToRealId;
    realColId = idMap[COL_TEMP];
    if (!realColId) throw new Error(`No real ID returned for collection "${collectionName}"`);

    // Get first mode's real ID — from tempIdToRealId or via fallback GET
    let firstModeRealId = idMap[FIRST_MODE_TEMP];
    if (!firstModeRealId) {
      console.log('  initialModeId not in tempIdToRealId, fetching collection to resolve mode ID…');
      const fresh = await figmaGet<{ meta: FigmaLocalVarsMeta }>(
        `/files/${FIGMA_FILE_ID}/variables/local`
      );
      const col = Object.values(fresh.meta.variableCollections).find(c => c.id === realColId);
      firstModeRealId = col?.defaultModeId ?? col?.modes[0]?.modeId ?? '';
    }

    modeIdMap.set(modes[0].name, firstModeRealId);
    // Additional modes get temp IDs resolved in step 2
    for (let i = 1; i < modes.length; i++) {
      modeIdMap.set(modes[i].name, `0:${i + 2}`);
    }
  }

  // ── Step 2 (new) or single call (existing): modes + variables ───────

  const variableModes: object[] = [];
  const variables: object[] = [];
  const variableModeValues: object[] = [];

  if (!existingCol) {
    // Rename the auto-created first mode
    const firstModeId = modeIdMap.get(modes[0].name)!;
    if (firstModeId) {
      variableModes.push({
        action: 'UPDATE',
        id: firstModeId,
        name: modes[0].name,
        variableCollectionId: realColId,
      });
    }
    for (let i = 1; i < modes.length; i++) {
      variableModes.push({
        action: 'CREATE',
        id: modeIdMap.get(modes[i].name)!,
        name: modes[i].name,
        variableCollectionId: realColId,
      });
    }
  } else {
    // Add modes missing from the existing collection
    let nextIdx = existingCol.modes.length + 1;
    for (const mode of modes) {
      if (!modeIdMap.has(mode.name)) {
        const tempId = `0:${nextIdx++}`;
        modeIdMap.set(mode.name, tempId);
        variableModes.push({
          action: 'CREATE',
          id: tempId,
          name: mode.name,
          variableCollectionId: realColId,
        });
      }
    }
  }

  // Existing variables indexed by Figma name
  const existingVars = new Map<string, FigmaVariable>();
  if (existingCol) {
    for (const id of existingCol.variableIds) {
      const v = meta.variables[id];
      if (v) existingVars.set(v.name, v);
    }
  }

  const allCssNames = new Set(modes.flatMap(m => [...m.tokens.keys()]));
  let varCounter = 1;

  for (const cssName of allCssNames) {
    const figmaName = toFigmaName(cssName);

    let type: ResolvedType = 'STRING';
    for (const mode of modes) {
      const val = mode.tokens.get(cssName);
      if (val) { type = inferType(val); break; }
    }

    const existingVar = existingVars.get(figmaName);
    const varId = existingVar?.id ?? `1:${varCounter++}`;

    variables.push({
      action: existingVar ? 'UPDATE' : 'CREATE',
      id: varId,
      name: figmaName,
      variableCollectionId: realColId,
      resolvedType: type,
    });

    for (const mode of modes) {
      const raw = mode.tokens.get(cssName);
      if (raw === undefined) continue;
      const converted = convertValue(raw, type);
      if (converted === null) {
        console.warn(`  ⚠ Skipping "${cssName}": cannot convert "${raw}" as ${type}`);
        continue;
      }
      variableModeValues.push({
        variableId: varId,
        modeId: modeIdMap.get(mode.name)!,
        value: converted,
      });
    }
  }

  const label = existingCol ? 'Updating' : '[2/2] Adding modes + vars for';
  console.log(`  ${label} "${collectionName}" — ${variables.length} vars · ${modes.length} mode(s)`);

  await figmaPost<FigmaPostResponse>(`/files/${FIGMA_FILE_ID}/variables`, {
    variableModes,
    variables,
    variableModeValues,
  });
  console.log(`  ✓ "${collectionName}" synced`);
}

// ─── Main ─────────────────────────────────────────────────────────

const TOKENS_DIR = path.resolve(process.cwd(), 'src/tokens');
const readCss = (file: string) =>
  fs.readFileSync(path.join(TOKENS_DIR, file), 'utf-8');

async function main(): Promise<void> {
  console.log('Syncing design tokens → Figma\n');

  // Colors: two modes (Light = :root, Dark = [data-theme="dark"])
  const colorsCss = readCss('colors.css');
  const colorsLight = parseCustomProperties(extractBlock(colorsCss, ':root'));
  const colorsDark = parseCustomProperties(extractBlock(colorsCss, '[data-theme="dark"]'));

  // Others: single mode
  const typoTokens = parseCustomProperties(extractBlock(readCss('typography.css'), ':root'));
  const spacingTokens = parseCustomProperties(extractBlock(readCss('spacing.css'), ':root'));
  const shapeTokens = parseCustomProperties(extractBlock(readCss('shape.css'), ':root'));

  console.log('Fetching existing Figma variables…');
  const { meta } = await figmaGet<{ meta: FigmaLocalVarsMeta }>(
    `/files/${FIGMA_FILE_ID}/variables/local`
  );
  console.log(
    `  ${Object.keys(meta.variableCollections).length} collection(s), ` +
    `${Object.keys(meta.variables).length} variable(s) found\n`
  );

  await syncCollection(
    'Colors',
    [{ name: 'Light', tokens: colorsLight }, { name: 'Dark', tokens: colorsDark }],
    meta
  );

  await syncCollection('Typography', [{ name: 'Mode 1', tokens: typoTokens }], meta);
  await syncCollection('Spacing',    [{ name: 'Mode 1', tokens: spacingTokens }], meta);
  await syncCollection('Shape',      [{ name: 'Mode 1', tokens: shapeTokens }], meta);

  console.log('\nSync complete!');
}

main().catch(err => {
  console.error('Sync failed:', err.message);
  process.exit(1);
});
