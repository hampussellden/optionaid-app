/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './containers/**/*.{js,ts,jsx,tsx,mdx}',
    './views/**/*.{js,ts,jsx,tsx,mdx}',
    './animations/**/*.{js,ts,jsx,tsx,mdx}',
    './blocks/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        foreground: 'hsl(var(--foreground))',
        text: 'hsl(var(--text))',
        background: 'rgb(var(--background))',
        primary: 'hsl(var(--primary))',
        secondary: 'hsl(var(--secondary))',
        accent: 'hsl(var(--accent))',
        primaryHover: 'hsl(var(--primary-hover))',
        secondaryHover: 'hsl(var(--secondary-hover))',
        accentHover: 'hsl(var(--accent-hover))',
        static: 'hsl(var(--static))',
        btn: {
          background: 'hsl(var(--btn-background))',
          'background-hover': 'hsl(var(--btn-background-hover))',
        },
      },
      spacing: {
        128: '32rem',
        144: '36rem',
        160: '40rem',
      },
      gridTemplateColumns: {
        adminGrid: 'auto 1fr',
      },
      scrollbar: {
        background: {
          trackColor: '#000000', // Your desired track color
        },
      },
    },
  },
  variants: {
    extend: {
      width: ['hover'],
    },
  },
  plugins: [require('tailwind-scrollbar')({ nocompatible: true })],
};
