/// <reference path="../../node_modules/@figma/plugin-typings/index.d.ts" />

figma.showUI(__html__, { width: 360, height: 500 });

// ─── Message types ────────────────────────────────────────────────────────────

interface StoryPayload { id: string; name: string; url: string; }

interface SyncMessage {
  type: 'sync-components';
  stories: StoryPayload[];
  componentName: string;
}

type PluginMessage = SyncMessage;

// ─── Token helpers ────────────────────────────────────────────────────────────

let _varCache: Variable[] | null = null;

function vars(): Variable[] {
  if (!_varCache) _varCache = figma.variables.getLocalVariables();
  return _varCache;
}

function findVar(token: string): Variable | undefined {
  return vars().find(v => v.name === token);
}

function solid(r: number, g: number, b: number, a = 1): SolidPaint {
  return { type: 'SOLID', color: { r, g, b }, opacity: a };
}

// Create a paint optionally bound to a Figma variable
function paint(token: string, fallback: SolidPaint): SolidPaint {
  try {
    const v = findVar(token);
    if (!v) return fallback;
    return figma.variables.setBoundVariableForPaint(fallback, 'color', v) as SolidPaint;
  } catch { return fallback; }
}

// Bind a float variable to a node field
function bindFloat(node: SceneNode, field: string, token: string): void {
  try {
    const v = findVar(token);
    if (v) (node as any).setBoundVariable(field, v);
  } catch {}
}

// Bind corner radius to a token on all four corners
function bindRadius(node: SceneNode, token: string): void {
  bindFloat(node, 'topLeftRadius', token);
  bindFloat(node, 'topRightRadius', token);
  bindFloat(node, 'bottomLeftRadius', token);
  bindFloat(node, 'bottomRightRadius', token);
}

// ─── Page helper ─────────────────────────────────────────────────────────────

function getOrCreatePage(): PageNode {
  let page = figma.root.children.find(
    p => p.name === 'Storybook Components'
  ) as PageNode | undefined;
  if (!page) {
    page = figma.createPage();
    page.name = 'Storybook Components';
  }
  figma.currentPage = page;
  return page;
}

// ─── Button builder ───────────────────────────────────────────────────────────
//
// Variants: 5 hierarchies × 2 sizes = 10 components
// Auto-layout horizontal, fixed height (40 / 32px), hug width
// Tokens bound: radius/medium, spacing/medium, border/default, all color tokens

const BTN_HIERARCHIES = ['Default', 'Strong', 'Negative', 'Brand', 'Minimal'] as const;
const BTN_SIZES       = ['Default', 'Compact'] as const;

interface BtnStyle {
  bgToken:      string | null;
  bgFallback:   SolidPaint | null;
  textToken:    string;
  textFallback: SolidPaint;
  useStroke:    boolean;
}

const BTN_STYLE: Record<string, BtnStyle> = {
  Default:  {
    bgToken: null, bgFallback: null,
    textToken: 'color/action/default/enabled', textFallback: solid(0, 0, 0),
    useStroke: true,
  },
  Strong: {
    bgToken: 'color/action/default/enabled', bgFallback: solid(0, 0, 0),
    textToken: 'color/bg/default', textFallback: solid(1, 1, 1),
    useStroke: false,
  },
  Negative: {
    bgToken: 'color/status/negative/emphasized', bgFallback: solid(219/255, 0, 2/255),
    textToken: 'color/bg/default', textFallback: solid(1, 1, 1),
    useStroke: false,
  },
  Brand: {
    bgToken: 'color/content/brand/primary', bgFallback: solid(241/255, 94/255, 0),
    textToken: 'color/content/on/brand', textFallback: solid(0, 0, 0),
    useStroke: false,
  },
  Minimal: {
    bgToken: null, bgFallback: null,
    textToken: 'color/action/default/enabled', textFallback: solid(0, 0, 0),
    useStroke: false,
  },
};

async function buildButton(page: PageNode): Promise<void> {
  const existing = page.findChildren(n => n.name === 'Atoms/Button');
  for (const n of existing) n.remove();

  await figma.loadFontAsync({ family: 'Inter', style: 'Regular' });
  await figma.loadFontAsync({ family: 'Inter', style: 'Medium' });

  const components: ComponentNode[] = [];

  for (const hierarchy of BTN_HIERARCHIES) {
    for (const size of BTN_SIZES) {
      const s = BTN_STYLE[hierarchy];
      const isCompact = size === 'Compact';
      const height = isCompact ? 32 : 40;

      const comp = figma.createComponent();
      comp.name = `Hierarchy=${hierarchy}, Size=${size}`;
      comp.layoutMode = 'HORIZONTAL';
      comp.primaryAxisSizingMode = 'AUTO';
      comp.counterAxisSizingMode = 'FIXED';
      comp.primaryAxisAlignItems = 'CENTER';
      comp.counterAxisAlignItems = 'CENTER';
      comp.paddingLeft = 16;
      comp.paddingRight = 16;
      comp.paddingTop = 0;
      comp.paddingBottom = 0;
      comp.itemSpacing = 8;
      comp.cornerRadius = 8;
      comp.clipsContent = true;

      // Token bindings — layout
      bindFloat(comp, 'paddingLeft',  'spacing/medium');
      bindFloat(comp, 'paddingRight', 'spacing/medium');
      bindFloat(comp, 'itemSpacing',  'spacing/xsmall');
      bindRadius(comp, 'radius/medium');

      // Background
      comp.fills = s.bgToken && s.bgFallback
        ? [paint(s.bgToken, s.bgFallback)]
        : [];

      // Stroke (Default hierarchy = inset border)
      if (s.useStroke) {
        comp.strokes = [paint('color/border/emphasized', solid(0, 0, 0))];
        comp.strokeWeight = 1;
        comp.strokeAlign = 'INSIDE';
        bindFloat(comp, 'strokeWeight', 'border/default');
      } else {
        comp.strokes = [];
      }

      // Label text node
      const label = figma.createText();
      label.fontName = { family: 'Inter', style: 'Medium' };
      label.fontSize = 14;
      label.characters = 'Button';
      label.fills = [paint(s.textToken, s.textFallback)];
      bindFloat(label, 'fontSize', 'typography/body/medium/moderate/font/size');
      comp.appendChild(label);

      // Fix height (width stays hug via AUTO)
      comp.resize(comp.width, height);

      components.push(comp);
      figma.ui.postMessage({ type: 'progress', story: `${hierarchy} / ${size}` });
    }
  }

  const set = figma.combineAsVariants(components, page);
  set.name = 'Atoms/Button';

  // Expose label as a component text property
  const labelKey = set.addComponentProperty('Label', 'TEXT', 'Button');
  for (const child of set.children as ComponentNode[]) {
    const textNode = child.findOne(n => n.type === 'TEXT') as TextNode | null;
    if (textNode) textNode.componentPropertyReferences = { characters: labelKey };
  }

  figma.ui.postMessage({ type: 'progress', story: 'Component set created' });
}

// ─── Avatar builder ───────────────────────────────────────────────────────────
//
// Variants: 7 colors × 2 sizes = 14 components
// Fixed square (40×40 / 32×32), centered initials text
// Tokens bound: radius/medium, border/default, all color tokens

const AVATAR_SIZES  = ['Default', 'Compact'] as const;
const AVATAR_COLORS = ['None', 'Green', 'Blue', 'Yellow', 'Purple', 'Pink', 'Brown'] as const;

const AVATAR_BG: Record<string, { token: string; fallback: SolidPaint }> = {
  None:   { token: 'color/bg/secondary',          fallback: solid(244/255, 244/255, 244/255) },
  Green:  { token: 'color/decorative/green/100',  fallback: solid(192/255, 232/255, 212/255, 0.4) },
  Blue:   { token: 'color/decorative/blue/100',   fallback: solid(165/255, 218/255, 243/255, 0.4) },
  Yellow: { token: 'color/decorative/yellow/100', fallback: solid(255/255, 237/255, 153/255, 0.4) },
  Purple: { token: 'color/decorative/purple/100', fallback: solid(224/255, 212/255, 242/255, 0.4) },
  Pink:   { token: 'color/decorative/pink/100',   fallback: solid(255/255, 229/255, 246/255, 0.4) },
  Brown:  { token: 'color/decorative/brown/100',  fallback: solid(251/255, 235/255, 223/255, 0.4) },
};

async function buildAvatar(page: PageNode): Promise<void> {
  const existing = page.findChildren(n => n.name === 'Atoms/Avatar');
  for (const n of existing) n.remove();

  await figma.loadFontAsync({ family: 'Inter', style: 'Semi Bold' });

  const components: ComponentNode[] = [];

  for (const color of AVATAR_COLORS) {
    for (const size of AVATAR_SIZES) {
      const isCompact = size === 'Compact';
      const dim = isCompact ? 32 : 40;
      const bg = AVATAR_BG[color];

      const comp = figma.createComponent();
      comp.name = `Color=${color}, Size=${size}`;
      comp.layoutMode = 'HORIZONTAL';
      comp.primaryAxisSizingMode = 'FIXED';
      comp.counterAxisSizingMode = 'FIXED';
      comp.primaryAxisAlignItems = 'CENTER';
      comp.counterAxisAlignItems = 'CENTER';
      comp.paddingLeft = 0;
      comp.paddingRight = 0;
      comp.paddingTop = 0;
      comp.paddingBottom = 0;
      comp.cornerRadius = 8;
      comp.clipsContent = true;
      comp.resize(dim, dim);

      // Token bindings
      bindRadius(comp, 'radius/medium');

      // Background color
      comp.fills = [paint(bg.token, bg.fallback)];

      // Border
      comp.strokes = [paint('color/border/default', solid(0, 0, 0, 0.2))];
      comp.strokeWeight = 1;
      comp.strokeAlign = 'INSIDE';
      bindFloat(comp, 'strokeWeight', 'border/default');

      // Initials text
      const text = figma.createText();
      text.fontName = { family: 'Inter', style: 'Semi Bold' };
      text.fontSize = isCompact ? 12 : 14;
      text.characters = 'AB';
      text.fills = [paint('color/content/default', solid(0, 0, 0))];
      bindFloat(
        text, 'fontSize',
        isCompact
          ? 'typography/body/small/strong/font/size'
          : 'typography/body/medium/strong/font/size'
      );
      comp.appendChild(text);

      components.push(comp);
      figma.ui.postMessage({ type: 'progress', story: `${color} / ${size}` });
    }
  }

  const set = figma.combineAsVariants(components, page);
  set.name = 'Atoms/Avatar';

  // Expose initials as a component text property
  const initialsKey = set.addComponentProperty('Initials', 'TEXT', 'AB');
  for (const child of set.children as ComponentNode[]) {
    const textNode = child.findOne(n => n.type === 'TEXT') as TextNode | null;
    if (textNode) textNode.componentPropertyReferences = { characters: initialsKey };
  }

  figma.ui.postMessage({ type: 'progress', story: 'Component set created' });
}

// ─── Tag builder ──────────────────────────────────────────────────────────────
//
// Variants: 6 statuses × 2 sizes = 12 components
// Auto-layout horizontal, hug width, fixed height (32 / 24px)
// Tokens bound: radius/medium, spacing/xsmall, spacing/2xsmall, status color tokens

const TAG_STATUSES = ['Positive', 'Negative', 'Neutral', 'Warning', 'Information', 'Accent'] as const;
const TAG_SIZES    = ['Default', 'Compact'] as const;

interface TagStyle {
  bgToken:      string;
  bgFallback:   SolidPaint;
  textToken:    string;
  textFallback: SolidPaint;
}

const TAG_STYLE: Record<string, TagStyle> = {
  Positive:    { bgToken: 'color/status/positive/muted',  bgFallback: solid(61/255, 227/255, 90/255, 0.12),   textToken: 'color/status/positive/emphasized',  textFallback: solid(19/255,  129/255, 38/255) },
  Negative:    { bgToken: 'color/status/negative/muted',  bgFallback: solid(219/255, 0, 2/255, 0.08),         textToken: 'color/status/negative/emphasized',  textFallback: solid(219/255,   0, 2/255) },
  Neutral:     { bgToken: 'color/bg/secondary',           bgFallback: solid(244/255, 244/255, 244/255),       textToken: 'color/content/muted',               textFallback: solid(0, 0, 0, 0.68) },
  Warning:     { bgToken: 'color/status/warning/muted',   bgFallback: solid(255/255, 208/255, 0, 0.16),       textToken: 'color/status/warning/emphasized',   textFallback: solid(255/255, 208/255, 0) },
  Information: { bgToken: 'color/status/info/muted',      bgFallback: solid(38/255, 178/255, 255/255, 0.08),  textToken: 'color/status/info/emphasized',      textFallback: solid(0, 115/255, 179/255) },
  Accent:      { bgToken: 'color/status/accent/muted',    bgFallback: solid(189/255, 121/255, 60/255, 0.08),  textToken: 'color/status/accent/emphasized',    textFallback: solid(255/255, 121/255, 0) },
};

async function buildTag(page: PageNode): Promise<void> {
  const existing = page.findChildren(n => n.name === 'Atoms/Tag');
  for (const n of existing) n.remove();

  await figma.loadFontAsync({ family: 'Inter', style: 'Regular' });

  const components: ComponentNode[] = [];

  for (const status of TAG_STATUSES) {
    for (const size of TAG_SIZES) {
      const s = TAG_STYLE[status];
      const isCompact = size === 'Compact';

      const comp = figma.createComponent();
      comp.name = `Status=${status}, Size=${size}`;
      comp.layoutMode = 'HORIZONTAL';
      comp.primaryAxisSizingMode = 'AUTO';
      comp.counterAxisSizingMode = 'FIXED';
      comp.primaryAxisAlignItems = 'CENTER';
      comp.counterAxisAlignItems = 'CENTER';
      comp.paddingLeft = 8;
      comp.paddingRight = 8;
      comp.paddingTop = 0;
      comp.paddingBottom = 0;
      comp.itemSpacing = 4;
      comp.cornerRadius = 8;
      comp.clipsContent = true;

      bindFloat(comp, 'paddingLeft',  'spacing/xsmall');
      bindFloat(comp, 'paddingRight', 'spacing/xsmall');
      bindFloat(comp, 'itemSpacing',  'spacing/2xsmall');
      bindRadius(comp, 'radius/medium');

      comp.fills = [paint(s.bgToken, s.bgFallback)];

      const label = figma.createText();
      label.fontName = { family: 'Inter', style: 'Regular' };
      label.fontSize = 12;
      label.characters = status;
      label.fills = [paint(s.textToken, s.textFallback)];
      bindFloat(label, 'fontSize', 'typography/body/small/moderate/font/size');
      comp.appendChild(label);

      comp.resize(comp.width, isCompact ? 24 : 32);

      components.push(comp);
      figma.ui.postMessage({ type: 'progress', story: `${status} / ${size}` });
    }
  }

  const set = figma.combineAsVariants(components, page);
  set.name = 'Atoms/Tag';

  const labelKey = set.addComponentProperty('Label', 'TEXT', 'Label');
  for (const child of set.children as ComponentNode[]) {
    const textNode = child.findOne(n => n.type === 'TEXT') as TextNode | null;
    if (textNode) textNode.componentPropertyReferences = { characters: labelKey };
  }

  figma.ui.postMessage({ type: 'progress', story: 'Component set created' });
}

// ─── NavItem builder ──────────────────────────────────────────────────────────
//
// Variants: 3 states × 2 layouts = 6 components
// Auto-layout horizontal, fixed height 40px, hug width
// Tokens bound: radius/medium, spacing/small, spacing/xsmall, color tokens

const NAVITEM_STATES  = ['Default', 'Selected', 'Disabled'] as const;
const NAVITEM_LAYOUTS = ['WithLabel', 'IconOnly'] as const;

async function buildNavItem(page: PageNode): Promise<void> {
  const existing = page.findChildren(n => n.name === 'Atoms/NavItem');
  for (const n of existing) n.remove();

  await figma.loadFontAsync({ family: 'Inter', style: 'Regular' });
  await figma.loadFontAsync({ family: 'Inter', style: 'Medium' });

  const components: ComponentNode[] = [];

  for (const state of NAVITEM_STATES) {
    for (const layout of NAVITEM_LAYOUTS) {
      const isIconOnly = layout === 'IconOnly';
      const isSelected = state === 'Selected';
      const isDisabled = state === 'Disabled';

      const comp = figma.createComponent();
      comp.name = `State=${state}, Layout=${layout}`;
      comp.layoutMode = 'HORIZONTAL';
      comp.primaryAxisAlignItems = 'CENTER';
      comp.counterAxisAlignItems = 'CENTER';
      comp.cornerRadius = 8;
      comp.clipsContent = true;

      if (isIconOnly) {
        comp.primaryAxisSizingMode = 'FIXED';
        comp.counterAxisSizingMode = 'FIXED';
        comp.paddingLeft = 0;
        comp.paddingRight = 0;
        comp.paddingTop = 0;
        comp.paddingBottom = 0;
        comp.itemSpacing = 0;
      } else {
        comp.primaryAxisSizingMode = 'AUTO';
        comp.counterAxisSizingMode = 'FIXED';
        comp.paddingLeft = 12;
        comp.paddingRight = 12;
        comp.paddingTop = 8;
        comp.paddingBottom = 8;
        comp.itemSpacing = 8;
        bindFloat(comp, 'paddingLeft',  'spacing/small');
        bindFloat(comp, 'paddingRight', 'spacing/small');
        bindFloat(comp, 'paddingTop',   'spacing/xsmall');
        bindFloat(comp, 'paddingBottom','spacing/xsmall');
        bindFloat(comp, 'itemSpacing',  'spacing/xsmall');
      }

      bindRadius(comp, 'radius/medium');

      comp.fills = isSelected
        ? [paint('color/bg/secondary', solid(244/255, 244/255, 244/255))]
        : [];

      // Icon placeholder (20×20 rounded rect)
      const iconFallback = isDisabled
        ? solid(0, 0, 0, 0.2)
        : isSelected
          ? solid(241/255, 94/255, 0)
          : solid(0, 0, 0);
      const iconToken = isDisabled
        ? 'color/content/disable'
        : isSelected
          ? 'color/content/brand/primary'
          : 'color/content/default';
      const icon = figma.createRectangle();
      icon.name = 'Icon';
      icon.resize(20, 20);
      icon.cornerRadius = 4;
      icon.fills = [paint(iconToken, iconFallback)];
      comp.appendChild(icon);

      if (!isIconOnly) {
        const textFallback = isDisabled
          ? solid(0, 0, 0, 0.2)
          : isSelected
            ? solid(241/255, 94/255, 0)
            : solid(0, 0, 0);
        const textToken = isDisabled
          ? 'color/content/disable'
          : isSelected
            ? 'color/content/brand/primary'
            : 'color/content/default';
        const label = figma.createText();
        label.fontName = { family: 'Inter', style: isSelected ? 'Medium' : 'Regular' };
        label.fontSize = 14;
        label.characters = 'Nav Item';
        label.fills = [paint(textToken, textFallback)];
        bindFloat(label, 'fontSize', 'typography/body/medium/moderate/font/size');
        comp.appendChild(label);
      }

      comp.resize(isIconOnly ? 40 : comp.width, 40);

      components.push(comp);
      figma.ui.postMessage({ type: 'progress', story: `${state} / ${layout}` });
    }
  }

  const set = figma.combineAsVariants(components, page);
  set.name = 'Atoms/NavItem';

  const labelKey = set.addComponentProperty('Label', 'TEXT', 'Nav Item');
  for (const child of set.children as ComponentNode[]) {
    const textNode = child.findOne(n => n.type === 'TEXT') as TextNode | null;
    if (textNode) textNode.componentPropertyReferences = { characters: labelKey };
  }

  figma.ui.postMessage({ type: 'progress', story: 'Component set created' });
}

// ─── Fallback builder (unknown components) ────────────────────────────────────

async function buildFallback(page: PageNode, stories: StoryPayload[], componentName: string): Promise<void> {
  await figma.loadFontAsync({ family: 'Inter', style: 'Regular' });

  const existing = page.findChildren(
    n => n.name === componentName || n.name.startsWith(`${componentName}/`)
  );
  for (const n of existing) n.remove();

  const components: ComponentNode[] = [];

  for (const story of stories) {
    const comp = figma.createComponent();
    comp.name = `Variant=${story.name}`;
    comp.resize(320, 200);
    comp.fills = [solid(0.97, 0.97, 0.97)];
    comp.description = story.url;

    const t = figma.createText();
    t.characters = story.name;
    t.fontSize = 14;
    t.fills = [solid(0.1, 0.1, 0.1)];
    t.x = 20;
    t.y = 20;
    comp.appendChild(t);

    components.push(comp);
    figma.ui.postMessage({ type: 'progress', story: story.name });
  }

  if (components.length > 0) {
    const set = figma.combineAsVariants(components, page);
    set.name = componentName;
  }
}

// ─── Message handler ──────────────────────────────────────────────────────────

figma.ui.onmessage = async (msg: PluginMessage) => {
  if (msg.type !== 'sync-components') return;

  _varCache = null; // reset variable cache for each sync

  const { componentName, stories } = msg;
  const page = getOrCreatePage();

  try {
    if (componentName === 'Atoms/Button') {
      await buildButton(page);
    } else if (componentName === 'Atoms/Avatar') {
      await buildAvatar(page);
    } else if (componentName === 'Atoms/Tag') {
      await buildTag(page);
    } else if (componentName === 'Atoms/NavItem') {
      await buildNavItem(page);
    } else {
      await buildFallback(page, stories, componentName);
    }

    figma.ui.postMessage({ type: 'done', count: stories.length });
  } catch (err) {
    figma.ui.postMessage({ type: 'error', story: componentName, message: String(err) });
  }
};
