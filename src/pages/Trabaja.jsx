// src/pages/Trabaja.jsx
import { useMemo, useState } from "react";
import logo from "../assets/img/Logos/lael-inst-naranja.png";

const WAPP = "56964626568"; // WhatsApp Instituto Lael

export default function Trabaja() {
  return (
    <section className="work-page">
      <style>{css}</style>

      {/* HERO */}
      <header className="hero">
        <img className="brand" src={logo} alt="Instituto Lael" />
        <h1>
          Trabaja con <span className="hl">Instituto Lael</span>
        </h1>
        <p className="lead">
          Súmate a un proyecto educativo con propósito. Buscamos docentes, creadores y
          perfiles de apoyo que quieran transformar la educación — desde cualquier lugar de Chile,
          con acompañamiento real.
        </p>
        <div className="cta-hero">
          <a
            className="btn-primary"
            href="mailto:coordinacion@institutolael.cl?subject=Postulación Instituto Lael"
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
      </header>

      {/* VALOR */}
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

      {/* ÁREAS ABIERTAS */}
      <section className="areas">
        <h2 className="title">Áreas abiertas</h2>
        <div className="chips">
          <span className="chip acc-indigo">Docencia PAES (M1/M2/Leng/Hist/Cs)</span>
          <span className="chip acc-green">Idiomas (Inglés, Coreano, Portugués)</span>
          <span className="chip acc-indigo">Lengua de Señas Chilena (LSCh)</span>
          <span className="chip acc-amber">Diseño & Marketing</span>
          <span className="chip acc-amber">Producción de Contenido</span>
          <span className="chip acc-indigo">Administración & Soporte</span>
          <span className="chip acc-green">Voluntariado</span>
        </div>
        <p className="note">
          Ideal: <b>papeles al día</b> para contratación legal. Valoramos vocación, ética y ganas de aprender.
        </p>
      </section>

      {/* PROCESO */}
      <section className="process">
        <h2 className="title">¿Cómo es el proceso?</h2>
        <ol className="steps">
          <li><b>1. Postula</b> con tu CV y cuéntanos tu motivación.</li>
          <li><b>2. Conversamos</b> (15–20 min): cultura, disponibilidad y fit.</li>
          <li><b>3. Demo breve</b>: clase/caso práctico guiado.</li>
          <li><b>4. Onboarding</b> con materiales, cuentas y acompañamiento.</li>
        </ol>
        <div className="tips">
          Consejo: comparte logros concretos (aprobación, materiales creados, feedback de estudiantes/líderes).
        </div>
      </section>

      {/* FORM + BENEFICIOS (todo sale por correo o WhatsApp) */}
      <section className="grid-two">
        <FormPostulacion />
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

      {/* TESTIMONIOS */}
      <section className="testi">
        <div className="t-grid">
          <blockquote className="q">
            “Entré como profe de M1. Hoy coordino un track completo.
            Te escuchan y puedes proponer.” <span>— Anto, Docencia PAES</span>
          </blockquote>
          <blockquote className="q">
            “Me dieron estructura para mis clases y libertad creativa para mejorar.
            El equipo está realmente.” <span>— Diego, Idiomas</span>
          </blockquote>
          <blockquote className="q">
            “Aprendí LSCh enseñando en comunidad. No es solo trabajo: es propósito.”
            <span>— Isidora, LSCh</span>
          </blockquote>
        </div>
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
            Instituto Lael fue fundado por <b>Diego Chaparro</b> con una visión simple:
            <b> acompañar de verdad</b> y abrir oportunidades reales con excelencia y dignidad.
          </p>
        </div>

        <div className="cta-hero">
          <a
            className="btn-ghost"
            href="mailto:coordinacion@institutolael.cl?subject=Postulación Instituto Lael"
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

/* ---------- Subcomponentes ---------- */
function ValueCard({ t, children }) {
  return (
    <article className="card">
      <h3 className="ink">{t}</h3>
      <p className="ink-2">{children}</p>
    </article>
  );
}

function FormPostulacion() {
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("Docencia PAES");
  const [availability, setAvailability] = useState("Part-time");
  const [message, setMessage] = useState("");
  const [legal, setLegal] = useState(false);

  const valid = useMemo(() => {
    const mailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail);
    return name.trim().length >= 2 && mailOk && legal;
  }, [name, mail, legal]);

  const buildSummary = () => {
    const lines = [
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
      "⚠️ Recuerda adjuntar tu CV al enviar este mensaje.",
    ];
    return lines.join("\n");
  };

  const handleEmail = (e) => {
    e.preventDefault();
    if (!valid) return;
    const subject = `Postulación - ${role} - ${name}`;
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
      alert("Texto copiado. Pégalo en tu correo o WhatsApp ✅");
    } catch {
      // fallback simple
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
            className="input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Tu nombre"
            required
          />
        </div>
        <div className="col">
          <label className="label">Correo electrónico</label>
          <input
            className="input"
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
            <option>Docencia PAES</option>
            <option>Idiomas</option>
            <option>Lengua de Señas Chilena (LSCh)</option>
            <option>Diseño & Marketing</option>
            <option>Producción de Contenido</option>
            <option>Administración & Soporte</option>
            <option>Voluntariado</option>
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
          Completa <b>Nombre</b>, <b>Correo</b> y acepta la declaración de papeles al día.
        </div>
      )}
    </form>
  );
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
  text-align:center; padding:52px 18px 38px;
  background:
    radial-gradient(900px 300px at 12% -8%, rgba(88,80,236,.22), transparent 60%),
    radial-gradient(900px 300px at 88% -8%, rgba(22,163,74,.20), transparent 60%);
  border-bottom:1px solid var(--bd);
}
.hero .brand{ width:92px; margin-bottom:16px; display:block; margin-left:auto; margin-right:auto; }
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

/* Cards de valor */
.blocks{ display:grid; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); gap:16px; margin:22px 0 8px; padding:0 18px; }
.card{
  border:1px solid var(--bd); border-radius:16px; padding:18px;
  background:linear-gradient(180deg,var(--bg2),var(--bg1));
  box-shadow:0 16px 34px rgba(2,6,23,.38);
}
.card h3{ margin:0 0 6px; color:#FDE047; }
.card p{ margin:0; color:var(--ink2); }

/* Áreas */
.areas{ text-align:center; margin:26px 18px 6px; }
.areas .title{ font-size:1.4rem; margin-bottom:14px; color:#A5B4FC; font-weight:1000; letter-spacing:.2px; }
.chips{ display:flex; flex-wrap:wrap; justify-content:center; gap:10px; margin-bottom:10px; }
.chip{
  border:1px solid rgba(255,255,255,.22);
  border-radius:999px; padding:.5rem 1rem; font-weight:900; color:#fff;
  background: linear-gradient(180deg,#0F172A,#0B1220);
}
.acc-indigo{ outline:1px solid rgba(88,80,236,.35); }
.acc-green { outline:1px solid rgba(22,163,74,.35); }
.acc-amber { outline:1px solid rgba(245,158,11,.35); }
.note{ color:#86EFAC; font-weight:900; }

/* Proceso */
.process{ margin:18px 18px 8px; }
.process .title{ font-size:1.2rem; color:#FDE047; margin:0 0 8px; font-weight:1000; }
.steps{
  margin:0; padding:12px 14px 12px 24px;
  border:1px dashed var(--bd); border-radius:14px; background:linear-gradient(180deg,#0F172A,#0B1220);
  color:var(--ink2);
}
.steps li{ margin:.25rem 0; }
.tips{ margin-top:8px; font-weight:900; color:#A5B4FC; }

/* Grid formulario + beneficios */
.grid-two{ display:grid; grid-template-columns: 1.2fr .8fr; gap:16px; padding:0 18px; margin-top:10px; }
@media (max-width:980px){ .grid-two{ grid-template-columns:1fr; } }

.form.card{ padding:18px; }
.form h3{ margin:0 0 6px; }
.label{ display:block; font-weight:1000; margin-bottom:6px; color:#FDE047; }
.input{
  width:100%; border:1px solid #3A4680; background:#0E162E; color:#fff; border-radius:12px;
  padding:.68rem .9rem; font-weight:800;
}
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
.benefits.card{ padding:18px; }
.benefits h3{ margin:0 0 6px; }
.benefit-list{ margin:0; padding-left:18px; color:#EAF2FF; }
.benefit-list li{ margin:.3rem 0; font-weight:800; }
.mini-cta{ margin-top:10px; font-weight:900; color:#A5B4FC; }
.link{ color:#FDE047; text-decoration:underline; }
.link-strong{ color:#fff; font-weight:1000; }

/* Testimonios */
.testi{ padding:18px; }
.t-grid{ display:grid; grid-template-columns: repeat(3, minmax(0,1fr)); gap:12px; }
@media (max-width:900px){ .t-grid{ grid-template-columns:1fr; } }
.q{
  margin:0; padding:14px; border-radius:14px; border:1px solid var(--bd);
  background: linear-gradient(180deg,#0F172A,#0B1220); color:#fff; font-weight:800;
}
.q span{ display:block; margin-top:6px; color:#86EFAC; font-weight:900; }

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
.input:focus-visible, select.input:focus-visible, textarea.input:focus-visible {
  outline:2px solid #22D3EE; outline-offset:2px;
}
`;