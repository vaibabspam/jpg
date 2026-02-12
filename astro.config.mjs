import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.jpginfotech.com',
  output: 'static',
  integrations: [tailwind(), sitemap()],
  vite: {
    build: {
      target: 'es2022'
    }
  }
});
