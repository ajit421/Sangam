// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import { SITE_URL } from './src/data/shop.ts';

export default defineConfig({
  site: SITE_URL,
  vite: { plugins: [tailwindcss()] },
});
