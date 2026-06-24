# Instrucción para el agente de revisión de arquitectura (loop, 5 iteraciones)

Pásale el bloque "PROMPT" de abajo a un agente especializado (general-purpose) ejecutándose
con `/loop` autopautado. Una dimensión por iteración, exactamente 5, y para tras la 5.

## Cómo lanzarlo

```
/loop Ejecuta UNA iteración de la revisión de arquitectura descrita en
docs/arch-review-agent.md. Lee primero docs/architecture-review.md para saber qué
iteración toca (1..5) y no repetir trabajo. Si ya existe la iteración 5 completada, NO
hagas nada y termina el loop.
```

`/loop` sin intervalo se autopauta: el agente decide cuándo seguir. El estado vive en
`docs/architecture-review.md` (lo crea la iteración 1), así cada tick sabe dónde retomar.

---

## PROMPT (instrucción que ejecuta el agente cada iteración)

Eres un arquitecto de software senior auditando este proyecto. Stack: Astro 7,
`@astrojs/mdx` 7, reveal.js 6, augmented-ui, sharp; gestor pnpm; Node >=22. Es un sitio
estático de presentaciones: cada deck es una carpeta `src/content/decks/<slug>/index.{md,mdx}`
de una content collection, renderizada por reveal.js.

### Contexto de arquitectura (ya investigado, no lo redescubras desde cero)

- `src/content.config.ts`: define la colección `decks` con `glob` y un schema Zod; `theme`
  es un `z.enum(themeNames)` validado contra `src/themes/registry.ts` (un tema inexistente
  rompe el build, por diseño).
- `src/plugins/rehype-reveal-sections.mjs`: convierte decks en Markdown PLANO en las
  `<section>` de reveal (parte por `---`, transforma `Note:` y `Frame:`). Si el árbol ya
  trae nodos MDX/JSX o `<section>`, NO toca nada: los decks MDX se autoescriben.
- `src/layouts/RevealLayout.astro`: shell único de reveal.js (estilos, fuentes, nav glass,
  script de init). 340 líneas, mezcla markup + CSS embebido + script.
- `src/pages/decks/[...slug].astro`: ruta dinámica que renderiza cualquier deck; consulta
  la colección una sola vez en `getStaticPaths`.
- `src/pages/index.astro`: galería/home (205 líneas).
- Temas: `src/themes/_base.css` (base), un `theme.css` por tema (`hud` 1587 líneas,
  `midnight`, `steel-light`), `themes.css` (agregador) y `registry.ts` (nombres válidos).
- Componentes: `Slide.astro` (slide con imagen), y `HudSlide/KvCard/Chat/Headers.astro`
  (slides de contenido tipo terminal/HUD).
- Decks de ejemplo: `hackergpt-osint` (mdx, tema hud), `hardest-workers` (mdx, steel-light),
  `work-smarter-checklist` (md).

### Reglas de operación (TODAS las iteraciones, sin excepción)

1. NUNCA emojis ni símbolos decorativos (estrellas, checks, triángulos, warnings). Texto
   plano. En tablas usa "OK"/"FAIL" o "sí"/"no".
2. Read-first: antes de cambiar nada, lee de forma EXHAUSTIVA todos los archivos relevantes
   a la dimensión de esta iteración. No hagas spot-checks.
3. Verifica build ANTES y DESPUÉS de tus cambios con `pnpm build` (o `pnpm exec astro build`).
   Si el build se rompe por tu cambio: revierte el cambio y repórtalo como hallazgo, no lo
   dejes roto. La integridad del build > completar la iteración.
4. Aplica solo mejoras SEGURAS y reversibles (renombrados claros, extracción de duplicación,
   borrado de muerto, fixes de docs, modularización sin cambio de comportamiento). Los
   cambios arriesgados o que alteren el render: NO los apliques, documéntalos como
   recomendación con su justificación y un plan.
5. Respeta `docs/design-decisions.md`: no deshagas decisiones estéticas/UX ya acordadas
   (chip de contraste, glow, minimalismo, imágenes metafóricas). Si crees que algo de ahí
   está mal, anótalo como recomendación, no lo cambies.
6. No hagas commits ni push. Deja los cambios en el working tree.
7. Mantén los diffs enfocados a la dimensión de la iteración. No mezcles dimensiones.
8. Verificación de render: para cambios que toquen temas/componentes/plugin, confirma que
   la salida HTML en `dist/` mantiene la estructura esperada (secciones, notas, clases de
   marco, tarjetas) comparando conteos antes/después.

### Estado y reporte

- Mantén `docs/architecture-review.md` como bitácora. La iteración 1 lo crea con un
  encabezado y una sección por iteración. Cada iteración AÑADE su sección (no reescribe las
  anteriores) con: dimensión, hallazgos (con `archivo:línea`), cambios aplicados, cambios
  diferidos/recomendaciones, y estado del build (OK/FAIL).
- Al empezar, LEE esa bitácora para saber qué iteración corresponde y no repetir.

### Plan de las 5 iteraciones (una por tick)

**Iteración 1 — Estructura del repo, higiene y límites de módulos.**
Audita layout de carpetas, convenciones de nombres y separación de responsabilidades
(content / components / layouts / pages / plugins / themes). Detecta: archivos muertos o
fuera de sitio (PNGs sueltas en la raíz, logs de `.playwright-mcp/` versionados), duplicación
de documentación (`AGENTS.md` vs `CLAUDE.md`), `.gitignore` incompleto, assets que deberían
estar en `public/` o co-localizados. Aplica limpieza segura (mover/ignorar/borrar muertos);
no toques código de runtime aún. Crea la bitácora.

**Iteración 2 — Pipeline de contenido y componentes.**
Revisa `content.config.ts`, `rehype-reveal-sections.mjs` y los componentes `Slide/HudSlide/
KvCard/Chat/Headers`. Evalúa: coherencia MD vs MDX entre decks, robustez del plugin (casos
borde de `Frame:`/`Note:`, qué pasa con MDX que sí use `---`), tipado de props, reutilización
y posible duplicación entre componentes, validación del schema. Aplica mejoras seguras (tipos,
JSDoc, extracción de helpers) verificando que el render de los 3 decks no cambie.

**Iteración 3 — Sistema de temas y CSS.**
Foco en `_base.css`, `themes.css`, `registry.ts` y los `theme.css` (sobre todo `hud`, 1587
líneas). Busca: CSS muerto, duplicación entre temas, tokens/variables inconsistentes, reglas
que podrían vivir en `_base`, oportunidades de modularizar el `hud` por bloques (chat, kv-card,
ep-card, marcos `fr-*`) sin cambiar el resultado visual. Aplica solo refactors de CSS que NO
alteren el render (verifícalo). Lo que cambie apariencia: recomendación.

**Iteración 4 — Layout, routing, build, deploy y DX.**
Revisa `RevealLayout.astro` (separación markup/CSS/script), `[...slug].astro`, `index.astro`,
`astro.config.mjs`, `tsconfig.json`, `.github/workflows/deploy.yml`, `package.json` y
`AGENTS.md`/`CLAUDE.md`. Verifica: que las instrucciones de dev sean correctas (¿`astro dev
--background` es real o conviene background del harness?), `base`/`site` coherentes con el
deploy a GitHub Pages, scripts faltantes (typecheck/lint/format), performance (carga de
fuentes, imágenes), pinning de versiones. Aplica fixes seguros de config y docs.

**Iteración 5 — Consolidación y cierre.**
Revisión transversal: coherencia global tras las iteraciones 1-4, accesibilidad básica
(landmarks, foco, contraste ya documentado), y ACTUALIZA la documentación de arquitectura
para que refleje el estado real (corrige referencias obsoletas, p. ej. cualquier mención a
rutas que ya no existen como `src/styles/theme.css`). Cierra `docs/architecture-review.md`
con un resumen ejecutivo: mejoras aplicadas, deuda técnica restante priorizada, y build final
en verde. Marca la iteración 5 como completada (para que el loop termine).

### Criterio de terminación

El loop para cuando la bitácora registra la iteración 5 como completada. Si un tick detecta
que ya está, no hace nada y finaliza.
