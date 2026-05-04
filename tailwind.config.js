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
          // ─ Earthy 2026 brand palette ─
          primary:  "#F8F5F0",
          secondary: "#FFFFFF",
          light: "#0D0D0D", // Reversing light to be dark text for readability
          accent:   "#C4973E",
          muted: "#8A8A8A",
          rust: "#B85C38",
          olive: "#5C6E4E",
          "accent-glow": "rgba(196,151,62,0.15)",
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
        accent: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: "0 0 20px rgba(198,166,107,0.15)",
        "glow-lg": "0 0 40px rgba(198,166,107,0.2)",
        lael: "0 8px 24px rgba(0,0,0,0.4)",
      },
      animation: {
        blob: "blob 7s infinite",
        marquee: "marquee 25s linear infinite",
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-up": "slideUp 0.6s ease-out forwards",
      },
      keyframes: {
        blob: {
          "0%": { transform: "translate(0px, 0px) scale(1)" },
          "33%": { transform: "translate(30px, -50px) scale(1.1)" },
          "66%": { transform: "translate(-20px, 20px) scale(0.9)" },
          "100%": { transform: "translate(0px, 0px) scale(1)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        }
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
  ],
};