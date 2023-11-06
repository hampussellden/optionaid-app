/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        foreground: 'hsl(var(--foreground))',
        text: 'hsl(var(--text))',
        background: 'hsl(var(--background))',
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
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}

 