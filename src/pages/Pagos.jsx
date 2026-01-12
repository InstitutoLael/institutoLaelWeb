// src/pages/Pagos.jsx
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import SEOHead from "../components/SEOHead.jsx";

/* --------------------------------------------------------------------------
   1. DATOS & UTILIDADES
   -------------------------------------------------------------------------- */
const BANK = {
  holder: "Instituto Lael SpA",
  rut: "78.084.019-6",
  bank: "Mercado Pago (Cuenta Vista)",
  accountType: "Cuenta Vista",
  accountNumber: "1088183168",
  email: "pagos@institutolael.cl",
};

const WAPP = "56964626568";

const clp = (n) =>
  Number(n || 0).toLocaleString("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  });

/* --------------------------------------------------------------------------
   2. ESTILOS CSS (Dark Mode Premium)
   -------------------------------------------------------------------------- */
const css = `
:root {
  --bg-deep: #050505;
  --bg-panel: #0F1115;
  --border: rgba(255, 255, 255, 0.08);
  --border-light: rgba(255, 255, 255, 0.15);
  --primary: #6366f1;
  --primary-glow: rgba(99, 102, 241, 0.5);
  --green: #10b981;
  --text-main: #ffffff;
  --text-muted: #94a3b8;
  --font-sans: 'Plus Jakarta Sans', 'Inter', system-ui, sans-serif;
  --radius: 16px;
}

.pay-page {
  background-color: var(--bg-deep);
  color: var(--text-main);
  font-family: var(--font-sans);
  min-height: 100vh;
  padding-bottom: 80px;
}

.container { max-width: 800px; margin: 0 auto; padding: 0 24px; }

/* HERO */
.hero { padding: 120px 0 60px; border-bottom: 1px solid var(--border); margin-bottom: 40px; }
.pill { 
  display: inline-block; background: rgba(99, 102, 241, 0.1); 
  color: #a5b4fc; padding: 6px 16px; border-radius: 50px; 
  font-size: 0.85rem; font-weight: 700; margin-bottom: 20px; text-transform: uppercase; 
}
h1 { font-size: clamp(2.5rem, 5vw, 3.5rem); margin: 0 0 20px; letter-spacing: -0.02em; line-height: 1.1; font-weight: 800; }
.lead { font-size: 1.1rem; color: var(--text-muted); line-height: 1.6; max-width: 600px; }

/* CARD SECTIONS */
.section-card {
  background: var(--bg-panel); border: 1px solid var(--border);
  border-radius: var(--radius); padding: 30px; margin-bottom: 30px;
}
.section-title { font-size: 1.2rem; margin: 0 0 24px; display: flex; align-items: center; gap: 10px; color: white; }
.num-badge { 
  background: var(--border); width: 28px; height: 28px; 
  border-radius: 50%; display: flex; align-items: center; justify-content: center;
  font-size: 0.9rem; font-weight: 700; color: var(--text-muted);
}

/* FORM */
.form-grid { display: grid; gap: 20px; }
.input-group { display: flex; flex-direction: column; gap: 8px; }
label { font-size: 0.9rem; font-weight: 600; color: var(--text-muted); }
.req { color: var(--primary); }
.inp {
  background: var(--bg-deep); border: 1px solid var(--border);
  color: white; padding: 14px 16px; border-radius: 12px;
  font-family: inherit; font-size: 1rem; transition: 0.2s;
}
.inp:focus { outline: none; border-color: var(--primary); box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2); }
textarea.inp { min-height: 100px; resize: vertical; }

/* BOTONES */
.btn-row { display: flex; gap: 12px; flex-wrap: wrap; margin-top: 24px; }
.btn {
  display: inline-flex; align-items: center; gap: 8px; padding: 12px 24px;
  border-radius: 50px; font-weight: 700; text-decoration: none; cursor: pointer;
  transition: all 0.2s; font-size: 0.95rem; border: none;
}
.btn-primary { background: var(--primary); color: white; box-shadow: 0 4px 20px -5px var(--primary-glow); }
.btn-primary:hover { filter: brightness(1.1); transform: translateY(-2px); }
.btn-ghost { background: transparent; border: 1px solid var(--border); color: var(--text-muted); }
.btn-ghost:hover { border-color: white; color: white; background: rgba(255,255,255,0.05); }

.btn.disabled { opacity: 0.5; pointer-events: none; filter: grayscale(1); }

/* BANCO */
.bank-list { display: grid; gap: 12px; }
.bank-row {
  display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;
  padding: 16px; background: rgba(255,255,255,0.02); border-radius: 12px; border: 1px solid var(--border);
}
.bank-label { font-size: 0.85rem; color: var(--text-muted); display: block; margin-bottom: 4px; }
.bank-val { font-weight: 700; font-size: 1rem; color: white; word-break: break-all; }
.btn-copy {
  background: rgba(255,255,255,0.05); border: none; color: var(--text-muted);
  padding: 8px 12px; border-radius: 8px; font-size: 0.8rem; font-weight: 600;
  cursor: pointer; transition: 0.2s; display: flex; align-items: center; gap: 6px;
}
.btn-copy:hover { background: white; color: black; }
.btn-copy.copied { background: var(--green); color: white; }

/* STEPS & CHECKLIST */
.steps-list { padding-left: 20px; color: var(--text-muted); line-height: 1.8; margin-bottom: 30px; }
.checklist { list-style: none; padding: 0; display: grid; gap: 10px; }
.checklist li { display: flex; gap: 10px; color: var(--text-muted); font-size: 0.95rem; }
.check-icon { color: var(--green); flex-shrink: 0; }

details { 
  background: rgba(255,255,255,0.02); border: 1px solid var(--border); 
  border-radius: 12px; margin-bottom: 10px; overflow: hidden;
}
summary { 
  padding: 16px; font-weight: 600; cursor: pointer; display: flex; 
  justify-content: space-between; align-items: center; list-style: none;
}
summary:hover { background: rgba(255,255,255,0.02); }
summary::after { content: '+'; font-size: 1.2rem; font-weight: 300; }
details[open] summary::after { content: '−'; }
details p { padding: 0 16px 16px; color: var(--text-muted); line-height: 1.6; margin: 0; }
`;

/* --------------------------------------------------------------------------
   3. ICONOS SVG
   -------------------------------------------------------------------------- */
const Icons = {
  Whatsapp: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>,
  Mail: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>,
  Copy: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>,
  Check: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  ArrowLeft: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
};

/* --------------------------------------------------------------------------
   4. COMPONENTE PRINCIPAL
   -------------------------------------------------------------------------- */
export default function Pagos() {
  const [name, setName] = useState("");
  const [plan, setPlan] = useState("");
  const [amountRaw, setAmountRaw] = useState(""); 
  const [notes, setNotes] = useState("");

  const amountNum = useMemo(() => {
    const n = Number(String(amountRaw).replace(/[^\d]/g, "")) || 0;
    return n;
  }, [amountRaw]);

  const valid = name.trim().length >= 3 && amountNum > 0;

  // Link Generators
  const mailSubject = `Comprobante de pago • ${name || "Alumno/a"}`;
  const mailBody = `Hola, adjunto mi comprobante de transferencia.\n\nNombre: ${name || "—"}\nPlan: ${plan || "—"}\nMonto: ${amountNum ? clp(amountNum) : "—"}\nNotas: ${notes || "—"}\n\nGracias.`;
  
  const waText = `Hola 👋, avisé por correo mi pago.\nNombre: ${name || "—"}\nPlan: ${plan || "—"}\nMonto: ${amountNum ? clp(amountNum) : "—"}\n${notes ? `Notas: ${notes}\n` : ""}¿Pueden confirmar?`;

  const mailtoURL = `mailto:${BANK.email}?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`;
  const waURL = `https://wa.me/${WAPP}?text=${encodeURIComponent(waText)}`;

  const handleLinkClick = (e) => {
    if (!valid) e.preventDefault();
  };

  return (
    <div className="pay-page">
      <style>{css}</style>
      <SEOHead 
        title="Centro de Pagos | Instituto Lael" 
        description="Información de transferencia y envío de comprobantes."
      />

      <header className="hero">
        <div className="container">
          <span className="pill">Tesorería</span>
          <h1>Pagos y Comprobantes</h1>
          <p className="lead">
            Realiza tu transferencia y reporta el pago en segundos. 
            Activamos tu matrícula en cuanto validemos el comprobante.
          </p>
        </div>
      </header>

      <div className="container">
        
        {/* BLOQUE 1: FORMULARIO */}
        <section className="section-card">
          <h2 className="section-title"><span className="num-badge">1</span> Completa tus datos</h2>
          
          <div className="form-grid">
            <div className="input-group">
              <label htmlFor="nm">Nombre completo <span className="req">*</span></label>
              <input 
                id="nm" className="inp" placeholder="Tu nombre y apellido" 
                value={name} onChange={e => setName(e.target.value)} 
              />
            </div>
            
            <div className="input-group">
              <label htmlFor="pl">Plan / Programa</label>
              <input 
                id="pl" className="inp" placeholder="Ej: PAES Full, Inglés B1..." 
                value={plan} onChange={e => setPlan(e.target.value)} 
              />
            </div>

            <div className="input-group">
              <label htmlFor="am">Monto transferido <span className="req">*</span></label>
              <input 
                id="am" className="inp" inputMode="numeric" placeholder="$0"
                value={amountRaw} 
                onChange={e => setAmountRaw(e.target.value)}
                onBlur={e => {
                  const v = Number(String(e.target.value).replace(/[^\d]/g, "")) || 0;
                  setAmountRaw(v ? clp(v) : "");
                }}
              />
            </div>

            <div className="input-group">
              <label htmlFor="nt">Notas adicionales (opcional)</label>
              <textarea 
                id="nt" className="inp" rows={2} 
                placeholder="Ej: Pago la cuota 1 de 2..." 
                value={notes} onChange={e => setNotes(e.target.value)}
              />
            </div>
          </div>

          <div className="btn-row">
            <a 
              href={waURL} target="_blank" rel="noreferrer" 
              className={`btn btn-primary ${!valid ? 'disabled' : ''}`}
              onClick={handleLinkClick}
            >
              <Icons.Whatsapp /> Avisar por WhatsApp
            </a>
            <a 
              href={mailtoURL} 
              className={`btn btn-ghost ${!valid ? 'disabled' : ''}`}
              onClick={handleLinkClick}
            >
              <Icons.Mail /> Enviar por Correo
            </a>
          </div>
          {!valid && <p style={{marginTop: 15, fontSize: '0.85rem', color: 'var(--text-muted)'}}>* Completa nombre y monto para habilitar los botones.</p>}
        </section>

        {/* BLOQUE 2: DATOS BANCARIOS */}
        <section className="section-card">
          <h2 className="section-title"><span className="num-badge">2</span> Datos de Transferencia</h2>
          <BankRows bank={BANK} />
        </section>

        {/* BLOQUE 3: INSTRUCCIONES */}
        <section className="section-card">
          <h2 className="section-title"><span className="num-badge">3</span> Información Importante</h2>
          
          <ol className="steps-list">
            <li>Transfiere el monto acordado a la cuenta indicada.</li>
            <li>Guarda el comprobante (Captura de pantalla o PDF).</li>
            <li>Usa los botones de arriba para enviarnos el comprobante junto con tus datos.</li>
          </ol>

          <h3 style={{fontSize: '1rem', marginBottom: 15, color: 'white'}}>Checklist antes de enviar:</h3>
          <ul className="checklist">
            <li><div className="check-icon"><Icons.Check/></div> Nombre y RUT del titular coinciden</li>
            <li><div className="check-icon"><Icons.Check/></div> Monto y fecha claramente visibles</li>
            <li><div className="check-icon"><Icons.Check/></div> Archivo legible (PDF/JPG/PNG)</li>
          </ul>

          <div style={{marginTop: 30}}>
            <details>
              <summary>¿Cuánto demora la validación?</summary>
              <p>Generalmente validamos en 24-48 horas hábiles. Te llegará un correo de confirmación de matrícula una vez validado.</p>
            </details>
            <details>
              <summary>¿Emiten boleta?</summary>
              <p>Sí, todos los servicios educacionales están exentos de IVA pero emitimos boleta de honorarios o factura exenta según corresponda.</p>
            </details>
          </div>
        </section>

        <div style={{textAlign: 'center', marginTop: 40}}>
           <Link to="/inscripcion" className="btn btn-ghost" style={{display: 'inline-flex'}}>
             <Icons.ArrowLeft /> Volver a Inscripción
           </Link>
        </div>

      </div>
    </div>
  );
}

/* --------------------------------------------------------------------------
   5. SUB-COMPONENTES
   -------------------------------------------------------------------------- */
function BankRows({ bank }) {
  const data = [
    { label: "Banco", value: bank.bank },
    { label: "Tipo de Cuenta", value: bank.accountType },
    { label: "Número de Cuenta", value: bank.accountNumber },
    { label: "RUT", value: bank.rut },
    { label: "Titular", value: bank.holder },
    { label: "Correo", value: bank.email },
  ];

  return (
    <div className="bank-list">
      {data.map((item) => (
        <CopyRow key={item.label} label={item.label} value={item.value} />
      ))}
    </div>
  );
}

function CopyRow({ label, value }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bank-row">
      <div>
        <span className="bank-label">{label}</span>
        <span className="bank-val">{value}</span>
      </div>
      <button onClick={handleCopy} className={`btn-copy ${copied ? 'copied' : ''}`} aria-label="Copiar dato">
        {copied ? <Icons.Check /> : <Icons.Copy />}
        {copied ? "Listo" : "Copiar"}
      </button>
    </div>
  );
}