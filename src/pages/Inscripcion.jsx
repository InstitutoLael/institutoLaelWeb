// src/pages/Inscripcion.jsx
import { Link } from "react-router-dom";

const WAPP_INTL = "56964626568";
const FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSfDVse7cbhnAOhA2OklnmBvaeKZY4ZDWOmrYFqSfAvV8joVOA/viewform?embedded=true";

export default function Inscripcion() {
  return (
    <section className="enroll">
      <style>{css}</style>

      {/* HERO */}
      <header className="hero">
        <div className="container hero__inner">
          <div className="hero__copy">
            <span className="pill">Inscripción</span>
            <h1>Reserva tu cupo 2026</h1>
            <p className="subtle">
              Completa el formulario y te contactamos para orientar tu matrícula.
              Respondemos en <b>24–48 h hábiles</b>. Todas las clases quedan grabadas.
            </p>

            <ul className="steps" aria-label="Pasos de inscripción">
              <li><span className="dot" /> Completa el formulario</li>
              <li><span className="dot" /> Te asesoramos por WhatsApp/Correo</li>
              <li><span className="dot" /> Confirmas pago y agenda inicio</li>
            </ul>

            <div className="cta">
              <a
                className="btn btn-primary"
                href={`https://wa.me/${WAPP_INTL}?text=${encodeURIComponent(
                  "Hola 👋, quiero inscribirme en Instituto Lael y tengo una consulta."
                )}`}
                target="_blank"
                rel="noreferrer"
              >
                Hablar por WhatsApp
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

            <div className="badges">
              <span className="badge">Matrícula única</span>
              <span className="badge">Precios claros</span>
              <span className="badge">Acompañamiento real</span>
            </div>
          </div>

          <div className="hero__card">
            <div className="mini-card">
              <div className="mini-card__head">
                <span className="mini-kicker">Soporte</span>
                <span className="mini-bullet">⏱ 24–48 h</span>
              </div>
              <p className="mini-text">
                ¿Dudas sobre plan, ramos u horarios? Escribe y te orientamos rápido.
              </p>
              <a
                className="btn btn-mini"
                href={`https://wa.me/${WAPP_INTL}?text=${encodeURIComponent(
                  "Hola 👋, necesito ayuda para completar mi inscripción."
                )}`}
                target="_blank"
                rel="noreferrer"
              >
                Quiero orientación
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* CONTENIDO */}
      <div className="container grid">
        {/* FORM EMBED */}
        <article className="card">
          <div className="card__head">
            <h2 className="h6">Formulario de inscripción</h2>
            <p className="tiny subtle">
              Si no ves el formulario, usa el botón <i>“Abrir formulario en nueva pestaña”</i>.
            </p>
          </div>

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
        <aside className="card side">
          <h2 className="h6">Pago por transferencia</h2>
          <div className="bank blk">
            <Row k="Nombre" v="Instituto Lael SpA" />
            <Row k="RUT" v="78.084.019-6" />
            <Row k="Tipo de cuenta" v="Cuenta Vista – Mercado Pago" />
            <Row k="N° de cuenta" v="1088183168" />
            <Row k="Correo comprobantes" v="pagos@institutolael.cl" />
            <Row k="Glosa" v="Nombre del estudiante + Programa" />
          </div>

          <p className="tiny subtle">
            Envía el comprobante por WhatsApp o correo y activamos tu matrícula.
          </p>

          <div className="note">
            💡 <b>Tip:</b> si combinas ramos o cambias de plan, te ayudamos a recalcular tu pago.
          </div>

          <hr />

          <h3 className="h6">¿Necesitas ayuda?</h3>
          <p className="tiny subtle">
            Escríbenos y te orientamos para elegir plan, ramos u horarios.
          </p>
          <a
            className="btn btn-primary w-full"
            href={`https://wa.me/${WAPP_INTL}?text=${encodeURIComponent(
              "Hola 👋, necesito ayuda para completar mi inscripción."
            )}`}
            target="_blank"
            rel="noreferrer"
          >
            Hablar por WhatsApp
          </a>

          <ul className="tiny checklist">
            <li>✔ Clases en vivo y grabadas</li>
            <li>✔ Ensayos y retroalimentación</li>
            <li>✔ Tutoría y seguimiento real</li>
          </ul>
        </aside>
      </div>
    </section>
  );
}

/* ----------- Subcomponente simple para filas bank ---------- */
function Row({ k, v }) {
  return (
    <div className="row">
      <strong>{k}:</strong> <span>{v}</span>
    </div>
  );
}

/* ----------- CSS local, minimal y consistente ---------- */
const css = `
:root{
  --bg:#0b1220; --panel:#0e1424; --soft:#0d1528; --bd:#1f2a44;
  --ink:#ffffff; --muted:#eaf2ff; --accent:#5850EC; --accent2:#22d3ee;
}
.enroll{ color:var(--ink); }
.container{ max-width:1120px; margin:0 auto; padding:0 18px; }

/* HERO */
.hero{
  padding:30px 0 16px; border-bottom:1px solid var(--bd);
  background:
    radial-gradient(880px 320px at 10% -10%, rgba(88,80,236,.16), transparent 60%),
    radial-gradient(820px 300px at 92% -12%, rgba(34,211,238,.10), transparent 60%);
}
.hero__inner{ display:grid; grid-template-columns: 1.08fr .92fr; gap:20px; align-items:start; }
@media (max-width:980px){ .hero__inner{ grid-template-columns:1fr; } }
.hero__copy{ padding:6px 0; }
.pill{
  display:inline-block; padding:.28rem .62rem; border-radius:999px;
  border:1px solid #334155; background:#101a2f; font-weight:900;
}
h1{ margin:.5rem 0 .35rem; font-size:clamp(1.9rem, 3.4vw + .4rem, 2.5rem); }
.subtle{ color:var(--muted); opacity:.95; }
.steps{ list-style:none; margin:12px 0 4px; padding:0; display:grid; gap:6px; }
.steps li{ display:flex; align-items:center; gap:10px; color:#dbeafe; }
.steps .dot{ width:8px; height:8px; border-radius:50%; background:var(--accent2); display:inline-block; }

.cta{ display:flex; gap:10px; flex-wrap:wrap; margin:12px 0 8px; }
.btn{
  display:inline-flex; align-items:center; justify-content:center; gap:8px;
  padding:.7rem 1rem; border-radius:12px; border:1px solid #2f3341; text-decoration:none; font-weight:900;
  transition:.16s transform ease, .16s box-shadow ease;
}
.btn:hover{ transform: translateY(-1px); box-shadow:0 14px 28px rgba(2,6,23,.28); }
.btn-primary{ background:var(--accent); color:#fff; border-color:var(--accent); }
.btn-outline{ background:transparent; color:#eaf2ff; border-color:#334155; }
.btn-ghost{ background:transparent; color:#eaf2ff; border-color:#2f3341; }
.w-full{ width:100%; }

.badges{ display:flex; gap:8px; flex-wrap:wrap; margin-top:6px; }
.badge{ font-size:.78rem; padding:.22rem .6rem; border-radius:999px; border:1px solid #334155; background:#0f172a; }

/* tarjetita lateral del hero */
.hero__card{ display:flex; justify-content:flex-end; }
.mini-card{
  border:1px solid var(--bd); border-radius:14px; padding:14px;
  background:linear-gradient(180deg,#0f172a,#0b1220); box-shadow:0 16px 30px rgba(2,6,23,.28);
  max-width:360px;
}
.mini-card__head{ display:flex; align-items:center; justify-content:space-between; margin-bottom:6px; }
.mini-kicker{ font-size:.8rem; color:#a5b4fc; font-weight:900; letter-spacing:.2px; }
.mini-bullet{ font-size:.78rem; color:#cfe0ff; background:#0f172a; border:1px solid #22304d; border-radius:999px; padding:.12rem .5rem; }
.mini-text{ margin:0 0 10px; color:#eaf2ff; }
.btn-mini{ padding:.56rem .84rem; border-radius:10px; background:var(--accent2); color:#06202b; border-color:transparent; font-weight:900; }

/* GRID contenido */
.grid{
  display:grid; gap:16px; padding:18px 0 28px;
  grid-template-columns: 1.12fr .88fr;
}
@media (max-width:980px){ .grid{ grid-template-columns:1fr; } }

.card{
  border:1px solid var(--bd); border-radius:18px; background:linear-gradient(180deg,#0f172a,#0b1220);
  box-shadow:0 18px 36px rgba(2,6,23,.26); padding:16px;
}
.card__head{ display:flex; align-items:end; justify-content:space-between; gap:10px; margin-bottom:8px; }
.h6{ margin:0; font-size:1rem; font-weight:900; color:#fff; }
.tiny{ font-size:.92rem; }

.side .note{
  margin:10px 0; padding:.6rem .8rem; border-radius:10px;
  background:#0f172a; border:1px dashed #2b3b61; color:#eaf2ff;
}
.checklist{ list-style:none; padding:0; margin:10px 0 0; color:#dbeafe; }
.checklist li{ margin:4px 0; }

/* Iframe responsive con altura razonable */
.iframe-wrap{
  position:relative; width:100%;
  height: min(1400px, 76vh);
  border:1px solid var(--bd); border-radius:14px; overflow:hidden; background:#0f172a;
}
@media (max-width:640px){ .iframe-wrap{ height: 75vh; } }
.iframe-wrap iframe{
  position:absolute; inset:0; width:100%; height:100%; border:0; background:#0f172a;
}

/* bank rows */
.bank.blk{ display:grid; gap:6px; margin:8px 0 12px; }
.row{ display:flex; gap:6px; flex-wrap:wrap; }
.row strong{ color:#fff; }
.row span{ color:#eaf2ff; }

hr{ border:0; border-top:1px solid var(--bd); margin:12px 0; }
`;