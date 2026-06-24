// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import rehypeRevealSections from './src/plugins/rehype-reveal-sections.mjs';

// https://astro.build/config
export default defineConfig({
  site: 'https://xntinel.github.io',
  base: '/presentations',
  integrations: [mdx()],
  markdown: {
    // Convierte los decks en Markdown plano (separados por `---`) en las
    // <section> que reveal.js necesita. Los decks MDX usan <Slide> y se omiten.
    rehypePlugins: [rehypeRevealSections],
  },
});
