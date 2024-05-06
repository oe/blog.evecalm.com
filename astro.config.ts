import { defineConfig, squooshImageService } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import react from '@astrojs/react'

// https://astro.build/config
export default defineConfig({
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
