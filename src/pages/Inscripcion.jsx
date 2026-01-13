import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext.jsx";
import { useNavigate } from "react-router-dom";
import { FaLock, FaUser, FaEnvelope, FaIdCard, FaWhatsapp, FaCreditCard, FaUniversity } from "react-icons/fa";

const clp = (n) => Number(n).toLocaleString("es-CL", { style: "currency", currency: "CLP" });

export default function Inscripcion() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  
  // Si entra directo sin items, lo mandamos al home
  useEffect(() => {
    if (cartItems.length === 0) navigate('/');
  }, [cartItems, navigate]);

  const [formData, setFormData] = useState({ name: "", email: "", rut: "", phone: "" });
  const [paymentMethod, setPaymentMethod] = useState("webpay");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // AQUÍ IRÍA LA INTEGRACIÓN REAL CON WEBPAY / MERCADOPAGO
    // Simulamos un proceso de 2 segundos
    setTimeout(() => {
      clearCart();
      navigate('/gracias'); // Redirigir a página de éxito
    }, 2000);
  };

  return (
    <div className="checkout-page">
      <style>{cssCheckout}</style>
      <div className="container checkout-grid">
        
        {/* COLUMNA IZQUIERDA: DATOS */}
        <div className="form-col">
           <div className="checkout-header">
              <h1>Finalizar Inscripción</h1>
              <p>Completa tus datos para matricularte.</p>
           </div>

           <form onSubmit={handleSubmit} className="checkout-form">
              
              {/* Sección Datos */}
              <div className="form-section">
                 <h3><FaUser className="fs-icon"/> Datos del Alumno</h3>
                 <div className="input-group">
                    <label>Nombre Completo</label>
                    <input type="text" placeholder="Ej: Juan Pérez" required 
                      value={formData.name} onChange={e=>setFormData({...formData, name:e.target.value})} />
                 </div>
                 <div className="row-2">
                    <div className="input-group">
                       <label>RUT (Sin puntos)</label>
                       <div className="icon-input">
                          <FaIdCard/>
                          <input type="text" placeholder="12345678-9" required 
                            value={formData.rut} onChange={e=>setFormData({...formData, rut:e.target.value})} />
                       </div>
                    </div>
                    <div className="input-group">
                       <label>WhatsApp</label>
                       <div className="icon-input">
                          <FaWhatsapp/>
                          <input type="tel" placeholder="+569..." required 
                            value={formData.phone} onChange={e=>setFormData({...formData, phone:e.target.value})} />
                       </div>
                    </div>
                 </div>
                 <div className="input-group">
                    <label>Correo Electrónico (Te llegará el acceso aquí)</label>
                    <div className="icon-input">
                       <FaEnvelope/>
                       <input type="email" placeholder="nombre@correo.com" required 
                         value={formData.email} onChange={e=>setFormData({...formData, email:e.target.value})} />
                    </div>
                 </div>
              </div>

              {/* Sección Pago */}
              <div className="form-section">
                 <h3><FaCreditCard className="fs-icon"/> Medio de Pago</h3>
                 <div className="payment-options">
                    <div 
                      className={`pay-option ${paymentMethod === 'webpay' ? 'selected' : ''}`}
                      onClick={() => setPaymentMethod('webpay')}
                    >
                       <div className="radio-circle"></div>
                       <div className="pay-info">
                          <strong>Webpay Plus / Débito / Crédito</strong>
                          <span>Pago automático inmediato</span>
                       </div>
                       <FaCreditCard className="pay-icon"/>
                    </div>

                    <div 
                      className={`pay-option ${paymentMethod === 'transfer' ? 'selected' : ''}`}
                      onClick={() => setPaymentMethod('transfer')}
                    >
                       <div className="radio-circle"></div>
                       <div className="pay-info">
                          <strong>Transferencia Bancaria</strong>
                          <span>Envío de comprobante manual</span>
                       </div>
                       <FaUniversity className="pay-icon"/>
                    </div>
                 </div>
              </div>

              <button type="submit" className="btn-pay" disabled={loading}>
                 {loading ? "Procesando..." : `Pagar ${clp(cartTotal)}`}
              </button>
              <div className="secure-badge">
                 <FaLock/> Tus datos están encriptados y seguros.
              </div>

           </form>
        </div>

        {/* COLUMNA DERECHA: RESUMEN MINI */}
        <div className="mini-summary-col">
           <div className="mini-card">
              <h3>Tu Pedido</h3>
              <ul className="mini-list">
                 {cartItems.map(item => (
                    <li key={item.id}>
                       <div className="ml-info">
                          <strong>{item.title}</strong>
                          <small>{item.detail}</small>
                       </div>
                       <span className="ml-price">{clp(item.price)}</span>
                    </li>
                 ))}
              </ul>
              <div className="mini-total">
                 <span>Total a pagar</span>
                 <strong>{clp(cartTotal)}</strong>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
}

const cssCheckout = `
:root {
  --bg-deep: #020617;
  --bg-card: #1e293b;
  --gold: #fbbf24;
  --text-main: #f8fafc;
  --text-muted: #94a3b8;
  --border: rgba(255,255,255,0.1);
  --input-bg: #0f172a;
}

.checkout-page {
  background: var(--bg-deep); color: var(--text-main); font-family: 'Inter', sans-serif;
  min-height: 100vh; padding: 120px 0 80px;
}
.checkout-grid { display: grid; grid-template-columns: 2fr 1fr; gap: 60px; max-width: 1100px; margin: 0 auto; padding: 0 20px; }
@media(max-width: 900px) { .checkout-grid { grid-template-columns: 1fr; display: flex; flex-direction: column-reverse; } }

.checkout-header h1 { font-family: 'Playfair Display', serif; font-size: 2.5rem; margin-bottom: 10px; }
.checkout-header p { color: var(--text-muted); margin-bottom: 40px; }

.form-section { background: var(--bg-card); padding: 30px; border-radius: 16px; border: 1px solid var(--border); margin-bottom: 30px; }
.form-section h3 { margin-bottom: 20px; font-size: 1.2rem; display: flex; align-items: center; gap: 10px; color: var(--gold); }

.input-group { margin-bottom: 20px; }
.input-group label { display: block; margin-bottom: 8px; font-size: 0.9rem; color: var(--text-muted); }
.input-group input { width: 100%; padding: 12px 15px; border-radius: 8px; border: 1px solid var(--border); background: var(--input-bg); color: white; font-size: 1rem; }
.input-group input:focus { outline: none; border-color: var(--gold); }

.row-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
@media(max-width: 600px) { .row-2 { grid-template-columns: 1fr; } }

.icon-input { position: relative; }
.icon-input svg { position: absolute; left: 15px; top: 50%; transform: translateY(-50%); color: var(--text-muted); }
.icon-input input { padding-left: 40px; }

/* Payment Options */
.payment-options { display: flex; flex-direction: column; gap: 15px; }
.pay-option { 
  display: flex; align-items: center; gap: 15px; padding: 20px; 
  background: var(--input-bg); border: 1px solid var(--border); border-radius: 12px; 
  cursor: pointer; transition: 0.2s; 
}
.pay-option:hover { border-color: var(--gold); }
.pay-option.selected { border-color: var(--gold); background: rgba(251, 191, 36, 0.05); }

.radio-circle { width: 20px; height: 20px; border-radius: 50%; border: 2px solid var(--text-muted); position: relative; }
.pay-option.selected .radio-circle { border-color: var(--gold); }
.pay-option.selected .radio-circle::after { content: ''; position: absolute; top: 3px; left: 3px; width: 10px; height: 10px; background: var(--gold); border-radius: 50%; }

.pay-info { flex: 1; }
.pay-info strong { display: block; font-size: 1rem; margin-bottom: 2px; }
.pay-info span { font-size: 0.8rem; color: var(--text-muted); }
.pay-icon { font-size: 1.5rem; color: var(--text-muted); }

.btn-pay { width: 100%; background: var(--gold); color: black; border: none; padding: 18px; border-radius: 8px; font-weight: 700; font-size: 1.2rem; cursor: pointer; transition: 0.2s; margin-bottom: 15px; }
.btn-pay:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 5px 15px rgba(251, 191, 36, 0.3); }
.btn-pay:disabled { opacity: 0.7; cursor: not-allowed; }

.secure-badge { text-align: center; color: #10b981; font-size: 0.85rem; display: flex; align-items: center; justify-content: center; gap: 5px; }

/* Mini Summary */
.mini-card { background: #0f172a; padding: 30px; border-radius: 16px; border: 1px solid var(--border); position: sticky; top: 120px; }
.mini-card h3 { font-family: 'Playfair Display', serif; margin-bottom: 20px; font-size: 1.5rem; border-bottom: 1px solid var(--border); padding-bottom: 15px; }
.mini-list { list-style: none; padding: 0; margin-bottom: 20px; }
.mini-list li { display: flex; justify-content: space-between; margin-bottom: 15px; font-size: 0.9rem; }
.ml-info strong { display: block; color: var(--text-main); }
.ml-info small { color: var(--text-muted); }
.ml-price { font-weight: 700; color: var(--text-main); }

.mini-total { display: flex; justify-content: space-between; align-items: center; font-size: 1.2rem; border-top: 1px solid var(--border); padding-top: 20px; }
.mini-total strong { color: var(--gold); font-size: 1.5rem; }
`;