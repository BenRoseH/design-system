import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const FIGMA_TOKEN = process.env.FIGMA_TOKEN;
const FIGMA_FILE_ID = process.env.FIGMA_FILE_ID;
const STORYBOOK_URL = 'http://localhost:6006';
const BASE_URL = 'https://api.figma.com/v1';

if (!FIGMA_TOKEN || !FIGMA_FILE_ID) {
  console.error('Missing FIGMA_TOKEN or FIGMA_FILE_ID in .env');
  process.exit(1);
}

// ─── Types ────────────────────────────────────────────────────────

interface StoryEntry {
  id: string;
  title: string;
  name: string;
  type: string;
}

interface StorybookIndex {
  v: number;
  entries: Record<string, StoryEntry>;
}

interface FigmaPage {
  id: string;
  name: string;
  type: string;
}

interface FigmaFile {
  document: {
    id: string;
    name: string;
    children: FigmaPage[];
  };
}

interface RGBA { r: number; g: number; b: number; a: number }

interface ButtonVariant {
  fill: RGBA | null;
  stroke: RGBA | null;
  labelColor: RGBA;
}

// ─── Variant definitions ──────────────────────────────────────────

const WHITE: RGBA = { r: 1, g: 1, b: 1, a: 1 };
const BLACK: RGBA = { r: 0, g: 0, b: 0, a: 1 };
const TRANSPARENT: RGBA = { r: 0, g: 0, b: 0, a: 0 };

const VARIANTS: Record<string, ButtonVariant> = {
  Default:  { fill: TRANSPARENT, stroke: { r: 0, g: 0, b: 0, a: 0.2 }, labelColor: BLACK },
  Strong:   { fill: BLACK,                            stroke: null, labelColor: WHITE },
  Brand:    { fill: { r: 241/255, g: 94/255, b: 0, a: 1 }, stroke: null, labelColor: WHITE },
  Negative: { fill: { r: 219/255, g: 0,      b: 2/255, a: 1 }, stroke: null, labelColor: WHITE },
  Minimal:  { fill: TRANSPARENT,              stroke: null, labelColor: BLACK },
};

const FALLBACK_VARIANT: ButtonVariant = {
  fill: { r: 0.9, g: 0.9, b: 0.9, a: 1 },
  stroke: null,
  labelColor: BLACK,
};

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

// ─── Step 1: Fetch Button stories from Storybook ──────────────────

async function fetchButtonStories(): Promise<StoryEntry[]> {
  let res: Response;
  try {
    res = await fetch(`${STORYBOOK_URL}/index.json`);
  } catch {
    throw new Error(`Cannot reach Storybook at ${STORYBOOK_URL} — is it running on port 6006?`);
  }
  if (!res.ok) throw new Error(`Storybook index returned ${res.status}`);

  const index = (await res.json()) as StorybookIndex;
  return Object.values(index.entries).filter(
    entry => entry.type === 'story' && entry.title.startsWith('Atoms/Button')
  );
}

// ─── Step 2: Resolve Figma page ───────────────────────────────────

async function resolvePage(): Promise<string> {
  const file = await figmaGet<FigmaFile>(`/files/${FIGMA_FILE_ID}`);
  const pages = file.document.children;

  const named = pages.find(p => p.name === 'Components');
  const page = named ?? pages[0];

  if (!page) throw new Error('Figma file has no pages');

  console.log(`  📄 Using Figma page: "${page.name}" (id: ${page.id})`);
  return page.id;
}

// ─── Step 3: Build node tree and POST to Figma ────────────────────

function solidFill(color: RGBA) {
  return [{ type: 'SOLID', color }];
}

function buildButtonNode(variant: ButtonVariant): object {
  return {
    type: 'FRAME',
    name: 'button',
    width: 120,
    height: 40,
    cornerRadius: 8,
    layoutMode: 'HORIZONTAL',
    primaryAxisAlignItems: 'CENTER',
    counterAxisAlignItems: 'CENTER',
    fills: variant.fill ? solidFill(variant.fill) : [],
    strokes: variant.stroke ? solidFill(variant.stroke) : [],
    strokeWeight: variant.stroke ? 1 : 0,
    children: [
      {
        type: 'TEXT',
        name: 'label',
        characters: 'label',
        fills: solidFill(variant.labelColor),
        style: {
          fontSize: 14,
          fontFamily: 'Inter',
          fontWeight: 400,
        },
      },
    ],
  };
}

async function createFigmaFrames(
  pageId: string,
  stories: StoryEntry[]
): Promise<void> {
  process.stdout.write(`  🔧 Creating Figma frames on page ${pageId}... `);

  const nodes = stories.map((story, i) => {
    const variant = VARIANTS[story.name] ?? FALLBACK_VARIANT;
    return {
      type: 'FRAME',
      name: story.name,
      x: i * 200,
      y: 0,
      layoutMode: 'HORIZONTAL',
      itemSpacing: 16,
      paddingTop: 24,
      paddingBottom: 24,
      paddingLeft: 24,
      paddingRight: 24,
      primaryAxisSizingMode: 'AUTO',
      counterAxisSizingMode: 'AUTO',
      fills: solidFill(WHITE),
      children: [buildButtonNode(variant)],
    };
  });

  await figmaPost(`/files/${FIGMA_FILE_ID}/nodes`, { pageId, nodes });

  console.log('✓');
}

// ─── Main ─────────────────────────────────────────────────────────

async function main(): Promise<void> {
  console.log('🎨 Syncing Button stories → Figma\n');

  const stories = await fetchButtonStories();
  if (stories.length === 0) {
    console.error('No Button stories found — is Storybook running on port 6006?');
    process.exit(1);
  }
  console.log(`  Found ${stories.length} Button stories: ${stories.map(s => s.name).join(', ')}\n`);

  const pageId = await resolvePage();
  await createFigmaFrames(pageId, stories);

  console.log(`\n✅ Done — ${stories.length} stories synced to Figma`);
}

main().catch(err => {
  console.error('Sync failed:', err.message);
  process.exit(1);
});
