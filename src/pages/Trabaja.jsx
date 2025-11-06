// src/pages/Trabaja.jsx
import { useMemo, useRef, useState } from "react";
import logo from "../assets/img/Logos/lael-inst-blanco.png"; // mejor sobre fondo oscuro

const WAPP = "56964626568"; // WhatsApp Instituto Lael

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
  const [selectedArea, setSelectedArea] = useState(AREAS[0]);
  const formRef = useRef(null);

  const goForm = (area) => {
    setSelectedArea(area);
    // scroll suave al formulario
    requestAnimationFrame(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  return (
    <section className="work-page">
      <style>{css}</style>

      {/* HERO */}
      <header className="hero">
        <span className="badge">Convocatoria 2026</span>
        <img className="brand" src={logo} alt="Instituto Lael" />
        <h1>
          Trabaja con <span className="hl">Instituto Lael</span>
        </h1>
        <p className="lead">
          Súmate a un proyecto educativo con propósito. Buscamos docentes, creadores y perfiles de apoyo
          que quieran transformar la educación — 100% online, con acompañamiento real.
        </p>

        <div className="hero-cta">
          <a
            className="btn-primary"
            href="mailto:coordinacion@institutolael.cl?subject=Postulación Instituto Lael (Convocatoria 2026)"
          >
            Enviar CV por correo
          </a>
          <a
            className="btn-ghost"
            href={`https://wa.me/${WAPP}?text=${encodeURIComponent(
              "Hola 👋, quiero postular a Instituto Lael (Convocatoria 2026). ¿Me indican los pasos?"
            )}`}
            target="_blank"
            rel="noreferrer"
          >
            Hablar por WhatsApp
          </a>
        </div>

        {/* marquee infinito con áreas */}
        <div className="marquee" aria-label="Áreas abiertas">
          <div className="mq-track">
            {[...AREAS, ...AREAS, ...AREAS].map((a, i) => (
              <button
                key={`${a}-${i}`}
                className={"chip " + (selectedArea === a ? "on" : "")}
                onClick={() => goForm(a)}
                type="button"
              >
                {a}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* 3 razones (cards) */}
      <section className="blocks container">
        <ValueCard
          t="🎯 Impacto real"
          d="Acompañamos personas, no métricas. Tu trabajo cambia trayectorias."
        />
        <ValueCard
          t="💡 Innovación con sentido"
          d="Prototipamos, medimos y mejoramos: clases, contenidos y experiencia."
        />
        <ValueCard
          t="🤝 Cultura humana"
          d="Fe, servicio y respeto. Liderazgo cercano; equipo que cuida a las personas."
        />
      </section>

      {/* chips centrales (selector) */}
      <section className="selector container" aria-label="Selecciona área">
        <div className="chips-wrap">
          {AREAS.map((a) => (
            <button
              key={a}
              className={"chip big " + (selectedArea === a ? "on" : "")}
              onClick={() => goForm(a)}
              type="button"
            >
              {a}
            </button>
          ))}
        </div>
        <p className="honorarios">💬 Pago vía <b>boleta de honorarios</b>. Modalidad 100% online.</p>
      </section>

      {/* Proceso simple */}
      <section className="process container">
        <h2 className="h2">¿Cómo es el proceso?</h2>
        <ol className="steps">
          <li><span>1</span> Postula con tu CV y cuéntanos tu motivación.</li>
          <li><span>2</span> Conversamos 15–20 min: cultura, disponibilidad y fit.</li>
          <li><span>3</span> Demo breve: clase/caso práctico guiado.</li>
          <li><span>4</span> Onboarding con materiales, cuentas y acompañamiento.</li>
        </ol>
        <div className="tips">
          Consejo: comparte logros concretos (aprobación, materiales creados, feedback de estudiantes/líderes).
        </div>
      </section>

      {/* Form + beneficios (correo / WhatsApp / copiar) */}
      <section className="grid-two container" ref={formRef}>
        <FormPostulacion preselectedArea={selectedArea} onAreaChange={setSelectedArea} />
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

      {/* CTA final */}
      <footer className="cta">
        <div className="container">
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
              Instituto Lael fue fundado por <b>Diego Chaparro</b> con una visión simple:
              <b> acompañar de verdad</b> y abrir oportunidades reales con excelencia y dignidad.
            </p>
          </div>

          <div className="hero-cta">
            <a
              className="btn-ghost"
              href="mailto:coordinacion@institutolael.cl?subject=Postulación Instituto Lael (Convocatoria 2026)"
            >
              Postular por correo
            </a>
            <a
              className="btn-primary"
              href={`https://wa.me/${WAPP}?text=${encodeURIComponent(
                "Hola 👋, quiero postular a Instituto Lael (Convocatoria 2026). ¿Me indican los pasos?"
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
function ValueCard({ t, d }) {
  return (
    <article className="card val">
      <h3 className="ink">{t}</h3>
      <p className="ink-2">{d}</p>
    </article>
  );
}

function FormPostulacion({ preselectedArea, onAreaChange }) {
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState(preselectedArea || "Docencia PAES");
  const [availability, setAvailability] = useState("Part-time");
  const [message, setMessage] = useState("");
  const [legal, setLegal] = useState(false);

  // sincroniza cuando cambian chips
  useMemo(() => {
    setRole(preselectedArea);
  }, [preselectedArea]);

  const valid = useMemo(() => {
    const mailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail);
    return name.trim().length >= 2 && mailOk && legal;
  }, [name, mail, legal]);

  const buildSummary = () => {
    const lines = [
      "Postulación Instituto Lael — Convocatoria 2026",
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
      "💬 Pago vía boleta de honorarios.",
    ];
    return lines.join("\n");
  };

  const handleEmail = (e) => {
    e.preventDefault();
    if (!valid) return;
    const subject = `Postulación — ${role} — ${name}`;
    const href = `mailto:coordinacion@institutolael.cl?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(buildSummary())}`;
    window.location.href = href;
  };

  const handleWhatsapp = () => {
    const msg = buildSummary();
    const href = `https://wa.me/${WAPP}?text=${encodeURIComponent(msg)}`;
    window.open(href, "_blank", "noopener,noreferrer");
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(buildSummary());
      toast("Texto copiado. Pégalo en tu correo o WhatsApp ✅");
    } catch {
      prompt("Copia manualmente el texto:", buildSummary());
    }
  };

  return (
    <form className="form card" onSubmit={handleEmail} noValidate>
      <h3 className="ink">Postula aquí</h3>

      <div className="row">
        <div className="col">
          <label className="label">Nombre y apellido</label>
          <input
            className={"input " + (name.trim().length < 2 ? "warn" : "")}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Tu nombre"
            required
          />
        </div>
        <div className="col">
          <label className="label">Correo electrónico</label>
          <input
            className={"input " + (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail) ? "warn" : "")}
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
            onChange={(e) => {
              setRole(e.target.value);
              onAreaChange?.(e.target.value);
            }}
          >
            {AREAS.map((a) => (
              <option key={a}>{a}</option>
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
            <span className="ink">Se adjunta al abrir tu correo</span>
            <small className="good">También puedes enviarlo por WhatsApp</small>
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
          Completa nombre, correo y acepta la declaración para activar el envío ✉️
        </div>
      )}
    </form>
  );
}

/* mini toast */
function toast(msg) {
  const el = document.createElement("div");
  el.className = "toast";
  el.textContent = msg;
  document.body.appendChild(el);
  setTimeout(() => el.classList.add("show"), 10);
  setTimeout(() => {
    el.classList.remove("show");
    setTimeout(() => el.remove(), 250);
  }, 2200);
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

*{ box-sizing:border-box }
.work-page{ color:var(--ink); background:var(--bg1); }
.container{ max-width:1140px; margin:0 auto; padding:0 18px; }

/* HERO */
.hero{
  text-align:center; padding:64px 18px 28px;
  background:
    radial-gradient(900px 320px at 10% -12%, rgba(59,130,246,.16), transparent 60%),
    radial-gradient(900px 320px at 90% -14%, rgba(245,158,11,.12), transparent 60%);
  border-bottom:1px solid var(--bd);
  position:relative; overflow:hidden;
}
.badge{
  display:inline-block; padding:.28rem .6rem; border-radius:999px;
  border:1px solid #334155; color:#cbd5e1; font-weight:900; margin-bottom:10px;
  background:linear-gradient(180deg,#0F172A,#0B1220);
}
.hero .brand{ width:86px; margin:0 auto 10px; display:block; opacity:.9 }
.hero h1{ font-size:clamp(2rem, 3.2vw + .8rem, 3.2rem); margin:0 0 8px; }
.hero .hl{
  background-image: linear-gradient(90deg,#FCD34D,#F59E0B);
  -webkit-background-clip:text; background-clip:text; color:transparent;
}
.hero .lead{ max-width:70ch; margin:0 auto 18px; color:var(--ink2); font-size:1.04rem; }
.hero-cta{ display:flex; gap:10px; flex-wrap:wrap; justify-content:center; }

/* marquee infinito */
.marquee{ overflow:hidden; margin-top:14px; }
.mq-track{
  display:flex; gap:10px; white-space:nowrap;
  animation: slide 18s linear infinite;
  padding-bottom:6px;
}
@keyframes slide{
  from{ transform:translateX(0) } to{ transform:translateX(-50%) }
}

/* BOTONES */
.btn-primary,.btn-ghost{
  display:inline-flex; align-items:center; justify-content:center;
  padding:.78rem 1.1rem; border-radius:12px; font-weight:1000;
}
.btn-primary{ color:#0B1220; background:linear-gradient(180deg,#FCD34D,#F59E0B); border:1px solid #D97706; }
.btn-primary:hover{ filter:brightness(1.06); }
.btn-ghost{ color:#fff; border:1px solid #2f3b60; background:transparent; }
.btn-ghost:hover{ border-color:#3b82f6; }

/* chips */
.chip{
  border:1px solid #2b3656; border-radius:999px; padding:.48rem .9rem; font-weight:900;
  background:linear-gradient(180deg,#0F172A,#0B1220); color:#EAF2FF;
}
.chip.on{ box-shadow:0 0 0 2px rgba(99,102,241,.28) inset; border-color:#6b7cff; }
.chip.big{ padding:.6rem 1rem; }

/* cards */
.blocks{ display:grid; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); gap:16px; margin:26px 0 10px; }
.card{
  border:1px solid var(--bd); border-radius:16px; padding:18px;
  background:linear-gradient(180deg,var(--bg2),var(--bg1));
  box-shadow:0 16px 34px rgba(2,6,23,.38);
}
.card.val h3{ margin:0 0 6px; color:#FDE047; }
.card.val p{ margin:0; color:var(--ink2); }

/* selector central */
.selector{ margin:10px 0 2px; }
.chips-wrap{ display:flex; flex-wrap:wrap; justify-content:center; gap:10px; }
.honorarios{ text-align:center; margin:10px 0 0; color:#86EFAC; font-weight:900; }

/* proceso */
.process{ margin:22px 0 8px; }
.h2{ font-size:1.4rem; margin:0 0 10px; color:#A5B4FC; font-weight:1000; letter-spacing:.2px; }
.steps{
  margin:0; padding:12px 14px; border:1px dashed var(--bd); border-radius:14px;
  background:linear-gradient(180deg,#0F172A,#0B1220); color:var(--ink2);
  display:grid; gap:10px;
}
.steps li{ list-style:none; display:flex; align-items:center; gap:10px; }
.steps li span{
  width:26px; height:26px; display:grid; place-items:center; border-radius:999px;
  background:#111a33; border:1px solid #2b3656; font-weight:1000; color:#FDE047;
}
.tips{ margin-top:8px; font-weight:900; color:#A5B4FC; }

/* grid form + beneficios */
.grid-two{ display:grid; grid-template-columns: 1.15fr .85fr; gap:16px; margin:12px 0 22px; }
@media (max-width:980px){ .grid-two{ grid-template-columns:1fr; } }

.form.card{ padding:18px; }
.form h3{ margin:0 0 6px; }
.label{ display:block; font-weight:1000; margin-bottom:6px; color:#FDE047; }
.input{
  width:100%; border:1px solid #3A4680; background:#0E162E; color:#fff; border-radius:12px;
  padding:.68rem .9rem; font-weight:800;
}
.input.warn{ border-color:#DC2626; }
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

/* beneficios */
.benefits.card{ padding:18px; }
.benefits h3{ margin:0 0 6px; }
.benefit-list{ margin:0; padding-left:18px; color:var(--ink2); }
.benefit-list li{ margin:.3rem 0; font-weight:800; }
.mini-cta{ margin-top:10px; font-weight:900; color:#A5B4FC; }
.link{ color:#FDE047; text-decoration:underline; }
.link-strong{ color:#fff; font-weight:1000; }

/* CTA final */
.cta{
  text-align:center; margin-top:8px; padding:26px 0;
  background:
    linear-gradient(180deg, rgba(253,224,71,.08), transparent 18%),
    #0B1220;
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

/* accesibilidad + toast */
.btn-primary:focus-visible, .btn-ghost:focus-visible, .choice:focus-visible,
.input:focus-visible, select.input:focus-visible, textarea.input:focus-visible {
  outline:2px solid #22D3EE; outline-offset:2px;
}
.toast{
  position:fixed; left:50%; transform:translateX(-50%) translateY(10px);
  bottom:24px; background:#0f172a; color:#fff; border:1px solid #334155;
  border-radius:12px; padding:.6rem .9rem; opacity:0; transition:.25s; z-index:9999;
}
.toast.show{ opacity:1; transform:translateX(-50%) translateY(0); }
`;