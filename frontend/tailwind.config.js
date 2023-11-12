/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        galvji: ["Galvji", "sans-serif"],
      },
      fontSize: {
        "2xl": [
          "24px",
          {
            lineHeight: "158%",
          },
        ],
      },
      colors: {
        primary: "#DF044D",
        secondary: "#3E3E3E",
        dark: "#242529",
        disabled: "#959595",
        "light-gray": "#F0F0F0",
        "light-brown": "#FEEED7",
        dialog: "#42444D",
        "primary-text": "#0B0B0B",
        "secondary-text": "#3C3D40",
        "active-color": "#BE0342",
        "hover-btn": "#242529",
        "hover-option": "#FEEED7",
        "hover-input": "#EFEFEF",
        "outline-color": "#0B0B0B",
        "field-color": "#606060",
        "light-color": "#fff",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      boxShadow: {
        inner: "inset 0 -1px 0 0 #242529, 0 1px 0 0 #242529",
        outline: " -1px 4px 20px 0px rgba(18, 24, 80, 0.12)",
      },
    },
  },
  plugins: [require("daisyui")],
};
