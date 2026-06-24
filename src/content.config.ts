import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { themeNames } from './themes/registry';

// Una presentacion = una carpeta src/content/decks/<slug>/ con index.md|mdx
// e imagenes co-localizadas en images/. Anadir un deck = anadir una carpeta.
const decks = defineCollection({
  loader: glob({ base: './src/content/decks', pattern: '**/index.{md,mdx}' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string().optional(),
      // Categoria para agrupar en la home (no atada a la carpeta en disco).
      category: z.string().default('Sin categoria'),
      pubDate: z.coerce.date().optional(),
      draft: z.boolean().default(false),
      // Portada optimizada para la galeria (astro:assets).
      cover: image().optional(),
      coverAlt: z.string().default(''),
      // Tema validado contra el registro: un nombre inexistente rompe el build.
      theme: z.enum(themeNames).default('steel-light'),
    }),
});

export const collections = { decks };
