// src/pages/Trabaja.jsx
import { useMemo, useState } from "react";
import logo from "../assets/img/Logos/lael-inst-naranja.png";

const WAPP = "56964626568"; // WhatsApp Instituto Lael

const AREAS = [
  { key: "Docencia PAES", tone: "green" },
  { key: "Idiomas", tone: "indigo" },
  { key: "Lengua de Señas Chilena (LSCh)", tone: "indigo" },
  { key: "Diseño & Marketing", tone: "amber" },
  { key: "Producción de Contenido", tone: "amber" },
  { key: "Administración & Soporte", tone: "indigo" },
  { key: "Voluntariado", tone: "green" },
];

export default function Trabaja() {
  const [area, setArea] = useState("Docencia PAES"); // uno activo por defecto

  return (
    <section className="work-page" aria-labelledby="trabaja-title">
      <style>{css}</style>

      {/* HERO */}
      <header className="hero">
        <span className="badge">Convocatoria 2026</span>
        <img className="brand" src={logo} alt="Instituto Lael" />
        <h1 id="trabaja-title">
          Trabaja con <span className="hl">Instituto Lael</span>
        </h1>
        <p className="lead">
          Súmate a un proyecto educativo con propósito. Buscamos docentes,
          creadores y perfiles de apoyo que quieran transformar la educación —
          100% online, con acompañamiento real.
        </p>

        <div className="cta-hero">
          <a
            className="btn-primary"
            href="mailto:coordinacion@institutolael.cl?subject=Postulación 2026 – Envío de CV"
          >
            Enviar CV por correo
          </a>
          <a
            className="btn-ghost"
            href={`https://wa.me/${WAPP}?text=${encodeURIComponent(
              "Hola 👋, quiero postular a Instituto Lael. ¿Me indican los pasos?"
            )}`}
            target="_blank"
            rel="noreferrer"
          >
            Hablar por WhatsApp
          </a>
        </div>

        {/* Tabs de áreas (scrollable) */}
        <nav
          className="area-tabs"
          aria-label="Áreas abiertas"
          role="tablist"
          aria-orientation="horizontal"
        >
          {AREAS.map(({ key, tone }) => (
            <button
              key={key}
              role="tab"
              className={`area-tab tone-${tone}`}
              aria-selected={area === key}
              aria-controls={`panel-${slug(key)}`}
              onClick={() => setArea(key)}
            >
              {key}
            </button>
          ))}
        </nav>
      </header>

      {/* TRÍADA DE VALOR */}
      <section className="blocks">
        <ValueCard t="🎯 Impacto real">
          Acompañamos personas, no métricas. Tu trabajo cambia trayectorias.
        </ValueCard>
        <ValueCard t="💡 Innovación con sentido">
          Prototipamos, medimos y mejoramos: clases, contenidos y experiencia.
        </ValueCard>
        <ValueCard t="🤝 Cultura humana">
          Fe, servicio y respeto. Liderazgo cercano; equipo que cuida a las personas.
        </ValueCard>
      </section>

      {/* Tabs repetidos bajo la tríada para navegación corta (opcional) */}
      <nav className="area-tabs under" role="tablist" aria-label="Selector de área">
        {AREAS.map(({ key, tone }) => (
          <button
            key={key}
            role="tab"
            className={`area-tab tone-${tone}`}
            aria-selected={area === key}
            aria-controls={`panel-${slug(key)}`}
            onClick={() => setArea(key)}
          >
            {key}
          </button>
        ))}
      </nav>

      {/* PANEL DETALLE SEGÚN ÁREA */}
      <section
        id={`panel-${slug(area)}`}
        role="tabpanel"
        aria-labelledby=""
        className="area-panel"
      >
        {area === "Docencia PAES" && <PanelDocencia />}
        {area === "Idiomas" && <PanelIdiomas />}
        {area === "Lengua de Señas Chilena (LSCh)" && <PanelLSCh />}
        {area === "Diseño & Marketing" && <PanelDiseno />}
        {area === "Producción de Contenido" && <PanelContenido />}
        {area === "Administración & Soporte" && <PanelAdmin />}
        {area === "Voluntariado" && <PanelVoluntariado />}
      </section>

      <div className="section-divider" aria-hidden="true" />

      {/* PROCESO + BENEFICIOS */}
      <section className="process-benefits">
        <div className="left">
          <p className="legal-ribbon">
            💬 Pago vía <b>boleta de honorarios</b>. Modalidad <b>100% online</b>.
          </p>
          <h2 className="title">¿Cómo es el proceso?</h2>
          <ol className="steps">
            <li>
              <b>Postula</b> con tu CV y cuéntanos tu motivación.
            </li>
            <li>
              <b>Conversamos</b> (15–20 min): cultura, disponibilidad y fit.
            </li>
            <li>
              <b>Demo breve</b>: clase o caso práctico guiado.
            </li>
            <li>
              <b>Onboarding</b> con materiales, cuentas y acompañamiento.
            </li>
          </ol>
          <p className="tips">
            Consejo: comparte logros concretos (aprobación, materiales creados, feedback de
            estudiantes/líderes).
          </p>
        </div>

        <aside className="benefits card">
          <h3 className="ink">Beneficios en Lael</h3>
          <ul className="benefit-list">
            <li>🕒 Horarios flexibles · 100% online.</li>
            <li>📚 Material y LMS listo para partir.</li>
            <li>🎥 Clases en vivo + cápsulas (estructura clara).</li>
            <li>📈 Feedback real y opciones de liderazgo.</li>
            <li>💬 Comunidad: trabajo en equipo y respeto.</li>
          </ul>
          <div className="mini-cta">
            ¿Listo/a? Escribe directo a{" "}
            <a href="mailto:coordinacion@institutolael.cl" className="link">
              coordinacion@institutolael.cl
            </a>{" "}
            o a WhatsApp.
          </div>
        </aside>
      </section>

      {/* FORM + CTA */}
      <section className="grid-two">
        <FormPostulacion defaultArea={area} />
      </section>

      {/* CTA FINAL */}
      <footer className="cta">
        <h2>¿Te animas a construir con nosotros?</h2>
        <p>
          Envíanos tu CV a{" "}
          <a className="link-strong" href="mailto:coordinacion@institutolael.cl">
            coordinacion@institutolael.cl
          </a>{" "}
          — revisamos todas las postulaciones.
        </p>

        <div className="vision-box">
          <p className="vision-text">
            Instituto Lael fue fundado por <b>Diego Chaparro</b> con una visión simple:{" "}
            <b>acompañar de verdad</b> y abrir oportunidades reales con excelencia y dignidad.
          </p>
        </div>

        <div className="cta-hero">
          <a
            className="btn-ghost"
            href="mailto:coordinacion@institutolael.cl?subject=Postulación 2026 – Envío de CV"
          >
            Postular por correo
          </a>
          <a
            className="btn-primary"
            href={`https://wa.me/${WAPP}?text=${encodeURIComponent(
              "Hola 👋, quiero postular a Instituto Lael. ¿Me indican los pasos?"
            )}`}
            target="_blank"
            rel="noreferrer"
          >
            Postular por WhatsApp
          </a>
        </div>
      </footer>
    </section>
  );
}

/* ---------- Subcomponentes de paneles ---------- */

function PanelDocencia() {
  return (
    <article className="card area-card">
      <h2 className="area-title">Docencia PAES</h2>
      <ul className="bullets">
        <li>Clases en vivo, cápsulas y acompañamiento a estudiantes.</li>
        <li>Compromiso con la calidad, respeto y trato digno.</li>
        <li>Conexión estable y manejo básico de herramientas online.</li>
        <li>Disponibilidad para trabajo remoto y coordinación semanal.</li>
      </ul>
    </article>
  );
}

function PanelIdiomas() {
  return (
    <article className="card area-card">
      <h2 className="area-title">Idiomas</h2>
      <ul className="bullets">
        <li>Inglés, Coreano y Portugués (docencia o soporte de contenidos).</li>
        <li>Experiencia previa o certificaciones son un plus.</li>
        <li>Metodologías activas y vocación por acompañar.</li>
      </ul>
    </article>
  );
}

function PanelLSCh() {
  return (
    <article className="card area-card">
      <h2 className="area-title">Lengua de Señas Chilena (LSCh)</h2>
      <ul className="bullets">
        <li>Docencia y apoyo en accesibilidad e inclusión.</li>
        <li>Valoramos experiencia en comunidad sorda y enfoque humano.</li>
      </ul>
    </article>
  );
}

function PanelDiseno() {
  return (
    <article className="card area-card">
      <h2 className="area-title">Diseño & Marketing</h2>
      <ul className="bullets">
        <li>Creatividad aplicada a campañas, piezas y narrativa de marca.</li>
        <li>Experiencia en redes y performance es bienvenida.</li>
      </ul>
    </article>
  );
}

function PanelContenido() {
  return (
    <article className="card area-card">
      <h2 className="area-title">Producción de Contenido</h2>
      <ul className="bullets">
        <li>Grabación/edición de cápsulas y apoyo en LMS.</li>
        <li>Calidad clara y orientación pedagógica.</li>
      </ul>
    </article>
  );
}

function PanelAdmin() {
  return (
    <article className="card area-card">
      <h2 className="area-title">Administración & Soporte</h2>
      <ul className="bullets">
        <li>Soporte a estudiantes/docentes, agenda y coordinación.</li>
        <li>Comunicación clara y foco en servicio.</li>
      </ul>
    </article>
  );
}

function PanelVoluntariado() {
  return (
    <article className="card area-card">
      <h2 className="area-title">Voluntariado</h2>
      <ul className="bullets">
        <li>Apoyo en clases, contenidos y acompañamiento.</li>
        <li>Espacio para aprender haciendo y aportar a la comunidad.</li>
      </ul>
    </article>
  );
}

function ValueCard({ t, children }) {
  return (
    <article className="card value">
      <h3 className="ink">{t}</h3>
      <p className="ink-2">{children}</p>
    </article>
  );
}

/* ---------- Form ---------- */

function FormPostulacion({ defaultArea }) {
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState(defaultArea || "Docencia PAES");
  const [availability, setAvailability] = useState("Part-time");
  const [message, setMessage] = useState("");
  const [legal, setLegal] = useState(false);
  const [hp, setHp] = useState(""); // honeypot antispam

  const valid = useMemo(() => {
    const mailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail);
    return name.trim().length >= 2 && mailOk && legal;
  }, [name, mail, legal]);

  const buildSummary = () => {
    const lines = [
      "Postulación Instituto Lael 2026",
      "--------------------------------",
      `Nombre: ${name}`,
      `Correo: ${mail}`,
      `Teléfono: ${phone || "—"}`,
      `Área de interés: ${role}`,
      `Disponibilidad: ${availability}`,
      "",
      "Mensaje:",
      (message || "—").trim(),
      "",
      "⚠️ Recuerda adjuntar tu CV al enviar este mensaje.",
    ];
    return lines.join("\n");
  };

  const subject = `Postulación 2026 – ${role} – ${name}`;

  const handleEmail = (e) => {
    e.preventDefault();
    if (!valid || hp) return;
    const href = `mailto:coordinacion@institutolael.cl?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(buildSummary())}`;
    window.location.href = href;
  };

  const handleWhatsapp = () => {
    const href = `https://wa.me/${WAPP}?text=${encodeURIComponent(buildSummary())}`;
    window.open(href, "_blank", "noopener,noreferrer");
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(buildSummary());
      alert("Texto copiado. Pégalo en tu correo o WhatsApp ✅");
    } catch {
      prompt("Copia manualmente el texto:", buildSummary());
    }
  };

  return (
    <form className="form card" onSubmit={handleEmail} noValidate>
      {/* honeypot */}
      <input
        type="text"
        value={hp}
        onChange={(e) => setHp(e.target.value)}
        tabIndex={-1}
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px" }}
      />

      <h3 className="ink">Postula aquí</h3>

      <div className="row">
        <div className="col">
          <label className="label">Nombre y apellido</label>
          <input
            className={`input ${!name ? "invalid" : ""}`}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Tu nombre"
            required
          />
        </div>
        <div className="col">
          <label className="label">Correo electrónico</label>
          <input
            className={`input ${mail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail) ? "invalid" : ""}`}
            type="email"
            value={mail}
            onChange={(e) => setMail(e.target.value)}
            placeholder="tucorreo@ejemplo.cl"
            required
          />
        </div>
      </div>

      <div className="row">
        <div className="col">
          <label className="label">Teléfono (opcional)</label>
          <input
            className="input"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+56 9 1234 5678"
          />
        </div>
        <div className="col">
          <label className="label">Área de interés</label>
          <select
            className="input select"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            {AREAS.map(({ key }) => (
              <option key={key}>{key}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <label className="label">Disponibilidad</label>
          <div className="choices">
            {["Part-time", "Full-time", "Freelance/Proyecto"].map((opt) => (
              <button
                type="button"
                key={opt}
                className={"choice " + (availability === opt ? "on" : "")}
                onClick={() => setAvailability(opt)}
                aria-pressed={availability === opt}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
        <div className="col">
          <label className="label">CV (adjúntalo en el correo)</label>
          <div className="fake-file">
            <span className="ink">Se adjunta al abrir tu correo.</span>
            <small className="good">También puedes enviarlo por WhatsApp.</small>
          </div>
        </div>
      </div>

      <label className="label">Cuéntanos de ti</label>
      <textarea
        className="input textarea"
        rows={5}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Experiencia, motivación y qué te gustaría aportar a Lael…"
      />

      <label className="legal">
        <input
          type="checkbox"
          checked={legal}
          onChange={(e) => setLegal(e.target.checked)}
        />
        <span className="ink">
          Declaro que puedo presentar <b>papeles al día</b> para contratación legal.
        </span>
      </label>

      <div className="actions">
        <button className="btn-primary" type="submit" disabled={!valid}>
          Enviar por correo
        </button>
        <button className="btn-ghost" type="button" onClick={handleWhatsapp}>
          Enviar por WhatsApp
        </button>
        <button className="btn-ghost" type="button" onClick={handleCopy}>
          Copiar texto
        </button>
      </div>
      {!valid && (
        <div className="helper">
          Completa <b>Nombre</b>, <b>Correo</b> y acepta la declaración para activar el envío.
        </div>
      )}
    </form>
  );
}

/* ---------- Utils ---------- */
function slug(s) {
  return s.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "");
}

/* ---------- CSS ---------- */
const css = `
:root{
  --ink:#FFFFFF;
  --ink2:#EAF2FF;
  --indigo:#5850EC;
  --green:#16A34A;
  --amber:#F59E0B;
  --bd:#243354;
  --bg1:#0B1220;
  --bg2:#0E1426;
}

.work-page{ color:var(--ink); background:var(--bg1); padding-bottom:40px; }
a{ color:#22D3EE; text-decoration:none; }
a:hover{ text-decoration:underline; }

/* HERO */
.hero{
  text-align:center; padding:56px 18px 24px;
  background:
    radial-gradient(900px 320px at 12% -8%, rgba(88,80,236,.22), transparent 60%),
    radial-gradient(900px 320px at 88% -8%, rgba(22,163,74,.20), transparent 60%);
  border-bottom:1px solid var(--bd);
}
.badge{
  display:inline-block; padding:.35rem .7rem; font-weight:900; border-radius:999px;
  background:rgba(99,102,241,.18); color:#c7d2fe; border:1px solid rgba(99,102,241,.28);
  box-shadow:0 8px 24px rgba(2,6,23,.28) inset; margin-bottom:10px;
}
.hero .brand{ width:86px; margin:8px auto 10px; display:block; }
.hero h1{ font-size:clamp(1.9rem, 2.7vw + .8rem, 3rem); margin:0 0 6px; }
.hero .hl{
  background-image: linear-gradient(90deg,#FCD34D,#F59E0B);
  -webkit-background-clip:text; background-clip:text; color:transparent;
}
.hero .lead{ max-width:70ch; margin:0 auto 16px; color:var(--ink2); font-size:1.04rem; }
.cta-hero{ display:flex; gap:10px; flex-wrap:wrap; justify-content:center; }

/* BOTONES */
.btn-primary,.btn-ghost{
  display:inline-flex; align-items:center; justify-content:center;
  padding:.8rem 1.15rem; border-radius:12px; font-weight:1000;
}
.btn-primary{ color:#0B1220; background:linear-gradient(180deg,#FCD34D,#F59E0B); border:1px solid #D97706; }
.btn-primary:hover{ filter:brightness(1.06); }
.btn-ghost{ color:#fff; border:1px solid #2f3b60; background:transparent; }
.btn-ghost:hover{ border-color:#3b82f6; }

/* Tabs de área */
.area-tabs{
  display:flex; gap:.6rem; padding:.6rem .85rem; margin-top:14px;
  overflow-x:auto; scroll-snap-type:x mandatory;
  border-top:1px solid rgba(148,163,184,.15);
  border-bottom:1px solid rgba(148,163,184,.15);
}
.area-tabs.under{ margin:10px auto 0; max-width:1120px; border:none; }
.area-tab{
  scroll-snap-align:center;
  white-space:nowrap;
  border:1px solid rgba(148,163,184,.35);
  background:linear-gradient(180deg,#0F172A,#0B1220);
  color:#EAF2FF; padding:.55rem .95rem; border-radius:999px; font-weight:800;
}
.area-tab[aria-selected="true"]{
  border-color:#22c55e; box-shadow:0 0 0 3px rgba(34,197,94,.18) inset;
}
.tone-indigo[aria-selected="true"]{ border-color:#6366f1; box-shadow:0 0 0 3px rgba(99,102,241,.18) inset; }
.tone-amber[aria-selected="true"]{ border-color:#f59e0b; box-shadow:0 0 0 3px rgba(245,158,11,.20) inset; }
.area-tab:focus-visible{ outline:2px solid #22D3EE; outline-offset:2px; }

/* Cards de valor */
.blocks{ display:grid; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); gap:16px; margin:22px 0 6px; padding:0 18px; }
.card{
  border:1px solid var(--bd); border-radius:16px; padding:22px;
  background:linear-gradient(180deg,var(--bg2),var(--bg1));
  box-shadow:0 16px 34px rgba(2,6,23,.38);
}
.card h3{ margin:0 0 6px; color:#FDE047; }
.card p{ margin:0; color:var(--ink2); }

/* Panel de área */
.area-panel{ padding:10px 18px 0; max-width:1120px; margin:0 auto; }
.area-card .area-title{ margin:0 0 6px; font-size:1.25rem; color:#fff; }
.bullets{ margin:.35rem 0 0; padding-left:18px; color:#EAF2FF; }
.bullets li{ margin:.35rem 0; }

/* Separador */
.section-divider{
  height:1px; background: linear-gradient(90deg, transparent, rgba(148,163,184,.18), transparent);
  margin: 24px auto; max-width: 1120px;
}

/* Proceso + beneficios */
.process-benefits{
  display:grid; grid-template-columns: 1.1fr .9fr; gap:18px; padding:0 18px; max-width:1120px; margin:0 auto;
}
@media (max-width:980px){ .process-benefits{ grid-template-columns:1fr; } }
.legal-ribbon{ margin: 2px 0 12px; font-weight: 900; color:#86EFAC; }
.process-benefits .left .title{ font-size:1.3rem; color:#FDE047; margin:0 0 8px; font-weight:1000; }
.steps{
  margin:0; padding:12px 14px 12px 24px;
  border:1px dashed rgba(165,180,252,.28);
  border-radius:14px;
  background:linear-gradient(180deg,#101832,#0F172A);
  color:var(--ink2);
  line-height:1.55;
}
.steps li{ position:relative; padding-left:2.2rem; margin:.5rem 0 .7rem; }
.process-benefits .left{ counter-reset: step; }
.steps li::before{
  content: counter(step);
  counter-increment: step;
  position: absolute; left: 0; top: .05rem;
  width: 1.6rem; height: 1.6rem;
  display: grid; place-items:center;
  border-radius: 999px;
  font-weight: 900; font-size: .9rem;
  color:#0B1220;
  background: linear-gradient(180deg,#FCD34D,#F59E0B);
  box-shadow: 0 4px 10px rgba(252,211,77,.25);
}
.tips{ margin-top:8px; font-weight:900; color:#A5B4FC; }

/* Grid formulario + beneficios (benefits ya en process-benefits a la derecha) */
.grid-two{ max-width:1120px; margin:10px auto 0; padding:0 18px; }

/* Form */
.form.card{ padding:22px; }
.form h3{ margin:0 0 6px; }
.label{ display:block; font-weight:1000; margin-bottom:6px; color:#FDE047; }
.input{
  width:100%; border:1px solid #3A4680; background:#0E162E; color:#fff; border-radius:12px;
  padding:.68rem .9rem; font-weight:800;
}
.input.invalid{ border-color:#ef4444; }
.textarea{ resize:vertical; min-height:120px; }
.select{ appearance:none; background-image: linear-gradient(180deg,#0E162E,#101b34); }
.row{ display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:12px; }
@media (max-width:680px){ .row{ grid-template-columns:1fr; } }
.col{ min-width:0; }

.choices{ display:flex; flex-wrap:wrap; gap:8px; }
.choice{
  border:2px solid rgba(165,180,252,.55); color:#fff; background:transparent;
  padding:.55rem .9rem; border-radius:999px; font-weight:1000;
}
.choice.on{ border-color:#5850EC; box-shadow:0 0 0 3px rgba(88,80,236,.25); }

.fake-file{
  border:2px dashed #41509A; border-radius:14px; padding:.8rem .9rem; background:#0C1430;
}
.fake-file .good{ color:#86EFAC; font-weight:900; }

.legal{ display:flex; align-items:flex-start; gap:10px; margin:10px 0; }
.legal input{ margin-top:4px; }
.legal span{ font-weight:900; color:#fff; }

.actions{ display:flex; flex-wrap:wrap; gap:10px; align-items:center; }
.helper{ margin-top:8px; color:#FDE047; font-weight:1000; }

/* Beneficios */
.benefits.card{ padding:22px; }
.benefits h3{ margin:0 0 6px; }
.benefit-list{ margin:0; padding-left:18px; color:#EAF2FF; }
.benefit-list li{ margin:.3rem 0; font-weight:800; }
.mini-cta{ margin-top:10px; font-weight:900; color:#A5B4FC; }
.link{ color:#FDE047; text-decoration:underline; }
.link-strong{ color:#fff; font-weight:1000; }

/* CTA Final */
.cta{
  text-align:center; margin-top:28px; padding:24px 18px;
  background:#0B1220;
  border-top:1px solid var(--bd);
}
.cta h2{ font-size:1.6rem; margin:0 0 6px; color:#FDE047; }
.cta p{ max-width:65ch; margin:0 auto 14px; color:#fff; font-weight:800; }

.vision-box{
  max-width:840px; margin:10px auto 16px; padding:12px 14px;
  border:1px solid #2f3b60; border-radius:14px;
  background: linear-gradient(180deg,#0F172A,#0B1220);
}
.vision-text{ margin:0; color:#EAF2FF; }

/* Accesibilidad */
.btn-primary:focus-visible, .btn-ghost:focus-visible, .choice:focus-visible,
.input:focus-visible, select.input:focus-visible, textarea.input:focus-visible, .area-tab:focus-visible {
  outline:2px solid #22D3EE; outline-offset:2px;
}
`;