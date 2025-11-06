// src/pages/EscuelaAdultos.jsx

// ✅ Vite-friendly: usa rutas absolutas desde este archivo
// OJO: en tu repo la carpeta es src/assets/img/lael/Logos (con L mayúscula)
const LogoMark = new URL("../assets/img/Logos/lael-inst-amarillo.png", import.meta.url).href;

// Tarjetas con foto
const Aula1 = new URL("../assets/img/lael/bootcamp.jpg", import.meta.url).href;
const Aula2 = new URL("../assets/img/lael/coaching.jpg", import.meta.url).href;
const Aula3 = new URL("../assets/img/lael/inclusion.jpg", import.meta.url).href;

// Galería
const Gal1 = new URL("../assets/img/lael/hs.jpg", import.meta.url).href;
const Gal2 = new URL("../assets/img/lael/study-online.jpg", import.meta.url).href;
const Gal3 = new URL("../assets/img/lael/soft.jpg", import.meta.url).href;

export default function EscuelaAdultos() {
  return (
    <div className="adultos">
      <style>{css}</style>

      {/* HERO */}
      <section className="hero">
        <div className="hero-bg" aria-hidden />
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="kicker">Escuela para Adultos Lael</span>
            <h1>Termina tus estudios <span>con apoyo real</span></h1>
            <p className="lead">
              Programa flexible para personas adultas (18+) que necesitan completar su
              enseñanza Básica o Media: quienes retoman tras años, migran desde <strong>homeschool</strong>
              o buscan reinserción educativa.
            </p>

            <div className="cta">
              <a
                className="btn btn-primary"
                href="https://wa.me/56964626568?text=Hola%20%F0%9F%91%8B%20me%20interesa%20la%20Escuela%20para%20Adultos"
                target="_blank" rel="noreferrer"
              >
                Hablar por WhatsApp
              </a>
              <a className="btn btn-outline" href="#formulario">Preinscribirme</a>
            </div>

            <ul className="chips" aria-label="Características del programa">
              <li>Horarios PM</li>
              <li>Clases en vivo + grabaciones</li>
              <li>Ajustado a Exámenes Libres</li>
              <li>Plan personalizado</li>
            </ul>
          </div>

          {/* Logo en una tarjeta glass */}
          <div className="hero-logo" aria-hidden>
            <img src={LogoMark} alt="" loading="eager" decoding="async" />
          </div>
        </div>
      </section>

      {/* BLOQUES PRINCIPALES */}
      <section className="cards container reveal">
        <FeatureCard
          img={Aula1}
          title="¿A quién va dirigido?"
          bullets={[
            "Adultos que no completaron Básica o Media.",
            "Jóvenes 18+ que dejan homeschool.",
            "Personas en reinserción educativa.",
          ]}
        />
        <FeatureCard
          img={Aula2}
          title="Horarios y modalidad"
          bullets={[
            "100% online, en vivo y quedan grabadas.",
            "Tarde/noche para compatibilizar.",
            "Acompañamiento y seguimiento.",
          ]}
        />
        <FeatureCard
          img={Aula3}
          title="Certificación"
          bullets={[
            "Alineado a Exámenes Libres (Mineduc).",
            "Rúbricas y metas por tramo.",
            "Planificación personalizada.",
          ]}
        />
      </section>

      {/* RUTAS */}
      <section className="rutas reveal">
        <div className="container">
          <h2>Elige tu ruta</h2>
          <p className="muted">Planificamos según tu tramo y fecha de rendición.</p>

          <div className="flow">
            <div className="pill">
              <h3>1° a 8° Básico</h3>
              <p>Alfabetización académica, cálculo base y comprensión lectora.</p>
            </div>
            <div className="pill">
              <h3>1° y 2° Medio</h3>
              <p>Refuerzo de bases: lenguaje, matemáticas y ciencias.</p>
            </div>
            <div className="pill">
              <h3>3° y 4° Medio</h3>
              <p>Preparación intensiva y simulacros para Exámenes Libres.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CALENDARIO + REQUISITOS */}
      <section className="grid2 container reveal">
        <div className="box">
          <h3>Calendario PM (referencial)</h3>
          <ul className="list">
            <li>Lun &amp; Mié: 19:00–20:20 — Lenguaje / Comunicación</li>
            <li>Mar &amp; Jue: 19:00–20:20 — Matemática</li>
            <li>Vie: 19:00–20:00 — Taller de estudio y repaso</li>
          </ul>
          <small className="muted">*Sujeto a tramo y disponibilidad.</small>
        </div>

        <div className="box">
          <h3>Requisitos y documentos</h3>
          <ul className="list">
            <li>Cédula de identidad vigente.</li>
            <li>Certificados previos (si los tienes).</li>
            <li>Compromiso de asistencia (mín. 75%).</li>
          </ul>
        </div>
      </section>

      {/* GALERÍA */}
      <section className="galeria reveal">
        <div className="container g">
          <figure className="gx"><img src={Gal1} alt="Clase en línea con acompañamiento" /></figure>
          <figure className="gx"><img src={Gal2} alt="Estudio en casa con guía" /></figure>
          <figure className="gx"><img src={Gal3} alt="Ambiente amable para aprender" /></figure>
        </div>
      </section>

      {/* APOYOS */}
      <section className="apoyos reveal">
        <div className="container apoyo-box">
          <div>
            <h2>Apoyos y becas (caso a caso)</h2>
            <p className="muted">
              Evaluamos apoyos económicos según tu situación (prioridad: reinserción y jefas de hogar).
              No son becas masivas: cada caso se revisa con cuidado.
            </p>
          </div>
          <div className="actions">
            <a className="btn btn-primary" href="https://wa.me/56964626568" target="_blank" rel="noreferrer">
              Consultar por apoyo
            </a>
          </div>
        </div>
      </section>

      {/* FORMULARIO */}
      <section id="formulario" className="formulario reveal">
        <div className="container form-box">
          <h2>Preinscripción rápida 📝</h2>
          <p className="muted">Completa tus datos y te contactamos para orientarte.</p>

          <form action="mailto:contacto@institutolael.cl" method="post" encType="text/plain">
            <div className="fields">
              <input type="text" name="Nombre" placeholder="Nombre completo" required />
              <input type="tel" name="WhatsApp" placeholder="WhatsApp (ej: +569...)" />
              <select name="Tramo" required>
                <option value="">Tramo que deseas cursar</option>
                <option>1° a 8° Básico</option>
                <option>1° y 2° Medio</option>
                <option>3° y 4° Medio</option>
              </select>
              <textarea name="Mensaje" placeholder="Cuéntanos brevemente tu situación o consulta" rows="3" />
            </div>
            <button type="submit" className="btn btn-primary">Enviar preinscripción</button>
          </form>
        </div>
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
            <a className="btn btn-outline" href="#formulario">Preinscribirme</a>
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ img, title, bullets = [] }) {
  return (
    <article className="fcard">
      <img src={img} alt="" />
      <div className="overlay" />
      <div className="content">
        <h3>{title}</h3>
        <ul>{bullets.map((b, i) => <li key={i}>{b}</li>)}</ul>
      </div>
    </article>
  );
}

const css = `
.adultos { background:#0b1220; color:#f1f5f9; font-family:system-ui, sans-serif; }
.container{ width:min(1120px,92vw); margin:0 auto }

/* HERO */
.hero{ position:relative; overflow:hidden; }
.hero-bg{
  position:absolute; inset:0;
  background-image:
    radial-gradient(1200px 420px at -10% -20%, rgba(88,80,236,.10), transparent 60%),
    radial-gradient(1000px 380px at 110% 0%, rgba(245,158,11,.10), transparent 60%),
    linear-gradient(180deg, rgba(11,18,32,.18), rgba(11,18,32,.86) 62%, rgba(11,18,32,.95));
  filter:saturate(105%);
}
.hero-grid{ position:relative; z-index:2; display:grid; grid-template-columns:1.2fr .8fr; gap:24px; padding:84px 0 64px; align-items:center; }
.hero-copy h1{ margin:.4rem 0 1rem; letter-spacing:.2px; }
.hero-copy h1 span{ color:#FBBF24; }
.kicker{ display:inline-block; background:#2563eb; padding:.38rem .62rem; border-radius:999px; font-weight:800; }
.lead{ max-width:780px; opacity:.95; }
.chips{ display:flex; flex-wrap:wrap; gap:8px; list-style:none; margin:12px 0 0; }
.chips li{ background:rgba(255,255,255,.10); padding:.44rem .72rem; border-radius:999px; border:1px solid #253049; font-size:.92rem; }

/* Hero logo card */
.hero-logo{ display:grid; place-items:center; padding:28px; border-radius:20px;
  background:linear-gradient(180deg,rgba(17,24,39,.35),rgba(17,24,39,.75));
  border:1px solid #1e293b; box-shadow:0 20px 48px rgba(2,6,23,.45);
  backdrop-filter:saturate(110%) blur(2px);
}
.hero-logo img{ width:160px; height:auto; filter:drop-shadow(0 8px 26px rgba(251,191,36,.24)); }

/* CARDS */
.cards{ display:grid; grid-template-columns:repeat(3,1fr); gap:16px; margin:8px 0 28px; }
.fcard{ position:relative; border-radius:16px; overflow:hidden; min-height:260px; border:1px solid #1e293b; }
.fcard img{ width:100%; height:100%; object-fit:cover; position:absolute; inset:0; }
.overlay{
  position:absolute; inset:0;
  background:
    linear-gradient(180deg, rgba(0,0,0,.10), rgba(0,0,0,.86));
}
.content{
  position:relative; z-index:2; padding:16px;
  backdrop-filter: blur(1.5px) saturate(110%);
  text-shadow: 0 1px 2px rgba(0,0,0,.45);
}
.content h3{ margin:0 0 8px; }
.content li{ margin:.28rem 0; }

/* RUTAS */
.rutas{ padding:40px 0; background:rgba(15,23,42,.35); border-top:1px solid #152238; border-bottom:1px solid #152238; }
.rutas h2{ margin-bottom:4px; }
.flow{ display:grid; gap:14px; grid-template-columns:repeat(3,1fr); margin-top:12px; }
.pill{ background:#0f172a; padding:16px; border-radius:14px; border:1px solid #1e293b; }

/* CALENDARIO + REQUISITOS */
.grid2{ display:grid; grid-template-columns:1fr 1fr; gap:16px; margin:28px 0; }
.box{ background:#0f172a; border:1px solid #1e293b; border-radius:14px; padding:18px; }

/* GALERÍA */
.g{ display:grid; grid-template-columns:repeat(3,1fr); gap:10px; }
.gx{ position:relative; }
.gx::after{
  content:""; position:absolute; inset:0;
  background:linear-gradient(180deg, rgba(0,0,0,.00), rgba(0,0,0,.28));
  border-radius:12px; pointer-events:none;
}
.g img{ width:100%; height:210px; object-fit:cover; border-radius:12px; }

/* APOYOS */
.apoyos{ padding:8px 0 0; }
.apoyo-box{ background:#0f172a; border:1px solid #1e293b; border-radius:16px; padding:20px; display:flex; justify-content:space-between; align-items:center; }

/* FORMULARIO */
.formulario{ padding:8px 0; }
.form-box{ background:#0f172a; border:1px solid #1e293b; border-radius:16px; padding:24px; text-align:center; }
.fields{ display:grid; gap:12px; margin:16px 0; }
input,select,textarea{ width:100%; padding:.7rem .9rem; border-radius:10px; border:1px solid #263246; background:#111827; color:#f1f5f9; }
input:focus,select:focus,textarea:focus{ outline:2px solid #FBBF24; }

/* CTA FINAL */
.cta-final{ background:linear-gradient(135deg,rgba(245,158,11,.16),rgba(88,80,236,.16)); padding:36px 0; margin-top:40px; border-top:1px solid #1e293b; }
.inner{ display:flex; justify-content:space-between; align-items:center; gap:14px; }

/* BOTONES */
.btn{ display:inline-flex; align-items:center; justify-content:center; padding:.82rem 1.05rem; border-radius:12px; font-weight:800; text-decoration:none; cursor:pointer; border:1px solid transparent; transition:.18s ease; }
.btn-primary{ background:linear-gradient(180deg,#fbbf24,#f59e0b); color:#0b1220; border-color:#d97706; }
.btn-primary:hover{ transform:translateY(-2px); box-shadow:0 18px 36px rgba(245,158,11,.25); }
.btn-outline{ border-color:#475569; color:#f1f5f9; background:transparent; }
.btn-outline:hover{ transform:translateY(-2px); box-shadow:0 18px 36px rgba(2,6,23,.28); }

/* RESPONSIVE */
@media(max-width:980px){
  .hero-grid{ grid-template-columns:1fr; }
  .hero-logo{ justify-self:start; }
  .cards{ grid-template-columns:1fr; }
  .flow{ grid-template-columns:1fr; }
  .grid2{ grid-template-columns:1fr; }
  .g{ grid-template-columns:1fr 1fr; }
  .inner{ flex-direction:column; align-items:flex-start; }
}
@media(max-width:640px){
  .g{ grid-template-columns:1fr; }
}
`;