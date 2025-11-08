// src/pages/EscuelaAdultos.jsx
import { useEffect } from "react";
import SEOHead from "../components/SEOHead";
import { seoDefaults } from "../seo.config";

// Assets (patrón Vite new URL)
const LogoMark = new URL("../assets/img/Logos/lael-inst-blanco.png", import.meta.url).href;

// Tarjetas con foto (si no existen, puedes comentar estas 3 líneas)
const Aula1 = new URL("../assets/img/lael/bootcamp.jpg", import.meta.url).href;
const Aula2 = new URL("../assets/img/lael/coaching.jpg", import.meta.url).href;
const Aula3 = new URL("../assets/img/lael/inclusion.jpg", import.meta.url).href;

// Galería
const Gal1 = new URL("../assets/img/lael/hs.jpg", import.meta.url).href;
const Gal2 = new URL("../assets/img/lael/study-online.jpg", import.meta.url).href;
const Gal3 = new URL("../assets/img/lael/soft.jpg", import.meta.url).href;

export default function EscuelaAdultos() {
  // UX: “no te vayas” cuando se pierde foco
  useEffect(() => {
    const onBlur = () => (document.title = "No te vayas 💛 Termina tus estudios");
    const onFocus = () => (document.title = "Escuela para Adultos | Instituto Lael");
    window.addEventListener("blur", onBlur);
    window.addEventListener("focus", onFocus);
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
            {/* SIN sello/kicker arriba para no duplicar logo */}
            <h1>Escuela para Adultos</h1>
            <p className="sub">Termina tus estudios con apoyo real</p>
            <p className="lead">
              Programa flexible para personas adultas (18+) que necesitan completar su
              enseñanza Básica o Media: quienes retoman tras años, migran desde <strong>homeschool</strong>
              o buscan reinserción educativa.
            </p>

            <ul className="chips" aria-label="Características del programa">
              <li>Horarios PM</li>
              <li>Clases en vivo + grabaciones</li>
              <li>Ajustado a Exámenes Libres</li>
              <li>Plan personalizado</li>
            </ul>

            <div className="cta">
              <a className="btn btn-primary" href="#formulario">
                Preinscribirme
                <span className="arrow">→</span>
              </a>

              <a
                className="btn btn-wa"
                href="https://wa.me/56964626568?text=Hola%20%F0%9F%91%8B%20me%20interesa%20la%20Escuela%20para%20Adultos"
                target="_blank"
                rel="noreferrer"
              >
                <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="wa-ico">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"/>
                  <path d="M12.046 2a9.95 9.95 0 0 0-8.6 14.971L2 22l5.18-1.374A9.95 9.95 0 1 0 12.046 2zM7.2 18.4l-.311.09-3.023.802.807-2.947.093-.317A8.05 8.05 0 1 1 7.2 18.4z"/>
                </svg>
                Consultar ahora
              </a>
            </div>
          </div>

          {/* Logo en tarjeta translúcida a la derecha */}
          <div className="hero-logo" aria-hidden>
            <img src={LogoMark} alt="Instituto Lael" loading="eager" decoding="async" />
          </div>
        </div>
      </section>

      {/* RUTAS */}
      <section className="rutas">
        <div className="container">
          <h2>Elige tu ruta educativa</h2>
          <p className="muted">Planificamos según tu nivel y fecha objetivo de rendición.</p>

          <div className="flow">
            <div className="pill">
              <span className="tag">Básica</span>
              <h3>1° a 8° Básico</h3>
              <ul>
                <li>Matemáticas básicas</li>
                <li>Comprensión lectora</li>
                <li>Ciencias naturales</li>
                <li>Historia y geografía</li>
              </ul>
            </div>
            <div className="pill">
              <span className="tag violeta">Media inicial</span>
              <h3>1° y 2° Medio</h3>
              <ul>
                <li>Álgebra y geometría</li>
                <li>Literatura y redacción</li>
                <li>Biología y química</li>
                <li>Inglés básico</li>
              </ul>
            </div>
            <div className="pill">
              <span className="tag slate">Media final</span>
              <h3>3° y 4° Medio</h3>
              <ul>
                <li>Preparación Exámenes Libres</li>
                <li>Simulacros</li>
                <li>Orientación vocacional</li>
                <li>Certificación Mineduc</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* HORARIOS */}
      <section className="grid2 container">
        <div className="box box-slim">
          <h2>Horarios compatibles con tu vida</h2>
          <p className="muted">Clases vespertinas pensadas para adultos que trabajan.</p>

          <div className="horarios">
            <div className="h-card">
              <div className="h-day">LUN &amp; MIÉ</div>
              <div className="h-time">19:00 — 20:20</div>
              <div className="h-sub">Lenguaje y Comunicación</div>
            </div>
            <div className="h-card">
              <div className="h-day">MAR &amp; JUE</div>
              <div className="h-time">19:00 — 20:20</div>
              <div className="h-sub">Matemática</div>
            </div>
            <div className="h-card">
              <div className="h-day">VIERNES</div>
              <div className="h-time">19:00 — 20:00</div>
              <div className="h-sub">Taller de estudio y repaso</div>
            </div>
          </div>

          <p className="nota">* Horarios sujetos a tramo y disponibilidad. Todas las clases quedan grabadas.</p>
        </div>
      </section>

      {/* ¿QUÉ INCLUYE? */}
      <section className="incluye">
        <div className="container">
          <h2>¿Qué incluye el programa?</h2>
          <p className="muted">Todo lo que necesitas para completar tu educación exitosamente.</p>

          <div className="cards6">
            <FeatureTile title="100% Online en Vivo" desc="Clases interactivas que quedan grabadas para repasar cuando necesites." />
            <FeatureTile title="Horarios Flexibles" desc="Tarde/noche para estudiar sin dejar trabajo o responsabilidades." />
            <FeatureTile title="Acompañamiento Personal" desc="Seguimiento individualizado y apoyo constante." />
            <FeatureTile title="Certificación Oficial" desc="Alineado con Exámenes Libres del Mineduc." />
            <FeatureTile title="Ambiente de Respeto" desc="Comunidad de apoyo, sin juicios, hecha para adultos." />
            <FeatureTile title="Becas Disponibles" desc="Apoyos económicos caso a caso (prioridad: reinserción y jefas de hogar)." />
          </div>
        </div>
      </section>

      {/* REQUISITOS + CTA lateral */}
      <section className="req-cta container">
        <div className="req">
          <h2>Requisitos <span className="hl">simples</span></h2>
          <p className="muted">Solo necesitas lo básico para comenzar tu proceso educativo.</p>

          <ul className="req-list">
            <li><strong>Cédula de identidad vigente</strong> · Documento oficial actualizado</li>
            <li><strong>Certificados previos (si los tienes)</strong> · Cualquier documentación educativa</li>
            <li><strong>Compromiso de asistencia</strong> · Mínimo 75% de participación en clases</li>
          </ul>
        </div>

        <aside className="panel">
          <h3>¿Listo para comenzar?</h3>
          <p>Completa tu preinscripción y te orientamos sobre la mejor ruta.</p>
          <a className="btn btn-primary wfull" href="#formulario">
            Preinscribirme ahora <span className="arrow">→</span>
          </a>
          <a
            className="btn btn-wa wfull"
            href="https://wa.me/56964626568?text=Hola%20%F0%9F%91%8B%20me%20interesa%20la%20Escuela%20para%20Adultos"
            target="_blank"
            rel="noreferrer"
          >
            <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="wa-ico">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"/>
              <path d="M12.046 2a9.95 9.95 0 0 0-8.6 14.971L2 22l5.18-1.374A9.95 9.95 0 1 0 12.046 2zM7.2 18.4l-.311.09-3.023.802.807-2.947.093-.317A8.05 8.05 0 1 1 7.2 18.4z"/>
            </svg>
            Consultar ahora
          </a>
        </aside>
      </section>

      {/* GALERÍA */}
      <section className="galeria">
        <div className="container g">
          <figure className="gx"><img src={Gal1} alt="Clase en línea con acompañamiento" /></figure>
          <figure className="gx"><img src={Gal2} alt="Estudio en casa con guía" /></figure>
          <figure className="gx"><img src={Gal3} alt="Ambiente amable para aprender" /></figure>
        </div>
      </section>

      {/* FORMULARIO */}
      <section id="formulario" className="formulario">
        <div className="container form-box">
          <h2>Preinscripción rápida 📝</h2>
          <p className="muted">Completa tus datos y te contactamos para orientarte.</p>
          <div className="google-form-placeholder">
            <p>Formulario disponible aquí muy pronto.</p>
            <small>Podrás completar tu preinscripción directamente con tu cuenta de Google.</small>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="cta-final">
        <div className="container inner">
          <div>
            <h3>Nunca es tarde para terminar el colegio</h3>
            <p className="muted">Estudia con método, en horarios compatibles y con acompañamiento real.</p>
          </div>
          <div className="actions">
            <a className="btn btn-primary" href="#formulario">Comenzar mi proceso <span className="arrow">→</span></a>
            <a
              className="btn btn-wa"
              href="https://wa.me/56964626568?text=Hola%20%F0%9F%91%8B%20me%20interesa%20la%20Escuela%20para%20Adultos"
              target="_blank"
              rel="noreferrer"
            >
              <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="wa-ico">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"/>
                <path d="M12.046 2a9.95 9.95 0 0 0-8.6 14.971L2 22l5.18-1.374A9.95 9.95 0 1 0 12.046 2zM7.2 18.4l-.311.09-3.023.802.807-2.947.093-.317A8.05 8.05 0 1 1 7.2 18.4z"/>
              </svg>
              Consultar ahora
            </a>
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

function FeatureTile({ title, desc }) {
  return (
    <div className="tile">
      <span className="ico" aria-hidden />
      <h3>{title}</h3>
      <p>{desc}</p>
    </div>
  );
}

const css = `
.adultos { background:#0b1220; color:#f1f5f9; font-family:system-ui, -apple-system, Segoe UI, Roboto, sans-serif; line-height:1.6; }
.container{ width:min(1120px,92vw); margin:0 auto; }

/* HERO */
.hero{ position:relative; overflow:hidden; margin-bottom:0; }
.hero-bg{
  position:absolute; inset:0;
  background:
    radial-gradient(900px 240px at 10% -20%, rgba(88,80,236,.10), transparent 60%),
    radial-gradient(900px 240px at 90% -20%, rgba(22,163,74,.08), transparent 60%),
    linear-gradient(180deg, rgba(11,18,32,0.85), rgba(11,18,32,0.98));
}
.hero-grid{ position:relative; z-index:2; display:grid; grid-template-columns:1.2fr .8fr; gap:48px; padding:72px 0 24px; align-items:center; }
.hero-copy h1{ margin:0 0 .2rem; letter-spacing:.3px; font-weight:900; font-size:2.7rem; }
.hero-copy .sub{ margin:.25rem 0 1rem; color:#cbd5e1; font-weight:700; }
.lead{ max-width:760px; opacity:.95; font-size:1.08rem; margin-bottom:20px; }
.chips{ display:flex; flex-wrap:wrap; gap:10px; list-style:none; margin:20px 0 22px; padding:0; }
.chips li{ background:rgba(255,255,255,.10); padding:.5rem .9rem; border-radius:999px; border:1px solid #253049; font-size:.95rem; }

/* Hero logo */
.hero-logo{ display:grid; place-items:center; padding:36px; border-radius:20px;
  background:rgba(17,24,39,.55); border:1px solid #1e293b;
  box-shadow:0 20px 48px rgba(2,6,23,.45);
  backdrop-filter:saturate(110%) blur(3px); min-height:220px;
}
.hero-logo img{ width:180px; height:auto; filter:drop-shadow(0 6px 24px rgba(255,255,255,.25)); }

/* BOTONES */
.btn{ display:inline-flex; align-items:center; justify-content:center; gap:.55rem; padding:.9rem 1.2rem; border-radius:12px; font-weight:800; text-decoration:none; cursor:pointer; border:1px solid transparent; transition:.18s ease; }
.btn .arrow{ margin-left:.35rem; }
.btn-primary{ background:linear-gradient(180deg,#fbbf24,#f59e0b); color:#0b1220; border-color:#d97706; }
.btn-primary:hover{ transform:translateY(-2px); box-shadow:0 18px 36px rgba(245,158,11,.25); }
.btn-wa{ color:#0a3d21; background:#25D366; border:1px solid #128C7E; }
.btn-wa:hover{ transform:translateY(-2px); box-shadow:0 18px 36px rgba(37,211,102,.25); }
.wa-ico{ display:block; }
.wfull{ width:100%; }

/* RUTAS */
.rutas{ padding:40px 0; background:rgba(15,23,42,.35); border-top:1px solid #152238; border-bottom:1px solid #152238; margin:0 0 80px; }
.rutas h2{ margin:0 0 6px; }
.flow{ display:grid; gap:24px; grid-template-columns:repeat(3,1fr); margin-top:16px; }
.pill{ background:#0f172a; padding:22px; border-radius:16px; border:1px solid #1e293b; transition:.15s ease; }
.pill:hover{ transform:translateY(-2px); border-color:#2e3c5c; box-shadow:0 16px 36px rgba(2,6,23,.25); }
.pill .tag{ display:inline-block; font-size:.8rem; font-weight:800; background:#4f46e5; border:1px solid #4338ca; color:#e0e7ff; padding:.22rem .6rem; border-radius:999px; margin-bottom:10px; }
.pill .tag.violeta{ background:#7c3aed; border-color:#6d28d9; }
.pill .tag.slate{ background:#334155; border-color:#1f2937; }
.pill h3{ margin:.2rem 0 .6rem; }
.pill ul{ margin:0; padding-left:1.05rem; }

/* HORARIOS */
.grid2{ display:grid; grid-template-columns:1fr; gap:24px; margin:40px auto 40px; }
.box-slim{ background:#0f172a; border:1px solid #1e293b; border-radius:16px; padding:24px; }
.horarios{ display:grid; grid-template-columns:repeat(3,1fr); gap:16px; margin-top:6px; }
.h-card{ background:#0b1220; border:1px solid #1f2a44; border-radius:16px; padding:16px; text-align:center; }
.h-day{ font-size:.82rem; font-weight:900; color:#facc15; letter-spacing:.3px; }
.h-time{ font-size:1.35rem; font-weight:900; margin:.25rem 0; }
.h-sub{ color:#cbd5e1; }
.nota{ color:#9fb0d2; font-style:italic; margin:.75rem 0 0; }

/* ¿QUÉ INCLUYE? */
.incluye{ padding:36px 0 10px; }
.cards6{ display:grid; grid-template-columns:repeat(3,1fr); gap:20px; margin-top:16px; }
.tile{ background:#0f172a; border:1px solid #1f2a44; border-radius:16px; padding:22px; transition:.15s ease; }
.tile:hover{ transform:translateY(-2px); border-color:#2e3c5c; box-shadow:0 16px 36px rgba(2,6,23,.25); }
.tile .ico{ width:36px; height:36px; border-radius:10px; display:inline-block; background:linear-gradient(135deg,#5850EC,#f59e0b); margin-bottom:12px; }

/* REQUISITOS + PANEL */
.req-cta{ display:grid; grid-template-columns:1.2fr .8fr; gap:24px; margin:40px auto 20px; }
.req-list{ list-style:disc; padding-left:1.25rem; display:grid; gap:10px; }
.req-list li{ background:#0f172a; border:1px solid #1f2a44; border-radius:12px; padding:.9rem; }
.hl{ color:#86efac; }
.panel{ background:#0f172a; border:1px solid #1f2a44; border-radius:16px; padding:22px; align-self:start; }
.panel h3{ margin:0 0 .4rem; }

/* GALERÍA */
.galeria{ padding:10px 0 24px; }
.g{ display:grid; grid-template-columns:repeat(3,1fr); gap:16px; }
.g img{ width:100%; height:220px; object-fit:cover; border-radius:14px; }

/* FORMULARIO */
.formulario{ padding:40px 0 80px; }
.form-box{ background:#0f172a; border:1px solid #1e293b; border-radius:18px; padding:36px; text-align:center; }
.google-form-placeholder{ margin-top:20px; background:rgba(255,255,255,.04); border-radius:12px; padding:40px 20px; border:1px dashed #334155; }
.google-form-placeholder p{ font-weight:600; margin-bottom:6px; }

/* CTA FINAL */
.cta-final{ background:linear-gradient(135deg,rgba(245,158,11,.16),rgba(88,80,236,.16)); padding:36px 0; border-top:1px solid #1e293b; }
.inner{ display:flex; justify-content:space-between; align-items:center; gap:20px; }

/* MISC */
.muted{ color:#cbd5e1; }

/* RESPONSIVE */
@media(max-width:980px){
  .hero-grid{ grid-template-columns:1fr; gap:28px; }
  .hero-logo{ justify-self:center; }
  .flow, .cards6, .g{ grid-template-columns:1fr; }
  .req-cta{ grid-template-columns:1fr; }
  .horarios{ grid-template-columns:1fr; }
}
@media(max-width:640px){
  .hero-copy h1{ font-size:1.9rem; }
  .hero-logo img{ width:140px; }
}
`;