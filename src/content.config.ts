import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { themeNames } from './themes/registry';

// One presentation = one folder src/content/decks/<slug>/ with index.md|mdx
// and co-located images in images/. Adding a deck = adding a folder.
const decks = defineCollection({
  loader: glob({ base: './src/content/decks', pattern: '**/index.{md,mdx}' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string().optional(),
      // Category used to group decks on the home page (not tied to the on-disk folder).
      category: z.string().default('Sin categoria'),
      pubDate: z.coerce.date().optional(),
      draft: z.boolean().default(false),
      // Cover image optimized for the gallery (astro:assets).
      cover: image().optional(),
      coverAlt: z.string().default(''),
      // Theme validated against the registry: an unknown name breaks the build.
      theme: z.enum(themeNames).default('steel-light'),
    }),
});

export const collections = { decks };
