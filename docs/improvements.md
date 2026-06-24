# Radical improvement effort

Substantive, high-impact engineering improvements (replaces the halted conservative review in
`architecture-review.md`). Each change is verified: `astro check` (0 errors), `pnpm build` green,
and deck render intact (section/note counts unchanged). The agreed visual design
(`design-decisions.md`) is preserved.

## Done

### Wave A — Quality gates, tooling, type safety, perf cleanup

- **Quality tooling where there was none.** Added Prettier (`.prettierrc.json`, `.prettierignore`)
  and `@astrojs/check` + `typescript` (dev deps). New scripts: `check` (`astro check`), `format`,
  `format:check`. (Formatting is NOT mass-applied — run `pnpm format` when desired; avoids
  cosmetic churn.)
- **CI quality gate.** `deploy.yml` now runs `pnpm check` (typecheck) before `pnpm build`, so a
  type error fails the deploy.
- **Fixed 8 real type errors (typecheck is now green):**
  - Untyped `@fontsource-variable/*` side-effect imports -> ambient module in `src/env.d.ts`.
  - Vendor-prefixed Fullscreen API (`webkit*`) in `RevealLayout.astro` -> typed `FullscreenApi*`
    views (optional methods), making the iOS feature-check meaningful. Behavior identical
    (`??`/`||` equivalent for function-or-undefined operands).
  - `theme` prop tightened from `string` to `ThemeName` (imported from the registry).
- **Modernized deprecated `z` import**: `astro:content` -> `astro:schema` in `content.config.ts`.
- **Performance / dead-weight removal:**
  - Removed the dead `augmented-ui` CSS import from `RevealLayout.astro` (NO deck uses
    `data-augmented-ui`; only the home does, which imports it itself). Deck pages no longer ship
    augmented-ui CSS. Render-neutral (no deck element used it).
  - Removed unused deps `@fontsource-variable/inter` and `@fontsource-variable/space-grotesk`.

### Wave B — Path aliases

- Added `@components`/`@layouts`/`@themes` to `tsconfig.json` `paths`; replaced the
  `../../../components/...` deck imports and the `../themes/...` layout/config imports. Verified:
  aliases resolve in `.astro`, `.ts`, AND `.mdx`; build + `astro check` green; decks unchanged
  (hackergpt 13 sec / 8 kv / 2 chat).

### Wave C — Typed rehype plugin

- Converted `rehype-reveal-sections.mjs` -> `.ts` with `hast` types (`@types/hast`), a `LooseNode`
  type covering the MDX nodes, and explicit casts. Logic identical (only null-coalescing
  equivalent to the originals). Updated the `astro.config.mjs` import. Now under `astro check`.

### Wave E — Tests + CI gate

- Added `vitest` and `src/plugins/rehype-reveal-sections.test.ts` (6 unit tests: hr-splitting,
  `Note:`->aside, `Frame:` classes, MDX-skip, existing-`<section>` skip, whitespace). New `test`
  script. CI (`deploy.yml`) now runs `check -> test -> build`.

### Wave F (part) — Deck scaffold

- `scripts/new-deck.mjs` + `pnpm new-deck <slug> [--theme] [--title]`: scaffolds a valid `.md`
  deck. Smoke-tested (creates a buildable page) and cleaned up.

### Wave D — Architecture split (verified in the browser)

- Extracted `DeckNav.astro` (nav markup + SVG defs + the 166-line `<style>`) and
  `src/scripts/deck-init.ts` (reveal init + fullscreen) out of `RevealLayout.astro` (340 -> ~40
  lines). Verified with Playwright on the served build: 0 console errors, reveal `ready` (13
  slides), `.deck-nav`/`#fs-toggle`/Home present, Liquid Glass `backdrop-filter: url(#liquid-glass)`
  applied (scoped styles moved cleanly).
- Modularized `hud/theme.css` into `_tokens`/`_identity`/`_cards`/`_frames` behind a barrel.
  Render-neutral: bundle rule-set identical (506 rules, 0 added/removed); browser re-check OK
  (kv-card bg `#060a0e`, base-frame `::before` present).
- Moved the HUD components to `src/components/hud/` (`@components/hud/...`) and updated the deck
  imports. Added a `@scripts` path alias.

### Wave F — README

- Rewrote `README.md` (English) to match reality: commands (`check`/`test`/`format`/`new-deck`),
  the CI gate, themes including `hud`, and the `scripts/` + `components/hud/` + hud-split structure
  and `.ts` plugin.

## Follow-up (done) — deprecation migration + formatting

- **Migrated off the deprecated `markdown.rehypePlugins`** to `markdown.processor: unified({...})`
  from `@astrojs/markdown-remark` (added as a direct dep, pinned to `7.2.0` to match Astro and
  avoid a duplicate pipeline). Caught and fixed a build break on the way (the package wasn't
  hoisted, so the bare import failed until added as a direct dep). The build's deprecation warning
  is gone; MD sectioning unchanged (work-smarter 4/2); verified.
- **Applied `pnpm format`** to the code (16 files; Prettier now clean). Hardened `.prettierignore`
  to exclude `src/content` (deck prose/MDX — never auto-format, can affect rendering) and `docs`.
  Render-neutral: re-verified in the browser (0 console errors, reveal ready, nav + kv-card intact).
  The CSS bundle hash changed only because reformatting `.astro` components rotates Astro's
  scoped-style hash (applied to both elements and selectors, so appearance is identical).

## Notes

- `format:check` is intentionally NOT a CI gate (CI = check/test/build), so legacy formatting can't
  fail the pipeline; run `pnpm format` to normalize when desired.

## Final adversarial review (3 reviewers, completed) + fixes

An independent 3-reviewer workflow over the changed surface (layout split / config-CI /
plugin+tests) returned 7 real findings; 1 genuine MAJOR bug, now fixed:

- FIXED (major) `scripts/new-deck.mjs`: the arg parser took the first non-`--` token as the slug,
  so flags BEFORE the slug (`new-deck --theme hud my-deck`) made the flag value ('hud') the slug.
  Rewrote it to separate `--name value` flags from positionals. Verified: flags-first ordering now
  scaffolds the right slug with the right theme.
- FIXED (minor) `new-deck` now validates `--theme` against the registry and fails fast with the
  list of valid themes, instead of deferring to an opaque Zod build error.
- FIXED (nit) restored the original `node.type &&` defensive guard in the plugin's isAuthored check.
- ADDED (nit) 2 more plugin tests (leading/trailing `---` empty-group dropping; no-`Frame:` section
  emits empty properties) -> 8 tests total.
- No action: augmented-ui import removal confirmed safe (no deck uses it).
- Intentional: CI runs check/test/build but not `format:check` (avoids failing on legacy
  formatting); `vitest run` kept strict (fails if all tests vanish).

Re-verified after fixes: `astro check` 0 errors, vitest 8/8, build green.
