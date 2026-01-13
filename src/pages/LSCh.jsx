import React, { useState } from 'react';
import { useCart } from '../context/CartContext'; 
import SEOHead from "../components/SEOHead.jsx";

import { 
  BookOpen, Users, Check, ChevronDown, ChevronRight, 
  Clock, ShieldCheck, Zap, Globe, 
  ArrowRight, Church, LayoutGrid, X, Loader2, ShoppingCart,
  PlayCircle, BrainCircuit, HeartHandshake
} from 'lucide-react';

/* ──────────────────────────────────────────────────────────────────────────
   1. CSS RESPONSIVO Y ENCAPSULADO (CORREGIDO)
   ────────────────────────────────────────────────────────────────────────── */
const styles = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

:root {
  --bg-deep: #020617;
  --bg-card: #0f172a;
  --bg-glass: rgba(15, 23, 42, 0.8); /* Un poco más opaco para legibilidad */
  --primary: #6366f1;
  --primary-glow: rgba(99, 102, 241, 0.4);
  --cyan: #06b6d4;
  --text-main: #f8fafc;
  --text-muted: #94a3b8;
  --border: rgba(255, 255, 255, 0.1);
  --radius: 16px;
}

.lael-app {
  font-family: 'Plus Jakarta Sans', sans-serif;
  background-color: var(--bg-deep);
  color: var(--text-main);
  min-height: 100vh;
  padding-bottom: 80px;
  line-height: 1.6;
}

/* UTILIDADES */
.glass-panel {
  background: var(--bg-card); /* Fallback */
  background: var(--bg-glass);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.title-gradient {
  background: linear-gradient(135deg, #fff 0%, #cbd5e1 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.text-highlight { color: var(--cyan); font-weight: 700; }

/* LAYOUT PRINCIPAL RESPONSIVO */
.main-container {
  max-width: 1200px; 
  margin: 0 auto; 
  padding: 0 24px;
  display: grid; 
  grid-template-columns: 1fr 380px; /* Escritorio: Contenido | Sidebar */
  gap: 40px; 
  position: relative;
}

/* ESTILOS ESPECÍFICOS PARA MÓVIL (CORRECCIÓN) */
@media (max-width: 1024px) {
  .main-container { 
    grid-template-columns: 1fr; /* Columna única */
    gap: 32px;
  }
  
  .hero { padding: 60px 0 40px !important; }
  .hero h1 { font-size: 2.25rem !important; }
  
  .summary-box {
    position: relative !important; /* Ya no es sticky en móvil */
    top: 0 !important;
    margin-top: 20px;
    order: 2; /* Asegura que quede al final si usamos flex, pero en grid es natural */
  }

  .custom-tabs {
    flex-wrap: wrap; /* Tabs se envuelven si falta espacio */
  }
  .tab-btn { flex: 1 1 40%; font-size: 0.85rem; }
}

/* HERO SECTION */
.hero { padding: 100px 0 60px; text-align: center; }
.hero h1 { font-size: 3.5rem; font-weight: 800; margin-bottom: 20px; line-height: 1.1; letter-spacing: -0.02em; }
.hero p { font-size: 1.125rem; color: var(--text-muted); max-width: 700px; margin: 0 auto; margin-bottom: 30px;}

/* SECCIONES DE TEXTO (NUEVO: Para recuperar contenido) */
.content-section { margin-bottom: 40px; }
.content-section h2 { font-size: 1.5rem; margin-bottom: 16px; color: white; }
.content-section p { color: var(--text-muted); margin-bottom: 16px; font-size: 1rem; }

.feature-grid {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-bottom: 32px;
}
.feature-item {
  background: rgba(255,255,255,0.03); padding: 16px; border-radius: 12px; border: 1px solid var(--border);
}

/* TABS */
.custom-tabs {
  display: flex; background: rgba(0,0,0,0.3); padding: 6px;
  border-radius: 12px; gap: 6px; margin-bottom: 30px; border: 1px solid var(--border);
}
.tab-btn {
  flex: 1; border: none; background: none; color: var(--text-muted); padding: 12px;
  border-radius: 8px; font-weight: 600; font-size: 0.95rem; cursor: pointer;
  transition: all 0.3s ease; display: flex; align-items: center; justify-content: center; gap: 8px;
}
.tab-btn.active { background: #1e293b; color: white; border: 1px solid var(--border); }

/* CARDS DE SELECCIÓN */
.option-card {
  padding: 24px; margin-bottom: 16px; cursor: pointer; transition: all 0.2s ease; 
  position: relative; overflow: hidden; border: 1px solid var(--border);
}
.option-card:hover { border-color: rgba(255,255,255,0.3); background: rgba(255,255,255,0.03); }
.option-card.selected { border-color: var(--primary); background: rgba(99, 102, 241, 0.08); }

/* SIDEBAR & BUTTONS */
.summary-box { position: sticky; top: 40px; padding: 32px; height: fit-content; }

.btn-primary {
  width: 100%; padding: 16px; background: var(--primary); color: white; border: none;
  border-radius: 12px; font-weight: 700; font-size: 1rem; cursor: pointer; margin-top: 24px;
  display: flex; align-items: center; justify-content: center; gap: 10px; transition: 0.2s;
}
.btn-primary:hover { background: #4f46e5; }

.btn-secondary {
  width: 100%; padding: 14px; background: transparent; color: var(--text-muted); 
  border: 1px solid var(--border); border-radius: 12px; font-weight: 600; 
  cursor: pointer; margin-top: 12px; font-size: 0.9rem;
}
.btn-secondary:hover { color: white; border-color: rgba(255,255,255,0.4); }

/* MODAL */
.modal-overlay {
  position: fixed; inset: 0; background: rgba(0,0,0,0.9); z-index: 9999; 
  display: flex; align-items: center; justify-content: center; padding: 20px;
}
.modal-content {
  background: #0f172a; border: 1px solid var(--border); width: 100%; max-width: 450px;
  padding: 32px; border-radius: 20px; position: relative;
}
.input-field {
  width: 100%; padding: 14px; background: #1e293b; border: 1px solid var(--border);
  border-radius: 8px; color: white; margin-bottom: 12px; font-family: inherit;
}
`;

/* ──────────────────────────────────────────────────────────────────────────
   2. DATOS
   ────────────────────────────────────────────────────────────────────────── */
const LEVELS = [
  { id: 'A1', title: 'Nivel A1: Iniciación Visual', desc: 'Tu puerta de entrada a la cultura Sorda. Fundamentos de supervivencia y estructura gramatical básica.', duration: '3 Meses', price: 24990, enrollment: 19990 },
  { id: 'A2', title: 'Nivel A2: Gramática Espacial', desc: 'Desarrollo de narrativa. Aprenderás a usar el espacio tridimensional para contar historias.', duration: '4 Meses', price: 28990, enrollment: 19990 },
  { id: 'B1', title: 'Nivel B1: Contexto Profesional', desc: 'Especialización. Vocabulario técnico y situaciones complejas de interpretación.', duration: '6 Meses', price: 32990, enrollment: 19990 }
];

const SYLLABUS_A1 = [
  { title: "Unidad 1: Despertar Visual", topics: ["Cultura Sorda vs Oyente", "Alfabeto Dactilológico", "Expresión Facial Gramatical"] },
  { title: "Unidad 2: Mi Entorno", topics: ["Saludos y Presentación", "Números y Tiempo", "Familia y Relaciones"] },
  { title: "Unidad 3: Estructura LSCh", topics: ["Sintaxis OSV", "Verbos Direccionales", "Clasificadores Básicos"] }
];

/* ──────────────────────────────────────────────────────────────────────────
   3. COMPONENTE MODAL
   ────────────────────────────────────────────────────────────────────────── */
function EnrollmentModal({ level, price, detail, onClose, onConfirm }) {
  const [loading, setLoading] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { onConfirm(); setLoading(false); }, 800);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content animate-in">
        <button onClick={onClose} style={{position:'absolute', top:20, right:20, background:'none', border:'none', color:'white', cursor:'pointer'}}>
          <X size={24}/>
        </button>
        <h3 style={{fontSize:'1.4rem', fontWeight: 700, marginBottom:8}}>Ficha de Alumno</h3>
        <p style={{color:'var(--text-muted)', marginBottom:20, fontSize:'0.95rem'}}>
          Estás a un paso de ingresar al nivel <strong>{level}</strong>.
        </p>

        <div style={{background:'#1e293b', padding:16, borderRadius:12, marginBottom:24, display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <span style={{color:'var(--cyan)', fontWeight:600}}>{detail}</span>
          <span style={{fontSize:'1.2rem', fontWeight:800, color:'white'}}>{price}</span>
        </div>

        <form onSubmit={handleSubmit}>
          <input className="input-field" placeholder="Nombre y Apellido" required />
          <input className="input-field" placeholder="Correo Electrónico" type="email" required />
          <input className="input-field" placeholder="+56 9 ..." type="tel" required />
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? <Loader2 className="animate-spin"/> : 'Continuar al Pago'}
          </button>
        </form>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   4. COMPONENTE PRINCIPAL
   ────────────────────────────────────────────────────────────────────────── */
export default function LSChInscripcion() {
  const { addToCart } = useCart ? useCart() : { addToCart: ()=> console.log("Modo Demo") }; 
  
  const [activeTab, setActiveTab] = useState('informacion'); // Cambié el default a 'informacion' para que lean primero
  const [selectedLevelId, setSelectedLevelId] = useState('A1');
  const [churchMode, setChurchMode] = useState(false);
  const [openUnit, setOpenUnit] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const selectedLevel = LEVELS.find(l => l.id === selectedLevelId);
  const currentPrice = churchMode ? selectedLevel.price * 0.8 : selectedLevel.price;
  const currentEnrollment = churchMode ? 0 : selectedLevel.enrollment;
  const total = currentPrice + currentEnrollment;

  const clp = (val) => new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(val);

  const handleAddToCart = (redirect = false) => {
    addToCart({
      id: `lsch-${selectedLevelId}-${Date.now()}`,
      name: selectedLevel.title,
      price: total,
      category: 'Cursos',
      details: [`Plan: ${churchMode ? 'Iglesia' : 'General'}`, `Nivel: ${selectedLevelId}`]
    });
    setShowModal(false);
    if (!redirect) alert("Curso añadido al carrito exitosamente.");
  };

  return (
    <div className="lael-app">
      <SEOHead title="Curso LSCh | Admisión" description="Aprende Lengua de Señas Chilena" />
      <style>{styles}</style>

      {showModal && (
        <EnrollmentModal 
          level={selectedLevel.title} price={clp(total)}
          detail={churchMode ? 'Beca Iglesia' : 'Arancel General'}
          onClose={() => setShowModal(false)}
          onConfirm={() => handleAddToCart(true)}
        />
      )}

      {/* HERO SECTION */}
      <section className="hero">
        <div style={{display:'inline-flex', alignItems:'center', gap:8, padding:'6px 16px', borderRadius:50, background:'rgba(6,182,212,0.1)', border:'1px solid rgba(6,182,212,0.3)', color:'#22d3ee', fontSize:'0.8rem', fontWeight:700, marginBottom:24}}>
          <Zap size={14} fill="currentColor"/> Matrículas Abiertas 2026
        </div>
        <h1>
          No es solo mover las manos,<br/>
          <span className="text-highlight">es pensar visualmente.</span>
        </h1>
        <p>
          Formación académica en Lengua de Señas Chilena (LSCh) con inmersión cultural profunda.
          Clases en vivo, docentes nativos y certificación válida.
        </p>
      </section>

      <div className="main-container">
        
        {/* COLUMNA IZQUIERDA: CONTENIDO EDUCATIVO */}
        <div className="animate-in">
          
          <div className="custom-tabs">
            <button className={`tab-btn ${activeTab === 'informacion' ? 'active' : ''}`} onClick={() => setActiveTab('informacion')}>
              <BrainCircuit size={18}/> El Programa
            </button>
             <button className={`tab-btn ${activeTab === 'niveles' ? 'active' : ''}`} onClick={() => setActiveTab('niveles')}>
              <LayoutGrid size={18}/> Inscripción y Niveles
            </button>
            <button className={`tab-btn ${activeTab === 'malla' ? 'active' : ''}`} onClick={() => setActiveTab('malla')}>
              <BookOpen size={18}/> Malla A1
            </button>
          </div>

          {/* TAB 1: INFORMACIÓN Y PERSUASIÓN (EL TEXTO QUE FALTABA) */}
          {activeTab === 'informacion' && (
            <div className="glass-panel" style={{padding: '32px'}}>
              <div className="content-section">
                <h2 className="text-highlight">Metodología de Inmersión</h2>
                <p>
                  A diferencia de los cursos tradicionales donde se memorizan listas de palabras, nuestro programa 
                  se centra en la <strong>gramática espacial</strong>. Desde la primera clase, aprenderás a 
                  desconectar tu voz y activar tu procesamiento visual.
                </p>
                <p>
                  Contamos con un modelo de <strong>Co-Docencia</strong>: un Instructor Sordo (modelo lingüístico nativo) 
                  y un Intérprete Oyente (puente pedagógico) en cada sesión.
                </p>
              </div>

              <div className="feature-grid">
                <div className="feature-item">
                  <PlayCircle className="text-highlight" style={{marginBottom:12}}/>
                  <h4 style={{fontWeight:700, marginBottom:4}}>Clases Grabadas</h4>
                  <p style={{fontSize:'0.85rem', color:'#94a3b8', margin:0}}>Acceso de por vida a las grabaciones para repaso.</p>
                </div>
                <div className="feature-item">
                  <Users className="text-highlight" style={{marginBottom:12}}/>
                  <h4 style={{fontWeight:700, marginBottom:4}}>Comunidad</h4>
                  <p style={{fontSize:'0.85rem', color:'#94a3b8', margin:0}}>Prácticas semanales con comunidad sorda real.</p>
                </div>
                <div className="feature-item">
                  <ShieldCheck className="text-highlight" style={{marginBottom:12}}/>
                  <h4 style={{fontWeight:700, marginBottom:4}}>Certificación</h4>
                  <p style={{fontSize:'0.85rem', color:'#94a3b8', margin:0}}>Diploma digital al aprobar examen final.</p>
                </div>
              </div>

              <div style={{marginTop: 24, padding: 16, background: 'rgba(6,182,212,0.1)', borderRadius: 12, borderLeft: '4px solid var(--cyan)'}}>
                <p style={{margin:0, fontSize:'0.9rem', color: '#e2e8f0'}}>
                  <strong>¿Para quién es este curso?</strong> Ideal para profesionales de la salud, educación, 
                  líderes ministeriales o cualquier persona que busque una conexión real, no solo un certificado.
                </p>
              </div>
              
              <button className="btn-secondary" style={{marginTop:24}} onClick={() => setActiveTab('niveles')}>
                Ver horarios y precios <ArrowRight size={16} style={{display:'inline', marginLeft:8}}/>
              </button>
            </div>
          )}

          {/* TAB 2: SELECCIÓN DE NIVELES */}
          {activeTab === 'niveles' && (
            <div>
              <h3 style={{fontSize:'1.3rem', marginBottom:16}}>Selecciona tu punto de partida</h3>
              {LEVELS.map((level) => (
                <div 
                  key={level.id}
                  className={`glass-panel option-card ${selectedLevelId === level.id ? 'selected' : ''}`}
                  onClick={() => setSelectedLevelId(level.id)}
                >
                  <div style={{display: 'flex', justifyContent: 'space-between', alignItems:'flex-start', marginBottom: 8}}>
                    <div>
                      <strong style={{fontSize: '1.1rem', color: selectedLevelId === level.id ? 'var(--cyan)' : 'white'}}>
                        {level.title}
                      </strong>
                      <p style={{color: 'var(--text-muted)', fontSize: '0.9rem', margin: '8px 0 12px'}}>
                        {level.desc}
                      </p>
                    </div>
                    {selectedLevelId === level.id && <div style={{background:'var(--cyan)', borderRadius:'50%', padding:2}}><Check size={14} color="black"/></div>}
                  </div>
                  
                  <div style={{display: 'flex', gap: 16, fontSize: '0.8rem', color: '#94a3b8', borderTop: '1px solid var(--border)', paddingTop: 12}}>
                     <span style={{display:'flex', alignItems:'center', gap:6}}><Clock size={14}/> {level.duration}</span>
                     <span style={{display:'flex', alignItems:'center', gap:6}}><Globe size={14}/> Online en Vivo</span>
                     <span style={{display:'flex', alignItems:'center', gap:6}}><Users size={14}/> Cupos limitados</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: MALLA */}
          {activeTab === 'malla' && (
            <div className="glass-panel" style={{padding: 24}}>
              <h3 style={{marginBottom: 24}}>Detalle Académico: {selectedLevel.title}</h3>
              {SYLLABUS_A1.map((unit, idx) => (
                <div key={idx} style={{borderBottom:'1px solid var(--border)', marginBottom:16, paddingBottom:16}}>
                  <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', cursor:'pointer', marginBottom:12}} onClick={() => setOpenUnit(openUnit === idx ? -1 : idx)}>
                    <span style={{fontWeight:600, color:'white'}}>{unit.title}</span>
                    {openUnit === idx ? <ChevronDown size={18}/> : <ChevronRight size={18}/>}
                  </div>
                  {openUnit === idx && (
                    <ul style={{listStyle:'none', paddingLeft:12, margin:0}}>
                      {unit.topics.map(t => (
                        <li key={t} style={{display:'flex', alignItems:'center', gap:10, fontSize:'0.9rem', color:'var(--text-muted)', marginBottom:6}}>
                          <span style={{width:6, height:6, background:'var(--cyan)', borderRadius:'50%'}}></span>{t}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* COLUMNA DERECHA: SIDEBAR DE PAGO (Responsive Fix: Abajo en móvil) */}
        <div>
          <div className="glass-panel summary-box">
            <h3 style={{fontSize: '1.1rem', fontWeight: 700, marginBottom: 20}}>Resumen de Inscripción</h3>
            
            <div style={{display: 'flex', gap: 16, marginBottom: 24, paddingBottom: 24, borderBottom: '1px solid var(--border)'}}>
               <div style={{background: '#1e293b', width: 48, height: 48, borderRadius: 12, display:'flex', alignItems:'center', justifyContent:'center'}}>
                 <BookOpen size={24} color="var(--cyan)"/>
               </div>
               <div>
                 <strong style={{display: 'block', fontSize: '1rem', lineHeight:1.2}}>{selectedLevel.title.split(':')[0]}</strong>
                 <span style={{color: 'var(--text-muted)', fontSize: '0.85rem'}}>{selectedLevel.title.split(':')[1]}</span>
               </div>
            </div>

            {/* SWITCH IGLESIA */}
            <div 
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                background: churchMode ? 'rgba(245, 158, 11, 0.1)' : 'rgba(255,255,255,0.03)',
                border: churchMode ? '1px solid rgba(245, 158, 11, 0.4)' : '1px solid var(--border)',
                padding: '12px 16px', borderRadius: 12, marginBottom: 24, cursor: 'pointer', transition: '0.3s'
              }}
              onClick={() => setChurchMode(!churchMode)}
            >
               <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
                  <Church size={18} color={churchMode ? '#f59e0b' : '#94a3b8'}/>
                  <div>
                    <strong style={{display: 'block', fontSize: '0.9rem', color: churchMode ? '#f59e0b' : 'white'}}>Soy de Iglesia</strong>
                    <span style={{fontSize: '0.75rem', color: 'var(--text-muted)'}}>Descuento + Matrícula $0</span>
                  </div>
               </div>
               <div className={`toggle-btn ${churchMode ? 'active' : ''}`} style={{
                 width: 40, height: 22, background: churchMode ? '#f59e0b' : '#334155', borderRadius: 20, position:'relative', transition:'0.3s'
               }}>
                  <div style={{
                    width: 16, height: 16, background: 'white', borderRadius: '50%', position: 'absolute', top: 3, left: 3,
                    transform: churchMode ? 'translateX(18px)' : 'translateX(0)', transition:'0.3s'
                  }}></div>
               </div>
            </div>

            <div style={{marginBottom: 20}}>
                <div style={{display:'flex', justifyContent:'space-between', fontSize:'0.9rem', color:'var(--text-muted)', marginBottom:8}}>
                  <span>Arancel Mensual</span>
                  <span>{clp(currentPrice)}</span>
                </div>
                <div style={{display:'flex', justifyContent:'space-between', fontSize:'0.9rem', color:'var(--text-muted)'}}>
                  <span>Matrícula</span>
                  <span style={{color: currentEnrollment === 0 ? '#4ade80' : 'white', fontWeight: currentEnrollment === 0 ? 700 : 400}}>
                    {currentEnrollment === 0 ? 'BONIFICADA' : clp(currentEnrollment)}
                  </span>
                </div>
            </div>

            <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-end', borderTop:'1px solid var(--border)', paddingTop:20}}>
               <div>
                 <span style={{fontSize: '0.8rem', color: 'var(--text-muted)'}}>Total a pagar hoy</span>
               </div>
               <div style={{fontSize: '1.8rem', fontWeight: 800, color: 'white', lineHeight:1}}>{clp(total)}</div>
            </div>

            <button className="btn-primary" onClick={() => setShowModal(true)}>
              Comenzar Inscripción <ArrowRight size={20}/>
            </button>
            
            <button className="btn-secondary" onClick={() => handleAddToCart(false)}>
               <span style={{display:'flex', alignItems:'center', justifyContent:'center', gap:8}}>
                 <ShoppingCart size={16}/> Solo añadir al carrito
               </span>
            </button>

            <div style={{display:'flex', justifyContent:'center', marginTop: 16, gap:6, color: '#64748b', fontSize: '0.75rem'}}>
               <HeartHandshake size={14}/> Garantía de satisfacción 100%
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}