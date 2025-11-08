// src/pages/EscuelaAdultos.jsx
import { useEffect } from "react";
import SEOHead from "../components/SEOHead";
import { seoDefaults } from "../seo.config";

// Assets con Vite (mantén rutas)
const LogoMark = new URL("../assets/img/Logos/lael-inst-blanco.png", import.meta.url).href;

// Tarjetas con foto (puedes cambiar por otras si quieres)
const Aula1 = new URL("../assets/img/lael/bootcamp.jpg", import.meta.url).href;
const Aula2 = new URL("../assets/img/lael/coaching.jpg", import.meta.url).href;
const Aula3 = new URL("../assets/img/lael/inclusion.jpg", import.meta.url).href;

// Galería
const Gal1 = new URL("../assets/img/lael/hs.jpg", import.meta.url).href;
const Gal2 = new URL("../assets/img/lael/study-online.jpg", import.meta.url).href;
const Gal3 = new URL("../assets/img/lael/soft.jpg", import.meta.url).href;

export default function EscuelaAdultos() {
  // UX: “no te vayas”
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
      "provider": { "@type": "Organization", "name": "Instituto Lael SpA", "url": seoDefaults.site },
      "areaServed": "Chile",
      "url": `${seoDefaults.site}/escuela-adultos`,
      "description": "Programa flexible para adultos (18+) para completar Básica o Media. Online en vivo + grabaciones. Alineado a Exámenes Libres (Mineduc)."
    }
  ];

  return (
    <div className="adultos">
      <SEOHead
        title="Escuela para Adultos"
        description="Termina tus estudios con apoyo real: programa flexible para adultos (18+) que necesitan completar Básica o Media. Clases online en vivo + grabaciones, horarios PM y preparación para Exámenes Libres (Mineduc)."
        path="/escuela-adultos"
        image={`${seoDefaults.site}/meta/og-escuela-adultos.jpg`}
        jsonLd={jsonLd}
      />

      <style>{css}</style>

      {/* HERO */}
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-deco" aria-hidden />
        <div className="container hero-grid">
          <div className="hero-copy">
            {/* Chip con LOGO (reemplaza el texto “Instituto Lael”) */}
            <span className="hero-chip" aria-label="Instituto Lael">
              <img src={LogoMark} alt="" height="20" />
            </span>

            <h1 id="hero-title">Escuela para Adultos</h1>
            <p className="hero-sub">Termina tus estudios con apoyo real</p>
            <p className="lead">
              Programa flexible para personas adultas (18+) que necesitan completar su
              enseñanza Básica o Media: quienes retoman tras años, migran desde <strong>homeschool</strong>
              o buscan reinserción educativa.
            </p>

            {/* Pills */}
            <ul className="pills" aria-label="Características del programa">
              <li>Horarios PM</li>
              <li>Clases en vivo + grabaciones</li>
              <li>Ajustado a Exámenes Libres</li>
              <li>Plan personalizado</li>
            </ul>

            {/* CTAs */}
            <div className="cta">
              <a className="btn btn-primary"
                 href="#formulario">
                Preinscribirme
                <ArrowIcon />
              </a>

              <a className="btn btn-whatsapp"
                 href="https://wa.me/56964626568?text=Hola%20%F0%9F%91%8B%20me%20interesa%20la%20Escuela%20para%20Adultos"
                 target="_blank" rel="noreferrer"
                 aria-label="Consultar ahora por WhatsApp">
                <WhatsIcon />
                Consultar ahora
              </a>
            </div>
          </div>

          {/* Tarjeta con logo / glow */}
          <div className="hero-card" aria-hidden>
            <img src={LogoMark} alt="" />
          </div>
        </div>
      </section>

      {/* ¿A QUIÉN VA? + HORARIOS + CERTIFICACIÓN (tarjetas con icono lleno) */}
      <section className="cards container reveal" aria-label="Secciones principales">
        <FeatureCard
          img={Aula1}
          title="¿A quién va dirigido?"
          icon="user"
          bullets={[
            "Adultos que no completaron Básica o Media.",
            "Jóvenes 18+ que vienen de homeschool.",
            "Personas en reinserción educativa."
          ]}
        />
        <FeatureCard
          img={Aula2}
          title="Horarios y modalidad"
          icon="clock"
          bullets={[
            "100% online, en vivo (quedan grabadas).",
            "Tarde/noche para compatibilizar trabajo.",
            "Acompañamiento y seguimiento."
          ]}
        />
        <FeatureCard
          img={Aula3}
          title="Certificación"
          icon="doc"
          bullets={[
            "Alineado a Exámenes Libres (Mineduc).",
            "Rúbricas y metas por tramo.",
            "Planificación personalizada."
          ]}
        />
      </section>

      {/* RUTAS */}
      <section className="routes">
        <div className="container">
          <header className="section-head">
            <h2>Elige tu ruta educativa</h2>
            <p>Planificamos según tu nivel y fecha objetivo de rendición.</p>
          </header>

          <div className="routes-grid">
            <RouteCard level="Básica" title="1° a 8° Básico"
              points={["Matemáticas básicas","Comprensión lectora","Ciencias naturales","Historia y geografía"]}/>
            <RouteCard level="Media inicial" title="1° y 2° Medio" featured
              points={["Álgebra y geometría","Literatura y redacción","Biología y química","Inglés básico"]}/>
            <RouteCard level="Media final" title="3° y 4° Medio"
              points={["Preparación Exámenes Libres","Simulacros","Orientación vocacional","Certificación Mineduc"]}/>
          </div>
        </div>
      </section>

      {/* HORARIO */}
      <section className="schedule">
        <div className="container">
          <div className="schedule-card">
            <h2>Horarios compatibles con tu vida</h2>
            <p className="muted">Clases vespertinas pensadas para adultos que trabajan.</p>

            <div className="schedule-grid">
              <Sched block="Lun & Mié" time="19:00 – 20:20" sub="Lenguaje y Comunicación"/>
              <Sched block="Mar & Jue" time="19:00 – 20:20" sub="Matemática"/>
              <Sched block="Viernes" time="19:00 – 20:00" sub="Taller de estudio y repaso"/>
            </div>

            <p className="note">* Horarios sujetos a tramo y disponibilidad. Todas las clases quedan grabadas.</p>
          </div>
        </div>
      </section>

      {/* ¿QUÉ INCLUYE? (grid de features con icono cuadrado gradiente) */}
      <section className="features">
        <div className="container">
          <header className="section-head">
            <h2>¿Qué incluye el programa?</h2>
            <p>Todo lo que necesitas para completar tu educación exitosamente.</p>
          </header>

          <div className="features-grid">
            <FeatureTile title="100% Online en Vivo" desc="Clases interactivas que quedan grabadas para repasar cuando necesites." icon="tv"/>
            <FeatureTile title="Horarios Flexibles" desc="Tarde/noche para estudiar sin dejar trabajo o responsabilidades." icon="clock"/>
            <FeatureTile title="Acompañamiento Personal" desc="Seguimiento individualizado y apoyo constante." icon="heart"/>
            <FeatureTile title="Certificación Oficial" desc="Alineado con Exámenes Libres del Mineduc." icon="doc"/>
            <FeatureTile title="Ambiente de Respeto" desc="Comunidad de apoyo, sin juicios, hecha para adultos." icon="star"/>
            <FeatureTile title="Becas Disponibles" desc="Apoyos económicos caso a caso (prioridad: reinserción y jefas de hogar)." icon="badge"/>
          </div>
        </div>
      </section>

      {/* REQUISITOS + CTA */}
      <section className="reqs">
        <div className="container reqs-grid">
          <div>
            <h2 className="grad-g">Requisitos simples</h2>
            <p className="muted">Solo necesitas lo básico para comenzar tu proceso educativo.</p>
            <ul className="req-list">
              <li><strong>Cédula de identidad vigente</strong> · Documento oficial actualizado</li>
              <li><strong>Certificados previos (si los tienes)</strong> · Cualquier documentación educativa</li>
              <li><strong>Compromiso de asistencia</strong> · Mínimo 75% de participación en clases</li>
            </ul>
          </div>

          <aside className="req-cta">
            <h3>¿Listo para comenzar?</h3>
            <p className="muted">Completa tu preinscripción y te orientamos sobre la mejor ruta.</p>
            <div className="stack">
              <a className="btn btn-primary" href="#formulario">
                Preinscribirme ahora <ArrowIcon />
              </a>
              <a className="btn btn-whatsapp"
                 href="https://wa.me/56964626568?text=Hola%20%F0%9F%91%8B%20me%20interesa%20la%20Escuela%20para%20Adultos"
                 target="_blank" rel="noreferrer">
                <WhatsIcon /> Consultar ahora
              </a>
            </div>
          </aside>
        </div>
      </section>

      {/* GALERÍA */}
      <section className="gallery">
        <div className="container g">
          <figure className="gx"><img src={Gal1} alt="Clase en línea con acompañamiento" /></figure>
          <figure className="gx"><img src={Gal2} alt="Estudio en casa con guía" /></figure>
          <figure className="gx"><img src={Gal3} alt="Ambiente amable para aprender" /></figure>
        </div>
      </section>

      {/* FORMULARIO */}
      <section id="formulario" className="form">
        <div className="container form-box">
          <h2>Preinscripción rápida 📝</h2>
          <p className="muted">Completa tus datos y te contactamos para orientarte.</p>
          <div className="form-placeholder">
            <p>Formulario disponible aquí muy pronto.</p>
            <small>Podrás completar tu preinscripción con tu cuenta de Google.</small>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="final">
        <div className="container inner">
          <div>
            <h3 className="grad-y">Nunca es tarde para terminar el colegio</h3>
            <p className="muted">Estudia con método, en horarios compatibles y con acompañamiento real.</p>
          </div>
          <div className="actions">
            <a className="btn btn-primary" href="#formulario">Comenzar mi proceso <ArrowIcon/></a>
            <a className="btn btn-whatsapp"
               href="https://wa.me/56964626568"
               target="_blank" rel="noreferrer">
              <WhatsIcon/> Consultar ahora
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ---------- Subcomponentes ---------- */
function FeatureCard({ img, title, bullets = [], icon = "star" }) {
  return (
    <article className="fcard">
      <img src={img} alt="" />
      <div className="overlay" />
      <div className="content">
        <div className="icon-filled" aria-hidden>
          <GradIcon name={icon} />
        </div>
        <h3>{title}</h3>
        <ul>{bullets.map((b, i) => <li key={i}>{b}</li>)}</ul>
      </div>
    </article>
  );
}

function RouteCard({ level, title, points = [], featured = false }) {
  return (
    <div className={"route " + (featured ? "featured" : "")}>
      <span className="level">{level}</span>
      <h3>{title}</h3>
      <ul className="route-list">{points.map((p,i)=><li key={i}>{p}</li>)}</ul>
    </div>
  );
}

function Sched({ block, time, sub }) {
  return (
    <div className="sched">
      <div className="sched-day">{block}</div>
      <div className="sched-time">{time}</div>
      <div className="sched-sub">{sub}</div>
    </div>
  );
}

/* ---------- Íconos ---------- */
function ArrowIcon(){ return (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);}

function WhatsIcon(){ return (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"/>
    <path d="M12.05 22a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374A9.86 9.86 0 012 12.41C2 6.96 6.436 2.53 11.888 2.53c2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994C21.77 17.87 17.336 22 12.05 22Z"/>
  </svg>
);}

function GradIcon({name}){
  const path = {
    user: <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-3 0-8 1.6-8 4v2h16v-2c0-2.4-5-4-8-4Z" />,
    clock:<><circle cx="12" cy="12" r="9"/><path d="M12 7v6l4 2"/></>,
    doc:  <><path d="M14 2H8a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V8l-4-6Z"/><path d="M14 2v6h6"/></>,
    star: <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2Z"/>,
    tv:   <><rect x="3" y="6" width="18" height="12" rx="2"/><path d="M8 2l4 4 4-4"/></>,
    heart:<path d="M20.8 8.6a5.2 5.2 0 0 0-9.2-3.6 5.2 5.2 0 0 0-9.2 3.6c0 6 9.2 10.8 9.2 10.8S20.8 14.6 20.8 8.6Z"/>,
    badge:<><circle cx="12" cy="12" r="9"/><path d="M8 13l2 2 5-5"/></>,
  }[name] || <path d="M12 2l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1 3-6Z" />;
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="url(#g)">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#6D66FF"/><stop offset="1" stopColor="#F59E0B"/>
        </linearGradient>
      </defs>
      {path}
    </svg>
  );
}

/* ---------- Estilos ---------- */
const css = `
:root{
  --indigo:#5850EC; --green:#16a34a; --rose:#e11d48; --amber:#f59e0b;
  --bg:#0b1220; --bg2:#0f172a; --bd:#1f2a44; --txt:#f8fafc; --muted:#a8b3cf;
  --wa:#25D366; --wa-dark:#128C7E;
}
.adultos{ background:var(--bg); color:var(--txt); font-family:system-ui, -apple-system, Segoe UI, Roboto, Inter, Arial, sans-serif; line-height:1.6; }
.container{ width:min(1120px,92vw); margin-inline:auto; }

/* HERO */
.hero{ position:relative; overflow:hidden; padding:80px 0 60px; }
.hero-deco{ position:absolute; inset:0;
  background:
    radial-gradient(900px 240px at 10% -10%, rgba(88,80,236,.12), transparent 60%),
    radial-gradient(900px 240px at 90% -10%, rgba(225,29,72,.10), transparent 60%),
    radial-gradient(900px 240px at 50% 110%, rgba(245,158,11,.10), transparent 60%);
  pointer-events:none;
}
.hero-grid{ position:relative; z-index:2; display:grid; grid-template-columns:1.2fr .8fr; gap:48px; align-items:center; }
.hero-chip{
  display:inline-flex; align-items:center; gap:8px; padding:.45rem .7rem;
  border-radius:999px; background:rgba(88,80,236,.18);
  border:1px solid rgba(88,80,236,.35); backdrop-filter:blur(10px);
}
.hero-chip img{ height:18px; width:auto; display:block; }
h1{ margin:.5rem 0; font-size:clamp(2rem,4vw,3rem); font-weight:900;
  background:linear-gradient(135deg,#fff,#fde047); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
.hero-sub{ color:#cbd5e1; font-weight:700; margin:0 0 .4rem; }
.lead{ max-width:780px; color:#cbd5e1; font-size:1.06rem; margin:10px 0 18px; }

.pills{ display:flex; flex-wrap:wrap; gap:10px; list-style:none; padding:0; margin:18px 0 0; }
.pills li{
  background:rgba(255,255,255,.06); border:1px solid var(--bd);
  padding:.55rem .9rem; border-radius:999px; font-weight:700;
}

.hero-card{
  display:grid; place-items:center; padding:36px; border-radius:20px;
  background:linear-gradient(180deg,rgba(17,24,39,.7),rgba(11,18,32,.9));
  border:1px solid #1e293b; box-shadow:0 20px 48px rgba(2,6,23,.45); backdrop-filter:saturate(110%) blur(3px);
}
.hero-card img{ width:180px; filter:drop-shadow(0 6px 24px rgba(255,255,255,.25)); }

/* BOTONES */
.btn{ display:inline-flex; align-items:center; gap:.5rem; padding:.9rem 1.15rem; border-radius:12px; font-weight:900;
  text-decoration:none; border:1px solid transparent; transition:.18s ease; }
.btn svg{ flex:0 0 auto; }
.btn-primary{ color:#111827; background:linear-gradient(180deg,#fde047,#facc15); border-color:#eab308; box-shadow:0 10px 22px rgba(250,204,21,.25); }
.btn-primary:hover{ transform:translateY(-2px); }
.btn-whatsapp{ color:#0a3d21; background:var(--wa); border-color:var(--wa-dark); }
.btn-whatsapp:hover{ transform:translateY(-2px); background:var(--wa-dark); color:#fff; }

.cta{ display:flex; gap:10px; flex-wrap:wrap; margin-top:16px; }

/* TARJETAS PRINCIPALES */
.cards{ display:grid; grid-template-columns:repeat(3,1fr); gap:22px; margin:60px 0 70px; }
.fcard{ position:relative; border-radius:18px; overflow:hidden; min-height:300px; border:1px solid #1e293b; }
.fcard img{ position:absolute; inset:0; width:100%; height:100%; object-fit:cover; }
.overlay{ position:absolute; inset:0; background:linear-gradient(180deg, rgba(0,0,0,.15), rgba(0,0,0,.75)); }
.fcard .content{ position:relative; z-index:2; padding:22px; text-shadow:0 1px 2px rgba(0,0,0,.45); }
.icon-filled{
  width:46px; height:46px; display:grid; place-items:center; border-radius:12px;
  background:linear-gradient(135deg,#6D66FF,#F59E0B); box-shadow:0 8px 24px rgba(88,80,236,.3);
}
.fcard h3{ margin:10px 0; font-size:1.25rem; }
.fcard ul{ margin:0; padding-left:18px; }

/* RUTAS */
.routes{ background:var(--bg2); border-block:1px solid #152238; padding:60px 0; }
.section-head h2{ font-size:clamp(1.6rem,3vw,2.2rem); font-weight:900; margin:0 0 .5rem; }
.section-head p{ color:#cbd5e1; margin:0 0 16px; }
.routes-grid{ display:grid; grid-template-columns:repeat(3,1fr); gap:18px; }
.route{
  background:var(--bg); border:1px solid var(--bd); border-radius:16px; padding:20px; position:relative; overflow:hidden;
}
.route::before{
  content:""; position:absolute; top:0; left:0; right:0; height:4px;
  background:linear-gradient(90deg,#5850EC,#f59e0b); transform:scaleX(0); transition:.25s;
}
.route:hover::before{ transform:scaleX(1); }
.route.featured{ border-color:#f59e0b; background:linear-gradient(180deg, #0b1220, rgba(245,158,11,.05)); }
.level{ display:inline-block; background:#5850EC; color:#fff; font-weight:800; padding:.35rem .7rem; border-radius:999px; font-size:.75rem; margin-bottom:.6rem; }
.route-list{ margin:8px 0 0; padding-left:18px; }
.route-list li{ margin:.25rem 0; }

/* HORARIO */
.schedule{ padding:50px 0; }
.schedule-card{
  background:var(--bg2); border:1px solid var(--bd); border-radius:18px; padding:28px;
}
.schedule-card h2{ font-size:clamp(1.6rem,3vw,2.2rem); font-weight:900; text-align:center; margin:0 0 .5rem; }
.muted{ color:#a3b2d8; }
.schedule-grid{ display:grid; grid-template-columns:repeat(3,1fr); gap:14px; margin:18px 0 8px; }
.sched{ background:rgba(255,255,255,.04); border:1px solid #233154; border-radius:14px; padding:18px; text-align:center; }
.sched-day{ color:#fbbf24; font-weight:900; text-transform:uppercase; font-size:.78rem; letter-spacing:.4px; }
.sched-time{ font-size:1.25rem; font-weight:900; margin:.35rem 0; }
.sched-sub{ color:#cbd5e1; }
.note{ color:#8fa0c8; font-style:italic; text-align:center; margin:8px 0 0; }

/* FEATURES GRID */
.features{ padding:50px 0; }
.features-grid{ display:grid; grid-template-columns:repeat(3,1fr); gap:18px; }
.tile{
  background:var(--bg); border:1px solid var(--bd); border-radius:16px; padding:22px;
  transition:.15s; box-shadow:inset 0 0 0 1px rgba(255,255,255,.02);
}
.tile:hover{ transform:translateY(-2px); border-color:#31386b; box-shadow:0 18px 36px rgba(2,6,23,.28); }
.tile .sq{ width:44px; height:44px; border-radius:12px; background:linear-gradient(135deg,#6D66FF,#F59E0B); display:grid; place-items:center; margin-bottom:10px; }
.tile h3{ margin:6px 0; }

/* REQUISITOS */
.reqs{ padding:60px 0; }
.grad-g{ background:linear-gradient(135deg,#fff,#16a34a); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
.reqs-grid{ display:grid; grid-template-columns:1.2fr .8fr; gap:26px; align-items:start; }
.req-list{ display:grid; gap:10px; margin:16px 0 0; }
.req-list li{
  background:rgba(255,255,255,.04); border:1px solid #22304d; border-radius:12px; padding:14px 16px;
}
.req-cta{
  background:var(--bg2); border:1px solid var(--bd); border-radius:18px; padding:24px; text-align:center;
}
.req-cta .stack{ display:grid; gap:10px; margin-top:10px; }

/* GALERÍA */
.gallery{ padding:40px 0; }
.g{ display:grid; grid-template-columns:repeat(3,1fr); gap:14px; }
.gx img{ width:100%; height:220px; object-fit:cover; border-radius:14px; }

/* FORM & CTA FINAL */
.form{ padding:70px 0; }
.form-box{ background:var(--bg2); border:1px solid var(--bd); border-radius:18px; padding:36px; text-align:center; }
.form-placeholder{ margin-top:18px; background:rgba(255,255,255,.04); border:1px dashed #334155; border-radius:12px; padding:36px 18px; }
.final{
  background:linear-gradient(135deg, rgba(245,158,11,.16), rgba(88,80,236,.16));
  border-top:1px solid #1e293b; margin-top:60px; padding:46px 0;
}
.inner{ display:flex; justify-content:space-between; align-items:center; gap:18px; }
.grad-y{ background:linear-gradient(135deg,#fff,#fde047); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
.actions{ display:flex; gap:10px; flex-wrap:wrap; }

/* RESPONSIVE */
@media(max-width:980px){
  .hero-grid{ grid-template-columns:1fr; }
  .cards, .routes-grid, .schedule-grid, .features-grid, .g, .reqs-grid{ grid-template-columns:1fr; }
  .hero-card{ justify-self:center; }
}
@media(max-width:640px){
  .hero{ padding:60px 0 40px; }
  .hero-card img{ width:140px; }
}
`;

/* ---------- Tiles de “¿Qué incluye?” ---------- */
function FeatureTile({ title, desc, icon="star" }){
  return (
    <article className="tile">
      <div className="sq"><GradIcon name={icon}/></div>
      <h3>{title}</h3>
      <p className="muted">{desc}</p>
    </article>
  );
}