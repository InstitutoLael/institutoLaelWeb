// src/pages/Inscripcion.jsx
import { useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";

const WAPP_INTL = "56964626568";
const FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSfDVse7cbhnAOhA2OklnmBvaeKZY4ZDWOmrYFqSfAvV8joVOA/viewform?embedded=true";

const PROGRAMAS = ["PAES", "Idiomas", "LSCh"];

export default function Inscripcion() {
  const [prog, setProg] = useState("PAES");
  const formRef = useRef(null);

  const helpMsg = useMemo(
    () =>
      `Hola 👋, quiero inscribirme en ${prog} (Inscripción 2026). ¿Me orientan con plan/horarios?`,
    [prog]
  );

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

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
              <button
                className="btn btn-primary"
                onClick={scrollToForm}
                data-event="click_inscribir_hero"
              >
                Inscribirme ahora
              </button>
              <a
                className="btn btn-outline"
                href={`https://wa.me/${WAPP_INTL}?text=${encodeURIComponent(helpMsg)}`}
                target="_blank"
                rel="noreferrer"
                data-event="click_whatsapp_hero"
              >
                Hablar por WhatsApp
              </a>
              <Link className="btn btn-ghost" to="/pagos">
                Ver formas de pago
              </Link>
            </div>

            <div className="chips hero__chips" role="tablist" aria-label="Programa">
              {PROGRAMAS.map((p) => (
                <Chip
                  key={p}
                  active={prog === p}
                  onClick={() => setProg(p)}
                  label={p}
                />
              ))}
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
                href={`https://wa.me/${WAPP_INTL}?text=${encodeURIComponent(helpMsg)}`}
                target="_blank"
                rel="noreferrer"
                data-event="click_whatsapp_card"
              >
                Quiero orientación
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* BENEFICIOS */}
      <section className="container benefits">
        <BenefitCard
          title="Matrícula única y precios claros"
          body="Sin letra chica. Te mostramos el total antes de pagar."
        />
        <BenefitCard
          title="Clases en vivo + cápsulas"
          body="Todo queda grabado para que puedas repasar cuando quieras."
        />
        <BenefitCard
          title="Acompañamiento real"
          body="Tutorías, seguimiento y apoyo para sostener el ritmo."
        />
      </section>

      {/* BLOQUE DEL PROGRAMA */}
      <section className="container program" aria-labelledby="prog-title">
        <h2 id="prog-title" className="h5 title-center">
          {prog === "PAES" ? "PAES" : prog === "Idiomas" ? "Idiomas" : "Lengua de Señas Chilena (LSCh)"}
        </h2>

        <div className="program__grid">
          <article className="card">
            <ul className="bullets">
              {prog === "PAES" && (
                <>
                  <li>Clases en vivo, cápsulas y acompañamiento a estudiantes.</li>
                  <li>Ramos: M1, M2, Lenguaje, Historia, Ciencias.</li>
                  <li>Ensayos y retroalimentación.</li>
                  <li>Disponibilidad para trabajo remoto y coordinación semanal.</li>
                </>
              )}
              {prog === "Idiomas" && (
                <>
                  <li>Inglés y Coreano (grupal). Nivelación opcional.</li>
                  <li>Material claro y progresivo. Práctica real.</li>
                  <li>Clases en vivo y grabadas.</li>
                  <li>Coordinación por módulos trimestrales.</li>
                </>
              )}
              {prog === "LSCh" && (
                <>
                  <li>LSCh Inicial y Funcional (grupal).</li>
                  <li>Énfasis en inclusión y comunicación efectiva.</li>
                  <li>Clases en vivo + cápsulas prácticas.</li>
                  <li>Verificación simple para convenios cuando aplique.</li>
                </>
              )}
            </ul>

            <p className="process-note">
              💬 <b>Pago vía boleta de honorarios.</b> Modalidad 100% online.
            </p>

            <Process />
          </article>

          {/* LATERAL: BENEFICIOS + AYUDA */}
          <aside className="card side">
            <h3 className="h6">Beneficios en Lael</h3>
            <ul className="tiny checklist">
              <li>🕒 Horarios flexibles · 100% online.</li>
              <li>📚 Material y LMS listo para partir.</li>
              <li>🎥 Clases en vivo + cápsulas (estructura clara).</li>
              <li>📈 Feedback real y opciones de liderazgo.</li>
              <li>💬 Comunidad: trabajo en equipo y respeto.</li>
            </ul>
            <div className="help-cta">
              <a
                className="btn btn-primary w-full"
                href={`https://wa.me/${WAPP_INTL}?text=${encodeURIComponent(helpMsg)}`}
                target="_blank"
                rel="noreferrer"
                data-event="click_whatsapp_benefits"
              >
                Quiero orientación
              </a>
            </div>
          </aside>
        </div>
      </section>

      {/* FORM + PAGOS */}
      <section ref={formRef} className="container grid">
        {/* FORM EMBED */}
        <article className="card">
          <div className="card__head">
            <h2 className="h6">Formulario de inscripción</h2>
            <p className="tiny subtle">
              Si no ves el formulario, usa{" "}
              <a
                className="link"
                href={FORM_URL.replace("?embedded=true", "")}
                target="_blank"
                rel="noreferrer"
                data-event="click_form_newtab"
              >
                Abrir en nueva pestaña
              </a>
              .
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
          <h2 className="h6">Formas de pago</h2>

          <h3 className="h7">Transferencia</h3>
          <div className="bank blk">
            <Row k="Nombre" v="Instituto Lael SpA" />
            <Row k="RUT" v="78.084.019-6" />
            <Row k="Banco / Tipo" v="Mercado Pago · Cuenta Vista" />
            <Row k="N° de cuenta" v="1088183168" />
            <Row k="Correo comprobantes" v="pagos@institutolael.cl" />
            <Row k="Glosa" v="Nombre del estudiante + Programa" />
          </div>

          <div className="note">
            💡 <b>Tip:</b> si combinas ramos o cambias de plan, te ayudamos a recalcular tu pago.
          </div>

          <hr />
          <h3 className="h7">¿Necesitas ayuda?</h3>
          <p className="tiny subtle">Te orientamos para elegir plan, ramos u horarios.</p>
          <a
            className="btn btn-outline w-full"
            href={`https://wa.me/${WAPP_INTL}?text=${encodeURIComponent(helpMsg)}`}
            target="_blank"
            rel="noreferrer"
            data-event="click_whatsapp_pay"
          >
            Hablar por WhatsApp
          </a>
        </aside>
      </section>

      {/* FAQ + CTA FINAL */}
      <section className="container faq">
        <h2 className="h5 title-center">Preguntas frecuentes</h2>
        <div className="faq__grid">
          <AccordionItem q="¿Cuándo empiezan las clases?">
            Te proponemos fechas y horarios disponibles al validar tu inscripción.
          </AccordionItem>
          <AccordionItem q="¿Queda todo grabado?">
            Sí. Todas las clases en vivo quedan grabadas para repaso.
          </AccordionItem>
          <AccordionItem q="¿Puedo cambiar de plan/ramo?">
            Sí. Te ayudamos a recalcular y ajustar tu malla cuando lo necesites.
          </AccordionItem>
          <AccordionItem q="¿Hay becas o convenios?">
            Sí, según cupos y validación. Escríbenos para revisar tu caso.
          </AccordionItem>
        </div>

        <div className="final-cta">
          <button className="btn btn-primary" onClick={scrollToForm}>
            Inscribirme ahora
          </button>
          <a
            className="btn btn-outline"
            href={`https://wa.me/${WAPP_INTL}?text=${encodeURIComponent(helpMsg)}`}
            target="_blank"
            rel="noreferrer"
          >
            Quiero orientación
          </a>
        </div>
      </section>

      {/* STICKY CTA (mobile) */}
      <div className="sticky-cta" role="region" aria-label="Acción rápida">
        <button className="btn btn-primary" onClick={scrollToForm}>
          Inscribirme
        </button>
        <a
          className="btn btn-outline"
          href={`https://wa.me/${WAPP_INTL}?text=${encodeURIComponent(helpMsg)}`}
          target="_blank"
          rel="noreferrer"
        >
          WhatsApp
        </a>
      </div>
    </section>
  );
}

/* ---------- Subcomponentes ---------- */
function Chip({ active, label, onClick }) {
  return (
    <button
      type="button"
      className={`chip ${active ? "on" : ""}`}
      aria-pressed={active}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

function BenefitCard({ title, body }) {
  return (
    <article className="benefit card">
      <h3 className="ink">{title}</h3>
      <p className="ink-2">{body}</p>
    </article>
  );
}

function Process() {
  return (
    <div className="process">
      <h3 className="h6">¿Cómo es el proceso?</h3>
      <ol className="steps-box">
        <li>
          <span className="num">1</span> Completa el formulario (2–3 min).
        </li>
        <li>
          <span className="num">2</span> Te escribimos (24–48 h) para confirmar plan/horario.
        </li>
        <li>
          <span className="num">3</span> Pago y boleta. Activamos tu acceso.
        </li>
        <li>
          <span className="num">4</span> Bienvenida: cuentas, calendario y materiales.
        </li>
      </ol>
      <p className="tip">
        Consejo: comparte logros concretos (aprobación, materiales creados, feedback).
      </p>
    </div>
  );
}

function Row({ k, v }) {
  return (
    <div className="row">
      <strong>{k}:</strong> <span>{v}</span>
    </div>
  );
}

function AccordionItem({ q, children }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`acc ${open ? "open" : ""}`}>
      <button
        type="button"
        className="acc__q"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        {q}
        <span className="plus">{open ? "–" : "+"}</span>
      </button>
      {open && <div className="acc__a">{children}</div>}
    </div>
  );
}

/* ---------- CSS ---------- */
const css = `
:root{
  --bg:#0b1220; --panel:#0e1424; --soft:#0d1528; --bd:#1f2a44;
  --ink:#ffffff; --muted:#eaf2ff; --accent:#F59E0B; --accent2:#22d3ee;
  --chip:#0f172a; --chip-bd:#334155;
}
.enroll{ color:var(--ink); background:var(--bg); }
.container{ max-width:1120px; margin:0 auto; padding:0 18px; }

/* HERO */
.hero{
  padding:38px 0 22px; border-bottom:1px solid var(--bd);
  background:
    radial-gradient(880px 320px at 10% -10%, rgba(245,158,11,.20), transparent 60%),
    radial-gradient(820px 300px at 92% -12%, rgba(34,211,238,.10), transparent 60%);
}
.hero__inner{ display:grid; grid-template-columns: 1.1fr .9fr; gap:24px; align-items:start; }
@media (max-width:980px){ .hero__inner{ grid-template-columns:1fr; } }
.hero__copy{ padding:6px 0; text-align:center; }
.pill{
  display:inline-block; padding:.28rem .62rem; border-radius:999px;
  border:1px solid #334155; background:#101a2f; font-weight:900;
}
h1{ margin:.6rem 0 .45rem; font-size:clamp(2.0rem, 3.6vw + .4rem, 2.7rem); }
.subtle{ color:var(--muted); opacity:.95; max-width:70ch; margin-inline:auto; }

.cta{ display:flex; gap:10px; flex-wrap:wrap; margin:14px 0 10px; justify-content:center; }
.btn{
  display:inline-flex; align-items:center; justify-content:center; gap:8px;
  padding:.78rem 1.05rem; border-radius:12px; border:1px solid #2f3341; text-decoration:none; font-weight:900;
  transition:.16s transform ease, .16s box-shadow ease;
}
.btn:hover{ transform: translateY(-1px); box-shadow:0 14px 28px rgba(2,6,23,.28); }
.btn-primary{ background:linear-gradient(180deg,#FCD34D,#F59E0B); color:#0b1220; border-color:#D97706; }
.btn-outline{ background:transparent; color:#eaf2ff; border-color:#334155; }
.btn-ghost{ background:transparent; color:#eaf2ff; border-color:#2f3341; }
.w-full{ width:100%; }

.hero__chips{ justify-content:center; margin-top:6px; }
.chips{ display:flex; gap:10px; flex-wrap:wrap; }
.chip{
  border:1px solid var(--chip-bd); background:var(--chip); color:#fff;
  padding:.5rem 1rem; border-radius:999px; font-weight:900;
}
.chip.on{ outline:2px solid rgba(34,211,238,.45); box-shadow:0 0 0 3px rgba(34,211,238,.12) inset; }

.badges{ display:flex; gap:8px; flex-wrap:wrap; margin-top:8px; justify-content:center; }
.badge{ font-size:.82rem; padding:.24rem .6rem; border-radius:999px; border:1px solid #334155; background:#0f172a; }

/* tarjetita lateral del hero */
.hero__card{ display:flex; justify-content:center; }
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

/* BENEFICIOS */
.benefits{ display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:16px; padding:16px 0 8px; }
@media (max-width:900px){ .benefits{ grid-template-columns:1fr; } }
.benefit.card{ padding:16px; }
.benefit h3{ margin:0 0 6px; color:#FDE047; }
.benefit p{ margin:0; color:var(--muted); }

/* BLOQUE PROGRAMA */
.title-center{ text-align:center; margin:12px 0 4px; }
.program__grid{ display:grid; grid-template-columns:1.15fr .85fr; gap:16px; }
@media (max-width:980px){ .program__grid{ grid-template-columns:1fr; } }

.card{
  border:1px solid var(--bd); border-radius:18px; background:linear-gradient(180deg,#0f172a,#0b1220);
  box-shadow:0 18px 36px rgba(2,6,23,.26); padding:16px;
}
.h6{ margin:0 0 6px; font-size:1.06rem; font-weight:1000; color:#fff; }
.h5{ margin:0 0 6px; font-size:1.24rem; font-weight:1000; }
.h7{ margin:8px 0 6px; font-size:1rem; font-weight:900; }

.bullets{ margin:0 0 8px; padding-left:18px; color:#eaf2ff; }
.process-note{ margin:8px 0; color:#86EFAC; font-weight:900; }

.process .steps-box{
  margin:8px 0 0; padding:10px 12px;
  border:1px dashed var(--bd); border-radius:14px; background:linear-gradient(180deg,#0f172a,#0b1220);
}
.steps-box li{ display:flex; gap:10px; align-items:center; margin:.3rem 0; color:#dbeafe; }
.steps-box .num{
  width:24px; height:24px; display:grid; place-items:center; border-radius:999px;
  background:#0b1220; border:1px solid #334155; font-weight:900;
}
.tip{ margin-top:8px; color:#a5b4fc; font-weight:900; }

/* GRID contenido inferior */
.grid{
  display:grid; gap:16px; padding:18px 0 28px;
  grid-template-columns: 1.12fr .88fr;
}
@media (max-width:980px){ .grid{ grid-template-columns:1fr; } }

.card__head{ display:flex; align-items:end; justify-content:space-between; gap:10px; margin-bottom:8px; }
.tiny{ font-size:.94rem; }
.link{ color:#7dd3fc; text-decoration:underline; }

/* Iframe responsive */
.iframe-wrap{
  position:relative; width:100%;
  height: min(1400px, 76vh);
  border:1px solid var(--bd); border-radius:14px; overflow:hidden; background:#0f172a;
}
@media (max-width:640px){ .iframe-wrap{ height: 75vh; } }
.iframe-wrap iframe{
  position:absolute; inset:0; width:100%; height:100%; border:0; background:#0f172a;
}

/* Lateral */
.side .note{
  margin:10px 0; padding:.6rem .8rem; border-radius:10px;
  background:#0f172a; border:1px dashed #2b3b61; color:#eaf2ff;
}
.checklist{ list-style:none; padding:0; margin:10px 0; color:#dbeafe; }
.checklist li{ margin:.3rem 0; }
.help-cta{ margin-top:10px; }

/* FAQ */
.faq{ padding:6px 0 30px; }
.faq__grid{ display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:12px; }
@media (max-width:900px){ .faq__grid{ grid-template-columns:1fr; } }
.acc{ border:1px solid var(--bd); border-radius:14px; background:linear-gradient(180deg,#0f172a,#0b1220); }
.acc__q{
  width:100%; text-align:left; padding:12px 14px; background:transparent; border:0; color:#fff; font-weight:900;
  display:flex; justify-content:space-between; align-items:center;
}
.acc__a{ padding:0 14px 12px; color:#eaf2ff; }
.plus{ font-size:1.2rem; opacity:.9; }

.final-cta{ margin-top:10px; display:flex; gap:10px; justify-content:center; flex-wrap:wrap; }

/* Bank rows */
.bank.blk{ display:grid; gap:6px; margin:8px 0 12px; }
.row{ display:flex; gap:6px; flex-wrap:wrap; }
.row strong{ color:#fff; }
.row span{ color:#eaf2ff; }

hr{ border:0; border-top:1px solid var(--bd); margin:12px 0; }

/* Sticky CTA (mobile) */
.sticky-cta{
  position:fixed; inset:auto 0 12px 0; display:none; justify-content:center; gap:8px; padding:0 12px; z-index:60;
}
@media (max-width:820px){
  .sticky-cta{ display:flex; }
  body{ padding-bottom:70px; }
}
`;