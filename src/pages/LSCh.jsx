// src/pages/LSCh.jsx
import { useMemo, useRef, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
// Ajusta la ruta de importación si tus datos están en otro lado
import {
  LSCH_ENROLLMENT_FEE,
  LSCH_MODULES,
  LSCH_GROUP_PLANS,
  LSCH_ONE2ONE_PLANS,
  LSCH_PURPOSES,
  priceForGroupPlan,
  clp,
} from "../data/lsch.js";
import senasImg from "../assets/img/lael/senas.jpg"; 

const CERTIFICATE_FEE = 19990;

/* --------- SEO Component --------- */
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
    
    // Corrección de error de tipeo anterior
    upsertMeta("twitter:card", "summary_large_image");
    upsertMeta("twitter:title", title); 
    upsertMeta("twitter:description", description);

    // JSON-LD
    const scriptId = "lsch-jsonld";
    const existingScript = document.getElementById(scriptId);
    if (existingScript) existingScript.remove();
    
    const script = document.createElement('script');
    script.id = scriptId;
    script.type = 'application/ld+json';
    script.text = JSON.stringify(jsonLd);
    document.head.appendChild(script);

    return () => {
        const s = document.getElementById(scriptId);
        if(s) s.remove();
    }
  }, [title, description, canonical, keywords, image, jsonLd, location.pathname]);

  return null;
}

/* --------- Horizontal Scroll Helper --------- */
function HScroll({ children }) {
  const ref = useRef(null);
  const slide = (dir) => {
    const el = ref.current;
    if (!el) return;
    const amount = el.clientWidth * 0.8;
    el.scrollBy({ left: dir === "next" ? amount : -amount, behavior: "smooth" });
  };
  return (
    <div className="hscroll-wrapper">
      <button className="hscroll-nav prev" onClick={() => slide("prev")}>‹</button>
      <div className="hscroll-track" ref={ref}>{children}</div>
      <button className="hscroll-nav next" onClick={() => slide("next")}>›</button>
    </div>
  );
}

/* ====================== PÁGINA PRINCIPAL ====================== */
export default function LSCh() {
  const [church, setChurch] = useState(false);
  const [purpose, setPurpose] = useState(LSCH_PURPOSES?.[0] ?? "");
  const [selectedGroupId, setSelectedGroupId] = useState("g-quarter"); // Asegúrate que este ID exista en tu data/lsch.js
  const [selectedOneId, setSelectedOneId] = useState(null);
  const [selectedModules, setSelectedModules] = useState(["lsch-m1"]); // Asegúrate que este ID exista
  const [certSelected, setCertSelected] = useState(false);

  // Fallbacks para evitar crashes si la data no carga
  const groupPlan = useMemo(() => LSCH_GROUP_PLANS.find(p => p.id === selectedGroupId) || LSCH_GROUP_PLANS[0], [selectedGroupId]);
  const onePlan   = useMemo(() => LSCH_ONE2ONE_PLANS.find(p => p.id === selectedOneId), [selectedOneId]);

  const monthlyGroup = groupPlan ? priceForGroupPlan(groupPlan, { church }) : 0;
  const monthlyOne   = onePlan?.monthly || 0;
  const totalMonthly = monthlyGroup + monthlyOne;
  const firstPayment = totalMonthly + LSCH_ENROLLMENT_FEE + (certSelected ? CERTIFICATE_FEE : 0);

  const toggleModule = (id) => {
    setSelectedModules(prev => {
      if (prev.includes(id) && prev.length === 1) return prev; // Mantener al menos 1
      return prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id];
    });
  };

  const whatsappText = encodeURIComponent(`Hola, quiero info de LSCh. Plan: ${groupPlan?.title}. Total aprox: ${clp(totalMonthly)}`);

  return (
    <section className="lsch-page-v2">
      <SEOHead 
        title="Curso LSCh Online | Instituto Lael" 
        description="Aprende Lengua de Señas Chilena con docentes sordas." 
        canonical="https://www.institutolael.cl/lsch"
      />
      
      <style>{css}</style>

      {/* --- HERO --- */}
      <header className="hero-v2">
        <div className="container hero-content-grid">
          <div className="hero-text-area">
            <span className="hero-tagline">Admisión 2025</span>
            <h1 className="hero-main-title">
              Lengua de Señas <br/>
              <span className="highlight-gradient">Real y Sin Enredos.</span>
            </h1>
            <p className="hero-lead-text">
              Aprende gramática y cultura con <b>docentes sordas nativas</b>. 
              Clases en vivo, plataforma 24/7 y certificación oficial.
            </p>
            <div className="hero-cta-buttons">
              <button onClick={() => document.getElementById('builder').scrollIntoView({behavior: 'smooth'})} className="btn-primary-v2">
                Ver Planes y Precios
              </button>
            </div>
          </div>
          <div className="hero-image-area">
            <div className="image-stack-card">
              <img src={senasImg} alt="Clase LSCh" />
              <div className="overlay-badge">
                <span>💬</span> Docentes Nativas
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* --- CONTROLES (Convenio) --- */}
      <div className="container" style={{ marginTop: '-40px', position: 'relative', zIndex: 10 }}>
        <div className="controls-card glass-effect">
            <div className="control-row">
                <div className="control-info">
                    <span style={{fontSize:'1.5rem'}}>⛪</span>
                    <div>
                        <strong>¿Eres de una Iglesia?</strong>
                        <p style={{margin:0, fontSize:'0.85rem', color:'var(--text-secondary)'}}>Activa el convenio para precios preferenciales.</p>
                    </div>
                </div>
                <label className="toggle-v2">
                    <input type="checkbox" checked={church} onChange={e => setChurch(e.target.checked)} />
                    <span className="toggle-slider"></span>
                    <span className="toggle-label">{church ? "Activado" : "Activar"}</span>
                </label>
            </div>
        </div>
      </div>

      {/* --- BUILDER --- */}
      <div id="builder" className="builder-area">
        <div className="container">
            
            {/* 1. Módulos */}
            <h2 className="section-title">1. Elige tus Módulos</h2>
            <div className="modules-grid-v2">
                {LSCH_MODULES.map(m => {
                    const active = selectedModules.includes(m.id);
                    return (
                        <div key={m.id} className={`module-item-card ${active ? 'active' : ''}`} onClick={() => toggleModule(m.id)}>
                            <div className="mod-head">
                                <span className="mod-tag">{m.tag}</span>
                                <div className={`checkbox ${active ? 'checked' : ''}`}></div>
                            </div>
                            <h3>{m.name}</h3>
                            <ul>{m.bullets.slice(0,2).map((b,i)=><li key={i}>{b}</li>)}</ul>
                        </div>
                    )
                })}
            </div>

            {/* 2. Planes */}
            <h2 className="section-title" style={{marginTop:'60px'}}>2. Elige tu Plan de Pago</h2>
            <HScroll>
                {LSCH_GROUP_PLANS.map(p => {
                    const active = selectedGroupId === p.id;
                    const monthly = priceForGroupPlan(p, { church });
                    return (
                        <div key={p.id} className={`plan-item-card ${active ? 'active' : ''}`} onClick={() => setSelectedGroupId(p.id)}>
                            {p.badge && <span className="plan-badge">{p.badge}</span>}
                            <h3>{p.title}</h3>
                            <div className="plan-price">
                                <span className="symbol">$</span>
                                {monthly.toLocaleString('es-CL')}
                                <span className="term">/mes</span>
                            </div>
                            <p className="plan-desc">{church ? "Precio convenio aplicado" : "Ahorro por pago adelantado"}</p>
                            <div className={`plan-indicator ${active ? 'selected' : ''}`}>
                                {active ? "Plan Seleccionado" : "Elegir Plan"}
                            </div>
                        </div>
                    )
                })}
            </HScroll>

            {/* 3. Extras */}
            <h2 className="section-title" style={{marginTop:'60px'}}>3. Complementos</h2>
            <div className="extras-grid">
                <div className={`extra-card ${certSelected ? 'active' : ''}`} onClick={() => setCertSelected(!certSelected)}>
                    <div className="extra-icon">🎓</div>
                    <div>
                        <h4>Certificación Oficial</h4>
                        <p>Diploma verificable por módulo.</p>
                    </div>
                    <div className="extra-action">
                        {certSelected ? `Agregado (+${clp(CERTIFICATE_FEE)})` : "Agregar"}
                    </div>
                </div>
                
                {LSCH_ONE2ONE_PLANS.map(p => (
                    <div key={p.id} className={`extra-card ${selectedOneId === p.id ? 'active' : ''}`} onClick={() => setSelectedOneId(selectedOneId === p.id ? null : p.id)}>
                        <div className="extra-icon">⭐</div>
                        <div>
                            <h4>Clases 1:1</h4>
                            <p>Refuerzo personalizado.</p>
                        </div>
                        <div className="extra-action">
                            {selectedOneId === p.id ? "Quitar" : `Agregar (+${clp(p.monthly)})`}
                        </div>
                    </div>
                ))}
            </div>

        </div>
      </div>

      {/* --- STICKY BAR --- */}
      <div className="sticky-summary-bar-wrapper">
        <div className="sticky-summary-bar glass-effect">
          <div className="summary-info">
            <span className="summary-label">Total Mensual</span>
            <div className="summary-price">{clp(totalMonthly)}</div>
            <div className="summary-detail">{selectedModules.length} Módulos · {groupPlan?.title}</div>
          </div>
          <a href={`https://wa.me/56964626568?text=${whatsappText}`} target="_blank" rel="noreferrer" className="btn-primary-v2">
            Inscribirme
          </a>
        </div>
      </div>

    </section>
  );
}

/* ===================== CSS UNIFICADO ===================== */
const css = `
:root {
    --bg-primary: #0C1221;
    --bg-secondary: #1A2233;
    --text-primary: #E0E7FF;
    --text-secondary: #A0B2D9;
    --accent-blue: #6366F1;
    --accent-green: #34D399;
    --accent-gold: #FACC15;
    --border-color: rgba(255, 255, 255, 0.1);
    --radius-lg: 16px;
    --nav-clearance: 120px;
}

/* BASE */
.lsch-page-v2 { background-color: var(--bg-primary); color: var(--text-primary); font-family: 'Inter', sans-serif; min-height: 100vh; padding-bottom: var(--nav-clearance); }
.container { max-width: 1000px; margin: 0 auto; padding: 0 20px; }
a { text-decoration: none; color: inherit; }
button { border: none; background: none; cursor: pointer; color: inherit; font-family: inherit; }
h1,h2,h3,h4 { margin: 0; font-weight: 800; }
p { line-height: 1.6; color: var(--text-secondary); }
ul { padding-left: 20px; color: var(--text-secondary); }

/* UTILIDADES */
.glass-effect { background: rgba(26, 34, 51, 0.8); backdrop-filter: blur(12px); border: 1px solid var(--border-color); border-radius: var(--radius-lg); }
.highlight-gradient { background: linear-gradient(90deg, var(--accent-blue), var(--accent-green)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }

/* BOTONES */
.btn-primary-v2 {
    background: var(--accent-blue); color: white; padding: 12px 24px; border-radius: 12px; font-weight: 700;
    display: inline-flex; align-items: center; justify-content: center; box-shadow: 0 4px 15px rgba(99,102,241,0.4);
    transition: transform 0.2s; text-align: center;
}
.btn-primary-v2:hover { transform: translateY(-2px); background: #4f46e5; }

/* HERO */
.hero-v2 { padding: 60px 0 80px; background: radial-gradient(circle at top right, rgba(99,102,241,0.15), transparent 70%); }
.hero-content-grid { display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 40px; align-items: center; }
@media(max-width:900px){ .hero-content-grid { grid-template-columns: 1fr; text-align: center; } }

.hero-tagline { color: var(--accent-green); text-transform: uppercase; font-weight: 700; font-size: 0.85rem; letter-spacing: 1px; display: block; margin-bottom: 10px; }
.hero-main-title { font-size: clamp(2.5rem, 5vw, 3.5rem); line-height: 1.1; margin-bottom: 20px; }
.hero-lead-text { font-size: 1.1rem; margin-bottom: 30px; max-width: 500px; }
@media(max-width:900px){ .hero-lead-text { margin-left: auto; margin-right: auto; } }

.image-stack-card { position: relative; border-radius: 20px; overflow: hidden; border: 1px solid var(--border-color); box-shadow: 0 20px 40px rgba(0,0,0,0.4); }
.image-stack-card img { width: 100%; display: block; }
.overlay-badge { position: absolute; bottom: 20px; right: 20px; background: rgba(0,0,0,0.8); padding: 8px 16px; border-radius: 10px; font-weight: 700; border: 1px solid var(--border-color); backdrop-filter: blur(5px); }

/* CONTROLES */
.controls-card { padding: 20px; }
.control-row { display: flex; justify-content: space-between; align-items: center; gap: 20px; }
.control-info { display: flex; align-items: center; gap: 15px; }

/* TOGGLE */
.toggle-v2 { display: flex; align-items: center; gap: 10px; cursor: pointer; }
.toggle-v2 input { display: none; }
.toggle-slider { width: 48px; height: 26px; background: var(--bg-primary); border-radius: 30px; border: 1px solid var(--border-color); position: relative; transition: .3s; }
.toggle-slider::before { content:''; position: absolute; top: 2px; left: 2px; width: 20px; height: 20px; background: var(--text-secondary); border-radius: 50%; transition: .3s; }
.toggle-v2 input:checked + .toggle-slider { background: var(--accent-green); border-color: var(--accent-green); }
.toggle-v2 input:checked + .toggle-slider::before { transform: translateX(22px); background: #fff; }

/* BUILDER */
.builder-area { padding: 40px 0; }
.section-title { margin-bottom: 25px; font-size: 1.8rem; }

/* Modules */
.modules-grid-v2 { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; }
.module-item-card { background: var(--bg-secondary); border: 1px solid var(--border-color); padding: 20px; border-radius: var(--radius-lg); cursor: pointer; transition: .2s; }
.module-item-card.active { border-color: var(--accent-blue); background: rgba(99,102,241,0.1); box-shadow: 0 0 0 1px var(--accent-blue); }
.mod-head { display: flex; justify-content: space-between; margin-bottom: 10px; }
.mod-tag { background: rgba(99,102,241,0.2); color: var(--accent-blue); font-size: 0.75rem; padding: 4px 8px; border-radius: 6px; font-weight: 700; text-transform: uppercase; }
.checkbox { width: 20px; height: 20px; border: 2px solid var(--border-color); border-radius: 50%; transition: .2s; }
.checkbox.checked { background: var(--accent-blue); border-color: var(--accent-blue); box-shadow: inset 0 0 0 3px var(--bg-secondary); }

/* Plans Scroll */
.hscroll-wrapper { display: flex; align-items: center; position: relative; }
.hscroll-track { display: flex; gap: 20px; overflow-x: auto; padding: 10px 5px 20px; scroll-snap-type: x mandatory; width: 100%; scrollbar-width: none; }
.hscroll-track::-webkit-scrollbar { display: none; }
.hscroll-nav { width: 40px; height: 40px; border-radius: 50%; background: var(--bg-secondary); border: 1px solid var(--border-color); position: absolute; z-index: 5; font-size: 1.5rem; display: flex; align-items: center; justify-content: center; }
.hscroll-nav:hover { background: var(--accent-blue); }
.hscroll-nav.prev { left: -15px; }
.hscroll-nav.next { right: -15px; }

.plan-item-card { min-width: 280px; background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: 24px; scroll-snap-align: center; transition: .2s; position: relative; display: flex; flex-direction: column; }
.plan-item-card.active { border-color: var(--accent-gold); background: #1c2436; box-shadow: 0 0 15px rgba(250, 204, 21, 0.1); }
.plan-badge { position: absolute; top: 15px; right: 15px; background: var(--accent-gold); color: black; font-size: 0.7rem; font-weight: 800; padding: 2px 8px; border-radius: 4px; text-transform: uppercase; }
.plan-price { font-size: 2rem; font-weight: 800; color: var(--text-primary); margin: 10px 0; }
.symbol { font-size: 1.2rem; }
.term { font-size: 0.9rem; color: var(--text-secondary); font-weight: 400; }
.plan-desc { color: var(--accent-green); font-size: 0.9rem; margin-bottom: 20px; min-height: 40px; }
.plan-indicator { margin-top: auto; font-weight: 700; color: var(--text-secondary); padding-top: 15px; border-top: 1px solid var(--border-color); }
.plan-indicator.selected { color: var(--accent-gold); }

/* Extras */
.extras-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; }
.extra-card { background: var(--bg-secondary); border: 1px solid var(--border-color); padding: 20px; border-radius: var(--radius-lg); display: flex; align-items: center; gap: 15px; cursor: pointer; transition: .2s; }
.extra-card.active { border-color: var(--accent-blue); background: rgba(99,102,241,0.05); }
.extra-icon { font-size: 2rem; }
.extra-action { margin-left: auto; font-weight: 700; font-size: 0.9rem; color: var(--accent-blue); }

/* STICKY BAR */
.sticky-summary-bar-wrapper { position: fixed; bottom: 0; left: 0; width: 100%; z-index: 100; padding: 20px; pointer-events: none; }
.sticky-summary-bar { max-width: 900px; margin: 0 auto; pointer-events: all; display: flex; justify-content: space-between; align-items: center; padding: 15px 25px; box-shadow: 0 20px 50px rgba(0,0,0,0.6); }
.summary-label { text-transform: uppercase; font-size: 0.75rem; color: var(--text-secondary); font-weight: 700; }
.summary-price { font-size: 1.5rem; font-weight: 800; line-height: 1.1; }
.summary-detail { font-size: 0.85rem; color: var(--accent-green); }

@media(max-width: 600px) {
    .control-row { flex-direction: column; text-align: center; }
    .sticky-summary-bar { flex-direction: column; gap: 15px; width: 100%; border-radius: 16px; align-items: stretch; text-align: center; }
    .btn-primary-v2 { width: 100%; }
}
`;