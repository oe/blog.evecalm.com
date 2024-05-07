// import Typography from '@tailwindcss/typography'
import Typography from 'flowbite-typography'
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'media',
  theme: {
    extend: {
      screens: {
        xs: '380px',
      },
    },
  },
  plugins: [Typography],
}

