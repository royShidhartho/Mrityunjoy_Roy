// @ts-check
import { defineConfig } from 'astro/config';

const site = process.env.PAGES_SITE || 'http://localhost:4321';
const base = process.env.PAGES_BASE || '/';

// https://astro.build/config
export default defineConfig({
  site,
  base,
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'bn'],
    routing: {
      prefixDefaultLocale: true,
    },
  },
});
