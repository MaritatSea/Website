import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const schema = z.object({
    title: z.string(),
    date: z.coerce.date(),
    cover: z.string().optional().nullable(),
    samenvatting: z.string().optional().nullable(),
    concept: z.boolean().optional().default(false),
});

const nieuws = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/nieuws' }),
  schema,
});

// Engelstalige berichten
const news = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/news' }),
  schema,
});

export const collections = { nieuws, news };
