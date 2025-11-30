// src/pages/LSCh.jsx
import { useMemo, useRef, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  LSCH_ENROLLMENT_FEE,
  LSCH_MODULES,
  LSCH_GROUP_PLANS,
  LSCH_ONE2ONE_PLANS,
  priceForGroupPlan,
  clp,
} from "../data/lsch.js";
import senasImg from "../assets/img/lael/senas.jpg"; 

const CERTIFICATE_FEE = 19990;

/* --- SEO COMPONENT --- */
function SEOHead({ title, description }) {
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
  }, [title, description]);
  return null;
}

/* --- LOGIC CORE --- */
export default function LSCh() {
  // ESTADOS
  const [church, setChurch] = useState(false);
  const [selectedGroupId, setSelectedGroupId] = useState("g-quarter");
  const [selectedOneId, setSelectedOneId] = useState(null);
  const [selectedModules, setSelectedModules] = useState(["lsch-m1"]);
  const [certSelected, setCertSelected] = useState(false);
  const pricingRef = useRef(null);

  // DATA COMPUTADA
  const groupPlan = useMemo(() => LSCH_GROUP_PLANS.find(p => p.id === selectedGroupId) || LSCH_GROUP_PLANS[0], [selectedGroupId]);
  const onePlan = useMemo(() => LSCH_ONE2ONE_PLANS.find(p => p.id === selectedOneId), [selectedOneId]);
  
  const monthlyGroup = priceForGroupPlan(groupPlan, { church });
  const monthlyOne = onePlan?.monthly || 0;
  
  const totalMonthly = monthlyGroup + monthlyOne;
  // Primer pago: Mensualidad + Matrícula + (Certificado si es pago único)
  const totalFirstPayment = totalMonthly + LSCH_ENROLLMENT_FEE + (certSelected ? CERTIFICATE_FEE : 0);

  // MANEJADORES
  const toggleModule = (id) => {
    setSelectedModules(prev => {
      if (prev.includes(id) && prev.length === 1) return prev; 
      return prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id];
    });
  };

  // WHATSAPP GENERATOR
  const waLink = useMemo(() => {
    const text = `Hola 👋, quiero inscribirme en el Curso Profesional de LSCh.
--------------------------------
📋 *Mi Configuración:*
• Perfil: ${church ? 'Convenio Iglesia/Ministerio ✅' : 'Estudiante General'}
• Plan Base: ${groupPlan.title}
• Módulos: ${selectedModules.length} seleccionados
${onePlan ? `• Refuerzo 1:1: ${onePlan.title}` : ''}
${certSelected ? `• Certificación Oficial: Sí` : ''}

💰 *Resumen:*
• Mensualidad: ${clp(totalMonthly)}
• Primer Pago (aprox): ${clp(totalFirstPayment)}
  _(Incluye matrícula)_

¿Me envían el link de pago?`;
    return `https://wa.me/56964626568?text=${encodeURIComponent(text)}`;
  }, [church, groupPlan, selectedModules, onePlan, certSelected, totalMonthly, totalFirstPayment]);

  return (
    <div className="page-wrapper">
      <SEOHead title="Curso Profesional LSCh | Instituto Lael" description="Formación en Lengua de Señas Chilena con docentes sordas." />
      <style>{css}</style>

      {/* --- HERO HEADER --- */}
      <header className="hero-header">
        <div className="container hero-container">
            <div className="hero-content">
                <div className="status-pill">🟢 Inscripciones Abiertas 2025</div>
                <h1 className="hero-title">
                    Lengua de Señas <br/>
                    <span className="gradient-text">Profesional & Humana.</span>
                </h1>
                <p className="hero-subtitle">
                    Fórmate con docentes sordas nativas en un programa diseñado para la comunicación real. 
                    Sin rellenos. Con certificación oficial.
                </p>
                <div className="hero-metrics">
                    <div className="metric">
                        <span className="val">100%</span>
                        <span className="lbl">En Vivo</span>
                    </div>
                    <div className="divider"></div>
                    <div className="metric">
                        <span className="val">24/7</span>
                        <span className="lbl">Acceso Aula</span>
                    </div>
                    <div className="divider"></div>
                    <div className="metric">
                        <span className="val">A1-B2</span>
                        <span className="lbl">Niveles</span>
                    </div>
                </div>
                <button onClick={() => pricingRef.current?.scrollIntoView({behavior:'smooth'})} className="btn-primary-lg">
                    Armar mi Plan
                </button>
            </div>
            <div className="hero-image-wrapper">
                <div className="image-card-pro">
                    <img src={senasImg} alt="Clase LSCh" />
                    <div className="card-badge">
                        <span className="icon">🤟</span>
                        <div>
                            <strong>Docentes Nativas</strong>
                            <small>Inmersión Cultural</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </header>

      {/* --- PRICING INTERFACE (THE CORE) --- */}
      <section ref={pricingRef} className="interface-section">
        <div className="container">
            
            <div className="interface-grid">
                
                {/* LEFT PANEL: CONFIGURATOR */}
                <div className="config-panel">
                    
                    {/* 1. IDENTITY SWITCH */}
                    <div className="panel-block identity-block">
                        <div className="block-head">
                            <span className="step-badge">Paso 1</span>
                            <h3>Tu Perfil de Estudiante</h3>
                        </div>
                        <div className={`identity-toggle ${church ? 'active' : ''}`} onClick={() => setChurch(!church)}>
                            <div className="toggle-content">
                                <div className="icon-box">{church ? '⛪' : '👤'}</div>
                                <div className="text-box">
                                    <h4>{church ? 'Soy de una Iglesia / Ministerio' : 'Estudiante General'}</h4>
                                    <p>{church ? '¡Convenio aplicado! Precios preferenciales activos.' : 'Activa si perteneces a una comunidad cristiana.'}</p>
                                </div>
                            </div>
                            <div className="toggle-switch">
                                <div className="knob"></div>
                            </div>
                        </div>
                    </div>

                    {/* 2. MODULES */}
                    <div className="panel-block">
                        <div className="block-head">
                            <span className="step-badge">Paso 2</span>
                            <h3>Tus Módulos</h3>
                        </div>
                        <div className="modules-grid-pro">
                            {LSCH_MODULES.map(m => {
                                const active = selectedModules.includes(m.id);
                                return (
                                    <div key={m.id} className={`module-item ${active ? 'selected' : ''}`} onClick={() => toggleModule(m.id)}>
                                        <div className="mod-top">
                                            <span className="mod-tag">{m.tag}</span>
                                            <div className="checkbox-ring"></div>
                                        </div>
                                        <h4>{m.name}</h4>
                                        <p>{m.bullets[0]}</p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    {/* 3. PLAN FREQUENCY */}
                    <div className="panel-block">
                        <div className="block-head">
                            <span className="step-badge">Paso 3</span>
                            <h3>Frecuencia de Pago</h3>
                        </div>
                        <div className="plans-list-pro">
                            {LSCH_GROUP_PLANS.map(p => {
                                const active = selectedGroupId === p.id;
                                const price = priceForGroupPlan(p, { church });
                                return (
                                    <div key={p.id} className={`plan-row ${active ? 'selected' : ''}`} onClick={() => setSelectedGroupId(p.id)}>
                                        <div className="radio-circle"></div>
                                        <div className="plan-info">
                                            <strong>{p.title}</strong>
                                            <small>{church ? 'Precio Convenio' : 'Precio Estándar'}</small>
                                        </div>
                                        <div className="plan-cost">
                                            <span>{clp(price)}</span>
                                            <small>/mes</small>
                                        </div>
                                        {p.badge && <span className="plan-badge-mini">{p.badge}</span>}
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    {/* 4. BOOSTERS (1:1 & CERT) */}
                    <div className="panel-block">
                        <div className="block-head">
                            <span className="step-badge">Paso 4</span>
                            <h3>Complementos (Opcional)</h3>
                        </div>
                        
                        {/* Certificado */}
                        <div className={`booster-card ${certSelected ? 'active' : ''}`} onClick={() => setCertSelected(!certSelected)}>
                            <div className="booster-icon">🎓</div>
                            <div className="booster-text">
                                <strong>Certificación Oficial</strong>
                                <p>Diploma digital verificable por módulo aprobado.</p>
                            </div>
                            <div className="booster-price">+{clp(CERTIFICATE_FEE)}</div>
                            <div className="checkbox-square"></div>
                        </div>

                        {/* 1:1 Selector - SOLUCIÓN LIMPIA */}
                        <div className="booster-container">
                            <div className="booster-header">
                                <span className="icon">💎</span>
                                <div>
                                    <strong>Clases Particulares 1:1</strong>
                                    <p>Refuerzo privado con docente sorda.</p>
                                </div>
                            </div>
                            <div className="intensity-grid">
                                {LSCH_ONE2ONE_PLANS.map(p => {
                                    const isActive = selectedOneId === p.id;
                                    return (
                                        <button 
                                            key={p.id} 
                                            className={`intensity-btn ${isActive ? 'active' : ''}`}
                                            onClick={() => setSelectedOneId(isActive ? null : p.id)}
                                        >
                                            <span className="lbl">{p.title}</span>
                                            <span className="prc">+{clp(p.monthly)}</span>
                                        </button>
                                    )
                                })}
                            </div>
                        </div>

                    </div>

                </div>

                {/* RIGHT PANEL: SMART SUMMARY (DESKTOP) */}
                <div className="summary-wrapper">
                    <div className="summary-panel">
                        <div className="sum-header">
                            <h3>Tu Resumen</h3>
                            <div className="secure-badge">🔒 Compra Segura</div>
                        </div>
                        
                        <div className="sum-body">
                            <div className="line-item">
                                <span>Plan {groupPlan.title}</span>
                                <strong>{clp(monthlyGroup)}/mes</strong>
                            </div>
                            {onePlan && (
                                <div className="line-item highlight">
                                    <span>Refuerzo 1:1 ({onePlan.title})</span>
                                    <strong>+{clp(monthlyOne)}/mes</strong>
                                </div>
                            )}
                            {certSelected && (
                                <div className="line-item">
                                    <span>Certificación</span>
                                    <strong>{clp(CERTIFICATE_FEE)}</strong>
                                </div>
                            )}

                            <div className="sum-divider"></div>
                            
                            <div className="total-row">
                                <span>Total Mensual</span>
                                <span className="big-num">{clp(totalMonthly)}</span>
                            </div>

                            <div className="first-payment-box">
                                <div className="fp-row">
                                    <span>Primer pago hoy:</span>
                                    <strong>{clp(totalFirstPayment)}</strong>
                                </div>
                                <small>Incluye matrícula única de {clp(LSCH_ENROLLMENT_FEE)}</small>
                            </div>
                        </div>

                        <div className="sum-footer">
                            <a href={waLink} target="_blank" rel="noreferrer" className="btn-checkout">
                                Inscribirme Ahora
                            </a>
                            <p className="disclaimer">Te redirigiremos a WhatsApp para finalizar la inscripción.</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
      </section>

      {/* --- MOBILE STICKY BAR (APP STYLE) --- */}
      <div className="app-bar">
        <div className="app-bar-info">
            <span className="lbl">Total Mensual</span>
            <div className="prc-group">
                <span className="main-prc">{clp(totalMonthly)}</span>
                <span className="sub-prc">1º pago: {clp(totalFirstPayment)}</span>
            </div>
        </div>
        <a href={waLink} target="_blank" rel="noreferrer" className="btn-app-checkout">
            Inscribirme
        </a>
      </div>

    </div>
  );
}

/* ==========================================================================
   CSS: MODERN SAAS STYLE (DARK & CLEAN)
   ========================================================================== */
const css = `
:root {
  --bg-dark: #09090b;       /* Zinc 950 */
  --bg-panel: #18181b;      /* Zinc 900 */
  --bg-surface: #27272a;    /* Zinc 800 */
  
  --primary: #8b5cf6;       /* Violet 500 */
  --primary-hover: #7c3aed; /* Violet 600 */
  --accent: #10b981;        /* Emerald 500 */
  --gold: #f59e0b;
  
  --text-main: #fafafa;
  --text-soft: #a1a1aa;
  
  --border: rgba(255,255,255,0.08);
  --border-active: rgba(139, 92, 246, 0.5);
  
  --radius: 12px;
  --nav-height: 90px;
}

/* BASE */
.page-wrapper {
  background-color: var(--bg-dark);
  color: var(--text-main);
  font-family: 'Inter', system-ui, sans-serif;
  min-height: 100vh;
  padding-bottom: var(--nav-height);
  overflow-x: hidden;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

button { cursor: pointer; font-family: inherit; border: none; }
a { text-decoration: none; color: inherit; }

/* --- HERO --- */
.hero-header {
  padding: 80px 0 60px;
  background: radial-gradient(circle at 50% -20%, rgba(139, 92, 246, 0.15), transparent 70%);
}
.hero-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
}
@media (max-width: 900px) { .hero-container { grid-template-columns: 1fr; text-align: center; } }

.status-pill {
  display: inline-block;
  background: rgba(16, 185, 129, 0.1); color: var(--accent);
  border: 1px solid rgba(16, 185, 129, 0.2);
  padding: 6px 14px; border-radius: 50px;
  font-size: 0.8rem; font-weight: 700; text-transform: uppercase;
  margin-bottom: 20px;
}

.hero-title {
  font-size: clamp(2.5rem, 5vw, 4rem);
  line-height: 1.1; font-weight: 800;
  margin-bottom: 20px;
}

.gradient-text {
  background: linear-gradient(135deg, #a78bfa 0%, #2dd4bf 100%);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
}

.hero-subtitle {
  font-size: 1.1rem; color: var(--text-soft); line-height: 1.6;
  max-width: 500px; margin-bottom: 30px;
}
@media (max-width: 900px) { .hero-subtitle { margin-left: auto; margin-right: auto; } }

.hero-metrics {
  display: flex; gap: 20px; margin-bottom: 40px;
  border: 1px solid var(--border);
  background: rgba(255,255,255,0.03);
  padding: 15px 25px; border-radius: 16px;
  width: fit-content;
}
@media (max-width: 900px) { .hero-metrics { margin-left: auto; margin-right: auto; } }

.metric { display: flex; flex-direction: column; align-items: center; }
.metric .val { font-weight: 800; font-size: 1.2rem; color: var(--text-main); }
.metric .lbl { font-size: 0.75rem; color: var(--text-soft); text-transform: uppercase; }
.hero-metrics .divider { width: 1px; background: var(--border); height: 40px; }

.btn-primary-lg {
  background: var(--primary); color: white;
  padding: 16px 32px; border-radius: 12px; font-weight: 700; font-size: 1.1rem;
  box-shadow: 0 10px 30px -10px var(--primary);
  transition: .2s;
}
.btn-primary-lg:hover { transform: translateY(-2px); background: var(--primary-hover); }

/* Hero Image */
.hero-image-wrapper { display: flex; justify-content: center; }
.image-card-pro {
  position: relative; border-radius: 24px; overflow: hidden;
  border: 1px solid var(--border); box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5);
  max-width: 500px; width: 100%;
}
.image-card-pro img { width: 100%; display: block; }
.card-badge {
  position: absolute; bottom: 20px; right: 20px;
  background: rgba(9, 9, 11, 0.9); backdrop-filter: blur(10px);
  padding: 12px 20px; border-radius: 16px; border: 1px solid var(--border);
  display: flex; gap: 12px; align-items: center;
}
.card-badge .icon { font-size: 24px; }
.card-badge div { display: flex; flex-direction: column; text-align: left; }
.card-badge strong { font-size: 0.9rem; }
.card-badge small { font-size: 0.75rem; color: var(--accent); }

/* --- INTERFACE --- */
.interface-grid {
  display: grid; grid-template-columns: 1fr 380px; gap: 40px; align-items: start;
}
@media (max-width: 900px) { .interface-grid { grid-template-columns: 1fr; } }

/* Panel Styling */
.panel-block { margin-bottom: 50px; }
.block-head { display: flex; align-items: center; gap: 12px; margin-bottom: 20px; }
.step-badge {
  background: var(--bg-surface); color: var(--text-soft); font-size: 0.75rem; font-weight: 700;
  padding: 4px 8px; border-radius: 6px; text-transform: uppercase; letter-spacing: 0.5px;
}
.block-head h3 { margin: 0; font-size: 1.25rem; }

/* 1. Identity */
.identity-toggle {
  background: var(--bg-panel); border: 1px solid var(--border); border-radius: 16px;
  padding: 24px; cursor: pointer; transition: .2s;
  display: flex; justify-content: space-between; align-items: center;
}
.identity-toggle:hover { border-color: var(--text-soft); }
.identity-toggle.active {
  border-color: var(--accent); background: rgba(16, 185, 129, 0.05);
}
.toggle-content { display: flex; gap: 20px; align-items: center; }
.icon-box {
  width: 48px; height: 48px; background: var(--bg-surface); border-radius: 12px;
  display: flex; align-items: center; justify-content: center; font-size: 24px;
}
.text-box h4 { margin: 0 0 4px; font-size: 1rem; }
.text-box p { margin: 0; font-size: 0.9rem; color: var(--text-soft); }

.toggle-switch {
  width: 52px; height: 30px; background: var(--bg-surface); border-radius: 30px;
  position: relative; transition: .3s;
}
.knob {
  width: 24px; height: 24px; background: white; border-radius: 50%;
  position: absolute; top: 3px; left: 3px; transition: .3s;
}
.identity-toggle.active .toggle-switch { background: var(--accent); }
.identity-toggle.active .knob { transform: translateX(22px); }

/* 2. Modules */
.modules-grid-pro { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px; }
.module-item {
  background: var(--bg-panel); border: 1px solid var(--border); padding: 20px; border-radius: 16px;
  cursor: pointer; transition: .2s; position: relative;
}
.module-item:hover { transform: translateY(-3px); }
.module-item.selected { border-color: var(--primary); background: rgba(139, 92, 246, 0.08); }

.mod-top { display: flex; justify-content: space-between; margin-bottom: 12px; }
.mod-tag { background: var(--bg-surface); font-size: 0.7rem; padding: 4px 8px; border-radius: 6px; font-weight: 700; color: var(--text-soft); }
.checkbox-ring { width: 20px; height: 20px; border: 2px solid var(--border); border-radius: 50%; }
.module-item.selected .checkbox-ring { border-color: var(--primary); background: var(--primary); box-shadow: inset 0 0 0 3px var(--bg-panel); }
.module-item h4 { margin: 0 0 5px; font-size: 1.1rem; }
.module-item p { margin: 0; font-size: 0.85rem; color: var(--text-soft); }

/* 3. Plans */
.plans-list-pro { display: flex; flex-direction: column; gap: 12px; }
.plan-row {
  display: grid; grid-template-columns: 40px 1fr auto; align-items: center;
  background: var(--bg-panel); border: 1px solid var(--border); padding: 20px; border-radius: 16px;
  cursor: pointer; transition: .2s; position: relative;
}
.plan-row:hover { border-color: var(--text-soft); }
.plan-row.selected { border-color: var(--gold); background: rgba(245, 158, 11, 0.05); }

.radio-circle { width: 20px; height: 20px; border: 2px solid var(--border); border-radius: 50%; }
.plan-row.selected .radio-circle { border-color: var(--gold); background: var(--gold); box-shadow: inset 0 0 0 4px var(--bg-panel); }

.plan-info { display: flex; flex-direction: column; }
.plan-info strong { font-size: 1rem; }
.plan-info small { color: var(--text-soft); font-size: 0.8rem; }

.plan-cost { text-align: right; }
.plan-cost span { font-weight: 700; font-size: 1.1rem; color: var(--text-main); }
.plan-cost small { display: block; font-size: 0.75rem; color: var(--text-soft); }

.plan-badge-mini {
  position: absolute; top: -10px; right: 20px;
  background: var(--gold); color: black; font-weight: 800; font-size: 0.7rem;
  padding: 2px 8px; border-radius: 4px; text-transform: uppercase;
}

/* 4. Boosters */
.booster-card {
  display: flex; align-items: center; gap: 16px;
  background: var(--bg-panel); border: 1px solid var(--border); padding: 16px; border-radius: 16px;
  cursor: pointer; transition: .2s; margin-bottom: 20px;
}
.booster-card.active { border-color: var(--primary); background: rgba(139, 92, 246, 0.05); }
.booster-icon { font-size: 24px; }
.booster-text { flex: 1; }
.booster-text strong { display: block; font-size: 0.95rem; }
.booster-text p { margin: 0; font-size: 0.8rem; color: var(--text-soft); }
.booster-price { font-weight: 700; color: var(--primary); font-size: 0.9rem; margin-right: 12px; }
.checkbox-square { width: 20px; height: 20px; border: 2px solid var(--border); border-radius: 6px; }
.booster-card.active .checkbox-square { background: var(--primary); border-color: var(--primary); }

/* 1:1 Clean Booster */
.booster-container {
  background: var(--bg-panel); border: 1px solid var(--border); padding: 20px; border-radius: 16px;
}
.booster-header { display: flex; gap: 12px; margin-bottom: 16px; }
.booster-header .icon { font-size: 24px; }
.booster-header strong { display: block; font-size: 0.95rem; }
.booster-header p { margin: 0; font-size: 0.8rem; color: var(--text-soft); }

.intensity-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
.intensity-btn {
  background: var(--bg-surface); border: 1px solid var(--border); border-radius: 8px;
  padding: 10px; display: flex; flex-direction: column; align-items: center; gap: 4px;
  transition: .2s;
}
.intensity-btn:hover { background: var(--bg-surface); border-color: var(--text-soft); }
.intensity-btn.active { background: var(--gold); border-color: var(--gold); color: black; }
.intensity-btn .lbl { font-size: 0.8rem; font-weight: 700; }
.intensity-btn .prc { font-size: 0.75rem; opacity: 0.9; }

/* --- SUMMARY --- */
.summary-wrapper { position: relative; }
@media (max-width: 900px) { .summary-wrapper { display: none; } } /* Hide on mobile */

.summary-panel {
  position: sticky; top: 20px;
  background: var(--bg-panel); border: 1px solid var(--border); padding: 24px; border-radius: 20px;
}
.sum-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; border-bottom: 1px solid var(--border); padding-bottom: 15px; }
.secure-badge { font-size: 0.75rem; color: var(--accent); background: rgba(16, 185, 129, 0.1); padding: 4px 8px; border-radius: 4px; font-weight: 600; }

.line-item { display: flex; justify-content: space-between; font-size: 0.9rem; margin-bottom: 10px; color: var(--text-soft); }
.line-item strong { color: var(--text-main); }
.line-item.highlight { color: var(--gold); }
.line-item.highlight strong { color: var(--gold); }

.sum-divider { height: 1px; background: var(--border); margin: 20px 0; }

.total-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
.big-num { font-size: 1.6rem; font-weight: 800; color: var(--text-main); }

.first-payment-box {
  background: var(--bg-surface); padding: 16px; border-radius: 12px; margin-bottom: 24px;
  border: 1px solid var(--border);
}
.fp-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px; }
.fp-row strong { font-size: 1.2rem; color: var(--accent); }
.first-payment-box small { font-size: 0.75rem; color: var(--text-soft); display: block; }

.btn-checkout {
  display: flex; justify-content: center; width: 100%;
  background: var(--primary); color: white; padding: 14px; border-radius: 12px; font-weight: 700;
  margin-bottom: 12px; transition: .2s;
}
.btn-checkout:hover { background: var(--primary-hover); }
.disclaimer { font-size: 0.75rem; color: var(--text-soft); text-align: center; margin: 0; }

/* --- APP BAR MOBILE --- */
.app-bar {
  position: fixed; bottom: 0; left: 0; width: 100%; z-index: 100;
  background: rgba(24, 24, 27, 0.95); backdrop-filter: blur(12px);
  border-top: 1px solid var(--border); padding: 16px 20px;
  display: flex; justify-content: space-between; align-items: center;
}
@media (min-width: 901px) { .app-bar { display: none; } }

.app-bar-info { display: flex; flex-direction: column; }
.app-bar-info .lbl { font-size: 0.7rem; text-transform: uppercase; color: var(--text-soft); }
.prc-group { display: flex; flex-direction: column; }
.main-prc { font-size: 1.2rem; font-weight: 800; color: var(--text-main); line-height: 1.2; }
.sub-prc { font-size: 0.75rem; color: var(--accent); }

.btn-app-checkout {
  background: var(--primary); color: white; padding: 12px 24px; border-radius: 50px;
  font-weight: 700; font-size: 0.95rem;
}
`;