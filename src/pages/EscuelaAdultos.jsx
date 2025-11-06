// src/pages/EscuelaAdultos.jsx
import { Link } from "react-router-dom";
import hero from "../assets/img/lael/onboarding.jpg";
import img1 from "../assets/img/lael/study-online.jpg";
import img2 from "../assets/img/lael/hs.jpg";
import img3 from "../assets/img/lael/inclusion.jpg";

export default function EscuelaAdultos(){
  return (
    <section className="adulto">
      <style>{css}</style>

      {/* HERO */}
      <header className="hero">
        <div className="container hero__inner">
          <div className="hero__copy">
            <span className="kicker">Escuela para Adultos Lael</span>
            <h1 className="title">
              Termina tus estudios <span className="grad">con apoyo real</span>
            </h1>

            <p className="lead">
              Para personas <strong>18+</strong> que necesitan completar la Básica o Media, 
              incluyendo quienes salen de contextos complejos (p. ej., <strong>cárcel</strong>) y 
              jóvenes que dejan <strong>homeschool</strong> al cumplir 18. 
              <br />Clases en la <strong>tarde</strong>, 100% online, <strong>en vivo</strong> (y quedan grabadas).
            </p>

            <div className="cta">
              <a
                className="btn btn-primary"
                href="https://wa.me/56964626568?text=Hola%20%F0%9F%91%8B%20quiero%20terminar%20mis%20estudios%20en%20la%20Escuela%20para%20Adultos%20Lael"
                target="_blank" rel="noreferrer"
              >
                Hablar por WhatsApp
              </a>
              <Link className="btn btn-ghost" to="/inscripcion">Preinscribirme</Link>
            </div>

            <ul className="chips">
              <li>Horarios PM</li>
              <li>Clases en vivo (con grabación)</li>
              <li>Ajustado a Exámenes Libres</li>
              <li>Plan personalizado</li>
            </ul>
          </div>
        </div>

        <div className="hero__img" aria-hidden>
          <img src={hero} alt="" />
          <div className="fade" />
        </div>
      </header>

      {/* QUIÉNES / MODALIDAD */}
      <section className="section">
        <div className="container grid3">
          <Card title="¿A quién va dirigido?" img={img1}>
            <ul>
              <li>Adultos que no completaron la enseñanza Básica o Media.</li>
              <li>Jóvenes que pasan de <strong>homeschool</strong> a formato adulto (18+).</li>
              <li>Personas en proceso de <strong>reinserción educativa</strong> (p. ej., post-cárcel).</li>
            </ul>
          </Card>

          <Card title="Modalidad y horarios" img={img2}>
            <ul>
              <li>100% online. <strong>En vivo</strong> y quedan grabadas.</li>
              <li>Horarios <strong>tarde/noche</strong> para compatibilizar trabajo y familia.</li>
              <li>Acompañamiento semanal + seguimiento de avance.</li>
            </ul>
          </Card>

          <Card title="Enfoque y respaldo" img={img3}>
            <ul>
              <li>Contenidos alineados a <strong>Exámenes Libres</strong> (Mineduc).</li>
              <li>Rúbricas claras y metas por tramo.</li>
              <li>Reportes de asistencia y progreso.</li>
            </ul>
          </Card>
        </div>
      </section>

      {/* RUTAS DE TERMINALIDAD */}
      <section className="section soft">
        <div className="container">
          <h2 className="h center">Elige tu ruta</h2>
          <p className="sub center">Planificamos según tu tramo y fecha de rendición.</p>

          <div className="routes">
            <RouteBox n="Básica completa">
              Para quienes necesitan completar 1° a 8° básico. 
              <strong> Alfabetización académica</strong>, cálculo base y comprensión lectora.
            </RouteBox>

            <RouteBox n="1° y 2° Medio">
              Refuerzo de bases, matemáticas y lenguaje aplicados, ciencias y estudios sociales.
            </RouteBox>

            <RouteBox n="3° y 4° Medio">
              Preparación focalizada a Exámenes Libres. <strong>Ensayos</strong> y ajustes a tiempo.
            </RouteBox>
          </div>
        </div>
      </section>

      {/* CÓMO FUNCIONA */}
      <section className="section">
        <div className="container">
          <h2 className="h center">Cómo funciona</h2>
          <div className="steps">
            <Step n="1" t="Diagnóstico">
              Medimos tu punto de partida y definimos meta realista.
            </Step>
            <Step n="2" t="Plan semanal">
              Calendario de clases en vivo + actividades corregidas.
            </Step>
            <Step n="3" t="Seguimiento">
              Checkpoints, asistencia y feedback útil (con grabaciones).
            </Step>
            <Step n="4" t="Rendición">
              Ensayos, simulacros y checklist para Exámenes Libres.
            </Step>
          </div>
        </div>
      </section>

      {/* BECAS / APOYOS (selectivo) */}
      <section className="section">
        <div className="container">
          <div className="aid card">
            <div className="pad">
              <h3 className="h">Apoyos y becas (caso a caso)</h3>
              <p className="intro">
                Podemos evaluar <strong>apoyos económicos</strong> según tu situación
                (prioridad para reinserción y jefas de hogar). No son becas masivas: 
                revisamos cada caso con cuidado.
              </p>
              <div className="aid-actions">
                <a
                  className="btn btn-primary"
                  href="https://wa.me/56964626568?text=Quiero%20postular%20a%20apoyos%20econ%C3%B3micos%20de%20Escuela%20para%20Adultos%20Lael"
                  target="_blank" rel="noreferrer"
                >
                  Consultar por apoyo
                </a>
                <Link className="btn btn-ghost" to="/inscripcion">Preinscribirme</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ cortito */}
      <section className="section">
        <div className="container faq">
          <div className="qa">
            <h4>¿Puedo trabajar y estudiar?</h4>
            <p>Sí. Las clases son PM y quedan grabadas para repasar.</p>
          </div>
          <div className="qa">
            <h4>¿Sirve para Exámenes Libres?</h4>
            <p>Todo el plan está <strong>alineado al Mineduc</strong> para rendir por tramo.</p>
          </div>
          <div className="qa">
            <h4>¿Puedo complementar con Preu?</h4>
            <p>Sí. Diseñamos trayectos combinados <strong>Adultos + Preu</strong>.</p>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="section last">
        <div className="container">
          <div className="cta-panel">
            <h3 className="cta-title">Nunca es tarde para terminar el colegio.</h3>
            <p className="cta-sub">Estudia con método, en la tarde y con acompañamiento real.</p>
            <div className="cta-actions">
              <a
                className="btn btn-primary"
                href="https://wa.me/56964626568?text=Quiero%20informaci%C3%B3n%20de%20Escuela%20para%20Adultos%20Lael"
                target="_blank" rel="noreferrer"
              >
                Hablar por WhatsApp
              </a>
              <Link className="btn btn-ghost" to="/inscripcion">Preinscribirme</Link>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}

/* ---------- Subcomponentes ---------- */
function Card({ title, img, children }){
  return (
    <article className="card feat">
      <div className="media">
        <img src={img} alt={title} loading="lazy" decoding="async" />
      </div>
      <div className="pad">
        <h3>{title}</h3>
        {children}
      </div>
    </article>
  );
}

function RouteBox({ n, children }){
  return (
    <div className="rbox card">
      <div className="pad">
        <h4>{n}</h4>
        <p>{children}</p>
      </div>
    </div>
  );
}

function Step({ n, t, children }){
  return (
    <div className="step card">
      <div className="num" aria-hidden>{n}</div>
      <div className="content">
        <h4>{t}</h4>
        <p>{children}</p>
      </div>
    </div>
  );
}

/* ---------- CSS ---------- */
const css = `
:root{
  --blue:#3b549d; --green:#249554; --gold:#facc15; --rose:#d6a0c5;
  --bg:#0b1220; --panel:#0e1424; --soft:#0d1528; --bd:#1f2a44;
  --ink:#ffffff; --ink2:#eaf2ff; --muted:#cbd5e1;
  --rad-lg:20px; --rad-md:14px;
  --shadow:0 24px 48px rgba(2,6,23,.35);
}
*{box-sizing:border-box}
.container{ max-width:1160px; margin:0 auto; padding:0 20px; }
.section{ padding:56px 0; position:relative; }
.section.soft{
  background:
    radial-gradient(900px 300px at 10% -8%, color-mix(in srgb, var(--blue) 16%, transparent), transparent 60%),
    radial-gradient(900px 300px at 90% -8%, color-mix(in srgb, var(--green) 12%, transparent), transparent 60%);
  border-block:1px solid #1a2440;
}
.section.last{ padding:56px 0 96px }
h1,h2,h3,h4{ color:var(--ink) }
p,li{ color:var(--ink2) }

/* HERO */
.adulto .hero{
  position:relative; border-bottom:1px solid #1a2440; min-height:480px;
  background: linear-gradient(180deg,#0d1222,#0a101e);
  overflow:hidden;
}
.hero__inner{ position:relative; z-index:2; padding:56px 0 14px; }
.hero__copy{ max-width:840px }
.kicker{ color:#c7d2fe; font-weight:800; letter-spacing:.3px; }
.title{ margin:.2rem 0 .6rem; font-size:clamp(2.2rem, 4vw, 3rem); line-height:1.08; }
.grad{ background: linear-gradient(120deg,var(--gold),#fff); -webkit-background-clip:text; background-clip:text; color:transparent; }
.lead{ color:var(--ink2); margin:12px 0 20px; line-height:1.6; }
.cta{ display:flex; gap:12px; flex-wrap:wrap }
.btn{ display:inline-flex; align-items:center; gap:8px; padding:.78rem 1.05rem; border-radius:12px; border:1px solid #2f3341; text-decoration:none; font-weight:900 }
.btn-primary{ background:var(--gold); color:#0b1220; border-color:var(--gold) }
.btn-ghost{ color:#ffffff; background:transparent }
.chips{ display:flex; flex-wrap:wrap; gap:10px; margin:16px 0 0; padding:0; list-style:none }
.chips li{
  padding:.5rem .8rem; border:1px solid #2a355b; border-radius:999px; color:#dbeafe; background:rgba(8,14,30,.6);
  backdrop-filter:saturate(150%) blur(4px);
}

.hero__img{ position:absolute; inset:0; z-index:1; overflow:hidden }
.hero__img img{ width:100%; height:100%; object-fit:cover; filter:saturate(.9) contrast(1.02) brightness(.8) }
.hero__img .fade{
  position:absolute; inset:0;
  background:linear-gradient(180deg,rgba(11,18,32,.35),rgba(11,18,32,.85) 52%,rgba(11,18,32,1) 100%);
}

/* Card base */
.card{
  border:1px solid #243153; border-radius:var(--rad-lg);
  background:
    radial-gradient(540px 200px at -10% -8%, rgba(255,255,255,.06), transparent 60%),
    linear-gradient(180deg,#0f172a,#0b1220);
  box-shadow:var(--shadow);
  color:var(--ink);
}
.card .pad{ padding:18px; }
.card h3{ margin:.2rem 0 .5rem; color:var(--ink) }
.card h4{ margin:.15rem 0 .25rem; color:var(--ink) }

/* Feature cards */
.grid3{ display:grid; grid-template-columns:repeat(3,1fr); gap:16px }
@media (max-width:980px){ .grid3{ grid-template-columns:1fr } }
.feat .media{ aspect-ratio: 16/9; overflow:hidden; border-bottom:1px solid #22314f; border-top-left-radius:var(--rad-lg); border-top-right-radius:var(--rad-lg) }
.feat img{ width:100%; height:100%; object-fit:cover; display:block }

/* Rutas */
.routes{
  display:grid; grid-template-columns:1fr 1fr 1fr; gap:14px; margin-top:18px;
}
@media (max-width:980px){ .routes{ grid-template-columns:1fr } }
.rbox p{ margin:0; }

/* Steps */
.steps{ margin-top:18px; display:grid; grid-template-columns:1fr 1fr; gap:16px; }
@media (max-width:980px){ .steps{ grid-template-columns:1fr } }
.step{ display:grid; grid-template-columns:64px 1fr; gap:14px; align-items:flex-start; padding:16px; color:var(--ink); }
.step .num{
  width:56px; height:56px; display:grid; place-items:center; border-radius:14px;
  background:#101a2f; border:1px solid #2a3b66; font-weight:900; font-size:1.1rem; color:var(--ink);
}
.step h4{ margin:.15rem 0 .25rem; color:var(--ink) }

/* Aid */
.aid .intro{ color:var(--ink2); margin:.2rem 0 .6rem }
.aid-actions{ display:flex; gap:12px; flex-wrap:wrap }

/* FAQ */
.faq{ display:grid; grid-template-columns:1fr 1fr 1fr; gap:14px }
@media (max-width:980px){ .faq{ grid-template-columns:1fr } }
.qa{
  border:1px solid #22314f; border-radius:14px; padding:14px 16px;
  background:linear-gradient(180deg,#0f172a,#0b1220);
}
.qa h4{ margin:.05rem 0 .25rem }

/* CTA final */
.cta-panel{
  text-align:center; border:1px solid #22314f; border-radius:22px; padding:28px; color:var(--ink);
  background:
    radial-gradient(560px 260px at 14% -8%, color-mix(in srgb, var(--blue) 24%, transparent), transparent 60%),
    radial-gradient(560px 260px at 86% -8%, color-mix(in srgb, var(--gold) 20%, transparent), transparent 60%),
    linear-gradient(180deg,#0b1220,#101a2f);
  box-shadow:0 30px 60px rgba(2,6,23,.42);
}
.cta-title{ margin:.1rem 0 .35rem; font-size:1.5rem; }
.cta-sub{ margin:0 0 12px; color:var(--ink2); }
.cta-actions{ display:flex; gap:12px; justify-content:center; flex-wrap:wrap; }

/* Text utils */
.h{ margin:0 0 12px; font-size:1.7rem; line-height:1.2; color:var(--ink) }
.center{ text-align:center }
.sub{ color:var(--ink2); margin:0 0 22px; text-align:center; opacity:1 }

/* Focus */
button:focus-visible, .btn:focus-visible, a:focus-visible, select:focus-visible{
  outline:2px solid var(--gold); outline-offset:2px;
}
`;