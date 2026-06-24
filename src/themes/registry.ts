// Theme registry: the single source of truth for the available themes.
//
// Each deck declares `theme: <name>` in its frontmatter. The collection schema
// validates that name against this list (z.enum), so an unknown theme breaks
// the build. Reusing another presentation's theme is just referencing the same
// name: the CSS block is shared, not copied.
//
// To add a theme:
//   1. create src/themes/<name>/theme.css with a [data-theme="<name>"] block
//   2. import it in src/themes/themes.css
//   3. add the entry here

export const themes = {
  'steel-light': { label: 'Steel Light' },
  midnight: { label: 'Midnight' },
  hud: { label: 'HUD' },
} as const;

export type ThemeName = keyof typeof themes;

// Non-empty tuple for z.enum() in content.config.ts
export const themeNames = Object.keys(themes) as [ThemeName, ...ThemeName[]];
