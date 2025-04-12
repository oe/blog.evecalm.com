/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      typography: () => ({
        DEFAULT: {
          css: {
            h1: {
              fontSize: '1.875rem', // 30px
              lineHeight: '2.25rem',
              fontWeight: '700',
            },
            h2: {
              fontSize: '1.5rem',   // 24px
              marginTop: '1.5rem',
              lineHeight: '2rem',
              fontWeight: '600',
            },
            h3: {
              fontSize: '1.25rem',  // 20px
              lineHeight: '1.75rem',
              fontWeight: '600',
            },
            h4: {
              fontSize: '1.125rem', // 18px
              lineHeight: '1.5rem',
              fontWeight: '500',
            },
          },
        },
      }),
    },
  },
}