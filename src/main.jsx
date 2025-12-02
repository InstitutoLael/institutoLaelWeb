// src/main.jsx
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
// 1. IMPORTANTE: Importamos el proveedor de SEO
import { HelmetProvider } from "react-helmet-async";

// Estilos globales (Asegúrate de que este archivo tenga tu CSS base/reset)
import "./styles/styles.css"; 

import App from "./App.jsx";

// Contexto del Carrito (Lo mantenemos si lo estás usando)
import { CartProvider } from "./context/CartContext.jsx"; 

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* 2. Envolvemos TODO con HelmetProvider para el SEO */}
    <HelmetProvider>
      <BrowserRouter>
        {/* 3. Provider de datos (Carrito) */}
        <CartProvider>
          <App />
        </CartProvider>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);