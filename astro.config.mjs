// @ts-check
import { defineConfig } from 'astro/config';

import svelte from '@astrojs/svelte';

import tailwindcss from '@tailwindcss/vite';

import { satteri } from '@astrojs/markdown-satteri';

import { externalLinks } from './src/markdown/external-links.js';

import { cendreShiki } from './src/markdown/cendre-shiki.js';

// https://astro.build/config
export default defineConfig({
  integrations: [svelte()],

  markdown: {
    processor: satteri({ hastPlugins: [externalLinks] }),
    shikiConfig: { theme: cendreShiki },
  },

  vite: {
    plugins: [tailwindcss()]
  }
});
