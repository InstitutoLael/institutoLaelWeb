// src/pages/Idiomas.jsx
import { useMemo, useRef, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
// Asegúrate de que esta ruta sea correcta según tu proyecto
import { LANGUAGES, ENROLLMENT_FEE, computeLangBundle, clp } from "../data/idiomas.js";
import MultiHello from "../components/MultiHello.jsx";
import flags from "../assets/img/lael/flags.png";

/* ───────── SEOHead (Optimizada para Motores de Búsqueda) ───────── */
function SEOHead({ title, description, canonical, keywords = [], image, jsonLd = [] }) {
  const location = useLocation();
  useEffect(() => {
    const url =
      canonical ||
      (typeof window !== "undefined" ? `${window.location.origin}${location.pathname}` : "");

    document.title = title;

    const upsert = (selector, create) => {
      let el = document.head.querySelector(selector);
      if (!el) {
        el = create();
        document.head.appendChild(el);
      }
      return el;
    };

    const setName = (name, content) => {
      const el = upsert(`meta[name="${name}"]`, () => {
        const m = document.createElement("meta");
        m.setAttribute("name", name);
        return m;
      });
      el.setAttribute("content", content);
    };
    const setProp = (property, content) => {
      const el = upsert(`meta[property="${property}"]`, () => {
        const m = document.createElement("meta");
        m.setAttribute("property", property);
        return m;
      });
      el.setAttribute("content", content);
    };

    setName("description", description);
    if (keywords.length) setName("keywords", keywords.join(", "));

    const link = upsert('link[rel="canonical"]', () => {
      const l = document.createElement("link");
      l.setAttribute("rel", "canonical");
      return l;
    });
    link.setAttribute("href", url);

    setProp("og:type", "website");
    setProp("og:title", title);
    setProp("og:description", description);
    setProp("og:url", url);
    if (image) setProp("og:image", image);
    setProp("og:locale", "es_CL");

    setName("twitter:card", "summary_large_image");
    setName("twitter:title", title);
    setName("twitter:description", description);
    if (image) setName("twitter:image", image);

    document.querySelectorAll('script[data-lael-jsonld="idiomas"]').forEach((s) => s.remove());
    const list = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
    list.forEach((obj) => {
      const s = document.createElement("script");
      s.type = "application/ld+json";
      s.dataset.laelJsonld = "idiomas";
      s.text = JSON.stringify(obj);
      document.head.appendChild(s);
    });
  }, [title, description, canonical, keywords, image, jsonLd, location.pathname]);

  return null;
}

/* ───────── Datos Estáticos (Testimonios & FAQ) ───────── */
const TESTIMONIOS = [
  { name: "Camila R.", note: "Ex-alumna IELTS", quote: "Necesitaba un 6.5 para mi visa y logré un 7.0. Los simulacros son idénticos a la prueba real." },
  { name: "Felipe M.", note: "Inglés B2", quote: "Lo mejor es que las clases quedan grabadas. Trabajo por turnos y nunca me pierdo materia." },
];

const COURSE_FAQ = {
  ingles: [
    ["¿Cuántas clases tengo?", "2 en vivo por semana + cápsulas de apoyo y tareas."],
    ["¿Cómo sé mi nivel?", "Diagnóstico digital rápido para ubicarte (A1 a B2)."],
    ["¿Sirve para IELTS?", "Sí, el módulo avanzado incluye simulacros específicos."],
    ["¿Certificado?", "Sí, diploma digital verificable por nivel aprobado."],
  ],
  coreano: [
    ["¿Qué nivel alcanzamos?", "TOPIK 1 completo (Lectura y vocabulario)."],
    ["¿Desde cero?", "Sí, enseñamos Hangul desde la primera clase."],
    ["¿Horarios?", "Vespertinos, pensados para trabajadores y estudiantes."],
  ],
  portugues: [
    ["¿Enfoque?", "Portugués brasileño funcional para turismo y trabajo."],
    ["¿Duración?", "Intensivo de 4 meses por nivel."],
  ],
};

/* ───────── COMPONENTE PRINCIPAL ───────── */
export default function Idiomas() {
  /* ── Estado ── */
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectedLevels, setSelectedLevels] = useState({});
  const builderRef = useRef(null);

  /* ── Lógica de Precios ── */
  const selected = useMemo(() => LANGUAGES.filter((l) => selectedIds.includes(l.id)), [selectedIds]);
  const monthly = computeLangBundle(selected.length);

  /* ── Manejadores ── */
  const toggle = (id, comingSoon) => {
    if (comingSoon) return;
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };
  
  const setLevel = (langId, level) => setSelectedLevels((prev) => ({ ...prev, [langId]: level }));
  
  const replaceWith = (ids = [], levels = {}) => {
    setSelectedIds([...ids]);
    setSelectedLevels((prev) => ({ ...prev, ...levels }));
    // Pequeño delay para asegurar render antes del scroll
    setTimeout(() => {
      builderRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  /* ── Atajos Rápidos ── */
  const QUICK = [
    { id: "q-ingles-b1", label: "Inglés B1 (Intermedio)", ids: ["ingles"], levels: { ingles: "B1" } },
    { id: "q-ielts", label: "Pack IELTS / TOEFL", ids: ["ingles"], levels: { ingles: "B2" } },
    { id: "q-coreano", label: "Coreano desde cero", ids: ["coreano"], levels: { coreano: "A1" } },
  ].filter((q) => q.ids.every((id) => LANGUAGES.some((l) => l.id === id)));

  const applyQuick = (q) => replaceWith(q.ids, q.levels || {});

  /* ── WhatsApp Link Generator ── */
  const waMsg = encodeURIComponent(
    `Hola 👋, vi su web y quiero inscribirme.
Cursos de interés: ${selected.length ? selected.map((s) => `${s.name} ${selectedLevels[s.id] || ""}`).join(", ") : "Aún decidiendo"}
`
  );

  /* ── Animación de Números (Stats) ── */
  useEffect(() => {
    const counters = Array.from(document.querySelectorAll(".stat-number"));
    if (!counters.length) return;

    const animate = (el) => {
      const target = Number(el.getAttribute("data-target") || 0);
      const duration = 1500;
      const start = performance.now();
      
      const step = (now) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 4); // EaseOutQuart
        const val = Math.round(target * eased);
        el.textContent = val.toLocaleString("es-CL");
        if (t < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    const io = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            animate(e.target);
            io.unobserve(e.target);
          }
        });
      }, { threshold: 0.5 }
    );
    counters.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  /* ── Configuración SEO ── */
  const pageTitle = "Cursos de Idiomas Online | Inglés, Coreano y Preparación IELTS | Instituto Lael";
  const pageDesc = "Aprende idiomas con propósito. Clases en vivo, plataforma inteligente y matrícula única. Cursos de Inglés (A1-B2), preparación IELTS/TOEFL y Coreano TOPIK.";
  const canonical = "https://www.institutolael.cl/idiomas";
  const keywords = ["curso ingles online", "preparacion ielts chile", "curso coreano topik", "clases idiomas santiago"];

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Course",
      "name": "Programa de Idiomas Lael",
      "description": "Cursos de idiomas online con clases en vivo y plataforma educativa.",
      "provider": { "@type": "Organization", "name": "Instituto Lael", "sameAs": "https://www.institutolael.cl" }
    }
  ];

  /* ── RENDER ───────────────────────────────────────────────────────────── */
  return (
    <section className="idiomas-page">
      <SEOHead title={pageTitle} description={pageDesc} canonical={canonical} keywords={keywords} jsonLd={jsonLd} />
      
      {/* Inyectamos estilos directamente */}
      <style>{css}</style>

      {/* Breadcrumbs */}
      <nav className="breadcrumbs" aria-label="Navegación">
        <div className="container">
          <Link to="/">Inicio</Link> <span className="sep">/</span> <span className="curr">Idiomas</span>
        </div>
      </nav>

      {/* HERO SECTION */}
      <header className="hero">
        <div className="container hero-grid">
          <div className="hero-content">
            <div className="badge-pill">🚀 Admisión 2025 Abierta</div>
            <h1 className="display-title">
              <span className="hello-wrapper"><MultiHello /></span>{" "}
              con <span className="text-gradient">propósito real</span>.
            </h1>
            <p className="lead-text">
              Deja de estudiar "de memoria" y empieza a comunicarte. 
              <b> Clases en vivo</b>, plataforma 24/7 y una comunidad que te impulsa.
              <br />Empieza hoy con matrícula única de <b>{clp(ENROLLMENT_FEE)}</b>.
            </p>
            
            <div className="hero-actions">
              <button onClick={() => builderRef.current?.scrollIntoView({ behavior: "smooth" })} className="btn btn-primary btn-lg btn-shadow">
                Ver precios y horarios
              </button>
              <a href={`https://wa.me/56964626568?text=${waMsg}`} target="_blank" rel="noreferrer" className="btn btn-ghost">
                Hablar con un asesor
              </a>
            </div>

            <div className="trust-badges">
              <span className="t-badge"><i className="dot i-blue"></i> Inglés A1–B2</span>
              <span className="t-badge"><i className="dot i-amber"></i> IELTS / TOEFL</span>
              <span className="t-badge"><i className="dot i-teal"></i> Coreano TOPIK</span>
            </div>
          </div>

          <div className="hero-visual">
            <div className="image-card tilt-effect">
              <img src={flags} alt="Banderas del mundo" loading="eager" />
              <div className="float-card float-1">
                <span className="emoji">🎓</span>
                <div>
                  <strong>Certificado</strong>
                  <small>Al aprobar nivel</small>
                </div>
              </div>
              <div className="float-card float-2">
                <span className="emoji">📹</span>
                <div>
                  <strong>Grabaciones</strong>
                  <small>Disponibles 24/7</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* STATS SECTION */}
      <section className="stats-section">
        <div className="container stats-grid">
          <div className="stat-item">
            <span className="stat-number" data-target="87">0</span>
            <span className="stat-label">% Logra su meta</span>
          </div>
          <div className="stat-item">
            <span className="stat-number" data-target="11000">0</span>
            <span className="stat-label">Horas dictadas</span>
          </div>
          <div className="stat-item">
            <span className="stat-number" data-target="95">0</span>
            <span className="stat-label">Satisfacción</span>
          </div>
           <div className="stat-item">
            <span className="stat-number" data-target="24">0</span>
            <span className="stat-label">Meses promedio</span>
          </div>
        </div>
      </section>

      {/* INGLÉS HIGHLIGHT */}
      <section className="highlight-section">
        <div className="container highlight-grid">
          <div className="hl-content">
            <span className="sub-caption">Programa Estrella</span>
            <h2>Inglés: Del A1 al B2 + Certificación</h2>
            <p>No es solo gramática. Es un sistema híbrido diseñado para que hables, entiendas y certifiques tu nivel internacionalmente.</p>
            
            <ul className="benefit-list">
              <li>✅ <b>2 Clases en vivo/semana</b> + Cápsulas HD</li>
              <li>✅ <b>Diagnóstico de nivel</b> gratuito al inscribirte</li>
              <li>✅ <b>Simulacros IELTS/TOEFL</b> con feedback real</li>
              <li>✅ <b>Club de conversación</b> (según disponibilidad)</li>
            </ul>

            <a href="https://wa.me/56964626568?text=Quiero%20diagnostico%20ingles" target="_blank" rel="noreferrer" className="link-arrow">
              Pedir diagnóstico de nivel →
            </a>
          </div>
          
          <div className="hl-visual">
            <div className="path-card">
              <h3>Tu Ruta de Aprendizaje</h3>
              <div className="timeline">
                <div className="step done">
                  <span className="circle">A1</span>
                  <div className="info"><strong>Inicial</strong><small>Pierde el miedo</small></div>
                </div>
                <div className="step done">
                  <span className="circle">A2</span>
                  <div className="info"><strong>Básico</strong><small>Frases cotidianas</small></div>
                </div>
                <div className="step active">
                  <span className="circle">B1</span>
                  <div className="info"><strong>Intermedio</strong><small>Fluidez real</small></div>
                </div>
                <div className="step">
                  <span className="circle">B2</span>
                  <div className="info"><strong>Avanzado</strong><small>Laboral/Académico</small></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BUILDER / CALCULATOR (El corazón de la venta) */}
      <section ref={builderRef} className="builder-section">
        <div className="container">
          <div className="section-header text-center">
            <h2>Arma tu Plan a Medida</h2>
            <p>Elige los idiomas que te interesan. Si llevas más de uno, obtienes un <b>descuento automático</b> en tu mensualidad.</p>
          </div>

          {/* Quick Filters */}
          {!!QUICK.length && (
            <div className="quick-filters">
              <span>Populares:</span>
              {QUICK.map((q) => (
                <button key={q.id} className="chip" onClick={() => applyQuick(q)}>
                  {q.label}
                </button>
              ))}
            </div>
          )}

          {/* Cards Grid */}
          <div className="courses-grid">
            {LANGUAGES.map((l) => {
              const active = selectedIds.includes(l.id);
              const levels = (l.levels || ["A1", "A2", "B1", "B2"]).slice(0, 4);
              const lvl = selectedLevels[l.id];

              return (
                <article key={l.id} className={`course-card ${active ? "is-selected" : ""} ${l.comingSoon ? "is-soon" : ""}`}>
                  <div className="card-top">
                    <span className="card-emoji">{l.emoji}</span>
                    <div className="card-titles">
                      <h3>{l.name}</h3>
                      {l.comingSoon ? <span className="badge-soon">Lista de espera</span> : <span className="badge-live">En vivo</span>}
                    </div>
                    <div className="checkbox-indicator"></div>
                  </div>

                  <p className="card-summary">{l.summary}</p>

                  <div className="level-selector">
                    <span className="ls-label">Nivel:</span>
                    <div className="ls-buttons">
                      {levels.map((lv) => (
                        <button
                          key={lv}
                          type="button"
                          className={`lv-btn ${lvl === lv ? "active" : ""}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            if(!l.comingSoon) {
                                if(!active) toggle(l.id);
                                setLevel(l.id, lv);
                            }
                          }}
                        >
                          {lv}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    className="btn-select-course"
                    disabled={l.comingSoon}
                    onClick={() => toggle(l.id, l.comingSoon)}
                  >
                    {l.comingSoon ? "Pronto" : active ? "Quitar del plan" : "Agregar al plan"}
                  </button>
                  
                  {/* Mini FAQ Dropdown */}
                  {COURSE_FAQ[l.id] && (
                     <details className="card-details">
                        <summary>Detalles y horarios</summary>
                        <div className="det-content">
                            {COURSE_FAQ[l.id].map(([q,a], i) => (
                                <div key={i} className="det-item">
                                    <strong>{q}</strong> {a}
                                </div>
                            ))}
                        </div>
                     </details>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* FEATURES / BENEFITS */}
      <section className="features-section">
        <div className="container">
            <h2 className="text-center">¿Por qué Lael?</h2>
            <div className="features-grid">
                <div className="feat-card">
                    <div className="icon">💼</div>
                    <h4>Enfoque Laboral</h4>
                    <p>Role-plays de entrevistas y emails formales.</p>
                </div>
                <div className="feat-card">
                    <div className="icon">🌍</div>
                    <h4>Internacional</h4>
                    <p>Preparación real para IELTS, TOEFL y TOPIK.</p>
                </div>
                <div className="feat-card">
                    <div className="icon">⚡</div>
                    <h4>Plataforma 24/7</h4>
                    <p>Accede a grabaciones y materiales cuando quieras.</p>
                </div>
                <div className="feat-card">
                    <div className="icon">🤝</div>
                    <h4>Tutoría Real</h4>
                    <p>Profesores que conocen tu nombre y tu progreso.</p>
                </div>
            </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      {TESTIMONIOS.length > 0 && (
        <section className="testimonials-section">
          <div className="container">
            <h2 className="text-center">Historias de Alumnos</h2>
            <div className="testi-grid">
              {TESTIMONIOS.map((t, i) => (
                <div key={i} className="testi-card">
                  <p>"{t.quote}"</p>
                  <div className="user">
                    <div className="avatar">{t.name.charAt(0)}</div>
                    <div><strong>{t.name}</strong><span>{t.note}</span></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ GENERAL */}
      <section className="faq-section">
        <div className="container">
          <h2 className="text-center">Preguntas Frecuentes</h2>
          <div className="faq-wrapper">
             <details><summary>¿Cómo funcionan los pagos?</summary><p>Pagas una matrícula única de inscripción y luego mensualidades. Si tomas más de un curso, el precio baja.</p></details>
             <details><summary>¿Si falto a una clase?</summary><p>¡Tranquilo! Todas se graban y suben el mismo día a tu aula virtual.</p></details>
             <details><summary>¿Entregan certificado?</summary><p>Sí, al finalizar cada nivel y cumplir con las evaluaciones, recibes un diploma digital verificable.</p></details>
          </div>
        </div>
      </section>

      {/* ── STICKY BAR (Fixed Bottom) ── */}
      <div className={`sticky-bar-wrapper ${selected.length > 0 ? "show" : ""}`}>
        <div className="sticky-bar glass-panel">
           <div className="bar-info">
              <span className="bar-count">{selected.length} Cursos seleccionados</span>
              <span className="bar-names">
                 {selected.map(s => s.name + (selectedLevels[s.id] ? ` (${selectedLevels[s.id]})` : "")).join(" + ")}
              </span>
           </div>
           <div className="bar-pricing">
              <div className="price-group">
                 <small>Mensualidad</small>
                 <span className="price-big">{clp(monthly)}</span>
              </div>
              <div className="action-group">
                 <Link to="/inscripcion" className="btn btn-primary btn-glow">Inscribirme</Link>
                 <span className="fee-note">+ matrícula {clp(ENROLLMENT_FEE)}</span>
              </div>
           </div>
        </div>
      </div>

    </section>
  );
}

/* ==========================================================================
   CSS MODERNO "LUMINOUS SLATE" - Pegar esto en tu variable CSS string
   ========================================================================== */
const css = `
:root {
  /* Paleta: Slate Blue & Electric Indigo */
  --bg-dark: #0f172a;       /* Fondo principal */
  --bg-card: #1e293b;       /* Tarjetas */
  --bg-card-hover: #334155;
  --primary: #6366f1;       /* Indigo Vibrante */
  --primary-hover: #4f46e5;
  --accent: #06b6d4;        /* Cyan para detalles */
  --text-main: #f8fafc;     /* Blanco suave */
  --text-muted: #94a3b8;    /* Gris texto */
  --border: rgba(148, 163, 184, 0.15);
  --glass: rgba(30, 41, 59, 0.7);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.3);
  --radius: 16px;
  --nav-clearance: 140px;   /* Espacio extra al final para la barra sticky */
}

/* Base */
.idiomas-page {
  background-color: var(--bg-dark);
  color: var(--text-main);
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  min-height: 100vh;
  padding-bottom: var(--nav-clearance); /* CRÍTICO: Evita que la barra tape el final */
  overflow-x: hidden;
}

.container { max-width: 1100px; margin: 0 auto; padding: 0 24px; }
a { text-decoration: none; color: inherit; transition: all .2s; }
button { font-family: inherit; border: none; background: none; cursor: pointer; }
.text-center { text-align: center; }

/* Breadcrumbs */
.breadcrumbs { padding: 16px 0; font-size: 0.9rem; color: var(--text-muted); border-bottom: 1px solid var(--border); }
.breadcrumbs a:hover { color: var(--primary); }
.breadcrumbs .sep { margin: 0 8px; opacity: .5; }
.breadcrumbs .curr { color: var(--text-main); font-weight: 500; }

/* ── HERO SECTION ── */
.hero { padding: 60px 0 40px; position: relative; overflow: hidden; }
/* Fondo ambiental sutil */
.hero::before {
    content:''; position: absolute; top: -20%; right: -10%; width: 600px; height: 600px;
    background: radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%);
    pointer-events: none; z-index: 0;
}

.hero-grid { display: grid; grid-template-columns: 1fr 0.9fr; gap: 40px; align-items: center; position: relative; z-index: 1; }
@media (max-width: 900px) { .hero-grid { grid-template-columns: 1fr; text-align: center; } }

.badge-pill { 
    display: inline-block; background: rgba(99,102,241,0.1); color: #818cf8; 
    border: 1px solid rgba(99,102,241,0.3); padding: 6px 14px; border-radius: 50px; 
    font-size: 0.85rem; font-weight: 700; margin-bottom: 20px;
}

.display-title { font-size: clamp(2.2rem, 5vw, 3.5rem); line-height: 1.1; margin-bottom: 20px; font-weight: 800; }
.text-gradient { 
    background: linear-gradient(135deg, #818cf8 0%, #22d3ee 100%); 
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; 
}
.under-accent { border-bottom: 4px solid var(--primary); border-radius: 2px; }

.lead-text { font-size: 1.1rem; color: var(--text-muted); line-height: 1.6; margin-bottom: 30px; max-width: 550px; }
.lead-text b { color: var(--text-main); }
@media (max-width: 900px) { .lead-text { margin-left: auto; margin-right: auto; } }

.hero-actions { display: flex; gap: 15px; margin-bottom: 30px; }
@media (max-width: 900px) { .hero-actions { justify-content: center; } }

/* Botones */
.btn { padding: 12px 24px; border-radius: 12px; font-weight: 700; font-size: 1rem; display: inline-flex; align-items: center; justify-content: center; transition: all 0.25s ease; }
.btn-lg { padding: 14px 32px; font-size: 1.1rem; }
.btn-primary { background: var(--primary); color: white; box-shadow: 0 4px 15px rgba(99,102,241,0.3); }
.btn-primary:hover { background: var(--primary-hover); transform: translateY(-2px); box-shadow: 0 8px 25px rgba(99,102,241,0.4); }
.btn-ghost { color: var(--text-muted); border: 1px solid var(--border); }
.btn-ghost:hover { border-color: var(--text-main); color: var(--text-main); background: rgba(255,255,255,0.05); }

.trust-badges { display: flex; gap: 15px; flex-wrap: wrap; font-size: 0.9rem; font-weight: 600; color: var(--text-muted); }
@media (max-width: 900px) { .trust-badges { justify-content: center; } }
.t-badge { display: flex; align-items: center; gap: 6px; }
.dot { width: 8px; height: 8px; border-radius: 50%; display: inline-block; }
.i-blue { background: #60a5fa; } .i-amber { background: #fbbf24; } .i-teal { background: #2dd4bf; }

/* Hero Visual (Imagen Flotante) */
.hero-visual { position: relative; }
.image-card { position: relative; border-radius: 20px; overflow: hidden; border: 1px solid var(--border); box-shadow: 0 20px 40px rgba(0,0,0,0.4); }
.image-card img { width: 100%; display: block; height: auto; }

.float-card { 
    position: absolute; background: rgba(30, 41, 59, 0.9); backdrop-filter: blur(10px); 
    padding: 10px 16px; border-radius: 12px; border: 1px solid var(--border);
    display: flex; align-items: center; gap: 10px; box-shadow: 0 10px 20px rgba(0,0,0,0.2);
}
.float-1 { bottom: 20px; left: -20px; }
.float-2 { top: 30px; right: -20px; }
.emoji { font-size: 1.5rem; }
.float-card div { display: flex; flex-direction: column; line-height: 1.2; }
.float-card strong { font-size: 0.9rem; }
.float-card small { font-size: 0.75rem; color: var(--text-muted); }

/* ── STATS ── */
.stats-section { margin-top: 40px; border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); background: rgba(15,23,42,0.5); }
.stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; padding: 25px 0; }
@media (max-width: 768px) { .stats-grid { grid-template-columns: 1fr 1fr; } }
.stat-item { text-align: center; }
.stat-number { display: block; font-size: 2rem; font-weight: 800; color: var(--text-main); margin-bottom: 5px; }
.stat-label { font-size: 0.85rem; color: var(--text-muted); font-weight: 500; text-transform: uppercase; letter-spacing: 0.5px; }

/* ── HIGHLIGHT ── */
.highlight-section { padding: 60px 0; }
.highlight-grid { display: grid; grid-template-columns: 1fr 0.8fr; gap: 50px; align-items: center; }
@media (max-width: 900px) { .highlight-grid { grid-template-columns: 1fr; } }

.sub-caption { color: var(--accent); font-weight: 700; text-transform: uppercase; font-size: 0.8rem; letter-spacing: 1px; margin-bottom: 10px; display: block; }
.highlight-section h2 { font-size: 2rem; margin-bottom: 15px; }
.benefit-list { margin: 25px 0; display: grid; gap: 12px; }
.benefit-list li { display: flex; align-items: center; gap: 10px; font-size: 1rem; color: var(--text-muted); }
.benefit-list b { color: var(--text-main); }
.link-arrow { color: var(--primary); font-weight: 700; font-size: 1.1rem; }
.link-arrow:hover { text-decoration: underline; }

.path-card { background: var(--bg-card); padding: 30px; border-radius: 20px; border: 1px solid var(--border); }
.path-card h3 { margin-bottom: 20px; font-size: 1.2rem; }
.timeline { display: flex; flex-direction: column; gap: 20px; position: relative; border-left: 2px solid var(--border); padding-left: 20px; }
.step { position: relative; }
.step .circle { 
    position: absolute; left: -36px; top: 0; width: 30px; height: 30px; background: var(--bg-dark); 
    border: 2px solid var(--text-muted); border-radius: 50%; color: var(--text-muted);
    display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 0.8rem;
}
.step.done .circle { border-color: var(--primary); background: var(--primary); color: white; }
.step.active .circle { border-color: var(--accent); color: var(--accent); background: var(--bg-dark); }
.step .info strong { display: block; color: var(--text-main); }
.step .info small { font-size: 0.85rem; color: var(--text-muted); }

/* ── BUILDER (Cards) ── */
.builder-section { padding: 40px 0; }
.section-header { margin-bottom: 40px; max-width: 600px; margin-left: auto; margin-right: auto; }
.section-header h2 { font-size: 2.2rem; margin-bottom: 10px; }

.quick-filters { display: flex; justify-content: center; gap: 10px; flex-wrap: wrap; margin-bottom: 30px; align-items: center; }
.chip { background: var(--bg-card); border: 1px solid var(--border); padding: 8px 16px; border-radius: 20px; color: var(--text-muted); font-weight: 600; font-size: 0.9rem; transition: all .2s; }
.chip:hover { border-color: var(--primary); color: var(--text-main); background: rgba(99,102,241,0.1); }

.courses-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; }
.course-card { 
    background: var(--bg-card); border: 1px solid var(--border); border-radius: 20px; padding: 24px; 
    transition: all 0.3s ease; position: relative; display: flex; flex-direction: column;
}
.course-card:hover { transform: translateY(-4px); box-shadow: 0 15px 30px rgba(0,0,0,0.3); border-color: var(--primary); }
.course-card.is-selected { border-color: var(--primary); background: linear-gradient(180deg, rgba(99,102,241,0.05), var(--bg-card)); box-shadow: 0 0 0 2px rgba(99,102,241,0.3); }

.card-top { display: flex; gap: 15px; align-items: flex-start; margin-bottom: 15px; }
.card-emoji { font-size: 2.5rem; line-height: 1; }
.card-titles h3 { margin: 0; font-size: 1.2rem; margin-bottom: 4px; }
.badge-live { background: rgba(34,197,94,0.15); color: #4ade80; padding: 2px 8px; border-radius: 4px; font-size: 0.7rem; font-weight: 700; text-transform: uppercase; }
.badge-soon { background: rgba(251,191,36,0.15); color: #fbbf24; padding: 2px 8px; border-radius: 4px; font-size: 0.7rem; font-weight: 700; text-transform: uppercase; }

.checkbox-indicator { width: 24px; height: 24px; border: 2px solid var(--border); border-radius: 50%; margin-left: auto; transition: .2s; }
.is-selected .checkbox-indicator { background: var(--primary); border-color: var(--primary); box-shadow: inset 0 0 0 4px var(--bg-card); }

.card-summary { font-size: 0.9rem; color: var(--text-muted); margin-bottom: 20px; flex-grow: 1; }

.level-selector { margin-bottom: 20px; }
.ls-label { font-size: 0.8rem; text-transform: uppercase; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 8px; }
.ls-buttons { display: flex; gap: 6px; flex-wrap: wrap; }
.lv-btn { 
    border: 1px solid var(--border); border-radius: 8px; padding: 6px 12px; font-size: 0.85rem; font-weight: 700; color: var(--text-muted); 
    transition: .2s;
}
.lv-btn:hover { background: var(--bg-card-hover); }
.lv-btn.active { background: var(--text-main); color: var(--bg-dark); border-color: var(--text-main); }

.btn-select-course { width: 100%; padding: 12px; border-radius: 10px; font-weight: 700; background: var(--bg-dark); color: var(--text-main); border: 1px solid var(--border); transition: .2s; }
.is-selected .btn-select-course { background: var(--primary); border-color: var(--primary); }
.btn-select-course:disabled { opacity: 0.6; cursor: not-allowed; background: var(--bg-card-hover); border-color: var(--border); }

/* Card Details (Mini FAQ) */
.card-details { margin-top: 15px; border-top: 1px solid var(--border); padding-top: 15px; }
.card-details summary { 
    font-size: 0.9rem; font-weight: 600; color: var(--accent); cursor: pointer; 
    list-style: none; /* Oculta el triángulo predeterminado */
}
/* Nota: Se necesita un IconFont externo para que 'i' y 'j' funcionen como íconos */
/* .card-details summary::before { content: 'i'; font-family: 'IconFont'; margin-right: 8px; } */ 
/* .card-details[open] summary::before { content: 'j'; } */
.det-content { margin-top: 10px; padding: 10px 0; border-left: 2px solid var(--accent); padding-left: 10px; }
.det-item { font-size: 0.85rem; margin-bottom: 5px; color: var(--text-muted); }
.det-item strong { color: var(--text-main); font-weight: 600; }

/* ── FEATURES / BENEFITS ── */
.features-section { padding: 60px 0; background-color: rgba(6,182,212,0.05); }
.features-section h2 { margin-bottom: 40px; }
.features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 30px; }
.feat-card { 
    background: var(--bg-card); padding: 30px; border-radius: 20px; 
    border: 1px solid var(--border); text-align: center;
}
.feat-card .icon { font-size: 3rem; margin-bottom: 15px; }
.feat-card h4 { font-size: 1.2rem; margin-bottom: 10px; color: var(--primary); }
.feat-card p { color: var(--text-muted); font-size: 0.95rem; }

/* ── TESTIMONIALS ── */
.testimonials-section { padding: 60px 0; }
.testimonials-section h2 { margin-bottom: 40px; }
.testi-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 20px; }
.testi-card { 
    background: var(--bg-card); padding: 30px; border-radius: 20px; 
    border-left: 5px solid var(--accent); box-shadow: var(--shadow-lg);
}
.testi-card p { font-style: italic; font-size: 1.1rem; line-height: 1.6; margin-bottom: 20px; color: var(--text-main); }
.testi-card .user { display: flex; align-items: center; gap: 15px; }
.testi-card .avatar { 
    width: 40px; height: 40px; border-radius: 50%; background: var(--primary); 
    display: flex; justify-content: center; align-items: center; font-weight: 700;
}
.testi-card span { font-size: 0.85rem; color: var(--text-muted); display: block; }

/* ── FAQ GENERAL ── */
.faq-section { padding: 40px 0 60px; }
.faq-section h2 { margin-bottom: 30px; }
.faq-wrapper { max-width: 800px; margin: 0 auto; }
.faq-wrapper details { 
    border: 1px solid var(--border); border-radius: 12px; margin-bottom: 15px; 
    background: var(--bg-card);
}
.faq-wrapper summary { 
    padding: 20px; font-weight: 700; cursor: pointer; 
    position: relative; list-style: none; transition: color .2s;
}
.faq-wrapper details[open] summary { color: var(--primary); }
.faq-wrapper summary::after { 
    content: '+'; position: absolute; right: 20px; font-size: 1.5rem; 
    top: 50%; transform: translateY(-50%);
}
.faq-wrapper details[open] summary::after { content: '−'; }
.faq-wrapper details p { padding: 0 20px 20px; color: var(--text-muted); line-height: 1.6; }


/* ── STICKY BAR (Fixed Bottom) ── */
.sticky-bar-wrapper {
    position: fixed; bottom: 0; left: 0; width: 100%; z-index: 50;
    transform: translateY(100%); transition: transform 0.4s ease-out;
}
.sticky-bar-wrapper.show { transform: translateY(0); }

.sticky-bar {
    max-width: 1100px; margin: 0 auto; padding: 15px 24px;
    display: flex; justify-content: space-between; align-items: center;
}
/* Glassmorphism Effect */
.glass-panel {
    background: var(--glass); 
    backdrop-filter: blur(15px);
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 -5px 20px rgba(0, 0, 0, 0.2);
    border-radius: 20px 20px 0 0;
}
@media (max-width: 1100px) { /* Asegura que el efecto se extienda al 100% en móvil */
    .sticky-bar { border-radius: 0; padding: 15px 24px; }
    .glass-panel { border-radius: 0; }
}

.bar-info { display: flex; flex-direction: column; }
.bar-count { font-size: 0.9rem; color: var(--text-muted); font-weight: 600; text-transform: uppercase; }
.bar-names { font-size: 1.1rem; font-weight: 700; color: var(--text-main); margin-top: 5px; }

.bar-pricing { display: flex; align-items: center; gap: 20px; }
.price-group { text-align: right; line-height: 1.2; }
.price-group small { font-size: 0.8rem; color: var(--text-muted); display: block; }
.price-big { font-size: 1.8rem; font-weight: 800; color: var(--accent); }

.action-group { display: flex; flex-direction: column; align-items: flex-end; }
.btn-glow { box-shadow: 0 0 15px rgba(99,102,241,0.6); }
.fee-note { font-size: 0.75rem; color: var(--text-muted); margin-top: 4px; }

/* Responsive adjustments for sticky bar */
@media (max-width: 700px) {
    .sticky-bar { flex-direction: column; align-items: stretch; text-align: center; gap: 10px; }
    .bar-info { margin-bottom: 10px; }
    .bar-pricing { justify-content: space-between; width: 100%; }
    .action-group { align-items: center; }
    .btn-glow { width: 100%; }
}
`;