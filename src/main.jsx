// src/main.jsx
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async"; // SEO

// Tus estilos globales
import "./index.css";
import "./styles/dark.generated.css";

// Tu aplicación principal
import App from "./App.jsx";


// La portada (/) llega pre-dibujada en el HTML (data-shell). Se avisa a
// HomeHero para que la tome sin repetir la animación de entrada.
const rootEl = document.getElementById("root");
window.__laelShell = rootEl.hasAttribute("data-shell") && window.location.pathname === "/";

createRoot(rootEl).render(
  <React.StrictMode>
    {/* 1. Capa de SEO */}
    <HelmetProvider>
      {/* 2. Capa de Navegación */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);