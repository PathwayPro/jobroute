/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'galvji': ['Galvji', 'sans-serif'],
      },
      colors: {
        primary: '#DF044D',
        secondary: '#3E3E3E',
        'primary-text': '#0B0B0B',
        'active-color': '#D7D7D7',
        'hover-btn': '#8E8E8E',
        'hover-input': '#EFEFEF',
        'outline-color': '#0B0B0B',
        'field-color': '#606060',
        'light-color': '#fff',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [require('daisyui')],
}
