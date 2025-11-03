import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/institutoLaelWeb/", // 👈 usa el nombre EXACTO del repositorio en GitHub
});