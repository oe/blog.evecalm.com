import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react'
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeExternalLinks from 'rehype-external-links';
import remarkInsertAd from './scripts/remark-insert-ad';

// https://astro.build/config
export default defineConfig({
  markdown: {
    remarkPlugins: [
      remarkInsertAd,
    ],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: 'prepend' }],
      [
        rehypeExternalLinks,
        {
          target: '_blank',
          rel: ['noopener', 'nofollow']
        }
      ]
    ]
  },
  site: 'https://blog.evecalm.com',
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()]
  },
  // trailingSlash: 'never',
  build: {
    format: 'preserve'
  }
});
