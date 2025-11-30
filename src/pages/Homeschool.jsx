// src/pages/Homeschool.jsx -> AHORA: LAEL ACADEMY
import { useState, useMemo, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import heroImg from "../assets/img/lael/hs.jpg"; // Asegúrate de tener esta img o cambia la ruta

// --- DATA LOCAL (Para asegurar que funcione YA MISMO) ---
// Puedes mover esto a tu archivo data/homeschool.js si prefieres
const ENROLLMENT_FEE = 15000;

const SUBJECTS = [
  { id: 'mat', name: 'Matemáticas', icon: '📐', desc: 'Álgebra, Cálculo, PAES.' },
  { id: 'len', name: 'Lenguaje', icon: '📚', desc: 'Lectura, Escritura, PAES.' },
  { id: 'cie', name: 'Ciencias', icon: '🧬', desc: 'Física, Química, Biología.' },
  { id: 'his', name: 'Historia', icon: '🏛️', desc: 'Historia y Cs. Sociales.' },
  { id: 'ing', name: 'Inglés', icon: '🇬🇧', desc: 'Refuerzo escolar.' },
];

const LEVELS = [
  { id: 'basica', label: 'Básica', desc: '1º a 8º Básico' },
  { id: 'media', label: 'Media', desc: 'Iº a IVº Medio' },
  { id: 'paes', label: 'PAES', desc: 'Prep. Universitaria' },
  { id: 'exam', label: 'Ex. Libres', desc: 'Validación Mineduc' },
];

const PACKS = [
  { id: 'p4', hours: 4, title: 'Pack Mensual', price: 79990, badge: null },
  { id: 'p8', hours: 8, title: 'Pack Semestral', price: 149990, badge: 'Popular' },
  { id: 'p12', hours: 12, title: 'Pack Intensivo', price: 209990, badge: 'Mejor Valor' },
];

/* --- SEO COMPONENT --- */
const SEOHead = () => {
    useEffect(() => { document.title = "Lael Academy | Tutorías y Soluciones Educativas"; }, []);
    return null;
};

/* --- COMPONENTE PRINCIPAL --- */
export default function LaelAcademy() {
  const [isSchool, setIsSchool] = useState(false); // Switch: Persona vs Colegio
  const [selectedSubject, setSelectedSubject] = useState('mat');
  const [selectedLevel, setSelectedLevel] = useState('media');
  const [selectedPack, setSelectedPack] = useState('p8');
  
  const pricingRef = useRef(null);

  // Cálculos
  const currentPack = PACKS.find(p => p.id === selectedPack);
  const totalPrice = currentPack ? currentPack.price : 0;

  // WhatsApp Link Generator
  const waLink = useMemo(() => {
    if (isSchool) {
        return `https://wa.me/56964626568?text=${encodeURIComponent("Hola 👋, soy de un Colegio/Institución y busco apoyo en corrección de ensayos o reforzamiento.")}`;
    }
    const subj = SUBJECTS.find(s => s.id === selectedSubject)?.name;
    const lvl = LEVELS.find(l => l.id === selectedLevel)?.label;
    const pck = PACKS.find(p => p.id === selectedPack);
    
    const text = `Hola Lael Academy.
Me interesa el apoyo académico:
• Materia: ${subj}
• Nivel: ${lvl}
• Plan: ${pck?.title} (${pck?.hours} hrs)

Inversión: $${pck?.price.toLocaleString('es-CL')}
¿Cómo coordinamos el horario?`;
    return `https://wa.me/56964626568?text=${encodeURIComponent(text)}`;
  }, [isSchool, selectedSubject, selectedLevel, selectedPack]);

  return (
    <div className="academy-page">
      <SEOHead />
      <style>{css}</style>

      {/* --- HERO HEADER --- */}
      <header className="acad-hero">
        <div className="container hero-cont">
            <div className="hero-text">
                <div className="hero-badge">🎓 Lael Academy</div>
                <h1>
                    Resultados Académicos <br />
                    <span className="text-glow">Extraordinarios.</span>
                </h1>
                <p className="hero-copy">
                    Ya sea para subir notas, preparar la PAES o externalizar evaluaciones en tu colegio. 
                    Conectamos a docentes expertos con tus metas.
                </p>

                {/* SWITCH PERSONA / COLEGIO */}
                <div className="user-toggle-wrapper">
                    <div className="user-toggle">
                        <button 
                            className={`toggle-btn ${!isSchool ? 'active' : ''}`}
                            onClick={() => setIsSchool(false)}
                        >
                            👤 Estudiantes
                        </button>
                        <button 
                            className={`toggle-btn ${isSchool ? 'active' : ''}`}
                            onClick={() => setIsSchool(true)}
                        >
                            🏫 Colegios
                        </button>
                    </div>
                </div>
            </div>
            
            <div className="hero-visual">
                <img src={heroImg} alt="Estudiante Lael Academy" className="hero-img-main" />
                <div className="float-card glass">
                    <span className="fc-icon">📈</span>
                    <div>
                        <strong>Mejora Continua</strong>
                        <small>Seguimiento personalizado</small>
                    </div>
                </div>
            </div>
        </div>
      </header>

      {/* --- CONTENIDO DINÁMICO --- */}
      <div className="main-content container">
        
        {/* VISTA 1: ESTUDIANTES (B2C) */}
        {!isSchool && (
            <div className="flow-container fade-in">
                
                <div className="steps-grid">
                    {/* Paso 1: Materia */}
                    <section className="step-card">
                        <h3 className="step-title"><span className="num">1</span> ¿Qué materia reforzamos?</h3>
                        <div className="subjects-grid">
                            {SUBJECTS.map(s => (
                                <div 
                                    key={s.id} 
                                    className={`subject-item ${selectedSubject === s.id ? 'selected' : ''}`}
                                    onClick={() => setSelectedSubject(s.id)}
                                >
                                    <div className="s-icon">{s.icon}</div>
                                    <div className="s-name">{s.name}</div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Paso 2: Nivel */}
                    <section className="step-card">
                        <h3 className="step-title"><span className="num">2</span> Tu Nivel Actual</h3>
                        <div className="levels-grid">
                            {LEVELS.map(l => (
                                <button 
                                    key={l.id}
                                    className={`level-btn ${selectedLevel === l.id ? 'selected' : ''}`}
                                    onClick={() => setSelectedLevel(l.id)}
                                >
                                    <strong>{l.label}</strong>
                                    <small>{l.desc}</small>
                                </button>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Paso 3: Packs (Precios) - Full Width */}
                <section className="step-card full-width" ref={pricingRef}>
                    <h3 className="step-title center"><span className="num">3</span> Elige tu Intensidad</h3>
                    <div className="packs-grid">
                        {PACKS.map(p => (
                            <div 
                                key={p.id}
                                className={`pack-card ${selectedPack === p.id ? 'selected' : ''}`}
                                onClick={() => setSelectedPack(p.id)}
                            >
                                {p.badge && <span className="save-badge">{p.badge}</span>}
                                <div className="pack-head">
                                    <h4>{p.title}</h4>
                                    <span className="hours">{p.hours} Horas Cronológicas</span>
                                </div>
                                <div className="pack-price">
                                    ${p.price.toLocaleString('es-CL')}
                                </div>
                                <div className="pack-features">
                                    <span>✓ Docente experto asignado</span>
                                    <span>✓ Material de apoyo</span>
                                    <span>✓ Horario flexible</span>
                                </div>
                                <div className={`radio-select ${selectedPack === p.id ? 'on' : ''}`}></div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* FAQ */}
                <section className="faq-section">
                    <h3>Preguntas Frecuentes</h3>
                    <div className="faq-grid">
                        <details>
                            <summary>¿Sirve para Exámenes Libres?</summary>
                            <p>Sí, absolutamente. Nuestros docentes conocen el temario del Mineduc y preparan específicamente para rendir estos exámenes con éxito.</p>
                        </details>
                        <details>
                            <summary>¿Las clases son individuales?</summary>
                            <p>Sí, estos packs son para clases 1 a 1. Si buscas grupos pequeños, consulta por nuestros talleres de temporada.</p>
                        </details>
                        <details>
                            <summary>¿Cómo agendo las horas?</summary>
                            <p>Una vez inscrito, te contactará coordinación académica para asignar al docente que mejor calce con tu horario y necesidades.</p>
                        </details>
                    </div>
                </section>

                {/* STICKY BAR */}
                <div className="academy-sticky visible">
                    <div className="sticky-content container">
                        <div className="sticky-info">
                            <span>Total a Pagar</span>
                            <strong>${totalPrice.toLocaleString('es-CL')}</strong>
                        </div>
                        <a href={waLink} target="_blank" rel="noreferrer" className="btn-whatsapp">
                            Agendar Clases
                        </a>
                    </div>
                </div>

            </div>
        )}

        {/* VISTA 2: COLEGIOS (B2B) */}
        {isSchool && (
            <div className="flow-container fade-in">
                <div className="b2b-hero">
                    <h2>Aliados Estratégicos para su Colegio</h2>
                    <p>Reduzca la carga administrativa y asegure calidad académica externa.</p>
                </div>
                
                <div className="services-grid">
                    <div className="service-card">
                        <span className="srv-icon">📝</span>
                        <h3>Corrección Ensayos PAES</h3>
                        <p>Externalice la corrección de ensayos masivos. Entregamos reportes estadísticos detallados por alumno y por curso.</p>
                    </div>
                    <div className="service-card">
                        <span className="srv-icon">📊</span>
                        <h3>Nivelación Académica</h3>
                        <p>Programas intensivos de reforzamiento para cursos completos en Matemáticas y Lenguaje.</p>
                    </div>
                    <div className="service-card">
                        <span className="srv-icon">👩‍🏫</span>
                        <h3>Capacitación Docente</h3>
                        <p>Talleres prácticos de metodologías activas y herramientas digitales para su planta docente.</p>
                    </div>
                </div>

                <div className="b2b-cta-box">
                    <h3>¿Listo para optimizar su gestión académica?</h3>
                    <p>Trabajamos con facturación y convenios personalizados.</p>
                    <a href={waLink} target="_blank" rel="noreferrer" className="btn-contact-pro">
                        Solicitar Reunión / Cotización
                    </a>
                </div>
            </div>
        )}

      </div>
    </div>
  );
}

/* ================= CSS PREMIUM DARK ================= */
const css = `
:root {
  --bg-dark: #050505;
  --bg-card: #121212;
  --bg-highlight: #1E1E1E;
  --primary: #D4AF37; /* Dorado Elegante */
  --primary-hover: #B5952F;
  --text-main: #FFFFFF;
  --text-muted: #A0A0A0;
  --border: #333333;
  --radius: 16px;
  --nav-height: 100px;
}

.academy-page {
  background-color: var(--bg-dark);
  color: var(--text-main);
  font-family: 'Inter', system-ui, sans-serif;
  min-height: 100vh;
  padding-bottom: var(--nav-height);
}

.container { max-width: 1000px; margin: 0 auto; padding: 0 20px; }
a { text-decoration: none; color: inherit; }
button { cursor: pointer; border: none; font-family: inherit; }

/* HERO */
.acad-hero { padding: 60px 0 40px; background: radial-gradient(circle at 50% 0%, #1a1a1a, transparent 70%); }
.hero-cont { display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 40px; align-items: center; }
@media (max-width: 800px) { .hero-cont { grid-template-columns: 1fr; text-align: center; } }

.hero-badge { display: inline-block; background: rgba(212, 175, 55, 0.15); color: var(--primary); padding: 4px 12px; border-radius: 50px; font-weight: 700; font-size: 0.8rem; margin-bottom: 15px; border: 1px solid rgba(212, 175, 55, 0.3); }
h1 { font-size: clamp(2.5rem, 5vw, 3.5rem); line-height: 1.1; margin-bottom: 20px; font-weight: 800; }
.text-glow { color: var(--primary); text-shadow: 0 0 20px rgba(212, 175, 55, 0.3); }
.hero-copy { font-size: 1.1rem; color: var(--text-muted); line-height: 1.6; margin-bottom: 30px; }

/* TOGGLE */
.user-toggle-wrapper { display: flex; justify-content: flex-start; }
@media (max-width: 800px) { .user-toggle-wrapper { justify-content: center; } }
.user-toggle { background: var(--bg-highlight); padding: 4px; border-radius: 50px; display: inline-flex; border: 1px solid var(--border); }
.toggle-btn { background: transparent; color: var(--text-muted); padding: 10px 24px; border-radius: 50px; font-weight: 600; transition: .3s; }
.toggle-btn.active { background: var(--primary); color: #000; font-weight: 700; }

/* VISUAL */
.hero-visual { position: relative; }
.hero-img-main { width: 100%; border-radius: 20px; border: 1px solid var(--border); box-shadow: 0 20px 50px rgba(0,0,0,0.5); }
.float-card { position: absolute; bottom: 20px; right: -10px; background: rgba(20, 20, 20, 0.9); backdrop-filter: blur(10px); padding: 12px 20px; border-radius: 12px; border: 1px solid var(--border); display: flex; align-items: center; gap: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
@media (max-width: 800px) { .hero-visual { margin-top: 40px; max-width: 500px; margin-left: auto; margin-right: auto; } .float-card { right: 10px; } }
.fc-icon { font-size: 1.5rem; }
.float-card strong { display: block; font-size: 0.9rem; }
.float-card small { font-size: 0.75rem; color: var(--primary); }

/* STEPS GRID */
.steps-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px; }
@media (max-width: 700px) { .steps-grid { grid-template-columns: 1fr; } }

.step-card { background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius); padding: 24px; }
.step-card.full-width { grid-column: 1 / -1; }
.step-title { font-size: 1.1rem; margin-bottom: 20px; display: flex; align-items: center; gap: 10px; }
.step-title.center { justify-content: center; }
.num { background: var(--bg-highlight); width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; border-radius: 50%; font-size: 0.8rem; font-weight: 700; color: var(--primary); border: 1px solid var(--border); }

/* SUBJECTS */
.subjects-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 10px; }
.subject-item { background: var(--bg-highlight); border: 1px solid var(--border); border-radius: 12px; padding: 15px; text-align: center; cursor: pointer; transition: .2s; }
.subject-item:hover { border-color: var(--text-muted); }
.subject-item.selected { border-color: var(--primary); background: rgba(212, 175, 55, 0.1); }
.s-icon { font-size: 1.5rem; margin-bottom: 5px; }
.s-name { font-size: 0.9rem; font-weight: 600; }

/* LEVELS */
.levels-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.level-btn { background: var(--bg-highlight); border: 1px solid var(--border); border-radius: 12px; padding: 12px; text-align: left; transition: .2s; }
.level-btn:hover { border-color: var(--text-muted); }
.level-btn.selected { border-color: var(--primary); background: rgba(212, 175, 55, 0.1); }
.level-btn strong { display: block; font-size: 0.95rem; }
.level-btn small { font-size: 0.75rem; color: var(--text-muted); }

/* PACKS */
.packs-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; }
.pack-card { background: var(--bg-highlight); border: 1px solid var(--border); border-radius: var(--radius); padding: 24px; position: relative; cursor: pointer; transition: .2s; display: flex; flex-direction: column; }
.pack-card:hover { transform: translateY(-5px); border-color: var(--text-muted); }
.pack-card.selected { border-color: var(--primary); box-shadow: 0 0 20px rgba(212, 175, 55, 0.1); }

.save-badge { position: absolute; top: 15px; right: 15px; background: var(--primary); color: #000; font-size: 0.7rem; font-weight: 800; padding: 2px 8px; border-radius: 4px; text-transform: uppercase; }
.pack-head h4 { font-size: 1.2rem; margin: 0 0 5px; }
.hours { font-size: 0.85rem; color: var(--text-muted); }
.pack-price { font-size: 1.8rem; font-weight: 800; color: var(--text-main); margin: 15px 0; }
.pack-features { margin-bottom: 20px; display: flex; flex-direction: column; gap: 6px; font-size: 0.85rem; color: var(--text-muted); }
.radio-select { width: 20px; height: 20px; border-radius: 50%; border: 2px solid var(--border); margin-top: auto; align-self: flex-start; }
.pack-card.selected .radio-select { background: var(--primary); border-color: var(--primary); }

/* FAQ */
.faq-section { margin-top: 40px; }
.faq-section h3 { margin-bottom: 20px; font-size: 1.5rem; text-align: center; }
.faq-grid { display: grid; gap: 10px; max-width: 800px; margin: 0 auto; }
details { background: var(--bg-card); padding: 15px; border-radius: 12px; border: 1px solid var(--border); }
summary { font-weight: 700; cursor: pointer; }
details p { margin-top: 10px; font-size: 0.9rem; color: var(--text-muted); line-height: 1.5; }

/* STICKY */
.academy-sticky { position: fixed; bottom: 0; left: 0; width: 100%; z-index: 100; background: rgba(18, 18, 18, 0.95); backdrop-filter: blur(10px); border-top: 1px solid var(--border); padding: 15px 0; transform: translateY(100%); transition: .3s; }
.academy-sticky.visible { transform: translateY(0); }
.sticky-content { display: flex; justify-content: space-between; align-items: center; }
.sticky-info span { font-size: 0.75rem; text-transform: uppercase; color: var(--text-muted); display: block; }
.sticky-info strong { font-size: 1.5rem; color: var(--primary); }
.btn-whatsapp { background: #25D366; color: #000; font-weight: 700; padding: 12px 24px; border-radius: 50px; transition: .2s; }
.btn-whatsapp:hover { filter: brightness(1.1); }

/* B2B */
.b2b-hero { text-align: center; margin-bottom: 40px; padding: 40px 20px; background: linear-gradient(180deg, rgba(212,175,55,0.1), transparent); border-radius: var(--radius); border: 1px solid var(--border); }
.b2b-hero h2 { font-size: 2rem; margin-bottom: 10px; color: var(--primary); }
.services-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin-bottom: 40px; }
.service-card { background: var(--bg-card); padding: 30px; border-radius: var(--radius); border: 1px solid var(--border); text-align: center; }
.srv-icon { font-size: 2.5rem; display: block; margin-bottom: 15px; }
.service-card h3 { margin-bottom: 10px; font-size: 1.2rem; }
.service-card p { font-size: 0.9rem; color: var(--text-muted); }
.b2b-cta-box { text-align: center; background: var(--bg-highlight); padding: 40px; border-radius: var(--radius); border: 1px solid var(--primary); }
.btn-contact-pro { display: inline-block; background: var(--primary); color: #000; padding: 14px 30px; border-radius: 8px; font-weight: 700; margin-top: 20px; transition: .2s; }
.btn-contact-pro:hover { background: var(--primary-hover); }

/* Fade In Animation */
.fade-in { animation: fadeIn 0.5s ease-in; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
`;