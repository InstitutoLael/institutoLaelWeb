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
            <p className="lead">
              Te contactamos en <b>24–48 h hábiles</b> para orientar tu matrícula. Todo online y
              con clases grabadas.
            </p>

            <div className="hero__cta">
              <a
                className="btn btn-primary"
                href={FORM_URL.replace("?embedded=true", "")}
                target="_blank"
                rel="noreferrer"
              >
                Inscribirme ahora
              </a>
              <a
                className="btn btn-ghost"
                href={`https://wa.me/${WAPP_INTL}?text=${encodeURIComponent(
                  "Hola 👋, quiero inscribirme en Instituto Lael y tengo una consulta."
                )}`}
                target="_blank"
                rel="noreferrer"
              >
                Hablar por WhatsApp
              </a>
              <Link className="btn btn-outline" to="/pagos">
                Ver formas de pago
              </Link>
            </div>

            <div className="chips">
              <span className="chip on">PAES</span>
              <span className="chip">Idiomas</span>
              <span className="chip">LSCh</span>
            </div>

            <div className="badges">
              <span className="badge">Matrícula única</span>
              <span className="badge">Precios claros</span>
              <span className="badge">Acompañamiento real</span>
            </div>
          </div>

          <aside className="mini-card">
            <div className="mini-head">
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
          </aside>
        </div>
      </header>

      {/* LAYOUT PRINCIPAL: formulario ancho + sidebar sticky */}
      <div className="container layout">
        {/* FORM */}
        <article className="card form-card" id="form">
          <h2 className="h6">Formulario de inscripción</h2>
          <p className="subtle tiny">
            Si no ves el formulario, usa <b>“Inscribirme ahora”</b> para abrirlo en una pestaña nueva.
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

        {/* SIDEBAR */}
        <aside className="side">
          <div className="card sticky">
            <h3 className="h6">Beneficios en Lael</h3>
            <ul className="checklist tiny">
              <li>🕒 Horarios flexibles · 100% online.</li>
              <li>📚 Material y LMS listo para partir.</li>
              <li>🎥 Clases en vivo + cápsulas (estructura clara).</li>
              <li>📈 Feedback real y opciones de liderazgo.</li>
              <li>💬 Comunidad: equipo y respeto.</li>
            </ul>

            <a
              className="btn btn-primary w-full mt8"
              href={`https://wa.me/${WAPP_INTL}?text=${encodeURIComponent(
                "Hola 👋, necesito ayuda para elegir plan/ramos."
              )}`}
              target="_blank"
              rel="noreferrer"
            >
              Quiero orientación
            </a>

            <hr />

            <h4 className="h6">Transferencia</h4>
            <div className="bank blk">
              <Row k="Nombre" v="Instituto Lael SpA" />
              <Row k="RUT" v="78.084.019-6" />
              <Row k="Banco / Tipo" v="Mercado Pago · Cuenta Vista" />
              <Row k="N° de cuenta" v="1088183168" />
              <Row k="Comprobantes" v="pagos@institutolael.cl" />
              <Row k="Glosa" v="Nombre del estudiante + Programa" />
            </div>

            <div className="note tiny">
              💡 Si combinas ramos o cambias de plan, te ayudamos a recalcular tu pago.
            </div>

            <a
              className="btn btn-ghost w-full"
              href={`https://wa.me/${WAPP_INTL}?text=${encodeURIComponent(
                "Hola 👋, ya pagué / quiero confirmar mi pago para activar la matrícula."
              )}`}
              target="_blank"
              rel="noreferrer"
            >
              Confirmar por WhatsApp
            </a>
          </div>
        </aside>
      </div>

      {/* BLOQUES DE VALOR */}
      <section className="container value">
        <div className="vgrid">
          <Value t="Matrícula única y precios claros">
            Sin letra chica. Te mostramos el total antes de pagar.
          </Value>
          <Value t="Clases en vivo + cápsulas">
            Todo queda grabado para repasar cuando quieras.
          </Value>
          <Value t="Acompañamiento real">
            Tutorías, seguimiento y apoyo para sostener el ritmo.
          </Value>
        </div>
      </section>

      {/* REQUISITOS + PROCESO */}
      <section className="container process">
        <div className="req card">
          <ul>
            <li>Clases en vivo, cápsulas y acompañamiento a estudiantes.</li>
            <li>Ramos: M1, M2, Lenguaje, Historia, Ciencias.</li>
            <li>Ensayos y retroalimentación.</li>
            <li>Disponibilidad para modalidad 100% online.</li>
          </ul>
          <p className="green tiny">💬 Pago vía boleta de honorarios. Modalidad 100% online.</p>
        </div>

        <div className="steps card">
          <h3 className="h6">¿Cómo es el proceso?</h3>
          <ol>
            <li><b>Completa</b> el formulario (2–3 min).</li>
            <li><b>Te escribimos</b> (24–48 h) para confirmar plan/horario.</li>
            <li><b>Pago y boleta</b>. Activamos tu acceso.</li>
            <li><b>Bienvenida</b>: cuentas, calendario y materiales.</li>
          </ol>
          <p className="tip subtle tiny">
            Consejo: comparte logros concretos (aprobación, materiales creados, feedback).
          </p>
        </div>
      </section>

      {/* FAQ + CTA FINAL */}
      <section className="container faq">
        <h3 className="h6">Preguntas frecuentes</h3>
        <div className="faq-grid">
          <Faq q="¿Cuándo empiezan las clases?">
            Tras validar tu inscripción y pago, coordinamos tu inicio en 24–72 h hábiles.
          </Faq>
          <Faq q="¿Queda todo grabado?">
            Sí. Todas las clases quedarán disponibles en tu LMS para repasar.
          </Faq>
          <Faq q="¿Hay becas o convenios?">
            Sí. Tenemos becas limitadas y convenios con redes. Escríbenos para orientarte.
          </Faq>
          <Faq q="¿Puedo cambiar de plan/ramos?">
            Sí. Ajustamos tu plan y recalculamos el pago si corresponde.
          </Faq>
        </div>

        <div className="cta-final">
          <a
            className="btn btn-primary"
            href={FORM_URL.replace("?embedded=true", "")}
            target="_blank"
            rel="noreferrer"
          >
            Inscribirme ahora
          </a>
          <a
            className="btn btn-ghost"
            href={`https://wa.me/${WAPP_INTL}?text=${encodeURIComponent(
              "Hola 👋, quiero resolver dudas antes de inscribirme."
            )}`}
            target="_blank"
            rel="noreferrer"
          >
            Quiero orientación
          </a>
        </div>
      </section>
    </section>
  );
}

/* ---------- Subcomponentes ---------- */
function Row({ k, v }) {
  return (
    <div className="row">
      <strong>{k}:</strong> <span>{v}</span>
    </div>
  );
}
function Value({ t, children }) {
  return (
    <article className="vcard card">
      <h4>{t}</h4>
      <p className="subtle">{children}</p>
    </article>
  );
}
function Faq({ q, children }) {
  return (
    <details className="faq-item">
      <summary>{q}</summary>
      <div className="faq-a">{children}</div>
    </details>
  );
}

/* ---------- CSS ---------- */
const css = `
:root{
  --bg:#0b1220; --panel:#0f172a; --bd:#22304d;
  --ink:#fff; --muted:#eaf2ff; --accent:#F59E0B; --accent2:#5850EC; --green:#86EFAC;
}
.enroll{ color:var(--ink); background:var(--bg); }
.container{ max-width:1120px; margin:0 auto; padding:0 18px; }

/* HERO */
.hero{
  border-bottom:1px solid var(--bd);
  background:
    radial-gradient(900px 320px at 10% -10%, rgba(88,80,236,.16), transparent 60%),
    radial-gradient(880px 300px at 92% -12%, rgba(245,158,11,.12), transparent 60%);
}
.hero__inner{
  display:grid; grid-template-columns: 1.3fr .7fr; gap:22px; align-items:center;
  padding:34px 0 22px;
}
@media (max-width:980px){ .hero__inner{ grid-template-columns:1fr; } }
.pill{ display:inline-block; padding:.28rem .62rem; border-radius:999px; border:1px solid #334155; background:#101a2f; font-weight:900; }
h1{ font-size:clamp(2rem, 3.6vw + .5rem, 3rem); margin:.5rem 0 .35rem; }
.lead{ color:var(--muted); max-width:60ch; }
.hero__cta{ display:flex; gap:10px; flex-wrap:wrap; margin:14px 0 10px; }

.btn{
  display:inline-flex; align-items:center; justify-content:center; gap:8px;
  padding:.72rem 1.05rem; border-radius:12px; font-weight:900; border:1px solid #2f3341;
}
.btn-primary{ background:linear-gradient(180deg,#FCD34D,#F59E0B); color:#0b1220; border-color:#D97706; }
.btn-ghost{ background:transparent; color:#fff; }
.btn-outline{ background:transparent; color:#eaf2ff; border-color:#334155; }
.btn-mini{ padding:.56rem .84rem; border-radius:10px; background:#22d3ee; color:#06202b; border:0; font-weight:900; }
.w-full{ width:100%; }
.mt8{ margin-top:8px; }

.chips, .badges{ display:flex; gap:8px; flex-wrap:wrap; margin-top:8px; }
.chip{ padding:.22rem .6rem; border-radius:999px; border:1px solid #344a73; background:#0f172a; font-weight:900; }
.chip.on{ outline:2px solid rgba(88,80,236,.4); }
.badge{ font-size:.78rem; padding:.22rem .6rem; border-radius:999px; border:1px solid #334155; background:#0f172a; }

/* Mini card */
.mini-card{ border:1px solid var(--bd); border-radius:14px; padding:16px; background:linear-gradient(180deg,#0f172a,#0b1220); box-shadow:0 16px 30px rgba(2,6,23,.28); }
.mini-head{ display:flex; justify-content:space-between; align-items:center; margin-bottom:6px; }
.mini-kicker{ color:#a5b4fc; font-weight:900; }
.mini-bullet{ font-size:.78rem; color:#cfe0ff; background:#0f172a; border:1px solid #22304d; border-radius:999px; padding:.12rem .5rem; }
.mini-text{ color:#eaf2ff; margin:0 0 10px; }

/* LAYOUT principal */
.layout{
  display:grid; grid-template-columns: 1.6fr .8fr; gap:18px; padding:18px 0 10px;
}
@media (max-width:1024px){ .layout{ grid-template-columns:1fr; } }

/* Cards base */
.card{ border:1px solid var(--bd); border-radius:18px; background:linear-gradient(180deg,#0f172a,#0b1220); box-shadow:0 18px 36px rgba(2,6,23,.26); }
.form-card{ padding:16px; }
.h6{ margin:0 0 6px; font-weight:900; }
.subtle{ color:var(--muted); }
.tiny{ font-size:.94rem; }

/* Iframe grande */
.iframe-wrap{ position:relative; width:100%; height:min(1600px, 78vh); border:1px solid var(--bd); border-radius:14px; overflow:hidden; background:#0f172a; }
@media (max-width:640px){ .iframe-wrap{ height:75vh; } }
.iframe-wrap iframe{ position:absolute; inset:0; width:100%; height:100%; border:0; background:#0f172a; }

/* Sidebar sticky */
.side .sticky{ position:sticky; top:80px; padding:16px; }
.checklist{ list-style:none; margin:8px 0 0; padding:0; }
.checklist li{ margin:4px 0; }
.bank.blk{ display:grid; gap:6px; margin:10px 0 12px; }
.row{ display:flex; gap:6px; flex-wrap:wrap; }
.row strong{ color:#fff; }
.note{ border:1px dashed #2b3b61; border-radius:10px; padding:.6rem .8rem; background:#0f172a; color:#eaf2ff; margin:10px 0; }

/* Bloques de valor */
.value{ padding:8px 0 2px; }
.vgrid{ display:grid; grid-template-columns:repeat(3, minmax(0,1fr)); gap:14px; }
@media (max-width:900px){ .vgrid{ grid-template-columns:1fr; } }
.vcard{ padding:16px; }
.vcard h4{ margin:0 0 6px; color:#FDE047; }

/* Requisitos + proceso */
.process{ display:grid; grid-template-columns:1.3fr .7fr; gap:14px; padding:8px 0 10px; }
@media (max-width:900px){ .process{ grid-template-columns:1fr; } }
.req{ padding:14px; }
.req ul{ margin:0 0 10px; padding-left:18px; }
.green{ color:var(--green); font-weight:900; }
.steps{ padding:14px; }
.steps ol{ margin:0; padding:0 0 0 22px; }
.tip{ margin-top:8px; }

/* FAQ */
.faq{ padding:10px 0 22px; }
.faq-grid{ display:grid; grid-template-columns:1fr 1fr; gap:12px; }
@media (max-width:900px){ .faq-grid{ grid-template-columns:1fr; } }
.faq-item{ border:1px solid var(--bd); border-radius:12px; background:#0f172a; padding:.6rem .8rem; }
.faq-item summary{ cursor:pointer; font-weight:900; outline:none; }
.faq-a{ color:#eaf2ff; margin-top:6px; }
.cta-final{ display:flex; gap:10px; flex-wrap:wrap; margin-top:12px; }

/* Accesibilidad */
.btn:focus-visible, summary:focus-visible, a:focus-visible, button:focus-visible, iframe:focus-visible{
  outline:2px solid #22d3ee; outline-offset:2px;
}
`;