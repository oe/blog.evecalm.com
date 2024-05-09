import { defineConfig, squooshImageService } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import react from '@astrojs/react'
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeExternalLinks from 'rehype-external-links';


// https://astro.build/config
export default defineConfig({
  markdown: {
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: 'prepend' }],
      [rehypeExternalLinks, {
        target: '_blank', rel: ['noopener', 'nofollow'],
      }]
    ],
  },
  image: {
    service: squooshImageService(),
  },
  site: 'https://blog.evecalm.com',
  integrations:[
    tailwind(),
    react(),
  ],
  // trailingSlash: 'never',
  build: {
    format: 'preserve',
  }
});
