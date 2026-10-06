// @ts-check
import { defineConfig } from 'astro/config';

import svelte from '@astrojs/svelte';

import tailwindcss from '@tailwindcss/vite';

import { satteri } from '@astrojs/markdown-satteri';

import { externalLinks } from './src/markdown/external-links.js';

// https://astro.build/config
export default defineConfig({
  integrations: [svelte()],

  markdown: {
    processor: satteri({ hastPlugins: [externalLinks] }),
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark' },
      defaultColor: 'light-dark()',
    },
  },

  vite: {
    plugins: [tailwindcss()]
  }
});
