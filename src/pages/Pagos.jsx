// src/pages/Pagos.jsx
import { Link } from "react-router-dom";
import { useState } from "react";

/** ⚠️ Rellena con tus datos reales */
const BANK = {
  holder: "Instituto Lael SpA",
  rut: "78.084.019-6",
  bank: "Mercado Pago (Cuenta Vista)",
  accountType: "Cuenta Vista",
  accountNumber: "1088183168",
  email: "pagos@institutolael.cl",
};
const WAPP = "56964626568";

export default function Pagos() {
  return (
    <section className="pay">
      <style>{css}</style>

      {/* HERO */}
      <header className="hero">
        <div className="container">
          <span className="pill">Pagos</span>
          <h1>Formas de pago y comprobantes</h1>
          <p className="lead">
            Transfiere y envía el comprobante por WhatsApp o correo. Activamos tu
            matrícula cuando lo validemos. Si tienes dudas, te ayudamos al tiro.
          </p>
          <div className="cta">
            <a
              className="btn btn-primary"
              href={`https://wa.me/${WAPP}?text=${encodeURIComponent(
                "Hola 👋, acabo de pagar/quiero pagar y necesito confirmar mi matrícula."
              )}`}
              target="_blank"
              rel="noreferrer"
            >
              Enviar comprobante por WhatsApp
            </a>
            <a
              className="btn btn-ghost"
              href={`mailto:${BANK.email}?subject=${encodeURIComponent(
                "Comprobante de pago"
              )}&body=${encodeURIComponent(
                "Hola, adjunto mi comprobante de transferencia.\n\nNombre:\nPrograma/Plan:\nMonto:\nObservaciones:"
              )}`}
            >
              Enviar por correo
            </a>
            <Link className="btn btn-outline" to="/inscripcion">
              Volver a Inscripción
            </Link>
          </div>
        </div>
      </header>

      {/* CONTENIDO */}
      <div className="container grid">
        {/* Cómo pagar */}
        <article className="card">
          <h2 className="h6">Cómo pagar (3 pasos simples)</h2>
          <ol className="steps">
            <li><b>Transfiere</b> a la cuenta de abajo (mismo titular).</li>
            <li>
              <b>Guarda</b> el comprobante (PDF/JPG/PNG) desde tu app o banco.
            </li>
            <li>
              <b>Envíalo</b> por WhatsApp o correo con tu <i>nombre</i> y <i>plan/ramos</i>.
            </li>
          </ol>

          <hr />

          <h3 className="h6">Datos de transferencia</h3>
          <BankRows bank={BANK} />

          <p className="tiny subtle">
            <b>Importante:</b> usa el mismo correo que registraste en la inscripción para
            validar más rápido.
          </p>
        </article>

        {/* Ayuda / Checklist / FAQ */}
        <aside className="card">
          <h2 className="h6">Checklist del comprobante</h2>
          <ul className="check">
            <li>✔ Nombre y RUT del titular correctos</li>
            <li>✔ Monto y fecha visibles</li>
            <li>✔ Adjuntaste el archivo correcto (PDF/JPG/PNG)</li>
            <li>✔ Agregaste tu nombre y plan/ramos en el mensaje</li>
          </ul>

          <div className="note">
            💡 Si combinaste ramos o cambiaste de plan, te ayudamos a recalcular sin dramas.
          </div>

          <hr />

          <h3 className="h6">Preguntas rápidas</h3>
          <details>
            <summary>¿Cuánto se demora la validación?</summary>
            <p>Normalmente dentro de <b>24–48 h hábiles</b>. Si es urgente, avisa por WhatsApp.</p>
          </details>
          <details>
            <summary>¿Emitimos boleta de honorarios?</summary>
            <p>Sí, todos los pagos se respaldan con <b>boleta de honorarios</b>.</p>
          </details>
          <details>
            <summary>¿Puedo pagar por partes o cambiar mi plan?</summary>
            <p>Sí. Escríbenos y vemos la mejor alternativa según tu caso.</p>
          </details>
        </aside>
      </div>
    </section>
  );
}

/* ---------- Subcomponentes ---------- */
function BankRows({ bank }) {
  const rows = [
    ["Banco", bank.bank],
    ["Tipo de cuenta", bank.accountType],
    ["Titular", bank.holder],
    ["RUT", bank.rut],
    ["N° de cuenta", bank.accountNumber],
    ["Correo comprobantes", bank.email],
  ];

  return (
    <div className="bank">
      {rows.map(([k, v]) => (
        <CopyRow key={k} label={k} value={v} />
      ))}
    </div>
  );
}

function CopyRow({ label, value }) {
  const [ok, setOk] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(String(value));
      setOk(true);
      setTimeout(() => setOk(false), 1200);
    } catch {
      // fallback
      const ta = document.createElement("textarea");
      ta.value = String(value);
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
      setOk(true);
      setTimeout(() => setOk(false), 1200);
    }
  }

  return (
    <div className="row">
      <div className="k">{label}</div>
      <div className="v">{value}</div>
      <button type="button" className="copy" onClick={copy} aria-label={`Copiar ${label}`}>
        {ok ? "Copiado ✓" : "Copiar"}
      </button>
    </div>
  );
}

/* ---------- CSS ---------- */
const css = `
:root{
  --bg:#0b1220; --panel:#0e1424; --bd:#1f2a44;
  --ink:#ffffff; --muted:#cfe0ff;
  --accent:#5850EC; --accent2:#22d3ee; --ok:#16a34a;
}
.pay{ color:var(--ink); background:linear-gradient(180deg,var(--bg),var(--panel)); }
.container{ max-width:1120px; margin:0 auto; padding:0 18px; }

/* HERO */
.hero{ padding:36px 0 16px; border-bottom:1px solid var(--bd);
  background:
    radial-gradient(880px 320px at 10% -10%, rgba(88,80,236,.12), transparent 60%),
    radial-gradient(820px 300px at 92% -12%, rgba(34,211,238,.10), transparent 60%);
}
.pill{ display:inline-block; padding:.28rem .62rem; border-radius:999px; border:1px solid #334155; background:#101a2f; font-weight:900; color:#cfe0ff; }
h1{ margin:.35rem 0 .25rem; font-size: clamp(1.9rem, 2.2vw + 1rem, 2.4rem); }
.lead{ color:var(--muted); opacity:.95; max-width:66ch; }
.cta{ display:flex; gap:10px; flex-wrap:wrap; margin:12px 0 6px; }
.btn{ display:inline-flex; align-items:center; justify-content:center; gap:8px; padding:.66rem 1rem; border-radius:12px; border:1px solid #2f3341; text-decoration:none; font-weight:900; }
.btn-primary{ background:var(--accent); color:#fff; border-color:var(--accent); }
.btn-ghost{ background:transparent; color:#eaf2ff; }
.btn-outline{ background:transparent; color:#eaf2ff; border-color:#2f3341; }

/* GRID */
.grid{ display:grid; gap:16px; padding:18px 0 28px; grid-template-columns: 1.2fr .8fr; }
@media (max-width:980px){ .grid{ grid-template-columns:1fr; } }

.card{
  border:1px solid var(--bd); border-radius:18px; background:linear-gradient(180deg,#0f172a,#0b1220);
  box-shadow:0 18px 36px rgba(2,6,23,.26); padding:16px;
}
.h6{ margin:0 0 6px; font-size:1rem; font-weight:900; }
hr{ border:0; border-top:1px solid var(--bd); margin:12px 0; }

/* Steps */
.steps{ margin:8px 0 0; padding-left:18px; color:#eaf2ff; }
.steps li{ margin:6px 0; }

/* Bank rows */
.bank{ display:grid; gap:8px; margin:8px 0 0; }
.row{ display:grid; grid-template-columns: 160px 1fr auto; gap:8px; align-items:center; }
.k{ color:#9fb3c8; }
.v{ color:#fff; word-break:break-word; }
.copy{ padding:.42rem .7rem; border-radius:10px; border:1px solid #2b3656; background:#0f172a; color:#eaf2ff; }
.copy:hover{ transform:translateY(-1px); box-shadow:0 10px 20px rgba(2,6,23,.28); }

/* Side */
.check{ margin:8px 0 10px; padding-left:18px; color:#eaf2ff; }
.note{
  margin:10px 0; padding:.65rem .8rem; border-radius:12px;
  background:#0f172a; border:1px dashed #2b3b61; color:#eaf2ff;
}

/* Details */
details{ border:1px solid var(--bd); border-radius:12px; background:#0f172a; padding:10px 12px; margin:8px 0; }
summary{ cursor:pointer; font-weight:900; list-style:none; display:flex; align-items:center; gap:8px; }
summary::-webkit-details-marker{ display:none; }
summary::after{ content:"▸"; margin-left:auto; transform:rotate(0deg); transition:transform .16s ease; color:var(--accent2); }
details[open] summary::after{ transform:rotate(90deg); }

/* A11y focus */
button:focus-visible, .btn:focus-visible, .copy:focus-visible {
  outline:2px solid var(--accent2); outline-offset:2px;
}
`;