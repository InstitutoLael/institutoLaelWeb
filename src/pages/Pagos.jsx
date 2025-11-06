// src/pages/Pagos.jsx
import { Link } from "react-router-dom";
import { useMemo, useState } from "react";

/** ⚙️ Tus datos reales */
const BANK = {
  holder: "Instituto Lael SpA",
  rut: "78.084.019-6",
  bank: "Mercado Pago (Cuenta Vista)",
  accountType: "Cuenta Vista",
  accountNumber: "1088183168",
  email: "pagos@institutolael.cl",
};
const WAPP = "56964626568";

/* Util: formato CLP */
const clp = (n) =>
  Number(n || 0).toLocaleString("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  });

export default function Pagos() {
  const [name, setName] = useState("");
  const [plan, setPlan] = useState("");
  const [amountRaw, setAmountRaw] = useState(""); // input libre
  const [notes, setNotes] = useState("");

  // Monto numérico (limpia puntos/espacios)
  const amountNum = useMemo(() => {
    const n = Number(String(amountRaw).replace(/[^\d]/g, "")) || 0;
    return n;
  }, [amountRaw]);

  const valid = name.trim().length >= 3 && amountNum > 0;

  // Mensajes armados en vivo
  const mailSubject = `Comprobante de pago • ${name || "Alumno/a"}`;
  const mailBody = [
    "Hola, adjunto mi comprobante de transferencia.",
    "",
    `Nombre: ${name || "—"}`,
    `Programa/Plan: ${plan || "—"}`,
    `Monto: ${amountNum ? clp(amountNum) : "—"}`,
    `Observaciones: ${notes || "—"}`,
    "",
    "Gracias.",
  ].join("\n");

  const waText = [
    "Hola 👋, avisé por correo mi pago.",
    `Nombre: ${name || "—"}`,
    `Programa/Plan: ${plan || "—"}`,
    `Monto: ${amountNum ? clp(amountNum) : "—"}`,
    notes ? `Notas: ${notes}` : null,
    "¿Pueden confirmar, por favor?",
  ]
    .filter(Boolean)
    .join("\n");

  const mailtoURL = `mailto:${BANK.email}?subject=${encodeURIComponent(
    mailSubject
  )}&body=${encodeURIComponent(mailBody)}`;

  const waURL = `https://wa.me/${WAPP}?text=${encodeURIComponent(waText)}`;

  return (
    <section className="pay">
      <style>{css}</style>

      {/* HERO */}
      <header className="hero">
        <div className="container">
          <span className="pill">Pagos</span>
          <h1>Formas de pago y comprobantes</h1>
          <p className="lead">
            Transfiere y envía el comprobante por WhatsApp o correo. Activamos tu matrícula al
            validar el pago. Si necesitas ayuda, te orientamos al tiro.
          </p>

          <div className="cta">
            <a className="btn btn-primary" href={waURL} target="_blank" rel="noreferrer" aria-disabled={!valid} onClick={(e)=>{ if(!valid){ e.preventDefault(); } }}>
              Enviar comprobante por WhatsApp
            </a>
            <a className="btn btn-ghost" href={mailtoURL} aria-disabled={!valid} onClick={(e)=>{ if(!valid){ e.preventDefault(); } }}>
              Enviar por correo
            </a>
            <Link className="btn btn-outline" to="/inscripcion">
              Volver a Inscripción
            </Link>
          </div>
          <p className="tiny subtle">
            Completa <b>Nombre</b>, <b>Plan</b> y <b>Monto</b> más abajo para habilitar los botones.
          </p>
        </div>
      </header>

      {/* CONTENIDO — UNA SOLA COLUMNA */}
      <div className="container stack">
        {/* BLOQUE 1: FORM RÁPIDO */}
        <article className="card section">
          <h2 className="h6">1) Completa tus datos</h2>

          <div className="form">
            <label className="lbl" htmlFor="nm">Nombre completo <span className="req">*</span></label>
            <input
              id="nm"
              className="inp"
              placeholder="Nombre y Apellido"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
            />

            <label className="lbl" htmlFor="pl">Programa / Plan</label>
            <input
              id="pl"
              className="inp"
              placeholder="Ej: PAES M1 + Lenguaje / LSCh Trimestral / Inglés B1"
              value={plan}
              onChange={(e) => setPlan(e.target.value)}
            />

            <label className="lbl" htmlFor="am">Monto transferido (CLP) <span className="req">*</span></label>
            <input
              id="am"
              className="inp"
              inputMode="numeric"
              placeholder="$0"
              value={amountRaw}
              onChange={(e) => setAmountRaw(e.target.value)}
              onBlur={(e) => {
                const v = Number(String(e.target.value).replace(/[^\d]/g, "")) || 0;
                setAmountRaw(v ? clp(v) : "");
              }}
            />

            <label className="lbl" htmlFor="nt">Notas (opcional)</label>
            <textarea
              id="nt"
              className="inp ta"
              rows={3}
              placeholder="Algo que debamos saber para validar más rápido…"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          <div className="row-btns">
            <a className={`btn btn-primary ${!valid ? "disabled" : ""}`} href={waURL} target="_blank" rel="noreferrer" onClick={(e)=>{ if(!valid) e.preventDefault(); }}>
              Enviar por WhatsApp
            </a>
            <a className={`btn btn-ghost ${!valid ? "disabled" : ""}`} href={mailtoURL} onClick={(e)=>{ if(!valid) e.preventDefault(); }}>
              Enviar por correo
            </a>
          </div>

          {!valid && (
            <p className="tiny subtle mt-6">Completa <b>Nombre</b> y <b>Monto</b> para habilitar los botones.</p>
          )}
        </article>

        {/* BLOQUE 2: DATOS DE TRANSFERENCIA */}
        <article className="card section">
          <h2 className="h6">2) Datos de transferencia</h2>
          <BankRows bank={BANK} />
          <p className="tiny subtle mt-6">
            <b>Tip:</b> usa el mismo correo de tu inscripción para validar más rápido.
          </p>
        </article>

        {/* BLOQUE 3: CÓMO PAGAR + CHECKLIST + FAQ */}
        <article className="card section">
          <h2 className="h6">3) Cómo pagar</h2>
          <ol className="steps">
            <li><b>Transfiere</b> a la cuenta de arriba.</li>
            <li><b>Guarda</b> el comprobante (PDF/JPG/PNG) desde tu banco.</li>
            <li><b>Envíalo</b> por WhatsApp o correo con tu <i>nombre</i> y <i>plan/ramos</i>.</li>
          </ol>

          <div className="hr" />

          <h3 className="h6">Checklist del comprobante</h3>
          <ul className="check">
            <li>✔ Nombre y RUT del titular correctos</li>
            <li>✔ Monto y fecha visibles</li>
            <li>✔ Archivo correcto (PDF/JPG/PNG)</li>
            <li>✔ Agregaste tu nombre y plan/ramos en el mensaje</li>
          </ul>

          <details>
            <summary>¿Cuánto demora la validación?</summary>
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
        </article>

        {/* CTA FINAL */}
        <div className="foot-cta">
          <a className={`btn btn-primary ${!valid ? "disabled" : ""}`} href={waURL} target="_blank" rel="noreferrer" onClick={(e)=>{ if(!valid) e.preventDefault(); }}>
            Enviar comprobante por WhatsApp
          </a>
          <a className={`btn btn-ghost ${!valid ? "disabled" : ""}`} href={mailtoURL} onClick={(e)=>{ if(!valid) e.preventDefault(); }}>
            Enviar por correo
          </a>
          <Link className="btn btn-outline" to="/inscripcion">Volver a Inscripción</Link>
        </div>
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
    <div className="bank-list">
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
    <div className="bank-row">
      <div className="k">{label}</div>
      <div className="v">{value}</div>
      <button type="button" className="copy" onClick={copy} aria-label={`Copiar ${label}`}>
        {ok ? "Copiado ✓" : "Copiar"}
      </button>
    </div>
  );
}

/* ---------- CSS (1 columna, aire, sin grids apretados) ---------- */
const css = `
:root{
  --bg:#0b1220; --panel:#0e1424; --bd:#1f2a44;
  --ink:#ffffff; --muted:#cfe0ff;
  --accent:#5850EC; --accent2:#22d3ee;
}

.pay{ color:var(--ink); background:linear-gradient(180deg,var(--bg),var(--panel)); }
.container{ max-width:1120px; margin:0 auto; padding:0 18px; }

/* HERO */
.hero{ padding:42px 0 18px; border-bottom:1px solid var(--bd);
  background:
    radial-gradient(880px 320px at 10% -10%, rgba(88,80,236,.12), transparent 60%),
    radial-gradient(820px 300px at 90% -12%, rgba(34,211,238,.10), transparent 60%);
}
.pill{
  display:inline-block; padding:.32rem .68rem; border-radius:999px;
  border:1px solid #334155; background:#101a2f; font-weight:900; color:#cfe0ff;
}
h1{ margin:.45rem 0 .32rem; font-size: clamp(2rem, 2.2vw + 1rem, 2.4rem); }
.lead{ color:var(--muted); opacity:.95; max-width:70ch; }
.cta{ display:flex; gap:10px; flex-wrap:wrap; margin:14px 0 8px; }
.btn{
  display:inline-flex; align-items:center; justify-content:center; gap:8px;
  padding:.72rem 1rem; border-radius:12px; border:1px solid #2f3341; text-decoration:none; font-weight:900;
  transition:.16s transform ease, .16s box-shadow ease;
}
.btn:hover{ transform: translateY(-1px); box-shadow:0 14px 28px rgba(2,6,23,.28); }
.btn-primary{ background:var(--accent); color:#fff; border-color:var(--accent); }
.btn-ghost{ background:transparent; color:#eaf2ff; }
.btn-outline{ background:transparent; color:#eaf2ff; border-color:#2f3341; }
.btn.disabled, .btn[aria-disabled="true"]{ opacity:.55; pointer-events:none; }

/* CONTENIDO (UNA SOLA COLUMNA) */
.stack{ display:block; padding:24px 0 42px; }
.section{ margin:0 auto 18px; max-width:900px; }

.card{
  border:1px solid var(--bd); border-radius:18px;
  background:linear-gradient(180deg,#0f172a,#0b1220);
  box-shadow:0 18px 36px rgba(2,6,23,.26);
  padding:20px;
}
.h6{ margin:0 0 10px; font-size:1.08rem; font-weight:900; }

.hr{ height:1px; background:var(--bd); margin:16px 0; }

/* Form simple (apilado) */
.form{ display:flex; flex-direction:column; gap:10px; margin-top:6px; }
.lbl{ font-weight:900; color:#eaf2ff; }
.req{ color:#22d3ee; margin-left:.2rem; }
.inp{
  background:#0f172a; color:#eaf2ff; border:1px solid #22304d;
  border-radius:12px; padding:.68rem .84rem;
}
.inp::placeholder{ color:#9fb3c8 }
.ta{ min-height:100px; resize:vertical }
.row-btns{ display:flex; gap:10px; flex-wrap:wrap; margin-top:10px; }

/* Bank list — filas apiladas con aire */
.bank-list{ display:grid; gap:12px; margin-top:8px; }
.bank-row{
  display:block; padding:12px; border:1px solid #22304d; border-radius:12px;
  background:#0f172a;
}
.bank-row .k{ color:#9fb3c8; font-size:.92rem; margin-bottom:4px; }
.bank-row .v{ color:#fff; word-break:break-word; font-weight:800; margin-bottom:8px; }
.copy{
  padding:.5rem .9rem; border-radius:10px; border:1px solid #2b3656; background:#0f172a; color:#eaf2ff;
}
.copy:hover{ transform:translateY(-1px); box-shadow:0 10px 20px rgba(2,6,23,.28); }

/* Steps / Checklist / FAQ */
.steps{ margin:8px 0 12px; padding-left:18px; color:#eaf2ff; line-height:1.55; }
.steps li{ margin:8px 0; }

.check{ margin:8px 0 12px; padding-left:18px; color:#eaf2ff; line-height:1.55; }

details{ border:1px solid var(--bd); border-radius:12px; background:#0f172a; padding:12px 14px; margin:10px 0; }
summary{ cursor:pointer; font-weight:900; list-style:none; display:flex; align-items:center; gap:8px; }
summary::-webkit-details-marker{ display:none; }
summary::after{ content:"▸"; margin-left:auto; transform:rotate(0deg); transition:transform .16s ease; color:#22d3ee; }
details[open] summary::after{ transform:rotate(90deg); }

/* Helpers */
.tiny{ font-size:.9rem; }
.subtle{ color:#cbd5e1; }
.mt-6{ margin-top:1rem; }

/* Focus A11y */
button:focus-visible, .btn:focus-visible, .copy:focus-visible, .inp:focus-visible {
  outline:2px solid var(--accent2); outline-offset:2px;
}
`;