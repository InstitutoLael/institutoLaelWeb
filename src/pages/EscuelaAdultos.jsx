// src/pages/EscuelaAdultos.jsx
import { useEffect } from "react";
import SEOHead from "../components/SEOHead";
import { seoDefaults } from "../seo.config";

// Assets (mantengo tu patrón new URL para Vite)
const LogoMark = new URL("../assets/img/Logos/lael-inst-blanco.png", import.meta.url).href;

// Tarjetas con foto
const Aula1 = new URL("../assets/img/lael/bootcamp.jpg", import.meta.url).href;
const Aula2 = new URL("../assets/img/lael/coaching.jpg", import.meta.url).href;
const Aula3 = new URL("../assets/img/lael/inclusion.jpg", import.meta.url).href;

// Galería
const Gal1 = new URL("../assets/img/lael/hs.jpg", import.meta.url).href;
const Gal2 = new URL("../assets/img/lael/study-online.jpg", import.meta.url).href;
const Gal3 = new URL("../assets/img/lael/soft.jpg", import.meta.url).href;

export default function EscuelaAdultos() {
  // UX: “no te vayas” cuando el usuario sale de la pestaña
  useEffect(() => {
    const onBlur = () => (document.title = "No te vayas 💛 Termina tus estudios");
    const onFocus = () => (document.title = "Escuela para Adultos | Instituto Lael");
    window.addEventListener("blur", onBlur);
    window.addEventListener("focus", onFocus);
    // título inicial
    document.title = "Escuela para Adultos | Instituto Lael";
    return () => {
      window.removeEventListener("blur", onBlur);
      window.removeEventListener("focus", onFocus);
    };
  }, []);

  // ---------- SEO JSON-LD ----------
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Instituto Lael SpA",
      "url": seoDefaults.site,
      "logo": `${seoDefaults.site}/meta/logo-lael.png`,
      "sameAs": [
        "https://www.instagram.com/institutolael",
        "https://www.youtube.com/@institutolael",
        "https://www.linkedin.com/company/instituto-lael/"
      ],
      "contactPoint": [{
        "@type": "ContactPoint",
        "telephone": "+56 9 6462 6568",
        "contactType": "customer support",
        "areaServed": "CL",
        "availableLanguage": ["Spanish"]
      }]
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": "Escuela para Adultos (Básica y Media)",
      "provider": {
        "@type": "Organization",
        "name": "Instituto Lael SpA",
        "url": seoDefaults.site
      },
      "areaServed": "Chile",
      "url": `${seoDefaults.site}/escuela-adultos`,
      "description": "Programa flexible para personas adultas (18+) que necesitan completar su enseñanza Básica o Media. Online en vivo + grabaciones. Alineado a Exámenes Libres (Mineduc)."
    },
    {
      "@context": "https://schema.org",
      "@type": "Course",
      "name": "Escuela para Adultos — Enseñanza Básica y Media (Exámenes Libres)",
      "description": "Clases online en vivo y grabadas. Plan personalizado, horarios PM, acompañamiento y simulacros. Pensado para retomar estudios y rendir Exámenes Libres.",
      "provider": {
        "@type": "Organization",
        "name": "Instituto Lael SpA",
        "sameAs": seoDefaults.site
      }
    }
  ];

  return (
    <div className="adultos">
      {/* SEO */}
      <SEOHead
        title="Escuela para Adultos"
        description="Termina tus estudios con apoyo real: programa flexible para adultos (18+) que necesitan completar Básica o Media. Clases online en vivo + grabaciones, horarios PM y preparación para Exámenes Libres (Mineduc)."
        path="/escuela-adultos"
        image={`${seoDefaults.site}/meta/og-escuela-adultos.jpg`}
        jsonLd={jsonLd}
      />

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

          {/* Logo en tarjeta translúcida */}
          <div className="hero-logo" aria-hidden>
            <img src={LogoMark} alt="Instituto Lael" loading="eager" decoding="async" />
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

          {/* 👉 Aquí irá el Google Form embebido cuando lo tengas */}
          <div className="google-form-placeholder">
            <p>Formulario próximamente disponible aquí.</p>
            <small>Podrás completar tu preinscripción directamente con tu cuenta de Google.</small>
          </div>
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
.adultos { background:#0b1220; color:#f1f5f9; font-family:system-ui, sans-serif; line-height:1.6; }
.container{ width:min(1120px,92vw); margin:0 auto; }

/* HERO */
.hero{ position:relative; overflow:hidden; margin-bottom:80px; }
.hero-bg{
  position:absolute; inset:0;
  background:linear-gradient(180deg, rgba(11,18,32,0.85), rgba(11,18,32,0.98));
}
.hero-grid{ position:relative; z-index:2; display:grid; grid-template-columns:1.2fr .8fr; gap:48px; padding:100px 0 80px; align-items:center; }
.hero-copy h1{ margin:.6rem 0 1.2rem; letter-spacing:.3px; font-weight:900; }
.hero-copy h1 span{ color:#FBBF24; }
.kicker{ display:inline-block; background:#2563eb; padding:.42rem .8rem; border-radius:999px; font-weight:800; }
.lead{ max-width:760px; opacity:.95; font-size:1.08rem; margin-bottom:20px; }
.chips{ display:flex; flex-wrap:wrap; gap:10px; list-style:none; margin:20px 0 0; }
.chips li{ background:rgba(255,255,255,.10); padding:.5rem .9rem; border-radius:999px; border:1px solid #253049; font-size:.95rem; }

/* Hero logo */
.hero-logo{ display:grid; place-items:center; padding:36px; border-radius:20px;
  background:rgba(17,24,39,.55); border:1px solid #1e293b;
  box-shadow:0 20px 48px rgba(2,6,23,.45);
  backdrop-filter:saturate(110%) blur(3px);
}
.hero-logo img{ width:180px; height:auto; filter:drop-shadow(0 6px 24px rgba(255,255,255,.25)); }

/* CARDS */
.cards{ display:grid; grid-template-columns:repeat(3,1fr); gap:24px; margin:60px 0 80px; }
.fcard{ position:relative; border-radius:18px; overflow:hidden; min-height:280px; border:1px solid #1e293b; }
.fcard img{ width:100%; height:100%; object-fit:cover; position:absolute; inset:0; }
.overlay{ position:absolute; inset:0; background:linear-gradient(180deg, rgba(0,0,0,.2), rgba(0,0,0,.7)); }
.content{ position:relative; z-index:2; padding:24px; text-shadow:0 1px 2px rgba(0,0,0,.45); }

/* RUTAS */
.rutas{ padding:60px 0; background:rgba(15,23,42,.35); border-top:1px solid #152238; border-bottom:1px solid #152238; margin-bottom:80px; }
.flow{ display:grid; gap:24px; grid-template-columns:repeat(3,1fr); margin-top:20px; }
.pill{ background:#0f172a; padding:20px; border-radius:16px; border:1px solid #1e293b; }

/* CALENDARIO + REQUISITOS */
.grid2{ display:grid; grid-template-columns:1fr 1fr; gap:24px; margin:60px 0; }
.box{ background:#0f172a; border:1px solid #1e293b; border-radius:16px; padding:24px; }

/* GALERÍA */
.g{ display:grid; grid-template-columns:repeat(3,1fr); gap:16px; margin:60px 0; }
.g img{ width:100%; height:220px; object-fit:cover; border-radius:14px; }

/* APOYOS */
.apoyos{ padding:60px 0 0; margin-bottom:80px; }
.apoyo-box{ background:#0f172a; border:1px solid #1e293b; border-radius:18px; padding:28px; display:flex; justify-content:space-between; align-items:center; gap:24px; }

/* FORMULARIO */
.formulario{ padding:80px 0; }
.form-box{ background:#0f172a; border:1px solid #1e293b; border-radius:18px; padding:36px; text-align:center; }
.google-form-placeholder{ margin-top:20px; background:rgba(255,255,255,.04); border-radius:12px; padding:40px 20px; border:1px dashed #334155; }
.google-form-placeholder p{ font-weight:600; margin-bottom:6px; }

/* CTA FINAL */
.cta-final{ background:linear-gradient(135deg,rgba(245,158,11,.16),rgba(88,80,236,.16)); padding:60px 0; margin-top:80px; border-top:1px solid #1e293b; }
.inner{ display:flex; justify-content:space-between; align-items:center; gap:20px; }

/* BOTONES */
.btn{ display:inline-flex; align-items:center; justify-content:center; padding:.9rem 1.2rem; border-radius:12px; font-weight:800; text-decoration:none; cursor:pointer; border:1px solid transparent; transition:.18s ease; }
.btn-primary{ background:linear-gradient(180deg,#fbbf24,#f59e0b); color:#0b1220; border-color:#d97706; }
.btn-primary:hover{ transform:translateY(-2px); box-shadow:0 18px 36px rgba(245,158,11,.25); }
.btn-outline{ border-color:#475569; color:#f1f5f9; background:transparent; }
.btn-outline:hover{ transform:translateY(-2px); box-shadow:0 18px 36px rgba(2,6,23,.28); }

/* RESPONSIVE */
@media(max-width:980px){
  .hero-grid{ grid-template-columns:1fr; gap:40px; }
  .hero-logo{ justify-self:center; }
  .cards, .flow, .grid2, .g{ grid-template-columns:1fr; }
  .inner{ flex-direction:column; align-items:flex-start; }
}
@media(max-width:640px){
  .hero-copy h1{ font-size:1.8rem; }
  .hero-logo img{ width:140px; }
}
`;