// src/main.jsx
import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async"; // SEO

// Tus estilos globales
import "./index.css";
import "./styles/dark.generated.css";

// Tu aplicación principal
import App from "./App.jsx";


// La portada (/) llega pre-dibujada en el HTML (data-shell): React la
// "hidrata" (adopta ese HTML) en vez de dibujarla de nuevo. Ver src/lib/hidratacion.js.
const rootEl = document.getElementById("root");
const rutaShell = rootEl.getAttribute("data-shell");
const rutaActual = window.location.pathname.replace(/\/+$/, "") || "/";
window.__laelShell = rutaShell != null && rutaShell === rutaActual;
window.__laelShellT = Number(rootEl.getAttribute("data-shell-t")) || 0;

const app = (
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

if (window.__laelShell) hydrateRoot(rootEl, app);
else createRoot(rootEl).render(app);
