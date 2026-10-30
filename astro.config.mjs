// @ts-check
import { defineConfig } from 'astro/config';
import rehypeBase from './src/lib/rehype-base.mjs';

// SITE_URL en BASE_PATH worden in de GitHub-workflow automatisch gezet
// (via actions/configure-pages). Met een eigen domein is BASE_PATH leeg.
const site = process.env.SITE_URL || 'https://www.maritatsea.nl';
const base = (process.env.BASE_PATH || '').replace(/\/$/, '');

export default defineConfig({
  site,
  base: base || '/',
  trailingSlash: 'ignore',
  markdown: {
    rehypePlugins: [rehypeBase(base)],
  },
});
