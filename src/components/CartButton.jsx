import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

export default function CartButton() {
  const { cart, cartTotal, formatPrice } = useCart();
  const count = cart.length;

  // Si no hay nada en el carrito, no mostramos el botón flotante
  // (Esto evita "ruido" visual si el usuario no ha elegido nada aún)
  if (count === 0) return null;

  return (
    <Link
      to="/inscripcion"
      className="cart-floating-btn"
      title="Finalizar Inscripción"
    >
      <div className="cart-content">
        <div className="icon-wrapper">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>
          </svg>
          <span className="cart-badge">{count}</span>
        </div>
        
        <div className="cart-info">
          <span className="cart-label">Inscripción</span>
          <span className="cart-total">{formatPrice(cartTotal)}</span>
        </div>
      </div>

      <style>{`
        .cart-floating-btn {
          position: fixed;
          bottom: 100px; /* Sobre el botón de WhatsApp */
          right: 24px;
          z-index: 1000;
          text-decoration: none;
          animation: slideIn 0.3s ease-out, bounce 2s infinite;
        }

        .cart-content {
          display: flex;
          align-items: center;
          gap: 12px;
          background: rgba(10, 10, 10, 0.8);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          padding: 8px 16px 8px 8px;
          border-radius: 50px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: white;
          box-shadow: 0 10px 25px rgba(0,0,0,0.3);
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .icon-wrapper {
          position: relative;
          background: #f59e0b;
          color: #000;
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
        }

        .cart-badge {
          position: absolute;
          top: -4px;
          right: -4px;
          background: #fff;
          color: #000;
          font-size: 0.7rem;
          font-weight: 900;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        }

        .cart-info {
          display: flex;
          flex-direction: column;
        }

        .cart-label {
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 1px;
          opacity: 0.7;
          font-weight: 700;
        }

        .cart-total {
          font-size: 14px;
          font-weight: 800;
          color: #fff;
        }

        .cart-floating-btn:hover .cart-content {
          transform: scale(1.05) translateY(-5px);
          background: rgba(0, 0, 0, 0.9);
          border-color: #f59e0b;
        }

        @keyframes slideIn {
          from { transform: translateX(100px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }

        @media (max-width: 768px) {
          .cart-floating-btn { bottom: 90px; right: 16px; }
          .cart-label { display: none; }
          .cart-info { padding-right: 4px; }
        }
      `}</style>
    </Link>
  );
}