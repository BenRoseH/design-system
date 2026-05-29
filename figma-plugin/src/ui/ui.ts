interface StoryEntry {
  id: string;
  title: string;
  name: string;
  type: string;
}

interface IndexJson {
  entries: Record<string, StoryEntry>;
}

const urlInput     = document.getElementById('storybook-url') as HTMLInputElement;
const componentSel = document.getElementById('component') as HTMLSelectElement;
const fetchBtn     = document.getElementById('fetch-btn') as HTMLButtonElement;
const syncBtn      = document.getElementById('sync-btn') as HTMLButtonElement;
const logsDiv      = document.getElementById('logs') as HTMLDivElement;

let loadedStories: StoryEntry[] = [];

// ─── Logging ──────────────────────────────────────────────────────

function log(msg: string): void {
  const line = document.createElement('p');
  line.textContent = msg;
  logsDiv.appendChild(line);
  logsDiv.scrollTop = logsDiv.scrollHeight;
}

log('UI loaded ✓');

// ─── Fetch stories ────────────────────────────────────────────────

fetchBtn.addEventListener('click', async () => {
  const url = urlInput.value.trim();
  log(`Fetch clicked — URL: ${url}`);
  log(`Fetching index from ${url}…`);
  fetchBtn.disabled = true;

  try {
    const res = await fetch(`${url}/index.json`);
    log(`Response status: ${res.status}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = (await res.json()) as IndexJson;

    const stories = Object.values(data.entries).filter(e => e.type === 'story');

    const groups = [...new Set(stories.map(s => s.title))].sort();
    componentSel.innerHTML = '';
    for (const g of groups) {
      const opt = document.createElement('option');
      opt.value = g;
      opt.textContent = g;
      componentSel.appendChild(opt);
    }
    componentSel.disabled = false;

    filterStories(stories, componentSel.value);
    log(`✓ ${groups.length} components found`);
    syncBtn.disabled = false;
  } catch (err) {
    log(`✗ ${String(err)}`);
  } finally {
    fetchBtn.disabled = false;
  }
});

componentSel.addEventListener('change', async () => {
  const url = urlInput.value.trim();
  const selected = componentSel.value;
  try {
    const res = await fetch(`${url}/index.json`);
    const data = (await res.json()) as IndexJson;
    const all = Object.values(data.entries).filter(e => e.type === 'story');
    filterStories(all, selected);
  } catch { /* ignore */ }
});

function filterStories(all: StoryEntry[], title: string): void {
  loadedStories = all.filter(s => s.title === title);
  log(`  ${loadedStories.length} stories for "${title}"`);
}

// ─── Sync ─────────────────────────────────────────────────────────

syncBtn.addEventListener('click', async () => {
  if (loadedStories.length === 0) {
    log('No stories — click "Fetch Stories" first.');
    return;
  }

  const storybookUrl = urlInput.value.trim();
  const componentName = componentSel.value;

  syncBtn.disabled = true;
  fetchBtn.disabled = true;
  log(`\nStarting sync for "${componentName}"…`);

  const payload = loadedStories.map(story => ({
    id: story.id,
    name: story.name,
    url: `${storybookUrl}/iframe.html?id=${story.id}&viewMode=story`,
  }));

  parent.postMessage(
    { pluginMessage: { type: 'sync-components', stories: payload, componentName } },
    '*'
  );
});

// ─── Messages from controller ─────────────────────────────────────

window.onmessage = (event: MessageEvent) => {
  const msg = (event.data as { pluginMessage?: { type: string; story?: string; count?: number; message?: string } }).pluginMessage;
  if (!msg) return;

  if (msg.type === 'progress') log(`  ✓ "${msg.story}" synced`);
  if (msg.type === 'error')    log(`  ✗ "${msg.story}": ${msg.message}`);
  if (msg.type === 'done') {
    log(`\n✅ Done — ${msg.count} components created in "Storybook Components"`);
    syncBtn.disabled = false;
    fetchBtn.disabled = false;
  }
};
