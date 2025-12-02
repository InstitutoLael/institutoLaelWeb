import { useState, useEffect } from "react";
// Importamos el SEO si existe, si no puedes borrarlo
import SEOHead from "../components/SEOHead.jsx";

// --- ASSETS ---
// Usaremos un placeholder para el logo si no carga, pero dejamos tu ruta lista
// Asegúrate de que la imagen u1.png exista en esa carpeta
import mpLogo from "../assets/img/Partners/u1.png"; 

// Link de Google Forms
const FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSfDVse7cbhnAOhA2OklnmBvaeKZY4ZDWOmrYFqSfAvV8joVOA/viewform?embedded=true";
const WAPP_INTL = "56964626568";

/* ──────────────────────────────────────────────────────────────────────────
   1. ICONOS SVG (Utilidad)
   ────────────────────────────────────────────────────────────────────────── */
const Icons = {
  Copy: () => <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>,
  Check: () => <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>,
  Whatsapp: () => <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>,
  Mail: () => <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>,
  Lock: () => <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
  CreditCard: () => <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
};

/* ──────────────────────────────────────────────────────────────────────────
   2. COMPONENTES DE UTILIDAD
   ────────────────────────────────────────────────────────────────────────── */

// Notificación Flotante
function Toast({ msg }) {
  if (!msg) return null;
  return (
    <div className="toast-notification">
      <Icons.Check /> {msg}
    </div>
  );
}

// Fila de Copiado (Para datos bancarios)
function CopyRow({ label, value, onCopy }) {
  return (
    <div className="copy-row" onClick={() => onCopy(value)}>
      <span className="copy-label">{label}</span>
      <span className="copy-val">{value}</span>
      <span className="copy-icon"><Icons.Copy /></span>
    </div>
  );
}

// Tarjeta de Transferencia (Estilo Crédito)
function BankCard({ onCopy }) {
  return (
    <div className="bank-card">
      <div className="bank-header">
        <span className="bank-title">Datos de Transferencia</span>
        <div className="bank-logo-box">
            {/* Si no carga la imagen, muestra texto */}
            <img src={mpLogo} alt="Mercado Pago" className="mp-img" onError={(e) => e.target.style.display='none'} />
            <span className="mp-fallback">Mercado Pago</span>
        </div>
      </div>
      <div className="bank-body">
        <p className="bank-type">Cuenta Vista / Chequera</p>
        <CopyRow label="N° Cuenta" value="1088183168" onCopy={onCopy} />
        <CopyRow label="RUT" value="78.084.019-6" onCopy={onCopy} />
        
        <div className="bank-footer">
          <div className="bf-col">
            <span className="bf-label">Titular</span>
            <span className="bf-val">Instituto Lael SpA</span>
          </div>
          <div className="bf-col right">
            <span className="bf-label">Correo</span>
            <span className="bf-val">pagos@institutolael.cl</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Contacto Rápido
function QuickHelp() {
  return (
    <div className="quick-help">
      <h4>¿Necesitas ayuda antes de pagar?</h4>
      <p>Habla directamente con admisión para resolver dudas sobre métodos de pago.</p>
      <div className="qh-actions">
        <a href={`https://wa.me/${WAPP_INTL}`} target="_blank" rel="noreferrer" className="btn-qh whatsapp">
          <Icons.Whatsapp/> Chat Soporte
        </a>
        <a href="mailto:contacto@institutolael.cl" className="btn-qh email">
          <Icons.Mail/> Correo
        </a>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   3. COMPONENTE PRINCIPAL
   ────────────────────────────────────────────────────────────────────────── */
export default function Inscripciones() {
  const [loading, setLoading] = useState(true);
  const [toastMsg, setToastMsg] = useState("");

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setToastMsg("Copiado al portapapeles");
    setTimeout(() => setToastMsg(""), 3000);
  };

  return (
    <div className="enroll-page">
      <style>{css}</style>
      
      {/* Toast Notification */}
      <Toast msg={toastMsg} />

      <div className="container">
        
        {/* HEADER */}
        <header className="page-header">
          <div className="secure-badge"><Icons.Lock/> Inscripción Segura SSL</div>
          <h1>Matrícula Online</h1>
          <p>Completa el formulario y asegura tu cupo para el proceso de Admisión.</p>
        </header>

        <div className="layout-grid">
          
          {/* COLUMNA IZQUIERDA: FORMULARIO */}
          <div className="main-col">
            <div className="form-container">
              {loading && (
                <div className="loading-state">
                  <div className="spinner"></div>
                  <span>Cargando formulario seguro...</span>
                </div>
              )}
              <iframe 
                src={FORM_URL} 
                width="100%" 
                height="1300" 
                frameBorder="0" 
                marginHeight="0" 
                marginWidth="0" 
                onLoad={() => setLoading(false)}
                title="Formulario Inscripción"
              >
                Cargando...
              </iframe>
            </div>
          </div>

          {/* COLUMNA DERECHA: PAGO & AYUDA */}
          <aside className="sidebar-col">
            
            {/* Bloque de Pago */}
            <div className="sidebar-widget">
              <h3><Icons.CreditCard/> Información de Pago</h3>
              <p className="widget-desc">
                Una vez enviado el formulario, realiza la transferencia de la matrícula a la siguiente cuenta:
              </p>
              <BankCard onCopy={handleCopy} />
              <div className="payment-note">
                * Envía el comprobante a <strong>pagos@institutolael.cl</strong> indicando el nombre del alumno.
              </div>
            </div>

            {/* Bloque de Ayuda */}
            <div className="sidebar-widget">
              <QuickHelp />
            </div>

          </aside>

        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   4. ESTILOS CSS - "PAYMENT DASHBOARD"
   ────────────────────────────────────────────────────────────────────────── */
const css = `
:root {
  --bg-body: #050505;
  --bg-panel: #0F1115;
  --bg-surface: #181b21;
  
  --primary: #6366f1; /* Indigo */
  --accent: #10b981;  /* Emerald */
  --text-main: #fff;
  --text-muted: #94a3b8;
  
  --border: rgba(255,255,255,0.1);
  --radius: 16px;
}

.enroll-page {
  background-color: var(--bg-body);
  color: var(--text-main);
  font-family: 'Inter', sans-serif;
  min-height: 100vh;
  padding-bottom: 80px;
}

.container { max-width: 1100px; margin: 0 auto; padding: 0 24px; }

/* HEADER */
.page-header { text-align: center; padding: 60px 0 40px; }
.secure-badge { 
  display: inline-flex; align-items: center; gap: 6px; 
  background: rgba(16, 185, 129, 0.1); color: var(--accent); 
  padding: 6px 12px; border-radius: 50px; font-size: 0.8rem; font-weight: 700; 
  border: 1px solid rgba(16, 185, 129, 0.2); margin-bottom: 20px;
}
h1 { font-size: 2.5rem; margin-bottom: 10px; font-weight: 800; }
p { color: var(--text-muted); font-size: 1.1rem; }

/* LAYOUT */
.layout-grid { display: grid; grid-template-columns: 1.4fr 1fr; gap: 40px; align-items: start; }
@media (max-width: 900px) { .layout-grid { grid-template-columns: 1fr; } }

/* FORM CONTAINER */
.form-container { 
  background: #fff; border-radius: var(--radius); overflow: hidden; 
  position: relative; min-height: 600px;
}
.loading-state {
  position: absolute; inset: 0; background: var(--bg-panel); display: flex; 
  flex-direction: column; align-items: center; justify-content: center; z-index: 10;
  color: var(--text-muted); font-size: 0.9rem;
}
.spinner { 
  width: 40px; height: 40px; border: 3px solid rgba(99,102,241,0.3); 
  border-top-color: var(--primary); border-radius: 50%; margin-bottom: 15px; 
  animation: spin 1s linear infinite; 
}
@keyframes spin { to { transform: rotate(360deg); } }

/* SIDEBAR WIDGETS */
.sidebar-widget { margin-bottom: 30px; }
.sidebar-widget h3 { font-size: 1.2rem; display: flex; align-items: center; gap: 10px; margin-bottom: 10px; }
.widget-desc { font-size: 0.9rem; color: var(--text-muted); margin-bottom: 20px; line-height: 1.5; }

/* BANK CARD (The Star) */
.bank-card {
  background: linear-gradient(135deg, #1e1b4b 0%, #312e81 100%);
  border: 1px solid rgba(255,255,255,0.1); border-radius: 20px; padding: 24px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.4); position: relative; overflow: hidden;
}
.bank-card::before {
  content:''; position: absolute; top: -50px; right: -50px; width: 150px; height: 150px;
  background: rgba(255,255,255,0.05); border-radius: 50%; pointer-events: none;
}

.bank-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
.bank-title { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 1px; color: rgba(255,255,255,0.7); }
.mp-img { height: 24px; object-fit: contain; }
.mp-fallback { font-weight: 700; font-size: 0.9rem; color: white; display: none; }
.bank-logo-box img[style*="none"] + .mp-fallback { display: block; } /* Show text if img fails */

.bank-type { font-size: 0.85rem; color: rgba(255,255,255,0.8); margin-bottom: 15px; }

/* Copy Row */
.copy-row {
  display: flex; justify-content: space-between; align-items: center;
  background: rgba(0,0,0,0.2); padding: 12px 15px; border-radius: 10px;
  margin-bottom: 10px; cursor: pointer; transition: 0.2s; border: 1px solid transparent;
}
.copy-row:hover { background: rgba(0,0,0,0.3); border-color: rgba(255,255,255,0.1); }
.copy-label { font-size: 0.8rem; color: rgba(255,255,255,0.6); }
.copy-val { font-family: monospace; font-size: 1rem; color: white; letter-spacing: 0.5px; }
.copy-icon { color: var(--accent); opacity: 0.8; }

.bank-footer { display: flex; justify-content: space-between; margin-top: 20px; padding-top: 15px; border-top: 1px solid rgba(255,255,255,0.1); }
.bf-col { display: flex; flex-direction: column; }
.bf-col.right { text-align: right; }
.bf-label { font-size: 0.65rem; text-transform: uppercase; color: rgba(255,255,255,0.5); margin-bottom: 4px; }
.bf-val { font-size: 0.85rem; font-weight: 600; color: white; }

.payment-note { font-size: 0.8rem; color: var(--text-muted); margin-top: 15px; background: var(--bg-surface); padding: 12px; border-radius: 8px; border: 1px solid var(--border); }
.payment-note strong { color: var(--text-main); }

/* QUICK HELP */
.quick-help { background: var(--bg-panel); padding: 25px; border-radius: 20px; border: 1px solid var(--border); text-align: center; }
.quick-help h4 { margin-bottom: 8px; font-size: 1.1rem; }
.quick-help p { font-size: 0.9rem; color: var(--text-muted); margin-bottom: 20px; }
.qh-actions { display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; }
.btn-qh { 
  flex: 1; min-width: 120px; padding: 10px; border-radius: 8px; font-size: 0.9rem; font-weight: 600; 
  display: flex; align-items: center; justify-content: center; gap: 8px; transition: 0.2s;
}
.btn-qh.whatsapp { background: #25D366; color: #000; }
.btn-qh.email { background: transparent; border: 1px solid var(--border); color: var(--text-main); }
.btn-qh:hover { filter: brightness(1.1); transform: translateY(-2px); }

/* TOAST */
.toast-notification {
  position: fixed; bottom: 30px; left: 50%; transform: translateX(-50%);
  background: var(--accent); color: #000; padding: 10px 24px; border-radius: 50px;
  font-weight: 700; box-shadow: 0 10px 30px rgba(0,0,0,0.5); z-index: 100;
  display: flex; align-items: center; gap: 8px; animation: popUp 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
@keyframes popUp { from { transform: translate(-50%, 20px); opacity: 0; } to { transform: translate(-50%, 0); opacity: 1; } }
`;