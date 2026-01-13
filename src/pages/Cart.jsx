import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { X, Trash2, ArrowRight, ShoppingBag } from "lucide-react";

export default function CartDrawer() {
  const { cart, removeFromCart, clearCart, cartTotal, formatPrice, isCartOpen, closeCart } = useCart();
  const navigate = useNavigate();
  const drawerRef = useRef(null);

  // Cierra el carrito con la tecla ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") closeCart();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [closeCart]);

  // Si hacemos clic fuera del panel (en lo oscuro), cerramos
  const handleBackdropClick = (e) => {
    if (drawerRef.current && !drawerRef.current.contains(e.target)) {
      closeCart();
    }
  };

  // Navegar al checkout
  const handleCheckout = () => {
    closeCart();
    navigate("/inscripcion");
  };

  // Renderizado condicional con clases CSS para animación
  return (
    <>
      <style>{css}</style>
      
      {/* BACKDROP OSCURO */}
      <div 
        className={`cart-overlay ${isCartOpen ? "open" : ""}`} 
        onClick={handleBackdropClick}
      >
        {/* PANEL LATERAL */}
        <aside className="cart-panel" ref={drawerRef}>
          
          {/* CABECERA */}
          <div className="cart-header">
            <div className="flex items-center gap-3">
              <ShoppingBag size={20} className="text-accent" />
              <h2 className="text-lg font-bold text-white">Tu Mochila</h2>
              <span className="badge-count">{cart.length}</span>
            </div>
            <button onClick={closeCart} className="close-btn">
              <X size={24} />
            </button>
          </div>

          {/* CUERPO DEL CARRITO */}
          <div className="cart-body">
            {cart.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">🎒</div>
                <h3>Tu mochila está vacía</h3>
                <p>¡Explora nuestros cursos y prepárate para el futuro!</p>
                <button onClick={closeCart} className="btn-explore">
                  Ver Programas
                </button>
              </div>
            ) : (
              <div className="cart-items">
                {cart.map((item) => (
                  <div key={item.id} className="cart-item">
                    <div className="item-info">
                      <h4 className="item-title">{item.title}</h4>
                      <p className="item-price">{formatPrice(item.price)}</p>
                      {item.type && <span className="item-tag">{item.type}</span>}
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)} 
                      className="btn-remove"
                      title="Eliminar curso"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* PIE DE PÁGINA (TOTALES) */}
          {cart.length > 0 && (
            <div className="cart-footer">
              <div className="total-row">
                <span>Total a pagar:</span>
                <span className="total-amount">{formatPrice(cartTotal)}</span>
              </div>
              
              <div className="actions-col">
                <button onClick={handleCheckout} className="btn-checkout">
                  Ir a Matrícula <ArrowRight size={18} />
                </button>
                <button onClick={clearCart} className="btn-clear">
                  Vaciar Mochila
                </button>
              </div>
              
              <p className="secure-note">
                🔒 Pago 100% seguro vía WebPay / Transferencia
              </p>
            </div>
          )}
        </aside>
      </div>
    </>
  );
}

/* ─── ESTILOS CSS ─── */
const css = `
  /* Overlay Oscuro */
  .cart-overlay {
    position: fixed; inset: 0; z-index: 9999;
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(4px);
    opacity: 0; visibility: hidden;
    transition: all 0.3s ease-in-out;
  }
  .cart-overlay.open { opacity: 1; visibility: visible; }

  /* Panel Lateral */
  .cart-panel {
    position: absolute; top: 0; right: 0; bottom: 0;
    width: 100%; max-width: 400px;
    background: #09090b; /* Zinc-950 */
    border-left: 1px solid rgba(255,255,255,0.1);
    box-shadow: -10px 0 30px rgba(0,0,0,0.5);
    display: flex; flex-direction: column;
    transform: translateX(100%);
    transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .cart-overlay.open .cart-panel { transform: translateX(0); }

  /* Header */
  .cart-header {
    padding: 20px;
    border-bottom: 1px solid rgba(255,255,255,0.08);
    display: flex; justify-content: space-between; align-items: center;
    background: rgba(255,255,255,0.02);
  }
  .text-accent { color: #fbbf24; }
  .badge-count { 
    background: #fbbf24; color: black; font-weight: bold; 
    font-size: 0.75rem; padding: 2px 8px; border-radius: 12px; 
  }
  .close-btn { color: #a1a1aa; transition: 0.2s; background: transparent; border: none; cursor: pointer;}
  .close-btn:hover { color: white; transform: rotate(90deg); }

  /* Body */
  .cart-body { flex: 1; overflow-y: auto; padding: 20px; }

  /* Items */
  .cart-items { display: flex; flex-direction: column; gap: 15px; }
  .cart-item {
    display: flex; justify-content: space-between; align-items: flex-start;
    padding: 15px; border-radius: 12px;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.05);
    transition: 0.2s;
  }
  .cart-item:hover { background: rgba(255,255,255,0.06); border-color: rgba(255,255,255,0.1); }
  
  .item-title { font-weight: 600; color: #f4f4f5; margin-bottom: 4px; font-size: 0.95rem; }
  .item-price { color: #fbbf24; font-weight: 700; font-family: monospace; font-size: 1rem; }
  .item-tag { 
    display: inline-block; font-size: 0.7rem; color: #a1a1aa; 
    background: rgba(255,255,255,0.1); padding: 2px 6px; border-radius: 4px; margin-top: 6px;
  }

  .btn-remove {
    color: #52525b; padding: 8px; border-radius: 8px; transition: 0.2s;
    background: transparent; border: none; cursor: pointer;
  }
  .btn-remove:hover { color: #ef4444; background: rgba(239, 68, 68, 0.1); }

  /* Estado Vacío */
  .empty-state { text-align: center; padding-top: 60px; color: #71717a; }
  .empty-icon { font-size: 3rem; margin-bottom: 10px; opacity: 0.5; }
  .empty-state h3 { color: white; margin-bottom: 8px; font-weight: 600; }
  .btn-explore {
    margin-top: 20px; padding: 10px 20px; border-radius: 8px;
    background: rgba(255,255,255,0.1); color: white;
    font-weight: 500; transition: 0.2s; border: none; cursor: pointer;
  }
  .btn-explore:hover { background: white; color: black; }

  /* Footer */
  .cart-footer {
    padding: 20px; background: #09090b;
    border-top: 1px solid rgba(255,255,255,0.1);
  }
  .total-row {
    display: flex; justify-content: space-between; align-items: center;
    margin-bottom: 20px; font-size: 1.1rem; color: #d4d4d8;
  }
  .total-amount { color: #fbbf24; font-weight: 800; font-size: 1.4rem; }

  .actions-col { display: flex; flex-direction: column; gap: 10px; }
  
  .btn-checkout {
    width: 100%; padding: 14px; border-radius: 10px;
    background: #fbbf24; color: black; font-weight: 800;
    display: flex; align-items: center; justify-content: center; gap: 8px;
    transition: 0.2s; border: none; cursor: pointer; font-size: 1rem;
  }
  .btn-checkout:hover { transform: translateY(-2px); box-shadow: 0 5px 15px rgba(251, 191, 36, 0.3); }

  .btn-clear {
    width: 100%; padding: 10px; background: transparent;
    color: #71717a; font-size: 0.9rem; text-decoration: underline;
    border: none; cursor: pointer;
  }
  .btn-clear:hover { color: #ef4444; }

  .secure-note {
    text-align: center; font-size: 0.75rem; color: #52525b; margin-top: 15px;
  }
`;