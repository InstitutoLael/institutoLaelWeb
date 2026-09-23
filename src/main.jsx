// src/main.jsx
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async"; // SEO

// Tus estilos globales
import "./index.css";

// Tu aplicación principal
import App from "./App.jsx";


createRoot(document.getElementById("root")).render(
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