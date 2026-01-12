// src/pages/Inscripciones.jsx
import { useState } from "react";
// Importamos el SEO (asegúrate de tener este componente, si no, borra la línea)
import SEOHead from "../components/SEOHead.jsx";

// --- ASSETS ---
// Si la imagen falla, el código tiene un respaldo de texto, así que no te preocupes si la ruta cambia
import mpLogo from "../assets/img/Partners/u1.png"; 

// CONFIGURACIÓN
const FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSfDVse7cbhnAOhA2OklnmBvaeKZY4ZDWOmrYFqSfAvV8joVOA/viewform?embedded=true";
const WAPP_INTL = "56964626568";

/* ──────────────────────────────────────────────────────────────────────────
   1. ICONOS SVG (Estilo Minimalista)
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
   2. COMPONENTES DE UI (Widgets)
   ────────────────────────────────────────────────────────────────────────── */

// Notificación Flotante (Toast)
function Toast({ msg }) {
  if (!msg) return null;
  return (
    <div className="toast-notification">
      <Icons.Check /> {msg}
    </div>
  );
}

// Fila Copiable (Para datos bancarios)
function CopyRow({ label, value, onCopy }) {
  return (
    <div className="copy-row" onClick={() => onCopy(value)} title="Clic para copiar">
      <span className="copy-label">{label}</span>
      <span className="copy-val">{value}</span>
      <span className="copy-icon"><Icons.Copy /></span>
    </div>
  );
}

// Tarjeta Bancaria (Estilo Tarjeta de Crédito Premium)
function BankCard({ onCopy }) {
  return (
    <div className="bank-card">
      <div className="bank-header">
        <span className="bank-title">Datos Transferencia</span>
        <div className="bank-logo-box">
            {/* Fallback inteligente: Si la imagen falla, no se rompe el layout */}
            <img 
              src={mpLogo} 
              alt="Mercado Pago" 
              className="mp-img" 
              onError={(e) => e.target.style.display='none'} 
            />
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

// Widget de Ayuda Rápida
function QuickHelp() {
  return (
    <div className="quick-help">
      <h4>¿Dudas con la matrícula?</h4>
      <p>Habla con admisión para guiarte en el proceso.</p>
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
   3. PÁGINA PRINCIPAL
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
      <SEOHead 
        title="Matrícula Online | Instituto Lael" 
        description="Formulario de inscripción y pago de matrícula."
      />
      
      <Toast msg={toastMsg} />

      <div className="container">
        
        {/* HEADER */}
        <header className="page-header">
          <div className="secure-badge"><Icons.Lock/> Inscripción Segura SSL</div>
          <h1>Matrícula Online</h1>
          <p>Completa tus datos académicos y asegura tu cupo para este año.</p>
        </header>

        <div className="layout-grid">
          
          {/* COLUMNA IZQUIERDA: FORMULARIO */}
          <main className="main-col">
            <div className="form-wrapper">
              {loading && (
                <div className="loading-state">
                  <div className="spinner"></div>
                  <span>Cargando formulario seguro...</span>
                </div>
              )}
              {/* Iframe optimizado para móviles */}
              <iframe 
                src={FORM_URL} 
                className="google-form-iframe"
                onLoad={() => setLoading(false)}
                title="Formulario Inscripción"
              >
                Cargando...
              </iframe>
            </div>
          </main>

          {/* COLUMNA DERECHA: PAGO & AYUDA (Sticky) */}
          <aside className="sidebar-col">
            <div className="sticky-content">
              
              {/* Bloque 1: Pago */}
              <div className="sidebar-widget">
                <h3><Icons.CreditCard/> Pago de Matrícula</h3>
                <p className="widget-desc">
                  Una vez enviado el formulario, transfiere el valor de la matrícula a la cuenta oficial:
                </p>
                
                <BankCard onCopy={handleCopy} />
                
                <div className="payment-note">
                  <strong>Importante:</strong> Envía el comprobante a <em>pagos@institutolael.cl</em> indicando el nombre del alumno.
                </div>
              </div>

              {/* Bloque 2: Ayuda */}
              <div className="sidebar-widget">
                <QuickHelp />
              </div>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   4. ESTILOS CSS (Dark Mode Premium)
   ────────────────────────────────────────────────────────────────────────── */
const css = `
:root {
  --bg-body: #050505;
  --bg-panel: #0F1115;
  --bg-surface: #181b21;
  --primary: #6366f1;
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

.container { max-width: 1150px; margin: 0 auto; padding: 0 20px; }

/* HEADER */
.page-header { text-align: center; padding: 60px 0 50px; }
.secure-badge { 
  display: inline-flex; align-items: center; gap: 6px; 
  background: rgba(16, 185, 129, 0.1); color: var(--accent); 
  padding: 6px 14px; border-radius: 50px; font-size: 0.8rem; font-weight: 700; 
  border: 1px solid rgba(16, 185, 129, 0.2); margin-bottom: 24px;
}
h1 { font-size: clamp(2rem, 4vw, 3rem); margin-bottom: 12px; font-weight: 800; letter-spacing: -0.02em; }
.page-header p { color: var(--text-muted); font-size: 1.1rem; max-width: 600px; margin: 0 auto; line-height: 1.6; }

/* LAYOUT GRID */
.layout-grid { 
  display: grid; 
  grid-template-columns: 1.5fr 1fr; /* Más espacio al formulario */
  gap: 40px; 
  align-items: start; 
}
@media (max-width: 960px) { .layout-grid { grid-template-columns: 1fr; } }

/* FORM CONTAINER */
.form-wrapper { 
  background: #fff; /* Google Forms es blanco, así que el contenedor debe ser blanco */
  border-radius: var(--radius); 
  overflow: hidden; 
  position: relative; 
  min-height: 800px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.2);
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

.google-form-iframe {
  width: 100%;
  height: 1400px; /* Altura suficiente para evitar scroll interno doble */
  border: none;
  display: block;
}

/* SIDEBAR & STICKY */
.sticky-content { position: sticky; top: 20px; }
.sidebar-widget { margin-bottom: 30px; }
.sidebar-widget h3 { font-size: 1.2rem; display: flex; align-items: center; gap: 10px; margin-bottom: 12px; font-weight: 700; }
.widget-desc { font-size: 0.95rem; color: var(--text-muted); margin-bottom: 20px; line-height: 1.6; }

/* BANK CARD (Componente Estrella) */
.bank-card {
  background: linear-gradient(135deg, #1e1b4b 0%, #312e81 100%);
  border: 1px solid rgba(255,255,255,0.1); border-radius: 20px; padding: 24px;
  box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5); position: relative; overflow: hidden;
}
.bank-card::before {
  content:''; position: absolute; top: -50px; right: -50px; width: 150px; height: 150px;
  background: rgba(255,255,255,0.06); border-radius: 50%; pointer-events: none;
}
.bank-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
.bank-title { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 1px; color: rgba(255,255,255,0.6); font-weight: 700; }
.mp-img { height: 28px; object-fit: contain; filter: brightness(0) invert(1); opacity: 0.8; }
.bank-type { font-size: 0.9rem; color: rgba(255,255,255,0.9); margin-bottom: 16px; font-weight: 500; }

/* Copy Row */
.copy-row {
  display: flex; justify-content: space-between; align-items: center;
  background: rgba(0,0,0,0.25); padding: 12px 16px; border-radius: 12px;
  margin-bottom: 10px; cursor: pointer; transition: all 0.2s; border: 1px solid transparent;
}
.copy-row:hover { background: rgba(0,0,0,0.4); border-color: rgba(255,255,255,0.15); transform: translateY(-1px); }
.copy-row:active { transform: translateY(0); }
.copy-label { font-size: 0.8rem; color: rgba(255,255,255,0.5); }
.copy-val { font-family: 'Consolas', monospace; font-size: 1.05rem; color: white; letter-spacing: 0.5px; font-weight: 600; }
.copy-icon { color: var(--accent); opacity: 0.8; }

.bank-footer { display: flex; justify-content: space-between; margin-top: 24px; padding-top: 16px; border-top: 1px solid rgba(255,255,255,0.1); }
.bf-col { display: flex; flex-direction: column; }
.bf-col.right { text-align: right; }
.bf-label { font-size: 0.7rem; text-transform: uppercase; color: rgba(255,255,255,0.4); margin-bottom: 4px; font-weight: 700; }
.bf-val { font-size: 0.85rem; font-weight: 600; color: white; }

.payment-note { 
  font-size: 0.85rem; color: var(--text-muted); margin-top: 20px; 
  background: var(--bg-surface); padding: 16px; border-radius: 12px; 
  border: 1px solid var(--border); line-height: 1.5;
}
.payment-note strong { color: var(--text-main); }
.payment-note em { color: var(--accent); font-style: normal; }

/* QUICK HELP */
.quick-help { background: var(--bg-panel); padding: 25px; border-radius: 20px; border: 1px solid var(--border); text-align: center; }
.quick-help h4 { margin-bottom: 8px; font-size: 1.1rem; color: white; }
.quick-help p { font-size: 0.9rem; color: var(--text-muted); margin-bottom: 20px; }
.qh-actions { display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; }
.btn-qh { 
  flex: 1; min-width: 120px; padding: 12px; border-radius: 10px; font-size: 0.9rem; font-weight: 700; 
  display: flex; align-items: center; justify-content: center; gap: 8px; transition: 0.2s; text-decoration: none;
}
.btn-qh.whatsapp { background: #25D366; color: #000; box-shadow: 0 4px 15px rgba(37, 211, 102, 0.2); }
.btn-qh.email { background: rgba(255,255,255,0.05); border: 1px solid var(--border); color: var(--text-main); }
.btn-qh:hover { filter: brightness(1.1); transform: translateY(-2px); }

/* TOAST */
.toast-notification {
  position: fixed; bottom: 30px; left: 50%; transform: translateX(-50%);
  background: var(--accent); color: #000; padding: 12px 28px; border-radius: 50px;
  font-weight: 700; box-shadow: 0 10px 30px rgba(0,0,0,0.5); z-index: 100;
  display: flex; align-items: center; gap: 8px; animation: popUp 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
@keyframes popUp { from { transform: translate(-50%, 40px); opacity: 0; } to { transform: translate(-50%, 0); opacity: 1; } }
`;