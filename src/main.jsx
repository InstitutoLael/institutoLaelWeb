// src/main.jsx
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async"; // SEO

// Tus estilos globales
import "./styles/styles.css"; 

// Tu aplicación principal
import App from "./App.jsx";

// Tu contexto del Carrito
import { CartProvider } from "./context/CartContext.jsx"; 

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* 1. Capa de SEO */}
    <HelmetProvider>
      {/* 2. Capa de Navegación */}
      <BrowserRouter>
        {/* 3. Capa de Datos (Carrito Global) */}
        <CartProvider>
          {/* 4. Tu App Visual */}
          <App />
        </CartProvider>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);