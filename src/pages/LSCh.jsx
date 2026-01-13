import React, { useState, useMemo } from 'react';
import { useCart } from '../context/CartContext';
import { 
  LSCH_MODULES, 
  LSCH_GROUP_PLANS, 
  calculateLschPrice, 
  clp 
} from '../data/lsch';
import SEOHead from "../components/SEOHead.jsx";

// Iconos
import { 
  Hand, Check, Star, ShieldCheck, ArrowRight, 
  Church, Sparkles, X, Heart, Loader2, Zap
} from 'lucide-react';

/* ──────────────────────────────────────────────────────────────────────────
   ESTILOS CSS: THEME CYAN & GOLD
   ────────────────────────────────────────────────────────────────────────── */
const css = `
:root {
  --bg-dark: #020617;       /* Slate 950 - Fondo Base */
  --bg-card: #0f172a;       /* Slate 900 - Tarjetas */
  --bg-input: #1e293b;      /* Slate 800 - Inputs */
  
  --primary: #06b6d4;       /* Cyan 500 - Color Principal */
  --primary-glow: rgba(6, 182, 212, 0.5);
  
  --gold: #f59e0b;          /* Amber 500 - Modo Iglesia */
  --gold-glow: rgba(245, 158, 11, 0.4);
  
  --text-main: #f8fafc;
  --text-muted: #94a3b8;
  --border: rgba(255, 255, 255, 0.08);
  
  --radius: 20px;
}

.lsch-page {
  background-color: var(--bg-dark);
  color: var(--text-main);
  font-family: 'Plus Jakarta Sans', 'Inter', sans-serif;
  min-height: 100vh;
  padding-bottom: 140px; /* Espacio extra para barra móvil */
  overflow-x: hidden;
}

.container { max-width: 1200px; margin: 0 auto; padding: 0 24px; position: relative; z-index: 2; }

/* --- 1. HERO CONTEXTUAL --- */
.hero-lsch {
  position: relative;
  padding: 120px 0 80px;
  text-align: center;
  overflow: hidden;
  border-bottom: 1px solid var(--border);
  background: radial-gradient(circle at top, #0f172a 0%, #020617 100%);
}
/* Imagen de fondo sutil (Manos) */
.hero-bg-img {
  position: absolute; top: 0; left: 0; width: 100%; height: 100%;
  background-image: url('https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1932&auto=format&fit=crop');
  background-size: cover; background-position: center;
  opacity: 0.15; filter: grayscale(100%) contrast(1.2); z-index: 0;
  mask-image: linear-gradient(to bottom, black 0%, transparent 90%);
}

.badge-cyan {
  display: inline-flex; align-items: center; gap: 8px;
  background: rgba(6, 182, 212, 0.1); border: 1px solid rgba(6, 182, 212, 0.3);
  color: #22d3ee; padding: 6px 16px; border-radius: 50px;
  font-size: 0.85rem; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;
  margin-bottom: 24px; box-shadow: 0 0 20px rgba(6, 182, 212, 0.2);
  backdrop-filter: blur(5px);
}

.hero-title {
  font-size: clamp(2.5rem, 5vw, 4.5rem); font-weight: 800; line-height: 1.1; margin-bottom: 24px;
  position: relative; z-index: 1;
  text-shadow: 0 10px 30px rgba(0,0,0,0.8);
}
.text-gradient {
  background: linear-gradient(to right, #22d3ee, #67e8f9);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
}

.hero-desc {
  font-size: 1.2rem; color: var(--text-muted); max-width: 600px; margin: 0 auto; line-height: 1.6;
  position: relative; z-index: 1;
}

/* --- 2. GRID PRINCIPAL --- */
.main-grid {
  display: grid; grid-template-columns: 1fr 380px; gap: 50px; align-items: start; margin-top: 60px;
}

/* Títulos de sección */
.section-head { margin-bottom: 20px; display: flex; align-items: center; gap: 12px; }
.step-num { 
  background: var(--bg-input); color: var(--text-muted); width: 30px; height: 30px; 
  border-radius: 50%; display: flex; align-items: center; justifyContent: center; 
  font-weight: 800; font-size: 0.9rem; border: 1px solid var(--border);
}
.step-title { font-size: 1.25rem; font-weight: 700; color: white; margin: 0; }

/* TARJETAS DE MÓDULOS */
.module-grid { display: grid; gap: 16px; }

.module-card {
  display: grid; grid-template-columns: auto 1fr auto; gap: 20px; align-items: center;
  background: var(--bg-card); border: 1px solid var(--border);
  border-radius: 16px; padding: 20px; cursor: pointer; transition: 0.2s ease;
  position: relative; overflow: hidden;
}
.module-card:hover { border-color: rgba(255,255,255,0.2); transform: translateY(-2px); }

.module-card.active {
  background: rgba(6, 182, 212, 0.05); border-color: var(--primary);
  box-shadow: 0 0 30px rgba(6, 182, 212, 0.15) inset;
}

.module-icon {
  width: 56px; height: 56px; background: rgba(255,255,255,0.03); border-radius: 12px;
  display: flex; align-items: center; justify-content: center; font-size: 1.8rem;
  transition: 0.3s; color: var(--text-muted); border: 1px solid var(--border);
}
.module-card.active .module-icon { 
  background: var(--primary); color: #020617; border-color: var(--primary);
  box-shadow: 0 0 15px var(--primary-glow);
}

.module-check {
  width: 24px; height: 24px; border-radius: 50%; border: 2px solid var(--border);
  display: flex; align-items: center; justify-content: center;
}
.module-card.active .module-check { background: var(--primary); border-color: var(--primary); color: black; }

/* TAGS */
.tag-pill {
  font-size: 0.7rem; padding: 4px 10px; border-radius: 6px; 
  background: rgba(255,255,255,0.05); color: var(--text-muted);
  border: 1px solid rgba(255,255,255,0.1);
}

/* --- 3. MODO IGLESIA (SWITCH ESPECIAL) --- */
.church-box {
  margin: 40px 0; padding: 24px; border-radius: 20px;
  background: linear-gradient(135deg, rgba(245, 158, 11, 0.05), transparent);
  border: 1px solid rgba(245, 158, 11, 0.2);
  display: flex; justify-content: space-between; align-items: center;
  transition: 0.3s;
}
.church-box.active {
  background: rgba(245, 158, 11, 0.1); border-color: var(--gold);
  box-shadow: 0 0 40px rgba(245, 158, 11, 0.1);
}
.church-icon {
  background: rgba(245, 158, 11, 0.2); width: 48px; height: 48px;
  display: flex; align-items: center; justify-content: center;
  border-radius: 12px; color: var(--gold); margin-right: 16px;
}

/* Custom Switch */
.switch { position: relative; display: inline-block; width: 60px; height: 32px; }
.switch input { opacity: 0; width: 0; height: 0; }
.slider {
  position: absolute; cursor: pointer; inset: 0; background-color: var(--bg-input);
  border-radius: 34px; transition: .4s; border: 1px solid var(--border);
}
.slider:before {
  position: absolute; content: ""; height: 24px; width: 24px; left: 3px; bottom: 3px;
  background-color: white; border-radius: 50%; transition: .4s;
}
input:checked + .slider { background-color: var(--gold); border-color: var(--gold); }
input:checked + .slider:before { transform: translateX(28px); }

/* --- 4. PLANES (GRID) --- */
.plans-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px; }

.plan-card {
  background: var(--bg-card); border: 2px solid var(--border); border-radius: 16px; padding: 24px;
  cursor: pointer; transition: 0.2s; position: relative;
}
.plan-card:hover { border-color: var(--text-muted); }
.plan-card.active { 
  background: rgba(6, 182, 212, 0.05); border-color: var(--primary); 
}

/* --- 5. SIDEBAR RESUMEN (Glassmorphism) --- */
.sidebar-sticky { position: sticky; top: 40px; }
.summary-card {
  background: rgba(15, 23, 42, 0.8); backdrop-filter: blur(20px);
  border: 1px solid var(--border); border-radius: 24px; padding: 30px;
  box-shadow: 0 25px 50px -12px rgba(0,0,0,0.6);
}
.sum-row { display: flex; justify-content: space-between; margin-bottom: 12px; color: var(--text-muted); font-size: 0.95rem; }
.sum-row strong { color: white; }
.sum-total {
  border-top: 1px solid var(--border); margin-top: 20px; padding-top: 20px;
  display: flex; justify-content: space-between; align-items: center;
}
.total-price { font-size: 2rem; font-weight: 800; color: white; text-shadow: 0 0 20px rgba(255,255,255,0.2); }

/* Botones */
.btn-primary {
  width: 100%; background: var(--primary); color: #020617; border: none; padding: 18px;
  font-weight: 800; font-size: 1.1rem; border-radius: 14px; cursor: pointer;
  box-shadow: 0 4px 20px var(--primary-glow); display: flex; justify-content: center; align-items: center; gap: 10px;
  transition: 0.3s;
}
.btn-primary:hover { transform: translateY(-2px); box-shadow: 0 0 30px var(--primary-glow); background: #22d3ee; }
.btn-secondary {
  width: 100%; background: transparent; color: var(--text-muted); border: 1px solid var(--border);
  padding: 14px; font-weight: 600; border-radius: 14px; margin-top: 12px; cursor: pointer;
  transition: 0.2s;
}
.btn-secondary:hover { border-color: white; color: white; }

/* --- 6. MOBILE STICKY BAR --- */
.mobile-sticky {
  display: none; position: fixed; bottom: 0; left: 0; right: 0;
  background: rgba(2, 6, 23, 0.9); backdrop-filter: blur(16px);
  border-top: 1px solid var(--border); padding: 16px 24px; z-index: 100;
  align-items: center; justify-content: space-between;
  box-shadow: 0 -10px 40px rgba(0,0,0,0.5);
}

/* --- MODAL --- */
.modal-overlay {
  position: fixed; inset: 0; background: rgba(0,0,0,0.85); backdrop-filter: blur(8px);
  z-index: 9999; display: flex; align-items: center; justify-content: center; padding: 20px;
}
.modal-content {
  background: var(--bg-card); width: 100%; max-width: 480px; border-radius: 24px; padding: 32px;
  border: 1px solid var(--border); box-shadow: 0 0 50px rgba(0,0,0,0.8);
}
.input-dark {
  width: 100%; background: var(--bg-input); border: 1px solid var(--border); padding: 16px;
  border-radius: 12px; color: white; margin-bottom: 16px; transition: 0.2s;
}
.input-dark:focus { outline: none; border-color: var(--primary); }

/* RESPONSIVE */
@media (max-width: 900px) {
  .main-grid { grid-template-columns: 1fr; gap: 40px; margin-top: 40px; }
  .sidebar-sticky { display: none; } /* Ocultamos sidebar en móvil */
  .mobile-sticky { display: flex; } /* Mostramos barra inferior */
  .hero-lsch { padding-top: 100px; text-align: center; }
  .hero-title { font-size: 2.8rem; }
  .module-card { grid-template-columns: auto 1fr; }
  .module-check { display: none; } /* Ahorrar espacio en móvil */
}
`;

/* ──────────────────────────────────────────────────────────────────────────
   COMPONENTES INTERNOS
   ────────────────────────────────────────────────────────────────────────── */

// Formulario de Inscripción (Modal)
function EnrollmentForm({ planTitle, price, selectedDetails, onClose }) {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulación de envío
    setTimeout(() => { setLoading(false); setDone(true); }, 1500);
  };

  if (done) return (
    <div className="modal-overlay">
      <div className="modal-content" style={{textAlign:'center'}}>
        <div style={{width:80, height:80, background:'rgba(6, 182, 212, 0.1)', borderRadius:'50%', color:'var(--primary)', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 20px'}}>
          <Sparkles size={40}/>
        </div>
        <h3 style={{fontSize:'1.8rem', color:'white', marginBottom:10}}>¡Solicitud Enviada!</h3>
        <p style={{color:'var(--text-muted)', marginBottom:30}}>Te contactaremos por WhatsApp para finalizar.</p>
        <button onClick={onClose} className="btn-primary">Cerrar</button>
      </div>
    </div>
  );

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div style={{display:'flex', justifyContent:'space-between', marginBottom:24}}>
          <h3 style={{fontSize:'1.5rem', fontWeight:800, color:'white'}}>Inscripción LSCh</h3>
          <button onClick={onClose} style={{background:'none', border:'none', color:'white', cursor:'pointer'}}><X/></button>
        </div>
        
        <div style={{background:'rgba(255,255,255,0.05)', borderRadius:12, padding:16, marginBottom:24}}>
          <div style={{color:'var(--primary)', fontSize:'0.9rem', fontWeight:700}}>{planTitle}</div>
          <div style={{color:'var(--text-muted)', fontSize:'0.85rem'}}>{selectedDetails}</div>
          <div style={{color:'white', fontWeight:800, fontSize:'1.2rem', marginTop:4}}>{price}</div>
        </div>

        <form onSubmit={handleSubmit}>
          <input className="input-dark" placeholder="Nombre Completo" required />
          <input className="input-dark" placeholder="RUT" required />
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12}}>
             <input className="input-dark" placeholder="Email" type="email" required />
             <input className="input-dark" placeholder="WhatsApp (+569)" type="tel" required />
          </div>
          <button disabled={loading} className="btn-primary">
            {loading ? <Loader2 className="animate-spin"/> : 'Confirmar Cupo'}
          </button>
        </form>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   PÁGINA PRINCIPAL
   ────────────────────────────────────────────────────────────────────────── */
export default function LSCh() {
  const { addToCart } = useCart ? useCart() : { addToCart: ()=>{} };
  
  // --- ESTADOS ---
  const [selectedModuleId, setSelectedModuleId] = useState(LSCH_MODULES[0].id);
  const [selectedPlanId, setSelectedPlanId] = useState(LSCH_GROUP_PLANS[1].id); 
  const [isChurchMode, setIsChurchMode] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // --- CÁLCULOS ---
  const selectedModule = LSCH_MODULES.find(m => m.id === selectedModuleId);
  const calculation = calculateLschPrice(selectedPlanId, isChurchMode);
  
  const totalPay = calculation.price + calculation.enrollment;

  // --- HANDLERS ---
  const handleAddToCart = () => {
    addToCart({
      id: `lsch-${selectedModuleId}-${isChurchMode ? 'church' : 'std'}`,
      name: `LSCh: ${selectedModule.name}`,
      price: totalPay,
      category: 'LSCh',
      details: [
        `Nivel: ${selectedModule.tag}`,
        isChurchMode ? 'Convenio Iglesia' : `Plan: ${calculation.label}`
      ]
    });
    alert("Agregado al carrito");
  };

  return (
    <div className="lsch-page">
      <style>{css}</style>
      <SEOHead title="Curso de Lengua de Señas | Lael Academy" description="Aprende LSCh con profesores nativos." />

      {/* MODAL */}
      {showModal && (
        <EnrollmentForm 
          planTitle={selectedModule.name}
          price={clp(totalPay)}
          selectedDetails={isChurchMode ? "Tarifa Iglesia/Ministerio" : calculation.label}
          onClose={() => setShowModal(false)}
        />
      )}

      {/* 1. HERO HEADER */}
      <section className="hero-lsch">
        <div className="hero-bg-img"></div>
        <div className="container">
          <div className="badge-cyan"><Hand size={14}/> Admisión 2026 Abierta</div>
          <h1 className="hero-title">
            Rompe la barrera<br/>
            <span className="text-gradient">del sonido.</span>
          </h1>
          <p className="hero-desc">
            Formación en <strong>Lengua de Señas Chilena</strong> con enfoque en cultura Sorda, gramática visual y práctica conversacional. 
          </p>
        </div>
      </section>

      <div className="container main-grid">
        
        {/* === IZQUIERDA: CONFIGURADOR === */}
        <div>
          
          {/* SELECCIÓN DE NIVEL */}
          <div className="section-head">
            <span className="step-num">1</span>
            <h3 className="step-title">Elige tu Nivel</h3>
          </div>
          
          <div className="module-grid">
            {LSCH_MODULES.map((m) => {
              const isActive = selectedModuleId === m.id;
              return (
                <div 
                  key={m.id} 
                  className={`module-card ${isActive ? 'active' : ''}`}
                  onClick={() => setSelectedModuleId(m.id)}
                >
                  <div className="module-icon">{m.icon}</div>
                  <div>
                    <h4 style={{margin:'0 0 6px 0', fontSize:'1.1rem', color: isActive ? 'white' : '#cbd5e1', fontWeight:700}}>
                      {m.name}
                    </h4>
                    <p style={{margin:0, fontSize:'0.9rem', color: 'var(--text-muted)', lineHeight:1.4}}>
                      {m.desc}
                    </p>
                    <div style={{display:'flex', gap:6, marginTop:10, flexWrap:'wrap'}}>
                      <span className="tag-pill" style={{borderColor:'var(--primary)', color:'var(--primary)'}}>{m.tag}</span>
                      {m.outcomes.slice(0,2).map((tag,i) => <span key={i} className="tag-pill">{tag}</span>)}
                    </div>
                  </div>
                  <div className="module-check"><Check size={14} strokeWidth={4}/></div>
                </div>
              )
            })}
          </div>

          {/* MODO IGLESIA */}
          <div className={`church-box ${isChurchMode ? 'active' : ''}`}>
            <div style={{display:'flex', alignItems:'center'}}>
              <div className="church-icon"><Church size={24}/></div>
              <div>
                <h4 style={{margin:0, color: isChurchMode ? 'var(--gold)' : 'white', fontWeight:700}}>¿Eres de una Iglesia?</h4>
                <p style={{margin:0, fontSize:'0.85rem', color: 'var(--text-muted)'}}>Activa el convenio para intérpretes y líderes.</p>
              </div>
            </div>
            <label className="switch">
              <input type="checkbox" checked={isChurchMode} onChange={() => setIsChurchMode(!isChurchMode)}/>
              <span className="slider"></span>
            </label>
          </div>

          {/* SELECCIÓN DE PLAN (Solo si no es Iglesia) */}
          <div className="animate-fade" style={{opacity: isChurchMode ? 0.3 : 1, pointerEvents: isChurchMode ? 'none' : 'all', transition:'0.3s'}}>
            <div className="section-head">
               <span className="step-num">2</span>
               <h3 className="step-title">Elige modalidad de pago</h3>
            </div>
            
            <div className="plans-grid">
               {LSCH_GROUP_PLANS.map((plan) => {
                 const isActive = selectedPlanId === plan.id;
                 return (
                   <div 
                     key={plan.id}
                     className={`plan-card ${isActive ? 'active' : ''}`}
                     onClick={() => setSelectedPlanId(plan.id)}
                   >
                     {plan.highlight && (
                       <div style={{position:'absolute', top:-10, right:20, background:'var(--primary)', color:'#020617', padding:'4px 10px', borderRadius:20, fontSize:'0.7rem', fontWeight:800}}>POPULAR</div>
                     )}
                     <h4 style={{fontSize:'1rem', color:'white', marginBottom:4}}>{plan.title}</h4>
                     <span style={{fontSize:'1.8rem', fontWeight:800, color:'white', display:'block', marginBottom:10}}>{clp(plan.price)}</span>
                     <ul style={{listStyle:'none', padding:0, margin:0}}>
                       {plan.features.slice(0,2).map((f,i) => (
                         <li key={i} style={{fontSize:'0.8rem', color:'var(--text-muted)', marginBottom:4, display:'flex', gap:6}}>
                           <Star size={12} color="var(--primary)"/> {f}
                         </li>
                       ))}
                     </ul>
                   </div>
                 )
               })}
            </div>
          </div>
        </div>

        {/* === DERECHA: RESUMEN (Sticky) === */}
        <div className="sidebar-sticky">
          <div className="summary-card">
            <h4 style={{textTransform:'uppercase', letterSpacing:1, color:'var(--text-muted)', fontSize:'0.8rem', marginBottom:20}}>Tu Resumen</h4>
            
            <div style={{display:'flex', alignItems:'center', gap:15, marginBottom:20, paddingBottom:20, borderBottom:'1px solid var(--border)'}}>
              <div style={{background:'var(--bg-input)', width:50, height:50, borderRadius:12, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.5rem'}}>
                {selectedModule.icon}
              </div>
              <div>
                <strong style={{display:'block', color:'white'}}>{selectedModule.name}</strong>
                <span style={{fontSize:'0.85rem', color:'var(--primary)'}}>{selectedModule.tag}</span>
              </div>
            </div>

            <div className="sum-row">
              <span>Arancel Mensual</span>
              <strong>{clp(calculation.price)}</strong>
            </div>
            <div className="sum-row">
              <span>Matrícula</span>
              {calculation.enrollment === 0 ? <span style={{color:'#4ade80', fontWeight:700}}>GRATIS</span> : <strong>{clp(calculation.enrollment)}</strong>}
            </div>

            {isChurchMode && (
              <div style={{background:'rgba(245, 158, 11, 0.15)', padding:10, borderRadius:8, marginTop:10, display:'flex', gap:8, alignItems:'center', color:'var(--gold)', fontSize:'0.85rem'}}>
                <Heart size={16} fill="currentColor"/> Beca Iglesia Aplicada
              </div>
            )}

            <div className="sum-total">
              <span>Total Hoy</span>
              <span className="total-price">{clp(totalPay)}</span>
            </div>

            <div style={{marginTop:24}}>
              <button onClick={() => setShowModal(true)} className="btn-primary">
                Inscribirme <ArrowRight size={20}/>
              </button>
              <button onClick={handleAddToCart} className="btn-secondary">
                Agregar al Carrito
              </button>
            </div>

            <div style={{marginTop:20, display:'flex', gap:10, alignItems:'flex-start', color:'#64748b', fontSize:'0.8rem'}}>
              <ShieldCheck size={28} style={{flexShrink:0}}/>
              <p style={{margin:0}}>Garantía de devolución de 7 días. Clases grabadas si faltas.</p>
            </div>
          </div>
        </div>

      </div>

      {/* BARRA MÓVIL STICKY */}
      <div className="mobile-sticky">
        <div style={{display:'flex', flexDirection:'column'}}>
           <span style={{fontSize:'0.75rem', color:'var(--text-muted)'}}>Total a pagar</span>
           <span style={{fontSize:'1.4rem', fontWeight:800, color:'white'}}>{clp(totalPay)}</span>
        </div>
        <button onClick={() => setShowModal(true)} style={{background:'var(--primary)', color:'black', border:'none', padding:'12px 24px', borderRadius:50, fontWeight:800, fontSize:'1rem', boxShadow:'0 0 15px var(--primary-glow)'}}>
           Inscribirme
        </button>
      </div>
    </div>
  );
}