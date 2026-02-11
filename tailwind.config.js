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
          pink: "#EC4899", // Added pink
          dark: "#0b1220",
          soft: "#101a2f",
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'Arial', 'sans-serif'],
        display: ['Space Grotesk', 'system-ui', 'Arial', 'sans-serif'],
        accent: ['Outfit', 'system-ui', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        lael: "0 8px 24px rgba(2,6,23,.25)",
      },
      animation: {
        blob: "blob 7s infinite",
      },
      keyframes: {
        blob: {
          "0%": {
            transform: "translate(0px, 0px) scale(1)",
          },
          "33%": {
            transform: "translate(30px, -50px) scale(1.1)",
          },
          "66%": {
            transform: "translate(-20px, 20px) scale(0.9)",
          },
          "100%": {
            transform: "translate(0px, 0px) scale(1)",
          },
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
  ],
};