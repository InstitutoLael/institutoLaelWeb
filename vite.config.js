// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Cloudflare tiene "Rocket Loader", que retrasa los scripts y frena la
// primera pintura. Con data-cfasync="false" los deja tal cual.
const sinRocketLoader = {
  name: 'sin-rocket-loader',
  enforce: 'post',
  transformIndexHtml(html) {
    return html.replace(/<script(?![^>]*data-cfasync)/g, '<script data-cfasync="false"');
  },
};

export default defineConfig({
  plugins: [react(), sinRocketLoader],
  base: "/",
  // Pre-dibujado de la Home (src/entry-shell.jsx): estas librerías vienen en
  // formato antiguo (CommonJS) y se empaquetan para que Node las pueda usar.
  ssr: { noExternal: ['react-helmet-async', 'react-hot-toast'] },
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        // drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  }
});