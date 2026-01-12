import { useState, useMemo, useRef } from "react";
// 👇 IMPORTANTE: Importamos tu formulario de inscripción
import EnrollmentForm from "../components/EnrollmentForm"; 

// Importamos la data (Aquí es donde bajarás los precios después)
import { 
  ENROLLMENT_FEE, 
  SUBJECTS, 
  LEVELS, 
  PACKS, 
  SCHOOL_SERVICES, 
  ALLIANCE,
  clp 
} from "../data/homeschool.js";

// --- IMÁGENES ---
const heroImg = "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1200&auto=format&fit=crop";
import losOlivosLogo from "../assets/img/Partners/LosOlivos.png"; 

/* ──────────────────────────────────────────────────────────────────────────
   1. ICONOS SVG
   ────────────────────────────────────────────────────────────────────────── */
const Icons = {
  Zap: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  Check: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  CheckCircle: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
  School: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6H5a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h13l4-3.5L18 6Z"/><path d="M12 13v9"/><path d="M12 2v4"/><path d="M22 6l-4-3.5L14 6"/></svg>,
  User: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  Building: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M8 10h.01"/><path d="M16 10h.01"/><path d="M8 14h.01"/><path d="M16 14h.01"/></svg>,
  Star: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>,
  ArrowRight: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
};

/* ──────────────────────────────────────────────────────────────────────────
   2. COMPONENTE PRINCIPAL
   ────────────────────────────────────────────────────────────────────────── */
export default function Homeschool() {
  const [isSchool, setIsSchool] = useState(false); // Toggle B2C / B2B
  const [selectedSubject, setSelectedSubject] = useState("mat");
  const [selectedLevel, setSelectedLevel] = useState("media");
  const [selectedPackId, setSelectedPackId] = useState("p8");
  const [showModal, setShowModal] = useState(false); // Estado para abrir el formulario
  
  const configRef = useRef(null);

  // === LÓGICA DE NEGOCIO ===
  
  // 1. Encontrar objetos completos basados en ID
  const activeSubject = SUBJECTS.find(s => s.id === selectedSubject) || SUBJECTS[0];
  const activePack = PACKS.find(p => p.id === selectedPackId) || PACKS[1];
  const activeLevel = LEVELS.find(l => l.id === selectedLevel) || LEVELS[1];

  // 2. Calcular Totales
  const isEnrollmentFree = activePack.id === 'p12'; // Lógica para matrícula gratis
  const appliedEnrollment = isEnrollmentFree ? 0 : ENROLLMENT_FEE;
  const total = activePack.price + appliedEnrollment;

  // 3. Objeto para el Formulario de Inscripción
  // Transformamos la selección actual en el formato que espera EnrollmentForm
  const planForCheckout = useMemo(() => ({
    id: `${activeSubject.id}-${activePack.id}`,
    title: `${activeSubject.name} (${activeLevel.label}) - ${activePack.title}`,
    subtitle: `${activePack.hours} Horas Cronológicas`,
    color: activeSubject.color,
    isScholarship: false, // Es pago normal
    
    // Precios
    mensual: activePack.price,
    pagoHoy: total,
    detalleHoy: isEnrollmentFree ? "Mes 1 (Matrícula Gratis)" : "Matrícula + Mes 1",
    
    // Extras para el correo/API
    features: [`Nivel: ${activeLevel.label}`, `Pack: ${activePack.title}`, activePack.subtitle]
  }), [activeSubject, activeLevel, activePack, total, isEnrollmentFree]);

  const waLinkSchool = `https://wa.me/56964626568?text=${encodeURIComponent("Hola 👋, soy de un Colegio y me interesan las soluciones B2B de Lael Academy.")}`;

  return (
    <div className="academy-page">
      <style>{css}</style>
      
      {/* 🔴 MODAL DE INSCRIPCIÓN */}
      {showModal && (
        <EnrollmentForm 
          plan={planForCheckout} 
          onClose={() => setShowModal(false)} 
        />
      )}
      
      <title>Lael Academy | {isSchool ? "Soluciones B2B" : "Reforzamiento de Élite"}</title>

      {/* HERO SECTION */}
      <header className="hero-section">
        <div className="container hero-grid">
          
          <div className="hero-content">
            <div className="badge-new">
              <Icons.Zap/> 
              {isSchool ? "Gestión Académica Externa" : "Inscripciones Abiertas 2026"}
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
                : "Más que clases particulares. Un centro de entrenamiento para subir notas, preparar la PAES y crear hábitos de estudio sólidos."
              }
            </p>

            {/* TOGGLE SWITCH */}
            <div className="toggle-pill">
                <button 
                  className={`t-btn ${!isSchool ? 'active' : ''}`} 
                  onClick={() => setIsSchool(false)}
                >
                    <Icons.User/> Para Estudiantes
                </button>
                <button 
                  className={`t-btn ${isSchool ? 'active' : ''}`} 
                  onClick={() => setIsSchool(true)}
                >
                    <Icons.Building/> Para Colegios
                </button>
            </div>
          </div>

          <div className="visual-bento">
            <div className="bento-card-hero">
               <img src={heroImg} alt="Estudiantes en Lael Academy" className="hero-img" />
               <div className="gradient-overlay"></div>
            </div>
            
            {!isSchool && (
                <div className="partner-float">
                    <div className="pf-logo-wrapper">
                      <img src={losOlivosLogo} alt="Logo Los Olivos" className="pf-logo" onError={(e) => e.target.style.display='none'} />
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
        
        {/* ================= VISTA: ESTUDIANTES (B2C) ================= */}
        {!isSchool && (
            <div className="animate-fade">
                
                {/* STEP 1: MATERIAS */}
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
                                <span className="s-icon" style={{color: s.color}}>{s.icon}</span>
                                <span className="s-name">{s.name}</span>
                                {selectedSubject === s.id && (
                                  <div className="s-check-abs"><Icons.CheckCircle /></div>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="subject-detail-bar" style={{borderLeftColor: activeSubject.color}}>
                       <strong style={{color: activeSubject.color}}>{activeSubject.name}:</strong> {activeSubject.desc}
                    </div>
                </section>

                {/* STEP 2: NIVEL */}
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

                {/* STEP 3: PACKS & RESUMEN */}
                <section className="step-section" ref={configRef}>
                    <div className="config-container">
                        
                        {/* Packs */}
                        <div className="packs-col">
                            <div className="step-header">
                                <div className="step-num">3</div>
                                <div>
                                  <h3>Elige tu Intensidad</h3>
                                  <p className="step-sub">Planes mensuales flexibles.</p>
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
                                              <span className="pf-icon"><Icons.Check/></span>
                                              {feat}
                                            </li>
                                          ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Sticky Summary */}
                        <div className="summary-col">
                            <div className="summary-card" style={{borderColor: activeSubject.color}}>
                                <div className="sum-title">
                                    <span>Resumen del Plan</span>
                                    <span style={{color: '#fbbf24'}}><Icons.Star /></span>
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
                                        <strong>{clp(ENROLLMENT_FEE)}</strong>
                                      )}
                                  </div>
                                </div>

                                <div className="sum-total">
                                    <span>Total a pagar</span>
                                    <div className="total-stack">
                                      <span className="total-price">{clp(total)}</span>
                                      <span className="total-note">{isEnrollmentFree ? 'Mes 1' : 'Matrícula + Mes 1'}</span>
                                    </div>
                                </div>

                                {/* BOTÓN DE INSCRIPCIÓN INMEDIATA */}
                                <button 
                                  onClick={() => setShowModal(true)} 
                                  className="btn-checkout"
                                >
                                    Inscribirme Ahora <Icons.ArrowRight />
                                </button>
                                
                                <div className="guarantee-box">
                                  <p>✅ <strong>Garantía:</strong> Si la primera clase no te convence, te cambiamos de tutor o te devolvemos el dinero.</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </section>

                {/* MOBILE STICKY BAR */}
                <div className="mobile-bar">
                    <div className="mb-info">
                        <span>Total (Pagar hoy)</span>
                        <strong>{clp(total)}</strong>
                    </div>
                    <button onClick={() => setShowModal(true)} className="btn-mb">
                        Inscribir
                    </button>
                </div>

            </div>
        )}

        {/* ================= VISTA: COLEGIOS (B2B) ================= */}
        {isSchool && (
            <div className="b2b-container animate-fade">
                <div className="b2b-header">
                    <div className="badge-new" style={{width:'fit-content', margin:'0 auto 20px', borderColor: '#3b82f6', color: '#60a5fa', background: 'rgba(59, 130, 246, 0.1)'}}>
                      Soluciones Educativas
                    </div>
                    <h2>Aliados Estratégicos para su Colegio</h2>
                    <p>Optimice su presupuesto SEP/PIE con servicios externos de alta calidad pedagógica.</p>
                </div>

                <div className="b2b-services">
                    {SCHOOL_SERVICES.map(s => (
                        <div key={s.id} className="serv-item">
                            <div className="serv-icon-circle">{s.icon}</div>
                            <h3>{s.title}</h3>
                            <p>{s.desc}</p>
                            <div className="serv-price-ref">{s.priceRef}</div>
                        </div>
                    ))}
                </div>

                <div className="b2b-cta-box">
                  <p>¿Necesita una propuesta formal?</p>
                  <a href={waLinkSchool} target="_blank" rel="noreferrer" className="btn-b2b">
                      Solicitar Reunión o Cotización
                  </a>
                </div>
            </div>
        )}

      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   3. ESTILOS CSS
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
  --font-sans: 'Inter', system-ui, -apple-system, sans-serif;
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
.guarantee-box { margin-top: 20px; font-size: 0.8rem; color: #666; background: rgba(255,255,255,0.03); padding: 10px; border-radius: 8px; line-height: 1.4; }

/* B2B */
.b2b-container { background: #0a0a0a; border: 1px solid var(--border); border-radius: 24px; padding: 60px; text-align: center; margin-top: 40px; position: relative; overflow: hidden; }
.b2b-header h2 { font-size: 2.5rem; margin-bottom: 15px; color: white; }
.b2b-header p { font-size: 1.1rem; color: var(--text-muted); max-width: 600px; margin: 0 auto 50px; }
.b2b-services { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 30px; text-align: left; margin-bottom: 50px; }
.serv-item { background: var(--bg-card); padding: 30px; border-radius: 20px; border: 1px solid var(--border); transition: 0.2s; display: flex; flex-direction: column; height: 100%; }
.serv-item:hover { border-color: #3b82f6; transform: translateY(-5px); }
.serv-icon-circle { width: 50px; height: 50px; background: rgba(59, 130, 246, 0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; margin-bottom: 20px; }
.serv-item h3 { font-size: 1.2rem; color: white; margin: 0 0 10px 0; }
.serv-item p { font-size: 0.95rem; color: var(--text-muted); line-height: 1.5; flex-grow: 1; }
.serv-price-ref { margin-top: 20px; font-size: 0.85rem; font-weight: 700; color: #60a5fa; padding-top: 15px; border-top: 1px solid var(--border); }
.btn-b2b { background: white; color: black; padding: 16px 32px; border-radius: 12px; font-weight: 800; font-size: 1.1rem; display: inline-block; transition: 0.2s; }
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
  .config-container { grid-template-columns: 1fr; }
  .summary-col { display: none; }
  .b2b-container { padding: 30px 20px; }
}
`;