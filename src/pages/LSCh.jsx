import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { 
  LSCH_MODULES, 
  LSCH_GROUP_PLANS, 
  calculateLschPrice, 
  clp 
} from '../data/lsch';
import EnrollmentForm from '../components/EnrollmentForm'; 
import { 
  Hand, Check, Star, ShieldCheck, ArrowRight, Church, Menu, X, Heart 
} from 'lucide-react';

/* ──────────────────────────────────────────────────────────────────────────
   ESTILOS CSS (DISEÑO DARK PREMIUM AUTOCONTENIDO)
   ────────────────────────────────────────────────────────────────────────── */
const css = `
:root {
  --bg-dark: #020617;       /* Slate 950 */
  --bg-card: #0f172a;       /* Slate 900 */
  --bg-card-hover: #1e293b; /* Slate 800 */
  --primary: #06b6d4;       /* Cyan 500 */
  --primary-glow: rgba(6, 182, 212, 0.4);
  --gold: #f59e0b;          /* Amber 500 */
  --gold-glow: rgba(245, 158, 11, 0.3);
  --text-main: #f8fafc;
  --text-muted: #94a3b8;
  --border: rgba(255, 255, 255, 0.08);
}

.ls-page {
  background-color: var(--bg-dark);
  color: var(--text-main);
  font-family: 'Inter', sans-serif;
  min-height: 100vh;
  padding-bottom: 120px; /* Espacio para barra móvil */
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

/* HERO SECTION */
.hero {
  position: relative;
  padding: 100px 0 60px;
  text-align: center;
  overflow: hidden;
}
.hero-glow {
  position: absolute; top: -50%; left: 50%; transform: translateX(-50%);
  width: 100%; height: 600px;
  background: radial-gradient(circle, var(--primary-glow) 0%, transparent 70%);
  opacity: 0.2; pointer-events: none;
}
.badge-top {
  display: inline-flex; align-items: center; gap: 8px;
  background: rgba(6, 182, 212, 0.1);
  border: 1px solid rgba(6, 182, 212, 0.3);
  color: var(--primary);
  padding: 6px 16px; border-radius: 50px;
  font-size: 0.85rem; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;
  margin-bottom: 24px;
}
.hero-title {
  font-size: clamp(2.5rem, 5vw, 4.5rem);
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 24px;
}
.gradient-text {
  background: linear-gradient(to right, #22d3ee, #2dd4bf);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.hero-desc {
  font-size: 1.2rem; color: var(--text-muted); max-width: 600px; margin: 0 auto 40px;
  line-height: 1.6;
}

/* LAYOUT GRID */
.main-grid {
  display: grid;
  grid-template-columns: 1fr 380px; /* Contenido | Sidebar */
  gap: 40px;
  align-items: start;
}

/* CARDS GENERICA */
.card-box {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 24px;
  transition: all 0.3s ease;
}

/* SELECTOR DE MODULOS */
.module-list { display: flex; flex-direction: column; gap: 16px; }
.module-card {
  display: flex; align-items: flex-start; gap: 20px;
  background: rgba(30, 41, 59, 0.4);
  border: 1px solid var(--border);
  border-radius: 16px; padding: 24px;
  cursor: pointer; position: relative;
  transition: all 0.2s ease;
}
.module-card:hover { border-color: rgba(255,255,255,0.2); background: var(--bg-card-hover); }
.module-card.active {
  background: rgba(6, 182, 212, 0.05);
  border-color: var(--primary);
  box-shadow: 0 0 20px -5px var(--primary-glow);
}
.module-icon {
  width: 50px; height: 50px; background: rgba(255,255,255,0.05);
  border-radius: 12px; display: flex; align-items: center; justify-content: center;
  font-size: 1.5rem; flex-shrink: 0;
}
.module-card.active .module-icon { background: var(--primary); color: #000; }
.check-icon { position: absolute; top: 20px; right: 20px; color: var(--primary); }

/* PILLS / ETIQUETAS */
.outcomes-row { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 12px; }
.pill {
  font-size: 0.75rem; background: rgba(0,0,0,0.3); color: var(--text-muted);
  padding: 4px 10px; border-radius: 6px; border: 1px solid var(--border);
}

/* MODO IGLESIA (SWITCH) */
.church-section {
  background: linear-gradient(135deg, rgba(245, 158, 11, 0.1), transparent);
  border: 1px solid rgba(245, 158, 11, 0.3);
  margin: 40px 0;
  display: flex; justify-content: space-between; align-items: center;
}
.church-info h4 { color: #fff; margin: 0 0 4px 0; font-size: 1.1rem; }
.church-info p { color: var(--gold); margin: 0; font-size: 0.9rem; }

/* SWITCH TOGGLE */
.switch {
  position: relative; display: inline-block; width: 56px; height: 30px;
}
.switch input { opacity: 0; width: 0; height: 0; }
.slider {
  position: absolute; cursor: pointer; inset: 0;
  background-color: #334155; border-radius: 34px; transition: .4s;
}
.slider:before {
  position: absolute; content: ""; height: 22px; width: 22px;
  left: 4px; bottom: 4px; background-color: white; border-radius: 50%; transition: .4s;
}
input:checked + .slider { background-color: var(--gold); }
input:checked + .slider:before { transform: translateX(26px); }

/* PLAN SELECTOR */
.plans-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.plan-card {
  position: relative; text-align: left;
  background: rgba(30, 41, 59, 0.4); border: 2px solid var(--border);
  padding: 24px; border-radius: 16px; cursor: pointer; transition: 0.2s;
}
.plan-card:hover { border-color: rgba(255,255,255,0.3); }
.plan-card.active { border-color: var(--primary); background: rgba(6, 182, 212, 0.05); }
.plan-card.active.church-active { border-color: var(--gold); background: rgba(245, 158, 11, 0.05); }

.price-tag { font-size: 1.8rem; font-weight: 800; color: white; display: block; margin: 10px 0; }
.plan-feature { display: flex; align-items: center; gap: 8px; font-size: 0.85rem; color: var(--text-muted); margin-bottom: 6px; }

/* STICKY SIDEBAR */
.sidebar-wrapper { position: sticky; top: 40px; }
.summary-card {
  background: rgba(15, 23, 42, 0.9);
  backdrop-filter: blur(10px);
  box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5);
  border: 1px solid var(--border);
}
.sum-row { display: flex; justify-content: space-between; margin-bottom: 12px; font-size: 0.9rem; color: var(--text-muted); }
.sum-row strong { color: #fff; }
.sum-total {
  border-top: 1px solid var(--border);
  margin-top: 16px; padding-top: 16px;
  display: flex; justify-content: space-between; align-items: center;
}
.total-price { font-size: 1.5rem; font-weight: 800; color: white; }

/* BOTONES */
.btn-main {
  width: 100%;
  background: linear-gradient(to right, #0891b2, #0d9488);
  color: white; border: none; padding: 16px;
  font-weight: 700; font-size: 1rem; border-radius: 12px;
  cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 10px;
  transition: transform 0.1s, box-shadow 0.2s;
  box-shadow: 0 0 20px -5px var(--primary-glow);
}
.btn-main:hover { transform: translateY(-2px); filter: brightness(1.1); }
.btn-main:active { transform: scale(0.98); }

.btn-sec {
  width: 100%; background: transparent;
  color: var(--text-muted); border: 1px solid var(--border);
  padding: 12px; margin-top: 12px; border-radius: 12px;
  cursor: pointer; font-weight: 500; transition: 0.2s;
}
.btn-sec:hover { color: white; border-color: rgba(255,255,255,0.3); }

/* MOBILE BAR */
.mobile-bar {
  display: none;
  position: fixed; bottom: 0; left: 0; right: 0;
  background: rgba(2, 6, 23, 0.95);
  backdrop-filter: blur(10px);
  border-top: 1px solid var(--border);
  padding: 16px 24px; z-index: 100;
  align-items: center; justify-content: space-between;
}

/* RESPONSIVE */
@media (max-width: 900px) {
  .main-grid { grid-template-columns: 1fr; }
  .sidebar-wrapper { display: none; } /* Ocultamos el sidebar en móvil porque usamos la barra inferior */
  .mobile-bar { display: flex; }
  .plans-grid { grid-template-columns: 1fr; }
  .hero-title { font-size: 2.5rem; }
}
`;

/* ──────────────────────────────────────────────────────────────────────────
   COMPONENTE PRINCIPAL
   ────────────────────────────────────────────────────────────────────────── */
const LSCh = () => {
  const { addToCart } = useCart();
  
  // --- ESTADOS ---
  const [selectedModuleId, setSelectedModuleId] = useState(LSCH_MODULES[0].id);
  const [selectedPlanId, setSelectedPlanId] = useState(LSCH_GROUP_PLANS[1].id); 
  const [isChurchMode, setIsChurchMode] = useState(false);
  const [showEnrollment, setShowEnrollment] = useState(false);

  // --- LÓGICA DE CÁLCULO ---
  // Calcula precios usando tu archivo data/lsch.js
  const calculation = calculateLschPrice(selectedPlanId, isChurchMode);
  const selectedModule = LSCH_MODULES.find(m => m.id === selectedModuleId);
  const selectedPlan = LSCH_GROUP_PLANS.find(p => p.id === selectedPlanId);

  // Total a pagar hoy
  const totalPayNow = calculation.price + calculation.enrollment;

  // --- HANDLERS ---
  const handleAddToCart = () => {
    addToCart({
      id: `lsch-${selectedModuleId}-${isChurchMode ? 'church' : selectedPlanId}`,
      name: `LSCh ${selectedModule.tag}`,
      price: totalPayNow,
      category: 'Idiomas',
      details: [
        `Nivel: ${selectedModule.name}`,
        `Plan: ${calculation.label}`,
        isChurchMode ? 'Cupo Iglesia' : 'General'
      ]
    });
  };

  return (
    <div className="ls-page">
      <style>{css}</style>
      
      {/* MODAL DE PAGO (Solo aparece si showEnrollment es true) */}
      {showEnrollment && (
        <EnrollmentForm 
          planTitle={`Curso LSCh - ${selectedModule.name}`}
          price={clp(totalPayNow)}
          selectedDetails={`${calculation.label} | ${isChurchMode ? 'Descuento Iglesia' : 'Precio Estándar'}`}
          onClose={() => setShowEnrollment(false)}
        />
      )}

      {/* 1. HERO HEADER */}
      <div className="hero">
        <div className="hero-glow"></div>
        <div className="container" style={{position:'relative', zIndex:2}}>
          <div className="badge-top">
            <Hand size={16} /> Admisión 2026
          </div>
          <h1 className="hero-title">
            Rompe la barrera<br/>
            <span className="gradient-text">del sonido.</span>
          </h1>
          <p className="hero-desc">
            Aprende Lengua de Señas Chilena con docentes nativos. 
            Metodología visual, práctica y certificada.
          </p>
        </div>
      </div>

      <div className="container main-grid">
        
        {/* --- COLUMNA IZQUIERDA (CONFIGURADOR) --- */}
        <div style={{display:'flex', flexDirection:'column', gap:'40px'}}>
          
          {/* SELECCIÓN DE NIVEL */}
          <section>
            <h3 style={{marginBottom:20, fontSize:'1.2rem', fontWeight:700}}>1. Elige tu Nivel</h3>
            <div className="module-list">
              {LSCH_MODULES.map((module) => {
                const isActive = selectedModuleId === module.id;
                return (
                  <div 
                    key={module.id} 
                    onClick={() => setSelectedModuleId(module.id)}
                    className={`module-card ${isActive ? 'active' : ''}`}
                  >
                    <div className="module-icon">{module.icon}</div>
                    <div style={{flex:1}}>
                       <h4 style={{margin:'0 0 5px 0', fontSize:'1.1rem', fontWeight:700, color: isActive ? 'white' : '#cbd5e1'}}>
                         {module.name}
                       </h4>
                       <span style={{fontSize:'0.85rem', color: 'var(--primary)', fontWeight:600}}>
                         {module.tag}
                       </span>
                       <p style={{fontSize:'0.9rem', color: 'var(--text-muted)', lineHeight:1.5, margin:'8px 0'}}>
                         {module.desc}
                       </p>
                       <div className="outcomes-row">
                         {module.outcomes.map((out, i) => (
                           <span key={i} className="pill">{out}</span>
                         ))}
                       </div>
                    </div>
                    {isActive && <div className="check-icon"><Check size={24} strokeWidth={3}/></div>}
                  </div>
                )
              })}
            </div>
          </section>

          {/* MODO IGLESIA */}
          <section className="card-box church-section">
            <div className="church-info">
              <div style={{display:'flex', alignItems:'center', gap:10}}>
                <div style={{padding:8, background:'rgba(245, 158, 11, 0.2)', borderRadius:8, color:'var(--gold)'}}>
                  <Church size={20}/>
                </div>
                <h4>Convenio Iglesias y Ministerios</h4>
              </div>
              <p style={{marginTop:8, opacity:0.8}}>Activa la tarifa social si eres intérprete o líder.</p>
            </div>
            <label className="switch">
              <input type="checkbox" checked={isChurchMode} onChange={() => setIsChurchMode(!isChurchMode)}/>
              <span className="slider"></span>
            </label>
          </section>

          {/* SELECCIÓN DE PLAN (Oculto si es Iglesia) */}
          {!isChurchMode && (
            <section className="animate-fade">
              <h3 style={{marginBottom:20, fontSize:'1.2rem', fontWeight:700}}>2. Elige tu Plan de Pago</h3>
              <div className="plans-grid">
                {LSCH_GROUP_PLANS.map((plan) => {
                  const isActive = selectedPlanId === plan.id;
                  const isRec = plan.highlight;
                  
                  return (
                    <div 
                      key={plan.id}
                      onClick={() => setSelectedPlanId(plan.id)}
                      className={`plan-card ${isActive ? 'active' : ''}`}
                    >
                      {isRec && <div style={{position:'absolute', top:-10, right:20, background:'var(--primary)', color:'black', fontSize:'0.7rem', fontWeight:800, padding:'4px 10px', borderRadius:20, textTransform:'uppercase'}}>Recomendado</div>}
                      
                      <h4 style={{margin:0, color:'white'}}>{plan.title}</h4>
                      <span className="price-tag">{clp(plan.price)}</span>
                      
                      <div style={{marginTop:15}}>
                        {plan.features.map((feat, i) => (
                          <div key={i} className="plan-feature">
                            <Star size={12} color="var(--primary)"/> {feat}
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            </section>
          )}
        </div>

        {/* --- COLUMNA DERECHA (SIDEBAR RESUMEN) --- */}
        <div className="sidebar-wrapper">
          <div className="card-box summary-card">
            <h4 style={{textTransform:'uppercase', fontSize:'0.75rem', letterSpacing:1, color:'var(--text-muted)', marginBottom:20}}>
              Resumen de Inscripción
            </h4>

            {/* Item seleccionado */}
            <div style={{display:'flex', gap:12, marginBottom:20, paddingBottom:20, borderBottom:'1px solid var(--border)'}}>
               <div style={{width:40, height:40, background:'#334155', borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.2rem'}}>
                 {selectedModule.icon}
               </div>
               <div>
                 <div style={{fontWeight:700, fontSize:'0.9rem'}}>{selectedModule.name}</div>
                 <div style={{fontSize:'0.8rem', color:'var(--primary)'}}>{selectedModule.duration}</div>
               </div>
            </div>

            <div className="sum-row">
              <span>Mensualidad</span>
              <strong>{clp(calculation.price)}</strong>
            </div>
            <div className="sum-row">
              <span>Matrícula</span>
              {calculation.enrollment === 0 ? (
                <span style={{color:'#4ade80', fontWeight:700}}>GRATIS</span>
              ) : (
                <strong>{clp(calculation.enrollment)}</strong>
              )}
            </div>
            
            {isChurchMode && (
              <div style={{marginTop:10, padding:10, background:'rgba(245, 158, 11, 0.1)', borderRadius:8, fontSize:'0.8rem', color:'var(--gold)', display:'flex', gap:6}}>
                 <Heart size={14} style={{marginTop:2}}/> Descuento Social Aplicado
              </div>
            )}

            <div className="sum-total">
              <span style={{fontSize:'0.9rem'}}>Total a Pagar</span>
              <span className="total-price">{clp(totalPayNow)}</span>
            </div>

            <div style={{marginTop:24}}>
              <button onClick={() => setShowEnrollment(true)} className="btn-main">
                Inscribirme Ahora <ArrowRight size={18}/>
              </button>
              <button onClick={handleAddToCart} className="btn-sec">
                Agregar al Carrito
              </button>
            </div>

            <div style={{marginTop:20, display:'flex', gap:10, fontSize:'0.75rem', color:'#64748b'}}>
              <ShieldCheck size={32}/>
              <p>Tu inscripción está protegida. Garantía de devolución si no estás satisfecho la primera semana.</p>
            </div>
          </div>
        </div>

      </div>

      {/* BARRA MÓVIL STICKY */}
      <div className="mobile-bar">
        <div>
          <span style={{fontSize:'0.75rem', color:'#94a3b8', display:'block'}}>Total hoy</span>
          <span style={{fontSize:'1.2rem', fontWeight:800, color:'white'}}>{clp(totalPayNow)}</span>
        </div>
        <button onClick={() => setShowEnrollment(true)} style={{
          background: 'var(--primary)', color:'black', border:'none', 
          padding:'10px 24px', borderRadius:50, fontWeight:700
        }}>
          Inscribirse
        </button>
      </div>

    </div>
  );
};

export default LSCh;