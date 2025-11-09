// src/pages/Inscripcion.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import SEOHead from "../components/SEOHead.jsx";

const WAPP_INTL = "56964626568";
const FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSfDVse7cbhnAOhA2OklnmBvaeKZY4ZDWOmrYFqSfAvV8joVOA/viewform?embedded=true";

/* ===== UI Helpers ===== */
function Row({ k, v }) {
  return (
    <div className="row">
      <strong>{k}:</strong> <span>{v}</span>
    </div>
  );
}

function Toast({ kind = "ok", msg }) {
  if (!msg) return null;
  return (
    <div className={`toast ${kind === "error" ? "toast--error" : "toast--ok"}`}>
      {msg}
    </div>
  );
}

/* ===== QuickContact (mini-form + WA/Email) ===== */
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
      notify("error", "Completa Nombre, Email y Programa para escribir por WhatsApp.");
      return;
    }
    const mensaje = `¡Hola! Me interesa inscribirme en Instituto Lael.

📋 *Mis datos:*
• Nombre: ${nombre}
• Email: ${email}
• Programa de interés: ${programa}

¿Podrían enviarme info sobre metodología, proceso de admisión, costos y fechas?
¡Gracias!`;
    const url = `https://wa.me/${WAPP_INTL}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    notify("ok", "Abriendo WhatsApp…");
  };

  const openMail = () => {
    const { nombre, email, programa } = fields;
    if (!need(nombre) || !need(email) || !need(programa)) {
      notify("error", "Completa Nombre, Email y Programa para enviar correo.");
      return;
    }
    const subject = `Consulta de admisión — ${programa} — ${nombre}`;
    const body = `Hola equipo de Instituto Lael,

Quisiera información para inscribirme.

Nombre: ${nombre}
Email: ${email}
Programa: ${programa}

Me gustaría saber metodología, costos, fechas y requisitos.

Gracias,
${nombre}`;

    window.open(
      `mailto:contacto@institutolael.cl?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    );
    notify("ok", "Abriendo cliente de correo…");
  };

  return (
    <>
      <Toast kind={toast.kind} msg={toast.msg} />

      <article className="card form-card" style={{ marginTop: 18 }}>
        <div className="card__head">
          <h2 className="h5">Consulta rápida</h2>
          <p className="tiny subtle">Déjanos tus datos y programa. Respondemos en 24–48 h hábiles.</p>
        </div>

        <div className="qc-grid">
          <div className="qc-field">
            <label className="qc-lb">Nombre completo</label>
            <input
              className="qc-in"
              value={fields.nombre}
              onChange={set("nombre")}
              placeholder="Tu nombre"
              autoComplete="name"
            />
          </div>
          <div className="qc-field">
            <label className="qc-lb">Email</label>
            <input
              className="qc-in"
              type="email"
              value={fields.email}
              onChange={set("email")}
              placeholder="correo@ejemplo.com"
              autoComplete="email"
            />
          </div>
          <div className="qc-field">
            <label className="qc-lb">Programa</label>
            <select className="qc-in" value={fields.programa} onChange={set("programa")}>
              <option value="">Selecciona…</option>
              <option>Preparación PAES Online</option>
              <option>Idiomas Online</option>
              <option>Lengua de Señas Chilena (LSCh)</option>
              <option>Matemáticas Avanzadas</option>
              <option>Ciencias</option>
            </select>
          </div>
        </div>

        <div className="cta" style={{ marginTop: 10 }}>
          <button className="btn btn-primary" onClick={openWA}>WhatsApp</button>
          <button className="btn btn-outline" onClick={openMail}>Enviar correo</button>
        </div>
      </article>
    </>
  );
}

/* ===== Página ===== */
export default function Inscripcion() {
  return (
    <section className="enroll v2">
      <SEOHead
        title="Inscripción 2026 | Instituto Lael — Preuniversitario · Idiomas · LSCh"
        description="Inscríbete en el Instituto Lael para 2026. Programas PAES, Idiomas e Inclusión (LSCh). Clases en vivo y grabadas, matrícula única y acompañamiento real."
        canonical="https://www.institutolael.cl/inscripcion"
        keywords={[
          "inscripción PAES 2026",
          "preuniversitario online",
          "instituto cristiano Lael",
          "curso inglés online Chile",
          "curso coreano online",
          "lengua de señas chilena online",
          "preuniversitario barato Chile",
          "matrícula única preuniversitario",
          "educación inclusiva online",
        ]}
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "EducationalOrganization",
            name: "Instituto Lael",
            url: "https://www.institutolael.cl",
            logo: "https://www.institutolael.cl/assets/img/lael/logo.png",
            description:
              "Instituto Lael ofrece programas PAES, cursos de idiomas y Lengua de Señas Chilena con enfoque inclusivo y cristiano.",
          },
          {
            "@context": "https://schema.org",
            "@type": "Course",
            name: "Preparación PAES e Idiomas 2026 — Instituto Lael",
            provider: { "@type": "EducationalOrganization", name: "Instituto Lael" },
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "¿Cuándo comienzan las clases?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Las clases comienzan una vez validada tu inscripción y pago, dentro de 24 a 72 horas hábiles.",
                },
              },
              {
                "@type": "Question",
                name: "¿Quedan grabadas las clases?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Sí, todas las clases quedan disponibles en el aula virtual (LMS) para repasar cuando quieras.",
                },
              },
            ],
          },
        ]}
      />

      <style>{css + extraCss}</style>

      {/* HERO */}
      <header className="hero">
        <div className="container hero__inner">
          <div className="hero__copy">
            <span className="pill">Inscripción 2026</span>
            <h1>Reserva tu cupo para el 2026</h1>
            <p className="lead">
              Completa tu inscripción y asegura tu lugar en{" "}
              <b>PAES, Idiomas o Lengua de Señas Chilena.</b> Te contactaremos dentro de{" "}
              <b>24–48 h hábiles</b> para confirmar tu matrícula.
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
                  "Hola 👋, quiero inscribirme y tengo una consulta sobre planes y horarios."
                )}`}
                target="_blank"
                rel="noreferrer"
              >
                Hablar por WhatsApp
              </a>
            </div>

            <div className="chips">
              <span className="chip">PAES</span>
              <span className="chip">Idiomas</span>
              <span className="chip">LSCh</span>
              <span className="chip ghost">Matrícula única</span>
              <span className="chip ghost">Clases en vivo + grabadas</span>
              <span className="chip ghost">Acompañamiento real</span>
            </div>
          </div>
        </div>
      </header>

      {/* Consulta rápida */}
      <div className="container form-first">
        <QuickContact />
      </div>

      {/* FORMULARIO PRINCIPAL */}
      <div className="container form-first">
        <article className="card form-card">
          <div className="card__head">
            <h2 className="h5">Formulario de inscripción</h2>
            <p className="tiny subtle">
              Si no ves el formulario,{" "}
              <a
                className="link"
                href={FORM_URL.replace("?embedded=true", "")}
                target="_blank"
                rel="noreferrer"
              >
                haz clic aquí
              </a>{" "}
              para abrirlo en una pestaña nueva.
            </p>
          </div>
          <div className="iframe-wrap">
            <iframe
              title="Formulario de inscripción Instituto Lael 2026"
              src={FORM_URL}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </article>

        <aside className="support">
          <div className="support__card">
            <div className="support__head">
              <span className="mini-kicker">Soporte</span>
              <span className="mini-bullet">⏱ 24–48 h</span>
            </div>
            <p>¿Dudas sobre planes, ramos o pagos? Escríbenos y te orientamos rápido.</p>
            <a
              className="btn btn-mini"
              href={`https://wa.me/${WAPP_INTL}?text=${encodeURIComponent(
                "Hola 👋, necesito orientación para inscribirme o elegir mi plan."
              )}`}
              target="_blank"
              rel="noreferrer"
            >
              Quiero orientación
            </a>
          </div>
        </aside>
      </div>

      {/* INFO GENERAL */}
      <div className="container grid-info">
        <section className="card">
          <h3 className="h5">Qué incluye</h3>
          <ul className="bullets">
            <li>Clases en vivo, cápsulas y acompañamiento docente.</li>
            <li>Ramos: M1, M2, Lenguaje, Historia, Ciencias.</li>
            <li>Ensayos, diagnósticos y retroalimentación.</li>
            <li>Modalidad 100% online y flexible.</li>
          </ul>
          <p className="note ok">💬 Pago vía boleta de honorarios. Clases grabadas incluidas.</p>
        </section>

        <section className="card">
          <h3 className="h5">Proceso de matrícula</h3>
          <ol className="steps-box">
            <li><b>1.</b> Completa el formulario (2–3 min).</li>
            <li><b>2.</b> Te contactamos (24–48 h) para confirmar plan y horario.</li>
            <li><b>3.</b> Realiza el pago y recibe tu boleta.</li>
            <li><b>4.</b> Bienvenida: acceso, calendario y materiales.</li>
          </ol>
        </section>
      </div>

      {/* DATOS DE PAGO */}
      <div className="container">
        <aside className="card side">
          <h3 className="h5">Transferencia o depósito</h3>
          <div className="bank blk">
            <Row k="Nombre" v="Instituto Lael SpA" />
            <Row k="RUT" v="78.084.019-6" />
            <Row k="Banco / Tipo" v="Mercado Pago · Cuenta Vista" />
            <Row k="N° de cuenta" v="1088183168" />
            <Row k="Correo comprobantes" v="pagos@institutolael.cl" />
            <Row k="Glosa" v="Nombre del estudiante + Programa" />
          </div>
          <div className="tip">
            💡 Si combinas ramos o cambias de plan, recalculamos tu pago sin costo adicional.
          </div>
        </aside>
      </div>

      {/* FAQ */}
      <div className="container faq-cta">
        <details className="faq">
          <summary>¿Cuándo comienzan las clases?</summary>
          <p>Luego de validar tu inscripción y pago, inicias en 24–72 horas hábiles.</p>
        </details>
        <details className="faq">
          <summary>¿Las clases quedan grabadas?</summary>
          <p>Sí, podrás verlas en tu plataforma las veces que quieras.</p>
        </details>
        <details className="faq">
          <summary>¿Hay becas o convenios?</summary>
          <p>Contamos con becas limitadas y convenios educativos. Escríbenos para revisar tu caso.</p>
        </details>
        <details className="faq">
          <summary>¿Puedo cambiar de plan o ramos?</summary>
          <p>Sí, puedes ajustar tu plan en cualquier momento con acompañamiento administrativo.</p>
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

/* ===== CSS base tuyo + extras mínimos ===== */
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

/* Sidebar / datos */
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

const extraCss = `
/* Toast minimal */
.toast{
  position: fixed; right: 18px; top: 18px; z-index: 1050;
  padding: .7rem .95rem; border-radius: 12px; box-shadow: var(--shadow);
  font-weight: 900; letter-spacing:.2px; border:1px solid #2b3b61;
  animation: toastIn .24s ease-out;
}
.toast--ok{ background:#0c1f16; color:#86EFAC; }
.toast--error{ background:#2a1313; color:#FCA5A5; }
@keyframes toastIn{ from{ transform: translateY(-8px); opacity:0 } to{ transform: translateY(0); opacity:1 } }

/* Quick contact fields */
.qc-grid{ display:grid; grid-template-columns: 1.2fr 1.2fr 1fr; gap:12px; }
@media (max-width: 900px){ .qc-grid{ grid-template-columns:1fr; } }
.qc-field{ display:flex; flex-direction:column; gap:6px; }
.qc-lb{ font-size:.9rem; color:#cfe0ff; font-weight:900; }
.qc-in{
  background:#0f172a; color:#eaf2ff; border:1px solid var(--bd); border-radius:10px;
  padding:.7rem .8rem;
}
.qc-in:focus{ outline:none; border-color:#53D3F3; box-shadow: 0 0 0 3px rgba(83,211,243,.18); }
`;