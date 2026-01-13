import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { Trash2, X, ShieldCheck, AlertCircle, Loader2, ArrowRight } from "lucide-react";

/* Función para formatear dinero */
const clp = (amount) => {
  return new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 }).format(amount);
};

export default function Cart() {
  const { cart, removeFromCart, clearCart, isCartOpen, closeCart } = useCart();
  const [isPaying, setIsPaying] = useState(false);
  const [mount, setMount] = useState(false); // Para animación de entrada/salida

  // Sincronizar animación con estado del contexto
  useEffect(() => {
    if (isCartOpen) setMount(true);
    else setTimeout(() => setMount(false), 300); // Esperar a que termine la animación de cierre
  }, [isCartOpen]);

  // 1. LÓGICA DE CÁLCULO FINANCIERO (Tu lógica original)
  const totalToday = cart.reduce((acc, item) => acc + (item.price || 0), 0);
  const totalMonthly = cart.reduce((acc, item) => acc + (item.recurringPrice || 0), 0);
  const enrollmentTotal = totalToday - totalMonthly;

  const handlePayment = () => {
    setIsPaying(true);
    // AQUÍ IRÍA TU INTEGRACIÓN REAL (Flow, MercadoPago, etc)
    setTimeout(() => {
      alert("Redirigiendo a pasarela de pago...");
      setIsPaying(false);
    }, 2000);
  };

  // Si está cerrado y desmontado, no renderizamos nada para ahorrar recursos
  if (!isCartOpen && !mount) return null;

  return (
    <>
      {/* OVERLAY (Fondo oscuro) */}
      <div 
        className={`cart-overlay ${isCartOpen ? "open" : ""}`} 
        onClick={closeCart}
      />

      {/* DRAWER (Panel Lateral) */}
      <div className={`cart-drawer ${isCartOpen ? "open" : ""}`}>
        
        {/* HEADER DEL CARRITO */}
        <div className="drawer-header">
          <h2>Tu Inscripción</h2>
          <button onClick={closeCart} className="close-btn"><X size={24}/></button>
        </div>

        {/* CONTENIDO SCROLLABLE */}
        <div className="drawer-content">
          
          {cart.length === 0 ? (
            <div className="empty-state">
              <div style={{fontSize:'3rem', marginBottom:10}}>🛒</div>
              <h3>Tu mochila está vacía</h3>
              <p>Agrega cursos o matrículas para continuar.</p>
              <button onClick={closeCart} className="btn-explore">Volver a explorar</button>
            </div>
          ) : (
            <>
              {/* LISTA DE ITEMS */}
              <div className="cart-items">
                <div style={{display:'flex', justifyContent:'space-between', marginBottom:10}}>
                   <span style={{fontSize:'0.8rem', color:'#94a3b8'}}>{cart.length} Ítem(s)</span>
                   <button onClick={clearCart} style={{background:'none', border:'none', color:'#ef4444', fontSize:'0.8rem', cursor:'pointer'}}>Borrar todo</button>
                </div>

                {cart.map((item) => (
                  <div key={item.id} className="cart-item">
                    {/* Imagen o Icono */}
                    <div className="item-img">
                       {item.image ? (
                         <img src={item.image} alt="Curso" style={{width:'100%', height:'100%', objectFit:'cover'}} />
                       ) : (
                         <span style={{fontSize:'1.5rem'}}>🎓</span>
                       )}
                    </div>
                    
                    {/* Info */}
                    <div className="item-info">
                      <div className="item-header">
                        <h4>{item.name}</h4>
                        <button onClick={() => removeFromCart(item.id)} className="btn-trash"><Trash2 size={16}/></button>
                      </div>
                      
                      {/* Detalles específicos */}
                      {item.details && (
                        <p className="item-details">
                          {Array.isArray(item.details) ? item.details.join(' • ') : item.details}
                        </p>
                      )}

                      {/* Precios Individuales */}
                      <div className="item-pricing">
                        <div>
                           <span>Pago Hoy</span>
                           <strong>{clp(item.price)}</strong>
                        </div>
                        {item.recurringPrice > 0 && (
                          <div style={{textAlign:'right'}}>
                             <span>Mensualidad</span>
                             <strong style={{color:'#94a3b8'}}>{clp(item.recurringPrice)}</strong>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* RESUMEN FINANCIERO (Tu Lógica de Negocio) */}
              <div className="financial-summary">
                
                {/* Desglose Matrícula */}
                {enrollmentTotal > 0 && (
                  <div className="row">
                    <span>Matrícula (Pago Único)</span>
                    <span>{clp(enrollmentTotal)}</span>
                  </div>
                )}

                {/* Desglose Mensualidad */}
                <div className="row">
                   <span>Primer mes de clases</span>
                   <span>{clp(totalMonthly)}</span>
                </div>

                <div className="divider"></div>

                {/* TOTAL HOY */}
                <div className="row total">
                   <span>A pagar HOY</span>
                   <span className="amount">{clp(totalToday)}</span>
                </div>

                {/* NOTA ACLARATORIA */}
                <div className="info-box">
                  <AlertCircle size={16} className="info-icon" />
                  <p>
                    <strong>Transparencia:</strong> El monto de matrícula se paga una sola vez. 
                    Tu mensualidad futura será de <strong>{clp(totalMonthly)}</strong>.
                  </p>
                </div>
              </div>
            </>
          )}
        </div>

        {/* FOOTER DEL CARRITO (BOTÓN DE PAGO) */}
        {cart.length > 0 && (
          <div className="drawer-footer">
            <button 
                onClick={handlePayment}
                disabled={isPaying}
                className="btn-pay"
            >
                {isPaying ? <Loader2 className="spin" /> : <>Ir a Pagar <ArrowRight size={18}/></>}
            </button>
            <div className="secure-badge">
                <ShieldCheck size={14}/> Pagos encriptados SSL
            </div>
          </div>
        )}
      </div>

      {/* ESTILOS DEL DRAWER */}
      <style>{`
        /* Overlay Oscuro */
        .cart-overlay {
          position: fixed; inset: 0; background: rgba(0,0,0,0.6); backdrop-filter: blur(4px);
          z-index: 9998; opacity: 0; transition: opacity 0.3s ease; pointer-events: none;
        }
        .cart-overlay.open { opacity: 1; pointer-events: all; }

        /* Panel Lateral (Drawer) */
        .cart-drawer {
          position: fixed; top: 0; right: 0; height: 100%; width: 100%; max-width: 420px;
          background: #09090b; border-left: 1px solid rgba(255,255,255,0.1);
          z-index: 9999; display: flex; flexDirection: column;
          transform: translateX(100%); transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: -10px 0 40px rgba(0,0,0,0.5);
        }
        .cart-drawer.open { transform: translateX(0); }

        /* Componentes Internos */
        .drawer-header {
          padding: 20px; border-bottom: 1px solid rgba(255,255,255,0.1);
          display: flex; justify-content: space-between; align-items: center;
        }
        .drawer-header h2 { margin: 0; font-size: 1.2rem; font-weight: 700; color: white; }
        .close-btn { background: none; border: none; color: #a1a1aa; cursor: pointer; }
        .close-btn:hover { color: white; }

        .drawer-content { flex: 1; overflow-y: auto; padding: 20px; }

        .empty-state { text-align: center; color: #a1a1aa; padding-top: 60px; }
        .btn-explore { margin-top: 20px; padding: 10px 20px; background: #27272a; color: white; border: none; borderRadius: 8px; cursor: pointer; }

        /* Items */
        .cart-item { display: flex; gap: 15px; background: #18181b; padding: 15px; borderRadius: 12px; margin-bottom: 15px; border: 1px solid rgba(255,255,255,0.05); }
        .item-img { width: 50px; height: 50px; background: #27272a; borderRadius: 8px; display: flex; align-items: center; justify-content: center; overflow: hidden; flex-shrink: 0; }
        .item-info { flex: 1; }
        .item-header { display: flex; justify-content: space-between; margin-bottom: 4px; }
        .item-header h4 { margin: 0; font-size: 0.95rem; color: white; }
        .btn-trash { background: none; border: none; color: #52525b; cursor: pointer; }
        .btn-trash:hover { color: #ef4444; }
        .item-details { font-size: 0.75rem; color: #a1a1aa; margin: 0 0 10px 0; }
        
        .item-pricing { display: flex; justify-content: space-between; font-size: 0.8rem; background: rgba(0,0,0,0.2); padding: 8px; borderRadius: 6px; }
        .item-pricing span { display: block; color: #71717a; font-size: 0.7rem; text-transform: uppercase; }
        .item-pricing strong { color: #e4e4e7; }

        /* Resumen Financiero */
        .financial-summary { background: #18181b; padding: 20px; borderRadius: 16px; border: 1px solid rgba(255,255,255,0.05); margin-top: 20px; }
        .row { display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 0.9rem; color: #a1a1aa; }
        .divider { height: 1px; background: rgba(255,255,255,0.1); margin: 15px 0; }
        .total { color: white; font-weight: 700; align-items: center; }
        .total .amount { font-size: 1.4rem; color: #fbbf24; } /* Dorado */

        .info-box { display: flex; gap: 10px; background: rgba(59, 130, 246, 0.1); padding: 12px; borderRadius: 8px; margin-top: 15px; }
        .info-icon { color: #60a5fa; flex-shrink: 0; margin-top: 2px; }
        .info-box p { font-size: 0.75rem; color: #bfdbfe; margin: 0; line-height: 1.4; }

        /* Footer */
        .drawer-footer { padding: 20px; border-top: 1px solid rgba(255,255,255,0.1); background: #09090b; }
        .btn-pay { width: 100%; padding: 16px; background: #fbbf24; color: black; font-weight: 800; border: none; borderRadius: 12px; cursor: pointer; display: flex; justify-content: center; align-items: center; gap: 10px; font-size: 1rem; transition: 0.2s; }
        .btn-pay:hover { background: #fcd34d; transform: translateY(-2px); }
        .btn-pay:disabled { opacity: 0.7; cursor: not-allowed; }
        .secure-badge { text-align: center; font-size: 0.75rem; color: #52525b; margin-top: 12px; display: flex; align-items: center; justify-content: center; gap: 5px; }

        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}</style>
    </>
  );
}