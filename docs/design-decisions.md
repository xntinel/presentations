# Decisiones de diseno del deck (mapeo evidencia -> implementacion)

Como cada hallazgo de [best-practices-research.md](./best-practices-research.md) se
aplica en este deck (Astro + reveal.js, 4 diapositivas, titulo sobre foto).

Resultado general: al iterar el diseno ya convergimos en el patron que la evidencia
respalda (minimalismo, una idea + una imagen relevante + titulo-asercion corto, sin
vinetas). La investigacion validó el diseno; el unico ajuste accionable nuevo fue
reforzar el margen de contraste del titulo.

## Mapeo

| Hallazgo (evidencia) | Estado en el deck | Implementacion |
|---|---|---|
| 1. Coherencia: quita lo decorativo (g=1.00) | Cumple | Cada slide = 1 imagen relevante + 1 titulo. Sin pie de pagina, sin logo, sin rejilla. Se eliminaron los eyebrows ("01", "A talk...") en una iteracion previa. |
| 2. Prioriza principios de efecto alto | Cumple | El diseno se apoya en coherencia, modalidad, multimedia y personalizacion; no en animaciones ni efectos. Transicion simple `fade`. |
| 3. No pongas el guion en pantalla (redundancia) | Cumple | El guion vive en las notas del ponente (`aside.notes`, tecla S), no en la diapositiva. |
| 4. Limite de redundancia (no leer literal) | Cumple (entrega) | Titulos de 3-6 palabras; las notas indican narrar alrededor, no leer el titulo. Ver "Guia de entrega". |
| 5. Doble canal: imagen relevante + voz | Cumple | Imagenes topicas: silueta al atardecer (la pregunta), corredor (esfuerzo), escalera ascendente (oportunidad), ajedrez (estrategia). Metaforicas-relevantes, no decorativas arbitrarias. |
| 6. Assertion-evidence: titulo = asercion | Cumple | Titulos ya son aserciones, no etiquetas de una palabra: "Hard work is necessary", "But it is not sufficient", "Work smarter, not just harder". La portada es la pregunta-tesis. |
| 7. Anti-patron texto denso (media 38 palabras) | Cumple | 3-6 palabras por diapositiva. Cero vinetas, cero parrafos. |
| 8. Contraste WCAG SC 1.4.3 AA | Cumple (medido) | Ver "Verificacion de contraste". |
| 9. Fallo F83 -> scrim detras del titulo | Cumple | El titulo va en un "chip" de vidrio (scrim translucido oscuro + blur), tecnica G18. |

## Verificacion de contraste (WCAG SC 1.4.3 AA)

Medido en el navegador con la formula de luminancia relativa de WCAG, en el PEOR caso:
texto blanco del titulo sobre el chip compuesto sobre un pixel de fondo blanco puro.

- Color del titulo: rgb(255, 255, 255)
- Chip: rgba(10, 18, 32, 0.66) (reforzado desde 0.62 para mas margen)
- Chip efectivo sobre fondo blanco: ~rgb(96, 101, 111)
- Contraste peor caso: ~6:1 (con 0.62 ya daba 5.28:1)
- Contraste mejor caso (fondo oscuro): ~20:1
- Umbral AA texto normal (4.5:1): CUMPLE
- Umbral AA texto grande (3:1): CUMPLE

El `backdrop-filter: blur` suaviza los extremos del fondo, asi que en la practica el
contraste real es mejor que el peor caso calculado. La garantia no depende del blur:
el scrim opaco por si solo ya cumple, incluso si el navegador no soporta blur.

## Ajuste aplicado tras la investigacion

- Chip del titulo: opacidad 0.62 -> 0.66. Sube el contraste de peor caso de ~5.3:1 a
  ~6:1, dando margen para fotos futuras muy brillantes (robustez ante F83).
  Archivo: `src/styles/theme.css`, regla `.reveal .shot header`.

Todo lo demas ya cumplia; no se cambio para no romper el diseno acordado.

## Guia de entrega (no es codigo, es como presentar)

Derivada de los principios de redundancia y modalidad:

- No leas el titulo en voz alta palabra por palabra; usalo como ancla visual y narra
  el contenido (que vive en las notas del ponente).
- Habla sobre la imagen: la foto (canal visual) + tu voz (canal verbal) es el
  emparejamiento optimo. Evita anadir texto a la diapositiva durante la charla.
- Una idea por diapositiva; si necesitas decir mas, dilo, no lo escribas.

## Tensiones reconocidas

- El "glow" lavanda/acero alrededor de la card es marco estetico elegido por el
  usuario, no contenido que compita con el mensaje; se mantiene. Una lectura purista de
  coherencia lo reduciria, pero el principio aplica al contenido de la diapositiva, que
  ya es minimo.
- Las imagenes son metaforicas-relevantes, no diagramas explicativos. Para maximizar
  aprendizaje puro, lo explicativo supera a lo metaforico (pregunta abierta en la
  investigacion); para una charla persuasiva/argumentativa como esta, la metafora es
  apropiada.
