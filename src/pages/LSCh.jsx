import React, { useState, useMemo, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import EnrollmentForm from "../components/EnrollmentForm";
import SEOHead from "../components/SEOHead"; 

// --- ICONOS (Lucide React) ---
import { 
  Check, Hand, Briefcase, Users, Award, 
  CreditCard, ChevronRight, Star, Heart, Zap, 
  ShieldCheck 
} from "lucide-react";

// --- DATOS ---
import {
  ENROLLMENT_FEE as LSCH_ENROLLMENT_FEE,
  LSCH_MODULES,
  LSCH_GROUP_PLANS,
  LSCH_ONE2ONE_PLANS,
  CORPORATE_WHY,
  priceForGroupPlan,
  clp,
} from "../data/lsch.js";

// --- ASSETS ---
import senasImg from "../assets/img/lael/senas.jpg"; 

const CERTIFICATE_FEE = 19990;

/* ==========================================================================
   ESTILOS CSS (DARK MODE PREMIUM + MODAL FIX)
   ========================================================================== */
const css = `
:root {
  --bg-deep: #0f172a;       
  --bg-panel: #1e293b;      
  --primary: #2dd4bf;       
  --primary-dark: #14b8a6;  
  --accent: #38bdf8;        
  --text-main: #f1f5f9;     
  --text-muted: #94a3b8;    
  --gold: #fbbf24;
  --border: rgba(255, 255, 255, 0.1);
  --shadow-glow: 0 0 40px -10px rgba(45, 212, 191, 0.3);
  --radius: 20px;
}

.lsch-page {
  background-color: var(--bg-deep);
  color: var(--text-main);
  font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
  min-height: 100vh;
  padding-bottom: 140px;
  overflow-x: hidden;
  position: relative;
}

.container { max-width: 1100px; margin: 0 auto; padding: 0 24px; }
button { all: unset; cursor: pointer; box-sizing: border-box; }

/* ANIMACIONES */
@keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

/* --- NUEVO: ESTILOS DEL MODAL OVERLAY --- */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(15, 23, 42, 0.75); /* Fondo oscuro transparente */
  backdrop-filter: blur(8px); /* Efecto Blur */
  z-index: 10000; /* Encima de TODO */
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  animation: fadeIn 0.3s ease-out;
}

/* HERO SECTION */
.hero {
  position: relative;
  padding: 140px 0 80px;
  border-bottom: 1px solid var(--border);
  background: radial-gradient(circle at top right, #112a38 0%, transparent 40%);
}
.hero-grid { display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 60px; align-items: center; }

.badge-glow {
  display: inline-flex; align-items: center; gap: 8px;
  background: rgba(45, 212, 191, 0.1); border: 1px solid rgba(45, 212, 191, 0.3);
  color: var(--primary); padding: 8px 16px; border-radius: 50px;
  font-weight: 700; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 1px;
  margin-bottom: 24px;
}

.hero h1 {
  font-size: clamp(2.5rem, 5vw, 4rem);
  line-height: 1.1; margin-bottom: 24px; font-weight: 800;
}
.text-gradient {
  background: linear-gradient(to right, #fff, var(--primary));
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
}

.hero p {
  font-size: 1.15rem; color: var(--text-muted); line-height: 1.7;
  max-width: 540px; margin-bottom: 40px;
}

.hero-stats {
  display: flex; gap: 40px; padding: 20px 0; border-top: 1px solid var(--border);
}
.stat-item strong { display: block; font-size: 1.8rem; color: white; font-weight: 800; }
.stat-item span { font-size: 0.85rem; color: var(--primary); text-transform: uppercase; font-weight: 700; }

/* HERO IMAGE */
.img-wrapper {
  position: relative; padding: 15px; border-radius: 30px;
  background: linear-gradient(135deg, rgba(255,255,255,0.1), transparent);
  box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5);
}
.img-wrapper img {
  width: 100%; border-radius: 20px; display: block;
  filter: grayscale(0.2) contrast(1.1);
}
.floating-card {
  position: absolute; bottom: 30px; left: -20px;
  background: rgba(15, 23, 42, 0.9); backdrop-filter: blur(12px);
  border: 1px solid var(--border); padding: 16px 24px; border-radius: 16px;
  display: flex; align-items: center; gap: 16px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.4);
  animation: float 6s ease-in-out infinite;
}

/* STEPS & BUILDER */
.builder-section { padding: 80px 0; }
.builder-grid { display: grid; grid-template-columns: 1.4fr 1fr; gap: 40px; align-items: start; }

.step-box {
  background: var(--bg-panel); border: 1px solid var(--border);
  border-radius: var(--radius); padding: 32px; margin-bottom: 24px;
}
.step-header { display: flex; align-items: center; gap: 12px; margin-bottom: 24px; }
.step-num {
  background: var(--primary); color: #000; width: 32px; height: 32px;
  border-radius: 50%; display: flex; align-items: center; justify-content: center;
  font-weight: 800; font-size: 1rem;
}
.step-header h3 { font-size: 1.25rem; font-weight: 700; margin: 0; color: white; }

/* UI COMPONENTS */
.option-btn {
  width: 100%; display: flex; align-items: center; justify-content: space-between;
  padding: 20px; border: 2px solid var(--border); border-radius: 16px;
  background: rgba(0,0,0,0.2); transition: all 0.2s; margin-bottom: 12px;
}
.option-btn:hover { border-color: var(--text-muted); background: rgba(255,255,255,0.03); }
.option-btn.active {
  border-color: var(--primary); background: rgba(45, 212, 191, 0.05);
  box-shadow: 0 0 20px rgba(45, 212, 191, 0.1);
}
.option-content h4 { margin: 0; font-size: 1rem; color: white; }
.option-content p { margin: 4px 0 0; font-size: 0.85rem; color: var(--text-muted); }

/* Switch Toggle Visual */
.toggle-switch {
  width: 48px; height: 26px; background: #334155; border-radius: 50px;
  position: relative; transition: 0.3s;
}
.toggle-switch::after {
  content: ''; position: absolute; top: 3px; left: 3px; width: 20px; height: 20px;
  background: white; border-radius: 50%; transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.option-btn.active .toggle-switch { background: var(--primary); }
.option-btn.active .toggle-switch::after { transform: translateX(22px); }

/* STICKY SUMMARY */
.summary-panel {
  position: sticky; top: 30px;
  background: rgba(30, 41, 59, 0.8); backdrop-filter: blur(20px);
  border: 1px solid var(--border); border-radius: var(--radius); padding: 32px;
  box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5);
}
.sum-row { display: flex; justify-content: space-between; margin-bottom: 14px; font-size: 0.95rem; color: var(--text-muted); }
.sum-row strong { color: white; }
.sum-divider { height: 1px; background: var(--border); margin: 20px 0; }

.price-box { text-align: right; margin-bottom: 24px; }
.price-box .lbl { font-size: 0.8rem; text-transform: uppercase; color: var(--text-muted); letter-spacing: 1px; }
.price-box .val { font-size: 2.5rem; font-weight: 800; color: white; line-height: 1; }
.price-box .detail { font-size: 0.9rem; color: var(--primary); margin-top: 5px; }

.main-btn {
  background: var(--primary); color: #0f172a; width: 100%;
  padding: 18px; border-radius: 14px; font-weight: 800; font-size: 1.1rem;
  display: flex; justify-content: center; align-items: center; gap: 10px;
  transition: 0.3s; box-shadow: 0 10px 20px -5px rgba(45, 212, 191, 0.4);
}
.main-btn:hover { background: #5eead4; transform: translateY(-2px); box-shadow: 0 15px 30px -5px rgba(45, 212, 191, 0.6); }

/* MOBILE BAR */
.mobile-sticky {
  position: fixed; bottom: 0; left: 0; width: 100%; background: #0f172a;
  border-top: 1px solid var(--border); padding: 16px 24px; z-index: 100;
  display: flex; justify-content: space-between; align-items: center;
  box-shadow: 0 -10px 30px rgba(0,0,0,0.3);
}

@media (max-width: 900px) {
  .hero-grid, .builder-grid { grid-template-columns: 1fr; }
  .img-wrapper { display: none; }
  .summary-panel { display: none; } /* Se usa la barra móvil */
  .hero { text-align: center; padding-top: 120px; }
  .hero-stats { justify-content: center; }
  .hero p { margin: 0 auto 40px; }
}
@media (min-width: 901px) { .mobile-sticky { display: none; } }
`;

export default function LSCh() {
  const [church, setChurch] = useState(false);
  const [selectedGroupId, setSelectedGroupId] = useState("g-quarter"); 
  const [selectedOneId, setSelectedOneId] = useState(null);
  const [selectedModules, setSelectedModules] = useState(["nivel-1"]);
  const [certSelected, setCertSelected] = useState(false);
  const [showModal, setShowModal] = useState(false);
  
  const pricingRef = useRef(null);
  const location = useLocation();

  // Scroll top al montar
  useEffect(() => { window.scrollTo(0, 0); }, [location.pathname]);

  // --- LÓGICA DE NEGOCIO ---
  const groupPlan = useMemo(() => 
    LSCH_GROUP_PLANS.find(p => p.id === selectedGroupId) || LSCH_GROUP_PLANS[0], 
  [selectedGroupId]);

  const onePlan = useMemo(() => 
    LSCH_ONE2ONE_PLANS.find(p => p.id === selectedOneId), 
  [selectedOneId]);
  
  // Calcular precios
  const monthlyGroup = priceForGroupPlan(groupPlan, { church });
  const monthlyOne = onePlan?.monthly || 0;
  const totalMonthly = monthlyGroup + monthlyOne;
  
  const isEnrollmentWaived = groupPlan.id === "g-quarter" || church;
  const enrollmentCost = isEnrollmentWaived ? 0 : LSCH_ENROLLMENT_FEE;
  
  const totalFirstPayment = totalMonthly + enrollmentCost + (certSelected ? CERTIFICATE_FEE : 0);

  const toggleModule = (id) => {
    setSelectedModules(prev => prev.includes(id) && prev.length > 1 
      ? prev.filter(x => x !== id) 
      : [...prev, id].includes(id) ? prev : [...prev, id]
    );
  };

  const getSelectedDetails = () => {
    let details = `Plan LSCh: ${groupPlan.title} (${church ? "Convenio Iglesia" : "General"})`;
    if (certSelected) details += " + Certificado";
    if (onePlan) details += ` + Refuerzo 1:1 (${onePlan.title})`;
    details += ` | Pago Hoy: ${clp(totalFirstPayment)} | Mensualidad futura: ${clp(totalMonthly)}`;
    return details;
  };

  return (
    <div className="lsch-page">
      <style>{css}</style>
      <SEOHead title="Curso LSCh | Lenguaje de Señas Chileno" description="Aprende con docentes sordas nativas. Clases en vivo 100% prácticas." />

      {/* 1. HERO SECTION */}
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <div className="badge-glow"><Star size={14} fill="currentColor"/> Admisión 2026</div>
            <h1>
              Rompe el Silencio.<br/>
              <span className="text-gradient">Conecta sin Límites.</span>
            </h1>
            <p>
              Aprende Lengua de Señas Chilena (LSCh) con <strong>docentes sordas nativas</strong>. 
              Un programa inmersivo, cultural y certificado diseñado para la comunicación real.
            </p>
            
            <div className="hero-stats">
              <div className="stat-item"><strong>100%</strong><span>En Vivo</span></div>
              <div className="stat-item"><strong>A1-B1</strong><span>Niveles</span></div>
              <div className="stat-item"><strong>24/7</strong><span>Aula Virtual</span></div>
            </div>

            <button onClick={() => pricingRef.current?.scrollIntoView({behavior:'smooth'})} className="main-btn" style={{width:'auto', padding:'16px 40px'}}>
               Ver Planes y Precios <ChevronRight size={20}/>
            </button>
          </div>

          <div className="img-wrapper">
             <img src={senasImg} alt="Clase LSCh Online" />
             <div className="floating-card">
                <div style={{background:'rgba(45, 212, 191, 0.2)', padding:10, borderRadius:12, color:'var(--primary)'}}>
                   <Hand size={24} />
                </div>
                <div>
                   <strong style={{color:'white', display:'block'}}>Docentes Nativas</strong>
                   <span style={{color:'var(--text-muted)', fontSize:'0.8rem'}}>Inmersión Cultural Real</span>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* 2. CORPORATE TRUST BAR */}
      <div className="container" style={{marginTop:'-40px', position:'relative', zIndex:5, marginBottom:60}}>
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(280px, 1fr))', gap:20}}>
            {(CORPORATE_WHY || []).map((item, i) => (
               <div key={i} style={{background:'#1e293b', border:'1px solid var(--border)', padding:24, borderRadius:16, display:'flex', gap:15}}>
                  <div style={{color:'var(--primary)'}}>
                     {i === 0 ? <Briefcase/> : i === 1 ? <Users/> : <Award/>}
                  </div>
                  <div>
                     <h4 style={{color:'white', margin:'0 0 5px', fontSize:'1rem'}}>{item.title}</h4>
                     <p style={{color:'var(--text-muted)', margin:0, fontSize:'0.85rem', lineHeight:1.4}}>{item.desc}</p>
                  </div>
               </div>
            ))}
        </div>
      </div>

      {/* 3. CONFIGURADOR */}
      <section ref={pricingRef} className="builder-section container">
         <div className="builder-grid">
            <div>
               {/* STEP 1 */}
               <div className="step-box">
                  <div className="step-header">
                     <div className="step-num">1</div>
                     <h3>Tu Perfil de Estudiante</h3>
                  </div>
                  <button className={`option-btn ${!church ? 'active' : ''}`} onClick={() => setChurch(false)}>
                     <div className="option-content">
                        <h4>Estudiante General</h4>
                        <p>Para profesionales, salud, educación y público general.</p>
                     </div>
                     <div className="toggle-switch"></div>
                  </button>
                  <button className={`option-btn ${church ? 'active' : ''}`} onClick={() => setChurch(true)}>
                     <div className="option-content">
                        <h4 style={{display:'flex', alignItems:'center', gap:8}}><Heart size={16} fill="#fbbf24" color="#fbbf24"/> Convenio Iglesia / Fundación</h4>
                        <p>Tarifas preferenciales para voluntariado y ministerios.</p>
                     </div>
                     <div className="toggle-switch"></div>
                  </button>
               </div>

               {/* STEP 2 */}
               <div className="step-box">
                  <div className="step-header">
                     <div className="step-num">2</div>
                     <h3>Ruta de Aprendizaje</h3>
                  </div>
                  <div style={{display:'flex', flexDirection:'column', gap:10}}>
                     {LSCH_MODULES.map((m) => {
                        const active = selectedModules.includes(m.id);
                        return (
                           <button 
                              key={m.id} 
                              onClick={() => toggleModule(m.id)}
                              style={{
                                 display:'flex', gap:15, padding:15, borderRadius:12,
                                 background: active ? 'rgba(45, 212, 191, 0.05)' : 'transparent',
                                 border: active ? '1px solid var(--primary)' : '1px solid transparent',
                                 transition: '0.2s'
                              }}
                           >
                              <div style={{
                                 width:24, height:24, borderRadius:'50%', border:'2px solid var(--text-muted)',
                                 background: active ? 'var(--primary)' : 'transparent',
                                 borderColor: active ? 'var(--primary)' : 'var(--text-muted)',
                                 display:'flex', alignItems:'center', justifyContent:'center'
                              }}>
                                 {active && <Check size={14} color="#000" strokeWidth={4}/>}
                              </div>
                              <div style={{textAlign:'left'}}>
                                 <strong style={{color: active ? 'white' : 'var(--text-muted)', display:'block'}}>{m.name}</strong>
                                 <span style={{fontSize:'0.8rem', color:'var(--text-muted)'}}>{m.summary}</span>
                              </div>
                           </button>
                        )
                     })}
                  </div>
               </div>

               {/* STEP 3 */}
               <div className="step-box">
                  <div className="step-header">
                     <div className="step-num">3</div>
                     <h3>Plan de Pago</h3>
                  </div>
                  <div style={{display:'grid', gap:12}}>
                     {LSCH_GROUP_PLANS.map(p => {
                        const isSelected = selectedGroupId === p.id;
                        const price = priceForGroupPlan(p, { church });
                        return (
                           <button 
                              key={p.id}
                              onClick={() => setSelectedGroupId(p.id)}
                              className={`option-btn ${isSelected ? 'active' : ''}`}
                              style={{display:'block', position:'relative', overflow:'hidden'}}
                           >
                              {p.badge && (
                                 <div style={{
                                    position:'absolute', top:0, right:0, background:'var(--gold)', 
                                    color:'black', fontSize:'0.7rem', fontWeight:800, padding:'4px 8px',
                                    borderBottomLeftRadius:8
                                 }}>
                                    {p.badge}
                                 </div>
                              )}
                              <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                                 <div className="option-content">
                                    <h4>{p.title}</h4>
                                    <p>{p.desc}</p>
                                 </div>
                                 <div style={{textAlign:'right'}}>
                                    <span style={{fontSize:'1.2rem', fontWeight:800, color:'white'}}>{clp(price)}</span>
                                    <span style={{display:'block', fontSize:'0.75rem', color:'var(--text-muted)'}}>/mes</span>
                                 </div>
                              </div>
                           </button>
                        )
                     })}
                  </div>
               </div>

               {/* STEP 4 */}
               <div className="step-box">
                  <div className="step-header">
                     <div className="step-num">4</div>
                     <h3>Opcionales</h3>
                  </div>
                  <button className={`option-btn ${certSelected ? 'active' : ''}`} onClick={() => setCertSelected(!certSelected)}>
                     <div className="option-content" style={{display:'flex', gap:12, alignItems:'center'}}>
                        <Award size={24} className={certSelected ? "text-yellow-400" : "text-gray-500"} />
                        <div>
                           <h4>Certificación Digital</h4>
                           <p>Diploma verificable al finalizar y aprobar.</p>
                        </div>
                     </div>
                     <span style={{color:'var(--primary)', fontWeight:700}}>+{clp(CERTIFICATE_FEE)}</span>
                  </button>
                  <div style={{marginTop:20, padding:20, background:'rgba(0,0,0,0.2)', borderRadius:16}}>
                     <h4 style={{color:'white', marginBottom:10, fontSize:'0.95rem', display:'flex', gap:8, alignItems:'center'}}>
                        <Zap size={16} color="#38bdf8"/> Refuerzo Personalizado 1:1
                     </h4>
                     <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:10}}>
                        {LSCH_ONE2ONE_PLANS.map(p => {
                           const isActive = selectedOneId === p.id;
                           return (
                              <button 
                                 key={p.id}
                                 onClick={() => setSelectedOneId(isActive ? null : p.id)}
                                 style={{
                                    padding:12, border:'1px solid', borderRadius:10, textAlign:'center',
                                    borderColor: isActive ? 'var(--accent)' : 'var(--border)',
                                    background: isActive ? 'rgba(56, 189, 248, 0.1)' : 'transparent',
                                    color: isActive ? 'white' : 'var(--text-muted)',
                                    transition: '0.2s'
                                 }}
                              >
                                 <div style={{fontSize:'0.85rem', fontWeight:700}}>{p.title}</div>
                                 <div style={{fontSize:'0.75rem'}}>+{clp(p.monthly)}/mes</div>
                              </button>
                           )
                        })}
                     </div>
                  </div>
               </div>
            </div>

            {/* DERECHA: RESUMEN STICKY */}
            <div className="summary-panel">
               <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20}}>
                  <h3 style={{margin:0, color:'white', fontWeight:800}}>Resumen</h3>
                  <div style={{display:'flex', gap:5, alignItems:'center', fontSize:'0.8rem', color:'var(--primary)'}}>
                     <ShieldCheck size={14}/> Garantía
                  </div>
               </div>

               <div className="sum-row"><span>Plan Seleccionado</span><strong>{groupPlan.title}</strong></div>
               <div className="sum-row"><span>Mensualidad Base</span><strong>{clp(monthlyGroup)}</strong></div>
               {church && <div className="sum-row" style={{color:'var(--gold)'}}><span><Heart size={12} style={{display:'inline'}}/> Beneficio Iglesia</span><strong>Aplicado</strong></div>}
               {selectedOneId && <div className="sum-row" style={{color:'var(--accent)'}}><span>Refuerzo 1:1</span><strong>+{clp(monthlyOne)}</strong></div>}
               <div className="sum-divider"></div>
               <div className="sum-row"><span>Matrícula 2026</span>{isEnrollmentWaived ? <strong style={{color:'var(--primary)'}}>GRATIS ($0)</strong> : <strong>{clp(LSCH_ENROLLMENT_FEE)}</strong>}</div>
               {certSelected && <div className="sum-row"><span>Certificado</span><strong>{clp(CERTIFICATE_FEE)}</strong></div>}

               <div className="price-box" style={{marginTop:30}}>
                  <div className="lbl">Total a pagar hoy</div>
                  <div className="val">{clp(totalFirstPayment)}</div>
                  <div className="detail">{monthlyOne > 0 ? `Luego ${clp(monthlyGroup + monthlyOne)} mensualmente` : `Luego ${clp(monthlyGroup)} mensualmente`}</div>
               </div>
               <button onClick={() => setShowModal(true)} className="main-btn">Inscribirme Ahora <CreditCard size={20}/></button>
               <p style={{textAlign:'center', fontSize:'0.75rem', color:'var(--text-muted)', marginTop:15, lineHeight:1.4}}>Acceso inmediato al aula virtual tras la confirmación.</p>
            </div>
         </div>
      </section>

      {/* MOBILE STICKY BAR */}
      <div className="mobile-sticky">
         <div>
            <div style={{fontSize:'0.7rem', textTransform:'uppercase', color:'var(--text-muted)'}}>Total Hoy</div>
            <div style={{fontSize:'1.4rem', fontWeight:800, color:'white'}}>{clp(totalFirstPayment)}</div>
         </div>
         <button onClick={() => setShowModal(true)} className="main-btn" style={{width:'auto', padding:'10px 24px', fontSize:'0.9rem'}}>Inscribirme</button>
      </div>

      {/* MODAL CON OVERLAY CORREGIDO */}
      {showModal && (
        <div className="modal-overlay">
          {/* El overlay se encarga de centrarlo y poner el fondo blur */}
          <EnrollmentForm 
            planTitle={`LSCh: ${groupPlan.title}`}
            price={clp(totalFirstPayment)}
            selectedDetails={getSelectedDetails()}
            onClose={() => setShowModal(false)}
          />
        </div>
      )}

    </div>
  );
}