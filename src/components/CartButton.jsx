// src/components/CartButton.jsx
import { useCart } from "../context/CartContext.jsx";

export default function CartButton() {
  const { count, setOpen } = useCart();

  return (
    <button
      type="button"
      className="cart-btn"
      onClick={() => setOpen(true)}
      title="Ver carrito"
      aria-label="Abrir carrito de compras"
    >
      🛒
      {count > 0 && <span className="badge">{count}</span>}

      <style>{`
        .cart-btn {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: #5850ec;
          color: #fff;
          border: none;
          border-radius: 10px;
          padding: 0.6rem 0.9rem;
          cursor: pointer;
          font-size: 1rem;
          box-shadow: 0 2px 6px rgba(0,0,0,.2);
          transition: transform .2s ease;
        }
        .cart-btn:hover { transform: scale(1.05); }
        .badge {
          position: absolute;
          top: -6px;
          right: -6px;
          background: #22c55e;
          color: #fff;
          font-size: .7rem;
          font-weight: 900;
          border-radius: 999px;
          padding: 2px 6px;
          line-height: 1;
        }
      `}</style>
    </button>
  );
}