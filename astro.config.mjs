// @ts-check
import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import mdx from '@astrojs/mdx';
import rehypeRevealSections from './src/plugins/rehype-reveal-sections.ts';

// https://astro.build/config
export default defineConfig({
  site: 'https://xntinel.github.io',
  base: '/presentations',
  integrations: [mdx()],
  markdown: {
    // Turn plain-Markdown decks (slides split by `---`) into the <section>
    // elements reveal.js needs. MDX decks use <Slide> and are skipped.
    // Plugins go through the unified() processor (the markdown.rehypePlugins
    // shorthand is deprecated in Astro 7).
    processor: unified({
      rehypePlugins: [rehypeRevealSections],
    }),
  },
});
