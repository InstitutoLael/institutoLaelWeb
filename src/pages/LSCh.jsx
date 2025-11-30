// src/pages/LSCh.jsx
// PARTE 1: LÓGICA Y ESTADOS (VERSION CORREGIDA Y MEJORADA)

import { useMemo, useRef, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LSCH_ENROLLMENT_FEE,
  LSCH_MODULES,
  LSCH_GROUP_PLANS,
  LSCH_ONE2ONE_PLANS, // Ahora contendrá opciones de horas
  LSCH_PURPOSES, // Aunque no se usa en la UI actual, se mantiene para flexibilidad
  priceForGroupPlan,
  clp,
} from "../data/lsch.js";
import senasImg from "../assets/img/lael/senas.jpg"; 

const CERTIFICATE_FEE = 19990;

/* --- Componente SEO Robusto (sin cambios) --- */
function SEOHead({ title, description, canonical }) {
  const location = useLocation();
  useEffect(() => {
    document.title = title;
    
    const setMeta = (name, content) => {
      let el = document.querySelector(`meta[name="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("name", name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    setMeta("description", description);
    
    const scriptId = "json-ld-lsch";
    if (!document.getElementById(scriptId)) {
        const script = document.createElement('script');
        script.id = scriptId;
        script.type = 'application/ld+json';
        script.text = JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Course",
            "name": "Lengua de Señas Chilena (LSCh) Online",
            "description": description,
            "provider": { "@type": "Organization", "name": "Instituto Lael", "sameAs": "https://www.institutolael.cl" }
        });
        document.head.appendChild(script);
    }
  }, [title, description]);
  return null;
}

/* --- Helper de Scroll Horizontal Mejorado --- */
function HScroll({ children }) {
  const ref = useRef(null);
  const scroll = (offset) => {
    if (ref.current) {
      ref.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };
  return (
    <div className="hscroll-wrapper">
      <button className="hscroll-nav prev" onClick={() => scroll(-300)} aria-label="Anterior">←</button>
      <div className="hscroll-content" ref={ref}>
        {children}
      </div>
      <button className="hscroll-nav next" onClick={() => scroll(300)} aria-label="Siguiente">→</button>
    </div>
  );
}

/* --- Componente Principal (Lógica de Negocio y Estados) --- */
export default function LSCh() {
  // Estados de la interfaz
  const [church, setChurch] = useState(false);
  const [purpose, setPurpose] = useState(""); // Se mantiene por si se quiere añadir en el futuro
  const [selectedGroupId, setSelectedGroupId] = useState("g-quarter"); // Default: Trimestral (ticket medio)
  const [selectedOne2OnePlan, setSelectedOne2OnePlan] = useState(null); // ID del plan 1:1 seleccionado
  const [selectedModules, setSelectedModules] = useState(["lsch-m1"]); // Default: Módulo 1
  const [certSelected, setCertSelected] = useState(false);
  const builderRef = useRef(null); // Para scroll al builder

  // Cálculos de Precio en Tiempo Real
  const groupPlan = useMemo(
    () => LSCH_GROUP_PLANS.find(p => p.id === selectedGroupId) || LSCH_GROUP_PLANS[0],
    [selectedGroupId]
  );
  
  // Encontrar el plan 1:1 seleccionado (o null si no hay)
  const one2OnePlanDetails = useMemo(
    () => LSCH_ONE2ONE_PLANS.find(p => p.id === selectedOne2OnePlan),
    [selectedOne2OnePlan]
  );

  const monthlyGroup = groupPlan ? priceForGroupPlan(groupPlan, { church }) : 0;
  const monthlyOne2One = one2OnePlanDetails?.monthly || 0; // Usar el monthly del plan 1:1
  
  const totalMonthly = monthlyGroup + monthlyOne2One;
  const totalFirstPayment = totalMonthly + LSCH_ENROLLMENT_FEE + (certSelected ? CERTIFICATE_FEE : 0);

  // Handlers
  const toggleModule = (id) => {
    setSelectedModules(prev => {
        // Asegura que al menos un módulo esté siempre seleccionado
        if (prev.includes(id) && prev.length === 1) return prev; 
        return prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id];
    });
  };

  // WhatsApp Link Generador (Venta Consultiva)
  const waLink = useMemo(() => {
    const text = `Hola 👋, estoy en la web de LSCh y me gustaría inscribirme.
Mi selección es:
- Plan Grupal: ${groupPlan.title} ${church ? '(Convenio Iglesia)' : ''}
- Módulos de estudio: ${selectedModules.map(id => LSCH_MODULES.find(m => m.id === id)?.name || id).join(', ')}
${one2OnePlanDetails ? `- Clases 1:1: ${one2OnePlanDetails.title}` : ''}
${certSelected ? `- Certificación Oficial` : ''}

💰 Total mensual estimado: ${clp(totalMonthly)}
💸 Primer pago estimado: ${clp(totalFirstPayment)} (incluye matrícula y certificación si aplica).

¿Me pueden ayudar con el proceso de pago?`;
    return `https://wa.me/56964626568?text=${encodeURIComponent(text)}`;
  }, [groupPlan, church, selectedModules, one2OnePlanDetails, certSelected, totalMonthly, totalFirstPayment]);

  // ANIMACIÓN DE NÚMEROS (Social Proof)
  useEffect(() => {
    const counters = document.querySelectorAll('.stat-num');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                const target = +entry.target.getAttribute('data-target');
                let count = 0;
                const inc = target / 50; // Ajustar para una animación suave
                const update = () => {
                    count += inc;
                    if(count < target) {
                        entry.target.innerText = Math.ceil(count);
                        requestAnimationFrame(update);
                    } else {
                        entry.target.innerText = target + (entry.target.getAttribute('data-plus') || "");
                    }
                };
                update();
                observer.unobserve(entry.target); // Detener observación una vez animado
            }
        });
    }, { threshold: 0.5 }); // Inicia cuando el 50% del elemento está visible

    counters.forEach(c => observer.observe(c));

    // Cleanup observer en desmontaje
    return () => observer.disconnect();
  }, []);

// CONTINÚA EN EL SIGUIENTE MENSAJE: PARTE 2 - HTML
// src/pages/LSCh.jsx
// PARTE 2: HTML (ESTRUCTURA VISUAL)

  return (
    <section className="lsch-page">
      <SEOHead 
        title="Curso de Lengua de Señas Chilena (LSCh) | Admisión 2025" 
        description="Aprende LSCh con docentes sordas. Clases en vivo, plataforma 24/7 y certificación oficial." 
        canonical="https://www.institutolael.cl/lsch" 
      />
      
      <style>{css}</style>

      {/* --- HERO SECTION --- */}
      <header className="hero">
        <div className="container hero__grid">
          <div className="hero__content">
            <div className="badge-new">🔥 Matrículas Abiertas</div>
            <h1 className="hero-title">
              La Lengua de Señas <br/>
              <span className="text-gradient">se aprende viviendo.</span>
            </h1>
            <p className="hero-lead">
              Un programa de inmersión real con <b>docentes sordas nativas</b>. 
              Olvídate de las señas sueltas y domina la cultura y gramática real.
            </p>
            
            <div className="hero-stats">
                <div className="stat-item">
                    <span className="stat-num" data-target="1500" data-plus="+">0</span>
                    <span className="stat-label">Egresados</span>
                </div>
                <div className="stat-item">
                    <span className="stat-num" data-target="98" data-plus="%">0</span>
                    <span className="stat-label">Satisfacción</span>
                </div>
            </div>

            <div className="hero-cta-group">
                <button onClick={() => builderRef.current?.scrollIntoView({behavior: 'smooth'})} className="btn btn-primary btn-glow">
                    Ver Planes y Precios
                </button>
            </div>
          </div>

          <div className="hero__visual">
            <div className="image-frame">
                <img src={senasImg} alt="Clase de LSCh en vivo con profesora sorda" loading="eager" />
                <div className="floating-card glass">
                    <span className="icon">👩‍🏫</span>
                    <div>
                        <strong>Docentes Sordas</strong>
                        <small>Inmersión Cultural</small>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </header>

      {/* --- BUILDER SECTION --- */}
      <div ref={builderRef} className="builder-section">
        <div className="container">
            
            {/* 1. TOGGLE IGLESIA */}
            <div className="church-banner glass">
                <div className="cb-info">
                    <div className="cb-icon">⛪</div>
                    <div>
                        <h3>Convenio Iglesias y Ministerios</h3>
                        <p>Activa el convenio para acceder a precios preferenciales.</p>
                    </div>
                </div>
                <label className="toggle-switch">
                    <input type="checkbox" checked={church} onChange={e => setChurch(e.target.checked)} />
                    <span className="slider"></span>
                    <span className="label-text">{church ? "Activado" : "Activar"}</span>
                </label>
            </div>

            <div className="builder-grid">
                {/* COLUMNA IZQUIERDA: SELECCIÓN */}
                <div className="builder-main">
                    
                    {/* PASO 1: MÓDULOS */}
                    <div className="step-block">
                        <div className="step-header">
                            <span className="step-num">1</span>
                            <h3>Elige tus Módulos</h3>
                        </div>
                        <div className="modules-list">
                            {LSCH_MODULES.map(m => {
                                const isActive = selectedModules.includes(m.id);
                                return (
                                    <div key={m.id} className={`module-card ${isActive ? 'active' : ''}`} onClick={() => toggleModule(m.id)}>
                                        <div className="mc-left">
                                            <div className={`checkbox ${isActive ? 'checked' : ''}`}></div>
                                            <div>
                                                <h4>{m.name}</h4>
                                                <span className="mc-tag">{m.tag}</span>
                                            </div>
                                        </div>
                                        <div className="mc-right">
                                            <ul>{m.bullets.slice(0, 2).map((b,i) => <li key={i}>{b}</li>)}</ul>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    {/* PASO 2: PLAN DE PAGO (Scroll Horizontal Controlado) */}
                    <div className="step-block">
                        <div className="step-header">
                            <span className="step-num">2</span>
                            <h3>Elige tu Plan de Clases</h3>
                        </div>
                        <div className="plans-container-wrapper">
                             <HScroll>
                                {LSCH_GROUP_PLANS.map(p => {
                                    const isActive = selectedGroupId === p.id;
                                    const price = priceForGroupPlan(p, { church });
                                    return (
                                        <div key={p.id} className={`plan-card ${isActive ? 'active' : ''}`} onClick={() => setSelectedGroupId(p.id)}>
                                            {p.badge && <span className="plan-badge">{p.badge}</span>}
                                            <div className="plan-name">{p.title}</div>
                                            <div className="plan-price">
                                                <span className="curr">$</span>
                                                {price.toLocaleString('es-CL')}
                                                <span className="per">/mes</span>
                                            </div>
                                            <div className="plan-desc">
                                                {church ? "Precio Convenio Iglesia" : "Ahorro por pago adelantado"}
                                            </div>
                                            <div className={`plan-radio ${isActive ? 'on' : ''}`}></div>
                                        </div>
                                    )
                                })}
                            </HScroll>
                        </div>
                    </div>

                    {/* PASO 3: EXTRAS (DISEÑO MEJORADO Y CONSOLIDADO) */}
                    <div className="step-block">
                        <div className="step-header">
                            <span className="step-num">3</span>
                            <h3>Personaliza tu experiencia</h3>
                        </div>
                        <div className="extras-list">
                            
                            {/* A. Certificado (Tarjeta Simple) */}
                            <div className={`extra-item ${certSelected ? 'active' : ''}`} onClick={() => setCertSelected(!certSelected)}>
                                <div className="ex-head">
                                    <span className="ex-icon">🎓</span>
                                    <div className="ex-info">
                                        <h4>Certificación Oficial</h4>
                                        <p>Diploma digital verificable para tu CV.</p>
                                    </div>
                                </div>
                                <div className="ex-action-row">
                                     <div className="ex-price">+{clp(CERTIFICATE_FEE)} <small>único</small></div>
                                     <div className={`checkbox ${certSelected ? 'checked' : ''}`}></div>
                                </div>
                            </div>
                            
                            {/* B. Clases 1:1 (TARJETA CONSOLIDADA - SOLUCIÓN AL PROBLEMA) */}
                            <div className={`extra-item consolidated ${selectedOne2OnePlan ? 'active' : ''}`}>
                                <div className="ex-head">
                                    <span className="ex-icon">💎</span>
                                    <div className="ex-info">
                                        <h4>Clases Particulares 1:1 (Refuerzo)</h4>
                                        <p>Acelera tu aprendizaje con sesiones privadas. Elige tu pack mensual:</p>
                                    </div>
                                </div>
                                
                                <div className="o2o-options-grid">
                                    {LSCH_ONE2ONE_PLANS.map(p => {
                                        const isSelected = selectedOne2OnePlan === p.id;
                                        return (
                                            <button 
                                                key={p.id} 
                                                className={`o2o-btn ${isSelected ? 'selected' : ''}`}
                                                onClick={() => setSelectedOne2OnePlan(isSelected ? null : p.id)}
                                            >
                                                <span className="o2o-title">{p.title}</span>
                                                <span className="o2o-price">+{clp(p.monthly)}</span>
                                                {isSelected && <span className="o2o-check">✔</span>}
                                            </button>
                                        )
                                    })}
                                </div>
                            </div>

                        </div>
                    </div>

                </div>

                {/* COLUMNA DERECHA: RESUMEN FLOTANTE (Desktop) */}
                <div className="builder-sidebar">
                    <div className="summary-card glass">
                        <h3>Tu Resumen</h3>
                        <div className="sum-rows">
                            <div className="sum-row">
                                <span>Plan {groupPlan.title}</span>
                                <strong>{clp(monthlyGroup)}/mes</strong>
                            </div>
                            {one2OnePlanDetails && (
                                <div className="sum-row highlight">
                                    <span>Clases 1:1 ({one2OnePlanDetails.title})</span>
                                    <strong>+{clp(monthlyOne2One)}/mes</strong>
                                </div>
                            )}
                            {certSelected && (
                                <div className="sum-row">
                                    <span>Certificación</span>
                                    <strong>{clp(CERTIFICATE_FEE)}</strong>
                                </div>
                            )}
                            <div className="sum-divider"></div>
                            <div className="sum-total">
                                <span>Total Mensual</span>
                                <span className="big-price">{clp(totalMonthly)}</span>
                            </div>
                            <div className="sum-first">
                                <span>Primer pago aprox:</span>
                                <strong>{clp(totalFirstPayment)}</strong>
                                <small>(Matrícula única {clp(LSCH_ENROLLMENT_FEE)} incluida)</small>
                            </div>
                        </div>
                        <a href={waLink} target="_blank" rel="noreferrer" className="btn btn-primary btn-block btn-glow">
                            Inscribirme Ahora
                        </a>
                        <p className="secure-text">🔒 Compra segura vía WhatsApp</p>
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* --- STICKY BAR (Solo Móvil) --- */}
      <div className="sticky-mobile glass">
        <div className="sm-info">
            <span className="sm-label">Total Mensual</span>
            <span className="sm-price">{clp(totalMonthly)}</span>
        </div>
        <a href={waLink} target="_blank" rel="noreferrer" className="btn btn-primary btn-sm">
            Inscribirme
        </a>
      </div>

    </section>
  );
}
/* src/pages/LSCh.jsx - PARTE 3: CSS DEFINITIVO */

/* ==========================================================================
   CSS LUXURY DARK & RESPONSIVE - FIXED
   ========================================================================== */
const css = `
:root {
  /* Paleta de Colores: Profundidad y Elegancia */
  --bg-body: #020617;       /* Negro azulado muy profundo */
  --bg-card: #0F172A;       /* Slate 900 */
  --bg-glass: rgba(15, 23, 42, 0.7);
  --primary: #6366F1;       /* Indigo Vibrante */
  --primary-glow: rgba(99, 102, 241, 0.5);
  --accent: #10B981;        /* Verde Esmeralda */
  --gold: #F59E0B;          /* Dorado para destacar */
  --text-main: #F8FAFC;     /* Blanco Off-white */
  --text-muted: #94A3B8;    /* Gris azulado */
  --border: rgba(255, 255, 255, 0.08);
  --radius: 16px;
  --nav-height: 100px;      /* Espacio seguro abajo */
}

/* --- BASE & LAYOUT --- */
.lsch-page {
  background-color: var(--bg-body);
  color: var(--text-main);
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  min-height: 100vh;
  width: 100%;
  overflow-x: hidden; /* CRÍTICO: Evita el scroll horizontal indeseado */
  padding-bottom: var(--nav-height);
}

.container {
  max-width: 1160px;
  margin: 0 auto;
  padding: 0 24px;
  position: relative;
}

a { text-decoration: none; color: inherit; transition: .2s; }
button { border: none; background: none; cursor: pointer; font-family: inherit; color: inherit; }

/* Utilidades */
.glass {
  background: var(--bg-glass);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid var(--border);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}

.text-gradient {
  background: linear-gradient(135deg, #818CF8 0%, #34D399 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* --- HERO SECTION --- */
.hero {
  position: relative;
  padding: 60px 0 80px;
  background: radial-gradient(circle at 70% 20%, rgba(99,102,241,0.12), transparent 60%);
  overflow: hidden;
}

.hero__grid {
  display: grid;
  grid-template-columns: 1fr 0.9fr;
  gap: 60px;
  align-items: center;
}

.badge-new {
  display: inline-block;
  background: rgba(16, 185, 129, 0.1);
  color: #34D399;
  border: 1px solid rgba(16, 185, 129, 0.2);
  padding: 6px 12px;
  border-radius: 50px;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 24px;
}

.hero-title {
  font-size: clamp(2.5rem, 5vw, 4rem);
  line-height: 1.1;
  font-weight: 800;
  margin-bottom: 24px;
  letter-spacing: -0.02em;
}

.hero-lead {
  font-size: 1.125rem;
  color: var(--text-muted);
  line-height: 1.6;
  margin-bottom: 40px;
  max-width: 540px;
}
.hero-lead b { color: var(--text-main); }

/* Stats */
.hero-stats {
  display: flex;
  gap: 40px;
  margin-bottom: 40px;
  border-left: 1px solid var(--border);
  padding-left: 24px;
}
.stat-item { display: flex; flex-direction: column; }
.stat-num { font-size: 1.75rem; font-weight: 800; color: var(--text-main); line-height: 1; }
.stat-label { font-size: 0.85rem; color: var(--text-muted); margin-top: 6px; }

/* Buttons */
.btn {
  display: inline-flex; align-items: center; justify-content: center;
  padding: 14px 28px; border-radius: 12px; font-weight: 700; font-size: 1rem;
  transition: all 0.3s ease;
}
.btn-primary {
  background: var(--primary); color: white;
  box-shadow: 0 4px 14px var(--primary-glow);
}
.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px var(--primary-glow);
  background: #4F46E5;
}
.btn-glow { animation: pulse 3s infinite; }

/* Hero Visual */
.image-frame {
  position: relative;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  border: 1px solid var(--border);
  transform: perspective(1000px) rotateY(-5deg);
  transition: transform 0.5s;
}
.image-frame:hover { transform: perspective(1000px) rotateY(0deg); }
.image-frame img { width: 100%; display: block; height: auto; }

.floating-card {
  position: absolute; bottom: 20px; right: 20px;
  padding: 12px 20px; border-radius: 16px;
  display: flex; align-items: center; gap: 12px;
  background: rgba(15, 23, 42, 0.9);
}
.floating-card .icon { font-size: 1.8rem; }
.floating-card div { display: flex; flex-direction: column; }
.floating-card strong { font-size: 0.9rem; line-height: 1.2; }
.floating-card small { font-size: 0.75rem; color: var(--accent); font-weight: 600; }

/* --- BUILDER SECTION --- */
.builder-section { padding: 40px 0 80px; }

/* Church Banner */
.church-banner {
  display: flex; justify-content: space-between; align-items: center;
  padding: 20px 32px; border-radius: 20px; margin-bottom: 50px;
  background: linear-gradient(90deg, rgba(30,41,59,0.5) 0%, rgba(16,185,129,0.1) 100%);
  border-color: rgba(16,185,129,0.2);
}
.cb-info { display: flex; gap: 20px; align-items: center; }
.cb-icon { font-size: 2.2rem; }
.cb-info h3 { margin: 0 0 4px; font-size: 1.1rem; }
.cb-info p { margin: 0; font-size: 0.9rem; color: var(--text-muted); }

/* Toggle */
.toggle-switch { display: flex; align-items: center; gap: 12px; cursor: pointer; }
.toggle-switch input { display: none; }
.slider {
  width: 52px; height: 30px; background: var(--bg-card); border-radius: 30px;
  position: relative; border: 1px solid var(--border); transition: .3s;
}
.slider::before {
  content:''; position: absolute; width: 22px; height: 22px; background: white;
  border-radius: 50%; top: 3px; left: 3px; transition: .3s;
}
.toggle-switch input:checked + .slider { background: var(--accent); border-color: var(--accent); }
.toggle-switch input:checked + .slider::before { transform: translateX(22px); }
.label-text { font-weight: 700; font-size: 0.9rem; }

/* Builder Grid Layout */
.builder-grid {
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 40px;
  align-items: start;
}

/* Steps Styling */
.step-block { margin-bottom: 50px; }
.step-header { display: flex; align-items: center; gap: 12px; margin-bottom: 24px; }
.step-num {
  background: var(--primary); color: white; width: 32px; height: 32px;
  border-radius: 50%; display: flex; align-items: center; justify-content: center;
  font-weight: 700; font-size: 1rem; flex-shrink: 0;
}
.step-header h3 { margin: 0; font-size: 1.25rem; }

/* MODULES */
.modules-list { display: grid; gap: 16px; }
.module-card {
  background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius);
  padding: 16px 20px; display: flex; justify-content: space-between; align-items: center;
  cursor: pointer; transition: .2s;
}
.module-card:hover { border-color: var(--text-muted); }
.module-card.active {
  border-color: var(--primary); background: rgba(99,102,241,0.08);
  box-shadow: inset 0 0 0 1px var(--primary);
}
.mc-left { display: flex; gap: 15px; align-items: center; }
.checkbox {
  width: 22px; height: 22px; border-radius: 50%; border: 2px solid var(--border);
  flex-shrink: 0; transition: .2s;
}
.checkbox.checked { background: var(--primary); border-color: var(--primary); box-shadow: inset 0 0 0 3px var(--bg-card); }
.mc-tag {
  font-size: 0.7rem; text-transform: uppercase; font-weight: 700;
  color: var(--primary); background: rgba(99,102,241,0.15);
  padding: 2px 8px; border-radius: 4px; display: inline-block; margin-top: 4px;
}
.mc-right ul { margin: 0; padding-left: 0; list-style: none; text-align: right; font-size: 0.85rem; color: var(--text-muted); }

/* PLANS (Horizontal Scroll Fix) */
.plans-container-wrapper {
  width: 100%;
  position: relative;
  overflow: hidden; /* Mantiene el scroll dentro del contenedor */
}
.hscroll-wrapper { display: flex; align-items: center; position: relative; width: 100%; }
.hscroll-content {
  display: flex; gap: 16px; overflow-x: auto; padding: 10px 4px 20px;
  scroll-snap-type: x mandatory; width: 100%; scrollbar-width: none;
}
.hscroll-content::-webkit-scrollbar { display: none; }
.hscroll-nav {
  position: absolute; z-index: 10; width: 36px; height: 36px; border-radius: 50%;
  background: var(--bg-card); border: 1px solid var(--border); color: var(--text-main);
  display: flex; align-items: center; justify-content: center; cursor: pointer;
  box-shadow: 0 4px 10px rgba(0,0,0,0.5);
}
.hscroll-nav.prev { left: 0; }
.hscroll-nav.next { right: 0; }

.plan-card {
  min-width: 280px; scroll-snap-align: center;
  background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius);
  padding: 24px; display: flex; flex-direction: column; cursor: pointer; transition: .2s;
  position: relative;
}
.plan-card.active { border-color: var(--gold); background: #161b28; box-shadow: 0 0 0 1px var(--gold); }
.plan-badge {
  position: absolute; top: 12px; right: 12px; background: var(--gold); color: black;
  font-size: 0.7rem; font-weight: 800; padding: 2px 8px; border-radius: 4px; text-transform: uppercase;
}
.plan-name { font-size: 1.1rem; font-weight: 700; margin-bottom: 8px; }
.plan-price { font-size: 1.7rem; font-weight: 800; color: var(--text-main); }
.plan-price .curr { font-size: 1rem; }
.plan-price .per { font-size: 0.8rem; color: var(--text-muted); font-weight: 400; }
.plan-desc { font-size: 0.8rem; color: var(--accent); margin: 10px 0 20px; }
.plan-radio { width: 20px; height: 20px; border: 2px solid var(--border); border-radius: 50%; margin-top: auto; }
.plan-radio.on { background: var(--gold); border-color: var(--gold); }

/* --- EXTRAS & 1:1 CONSOLIDADO --- */
.extras-list { display: flex; flex-direction: column; gap: 20px; }
.extra-item {
  background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius);
  padding: 20px; cursor: pointer; transition: .2s;
}
.extra-item:not(.consolidated):hover { border-color: var(--text-muted); }
.extra-item:not(.consolidated).active { border-color: var(--primary); background: rgba(99,102,241,0.05); }

/* Cabecera común extra */
.ex-head { display: flex; gap: 16px; align-items: flex-start; margin-bottom: 12px; }
.ex-icon { font-size: 1.8rem; }
.ex-info h4 { margin: 0 0 4px; font-size: 1rem; }
.ex-info p { margin: 0; font-size: 0.85rem; color: var(--text-muted); }

/* Fila de acción para tarjeta simple */
.ex-action-row { display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border); padding-top: 12px; margin-top: 5px; }
.ex-price { font-weight: 700; color: var(--primary); }

/* GRID PARA 1:1 CONSOLIDADO */
.extra-item.consolidated { cursor: default; }
.extra-item.consolidated.active { border-color: var(--gold); background: rgba(245, 158, 11, 0.05); }

.o2o-options-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 10px;
  margin-top: 15px;
}

.o2o-btn {
  background: var(--bg-body);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 12px 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  transition: all 0.2s ease;
  position: relative;
}

.o2o-btn:hover { border-color: var(--text-muted); transform: translateY(-2px); }

.o2o-btn.selected {
  background: var(--gold);
  border-color: var(--gold);
  color: black;
  box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3);
}

.o2o-title { font-weight: 700; font-size: 0.9rem; text-align: center; }
.o2o-price { font-size: 0.8rem; font-weight: 600; opacity: 0.8; }
.o2o-check { 
    position: absolute; top: -6px; right: -6px; 
    background: black; color: var(--gold); 
    border-radius: 50%; width: 18px; height: 18px; 
    font-size: 10px; display: flex; align-items: center; justify-content: center;
    border: 2px solid var(--gold);
}

/* --- SIDEBAR RESUMEN --- */
.builder-sidebar { position: sticky; top: 20px; height: fit-content; }
.summary-card { padding: 30px; border-radius: 24px; }
.summary-card h3 { margin: 0 0 20px; font-size: 1.25rem; border-bottom: 1px solid var(--border); padding-bottom: 15px; }

.sum-row { display: flex; justify-content: space-between; margin-bottom: 12px; font-size: 0.9rem; color: var(--text-muted); }
.sum-row strong { color: var(--text-main); }
.sum-row.highlight { color: var(--gold); }
.sum-row.highlight strong { color: var(--gold); }

.sum-divider { height: 1px; background: var(--border); margin: 20px 0; }

.sum-total { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
.big-price { font-size: 1.8rem; font-weight: 800; color: var(--text-main); }

.sum-first {
  background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.2);
  padding: 12px; border-radius: 12px; text-align: center; margin-bottom: 24px;
}
.sum-first span { display: block; font-size: 0.8rem; color: var(--text-muted); }
.sum-first strong { display: block; font-size: 1.4rem; color: var(--accent); margin: 4px 0; }
.sum-first small { font-size: 0.7rem; opacity: 0.8; }

.btn-block { width: 100%; text-align: center; padding: 16px; margin-bottom: 15px; }
.secure-text { font-size: 0.75rem; text-align: center; color: var(--text-muted); opacity: 0.7; margin: 0; }

/* --- STICKY MOBILE BAR --- */
.sticky-mobile {
  position: fixed; bottom: 0; left: 0; width: 100%; z-index: 100;
  padding: 16px 24px; border-top: 1px solid var(--border);
  display: flex; justify-content: space-between; align-items: center;
  background: rgba(2, 6, 23, 0.95); backdrop-filter: blur(10px);
}
.sm-info { display: flex; flex-direction: column; }
.sm-label { font-size: 0.7rem; text-transform: uppercase; color: var(--text-muted); }
.sm-price { font-size: 1.4rem; font-weight: 800; color: var(--text-main); }

/* --- RESPONSIVE MEDIA QUERIES --- */
@media (min-width: 961px) {
  .sticky-mobile { display: none; }
}

@media (max-width: 960px) {
  .hero__grid { grid-template-columns: 1fr; text-align: center; gap: 40px; }
  .hero-lead { margin-left: auto; margin-right: auto; }
  .hero-stats { justify-content: center; border-left: none; padding-left: 0; margin-top: 30px; }
  .hero-cta-group { justify-content: center; }
  
  .image-frame { max-width: 500px; margin: 0 auto; transform: none; }
  
  .builder-grid { grid-template-columns: 1fr; }
  .builder-sidebar { display: none; } /* Ocultamos sidebar en móvil */
  
  .church-banner { flex-direction: column; text-align: center; gap: 20px; }
  
  /* Ajuste Módulos en Móvil */
  .module-card { flex-direction: column; align-items: flex-start; gap: 15px; }
  .mc-right { width: 100%; }
  .mc-right ul { text-align: left; padding-left: 20px; list-style: disc; }
  
  /* Ajuste 1:1 en móvil */
  .o2o-options-grid { grid-template-columns: repeat(2, 1fr); }
}

@keyframes pulse {
  0% { box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.7); }
  70% { box-shadow: 0 0 0 10px rgba(99, 102, 241, 0); }
  100% { box-shadow: 0 0 0 0 rgba(99, 102, 241, 0); }
}
`;