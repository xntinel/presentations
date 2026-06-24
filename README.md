# Presentaciones

Biblioteca personal de presentaciones. Cada deck es una carpeta; la home
(`/`) es una galeria que las agrupa por categoria y deja abrir cualquiera a
pantalla completa. Hecha con **Astro 7** + **reveal.js 6**.

## Como se usa

```bash
pnpm dev      # servidor de desarrollo en http://localhost:4321
pnpm build    # exporta el sitio estatico a dist/
pnpm preview  # previsualiza el build de produccion
```

Dev server en segundo plano:

```bash
pnpm exec astro dev --background   # arranca sin bloquear la terminal
pnpm exec astro dev status         # estado
pnpm exec astro dev logs           # logs
pnpm exec astro dev stop           # detener
```

Nota: si cambias `src/content.config.ts`, reinicia el dev server.

## Anadir una presentacion

Una presentacion = una carpeta en `src/content/decks/<slug>/` con un archivo
`index.md` o `index.mdx` y sus imagenes co-localizadas en `images/`. Aparece
sola en la galeria; no hay que tocar codigo.

Frontmatter:

```yaml
---
title: Titulo de la charla       # obligatorio
description: Resumen corto        # opcional, se muestra en la tarjeta
category: Charlas                 # agrupa en la home (default: "Sin categoria")
pubDate: 2025-06-23               # opcional, ordena por fecha
theme: steel-light               # nombre de un tema del registro
cover: ./images/cover.jpg        # portada optimizada de la tarjeta
coverAlt: Texto alternativo       # opcional
draft: false                     # true = no se publica
---
```

### Markdown plano (`index.md`)

Lo mas simple. Las diapositivas se separan con `---` (linea sola) y las notas
del ponente empiezan con `Note:`.

```markdown
# Primera diapositiva

Contenido.

Note: Notas del ponente de esta diapositiva.

---

## Segunda diapositiva
```

### MDX con la plantilla de imagen (`index.mdx`)

Para el estilo imagen a sangre + titulo superpuesto, usa el componente
`<Slide>` (importa imagenes para que `astro:assets` las optimice):

```mdx
import Slide from '../../../components/Slide.astro';
import cover from './images/cover.jpg';

<Slide img={cover} cover eager note={`Notas del ponente.`}>
  <h1>Titulo de portada</h1>
</Slide>

<Slide img={cover} note={`Mas notas.`}>
  <h2>Otra diapositiva</h2>
</Slide>
```

## Temas (individuales y reutilizables)

Los temas son entidades con nombre en `src/themes/registry.ts`. Cada deck
declara `theme: <nombre>` en su frontmatter; el esquema valida ese nombre, asi
que un tema inexistente rompe el build. **Reusar el tema de otra presentacion
es solo referenciar el mismo nombre**: el bloque CSS se comparte, editarlo
actualiza todos los decks que lo usan.

Temas incluidos: `steel-light` (claro), `midnight` (oscuro).

### Crear un tema nuevo

1. `src/themes/<nombre>/theme.css` con un bloque de solo tokens:

   ```css
   @layer theme {
     :root[data-theme='<nombre>'] {
       --bg-a: #...; --bg-b: #...; --shade: #...;
       --ink: #...; --ink-dim: #...; --accent: #...;
       --glow: R, G, B; --radius: 44px;
       --font: 'Manrope Variable', system-ui, sans-serif;
       --font-head: 'Quicksand Variable', system-ui, sans-serif;
     }
   }
   ```

2. Importalo en `src/themes/themes.css`.
3. Registralo en `src/themes/registry.ts`.

La maquetacion estructural (plantilla de diapositiva, tipografia, cromos) vive
una sola vez en `src/themes/_base.css` y lee esos tokens; un tema nuevo son
solo ~10 lineas de variables.

## Atajos al presentar

| Tecla | Accion |
|-------|--------|
| Flechas / Espacio | Avanzar y retroceder |
| `F` | Pantalla completa |
| `O` o `Esc` | Vista general (rejilla) |
| `S` | Vista del ponente (notas + temporizador) |
| `B` o `.` | Pantalla en negro (pausa) |
| `Ctrl/Cmd + click` | Lupa de zoom |

## Exportar a PDF

Abre el deck anadiendo `?print-pdf` a la URL
(`http://localhost:4321/decks/<slug>?print-pdf`) e imprime a PDF desde el
navegador (margenes: ninguno; graficos de fondo: activado).

## Estructura

```
src/
  content.config.ts            # coleccion "decks" + esquema (valida tema)
  content/decks/<slug>/        # una carpeta por presentacion
    index.md | index.mdx
    images/
  themes/
    registry.ts                # temas con nombre (fuente de verdad)
    themes.css                 # base + todos los temas (se carga una vez)
    _base.css                  # maquetacion estructural (lee tokens)
    <tema>/theme.css           # bloque de solo tokens por tema
  components/Slide.astro       # diapositiva imagen + titulo (MDX)
  layouts/RevealLayout.astro   # shell de reveal.js + init
  plugins/rehype-reveal-sections.mjs  # parte los .md en <section>
  pages/
    index.astro                # galeria agrupada por categoria
    decks/[...slug].astro      # ruta unica que renderiza cualquier deck
```
