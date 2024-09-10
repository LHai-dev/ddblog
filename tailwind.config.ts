import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}', // Tailwind will scan these directories for class usage
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            h1: {
              color: '#333',
              fontWeight: '700',
            },
            p: {
              marginBottom: '1em',
              lineHeight: '1.75',
            },
            a: {
              color: '#3182ce',
              '&:hover': {
                color: '#2c5282',
              },
            },
            code: {
              backgroundColor: '#f9fafb',
              padding: '0.2em 0.4em',
              borderRadius: '0.25rem',
            },
          },
        },
      },
      colors: {
        background: 'var(--background)',  // Custom CSS variable for background color
        foreground: 'var(--foreground)',  // Custom CSS variable for foreground color
      },
      fontFamily: {
        notoSansKhmer: ['var(--font-notoSansKhmer)', 'sans-serif'], // Fallback to sans-serif if custom font fails
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
};

export default config;
