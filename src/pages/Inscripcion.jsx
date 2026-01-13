import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx"; 

// --- CONFIGURACIÓN ---
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzG26Civ9DJm5Fvr-jq7NSb7xEobqRJSa-VJLeil_3pTgqVBdWJiT4W5XyvsX9gq1JKPg/exec";
const WAPP_INTL = "56964626568"; 

/* ──────────────────────────────────────────────────────────────────────────
   1. UTILS & ICONS
   ────────────────────────────────────────────────────────────────────────── */
const clp = (amount) => {
  return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(amount || 0);
};

const Icons = {
  Copy: () => <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>,
  Check: () => <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>,
  Whatsapp: () => <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>,
  Lock: () => <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
  User: () => <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  Cart: () => <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
};

/* ──────────────────────────────────────────────────────────────────────────
   2. SUB-COMPONENTES
   ────────────────────────────────────────────────────────────────────────── */
function Toast({ msg }) {
  if (!msg) return null;
  return (
    <div className="toast-notification">
      <Icons.Check /> {msg}
    </div>
  );
}

function BankCard({ onCopy }) {
  const handleCopy = (val) => onCopy(val);
  return (
    <div className="bank-card-container">
      <div className="bank-card">
        <div className="card-top">
           <span className="card-chip"></span>
           <span className="card-bank-name">Mercado Pago</span>
        </div>
        <div className="card-number">
           <span onClick={() => handleCopy("1088183168")}>1088 183 168</span>
           <Icons.Copy />
        </div>
        <div className="card-details">
           <div className="cd-group">
              <label>Nombre</label>
              <span>Instituto Lael SpA</span>
           </div>
           <div className="cd-group">
              <label>RUT</label>
              <span onClick={() => handleCopy("78.084.019-6")}>78.084.019-6</span>
           </div>
        </div>
      </div>
      <div className="bank-info-footer">
         <small>Cuenta Vista / Chequera Electrónica</small>
         <small>pagos@institutolael.cl</small>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   3. COMPONENTE PRINCIPAL
   ────────────────────────────────────────────────────────────────────────── */
export default function Inscripciones() {
  const context = useCart();
  const cartItems = context?.cartItems || context?.cart || [];
  const total = context?.cartTotal || 0;
  const clearCart = context?.clearCart || (() => {});

  const [toastMsg, setToastMsg] = useState("");
  const [status, setStatus] = useState("idle"); 
  
  // MANTENEMOS EL ESTADO EN INGLÉS PARA REACT (BUENA PRÁCTICA)
  const [form, setForm] = useState({
    fullName: "",
    rut: "",
    email: "",
    phone: "",
    program: "", 
    comments: ""
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Pre-llenado de comentario
  useEffect(() => {
    if (cartItems.length > 0) {
      setForm(prev => ({
        ...prev,
        comments: prev.comments || `Compra Web.`
      }));
    }
  }, [cartItems]);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setToastMsg("Copiado con éxito");
    setTimeout(() => setToastMsg(""), 3000);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    const finalProgram = cartItems.length > 0 
        ? cartItems.map(item => item.title).join(" + ")
        : form.program;
        
    const finalTotal = cartItems.length > 0 ? total : "Por cotizar";

    // ──────────────────────────────────────────────────────────────────
    // AQUÍ ESTÁ EL ARREGLO ("A PRUEBA DE TODO")
    // Enviamos las llaves duplicadas (español e inglés) para que el Script
    // las agarre sí o sí, sin importar qué versión esté corriendo.
    // ──────────────────────────────────────────────────────────────────
    const payload = {
      // Para scripts actualizados (Inglés)
      fullName: form.fullName, 
      phone: form.phone,       
      program: finalProgram,   
      comments: form.comments, 
      
      // Para scripts antiguos (Español) - ESTO SOLUCIONARÁ TU PROBLEMA
      nombre: form.fullName,   
      telefono: form.phone,    
      programa: finalProgram,
      comentario: form.comments,
      
      // Comunes
      rut: form.rut,
      email: form.email,
      total: finalTotal,
      fecha: new Date().toLocaleString("es-CL")
    };

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors", 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      
      setStatus("success");
      if (cartItems.length > 0) clearCart();

    } catch (error) {
      console.error(error);
      setStatus("error");
      setToastMsg("Hubo un error. Intenta por WhatsApp.");
    }
  };

  // --- VISTA ÉXITO ---
  if (status === "success") {
    const totalDisplay = total > 0 ? clp(total) : "lo acordado";
    const textWsp = `Hola Lael! Soy *${form.fullName}*.\nYa envié mi ficha.\nAdjunto comprobante por ${totalDisplay} para mi matrícula.\n(RUT: ${form.rut})`;
    const linkWsp = `https://wa.me/${WAPP_INTL}?text=${encodeURIComponent(textWsp)}`;

    return (
      <div className="enroll-page success-view">
        <style>{css}</style>
        <div className="container success-container">
          <div className="success-icon"><Icons.Check /></div>
          <h1>¡Recibido!</h1>
          <p>Tu inscripción está en proceso. Para activar la matrícula, finaliza el pago.</p>
          
          <div className="next-steps-card">
            <h3>Paso Final: Transferencia</h3>
            <p className="steps-intro">
               Transfiere <strong>{totalDisplay}</strong> y envía el comprobante.
            </p>

            <div className="bank-mini-details">
                1088183168 | 78.084.019-6 <br/> pagos@institutolael.cl
            </div>

            <a href={linkWsp} target="_blank" rel="noreferrer" className="btn btn-whatsapp-lg">
               <Icons.Whatsapp /> Enviar Comprobante Ahora
            </a>
            
            <Link to="/" className="link-back">Volver al inicio</Link>
          </div>
        </div>
      </div>
    );
  }

  // --- VISTA FORMULARIO ---
  return (
    <div className="enroll-page">
      <style>{css}</style>
      <Toast msg={toastMsg} />

      <div className="container">
        
        <header className="page-header">
          <div className="secure-badge"><Icons.Lock/> Checkout Seguro</div>
          <h1>Finalizar Matrícula</h1>
        </header>

        <div className="layout-grid">
          
          {/* IZQUIERDA: FORM */}
          <main className="main-col">
            <form className="native-form" onSubmit={handleSubmit}>
              
              <div className="form-section-title">Datos Personales</div>
              
              <div className="input-group">
                <label>Nombre Completo</label>
                <div className="inp-wrapper">
                    <span className="inp-icon"><Icons.User/></span>
                    {/* name="fullName" COINCIDE CON EL STATE */}
                    <input type="text" name="fullName" className="inp" placeholder="Ej: Marcela Paz" required value={form.fullName} onChange={handleChange}/>
                </div>
              </div>

              <div className="row-2">
                <div className="input-group">
                  <label>RUT (Sin puntos)</label>
                  <input type="text" name="rut" className="inp" placeholder="12345678-9" required value={form.rut} onChange={handleChange}/>
                </div>
                <div className="input-group">
                  <label>WhatsApp</label>
                  {/* name="phone" COINCIDE CON EL STATE */}
                  <input type="tel" name="phone" className="inp" placeholder="+56 9..." required value={form.phone} onChange={handleChange}/>
                </div>
              </div>

              <div className="input-group">
                <label>Correo Electrónico</label>
                <input type="email" name="email" className="inp" placeholder="contacto@correo.com" required value={form.email} onChange={handleChange}/>
              </div>

              <div className="form-section-title mt-4">Detalle Académico</div>

              <div className="input-group">
                <label>Programa Seleccionado</label>
                
                {cartItems.length > 0 ? (
                    <div className="cart-summary-locked">
                        <div className="csl-header"><Icons.Cart/> Resumen de Compra</div>
                        <ul>
                            {cartItems.map((item, i) => (
                                <li key={i}>{item.title} <span className="price-tag">{clp(item.price)}</span></li>
                            ))}
                        </ul>
                        <div className="csl-total">
                            Total: <span>{clp(total)}</span>
                        </div>
                    </div>
                ) : (
                    <select name="program" className="inp select" required value={form.program} onChange={handleChange}>
                      <option value="">-- Selecciona Curso --</option>
                      <option value="PAES Anual">PAES Anual</option>
                      <option value="PAES Intensivo">PAES Intensivo</option>
                      <option value="Escuela Adultos">Escuela Adultos 2x1</option>
                      <option value="Ingles">Inglés</option>
                    </select>
                )}
              </div>

              <div className="input-group">
                <label>Comentarios (Opcional)</label>
                <textarea name="comments" className="inp ta" rows="2" placeholder="Dudas o requerimientos especiales" value={form.comments} onChange={handleChange}></textarea>
              </div>

              <div className="form-actions">
                <button type="submit" className={`btn btn-primary submit-btn ${status === 'loading' ? 'loading' : ''}`} disabled={status === 'loading'}>
                  {status === 'loading' ? <span className="spinner-mini"></span> : "Confirmar y Pagar"}
                </button>
              </div>

            </form>
          </main>

          {/* DERECHA: DATOS BANCARIOS */}
          <aside className="sidebar-col">
            <div className="sticky-content">
              <div className="payment-helper">
                <h3>Datos para Transferencia</h3>
                <p>Usa estos datos si prefieres transferencia directa:</p>
                <BankCard onCopy={handleCopy} />
              </div>
              
              <div className="trust-badges">
                <span>🔒 SSL Encriptado</span>
                <span>🎓 Garantía Académica</span>
              </div>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   4. CSS SCOPED
   ────────────────────────────────────────────────────────────────────────── */
const css = `
:root {
  --bg-deep: #020617;
  --bg-panel: #0f172a;
  --bg-input: #1e293b;
  --gold: #fbbf24;
  --gold-glow: rgba(251, 191, 36, 0.3);
  --text-main: #f8fafc;
  --text-muted: #94a3b8;
  --border: rgba(255,255,255,0.08);
}

.enroll-page {
  background-color: var(--bg-deep); color: var(--text-main);
  font-family: 'Inter', sans-serif; min-height: 100vh; padding-bottom: 80px;
}
.container { max-width: 1100px; margin: 0 auto; padding: 0 20px; }

/* HEADER */
.page-header { text-align: center; padding: 120px 0 50px; }
.secure-badge { 
  display: inline-flex; align-items: center; gap: 6px; 
  background: rgba(16, 185, 129, 0.1); color: #10b981; 
  padding: 5px 12px; border-radius: 50px; font-size: 0.75rem; font-weight: 700; 
  margin-bottom: 20px;
}
h1 { font-family: 'Playfair Display', serif; font-size: 3rem; margin: 0; }

/* LAYOUT */
.layout-grid { display: grid; grid-template-columns: 1.5fr 1fr; gap: 50px; align-items: start; }
@media (max-width: 900px) { .layout-grid { grid-template-columns: 1fr; display: flex; flex-direction: column-reverse; } }

/* FORMULARIO */
.native-form {
  background: var(--bg-panel); border: 1px solid var(--border);
  border-radius: 16px; padding: 40px;
}
.form-section-title { font-size: 1.1rem; color: var(--gold); margin-bottom: 20px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; border-bottom: 1px solid var(--border); padding-bottom: 10px; }
.mt-4 { margin-top: 30px; }

.input-group { margin-bottom: 20px; }
.input-group label { display: block; font-size: 0.9rem; color: var(--text-muted); margin-bottom: 8px; }

/* INPUTS FIX */
.inp {
  width: 100%; background: var(--bg-input); border: 1px solid var(--border);
  color: white; padding: 14px 16px; border-radius: 8px; font-size: 1rem;
  transition: 0.2s; font-family: inherit;
}
.inp:focus { outline: none; border-color: var(--gold); box-shadow: 0 0 0 3px var(--gold-glow); }
/* Autofill fix para Chrome en modo oscuro */
.inp:-webkit-autofill,
.inp:-webkit-autofill:hover, 
.inp:-webkit-autofill:focus {
  -webkit-text-fill-color: white;
  -webkit-box-shadow: 0 0 0px 1000px var(--bg-input) inset;
  transition: background-color 5000s ease-in-out 0s;
}

.inp-wrapper { position: relative; }
.inp-wrapper .inp { padding-left: 45px; }
.inp-icon { position: absolute; left: 15px; top: 50%; transform: translateY(-50%); color: var(--text-muted); }

.row-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
@media (max-width: 600px) { .row-2 { grid-template-columns: 1fr; } }

.select { cursor: pointer; }
.ta { resize: vertical; min-height: 80px; }

/* RESUMEN CARRITO */
.cart-summary-locked {
    background: rgba(251, 191, 36, 0.05); border: 1px dashed var(--gold);
    padding: 20px; border-radius: 12px;
}
.csl-header { display: flex; align-items: center; gap: 8px; font-weight: 700; color: var(--gold); margin-bottom: 10px; }
.cart-summary-locked ul { list-style: none; padding: 0; margin: 0 0 15px 0; }
.cart-summary-locked li { display: flex; justify-content: space-between; margin-bottom: 5px; font-size: 0.95rem; }
.price-tag { color: var(--text-muted); }
.csl-total { border-top: 1px solid var(--border); padding-top: 10px; font-weight: 700; font-size: 1.1rem; display: flex; justify-content: space-between; }
.csl-total span { color: var(--gold); }

/* BOTONES */
.submit-btn { width: 100%; height: 55px; font-size: 1.1rem; margin-top: 10px; }
.btn { display: inline-flex; align-items: center; justify-content: center; border-radius: 8px; font-weight: 700; cursor: pointer; border: none; transition: 0.3s; text-decoration: none; }
.btn-primary { background: var(--gold); color: #000; }
.btn-primary:hover { background: #fff; transform: translateY(-2px); }

/* TARJETA BANCARIA (Glassmorphism) */
.bank-card-container { margin-top: 10px; }
.bank-card {
  background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05));
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 16px; padding: 25px;
  position: relative; overflow: hidden;
  box-shadow: 0 15px 35px rgba(0,0,0,0.5);
  color: white; font-family: 'Courier New', monospace;
}
.card-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; }
.card-chip { width: 40px; height: 30px; background: linear-gradient(135deg, #d97706, #fbbf24); border-radius: 6px; }
.card-bank-name { font-weight: 700; font-family: sans-serif; opacity: 0.8; }
.card-number { font-size: 1.4rem; letter-spacing: 2px; margin-bottom: 25px; display: flex; justify-content: space-between; align-items: center; cursor: pointer; transition: 0.2s; }
.card-number:hover { color: var(--gold); }
.card-number svg { opacity: 0; transition: 0.2s; }
.card-number:hover svg { opacity: 1; }
.card-details { display: flex; justify-content: space-between; font-family: sans-serif; font-size: 0.8rem; }
.cd-group label { display: block; opacity: 0.5; font-size: 0.6rem; margin-bottom: 2px; }
.cd-group span { font-weight: 600; cursor: pointer; }
.cd-group span:hover { color: var(--gold); }

.bank-info-footer { display: flex; justify-content: space-between; margin-top: 10px; color: var(--text-muted); font-size: 0.75rem; }

.trust-badges { display: flex; gap: 15px; justify-content: center; margin-top: 20px; font-size: 0.8rem; color: #10b981; opacity: 0.8; }
.sticky-content { position: sticky; top: 100px; }

/* SUCCESS */
.success-view { display: flex; align-items: center; justify-content: center; padding-top: 80px; }
.success-container { text-align: center; max-width: 600px; animation: fadeIn 0.5s ease; }
.success-icon { width: 80px; height: 80px; background: #10b981; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; color: black; margin-bottom: 20px; box-shadow: 0 0 30px rgba(16, 185, 129, 0.4); }

.next-steps-card { background: var(--bg-panel); border: 1px solid var(--border); border-radius: 16px; padding: 40px; margin-top: 30px; text-align: left; }
.next-steps-card h3 { color: white; margin-bottom: 10px; }
.btn-whatsapp-lg { width: 100%; background: #25D366; color: #000; padding: 16px; font-size: 1.1rem; gap: 10px; margin: 20px 0; }
.btn-whatsapp-lg:hover { filter: brightness(1.1); }
.link-back { display: block; text-align: center; color: var(--text-muted); margin-top: 15px; font-size: 0.9rem; }

.spinner-mini { width: 20px; height: 20px; border: 2px solid rgba(0,0,0,0.3); border-top-color: #000; border-radius: 50%; animation: spin 0.8s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }
@keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }

.toast-notification { position: fixed; bottom: 30px; left: 50%; transform: translateX(-50%); background: var(--gold); color: #000; padding: 10px 20px; border-radius: 30px; font-weight: 700; z-index: 100; display: flex; align-items: center; gap: 8px; animation: fadeIn 0.3s; }
`;