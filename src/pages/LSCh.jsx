// src/pages/LSCh.jsx
import { useMemo, useRef, useState, useEffect } from "react";
import {
  LSCH_ENROLLMENT_FEE,
  LSCH_MODULES,
  LSCH_GROUP_PLANS,
  LSCH_ONE2ONE_PLANS,
  LSCH_PURPOSES,
  CHURCH_CONVENIO,
  priceForGroupPlan,
  clp,
} from "../data/lsch.js";
import { Link, useLocation } from "react-router-dom";
import senasImg from "../assets/img/lael/senas.jpg"; // Asegúrate de que esta imagen sea impactante
import laelLogoWhite from "../assets/img/Logos/lael-inst-blanco.png"; // Usamos el logo blanco para fondos oscuros

const CERTIFICATE_FEE = 19990;

/* --------- SEO Component (Integrado y Mejorado) --------- */
function SEOHead({ title, description, canonical, keywords = [], image, jsonLd = [] }) {
  const location = useLocation();
  useEffect(() => {
    const url = canonical || (typeof window !== "undefined" ? `${window.location.origin}${location.pathname}` : "");

    document.title = title;

    const upsertMeta = (nameAttr, contentAttr, isProperty = false) => {
      const selector = isProperty ? `meta[property="${nameAttr}"]` : `meta[name="${nameAttr}"]`;
      let el = document.head.querySelector(selector);
      if (!el) {
        el = document.createElement("meta");
        if (isProperty) el.setAttribute("property", nameAttr);
        else el.setAttribute("name", nameAttr);
        document.head.appendChild(el);
      }
      el.setAttribute("content", contentAttr);
    };

    upsertMeta("description", description);
    if (keywords.length) upsertMeta("keywords", keywords.join(", "));

    const linkCanonical = document.head.querySelector('link[rel="canonical"]');
    if (linkCanonical) linkCanonical.setAttribute("href", url);
    else {
      const link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      link.setAttribute("href", url);
      document.head.appendChild(link);
    }

    // Open Graph
    upsertMeta("og:title", title, true);
    upsertMeta("og:description", description, true);
    upsertMeta("og:url", url, true);
    upsertMeta("og:type", "website", true);
    if (image) upsertMeta("og:image", image, true);

    // Twitter
    upsertMeta("twitter:card", "summary_large_image");
    upsportMeta("twitter:title", title);
    upsertMeta("twitter:description", description);
    if (image) upsertMeta("twitter:image", image);

    // JSON-LD
    document.querySelectorAll('script[data-lael-jsonld-lsch]').forEach(s => s.remove());
    const list = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
    list.forEach((obj, idx) => {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.dataset.laelJsonldLsch = `lsch-${idx}`; // Custom attribute for easy removal
        script.text = JSON.stringify(obj);
        document.head.appendChild(script);
    });

  }, [title, description, canonical, keywords, image, jsonLd, location.pathname]);

  return null;
}

/* --------- UI: Horizontal Scroll --------- */
function HScroll({ children, ariaLabel }) {
  const ref = useRef(null);
  const slide = (dir) => {
    const el = ref.current;
    if (!el) return;
    const scrollAmount = el.clientWidth * 0.8;
    const targetScroll = dir === "next" ? el.scrollLeft + scrollAmount : el.scrollLeft - scrollAmount;
    
    // Calcula la posición final asegurando que no se pase de los límites
    const maxScrollLeft = el.scrollWidth - el.clientWidth;
    const finalScroll = Math.max(0, Math.min(targetScroll, maxScrollLeft));

    el.scrollTo({ left: finalScroll, behavior: "smooth" });
  };
  return (
    <div className="hscroll-wrapper">
      <button className="hscroll-nav prev" onClick={() => slide("prev")} aria-label="Anterior">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </button>
      <div className="hscroll-track" ref={ref} aria-label={ariaLabel}>{children}</div>
      <button className="hscroll-nav next" onClick={() => slide("next")} aria-label="Siguiente">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </button>
    </div>
  );
}


/* ====================== PAGE ====================== */
export default function LSCh() {
  const [church, setChurch] = useState(false);
  const [purpose, setPurpose] = useState(LSCH_PURPOSES?.[0] ?? "");
  const [selectedGroupId, setSelectedGroupId] = useState("g-quarter");
  const [selectedOneId, setSelectedOneId] = useState(null);
  const [selectedModules, setSelectedModules] = useState(["lsch-m1"]);
  const [certSelected, setCertSelected] = useState(false);

  const groupPlan = useMemo(() => LSCH_GROUP_PLANS.find(p => p.id === selectedGroupId), [selectedGroupId]);
  const onePlan   = useMemo(() => LSCH_ONE2ONE_PLANS.find(p => p.id === selectedOneId), [selectedOneId]);

  const monthlyGroup = priceForGroupPlan(groupPlan, { church });
  const monthlyOne   = onePlan?.monthly || 0;
  const totalMonthly = monthlyGroup + monthlyOne;
  const firstPayment = totalMonthly + LSCH_ENROLLMENT_FEE + (certSelected ? CERTIFICATE_FEE : 0);

  const selectedModulesLabels = useMemo(
    () => LSCH_MODULES.filter(m => selectedModules.includes(m.id)).map(m => m.name),
    [selectedModules]
  );

  const toggleModule = (id) => {
    setSelectedModules(prev => {
      // Siempre debe haber al menos un módulo seleccionado
      if (prev.includes(id) && prev.length === 1) return prev;
      return prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id];
    });
  };

  const whatsappText = encodeURIComponent([
    "👋 Hola Instituto Lael, me interesa el programa de Lengua de Señas Chilena:",
    "",
    `➡️ Convenio Iglesias: ${church ? "Sí ✅" : "No ❌"}`,
    `➡️ Plan Grupal: ${groupPlan?.title || "No seleccionado"} (${clp(monthlyGroup)}/mes)`,
    `➡️ Clases 1:1: ${onePlan ? `${onePlan.title} (+${clp(monthlyOne)}/mes)` : "No"}`,
    `➡️ Módulos seleccionados: ${selectedModulesLabels.join(", ") || "Ninguno"}`,
    `➡️ Propósito de estudio: ${purpose || "No especificado"}`,
    `➡️ Certificación oficial: ${certSelected ? `Sí (+${clp(CERTIFICATE_FEE)} pago único)` : "No"}`,
    "",
    `💰 Estimado primer pago: ${clp(firstPayment)} (incluye matrícula y certificación si aplica)`,
    `🗓️ Mensualidad estimada: ${clp(totalMonthly)}`
  ].join("\n"));

  /* ======= SEO Data ======= */
  const pageTitle = "Curso Oficial de Lengua de Señas Chilena (LSCh) Online | Instituto Lael";
  const pageDescription = "Aprende LSCh con docentes sordas nativas y clases 100% en vivo. Certificación oficial, convenio para iglesias y enfoque práctico para la comunicación real.";
  const canonicalUrl = "https://www.institutolael.cl/lsch";
  const ogImage = "https://www.institutolael.cl/assets/img/og/lsch-og.jpg"; // Asegúrate de tener una imagen OG impactante
  
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Course",
      "name": "Programa de Lengua de Señas Chilena (LSCh) Online",
      "description": "Aprende Lengua de Señas Chilena (LSCh) con docentes sordas, clases en vivo, material interactivo y certificación oficial. Ideal para inclusión, trabajo o desarrollo personal.",
      "provider": {
        "@type": "Organization",
        "name": "Instituto Lael",
        "sameAs": "https://www.institutolael.cl"
      },
      "educationalCredentialAwarded": "Certificado de Dominio LSCh por Módulo",
      "hasCourseInstance": LSCH_MODULES.map(m => ({
          "@type": "CourseInstance",
          "courseMode": ["Online", "Live"],
          "location": { "@type": "VirtualLocation", "url": "https://www.institutolael.cl/lsch" },
          "name": `Módulo ${m.name} de LSCh`,
          "description": m.bullets[0], // Usar la primera bala como descripción corta
          "startDate": new Date().toISOString().split('T')[0], // Fecha actual, ajustar si hay fechas fijas
          "offers": {
            "@type": "Offer",
            "price": (m.id === "lsch-m1" && monthlyGroup > 0) ? monthlyGroup : "Variable", // Ejemplo, el precio es dinámico por el plan
            "priceCurrency": "CLP"
          }
      }))
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        { "@type": "Question", "name": "¿Necesito experiencia previa?", "acceptedAnswer": { "@type": "Answer", "text": "No, nuestro programa está diseñado para todos los niveles, desde principiantes (A0-A1) hasta avanzados." }},
        { "@type": "Question", "name": "¿Las clases son en vivo?", "acceptedAnswer": { "@type": "Answer", "text": "Sí, todas nuestras clases son en vivo y dictadas por docentes sordas, lo que garantiza una inmersión cultural y lingüística auténtica." }},
        { "@type": "Question", "name": "¿Quedan grabadas las clases?", "acceptedAnswer": { "@type": "Answer", "text": "Absolutamente. Todas las clases son grabadas y subidas a nuestra plataforma el mismo día, para que puedas repasar a tu ritmo." }},
        { "@type": "Question", "name": "¿Ofrecen certificación?", "acceptedAnswer": { "@type": "Answer", "text": `Sí, ofrecemos una certificación oficial por cada módulo aprobado, con un costo adicional único de ${clp(CERTIFICATE_FEE)}.` }},
        { "@type": "Question", "name": "¿Hay descuentos para iglesias o grupos?", "acceptedAnswer": { "@type": "Answer", "text": `Sí, contamos con un precio especial de convenio para iglesias y grupos. Puedes activarlo en el selector de la página.` }}
      ]
    }
  ];

  return (
    <section className="lsch-page-v2">
      <SEOHead
        title={pageTitle}
        description={pageDescription}
        canonical={canonicalUrl}
        keywords={[
          "Lengua de Señas Chilena online", "LSCh curso", "aprender LSCh Chile",
          "curso para sordos Chile", "lenguaje de señas Chile", "inclusion Chile",
          "comunidad sorda Chile", "certificación LSCh", "Instituto Lael LSCh"
        ]}
        image={ogImage}
        jsonLd={jsonLd}
      />

      {/* Inject Styles */}
      <style>{css}</style>

      {/* HERO SECTION */}
      <header className="hero-v2">
        <div className="container hero-content-grid">
          <div className="hero-text-area">
            <span className="hero-tagline">✨ Tu ventana a un nuevo mundo</span>
            <h1 className="hero-main-title">
              Domina la <span className="highlight-gradient">Lengua de Señas Chilena</span> <br/>
              con docentes sordas.
            </h1>
            <p className="hero-lead-text">
              Más allá de las palabras. Aprende la gramática, cultura y comunicación real de la LSCh
              con nuestro programa 100% en vivo, práctico y diseñado para impactar.
            </p>

            <div className="hero-feature-pills">
              <span>✅ Docentes Nativas Sordas</span>
              <span>✅ Clases 100% en Vivo y Grabadas</span>
              <span>✅ Certificación Oficial por Módulo</span>
            </div>

            <div className="hero-cta-buttons">
              <button onClick={() => document.getElementById('builder').scrollIntoView({behavior: 'smooth'})} className="btn-primary-v2 cta-shine-effect">
                Ver Planes y Precios
              </button>
              <a href={`https://wa.me/56964626568?text=${whatsappText}`} target="_blank" rel="noreferrer" className="btn-secondary-v2">
                Asesoría por WhatsApp
              </a>
            </div>
          </div>

          <div className="hero-image-area">
            <div className="image-stack-card">
              <img src={senasImg} alt="Clase de Lengua de Señas Chilena en vivo" loading="eager" />
              <div className="overlay-badge">
                <span className="badge-icon">💬</span>
                <span className="badge-text">Inmersión Cultural</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* CONVENIO & PROPÓSITO */}
      <section className="mid-section-controls">
        <div className="container controls-grid">
            {/* Convenio Iglesias */}
            <div className="convenio-card glass-effect">
                <div className="convenio-info">
                    <span className="convenio-icon">⛪</span>
                    <div>
                        <h3>Convenio Iglesias & Grupos</h3>
                        <p>Desbloquea un precio especial en tu mensualidad.</p>
                    </div>
                </div>
                <label className="toggle-v2">
                    <input type="checkbox" checked={church} onChange={e => setChurch(e.target.checked)} />
                    <span className="toggle-slider"></span>
                    <span className="toggle-label">{church ? "Activado" : "Activar"}</span>
                </label>
            </div>

            {/* Propósito */}
            <div className="purpose-selector-card glass-effect">
                <h3>¿Para qué quieres aprender LSCh?</h3>
                <div className="purpose-chips">
                    {LSCH_PURPOSES.map(p => (
                        <button key={p} className={`chip-v2 ${purpose === p ? 'active' : ''}`} onClick={() => setPurpose(p)}>
                            {p}
                        </button>
                    ))}
                </div>
            </div>
        </div>
      </section>

      {/* BUILDER SECTIONS */}
      <div id="builder" className="builder-area">
        <div className="container">

            {/* MÓDULOS */}
            <section className="builder-section-block">
                <h2 className="section-title">1. Selecciona tus <span className="highlight-text">Módulos de Estudio</span></h2>
                <p className="section-subtitle">Empieza desde cero o continúa tu camino con contenido práctico y cultural.</p>
                
                <div className="modules-grid-v2">
                    {LSCH_MODULES.map(m => {
                        const active = selectedModules.includes(m.id);
                        return (
                            <div key={m.id} className={`module-item-card ${active ? 'active' : ''}`} onClick={() => toggleModule(m.id)}>
                                <div className="module-header">
                                    <span className="module-level-tag">{m.tag}</span>
                                    <div className={`module-checkbox ${active ? 'checked' : ''}`}>
                                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                    </div>
                                </div>
                                <h3 className="module-title">{m.name}</h3>
                                <ul className="module-features-list">
                                    {m.bullets.slice(0, 2).map((b,i) => <li key={i}>{b}</li>)}
                                </ul>
                                <details className="module-details">
                                    <summary>Ver Contenidos Completos</summary>
                                    <ul className="module-full-list">
                                        {m.bullets.map((b,i) => <li key={i}>{b}</li>)}
                                    </ul>
                                </details>
                            </div>
                        )
                    })}
                </div>
            </section>

            {/* PLANES GRUPALES */}
            <section className="builder-section-block">
                <h2 className="section-title">2. Elige tu <span className="highlight-text">Plan de Clases Grupales</span></h2>
                <p className="section-subtitle">Flexibilidad de pago para que no detengas tu aprendizaje.</p>

                <HScroll ariaLabel="Planes de clases grupales">
                    {LSCH_GROUP_PLANS.map(p => {
                        const active = selectedGroupId === p.id;
                        const monthly = priceForGroupPlan(p, { church });
                        return (
                            <div key={p.id} className={`plan-item-card ${active ? 'active' : ''}`} onClick={() => setSelectedGroupId(p.id)}>
                                {p.badge && <span className="plan-promo-badge">{p.badge}</span>}
                                <h3 className="plan-name">{p.title}</h3>
                                <div className="plan-price-display">
                                    <span className="price-currency">$</span>
                                    <span className="price-value">{monthly.toLocaleString('es-CL')}</span>
                                    <span className="price-term">/mes</span>
                                </div>
                                <p className="plan-desc">
                                    {church ? "Precio convenio aplicado." : "Ahorro al pagar por adelantado."}
                                </p>
                                <div className={`plan-select-indicator ${active ? 'selected' : ''}`}>
                                    <span className="indicator-circle">
                                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                    </span>
                                    {active ? "Plan Seleccionado" : "Elegir este Plan"}
                                </div>
                            </div>
                        )
                    })}
                </HScroll>
            </section>

             {/* EXTRAS Y CERTIFICACIÓN */}
             <section className="builder-section-block">
                <h2 className="section-title">3. <span className="highlight-text">Potencia tu Aprendizaje</span> (Opcional)</h2>
                <p className="section-subtitle">Añade elementos que aceleren tu dominio de la LSCh.</p>
                <div className="extras-options-grid">
                    {/* Clases 1:1 */}
                    <div className={`extra-option-card ${selectedOneId ? 'active' : ''}`}>
                        <span className="extra-icon">🌟</span>
                        <div className="extra-content">
                            <h4>Clases Particulares 1:1</h4>
                            <p>Refuerzo intensivo con docente sorda. Ideal para dudas y práctica extra.</p>
                        </div>
                        <div className="extra-action">
                            {LSCH_ONE2ONE_PLANS.map(p => (
                                <button key={p.id} onClick={() => setSelectedOneId(selectedOneId === p.id ? null : p.id)} className={`btn-extra-toggle ${selectedOneId === p.id ? 'active' : ''}`}>
                                    {selectedOneId === p.id ? 'Quitar' : `Agregar (+${clp(p.monthly)})`}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Certificación Oficial */}
                    <div className={`extra-option-card ${certSelected ? 'active' : ''}`} onClick={() => setCertSelected(!certSelected)}>
                        <span className="extra-icon">🏅</span>
                        <div className="extra-content">
                            <h4>Certificación Oficial</h4>
                            <p>Obtén un diploma verificable por cada módulo aprobado. Impulsa tu CV.</p>
                        </div>
                        <div className="extra-action">
                            <button className={`btn-extra-toggle ${certSelected ? 'active' : ''}`}>
                                {certSelected ? `Agregado (+${clp(CERTIFICATE_FEE)})` : 'Agregar Certificado'}
                            </button>
                        </div>
                    </div>
                </div>
             </section>
        </div>
      </div>

      {/* FAQ SECTION */}
      <section className="faq-section-v2">
        <div className="container">
          <h2 className="section-title">Preguntas Frecuentes</h2>
          <div className="faq-grid-v2">
            <details className="faq-item-v2">
              <summary>¿Qué tipo de docentes dictan las clases?</summary>
              <p>Todas nuestras clases son dictadas por docentes sordas nativas de LSCh. Esto garantiza no solo el aprendizaje lingüístico, sino también una profunda inmersión en la cultura sorda, esencial para la comunicación efectiva.</p>
            </details>
            <details className="faq-item-v2">
              <summary>¿El material de estudio está incluido?</summary>
              <p>Sí, el acceso a todo el material de estudio digital (manuales, videos, ejercicios) y a la plataforma virtual está incluido en tu mensualidad.</p>
            </details>
            <details className="faq-item-v2">
              <summary>¿Puedo cambiar de plan si mis necesidades cambian?</summary>
              <p>Sí, ofrecemos flexibilidad. Puedes solicitar un cambio de plan (sujeto a disponibilidad y condiciones) contactando a nuestro equipo de soporte.</p>
            </details>
            <details className="faq-item-v2">
              <summary>¿Es este curso reconocido oficialmente?</summary>
              <p>Nuestro programa está diseñado siguiendo estándares de enseñanza de LSCh y ofrecemos certificación por módulo que valida tus conocimientos y habilidades, siendo un aval importante en tu desarrollo.</p>
            </details>
            <details className="faq-item-v2">
              <summary>¿Qué pasa si me pierdo una clase en vivo?</summary>
              <p>No hay problema. Todas nuestras clases en vivo son grabadas y subidas a nuestra plataforma el mismo día, para que puedas ponerte al día o repasar en cualquier momento.</p>
            </details>
             <details className="faq-item-v2">
              <summary>¿Cómo funciona la matrícula?</summary>
              <p>La matrícula es un pago único que se realiza al inicio para asegurar tu cupo. No se repite en los meses siguientes, solo pagas tu mensualidad del plan elegido.</p>
            </details>
          </div>
        </div>
      </section>


      {/* STICKY BAR (RESUMEN DE COMPRA) */}
      <div className="sticky-summary-bar-wrapper">
        <div className="sticky-summary-bar glass-effect">
          <div className="summary-details">
            <span className="summary-label">Tu Inversión Mensual</span>
            <div className="summary-price">
              <span className="price-currency">$</span>
              <span className="price-value">{totalMonthly.toLocaleString('es-CL')}</span>
              <small>/mes</small>
            </div>
            <div className="summary-items">
              {selectedModules.length} Módulos · {groupPlan?.title} {church && "· Convenio Iglesia"}
              {onePlan && ` + 1:1`}
            </div>
          </div>
          <div className="summary-actions">
            <div className="first-payment-info">
              <span>Primer pago aprox.</span>
              <b>{clp(firstPayment)}</b>
              <small>(incl. matrícula y certificado si aplica)</small>
            </div>
            <a href={`https://wa.me/56964626568?text=${whatsappText}`} target="_blank" rel="noreferrer" className="btn-primary-v2 cta-animate-pulse">
                Inscribirme y pagar
            </a>
          </div>
        </div>
      </div>

    </section>
  );
}

/* ===================== CSS (LUXURY DARK & MODERN) ===================== */
const css = `
/* -- Variables Globales -- */
:root {
    --bg-primary: #0C1221;          /* Fondo muy oscuro, casi negro azulado */
    --bg-secondary: #1A2233;        /* Fondo de tarjetas, un poco más claro */
    --text-primary: #E0E7FF;        /* Texto principal claro */
    --text-secondary: #A0B2D9;      /* Texto secundario/descriptivo */
    --accent-blue: #6366F1;         /* Azul vibrante para acentos y highlights */
    --accent-green: #34D399;        /* Verde para éxito/activo */
    --accent-gold: #FACC15;         /* Dorado para badges, destacar precios */
    --border-color: rgba(60, 70, 90, 0.4); /* Borde sutil */
    --shadow-deep: 0 10px 30px rgba(0, 0, 0, 0.4);
    --shadow-light: 0 5px 15px rgba(0, 0, 0, 0.2);
    --radius-md: 12px;
    --radius-lg: 20px;
    --nav-clearance: 160px;         /* Espacio para la barra sticky */
}

/* -- Reset & Base -- */
* { box-sizing: border-box; margin: 0; padding: 0; }
body {
    font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
    line-height: 1.6;
    color: var(--text-primary);
    background-color: var(--bg-primary);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
.lsch-page-v2 {
    background-color: var(--bg-primary);
    min-height: 100vh;
    padding-bottom: var(--nav-clearance);
    overflow-x: hidden;
}
.container { max-width: 1100px; margin: 0 auto; padding: 0 20px; }
a { text-decoration: none; color: inherit; transition: color 0.2s ease; }
button { cursor: pointer; border: none; background: none; font-family: inherit; color: inherit; }
ul, ol { list-style: none; }

/* -- Utilidades -- */
.highlight-gradient {
    background: linear-gradient(90deg, var(--accent-blue) 0%, var(--accent-green) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    display: inline-block; /* Crucial para el gradiente en múltiples líneas */
}
.highlight-text { color: var(--accent-blue); }
.glass-effect {
    background: rgba(26, 34, 51, 0.7); /* bg-secondary con opacidad */
    backdrop-filter: blur(15px);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-deep);
}
.cta-shine-effect {
    position: relative;
    overflow: hidden;
    z-index: 1;
}
.cta-shine-effect::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 30%;
    height: 100%;
    background: linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0) 100%);
    transform: skewX(-20deg);
    transition: all 0.7s ease;
    z-index: -1;
}
.cta-shine-effect:hover::before {
    left: 120%;
}
@keyframes pulse-v2 {
    0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(99,102,241,0.5); }
    70% { transform: scale(1.02); box-shadow: 0 0 0 15px rgba(99,102,241,0); }
    100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(99,102,241,0); }
}
.cta-animate-pulse { animation: pulse-v2 2s infinite; }

/* -- Botones Globales -- */
.btn-primary-v2 {
    background: var(--accent-blue);
    color: white;
    padding: 14px 28px;
    border-radius: var(--radius-md);
    font-weight: 700;
    font-size: 1.05rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    box-shadow: 0 8px 20px rgba(99,102,241,0.4);
}
.btn-primary-v2:hover {
    background: #4f46e5; /* Un poco más oscuro */
    transform: translateY(-3px);
    box-shadow: 0 12px 25px rgba(99,102,241,0.5);
}
.btn-secondary-v2 {
    background: transparent;
    color: var(--text-secondary);
    border: 2px solid var(--border-color);
    padding: 12px 24px;
    border-radius: var(--radius-md);
    font-weight: 600;
    font-size: 1rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
}
.btn-secondary-v2:hover {
    color: var(--text-primary);
    border-color: var(--accent-blue);
    background-color: rgba(99,102,241,0.08);
}

/* -- HERO SECTION -- */
JavaScript
/* ... Continuación del CSS ... */

.hero-v2 {
    position: relative;
    padding: 80px 0 60px;
    background: radial-gradient(circle at top right, rgba(99,102,241,0.15), transparent 60%);
    overflow: hidden;
}

.hero-content-grid {
    display: grid;
    grid-template-columns: 1.1fr 0.9fr;
    gap: 60px;
    align-items: center;
}

.hero-tagline {
    display: inline-block;
    font-size: 0.9rem;
    font-weight: 700;
    color: var(--accent-green);
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 16px;
    background: rgba(52, 211, 153, 0.1);
    padding: 6px 12px;
    border-radius: 20px;
}

.hero-main-title {
    font-size: clamp(2.5rem, 5vw, 4rem);
    line-height: 1.1;
    font-weight: 800;
    margin-bottom: 24px;
}

.hero-lead-text {
    font-size: 1.15rem;
    color: var(--text-secondary);
    max-width: 550px;
    margin-bottom: 32px;
}

.hero-feature-pills {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-bottom: 40px;
}

.hero-feature-pills span {
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    padding: 8px 16px;
    border-radius: 50px;
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--text-primary);
}

.hero-cta-buttons {
    display: flex;
    gap: 16px;
    align-items: center;
}

/* Hero Image Stack */
.hero-image-area {
    position: relative;
    display: flex;
    justify-content: center;
}

.image-stack-card {
    position: relative;
    width: 100%;
    max-width: 500px;
    border-radius: var(--radius-lg);
    overflow: hidden;
    box-shadow: var(--shadow-deep);
    border: 1px solid var(--border-color);
    transform: rotate(-2deg);
    transition: transform 0.3s ease;
}

.image-stack-card:hover {
    transform: rotate(0deg) scale(1.02);
}

.image-stack-card img {
    width: 100%;
    display: block;
    height: auto;
}

.overlay-badge {
    position: absolute;
    bottom: 20px;
    right: 20px;
    background: rgba(12, 18, 33, 0.85);
    backdrop-filter: blur(10px);
    padding: 10px 20px;
    border-radius: 12px;
    border: 1px solid var(--border-color);
    display: flex;
    align-items: center;
    gap: 10px;
    box-shadow: var(--shadow-light);
}

.badge-icon { font-size: 1.5rem; }
.badge-text { font-weight: 700; font-size: 0.9rem; color: var(--text-primary); }


/* -- CONTROLS SECTION (Convenio) -- */
.mid-section-controls {
    margin-top: -30px; /* Overlap hero */
    position: relative;
    z-index: 10;
    padding-bottom: 40px;
}

.controls-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
}

.convenio-card, .purpose-selector-card {
    padding: 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
}

.convenio-info { display: flex; gap: 16px; align-items: center; }
.convenio-icon { font-size: 2rem; }
.convenio-info h3 { font-size: 1.1rem; font-weight: 700; margin: 0; }
.convenio-info p { font-size: 0.9rem; color: var(--text-secondary); margin: 4px 0 0; }

/* Custom Toggle */
.toggle-v2 {
    position: relative;
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
}
.toggle-v2 input { display: none; }
.toggle-slider {
    width: 52px;
    height: 30px;
    background: var(--bg-primary);
    border-radius: 30px;
    border: 1px solid var(--border-color);
    position: relative;
    transition: 0.3s;
}
.toggle-slider::before {
    content: '';
    position: absolute;
    top: 3px; left: 3px;
    width: 22px; height: 22px;
    background: var(--text-secondary);
    border-radius: 50%;
    transition: 0.3s;
}
.toggle-v2 input:checked + .toggle-slider {
    background: var(--accent-green);
    border-color: var(--accent-green);
}
.toggle-v2 input:checked + .toggle-slider::before {
    transform: translateX(22px);
    background: white;
}
.toggle-label { font-weight: 700; font-size: 0.9rem; }

.purpose-selector-card { flex-direction: column; align-items: flex-start; }
.purpose-selector-card h3 { font-size: 1rem; margin-bottom: 12px; }
.purpose-chips { display: flex; flex-wrap: wrap; gap: 8px; }
.chip-v2 {
    background: var(--bg-primary);
    border: 1px solid var(--border-color);
    padding: 6px 14px;
    border-radius: 20px;
    font-size: 0.85rem;
    color: var(--text-secondary);
    transition: all 0.2s;
}
.chip-v2:hover { border-color: var(--text-primary); color: var(--text-primary); }
.chip-v2.active {
    background: var(--text-primary);
    color: var(--bg-primary);
    font-weight: 700;
    border-color: var(--text-primary);
}


/* -- BUILDER AREA -- */
.builder-area { padding: 40px 0; }
.builder-section-block { margin-bottom: 80px; }
.section-title { font-size: 2rem; margin-bottom: 10px; text-align: center; }
.section-subtitle { text-align: center; color: var(--text-secondary); margin-bottom: 40px; max-width: 600px; margin-left: auto; margin-right: auto; }

/* Modules Grid */
.modules-grid-v2 {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 24px;
}

.module-item-card {
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-lg);
    padding: 24px;
    cursor: pointer;
    transition: all 0.2s ease;
    position: relative;
    overflow: hidden;
}

.module-item-card:hover {
    transform: translateY(-5px);
    border-color: var(--text-secondary);
    background: #1F293F;
}

.module-item-card.active {
    border-color: var(--accent-blue);
    background: rgba(99,102,241,0.05);
    box-shadow: 0 0 0 1px var(--accent-blue);
}

.module-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px; }
.module-level-tag { 
    background: rgba(99,102,241,0.15); color: var(--accent-blue); 
    font-weight: 800; font-size: 0.75rem; padding: 4px 10px; border-radius: 6px; 
    text-transform: uppercase;
}
.module-checkbox {
    width: 28px; height: 28px; border-radius: 50%; border: 2px solid var(--border-color);
    display: flex; align-items: center; justify-content: center; color: transparent; transition: 0.2s;
}
.module-checkbox.checked {
    background: var(--accent-blue);
    border-color: var(--accent-blue);
    color: white;
}
.module-checkbox svg { width: 16px; }

.module-title { font-size: 1.25rem; margin-bottom: 12px; }
.module-features-list { padding-left: 20px; margin-bottom: 16px; list-style: disc; color: var(--text-secondary); font-size: 0.9rem; }
.module-details summary { cursor: pointer; font-size: 0.85rem; font-weight: 700; color: var(--text-primary); outline: none; }
.module-full-list { margin-top: 10px; padding-left: 20px; font-size: 0.85rem; color: var(--text-secondary); }


/* Plans Horizontal Scroll */
.hscroll-wrapper { position: relative; display: flex; align-items: center; }
.hscroll-track {
    display: flex;
    gap: 20px;
    overflow-x: auto;
    padding: 20px 5px 40px; /* Space for shadows */
    scroll-snap-type: x mandatory;
    scrollbar-width: none;
    width: 100%;
}
.hscroll-track::-webkit-scrollbar { display: none; }

.hscroll-nav {
    width: 44px; height: 44px; border-radius: 50%;
    background: var(--bg-secondary); border: 1px solid var(--border-color);
    color: var(--text-primary); display: flex; align-items: center; justify-content: center;
    position: absolute; z-index: 5; cursor: pointer; box-shadow: var(--shadow-light);
    transition: 0.2s;
}
.hscroll-nav:hover { background: var(--accent-blue); border-color: var(--accent-blue); }
.hscroll-nav.prev { left: -20px; }
.hscroll-nav.next { right: -20px; }
.hscroll-nav svg { width: 24px; height: 24px; }

.plan-item-card {
    min-width: 300px;
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-lg);
    padding: 30px;
    display: flex; flex-direction: column;
    scroll-snap-align: center;
    transition: 0.3s;
    position: relative;
}

.plan-item-card.active {
    border-color: var(--accent-gold);
    box-shadow: 0 0 20px rgba(250, 204, 21, 0.15);
    background: #1c2538;
}

.plan-promo-badge {
    position: absolute; top: 15px; right: 15px;
    background: var(--accent-gold); color: #000;
    font-weight: 800; font-size: 0.7rem; padding: 4px 8px; border-radius: 4px;
    text-transform: uppercase;
}

.plan-name { font-size: 1.3rem; margin-bottom: 10px; }
.plan-price-display { display: flex; align-items: baseline; gap: 4px; color: var(--text-primary); margin-bottom: 8px; }
.price-currency { font-size: 1.2rem; font-weight: 600; }
.price-value { font-size: 2.2rem; font-weight: 800; }
.price-term { color: var(--text-secondary); font-weight: 600; }
.plan-desc { font-size: 0.9rem; color: var(--accent-green); margin-bottom: 24px; min-height: 40px; }

.plan-select-indicator {
    margin-top: auto;
    display: flex; align-items: center; gap: 10px;
    font-weight: 700; color: var(--text-secondary);
    padding-top: 20px; border-top: 1px solid var(--border-color);
}
.indicator-circle {
    width: 24px; height: 24px; border-radius: 50%; border: 2px solid var(--border-color);
    display: flex; align-items: center; justify-content: center; color: transparent;
}
.plan-select-indicator.selected { color: var(--accent-gold); }
.plan-select-indicator.selected .indicator-circle {
    background: var(--accent-gold); border-color: var(--accent-gold); color: #000;
}
.indicator-circle svg { width: 14px; }


/* Extras Grid */
.extras-options-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 24px;
}

.extra-option-card {
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-lg);
    padding: 24px;
    display: flex; gap: 20px; align-items: center;
    transition: 0.2s;
}
.extra-option-card.active { border-color: var(--accent-blue); background: rgba(99,102,241,0.05); }

.extra-icon { font-size: 2.5rem; }
.extra-content h4 { font-size: 1.1rem; margin: 0 0 5px; }
.extra-content p { font-size: 0.9rem; color: var(--text-secondary); margin: 0; line-height: 1.4; }
.extra-action { margin-left: auto; }

.btn-extra-toggle {
    border: 1px solid var(--border-color);
    color: var(--text-secondary);
    padding: 8px 16px;
    border-radius: 8px;
    font-size: 0.85rem;
    font-weight: 700;
    white-space: nowrap;
    transition: 0.2s;
}
.btn-extra-toggle:hover { border-color: var(--text-primary); color: var(--text-primary); }
.btn-extra-toggle.active {
    background: var(--accent-blue);
    border-color: var(--accent-blue);
    color: white;
}


/* -- FAQ SECTION -- */
.faq-section-v2 { padding: 40px 0 80px; }
.faq-grid-v2 { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 20px; margin-top: 40px; }
.faq-item-v2 {
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    padding: 20px;
    border-radius: var(--radius-md);
}
.faq-item-v2 summary { font-weight: 700; cursor: pointer; color: var(--text-primary); margin-bottom: 8px; outline: none; }
.faq-item-v2 p { font-size: 0.95rem; color: var(--text-secondary); margin: 0; }


/* -- STICKY SUMMARY BAR -- */
.sticky-summary-bar-wrapper {
    position: fixed;
    bottom: 0; left: 0; width: 100%;
    z-index: 100;
    padding: 20px;
    pointer-events: none; /* Let clicks pass through padding */
}

.sticky-summary-bar {
    max-width: 900px;
    margin: 0 auto;
    pointer-events: all;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 32px;
    background: rgba(12, 18, 33, 0.9); /* Darker glass */
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255,255,255,0.1);
    box-shadow: var(--shadow-deep);
    border-radius: 20px;
}

.summary-label { font-size: 0.75rem; text-transform: uppercase; color: var(--text-secondary); font-weight: 700; display: block; }
.summary-price { display: flex; align-items: baseline; gap: 4px; color: var(--text-primary); line-height: 1; margin: 4px 0; }
.summary-price .price-value { font-size: 1.8rem; font-weight: 800; }
.summary-items { font-size: 0.85rem; color: var(--accent-green); font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 300px; }

.summary-actions { display: flex; gap: 20px; align-items: center; }
.first-payment-info { text-align: right; display: flex; flex-direction: column; }
.first-payment-info span { font-size: 0.75rem; color: var(--text-secondary); }
.first-payment-info b { color: var(--text-primary); font-size: 1.1rem; line-height: 1.2; }
.first-payment-info small { font-size: 0.65rem; color: var(--text-secondary); opacity: 0.8; }


/* -- RESPONSIVE MEDIA QUERIES -- */
@media (max-width: 900px) {
    .hero-content-grid { grid-template-columns: 1fr; text-align: center; gap: 40px; }
    .hero-main-title { font-size: 2.5rem; }
    .hero-lead-text { margin: 0 auto 30px; }
    .hero-feature-pills { justify-content: center; }
    .hero-cta-buttons { justify-content: center; }
    .image-stack-card { max-width: 400px; margin: 0 auto; transform: rotate(0); }
    
    .controls-grid { grid-template-columns: 1fr; }
    .purpose-selector-card, .convenio-card { flex-direction: column; text-align: center; }
    .purpose-chips { justify-content: center; }
}

@media (max-width: 700px) {
    .hero-cta-buttons { flex-direction: column; width: 100%; }
    .btn-primary-v2, .btn-secondary-v2 { width: 100%; }
    
    .sticky-summary-bar { flex-direction: column; gap: 16px; align-items: stretch; padding: 20px; }
    .summary-details { text-align: center; margin-bottom: 10px; border-bottom: 1px solid var(--border-color); padding-bottom: 10px; }
    .summary-items { max-width: 100%; }
    .summary-actions { flex-direction: column-reverse; gap: 12px; }
    .first-payment-info { text-align: center; flex-direction: row; gap: 8px; justify-content: center; align-items: baseline; flex-wrap: wrap; }
}
`;