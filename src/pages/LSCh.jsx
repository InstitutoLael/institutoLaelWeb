import { useMemo, useRef, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  LSCH_ENROLLMENT_FEE,
  LSCH_MODULES,
  LSCH_GROUP_PLANS,
  LSCH_ONE2ONE_PLANS,
  CORPORATE_WHY, // Asegúrate de haber agregado esto en tu data/lsch.js como te pasé antes
  priceForGroupPlan,
  clp,
} from "../data/lsch.js";
import senasImg from "../assets/img/lael/senas.jpg"; 

const CERTIFICATE_FEE = 19990;

/* ──────────────────────────────────────────────────────────────────────────
   1. CSS - ESTILO "KINESTHETIC NEON" (PREMIUM)
   ────────────────────────────────────────────────────────────────────────── */
const css = `
:root {
  /* Paleta "Bio-Tech": Turquesa Eléctrico sobre Negro Profundo */
  --bg-deep: #02040a;       /* Negro casi puro */
  --bg-panel: #0f1419;      /* Gris azulado muy oscuro */
  --bg-card: #161b22;       /* Tarjetas */
  
  --primary: #14b8a6;       /* Teal 500 (Color Principal) */
  --primary-glow: rgba(20, 184, 166, 0.5);
  --accent: #06b6d4;        /* Cyan 500 (Secundario) */
  --accent-glow: rgba(6, 182, 212, 0.4);
  --gold: #fbbf24;          /* Amber 400 (Destacados) */
  
  --text-main: #f0f9ff;
  --text-muted: #94a3b8;
  
  --glass: rgba(22, 27, 34, 0.6);
  --border: rgba(20, 184, 166, 0.15); /* Bordes sutiles turquesa */
  --border-hover: rgba(20, 184, 166, 0.4);
  
  --radius-lg: 24px;
  --radius-md: 16px;
  --font-sans: 'Inter', system-ui, sans-serif;
  --nav-clearance: 100px;
}

/* Base */
.lsch-page {
  background-color: var(--bg-deep);
  color: var(--text-main);
  font-family: var(--font-sans);
  min-height: 100vh;
  padding-bottom: var(--nav-clearance);
  overflow-x: hidden;
  position: relative;
}

.container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
button { cursor: pointer; border: none; font-family: inherit; -webkit-tap-highlight-color: transparent; }
a { text-decoration: none; color: inherit; }

/* Luces Ambientales */
.ambient-light {
  position: absolute; border-radius: 50%; filter: blur(140px);
  opacity: 0.12; pointer-events: none; z-index: 0;
}
.light-teal { width: 600px; height: 600px; top: -200px; right: -100px; background: var(--primary); }
.light-cyan { width: 500px; height: 500px; top: 40%; left: -200px; background: var(--accent); opacity: 0.08; }

/* --- HERO SECTION --- */
.hero-header { padding: 120px 0 80px; position: relative; z-index: 1; }
.hero-grid { display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 60px; align-items: center; }

.pill-status {
  display: inline-flex; align-items: center; gap: 8px;
  background: rgba(20, 184, 166, 0.1); border: 1px solid rgba(20, 184, 166, 0.3);
  color: var(--primary); padding: 8px 16px; border-radius: 50px;
  font-size: 0.85rem; font-weight: 700; text-transform: uppercase; margin-bottom: 24px; letter-spacing: 1px;
}
.pill-status::before { content: ''; width: 8px; height: 8px; background: var(--primary); border-radius: 50%; box-shadow: 0 0 10px var(--primary); }

.hero-title { font-size: clamp(3rem, 6vw, 4.5rem); line-height: 1.05; font-weight: 800; margin-bottom: 24px; letter-spacing: -0.02em; }
.text-gradient {
  background: linear-gradient(135deg, #fff 20%, var(--primary) 100%);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
}

.hero-subtitle { font-size: 1.2rem; color: var(--text-muted); line-height: 1.6; max-width: 550px; margin-bottom: 40px; }

.hero-metrics {
  display: flex; gap: 30px; margin-bottom: 40px; border-left: 2px solid var(--border); padding-left: 24px;
}
.metric .val { display: block; font-size: 1.8rem; font-weight: 800; color: white; line-height: 1; }
.metric .lbl { font-size: 0.8rem; color: var(--accent); text-transform: uppercase; font-weight: 600; letter-spacing: 0.5px; }

.btn-primary-lg {
  background: var(--primary); color: #000; 
  padding: 16px 36px; border-radius: 50px; font-weight: 800; font-size: 1.1rem;
  box-shadow: 0 0 25px rgba(20, 184, 166, 0.4); transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  display: inline-flex; align-items: center; gap: 10px;
}
.btn-primary-lg:hover { transform: translateY(-4px) scale(1.02); box-shadow: 0 0 40px rgba(20, 184, 166, 0.6); background: #2dd4bf; }

/* Hero Visual (Kinetic Frame) */
.hero-visual { position: relative; display: flex; justify-content: center; }
.kinetic-frame {
  position: relative; border-radius: 30px; padding: 10px;
  background: linear-gradient(135deg, rgba(20,184,166,0.2), transparent 50%);
  border: 1px solid var(--border); box-shadow: 0 30px 60px -20px rgba(0,0,0,0.8);
}
.kinetic-frame img { display: block; width: 100%; border-radius: 20px; filter: grayscale(0.2) contrast(1.1); }
.floating-badge {
  position: absolute; bottom: 30px; right: -20px;
  background: rgba(15, 20, 25, 0.9); backdrop-filter: blur(12px);
  border: 1px solid var(--primary); padding: 16px 24px; border-radius: 16px;
  display: flex; align-items: center; gap: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);
  animation: float 6s ease-in-out infinite;
}
@keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
.floating-badge .icon { font-size: 2rem; }
.floating-badge strong { display: block; color: white; font-size: 1rem; }
.floating-badge small { color: var(--primary); font-size: 0.8rem; text-transform: uppercase; font-weight: 700; }

@media (max-width: 968px) {
  .hero-grid { grid-template-columns: 1fr; text-align: center; }
  .hero-subtitle, .hero-metrics { margin-left: auto; margin-right: auto; }
  .hero-metrics { justify-content: center; border-left: none; border-top: 1px solid var(--border); padding-top: 20px; padding-left: 0; }
  .hero-visual { margin-top: 40px; }
  .floating-badge { right: 50%; transform: translateX(50%); bottom: -20px; width: max-content; }
}

/* --- CORPORATE STRIP --- */
.corp-strip { 
    border-block: 1px solid var(--border); background: rgba(20, 184, 166, 0.03); 
    padding: 30px 0; margin-bottom: 60px;
}
.corp-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 30px; }
.corp-item { display: flex; gap: 15px; align-items: flex-start; }
.c-icon { 
    background: rgba(6, 182, 212, 0.1); color: var(--accent); width: 40px; height: 40px; 
    border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; flex-shrink: 0;
}
.c-text h4 { margin: 0 0 4px; font-size: 1rem; color: white; }
.c-text p { margin: 0; font-size: 0.85rem; color: var(--text-muted); }


/* --- CONFIGURATOR SECTION --- */
.config-section { position: relative; z-index: 2; padding-bottom: 80px; }
.interface-grid { display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 50px; align-items: start; }
@media (max-width: 900px) { .interface-grid { grid-template-columns: 1fr; } }

/* Panel Styling */
.panel-step { margin-bottom: 60px; }
.step-header { display: flex; align-items: center; gap: 12px; margin-bottom: 24px; }
.step-num { 
    background: var(--primary); color: #000; width: 28px; height: 28px; border-radius: 50%; 
    display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 0.9rem;
}
.step-header h3 { font-size: 1.4rem; margin: 0; }

/* 1. Identity Switch */
.identity-switch {
    background: var(--bg-panel); border: 1px solid var(--border); border-radius: 20px; padding: 24px;
    display: flex; justify-content: space-between; align-items: center; cursor: pointer; transition: 0.3s;
}
.identity-switch:hover { border-color: var(--primary); }
.identity-switch.active { background: linear-gradient(to right, rgba(20, 184, 166, 0.1), var(--bg-panel)); border-color: var(--primary); }
.id-content { display: flex; gap: 15px; align-items: center; }
.id-icon { font-size: 2rem; }
.id-info h4 { margin: 0 0 5px; font-size: 1.1rem; }
.id-info p { margin: 0; font-size: 0.9rem; color: var(--text-muted); }
.toggle-track { width: 50px; height: 28px; background: #333; border-radius: 50px; position: relative; transition: 0.3s; }
.toggle-thumb { width: 24px; height: 24px; background: white; border-radius: 50%; position: absolute; top: 2px; left: 2px; transition: 0.3s; }
.identity-switch.active .toggle-track { background: var(--primary); }
.identity-switch.active .toggle-thumb { transform: translateX(22px); }

/* 2. Timeline Modules */
.timeline-list { position: relative; padding-left: 30px; border-left: 2px solid rgba(255,255,255,0.1); margin-left: 10px; }
.timeline-item { position: relative; margin-bottom: 24px; cursor: pointer; }
.timeline-dot {
    position: absolute; left: -39px; top: 0; width: 16px; height: 16px; 
    background: var(--bg-deep); border: 2px solid var(--text-muted); border-radius: 50%; transition: 0.3s;
}
.timeline-card {
    background: var(--bg-panel); border: 1px solid var(--border); padding: 20px; border-radius: 16px;
    transition: 0.3s; position: relative; overflow: hidden;
}
.timeline-item:hover .timeline-card { border-color: var(--primary); transform: translateX(5px); }
.timeline-item.selected .timeline-dot { background: var(--primary); border-color: var(--primary); box-shadow: 0 0 15px var(--primary); }
.timeline-item.selected .timeline-card { 
    background: linear-gradient(90deg, rgba(20, 184, 166, 0.1), var(--bg-panel)); 
    border-color: var(--primary); 
}
.mod-header { display: flex; justify-content: space-between; margin-bottom: 8px; }
.mod-tag { font-size: 0.75rem; font-weight: 700; color: var(--accent); text-transform: uppercase; }
.check-icon { color: var(--primary); font-weight: 800; opacity: 0; transform: scale(0); transition: 0.3s; }
.timeline-item.selected .check-icon { opacity: 1; transform: scale(1); }

/* 3. Plans Grid */
.plans-stack { display: flex; flex-direction: column; gap: 15px; }
.plan-card {
    display: grid; grid-template-columns: auto 1fr auto; gap: 20px; align-items: center;
    background: var(--bg-panel); border: 1px solid var(--border); padding: 20px 24px; border-radius: 16px;
    cursor: pointer; transition: 0.3s; position: relative;
}
.plan-card:hover { border-color: var(--primary); }
.plan-card.selected { 
    border-color: var(--primary); background: rgba(20, 184, 166, 0.05); 
    box-shadow: 0 0 0 1px var(--primary); 
}
.radio-outer { width: 22px; height: 22px; border: 2px solid var(--text-muted); border-radius: 50%; display: flex; align-items: center; justify-content: center; transition: 0.3s; }
.radio-inner { width: 12px; height: 12px; background: var(--primary); border-radius: 50%; transform: scale(0); transition: 0.3s; }
.plan-card.selected .radio-outer { border-color: var(--primary); }
.plan-card.selected .radio-inner { transform: scale(1); }

.plan-details strong { font-size: 1.1rem; display: block; }
.plan-details span { font-size: 0.85rem; color: var(--text-muted); }
.plan-price { text-align: right; }
.plan-price .amount { display: block; font-size: 1.25rem; font-weight: 800; color: white; }
.plan-price small { font-size: 0.8rem; color: var(--text-muted); }
.plan-badge { 
    position: absolute; top: -10px; right: 20px; background: var(--gold); color: black; 
    font-size: 0.7rem; font-weight: 800; padding: 3px 8px; border-radius: 4px; text-transform: uppercase;
}

/* 4. Boosters */
.booster-row { 
    display: flex; justify-content: space-between; align-items: center;
    background: var(--bg-panel); border: 1px solid var(--border); padding: 16px 20px; border-radius: 16px;
    margin-bottom: 15px; cursor: pointer; transition: 0.3s;
}
.booster-row:hover { border-color: var(--primary); }
.booster-row.active { border-color: var(--primary); background: rgba(20, 184, 166, 0.1); }
.b-left { display: flex; gap: 15px; align-items: center; }
.b-icon { font-size: 1.5rem; }
.b-info h5 { margin: 0; font-size: 1rem; }
.b-info p { margin: 0; font-size: 0.8rem; color: var(--text-muted); }
.b-right { font-weight: 700; color: var(--primary); }

.one2one-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
.one-btn {
    background: var(--bg-card); border: 1px solid var(--border); padding: 12px; border-radius: 12px;
    text-align: center; transition: 0.3s;
}
.one-btn:hover { border-color: var(--text-muted); }
.one-btn.active { background: var(--accent); border-color: var(--accent); color: #000; }
.one-btn span { display: block; font-size: 0.8rem; font-weight: 700; }
.one-btn small { font-size: 0.75rem; }

/* --- RIGHT PANEL (SUMMARY) --- */
.summary-sticky { position: sticky; top: 40px; }
@media (max-width: 900px) { .summary-sticky { display: none; } }

.receipt-card {
    background: var(--bg-panel); border: 1px solid var(--border); border-radius: 24px; padding: 30px;
    box-shadow: 0 20px 40px -10px rgba(0,0,0,0.5); backdrop-filter: blur(10px);
}
.receipt-header { display: flex; justify-content: space-between; margin-bottom: 20px; padding-bottom: 15px; border-bottom: 1px solid var(--border); }
.receipt-header h3 { margin: 0; font-size: 1.2rem; }
.lock-icon { font-size: 0.8rem; color: var(--primary); border: 1px solid var(--primary); padding: 4px 8px; border-radius: 4px; }

.line-item { display: flex; justify-content: space-between; margin-bottom: 12px; font-size: 0.95rem; color: var(--text-muted); }
.line-item strong { color: white; }
.line-item.total { margin-top: 20px; padding-top: 20px; border-top: 1px dashed var(--border); color: white; font-size: 1.1rem; }
.line-item.total .big { font-size: 1.8rem; font-weight: 800; color: var(--primary); }

.payment-box { 
    background: rgba(20, 184, 166, 0.05); border: 1px solid var(--border); 
    padding: 15px; border-radius: 12px; margin: 25px 0; text-align: center; 
}
.payment-box span { font-size: 0.85rem; color: var(--accent); text-transform: uppercase; font-weight: 700; }
.payment-box strong { display: block; font-size: 1.4rem; color: white; margin-top: 5px; }

.btn-checkout {
    display: flex; justify-content: center; align-items: center; width: 100%;
    background: var(--primary); color: #000; font-weight: 800; font-size: 1.1rem;
    padding: 16px; border-radius: 12px; transition: 0.3s;
    box-shadow: 0 5px 20px rgba(20, 184, 166, 0.3);
}
.btn-checkout:hover { transform: translateY(-2px); box-shadow: 0 10px 30px rgba(20, 184, 166, 0.5); }
.disclaimer { font-size: 0.75rem; color: var(--text-muted); text-align: center; margin-top: 15px; line-height: 1.4; }

/* --- MOBILE BAR --- */
.mobile-bar {
    position: fixed; bottom: 0; left: 0; width: 100%; z-index: 100;
    background: rgba(15, 20, 25, 0.95); backdrop-filter: blur(20px);
    border-top: 1px solid var(--border); padding: 15px 20px;
    display: flex; justify-content: space-between; align-items: center;
}
@media (min-width: 901px) { .mobile-bar { display: none; } }
.mb-info small { color: var(--text-muted); font-size: 0.75rem; text-transform: uppercase; display: block; }
.mb-info strong { color: white; font-size: 1.3rem; font-weight: 800; }
.btn-mobile { background: var(--primary); color: #000; font-weight: 800; padding: 10px 24px; border-radius: 50px; font-size: 0.9rem; }
`;

/* ──────────────────────────────────────────────────────────────────────────
   2. COMPONENTE SEO
   ────────────────────────────────────────────────────────────────────────── */
function SEOHead({ title, description }) {
  useEffect(() => {
    document.title = title;
    // Simple meta update logic
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', 'description');
        document.head.appendChild(meta);
    }
    meta.setAttribute('content', description);
  }, [title, description]);
  return null;
}

/* ──────────────────────────────────────────────────────────────────────────
   3. COMPONENTE PRINCIPAL (LSCH)
   ────────────────────────────────────────────────────────────────────────── */
export default function LSCh() {
  // --- STATE ---
  const [church, setChurch] = useState(false);
  const [selectedGroupId, setSelectedGroupId] = useState("g-quarter"); // Default to sweet spot
  const [selectedOneId, setSelectedOneId] = useState(null);
  const [selectedModules, setSelectedModules] = useState(["nivel-1"]); // Default 1st module
  const [certSelected, setCertSelected] = useState(false);
  
  const pricingRef = useRef(null);
  const location = useLocation();

  useEffect(() => { window.scrollTo(0, 0); }, [location.pathname]);

  // --- LOGIC ---
  const groupPlan = useMemo(() => LSCH_GROUP_PLANS.find(p => p.id === selectedGroupId) || LSCH_GROUP_PLANS[0], [selectedGroupId]);
  const onePlan = useMemo(() => LSCH_ONE2ONE_PLANS.find(p => p.id === selectedOneId), [selectedOneId]);
  
  const monthlyGroup = priceForGroupPlan(groupPlan, { church });
  const monthlyOne = onePlan?.monthly || 0;
  
  const totalMonthly = monthlyGroup + monthlyOne;
  const totalFirstPayment = totalMonthly + LSCH_ENROLLMENT_FEE + (certSelected ? CERTIFICATE_FEE : 0);

  // Toggle Logic
  const toggleModule = (id) => {
    setSelectedModules(prev => {
      // Prevent unselecting if it's the only one (optional rule, nice for UX)
      if (prev.includes(id) && prev.length === 1) return prev; 
      return prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id];
    });
  };

  // WhatsApp Link
  const waLink = useMemo(() => {
    const text = `Hola 👋, quiero inscribirme en el Curso Profesional de LSCh.
📋 *Mi Configuración:*
• Perfil: ${church ? 'Convenio Iglesia ✅' : 'Estudiante General'}
• Plan Base: ${groupPlan.title}
• Módulos: ${selectedModules.length} seleccionados
${onePlan ? `• Refuerzo 1:1: ${onePlan.title}` : ''}
${certSelected ? `• Certificación: SÍ` : ''}

💰 *Totales:*
• Mensualidad: ${clp(totalMonthly)}
• Primer Pago: ${clp(totalFirstPayment)} (Matrícula incl.)

¿Me envían los datos de transferencia?`;
    return `https://wa.me/56964626568?text=${encodeURIComponent(text)}`;
  }, [church, groupPlan, selectedModules, onePlan, certSelected, totalMonthly, totalFirstPayment]);

  return (
    <div className="lsch-page">
      <SEOHead title="Curso Profesional de Lengua de Señas | Instituto Lael" description="Fórmate con docentes sordas nativas. Metodología visual, kinestésica y práctica. Certificación válida para CV." />
      <style>{css}</style>

      {/* AMBIENT LIGHTS */}
      <div className="ambient-light light-teal" />
      <div className="ambient-light light-cyan" />

      {/* --- HERO HEADER --- */}
      <header className="hero-header">
        <div className="container hero-grid">
            <div className="hero-content">
                <div className="pill-status">Inscripciones 2025 Abiertas</div>
                <h1 className="hero-title">
                    Domina el Silencio. <br/>
                    <span className="text-gradient">Conecta sin límites.</span>
                </h1>
                <p className="hero-subtitle">
                    El programa de LSCh más completo del país. Fórmate con docentes sordas nativas en una inmersión visual total.
                    <strong> Certificación profesional y validez curricular.</strong>
                </p>
                
                <div className="hero-metrics">
                    <div className="metric">
                        <span className="val">100%</span>
                        <span className="lbl">En Vivo</span>
                    </div>
                    <div className="metric">
                        <span className="val">A1-B1</span>
                        <span className="lbl">Niveles</span>
                    </div>
                    <div className="metric">
                        <span className="val">24/7</span>
                        <span className="lbl">Plataforma</span>
                    </div>
                </div>

                <button onClick={() => pricingRef.current?.scrollIntoView({behavior:'smooth'})} className="btn-primary-lg">
                    <span>Ver Planes y Horarios</span>
                    <span style={{fontSize:'1.5rem'}}>↓</span>
                </button>
            </div>

            <div className="hero-visual">
                <div className="kinetic-frame">
                    <img src={senasImg} alt="Clase LSCh Inmersiva" />
                    <div className="floating-badge">
                        <div className="icon">🤟</div>
                        <div>
                            <strong>Docentes Nativas</strong>
                            <small>Cultura Sorda Real</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </header>

      {/* --- CORPORATE STRIP (Authority) --- */}
      {CORPORATE_WHY && (
        <div className="corp-strip">
            <div className="container corp-grid">
                {CORPORATE_WHY.map((item, i) => (
                    <div className="corp-item" key={i}>
                        <div className="c-icon">{i === 0 ? '⚖️' : i === 1 ? '🤝' : '💼'}</div>
                        <div className="c-text">
                            <h4>{item.title}</h4>
                            <p>{item.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      )}

      {/* --- CONFIGURATOR (The Core) --- */}
      <section ref={pricingRef} className="config-section">
        <div className="container interface-grid">
            
            {/* LEFT CONFIGURATOR */}
            <div className="config-panel">
                
                {/* STEP 1: IDENTITY */}
                <div className="panel-step">
                    <div className="step-header">
                        <div className="step-num">1</div>
                        <h3>Tu Perfil de Estudiante</h3>
                    </div>
                    <div className={`identity-switch ${church ? 'active' : ''}`} onClick={() => setChurch(!church)}>
                        <div className="id-content">
                            <div className="id-icon">{church ? '⛪' : '🎓'}</div>
                            <div className="id-info">
                                <h4>{church ? 'Convenio Iglesia / Ministerio' : 'Estudiante General'}</h4>
                                <p>{church ? 'Tarifas preferenciales activadas.' : 'Acceso al programa completo certificado.'}</p>
                            </div>
                        </div>
                        <div className="toggle-track">
                            <div className="toggle-thumb"></div>
                        </div>
                    </div>
                </div>

                {/* STEP 2: MODULES (TIMELINE) */}
                <div className="panel-step">
                    <div className="step-header">
                        <div className="step-num">2</div>
                        <h3>Selecciona tus Módulos</h3>
                    </div>
                    <div className="timeline-list">
                        {LSCH_MODULES.map(m => {
                            const active = selectedModules.includes(m.id);
                            return (
                                <div key={m.id} className={`timeline-item ${active ? 'selected' : ''}`} onClick={() => toggleModule(m.id)}>
                                    <div className="timeline-dot"></div>
                                    <div className="timeline-card">
                                        <div className="mod-header">
                                            <span className="mod-tag">{m.tag}</span>
                                            <span className="check-icon">✓</span>
                                        </div>
                                        <h4 style={{margin:'0 0 5px', fontSize:'1.1rem'}}>{m.name}</h4>
                                        <p style={{margin:0, fontSize:'0.9rem', color:'var(--text-muted)'}}>{m.summary}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* STEP 3: PLAN FREQUENCY */}
                <div className="panel-step">
                    <div className="step-header">
                        <div className="step-num">3</div>
                        <h3>Elige tu Plan de Pago</h3>
                    </div>
                    <div className="plans-stack">
                        {LSCH_GROUP_PLANS.map(p => {
                            const isSelected = selectedGroupId === p.id;
                            const price = priceForGroupPlan(p, { church });
                            return (
                                <div key={p.id} className={`plan-card ${isSelected ? 'selected' : ''}`} onClick={() => setSelectedGroupId(p.id)}>
                                    {p.badge && <span className="plan-badge">{p.badge}</span>}
                                    <div className="radio-outer"><div className="radio-inner"></div></div>
                                    <div className="plan-details">
                                        <strong>{p.title}</strong>
                                        <span>{p.desc}</span>
                                    </div>
                                    <div className="plan-price">
                                        <span className="amount">{clp(price)}</span>
                                        <small>/mes</small>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* STEP 4: ADD-ONS */}
                <div className="panel-step">
                    <div className="step-header">
                        <div className="step-num">4</div>
                        <h3>Potencia tu aprendizaje (Opcional)</h3>
                    </div>

                    {/* Certificado */}
                    <div className={`booster-row ${certSelected ? 'active' : ''}`} onClick={() => setCertSelected(!certSelected)}>
                        <div className="b-left">
                            <span className="b-icon">📜</span>
                            <div className="b-info">
                                <h5>Certificación Digital Oficial</h5>
                                <p>Diploma verificable con código QR al aprobar.</p>
                            </div>
                        </div>
                        <div className="b-right">+{clp(CERTIFICATE_FEE)}</div>
                    </div>

                    {/* 1:1 Classes */}
                    <div className="timeline-card" style={{marginTop:'20px'}}>
                        <div className="mod-header" style={{marginBottom:'15px'}}>
                            <strong style={{fontSize:'1rem'}}>💎 Refuerzo Privado 1:1</strong>
                        </div>
                        <div className="one2one-grid">
                            {LSCH_ONE2ONE_PLANS.map(p => {
                                const active = selectedOneId === p.id;
                                return (
                                    <button key={p.id} className={`one-btn ${active ? 'active' : ''}`} onClick={() => setSelectedOneId(active ? null : p.id)}>
                                        <span>{p.title}</span>
                                        <small>+{clp(p.monthly)}/mes</small>
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                </div>

            </div>

            {/* RIGHT SUMMARY (STICKY) */}
            <div className="summary-wrapper">
                <div className="summary-sticky">
                    <div className="receipt-card">
                        <div className="receipt-header">
                            <h3>Resumen de Inscripción</h3>
                            <span className="lock-icon">🔒 Seguro</span>
                        </div>
                        
                        <div className="receipt-body">
                            <div className="line-item">
                                <span>Plan {groupPlan.title}</span>
                                <strong>{clp(monthlyGroup)}/mes</strong>
                            </div>
                            {onePlan && (
                                <div className="line-item" style={{color:'var(--gold)'}}>
                                    <span>Pack 1:1 ({onePlan.title})</span>
                                    <strong>+{clp(monthlyOne)}/mes</strong>
                                </div>
                            )}
                            {certSelected && (
                                <div className="line-item">
                                    <span>Certificación</span>
                                    <strong>{clp(CERTIFICATE_FEE)}</strong>
                                </div>
                            )}
                            
                            <div className="line-item total">
                                <span>Total Mensual</span>
                                <span className="big">{clp(totalMonthly)}</span>
                            </div>

                            <div className="payment-box">
                                <span>Tu Primer Pago Hoy</span>
                                <strong>{clp(totalFirstPayment)}</strong>
                                <small style={{display:'block', fontSize:'0.7rem', color:'var(--text-muted)', marginTop:'5px'}}>
                                    Incluye matrícula única de {clp(LSCH_ENROLLMENT_FEE)}
                                </small>
                            </div>

                            <a href={waLink} target="_blank" rel="noreferrer" className="btn-checkout">
                                Finalizar Inscripción →
                            </a>
                            <p className="disclaimer">
                                Al hacer clic serás redirigido a WhatsApp para coordinar el pago y recibir tus accesos.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
      </section>

      {/* MOBILE BAR */}
      <div className="mobile-bar">
          <div className="mb-info">
              <small>Primer pago hoy</small>
              <strong>{clp(totalFirstPayment)}</strong>
          </div>
          <a href={waLink} target="_blank" rel="noreferrer" className="btn-mobile">
              Inscribirme
          </a>
      </div>

    </div>
  );
}