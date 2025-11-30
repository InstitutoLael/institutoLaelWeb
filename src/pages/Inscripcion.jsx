// src/pages/Inscripcion.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SEOHead from "../components/SEOHead.jsx";

const WAPP_INTL = "56964626568";
const FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSfDVse7cbhnAOhA2OklnmBvaeKZY4ZDWOmrYFqSfAvV8joVOA/viewform?embedded=true";

/* --------------------------------------------------------------------------
   ICONOS SVG (Para no depender de librerías)
   -------------------------------------------------------------------------- */
const Icons = {
  Send: () => <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>,
  Mail: () => <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
  MessageCircle: () => <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>,
  CreditCard: () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>,
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
      notify("error", "Faltan datos (Nombre, Email, Programa)");
      return;
    }
    const mensaje = `¡Hola! Me interesa inscribirme en Instituto Lael.\n\n📋 *Mis datos:*\n• Nombre: ${nombre}\n• Email: ${email}\n• Programa: ${programa}\n\n¿Podrían enviarme info sobre metodología y costos?`;
    window.open(`https://wa.me/${WAPP_INTL}?text=${encodeURIComponent(mensaje)}`, "_blank");
    notify("ok", "Abriendo WhatsApp...");
  };

  const openMail = () => {
    const { nombre, email, programa } = fields;
    if (!need(nombre) || !need(email) || !need(programa)) {
      notify("error", "Faltan datos para el correo");
      return;
    }
    const subject = `Consulta Admisión - ${programa} - ${nombre}`;
    const body = `Hola equipo Lael,\n\nQuisiera información para inscribirme.\n\nNombre: ${nombre}\nEmail: ${email}\nPrograma: ${programa}\n\nGracias.`;
    window.open(`mailto:contacto@institutolael.cl?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
    notify("ok", "Abriendo correo...");
  };

  return (
    <div className="glass-card quick-contact-card">
      <Toast kind={toast.kind} msg={toast.msg} />
      
      <div className="card-header">
        <div className="icon-badge amber"><Icons.Help /></div>
        <div>
          <h3>Consulta Rápida</h3>
          <p className="text-sm text-muted">¿Dudas antes de inscribirte? Te respondemos rápido.</p>
        </div>
      </div>

      <div className="qc-grid">
        <div className="input-group">
          <label>Tu Nombre</label>
          <input value={fields.nombre} onChange={set("nombre")} placeholder="Ej: Matias Soto" />
        </div>
        <div className="input-group">
          <label>Tu Correo</label>
          <input type="email" value={fields.email} onChange={set("email")} placeholder="correo@gmail.com" />
        </div>
        <div className="input-group full-width">
          <label>Programa de interés</label>
          <select value={fields.programa} onChange={set("programa")}>
            <option value="">Selecciona una opción...</option>
            <option>PAES (Preuniversitario)</option>
            <option>Idiomas (Inglés/Coreano)</option>
            <option>Lengua de Señas (LSCh)</option>
            <option>Homeschool / Otro</option>
          </select>
        </div>
      </div>

      <div className="qc-actions">
        <button className="btn btn-whatsapp" onClick={openWA}>
          <Icons.MessageCircle /> Consultar por WhatsApp
        </button>
        <button className="btn btn-ghost" onClick={openMail}>
          <Icons.Mail /> Enviar Correo
        </button>
      </div>
    </div>
  );
}

/* ===== CopyHelper ===== */
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

/* ===== Main Page ===== */
export default function Inscripcion() {
  const [formLoading, setFormLoading] = useState(true);

  return (
    <div className="enroll-page">
      <style>{css}</style>
      <SEOHead
        title="Inscripción 2026 | Instituto Lael"
        description="Asegura tu cupo en PAES, Idiomas o LSCh. Proceso 100% online y seguro."
        canonical="https://www.institutolael.cl/inscripcion"
      />

      {/* Background Ambience */}
      <div className="ambient-light top-center" />
      <div className="ambient-light bottom-left" />

      {/* --- HERO --- */}
      <header className="hero-compact">
        <div className="container text-center">
          <div className="pill-badge">ADMISIÓN 2026 ABIERTA</div>
          <h1>Reserva tu cupo hoy.</h1>
          <p className="lead">
            Elige tu camino: <b>PAES, Idiomas o Inclusión</b>. 
            Completa el formulario y nos pondremos en contacto contigo en menos de 24 horas.
          </p>
        </div>
      </header>

      <div className="container layout-grid">
        
        {/* --- LEFT COLUMN: FORMULARIO PRINCIPAL --- */}
        <div className="main-content">
          
          {/* Google Form Wrapper */}
          <div className="glass-card form-wrapper">
            <div className="form-header">
              <h2>Formulario de Inscripción</h2>
              <p>Si el formulario no carga, <a href={FORM_URL.replace("?embedded=true", "")} target="_blank" rel="noreferrer">ábrelo aquí</a>.</p>
            </div>
            <div className="iframe-container">
              
              {/* LOADER VISIBLE MIENTRAS CARGA */}
              {formLoading && (
                <div className="form-loader">
                  <div className="spinner"></div>
                  <p>Cargando formulario seguro...</p>
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
                style={{ opacity: formLoading ? 0 : 1, transition: "opacity 0.4s ease-in" }}
              >
                Cargando formulario...
              </iframe>
            </div>
          </div>

          {/* Quick Contact (Mobile Order: shown after form) */}
          <div className="mt-8">
            <QuickContact />
          </div>

        </div>

        {/* --- RIGHT COLUMN: SIDEBAR INFO --- */}
        <aside className="sidebar">
          
          {/* Bank Card */}
          <div className="glass-card bank-card">
            <div className="bank-header">
              <div className="chip"><img src="https://raw.githubusercontent.com/dash-ui/assets/master/chip.png" alt="chip" width="30" /></div>
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
                        <span className="bank-label-sm">Email Comprobantes</span>
                        <div className="bank-value small">pagos@institutolael.cl</div>
                    </div>
                </div>
            </div>
          </div>

          {/* Info Steps */}
          <div className="glass-card info-card">
            <h3>¿Cómo funciona?</h3>
            <ul className="steps-list">
              <li>
                <span className="step-num">1</span>
                <div>
                  <strong>Llenas el formulario</strong>
                  <p>Te toma solo 2 minutos.</p>
                </div>
              </li>
              <li>
                <span className="step-num">2</span>
                <div>
                  <strong>Te contactamos</strong>
                  <p>Confirmamos tu plan y horario vía WhatsApp o correo.</p>
                </div>
              </li>
              <li>
                <span className="step-num">3</span>
                <div>
                  <strong>Pagas la matrícula</strong>
                  <p>Transferencia segura. Valor único: $4.990.</p>
                </div>
              </li>
              <li>
                <span className="step-num ok"><Icons.Check/></span>
                <div>
                  <strong>¡Estás dentro!</strong>
                  <p>Recibes acceso al aula virtual y calendario.</p>
                </div>
              </li>
            </ul>
          </div>

          {/* FAQ Accordion Mini */}
          <div className="faq-mini">
            <details>
                <summary>¿Cuándo parten las clases?</summary>
                <p>24-72 hrs hábiles tras validar tu pago.</p>
            </details>
            <details>
                <summary>¿Las clases quedan grabadas?</summary>
                <p>Sí, 100% disponibles en tu aula virtual.</p>
            </details>
            <details>
                <summary>¿Necesito materiales?</summary>
                <p>No, todo el material digital está incluido.</p>
            </details>
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
  --glass: rgba(255, 255, 255, 0.03);
  --glass-border: rgba(255, 255, 255, 0.08);
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
  padding-bottom: 60px;
  position: relative;
  overflow-x: hidden;
}

.container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
.text-center { text-align: center; }
.mt-8 { margin-top: 32px; }

/* AMBIENT LIGHTS */
.ambient-light {
  position: absolute;
  width: 500px; height: 500px;
  border-radius: 50%;
  filter: blur(140px);
  opacity: 0.12;
  pointer-events: none;
  z-index: 0;
}
.top-center { top: -200px; left: 50%; transform: translateX(-50%); background: var(--primary); }
.bottom-left { bottom: -100px; left: -100px; background: var(--amber); }

/* HERO COMPACT */
.hero-compact {
  padding: 60px 0 40px;
  position: relative;
  z-index: 1;
}
.pill-badge {
  display: inline-block;
  background: rgba(99, 102, 241, 0.1);
  color: #818cf8;
  border: 1px solid rgba(99, 102, 241, 0.2);
  padding: 4px 12px;
  border-radius: 100px;
  font-size: 0.8rem;
  font-weight: 700;
  margin-bottom: 16px;
}
h1 { font-size: clamp(2rem, 5vw, 3rem); font-weight: 800; line-height: 1.1; margin-bottom: 16px; }
.lead { color: var(--text-muted); max-width: 600px; margin: 0 auto; font-size: 1.1rem; line-height: 1.6; }

/* LAYOUT GRID */
.layout-grid {
  display: grid;
  grid-template-columns: 1.6fr 1fr;
  gap: 32px;
  position: relative;
  z-index: 2;
}
@media (max-width: 968px) { .layout-grid { grid-template-columns: 1fr; } }

/* GLASS CARD BASE */
.glass-card {
  background: #0f1115;
  border: 1px solid var(--glass-border);
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.3);
}

/* FORM WRAPPER & LOADER */
.form-wrapper { padding: 0; overflow: hidden; display: flex; flex-direction: column; height: 850px; }
.form-header { padding: 20px 24px; border-bottom: 1px solid var(--glass-border); background: rgba(255,255,255,0.02); }
.form-header h2 { margin: 0; font-size: 1.25rem; }
.form-header p { margin: 4px 0 0; font-size: 0.9rem; color: var(--text-muted); }
.form-header a { color: var(--primary); text-decoration: underline; }

.iframe-container { flex: 1; background: #fff; position: relative; }
.form-loader {
  position: absolute; inset: 0;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  background: #0f1115; /* Match theme to prevent flash */
  z-index: 10;
  color: var(--text-muted);
}
.spinner {
  width: 40px; height: 40px;
  border: 3px solid rgba(99,102,241,0.3);
  border-top-color: var(--primary);
  border-radius: 50%;
  margin-bottom: 16px;
  animation: spin 1s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }

@media (max-width: 768px) { .form-wrapper { height: 700px; } }

/* QUICK CONTACT */
.quick-contact-card {
  background: linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01));
}
.card-header { display: flex; gap: 12px; align-items: flex-start; margin-bottom: 20px; }
.icon-badge {
  width: 40px; height: 40px;
  border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
  font-size: 1.2rem;
}
.icon-badge.amber { background: rgba(245, 158, 11, 0.1); color: var(--amber); }

.qc-grid { display: flex; flex-direction: column; gap: 12px; }
.input-group { display: flex; flex-direction: column; gap: 6px; }
.input-group label { font-size: 0.85rem; font-weight: 600; color: var(--text-muted); }
.input-group input, .input-group select {
  background: rgba(0,0,0,0.3);
  border: 1px solid var(--glass-border);
  border-radius: 10px;
  padding: 10px 12px;
  color: white;
  font-family: inherit;
  transition: border-color 0.2s;
}
.input-group input:focus, .input-group select:focus {
  outline: none;
  border-color: var(--primary);
  background: rgba(0,0,0,0.5);
}

.qc-actions { display: flex; gap: 10px; margin-top: 20px; }
.btn {
  flex: 1;
  display: flex; align-items: center; justify-content: center; gap: 8px;
  padding: 10px; border-radius: 10px; font-weight: 600; cursor: pointer; transition: transform 0.2s;
  font-size: 0.9rem;
}
.btn:active { transform: scale(0.98); }
.btn-whatsapp { background: var(--green); color: #000; border: none; }
.btn-ghost { background: transparent; border: 1px solid var(--glass-border); color: var(--text-muted); }
.btn-ghost:hover { background: rgba(255,255,255,0.05); color: white; }

/* BANK CARD */
.bank-card {
  background: linear-gradient(135deg, #1e1b4b, #312e81);
  border: 1px solid rgba(255,255,255,0.1);
  color: white;
  margin-bottom: 24px;
}
.bank-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
.bank-logo { font-weight: 800; letter-spacing: 1px; font-size: 1rem; opacity: 0.9; }
.bank-label { font-size: 0.75rem; text-transform: uppercase; color: rgba(255,255,255,0.6); margin-bottom: 4px; }
.bank-label-sm { font-size: 0.65rem; text-transform: uppercase; color: rgba(255,255,255,0.5); }
.bank-value { font-size: 0.95rem; font-weight: 500; }
.bank-value.small { font-size: 0.85rem; opacity: 0.8; }

.copy-row {
  display: flex; justify-content: space-between; align-items: center;
  background: rgba(0,0,0,0.2);
  padding: 8px 12px;
  border-radius: 8px;
  margin-bottom: 8px;
  cursor: pointer;
  transition: background 0.2s;
}
.copy-row:hover { background: rgba(0,0,0,0.4); }
.copy-label { font-size: 0.8rem; opacity: 0.7; }
.copy-value { font-family: monospace; font-size: 1rem; letter-spacing: 0.5px; }
.copy-icon { opacity: 0.5; font-size: 0.9rem; }
.copy-icon.active { color: var(--green); opacity: 1; }

/* INFO CARD */
.info-card h3 { margin: 0 0 20px; font-size: 1.2rem; }
.steps-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 20px; }
.steps-list li { display: flex; gap: 16px; }
.step-num {
  width: 32px; height: 32px;
  background: rgba(255,255,255,0.05);
  border: 1px solid var(--glass-border);
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-weight: 700; color: var(--primary);
  flex-shrink: 0;
}
.step-num.ok { background: rgba(16, 185, 129, 0.1); color: var(--green); border-color: rgba(16, 185, 129, 0.2); }
.steps-list strong { display: block; margin-bottom: 2px; font-size: 0.95rem; }
.steps-list p { margin: 0; font-size: 0.85rem; color: var(--text-muted); }

/* FAQ MINI */
.faq-mini { margin-top: 24px; border-top: 1px solid var(--glass-border); padding-top: 24px; }
.faq-mini details { margin-bottom: 12px; border-bottom: 1px solid var(--glass-border); padding-bottom: 12px; }
.faq-mini summary { cursor: pointer; font-size: 0.9rem; font-weight: 600; color: var(--text-muted); list-style: none; }
.faq-mini summary:hover { color: white; }
.faq-mini p { margin-top: 8px; font-size: 0.85rem; color: var(--text-muted); padding-left: 12px; border-left: 2px solid var(--glass-border); }

/* TOAST */
.toast {
  position: fixed; bottom: 20px; right: 20px;
  padding: 12px 20px;
  border-radius: 50px;
  display: flex; align-items: center; gap: 10px;
  font-size: 0.9rem; font-weight: 600;
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);
  z-index: 100;
  animation: slideUp 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.toast-success { background: #064e3b; color: #a7f3d0; border: 1px solid #065f46; }
.toast-error { background: #450a0a; color: #fecaca; border: 1px solid #7f1d1d; }

@keyframes slideUp { from { transform: translateY(100px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

`