# Presentaciones

A personal library of presentations. Each deck is a folder; the home page (`/`) is a gallery that
groups them by category and lets you open any of them full screen. Built with **Astro 7** +
**reveal.js 6**.

## Commands

```bash
pnpm dev          # dev server at http://localhost:4321
pnpm build        # export the static site to dist/
pnpm preview      # preview the production build
pnpm check        # type-check (astro check)
pnpm test         # run the unit tests (vitest)
pnpm format       # format with Prettier (format:check to verify only)
pnpm new-deck <slug> [--theme <name>] [--title "..."]   # scaffold a new deck
```

CI (`.github/workflows/deploy.yml`) runs `check -> test -> build` before deploying to GitHub Pages.

Background dev server (Astro CLI):

```bash
pnpm exec astro dev --background   # start without blocking the terminal
pnpm exec astro dev status         # status
pnpm exec astro dev logs           # logs
pnpm exec astro dev stop           # stop
```

Note: if you change `src/content.config.ts`, restart the dev server.

## Add a presentation

A presentation = a folder `src/content/decks/<slug>/` with an `index.md` or `index.mdx` and any
co-located images under `images/`. It appears in the gallery automatically; no code changes needed.
Fastest start: `pnpm new-deck my-talk --theme hud`.

Frontmatter:

```yaml
---
title: Talk title # required
description: Short summary # optional, shown on the card
category: Charlas # groups on the home page (default: "Sin categoria")
pubDate: 2025-06-23 # optional, sorts by date
theme: steel-light # a theme name from the registry
cover: ./images/cover.jpg # optimized cover for the card
coverAlt: Alt text # optional
draft: false # true = not published
---
```

### Plain Markdown (`index.md`)

The simplest form. Slides are separated by a lone `---`; speaker notes start with `Note:`.

```markdown
# First slide

Content.

Note: Speaker notes for this slide.

---

## Second slide
```

### MDX with the image template (`index.mdx`)

For the full-bleed image + overlaid title style, use the `<Slide>` component (import images so
`astro:assets` optimizes them). Components are reachable via the `@components` path alias:

```mdx
import Slide from '@components/Slide.astro';
import cover from './images/cover.jpg';

<Slide img={cover} cover eager note={`Speaker notes.`}>
  <h1>Cover title</h1>
</Slide>
```

The HUD theme also ships content components under `@components/hud/` (`HudSlide`, `KvCard`, `Chat`,
`Headers`) for terminal-style decks.

## Themes (named and reusable)

Themes are named entities in `src/themes/registry.ts`. Each deck declares `theme: <name>` in its
frontmatter; the schema validates that name, so an unknown theme breaks the build. **Reusing
another presentation's theme is just referencing the same name** — the CSS block is shared, and
editing it updates every deck that uses it.

Included themes: `steel-light` (light), `midnight` (dark), `hud` (dark terminal / monospace).

### Create a new theme

1. `src/themes/<name>/theme.css` with a token-only block:

   ```css
   @layer theme {
     :root[data-theme='<name>'] {
       --bg-a: #...;
       --bg-b: #...;
       --shade: #...;
       --ink: #...;
       --ink-dim: #...;
       --accent: #...;
       --glow: R, G, B;
       --radius: 44px;
       --font: 'Manrope Variable', system-ui, sans-serif;
       --font-head: 'Quicksand Variable', system-ui, sans-serif;
     }
   }
   ```

2. Import it in `src/themes/themes.css`.
3. Register it in `src/themes/registry.ts`.

The structural layout (slide template, typography, chrome) lives once in `src/themes/_base.css`
and reads those tokens, so a new theme is ~10 lines of variables. (The `hud` theme is larger and
split into `hud/_tokens.css`, `_identity.css`, `_cards.css`, `_frames.css` behind `hud/theme.css`.)

## Presenting shortcuts

| Key                | Action                       |
| ------------------ | ---------------------------- |
| Arrows / Space     | Next / previous              |
| `F`                | Full screen                  |
| `O` or `Esc`       | Overview (grid)              |
| `S`                | Speaker view (notes + timer) |
| `B` or `.`         | Black screen (pause)         |
| `Ctrl/Cmd + click` | Zoom lens                    |

## Export to PDF

Open the deck with `?print-pdf` appended to the URL
(`http://localhost:4321/presentations/decks/<slug>?print-pdf`) and print to PDF from the browser
(margins: none; background graphics: on).

## Structure

```
src/
  content.config.ts                   # "decks" collection + schema (validates theme)
  content/decks/<slug>/               # one folder per presentation
    index.md | index.mdx
    images/
  themes/
    registry.ts                       # named themes (source of truth)
    themes.css                        # base + all themes (loaded once)
    _base.css                         # structural layout (reads tokens)
    <theme>/theme.css                 # token-only block per theme
    hud/{_tokens,_identity,_cards,_frames}.css  # hud split behind hud/theme.css
  components/
    Slide.astro                       # image + title slide (MDX)
    DeckNav.astro                     # floating "Liquid Glass" deck control
    hud/{HudSlide,KvCard,Chat,Headers}.astro    # HUD content components
  layouts/RevealLayout.astro          # reveal.js shell
  scripts/deck-init.ts                # client: reveal init + fullscreen
  plugins/rehype-reveal-sections.ts   # splits plain .md into <section>
  pages/
    index.astro                       # gallery grouped by category
    decks/[...slug].astro             # single route that renders any deck
```
