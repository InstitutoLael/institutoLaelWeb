// src/components/CartButton.jsx
import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext.jsx";
import { ShoppingBag, X } from "lucide-react"; // Usamos Lucide para consistencia

export default function CartButton() {
  const { cart, cartTotal, formatPrice, toggleCart, isCartOpen } = useCart();
  const count = cart.length;
  const [bump, setBump] = useState(false);

  // Efecto de "salto" cuando agregas algo nuevo
  useEffect(() => {
    if (count === 0) return;
    setBump(true);
    const timer = setTimeout(() => setBump(false), 300);
    return () => clearTimeout(timer);
  }, [count]);

  // Si no hay nada, no mostramos el botón (a menos que esté abierto el drawer)
  if (count === 0 && !isCartOpen) return null;

  return (
    <>
      <button
        onClick={toggleCart}
        className={`cart-floating-btn ${bump ? "bump" : ""}`}
        title={isCartOpen ? "Cerrar Carrito" : "Ver mi Matrícula"}
      >
        <div className="cart-content">
          <div className="icon-wrapper">
            {isCartOpen ? (
              <X size={20} color="black" />
            ) : (
              <ShoppingBag size={20} color="black" />
            )}

            {!isCartOpen && count > 0 && (
              <span className="cart-badge">{count}</span>
            )}
          </div>

          <div className="cart-info">
            <span className="cart-label">
              {isCartOpen ? "Cerrar" : "Total a Pagar"}
            </span>
            <span className="cart-total">
              {isCartOpen ? "Seguir viendo" : formatPrice(cartTotal)}
            </span>
          </div>
        </div>
      </button>

      <style>{`
        .cart-floating-btn {
          position: fixed;
          bottom: 100px; /* Sobre WhatsApp */
          right: 24px;
          z-index: 9999; /* Por encima de todo */
          border: none;
          background: transparent;
          padding: 0;
          cursor: pointer;
          outline: none;
          animation: slideIn 0.5s ease-out;
        }

        .cart-content {
          display: flex;
          align-items: center;
          gap: 12px;
          background: rgba(10, 10, 10, 0.9); /* Fondo oscuro premium */
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          padding: 6px 16px 6px 6px; /* Ajuste fino */
          border-radius: 50px;
          border: 1px solid rgba(255, 255, 255, 0.15);
          box-shadow: 0 10px 30px rgba(0,0,0,0.5);
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
        }

        .cart-floating-btn:hover .cart-content {
          transform: translateY(-4px);
          background: #000;
          border-color: #fbbf24; /* Brillo dorado al pasar el mouse */
        }

        .icon-wrapper {
          position: relative;
          background: #fbbf24; /* Color Dorado Lael */
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          box-shadow: 0 4px 10px rgba(251, 191, 36, 0.3);
          transition: transform 0.2s;
        }

        .cart-badge {
          position: absolute;
          top: -2px;
          right: -2px;
          background: #ef4444; /* Rojo notificación */
          color: white;
          font-size: 0.7rem;
          font-weight: 800;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid #18181b;
        }

        .cart-info {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
        }

        .cart-label {
          font-size: 0.65rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: #a1a1aa;
          font-weight: 700;
        }

        .cart-total {
          font-size: 0.95rem;
          font-weight: 800;
          color: #fff;
          font-variant-numeric: tabular-nums;
        }

        /* ANIMACIONES */
        @keyframes slideIn {
          from { transform: translateX(100px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }

        .bump .icon-wrapper {
          transform: scale(1.2);
        }

        @media (max-width: 768px) {
          .cart-floating-btn { bottom: 90px; right: 16px; }
          .cart-label { display: none; } /* En móvil solo mostramos precio */
          .cart-info { justify-content: center; }
          .cart-content { padding-right: 12px; }
        }
      `}</style>
    </>
  );
}