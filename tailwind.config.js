/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0b1220",
        card: "#0e1424",
        text: "#e5e7eb",
        muted: "#9ca3af",
        bd: "#1f2a44",
        lael: {
          blue: "#5850EC",
          gold: "#FFCC33",
          dark: "#0b1220",
          soft: "#101a2f",
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        lael: "0 8px 24px rgba(2,6,23,.25)",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
  ],
};