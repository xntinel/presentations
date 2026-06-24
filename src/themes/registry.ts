// Registro de temas: la unica fuente de verdad de los temas disponibles.
//
// Cada deck declara `theme: <nombre>` en su frontmatter. El esquema de la
// coleccion valida ese nombre contra esta lista (z.enum), asi que un tema
// inexistente rompe el build. Reusar el tema de otra presentacion es solo
// referenciar el mismo nombre: el bloque CSS se comparte, no se copia.
//
// Para anadir un tema:
//   1. crea src/themes/<nombre>/theme.css con un bloque [data-theme="<nombre>"]
//   2. importalo en src/themes/themes.css
//   3. anade la entrada aqui

export const themes = {
  'steel-light': { label: 'Steel Light' },
  midnight: { label: 'Midnight' },
  hud: { label: 'HUD' },
} as const;

export type ThemeName = keyof typeof themes;

// Tupla no vacia para z.enum() en content.config.ts
export const themeNames = Object.keys(themes) as [ThemeName, ...ThemeName[]];
