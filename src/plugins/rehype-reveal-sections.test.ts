import { describe, it, expect } from 'vitest';
import rehypeRevealSections from './rehype-reveal-sections';

// The transformer mutates `tree.children` in place. We feed it minimal hast-like
// trees (typed loosely on purpose; the plugin itself is the unit under test).
const transform = rehypeRevealSections();

function root(children: unknown[]): { type: 'root'; children: unknown[] } {
  return { type: 'root', children };
}
function el(
  tagName: string,
  children: unknown[] = [],
  properties: object = {},
) {
  return { type: 'element', tagName, properties, children };
}
function text(value: string) {
  return { type: 'text', value };
}
function p(value: string) {
  return el('p', [text(value)]);
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const run = (tree: any) => {
  transform(tree);
  return tree;
};

describe('rehype-reveal-sections', () => {
  it('splits plain Markdown into one <section> per `---` (hr) group', () => {
    const tree = run(root([p('Slide one'), el('hr'), p('Slide two')]));
    expect(tree.children).toHaveLength(2);
    expect(
      tree.children.every((n: { tagName: string }) => n.tagName === 'section'),
    ).toBe(true);
  });

  it('turns a `Note:` paragraph into <aside class="notes"> with the prefix stripped', () => {
    const tree = run(root([p('Visible title'), p('Note: speaker note')]));
    const section = tree.children[0];
    const aside = section.children.find(
      (n: { tagName?: string }) => n.tagName === 'aside',
    );
    expect(aside).toBeTruthy();
    expect(aside.properties.className).toEqual(['notes']);
    expect(aside.children[0].value).toBe('speaker note');
  });

  it('applies a `Frame:` directive as section classes and removes that paragraph', () => {
    const tree = run(root([p('Frame: fr-bracket'), p('Title')]));
    const section = tree.children[0];
    expect(section.properties.className).toEqual(['fr-bracket']);
    expect(section.children).toHaveLength(1);
    expect(section.children[0].tagName).toBe('p');
  });

  it('leaves MDX trees untouched (mdxJsx* present)', () => {
    const tree = root([
      { type: 'mdxJsxFlowElement', name: 'Slide', children: [] },
    ]);
    const before = tree.children;
    run(tree);
    expect(tree.children).toBe(before);
  });

  it('leaves trees that already contain a <section> untouched', () => {
    const tree = root([el('section', [p('already authored')])]);
    const before = tree.children;
    run(tree);
    expect(tree.children).toBe(before);
  });

  it('ignores whitespace-only text nodes when grouping', () => {
    const tree = run(root([text('\n  '), p('Only slide')]));
    expect(tree.children).toHaveLength(1);
    expect(tree.children[0].tagName).toBe('section');
  });

  it('drops empty groups produced by a leading/trailing `---`', () => {
    const tree = run(root([el('hr'), p('A'), el('hr'), p('B')]));
    expect(tree.children).toHaveLength(2);
    expect(
      tree.children.every((n: { tagName: string }) => n.tagName === 'section'),
    ).toBe(true);
  });

  it('emits no className on a section without a `Frame:` directive', () => {
    const tree = run(root([p('Just a title')]));
    expect(Object.keys(tree.children[0].properties)).toHaveLength(0);
  });
});
