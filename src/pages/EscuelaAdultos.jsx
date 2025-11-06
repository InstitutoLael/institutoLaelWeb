import HeroImg from "../assets/img/onboarding.jpg"; // ← imagen NUEVA para el hero (prueba office-bg.jpg o study-online.jpg si prefieres)
import Aula1 from "../assets/img/bootcamp.jpg";
import Aula2 from "../assets/img/coaching.jpg";
import Aula3 from "../assets/img/inclusion.jpg";

export default function EscuelaAdultos(){
  return (
    <div className="adultos">
      <style>{css}</style>

      {/* HERO */}
      <section className="hero">
        <div className="hero-bg" role="img" aria-label="Estudiante adulta conectada a clases en línea" />
        <div className="hero-wrap">
          <div className="badge">Escuela para Adultos Lael</div>
          <h1>Termina tus estudios <span>con apoyo real</span></h1>
          <p className="lead">
            Para personas 18+ que necesitan completar la Básica o Media, incluidos quienes
            salen de contextos complejos (p. ej., cárcel) y jóvenes que pasan de
            <strong> homeschool</strong> a formato adulto al cumplir 18. Clases en la tarde,
            en vivo (y quedan grabadas).
          </p>

          <div className="cta">
            <a
              className="btn btn-primary"
              href="https://wa.me/56964626568?text=Hola%20%F0%9F%91%8B%20me%20interesa%20la%20Escuela%20para%20Adultos"
              target="_blank" rel="noreferrer"
            >
              Hablar por WhatsApp
            </a>
            <a className="btn btn-outline" href="/inscripcion">Preinscribirme</a>
          </div>

          <ul className="chips" aria-label="Características del programa">
            <li>Horarios PM</li>
            <li>Clases en vivo (con grabación)</li>
            <li>Ajustado a Exámenes Libres</li>
            <li>Plan personalizado</li>
          </ul>
        </div>

        {/* divisor curvo para dar corte visual distinto a otras páginas */}
        <svg className="divider" viewBox="0 0 1440 110" preserveAspectRatio="none" aria-hidden>
          <path d="M0,110 L0,40 C320,120 1120,-40 1440,40 L1440,110 Z" />
        </svg>
      </section>

      {/* 3 RAZONES — tarjetas con foto */}
      <section className="cards container reveal">
        <article className="card">
          <figure className="ph"><img src={Aula1} alt="" /></figure>
          <h3>¿A quién va dirigido?</h3>
          <ul>
            <li>Adultos que no completaron Básica o Media.</li>
            <li>Jóvenes que migran desde homeschool (18+).</li>
            <li>Personas en reinserción educativa (p. ej., post-cárcel).</li>
          </ul>
        </article>

        <article className="card">
          <figure className="ph"><img src={Aula2} alt="" /></figure>
          <h3>Modalidad y horarios</h3>
          <ul>
            <li>100% online. <strong>En vivo</strong> y quedan grabadas.</li>
            <li>Clases tarde/noche para compatibilizar trabajo y familia.</li>
            <li>Acompañamiento semanal + seguimiento de avance.</li>
          </ul>
        </article>

        <article className="card">
          <figure className="ph"><img src={Aula3} alt="" /></figure>
          <h3>Enfoque y respaldo</h3>
          <ul>
            <li>Contenidos alineados a <strong>Exámenes Libres</strong> (Mineduc).</li>
            <li>Rúbricas claras y metas por tramo.</li>
            <li>Reportes de asistencia y progreso.</li>
          </ul>
        </article>
      </section>

      {/* RUTAS — aspecto diferente con fondo soft y líneas guías */}
      <section className="rutas reveal">
        <div className="container">
          <h2>Elige tu ruta</h2>
          <p className="muted">Planificamos según tu tramo y fecha de rendición.</p>

          <div className="flow">
            <div className="step">
              <div className="dot" aria-hidden />
              <h3>Básica completa</h3>
              <p>Para quienes necesitan completar 1° a 8°. Alfabetización académica, cálculo base y comprensión lectora.</p>
            </div>
            <div className="step">
              <div className="dot" aria-hidden />
              <h3>1° y 2° Medio</h3>
              <p>Refuerzo de bases, matemáticas y lenguaje aplicados; ciencias y estudios sociales.</p>
            </div>
            <div className="step">
              <div className="dot" aria-hidden />
              <h3>3° y 4° Medio</h3>
              <p>Preparación focalizada a Exámenes Libres. Ensayos y ajustes a tiempo.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CÓMO FUNCIONA — timeline compacto */}
      <section className="timeline container reveal">
        <h2>Cómo funciona</h2>
        <ol className="tl">
          <li><span className="pill">1</span><div><h4>Diagnóstico</h4><p>Medimos tu punto de partida y definimos meta realista.</p></div></li>
          <li><span className="pill">2</span><div><h4>Plan semanal</h4><p>Calendario de clases en vivo + actividades corregidas.</p></div></li>
          <li><span className="pill">3</span><div><h4>Seguimiento</h4><p>Checkpoints, asistencia y feedback útil (con grabaciones).</p></div></li>
          <li><span className="pill">4</span><div><h4>Rendición</h4><p>Ensayos, simulacros y checklist para Exámenes Libres.</p></div></li>
        </ol>
      </section>

      {/* APOYOS */}
      <section className="apoyos reveal">
        <div className="container box">
          <div>
            <h2>Apoyos y becas (caso a caso)</h2>
            <p className="muted">
              Podemos evaluar <strong>apoyos económicos</strong> según tu situación (prioridad: reinserción y jefas de hogar).
              No son becas masivas: revisamos cada caso con cuidado.
            </p>
          </div>
          <div className="actions">
            <a className="btn btn-primary" href="https://wa.me/56964626568" target="_blank" rel="noreferrer">Consultar por apoyo</a>
            <a className="btn btn-outline" href="/inscripcion">Preinscribirme</a>
          </div>
        </div>
      </section>

      {/* FAQ breve, distinto visualmente */}
      <section className="faq container reveal">
        <details>
          <summary>¿Puedo trabajar y estudiar?</summary>
          <p>Sí. Las clases son PM y quedan grabadas para repasar.</p>
        </details>
        <details>
          <summary>¿Sirve para Exámenes Libres?</summary>
          <p>Todo el plan está alineado al Mineduc para rendir por tramo.</p>
        </details>
        <details>
          <summary>¿Puedo complementar con Preu?</summary>
          <p>Sí, diseñamos trayectos combinados <strong>Adultos + Preu</strong>.</p>
        </details>
      </section>

      {/* CTA final con gradiente diagonal */}
      <section className="cta-final reveal">
        <div className="container inner">
          <div>
            <h3>Nunca es tarde para terminar el colegio.</h3>
            <p className="muted">Estudia con método, en la tarde y con acompañamiento real.</p>
          </div>
          <div className="actions">
            <a className="btn btn-primary" href="https://wa.me/56964626568" target="_blank" rel="noreferrer">Hablar por WhatsApp</a>
            <a className="btn btn-outline" href="/inscripcion">Preinscribirme</a>
          </div>
        </div>
      </section>
    </div>
  );
}

const css = `
.adultos :where(h1,h2,h3,h4){ letter-spacing:.2px }
.container{ width:min(1120px, 92vw); margin:0 auto }

/* ---------- HERO distinto ---------- */
.hero{ position:relative; overflow:hidden; }
.hero-bg{
  position:absolute; inset:0;
  background-image:
    linear-gradient(180deg, rgba(11,18,32,.20), rgba(11,18,32,.65) 60%, rgba(11,18,32,.9)),
    url(${HeroImg});
  background-size:cover; background-position:center;
  filter:saturate(105%);
}
.hero-wrap{
  position:relative; z-index:2;
  width:min(1120px, 92vw); margin:0 auto; padding:92px 0 56px;
}
.badge{
  display:inline-block; font-weight:900; font-size:.9rem;
  background:#0ea5e9; color:#07111f; padding:.35rem .6rem; border-radius:999px;
  box-shadow:0 10px 24px rgba(14,165,233,.25)
}
.hero h1{
  margin:.6rem 0; font-size: clamp(2rem, 3.6vw + 1rem, 3.2rem);
}
.hero h1 span{ color:#FBBF24 }
.lead{
  max-width: 880px; color:#eef2ff; opacity:.95; font-size: clamp(1rem, .6vw + .9rem, 1.2rem);
}
.cta{ display:flex; gap:10px; margin:18px 0 8px }
.btn{
  display:inline-flex; align-items:center; gap:8px; padding:.78rem 1rem; border-radius:12px;
  border:1px solid #2f3341; font-weight:900; text-decoration:none;
  transition:transform .18s ease, box-shadow .18s ease, filter .18s ease;
}
.btn-primary{ color:#0b1220; background:linear-gradient(180deg,#fbbf24,#f59e0b); border-color:#d97706; }
.btn-primary:hover{ transform:translateY(-2px); box-shadow:0 18px 36px rgba(245,158,11,.25) }
.btn-outline{ color:#eaf2ff; background:transparent; border-color:#2f3341 }
.btn-outline:hover{ transform:translateY(-2px); box-shadow:0 18px 36px rgba(2,6,23,.28); filter:brightness(1.06) }

.chips{
  display:flex; flex-wrap:wrap; gap:10px; margin:10px 0 0; padding:0; list-style:none;
}
.chips li{
  padding:.45rem .7rem; border-radius:999px; border:1px solid #233154; background:rgba(2,6,23,.5);
  backdrop-filter: blur(4px);
}

/* divisor curvo */
.divider{ display:block; width:100%; height:110px; fill:#0b1220; position:relative }

/* ---------- Tarjetas con fotos ---------- */
.cards{
  display:grid; grid-template-columns: repeat(3, minmax(0,1fr)); gap:16px; margin:20px auto 8px;
}
.card{
  border:1px solid #1f2a44; border-radius:18px; background:linear-gradient(180deg,#0e1424,#0b1220);
  padding:14px; box-shadow:0 20px 40px rgba(2,6,23,.45);
}
.card .ph{ overflow:hidden; border-radius:12px; border:1px solid #1f2a44; margin-bottom:10px }
.card img{ width:100%; height:210px; object-fit:cover; object-position:center }
.card h3{ margin:.2rem 0 .2rem }
.card ul{ margin:.4rem 0 0 1rem }
.card li{ margin:.22rem 0 }

/* ---------- Rutas con estética distinta ---------- */
.rutas{
  background:
    radial-gradient(800px 240px at -10% 20%, rgba(88,80,236,.08), transparent 60%),
    radial-gradient(800px 240px at 110% 60%, rgba(34,211,238,.08), transparent 60%),
    #0c1323;
  padding:36px 0;
  border-top:1px solid #1f2a44; border-bottom:1px solid #1f2a44;
}
.rutas .flow{ display:grid; gap:14px; grid-template-columns:repeat(3, minmax(0,1fr)); margin-top:10px }
.rutas .step{
  position:relative; border:1px solid #22304d; border-radius:16px; padding:14px;
  background:linear-gradient(180deg,#0f172a,#0b1220);
}
.rutas .dot{
  position:absolute; top:-10px; left:18px; width:16px; height:16px; border-radius:999px;
  background:#22d3ee; box-shadow:0 0 0 4px rgba(34,211,238,.15)
}

/* ---------- Timeline compacto ---------- */
.timeline{ padding:26px 0 8px }
.tl{ list-style:none; margin:8px 0 0; padding:0; display:grid; gap:14px; grid-template-columns:repeat(2, minmax(0,1fr)) }
.tl li{
  display:flex; gap:10px; align-items:flex-start; border:1px solid #22304d; border-radius:16px;
  background:linear-gradient(180deg,#0f172a,#0b1220); padding:14px;
}
.pill{ display:inline-grid; place-items:center; width:34px; height:34px; border-radius:10px;
  background:#111a2f; border:1px solid #2b3a60; font-weight:900 }
.tl h4{ margin:0 0 4px }

/* ---------- Apoyos ---------- */
.apoyos{ padding:18px 0 }
.box{
  display:flex; gap:16px; align-items:center; justify-content:space-between;
  border:1px solid #22304d; border-radius:18px; padding:18px;
  background: radial-gradient(600px 160px at 10% 140%, rgba(245,158,11,.18), transparent 60%),
              linear-gradient(180deg,#0f172a,#0b1220);
  box-shadow:0 20px 40px rgba(2,6,23,.45);
}
.box .actions{ display:flex; gap:10px; flex-shrink:0 }

/* ---------- FAQ ---------- */
.faq{ display:grid; gap:10px; margin:8px auto 14px }
.faq details{
  border:1px solid #22304d; border-radius:12px; background:linear-gradient(180deg,#0f172a,#0b1220); padding:10px 12px;
}
.faq summary{ cursor:pointer; font-weight:900 }
.faq p{ margin:.6rem 0 0 }

/* ---------- CTA final ---------- */
.cta-final{
  background:
    linear-gradient(135deg, rgba(245,158,11,.18), rgba(88,80,236,.18)),
    #0b1220;
  border-top:1px solid #1f2a44;
  padding:22px 0 36px;
}
.cta-final .inner{
  display:flex; align-items:center; justify-content:space-between; gap:14px;
  border:1px solid #22304d; border-radius:18px; padding:16px;
  background:linear-gradient(180deg,#0f172a,#0b1220);
  box-shadow:0 20px 40px rgba(2,6,23,.45);
}
.cta-final .actions{ display:flex; gap:10px }

/* ---------- Responsivo ---------- */
@media (max-width: 1000px){
  .cards{ grid-template-columns:1fr 1fr }
  .rutas .flow{ grid-template-columns:1fr }
  .tl{ grid-template-columns:1fr }
  .cta-final .inner{ flex-direction:column; align-items:flex-start }
}
@media (max-width: 640px){
  .cards{ grid-template-columns:1fr }
}
`;