import { useState, useEffect } from "react";
import SEOHead from "../components/SEOHead.jsx";

// DATOS REALES (Los que me pasaste)
const BANK_DATA = {
  bank: "Banco Estado",
  type: "Cta. Vista / Chequera",
  number: "1088183168",
  rut: "78.084.019-6",
  name: "Instituto Lael SpA",
  email: "pagos@institutolael.cl"
};

// URL DE TU FORMULARIO
const FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSfDVse7cbhnAOhA2OklnmBvaeKZY4ZDWOmrYFqSfAvV8joVOA/viewform?embedded=true";

/* ──────────────────────────────────────────────────────────────────────────
   1. ICONOS SVG (Estilo Financiero)
   ────────────────────────────────────────────────────────────────────────── */
const Icons = {
  Lock: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
  Copy: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>,
  Check: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  Whatsapp: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>,
  Card: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>,
  Shield: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
};

/* ──────────────────────────────────────────────────────────────────────────
   2. COMPONENTES INTERNOS
   ────────────────────────────────────────────────────────────────────────── */

// Tarjeta Bancaria "Premium"
function BankCard({ onCopy, copiedField }) {
  return (
    <div className="bank-card-container">
      <div className="bank-card-bg"></div>
      <div className="bc-content">
        <div className="bc-header">
          <span className="bc-bank-name">{BANK_DATA.bank}</span>
          <span className="bc-chip"></span>
        </div>
        
        <div className="bc-body">
          <div className="copy-group" onClick={() => onCopy(BANK_DATA.number, 'num')}>
            <label>Nº Cuenta</label>
            <div className="val-box">
              <span className="val-mono">{BANK_DATA.number}</span>
              {copiedField === 'num' ? <span className="icon-success"><Icons.Check/></span> : <Icons.Copy/>}
            </div>
          </div>

          <div className="copy-group" onClick={() => onCopy(BANK_DATA.rut, 'rut')}>
            <label>RUT Empresa</label>
            <div className="val-box">
              <span className="val-mono">{BANK_DATA.rut}</span>
              {copiedField === 'rut' ? <span className="icon-success"><Icons.Check/></span> : <Icons.Copy/>}
            </div>
          </div>
        </div>

        <div className="bc-footer">
          <div className="bc-info">
            <small>Titular</small>
            <strong>{BANK_DATA.name}</strong>
          </div>
          <div className="bc-info right">
            <small>Tipo</small>
            <strong>{BANK_DATA.type}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

// Pasos Visuales
function Step({ num, title, active }) {
  return (
    <div className={`step-item ${active ? 'active' : ''}`}>
      <div className="step-circle">{num}</div>
      <span className="step-text">{title}</span>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   3. COMPONENTE PRINCIPAL
   ────────────────────────────────────────────────────────────────────────── */
export default function Inscripciones() {
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(null);

  useEffect(() => { window.scrollTo(0,0); }, []);

  const handleCopy = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopied(field);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="enroll-page">
      <SEOHead title="Matrícula Online | Instituto Lael" description="Asegura tu cupo. Formulario de inscripción y pago seguro." />
      <style>{css}</style>

      {/* Luces de fondo */}
      <div className="glow-orb g1"></div>
      <div className="glow-orb g2"></div>

      <div className="container">
        
        {/* HEADER */}
        <header className="enroll-header">
          <div className="secure-pill"><Icons.Lock/> Checkout Seguro SSL</div>
          <h1>Finalizar Inscripción</h1>
          <p>Completa tus datos y realiza la transferencia para activar tu cuenta.</p>
          
          <div className="steps-bar">
            <Step num="1" title="Datos del Alumno" active={true} />
            <div className="step-line"></div>
            <Step num="2" title="Pago y Comprobante" active={true} />
          </div>
        </header>

        <div className="enroll-grid">
          
          {/* COLUMNA 1: FORMULARIO GOOGLE */}
          <div className="form-col">
            <div className="form-frame-wrapper">
              {loading && (
                <div className="loading-overlay">
                  <div className="spinner"></div>
                  <span>Cargando formulario seguro...</span>
                </div>
              )}
              <iframe 
                src={FORM_URL} 
                className="google-form-iframe"
                onLoad={() => setLoading(false)}
                title="Formulario de Inscripción"
              ></iframe>
            </div>
            <div className="form-footer">
              <Icons.Shield /> Tus datos están protegidos y no serán compartidos.
            </div>
          </div>

          {/* COLUMNA 2: PAGO (STICKY) */}
          <aside className="payment-col">
            <div className="payment-sticky-card">
              <div className="pay-header">
                <h3><Icons.Card/> Datos de Pago</h3>
                <p>Transfiere el valor de tu matrícula o plan a la siguiente cuenta:</p>
              </div>

              <BankCard onCopy={handleCopy} copiedField={copied} />

              <div className="pay-instruction">
                <div className="instruction-row">
                  <span className="dot"></span>
                  <p>Correo de confirmación: <strong>{BANK_DATA.email}</strong></p>
                </div>
                <div className="instruction-row">
                  <span className="dot"></span>
                  <p>Asunto: <strong>Nombre del Alumno + Curso</strong></p>
                </div>
              </div>

              <a 
                href="https://wa.me/56964626568?text=Hola,%20env%C3%ADo%20comprobante%20de%20pago%20de%20inscripci%C3%B3n." 
                target="_blank" 
                rel="noreferrer"
                className="btn-wapp-confirm"
              >
                <Icons.Whatsapp /> Enviar Comprobante
              </a>
              
              <p className="pay-note">
                ¿Problemas para transferir? <a href="https://wa.me/56964626568">Contáctanos aquí</a>.
              </p>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   4. ESTILOS CSS - "FINTECH DARK"
   ────────────────────────────────────────────────────────────────────────── */
const css = `
:root {
  --bg-deep: #050505;
  --bg-panel: #0F1115;
  --primary: #6366f1; /* Indigo */
  --accent: #10b981;  /* Emerald */
  --text-main: #f8fafc;
  --text-muted: #94a3b8;
  --border: rgba(255,255,255,0.1);
  --card-radius: 20px;
}

.enroll-page {
  background-color: var(--bg-deep);
  color: var(--text-main);
  font-family: 'Inter', sans-serif;
  min-height: 100vh;
  padding: 100px 0 80px;
  position: relative;
  overflow-x: hidden;
}

.container { max-width: 1100px; margin: 0 auto; padding: 0 24px; position: relative; z-index: 2; }

/* Lights */
.glow-orb { position: absolute; width: 600px; height: 600px; border-radius: 50%; filter: blur(120px); opacity: 0.1; pointer-events: none; }
.g1 { top: -200px; left: -100px; background: var(--primary); }
.g2 { bottom: 0; right: -100px; background: var(--accent); }

/* HEADER */
.enroll-header { text-align: center; margin-bottom: 50px; }
.secure-pill { 
  display: inline-flex; align-items: center; gap: 6px; 
  background: rgba(16, 185, 129, 0.1); color: #34d399; 
  padding: 6px 14px; border-radius: 50px; font-size: 0.8rem; font-weight: 700; 
  text-transform: uppercase; border: 1px solid rgba(16, 185, 129, 0.2); margin-bottom: 20px;
}
.enroll-header h1 { font-size: 2.5rem; margin-bottom: 10px; }
.enroll-header p { color: var(--text-muted); font-size: 1.1rem; }

/* Steps */
.steps-bar { display: flex; justify-content: center; align-items: center; gap: 15px; margin-top: 30px; }
.step-item { display: flex; align-items: center; gap: 8px; opacity: 0.5; transition: 0.3s; }
.step-item.active { opacity: 1; }
.step-circle { 
  width: 28px; height: 28px; background: var(--bg-panel); border: 1px solid var(--text-muted); 
  border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 0.9rem;
}
.step-item.active .step-circle { background: var(--primary); border-color: var(--primary); color: white; }
.step-text { font-size: 0.9rem; font-weight: 600; }
.step-line { width: 40px; height: 2px; background: var(--border); }

/* LAYOUT */
.enroll-grid { display: grid; grid-template-columns: 1.3fr 0.9fr; gap: 40px; align-items: start; }
@media (max-width: 900px) { .enroll-grid { grid-template-columns: 1fr; } }

/* FORM COLUMN */
.form-frame-wrapper {
  background: white; /* Google Forms es blanco, así que el contenedor debe ser blanco para que no se vea el corte feo */
  border-radius: var(--card-radius); overflow: hidden; position: relative; min-height: 700px;
  box-shadow: 0 20px 50px rgba(0,0,0,0.3);
}
.google-form-iframe { width: 100%; height: 1300px; border: none; } /* Altura fija alta para evitar doble scroll */
.loading-overlay {
  position: absolute; inset: 0; background: var(--bg-panel); display: flex; 
  flex-direction: column; align-items: center; justify-content: center; z-index: 10;
  color: var(--text-muted);
}
.spinner { 
  width: 40px; height: 40px; border: 3px solid rgba(99,102,241,0.3); 
  border-top-color: var(--primary); border-radius: 50%; margin-bottom: 15px; animation: spin 1s linear infinite; 
}
@keyframes spin { to { transform: rotate(360deg); } }

.form-footer { margin-top: 15px; text-align: center; color: var(--text-muted); font-size: 0.85rem; display: flex; justify-content: center; gap: 8px; align-items: center; }

/* PAYMENT COLUMN */
.payment-sticky-card {
  position: sticky; top: 100px;
  background: var(--bg-panel); border: 1px solid var(--border); border-radius: var(--card-radius);
  padding: 30px; box-shadow: 0 20px 60px rgba(0,0,0,0.5);
}
.pay-header { margin-bottom: 25px; }
.pay-header h3 { font-size: 1.3rem; margin-bottom: 8px; display: flex; align-items: center; gap: 10px; }
.pay-header p { font-size: 0.9rem; color: var(--text-muted); line-height: 1.5; }

/* BANK CARD COMPONENT */
.bank-card-container {
  background: linear-gradient(145deg, #1e1b4b, #312e81);
  border-radius: 16px; padding: 25px; position: relative; overflow: hidden;
  box-shadow: 0 10px 30px rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.1);
  margin-bottom: 25px;
}
/* Efecto brillo tarjeta */
.bank-card-container::before {
  content: ''; position: absolute; top: -50%; left: -50%; width: 200%; height: 200%;
  background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 60%);
  pointer-events: none;
}

.bc-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px; }
.bc-bank-name { font-weight: 800; font-size: 1.1rem; color: white; letter-spacing: 1px; }
.bc-chip { width: 36px; height: 26px; background: linear-gradient(135deg, #fbbf24 0%, #d97706 100%); border-radius: 6px; }

.copy-group { margin-bottom: 15px; cursor: pointer; transition: 0.2s; }
.copy-group:hover .val-box { background: rgba(255,255,255,0.1); }
.copy-group label { font-size: 0.65rem; text-transform: uppercase; color: rgba(255,255,255,0.6); display: block; margin-bottom: 4px; }
.val-box { 
  display: flex; justify-content: space-between; align-items: center; 
  background: rgba(0,0,0,0.2); padding: 8px 12px; border-radius: 8px; 
}
.val-mono { font-family: monospace; font-size: 1.1rem; color: white; letter-spacing: 1px; }
.icon-success { color: #4ade80; }

.bc-footer { display: flex; justify-content: space-between; margin-top: 20px; padding-top: 15px; border-top: 1px solid rgba(255,255,255,0.1); }
.bc-info { display: flex; flex-direction: column; }
.bc-info.right { text-align: right; }
.bc-info small { font-size: 0.6rem; text-transform: uppercase; color: rgba(255,255,255,0.5); }
.bc-info strong { font-size: 0.85rem; color: white; }

/* Instructions */
.pay-instruction { background: rgba(255,255,255,0.03); border-radius: 12px; padding: 15px; margin-bottom: 25px; border: 1px solid var(--border); }
.instruction-row { display: flex; gap: 10px; align-items: center; margin-bottom: 8px; font-size: 0.85rem; color: var(--text-muted); }
.instruction-row:last-child { margin-bottom: 0; }
.instruction-row strong { color: var(--text-main); }
.dot { width: 6px; height: 6px; background: var(--primary); border-radius: 50%; flex-shrink: 0; }

.btn-wapp-confirm {
  display: flex; justify-content: center; align-items: center; gap: 10px; width: 100%;
  background: #25D366; color: white; font-weight: 800; padding: 16px; border-radius: 50px;
  font-size: 1rem; transition: 0.3s; box-shadow: 0 10px 30px rgba(37, 211, 102, 0.3);
}
.btn-wapp-confirm:hover { transform: translateY(-3px); box-shadow: 0 15px 40px rgba(37, 211, 102, 0.5); }

.pay-note { font-size: 0.85rem; color: var(--text-muted); text-align: center; margin-top: 20px; }
.pay-note a { color: var(--primary); font-weight: 600; text-decoration: underline; }
`;