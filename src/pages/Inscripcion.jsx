// src/pages/Inscripciones.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import SEOHead from "../components/SEOHead.jsx";

// --- ASSETS ---
import mpLogo from "../assets/img/Partners/u1.png"; 

// ⚙️ CONFIGURACIÓN DE TU API CLOUDFLARE
// Aquí debes poner la URL de tu Worker. Si estás en local: "http://localhost:8787/api/enroll"
// En producción será algo como: "https://api.institutolael.cl/enroll"
const API_URL = "https://tu-worker-url.workers.dev/api/enroll"; 
const WAPP_INTL = "56964626568";

/* ──────────────────────────────────────────────────────────────────────────
   1. ICONOS SVG
   ────────────────────────────────────────────────────────────────────────── */
const Icons = {
  Copy: () => <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>,
  Check: () => <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>,
  Whatsapp: () => <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>,
  Mail: () => <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>,
  Lock: () => <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
  CreditCard: () => <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>,
  Send: () => <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>,
  User: () => <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
};

/* ──────────────────────────────────────────────────────────────────────────
   2. COMPONENTES AUXILIARES
   ────────────────────────────────────────────────────────────────────────── */
function Toast({ msg }) {
  if (!msg) return null;
  return (
    <div className="toast-notification">
      <Icons.Check /> {msg}
    </div>
  );
}

function CopyRow({ label, value, onCopy }) {
  return (
    <div className="copy-row" onClick={() => onCopy(value)} title="Clic para copiar">
      <span className="copy-label">{label}</span>
      <span className="copy-val">{value}</span>
      <span className="copy-icon"><Icons.Copy /></span>
    </div>
  );
}

function BankCard({ onCopy }) {
  return (
    <div className="bank-card">
      <div className="bank-header">
        <span className="bank-title">Datos Transferencia</span>
        <div className="bank-logo-box">
            <img src={mpLogo} alt="Mercado Pago" className="mp-img" onError={(e) => e.target.style.display='none'} />
        </div>
      </div>
      <div className="bank-body">
        <p className="bank-type">Cuenta Vista / Chequera</p>
        <CopyRow label="N° Cuenta" value="1088183168" onCopy={onCopy} />
        <CopyRow label="RUT" value="78.084.019-6" onCopy={onCopy} />
        <div className="bank-footer">
          <div className="bf-col">
            <span className="bf-label">Titular</span><span className="bf-val">Instituto Lael SpA</span>
          </div>
          <div className="bf-col right">
            <span className="bf-label">Correo</span><span className="bf-val">pagos@institutolael.cl</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   3. PÁGINA PRINCIPAL
   ────────────────────────────────────────────────────────────────────────── */
export default function Inscripciones() {
  const [toastMsg, setToastMsg] = useState("");
  const [status, setStatus] = useState("idle"); // idle, loading, success, error
  
  // Estado del Formulario
  const [form, setForm] = useState({
    fullName: "",
    rut: "",
    email: "",
    phone: "",
    program: "",
    comments: ""
  });

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setToastMsg("Copiado al portapapeles");
    setTimeout(() => setToastMsg(""), 3000);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // --- LOGICA DE ENVÍO A CLOUDFLARE ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      // 1. Simular envío (borrar esto cuando tengas la API real)
      // await new Promise(r => setTimeout(r, 1500)); 
      
      // 2. Envío Real (Descomentar cuando conectes el Worker)
      /*
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      if (!res.ok) throw new Error("Error en el servidor");
      */
      
      // Simulación de éxito por ahora
      setTimeout(() => setStatus("success"), 1500);

    } catch (error) {
      console.error(error);
      setStatus("error");
      setToastMsg("Hubo un error. Intenta por WhatsApp.");
    }
  };

  // VISTA: Éxito
  if (status === "success") {
    return (
      <div className="enroll-page success-view">
        <style>{css}</style>
        <div className="container success-container">
          <div className="success-icon"><Icons.Check /></div>
          <h1>¡Inscripción Recibida!</h1>
          <p>Tus datos han sido guardados correctamente en nuestro sistema.</p>
          <div className="next-steps-card">
            <h3>Siguientes Pasos</h3>
            <ol>
              <li>Realiza el <strong>pago de matrícula</strong> usando los datos a la derecha (o abajo).</li>
              <li>Envía el comprobante a <strong>pagos@institutolael.cl</strong>.</li>
              <li>Te confirmaremos el alta en menos de 24 horas.</li>
            </ol>
            <div className="btn-row-center">
                <Link to="/" className="btn btn-outline">Volver al Inicio</Link>
                <a href={`https://wa.me/${WAPP_INTL}`} className="btn btn-primary">Tengo dudas</a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // VISTA: Formulario
  return (
    <div className="enroll-page">
      <style>{css}</style>
      <SEOHead title="Matrícula Online | Instituto Lael" description="Formulario de inscripción oficial." />
      <Toast msg={toastMsg} />

      <div className="container">
        
        {/* HEADER */}
        <header className="page-header">
          <div className="secure-badge"><Icons.Lock/> Datos encriptados</div>
          <h1>Ficha de Matrícula</h1>
          <p>Ingresa tus datos para registrarte en la base de datos de Admisión 2025.</p>
        </header>

        <div className="layout-grid">
          
          {/* COLUMNA IZQUIERDA: FORMULARIO NATIVO */}
          <main className="main-col">
            <form className="native-form" onSubmit={handleSubmit}>
              
              <h2 className="form-title">Datos del Estudiante</h2>
              
              <div className="form-group">
                <label>Nombre Completo <span className="req">*</span></label>
                <div className="inp-wrapper">
                    <span className="inp-icon"><Icons.User/></span>
                    <input 
                      type="text" name="fullName" className="inp" placeholder="Ej: Andrea Pérez" 
                      required value={form.fullName} onChange={handleChange}
                    />
                </div>
              </div>

              <div className="row-2">
                <div className="form-group">
                  <label>RUT (con puntos y guion) <span className="req">*</span></label>
                  <input 
                    type="text" name="rut" className="inp" placeholder="12.345.678-9" 
                    required value={form.rut} onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Teléfono (WhatsApp) <span className="req">*</span></label>
                  <input 
                    type="tel" name="phone" className="inp" placeholder="+56 9..." 
                    required value={form.phone} onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Correo Electrónico <span className="req">*</span></label>
                <input 
                  type="email" name="email" className="inp" placeholder="ejemplo@correo.com" 
                  required value={form.email} onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Programa de Interés <span className="req">*</span></label>
                <select name="program" className="inp select" required value={form.program} onChange={handleChange}>
                  <option value="">-- Selecciona una opción --</option>
                  <option value="paes_anual">PAES Anual</option>
                  <option value="paes_intensivo">PAES Intensivo</option>
                  <option value="ingles">Cursos de Inglés</option>
                  <option value="lsch">Lengua de Señas (LSCh)</option>
                  <option value="reforzamiento">Reforzamiento Escolar</option>
                  <option value="otro">Otro</option>
                </select>
              </div>

              <div className="form-group">
                <label>Comentarios adicionales</label>
                <textarea 
                  name="comments" className="inp ta" rows="3" 
                  placeholder="¿Alguna duda o requerimiento especial?"
                  value={form.comments} onChange={handleChange}
                ></textarea>
              </div>

              <div className="form-actions">
                <button type="submit" className={`btn btn-primary submit-btn ${status === 'loading' ? 'loading' : ''}`} disabled={status === 'loading'}>
                  {status === 'loading' ? <span className="spinner-mini"></span> : <><Icons.Send /> Enviar Inscripción</>}
                </button>
                <p className="legal-text">
                  Al enviar, aceptas registrar tus datos en nuestro sistema académico privado.
                </p>
              </div>

            </form>
          </main>

          {/* COLUMNA DERECHA: SIDEBAR */}
          <aside className="sidebar-col">
            <div className="sticky-content">
              
              <div className="sidebar-widget">
                <h3><Icons.CreditCard/> Pago de Matrícula</h3>
                <p className="widget-desc">
                  Para validar tu inscripción, recuerda transferir el valor de la matrícula:
                </p>
                <BankCard onCopy={handleCopy} />
                <div className="payment-note">
                  <strong>Nota:</strong> No olvides enviar tu comprobante tras realizar el pago.
                </div>
              </div>

              <div className="quick-help">
                <h4>¿Necesitas ayuda?</h4>
                <div className="qh-actions">
                    <a href={`https://wa.me/${WAPP_INTL}`} target="_blank" rel="noreferrer" className="btn-qh whatsapp">
                    <Icons.Whatsapp/> Chat Soporte
                    </a>
                </div>
              </div>

            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   4. ESTILOS CSS - (Dark Mode Nativo)
   ────────────────────────────────────────────────────────────────────────── */
const css = `
:root {
  --bg-body: #050505;
  --bg-panel: #0F1115;
  --bg-input: #13161c;
  --primary: #6366f1;
  --primary-dark: #4f46e5;
  --accent: #10b981; 
  --text-main: #ffffff;
  --text-muted: #94a3b8;
  --border: rgba(255,255,255,0.08);
  --radius: 16px;
}

.enroll-page {
  background-color: var(--bg-body);
  color: var(--text-main);
  font-family: 'Inter', system-ui, sans-serif;
  min-height: 100vh;
  padding-bottom: 80px;
}

.container { max-width: 1100px; margin: 0 auto; padding: 0 20px; }

/* HEADER */
.page-header { text-align: center; padding: 60px 0 50px; }
.secure-badge { 
  display: inline-flex; align-items: center; gap: 6px; 
  background: rgba(99, 102, 241, 0.1); color: #a5b4fc; 
  padding: 6px 14px; border-radius: 50px; font-size: 0.8rem; font-weight: 700; 
  border: 1px solid rgba(99, 102, 241, 0.2); margin-bottom: 24px;
}
h1 { font-size: clamp(2rem, 4vw, 3rem); margin-bottom: 12px; font-weight: 800; letter-spacing: -0.02em; }
.page-header p { color: var(--text-muted); font-size: 1.1rem; max-width: 600px; margin: 0 auto; }

/* LAYOUT */
.layout-grid { 
  display: grid; grid-template-columns: 1.4fr 1fr; gap: 40px; align-items: start; 
}
@media (max-width: 900px) { .layout-grid { grid-template-columns: 1fr; } }

/* FORMULARIO NATIVO */
.native-form {
  background: var(--bg-panel); border: 1px solid var(--border);
  border-radius: var(--radius); padding: 32px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.2);
}
.form-title { font-size: 1.25rem; margin-bottom: 24px; border-bottom: 1px solid var(--border); padding-bottom: 15px; color: white; }

.form-group { margin-bottom: 20px; }
.form-group label { display: block; font-size: 0.9rem; font-weight: 600; color: var(--text-muted); margin-bottom: 8px; }
.req { color: var(--accent); }

.inp {
  width: 100%; background: var(--bg-input); border: 1px solid var(--border);
  color: white; padding: 12px 16px; border-radius: 10px; font-size: 1rem;
  transition: 0.2s; font-family: inherit;
}
.inp:focus { outline: none; border-color: var(--primary); box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15); }
.inp-wrapper { position: relative; }
.inp-wrapper .inp { padding-left: 40px; }
.inp-icon { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: var(--text-muted); display: flex; }

.row-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
@media (max-width: 600px) { .row-2 { grid-template-columns: 1fr; } }

.ta { min-height: 100px; resize: vertical; }
.select { appearance: none; background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'/%3e%3c/svg%3e"); background-repeat: no-repeat; background-position: right 1rem center; background-size: 1em; }

/* BOTONES */
.form-actions { margin-top: 30px; }
.submit-btn { width: 100%; justify-content: center; height: 50px; font-size: 1rem; }
.btn { display: inline-flex; align-items: center; gap: 8px; padding: 12px 24px; border-radius: 12px; font-weight: 700; cursor: pointer; border: none; transition: 0.2s; text-decoration: none; }
.btn-primary { background: var(--primary); color: white; box-shadow: 0 4px 15px rgba(99,102,241,0.3); }
.btn-primary:hover { background: var(--primary-dark); transform: translateY(-1px); }
.btn-outline { background: transparent; border: 1px solid var(--border); color: white; }
.btn-outline:hover { border-color: white; }

.legal-text { font-size: 0.75rem; color: var(--text-muted); text-align: center; margin-top: 15px; }

/* SPINNER */
.spinner-mini { width: 20px; height: 20px; border: 2px solid rgba(255,255,255,0.3); border-top-color: white; border-radius: 50%; animation: spin 0.8s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }

/* SIDEBAR WIDGETS */
.sticky-content { position: sticky; top: 20px; }
.sidebar-widget { margin-bottom: 30px; }
.sidebar-widget h3 { font-size: 1.1rem; display: flex; align-items: center; gap: 10px; margin-bottom: 12px; font-weight: 700; }
.widget-desc { font-size: 0.9rem; color: var(--text-muted); margin-bottom: 15px; }

/* BANK CARD */
.bank-card {
  background: linear-gradient(135deg, #1e1b4b 0%, #312e81 100%);
  border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 20px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.3); overflow: hidden;
}
.bank-header { display: flex; justify-content: space-between; margin-bottom: 15px; }
.bank-title { font-size: 0.7rem; text-transform: uppercase; color: rgba(255,255,255,0.6); font-weight: 700; }
.mp-img { height: 24px; filter: brightness(0) invert(1); opacity: 0.9; }
.bank-type { font-size: 0.85rem; color: rgba(255,255,255,0.9); margin-bottom: 12px; }

.copy-row {
  display: flex; justify-content: space-between; align-items: center;
  background: rgba(0,0,0,0.25); padding: 10px 14px; border-radius: 8px;
  margin-bottom: 8px; cursor: pointer; transition: 0.2s;
}
.copy-row:hover { background: rgba(0,0,0,0.4); }
.copy-val { font-family: monospace; font-size: 1rem; color: white; font-weight: 600; }
.copy-icon { color: var(--accent); opacity: 0.8; font-size: 0.8rem; }
.bank-footer { margin-top: 15px; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 10px; display: flex; justify-content: space-between; }
.bf-label { font-size: 0.65rem; text-transform: uppercase; color: rgba(255,255,255,0.5); display: block; }
.bf-val { font-size: 0.8rem; font-weight: 600; }
.payment-note { font-size: 0.85rem; color: var(--text-muted); margin-top: 15px; background: var(--bg-panel); padding: 12px; border-radius: 8px; border: 1px solid var(--border); }

/* QUICK HELP */
.quick-help { background: var(--bg-panel); padding: 20px; border-radius: 16px; border: 1px solid var(--border); text-align: center; }
.quick-help h4 { font-size: 1rem; margin-bottom: 10px; }
.btn-qh { display: flex; align-items: center; justify-content: center; gap: 8px; padding: 10px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 0.9rem; }
.btn-qh.whatsapp { background: #25D366; color: #000; }
.btn-qh.whatsapp:hover { filter: brightness(1.1); }

/* SUCCESS VIEW */
.success-view { display: flex; align-items: center; justify-content: center; text-align: center; }
.success-container { max-width: 600px; animation: popUp 0.5s ease; }
.success-icon { width: 80px; height: 80px; background: var(--accent); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 24px; color: #000; }
.success-icon svg { width: 40px; height: 40px; }
.next-steps-card { background: var(--bg-panel); border: 1px solid var(--border); border-radius: var(--radius); padding: 30px; margin-top: 30px; text-align: left; }
.next-steps-card ol { padding-left: 20px; color: var(--text-muted); line-height: 1.6; margin-bottom: 24px; }
.next-steps-card li { margin-bottom: 10px; }
.btn-row-center { display: flex; gap: 10px; justify-content: center; }

/* TOAST */
.toast-notification {
  position: fixed; bottom: 30px; left: 50%; transform: translateX(-50%);
  background: var(--accent); color: #000; padding: 12px 24px; border-radius: 50px;
  font-weight: 700; z-index: 100; display: flex; align-items: center; gap: 8px;
  animation: popUp 0.4s ease;
}
@keyframes popUp { from { transform: translate(-50%, 20px); opacity: 0; } to { transform: translate(-50%, 0); opacity: 1; } }
`;