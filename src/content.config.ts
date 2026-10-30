import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const nieuws = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/nieuws' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    cover: z.string().optional().nullable(),
    samenvatting: z.string().optional().nullable(),
    concept: z.boolean().optional().default(false),
  }),
});

export const collections = { nieuws };
