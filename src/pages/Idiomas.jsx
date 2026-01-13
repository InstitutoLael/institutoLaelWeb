import React, { useState, useEffect, useMemo, useRef } from "react";
import { useCart } from "../context/CartContext.jsx";
import SEOHead from "../components/SEOHead.jsx";

// 📦 ICONOS
import { 
  Check, Globe, Award, ArrowRight, Zap, 
  X, Loader2, ShieldCheck, ChevronDown, ChevronUp 
} from "lucide-react";

// 📊 DATOS (Si esto falla, el código tiene un respaldo vacío)
import { 
  LANGUAGES, 
  ENROLLMENT_FEE, 
  computeLangBundle, 
  clp 
} from "../data/idiomas.js";

/* ==========================================================================
   COMPONENTES INTERNOS (OPTIMIZADOS)
   ========================================================================== */

// 1. TEXTO "HOLA" DINÁMICO (Sin dependencias externas)
const Typewriter = () => {
  const words = ["Hello", "Hola", "Bonjour", "Ciao", "Namaste", "Annyeong"];
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  // Lógica optimizada para no saturar el render
  useEffect(() => {
    if (index >= words.length) { setIndex(0); return; }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? 75 : 150);

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, words.length]);

  useEffect(() => {
    if (!reverse && subIndex === words[index].length + 1) {
      setTimeout(() => setReverse(true), 1000);
      return;
    }
    if (reverse && subIndex === 0) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }
  }, [subIndex, index, reverse, words]);

  return <span className="gradient-text">{words[index].substring(0, subIndex)}|</span>;
};

// 2. PREGUNTAS FRECUENTES
const FaqItem = ({ q, a }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="faq-item">
      <button className="faq-btn" onClick={() => setIsOpen(!isOpen)}>
        {q} {isOpen ? <ChevronUp size={20} color="#6366f1"/> : <ChevronDown size={20} color="#64748b"/>}
      </button>
      <div className={`faq-content ${isOpen ? 'open' : ''}`}>{a}</div>
    </div>
  );
};

/* ==========================================================================
   ESTILOS CSS (PERFORMANCE + DARK MODE)
   ========================================================================== */
const css = `
:root {
  --bg-body: #020617;
  --bg-card: #0f172a;
  --primary: #6366f1;
  --text-main: #f8fafc;
  --text-muted: #94a3b8;
  --border: rgba(255, 255, 255, 0.08);
}

/* RESET & BASE */
.lang-page {
  background-color: var(--bg-body);
  color: var(--text-main);
  font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
  min-height: 100vh;
  padding-bottom: 140px; 
  overflow-x: hidden; /* Vital para evitar scroll horizontal */
}

.container { max-width: 1200px; margin: 0 auto; padding: 0 24px; position: relative; z-index: 2; }

/* HERO OPTIMIZADO */
.hero-section {
  position: relative; padding: 120px 0 60px; text-align: center;
  /* Gradiente estático (más ligero para CPU) */
  background: radial-gradient(circle at 50% 0%, #1e1b4b 0%, #020617 70%);
}

/* Solo mostrar el "Glow" pesado en pantallas grandes */
@media (min-width: 768px) {
  .hero-glow {
    position: absolute; top: -20%; left: 50%; transform: translateX(-50%);
    width: 600px; height: 600px; background: var(--primary);
    filter: blur(150px); opacity: 0.15; pointer-events: none; z-index: 0;
  }
}

.hero-title {
  font-size: clamp(2.5rem, 5vw, 4rem); font-weight: 800; line-height: 1.1; margin-bottom: 24px; position: relative; z-index: 2;
}
.gradient-text {
  background: linear-gradient(to right, #818cf8, #c084fc);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
}
.hero-desc {
  font-size: 1.1rem; color: var(--text-muted); max-width: 600px; margin: 0 auto 40px; line-height: 1.6;
}

/* TARJETAS (GRID) */
.builder-layout {
  display: grid; grid-template-columns: 1fr 380px; gap: 40px; align-items: start; margin-top: 40px;
}
.cards-grid {
  display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px;
}

.lang-card {
  background: var(--bg-card); border: 1px solid var(--border); border-radius: 16px;
  padding: 20px; cursor: pointer; transition: transform 0.2s, border-color 0.2s; 
  position: relative; overflow: hidden; transform: translateZ(0); /* Aceleración GPU */
}
.lang-card:active { transform: scale(0.98); } /* Feedback táctil */
.lang-card.active {
  background: rgba(99, 102, 241, 0.08); border-color: var(--primary);
}

.card-header { display: flex; justify-content: space-between; margin-bottom: 12px; }
.card-emoji { font-size: 2.5rem; }
.card-title { font-size: 1.2rem; font-weight: 700; color: white; margin: 0 0 8px 0; }
.card-desc { font-size: 0.85rem; color: var(--text-muted); margin-bottom: 16px; line-height: 1.4; }

/* NIVELES */
.levels-row { display: flex; gap: 6px; }
.lvl-btn {
  flex: 1; border: 1px solid var(--border); background: rgba(0,0,0,0.2); color: var(--text-muted);
  padding: 6px 0; border-radius: 8px; font-size: 0.75rem; font-weight: 600; cursor: pointer;
}
.lvl-btn.active {
  background: var(--primary); color: white; border-color: var(--primary);
}

/* RESUMEN LATERAL (Desktop) */
.sidebar-sticky { position: sticky; top: 20px; }
.summary-card {
  background: #0f172a; border: 1px solid var(--border); border-radius: 20px; padding: 24px;
}
.sum-row { display: flex; justify-content: space-between; margin-bottom: 12px; color: var(--text-muted); font-size: 0.9rem; }
.sum-total {
  border-top: 1px solid var(--border); margin-top: 20px; padding-top: 20px;
  display: flex; justify-content: space-between; align-items: center;
}

/* BOTONES */
.btn-main {
  width: 100%; background: var(--primary); color: white; border: none; padding: 16px;
  border-radius: 12px; font-weight: 700; font-size: 1rem; cursor: pointer; margin-top: 20px;
}
.btn-outline {
  width: 100%; padding: 12px; background: transparent; border: 1px solid var(--border); 
  color: var(--text-muted); border-radius: 12px; margin-top: 10px; cursor: pointer; font-weight: 600;
}

/* BARRA MÓVIL STICKY */
.mobile-bar {
  display: none; position: fixed; bottom: 0; left: 0; right: 0;
  background: #020617; /* Fondo sólido para rendimiento */
  border-top: 1px solid var(--border); padding: 16px 24px; z-index: 100;
  align-items: center; justify-content: space-between;
  box-shadow: 0 -5px 20px rgba(0,0,0,0.5);
}

/* FAQ */
.faq-item { border-bottom: 1px solid var(--border); }
.faq-btn {
  width: 100%; text-align: left; padding: 16px 0; background: none; border: none;
  color: white; font-weight: 700; font-size: 1rem; cursor: pointer;
  display: flex; justify-content: space-between; align-items: center;
}
.faq-content { max-height: 0; overflow: hidden; transition: max-height 0.3s ease; color: var(--text-muted); line-height: 1.5; font-size: 0.9rem; }
.faq-content.open { max-height: 200px; padding-bottom: 16px; }

@media (max-width: 900px) {
  .builder-layout { grid-template-columns: 1fr; margin-top: 20px; }
  .sidebar-sticky { display: none; }
  .mobile-bar { display: flex; }
  .hero-title { font-size: 2.2rem; }
  .container { padding: 0 20px; }
}
`;

// MODAL SIMPLE (Optimizado)
function EnrollmentForm({ planTitle, price, selectedDetails, onClose }) {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulamos envío rápido
    setTimeout(() => { setLoading(false); setDone(true); }, 1000);
  };

  if (done) return (
    <div style={{position:'fixed', inset:0, background:'rgba(0,0,0,0.9)', zIndex:999, display:'flex', alignItems:'center', justifyContent:'center'}}>
      <div style={{background:'#1e293b', padding:30, borderRadius:20, textAlign:'center', width:'85%', maxWidth:350}}>
        <div style={{color:'#4ade80', marginBottom:15, display:'inline-block', padding:10, borderRadius:'50%', background:'rgba(74, 222, 128, 0.1)'}}>
          <Check size={40}/>
        </div>
        <h3 style={{color:'white', margin:'0 0 10px 0'}}>¡Listo!</h3>
        <p style={{color:'#94a3b8', fontSize:'0.9rem'}}>Te enviamos un correo.</p>
        <button onClick={onClose} className="btn-main" style={{marginTop:15, padding:12}}>Cerrar</button>
      </div>
    </div>
  );

  return (
    <div style={{position:'fixed', inset:0, background:'rgba(0,0,0,0.85)', zIndex:999, display:'flex', alignItems:'center', justifyContent:'center', backdropFilter:'blur(4px)'}}>
      <div style={{background:'#1e293b', padding:24, borderRadius:20, width:'90%', maxWidth:400, border:'1px solid var(--border)'}}>
        <div style={{display:'flex', justifyContent:'space-between', marginBottom:20, alignItems:'center'}}>
          <h3 style={{margin:0, color:'white', fontSize:'1.2rem'}}>Inscripción</h3>
          <button onClick={onClose} style={{background:'none', border:'none', color:'#94a3b8', padding:5}}><X size={24}/></button>
        </div>
        
        <div style={{background:'rgba(0,0,0,0.2)', padding:15, borderRadius:12, marginBottom:20}}>
           <div style={{color:'white', fontWeight:700, marginBottom:4}}>{planTitle}</div>
           <div style={{color:'#94a3b8', fontSize:'0.8rem'}}>{selectedDetails}</div>
           <div style={{color:'#818cf8', fontWeight:800, fontSize:'1.2rem', marginTop:8}}>{price}</div>
        </div>

        <form onSubmit={handleSubmit} style={{display:'grid', gap:12}}>
          <input placeholder="Nombre Completo" style={{padding:14, background:'#0f172a', border:'1px solid var(--border)', borderRadius:10, color:'white', fontSize:'1rem'}} required/>
          <input placeholder="Correo Electrónico" type="email" style={{padding:14, background:'#0f172a', border:'1px solid var(--border)', borderRadius:10, color:'white', fontSize:'1rem'}} required/>
          <button className="btn-main" disabled={loading} style={{marginTop:10}}>
            {loading ? <Loader2 className="animate-spin" style={{margin:'0 auto'}}/> : 'Ir a Pagar'}
          </button>
        </form>
      </div>
    </div>
  );
}

/* ==========================================================================
   PÁGINA PRINCIPAL
   ========================================================================== */
export default function Idiomas() {
  const { addToCart } = useCart ? useCart() : { addToCart: ()=>{} };
  const builderRef = useRef(null);

  // --- ESTADOS ---
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectedLevels, setSelectedLevels] = useState({});
  const [showModal, setShowModal] = useState(false);

  // --- LÓGICA SEGURA ---
  const safeLanguages = LANGUAGES || [];
  const selectedCourses = useMemo(() => safeLanguages.filter(l => selectedIds.includes(l.id)), [selectedIds, safeLanguages]);
  
  const pricing = computeLangBundle(selectedCourses.length);
  const totalPayNow = pricing.totalMonthly + (selectedIds.length > 0 ? ENROLLMENT_FEE : 0);

  // Handlers
  const toggleCourse = (l) => {
    if (l.comingSoon) return;
    if (l.isRedirect) {
       window.location.href = l.url;
       return;
    }
    setSelectedIds(prev => {
      if (prev.includes(l.id)) return prev.filter(x => x !== l.id);
      // Seleccionar por defecto
      const firstLevel = l.levels ? l.levels[0] : 'General';
      if (!selectedLevels[l.id]) setLevel(l.id, firstLevel);
      return [...prev, l.id];
    });
  };

  const setLevel = (langId, level) => {
    if (!selectedIds.includes(langId)) setSelectedIds(prev => [...prev, langId]);
    setSelectedLevels(prev => ({ ...prev, [langId]: level }));
  };

  const getSummaryText = () => selectedCourses.map(c => `${c.name}`).join(', ');

  const handleAddToCart = () => {
    if (selectedCourses.length === 0) return;
    addToCart({
      id: `pack-${Date.now()}`,
      name: `Pack Idiomas: ${pricing.label}`,
      price: totalPayNow,
      category: 'Idiomas',
      details: [getSummaryText(), 'Matrícula Incluida']
    });
    alert("Agregado al carrito");
  };

  return (
    <div className="lang-page">
      <style>{css}</style>
      <SEOHead title="Cursos de Idiomas | Lael Academy" description="Inglés, Coreano, y más." />

      {showModal && (
        <EnrollmentForm 
          planTitle={pricing.label} 
          price={clp(totalPayNow)}
          selectedDetails={getSummaryText()}
          onClose={() => setShowModal(false)}
        />
      )}

      {/* 1. HERO SECTION */}
      <section className="hero-section">
        {/* Glow solo se mostrará en Desktop vía CSS para no laggear móvil */}
        <div className="hero-glow"></div>
        
        <div className="container">
          <div style={{display:'inline-flex', alignItems:'center', gap:6, padding:'6px 14px', borderRadius:50, background:'rgba(99, 102, 241, 0.1)', border:'1px solid rgba(99, 102, 241, 0.3)', color:'#818cf8', fontSize:'0.8rem', fontWeight:700, marginBottom:20}}>
            <Zap size={14}/> <span>Admisión 2026</span>
          </div>
          
          <h1 className="hero-title">
            <Typewriter /><br/>
            Rompe barreras.
          </h1>
          
          <p className="hero-desc">
            Metodología de Inmersión Cultural Activa. 
            Elige los idiomas que quieras y arma tu pack a medida.
          </p>
          
          <button onClick={() => builderRef.current?.scrollIntoView({behavior:'smooth'})} className="btn-main" style={{width:'auto', padding:'16px 32px', marginTop:0, display:'inline-flex', alignItems:'center', gap:8}}>
            Armar Pack <ArrowRight size={18}/>
          </button>
        </div>
      </section>

      {/* 2. CONSTRUCTOR DE PACKS */}
      <div className="container builder-layout" ref={builderRef}>
        
        {/* COLUMNA IZQ: TARJETAS */}
        <div>
          <div style={{display:'flex', alignItems:'center', gap:10, marginBottom:20}}>
             <span style={{background:'#1e293b', width:28, height:28, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700, fontSize:'0.9rem', border:'1px solid var(--border)'}}>1</span>
             <h3 style={{margin:0, fontSize:'1.1rem'}}>Selecciona tus idiomas</h3>
          </div>

          <div className="cards-grid">
            {safeLanguages.map(l => {
              const isActive = selectedIds.includes(l.id);
              const currentLvl = selectedLevels[l.id] || (l.levels ? l.levels[0] : '');

              return (
                <div 
                  key={l.id} 
                  className={`lang-card ${isActive ? 'active' : ''}`}
                  onClick={() => toggleCourse(l)}
                  style={{opacity: l.comingSoon ? 0.5 : 1}}
                >
                  <div className="card-header">
                    <span className="card-emoji">{l.emoji}</span>
                    {isActive && <div style={{background:'var(--primary)', color:'white', width:24, height:24, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center'}}><Check size={14}/></div>}
                  </div>
                  
                  <h4 className="card-title">{l.name}</h4>
                  <p className="card-desc">{l.summary}</p>
                  
                  {l.comingSoon ? (
                    <span style={{fontSize:'0.7rem', background:'#f59e0b', color:'black', padding:'4px 8px', borderRadius:4, fontWeight:700}}>PRÓXIMAMENTE</span>
                  ) : !l.isRedirect && (
                    <div className="levels-row" onClick={(e) => e.stopPropagation()}>
                      {l.levels && l.levels.slice(0,3).map(lvl => (
                        <button 
                          key={lvl}
                          className={`lvl-btn ${isActive && currentLvl === lvl ? 'active' : ''}`}
                          onClick={() => setLevel(l.id, lvl)}
                        >
                          {lvl}
                        </button>
                      ))}
                    </div>
                  )}
                  {l.isRedirect && (
                      <span style={{fontSize:'0.7rem', color:'#c084fc', fontWeight:700, display:'flex', alignItems:'center', gap:4}}>VER INFO <ArrowRight size={12}/></span>
                  )}
                </div>
              )
            })}
          </div>

          {/* FAQ SECTION (Integrada para ahorrar espacio) */}
          <div style={{marginTop:50, borderTop:'1px solid var(--border)', paddingTop:30}}>
             <h3 style={{marginBottom:15, fontSize:'1.2rem'}}>Preguntas Frecuentes</h3>
             <FaqItem q="¿Las clases quedan grabadas?" a="Sí, tendrás acceso 24/7 a las grabaciones en el aula virtual para repasar cuando quieras." />
             <FaqItem q="¿Entregan certificado?" a="Sí, al finalizar y aprobar cada nivel recibirás un diploma digital oficial de Lael Academy." />
             <FaqItem q="¿Cómo son las clases?" a="100% online en vivo vía Zoom, con enfoque conversacional y grupos pequeños." />
          </div>
        </div>

        {/* COLUMNA DER: RESUMEN (STICKY) - Solo Desktop */}
        <div className="sidebar-sticky">
           <div className="summary-card">
              <h4 style={{textTransform:'uppercase', color:'var(--text-muted)', fontSize:'0.7rem', letterSpacing:1, marginBottom:16}}>
                Resumen de Inscripción
              </h4>
              
              {selectedCourses.length === 0 ? (
                <div style={{textAlign:'center', padding:'30px 0', opacity:0.6}}>
                  <Globe size={32} style={{marginBottom:10, opacity:0.5}}/>
                  <p style={{fontSize:'0.9rem'}}>Selecciona un curso</p>
                </div>
              ) : (
                <>
                  <div className="sum-row">
                     <span>Matrícula Anual</span>
                     <strong>{clp(ENROLLMENT_FEE)}</strong>
                  </div>
                  {selectedCourses.map(c => (
                     <div key={c.id} className="sum-row">
                       <span>{c.name} <small style={{color:'var(--primary)'}}>({selectedLevels[c.id]})</small></span>
                       <span>Incluido</span>
                     </div>
                  ))}
                  <div className="sum-row" style={{marginTop:15, color:'var(--primary)'}}>
                     <span>Plan Aplicado</span>
                     <strong>{pricing.label}</strong>
                  </div>

                  <div className="sum-total">
                    <span style={{fontSize:'0.9rem'}}>Total Hoy</span>
                    <span style={{fontSize:'1.8rem', fontWeight:800, color:'white'}}>{clp(totalPayNow)}</span>
                  </div>
                  <div style={{textAlign:'right', fontSize:'0.75rem', color:'var(--text-muted)', marginTop:4}}>
                    Luego {clp(pricing.totalMonthly)}/mes
                  </div>

                  <button onClick={() => setShowModal(true)} className="btn-main">
                    Inscribirme Ahora
                  </button>
                  <button onClick={handleAddToCart} className="btn-outline">
                    Agregar al Carrito
                  </button>
                </>
              )}
              
              <div style={{marginTop:20, display:'flex', gap:10, alignItems:'center', opacity:0.7}}>
                 <ShieldCheck size={20} color="#94a3b8"/>
                 <span style={{fontSize:'0.75rem', color:'#94a3b8'}}>Garantía de satisfacción 7 días.</span>
              </div>
           </div>
        </div>

      </div>

      {/* MOBILE STICKY BAR (Optimizado) */}
      {selectedCourses.length > 0 && (
        <div className="mobile-bar">
          <div>
             <span style={{fontSize:'0.7rem', color:'var(--text-muted)', display:'block', textTransform:'uppercase', letterSpacing:0.5}}>Total a Pagar</span>
             <span style={{fontSize:'1.4rem', fontWeight:800, color:'white'}}>{clp(totalPayNow)}</span>
          </div>
          <button onClick={() => setShowModal(true)} style={{background:'var(--primary)', color:'white', border:'none', padding:'12px 24px', borderRadius:50, fontWeight:700, fontSize:'0.95rem'}}>
             Inscribirme
          </button>
        </div>
      )}

    </div>
  );
}