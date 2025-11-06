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
            <span className="pill">Inscripción 2026</span>
            <h1>Reserva tu cupo 2026</h1>
            <p className="subtle">
              Te contactamos en <b>24–48 h hábiles</b> para orientar tu matrícula.
              Todo online y con clases grabadas.
            </p>

            <div className="cta">
              <a
                className="btn btn-primary"
                href={FORM_URL.replace("?embedded=true", "")}
                target="_blank"
                rel="noreferrer"
              >
                Inscribirme ahora
              </a>
              <a
                className="btn btn-outline"
                href={`https://wa.me/${WAPP_INTL}?text=${encodeURIComponent(
                  "Hola 👋, quiero inscribirme en Instituto Lael y tengo una consulta."
                )}`}
                target="_blank"
                rel="noreferrer"
              >
                Hablar por WhatsApp
              </a>
              <Link className="btn btn-ghost" to="/pagos">
                Ver formas de pago
              </Link>
            </div>

            <div className="chips">
              <span className="chip">PAES</span>
              <span className="chip">Idiomas</span>
              <span className="chip">LSCh</span>
            </div>

            <div className="badges">
              <span className="badge">Matrícula única</span>
              <span className="badge">Precios claros</span>
              <span className="badge">Acompañamiento real</span>
            </div>
          </div>

          <div className="hero__card">
            <div className="mini-card panel panel--teal">
              <div className="mini-card__head">
                <span className="mini-kicker">Soporte</span>
                <span className="mini-bullet">⏱ 24–48 h</span>
              </div>
              <p className="mini-text">
                ¿Dudas sobre plan, ramos u horarios? Escríbenos y te orientamos rápido.
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

      {/* GRID PRINCIPAL */}
      <div className="container grid">

        {/* FORMULARIO (ancho) */}
        <article className="card panel panel--indigo">
          <div className="card__head">
            <h2 className="h6">Formulario de inscripción</h2>
            <p className="tiny subtle">
              Si no ves el formulario, usa el botón <i>“Inscribirme ahora”</i> para abrirlo en una pestaña nueva.
            </p>
          </div>
          <div className="iframe-wrap" role="region" aria-label="Formulario de Google">
            <iframe
              title="Inscripción Instituto Lael 2026 — PAES · Idiomas · LSCh"
              src={FORM_URL}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </article>

        {/* LATERAL: BENEFICIOS + TRANSFERENCIA */}
        <aside className="side stack-24">

          <section className="card panel panel--violet">
            <h2 className="h6">Beneficios en Lael</h2>
            <ul className="checklist">
              <li>🕒 Horarios flexibles · 100% online.</li>
              <li>📦 Material y LMS listo para partir.</li>
              <li>🎥 Clases en vivo + cápsulas (estructura clara).</li>
              <li>📈 Feedback real y opciones de liderazgo.</li>
              <li>💬 Comunidad: trabajo en equipo y respeto.</li>
            </ul>
            <a
              className="btn btn-amber w-full"
              href={`https://wa.me/${WAPP_INTL}?text=${encodeURIComponent(
                "Hola 👋, necesito ayuda para completar mi inscripción."
              )}`}
              target="_blank"
              rel="noreferrer"
            >
              Quiero orientación
            </a>
          </section>

          <section className="card panel panel--amber">
            <h2 className="h6">Transferencia</h2>
            <div className="bank blk">
              <Row k="Nombre" v="Instituto Lael SpA" />
              <Row k="RUT" v="78.084.019-6" />
              <Row k="Banco / Tipo" v="Mercado Pago · Cuenta Vista" />
              <Row k="N° de cuenta" v="1088183168" />
              <Row k="Comprobantes" v="pagos@institutolael.cl" />
              <Row k="Glosa" v="Nombre del estudiante + Programa" />
            </div>
            <div className="note">
              💡 <b>Tip:</b> si combinas ramos o cambias de plan, te ayudamos a recalcular tu pago.
            </div>
            <a
              className="btn btn-danger w-full"
              href={`https://wa.me/${WAPP_INTL}?text=${encodeURIComponent(
                "Hola 👋, ya realicé mi transferencia. Les envío el comprobante para confirmar mi inscripción."
              )}`}
              target="_blank"
              rel="noreferrer"
            >
              Confirmar por WhatsApp
            </a>
          </section>

        </aside>
      </div>

      {/* FEATURES + PROCESO */}
      <div className="container stack-32">
        <div className="features">
          <article className="card panel panel--indigoSoft">
            <h3 className="f-title">Matrícula única y precios claros</h3>
            <p className="subtle">Sin letra chica. Te mostramos el total antes de pagar.</p>
          </article>
          <article className="card panel panel--violetSoft">
            <h3 className="f-title">Clases en vivo + cápsulas</h3>
            <p className="subtle">Todo queda grabado para repasar cuando quieras.</p>
          </article>
          <article className="card panel panel--tealSoft">
            <h3 className="f-title">Acompañamiento real</h3>
            <p className="subtle">Tutorías, seguimiento y apoyo para sostener el ritmo.</p>
          </article>
        </div>

        <div className="grid grid--2">
          <section className="card panel panel--violetSoft">
            <ul className="dash">
              <li>Clases en vivo, cápsulas y acompañamiento a estudiantes.</li>
              <li>Ramos: M1, M2, Lenguaje, Historia, Ciencias.</li>
              <li>Ensayos y retroalimentación.</li>
              <li>Disponibilidad para modalidad 100% online.</li>
            </ul>

            <p className="tip">
              💬 Pago vía boleta de honorarios. Modalidad 100% online.
            </p>
          </section>

          <section className="card panel panel--tealSoft">
            <h3 className="h6">¿Cómo es el proceso?</h3>
            <ol className="stepsBox">
              <li><b>Completa</b> el formulario (2–3 min).</li>
              <li><b>Te escribimos</b> (24–48 h) para confirmar plan/horario.</li>
              <li><b>Pago y boleta</b>. Activamos tu acceso.</li>
              <li><b>Bienvenida</b>: cuentas, calendario y materiales.</li>
            </ol>
            <p className="subtle strong">
              Consejo: comparte logros concretos (aprobación, materiales creados, feedback).
            </p>
          </section>
        </div>
      </div>

      {/* FAQ + CTA */}
      <div className="container stack-32">
        <h3 className="h6 center">Preguntas frecuentes</h3>
        <div className="faq">
          <details className="card panel panel--indigoSoft">
            <summary>¿Cuándo empiezan las clases?</summary>
            <p>Tras validar tu inscripción y pago, coordinamos tu inicio en 24–72 h hábiles.</p>
          </details>
          <details className="card panel panel--violetSoft">
            <summary>¿Queda todo grabado?</summary>
            <p>Sí. Todas las clases quedarán disponibles en tu LMS para repasar.</p>
          </details>
          <details className="card panel panel--tealSoft">
            <summary>¿Hay becas o convenios?</summary>
            <p>Sí. Tenemos becas limitadas y convenios con redes. Escríbenos para orientarte.</p>
          </details>
          <details className="card panel panel--amberSoft">
            <summary>¿Puedo cambiar de plan/ramos?</summary>
            <p>Sí. Ajustamos tu plan y recalculamos el pago si corresponde.</p>
          </details>
        </div>

        <div className="cta-row">
          <a
            className="btn btn-primary"
            href={FORM_URL.replace("?embedded=true", "")}
            target="_blank"
            rel="noreferrer"
          >
            Inscribirme ahora
          </a>
          <a
            className="btn btn-amber"
            href={`https://wa.me/${WAPP_INTL}?text=${encodeURIComponent(
              "Hola 👋, quiero orientación para inscribirme."
            )}`}
            target="_blank"
            rel="noreferrer"
          >
            Quiero orientación
          </a>
        </div>
      </div>
    </section>
  );
}

function Row({ k, v }) {
  return (
    <div className="row">
      <strong>{k}:</strong> <span>{v}</span>
    </div>
  );
}

/* ---------- CSS ---------- */
const css = `
:root{
  --bg:#0B1220; --ink:#fff; --muted:#EAF2FF; --bd:#1f2a44;
  --indigo:#5850EC; --violet:#7C3AED; --teal:#22D3EE; --amber:#F59E0B;
  --panel:#0E1424; --panel2:#0F172A; --soft:#0c1222;
}
.enroll{ color:var(--ink); background:var(--bg); }
.container{ max-width:1200px; margin:0 auto; padding:0 20px; }

/* HERO */
.hero{
  padding:44px 0 24px; border-bottom:1px solid var(--bd);
  background:
    radial-gradient(900px 320px at 12% -10%, rgba(88,80,236,.18), transparent 60%),
    radial-gradient(900px 320px at 88% -10%, rgba(34,211,238,.12), transparent 60%);
}
.hero__inner{ display:grid; gap:28px; grid-template-columns: 1.05fr .95fr; align-items:start; }
@media (max-width:1000px){ .hero__inner{ grid-template-columns:1fr; } }
.pill{ display:inline-block; padding:.34rem .7rem; border-radius:999px; border:1px solid #334155; background:#101a2f; font-weight:900; }
h1{ margin:.6rem 0 .4rem; font-size:clamp(2rem, 3.6vw + .6rem, 3rem); }
.subtle{ color:var(--muted); opacity:.96; }
.cta{ display:flex; gap:12px; flex-wrap:wrap; margin:16px 0 10px; }
.btn{
  display:inline-flex; align-items:center; justify-content:center;
  padding:.8rem 1.1rem; border-radius:14px; border:1px solid #2f3341; font-weight:900; text-decoration:none;
  transition:.18s ease; box-shadow:0 12px 26px rgba(2,6,23,.22);
}
.btn:hover{ transform:translateY(-1px); }
.btn-primary{ background:linear-gradient(180deg,#FCD34D,#F59E0B); color:#0B1220; border-color:#D97706; }
.btn-outline{ background:transparent; color:#eaf2ff; border-color:#334155; }
.btn-ghost{ background:transparent; color:#eaf2ff; border-color:#2f3341; }
.btn-amber{ background:linear-gradient(180deg,#FFD34D,#F59E0B); color:#0B1220; border-color:#D97706; }
.btn-danger{ background:linear-gradient(180deg,#ff9aa2,#ff6b6b); color:#081018; border-color:#ef4444; }
.btn-mini{ padding:.58rem .9rem; border-radius:10px; background:var(--teal); color:#06202b; border-color:transparent; font-weight:900; }
.w-full{ width:100%; }

.chips{ display:flex; gap:10px; flex-wrap:wrap; margin:6px 0 4px; }
.chip{ border:1px solid #334155; border-radius:999px; padding:.36rem .75rem; font-weight:900; background:#0f172a; color:#CFE0FF; }
.badges{ display:flex; gap:8px; flex-wrap:wrap; margin-top:8px; }
.badge{ font-size:.82rem; padding:.24rem .65rem; border-radius:999px; border:1px solid #334155; background:#0f172a; }

.hero__card{ display:flex; justify-content:flex-end; }
.mini-card{ border:1px solid var(--bd); border-radius:18px; padding:16px; max-width:380px; }
.mini-card__head{ display:flex; align-items:center; justify-content:space-between; margin-bottom:6px; }
.mini-kicker{ font-size:.82rem; color:#A5B4FC; font-weight:900; letter-spacing:.2px; }
.mini-bullet{ font-size:.78rem; color:#cfe0ff; background:#0f172a; border:1px solid #22304d; border-radius:999px; padding:.12rem .5rem; }
.mini-text{ margin:0 0 10px; color:#eaf2ff; }

/* PANELS (variación de color) */
.panel{ background:linear-gradient(180deg,var(--panel2),var(--panel)); border:1px solid var(--bd); box-shadow:0 18px 36px rgba(2,6,23,.28); }
.panel--indigo{ outline:1px solid rgba(88,80,236,.32); }
.panel--violet{ outline:1px solid rgba(124,58,237,.32); }
.panel--teal{ outline:1px solid rgba(34,211,238,.32); }
.panel--amber{ outline:1px solid rgba(245,158,11,.35); }

.panel--indigoSoft{ outline:1px solid rgba(88,80,236,.22); }
.panel--violetSoft{ outline:1px solid rgba(124,58,237,.22); }
.panel--tealSoft{ outline:1px solid rgba(34,211,238,.22); }
.panel--amberSoft{ outline:1px solid rgba(245,158,11,.22); }

/* GRIDS */
.grid{ display:grid; gap:24px; padding:28px 0; grid-template-columns: 1.25fr .75fr; }
@media (max-width:1000px){ .grid{ grid-template-columns:1fr; } }
.stack-24{ display:grid; gap:24px; }
.stack-32{ display:grid; gap:32px; }

.card{ border-radius:18px; padding:20px; }

.card__head{ display:flex; align-items:end; justify-content:space-between; gap:12px; margin-bottom:12px; }
.h6{ margin:0; font-size:1.05rem; font-weight:1000; }
.tiny{ font-size:.95rem; }
.center{ text-align:center; }

/* Iframe grande y con aire */
.iframe-wrap{
  position:relative; width:100%;
  height:min(1500px, 78vh);
  border-radius:16px; overflow:hidden; background:#0f172a; border:1px solid var(--bd);
}
@media (max-width:640px){ .iframe-wrap{ height: 76vh; } }
.iframe-wrap iframe{ position:absolute; inset:0; width:100%; height:100%; border:0; }

/* Lateral */
.bank.blk{ display:grid; gap:8px; margin:10px 0 14px; }
.row{ display:flex; gap:8px; flex-wrap:wrap; }
.row strong{ color:#fff; }
.row span{ color:#eaf2ff; }
.note{ margin:10px 0 14px; padding:.8rem 1rem; border-radius:12px; background:#0f172a; border:1px dashed #2b3b61; color:#eaf2ff; }

/* Features */
.features{ display:grid; grid-template-columns: repeat(3,minmax(0,1fr)); gap:22px; }
@media (max-width:980px){ .features{ grid-template-columns:1fr; } }
.f-title{ margin:0 0 6px; font-size:1.15rem; font-weight:1000; }
.dash{ margin:0; padding-left:18px; color:#dbeafe; }
.tip{ margin-top:10px; color:#86EFAC; font-weight:900; }

/* Steps box */
.stepsBox{ margin:8px 0 0; padding:10px 14px 10px 22px; border:1px dashed #30406a; border-radius:14px; color:#eaf2ff; }
.stepsBox li{ margin:.3rem 0; }
.strong{ font-weight:900; }

/* FAQ */
.faq{ display:grid; grid-template-columns:1fr 1fr; gap:18px; }
@media (max-width:980px){ .faq{ grid-template-columns:1fr; } }
details summary{ cursor:pointer; font-weight:1000; list-style:none; }
details[open]{ background:linear-gradient(180deg,#0F172A,#0B1220); }
details > p{ margin:.6rem 0 0; color:#EAF2FF; }

/* CTA inferior */
.cta-row{ display:flex; gap:12px; flex-wrap:wrap; justify-content:center; }

/* Utilidades de aire adicional entre bloques */
.grid--2{ display:grid; grid-template-columns:1fr 1fr; gap:22px; }
@media (max-width:980px){ .grid--2{ grid-template-columns:1fr; } }
`;