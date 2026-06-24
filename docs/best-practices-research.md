# Mejores practicas de presentaciones (investigacion basada en evidencia)

Investigacion multi-fuente con verificacion adversarial (24 de 25 afirmaciones
confirmadas por mayoria 3-0, 1 refutada). Enfoque: decks minimalistas guiados por
imagen, donde cada diapositiva es un titulo corto sobre una foto a pantalla completa,
para una charla hablada.

Prioridad de fuentes: investigacion peer-reviewed (Mayer, Sweller, Garner & Alley),
WCAG (W3C) y canon practico (Reynolds/Duarte/Tufte).

## Resumen

La evidencia converge fuerte para un deck imagen + titulo:

1. Quita todo lo que no sea esencial (principio de coherencia). Es el efecto mas
   grande del corpus de Mayer (g = 1.00).
2. Nunca dupliques en pantalla lo que vas a decir en voz (principio de redundancia):
   compite por la memoria de trabajo y perjudica el aprendizaje, sobre todo si hay
   otra imagen en pantalla.
3. Imagen relevante (canal visual) + narracion (canal verbal) es el emparejamiento
   optimo: son dos canales separados de capacidad limitada.
4. Estructura assertion-evidence (titulo = una asercion con sentido + imagen de apoyo,
   sin vinetas) supero a las diapositivas de vinetas en comprension (d = 0.81) y
   recuerdo a 10 dias (d = 0.89), con menor esfuerzo percibido (d = -0.50).
5. Contraste WCAG SC 1.4.3 (AA) es el limite duro: 4.5:1 texto normal, 3:1 texto
   grande. Texto sobre imagen sin contraste suficiente es un fallo documentado (F83);
   se corrige con un scrim/sombreado detras del texto.

## Hallazgos verificados

### 1. Coherencia: elimina lo decorativo (evidencia: alta, 3-0)
Quitar "detalle seductor" produjo el mayor efecto del corpus de Mayer (g = 1.00).
Cada diapositiva: una idea, una foto relevante a pantalla completa, un titulo corto.
Sin logos, pies de pagina, graficos decorativos ni chartjunk.
Fuente: Cromley & Chen (2025), meta-analisis multinivel (92 articulos, 181 estudios).
https://www.sciencedirect.com/science/article/pii/S1747938X25000673
Matiz: son estimaciones dentro del corpus de Mayer, mayores que meta-analisis
independientes. Toma la magnitud como cota superior; el ranking relativo es lo robusto.

### 2. No todas las guias estan bien soportadas (alta, 3-0)
Ocho principios de Mayer (animacion, pre-training, voz, inmersion, segmentacion,
evitar subtitulos redundantes, contiguidad, presencia social) no mostraron efectos
significativos. Prioriza los de efecto alto: coherencia, modalidad, multimedia,
personalizacion.
Fuente: Cromley & Chen (2025), mismo enlace.

### 3. Redundancia: no pongas tu guion en pantalla (alta, 3-0)
Informacion identica en varias formas simultaneas aumenta la carga de memoria de
trabajo. Disenos que eliminan lo redundante pueden superar a los que lo incluyen.
Para el deck: nunca pongas el guion (ni frases que leeras literal) en la diapositiva.
Fuentes: Cambridge Handbook (Sweller); Moreno & Mayer (2002).
https://www.cambridge.org/core/books/abs/cambridge-handbook-of-multimedia-learning/redundancy-principle-in-multimedia-learning/448A5532008EB4B4BA17DBEB5A421920
https://tecfa.unige.ch/tecfa/teaching/methodo/MorenoMayer2002.pdf

### 4. Limite de la redundancia (alta, 3-0)
Texto en pantalla identico a la narracion solo ayuda si NO hay otro material visual
compitiendo; con una imagen presente, perjudica por atencion dividida. En una
diapositiva titulo-sobre-foto siempre hay imagen: manten el titulo minimo y no lo
leas literal mientras narras. Secuencial supero a simultaneo en transferencia,
F(1,65) = 10.69, p < .01.
Fuente: Moreno & Mayer (2002), mismo enlace.

### 5. Doble canal: imagen + narracion (alta para doble canal 3-0; multimedia 2-1)
El sistema humano procesa lo visual/pictorico y lo auditivo/verbal en dos canales
separados de capacidad limitada. Foto relevante + narracion evita sobrecargar un
canal. Precondicion: la imagen debe ser topicamente RELEVANTE; una foto puramente
decorativa puede anadir carga extranea (coherencia).
Fuente: Cambridge Handbook (Mayer, CTML).
https://www.cambridge.org/core/books/abs/cambridge-handbook-of-multimedia-learning/cognitive-theory-of-multimedia-learning/A49922ACB5BC6A37DDCCE4131AC217E5

### 6. Assertion-evidence: titulo = asercion, no etiqueta (alta, 3-0)
Sustituye titulos de tema/una palabra por una asercion corta (el mensaje de la
diapositiva) apoyada por una imagen explicativa, sin vinetas. Experimento controlado
(n = 110): comprension 9.39 vs 6.73/15, t(93.43) = 3.67, p < 0.001, d = 0.81;
recuerdo a 10 dias d = 0.89; menor esfuerzo mental d = -0.50.
Fuente: Garner & Alley (2013), Int. J. Engineering Education.
https://writing.engr.psu.edu/ae_comprehension.pdf
Matiz: un solo experimento, un tema, muestra de ingenieria, carga cognitiva
autoinformada. Fuerte pero no consenso multi-estudio. El titulo-asercion roza la
redundancia si se lee literal: dejalo como apoyo visual, narra alrededor.

### 7. Anti-patron: diapositivas con mucho texto (alta, 3-0)
En 50 clases de medicina, los alumnos vieron diapositivas con texto denso (>10
palabras) el 84.4% del tiempo, media de 38.2 palabras por diapositiva. Evita
parrafos, listas de vinetas o el guion verbatim.
Fuente: Le Blanc & Cooper (2026), The Clinical Teacher.
https://pmc.ncbi.nlm.nih.gov/articles/PMC12691884/

### 8. Contraste WCAG SC 1.4.3 AA (alta, 3-0)
4.5:1 para texto normal; 3:1 para texto grande (>=18pt, o >=14pt bold; ~24px, o
~18.5px bold). Los titulos grandes a pantalla completa suelen calificar para 3:1,
pero usar 4.5:1 como base es defendible.
Fuentes: W3C WCAG 2.2 / 2.1 Understanding 1.4.3, Tecnica G18.
https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html
https://www.w3.org/TR/WCAG20-TECHS/G18.html

### 9. Titulo sobre foto sin contraste = fallo F83; arregla con scrim (alta, 3-0)
Texto sobre imagen de fondo sin contraste suficiente es un fallo documentado (F83).
Solucion (G18): sombrear el area detras de las letras para que el peor pixel cumpla la
ratio. En reveal.js: scrim/gradiente semitransparente detras del titulo, fuerte como
para que el peor caso siga cumpliendo.
Fuentes: W3C F83 y G18.
https://www.w3.org/WAI/WCAG21/Techniques/failures/F83
https://www.w3.org/TR/WCAG20-TECHS/G18.html

## Afirmacion refutada (excluida)

"El principio multimedia produce efectos ~2x mayores que otros tipos de multimedia en
todos los resultados." Refutada 0-3. El principio multimedia es solido para imagenes
RELEVANTES/explicativas, no para cualquier imagen. Fuente: Cromley & Chen (2025).

## Preguntas abiertas (sub-evidenciadas)

- Numero optimo de diapositivas y ritmo para una charla CORTA: el corpus apoya el
  diseno por-diapositiva y una-idea-por-diapositiva, pero no surgio guia basada en
  evidencia sobre conteo total, senalizacion o estructura de apertura/cierre en vivo.
- Longitud optima del titulo-asercion sin disparar costes de redundancia al leerlo.
- Efecto neto de fotos topicas pero NO explicativas (metaforicas) frente a un fondo
  plano: ayuda, perjudica o es neutro (no resuelto).
- Generalizacion de assertion-evidence/CTML (derivado de contextos de aprendizaje
  STEM/medicina) a charlas persuasivas donde el objetivo es influir, no retener.

## Advertencias sobre la fuerza de la evidencia

Las magnitudes grandes (g = 1.00) vienen de un meta-analisis del propio corpus de
Mayer, que corre mayor que meta-analisis independientes. Trata las magnitudes
absolutas como cotas superiores y el ranking relativo como lo robusto. Las cifras
WCAG son estables y vigentes a 2026 (2.2 mantiene 1.4.3 sin cambios); F83 es una
tecnica de fallo informativa, no normativa, y solo aplica cuando el contraste es
realmente insuficiente.
