/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lael: {
          blue: "#5850EC",   // Azul institucional
          gold: "#FFCC33",   // Dorado institucional
          dark: "#0b1220",   // Fondo oscuro
          soft: "#101a2f",   // Panel suave
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        lael: "0 8px 24px rgba(2,6,23,.25)", // sombra suave
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
  ],
};