import { useMemo, useRef, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
// Importamos la data que acabamos de actualizar
import {
  LSCH_ENROLLMENT_FEE,
  LSCH_MODULES,
  LSCH_GROUP_PLANS,
  LSCH_ONE2ONE_PLANS,
  CORPORATE_WHY,
  priceForGroupPlan,
  clp,
} from "../data/lsch.js";

// IMPORTANTE: Asegúrate que esta imagen existe. Si no, comenta la línea.
import senasImg from "../assets/img/lael/senas.jpg"; 

const CERTIFICATE_FEE = 19990;

/* ──────────────────────────────────────────────────────────────────────────
   1. ICONOS SVG (Para no depender de librerías externas y evitar errores)
   ────────────────────────────────────────────────────────────────────────── */
const Icons = {
  Check: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  Hand: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0"/><path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2"/><path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/></svg>,
  Lock: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
  Briefcase: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>,
  Users: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  Award: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>
};

/* ──────────────────────────────────────────────────────────────────────────
   2. ESTILOS CSS - "TURQUESA NEÓN / KINESTHETIC"
   ────────────────────────────────────────────────────────────────────────── */
const css = `
:root {
  /* Paleta: Turquesa Eléctrico sobre Negro */
  --bg-deep: #02040a;       
  --bg-panel: #0d1216;      
  
  --primary: #14b8a6;       /* Teal 500 */
  --primary-hover: #0d9488;
  --primary-glow: rgba(20, 184, 166, 0.4);
  
  --accent: #06b6d4;        /* Cyan 500 */
  --gold: #f59e0b;          /* Amber */
  
  --text-main: #f0fdfa;
  --text-muted: #94a3b8;
  
  --border: rgba(20, 184, 166, 0.15);
  --glass: rgba(13, 18, 22, 0.7);
  
  --radius: 16px;
  --font-sans: 'Inter', system-ui, sans-serif;
}

/* Base */
.lsch-page {
  background-color: var(--bg-deep);
  color: var(--text-main);
  font-family: var(--font-sans);
  min-height: 100vh;
  padding-bottom: 120px; /* Espacio para barra móvil */
  overflow-x: hidden;
  position: relative;
}

.container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
button { cursor: pointer; border: none; font-family: inherit; -webkit-tap-highlight-color: transparent; }
a { text-decoration: none; color: inherit; transition: 0.2s; }
h1,h2,h3,h4,h5 { margin: 0; font-weight: 800; line-height: 1.1; }

/* Luces Ambientales */
.ambient-glow {
  position: absolute; border-radius: 50%; filter: blur(150px);
  opacity: 0.1; pointer-events: none; z-index: 0;
}
.glow-teal { width: 600px; height: 600px; top: -200px; right: -100px; background: var(--primary); }
.glow-cyan { width: 500px; height: 500px; top: 40%; left: -200px; background: var(--accent); opacity: 0.08; }

/* --- HERO SECTION --- */
.hero { padding: 120px 0 80px; position: relative; z-index: 1; }
.hero-grid { display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 60px; align-items: center; }

.status-badge {
  display: inline-flex; align-items: center; gap: 8px;
  background: rgba(20, 184, 166, 0.1); border: 1px solid rgba(20, 184, 166, 0.3);
  color: var(--primary); padding: 8px 16px; border-radius: 50px;
  font-size: 0.8rem; font-weight: 700; text-transform: uppercase; margin-bottom: 24px; letter-spacing: 1px;
}
.status-badge::before { content: ''; width: 8px; height: 8px; background: var(--primary); border-radius: 50%; box-shadow: 0 0 10px var(--primary); }

.hero-title { font-size: clamp(3rem, 6vw, 4.5rem); margin-bottom: 24px; letter-spacing: -0.02em; }
.text-gradient {
  background: linear-gradient(135deg, #fff 20%, var(--primary) 100%);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
}

.hero-subtitle { font-size: 1.2rem; color: var(--text-muted); line-height: 1.6; max-width: 550px; margin-bottom: 40px; }

.hero-stats {
  display: flex; gap: 30px; margin-bottom: 40px; border-left: 2px solid var(--border); padding-left: 24px;
}
.stat .val { display: block; font-size: 1.8rem; font-weight: 800; color: white; line-height: 1; }
.stat .lbl { font-size: 0.8rem; color: var(--accent); text-transform: uppercase; font-weight: 600; letter-spacing: 0.5px; }

.btn-hero {
  background: var(--primary); color: #000; 
  padding: 16px 36px; border-radius: 50px; font-weight: 800; font-size: 1.1rem;
  box-shadow: 0 0 25px rgba(20, 184, 166, 0.3); transition: all 0.3s ease;
  display: inline-flex; align-items: center; gap: 10px;
}
.btn-hero:hover { transform: translateY(-4px) scale(1.02); box-shadow: 0 0 40px rgba(20, 184, 166, 0.6); background: #2dd4bf; }

/* Visual Hero */
.hero-visual { position: relative; }
.image-frame {
  position: relative; border-radius: 30px; padding: 10px;
  background: linear-gradient(135deg, rgba(20,184,166,0.2), transparent 50%);
  border: 1px solid var(--border); box-shadow: 0 30px 60px -20px rgba(0,0,0,0.8);
}
.image-frame img { display: block; width: 100%; border-radius: 20px; filter: grayscale(0.2) contrast(1.1); }
.float-card {
  position: absolute; bottom: 30px; right: -20px;
  background: rgba(15, 20, 25, 0.95); backdrop-filter: blur(12px);
  border: 1px solid var(--primary); padding: 16px 24px; border-radius: 16px;
  display: flex; align-items: center; gap: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);
  animation: float 6s ease-in-out infinite;
}
@keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }

@media (max-width: 968px) {
  .hero-grid { grid-template-columns: 1fr; text-align: center; }
  .hero-subtitle, .hero-stats { margin-left: auto; margin-right: auto; }
  .hero-stats { justify-content: center; border-left: none; border-top: 1px solid var(--border); padding-top: 20px; padding-left: 0; }
  .hero-visual { margin-top: 40px; }
  .float-card { right: 50%; transform: translateX(50%); bottom: -20px; width: max-content; }
}

/* --- CORPORATE BAR --- */
.corp-bar { border-block: 1px solid var(--border); background: rgba(20, 184, 166, 0.03); padding: 40px 0; margin-bottom: 80px; }
.corp-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 30px; }
.corp-item { display: flex; gap: 15px; align-items: flex-start; }
.c-icon-box { 
    background: rgba(6, 182, 212, 0.1); color: var(--accent); width: 45px; height: 45px; 
    border-radius: 12px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.c-text h4 { margin-bottom: 5px; font-size: 1rem; color: white; }
.c-text p { font-size: 0.9rem; color: var(--text-muted); line-height: 1.5; }


/* --- CONFIGURATOR UI --- */
.config-container { position: relative; z-index: 2; display: grid; grid-template-columns: 1.3fr 0.7fr; gap: 50px; align-items: start; }
@media (max-width: 900px) { .config-container { grid-template-columns: 1fr; } }

.step-card { background: var(--bg-panel); border: 1px solid var(--border); border-radius: 20px; padding: 30px; margin-bottom: 30px; }
.step-title { display: flex; align-items: center; gap: 12px; margin-bottom: 25px; }
.step-num { 
    background: var(--primary); color: #000; width: 28px; height: 28px; border-radius: 50%; 
    display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 0.9rem;
}
.step-title h3 { font-size: 1.3rem; }

/* 1. Identity Switch */
.identity-btn {
    background: #000; border: 1px solid var(--border); border-radius: 16px; padding: 20px;
    display: flex; justify-content: space-between; align-items: center; cursor: pointer; transition: 0.3s;
}
.identity-btn:hover { border-color: var(--primary); }
.identity-btn.active { background: rgba(20, 184, 166, 0.1); border-color: var(--primary); }
.id-content h4 { margin-bottom: 4px; font-size: 1rem; }
.id-content p { font-size: 0.85rem; color: var(--text-muted); margin: 0; }
.toggle-track { width: 44px; height: 24px; background: #333; border-radius: 50px; position: relative; transition: 0.3s; }
.toggle-thumb { width: 20px; height: 20px; background: white; border-radius: 50%; position: absolute; top: 2px; left: 2px; transition: 0.3s; }
.identity-btn.active .toggle-track { background: var(--primary); }
.identity-btn.active .toggle-thumb { transform: translateX(20px); }

/* 2. Timeline Modules */
.timeline { position: relative; padding-left: 20px; border-left: 2px solid rgba(255,255,255,0.1); margin-left: 10px; }
.timeline-item { position: relative; margin-bottom: 15px; cursor: pointer; }
.t-dot {
    position: absolute; left: -27px; top: 20px; width: 12px; height: 12px; 
    background: var(--bg-deep); border: 2px solid var(--text-muted); border-radius: 50%; transition: 0.3s;
}
.t-card {
    background: #050a0e; border: 1px solid var(--border); padding: 20px; border-radius: 12px;
    transition: 0.2s; display: flex; justify-content: space-between; align-items: center;
}
.timeline-item:hover .t-card { border-color: var(--primary); }
.timeline-item.selected .t-dot { background: var(--primary); border-color: var(--primary); box-shadow: 0 0 10px var(--primary); }
.timeline-item.selected .t-card { background: rgba(20, 184, 166, 0.08); border-color: var(--primary); }
.t-tag { font-size: 0.7rem; font-weight: 700; color: var(--accent); text-transform: uppercase; display: block; margin-bottom: 4px; }
.t-check { color: var(--primary); opacity: 0; transform: scale(0); transition: 0.2s; }
.timeline-item.selected .t-check { opacity: 1; transform: scale(1); }

/* 3. Plans */
.plan-item {
    display: flex; justify-content: space-between; align-items: center;
    background: #050a0e; border: 1px solid var(--border); padding: 20px; border-radius: 12px; 
    margin-bottom: 12px; cursor: pointer; transition: 0.2s; position: relative; overflow: hidden;
}
.plan-item:hover { border-color: var(--text-muted); }
.plan-item.selected { border-color: var(--primary); background: rgba(20, 184, 166, 0.05); box-shadow: inset 0 0 0 1px var(--primary); }
.plan-badge { 
    position: absolute; top: 0; right: 0; background: var(--gold); color: black; 
    font-size: 0.65rem; font-weight: 800; padding: 2px 8px; border-bottom-left-radius: 8px;
}
.plan-price { font-size: 1.2rem; font-weight: 800; color: white; }

/* 4. Extras */
.extra-row { 
    display: flex; justify-content: space-between; align-items: center;
    background: #050a0e; border: 1px solid var(--border); padding: 16px; border-radius: 12px;
    cursor: pointer; transition: 0.2s; margin-bottom: 15px;
}
.extra-row.active { border-color: var(--primary); background: rgba(20, 184, 166, 0.1); }
.extra-btn-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
.extra-btn {
    background: var(--bg-deep); border: 1px solid var(--border); padding: 10px; border-radius: 10px;
    text-align: center; font-size: 0.8rem; transition: 0.2s;
}
.extra-btn.active { background: var(--accent); color: black; border-color: var(--accent); font-weight: 700; }

/* --- SUMMARY STICKY --- */
.summary-col { position: relative; }
.sticky-card {
    position: sticky; top: 30px;
    background: var(--bg-panel); border: 1px solid var(--border); border-radius: 20px; padding: 30px;
    box-shadow: 0 20px 50px -10px rgba(0,0,0,0.6); backdrop-filter: blur(10px);
}
@media (max-width: 900px) { .sticky-card { display: none; } } /* Oculto en móvil */

.sum-header { display: flex; justify-content: space-between; padding-bottom: 15px; border-bottom: 1px solid var(--border); margin-bottom: 20px; }
.secure-tag { font-size: 0.8rem; color: var(--primary); display: flex; align-items: center; gap: 5px; }

.sum-row { display: flex; justify-content: space-between; margin-bottom: 12px; font-size: 0.95rem; color: var(--text-muted); }
.sum-row strong { color: white; }
.sum-total { margin-top: 20px; padding-top: 15px; border-top: 1px dashed var(--border); display: flex; justify-content: space-between; align-items: center; }
.big-price { font-size: 1.8rem; font-weight: 800; color: var(--primary); }

.pay-today-box { 
    background: rgba(20, 184, 166, 0.1); border: 1px solid var(--primary); border-radius: 12px;
    padding: 15px; text-align: center; margin: 20px 0;
}
.pay-today-box span { font-size: 0.8rem; text-transform: uppercase; color: var(--primary); font-weight: 700; }
.pay-today-box strong { display: block; font-size: 1.4rem; color: white; margin-top: 5px; }

.btn-checkout {
    display: flex; justify-content: center; width: 100%;
    background: var(--primary); color: #000; padding: 16px; border-radius: 12px; 
    font-weight: 800; font-size: 1.1rem; transition: 0.3s;
}
.btn-checkout:hover { transform: translateY(-2px); box-shadow: 0 10px 30px rgba(20, 184, 166, 0.4); }

/* MOBILE BAR */
.mobile-bar {
    position: fixed; bottom: 0; left: 0; width: 100%; z-index: 100;
    background: rgba(2, 4, 10, 0.95); backdrop-filter: blur(15px);
    border-top: 1px solid var(--border); padding: 15px 20px;
    display: flex; justify-content: space-between; align-items: center;
}
@media (min-width: 901px) { .mobile-bar { display: none; } }
.mb-info small { display: block; color: var(--text-muted); font-size: 0.75rem; text-transform: uppercase; }
.mb-info strong { font-size: 1.3rem; color: white; }
.btn-mb { background: var(--primary); color: #000; font-weight: 800; padding: 10px 24px; border-radius: 50px; font-size: 0.9rem; }
`;

/* ──────────────────────────────────────────────────────────────────────────
   3. COMPONENTE SEO
   ────────────────────────────────────────────────────────────────────────── */
function SEOHead({ title, description }) {
  useEffect(() => {
    document.title = title;
  }, [title]);
  return null;
}

/* ──────────────────────────────────────────────────────────────────────────
   4. COMPONENTE PRINCIPAL (REACT)
   ────────────────────────────────────────────────────────────────────────── */
export default function LSCh() {
  const [church, setChurch] = useState(false);
  const [selectedGroupId, setSelectedGroupId] = useState("g-quarter");
  const [selectedOneId, setSelectedOneId] = useState(null);
  const [selectedModules, setSelectedModules] = useState(["nivel-1"]);
  const [certSelected, setCertSelected] = useState(false);
  
  const pricingRef = useRef(null);
  const location = useLocation();

  useEffect(() => { window.scrollTo(0, 0); }, [location.pathname]);

  // Lógica de cálculo
  const groupPlan = useMemo(() => LSCH_GROUP_PLANS.find(p => p.id === selectedGroupId) || LSCH_GROUP_PLANS[0], [selectedGroupId]);
  const onePlan = useMemo(() => LSCH_ONE2ONE_PLANS.find(p => p.id === selectedOneId), [selectedOneId]);
  
  const monthlyGroup = priceForGroupPlan(groupPlan, { church });
  const monthlyOne = onePlan?.monthly || 0;
  
  const totalMonthly = monthlyGroup + monthlyOne;
  const totalFirstPayment = totalMonthly + LSCH_ENROLLMENT_FEE + (certSelected ? CERTIFICATE_FEE : 0);

  const toggleModule = (id) => {
    setSelectedModules(prev => {
      // Regla de UX: No dejar deseleccionar si es el último (opcional)
      if(prev.includes(id) && prev.length === 1) return prev; 
      return prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id];
    });
  };

  // WhatsApp Generator
  const waLink = useMemo(() => {
    const text = `Hola 👋, vengo de la web. Quiero inscribirme en el Curso Profesional de LSCh.
📋 *Mi Configuración:*
• Perfil: ${church ? 'Convenio Iglesia ✅' : 'Estudiante General'}
• Plan Base: ${groupPlan.title}
• Módulos: ${selectedModules.length} seleccionados
${onePlan ? `• Refuerzo 1:1: ${onePlan.title}` : ''}
${certSelected ? `• Certificación: SÍ` : ''}

💰 *Resumen:*
• Mensualidad: ${clp(totalMonthly)}
• Primer Pago (aprox): ${clp(totalFirstPayment)} (Matrícula incl.)

¿Me envían los datos de transferencia?`;
    return `https://wa.me/56964626568?text=${encodeURIComponent(text)}`;
  }, [church, groupPlan, selectedModules, onePlan, certSelected, totalMonthly, totalFirstPayment]);

  return (
    <div className="lsch-page">
      <SEOHead title="Curso Profesional de LSCh | Instituto Lael" description="Lengua de Señas Chilena con docentes sordas." />
      <style>{css}</style>

      {/* Background Lights */}
      <div className="ambient-glow glow-teal" />
      <div className="ambient-glow glow-cyan" />

      {/* HERO SECTION */}
      <header className="hero">
        <div className="container hero-grid">
            <div className="hero-content">
                <div className="status-badge">Inscripciones 2025 Abiertas</div>
                <h1 className="hero-title">
                    Domina el Silencio. <br/>
                    <span className="text-gradient">Conecta sin Límites.</span>
                </h1>
                <p className="hero-subtitle">
                    Fórmate con docentes sordas nativas en un programa diseñado para la comunicación real.
                    Certificación profesional y validez curricular.
                </p>
                
                <div className="hero-stats">
                    <div className="stat"><span className="val">100%</span><span className="lbl">En Vivo</span></div>
                    <div className="stat"><span className="val">A1-B1</span><span className="lbl">Niveles</span></div>
                    <div className="stat"><span className="val">24/7</span><span className="lbl">Aula Virtual</span></div>
                </div>

                <button onClick={() => pricingRef.current?.scrollIntoView({behavior:'smooth'})} className="btn-hero">
                    Ver Planes y Precios
                </button>
            </div>

            <div className="hero-visual">
                <div className="image-frame">
                    {/* Fallback simple si la imagen no carga */}
                    {senasImg ? <img src={senasImg} alt="Clase LSCh" /> : <div style={{width:'100%', height:'300px', background:'#111'}}></div>}
                    <div className="float-card">
                        <Icons.Hand />
                        <div>
                            <strong style={{color:'white', display:'block', fontSize:'0.9rem'}}>Docentes Nativas</strong>
                            <small style={{color:'var(--primary)', fontSize:'0.7rem', textTransform:'uppercase'}}>Cultura Sorda Real</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </header>

      {/* CORPORATE BAR */}
      <div className="corp-bar">
        <div className="container corp-grid">
            {(CORPORATE_WHY || []).map((item, i) => (
                <div className="corp-item" key={i}>
                    <div className="c-icon-box">
                       {i === 0 ? <Icons.Briefcase/> : i === 1 ? <Icons.Users/> : <Icons.Award/>}
                    </div>
                    <div className="c-text">
                        <h4>{item.title}</h4>
                        <p>{item.desc}</p>
                    </div>
                </div>
            ))}
        </div>
      </div>

      {/* CONFIGURATOR */}
      <section ref={pricingRef} className="config-container container">
        
        <div className="config-panel">
            {/* 1. Identity */}
            <div className="step-card">
                <div className="step-title"><div className="step-num">1</div><h3>Tu Perfil de Estudiante</h3></div>
                <div className={`identity-btn ${church ? 'active' : ''}`} onClick={() => setChurch(!church)}>
                    <div className="id-content">
                        <h4>{church ? '⛪ Convenio Iglesia / Ministerio' : '🎓 Estudiante General'}</h4>
                        <p>{church ? 'Tarifas preferenciales activadas.' : 'Acceso completo al programa certificado.'}</p>
                    </div>
                    <div className="toggle-track"><div className="toggle-thumb"></div></div>
                </div>
            </div>

            {/* 2. Modules */}
            <div className="step-card">
                <div className="step-title"><div className="step-num">2</div><h3>Selecciona tus Módulos</h3></div>
                <div className="timeline">
                    {LSCH_MODULES.map(m => (
                        <div key={m.id} className={`timeline-item ${selectedModules.includes(m.id) ? 'selected' : ''}`} onClick={() => toggleModule(m.id)}>
                            <div className="t-dot"></div>
                            <div className="t-card">
                                <div>
                                    <span className="t-tag">{m.tag}</span>
                                    <h4 style={{margin:'5px 0 0', color:'white'}}>{m.name}</h4>
                                    <p style={{margin:'5px 0 0', fontSize:'0.85rem', color:'var(--text-muted)'}}>{m.summary}</p>
                                </div>
                                <div className="t-check"><Icons.Check/></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 3. Plans */}
            <div className="step-card">
                <div className="step-title"><div className="step-num">3</div><h3>Plan de Pago</h3></div>
                {LSCH_GROUP_PLANS.map(p => {
                    const price = priceForGroupPlan(p, { church });
                    const isSelected = selectedGroupId === p.id;
                    return (
                        <div key={p.id} className={`plan-item ${isSelected ? 'selected' : ''}`} onClick={() => setSelectedGroupId(p.id)}>
                            {p.badge && <span className="plan-badge">{p.badge}</span>}
                            <div>
                                <strong style={{color:'white', display:'block'}}>{p.title}</strong>
                                <small style={{color:'gray'}}>{p.desc}</small>
                            </div>
                            <div className="plan-price">{clp(price)}</div>
                        </div>
                    )
                })}
            </div>

            {/* 4. Extras */}
            <div className="step-card">
                <div className="step-title"><div className="step-num">4</div><h3>Extras (Opcional)</h3></div>
                
                <div className={`extra-row ${certSelected ? 'active' : ''}`} onClick={() => setCertSelected(!certSelected)}>
                    <div style={{display:'flex', gap:'15px', alignItems:'center'}}>
                        <div style={{color:'var(--gold)'}}><Icons.Award/></div>
                        <div>
                            <strong style={{color:'white', display:'block', fontSize:'0.95rem'}}>Certificación Oficial</strong>
                            <small style={{color:'gray'}}>Diploma digital verificable</small>
                        </div>
                    </div>
                    <div style={{fontWeight:'700', color:'var(--primary)'}}>+{clp(CERTIFICATE_FEE)}</div>
                </div>

                <div className="t-card" style={{marginTop:'20px', display:'block'}}>
                    <div style={{marginBottom:'15px', display:'flex', gap:'10px', alignItems:'center'}}>
                         <div style={{color:'var(--accent)'}}><Icons.Users/></div>
                         <strong style={{color:'white'}}>Pack Refuerzo 1:1</strong>
                    </div>
                    <div className="extra-btn-grid">
                        {LSCH_ONE2ONE_PLANS.map(p => (
                            <div key={p.id} className={`extra-btn ${selectedOneId === p.id ? 'active' : ''}`} onClick={() => setSelectedOneId(selectedOneId === p.id ? null : p.id)}>
                                {p.title}
                                <div style={{fontSize:'0.7rem', marginTop:'4px'}}>+{clp(p.monthly)}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>

        {/* STICKY SUMMARY (Desktop) */}
        <div className="summary-col">
            <div className="sticky-card">
                <div className="sum-header">
                    <h3>Resumen</h3>
                    <div className="secure-tag"><Icons.Lock/> Seguro</div>
                </div>
                
                <div className="sum-row">
                    <span>Plan {groupPlan.title}</span>
                    <strong>{clp(monthlyGroup)}/mes</strong>
                </div>
                {certSelected && <div className="sum-row"><span>Certificado</span><strong>{clp(CERTIFICATE_FEE)}</strong></div>}
                {onePlan && <div className="sum-row"><span>Refuerzo 1:1</span><strong>+{clp(monthlyOne)}</strong></div>}
                
                <div className="sum-total">
                    <span>Total Mensual</span>
                    <span className="big-price">{clp(totalMonthly)}</span>
                </div>

                <div className="pay-today-box">
                    <span>Tu Primer Pago Hoy</span>
                    <strong>{clp(totalFirstPayment)}</strong>
                    <small style={{display:'block', fontSize:'0.7rem', color:'var(--text-muted)', marginTop:'5px'}}>
                        (Incluye Matrícula única de {clp(LSCH_ENROLLMENT_FEE)})
                    </small>
                </div>

                <a href={waLink} target="_blank" rel="noreferrer" className="btn-checkout">
                    Finalizar Inscripción
                </a>
            </div>
        </div>

      </section>

      {/* MOBILE BAR */}
      <div className="mobile-bar">
         <div className="mb-info">
             <small>Primer pago hoy</small>
             <strong>{clp(totalFirstPayment)}</strong>
         </div>
         <a href={waLink} target="_blank" rel="noreferrer" className="btn-mb">Inscribirme</a>
      </div>

    </div>
  );
}