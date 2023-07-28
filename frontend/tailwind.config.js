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
        primJr: '#DF044D',
        secJr: '#3E3E3E',
        tertJr: '#0B0B0B',
        disabledBtn: '#D7D7D7',
        hoverBtn: '#8E8E8E',
        outlineBtn: '#0B0B0B',
        fieldBg: '#606060',
        lightJr: '#fff',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [require("daisyui")],
}
