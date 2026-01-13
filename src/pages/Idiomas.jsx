import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext.jsx";

// ICONOS (Importación masiva para una página masiva)
import { 
  FaCheck, FaGlobeAmericas, FaPlaneDeparture, FaPassport, FaHeadphones, 
  FaWhatsapp, FaArrowRight, FaStar, FaLock, FaUsers, FaCertificate, FaVideo,
  FaTimes, FaMicrophoneAlt, FaLaptopHouse, FaBriefcase, FaGraduationCap
} from "react-icons/fa";
import { BiWorld, BiConversation, BiBuildings, BiCoffeeTogo, BiStats } from "react-icons/bi";
import { MdTranslate, MdOutlineFlightTakeoff, MdQuiz, MdOutlineSupportAgent } from "react-icons/md";
import { IoIosInfinite } from "react-icons/io";

// DATA
import { 
  LANGUAGES, 
  LANG_FEATURES, 
  computeLangBundle, 
  clp 
} from "../data/idiomas.js";

/* ──────────────────────────────────────────────────────────────────────────
   DATA VISUAL EXTRA (CONTENIDO EXTENSO)
   ────────────────────────────────────────────────────────────────────────── */
const SYLLABUS_PREVIEW = {
  ingles: [
    { level: "A1-A2", topics: ["Presentaciones y 'Small Talk'", "Survival English para Viajes", "Pronunciación: TH, R, V vs B"] },
    { level: "B1-B2", topics: ["Inglés para Negocios (Emails/Meetings)", "Debate y Argumentación", "Phrasal Verbs esenciales"] }
  ],
  coreano: [
    { level: "Nivel 1", topics: ["Hangul: Lectura y Escritura", "Saludos y Etiqueta Coreana", "Estructura de Oración SOV"] },
    { level: "Nivel 2", topics: ["Partículas Complejas", "Vocabulario de K-Dramas", "Números Sino-Coreanos vs Nativos"] }
  ],
  espanol: [
    { level: "Survival", topics: ["RUT & Visas: Vocabulary", "Chilean Slang (Weón, Cachái)", "Navigating Santiago Metro"] },
    { level: "Business", topics: ["Formal vs Informal Register", "Job Interviews in Chile", "Writing Reports"] }
  ]
};

const TEACHERS = [
  { name: "Sarah Jenkins", origin: "USA 🇺🇸", role: "Head of English", bio: "Ex-examinadora de IELTS. Especialista en reducción de acento.", img: "👩🏼‍🏫" },
  { name: "Minji Kim", origin: "Corea 🇰🇷", role: "Lead Korean Tutor", bio: "Nativa de Seúl. Enseña con K-Pop y situaciones de la vida real.", img: "👩🏻‍🏫" },
  { name: "Carlos R.", origin: "Chile 🇨🇱", role: "Spanish Coach", bio: "Lingüista experto en dialectología chilena. Ayuda a expats a integrarse.", img: "👨🏻‍🏫" }
];

const COMPARISON = [
  { feature: "Clases en Vivo", lael: true, app: false, institute: true },
  { feature: "Corrección de Pronunciación", lael: "En tiempo real", app: "IA Básica", institute: "Grupal" },
  { feature: "Enfoque Cultural", lael: true, app: false, institute: "A veces" },
  { feature: "Comunidad/Club", lael: "Incluido", app: "No", institute: "Pago extra" },
  { feature: "Precio Mensual", lael: "$17.990", app: "$9.000", institute: "$95.000+" }
];

export default function Idiomas() {
  const { addToCart, openCart } = useCart();

  // --- ESTADOS ---
  const [selectedIds, setSelectedIds] = useState([]);
  const [pricing, setPricing] = useState(computeLangBundle(0));
  const [activeTab, setActiveTab] = useState("ingles");
  const [showSticky, setShowSticky] = useState(false);

  // --- EFECTOS ---
  useEffect(() => {
    setPricing(computeLangBundle(selectedIds.length));
  }, [selectedIds]);

  // Detector de Scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 800) setShowSticky(true);
      else setShowSticky(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // --- HANDLERS ---
  const toggleLanguage = (id, comingSoon) => {
    if (comingSoon) return;
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const handleAddBundle = () => {
    if (selectedIds.length === 0) return;
    const names = selectedIds.map(id => LANGUAGES.find(l => l.id === id).name).join(" + ");
    addToCart({
      id: `lang-bundle-${selectedIds.join('-')}`,
      title: pricing.label,
      price: pricing.totalMonthly,
      detail: names,
      type: 'plan'
    });
    openCart();
  };

  const scrollToBuilder = () => {
    document.getElementById('lang-builder').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="lang-huge-page">
      <style>{css}</style>

      {/* ──────────────── 1. HERO CINEMÁTICO ──────────────── */}
      <header className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-bg-anim"></div>
        <div className="container hero-content">
          <div className="hero-badge">
            <span className="pulse-dot"></span> Matrículas Abiertas 2026
          </div>
          <h1 className="hero-title">
            No estudies idiomas.<br />
            <span className="text-gradient">Vive la cultura.</span>
          </h1>
          <p className="hero-subtitle">
            Olvídate de repetir como un robot. Nuestro método de <strong>Inmersión Activa</strong> te 
            prepara para hablar, trabajar y desenvolverte en el mundo real desde el primer mes.
          </p>
          
          <div className="hero-cta-group">
            <button onClick={scrollToBuilder} className="btn-hero primary">
              <FaPassport /> Obtener mi Pasaporte
            </button>
            <button className="btn-hero secondary">
              <FaVideo /> Ver Clase de Prueba
            </button>
          </div>

          <div className="hero-trust">
            <p>Comunidad global de aprendizaje:</p>
            <div className="flags-row">
              <span>🇺🇸 English</span>
              <span>🇰🇷 한국어</span>
              <span>🇨🇱 Español</span>
              <span className="dimmed">🇯🇵 日本語</span>
            </div>
          </div>
        </div>
      </header>

      {/* ──────────────── 2. STATS BAR ──────────────── */}
      <section className="stats-bar">
        <div className="container stats-grid">
          <div className="stat-item">
            <BiWorld className="stat-icon"/>
            <div className="stat-text">
              <strong>100%</strong>
              <span>Clases en Vivo</span>
            </div>
          </div>
          <div className="stat-item">
            <IoIosInfinite className="stat-icon"/>
            <div className="stat-text">
              <strong>Ilimitado</strong>
              <span>Acceso a material</span>
            </div>
          </div>
          <div className="stat-item">
            <FaUsers className="stat-icon"/>
            <div className="stat-text">
              <strong>+800</strong>
              <span>Alumnos Activos</span>
            </div>
          </div>
          <div className="stat-item">
            <FaStar className="stat-icon"/>
            <div className="stat-text">
              <strong>4.9/5</strong>
              <span>Valoración</span>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────── 3. EL PROBLEMA (APPS VS REALIDAD) ──────────────── */}
      <section className="pain-section">
        <div className="container">
          <div className="section-header center">
            <h2>¿Por qué las Apps no funcionan?</h2>
            <p>Jugar con un búho verde es divertido, pero no te enseña a sobrevivir una entrevista de trabajo.</p>
          </div>
          <div className="pain-grid">
            <div className="pain-card">
              <div className="pain-icon">🦜</div>
              <h3>Frases sin contexto</h3>
              <p>"El gato bebe leche". Bien, pero ¿cómo preguntas direcciones o pides ayuda médica?</p>
            </div>
            <div className="pain-card">
              <div className="pain-icon">🤖</div>
              <h3>Audio Robótico</h3>
              <p>Acostumbras tu oído a una IA perfecta. En la vida real, la gente habla rápido y con acentos.</p>
            </div>
            <div className="pain-card">
              <div className="pain-icon">😶</div>
              <h3>Miedo a Hablar</h3>
              <p>Puedes leer muy bien, pero te congelas cuando alguien te saluda. Falta práctica real.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────── 4. BUILDER (SELECTOR INTERACTIVO) ──────────────── */}
      <section id="lang-builder" className="builder-wrapper">
        <div className="container">
          <div className="section-header">
            <span className="tag-accent">TU VIAJE COMIENZA AQUÍ</span>
            <h2>Diseña tu Plan de Estudios</h2>
            <p>Selecciona los idiomas que te interesan. Activa el <strong>Plan Políglota</strong> eligiendo 2 o más.</p>
          </div>

          <div className="builder-main">
            {/* IZQUIERDA: TARJETAS DE IDIOMA */}
            <div className="lang-grid">
              {LANGUAGES.map((lang) => {
                const isSelected = selectedIds.includes(lang.id);
                const isComingSoon = lang.comingSoon;
                return (
                  <div 
                    key={lang.id} 
                    className={`lang-card ${isSelected ? 'selected' : ''} ${isComingSoon ? 'locked' : ''}`}
                    onClick={() => toggleLanguage(lang.id, isComingSoon)}
                    style={{'--accent': lang.color}}
                  >
                     {lang.badge && <div className="lc-badge" style={{background: lang.color}}>{lang.badge}</div>}
                     <div className="lc-head">
                        <span className="lc-flag">{lang.emoji}</span>
                        <div className="lc-info">
                          <h4>{lang.name}</h4>
                          <span>{isComingSoon ? 'Lista de Espera' : 'Inscripción Abierta'}</span>
                        </div>
                        <div className="lc-check">
                          {isComingSoon ? <FaLock/> : (isSelected ? <FaCheck/> : <div className="ring"></div>)}
                        </div>
                     </div>
                     <p className="lc-desc">{lang.summary}</p>
                     {!isComingSoon && (
                       <div className="lc-tags">
                         {lang.levels.slice(0,2).map((l,i) => <span key={i}>{l}</span>)}
                       </div>
                     )}
                  </div>
                )
              })}
            </div>

            {/* DERECHA: TICKET FLOTANTE */}
            <div className="sidebar-wrapper">
              <div className="pricing-card">
                <div className="pc-header">
                  <h3><FaPassport/> Resumen</h3>
                </div>
                <div className="pc-body">
                  {selectedIds.length === 0 ? (
                    <div className="pc-empty">
                      <p>Selecciona tu destino <br/> en el mapa 👈</p>
                    </div>
                  ) : (
                    <ul className="pc-list">
                      {selectedIds.map(id => (
                        <li key={id}>
                          {LANGUAGES.find(s=>s.id===id).emoji} {LANGUAGES.find(s=>s.id===id).name}
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="pc-totals">
                    {pricing.saving > 0 && (
                      <div className="pc-saving">
                        🎉 ¡Desbloqueaste {clp(pricing.saving)} de ahorro!
                      </div>
                    )}
                    <div className="total-row">
                      <span>Mensualidad</span>
                      <strong className="final-price">{clp(pricing.totalMonthly)}</strong>
                    </div>
                    <div className="sub-row">
                      <span>Matrícula anual:</span>
                      <span>{clp(pricing.enrollment)}</span>
                    </div>
                  </div>

                  <button 
                    className="btn-add-plan" 
                    disabled={pricing.count === 0}
                    onClick={handleAddBundle}
                  >
                    {pricing.count === 0 ? 'Elige Idiomas' : 'INSCRIBIR AHORA'}
                  </button>
                  
                  <div className="bundle-logic">
                    <p>💡 <strong>Tip de Ahorro:</strong></p>
                    <ul>
                      <li>1 Idioma: $17.990</li>
                      <li className={pricing.count >= 2 ? 'active' : ''}>2 Idiomas: $32.990 (Ahorra 10%)</li>
                      <li className={pricing.count >= 3 ? 'active' : ''}>3+ Idiomas: $45.990 (Tarifa Plana)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────── 5. SYLLABUS INTERACTIVO ──────────────── */}
      <section className="syllabus-section">
        <div className="container">
          <div className="layout-split">
            <div className="syllabus-text">
              <h2>¿Qué vas a aprender?</h2>
              <p>Un vistazo a nuestro plan de estudios práctico.</p>
              
              <div className="tabs-header">
                {Object.keys(SYLLABUS_PREVIEW).map(key => {
                  const lang = LANGUAGES.find(l => l.id === key);
                  return (
                    <button 
                      key={key}
                      className={`tab-btn ${activeTab === key ? 'active' : ''}`}
                      onClick={() => setActiveTab(key)}
                      style={{'--tab-color': lang.color}}
                    >
                      {lang.emoji} {lang.name}
                    </button>
                  )
                })}
              </div>

              <div className="tab-body fade-in">
                {SYLLABUS_PREVIEW[activeTab]?.map((level, i) => (
                  <div key={i} className="syllabus-level">
                    <h4>{level.level}</h4>
                    <ul>
                      {level.topics.map((t, j) => (
                        <li key={j}><FaCheck className="chk-s"/> {t}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="syllabus-visual">
               <div className="platform-mockup">
                 <div className="pm-screen">
                    <div className="live-badge">🔴 EN VIVO</div>
                    <div className="pm-content">
                       <FaVideo className="big-icon"/>
                       <span>Roleplay: "At the Airport"</span>
                    </div>
                 </div>
                 <div className="pm-controls">
                    <div className="ctrl"><FaMicrophoneAlt/> Practicar</div>
                    <div className="ctrl"><MdQuiz/> Quiz</div>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────── 6. COMPARATIVA (TABLA) ──────────────── */}
      <section className="comparison-section">
        <div className="container">
          <h2>Lael vs. El Mercado</h2>
          <div className="table-responsive">
            <table className="comp-table">
              <thead>
                <tr>
                  <th>Característica</th>
                  <th className="th-lael">Instituto Lael</th>
                  <th>Apps (Duolingo)</th>
                  <th>Institutos Tradicionales</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row, idx) => (
                  <tr key={idx}>
                    <td className="td-feat">{row.feature}</td>
                    <td className="td-lael">
                      {row.lael === true ? <FaCheck className="chk-yes"/> : row.lael}
                    </td>
                    <td>
                       {row.app === false ? <FaTimes className="chk-no"/> : row.app}
                    </td>
                    <td>
                       {row.institute === true ? <FaCheck/> : row.institute}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ──────────────── 7. EL EQUIPO (SENSEIS) ──────────────── */}
      <section className="team-section">
        <div className="container">
          <div className="section-header center">
            <h2>Conoce a tus Guías</h2>
            <p>Aprende de hablantes nativos y expertos lingüistas apasionados por enseñar.</p>
          </div>
          <div className="team-grid">
            {TEACHERS.map((t, i) => (
              <div className="teacher-card" key={i}>
                <div className="t-img">{t.img}</div>
                <div className="t-info">
                  <div className="t-flag">{t.origin}</div>
                  <h4>{t.name}</h4>
                  <span className="t-role">{t.role}</span>
                  <p>{t.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────── 8. CERTIFICACIÓN Y BENEFICIOS ──────────────── */}
      <section className="benefits-grid-section">
        <div className="container">
           <div className="b-grid">
             <div className="b-card">
                <FaCertificate className="b-icon"/>
                <h3>Certificación Digital</h3>
                <p>Al completar tu nivel, recibe un certificado con código QR verificable para agregar a tu LinkedIn.</p>
             </div>
             <div className="b-card">
                <BiConversation className="b-icon"/>
                <h3>Club de Conversación</h3>
                <p>Acceso semanal gratuito a salas de práctica informal para perder el miedo escénico.</p>
             </div>
             <div className="b-card">
                <MdOutlineSupportAgent className="b-icon"/>
                <h3>Soporte 24/7</h3>
                <p>¿Dudas con una tarea? Nuestro equipo académico te responde por la plataforma.</p>
             </div>
           </div>
        </div>
      </section>

      {/* ──────────────── 9. FAQ EXTENDIDO ──────────────── */}
      <section className="faq-section">
        <div className="container">
          <h2>Preguntas Frecuentes</h2>
          <div className="faq-wrapper">
             <details className="faq-item">
                <summary>¿Desde qué edad se puede participar?</summary>
                <p>Nuestros cursos están diseñados para jóvenes y adultos (14 años en adelante). Para niños tenemos un programa especial (consultar por interno).</p>
             </details>
             <details className="faq-item">
                <summary>¿Qué pasa si me pierdo una clase?</summary>
                <p>Todas las sesiones quedan grabadas en tu aula virtual. Puedes verlas cuando quieras para ponerte al día.</p>
             </details>
             <details className="faq-item">
                <summary>¿Cómo funcionan los pagos?</summary>
                <p>Es una suscripción mensual. Pagas mes a mes. Puedes cancelar cuando quieras avisando con 5 días de anticipación.</p>
             </details>
             <details className="faq-item">
                <summary>¿Necesito comprar libros?</summary>
                <p>No. Todo el material (PDFs, audios, guías) está incluido en la plataforma digital sin costo extra.</p>
             </details>
          </div>
        </div>
      </section>

      {/* ──────────────── 10. FINAL CTA ──────────────── */}
      <footer className="final-cta">
        <div className="container f-content">
          <MdOutlineFlightTakeoff className="plane-anim"/>
          <h2>El mundo es demasiado grande para hablar un solo idioma.</h2>
          <p>Únete a más de 800 alumnos que ya están expandiendo sus fronteras.</p>
          <div className="f-actions">
            <button onClick={scrollToBuilder} className="btn-big-pulse">
              EMPEZAR MI VIAJE
            </button>
            <a href="https://wa.me/56964626568" className="btn-wsp-ghost">
              <FaWhatsapp/> Hablar con Asesor
            </a>
          </div>
        </div>
      </footer>

      {/* ──────────────── STICKY BOTTOM BAR (MOBILE/DESKTOP) ──────────────── */}
      <div className={`sticky-bar ${showSticky ? 'visible' : ''}`}>
        <div className="container sb-content">
          <div className="sb-info">
            <span>Tu Selección:</span>
            <strong>{pricing.label}</strong>
          </div>
          <div className="sb-actions">
             <div className="sb-price">
                {clp(pricing.totalMonthly)} <small>/mes</small>
             </div>
             <button onClick={handleAddBundle} disabled={pricing.count === 0} className="btn-sb">
                INSCRIBIR
             </button>
          </div>
        </div>
      </div>

    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   CSS STYLES (MONSTRUOSO)
   ────────────────────────────────────────────────────────────────────────── */
const css = `
:root {
  --bg-deep: #050505;
  --bg-card: #121212;
  --bg-hover: #1c1c1c;
  --primary: #3b82f6;
  --accent-pink: #ec4899;
  --accent-yellow: #f59e0b;
  --text-main: #ffffff;
  --text-muted: #a3a3a3;
  --border: rgba(255,255,255,0.08);
  --success: #10b981;
  --danger: #ef4444;
}

/* BASE */
.lang-huge-page { background: var(--bg-deep); color: var(--text-main); font-family: 'Inter', sans-serif; overflow-x: hidden; padding-bottom: 80px; }
.container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
h1,h2,h3,h4 { font-weight: 800; margin: 0; line-height: 1.2; }
button { font-family: inherit; border: none; cursor: pointer; transition: 0.2s; }
section { padding: 80px 0; border-bottom: 1px solid rgba(255,255,255,0.03); }

/* 1. HERO */
.hero-section { min-height: 90vh; display: flex; align-items: center; justify-content: center; position: relative; text-align: center; overflow: hidden; padding-top: 100px; }
.hero-overlay { position: absolute; inset: 0; background: radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.15), transparent 70%); z-index: 1; }
.hero-content { position: relative; z-index: 2; max-width: 900px; }
.hero-badge { display: inline-flex; align-items: center; gap: 8px; background: rgba(255,255,255,0.05); padding: 8px 16px; border-radius: 50px; border: 1px solid var(--border); font-size: 0.9rem; margin-bottom: 25px; color: #93c5fd; }
.pulse-dot { width: 8px; height: 8px; background: var(--success); border-radius: 50%; box-shadow: 0 0 10px var(--success); animation: pulse 2s infinite; }
@keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.5; } 100% { opacity: 1; } }

.hero-title { font-size: clamp(2.5rem, 5vw, 5rem); margin-bottom: 20px; letter-spacing: -1px; }
.text-gradient { background: linear-gradient(90deg, #60a5fa, #f472b6, #fbbf24); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
.hero-subtitle { font-size: 1.2rem; color: var(--text-muted); max-width: 700px; margin: 0 auto 40px; line-height: 1.6; }

.hero-cta-group { display: flex; gap: 20px; justify-content: center; margin-bottom: 60px; }
.btn-hero { padding: 16px 32px; border-radius: 50px; font-weight: 700; font-size: 1.1rem; display: flex; align-items: center; gap: 10px; }
.btn-hero.primary { background: #fff; color: #000; box-shadow: 0 0 20px rgba(255,255,255,0.3); }
.btn-hero.primary:hover { transform: translateY(-3px); box-shadow: 0 0 30px rgba(255,255,255,0.5); }
.btn-hero.secondary { background: rgba(255,255,255,0.1); color: white; backdrop-filter: blur(10px); }
.btn-hero.secondary:hover { background: rgba(255,255,255,0.2); }

.hero-trust p { text-transform: uppercase; font-size: 0.85rem; color: #52525b; letter-spacing: 1px; margin-bottom: 15px; }
.flags-row { display: flex; gap: 20px; justify-content: center; flex-wrap: wrap; }
.flags-row span { background: rgba(255,255,255,0.05); padding: 6px 14px; border-radius: 8px; color: #d4d4d8; font-size: 0.9rem; font-weight: 600; }
.dimmed { opacity: 0.5; }

/* 2. STATS BAR */
.stats-bar { padding: 40px 0; background: #0a0a0a; border-bottom: 1px solid var(--border); }
.stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 30px; }
.stat-item { display: flex; align-items: center; gap: 15px; justify-content: center; }
.stat-icon { font-size: 2.5rem; color: var(--primary); opacity: 0.8; }
.stat-text strong { display: block; font-size: 1.4rem; color: white; }
.stat-text span { font-size: 0.85rem; color: var(--text-muted); }

/* 3. PAIN POINTS */
.pain-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; margin-top: 50px; }
.pain-card { background: var(--bg-card); padding: 30px; border-radius: 20px; border: 1px solid var(--border); transition: 0.3s; }
.pain-card:hover { transform: translateY(-5px); border-color: var(--danger); }
.pain-icon { font-size: 3rem; margin-bottom: 20px; }
.center { text-align: center; max-width: 800px; margin: 0 auto; }

/* 4. BUILDER */
.builder-wrapper { background: #08080a; }
.tag-accent { color: var(--accent-yellow); font-weight: 700; letter-spacing: 1px; font-size: 0.8rem; display: block; margin-bottom: 10px; text-align: center; }
.section-header { text-align: center; margin-bottom: 50px; }
.section-header h2 { font-size: 2.5rem; margin-bottom: 15px; }
.section-header p { color: var(--text-muted); font-size: 1.1rem; }

.builder-main { display: grid; grid-template-columns: 2fr 1fr; gap: 40px; align-items: start; }
@media(max-width: 900px) { .builder-main { grid-template-columns: 1fr; } }

.lang-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 20px; }
.lang-card { background: var(--bg-card); border: 2px solid var(--border); border-radius: 16px; padding: 20px; cursor: pointer; position: relative; transition: 0.2s; overflow: hidden; }
.lang-card:hover:not(.locked) { background: var(--bg-hover); border-color: rgba(255,255,255,0.3); }
.lang-card.selected { border-color: var(--accent); background: rgba(255,255,255,0.03); box-shadow: inset 0 0 20px rgba(0,0,0,0.5); }
.lang-card.locked { opacity: 0.5; cursor: default; border-style: dashed; }

.lc-badge { position: absolute; top: 0; right: 0; padding: 4px 10px; font-size: 0.7rem; font-weight: 800; color: #000; border-bottom-left-radius: 12px; }
.lc-head { display: flex; align-items: center; gap: 12px; margin-bottom: 15px; }
.lc-flag { font-size: 2.2rem; }
.lc-info h4 { font-size: 1.1rem; margin-bottom: 4px; }
.lc-info span { font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; }
.lc-check { margin-left: auto; font-size: 1.2rem; color: var(--text-muted); }
.lang-card.selected .lc-check { color: var(--accent); }
.ring { width: 20px; height: 20px; border: 2px solid var(--border); border-radius: 50%; }

.lc-desc { font-size: 0.85rem; color: #d4d4d8; margin-bottom: 15px; line-height: 1.4; }
.lc-tags { display: flex; gap: 6px; }
.lc-tags span { background: rgba(255,255,255,0.08); padding: 2px 8px; border-radius: 4px; font-size: 0.7rem; color: var(--text-muted); }

/* SIDEBAR TICKET */
.sidebar-wrapper { position: sticky; top: 100px; }
.pricing-card { background: #18181b; border-radius: 20px; border: 1px solid var(--border); overflow: hidden; box-shadow: 0 20px 50px rgba(0,0,0,0.5); }
.pc-header { padding: 15px; background: #202025; border-bottom: 1px solid var(--border); text-align: center; }
.pc-header h3 { font-size: 1.1rem; display: flex; align-items: center; justify-content: center; gap: 8px; }
.pc-body { padding: 20px; }
.pc-empty { text-align: center; color: var(--text-muted); font-style: italic; padding: 20px 0; }
.pc-list { list-style: none; padding: 0; margin-bottom: 20px; }
.pc-list li { padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.05); font-size: 0.95rem; }

.pc-totals { margin-bottom: 20px; }
.pc-saving { background: rgba(16, 185, 129, 0.15); color: var(--success); text-align: center; padding: 8px; border-radius: 8px; font-size: 0.85rem; margin-bottom: 15px; font-weight: 600; }
.total-row { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 5px; }
.final-price { font-size: 1.8rem; color: white; }
.sub-row { display: flex; justify-content: space-between; font-size: 0.85rem; color: var(--text-muted); }

.btn-add-plan { width: 100%; background: white; color: black; font-weight: 800; padding: 16px; border-radius: 12px; transition: 0.2s; font-size: 1rem; }
.btn-add-plan:hover:not(:disabled) { background: #e0e7ff; transform: scale(1.02); }
.btn-add-plan:disabled { opacity: 0.5; cursor: not-allowed; }

.bundle-logic { margin-top: 20px; font-size: 0.85rem; background: rgba(255,255,255,0.03); padding: 15px; border-radius: 10px; }
.bundle-logic ul { list-style: none; padding: 0; margin: 10px 0 0 0; }
.bundle-logic li { display: flex; justify-content: space-between; margin-bottom: 5px; color: var(--text-muted); }
.bundle-logic li.active { color: var(--success); font-weight: 700; }

/* 5. SYLLABUS */
.syllabus-section { background: #0c0c0e; }
.layout-split { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; }
@media(max-width: 900px) { .layout-split { grid-template-columns: 1fr; } }

.tabs-header { display: flex; gap: 10px; margin-bottom: 20px; flex-wrap: wrap; }
.tab-btn { background: transparent; border: 1px solid var(--border); color: var(--text-muted); padding: 8px 16px; border-radius: 50px; display: flex; gap: 6px; align-items: center; font-size: 0.9rem; }
.tab-btn.active { background: rgba(255,255,255,0.1); color: white; border-color: var(--tab-color); box-shadow: 0 0 15px rgba(0,0,0,0.2); }

.syllabus-level { margin-bottom: 25px; }
.syllabus-level h4 { color: var(--primary); margin-bottom: 10px; font-size: 1.1rem; border-left: 3px solid var(--primary); padding-left: 10px; }
.syllabus-level ul { list-style: none; padding: 0; }
.syllabus-level li { margin-bottom: 8px; display: flex; gap: 10px; font-size: 0.95rem; color: #e4e4e7; }
.chk-s { color: var(--success); font-size: 0.8rem; margin-top: 4px; }
.fade-in { animation: fadeIn 0.5s ease; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

.platform-mockup { background: #1e1e24; border-radius: 16px; padding: 15px; transform: perspective(1000px) rotateY(-5deg); transition: 0.5s; }
.platform-mockup:hover { transform: perspective(1000px) rotateY(0deg); }
.pm-screen { height: 220px; background: #25252b; border-radius: 8px; position: relative; display: flex; align-items: center; justify-content: center; margin-bottom: 15px; }
.live-badge { position: absolute; top: 10px; left: 10px; background: #ef4444; color: white; padding: 2px 8px; font-size: 0.7rem; font-weight: 700; border-radius: 4px; animation: blink 2s infinite; }
@keyframes blink { 50% { opacity: 0.5; } }
.pm-content { text-align: center; }
.big-icon { font-size: 3rem; color: #52525b; margin-bottom: 10px; display: block; margin: 0 auto; }
.pm-controls { display: flex; gap: 10px; }
.ctrl { flex: 1; background: #333; height: 10px; border-radius: 4px; height: 40px; display: flex; align-items: center; justify-content: center; font-size: 0.8rem; color: #aaa; gap: 5px; }

/* 6. COMPARISON TABLE */
.table-responsive { overflow-x: auto; margin-top: 40px; }
.comp-table { width: 100%; min-width: 700px; border-collapse: collapse; }
.comp-table th { text-align: left; padding: 20px; border-bottom: 1px solid var(--border); color: var(--text-muted); font-size: 0.85rem; text-transform: uppercase; }
.th-lael { color: var(--primary) !important; font-size: 1rem !important; font-weight: 800; }
.comp-table td { padding: 20px; border-bottom: 1px solid rgba(255,255,255,0.03); color: white; }
.td-feat { font-weight: 600; font-size: 0.95rem; }
.td-lael { background: rgba(59, 130, 246, 0.05); font-weight: 700; box-shadow: inset 0 0 20px rgba(0,0,0,0.2); }
.chk-yes { color: var(--success); }
.chk-no { color: var(--danger); opacity: 0.5; }

/* 7. TEACHERS */
.team-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 30px; margin-top: 40px; }
.teacher-card { background: var(--bg-card); padding: 25px; border-radius: 16px; border: 1px solid var(--border); display: flex; gap: 20px; align-items: start; transition: 0.3s; }
.teacher-card:hover { border-color: var(--primary); transform: translateY(-5px); }
.t-img { font-size: 3rem; background: rgba(255,255,255,0.05); width: 70px; height: 70px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.t-info h4 { font-size: 1.1rem; margin-bottom: 2px; }
.t-flag { font-size: 0.8rem; color: var(--text-muted); margin-bottom: 4px; }
.t-role { color: var(--primary); font-size: 0.8rem; font-weight: 700; text-transform: uppercase; margin-bottom: 10px; display: block; }
.t-info p { font-size: 0.9rem; color: #d4d4d8; line-height: 1.4; margin: 0; }

/* 8. BENEFITS */
.benefits-grid-section { padding: 60px 0; }
.b-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; }
.b-card { background: #1c1c1c; padding: 30px; border-radius: 16px; text-align: center; }
.b-icon { font-size: 2.5rem; color: var(--accent-pink); margin-bottom: 15px; }
.b-card h3 { margin-bottom: 10px; }
.b-card p { color: var(--text-muted); font-size: 0.95rem; }

/* 9. FAQ */
.faq-wrapper { margin-top: 40px; max-width: 800px; margin-left: auto; margin-right: auto; }
.faq-item { background: var(--bg-card); border: 1px solid var(--border); border-radius: 12px; margin-bottom: 15px; overflow: hidden; }
.faq-item summary { padding: 20px; cursor: pointer; font-weight: 600; list-style: none; position: relative; }
.faq-item summary::-webkit-details-marker { display: none; }
.faq-item[open] summary { color: var(--primary); background: rgba(255,255,255,0.02); }
.faq-item p { padding: 0 20px 20px 20px; color: var(--text-muted); margin: 0; line-height: 1.6; }

/* 10. CTA FOOTER */
.final-cta { padding: 120px 0; background: linear-gradient(0deg, #1e1b4b 0%, var(--bg-deep) 100%); text-align: center; }
.plane-anim { font-size: 4rem; color: var(--primary); margin-bottom: 20px; animation: float 3s ease-in-out infinite; }
@keyframes float { 0%, 100% { transform: translateY(0) rotate(-45deg); } 50% { transform: translateY(-10px) rotate(-45deg); } }
.f-content h2 { font-size: 3rem; margin-bottom: 20px; }
.f-content p { font-size: 1.2rem; color: #c7d2fe; margin-bottom: 40px; }
.f-actions { display: flex; justify-content: center; gap: 20px; flex-wrap: wrap; }
.btn-big-pulse { background: white; color: black; font-weight: 800; padding: 18px 40px; border-radius: 50px; font-size: 1.1rem; animation: pulse-shadow 2s infinite; }
@keyframes pulse-shadow { 0% { box-shadow: 0 0 0 0 rgba(255,255,255,0.4); } 70% { box-shadow: 0 0 0 20px rgba(255,255,255,0); } 100% { box-shadow: 0 0 0 0 rgba(255,255,255,0); } }
.btn-wsp-ghost { border: 2px solid #25D366; color: #25D366; padding: 16px 30px; border-radius: 50px; font-weight: 700; text-decoration: none; display: flex; align-items: center; gap: 8px; }
.btn-wsp-ghost:hover { background: #25D366; color: black; }

/* STICKY BAR */
.sticky-bar { position: fixed; bottom: -100px; left: 0; width: 100%; background: rgba(15, 15, 15, 0.95); backdrop-filter: blur(10px); border-top: 1px solid var(--border); z-index: 100; transition: bottom 0.4s ease; padding: 15px 0; }
.sticky-bar.visible { bottom: 0; }
.sb-content { display: flex; justify-content: space-between; align-items: center; }
.sb-info { display: flex; gap: 10px; align-items: center; }
.sb-info strong { color: var(--primary); }
.sb-actions { display: flex; gap: 20px; align-items: center; }
.sb-price { font-size: 1.4rem; font-weight: 700; color: white; }
.sb-price small { font-size: 0.8rem; color: var(--text-muted); font-weight: 400; }
.btn-sb { background: var(--primary); color: white; padding: 10px 24px; border-radius: 8px; font-weight: 700; }
.btn-sb:disabled { background: #333; opacity: 0.5; }

@media(max-width: 600px) {
  .hero-title { font-size: 2.8rem; }
  .sb-info { display: none; }
  .sb-content { justify-content: space-between; width: 100%; }
}
`;