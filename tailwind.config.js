/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: "var(--bg-primary)",
        card: "var(--bg-secondary)",
        text: "var(--text-primary)",
        muted: "var(--text-secondary)",
        bd: "var(--border-color)",
        lael: {
          // ─ New 2026 brand palette ─
          primary:  "#0D0D0D",
          bg:       "#F8F5F0",
          accent:   "#B85C38",
          detail:   "#C4973E",
          success:  "#5C6E4E",
          // ─ Legacy (kept for /draft pages) ─
          blue:     "#5850EC",
          gold:     "#C4973E",
          pink:     "#EC4899",
          dark:     "#0D0D0D",
          soft:     "#161412",
        },
      },
      fontFamily: {
        sans: ['DM Sans', 'system-ui', 'Arial', 'sans-serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
        accent: ['DM Sans', 'system-ui', 'Arial', 'sans-serif'],
        // Legacy:
        grotesk: ['Space Grotesk', 'system-ui', 'Arial', 'sans-serif'],
        inter: ['Inter', 'system-ui', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        lael: "0 8px 24px rgba(2,6,23,.25)",
      },
      animation: {
        blob: "blob 7s infinite",
        marquee: "marquee 25s linear infinite",
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
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
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