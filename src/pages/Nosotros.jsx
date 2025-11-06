// src/pages/Nosotros.jsx
import { Link } from "react-router-dom";
import id1 from "../assets/img/lael/1.png";
import id2 from "../assets/img/lael/2.png";
import id3 from "../assets/img/lael/3.png";

export default function Nosotros(){
  return (
    <section className="about">
      <style>{css}</style>

      {/* HERO */}
      <header className="hero">
        <div className="container hero__inner">
          <div className="hero__copy">
            <span className="kicker">Sobre nosotros</span>
            <h1 className="title">
              Instituto <span className="grad">Lael</span>
            </h1>

            <p className="lead">
              Nacimos como <strong>Preu Lael</strong> para ordenar el estudio PAES con acompañamiento real.
              Hoy, como <strong>Instituto Lael</strong>, sumamos <strong>Idiomas</strong> y <strong>LSCh</strong>.
              Mismo foco: claridad, seguimiento y respeto por las personas.
            </p>

            <p className="lead small-up">
              Diseñamos procesos <strong>simples y medibles</strong>: clases en vivo, cápsulas,
              metas por semana y retroalimentación concreta.
            </p>

            <div className="cta">
              <Link className="btn btn-primary" to="/inscripcion">Inscribirme</Link>
              <Link className="btn btn-ghost" to="/paes">Ver programas</Link>
            </div>
          </div>

          <ul className="hero__stats" aria-label="Indicadores principales">
            <Stat n="+3.000" l="Estudiantes" />
            <Stat n="87%"   l="Ingreso/Aprobación" />
            <Stat n="4.8/5" l="Satisfacción" />
          </ul>
        </div>
        <div className="hero__shine" aria-hidden />
      </header>

      {/* PROPÓSITO */}
      <section className="section purpose-strip">
        <div className="container purpose">
          <h2 className="h center">Nuestro propósito</h2>
          <p className="sub center">
            Acompañamos con método y respeto. Enseñamos claro. <strong>Medimos resultados</strong> para mejorar.
          </p>
          <div className="purpose-points">
            <MiniCard title="Servicio primero" color="blue">
              Precios claros, trato digno y foco en lo importante.
            </MiniCard>
            <MiniCard title="Acompañamiento real" color="green">
              Clases en vivo + cápsulas, plan semanal y feedback útil.
            </MiniCard>
            <MiniCard title="Inclusión práctica" color="rose">
              Programas LSCh con cultura humana y respetuosa.
            </MiniCard>
          </div>
        </div>
      </section>

      {/* FUNDADOR (institucional, sin foto) */}
      <section className="section">
        <div className="container founder card">
          <div className="pad founder__grid founder__grid--noimg">
            <div className="founder__copy">
              <span className="chip">Fundación del proyecto</span>
              <h2 className="h">Origen y criterio</h2>
              <p className="intro">
                Convertimos años de experiencia docente en un sistema simple:
                <strong> nadie aprende solo</strong> y el método importa.
              </p>
              <blockquote className="q">
                “Propósito sin orden no alcanza. Orden y seguimiento, sin propósito, tampoco.
                En Lael unimos ambos para que estudiar sea posible y medible.”
              </blockquote>
              <ul className="mini-list">
                <li>Clases claras, sin relleno.</li>
                <li>Metas semanales y seguimiento.</li>
                <li>Respeto por el tiempo y el proceso de cada persona.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* IDENTIDAD */}
      <section className="section">
        <div className="container">
          <h2 className="h center">Nuestra identidad</h2>
          <p className="sub center">Símbolos que nos recuerdan el para qué.</p>

          <div className="id-grid">
            <IdCard
              img={id1}
              t="Cobertura y cuidado"
              s="El isotipo abraza. Nuestro trabajo sostiene y ordena procesos que cuestan hacer solos."
              accent="blue"
            />
            <IdCard
              img={id2}
              t="¿Qué significa LAEL?"
              s='Del hebreo “de Dios / perteneciente a Dios”. Inspiración para servir con integridad y respeto.'
              accent="green"
            />
            <IdCard
              img={id3}
              t="La paloma"
              s="Inicio y esperanza. Acompañamos cambios reales, paso a paso."
              accent="yellow"
            />
          </div>
        </div>
      </section>

      {/* HISTORIA */}
      <section className="section soft">
        <div className="container">
          <h2 className="h center">De Preu Lael a Instituto Lael</h2>
          <p className="sub center">Más rutas, mismo corazón.</p>

          <div className="hl-flow" role="list" aria-label="Línea evolutiva">
            <FlowItem title="Preu Lael" color="blue">
              Orden para PAES con plan simple, ensayos y tutoreo.
            </FlowItem>
            <FlowArrow />
            <FlowItem title="Expansión" color="green">
              Sumamos Idiomas y LSCh, grabaciones y cápsulas.
            </FlowItem>
            <FlowArrow />
            <FlowItem title="Instituto Lael" color="rose">
              Trayectorias por competencias y programas para personas y empresas.
            </FlowItem>
          </div>
        </div>
      </section>

      {/* PRINCIPIOS */}
      <section className="section">
        <div className="container">
          <div className="vision">
            <div className="v-copy">
              <h2 className="h center">Principios de trabajo</h2>
              <p className="intro center">
                Claridad, seguimiento y resultados. Lo demás estorba.
              </p>
            </div>
            <div className="v-cards">
              <Pill title="Acompañamiento" text="Estás acompañado/a en todo el proceso." accent="blue" />
              <Pill title="Accesibilidad" text="Calidad con precios justos." accent="green" />
              <Pill title="Respeto" text="Sin elitismos; cada persona importa." accent="rose" />
              <Pill title="Propósito" text="Hacemos bien las cosas, de verdad." accent="yellow" />
              <Pill title="Métricas" text="Metas y ajustes a tiempo." accent="orange" />
              <Pill title="Comunidad" text="Celebramos avances y sostenemos el ritmo." accent="purple" />
            </div>
          </div>
        </div>
      </section>

      {/* SOMOS / NO SOMOS */}
      <section className="section soft">
        <div className="container two">
          <article className="card tone-ok">
            <div className="pad">
              <h3>Lo que sí somos</h3>
              <ul>
                <li>Equipo que <strong>escucha</strong> y guía.</li>
                <li>Docentes que <strong>explican simple</strong> y exigen con sentido.</li>
                <li>Procesos con <strong>método</strong> y buen trato.</li>
              </ul>
            </div>
          </article>

          <article className="card tone-warn">
            <div className="pad">
              <h3>Lo que no somos</h3>
              <p className="strong">
                No adoctrinamos ni imponemos creencias. Venimos a <strong>sumar</strong> herramientas.
              </p>
              <ul>
                <li>Sin imposiciones religiosas.</li>
                <li>Sin condicionamientos por convicciones.</li>
                <li>Sin discriminación.</li>
              </ul>
            </div>
          </article>
        </div>
      </section>

      {/* CÓMO TRABAJAMOS */}
      <section className="section">
        <div className="container">
          <h2 className="h center">Cómo trabajamos</h2>
          <div className="steps">
            <Step n="1" t="Diagnóstico" c="blue">
              Punto de partida, brechas y meta realista.
            </Step>
            <Step n="2" t="Plan semanal" c="green">
              Clases en vivo + cápsulas y ritmo claro.
            </Step>
            <Step n="3" t="Seguimiento" c="yellow">
              Checkpoints, WhatsApp y feedback útil.
            </Step>
            <Step n="4" t="Resultados" c="rose">
              Ensayos y ajustes a tiempo. Nada al azar.
            </Step>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="section last">
        <div className="container">
          <div className="cta-panel">
            <h3 className="cta-title">¿Te sumas?</h3>
            <p className="cta-sub">Postula hoy. Caminamos contigo el proceso completo.</p>
            <div className="cta-actions">
              <Link className="btn btn-primary" to="/inscripcion">Inscribirme</Link>
              <Link className="btn btn-ghost" to="/paes">Ver programas</Link>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}

/* ---------- Subcomponentes ---------- */
function Stat({ n, l }) {
  return (
    <li className="stat">
      <span className="v">{n}</span>
      <span className="l">{l}</span>
    </li>
  );
}

function MiniCard({ title, children, color = "blue" }){
  return (
    <div className={`pp card shade-${color}`}>
      <div className="pad">
        <h4>{title}</h4>
        <p>{children}</p>
      </div>
    </div>
  );
}

function IdCard({ img, t, s, accent = "blue" }){
  return (
    <article className={`id card accent-${accent}`}>
      <div className="media">
        <img src={img} alt={t} loading="lazy" decoding="async" />
      </div>
      <div className="body">
        <h3>{t}</h3>
        <p>{s}</p>
      </div>
    </article>
  );
}

function FlowItem({ title, children, color = "blue" }){
  return (
    <div className={`flow-item accent-${color}`} role="listitem">
      <div className="flow-title">{title}</div>
      <div className="flow-text">{children}</div>
    </div>
  );
}
function FlowArrow(){
  return <div className="flow-arrow" aria-hidden>→</div>;
}

function Pill({ title, text, accent = "blue" }){
  return (
    <div className={`pill card accent-${accent}`}>
      <div className="pad">
        <h4>{title}</h4>
        <p>{text}</p>
      </div>
    </div>
  );
}

function Step({ n, t, c = "blue", children }) {
  return (
    <div className={`step card accent-${c}`}>
      <div className="num" aria-hidden>{n}</div>
      <div className="content">
        <h4>{t}</h4>
        <p>{children}</p>
      </div>
    </div>
  );
}

/* ---------- CSS (alineado con Empresas) ---------- */
const css = `
:root{
  /* Paleta y tokens compartidos */
  --accent:#facc15; --accent-dark:#E0B90F; --accent-press:#C9A60E; --focus:#22d3ee;
  --blue:#3b549d; --green:#249554; --yellow:#f2ce3d; --rose:#d6a0c5; --orange:#cd5732;
  --bg:#0b1220; --panel:#0e1424; --soft:#0d1528; --bd:#1f2a44;
  --ink:#ffffff; --ink2:#eaf2ff; --muted:#cbd5e1;
  --rad-lg:20px; --rad-md:14px;
  --shadow:0 24px 48px rgba(2,6,23,.32);
}
*{box-sizing:border-box}
.container{ max-width:1120px; margin:0 auto; padding:0 18px; }
.section{ padding:56px 0; position:relative; }
.section + .section{ padding-top:64px; } /* ritmo vertical consistente */
.section.soft{
  background:
    radial-gradient(900px 300px at 10% -8%, color-mix(in srgb, var(--blue) 16%, transparent), transparent 60%),
    radial-gradient(900px 300px at 90% -8%, color-mix(in srgb, var(--green) 12%, transparent), transparent 60%);
  border-block:1px solid #1a2440;
}
.section.last{ padding:56px 0 96px }
h1,h2,h3,h4{ color:var(--ink) }

/* HERO */
.about .hero{
  position:relative; padding:68px 0 52px; border-bottom:1px solid #1a2440;
  background:
    radial-gradient(900px 320px at 8% -10%, color-mix(in srgb, var(--blue) 28%, transparent), transparent 60%),
    radial-gradient(880px 280px at 95% -12%, color-mix(in srgb, var(--green) 20%, transparent), transparent 60%);
}
.hero__inner{ display:grid; grid-template-columns:1.1fr .9fr; gap:32px; align-items:center; }
@media (max-width:980px){ .hero__inner{ grid-template-columns:1fr } }

.kicker{ color:#c7d2fe; font-weight:800; letter-spacing:.3px; }
.title{ margin:.2rem 0 .3rem; font-size:clamp(2.2rem, 4vw, 3rem); line-height:1.08; }
.grad{ background: linear-gradient(120deg,var(--blue),var(--rose)); -webkit-background-clip:text; background-clip:text; color:transparent; }
.lead{ color:var(--ink2); margin:12px 0 20px; line-height:1.6; }
.lead.small-up{ margin-top:2px; }
.cta{ display:flex; gap:12px; flex-wrap:wrap }

/* Botones (mismos que Empresas) */
.btn{
  display:inline-flex; align-items:center; justify-content:center;
  gap:8px; padding:.78rem 1.05rem; border-radius:12px; border:2px solid transparent;
  text-decoration:none; font-weight:850; transition:.18s transform ease, .18s box-shadow ease, .18s background ease, .18s border-color ease;
}
.btn:focus-visible{ outline:3px solid var(--focus); outline-offset:2px; }
.btn-primary{ background:var(--accent); color:#111; border-color:var(--accent-dark); box-shadow:0 8px 22px rgba(250,204,21,.28); }
.btn-primary:hover{ background:var(--accent-dark); }
.btn-primary:active{ background:var(--accent-press); transform:translateY(1px); box-shadow:none; }
.btn-ghost{ border:1px solid var(--ink2); color:var(--ink2); background:transparent; }
.btn-ghost:hover{ background:rgba(255,255,255,.08); }

/* Stats */
.hero__stats{
  list-style:none; margin:0; padding:0;
  display:grid; grid-template-columns:repeat(3,1fr); gap:14px;
}
@media (max-width:680px){ .hero__stats{ grid-template-columns:1fr 1fr; } }
.stat{
  border:1px solid #2b3656; border-radius:16px; padding:16px;
  background:linear-gradient(180deg,#0f172a,#0b1220);
  text-align:center; color:var(--ink); box-shadow:var(--shadow);
}
.stat .v{ font-size:1.28rem; font-weight:900; display:block; }
.stat .l{ font-size:1rem; color:var(--ink2); }

/* Shine */
.hero__shine{
  position:absolute; inset:0; pointer-events:none;
  background: radial-gradient(1200px 260px at 50% 0%, rgba(255,255,255,.06), transparent 60%);
}

/* Textos base */
.h{ margin:0 0 12px; font-size:1.7rem; line-height:1.2; color:var(--ink) }
.center{ text-align:center }
.sub{ color:var(--ink2); margin:0 0 22px; text-align:center; }

/* Card base */
.card{
  border:1px solid #243153; border-radius:var(--rad-lg);
  background:
    radial-gradient(540px 200px at -10% -8%, rgba(255,255,255,.06), transparent 60%),
    linear-gradient(180deg,#0f172a,#0b1220);
  box-shadow:var(--shadow);
  color:var(--ink);
}
.pad{ padding:18px; }

/* Acentos / sombras */
.accent-blue{ outline:1px solid color-mix(in srgb, var(--blue), #fff 20%); }
.accent-green{ outline:1px solid color-mix(in srgb, var(--green), #fff 20%); }
.accent-yellow{ outline:1px solid color-mix(in srgb, var(--yellow), #fff 12%); }
.accent-rose{ outline:1px solid color-mix(in srgb, var(--rose), #fff 18%); }
.accent-orange{ outline:1px solid color-mix(in srgb, var(--orange), #fff 18%); }
.accent-purple{ outline:1px solid #6d28d955; }
.shade-blue{ box-shadow:0 12px 26px color-mix(in srgb, var(--blue), transparent 78%); }
.shade-green{ box-shadow:0 12px 26px color-mix(in srgb, var(--green), transparent 78%); }
.shade-rose{ box-shadow:0 12px 26px color-mix(in srgb, var(--rose), transparent 78%); }

/* Propósito */
.purpose-strip{ padding-top:42px; padding-bottom:42px; }
.purpose-points{ display:grid; grid-template-columns:repeat(3,1fr); gap:18px; margin-top:12px; }
@media (max-width:980px){ .purpose-points{ grid-template-columns:1fr; } }
.pp h4{ margin:.15rem 0 .35rem; color:var(--ink) }
.pp p{ margin:0; color:var(--ink2) }

/* Fundador (sin imagen) */
.founder__grid{ display:grid; grid-template-columns:1fr; }
.founder .chip{
  display:inline-block; padding:.25rem .6rem; border-radius:999px; font-weight:700;
  background:#101a2f; border:1px solid #2a3b66; color:var(--ink2);
}
.founder .intro{ margin:.2rem 0 .6rem; color:var(--ink); font-size:1.02rem; }
.founder .q{
  margin:.2rem 0 .6rem; padding:.6rem .8rem; border-left:3px solid var(--blue); background:#0c1630; border-radius:8px; color:var(--ink);
}
.founder .mini-list{ margin:.3rem 0 0; padding-left:18px; color:var(--ink); }

/* Identidad */
.id-grid{ display:grid; grid-template-columns:repeat(3,1fr); gap:18px; margin-top:22px }
@media (max-width:980px){ .id-grid{ grid-template-columns:1fr } }
.id.card .media{ aspect-ratio:1.35/1; background:#0b1220; display:grid; place-items:center }
.id.card img{ max-width:100%; max-height:100%; object-fit:contain; filter: drop-shadow(0 6px 14px rgba(16,24,40,.45)) }
.id.card .body{ padding:18px; }
.id.card .body h3{ margin:.2rem 0 .35rem; color:var(--ink) }
.id.card .body p{ margin:0; color:var(--ink2); font-size:1.02rem; }

/* Historia */
.hl-flow{ display:grid; grid-template-columns:1fr auto 1fr auto 1fr; gap:12px; align-items:stretch; margin-top:16px; }
@media (max-width:980px){ .hl-flow{ grid-template-columns:1fr; } .flow-arrow{ display:none } }
.flow-item{
  border:1px solid #22314f; border-radius:16px; background:linear-gradient(180deg,#0f172a,#0b1220);
  padding:16px; color:var(--ink);
}
.flow-title{ font-weight:800; margin:0 0 6px; }
.flow-text{ margin:0; line-height:1.55; color:var(--ink2); }
.flow-arrow{ display:grid; place-items:center; font-weight:900; font-size:1.6rem; color:var(--ink); padding:0 6px; }

/* Visión */
.vision{
  border:1px solid #22314f; border-radius:20px; padding:22px;
  background:
    radial-gradient(600px 240px at -8% -10%, color-mix(in srgb, var(--blue) 18%, transparent), transparent 60%),
    radial-gradient(600px 240px at 108% -10%, color-mix(in srgb, var(--green) 16%, transparent), transparent 60%),
    linear-gradient(180deg,#0f172a,#0b1220);
  color:var(--ink);
}
.vision .intro{ margin:.2rem 0 16px; color:var(--ink2); }
.v-cards{ display:grid; grid-template-columns:repeat(3,1fr); gap:18px; }
@media (max-width:980px){ .v-cards{ grid-template-columns:1fr 1fr } }
@media (max-width:640px){ .v-cards{ grid-template-columns:1fr } }

/* Pill */
.pill{ display:flex; align-items:center; justify-content:center; text-align:center; min-height:140px; }
.pill .pad{ padding:14px 14px 16px; width:100%; max-width:520px; margin:0 auto; }
.pill h4{ margin:.06rem 0 .25rem; color:var(--ink); font-size:1.04rem; line-height:1.25; font-weight:900; }
.pill p{ margin:0; color:var(--ink2); font-size:.98rem; line-height:1.45; }

/* Somos / No somos */
.two{ display:grid; grid-template-columns:1fr 1fr; gap:18px }
@media (max-width:900px){ .two{ grid-template-columns:1fr } }
.tone-ok{ border-color: color-mix(in srgb, var(--green), #fff 10%); background:linear-gradient(180deg,#0f172a,#0b1a16); }
.tone-warn{ border-color: color-mix(in srgb, var(--orange), #fff 12%); background:linear-gradient(180deg,#0f172a,#1a0f14); }
.two h3{ margin:.2rem 0 .5rem; text-align:center; }
.two ul{ margin:.4rem 0 0; padding-left:18px; }

/* Steps */
.steps{ margin-top:18px; display:grid; grid-template-columns:1fr 1fr; gap:18px; }
@media (max-width:980px){ .steps{ grid-template-columns:1fr } }
.step{ display:grid; grid-template-columns:64px 1fr; gap:14px; align-items:flex-start; padding:16px; }
.step .num{
  width:56px; height:56px; display:grid; place-items:center; border-radius:14px;
  background:#101a2f; border:1px solid #2a3b66; font-weight:900; font-size:1.1rem; color:var(--ink);
}
.step h4{ margin:.15rem 0 .25rem; }
.step p{ margin:0; color:var(--ink2); }

/* CTA final */
.cta-panel{
  text-align:center; border:1px solid #22314f; border-radius:22px; padding:28px; color:var(--ink);
  background:
    radial-gradient(560px 260px at 14% -8%, color-mix(in srgb, var(--blue) 24%, transparent), transparent 60%),
    radial-gradient(560px 260px at 86% -8%, color-mix(in srgb, var(--green) 20%, transparent), transparent 60%),
    linear-gradient(180deg,#0b1220,#101a2f);
  box-shadow:0 30px 60px rgba(2,6,23,.42);
}
.cta-title{ margin:.1rem 0 .35rem; font-size:1.5rem; }
.cta-sub{ margin:0 0 12px; color:var(--ink2); }
.cta-actions{ display:flex; gap:12px; justify-content:center; flex-wrap:wrap; }

/* Accesibilidad foco */
button:focus-visible, .btn:focus-visible, a:focus-visible, select:focus-visible{
  outline:2px solid var(--focus); outline-offset:2px;
}
`;