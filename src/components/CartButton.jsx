import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

export default function CartButton() {
  const { cart } = useCart();
  const count = cart.length;

  return (
    <Link
      to="/inscripcion"
      className="cart-btn"
      title="Ver carrito / Finalizar Inscripción"
      aria-label="Ir al carrito"
    >
      {/* Icono de bolsa de compra SVG */}
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
      
      {count > 0 && <span className="badge">{count}</span>}

      <style>{`
        .cart-btn {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.1); /* Fondo sutil para glassmorphism */
          color: #fff;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 50%; /* Redondo */
          width: 40px; 
          height: 40px;
          cursor: pointer;
          transition: all .2s ease;
        }
        .cart-btn:hover { 
            background: rgba(255, 255, 255, 0.2); 
            transform: scale(1.05);
            border-color: white;
        }
        .badge {
          position: absolute;
          top: -2px;
          right: -2px;
          background: #f59e0b; /* Color acento (Naranja/Dorado) */
          color: #000;
          font-size: 0.7rem;
          font-weight: 800;
          border-radius: 50%;
          width: 18px;
          height: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid #050505; /* Borde oscuro para contraste */
        }
      `}</style>
    </Link>
  );
}