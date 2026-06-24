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
      .map((group) => ({
        type: 'element',
        tagName: 'section',
        properties: {},
        children: group.map(toNotesIfNeeded),
      }));

    tree.children = sections;
  };
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
