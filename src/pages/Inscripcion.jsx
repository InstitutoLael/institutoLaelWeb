// src/pages/Inscripcion.jsx
import { Link } from "react-router-dom";

const WAPP_INTL = "56964626568";
const FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSfDVse7cbhnAOhA2OklnmBvaeKZY4ZDWOmrYFqSfAvV8joVOA/viewform?embedded=true";

export default function Inscripcion() {
  return (
    <section className="enroll v2">
      <style>{css}</style>

      {/* HERO */}
      <header className="hero">
        <div className="container hero__inner">
          <div className="hero__copy">
            <span className="pill">Inscripción 2026</span>
            <h1>Reserva tu cupo 2026</h1>
            <p className="lead">
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
                  "Hola 👋, quiero inscribirme y tengo una consulta sobre plan/horarios."
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
              <span className="chip ghost">Matrícula única</span>
              <span className="chip ghost">Precios claros</span>
              <span className="chip ghost">Acompañamiento real</span>
            </div>
          </div>

          <aside className="support">
            <div className="support__card">
              <div className="support__head">
                <span className="mini-kicker">Soporte</span>
                <span className="mini-bullet">⏱ 24–48 h</span>
              </div>
              <p>¿Dudas sobre plan, ramos u horarios? Escríbenos y te orientamos rápido.</p>
              <a
                className="btn btn-mini"
                href={`https://wa.me/${WAPP_INTL}?text=${encodeURIComponent(
                  "Hola 👋, necesito orientación para elegir plan/horarios."
                )}`}
                target="_blank"
                rel="noreferrer"
              >
                Quiero orientación
              </a>
            </div>
          </aside>
        </div>
      </header>

      {/* GRID PRINCIPAL */}
      <div className="container grid-main">
        {/* FORMULARIO (70%) */}
        <article className="card form-card">
          <div className="card__head">
            <h2 className="h5">Formulario de inscripción</h2>
            <p className="tiny subtle">
              Si no ves el formulario o prefieres pantalla completa, usa{" "}
              <a
                className="link"
                href={FORM_URL.replace("?embedded=true", "")}
                target="_blank"
                rel="noreferrer"
              >
                “Inscribirme ahora”
              </a>{" "}
              para abrirlo en una pestaña nueva.
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

        {/* SIDEBAR (30%) */}
        <aside className="card side">
          <h3 className="h5">Transferencia</h3>
          <div className="bank blk">
            <Row k="Nombre" v="Instituto Lael SpA" />
            <Row k="RUT" v="78.084.019-6" />
            <Row k="Banco / Tipo" v="Mercado Pago · Cuenta Vista" />
            <Row k="N° de cuenta" v="1088183168" />
            <Row k="Comprobantes" v="pagos@institutolael.cl" />
            <Row k="Glosa" v="Nombre del estudiante + Programa" />
          </div>

          <div className="tip">
            💡 Si combinas ramos o cambias de plan, te ayudamos a recalcular tu pago.
          </div>

          <a
            className="btn btn-full"
            href={`https://wa.me/${WAPP_INTL}?text=${encodeURIComponent(
              "Hola 👋, ya pagué/quiero pagar mi matrícula. ¿Me ayudan a confirmar?"
            )}`}
            target="_blank"
            rel="noreferrer"
          >
            Confirmar por WhatsApp
          </a>
        </aside>
      </div>

      {/* BENEFICIOS + PROCESO */}
      <div className="container grid-info">
        <section className="card">
          <h3 className="h5">Qué incluye</h3>
          <ul className="bullets">
            <li>Clases en vivo, cápsulas y acompañamiento a estudiantes.</li>
            <li>Ramos: M1, M2, Lenguaje, Historia, Ciencias.</li>
            <li>Ensayos y retroalimentación.</li>
            <li>Disponibilidad para modalidad 100% online.</li>
          </ul>
          <p className="note ok">💬 Pago vía boleta de honorarios. Modalidad 100% online.</p>
        </section>

        <section className="card">
          <h3 className="h5">¿Cómo es el proceso?</h3>
          <ol className="steps-box">
            <li><b>Completa</b> el formulario (2–3 min).</li>
            <li><b>Te escribimos</b> (24–48 h) para confirmar plan/horario.</li>
            <li><b>Pago y boleta.</b> Activamos tu acceso.</li>
            <li><b>Bienvenida:</b> cuentas, calendario y materiales.</li>
          </ol>
          <p className="note">
            Consejo: comparte logros concretos (aprobación, materiales creados, feedback).
          </p>
        </section>
      </div>

      {/* FAQ + CTA */}
      <div className="container faq-cta">
        <details className="faq">
          <summary>¿Cuándo empiezan las clases?</summary>
          <p>Tras validar tu inscripción y pago, coordinamos tu inicio en 24–72 h hábiles.</p>
        </details>
        <details className="faq">
          <summary>¿Queda todo grabado?</summary>
          <p>Sí. Todas las clases quedan disponibles en tu LMS para repasar.</p>
        </details>
        <details className="faq">
          <summary>¿Hay becas o convenios?</summary>
          <p>Tenemos becas limitadas y convenios con redes. Escríbenos para orientarte.</p>
        </details>
        <details className="faq">
          <summary>¿Puedo cambiar de plan/ramos?</summary>
          <p>Ajustamos tu plan y recalculamos el pago si corresponde.</p>
        </details>

        <div className="cta bottom">
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

/* -------- CSS (versión con más aire y jerarquía) -------- */
const css = `
:root{
  --bg:#0B1220; --panel:#0C1427; --soft:#0F192F; --bd:#22304D;
  --ink:#FBFDFF; --muted:#DDE9FF;
  --acc:#F4C44B; --acc2:#53D3F3; --pill:#0E1A33;
  --chip:#101C36; --chipGhost:#0C172E;
  --shadow: 0 18px 40px rgba(2,6,23,.35);
}
.enroll.v2{ color:var(--ink); background:var(--bg); }
.container{ max-width:1240px; margin:0 auto; padding:0 20px; }

/* HERO */
.hero{
  border-bottom:1px solid var(--bd);
  background:
    radial-gradient(880px 320px at 12% -10%, rgba(83,211,243,.10), transparent 60%),
    radial-gradient(820px 300px at 90% -12%, rgba(244,196,75,.12), transparent 60%);
}
.hero__inner{
  display:grid; grid-template-columns: 1.6fr .9fr; gap:28px; align-items:start;
  padding:38px 0 18px;
}
@media (max-width:1024px){ .hero__inner{ grid-template-columns:1fr; } }
.pill{
  display:inline-block; padding:.34rem .7rem; border-radius:999px;
  border:1px solid #334155; background:var(--pill); font-weight:900; font-size:.88rem;
}
h1{ margin:.5rem 0 .45rem; font-size:clamp(2rem, 3.8vw + .4rem, 2.9rem); letter-spacing:.3px; }
.lead{ color:var(--muted); opacity:.96; max-width:70ch; }
.cta{ display:flex; gap:12px; flex-wrap:wrap; margin:14px 0 8px; }
.btn{
  display:inline-flex; align-items:center; justify-content:center; gap:8px;
  padding:.78rem 1.1rem; border-radius:12px; border:1px solid #2f3b60; text-decoration:none; font-weight:900;
  transition:.16s transform ease, .16s box-shadow ease;
}
.btn:hover{ transform: translateY(-1px); box-shadow: var(--shadow); }
.btn-primary{ color:#0B1220; background:linear-gradient(180deg,#FAD96E,#F4C44B); border-color:#D9AA2A; }
.btn-outline{ color:#EAF2FF; background:transparent; }
.btn-ghost{ color:#EAF2FF; background:transparent; border-color:#2f3b60; }
.btn-mini{ padding:.58rem .9rem; border-radius:10px; background:var(--acc2); color:#06202b; border-color:transparent; font-weight:900; }

.chips{ display:flex; gap:10px; flex-wrap:wrap; margin-top:10px; }
.chip{ padding:.36rem .8rem; border-radius:999px; border:1px solid #334155; background:var(--chip); font-weight:800; }
.chip.ghost{ background:var(--chipGhost); opacity:.9; }

/* Soporte */
.support{ display:flex; justify-content:flex-end; }
.support__card{
  border:1px solid var(--bd); border-radius:16px; padding:16px; background:var(--panel);
  max-width:380px; box-shadow: var(--shadow);
}
.support__head{ display:flex; align-items:center; justify-content:space-between; margin-bottom:6px; }
.mini-kicker{ font-size:.82rem; color:#a5b4fc; font-weight:900; letter-spacing:.2px; }
.mini-bullet{ font-size:.8rem; color:#d1e4ff; background:#0f172a; border:1px solid #22304d; border-radius:999px; padding:.12rem .5rem; }

/* GRID principal */
.grid-main{
  display:grid; grid-template-columns: 1.7fr 1fr; column-gap:28px; row-gap:24px;
  padding:22px 0 28px;
}
@media (max-width:1060px){ .grid-main{ grid-template-columns:1fr; } }
.card{
  border:1px solid var(--bd); border-radius:18px;
  background:linear-gradient(180deg,#0F182C,#0B1220); box-shadow: var(--shadow);
  padding:18px;
}
.form-card{ padding:20px; }
.card__head{ display:flex; align-items:end; justify-content:space-between; gap:12px; margin-bottom:10px; }
.h5{ margin:0; font-size:1.15rem; font-weight:900; color:#fff; }
.tiny{ font-size:.95rem; }
.link{ color:#9AD9FF; text-decoration:underline; }

/* Iframe protagonista */
.iframe-wrap{
  position:relative; width:100%;
  height: min(1400px, 82vh);
  border:1px solid var(--bd); border-radius:14px; overflow:hidden; background:#0f172a;
}
@media (max-width:640px){ .iframe-wrap{ height:76vh; } }
.iframe-wrap iframe{ position:absolute; inset:0; width:100%; height:100%; border:0; }

/* Sidebar */
.blk{ display:grid; gap:8px; margin:10px 0 14px; }
.row{ display:flex; gap:8px; flex-wrap:wrap; }
.row strong{ color:#fff; }
.row span{ color:#dbeafe; }
.tip{
  margin:8px 0 12px; padding:.7rem .9rem; border-radius:12px;
  background:#0f172a; border:1px dashed #2b3b61; color:#eaf2ff;
}
.btn-full{ width:100%; justify-content:center; }

/* Sección info */
.grid-info{
  display:grid; grid-template-columns: 1fr 1fr; gap:24px; padding-bottom:10px;
}
@media (max-width:900px){ .grid-info{ grid-template-columns:1fr; } }
.bullets{ margin:4px 0 0 0; padding-left:18px; color:#eaf2ff; }
.bullets li{ margin:.4rem 0; }
.note{ margin-top:10px; color:#cfe0ff; }
.note.ok{ color:#86EFAC; font-weight:900; }

/* FAQ + CTA */
.faq-cta{ padding:18px 0 34px; }
.faq{
  border:1px solid var(--bd); border-radius:14px; background:#0f172a; margin:12px 0;
  padding:.6rem .9rem;
}
.faq summary{ cursor:pointer; font-weight:900; list-style:none; }
.faq[open] summary{ color:#F4C44B; }
.faq p{ margin:.5rem 0 0; color:#dbeafe; }
.cta.bottom{ display:flex; gap:12px; flex-wrap:wrap; margin-top:14px; }

/* helpers */
.subtle{ color:var(--muted); }
`;