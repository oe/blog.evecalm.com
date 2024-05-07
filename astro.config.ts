import { defineConfig, squooshImageService } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import react from '@astrojs/react'
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';


// https://astro.build/config
export default defineConfig({
  markdown: {
    rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: 'prepend' }]],
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
