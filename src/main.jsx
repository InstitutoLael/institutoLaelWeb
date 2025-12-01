// src/main.jsx
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

// ❌ ELIMINADO BOOTSTRAP (Para que no rompa el Dark Mode)
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";

// Estilos globales base (Asegúrate que este archivo no tenga estilos viejos que choquen)
import "./styles/styles.css"; 

import App from "./App.jsx";

// Si usas carrito, mantén esto. Si no, borra el import y el envoltorio <CartProvider>
import { CartProvider } from "./context/CartContext.jsx"; 

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      {/* Si no tienes carrito activo, borra CartProvider y deja solo <App /> */}
      <CartProvider>
        <App />
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>
);