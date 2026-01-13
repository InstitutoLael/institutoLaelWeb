import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { FaTrash, FaArrowRight, FaShieldAlt, FaLock } from "react-icons/fa";
import { BsCartX } from "react-icons/bs";

// Helper de moneda
const clp = (n) => Number(n).toLocaleString("es-CL", { style: "currency", currency: "CLP" });

export default function Cart() {
  const { cartItems, removeFromCart, cartTotal } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty-page">
        <style>{css}</style>
        <div className="empty-state">
           <BsCartX className="empty-icon"/>
           <h2>Tu carrito está vacío</h2>
           <p>Parece que aún no has elegido tu camino al éxito.</p>
           <Link to="/" className="btn-royal">Explorar Cursos</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <style>{css}</style>
      
      <div className="container cart-layout">
        
        {/* LISTA DE ITEMS */}
        <div className="cart-items-col">
           <h1>Resumen de Compra</h1>
           <div className="items-list">
              {cartItems.map((item) => (
                 <div key={item.id} className="cart-item">
                    <div className="ci-info">
                       <span className="ci-type">{item.type === 'course' ? 'Curso / Plan' : 'Producto'}</span>
                       <h3>{item.title}</h3>
                       <p>{item.detail}</p>
                       {item.extraInfo && <small className="ci-extra">{item.extraInfo}</small>}
                    </div>
                    <div className="ci-price-action">
                       <div className="ci-price">{clp(item.price)}</div>
                       <button onClick={() => removeFromCart(item.id)} className="btn-remove">
                          <FaTrash/> Eliminar
                       </button>
                    </div>
                 </div>
              ))}
           </div>
           <Link to="/" className="continue-link">← Seguir explorando</Link>
        </div>

        {/* RESUMEN DE PAGO */}
        <div className="cart-summary-col">
           <div className="summary-card">
              <h3>Total a Pagar</h3>
              
              <div className="summary-row total">
                 <span>Total</span>
                 <strong>{clp(cartTotal)}</strong>
              </div>

              <div className="security-badges">
                 <span><FaLock/> Pago 100% Seguro</span>
                 <span><FaShieldAlt/> Garantía Lael</span>
              </div>

              <button onClick={() => navigate('/inscripcion')} className="btn-checkout">
                 Ir a Finalizar Compra <FaArrowRight/>
              </button>
              
              <p className="legal-text">
                 Al continuar, aceptas nuestros términos y condiciones de servicio educativo.
              </p>
           </div>
        </div>

      </div>
    </div>
  );
}

const css = `
:root {
  --bg-deep: #020617;
  --bg-card: #1e293b;
  --gold: #fbbf24;
  --text-main: #f8fafc;
  --text-muted: #94a3b8;
  --border: rgba(255,255,255,0.1);
}

.cart-page, .cart-empty-page {
  background: var(--bg-deep); color: var(--text-main); font-family: 'Inter', sans-serif;
  min-height: 80vh; padding: 120px 0 80px;
}
.container { max-width: 1100px; margin: 0 auto; padding: 0 20px; }

/* Empty State */
.empty-state { text-align: center; padding: 60px; }
.empty-icon { font-size: 5rem; color: var(--text-muted); margin-bottom: 20px; opacity: 0.5; }
.empty-state h2 { font-size: 2rem; margin-bottom: 10px; font-family: 'Playfair Display', serif; }
.empty-state p { margin-bottom: 30px; color: var(--text-muted); }
.btn-royal { background: var(--gold); color: black; padding: 12px 30px; border-radius: 50px; font-weight: 700; text-decoration: none; }

/* Layout */
.cart-layout { display: grid; grid-template-columns: 1.5fr 1fr; gap: 60px; }
@media(max-width: 900px) { .cart-layout { grid-template-columns: 1fr; } }

.cart-items-col h1 { font-family: 'Playfair Display', serif; font-size: 2.5rem; margin-bottom: 30px; border-bottom: 1px solid var(--border); padding-bottom: 20px; }

.cart-item {
  background: var(--bg-card); border: 1px solid var(--border); border-radius: 12px;
  padding: 25px; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: flex-start;
}
@media(max-width: 600px) { .cart-item { flex-direction: column; gap: 20px; } }

.ci-type { font-size: 0.7rem; text-transform: uppercase; color: var(--gold); font-weight: 700; letter-spacing: 1px; }
.ci-info h3 { margin: 5px 0; font-size: 1.2rem; }
.ci-info p { color: var(--text-muted); font-size: 0.95rem; margin-bottom: 5px; }
.ci-extra { display: block; color: #10b981; font-style: italic; }

.ci-price-action { text-align: right; min-width: 120px; }
@media(max-width: 600px) { .ci-price-action { text-align: left; display: flex; justify-content: space-between; width: 100%; align-items: center; } }

.ci-price { font-size: 1.5rem; font-weight: 700; color: white; margin-bottom: 10px; }
.btn-remove { background: transparent; border: none; color: #ef4444; cursor: pointer; display: flex; align-items: center; gap: 5px; font-size: 0.9rem; margin-left: auto; }
.btn-remove:hover { text-decoration: underline; }

.continue-link { display: inline-block; margin-top: 20px; color: var(--text-muted); text-decoration: none; }
.continue-link:hover { color: var(--gold); }

/* Summary */
.summary-card { background: #0f172a; padding: 30px; border-radius: 16px; border: 1px solid var(--border); position: sticky; top: 100px; }
.summary-card h3 { margin-bottom: 20px; font-family: 'Playfair Display', serif; font-size: 1.5rem; }

.summary-row { display: flex; justify-content: space-between; margin-bottom: 15px; font-size: 1rem; color: var(--text-muted); }
.summary-row.total { border-top: 1px solid var(--border); padding-top: 20px; margin-top: 20px; font-size: 1.5rem; color: white; align-items: center; }
.summary-row.total strong { color: var(--gold); }

.security-badges { display: flex; gap: 15px; margin-bottom: 25px; font-size: 0.8rem; color: #10b981; justify-content: center; background: rgba(16, 185, 129, 0.1); padding: 10px; border-radius: 8px; }
.security-badges span { display: flex; align-items: center; gap: 5px; }

.btn-checkout { width: 100%; background: var(--gold); color: black; border: none; padding: 16px; border-radius: 8px; font-weight: 700; font-size: 1.1rem; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 10px; transition: 0.2s; }
.btn-checkout:hover { background: white; transform: translateY(-2px); }

.legal-text { font-size: 0.75rem; color: var(--text-muted); text-align: center; margin-top: 20px; opacity: 0.7; }
`;