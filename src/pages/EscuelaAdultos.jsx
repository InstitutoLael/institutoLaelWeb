// src/pages/EscuelaAdultos.jsx
import HeroImg from "../assets/img/office-bg.jpg";
import Aula1 from "../assets/img/bootcamp.jpg";
import Aula2 from "../assets/img/coaching.jpg";
import Aula3 from "../assets/img/inclusion.jpg";
import Gal1 from "../assets/img/hs.jpg";
import Gal2 from "../assets/img/study-online.jpg";
import Gal3 from "../assets/img/soft.jpg";

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
            <h1>
              Termina tus estudios <span>con apoyo real</span>
            </h1>
            <p className="lead">
              Programa flexible para personas adultas (18+) que necesitan completar su
              enseñanza Básica o Media, incluyendo quienes retoman tras años, migran desde{" "}
              <strong>homeschool</strong> o buscan reinserción educativa.
            </p>

            <div className="cta">
              <a
                className="btn btn-primary"
                href="https://wa.me/56964626568?text=Hola%20%F0%9F%91%8B%20me%20interesa%20la%20Escuela%20para%20Adultos"
                target="_blank"
                rel="noreferrer"
              >
                Hablar por WhatsApp
              </a>
              <a className="btn btn-outline" href="#formulario">
                Preinscribirme
              </a>
            </div>

            <ul className="chips">
              <li>Horarios PM</li>
              <li>Clases en vivo + grabaciones</li>
              <li>Ajustado a Exámenes Libres</li>
              <li>Plan personalizado</li>
            </ul>
          </div>

          <div className="hero-icon" aria-hidden>
            <svg viewBox="0 0 256 256">
              <path
                fill="none"
                stroke="currentColor"
                strokeWidth="12"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 120l112-48 112 48-112 48-112-48zM64 144v32c0 22 40 40 64 40s64-18 64-40v-32"
              />
              <circle cx="208" cy="184" r="10" />
            </svg>
          </div>
        </div>
      </section>

      {/* SECCIONES PRINCIPALES */}
      <section className="cards container reveal">
        <FeatureCard
          img={Aula1}
          title="¿A quién va dirigido?"
          bullets={[
            "Adultos que no completaron Básica o Media.",
            "Jóvenes 18+ que dejan homeschool.",
            "Personas en procesos de reinserción educativa.",
          ]}
        />
        <FeatureCard
          img={Aula2}
          title="Horarios y modalidad"
          bullets={[
            "Clases 100% online, en vivo y quedan grabadas.",
            "Tarde/noche para compatibilizar con trabajo o familia.",
            "Acompañamiento semanal y seguimiento personalizado.",
          ]}
        />
        <FeatureCard
          img={Aula3}
          title="Certificación"
          bullets={[
            "Alineado a Exámenes Libres (Mineduc).",
            "Rúbricas claras, metas por tramo.",
            "Planificación personalizada.",
          ]}
        />
      </section>

      {/* RUTAS */}
      <section className="rutas reveal">
        <div className="container">
          <h2>Elige tu ruta</h2>
          <p className="muted">
            Planificamos según tu tramo y fecha de rendición. Cada ruta tiene clases, guías
            y acompañamiento.
          </p>

          <div className="flow">
            <div className="pill">
              <h3>1° a 8° Básico</h3>
              <p>Alfabetización académica, cálculo base y comprensión lectora.</p>
            </div>
            <div className="pill">
              <h3>1° y 2° Medio</h3>
              <p>Refuerzo de bases, lenguaje, matemáticas y ciencias.</p>
            </div>
            <div className="pill">
              <h3>3° y 4° Medio</h3>
              <p>Preparación intensiva y simulacros de Exámenes Libres.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CALENDARIO + REQUISITOS */}
      <section className="grid2 container reveal">
        <div className="box">
          <h3>Calendario PM (referencial)</h3>
          <ul className="list">
            <li>Lunes y Miércoles: 19:00–20:20 — Lenguaje / Comunicación</li>
            <li>Martes y Jueves: 19:00–20:20 — Matemática</li>
            <li>Viernes: 19:00–20:00 — Taller de repaso y apoyo</li>
          </ul>
          <small className="muted">
            *Los horarios pueden ajustarse según tramo y disponibilidad.
          </small>
        </div>

        <div className="box">
          <h3>Requisitos y documentos</h3>
          <ul className="list">
            <li>Cédula de identidad vigente.</li>
            <li>Certificados previos (si los tienes) para ubicar tu tramo.</li>
            <li>Compromiso de asistencia mínima (75%).</li>
          </ul>
        </div>
      </section>

      {/* GALERÍA */}
      <section className="galeria reveal">
        <div className="container g">
          <figure>
            <img src={Gal1} alt="Clase en línea" />
          </figure>
          <figure>
            <img src={Gal2} alt="Estudio con acompañamiento" />
          </figure>
          <figure>
            <img src={Gal3} alt="Ambiente de apoyo" />
          </figure>
        </div>
      </section>

      {/* APOYOS */}
      <section className="apoyos reveal">
        <div className="container apoyo-box">
          <div>
            <h2>Apoyos y becas (caso a caso)</h2>
            <p className="muted">
              Evaluamos apoyos económicos según tu situación (prioridad: reinserción y jefas
              de hogar). No son becas masivas: cada caso se revisa con cuidado.
            </p>
          </div>
          <div className="actions">
            <a
              className="btn btn-primary"
              href="https://wa.me/56964626568"
              target="_blank"
              rel="noreferrer"
            >
              Consultar por apoyo
            </a>
          </div>
        </div>
      </section>

      {/* FORMULARIO CORTO */}
      <section id="formulario" className="formulario reveal">
        <div className="container form-box">
          <h2>Preinscripción rápida 📝</h2>
          <p className="muted">
            Completa tus datos y nos pondremos en contacto para orientarte.
          </p>

          <form
            action="mailto:contacto@institutolael.cl"
            method="post"
            encType="text/plain"
          >
            <div className="fields">
              <input type="text" name="Nombre" placeholder="Nombre completo" required />
              <input type="tel" name="WhatsApp" placeholder="WhatsApp (ej: +569...)" />
              <select name="Tramo" required>
                <option value="">Tramo que deseas cursar</option>
                <option>1° a 8° Básico</option>
                <option>1° y 2° Medio</option>
                <option>3° y 4° Medio</option>
              </select>
              <textarea
                name="Mensaje"
                placeholder="Cuéntanos brevemente tu situación o consulta"
                rows="3"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Enviar preinscripción
            </button>
          </form>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="cta-final reveal">
        <div className="container inner">
          <div>
            <h3>Nunca es tarde para terminar el colegio.</h3>
            <p className="muted">
              Estudia con método, en la tarde y con acompañamiento real.
            </p>
          </div>
          <div className="actions">
            <a
              className="btn btn-primary"
              href="https://wa.me/56964626568"
              target="_blank"
              rel="noreferrer"
            >
              Hablar por WhatsApp
            </a>
            <a className="btn btn-outline" href="#formulario">
              Preinscribirme
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ---------- Tarjeta de características ---------- */
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

/* ---------- Estilos ---------- */
const css = `
.adultos { background:#0b1220; color:#f1f5f9; font-family:system-ui, sans-serif; }
.container{ width:min(1120px,92vw); margin:0 auto }

/* HERO */
.hero{ position:relative; overflow:hidden; }
.hero-bg{ position:absolute; inset:0; background:url(${HeroImg}); background-size:cover; background-position:center; filter:brightness(.5); }
.hero-grid{ position:relative; z-index:2; display:grid; grid-template-columns:1.2fr .8fr; gap:24px; padding:72px 0; }
.hero-copy h1 span{ color:#FBBF24; }
.hero-icon{ display:grid; place-items:center; background:rgba(17,24,39,.6); border-radius:20px; color:#FBBF24; }
.hero-icon svg{ width:120px; height:120px; }
.kicker{ background:#2563eb; padding:.35rem .6rem; border-radius:999px; font-weight:700; }
.chips{ display:flex; flex-wrap:wrap; gap:8px; list-style:none; margin-top:10px; }
.chips li{ background:rgba(255,255,255,.1); padding:.4rem .7rem; border-radius:999px; font-size:.9rem; }

/* CARDS */
.cards{ display:grid; grid-template-columns:repeat(3,1fr); gap:16px; margin:24px 0; }
.fcard{ position:relative; border-radius:14px; overflow:hidden; min-height:250px; }
.fcard img{ width:100%; height:100%; object-fit:cover; position:absolute; inset:0; }
.overlay{ position:absolute; inset:0; background:linear-gradient(180deg,rgba(0,0,0,.1),rgba(0,0,0,.85)); }
.content{ position:relative; z-index:2; padding:16px; }
.content h3{ margin-bottom:6px; }
.content li{ margin:.2rem 0; }

/* RUTAS */
.rutas{ padding:40px 0; background:rgba(15,23,42,.4); }
.flow{ display:grid; gap:14px; grid-template-columns:repeat(3,1fr); }
.pill{ background:#111827; padding:16px; border-radius:12px; border:1px solid #1e293b; }

/* CALENDARIO + REQUISITOS */
.grid2{ display:grid; grid-template-columns:1fr 1fr; gap:16px; margin:30px 0; }
.box{ background:#111827; border:1px solid #1e293b; border-radius:12px; padding:16px; }

/* GALERÍA */
.g{ display:grid; grid-template-columns:repeat(3,1fr); gap:10px; }
.g img{ width:100%; height:200px; object-fit:cover; border-radius:10px; }

/* APOYOS */
.apoyo-box{ background:#111827; border:1px solid #1e293b; border-radius:14px; padding:20px; display:flex; justify-content:space-between; align-items:center; }

/* FORMULARIO */
.form-box{ background:#111827; border:1px solid #1e293b; border-radius:14px; padding:24px; text-align:center; }
.fields{ display:grid; gap:12px; margin:16px 0; }
input,select,textarea{ width:100%; padding:.7rem .9rem; border-radius:8px; border:none; background:#1f2937; color:#f1f5f9; }
input:focus,select:focus,textarea:focus{ outline:2px solid #FBBF24; }

/* CTA FINAL */
.cta-final{ background:linear-gradient(135deg,rgba(245,158,11,.18),rgba(88,80,236,.18)); padding:36px 0; margin-top:40px; border-top:1px solid #1f2a44; }
.inner{ display:flex; justify-content:space-between; align-items:center; gap:12px; }

/* BOTONES */
.btn{ display:inline-flex; align-items:center; justify-content:center; padding:.8rem 1rem; border-radius:10px; font-weight:700; text-decoration:none; cursor:pointer; border:1px solid transparent; transition:.2s; }
.btn-primary{ background:linear-gradient(180deg,#fbbf24,#f59e0b); color:#0b1220; }
.btn-outline{ border-color:#475569; color:#f1f5f9; background:transparent; }

/* RESPONSIVE */
@media(max-width:960px){
  .hero-grid{ grid-template-columns:1fr; text-align:center; }
  .cards{ grid-template-columns:1fr; }
  .flow{ grid-template-columns:1fr; }
  .grid2{ grid-template-columns:1fr; }
  .g{ grid-template-columns:1fr 1fr; }
  .inner{ flex-direction:column; }
}
@media(max-width:640px){
  .g{ grid-template-columns:1fr; }
}
`;