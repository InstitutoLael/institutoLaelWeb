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
        card: "var(--bg-elevated)",
        text: "var(--text-primary)",
        muted: "var(--text-secondary)",
        bd: "var(--border-color)",
        lael: {
          // ─ Brand LAEL 2026 ─
          primary:   "#071D49",  // Azul profundo institucional
          secondary: "#F4F4F4",  // Gris claro
          light:     "#FFFFFF",
          accent:    "#D7E400",  // Amarillo energético
          muted:     "#8D8D8D",
          dark:      "#0D0D0D",
          bd:        "rgba(7, 29, 73, 0.10)",
          "accent-glow": "rgba(215, 228, 0, 0.15)",
        },
      },
      fontFamily: {
        sans:    ['Inter', 'system-ui', 'sans-serif'],
        display: ['Montserrat', 'system-ui', 'sans-serif'],
        body:    ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow:    "0 0 20px rgba(215,228,0,0.15)",
        "glow-lg": "0 0 40px rgba(215,228,0,0.20)",
        lael:    "0 8px 24px rgba(7,29,73,0.18)",
        card:    "0 4px 24px rgba(7,29,73,0.08)",
      },
      animation: {
        blob:       "blob 7s infinite",
        marquee:    "marquee 25s linear infinite",
        "fade-in":  "fadeIn 0.6s ease-out forwards",
        "slide-up": "slideUp 0.6s ease-out forwards",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        blob: {
          "0%":   { transform: "translate(0px, 0px) scale(1)" },
          "33%":  { transform: "translate(30px, -50px) scale(1.1)" },
          "66%":  { transform: "translate(-20px, 20px) scale(0.9)" },
          "100%": { transform: "translate(0px, 0px) scale(1)" },
        },
        marquee: {
          "0%":   { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        fadeIn: {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%":   { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
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