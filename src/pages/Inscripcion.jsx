// src/pages/Inscripcion.jsx
import { useState, useEffect } from "react";
import SEOHead from "../components/SEOHead.jsx";

// --- ASSETS ---
// Ruta exacta del logo de Mercado Pago
import mpLogo from "../assets/img/Partners/u1.png";

const WAPP_INTL = "56964626568";
// 🔴 IMPORTANTE: Reemplaza esta URL por la de TU formulario real de Google Forms
const FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSfDVse7cbhnAOhA2OklnmBvaeKZY4ZDWOmrYFqSfAvV8joVOA/viewform?embedded=true";

/* --------------------------------------------------------------------------
   ICONOS SVG
   -------------------------------------------------------------------------- */
const Icons = {
  MessageCircle: () => <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>,
  Mail: () => <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
  Check: () => <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>,
  Help: () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
  Copy: () => <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
};

/* ===== UI Helpers ===== */
function Toast({ kind = "ok", msg }) {
  if (!msg) return null;
  return (
    <div className={`toast ${kind === "error" ? "toast-error" : "toast-success"}`}>
      <div className="toast-icon">{kind === "error" ? "!" : <Icons.Check />}</div>
      {msg}
    </div>
  );
}

function CopyRow({ label, value }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="copy-row" onClick={copy}>
      <span className="copy-label">{label}</span>
      <span className="copy-value">{value}</span>
      <span className={`copy-icon ${copied ? 'active' : ''}`}>
        {copied ? <Icons.Check /> : <Icons.Copy />}
      </span>
    </div>
  );
}

/* ===== QuickContact (Mini Form) ===== */
function QuickContact() {
  const [fields, setFields] = useState({ nombre: "", email: "", programa: "" });
  const [toast, setToast] = useState({ kind: "ok", msg: "" });

  const set = (k) => (e) => setFields((s) => ({ ...s, [k]: e.target.value }));
  const need = (x) => x.trim().length > 0;
  
  const notify = (kind, msg) => {
    setToast({ kind, msg });
    setTimeout(() => setToast({ kind: "ok", msg: "" }), 3200);
  };

  const openWA = () => {
    const { nombre, email, programa } = fields;
    if (!need(nombre) || !need(email) || !need(programa)) {
      notify("error", "Faltan datos");
      return;
    }
    const mensaje = `Hola, me interesa inscribirme.\nNombre: ${nombre}\nEmail: ${email}\nPrograma: ${programa}`;
    window.open(`https://wa.me/${WAPP_INTL}?text=${encodeURIComponent(mensaje)}`, "_blank");
  };

  const openMail = () => {
    const { nombre, email, programa } = fields;
    if (!need(nombre) || !need(email) || !need(programa)) {
      notify("error", "Faltan datos");
      return;
    }
    const subject = `Inscripción - ${programa} - ${nombre}`;
    const body = `Hola equipo Lael,\n\nQuisiera inscribirme.\n\nNombre: ${nombre}\nEmail: ${email}\nPrograma: ${programa}`;
    window.open(`mailto:contacto@institutolael.cl?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
  };

  return (
    <div className="glass-card quick-contact-card">
      <Toast kind={toast.kind} msg={toast.msg} />
      <div className="card-header">
        <div className="icon-badge amber"><Icons.Help /></div>
        <div>
          <h3>¿Dudas?</h3>
          <p className="text-sm text-muted">Contáctanos antes de pagar.</p>
        </div>
      </div>
      <div className="qc-grid">
        <input className="qc-input" value={fields.nombre} onChange={set("nombre")} placeholder="Tu Nombre" />
        <input className="qc-input" type="email" value={fields.email} onChange={set("email")} placeholder="Tu Correo" />
        <select className="qc-input" value={fields.programa} onChange={set("programa")}>
          <option value="">Programa...</option>
          <option>PAES</option>
          <option>Idiomas</option>
          <option>LSCh</option>
          <option>Nivelación</option>
        </select>
      </div>
      <div className="qc-actions">
        <button className="btn btn-whatsapp" onClick={openWA}><Icons.MessageCircle /> WhatsApp</button>
        <button className="btn btn-ghost" onClick={openMail}><Icons.Mail /> Correo</button>
      </div>
    </div>
  );
}

/* ===== Main Page ===== */
export default function Inscripcion() {
  const [formLoading, setFormLoading] = useState(true);

  return (
    <div className="enroll-page">
      <style>{css}</style>
      <SEOHead
        title="Inscripción Segura | Instituto Lael"
        description="Asegura tu cupo en Instituto Lael. Proceso 100% online y seguro."
        canonical="https://www.institutolael.cl/inscripcion"
      />

      <div className="ambient-light top-center" />
      <div className="ambient-light bottom-left" />

      {/* HEADER */}
      <header className="hero-compact">
        <div className="container text-center">
          <div className="pill-badge">ADMISIÓN 2026</div>
          <h1>Reserva tu cupo hoy.</h1>
          <p className="lead">
            Completa el formulario para formalizar tu matrícula. 
            Te contactaremos en breve para confirmar tu ingreso.
          </p>
        </div>
      </header>

      <div className="container layout-grid">
        
        {/* IZQUIERDA: FORMULARIO */}
        <div className="main-content">
          <div className="glass-card form-wrapper">
            <div className="form-header">
              <h2>Ficha de Matrícula</h2>
              <p>Datos seguros y confidenciales.</p>
            </div>
            <div className="iframe-container">
              {formLoading && (
                <div className="form-loader">
                  <div className="spinner"></div>
                  <p>Cargando formulario...</p>
                </div>
              )}
              <iframe
                title="Formulario de Inscripción"
                src={FORM_URL}
                width="100%"
                height="100%"
                frameBorder="0"
                marginHeight="0"
                marginWidth="0"
                onLoad={() => setFormLoading(false)}
                className="styled-iframe"
              >
                Cargando...
              </iframe>
            </div>
          </div>
          
          <div className="mt-8">
            <QuickContact />
          </div>
        </div>

        {/* DERECHA: SIDEBAR */}
        <aside className="sidebar">
          
          {/* Tarjeta de Pago */}
          <div className="glass-card bank-card">
            <div className="bank-header">
              <div className="chip-sim"></div>
              <span className="bank-logo">Mercado Pago</span>
            </div>
            <div className="bank-body">
                <p className="bank-label">Cuenta Vista / Chequera</p>
                <CopyRow label="N° Cuenta" value="1088183168" />
                <CopyRow label="RUT" value="78.084.019-6" />
                <div className="bank-row">
                    <div>
                        <span className="bank-label-sm">Titular</span>
                        <div className="bank-value">Instituto Lael SpA</div>
                    </div>
                </div>
                <div className="bank-row mt-2">
                    <div>
                        <span className="bank-label-sm">Comprobantes a:</span>
                        <div className="bank-value small">pagos@institutolael.cl</div>
                    </div>
                </div>
                
                {/* Logo Mercado Pago al pie */}
                <div className="mp-logo-container">
                    <img src={mpLogo} alt="Mercado Pago Logo" className="mp-img" />
                </div>
            </div>
          </div>

          {/* Pasos */}
          <div className="glass-card info-card">
            <h3>Pasos siguientes</h3>
            <ul className="steps-list">
              <li>
                <span className="step-num">1</span>
                <div>
                  <strong>Envía el formulario</strong>
                  <p>Tus datos quedan registrados.</p>
                </div>
              </li>
              <li>
                <span className="step-num">2</span>
                <div>
                  <strong>Realiza el pago</strong>
                  <p>Transfiere la matrícula única.</p>
                </div>
              </li>
              <li>
                <span className="step-num ok"><Icons.Check/></span>
                <div>
                  <strong>Confirmación</strong>
                  <p>Te enviamos accesos y contrato.</p>
                </div>
              </li>
            </ul>
          </div>

        </aside>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------------------
   CSS STYLES
   -------------------------------------------------------------------------- */
const css = `
:root {
  --bg-dark: #050505;
  --glass: #0f1115;
  --glass-border: rgba(255, 255, 255, 0.1);
  --primary: #6366f1;
  --green: #10b981;
  --amber: #f59e0b;
  --text-main: #fff;
  --text-muted: #94a3b8;
}

.enroll-page {
  background: var(--bg-dark);
  color: var(--text-main);
  min-height: 100vh;
  font-family: 'Inter', system-ui, sans-serif;
  padding-bottom: 80px;
  overflow-x: hidden;
}

.container { max-width: 1100px; margin: 0 auto; padding: 0 20px; }
.mt-8 { margin-top: 32px; }

/* AMBIENT LIGHTS */
.ambient-light {
  position: absolute;
  width: 600px; height: 600px;
  border-radius: 50%;
  filter: blur(120px);
  opacity: 0.1;
  pointer-events: none;
  z-index: 0;
}
.top-center { top: -300px; left: 50%; transform: translateX(-50%); background: var(--primary); }
.bottom-left { bottom: -200px; left: -200px; background: var(--amber); }

/* HERO */
.hero-compact { padding: 60px 0 40px; position: relative; z-index: 1; text-align: center; }
.pill-badge { display: inline-block; background: rgba(99,102,241,0.1); color: #818cf8; border: 1px solid rgba(99,102,241,0.2); padding: 4px 12px; border-radius: 50px; font-size: 0.8rem; font-weight: 700; margin-bottom: 15px; }
h1 { font-size: clamp(2rem, 5vw, 3rem); font-weight: 800; margin-bottom: 10px; }
.lead { color: var(--text-muted); max-width: 600px; margin: 0 auto; font-size: 1.1rem; }

/* GRID */
.layout-grid { display: grid; grid-template-columns: 1.5fr 1fr; gap: 30px; position: relative; z-index: 2; }
@media (max-width: 900px) { .layout-grid { grid-template-columns: 1fr; } }

/* CARDS */
.glass-card { background: var(--glass); border: 1px solid var(--glass-border); border-radius: 20px; padding: 24px; box-shadow: 0 20px 40px rgba(0,0,0,0.4); }

/* FORM */
.form-wrapper { padding: 0; overflow: hidden; display: flex; flex-direction: column; height: 850px; }
.form-header { padding: 20px 24px; border-bottom: 1px solid var(--glass-border); background: rgba(255,255,255,0.02); }
.form-header h2 { margin: 0; font-size: 1.2rem; }
.form-header p { margin: 2px 0 0; font-size: 0.9rem; color: var(--text-muted); }

.iframe-container { flex: 1; background: #fff; position: relative; }
.styled-iframe { display: block; width: 100%; height: 100%; border: none; }

.form-loader { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; background: #0f1115; z-index: 10; color: var(--text-muted); }
.spinner { width: 40px; height: 40px; border: 3px solid rgba(99,102,241,0.3); border-top-color: var(--primary); border-radius: 50%; margin-bottom: 15px; animation: spin 1s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }

/* QUICK CONTACT */
.quick-contact-card { background: linear-gradient(180deg, rgba(255,255,255,0.03), transparent); }
.card-header { display: flex; gap: 12px; margin-bottom: 20px; }
.icon-badge { width: 40px; height: 40px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; }
.icon-badge.amber { background: rgba(245,158,11,0.15); color: var(--amber); }
.qc-grid { display: grid; gap: 10px; }
.qc-input { width: 100%; background: rgba(0,0,0,0.3); border: 1px solid var(--glass-border); border-radius: 10px; padding: 10px; color: white; font-family: inherit; }
.qc-input:focus { outline: none; border-color: var(--primary); }
.qc-actions { display: flex; gap: 10px; margin-top: 15px; }
.btn { flex: 1; display: flex; align-items: center; justify-content: center; gap: 8px; padding: 10px; border-radius: 10px; font-weight: 600; cursor: pointer; transition: .2s; font-size: 0.9rem; }
.btn-whatsapp { background: var(--green); color: #000; }
.btn-ghost { background: transparent; border: 1px solid var(--glass-border); color: var(--text-muted); }
.btn-ghost:hover { border-color: white; color: white; }

/* BANK CARD */
.bank-card { background: linear-gradient(135deg, #1e1b4b, #312e81); border: 1px solid rgba(255,255,255,0.15); color: white; }
.bank-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
.chip-sim { width: 36px; height: 26px; background: linear-gradient(135deg, #e2e8f0, #94a3b8); border-radius: 4px; position: relative; }
.chip-sim::after { content:''; position: absolute; top: 50%; left: 0; width: 100%; height: 1px; background: #475569; }
.bank-logo { font-weight: 800; font-size: 1rem; letter-spacing: 1px; }
.bank-label { font-size: 0.75rem; text-transform: uppercase; opacity: 0.7; margin-bottom: 5px; }
.bank-value { font-size: 1rem; font-family: monospace; letter-spacing: 0.5px; }
.bank-value.small { font-size: 0.85rem; }
.bank-row { margin-top: 10px; }
.bank-label-sm { font-size: 0.65rem; text-transform: uppercase; opacity: 0.6; }

.copy-row { display: flex; justify-content: space-between; align-items: center; background: rgba(0,0,0,0.2); padding: 10px 12px; border-radius: 8px; margin-bottom: 8px; cursor: pointer; transition: .2s; }
.copy-row:hover { background: rgba(0,0,0,0.3); }
.copy-label { font-size: 0.8rem; opacity: 0.8; }
.copy-icon { opacity: 0.6; font-size: 0.9rem; }
.copy-icon.active { color: var(--green); opacity: 1; }

.mp-logo-container { margin-top: 20px; text-align: right; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 15px; }
.mp-img { height: 30px; object-fit: contain; }

/* INFO CARD */
.info-card h3 { margin: 0 0 20px; font-size: 1.1rem; }
.steps-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 20px; }
.steps-list li { display: flex; gap: 15px; }
.step-num { width: 28px; height: 28px; border-radius: 50%; background: rgba(255,255,255,0.1); display: flex; align-items: center; justify-content: center; font-weight: 700; color: var(--primary); font-size: 0.9rem; flex-shrink: 0; }
.step-num.ok { background: rgba(16,185,129,0.2); color: var(--green); }
.steps-list strong { display: block; font-size: 0.95rem; margin-bottom: 2px; }
.steps-list p { margin: 0; font-size: 0.85rem; color: var(--text-muted); }

/* TOAST */
.toast { position: fixed; bottom: 30px; right: 30px; padding: 12px 24px; border-radius: 50px; background: #064e3b; color: #ecfdf5; border: 1px solid #059669; font-weight: 600; box-shadow: 0 10px 30px rgba(0,0,0,0.5); z-index: 100; display: flex; align-items: center; gap: 10px; animation: slideUp 0.3s ease; }
.toast-error { background: #7f1d1d; color: #fef2f2; border-color: #991b1b; }
@keyframes slideUp { from { transform: translateY(50px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
`;