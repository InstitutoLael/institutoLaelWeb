/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        // Tu paleta de lujo
        background: "#050505", // Casi negro, más elegante
        surface: "#0F0F11",    // Superficie de las tarjetas
        surfaceHighlight: "#18181B",
        lael: {
          blue: "#465E9C",
          gold: "#F2C04E",
          pink: "#D69ABB",
          orange: "#E87C42",
          green: "#66BB6A",
        },
      },
      fontFamily: {
        sans: ['Inter', 'Outfit', 'sans-serif'], // Recomiendo instalar 'Outfit' de Google Fonts, es muy moderna
      },
      animation: {
        'blob': 'blob 7s infinite', // Animación de fondo "viva"
        'float': 'float 6s ease-in-out infinite',
        'shine': 'shine 3s linear infinite', // Efecto de brillo en bordes
      },
      keyframes: {
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shine: {
          '0%': { backgroundPosition: '200% center' },
          '100%': { backgroundPosition: '-200% center' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-glow': 'conic-gradient(from 180deg at 50% 50%, #F2C04E 0deg, #D69ABB 180deg, #465E9C 360deg)',
      }
    },
  },
  plugins: [],
};