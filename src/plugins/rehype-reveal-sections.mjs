/**
 * rehype-reveal-sections
 *
 * Turns a PLAIN Markdown deck into the <section> elements reveal.js expects:
 *   - splits slides on `---` (a lone line -> <hr> after rendering),
 *   - wraps each group in a <section>,
 *   - turns a paragraph starting with `Note:` into <aside class="notes">.
 *
 * MDX decks (with <Slide> or their own JSX) are LEFT UNTOUCHED: if the tree
 * contains MDX nodes (mdxJsx*) or already has a <section>, the plugin does
 * nothing. The key discriminator: it only transforms plain Markdown.
 */
export default function rehypeRevealSections() {
  return (tree) => {
    const children = tree.children || [];

    // If this is an MDX deck (components) or already has a <section>, do not transform.
    const isAuthored = children.some(
      (node) =>
        (node.type && node.type.startsWith('mdxJsx')) ||
        (node.type === 'element' && node.tagName === 'section'),
    );
    if (isAuthored) return;

    // Only content nodes matter (ignore whitespace-only text).
    const content = children.filter(
      (node) => !(node.type === 'text' && node.value.trim() === ''),
    );
    if (content.length === 0) return;

    // Split into groups at each <hr> (produced by `---`).
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
 * `Frame: <classes>` directive written as a slide paragraph: applies those
 * classes to the <section> to override ONLY the frame clip-path (it leaves
 * position/padding alone, so reveal keeps its layout). Removes the paragraph.
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

/** Turns <p>Note: ...</p> into <aside class="notes">...</aside>. */
function toNotesIfNeeded(node) {
  if (node.type !== 'element' || node.tagName !== 'p') return node;
  const first = node.children && node.children[0];
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
