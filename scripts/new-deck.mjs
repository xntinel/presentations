#!/usr/bin/env node
// Scaffold a new deck:  pnpm new-deck <slug> [--theme <name>] [--title "..."]
//
// Creates src/content/decks/<slug>/index.md with valid frontmatter and two
// starter slides (slides are separated by `---`; `Note:` becomes speaker notes).
// A new folder under src/content/decks/ is all it takes for the deck to appear
// in the gallery and at /decks/<slug>. Flags may appear in any order relative
// to the slug; the theme is validated against the registry so it fails fast
// here instead of at build time.
import { mkdir, writeFile, access, readFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

// Separate `--name value` flags from positional args so a flag's value is never
// mistaken for the slug (e.g. `--theme hud my-deck` must keep slug = my-deck).
const argv = process.argv.slice(2);
const flags = {};
const positionals = [];
for (let i = 0; i < argv.length; i++) {
  const arg = argv[i];
  if (arg.startsWith('--')) {
    const next = argv[i + 1];
    flags[arg.slice(2)] = next && !next.startsWith('--') ? argv[++i] : true;
  } else {
    positionals.push(arg);
  }
}

const slug = positionals[0];
if (!slug) {
  console.error('Usage: pnpm new-deck <slug> [--theme <name>] [--title "..."]');
  process.exit(1);
}
if (!/^[a-z0-9-]+$/.test(slug)) {
  console.error(
    `Invalid slug "${slug}". Use lowercase letters, digits, and hyphens.`,
  );
  process.exit(1);
}

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

// Validate --theme against the registry (the single source of truth) so a typo
// fails here with a clear message rather than later as an opaque Zod build error.
const registrySrc = await readFile(
  join(root, 'src/themes/registry.ts'),
  'utf8',
);
const themesBlock = registrySrc.slice(
  registrySrc.indexOf('themes = {'),
  registrySrc.indexOf('} as const'),
);
const themeNames = [
  ...themesBlock.matchAll(/(?:'([^']+)'|([A-Za-z0-9_-]+))\s*:\s*\{/g),
].map((m) => m[1] ?? m[2]);

const theme = typeof flags.theme === 'string' ? flags.theme : 'steel-light';
if (!themeNames.includes(theme)) {
  console.error(
    `Unknown theme "${theme}". Available: ${themeNames.join(', ')}`,
  );
  process.exit(1);
}

const title =
  typeof flags.title === 'string'
    ? flags.title
    : slug.replace(/-/g, ' ').replace(/^\w/, (c) => c.toUpperCase());

const dir = join(root, 'src', 'content', 'decks', slug);
const file = join(dir, 'index.md');
try {
  await access(file);
  console.error(`Deck "${slug}" already exists at ${file}`);
  process.exit(1);
} catch {
  // does not exist yet — good
}

const today = new Date().toISOString().slice(0, 10);
const text = `---
title: ${title}
description: One-line description shown in the gallery.
category: General
pubDate: ${today}
theme: ${theme}
---

# ${title}

Your opening slide. Separate slides with a lone \`---\`.

Note: Speaker notes for this slide (hidden on screen, shown in the Notes view).

---

## Second slide

One idea per slide. Use **bold** for emphasis and \`code\` for literals.

Note: More speaker notes.
`;

await mkdir(dir, { recursive: true });
await writeFile(file, text, 'utf8');
console.log(`Created src/content/decks/${slug}/index.md`);
console.log(`  theme: ${theme}   ->  preview at /decks/${slug}`);
console.log('  Run "pnpm dev" and open the gallery to see it.');
