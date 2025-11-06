// src/pages/EscuelaAdultos.jsx
export default function EscuelaAdultos() {
  return (
    <div className="adultos">
      <style>{css}</style>

      {/* HERO — sin fotos, alto contraste + ícono */}
      <section className="hero">
        <div className="hero-wrap container">
          <div className="hero-text">
            <span className="badge">Escuela para Adultos Lael</span>
            <h1>Termina tus estudios <span>con apoyo real</span></h1>
            <p className="lead">
              Programa flexible para personas adultas (18+) que necesitan completar su
              enseñanza Básica o Media, incluyendo quienes retoman tras años, migran desde
              <strong> homeschool</strong> o buscan reinserción educativa.
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
          </div>

          <div className="hero-icon" aria-hidden>
            {/* Mortarboard */}
            <svg width="180" height="180" viewBox="0 0 24 24" fill="none">
              <path d="M3 7l9-4 9 4-9 4-9-4z" stroke="#FBBF24" strokeWidth="1.6" />
              <path d="M5 10v4c0 1.1 3.6 3 7 3s7-1.9 7-3v-4" stroke="#FBBF24" strokeWidth="1.6" />
              <path d="M21 7v8" stroke="#FBBF24" strokeWidth="1.6" />
              <circle cx="21" cy="16" r="1" fill="#FBBF24" />
            </svg>
          </div>
        </div>

        {/* chips */}
        <div className="chips container">
          <span>Horarios PM</span>
          <span>Clases en vivo (con grabación)</span>
          <span>Ajustado a Exámenes Libres</span>
          <span>Plan personalizado</span>
        </div>
      </section>

      {/* 3 PANELES — con íconos (sin imágenes de disco) */}
      <section className="panels container reveal">
        <article className="panel">
          <div className="ico" aria-hidden>
            {/* users */}
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path d="M16 21v-1a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v1" stroke="currentColor" strokeWidth="1.6"/>
              <circle cx="10" cy="7" r="4" stroke="currentColor" strokeWidth="1.6"/>
            </svg>
          </div>
          <h3>¿A quién va dirigido?</h3>
          <ul>
            <li>Adultos que no completaron sus estudios.</li>
            <li>Jóvenes 18+ que dejan homeschool.</li>
            <li>Personas en procesos de reinserción educativa.</li>
          </ul>
        </article>

        <article className="panel">
          <div className="ico" aria-hidden>
            {/* clock */}
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6"/>
              <path d="M12 6v6l3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
            </svg>
          </div>
          <h3>Horarios y modalidad</h3>
          <ul>
            <li>Clases 100% online, <strong>en vivo</strong> y quedan grabadas.</li>
            <li>Modalidad tarde/noche para compatibilizar.</li>
            <li>Acompañamiento semanal y seguimiento.</li>
          </ul>
        </article>

        <article className="panel">
          <div className="ico" aria-hidden>
            {/* shield-check */}
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path d="M12 3l7 3v6c0 5-3.5 8-7 9-3.5-1-7-4-7-9V6l7-3z" stroke="currentColor" strokeWidth="1.6"/>
              <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h3>Certificación</h3>
          <p>
            Alineado a Exámenes Libres (Mineduc). Rúbricas claras, metas por tramo y planificación personalizada.
          </p>
        </article>
      </section>

      {/* RUTAS */}
      <section className="rutas reveal">
        <div className="container">
          <h2>Elige tu ruta</h2>
          <p className="muted">Planificamos según tu tramo y fecha de rendición.</p>

          <div className="route-grid">
            <div className="route">
              <span className="dot" aria-hidden />
              <h3>1° a 8° Básico</h3>
              <p>Alfabetización académica, cálculo base y comprensión lectora.</p>
            </div>
            <div className="route">
              <span className="dot" aria-hidden />
              <h3>1° y 2° Medio</h3>
              <p>Refuerzo de bases, lenguaje, matemáticas y ciencias.</p>
            </div>
            <div className="route">
              <span className="dot" aria-hidden />
              <h3>3° y 4° Medio</h3>
              <p>Preparación intensiva y simulacros para Exámenes Libres.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CÓMO FUNCIONA */}
      <section className="timeline container reveal">
        <h2>Cómo funciona</h2>
        <ol className="tl">
          <li><span className="pill">1</span><div><h4>Diagnóstico</h4><p>Medimos punto de partida y definimos meta realista.</p></div></li>
          <li><span className="pill">2</span><div><h4>Plan semanal</h4><p>Clases en vivo + actividades corregidas.</p></div></li>
          <li><span className="pill">3</span><div><h4>Seguimiento</h4><p>Checkpoints, asistencia y feedback útil (con grabaciones).</p></div></li>
          <li><span className="pill">4</span><div><h4>Rendición</h4><p>Ensayos, simulacros y checklist para Exámenes Libres.</p></div></li>
        </ol>
      </section>

      {/* CALENDARIO PM + REQUISITOS */}
      <section className="two-col container reveal">
        <div className="col card">
          <h3>Calendario PM (referencial)</h3>
          <ul className="bullets">
            <li>Lun y Mié · 19:00–20:20 — Lenguaje / Comunicación.</li>
            <li>Mar y Jue · 19:00–20:20 — Matemática por tramos.</li>
            <li>Vie · 19:00–20:00 — Taller de estudio y repaso.</li>
          </ul>
          <p className="muted">*Los horarios exactos se confirman al inscribirte según tu tramo y cupos.</p>
        </div>

        <div className="col card">
          <h3>Requisitos y documentos</h3>
          <ul className="checks">
            <li>Cédula de identidad vigente.</li>
            <li>Certificados previos (si los tienes) para ubicar tu tramo.</li>
            <li>Compromiso de asistencia (mín. 75%).</li>
          </ul>
          <div className="mini-actions">
            <a className="btn btn-ghost" href="/inscripcion">Subir documentos (preinscripción)</a>
          </div>
        </div>
      </section>

      {/* APOYOS / PRECIOS SIMPLE */}
      <section className="apoyos reveal">
        <div className="container box">
          <div>
            <h2>Apoyos y becas (caso a caso)</h2>
            <p className="muted">
              Podemos evaluar <strong>apoyos económicos</strong> según tu situación (prioridad:
              reinserción y jefas de hogar). No son becas masivas: revisamos cada caso con cuidado.
            </p>
          </div>
          <div className="actions">
            <a className="btn btn-primary" href="https://wa.me/56964626568" target="_blank" rel="noreferrer">Consultar por apoyo</a>
            <a className="btn btn-outline" href="/inscripcion">Preinscribirme</a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq container reveal">
        <details>
          <summary>¿Puedo trabajar y estudiar?</summary>
          <p>Sí. Las clases son en la tarde/noche y quedan grabadas para repasar.</p>
        </details>
        <details>
          <summary>¿Sirve para Exámenes Libres?</summary>
          <p>Todo el plan está alineado al Mineduc por tramo (Básica / Media).</p>
        </details>
        <details>
          <summary>¿Puedo combinar con Preu?</summary>
          <p>Sí. Diseñamos trayectos combinados <strong>Adultos + Preu</strong> si lo necesitas.</p>
        </details>
      </section>

      {/* CTA FINAL */}
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

/* ---------- HERO (sin imágenes, contraste alto) ---------- */
.hero{
  background:
    radial-gradient(1200px 300px at 10% -20%, rgba(88,80,236,.14), transparent 60%),
    radial-gradient(1200px 300px at 100% -10%, rgba(34,211,238,.12), transparent 60%),
    #0b1220;
  border-bottom:1px solid #1f2a44;
}
.hero-wrap{
  display:flex; align-items:center; justify-content:space-between; gap:24px;
  padding:60px 0 26px;
}
.hero-text .badge{
  display:inline-block; font-weight:900; font-size:.9rem;
  background:#0ea5e9; color:#07111f; padding:.35rem .6rem; border-radius:999px;
  box-shadow:0 10px 24px rgba(14,165,233,.25)
}
.hero h1{ margin:.6rem 0; font-size: clamp(2rem, 3.6vw + 1rem, 3.2rem); }
.hero h1 span{ color:#FBBF24 }
.lead{ max-width: 860px; color:#eaf2ff; opacity:.95; font-size: clamp(1rem, .6vw + .9rem, 1.2rem) }
.cta{ display:flex; gap:10px; margin:18px 0 0 }

.hero-icon{
  flex-shrink:0; display:grid; place-items:center; width:200px; height:200px; border-radius:24px;
  background: linear-gradient(180deg,#101a2f,#0f172a); border:1px solid #22304d;
  box-shadow:0 26px 60px rgba(2,6,23,.38);
  color:#FBBF24;
}

/* chips */
.chips{ display:flex; flex-wrap:wrap; gap:10px; padding:10px 0 22px }
.chips span{
  padding:.45rem .7rem; border-radius:999px; border:1px solid #233154; background:rgba(2,6,23,.5);
  backdrop-filter: blur(4px);
}

/* botones */
.btn{
  display:inline-flex; align-items:center; gap:8px; padding:.78rem 1rem; border-radius:12px;
  border:1px solid #2f3341; font-weight:900; text-decoration:none;
  transition:transform .18s ease, box-shadow .18s ease, filter .18s ease;
}
.btn-primary{ color:#0b1220; background:linear-gradient(180deg,#fbbf24,#f59e0b); border-color:#d97706; }
.btn-primary:hover{ transform:translateY(-2px); box-shadow:0 18px 36px rgba(245,158,11,.25) }
.btn-outline{ color:#eaf2ff; background:transparent; border-color:#2f3341 }
.btn-outline:hover{ transform:translateY(-2px); box-shadow:0 18px 36px rgba(2,6,23,.28); filter:brightness(1.06) }
.btn-ghost{ color:#E11D48; border-color:#E11D48; }
.btn-ghost:hover{ background:#E11D48; color:#fff; transform:translateY(-2px) }

/* ---------- PANELS ---------- */
.panels{
  display:grid; grid-template-columns: repeat(3, minmax(0,1fr)); gap:16px; margin:22px auto 8px;
}
.panel{
  border:1px solid #1f2a44; border-radius:18px; background:linear-gradient(180deg,#0e1424,#0b1220);
  padding:16px; box-shadow:0 20px 40px rgba(2,6,23,.45);
}
.panel .ico{ width:44px; height:44px; border-radius:12px; display:grid; place-items:center;
  background:#101a2f; border:1px solid #22304d; color:#9ddcff; margin-bottom:8px }
.panel ul{ margin:.4rem 0 0 1rem }
.panel li{ margin:.22rem 0 }

/* ---------- RUTAS ---------- */
.rutas{
  background:
    radial-gradient(800px 240px at -10% 20%, rgba(88,80,236,.08), transparent 60%),
    radial-gradient(800px 240px at 110% 60%, rgba(34,211,238,.08), transparent 60%),
    #0c1323;
  padding:36px 0; border-top:1px solid #1f2a44; border-bottom:1px solid #1f2a44;
}
.route-grid{ display:grid; gap:14px; grid-template-columns:repeat(3, minmax(0,1fr)); margin-top:10px }
.route{
  position:relative; border:1px solid #22304d; border-radius:16px; padding:14px;
  background:linear-gradient(180deg,#0f172a,#0b1220);
}
.route .dot{
  position:absolute; top:-10px; left:18px; width:16px; height:16px; border-radius:999px;
  background:#22d3ee; box-shadow:0 0 0 4px rgba(34,211,238,.15)
}

/* ---------- TIMELINE ---------- */
.timeline{ padding:26px 0 8px }
.tl{ list-style:none; margin:8px 0 0; padding:0; display:grid; gap:14px; grid-template-columns:repeat(2, minmax(0,1fr)) }
.tl li{
  display:flex; gap:10px; align-items:flex-start; border:1px solid #22304d; border-radius:16px;
  background:linear-gradient(180deg,#0f172a,#0b1220); padding:14px;
}
.pill{ display:inline-grid; place-items:center; width:34px; height:34px; border-radius:10px;
  background:#111a2f; border:1px solid #2b3a60; font-weight:900 }
.tl h4{ margin:0 0 4px }

/* ---------- 2 COL: CALENDARIO + REQUISITOS ---------- */
.two-col{ display:grid; grid-template-columns:1fr 1fr; gap:16px; margin:16px auto }
.card{
  border:1px solid #22304d; border-radius:16px; padding:16px;
  background:linear-gradient(180deg,#0f172a,#0b1220); box-shadow:0 20px 40px rgba(2,6,23,.45);
}
.bullets, .checks{ margin:.4rem 0 0 1rem }
.bullets li, .checks li{ margin:.22rem 0 }
.mini-actions{ margin-top:10px }

/* ---------- APOYOS ---------- */
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

/* ---------- Reveal ---------- */
.reveal{ opacity:0; transform: translateY(14px); transition: opacity .5s ease, transform .5s ease; }
.reveal.in{ opacity:1; transform: translateY(0); }

/* ---------- Responsive ---------- */
@media (max-width: 1000px){
  .hero-wrap{ flex-direction:column; align-items:flex-start }
  .panels{ grid-template-columns:1fr 1fr }
  .route-grid{ grid-template-columns:1fr }
  .tl{ grid-template-columns:1fr }
  .two-col{ grid-template-columns:1fr }
  .cta-final .inner{ flex-direction:column; align-items:flex-start }
}
@media (max-width: 640px){
  .panels{ grid-template-columns:1fr }
}
`;