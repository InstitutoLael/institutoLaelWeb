import React, { useState, useMemo } from 'react';
import { 
  BookOpen, Users, Star, Check, ChevronDown, ChevronRight, 
  MapPin, Clock, ShieldCheck, Zap, Globe, MessageCircle, 
  ArrowRight, Church, LayoutGrid 
} from 'lucide-react';

/* ──────────────────────────────────────────────────────────────────────────
   1. ESTILOS CSS ENCAPSULADOS (DISEÑO PREMIUM)
   Esto asegura que se vea bien sin depender de librerías externas.
   ────────────────────────────────────────────────────────────────────────── */
const styles = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

:root {
  --bg-deep: #020617;
  --bg-card: #0f172a;
  --bg-glass: rgba(15, 23, 42, 0.6);
  --primary: #6366f1; /* Indigo vibrante */
  --primary-glow: rgba(99, 102, 241, 0.5);
  --cyan: #06b6d4;
  --text-main: #f8fafc;
  --text-muted: #94a3b8;
  --border: rgba(255, 255, 255, 0.08);
  --radius: 16px;
}

.lael-app {
  font-family: 'Plus Jakarta Sans', sans-serif;
  background-color: var(--bg-deep);
  color: var(--text-main);
  min-height: 100vh;
  padding-bottom: 80px;
  line-height: 1.5;
}

/* UTILIDADES VISUALES */
.glass-panel {
  background: var(--bg-glass);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  box-shadow: 0 4px 24px -1px rgba(0, 0, 0, 0.2);
}

.title-gradient {
  background: linear-gradient(135deg, #fff 0%, #94a3b8 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.accent-text {
  color: var(--cyan);
  font-weight: 700;
}

/* GRID LAYOUT */
.main-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 40px;
  position: relative;
}

@media (max-width: 1024px) {
  .main-container { grid-template-columns: 1fr; }
}

/* HERO */
.hero {
  padding: 80px 0 60px;
  text-align: center;
}
.hero h1 {
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 16px;
  line-height: 1.1;
  letter-spacing: -0.02em;
}
.hero p {
  font-size: 1.125rem;
  color: var(--text-muted);
  max-width: 600px;
  margin: 0 auto;
}

/* TABS DE NAVEGACIÓN */
.custom-tabs {
  display: flex;
  background: rgba(255,255,255,0.03);
  padding: 6px;
  border-radius: 12px;
  gap: 6px;
  margin-bottom: 30px;
  border: 1px solid var(--border);
}
.tab-btn {
  flex: 1;
  border: none;
  background: none;
  color: var(--text-muted);
  padding: 12px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}
.tab-btn:hover { color: white; background: rgba(255,255,255,0.05); }
.tab-btn.active {
  background: var(--bg-card);
  color: white;
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  border: 1px solid var(--border);
}

/* TARJETAS DE SELECCIÓN (NIVELES) */
.option-card {
  padding: 24px;
  margin-bottom: 16px;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;
}
.option-card:hover {
  border-color: rgba(255,255,255,0.2);
  transform: translateY(-2px);
}
.option-card.selected {
  border-color: var(--primary);
  background: rgba(99, 102, 241, 0.05);
}
.option-card.selected::before {
  content: '';
  position: absolute;
  left: 0; top: 0; bottom: 0;
  width: 4px;
  background: var(--primary);
}

/* ACORDEÓN MALLA */
.accordion-item {
  border-bottom: 1px solid var(--border);
}
.accordion-header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  background: none;
  border: none;
  color: white;
  font-weight: 600;
  cursor: pointer;
  text-align: left;
}
.accordion-body {
  padding-bottom: 20px;
  color: var(--text-muted);
  font-size: 0.95rem;
  padding-left: 12px;
}
.accordion-body li {
  margin-bottom: 8px;
  list-style: none;
  display: flex;
  align-items: center;
  gap: 10px;
}
.dot { width: 6px; height: 6px; background: var(--cyan); border-radius: 50%; }

/* SIDEBAR RESUMEN (STICKY) */
.summary-box {
  position: sticky;
  top: 40px;
  padding: 32px;
}
.price-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  font-size: 0.95rem;
  color: var(--text-muted);
}
.price-total {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid var(--border);
}
.total-amount {
  font-size: 2rem;
  font-weight: 800;
  color: white;
  line-height: 1;
}

/* SWITCH IGLESIA */
.church-switch {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(255, 166, 0, 0.05); /* Orange tint */
  border: 1px solid rgba(255, 166, 0, 0.2);
  padding: 16px 20px;
  border-radius: 12px;
  margin: 24px 0;
  cursor: pointer;
}
.toggle-btn {
  width: 48px;
  height: 26px;
  background: #334155;
  border-radius: 50px;
  position: relative;
  transition: 0.3s;
}
.toggle-btn.active { background: #f59e0b; }
.toggle-circle {
  width: 20px; height: 20px;
  background: white;
  border-radius: 50%;
  position: absolute;
  top: 3px; left: 3px;
  transition: 0.3s;
}
.toggle-btn.active .toggle-circle { transform: translateX(22px); }

/* BOTÓN PRIMARIO */
.btn-primary {
  width: 100%;
  padding: 18px;
  background: var(--primary);
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: 0.2s;
  box-shadow: 0 0 20px var(--primary-glow);
}
.btn-primary:hover {
  background: #4f46e5;
  transform: translateY(-2px);
}

/* TEACHER CARD */
.teacher-card {
  display: flex;
  gap: 20px;
  padding: 24px;
  margin-top: 20px;
}
.avatar {
  width: 60px; height: 60px;
  background: #334155;
  border-radius: 12px;
  display: flex; align-items: center; justify-content: center;
  font-weight: 700; font-size: 1.5rem; color: #94a3b8;
}

/* ANIMACIONES */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-in { animation: fadeIn 0.4s ease-out forwards; }
`;

/* ──────────────────────────────────────────────────────────────────────────
   2. DATOS (MOCKUP)
   Basados en tus imágenes.
   ────────────────────────────────────────────────────────────────────────── */
const LEVELS = [
  {
    id: 'A1',
    title: 'Nivel A1: Iniciación Visual',
    desc: 'Fundamentos y Supervivencia. Aprenderás el abecedario, saludos, familia y estructura básica.',
    duration: '3 Meses / 24 Clases',
    price: 24990,
    enrollment: 19990
  },
  {
    id: 'A2',
    title: 'Nivel A2: Gramática Espacial',
    desc: 'Fluidez y Narrativa. Verbos direccionales y uso del espacio para describir escenas complejas.',
    duration: '4 Meses / 32 Clases',
    price: 28990,
    enrollment: 19990
  },
  {
    id: 'B1',
    title: 'Nivel B1: Contexto Profesional',
    desc: 'Especialización técnica para salud, educación y atención al público.',
    duration: '6 Meses / 48 Clases',
    price: 32990,
    enrollment: 19990
  }
];

const SYLLABUS_A1 = [
  { title: "Unidad 1: Inmersión Visual", topics: ["Alfabeto Dactilológico", "Configuraciones Manuales", "Expresión Facial (Rasgos no manuales)"] },
  { title: "Unidad 2: Vida Cotidiana", topics: ["Saludos y Presentación", "Familia y Entorno", "Días, Meses y Tiempo"] },
  { title: "Unidad 3: Gramática LSCh", topics: ["Estructura OSV", "Verbos Direccionales", "Clasificadores"] }
];

/* ──────────────────────────────────────────────────────────────────────────
   3. COMPONENTE PRINCIPAL
   ────────────────────────────────────────────────────────────────────────── */
export default function LSChInscripcion() {
  const [activeTab, setActiveTab] = useState('programa'); // programa | malla | docentes
  const [selectedLevelId, setSelectedLevelId] = useState('A1');
  const [churchMode, setChurchMode] = useState(false);
  const [openUnit, setOpenUnit] = useState(0); // Para el acordeón

  // Cálculos
  const selectedLevel = LEVELS.find(l => l.id === selectedLevelId);
  const currentPrice = churchMode ? selectedLevel.price * 0.8 : selectedLevel.price; // 20% dcto iglesia
  const currentEnrollment = churchMode ? 0 : selectedLevel.enrollment; // Matrícula gratis iglesia
  const total = currentPrice + currentEnrollment;

  // Formato Moneda
  const clp = (val) => new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(val);

  return (
    <div className="lael-app">
      <style>{styles}</style>

      {/* HEADER HERO */}
      <section className="hero">
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8, 
          padding: '6px 16px', borderRadius: 50, 
          background: 'rgba(6, 182, 212, 0.1)', border: '1px solid rgba(6, 182, 212, 0.3)',
          color: '#22d3ee', fontSize: '0.8rem', fontWeight: 700, marginBottom: 24
        }}>
          <Zap size={14} fill="currentColor"/> Admisión 2026
        </div>
        <h1>
          <span className="title-gradient">Rompe la barrera</span><br/>
          <span className="accent-text">del sonido.</span>
        </h1>
        <p>
          Un programa académico diseñado no solo para enseñar señas, 
          sino para estructurar tu pensamiento visual.
        </p>
      </section>

      <div className="main-container">
        
        {/* COLUMNA IZQUIERDA: CONTENIDO */}
        <div className="animate-in">
          
          {/* TABS NAVEGACIÓN */}
          <div className="custom-tabs">
            <button 
              className={`tab-btn ${activeTab === 'programa' ? 'active' : ''}`}
              onClick={() => setActiveTab('programa')}
            >
              <LayoutGrid size={18}/> Programa
            </button>
            <button 
              className={`tab-btn ${activeTab === 'malla' ? 'active' : ''}`}
              onClick={() => setActiveTab('malla')}
            >
              <BookOpen size={18}/> Malla Completa
            </button>
            <button 
              className={`tab-btn ${activeTab === 'docentes' ? 'active' : ''}`}
              onClick={() => setActiveTab('docentes')}
            >
              <Users size={18}/> Docentes
            </button>
          </div>

          {/* CONTENIDO DINÁMICO */}
          {activeTab === 'programa' && (
            <div>
              <h3 style={{marginBottom: 20, fontSize: '1.2rem'}}>Selecciona tu nivel de ingreso</h3>
              {LEVELS.map((level) => (
                <div 
                  key={level.id}
                  className={`glass-panel option-card ${selectedLevelId === level.id ? 'selected' : ''}`}
                  onClick={() => setSelectedLevelId(level.id)}
                >
                  <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 8}}>
                    <strong style={{fontSize: '1.1rem', color: selectedLevelId === level.id ? 'var(--cyan)' : 'white'}}>
                      {level.title}
                    </strong>
                    {selectedLevelId === level.id && <Check size={20} color="var(--cyan)"/>}
                  </div>
                  <p style={{color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: 12}}>
                    {level.desc}
                  </p>
                  <div style={{display: 'flex', gap: 12, fontSize: '0.8rem', color: '#94a3b8'}}>
                     <span style={{display:'flex', alignItems:'center', gap:6}}><Clock size={14}/> {level.duration}</span>
                     <span style={{display:'flex', alignItems:'center', gap:6}}><Globe size={14}/> Online en Vivo</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'malla' && (
            <div className="glass-panel" style={{padding: 24}}>
              <h3 style={{marginBottom: 24}}>Malla Curricular: {selectedLevel.title}</h3>
              {SYLLABUS_A1.map((unit, idx) => (
                <div key={idx} className="accordion-item">
                  <button className="accordion-header" onClick={() => setOpenUnit(openUnit === idx ? -1 : idx)}>
                    {unit.title}
                    {openUnit === idx ? <ChevronDown size={20}/> : <ChevronRight size={20}/>}
                  </button>
                  {openUnit === idx && (
                    <div className="accordion-body">
                      <ul>
                        {unit.topics.map(topic => (
                          <li key={topic}><div className="dot"></div> {topic}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {activeTab === 'docentes' && (
            <div>
               <h3 style={{marginBottom: 10}}>Conoce a tu equipo docente</h3>
               <p style={{color: 'var(--text-muted)'}}>Metodología de co-docencia: Instructor Sordo + Intérprete Oyente.</p>
               
               <div className="glass-panel teacher-card">
                  <div className="avatar">F</div>
                  <div>
                    <h4 style={{fontSize: '1.1rem', fontWeight: 700}}>Fernanda</h4>
                    <span style={{color: 'var(--cyan)', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px'}}>
                      Educadora & Facilitadora LSCh
                    </span>
                    <p style={{fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: 8, lineHeight: 1.6}}>
                      Nuestra profesora nativa (Sorda) y Educadora de Párvulos profesional. Combina la cultura sorda con pedagogía experta.
                    </p>
                  </div>
               </div>
            </div>
          )}
        </div>

        {/* COLUMNA DERECHA: RESUMEN (Igual a la imagen) */}
        <div>
          <div className="glass-panel summary-box">
            <h3 style={{fontSize: '1rem', fontWeight: 700, marginBottom: 24}}>Tu Inscripción</h3>
            
            <div style={{display: 'flex', gap: 16, marginBottom: 24}}>
               <div style={{background: '#1e293b', padding: 12, borderRadius: 12, height: 'fit-content'}}>
                 <BookOpen size={24} color="var(--text-muted)"/>
               </div>
               <div>
                 <strong style={{display: 'block', fontSize: '1rem'}}>LSCh {selectedLevel.title.split(':')[0]}</strong>
                 <span style={{color: 'var(--text-muted)', fontSize: '0.9rem'}}>{selectedLevel.title.split(':')[1]}</span>
               </div>
            </div>

            {/* SWITCH IGLESIA */}
            <div className="church-switch" onClick={() => setChurchMode(!churchMode)}>
               <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
                  <div style={{background: '#f59e0b', padding: 6, borderRadius: 6, color: 'black'}}>
                    <Church size={16}/>
                  </div>
                  <div>
                    <strong style={{display: 'block', fontSize: '0.9rem', color: '#f59e0b'}}>Convenio Iglesia</strong>
                    <span style={{fontSize: '0.75rem', color: 'var(--text-muted)'}}>Descuento ministerios</span>
                  </div>
               </div>
               <div className={`toggle-btn ${churchMode ? 'active' : ''}`}>
                  <div className="toggle-circle"></div>
               </div>
            </div>

            {/* DESGLOSE PRECIOS */}
            <div className="price-row">
              <span>Arancel Mensual</span>
              <span>{clp(currentPrice)}</span>
            </div>
            <div className="price-row">
              <span>Matrícula</span>
              <span style={{color: currentEnrollment === 0 ? '#4ade80' : 'white', fontWeight: currentEnrollment === 0 ? 700 : 400}}>
                {currentEnrollment === 0 ? 'GRATIS' : clp(currentEnrollment)}
              </span>
            </div>

            {/* TOTAL */}
            <div className="price-total">
               <div>
                 <span style={{fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block'}}>Total a pagar hoy</span>
                 <span style={{fontSize: '0.75rem', color: '#4ade80'}}>IVA Incluido</span>
               </div>
               <div className="total-amount">{clp(total)}</div>
            </div>

            <button className="btn-primary">
              Inscribirme Ahora <ArrowRight size={20}/>
            </button>

            <div style={{display:'flex', justifyContent:'center', marginTop: 16, gap:6, color: '#64748b', fontSize: '0.75rem'}}>
               <ShieldCheck size={14}/> Garantía de devolución de 7 días.
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}