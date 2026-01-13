import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import SEOHead from "../components/SEOHead.jsx";

// 📦 ICONOS
import { 
  Hand, Check, Star, ShieldCheck, ArrowRight, 
  Church, Sparkles, X, Heart, Loader2, BookOpen, 
  Users, Eye, ChevronDown, ChevronUp 
} from 'lucide-react';

// 📊 DATOS IMPORTADOS (Si fallan, usa los de respaldo abajo)
import { 
  LSCH_MODULES, 
  LSCH_GROUP_PLANS, 
  calculateLschPrice, 
  clp 
} from '../data/lsch';

/* ──────────────────────────────────────────────────────────────────────────
   DATOS DE RESPALDO (Por si acaso) + MALLA CURRICULAR
   ────────────────────────────────────────────────────────────────────────── */
const SYLLABUS_PREVIEW = [
  {
    title: "Unidad 1: Inmersión Visual",
    topics: ["Alfabeto Dactilológico", "Configuraciones Manuales", "Expresión Facial (Rasgos no manuales)"]
  },
  {
    title: "Unidad 2: Vida Cotidiana",
    topics: ["Saludos y Presentación", "Familia y Entorno", "Días, Meses y Tiempo"]
  },
  {
    title: "Unidad 3: Gramática LSCh",
    topics: ["Estructura OSV (Objeto-Sujeto-Verbo)", "Verbos Direccionales", "Clasificadores"]
  }
];

/* ──────────────────────────────────────────────────────────────────────────
   ESTILOS CSS OPTIMIZADOS (LITE VERSION)
   ────────────────────────────────────────────────────────────────────────── */
const css = `
:root {
  --bg-dark: #020617;
  --bg-card: #0f172a;
  --primary: #06b6d4; /* Cyan */
  --gold: #f59e0b;
  --text-main: #f8fafc;
  --text-muted: #94a3b8;
  --border: rgba(255, 255, 255, 0.08);
}

.lsch-page {
  background-color: var(--bg-dark);
  color: var(--text-main);
  font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
  padding-bottom: 120px;
}

.container { max-width: 1100px; margin: 0 auto; padding: 0 20px; position: relative; z-index: 2; }

/* HERO OPTIMIZADO (Sin máscaras pesadas) */
.hero-lsch {
  position: relative; padding: 100px 0 60px; text-align: center;
  background: var(--bg-dark); border-bottom: 1px solid var(--border);
}
.hero-overlay {
  position: absolute; inset: 0; 
  background: radial-gradient(circle at top, #164e63 0%, #020617 70%); /* Gradiente CSS puro es rápido */
  opacity: 0.4; z-index: 0;
}

.hero-title {
  font-size: clamp(2.2rem, 5vw, 4rem); font-weight: 800; line-height: 1.1; margin-bottom: 20px; position: relative;
}
.text-cyan { color: #22d3ee; }

.hero-desc {
  font-size: 1.1rem; color: var(--text-muted); max-width: 600px; margin: 0 auto 30px; line-height: 1.6; position: relative;
}

/* SECCIÓN EDUCATIVA (NUEVA) */
.info-grid {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px; margin: 40px 0;
}
.info-card {
  background: rgba(255,255,255,0.03); border: 1px solid var(--border); padding: 24px; border-radius: 16px;
}
.info-icon {
  width: 48px; height: 48px; background: rgba(6, 182, 212, 0.1); color: var(--primary);
  border-radius: 12px; display: flex; align-items: center; justify-content: center; marginBottom: 16px;
}

/* ACCORDION SYLLABUS */
.syllabus-item { border-bottom: 1px solid var(--border); }
.syllabus-btn {
  width: 100%; text-align: left; padding: 16px 0; background: none; border: none;
  color: white; font-weight: 700; cursor: pointer; display: flex; justify-content: space-between;
}
.syllabus-content { font-size: 0.9rem; color: var(--text-muted); padding-bottom: 16px; }

/* LAYOUT DE COMPRA */
.buy-grid { display: grid; grid-template-columns: 1fr 350px; gap: 40px; margin-top: 60px; }

/* TARJETAS MÓDULOS */
.module-card {
  display: flex; gap: 16px; align-items: center; padding: 16px; margin-bottom: 12px;
  background: var(--bg-card); border: 1px solid var(--border); border-radius: 12px; cursor: pointer;
}
.module-card.active { border-color: var(--primary); background: rgba(6, 182, 212, 0.05); }

/* MODO IGLESIA */
.church-toggle {
  display: flex; align-items: center; justify-content: space-between;
  background: rgba(245, 158, 11, 0.05); border: 1px solid rgba(245, 158, 11, 0.2);
  padding: 16px; border-radius: 12px; margin: 24px 0;
}

/* SIDEBAR RESUMEN */
.summary-box {
  background: #0f172a; border: 1px solid var(--border); border-radius: 20px; padding: 24px;
  position: sticky; top: 20px;
}

/* BARRA MÓVIL */
.mobile-bar {
  display: none; position: fixed; bottom: 0; left: 0; right: 0;
  background: #020617; border-top: 1px solid var(--border);
  padding: 16px 20px; z-index: 100; align-items: center; justify-content: space-between;
}

/* MODAL */
.modal-overlay {
  position: fixed; inset: 0; background: rgba(0,0,0,0.9); z-index: 999;
  display: flex; align-items: center; justify-content: center; padding: 20px;
}

@media (max-width: 900px) {
  .buy-grid { grid-template-columns: 1fr; }
  .summary-box { display: none; }
  .mobile-bar { display: flex; }
}
`;

/* ──────────────────────────────────────────────────────────────────────────
   COMPONENTES
   ────────────────────────────────────────────────────────────────────────── */
const SyllabusAccordion = () => {
  return (
    <div style={{marginTop:30}}>
      <h3 style={{fontSize:'1.3rem', marginBottom:16}}>¿Qué aprenderás?</h3>
      {SYLLABUS_PREVIEW.map((item, idx) => (
        <div key={idx} className="syllabus-item">
          <div className="syllabus-btn" style={{cursor:'default'}}>
             {item.title}
          </div>
          <div className="syllabus-content">
             <ul style={{paddingLeft:20, margin:0}}>
               {item.topics.map(t => <li key={t}>{t}</li>)}
             </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

// Modal Simple
function EnrollmentModal({ title, price, details, onClose }) {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setDone(true); }, 1000);
  };

  if (done) return (
    <div className="modal-overlay">
      <div style={{background:'#1e293b', padding:30, borderRadius:20, textAlign:'center', width:'100%', maxWidth:350}}>
        <div style={{color:'#22d3ee', marginBottom:15}}><Sparkles size={40}/></div>
        <h3 style={{color:'white'}}>¡Solicitud Enviada!</h3>
        <p style={{color:'#94a3b8'}}>Te contactaremos para finalizar.</p>
        <button onClick={onClose} style={{width:'100%', padding:12, background:'var(--primary)', border:'none', borderRadius:10, fontWeight:700, marginTop:15}}>Cerrar</button>
      </div>
    </div>
  );

  return (
    <div className="modal-overlay">
      <div style={{background:'#1e293b', padding:24, borderRadius:20, width:'100%', maxWidth:400, border:'1px solid var(--border)'}}>
        <div style={{display:'flex', justifyContent:'space-between', marginBottom:20}}>
          <h3 style={{margin:0, color:'white'}}>Inscripción</h3>
          <button onClick={onClose} style={{background:'none', border:'none', color:'white'}}><X/></button>
        </div>
        <div style={{background:'rgba(0,0,0,0.2)', padding:15, borderRadius:10, marginBottom:20}}>
          <div style={{color:'var(--primary)', fontWeight:700}}>{title}</div>
          <div style={{color:'#94a3b8', fontSize:'0.9rem'}}>{details}</div>
          <div style={{color:'white', fontSize:'1.2rem', fontWeight:700, marginTop:5}}>{price}</div>
        </div>
        <form onSubmit={handleSubmit} style={{display:'grid', gap:12}}>
          <input placeholder="Nombre Completo" required style={{padding:12, background:'#0f172a', border:'1px solid var(--border)', borderRadius:8, color:'white'}}/>
          <input placeholder="WhatsApp" required style={{padding:12, background:'#0f172a', border:'1px solid var(--border)', borderRadius:8, color:'white'}}/>
          <button style={{padding:14, background:'var(--primary)', border:'none', borderRadius:10, fontWeight:700, cursor:'pointer'}} disabled={loading}>
            {loading ? 'Procesando...' : 'Confirmar Cupo'}
          </button>
        </form>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   MAIN PAGE
   ────────────────────────────────────────────────────────────────────────── */
export default function LSCh() {
  const { addToCart } = useCart ? useCart() : { addToCart: ()=>{} };
  const [selectedModuleId, setSelectedModuleId] = useState(LSCH_MODULES[0].id);
  const [selectedPlanId, setSelectedPlanId] = useState(LSCH_GROUP_PLANS[1].id); 
  const [isChurchMode, setIsChurchMode] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const selectedModule = LSCH_MODULES.find(m => m.id === selectedModuleId);
  const calculation = calculateLschPrice(selectedPlanId, isChurchMode);
  const totalPay = calculation.price + calculation.enrollment;

  const handleAddToCart = () => {
    addToCart({
      id: `lsch-${Date.now()}`,
      name: `LSCh: ${selectedModule.name}`,
      price: totalPay,
      category: 'LSCh',
      details: [`Nivel: ${selectedModule.tag}`, isChurchMode ? 'Convenio Iglesia' : calculation.label]
    });
    alert("Agregado al carrito");
  };

  return (
    <div className="lsch-page">
      <style>{css}</style>
      <SEOHead title="Curso LSCh | Lael Academy" description="Aprende Lengua de Señas." />

      {showModal && (
        <EnrollmentModal 
          title={selectedModule.name}
          price={clp(totalPay)}
          details={isChurchMode ? "Plan Iglesia" : calculation.label}
          onClose={() => setShowModal(false)}
        />
      )}

      {/* 1. HERO (LIMPIO Y RÁPIDO) */}
      <section className="hero-lsch">
        <div className="hero-overlay"></div>
        <div className="container">
          <div style={{display:'inline-flex', alignItems:'center', gap:8, background:'rgba(6,182,212,0.1)', color:'var(--primary)', padding:'6px 14px', borderRadius:50, fontSize:'0.8rem', fontWeight:700, marginBottom:20, border:'1px solid rgba(6,182,212,0.3)'}}>
             <Hand size={14}/> <span>Admisión 2026</span>
          </div>
          <h1 className="hero-title">
            Más que señas,<br/>
            <span className="text-cyan">es Cultura.</span>
          </h1>
          <p className="hero-desc">
            Aprende <strong>Lengua de Señas Chilena</strong> con inmersión cultural, 
            profesores nativos Sordos y enfoque en gramática visual.
          </p>
        </div>
      </section>

      {/* 2. SECCIÓN EDUCATIVA (MÉTODO) */}
      <div className="container">
        <div className="info-grid">
           <div className="info-card">
              <div className="info-icon"><Eye/></div>
              <h3 style={{marginBottom:10, fontSize:'1.1rem'}}>Gramática Visual</h3>
              <p style={{fontSize:'0.9rem', color:'var(--text-muted)', lineHeight:1.5}}>
                No es español con manos. Aprenderás la estructura OSV y el uso del espacio tridimensional.
              </p>
           </div>
           <div className="info-card">
              <div className="info-icon"><Users/></div>
              <h3 style={{marginBottom:10, fontSize:'1.1rem'}}>Profesores Nativos</h3>
              <p style={{fontSize:'0.9rem', color:'var(--text-muted)', lineHeight:1.5}}>
                Aprende directamente de personas Sordas (Co-docencia), garantizando la inmersión cultural real.
              </p>
           </div>
           <div className="info-card">
              <div className="info-icon"><BookOpen/></div>
              <h3 style={{marginBottom:10, fontSize:'1.1rem'}}>Certificación</h3>
              <p style={{fontSize:'0.9rem', color:'var(--text-muted)', lineHeight:1.5}}>
                Diploma digital verificado al completar las evaluaciones prácticas y teóricas de cada nivel.
              </p>
           </div>
        </div>
      </div>

      {/* 3. CONFIGURADOR DE CURSO */}
      <div className="container buy-grid">
        {/* COLUMNA IZQ: SELECCIÓN */}
        <div>
           <h2 style={{fontSize:'1.8rem', marginBottom:20}}>Arma tu inscripción</h2>
           
           <h4 style={{color:'var(--text-muted)', fontSize:'0.9rem', marginBottom:12, textTransform:'uppercase'}}>1. Elige tu Nivel</h4>
           {LSCH_MODULES.map(m => (
             <div 
               key={m.id} 
               className={`module-card ${selectedModuleId === m.id ? 'active' : ''}`}
               onClick={() => setSelectedModuleId(m.id)}
             >
                <div style={{background: selectedModuleId === m.id ? 'var(--primary)' : '#1e293b', color: selectedModuleId === m.id ? 'black' : '#94a3b8', width:40, height:40, borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center'}}>
                   {m.icon}
                </div>
                <div style={{flexGrow:1}}>
                   <strong style={{display:'block', color:'white'}}>{m.name}</strong>
                   <span style={{fontSize:'0.8rem', color:'var(--text-muted)'}}>{m.desc}</span>
                </div>
                {selectedModuleId === m.id && <Check size={18} color="var(--primary)"/>}
             </div>
           ))}

           {/* CONTENIDO ACORDEÓN (SOLO SE MUESTRA SI HAY MÓDULO SELECCIONADO) */}
           <SyllabusAccordion />

           {/* SWITCH IGLESIA */}
           <div className="church-toggle">
              <div style={{display:'flex', gap:12, alignItems:'center'}}>
                 <div style={{background:'rgba(245, 158, 11, 0.2)', padding:8, borderRadius:8, color:'var(--gold)'}}><Church size={20}/></div>
                 <div>
                    <strong style={{display:'block', fontSize:'0.9rem', color: isChurchMode ? 'var(--gold)' : 'white'}}>Convenio Iglesia</strong>
                    <span style={{fontSize:'0.8rem', color:'var(--text-muted)'}}>Descuento para ministerios</span>
                 </div>
              </div>
              <input type="checkbox" checked={isChurchMode} onChange={() => setIsChurchMode(!isChurchMode)} style={{width:20, height:20}}/>
           </div>

           {/* PLANES (SOLO SI NO ES IGLESIA) */}
           {!isChurchMode && (
             <div style={{marginTop:30, opacity: isChurchMode ? 0.5 : 1}}>
                <h4 style={{color:'var(--text-muted)', fontSize:'0.9rem', marginBottom:12, textTransform:'uppercase'}}>2. Modalidad de Pago</h4>
                <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:10}}>
                   {LSCH_GROUP_PLANS.map(p => (
                      <div 
                        key={p.id} 
                        onClick={() => setSelectedPlanId(p.id)}
                        style={{border: selectedPlanId === p.id ? '2px solid var(--primary)' : '1px solid var(--border)', background:'#1e293b', padding:15, borderRadius:12, cursor:'pointer'}}
                      >
                         <div style={{fontSize:'0.9rem', color:'white', fontWeight:700}}>{p.title}</div>
                         <div style={{fontSize:'1.2rem', color:'white', fontWeight:800}}>{clp(p.price)}</div>
                      </div>
                   ))}
                </div>
             </div>
           )}
        </div>

        {/* COLUMNA DER: RESUMEN DESKTOP */}
        <div className="summary-box">
           <h3 style={{fontSize:'1.2rem', marginBottom:20}}>Resumen</h3>
           <div style={{display:'flex', justifyContent:'space-between', marginBottom:12, fontSize:'0.9rem', color:'var(--text-muted)'}}>
              <span>Nivel</span>
              <strong style={{color:'white'}}>{selectedModule.name}</strong>
           </div>
           <div style={{display:'flex', justifyContent:'space-between', marginBottom:12, fontSize:'0.9rem', color:'var(--text-muted)'}}>
              <span>Arancel</span>
              <strong style={{color:'white'}}>{clp(calculation.price)}</strong>
           </div>
           <div style={{display:'flex', justifyContent:'space-between', marginBottom:20, fontSize:'0.9rem', color:'var(--text-muted)', borderBottom:'1px solid var(--border)', paddingBottom:20}}>
              <span>Matrícula</span>
              <strong style={{color: calculation.enrollment === 0 ? '#4ade80' : 'white'}}>{calculation.enrollment === 0 ? 'GRATIS' : clp(calculation.enrollment)}</strong>
           </div>
           
           <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24}}>
              <span style={{fontSize:'1rem'}}>Total Hoy</span>
              <span style={{fontSize:'1.8rem', fontWeight:800, color:'white'}}>{clp(totalPay)}</span>
           </div>

           <button onClick={() => setShowModal(true)} style={{width:'100%', padding:16, background:'var(--primary)', color:'#0f172a', border:'none', borderRadius:12, fontWeight:800, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:8}}>
              Inscribirme <ArrowRight size={18}/>
           </button>
           <button onClick={handleAddToCart} style={{width:'100%', padding:12, background:'transparent', border:'1px solid var(--border)', color:'white', borderRadius:12, marginTop:12, cursor:'pointer', fontSize:'0.9rem'}}>
              Agregar al Carrito
           </button>
        </div>
      </div>

      {/* MOBILE BAR (STICKY) */}
      <div className="mobile-bar">
         <div>
            <span style={{display:'block', fontSize:'0.75rem', color:'var(--text-muted)'}}>Total a Pagar</span>
            <span style={{fontSize:'1.4rem', fontWeight:800, color:'white'}}>{clp(totalPay)}</span>
         </div>
         <button onClick={() => setShowModal(true)} style={{background:'var(--primary)', color:'#0f172a', padding:'12px 24px', borderRadius:50, border:'none', fontWeight:700}}>
            Inscribirme
         </button>
      </div>

    </div>
  );
}