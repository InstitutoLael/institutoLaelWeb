import React, { useState, useMemo, useRef } from "react";
import { useCart } from "../context/CartContext";
import EnrollmentForm from "../components/EnrollmentForm"; // Asegúrate de tener este componente o quita la importación
import SEOHead from "../components/SEOHead"; 

// Importamos la data (Asegúrate de que esta ruta sea correcta)
import { 
  ACADEMY_CONFIG, 
  SUBJECTS, 
  LEVELS, 
  PACKS, 
  SCHOOL_SERVICES, 
  ALLIANCE,
  clp 
} from "../data/homeschool.js";

import { 
  Zap, Check, CheckCircle, School, User, Building2, 
  Star, ArrowRight, Brain, Target, ShieldCheck, 
  ShoppingCart, X 
} from 'lucide-react';

// --- IMÁGENES ---
const heroImg = "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1200&auto=format&fit=crop";
// Si no tienes la imagen local, comenta la siguiente línea:
// import losOlivosLogo from "../assets/img/Partners/LosOlivos.png"; 

/* ──────────────────────────────────────────────────────────────────────────
   1. ESTILOS CSS (Refinados y Dark Mode)
   ────────────────────────────────────────────────────────────────────────── */
const css = `
:root {
  --bg-body: #050505;
  --bg-card: #0f0f0f;
  --bg-card-hover: #141414;
  --border: rgba(255,255,255,0.08);
  --accent-primary: #8b5cf6;
  --text-main: #fff;
  --text-muted: #a1a1aa;
  --radius: 20px;
  --font-sans: 'Plus Jakarta Sans', system-ui, sans-serif;
}

* { box-sizing: border-box; }
.academy-page {
  background-color: var(--bg-body); color: var(--text-main); font-family: var(--font-sans); min-height: 100vh; padding-bottom: 120px;
}
.container { max-width: 1100px; margin: 0 auto; padding: 0 24px; }
button { cursor: pointer; border: none; font-family: inherit; -webkit-tap-highlight-color: transparent; }
a { text-decoration: none; color: inherit; }

.animate-fade { animation: fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1); }
@keyframes fadeIn { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }

/* HERO */
.hero-section { padding: 100px 0 60px; position: relative; }
.hero-grid { display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 60px; align-items: center; }
h1 { font-size: clamp(2.5rem, 5vw, 4rem); line-height: 1.05; font-weight: 800; letter-spacing: -0.03em; margin-bottom: 20px; }
.highlight { background: linear-gradient(to right, #a78bfa, #3b82f6); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
.lead { font-size: 1.15rem; color: var(--text-muted); line-height: 1.6; max-width: 500px; margin-bottom: 30px; }
.badge-new { display: inline-flex; align-items: center; gap: 8px; background: rgba(139, 92, 246, 0.1); color: #a78bfa; padding: 6px 14px; border-radius: 50px; font-weight: 700; font-size: 0.8rem; border: 1px solid rgba(139, 92, 246, 0.2); margin-bottom: 24px; }

/* HOOK SECTION */
.hook-section { padding: 40px 0 80px; }
.hook-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 40px; }
.hook-card { background: linear-gradient(180deg, var(--bg-card) 0%, rgba(20,20,20,0) 100%); border: 1px solid var(--border); padding: 30px; border-radius: var(--radius); text-align: left; }
.hook-icon { color: var(--accent-primary); margin-bottom: 15px; display: block; }
.hook-title { font-size: 1.2rem; font-weight: 700; margin-bottom: 10px; color: white; }
.hook-desc { font-size: 0.95rem; color: var(--text-muted); line-height: 1.5; }
.section-title { text-align: center; max-width: 700px; margin: 0 auto; }
.section-title h2 { font-size: 2.5rem; font-weight: 800; margin-bottom: 15px; }
.section-title p { color: var(--text-muted); font-size: 1.1rem; }

/* TOGGLE */
.toggle-pill { display: inline-flex; background: #161616; padding: 5px; border-radius: 50px; border: 1px solid var(--border); }
.t-btn { display: flex; align-items: center; gap: 8px; padding: 12px 24px; border-radius: 50px; background: transparent; color: var(--text-muted); font-weight: 600; font-size: 0.95rem; transition: 0.3s; }
.t-btn:hover { color: white; }
.t-btn.active { background: white; color: black; box-shadow: 0 4px 20px rgba(255,255,255,0.15); }

/* IMAGES */
.visual-bento { position: relative; }
.bento-card-hero { background: var(--bg-card); border-radius: var(--radius); border: 1px solid var(--border); overflow: hidden; position: relative; height: 420px; }
.hero-img { width: 100%; height: 100%; object-fit: cover; }
.gradient-overlay { position: absolute; inset: 0; background: linear-gradient(to bottom, transparent 60%, var(--bg-body)); }
.partner-float { position: absolute; bottom: 30px; left: -40px; background: rgba(20, 20, 20, 0.8); backdrop-filter: blur(16px); padding: 16px 20px; border-radius: 16px; border: 1px solid var(--border); box-shadow: 0 20px 40px rgba(0,0,0,0.5); display: flex; align-items: center; gap: 15px; animation: float 6s ease-in-out infinite; max-width: 300px; }
@keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
.pf-logo-wrapper { background: white; width: 48px; height: 48px; border-radius: 50%; display: flex; align-items: center; justify-content: center; padding: 2px; }
.pf-logo { width: 100%; height: 100%; object-fit: contain; }
.partner-info strong { display: block; font-size: 0.9rem; color: white; line-height: 1.2; }
.partner-info span { display: block; font-size: 0.7rem; color: #84cc16; font-weight: 700; text-transform: uppercase; margin-bottom: 2px; }

/* STEPS */
.step-section { padding: 50px 0; border-bottom: 1px dashed rgba(255,255,255,0.06); }
.step-section:last-of-type { border-bottom: none; }
.step-header { display: flex; gap: 16px; margin-bottom: 30px; }
.step-num { width: 32px; height: 32px; background: #222; border: 1px solid var(--border); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.9rem; font-weight: 700; color: white; flex-shrink: 0; }
.step-header h3 { font-size: 1.5rem; margin: 0 0 5px 0; font-weight: 700; }
.step-sub { margin: 0; color: var(--text-muted); font-size: 0.95rem; }

.grid-subjects { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 16px; }
.subject-card { background: var(--bg-card); border: 1px solid var(--border); border-radius: 16px; padding: 20px; cursor: pointer; transition: all 0.2s; position: relative; overflow: hidden; display: flex; flex-direction: column; align-items: center; text-align: center; }
.subject-card:hover { transform: translateY(-3px); border-color: var(--accent-color); background: var(--bg-card-hover); }
.subject-card.active { background: rgba(255,255,255,0.03); border-color: var(--accent-color); box-shadow: inset 0 0 0 1px var(--accent-color); }
.s-icon { font-size: 2.2rem; margin-bottom: 12px; display: block; filter: drop-shadow(0 0 10px rgba(0,0,0,0.5)); }
.s-name { font-weight: 600; color: white; font-size: 0.95rem; }
.s-check-abs { position: absolute; top: 8px; right: 8px; color: var(--accent-color); }
.subject-detail-bar { margin-top: 20px; background: rgba(255,255,255,0.03); padding: 12px 20px; border-radius: 12px; font-size: 0.9rem; color: #ccc; border-left: 3px solid transparent; transition: border 0.3s; }

.grid-levels { display: flex; gap: 12px; flex-wrap: wrap; }
.level-pill { background: var(--bg-card); border: 1px solid var(--border); padding: 10px 20px; border-radius: 12px; color: var(--text-muted); text-align: left; transition: 0.2s; min-width: 140px; }
.level-pill:hover { border-color: white; background: var(--bg-card-hover); }
.level-pill.active { background: white; color: black; border-color: white; transform: scale(1.02); }
.l-label { display: block; font-weight: 700; font-size: 0.9rem; margin-bottom: 2px; }
.l-desc { display: block; font-size: 0.75rem; opacity: 0.8; }

/* CONFIG & PACKS */
.config-container { display: grid; grid-template-columns: 1fr 380px; gap: 40px; align-items: start; }
.grid-packs { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 20px; }
.pack-card { background: var(--bg-card); border: 1px solid var(--border); border-radius: 20px; padding: 24px; cursor: pointer; transition: 0.2s; position: relative; display: flex; flex-direction: column; }
.pack-card:hover { border-color: var(--accent-primary); transform: translateY(-4px); }
.pack-card.active { border-color: var(--accent-primary); background: rgba(139, 92, 246, 0.05); }
.badge-pop { position: absolute; top: 12px; right: 12px; background: var(--accent-primary); color: white; font-size: 0.7rem; font-weight: 800; padding: 4px 10px; border-radius: 6px; text-transform: uppercase; }
.pack-header { margin-bottom: 15px; }
.pack-hrs { font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700; letter-spacing: 0.05em; }
.pack-title { font-size: 1.4rem; font-weight: 700; color: white; margin: 4px 0 2px 0; }
.pack-subtitle { font-size: 0.9rem; color: var(--text-muted); margin: 0; }
.pack-price-box { display: flex; align-items: baseline; gap: 4px; margin-bottom: 15px; }
.pack-price { font-size: 1.6rem; font-weight: 800; color: white; }
.pack-per-month { font-size: 0.9rem; color: var(--text-muted); }
.pack-divider { height: 1px; background: var(--border); margin-bottom: 15px; width: 100%; }
.pack-features { list-style: none; padding: 0; margin: 0; }
.pack-features li { display: flex; align-items: flex-start; gap: 10px; font-size: 0.9rem; color: #ccc; margin-bottom: 8px; line-height: 1.4; }
.pf-icon { color: var(--accent-primary); margin-top: 2px; }

/* SUMMARY CARD */
.summary-card { background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius); padding: 30px; position: sticky; top: 30px; transition: border-color 0.3s; }
.sum-title { font-size: 1.1rem; font-weight: 700; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border); padding-bottom: 15px; }
.sum-row { display: flex; justify-content: space-between; margin-bottom: 12px; font-size: 0.95rem; color: var(--text-muted); }
.sum-row strong { color: white; }
.text-free { color: #84cc16 !important; }
.sum-total { margin-top: 20px; padding-top: 20px; border-top: 1px dashed var(--border); display: flex; justify-content: space-between; align-items: center; }
.total-stack { text-align: right; }
.total-price { font-size: 2rem; font-weight: 800; color: white; display: block; line-height: 1; }
.total-note { font-size: 0.8rem; color: var(--text-muted); }
.btn-checkout { background: white; color: black; width: 100%; padding: 16px; border-radius: 16px; display: flex; align-items: center; justify-content: center; gap: 10px; font-weight: 800; font-size: 1.1rem; margin-top: 24px; transition: 0.2s; text-align: center; }
.btn-checkout:hover { transform: scale(1.02); box-shadow: 0 10px 30px rgba(255,255,255,0.2); }
.guarantee-box { margin-top: 20px; font-size: 0.8rem; color: #666; background: rgba(255,255,255,0.03); padding: 10px; border-radius: 8px; line-height: 1.4; display:flex; gap:8; align-items:center; justify-content:center;}

/* B2B */
.b2b-container { background: #0a0a0a; border: 1px solid var(--border); border-radius: 24px; padding: 60px; text-align: center; margin-top: 40px; position: relative; overflow: hidden; }
.b2b-header h2 { font-size: 2.5rem; margin-bottom: 15px; color: white; }
.b2b-header p { font-size: 1.1rem; color: var(--text-muted); max-width: 600px; margin: 0 auto 50px; }
.b2b-services { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 30px; text-align: left; margin-bottom: 50px; }
.serv-item { background: var(--bg-card); padding: 30px; border-radius: 20px; border: 1px solid var(--border); transition: 0.2s; display: flex; flex-direction: column; height: 100%; }
.serv-item:hover { border-color: #3b82f6; transform: translateY(-5px); }
.serv-icon-circle { width: 50px; height: 50px; background: rgba(59, 130, 246, 0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; margin-bottom: 20px; color: #3b82f6; }
.serv-item h3 { font-size: 1.2rem; color: white; margin: 0 0 10px 0; }
.serv-item p { font-size: 0.95rem; color: var(--text-muted); line-height: 1.5; flex-grow: 1; }
.btn-b2b { background: white; color: black; padding: 16px 32px; border-radius: 12px; font-weight: 800; font-size: 1.1rem; display: inline-flex; align-items:center; gap:8; transition: 0.2s; }
.btn-b2b:hover { transform: scale(1.05); box-shadow: 0 0 20px rgba(255,255,255,0.3); }

/* MOBILE BAR */
.mobile-bar { position: fixed; bottom: 0; left: 0; width: 100%; z-index: 100; background: rgba(10,10,10,0.9); backdrop-filter: blur(20px); border-top: 1px solid var(--border); padding: 16px 24px; display: flex; justify-content: space-between; align-items: center; }
@media (min-width: 901px) { .mobile-bar { display: none; } }
.mb-info span { display: block; font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase; }
.mb-info strong { color: white; font-size: 1.3rem; }
.btn-mb { background: white; color: black; font-weight: 800; padding: 12px 24px; border-radius: 50px; font-size: 0.9rem; }

/* RESPONSIVE */
@media (max-width: 900px) {
  .hero-section { padding-top: 120px; }
  .hero-grid { grid-template-columns: 1fr; text-align: center; gap: 40px; }
  .lead { margin-inline: auto; }
  .visual-bento { display: none; }
  .partner-float { display: none; }
  .hook-grid { grid-template-columns: 1fr; }
  .config-container { grid-template-columns: 1fr; }
  .summary-col { display: none; }
  .b2b-container { padding: 30px 20px; }
}
`;

/* ──────────────────────────────────────────────────────────────────────────
   2. COMPONENTE PRINCIPAL (Homeschool)
   ────────────────────────────────────────────────────────────────────────── */
export default function Homeschool() {
  const { addToCart } = useCart();
  const [isSchool, setIsSchool] = useState(false);
  
  // ESTADOS
  const [selectedSubject, setSelectedSubject] = useState("mat");
  const [selectedLevel, setSelectedLevel] = useState("media");
  const [selectedPackId, setSelectedPackId] = useState("academy-p8");
  const [showModal, setShowModal] = useState(false); 
  const [toast, setToast] = useState(null);
  
  const configRef = useRef(null);

  // === LÓGICA DE DATOS ===
  const activeSubject = SUBJECTS.find(s => s.id === selectedSubject) || SUBJECTS[0];
  const activePack = PACKS.find(p => p.id === selectedPackId) || PACKS[1];
  const activeLevel = LEVELS.find(l => l.id === selectedLevel) || LEVELS[1];

  // Cálculos de dinero (Si el pack es el p12, matrícula es 0)
  const isEnrollmentFree = activePack.id === 'academy-p12';
  const appliedEnrollment = isEnrollmentFree ? 0 : ACADEMY_CONFIG.enrollmentFee;
  const total = activePack.price + appliedEnrollment;

  // Preparamos los datos
  const planForCheckout = useMemo(() => ({
    title: `${activeSubject.name} - ${activePack.title} (${activeLevel.label})`,
    price: clp(total),
    detalleHoy: isEnrollmentFree ? "Mes 1 (Matrícula GRATIS)" : "Matrícula + Mes 1"
  }), [activeSubject, activeLevel, activePack, total, isEnrollmentFree]);

  const waLinkSchool = `https://wa.me/56964626568?text=${encodeURIComponent("Hola 👋, soy de un Colegio y me interesan las soluciones B2B de Lael Academy.")}`;

  const handleAddToCart = (fromModal = false) => {
    addToCart({
      id: `acad-${selectedSubject}-${activeLevel.id}-${activePack.id}-${Date.now()}`,
      name: `Academy ${activeSubject.name} - ${activePack.title}`,
      price: total,
      recurringPrice: activePack.price,
      recurrence: 'monthly',
      category: 'Academia',
      details: [
        `Materia: ${activeSubject.name}`,
        `Nivel: ${activeLevel.label}`,
        `Plan: ${activePack.hours} Horas/mes`,
        planForCheckout.detalleHoy
      ]
    });

    if(fromModal) setShowModal(false);

    // Feedback Toast
    setToast("¡Plan añadido al Carrito!");
    setTimeout(() => setToast(null), 3000);
  };

  const scrollToConfig = () => {
    configRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="academy-page">
      <SEOHead title="Lael Academy | Reforzamiento Escolar" description="Clases particulares con metodología de alto rendimiento." />
      <style>{css}</style>
      
      {/* TOAST DE NOTIFICACIÓN */}
      {toast && (
        <div style={{
          position: 'fixed', bottom: 40, left: '50%', transform: 'translateX(-50%)',
          background: '#10b981', color: 'white', padding: '12px 24px', borderRadius: 50,
          boxShadow: '0 10px 30px rgba(0,0,0,0.4)', zIndex: 9999, fontWeight: 700,
          display: 'flex', alignItems: 'center', gap: 10, animation: 'slideUpToast 0.3s ease-out'
        }}>
           <CheckCircle size={20}/> {toast}
           <style>{`@keyframes slideUpToast { from { opacity:0; transform: translate(-50%, 20px); } to { opacity:1; transform: translate(-50%, 0); } }`}</style>
        </div>
      )}

      {/* MODAL CHECKOUT */}
      {showModal && (
        <EnrollmentForm 
          planTitle={planForCheckout.title}
          price={planForCheckout.price}
          selectedDetails={planForCheckout.detalleHoy}
          onClose={() => setShowModal(false)}
          onConfirm={() => handleAddToCart(true)} 
        />
      )}

      {/* HERO SECTION */}
      <header className="hero-section">
        <div className="container hero-grid">
          <div className="hero-content">
            <div className="badge-new">
              <Zap size={14} fill="currentColor"/> 
              {isSchool ? "Gestión Académica Externa" : "Matrículas 2026 Abiertas"}
            </div>
            
            <h1>
              {isSchool ? "Potencie su" : "Tus Superpoderes"} <br/>
              <span className="highlight">
                {isSchool ? "Equipo Docente." : "Académicos."}
              </span>
            </h1>
            
            <p className="lead">
              {isSchool 
                ? "Delegue reforzamientos PIE, reemplazos y talleres en expertos. Reduzca la carga administrativa y asegure continuidad."
                : "No más frustración con las notas. Te entrenamos para que entiendas la materia, recuperes la confianza y aprendas a estudiar de verdad."
              }
            </p>

            <div className="toggle-pill">
                <button 
                  className={`t-btn ${!isSchool ? 'active' : ''}`} 
                  onClick={() => setIsSchool(false)}
                >
                    <User size={18}/> Para Estudiantes
                </button>
                <button 
                  className={`t-btn ${isSchool ? 'active' : ''}`} 
                  onClick={() => setIsSchool(true)}
                >
                    <Building2 size={18}/> Para Colegios
                </button>
            </div>
          </div>

          <div className="visual-bento">
            <div className="bento-card-hero">
               <img src={heroImg} alt="Estudiantes" className="hero-img" />
               <div className="gradient-overlay"></div>
            </div>
            {!isSchool && (
                <div className="partner-float">
                    <div className="pf-logo-wrapper">
                      {/* Placeholder si la imagen no carga */}
                      <ShieldCheck size={32} color="#84cc16"/>
                    </div>
                    <div className="partner-info">
                        <span>{ALLIANCE.role}</span>
                        <strong>{ALLIANCE.name}</strong>
                    </div>
                </div>
            )}
          </div>
        </div>
      </header>

      {/* DYNAMIC CONTENT AREA */}
      <div className="container" id="content-area">
        
        {/* ================= VISTA B2C (ESTUDIANTES) ================= */}
        {!isSchool && (
            <div className="animate-fade">
                
                {/* VALUE PROPS */}
                <section className="hook-section">
                    <div className="section-title">
                        <h2>Más que un "Profe Particular"</h2>
                        <p>¿Por qué estudiar en Lael es diferente a ver videos o contratar a un estudiante universitario?</p>
                    </div>

                    <div className="hook-grid">
                        <div className="hook-card">
                            <span className="hook-icon"><Target /></span>
                            <div className="hook-title">Diagnóstico Real</div>
                            <div className="hook-desc">
                                No empezamos a ciegas. Detectamos exactamente dónde están los vacíos (bases matemáticas, comprensión lectora) y atacamos la raíz del problema.
                            </div>
                        </div>
                        <div className="hook-card">
                            <span className="hook-icon"><Brain /></span>
                            <div className="hook-title">Técnica de Estudio</div>
                            <div className="hook-desc">
                                No sacas nada con entender en la clase si olvidas al día siguiente. Enseñamos a tomar apuntes y repasar para retener a largo plazo.
                            </div>
                        </div>
                        <div className="hook-card">
                            <span className="hook-icon"><Zap /></span>
                            <div className="hook-title">Confianza y Actitud</div>
                            <div className="hook-desc">
                                Transformamos el "yo soy malo para esto" en "todavía no lo entiendo". Cambiar la mentalidad es el 50% de la nota final.
                            </div>
                        </div>
                    </div>
                </section>

                {/* 1. MATERIAS */}
                <section className="step-section">
                    <div className="step-header">
                        <div className="step-num">1</div>
                        <div>
                          <h3>Elige tu Especialidad</h3>
                          <p className="step-sub">¿Qué materia quieres dominar?</p>
                        </div>
                    </div>
                    <div className="grid-subjects">
                        {SUBJECTS.map(s => (
                            <div 
                                key={s.id} 
                                className={`subject-card ${selectedSubject === s.id ? 'active' : ''}`}
                                style={{'--accent-color': s.color}}
                                onClick={() => setSelectedSubject(s.id)}
                            >
                                <span className="s-icon" style={{color: s.color}}>
                                  {/* Renderizado condicional de iconos según ID */}
                                  {s.id === 'mat' ? '📐' : s.id === 'len' ? '📚' : s.id === 'ing' ? '🇬🇧' : s.id === 'cie' ? '🧪' : '🎓'}
                                </span>
                                <span className="s-name">{s.name}</span>
                                {selectedSubject === s.id && (
                                  <div className="s-check-abs"><CheckCircle size={16}/></div>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="subject-detail-bar" style={{borderLeftColor: activeSubject.color}}>
                       <strong style={{color: activeSubject.color}}>{activeSubject.name}:</strong> {activeSubject.desc}
                    </div>
                </section>

                {/* 2. NIVEL */}
                <section className="step-section">
                    <div className="step-header">
                        <div className="step-num">2</div>
                        <div>
                          <h3>Tu Nivel Actual</h3>
                          <p className="step-sub">Adaptamos la metodología a tu etapa.</p>
                        </div>
                    </div>
                    <div className="grid-levels">
                        {LEVELS.map(l => (
                            <button 
                                key={l.id} 
                                className={`level-pill ${selectedLevel === l.id ? 'active' : ''}`}
                                onClick={() => setSelectedLevel(l.id)}
                            >
                                <span className="l-label">{l.label}</span>
                                <span className="l-desc">{l.desc}</span>
                            </button>
                        ))}
                    </div>
                </section>

                {/* 3. PACKS */}
                <section className="step-section" ref={configRef} id="planes">
                    <div className="config-container">
                        
                        <div className="packs-col">
                            <div className="step-header">
                                <div className="step-num">3</div>
                                <div>
                                  <h3>Elige tu Intensidad</h3>
                                  <p className="step-sub">Planes mensuales flexibles. Cancela cuando quieras.</p>
                                </div>
                            </div>
                            
                            <div className="grid-packs">
                                {PACKS.map(p => (
                                    <div 
                                        key={p.id} 
                                        className={`pack-card ${selectedPackId === p.id ? 'active' : ''}`}
                                        onClick={() => setSelectedPackId(p.id)}
                                    >
                                        {p.badge && <span className="badge-pop">{p.badge}</span>}
                                        
                                        <div className="pack-header">
                                          <span className="pack-hrs">{p.hours} Horas Cronológicas</span>
                                          <h4 className="pack-title">{p.title}</h4>
                                          <p className="pack-subtitle">{p.subtitle}</p>
                                        </div>

                                        <div className="pack-price-box">
                                          <span className="pack-price">{clp(p.price)}</span>
                                          <span className="pack-per-month">/ mes</span>
                                        </div>

                                        <div className="pack-divider"></div>

                                        <ul className="pack-features">
                                          {p.features.map((feat, i) => (
                                            <li key={i}>
                                              <span className="pf-icon"><Check size={16}/></span>
                                              {feat}
                                            </li>
                                          ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* RESUMEN sticky (Desktop) */}
                        <div className="summary-col">
                            <div className="summary-card" style={{borderColor: activeSubject.color}}>
                                <div className="sum-title">
                                    <span>Resumen del Plan</span>
                                    <span style={{color: '#fbbf24'}}><Star size={18} fill="currentColor"/></span>
                                </div>
                                
                                <div className="sum-content">
                                  <div className="sum-row">
                                      <span>Materia</span>
                                      <strong style={{color: activeSubject.color}}>{activeSubject.name}</strong>
                                  </div>
                                  <div className="sum-row">
                                      <span>Nivel</span>
                                      <strong>{activeLevel.label}</strong>
                                  </div>
                                  <div className="sum-row">
                                      <span>Pack</span>
                                      <strong>{activePack.title}</strong>
                                  </div>
                                  
                                  <div className="sum-row enrollment-row">
                                      <span>Matrícula</span>
                                      {isEnrollmentFree ? (
                                        <strong className="text-free">BONIFICADA</strong>
                                      ) : (
                                        <strong>{clp(ACADEMY_CONFIG.enrollmentFee)}</strong>
                                      )}
                                  </div>
                                </div>

                                <div className="sum-total">
                                    <span>Total a pagar hoy</span>
                                    <div className="total-stack">
                                      <span className="total-price">{clp(total)}</span>
                                      <span className="total-note">{isEnrollmentFree ? 'Mes 1' : 'Matrícula + Mes 1'}</span>
                                    </div>
                                </div>

                                <button 
                                  onClick={() => setShowModal(true)} 
                                  className="btn-checkout"
                                >
                                    Inscribirme Ahora <ArrowRight size={20}/>
                                </button>
                                <button 
                                  onClick={() => handleAddToCart(false)}
                                  style={{
                                      width:'100%', marginTop:10, background:'transparent', 
                                      color:'#94a3b8', border:'1px solid #334155', 
                                      padding:10, borderRadius:12, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:8
                                  }}
                                >
                                    <ShoppingCart size={16}/> Agregar al Carrito
                                </button>
                                
                                <div className="guarantee-box">
                                   <ShieldCheck size={16}/> Garantía de satisfacción académica
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )}

        {/* ================= VISTA B2B (COLEGIOS) ================= */}
        {isSchool && (
             <div className="b2b-container animate-fade">
                <div className="b2b-header">
                   <h2>Extensión de su Cuerpo Docente</h2>
                   <p>Ofrecemos soluciones llave en mano para establecimientos educacionales que requieren soporte especializado en áreas críticas.</p>
                </div>

                <div className="b2b-services">
                    {SCHOOL_SERVICES.map((serv, i) => (
                      <div className="serv-item" key={i}>
                         <div className="serv-icon-circle">
                            <Building2 size={24}/>
                         </div>
                         <h3>{serv.title}</h3>
                         <p>{serv.desc}</p>
                      </div>
                    ))}
                </div>

                <a href={waLinkSchool} target="_blank" rel="noopener noreferrer" className="btn-b2b">
                   Contactar Área de Convenios <ArrowRight size={20}/>
                </a>
             </div>
        )}

      </div>

      {/* BARRA MÓVIL INFERIOR */}
      {!isSchool && (
        <div className="mobile-bar">
           <div className="mb-info">
              <span>Total a pagar</span>
              <strong>{clp(total)}</strong>
           </div>
           <button className="btn-mb" onClick={() => setShowModal(true)}>
              Inscribirme
           </button>
        </div>
      )}

    </div>
  );
}