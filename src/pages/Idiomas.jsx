import React, { useState, useEffect, useMemo } from 'react';
import { useCart } from '../context/CartContext'; // Asumo que esto existe
import SEOHead from "../components/SEOHead.jsx";

// ICONOS (LUCIDE REACT)
import { 
  Hand, Check, Star, ShieldCheck, ArrowRight, 
  Church, Sparkles, X, Heart, Loader2, Zap,
  BookOpen, Calendar, Users, PlayCircle,
  GraduationCap, MessageCircle, Info, ChevronDown, ChevronRight,
  Clock, MapPin, MonitorPlay
} from 'lucide-react';

/* ──────────────────────────────────────────────────────────────────────────
   1. DATA LAYER (SIMULACIÓN DE BASE DE DATOS)
   ────────────────────────────────────────────────────────────────────────── */

const COURSE_DATA = {
  id: 'lsch-pro',
  title: 'Lengua de Señas Chilena',
  subtitle: 'Formación Integral & Cultura Sorda',
  description: 'Un programa académico diseñado no solo para enseñar señas, sino para estructurar tu pensamiento visual. Aprende gramática, cultura y expresión con nativos.',
  levels: [
    {
      id: 'A1',
      name: 'Nivel A1: Inmersión',
      shortDesc: 'Fundamentos y Supervivencia',
      duration: '3 Meses',
      lessons: 24,
      color: '#06b6d4',
      syllabus: [
        {
          unit: 'Unidad 1: Despertar Visual',
          topics: [
            'Dactilológico y configuración manual',
            'La importancia del contacto visual',
            'Expresión facial: Rasgos no manuales (RNM)',
            'Práctica: Tu nombre en el espacio'
          ]
        },
        {
          unit: 'Unidad 2: Entorno Inmediato',
          topics: [
            'Familia y pronombres',
            'Colores y números (Cardinal vs Ordinal)',
            'Días de la semana y meses',
            'Laboratorio: Describiendo mi casa'
          ]
        },
        {
          unit: 'Unidad 3: Gramática Básica',
          topics: [
            'Estructura OSV (Objeto - Sujeto - Verbo)',
            'Negación y afirmación',
            'Preguntas cerradas y abiertas',
            'Verbos simples vs direccionales'
          ]
        }
      ]
    },
    {
      id: 'A2',
      name: 'Nivel A2: Conversación',
      shortDesc: 'Fluidez y Narrativa',
      duration: '4 Meses',
      lessons: 32,
      color: '#8b5cf6',
      syllabus: [
        { unit: 'Unidad 1: Clasificadores', topics: ['Uso del espacio 3D', 'Formas y tamaños', 'Movimiento y trayectoria'] },
        { unit: 'Unidad 2: Tiempos Verbales', topics: ['Línea de tiempo corporal', 'Futuro y Pasado', 'Aspecto perfectivo'] },
        { unit: 'Unidad 3: Narrativa', topics: ['Contar historias breves', 'Roles (Role-shifting)', 'Humor Sordo'] }
      ]
    },
    {
      id: 'B1',
      name: 'Nivel B1: Intérprete',
      shortDesc: 'Profesionalización',
      duration: '6 Meses',
      lessons: 48,
      color: '#f59e0b',
      syllabus: [
        { unit: 'Unidad 1: Interpretación', topics: ['Técnicas de voicing', 'Ética del intérprete', 'Contextos legales'] },
        { unit: 'Unidad 2: Lingüística', topics: ['Fonología de la LSCh', 'Morfología avanzada', 'Sociolingüística'] }
      ]
    }
  ]
};

const SCHEDULE_OPTIONS = [
  { id: 'morning_a', label: 'Mañana A', days: 'Lun y Mié', time: '10:00 - 11:30', slots: 5 },
  { id: 'evening_b', label: 'Noche B', days: 'Mar y Jue', time: '19:30 - 21:00', slots: 12 },
  { id: 'saturday_c', label: 'Sábado Intensivo', days: 'Sábados', time: '09:00 - 12:00', slots: 2 }
];

const TEACHERS = [
  { 
    id: 1, 
    name: 'Carolina M.', 
    role: 'Instructora Sorda Nativa', 
    bio: 'Activista de la comunidad Sorda con 10 años de experiencia enseñando LSCh en universidades.',
    tags: ['Nativa', 'Pedagoga']
  },
  { 
    id: 2, 
    name: 'Felipe S.', 
    role: 'Intérprete Co-Docente', 
    bio: 'Intérprete certificado que apoya el puente comunicativo en los niveles iniciales.',
    tags: ['Certificado', 'Lingüista']
  }
];

const PRICING = {
  baseMonth: 35000,
  enrollment: 15000,
  churchDiscount: 0.20, // 20% descuento mensual
  fullPackDiscount: 0.10 // 10% si paga todo el nivel
};

const clp = (num) => new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(num);

/* ──────────────────────────────────────────────────────────────────────────
   2. ESTILOS CSS AVANZADOS (INJECTED)
   ────────────────────────────────────────────────────────────────────────── */
const styles = `
:root {
  --bg-dark: #020617;
  --bg-panel: #0f172a;
  --bg-input: #1e293b;
  --primary: #06b6d4;
  --primary-dark: #0891b2;
  --accent: #f59e0b;
  --text-main: #f8fafc;
  --text-muted: #94a3b8;
  --border: rgba(255,255,255,0.08);
  --glass: rgba(15, 23, 42, 0.7);
}

.lsch-app {
  background-color: var(--bg-dark);
  color: var(--text-main);
  font-family: 'Plus Jakarta Sans', sans-serif;
  min-height: 100vh;
  padding-bottom: 100px;
}

/* UI UTILS */
.glass-panel {
  background: var(--bg-panel);
  border: 1px solid var(--border);
  backdrop-filter: blur(12px);
  border-radius: 20px;
}

.glow-text {
  text-shadow: 0 0 20px rgba(6, 182, 212, 0.5);
}

/* TABS NAVIGATION */
.nav-tabs {
  display: flex; gap: 4px; padding: 4px; background: var(--bg-input);
  border-radius: 12px; margin-bottom: 24px; overflow-x: auto;
}
.nav-tab {
  padding: 10px 20px; border-radius: 8px; font-weight: 600; font-size: 0.9rem;
  color: var(--text-muted); cursor: pointer; transition: all 0.2s; white-space: nowrap;
  display: flex; align-items: center; gap: 8px; border: none; background: transparent;
}
.nav-tab:hover { color: white; background: rgba(255,255,255,0.05); }
.nav-tab.active { background: var(--bg-panel); color: var(--primary); shadow: 0 2px 10px rgba(0,0,0,0.2); }

/* GRID SYSTEMS */
.layout-grid {
  display: grid; grid-template-columns: 1fr 380px; gap: 40px;
  max-width: 1280px; margin: 0 auto; padding: 0 24px;
}

/* SECTIONS */
.hero-section {
  padding: 80px 0 60px; text-align: center; position: relative; overflow: hidden;
  border-bottom: 1px solid var(--border); margin-bottom: 40px;
}

/* MODULE CARDS */
.level-card {
  border: 1px solid var(--border); padding: 20px; border-radius: 16px; cursor: pointer;
  background: linear-gradient(145deg, rgba(255,255,255,0.03), transparent);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1); position: relative; overflow: hidden;
}
.level-card:hover { transform: translateY(-4px); border-color: rgba(255,255,255,0.2); }
.level-card.selected { border-color: var(--primary); background: rgba(6, 182, 212, 0.05); }
.level-card.selected::before {
  content:''; position: absolute; left: 0; top: 0; bottom: 0; width: 4px; background: var(--primary);
}

/* ACCORDION */
.accordion-item { border-bottom: 1px solid var(--border); }
.accordion-trigger {
  width: 100%; display: flex; justify-content: space-between; align-items: center;
  padding: 16px 0; background: none; border: none; color: white; cursor: pointer;
}
.accordion-content {
  padding-bottom: 16px; color: var(--text-muted); font-size: 0.95rem; line-height: 1.6;
}

/* SCHEDULE SELECTOR */
.slot-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 12px; }
.time-slot {
  background: var(--bg-input); padding: 12px; border-radius: 12px; border: 1px solid var(--border);
  cursor: pointer; text-align: center; transition: 0.2s; position: relative;
}
.time-slot:hover { border-color: var(--primary); }
.time-slot.active { background: var(--primary); color: #020617; border-color: var(--primary); font-weight: 700; }
.slot-badge {
  position: absolute; top: -8px; right: -8px; background: #ef4444; color: white;
  font-size: 0.65rem; padding: 2px 6px; border-radius: 10px; font-weight: 700;
}

/* STICKY SUMMARY */
.summary-sticky {
  position: sticky; top: 30px;
}

@media (max-width: 1024px) {
  .layout-grid { grid-template-columns: 1fr; }
  .summary-sticky { position: relative; top: 0; }
}

/* ANIMATIONS */
@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
.animate-enter { animation: fadeIn 0.5s ease-out forwards; }
`;

/* ──────────────────────────────────────────────────────────────────────────
   3. SUB-COMPONENTES INTERNOS
   ────────────────────────────────────────────────────────────────────────── */

// A. Selector de Nivel (Visualmente rico)
const LevelSelector = ({ selected, onSelect }) => (
  <div className="grid gap-4 mb-8">
    {COURSE_DATA.levels.map((level) => (
      <div 
        key={level.id}
        onClick={() => onSelect(level.id)}
        className={`level-card ${selected === level.id ? 'selected' : ''}`}
      >
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <span style={{color: level.color}}><Sparkles size={16}/></span>
            {level.name}
          </h3>
          {selected === level.id && <div className="bg-cyan-500/20 text-cyan-400 px-2 py-1 rounded text-xs font-bold">SELECCIONADO</div>}
        </div>
        <p className="text-slate-400 text-sm mb-4">{level.shortDesc}</p>
        <div className="flex gap-4 text-xs text-slate-500">
          <span className="flex items-center gap-1"><Clock size={12}/> {level.duration}</span>
          <span className="flex items-center gap-1"><BookOpen size={12}/> {level.lessons} Clases</span>
        </div>
      </div>
    ))}
  </div>
);

// B. Visor de Malla Curricular (Interactivo)
const SyllabusViewer = ({ levelId }) => {
  const level = COURSE_DATA.levels.find(l => l.id === levelId);
  const [openUnit, setOpenUnit] = useState(0);

  return (
    <div className="animate-enter">
      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
        <BookOpen className="text-cyan-400"/> Malla Curricular: {level.name}
      </h3>
      <div className="glass-panel p-6">
        {level.syllabus.map((item, idx) => (
          <div key={idx} className="accordion-item">
            <button className="accordion-trigger" onClick={() => setOpenUnit(openUnit === idx ? -1 : idx)}>
              <span className="font-semibold text-left">{item.unit}</span>
              {openUnit === idx ? <ChevronDown size={18}/> : <ChevronRight size={18}/>}
            </button>
            {openUnit === idx && (
              <div className="accordion-content">
                <ul className="space-y-2 pl-4 border-l-2 border-slate-700">
                  {item.topics.map((t, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-cyan-500 flex-shrink-0"></div>
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// C. Selector de Horarios (Grid)
const SchedulePicker = ({ selected, onSelect }) => (
  <div className="animate-enter mt-8">
    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
      <Calendar className="text-cyan-400"/> Elige tu horario
    </h3>
    <div className="slot-grid">
      {SCHEDULE_OPTIONS.map((opt) => (
        <div 
          key={opt.id}
          onClick={() => onSelect(opt.id)}
          className={`time-slot ${selected === opt.id ? 'active' : ''}`}
        >
          {opt.slots < 5 && <div className="slot-badge">¡Últimos {opt.slots}!</div>}
          <div className="text-sm opacity-80 mb-1">{opt.days}</div>
          <div className="text-lg font-bold">{opt.time}</div>
          <div className="text-xs mt-2 opacity-60">{opt.label}</div>
        </div>
      ))}
    </div>
    <p className="text-xs text-slate-500 mt-3 flex items-center gap-2">
      <Info size={14}/> Todos los horarios son hora local de Chile (GMT-3).
    </p>
  </div>
);

// D. Teacher Showcase
const TeacherGrid = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 animate-enter">
    {TEACHERS.map(t => (
      <div key={t.id} className="glass-panel p-4 flex gap-4 items-start">
        <div className="w-12 h-12 rounded-full bg-slate-700 flex items-center justify-center text-xl font-bold text-slate-400">
          {t.name.charAt(0)}
        </div>
        <div>
          <h4 className="font-bold text-white">{t.name}</h4>
          <span className="text-xs text-cyan-400 font-bold uppercase tracking-wider">{t.role}</span>
          <p className="text-xs text-slate-400 mt-2 leading-relaxed">{t.bio}</p>
          <div className="flex gap-2 mt-2">
            {t.tags.map(tag => (
              <span key={tag} className="text-[10px] bg-slate-800 px-2 py-1 rounded border border-slate-700 text-slate-300">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    ))}
  </div>
);

/* ──────────────────────────────────────────────────────────────────────────
   4. COMPONENTE PRINCIPAL (CONTROLADOR DE ESTADOS)
   ────────────────────────────────────────────────────────────────────────── */

export default function LschAdvancedPage() {
  const { addToCart } = useCart ? useCart() : { addToCart: () => console.log('Add to cart') };
  
  // --- STATE MANAGEMENT ---
  const [activeTab, setActiveTab] = useState('overview'); // overview, syllabus, teachers
  const [selectedLevelId, setSelectedLevelId] = useState('A1');
  const [selectedScheduleId, setSelectedScheduleId] = useState(null);
  const [isChurchMode, setIsChurchMode] = useState(false);
  const [loading, setLoading] = useState(false);

  // --- DERIVED DATA ---
  const selectedLevel = COURSE_DATA.levels.find(l => l.id === selectedLevelId);
  
  // Cálculo de Precios con useMemo
  const totals = useMemo(() => {
    let monthly = PRICING.baseMonth;
    let enroll = PRICING.enrollment;
    
    // Aplicar lógica Church Mode
    if (isChurchMode) {
      monthly = monthly * (1 - PRICING.churchDiscount);
      enroll = 0; // Matrícula gratis iglesia
    }

    return {
      monthly,
      enroll,
      totalFirstMonth: monthly + enroll,
      savings: isChurchMode ? (PRICING.baseMonth - monthly) + PRICING.enrollment : 0
    };
  }, [isChurchMode]);

  // --- HANDLERS ---
  const handleAddToCart = () => {
    if (!selectedScheduleId) {
      alert("Por favor selecciona un horario antes de continuar.");
      return;
    }
    setLoading(true);
    
    // Simular proceso de red
    setTimeout(() => {
      addToCart({
        id: `lsch-${selectedLevelId}-${Date.now()}`,
        name: `LSCh ${selectedLevel.name}`,
        price: totals.totalFirstMonth,
        details: [
          `Horario: ${SCHEDULE_OPTIONS.find(s => s.id === selectedScheduleId).label}`,
          isChurchMode ? 'Convenio Iglesia Aplicado' : 'Plan Estándar'
        ]
      });
      setLoading(false);
      alert("Curso agregado al carrito con éxito.");
    }, 800);
  };

  return (
    <div className="lsch-app">
      <style>{styles}</style>
      <SEOHead title="LSCh Pro | Lael Institute" description="Plataforma de aprendizaje LSCh." />

      {/* 1. HERO CONTEXTUAL */}
      <section className="hero-section">
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/50 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-md">
            <Zap size={14} className="animate-pulse"/> Nueva Admisión 2026
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 text-white tracking-tight">
            Rompe la barrera <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 glow-text">
              del sonido.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            {COURSE_DATA.description}
          </p>
          
          {/* Stats rápidos */}
          <div className="flex justify-center gap-8 mt-10 text-slate-500 text-sm font-medium">
            <div className="flex items-center gap-2"><Users size={18} className="text-cyan-500"/> +2.5k Alumnos</div>
            <div className="flex items-center gap-2"><Star size={18} className="text-yellow-500"/> 4.9/5 Valoración</div>
            <div className="flex items-center gap-2"><MonitorPlay size={18} className="text-purple-500"/> 100% Online en vivo</div>
          </div>
        </div>

        {/* Decoración de fondo */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-[1200px] pointer-events-none">
           <div className="absolute top-20 left-10 w-64 h-64 bg-cyan-500/10 rounded-full blur-[100px]"/>
           <div className="absolute bottom-20 right-10 w-80 h-80 bg-blue-600/10 rounded-full blur-[100px]"/>
        </div>
      </section>

      {/* 2. LAYOUT PRINCIPAL (GRID) */}
      <div className="layout-grid">
        
        {/* === COLUMNA IZQUIERDA: CONTENIDO === */}
        <div>
          
          {/* NAVEGACIÓN DE PESTAÑAS */}
          <nav className="nav-tabs">
            <button 
              className={`nav-tab ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              <GraduationCap size={18}/> Programa
            </button>
            <button 
              className={`nav-tab ${activeTab === 'syllabus' ? 'active' : ''}`}
              onClick={() => setActiveTab('syllabus')}
            >
              <BookOpen size={18}/> Malla Completa
            </button>
            <button 
              className={`nav-tab ${activeTab === 'teachers' ? 'active' : ''}`}
              onClick={() => setActiveTab('teachers')}
            >
              <Users size={18}/> Docentes
            </button>
          </nav>

          {/* VISTAS DINÁMICAS */}
          <div className="min-h-[400px]">
            {activeTab === 'overview' && (
              <div className="animate-enter">
                <h2 className="text-2xl font-bold mb-6 text-white">Selecciona tu nivel de ingreso</h2>
                <LevelSelector selected={selectedLevelId} onSelect={setSelectedLevelId} />
                
                {/* Info contextual del nivel seleccionado */}
                <div className="glass-panel p-6 mt-6 border-l-4 border-l-cyan-500">
                  <h4 className="text-lg font-bold text-white mb-2">Objetivo del {selectedLevel.name}</h4>
                  <p className="text-slate-400 text-sm">
                    Este nivel está diseñado para {selectedLevel.id === 'A1' ? 'personas sin conocimiento previo' : 'estudiantes con base gramatical'}. 
                    Al finalizar, serás capaz de {selectedLevel.id === 'A1' ? 'mantener conversaciones básicas y presentarte' : 'interpretar situaciones cotidianas complejas'}.
                  </p>
                </div>

                <SchedulePicker selected={selectedScheduleId} onSelect={setSelectedScheduleId} />
              </div>
            )}

            {activeTab === 'syllabus' && (
              <SyllabusViewer levelId={selectedLevelId} />
            )}

            {activeTab === 'teachers' && (
               <div>
                 <h3 className="text-xl font-bold mb-2">Conoce a tu equipo docente</h3>
                 <p className="text-slate-400 mb-6">Nuestra metodología de co-docencia (Sordo + Intérprete) asegura calidad técnica y cultural.</p>
                 <TeacherGrid />
               </div>
            )}
          </div>
        </div>

        {/* === COLUMNA DERECHA: RESUMEN Y PAGO (STICKY) === */}
        <div className="summary-sticky">
          <div className="glass-panel p-6 shadow-2xl shadow-black/50">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6">Tu Inscripción</h3>

            {/* Resumen Selección */}
            <div className="flex items-start gap-4 mb-6 pb-6 border-b border-white/5">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-600 to-blue-700 flex items-center justify-center text-white shadow-lg shadow-cyan-500/20">
                <Hand size={24}/>
              </div>
              <div>
                <h4 className="font-bold text-white text-lg leading-tight">LSCh {selectedLevel.name}</h4>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-slate-300">Online</span>
                  {selectedScheduleId && (
                     <span className="text-[10px] bg-cyan-500/20 text-cyan-400 px-2 py-0.5 rounded border border-cyan-500/30">
                       {SCHEDULE_OPTIONS.find(s => s.id === selectedScheduleId).slots} cupos
                     </span>
                  )}
                </div>
              </div>
            </div>

            {/* Configuración de Precio */}
            <div className="space-y-4 mb-8">
              {/* Toggle Iglesia */}
              <div 
                onClick={() => setIsChurchMode(!isChurchMode)}
                className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${isChurchMode ? 'bg-amber-500/10 border-amber-500/50' : 'bg-slate-800/50 border-white/5 hover:border-white/20'}`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${isChurchMode ? 'bg-amber-500 text-black' : 'bg-slate-700 text-slate-400'}`}>
                    <Church size={18}/>
                  </div>
                  <div>
                    <div className={`text-sm font-bold ${isChurchMode ? 'text-amber-400' : 'text-slate-300'}`}>Convenio Iglesia</div>
                    <div className="text-[10px] text-slate-500">Descuento aplicado a ministerios</div>
                  </div>
                </div>
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${isChurchMode ? 'bg-amber-500 border-amber-500' : 'border-slate-500'}`}>
                  {isChurchMode && <Check size={12} className="text-black"/>}
                </div>
              </div>
            </div>

            {/* Desglose Matemático */}
            <div className="space-y-2 text-sm mb-6">
              <div className="flex justify-between text-slate-400">
                <span>Mensualidad</span>
                <span>{clp(totals.monthly)}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Matrícula</span>
                <span className={totals.enroll === 0 ? 'text-green-400 font-bold' : ''}>
                  {totals.enroll === 0 ? 'GRATIS' : clp(totals.enroll)}
                </span>
              </div>
              {totals.savings > 0 && (
                <div className="flex justify-between text-amber-400 font-bold text-xs bg-amber-500/10 p-2 rounded">
                  <span>Ahorras hoy:</span>
                  <span>-{clp(totals.savings)}</span>
                </div>
              )}
            </div>

            {/* Total y CTA */}
            <div className="pt-4 border-t border-white/10">
              <div className="flex justify-between items-end mb-4">
                <span className="text-slate-400 text-sm">Total a pagar hoy</span>
                <span className="text-3xl font-extrabold text-white tracking-tight">{clp(totals.totalFirstMonth)}</span>
              </div>
              
              <button 
                onClick={handleAddToCart}
                disabled={loading}
                className="w-full py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl shadow-lg shadow-cyan-500/25 transition-all flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? <Loader2 className="animate-spin"/> : (
                  <>Inscribirme Ahora <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform"/></>
                )}
              </button>
              
              <p className="text-center text-[10px] text-slate-500 mt-4 flex items-center justify-center gap-1">
                <ShieldCheck size={12}/> Garantía de devolución de 7 días sin preguntas.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}