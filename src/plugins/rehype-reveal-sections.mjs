/**
 * rehype-reveal-sections
 *
 * Convierte un deck en Markdown PLANO en las <section> que reveal.js espera:
 *   - separa las diapositivas por `---` (linea sola -> <hr> tras el render),
 *   - envuelve cada grupo en <section>,
 *   - convierte un parrafo que empieza por `Note:` en <aside class="notes">.
 *
 * Decks MDX (con <Slide> o JSX propio) se DEJAN INTACTOS: si el arbol contiene
 * nodos MDX (mdxJsx*) o ya trae <section>, el plugin no toca nada. El
 * discriminador principal es: solo transforma Markdown plano.
 */
export default function rehypeRevealSections() {
  return (tree) => {
    const children = tree.children || [];

    // Si es un deck MDX (componentes) o ya tiene <section>, no transformar.
    const isAuthored = children.some(
      (node) =>
        (node.type && node.type.startsWith('mdxJsx')) ||
        (node.type === 'element' && node.tagName === 'section'),
    );
    if (isAuthored) return;

    // Solo nos interesan los nodos de contenido (ignora texto en blanco).
    const content = children.filter(
      (node) => !(node.type === 'text' && node.value.trim() === ''),
    );
    if (content.length === 0) return;

    // Parte en grupos por cada <hr> (procedente de `---`).
    const groups = [];
    let current = [];
    for (const node of content) {
      if (node.type === 'element' && node.tagName === 'hr') {
        groups.push(current);
        current = [];
      } else {
        current.push(node);
      }
    }
    groups.push(current);

    const sections = groups
      .filter((group) => group.length > 0)
      .map((group) => {
        const frame = extractFrame(group);
        return {
          type: 'element',
          tagName: 'section',
          properties: frame.className ? { className: frame.className } : {},
          children: frame.children.map(toNotesIfNeeded),
        };
      });

    tree.children = sections;
  };
}

/**
 * Directiva `Frame: <clases>` como parrafo de una diapositiva: aplica esas
 * clases a la <section> para SOLO sobrescribir el clip-path del marco (no toca
 * position/padding, asi reveal mantiene su layout). Elimina el parrafo.
 */
function extractFrame(group) {
  for (let i = 0; i < group.length; i++) {
    const node = group[i];
    if (node.type !== 'element' || node.tagName !== 'p') continue;
    const first = node.children && node.children[0];
    if (!first || first.type !== 'text' || !/^Frame:/.test(first.value)) continue;
    const raw = node.children
      .map((c) => (c.type === 'text' ? c.value : ''))
      .join('')
      .replace(/^Frame:\s*/, '')
      .trim();
    const className = raw.split(/\s+/).filter(Boolean);
    const children = group.slice(0, i).concat(group.slice(i + 1));
    return { className, children };
  }
  return { className: null, children: group };
}

/** Convierte <p>Note: ...</p> en <aside class="notes">...</aside>. */
function toNotesIfNeeded(node) {
  if (node.type !== 'element' || node.tagName !== 'p') return node;
  const first = node.children[0];
  if (!first || first.type !== 'text' || !/^Note:/.test(first.value)) return node;

  const stripped = node.children.map((child, i) =>
    i === 0 && child.type === 'text'
      ? { ...child, value: child.value.replace(/^Note:\s*/, '') }
      : child,
  );

  return {
    type: 'element',
    tagName: 'aside',
    properties: { className: ['notes'] },
    children: stripped,
  };
}
