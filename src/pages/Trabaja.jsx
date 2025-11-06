// src/pages/Trabaja.jsx
import { useMemo, useState, useEffect, useRef } from "react";
import logo from "../assets/img/Logos/lael-inst-naranja.png";

const WAPP = "56964626568";

const AREAS = [
  "Docencia PAES",
  "Idiomas",
  "Lengua de Señas Chilena (LSCh)",
  "Diseño & Marketing",
  "Producción de Contenido",
  "Administración & Soporte",
  "Voluntariado",
];

export default function Trabaja() {
  const [area, setArea] = useState("Docencia PAES");

  // marquee dup
  const marquee = [...AREAS, ...AREAS, ...AREAS];

  return (
    <section className="workV2">
      <style>{css}</style>

      {/* HERO */}
      <header className="hero">
        <div className="container">
          <span className="badge">Convocatoria 2026</span>
          <img className="brand" src={logo} alt="Instituto Lael" />
          <h1>
            Trabaja con <span className="hl">Instituto Lael</span>
          </h1>
          <p className="lead">
            Súmate a un proyecto educativo con propósito. Buscamos docentes, creadores y perfiles de apoyo
            que quieran transformar la educación — <b>100% online</b>, con acompañamiento real.
          </p>

          <div className="ctaRow">
            <a
              className="btn btn-amber"
              href="mailto:coordinacion@institutolael.cl?subject=Postulación Instituto Lael"
            >
              Enviar CV por correo
            </a>
            <a
              className="btn btn-ghost"
              href={`https://wa.me/${WAPP}?text=${encodeURIComponent(
                "Hola 👋, quiero postular a Instituto Lael. ¿Me indican los pasos?"
              )}`}
              target="_blank"
              rel="noreferrer"
            >
              Hablar por WhatsApp
            </a>
          </div>

          {/* Marquee infinito */}
          <div className="mq" aria-label="Áreas de postulación">
            <div className="mq-track">
              {marquee.map((t, i) => (
                <span key={i} className="pill">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* NAV de chips “pivote” */}
      <nav className="chips container" aria-label="Selecciona un área">
        {AREAS.map((t) => (
          <button
            key={t}
            type="button"
            className={"chip " + (area === t ? "on" : "")}
            onClick={() => setArea(t)}
            aria-pressed={area === t}
          >
            {t}
          </button>
        ))}
      </nav>

      {/* Valor / propósito */}
      <section className="container trio">
        <ValueCard icon="🎯" title="Impacto real">
          Acompañamos personas, no métricas. Tu trabajo cambia trayectorias.
        </ValueCard>
        <ValueCard icon="💡" title="Innovación con sentido">
          Prototipamos, medimos y mejoramos: clases, contenidos y experiencia.
        </ValueCard>
        <ValueCard icon="🤝" title="Cultura humana">
          Fe, servicio y respeto. Liderazgo cercano; equipo que cuida a las personas.
        </ValueCard>
      </section>

      {/* Área seleccionada */}
      <section className="container areaCard">
        <header className="areaHead">
          <h2 className="areaTitle">{area}</h2>
          <p className="areaNote">
            Pago vía <b>boleta de honorarios</b>. Modalidad <b>100% online</b>.
          </p>
        </header>

        <Details area={area} />
      </section>

      {/* Proceso + Form + Beneficios */}
      <section className="container gridTwo">
        <Process />
        <aside className="benefits card">
          <h3>Beneficios en Lael</h3>
          <ul>
            <li>🕒 Horarios flexibles · 100% online.</li>
            <li>📚 Material y LMS listo para partir.</li>
            <li>🎥 Clases en vivo + cápsulas (estructura clara).</li>
            <li>📈 Feedback real y opciones de liderazgo.</li>
            <li>💬 Comunidad: trabajo en equipo y respeto.</li>
          </ul>
          <p className="mini">
            ¿Listo/a? Escribe a{" "}
            <a href="mailto:coordinacion@institutolael.cl">coordinacion@institutolael.cl</a> o por WhatsApp.
          </p>
        </aside>
      </section>

      <section className="container">
        <ApplyForm defaultRole={area} />
      </section>

      {/* CTA Final */}
      <footer className="cta">
        <div className="container">
          <h2>¿Te animas a construir con nosotros?</h2>
          <p>
            Envíanos tu CV a{" "}
            <a className="link" href="mailto:coordinacion@institutolael.cl">
              coordinacion@institutolael.cl
            </a>{" "}
            — revisamos todas las postulaciones.
          </p>

          <div className="vision">
            Instituto Lael fue fundado por <b>Diego Chaparro</b> con una visión simple:{" "}
            <b>acompañar de verdad</b> y abrir oportunidades reales con excelencia y dignidad.
          </div>

          <div className="ctaRow">
            <a
              className="btn btn-ghost"
              href="mailto:coordinacion@institutolael.cl?subject=Postulación Instituto Lael"
            >
              Postular por correo
            </a>
            <a
              className="btn btn-amber"
              href={`https://wa.me/${WAPP}?text=${encodeURIComponent(
                "Hola 👋, quiero postular a Instituto Lael. ¿Me indican los pasos?"
              )}`}
              target="_blank"
              rel="noreferrer"
            >
              Postular por WhatsApp
            </a>
          </div>
        </div>
      </footer>
    </section>
  );
}

/* ---------- Subcomponentes ---------- */
function ValueCard({ icon, title, children }) {
  return (
    <article className="card value">
      <div className="vIcon">{icon}</div>
      <h3>{title}</h3>
      <p>{children}</p>
    </article>
  );
}

function Details({ area }) {
  // Texto corto por área (editables)
  const COPY = {
    "Docencia PAES":
      "Clases en vivo, cápsulas y acompañamiento a estudiantes. Buscamos docentes con manejo de contenidos, didáctica y mirada humana.",
    Idiomas:
      "Inglés/Coreano/Portugués. Enfoque comunicativo, sesiones online y materiales claros. Plus: experiencia en evaluación por desempeño.",
    "Lengua de Señas Chilena (LSCh)":
      "Docencia de LSCh para niveles inicial/intermedio. Valoramos experiencia real en comunidad sorda y propuestas inclusivas.",
    "Diseño & Marketing":
      "Diseño de piezas, social media, motion básico y soporte de campañas. Trabajo coordinado con docencia y producción.",
    "Producción de Contenido":
      "Edición de cápsulas, organización de materiales y QA de clases. Ritmo ordenado y comunicación directa.",
    "Administración & Soporte":
      "Atención a estudiantes/docentes, soporte operativo y orden de datos. Perfil resolutivo con buena escritura.",
    Voluntariado:
      "Rol de apoyo en comunidad, difusión y moderación. Perfecto para quienes quieren sumar experiencia aportando al proyecto.",
  };

  return (
    <div className="card areaBody">
      <p className="areaCopy">{COPY[area]}</p>
      <ul className="req">
        <li>Compromiso con la calidad, respeto y trato digno.</li>
        <li>Conexión estable y manejo básico de herramientas online.</li>
        <li>Disponibilidad para trabajo remoto y coordinación semanal.</li>
      </ul>
    </div>
  );
}

function Process() {
  return (
    <section className="card process">
      <h3>¿Cómo es el proceso?</h3>
      <ol className="steps">
        <li>
          <span className="n">1</span>
          <div>
            <b>Postula</b> con tu CV y cuéntanos tu motivación.
          </div>
        </li>
        <li>
          <span className="n">2</span>
          <div>
            <b>Conversamos</b> (15–20 min): cultura, disponibilidad y fit.
          </div>
        </li>
        <li>
          <span className="n">3</span>
          <div>
            <b>Demo breve</b>: clase o caso práctico guiado.
          </div>
        </li>
        <li>
          <span className="n">4</span>
          <div>
            <b>Onboarding</b> con materiales, cuentas y acompañamiento.
          </div>
        </li>
      </ol>
      <p className="tip">
        Consejo: comparte logros concretos (aprobación, materiales creados, feedback de estudiantes/líderes).
      </p>
    </section>
  );
}

function ApplyForm({ defaultRole }) {
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState(defaultRole || AREAS[0]);
  const [availability, setAvailability] = useState("Part-time");
  const [message, setMessage] = useState("");
  const [legal, setLegal] = useState(false);

  useEffect(() => setRole(defaultRole), [defaultRole]);

  const valid = useMemo(() => {
    const mailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail);
    return name.trim().length >= 2 && mailOk && legal;
  }, [name, mail, legal]);

  const buildSummary = () =>
    [
      "Postulación Instituto Lael",
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
      "⚠️ Adjunta tu CV antes de enviar.",
    ].join("\n");

  const sendMail = (e) => {
    e.preventDefault();
    if (!valid) return;
    const subject = `Postulación - ${role} - ${name}`;
    const href = `mailto:coordinacion@institutolael.cl?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(buildSummary())}`;
    window.location.href = href;
  };

  const sendWa = () => {
    const href = `https://wa.me/${WAPP}?text=${encodeURIComponent(buildSummary())}`;
    window.open(href, "_blank", "noopener,noreferrer");
  };

  const copyTxt = async () => {
    try {
      await navigator.clipboard.writeText(buildSummary());
      alert("Texto copiado. Pégalo en tu correo o WhatsApp ✅");
    } catch {
      prompt("Copia el texto:", buildSummary());
    }
  };

  return (
    <form className="card form" onSubmit={sendMail} noValidate>
      <h3>Postula aquí</h3>

      <div className="row">
        <label className="col">
          <span>Nombre y apellido</span>
          <input
            className={"input " + (name.trim().length < 2 ? "bad" : "")}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Tu nombre"
            required
          />
        </label>
        <label className="col">
          <span>Correo electrónico</span>
          <input
            className={"input " + (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail) ? "bad" : "")}
            type="email"
            value={mail}
            onChange={(e) => setMail(e.target.value)}
            placeholder="tucorreo@ejemplo.cl"
            required
          />
        </label>
      </div>

      <div className="row">
        <label className="col">
          <span>Teléfono (opcional)</span>
          <input
            className="input"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+56 9 1234 5678"
          />
        </label>
        <label className="col">
          <span>Área de interés</span>
          <select className="input" value={role} onChange={(e) => setRole(e.target.value)}>
            {AREAS.map((a) => (
              <option key={a}>{a}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="row">
        <div className="col">
          <span className="lbl">Disponibilidad</span>
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
          <span className="lbl">CV (adjúntalo en el correo)</span>
          <div className="fakeFile">
            Se adjunta al abrir tu correo. <b>También puedes enviarlo por WhatsApp.</b>
          </div>
        </div>
      </div>

      <label className="block">
        <span>Cuéntanos de ti</span>
        <textarea
          className="input ta"
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Experiencia, motivación y qué te gustaría aportar a Lael…"
        />
      </label>

      <label className="legal">
        <input type="checkbox" checked={legal} onChange={(e) => setLegal(e.target.checked)} />
        <span>
          Declaro que puedo presentar <b>papeles al día</b> para contratación legal.
        </span>
      </label>

      <div className="actions">
        <button className="btn btn-amber" type="submit" disabled={!valid}>
          Enviar por correo
        </button>
        <button className="btn btn-ghost" type="button" onClick={sendWa}>
          Enviar por WhatsApp
        </button>
        <button className="btn btn-ghost" type="button" onClick={copyTxt}>
          Copiar texto
        </button>
      </div>

      {!valid && (
        <p className="helper">
          Completa <b>Nombre</b>, <b>Correo</b> y acepta la declaración para activar el envío.
        </p>
      )}
    </form>
  );
}

/* ---------- CSS ---------- */
const css = `
:root{
  --ink:#fff; --ink2:#dbeafe;
  --bg:#0b1220; --bg2:#0e1426;
  --bd:#243354;
  --indigo:#5850EC; --green:#16A34A; --amber:#F59E0B;
}

*{box-sizing:border-box}
.workV2{ color:var(--ink); background:var(--bg); }
.container{ max-width:1120px; margin:0 auto; padding:0 18px; }

/* HERO */
.hero{
  padding:46px 0 18px; border-bottom:1px solid var(--bd);
  background:
    radial-gradient(1100px 420px at 10% -10%, color-mix(in srgb, var(--indigo) 22%, transparent), transparent 60%),
    radial-gradient(1100px 420px at 90% -12%, color-mix(in srgb, var(--green) 18%, transparent), transparent 60%);
  text-align:center;
}
.badge{
  display:inline-block; padding:.28rem .6rem; border-radius:999px;
  border:1px solid #334155; color:#c7d2fe; font-weight:900; font-size:.88rem;
  background:linear-gradient(180deg,#0f172a,#0b1220);
}
.brand{ width:84px; margin:10px auto 8px; display:block; }
.hero h1{ margin:.2rem 0 .4rem; font-size:clamp(2rem,3.4vw + .6rem,3.2rem); }
.hl{ background-image:linear-gradient(90deg,#FDE68A,#F59E0B); -webkit-background-clip:text; background-clip:text; color:transparent; }
.lead{ max-width:70ch; margin:0 auto 14px; color:var(--ink2) }

/* CTA */
.ctaRow{ display:flex; gap:10px; flex-wrap:wrap; justify-content:center; margin:10px 0 12px; }
.btn{ display:inline-flex; align-items:center; justify-content:center; gap:8px; font-weight:1000; border-radius:12px; padding:.8rem 1.15rem; border:1px solid #2f3b60; text-decoration:none; }
.btn-amber{ color:#0b1220; background:linear-gradient(180deg,#FCD34D,#F59E0B); border-color:#D97706; }
.btn-amber:hover{ filter:brightness(1.06); }
.btn-ghost{ color:#fff; background:transparent; }
.btn-ghost:hover{ border-color:#3b82f6; }

/* Marquee */
.mq{ overflow:hidden; border-top:1px solid #1f2a44; border-bottom:1px solid #1f2a44; margin-top:10px; }
.mq-track{ display:flex; gap:10px; white-space:nowrap; padding:8px 0; animation:slide 25s linear infinite; }
.pill{ display:inline-block; padding:.42rem .8rem; border-radius:999px; border:1px solid #334155; background:#0f172a; color:#e5e7eb; font-weight:800; }
@keyframes slide{ from{ transform:translateX(0) } to{ transform:translateX(-50%) } }

/* Chips nav */
.chips{ display:flex; gap:8px; flex-wrap:wrap; justify-content:center; margin:18px auto; }
.chip{
  border:2px solid #2b3656; background:#0f172a; color:#eaf2ff; font-weight:900; border-radius:999px; padding:.55rem .9rem;
}
.chip.on{ border-color:#6b7cff; box-shadow:0 0 0 3px rgba(79,70,229,.18) inset; }

/* Valor */
.trio{ display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:14px; margin-bottom:8px; }
@media (max-width:980px){ .trio{ grid-template-columns:1fr; } }
.card{
  border:1px solid var(--bd); border-radius:16px; background:linear-gradient(180deg,var(--bg2),var(--bg));
  box-shadow:0 16px 34px rgba(2,6,23,.36); padding:16px;
}
.value .vIcon{ font-size:1.3rem; }
.value h3{ margin:.2rem 0 .3rem; color:#FDE047; }
.value p{ margin:0; color:var(--ink2); }

/* Área */
.areaCard{ margin-bottom:16px; }
.areaHead{ display:flex; align-items:end; justify-content:space-between; flex-wrap:wrap; gap:10px; }
.areaTitle{ margin:0; font-size:1.4rem; font-weight:1000; }
.areaNote{ margin:0; color:#86EFAC; font-weight:900; }
.areaBody{ margin-top:10px; }
.areaCopy{ margin:0 0 8px; color:var(--ink2); }
.req{ margin:0; padding-left:18px; color:#eaf2ff; }
.req li{ margin:.24rem 0; }

/* Proceso + Benefits + Form */
.gridTwo{ display:grid; grid-template-columns:1fr .9fr; gap:14px; margin-bottom:12px; }
@media (max-width:980px){ .gridTwo{ grid-template-columns:1fr; } }

.process h3{ margin:.1rem 0 .4rem; color:#A5B4FC; }
.steps{ margin:0; padding:0; list-style:none; }
.steps li{ display:grid; grid-template-columns:32px 1fr; gap:10px; align-items:center; border-bottom:1px dashed #2b3656; padding:10px 0; }
.steps li:last-child{ border-bottom:none; }
.n{ width:32px; height:32px; border-radius:999px; display:grid; place-items:center; background:#0f172a; border:1px solid #334155; font-weight:900; }
.tip{ margin:.5rem 0 0; color:#A5B4FC; font-weight:900; }

.benefits h3{ margin:.1rem 0 .4rem; }
.benefits ul{ margin:0; padding-left:18px; color:#eaf2ff; }
.benefits .mini{ margin-top:.6rem; color:#c7d2fe; }

/* Form */
.form h3{ margin:.1rem 0 .6rem; }
.row{ display:grid; grid-template-columns:1fr 1fr; gap:12px; }
@media (max-width:760px){ .row{ grid-template-columns:1fr; } }
.col, .block{ display:block; }
.col span, .block span, .lbl{ display:block; font-weight:1000; color:#FDE047; margin-bottom:6px; }
.input{
  width:100%; border:1px solid #3A4680; background:#0E162E; color:#fff; border-radius:12px; padding:.68rem .9rem; font-weight:800;
}
.input.bad{ box-shadow:0 0 0 2px rgba(239,68,68,.35) inset; border-color:#ef4444; }
.ta{ resize:vertical; min-height:120px; }

.choices{ display:flex; gap:8px; flex-wrap:wrap; }
.choice{ border:2px solid rgba(165,180,252,.55); color:#fff; background:transparent; padding:.55rem .9rem; border-radius:999px; font-weight:1000; }
.choice.on{ border-color:#5850EC; box-shadow:0 0 0 3px rgba(88,80,236,.25); }

.fakeFile{ border:2px dashed #41509A; border-radius:14px; padding:.8rem .9rem; background:#0C1430; color:#eaf2ff; }

.legal{ display:flex; align-items:flex-start; gap:10px; margin:10px 0; }
.legal span{ font-weight:900; color:#fff; }

.actions{ display:flex; gap:10px; flex-wrap:wrap; align-items:center; }
.helper{ margin-top:8px; color:#FDE047; font-weight:1000; }

/* CTA final */
.cta{ border-top:1px solid var(--bd); padding:20px 0 32px; text-align:center; }
.cta h2{ margin:.8rem 0 .2rem; }
.cta .link{ color:#FDE047; text-decoration:underline; }
.vision{ max-width:820px; margin:10px auto 14px; border:1px solid #2f3b60; border-radius:14px; padding:12px 14px; background:linear-gradient(180deg,var(--bg2),var(--bg)); color:#eaf2ff; }

/* Focus */
.btn:focus-visible, .chip:focus-visible, .choice:focus-visible, .input:focus-visible, select.input:focus-visible, textarea.input:focus-visible{
  outline:2px solid #22D3EE; outline-offset:2px;
}
`;