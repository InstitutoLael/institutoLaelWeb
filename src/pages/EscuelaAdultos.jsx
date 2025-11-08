// src/pages/EscuelaAdultos.jsx
import { useEffect } from "react";
import SEOHead from "../components/SEOHead";
import { seoDefaults } from "../seo.config";

// Logo marca (para sello del hero si quieres usarlo luego)
const LogoMark = new URL("../assets/img/Logos/lael-inst-blanco.png", import.meta.url).href;

export default function EscuelaAdultos() {
  // UX: titular dinámico al cambiar de pestaña
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

  // ----- SEO JSON-LD -----
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Instituto Lael SpA",
      url: seoDefaults.site,
      logo: `${seoDefaults.site}/meta/logo-lael.png`,
      sameAs: [
        "https://www.instagram.com/institutolael",
        "https://www.youtube.com/@institutolael",
        "https://www.linkedin.com/company/instituto-lael/",
      ],
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+56 9 6462 6568",
          contactType: "customer support",
          areaServed: "CL",
          availableLanguage: ["Spanish"],
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "Escuela para Adultos (Básica y Media)",
      provider: { "@type": "Organization", name: "Instituto Lael SpA", url: seoDefaults.site },
      areaServed: "Chile",
      url: `${seoDefaults.site}/escuela-adultos`,
      description:
        "Programa flexible para personas adultas (18+) que necesitan completar su enseñanza Básica o Media. Online en vivo + grabaciones. Alineado a Exámenes Libres (Mineduc).",
    },
    {
      "@context": "https://schema.org",
      "@type": "Course",
      name: "Escuela para Adultos — Enseñanza Básica y Media (Exámenes Libres)",
      description:
        "Clases online en vivo y grabadas. Plan personalizado, horarios PM, acompañamiento y simulacros. Pensado para retomar estudios y rendir Exámenes Libres.",
      provider: { "@type": "Organization", name: "Instituto Lael SpA", sameAs: seoDefaults.site },
    },
  ];

  return (
    <main className="ea">
      <SEOHead
        title="Escuela para Adultos"
        description="Termina tus estudios con apoyo real: programa flexible para adultos (18+) que necesitan completar Básica o Media. Clases online en vivo + grabaciones, horarios PM y preparación para Exámenes Libres (Mineduc)."
        path="/escuela-adultos"
        image={`${seoDefaults.site}/meta/og-escuela-adultos.jpg`}
        jsonLd={jsonLd}
      />

      <style>{css}</style>

      {/* HERO */}
      <section className="hero" id="hero">
        <div className="container">
          <div className="hero-content">
            <span className="hero-badge">Instituto Lael</span>
            <h1>Escuela para Adultos</h1>
            <p className="hero-subtitle">Termina tus estudios con apoyo real</p>
            <p className="hero-description">
              Programa flexible para personas adultas (18+) que necesitan completar su
              enseñanza Básica o Media: quienes retoman tras años, migran desde homeschool o
              buscan reinserción educativa.
            </p>

            <ul className="hero-features" aria-label="Características">
              <li className="feature-pill">Horarios PM</li>
              <li className="feature-pill">Clases en vivo + grabaciones</li>
              <li className="feature-pill">Ajustado a Exámenes Libres</li>
              <li className="feature-pill">Plan personalizado</li>
            </ul>

            <div className="hero-cta">
              <a className="btn-primary large" href="#preinscripcion">Preinscribirme ahora</a>
              <a
                className="btn-whatsapp large"
                href="https://wa.me/56964626568?text=Hola%20%F0%9F%91%8B%20me%20interesa%20la%20Escuela%20para%20Adultos"
                target="_blank"
                rel="noreferrer"
              >
                Consultar por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ¿A QUIÉN VA DIRIGIDO? */}
      <section className="section" id="target">
        <div className="container">
          <header className="section-header">
            <h2>¿A quién va dirigido?</h2>
            <p>Diseñado específicamente para adultos que necesitan completar su educación</p>
          </header>

          <div className="target-grid">
            <Card
              title="Adultos sin Básica o Media"
              desc="Personas que no completaron su enseñanza básica o media y desean retomar sus estudios con apoyo profesional."
            />
            <Card
              title="Jóvenes 18+ desde Homeschool"
              desc="Estudiantes que vienen de educación en casa y necesitan certificación oficial para continuar."
            />
            <Card
              title="Reinserción Educativa"
              desc="Personas que buscan reintegrarse al sistema educativo formal con metodología adaptada."
            />
          </div>
        </div>
      </section>

      {/* RUTAS */}
      <section className="section routes-section" id="routes">
        <div className="container">
          <header className="section-header">
            <h2>Elige tu ruta educativa</h2>
            <p>Planificamos según tu nivel actual y fecha objetivo de rendición</p>
          </header>

          <div className="routes-grid">
            <RouteCard level="Básica" title="1° a 8° Básico" featured={false}>
              <li>Matemáticas básicas</li>
              <li>Comprensión lectora</li>
              <li>Ciencias naturales</li>
              <li>Historia y geografía</li>
            </RouteCard>

            <RouteCard level="Media Inicial" title="1° y 2° Medio" featured>
              <li>Álgebra y geometría</li>
              <li>Literatura y redacción</li>
              <li>Biología y química</li>
              <li>Inglés básico</li>
            </RouteCard>

            <RouteCard level="Media Final" title="3° y 4° Medio" featured={false}>
              <li>Preparación PAES</li>
              <li>Simulacros oficiales</li>
              <li>Orientación vocacional</li>
              <li>Certificación Mineduc</li>
            </RouteCard>
          </div>
        </div>
      </section>

      {/* HORARIOS */}
      <section className="section schedule-section" id="schedule">
        <div className="container">
          <div className="schedule-card">
            <div className="schedule-header">
              <h2>Horarios compatibles con tu vida</h2>
              <p>Clases vespertinas diseñadas para adultos que trabajan</p>
            </div>

            <div className="schedule-grid">
              <ScheduleItem day="Lun & Mié" time="19:00 – 20:20" subject="Lenguaje y Comunicación" />
              <ScheduleItem day="Mar & Jue" time="19:00 – 20:20" subject="Matemática" />
              <ScheduleItem day="Viernes" time="19:00 – 20:00" subject="Taller de estudio y repaso" />
            </div>

            <p className="schedule-note">* Horarios sujetos a tramo y disponibilidad. Todas las clases quedan grabadas.</p>
          </div>
        </div>
      </section>

      {/* ¿QUÉ INCLUYE? */}
      <section className="section features-section" id="features">
        <div className="container">
          <header className="section-header">
            <h2>¿Qué incluye el programa?</h2>
            <p>Todo lo que necesitas para completar tu educación exitosamente</p>
          </header>

          <div className="features-grid">
            <Feature title="100% Online en Vivo" text="Clases interactivas que quedan grabadas para repasar cuando necesites." />
            <Feature title="Horarios Flexibles" text="Tarde/noche para compatibilizar con trabajo y familia." />
            <Feature title="Acompañamiento Personal" text="Seguimiento individualizado y apoyo constante." />
            <Feature title="Certificación Oficial" text="Alineado completamente con Exámenes Libres del Mineduc." />
            <Feature title="Ambiente de Respeto" text="Comunidad de apoyo, sin juicios, hecha para adultos." />
            <Feature title="Becas Disponibles" text="Apoyos económicos caso a caso (prioridad reinserción y jefas de hogar)." />
          </div>
        </div>
      </section>

      {/* REQUISITOS + PREINSCRIPCIÓN */}
      <section className="section requirements-section" id="requirements">
        <div className="container req-grid">
          <div className="requirements-text">
            <h2>Requisitos simples</h2>
            <p>Solo necesitas lo básico para comenzar tu proceso educativo</p>

            <ul className="requirements-list">
              <li>
                <strong>Cédula de identidad vigente</strong>
                <span> · Documento oficial actualizado</span>
              </li>
              <li>
                <strong>Certificados previos (si los tienes)</strong>
                <span> · Cualquier documentación educativa disponible</span>
              </li>
              <li>
                <strong>Compromiso de asistencia</strong>
                <span> · Mínimo 75% de participación en clases</span>
              </li>
            </ul>
          </div>

          <div className="requirements-cta" id="preinscripcion">
            <div className="cta-card">
              <h3>¿Listo para comenzar?</h3>
              <p>Completa tu preinscripción y te contactamos para orientarte.</p>
              <a className="btn-primary" href="https://forms.gle/AMhR9bXjU1xiPwyG6" target="_blank" rel="noreferrer">
                Preinscribirme ahora
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="section final-cta" id="cta">
        <div className="container final-content">
          <h2>Nunca es tarde para terminar el colegio</h2>
          <p>
            Estudia con método, en horarios compatibles y con acompañamiento real de profesionales que entienden tu
            situación.
          </p>

          <div className="final-actions">
            <a className="btn-primary large" href="https://forms.gle/AMhR9bXjU1xiPwyG6" target="_blank" rel="noreferrer">
              Comenzar mi proceso
            </a>
            <a className="btn-whatsapp large" href="https://wa.me/56964626568" target="_blank" rel="noreferrer">
              Consultar ahora
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

function Card({ title, desc }) {
  return (
    <article className="target-card">
      <div className="target-icon" aria-hidden />
      <h3>{title}</h3>
      <p>{desc}</p>
    </article>
  );
}

function RouteCard({ level, title, children, featured }) {
  return (
    <article className={"route-card" + (featured ? " featured" : "")}>
      <span className="route-level">{level}</span>
      <h3>{title}</h3>
      <ul className="route-features">{children}</ul>
    </article>
  );
}

function ScheduleItem({ day, time, subject }) {
  return (
    <div className="schedule-item">
      <div className="schedule-day">{day}</div>
      <div className="schedule-time">{time}</div>
      <div className="schedule-subject">{subject}</div>
    </div>
  );
}

function Feature({ title, text }) {
  return (
    <article className="feature-card">
      <div className="feature-icon" aria-hidden />
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  );
}

const css = `
:root{
  --indigo:#5850EC; --green:#16a34a; --rose:#e11d48; --amber:#f59e0b;
  --cta-yellow:#fde047; --cta-text:#111827;
  --wa:#25D366; --wa-dark:#128C7E;
  --nav-border:#1f2a44;
  --bg1:#0b1220; --bg2:#0f172a;
  --text1:#f8fafc; --text2:#cbd5e1; --text3:#64748b;
}
.ea{ background:var(--bg1); color:var(--text1); font-family:system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif; line-height:1.6; }
.container{ width:min(1200px,92vw); margin-inline:auto; padding-inline:1rem; }
.section{ padding:4rem 0; }
.section-header{ text-align:center; margin-bottom:3rem; }
.section-header h2{
  font-size:2.5rem; font-weight:800; margin:0 0 1rem;
  background:linear-gradient(135deg, var(--text1), var(--amber));
  -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
}
.section-header p{ color:var(--text2); font-size:1.125rem; margin:0 auto; max-width:600px; }

/* HERO */
.hero{
  position:relative; overflow:hidden; padding:6rem 0;
  background:linear-gradient(135deg, var(--bg1) 0%, var(--bg2) 100%);
}
.hero::before{
  content:""; position:absolute; inset:0;
  background:
    radial-gradient(800px 300px at 30% 20%, rgba(88,80,236,.15), transparent 55%),
    radial-gradient(800px 300px at 70% 80%, rgba(225,29,72,.15), transparent 55%);
  pointer-events:none;
}
.hero-content{ position:relative; z-index:2; text-align:center; max-width:900px; margin:0 auto; }
.hero-badge{
  display:inline-block; color:var(--indigo);
  background:rgba(88,80,236,.18); border:1px solid rgba(88,80,236,.35);
  padding:.5rem 1.5rem; border-radius:999px; font-weight:700; margin-bottom:2rem; backdrop-filter:blur(10px);
}
.hero h1{
  font-size:4rem; font-weight:900; margin:.2rem 0 1rem; line-height:1.08;
  background:linear-gradient(135deg, var(--text1), var(--cta-yellow));
  -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
}
.hero-subtitle{ font-size:1.5rem; font-weight:700; color:var(--text2); margin:0 0 .6rem; }
.hero-description{ color:var(--text2); font-size:1.125rem; max-width:700px; margin:.5rem auto 2rem; }
.hero-features{ display:grid; grid-template-columns:repeat(auto-fit,minmax(200px,1fr)); gap:12px; margin:0 0 2rem; padding:0; list-style:none; }
.feature-pill{
  display:flex; align-items:center; justify-content:center; gap:.5rem;
  background:rgba(255,255,255,.05); border:1px solid var(--nav-border);
  padding:.75rem 1rem; border-radius:999px; font-weight:700; font-size:.9rem; backdrop-filter:blur(10px);
}
.hero-cta{ display:flex; flex-direction:column; align-items:center; gap:12px; }

/* BUTTONS */
.btn-primary{
  display:inline-flex; align-items:center; justify-content:center; gap:.5rem;
  background:linear-gradient(135deg, var(--cta-yellow), #facc15);
  color:var(--cta-text); padding:1rem 2rem; border-radius:.75rem; font-weight:800; text-decoration:none; border:none; cursor:pointer;
  transition:transform .18s, box-shadow .18s;
}
.btn-primary:hover{ transform:translateY(-2px); box-shadow:0 10px 25px rgba(253,224,71,.28); }
.btn-primary.large{ padding:1.1rem 2.3rem; font-size:1.05rem; }
.btn-whatsapp{
  display:inline-flex; align-items:center; justify-content:center; gap:.5rem;
  background:var(--wa); color:#062b15; padding:1rem 2rem; border-radius:.75rem; font-weight:800; text-decoration:none;
  border:2px solid var(--wa-dark); transition:transform .18s, box-shadow .18s;
}
.btn-whatsapp:hover{ transform:translateY(-2px); box-shadow:0 10px 25px rgba(37,211,102,.28); }
.btn-whatsapp.large{ padding:1.1rem 2.3rem; font-size:1.05rem; }

/* TARJETAS DIRIGIDO */
.target-grid{ display:grid; grid-template-columns:repeat(auto-fit,minmax(280px,1fr)); gap:28px; }
.target-card{
  background:var(--bg2); border:1px solid var(--nav-border); padding:2rem; border-radius:1rem; text-align:center; transition:.18s;
}
.target-card:hover{ transform:translateY(-4px); border-color:var(--indigo); box-shadow:0 18px 40px rgba(88,80,236,.18); }
.target-icon{ width:80px; height:80px; margin:0 auto 1rem; border-radius:50%;
  background:linear-gradient(135deg, var(--indigo), var(--rose)); }

/* RUTAS */
.routes-section{ background:var(--bg2); }
.routes-grid{ display:grid; grid-template-columns:repeat(auto-fit,minmax(320px,1fr)); gap:24px; }
.route-card{
  background:var(--bg1); border:1px solid var(--nav-border); padding:2rem; border-radius:1rem; position:relative; overflow:hidden; transition:.18s;
}
.route-card::before{ content:""; position:absolute; left:0; right:0; top:0; height:4px; background:linear-gradient(90deg, var(--indigo), var(--amber)); transform:scaleX(0); transition:transform .18s; }
.route-card:hover{ transform:translateY(-4px); border-color:var(--indigo); box-shadow:0 20px 40px rgba(88,80,236,.2); }
.route-card:hover::before{ transform:scaleX(1); }
.route-card.featured{ border-color:var(--amber); background:linear-gradient(135deg, var(--bg1), rgba(245,158,11,.05)); }
.route-level{ display:inline-block; background:var(--indigo); color:#fff; padding:.45rem 1rem; border-radius:999px; font-size:.75rem; font-weight:800; letter-spacing:.3px; margin-bottom:.8rem; }
.route-card h3{ margin:.4rem 0 1rem; font-size:1.5rem; }
.route-features{ list-style:none; padding:0; margin:0; }
.route-features li{ color:var(--text2); margin:.45rem 0; font-size:.95rem; }
.route-features li::before{ content:"✓"; color:var(--green); font-weight:900; margin-right:.5rem; }

/* HORARIOS */
.schedule-section{ background:linear-gradient(135deg, var(--bg2), var(--bg1)); }
.schedule-card{ background:var(--bg1); border:1px solid var(--nav-border); padding:3rem; border-radius:1.5rem; text-align:center; }
.schedule-header h2{ margin:0 0 .6rem; }
.schedule-header p{ color:var(--text2); margin:0 0 1.6rem; }
.schedule-grid{ display:grid; grid-template-columns:repeat(auto-fit,minmax(240px,1fr)); gap:16px; margin-bottom:1.2rem; }
.schedule-item{ background:var(--bg2); border:1px solid var(--nav-border); padding:1.2rem; border-radius:.9rem; transition:.18s; }
.schedule-item:hover{ border-color:var(--indigo); transform:translateY(-2px); }
.schedule-day{ color:var(--amber); font-weight:800; font-size:.85rem; letter-spacing:.3px; text-transform:uppercase; }
.schedule-time{ font-size:1.25rem; font-weight:800; margin:.35rem 0; }
.schedule-subject{ color:var(--text2); }
.schedule-note{ color:var(--text3); font-style:italic; }

/* FEATURES */
.features-section{ background:var(--bg2); }
.features-grid{ display:grid; grid-template-columns:repeat(auto-fit,minmax(300px,1fr)); gap:24px; }
.feature-card{ background:var(--bg1); border:1px solid var(--nav-border); padding:2rem; border-radius:1rem; transition:.18s; }
.feature-card:hover{ transform:translateY(-4px); border-color:var(--indigo); box-shadow:0 15px 30px rgba(88,80,236,.15); }
.feature-icon{ width:60px; height:60px; border-radius:.75rem; background:linear-gradient(135deg, var(--indigo), var(--rose)); margin-bottom:1rem; }

/* REQUISITOS */
.req-grid{ display:grid; grid-template-columns:1.1fr .9fr; gap:48px; align-items:center; }
.requirements-text h2{
  font-size:2.5rem; font-weight:800; margin:0 0 1rem;
  background:linear-gradient(135deg, var(--text1), var(--green));
  -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
}
.requirements-text p{ color:var(--text2); font-size:1.125rem; margin:0 0 1.2rem; }
.requirements-list{ list-style:none; padding:0; margin:0; display:grid; gap:1rem; }
.requirements-list li{ background:var(--bg2); border:1px solid var(--nav-border); border-radius:.9rem; padding:1rem 1.1rem; color:var(--text2); }
.requirements-list strong{ color:var(--text1); }
.cta-card{ background:var(--bg2); border:1px solid var(--nav-border); padding:2.2rem; border-radius:1.2rem; text-align:center; }
.cta-card h3{ margin:0 0 .6rem; }

/* CTA FINAL */
.final-cta{ background:linear-gradient(135deg, var(--bg2), var(--bg1)); text-align:center; }
.final-content h2{
  font-size:3rem; font-weight:800; margin:0 0 1rem;
  background:linear-gradient(135deg, var(--text1), var(--cta-yellow));
  -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
}
.final-content p{ color:var(--text2); font-size:1.2rem; max-width:720px; margin:0 auto 2rem; }
.final-actions{ display:flex; flex-direction:column; gap:12px; align-items:center; }

/* RESPONSIVE */
@media (max-width:1000px){
  .section-header h2{ font-size:2rem; }
  .hero h1{ font-size:3rem; }
  .req-grid{ grid-template-columns:1fr; gap:32px; }
}
@media (max-width:640px){
  .container{ padding-inline:.75rem; }
  .section{ padding:3rem 0; }
  .hero{ padding:4rem 0; }
  .hero h1{ font-size:2.4rem; }
  .hero-subtitle{ font-size:1.2rem; }
  .hero-description{ font-size:1rem; }
  .schedule-card{ padding:2rem; }
  .final-content h2{ font-size:2rem; }
}
`;