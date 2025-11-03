// src/pages/Inscripcion.jsx
import { Link } from "react-router-dom";

const WAPP_INTL = "56964626568";
// Tu Google Form embebido
const FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSfDVse7cbhnAOhA2OklnmBvaeKZY4ZDWOmrYFqSfAvV8joVOA/viewform?embedded=true";

export default function Inscripcion() {
  return (
    <section className="enroll">
      <style>{css}</style>

      {/* HERO */}
      <header className="hero">
        <span className="pill">Inscripción</span>
        <h1>Reserva tu cupo 2026</h1>
        <p className="subtle">
          Completa el formulario para recibir orientación y confirmar tu
          matrícula. Respondemos en <b>24–48 h hábiles</b>. Todas las clases
          quedan grabadas.
        </p>

        <div className="cta">
          <a
            className="btn btn-primary"
            href={`https://wa.me/${WAPP_INTL}?text=${encodeURIComponent(
              "Hola 👋, quiero inscribirme en Instituto Lael y tengo una consulta."
            )}`}
            target="_blank"
            rel="noreferrer"
          >
            WhatsApp
          </a>
          <a
            className="btn btn-outline"
            href={FORM_URL.replace("?embedded=true", "")}
            target="_blank"
            rel="noreferrer"
          >
            Abrir formulario en nueva pestaña
          </a>
          <Link className="btn btn-ghost" to="/pagos">
            Ver formas de pago
          </Link>
        </div>
      </header>

      <div className="container grid">
        {/* FORM EMBED */}
        <article className="card">
          <h2 className="h6">Formulario de inscripción</h2>
          <p className="tiny subtle">
            Si no ves el formulario abajo, usa el botón{" "}
            <i>“Abrir formulario en nueva pestaña”</i>.
          </p>

          <div className="iframe-wrap" role="region" aria-label="Formulario de Google">
            <iframe
              title="Inscripción Instituto Lael 2026"
              src={FORM_URL}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </article>

        {/* PAGO Y AYUDA */}
        <aside className="card">
          <h2 className="h6">Pago por transferencia</h2>
          <div className="bank blk">
            <div>
              <strong>Nombre:</strong> Instituto Lael SpA
            </div>
            <div>
              <strong>RUT:</strong> 78.084.019-6
            </div>
            <div>
              <strong>Tipo de cuenta:</strong> Cuenta Vista – Mercado Pago
            </div>
            <div>
              <strong>N° de cuenta:</strong> 1088183168
            </div>
            <div>
              <strong>Correo comprobantes:</strong> pagos@institutolael.cl
            </div>
            <div>
              <strong>Glosa:</strong> Nombre del estudiante + Programa
            </div>
          </div>

          <p className="tiny subtle">
            Envía el comprobante por WhatsApp o correo y activamos tu matrícula.
          </p>

          <hr />
          <h3 className="h6">¿Necesitas ayuda?</h3>
          <p className="tiny subtle">
            Escríbenos y te orientamos para elegir plan, ramos u horarios.
          </p>
          <a
            className="btn btn-primary"
            href={`https://wa.me/${WAPP_INTL}?text=${encodeURIComponent(
              "Hola 👋, necesito ayuda para completar mi inscripción."
            )}`}
            target="_blank"
            rel="noreferrer"
          >
            Hablar por WhatsApp
          </a>
        </aside>
      </div>
    </section>
  );
}

/* estilos locales */
const css = `
:root{
  --bg:#0b1220; --panel:#0e1424; --soft:#0d1528; --bd:#1f2a44;
  --ink:#ffffff; --muted:#eaf2ff; --accent:#5850EC; --accent2:#22d3ee;
}
.enroll{ color:var(--ink); }
.container{ max-width:1120px; margin:0 auto; padding:0 18px; }
.hero{
  padding:34px 0 10px; border-bottom:1px solid var(--bd);
  background:
    radial-gradient(880px 320px at 10% -10%, rgba(88,80,236,.16), transparent 60%),
    radial-gradient(820px 300px at 92% -12%, rgba(34,211,238,.10), transparent 60%);
}
.pill{
  display:inline-block; padding:.28rem .62rem; border-radius:999px;
  border:1px solid #334155; background:#101a2f; font-weight:900;
}
h1{ margin:.5rem 0 .35rem; font-size:clamp(1.8rem, 3.2vw + .6rem, 2.4rem); }
.subtle{ color:var(--muted); opacity:.95; }

.cta{ display:flex; gap:10px; flex-wrap:wrap; margin:12px 0 4px; }
.btn{
  display:inline-flex; align-items:center; justify-content:center; gap:8px;
  padding:.7rem 1rem; border-radius:12px; border:1px solid #2f3341; text-decoration:none; font-weight:900;
  transition:.16s transform ease, .16s box-shadow ease;
}
.btn:hover{ transform: translateY(-1px); box-shadow:0 14px 28px rgba(2,6,23,.28); }
.btn-primary{ background:var(--accent); color:#fff; border-color:var(--accent); }
.btn-outline{ background:transparent; color:#eaf2ff; }
.btn-ghost{ background:transparent; color:#eaf2ff; border:1px solid #2f3341; }

.grid{
  display:grid; gap:14px; padding:16px 0 28px;
  grid-template-columns: 1.1fr .9fr;
}
@media (max-width:980px){ .grid{ grid-template-columns:1fr; } }

.card{
  border:1px solid var(--bd); border-radius:18px; background:linear-gradient(180deg,#0f172a,#0b1220);
  box-shadow:0 18px 36px rgba(2,6,23,.26); padding:16px;
}
.h6{ margin:0 0 6px; font-size:1rem; font-weight:900; color:#fff; }
.tiny{ font-size:.92rem; }

.iframe-wrap{
  position:relative; width:100%;
  /* Altura flexible: en móvil ocupa más alto */
  height: min(1600px, 80vh);
  border:1px solid var(--bd); border-radius:14px; overflow:hidden; background:#0f172a;
}
@media (max-width:640px){ .iframe-wrap{ height: 78vh; } }
.iframe-wrap iframe{
  position:absolute; inset:0; width:100%; height:100%; border:0;
  background:#0f172a;
}

.bank.blk{ display:grid; gap:4px; margin:8px 0 10px; }
hr{ border:0; border-top:1px solid var(--bd); margin:12px 0; }
`;