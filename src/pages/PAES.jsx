import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

// Importamos ICONOS (Asegúrate de tener react-icons instalado)
import { 
  FaCheck, FaTimes, FaInfoCircle, FaFire, FaBookOpen, FaLaptopCode, 
  FaWhatsapp, FaArrowRight, FaStar, FaUserGraduate, FaUniversity, 
  FaBrain, FaChartLine, FaClock, FaShieldAlt, FaPlayCircle, FaDownload
} from "react-icons/fa";
import { BiMath, BiAtom, BiWorld, BiTestTube, BiBookReader } from "react-icons/bi";
import { MdOutlineSupportAgent, MdQuiz } from "react-icons/md";

// Importamos tu lógica maestra de datos
import { 
  PAES_SUBJECTS, 
  PAES_COMBOS, 
  computePaesPrice, 
  clp 
} from "../data/paes.js";

/* ──────────────────────────────────────────────────────────────────────────
   DATA LOCAL EXTRA (Para hacer la página gigante y detallada)
   ────────────────────────────────────────────────────────────────────────── */
const SYLLABUS_PREVIEW = {
  m1: [
    "Números: Racionales, Potencias y Raíces.",
    "Álgebra: Ecuaciones, Inecuaciones y Sistemas.",
    "Geometría: Figuras 2D, 3D y Vectores.",
    "Datos y Azar: Probabilidades y Estadística Descriptiva."
  ],
  len: [
    "Textos Literarios: Narrativa y Dramática.",
    "Textos No Literarios: Medios Masivos y Argumentación.",
    "Vocabulario Contextual y Plan de Redacción.",
    "Lectura Crítica e Inferencial."
  ]
};

const TEACHERS = [
  { name: "Javiera Paz", title: "Magíster en Literatura", uni: "U. de Chile", area: "Lenguaje", img: "👩‍🏫" },
  { name: "Carlos Soto", title: "Ingeniero Civil", uni: "PUC", area: "Matemática", img: "👨‍🏫" },
  { name: "Ana María", title: "Dra. en Ciencias", uni: "U. de Concepción", area: "Biología", img: "👩‍🔬" },
];

const COMPARISON_DATA = [
  { feature: "Clases en Vivo", lael: true, other: true, tutor: true },
  { feature: "Grabaciones 4K", lael: true, other: false, tutor: false },
  { feature: "Ensayo Semanal", lael: true, other: "Mensual", tutor: "No incluído" },
  { feature: "Corrección con IA", lael: true, other: false, tutor: false },
  { feature: "Orientación Vocacional", lael: true, other: false, tutor: false },
  { feature: "Precio Mensual Promedio", lael: "$27.990", other: "$85.000", tutor: "$160.000" },
];

const REVIEWS = [
  { name: "Tomás R.", career: "Derecho UCH", score: "920 pts", text: "Estaba perdido en matemáticas. El método de Lael me hizo entender la lógica y no solo memorizar fórmulas." },
  { name: "Valentina C.", career: "Medicina USACH", score: "965 pts", text: "Los ensayos ilimitados fueron clave. Llegué a la prueba sintiendo que era un ensayo más. ¡Gracias infinitas!" },
  { name: "Benjamín L.", career: "Ingeniería PUC", score: "910 pts", text: "La plataforma es otro nivel. Poder ver las clases en x1.5 y descargar los PDF me ahorró muchísimo tiempo." },
];

/* ──────────────────────────────────────────────────────────────────────────
   COMPONENTE PRINCIPAL
   ────────────────────────────────────────────────────────────────────────── */
export default function Paes() {
  const { addToCart, openCart } = useCart();
  
  // --- ESTADOS ---
  const [selectedIds, setSelectedIds] = useState([]);
  const [pricing, setPricing] = useState(computePaesPrice([]));
  const [activeTab, setActiveTab] = useState("m1"); // Para el Syllabus
  const [showSticky, setShowSticky] = useState(false); // Barra inferior pegajosa

  // --- EFECTOS ---
  useEffect(() => {
    setPricing(computePaesPrice(selectedIds));
  }, [selectedIds]);

  // Detector de Scroll para barra pegajosa
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 600) setShowSticky(true);
      else setShowSticky(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // --- HANDLERS ---
  const toggleSubject = (id) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
  };

  const handleAddCustom = () => {
    if (selectedIds.length === 0) return;
    const names = selectedIds.map(id => PAES_SUBJECTS.find(s => s.id === id).name).join(", ");
    addToCart({
      id: `custom-${selectedIds.join('-')}`,
      title: `${pricing.label} (${selectedIds.length} ramos)`,
      price: pricing.totalMonthly,
      detail: names,
      type: 'plan'
    });
    openCart();
  };

  const handleAddCombo = (combo) => {
    addToCart({
      id: `combo-${combo.id}`,
      title: `Pack ${combo.title}`,
      price: combo.price,
      detail: combo.features.join(", "),
      type: 'pack'
    });
    openCart();
  };

  const scrollToBuilder = () => {
    document.getElementById('builder-section').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="paes-huge-page">
      <style>{css}</style>
      
      {/* ──────────────── SECTION 1: HERO MASIVO ──────────────── */}
      <header className="hero-section">
        <div className="hero-overlay"></div>
        <div className="container hero-content">
          <div className="hero-badge">
            <span className="pulse-dot"></span> Admisión 2026 Abierta
          </div>
          <h1 className="hero-title">
            Tu Puntaje Nacional <br />
            <span className="text-gradient">no es cuestión de suerte.</span>
          </h1>
          <p className="hero-subtitle">
            Olvídate de los preuniversitarios del siglo pasado. Entrena con 
            Inteligencia Artificial, tutores expertos y una metodología diseñada 
            para maximizar tu puntaje en tiempo récord.
          </p>
          
          <div className="hero-cta-group">
            <button onClick={scrollToBuilder} className="btn-hero primary">
              Armar mi Plan <FaArrowRight />
            </button>
            <button className="btn-hero secondary">
              <FaPlayCircle /> Ver cómo funciona
            </button>
          </div>

          <div className="hero-trust">
            <p>Nuestros alumnos estudian hoy en:</p>
            <div className="logos-row">
              <span>🏛️ U. de Chile</span>
              <span>⛪ PUC</span>
              <span>🏗️ USACH</span>
              <span>🌲 U. de Concepción</span>
            </div>
          </div>
        </div>
      </header>

      {/* ──────────────── SECTION 2: DATOS DUROS (STATS) ──────────────── */}
      <section className="stats-bar">
        <div className="container stats-grid">
          <div className="stat-item">
            <FaChartLine className="stat-icon"/>
            <div className="stat-text">
              <strong>+180 pts</strong>
              <span>Alza promedio</span>
            </div>
          </div>
          <div className="stat-item">
            <FaUserGraduate className="stat-icon"/>
            <div className="stat-text">
              <strong>85%</strong>
              <span>Entra a su 1ª opción</span>
            </div>
          </div>
          <div className="stat-item">
            <MdQuiz className="stat-icon"/>
            <div className="stat-text">
              <strong>15.000+</strong>
              <span>Ensayos rendidos</span>
            </div>
          </div>
          <div className="stat-item">
            <FaStar className="stat-icon"/>
            <div className="stat-text">
              <strong>4.9/5</strong>
              <span>Valoración alumnos</span>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────── SECTION 3: EL PROBLEMA (PAIN POINTS) ──────────────── */}
      <section className="pain-section">
        <div className="container">
          <div className="section-header center">
            <h2>¿Por qué la mayoría falla en la PAES?</h2>
            <p>No es falta de capacidad, es falta de estrategia.</p>
          </div>
          <div className="pain-grid">
            <div className="pain-card">
              <div className="pain-icon">📉</div>
              <h3>Estudian de memoria</h3>
              <p>La PAES mide habilidades, no memoria. Memorizar fórmulas no sirve si no sabes aplicarlas a problemas nuevos.</p>
            </div>
            <div className="pain-card">
              <div className="pain-icon">🥱</div>
              <h3>Clases aburridas</h3>
              <p>Estar sentado 2 horas escuchando a un profesor dictar materia es la forma menos eficiente de aprender.</p>
            </div>
            <div className="pain-card">
              <div className="pain-icon">😰</div>
              <h3>Ansiedad y Estrés</h3>
              <p>Llegar a la prueba sin haber ensayado bajo presión real provoca bloqueos mentales el día D.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────── SECTION 4: LA SOLUCIÓN (MÉTODO LAEL) ──────────────── */}
      <section className="method-section">
        <div className="container layout-split">
          <div className="method-text">
            <span className="tag-accent">METODOLOGÍA LAEL</span>
            <h2>El camino científico hacia los 1000 puntos</h2>
            <p>Hemos deconstruido la prueba para crear un sistema de 4 pilares que garantiza resultados.</p>
            
            <ul className="method-steps">
              <li>
                <div className="step-num">1</div>
                <div>
                  <strong>Diagnóstico Inteligente</strong>
                  <p>Detectamos tus vacíos base desde el día 1 para no perder tiempo en lo que ya sabes.</p>
                </div>
              </li>
              <li>
                <div className="step-num">2</div>
                <div>
                  <strong>Nivelación Acelerada</strong>
                  <p>Clases intensivas para cubrir las lagunas de 1° a 4° medio en tiempo récord.</p>
                </div>
              </li>
              <li>
                <div className="step-num">3</div>
                <div>
                  <strong>Dominio del Contenido</strong>
                  <p>Clases en vivo enfocadas en "saber hacer", con trucos y atajos matemáticos.</p>
                </div>
              </li>
              <li>
                <div className="step-num">4</div>
                <div>
                  <strong>Simulación de Guerra</strong>
                  <p>Ensayos contrarreloj semanales que replican las condiciones reales de la prueba.</p>
                </div>
              </li>
            </ul>
          </div>
          <div className="method-visual">
            <div className="visual-card-glass">
              <div className="chart-mockup">
                 <div className="bar b1"></div>
                 <div className="bar b2"></div>
                 <div className="bar b3"></div>
                 <div className="bar b4"></div>
              </div>
              <div className="float-badge top-right">🚀 Proyección Exponencial</div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────── SECTION 5: CALCULADORA (CORE) ──────────────── */}
      <section id="builder-section" className="builder-wrapper">
        <div className="container">
          <div className="section-header">
            <h2>Arma tu Horario y Ahorra</h2>
            <p>Selecciona las materias que necesitas. El descuento se aplica automáticamente.</p>
          </div>

          <div className="builder-main">
            {/* IZQUIERDA: SELECTOR */}
            <div className="subjects-selection">
              {PAES_SUBJECTS.map((sub) => {
                 const isActive = selectedIds.includes(sub.id);
                 return (
                  <div 
                    key={sub.id} 
                    className={`subject-row ${isActive ? 'active' : ''}`}
                    onClick={() => toggleSubject(sub.id)}
                  >
                    <div className="sr-icon" style={{background: sub.color}}>{sub.icon}</div>
                    <div className="sr-info">
                      <h4>{sub.name}</h4>
                      <span>{sub.category} • {sub.hoursPerWeek} hrs/sem</span>
                    </div>
                    <div className="sr-action">
                      {isActive ? <FaCheck className="chk-anim"/> : <div className="plus-btn">+</div>}
                    </div>
                  </div>
                 )
              })}
            </div>

            {/* DERECHA: TICKET FLOTANTE */}
            <div className="pricing-card-wrapper">
              <div className="pricing-card">
                <div className="pc-header">
                  <h3>Resumen de Matrícula</h3>
                </div>
                <div className="pc-body">
                  {pricing.count === 0 ? (
                    <div className="pc-empty">
                      <FaArrowRight className="anim-arrow"/> Selecciona tus ramos
                    </div>
                  ) : (
                    <ul className="pc-list">
                      {selectedIds.map(id => (
                        <li key={id}>
                          {PAES_SUBJECTS.find(s=>s.id===id).name}
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="pc-totals">
                    {pricing.saving > 0 && (
                      <div className="pc-saving">
                        Ahorras <span>{clp(pricing.saving)}</span> al mes
                      </div>
                    )}
                    <div className="total-row">
                      <span>Total Mensual</span>
                      <strong className="final-price">{clp(pricing.totalMonthly)}</strong>
                    </div>
                    <div className="sub-row">
                      <span>Matrícula anual única:</span>
                      <span>{clp(pricing.enrollment)}</span>
                    </div>
                  </div>

                  <button 
                    className="btn-add-plan" 
                    disabled={pricing.count === 0}
                    onClick={handleAddCustom}
                  >
                    {pricing.count === 0 ? 'Elige Ramos' : 'INSCRIBIR AHORA'}
                  </button>
                  <p className="pc-note">
                    <FaShieldAlt/> Garantía de satisfacción 7 días.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────── SECTION 6: PACKS RECOMENDADOS ──────────────── */}
      <section className="combos-section-dark">
        <div className="container">
          <div className="section-header center">
            <h2>O elige un Pack de Carrera</h2>
            <p>Combinaciones optimizadas para las carreras más demandadas.</p>
          </div>
          <div className="combos-flex">
            {PAES_COMBOS.map((combo) => (
              <div className={`combo-box ${combo.id}`} key={combo.id}>
                {combo.tag && <div className="ribbon">{combo.tag}</div>}
                <div className="cb-head">
                  <h3>{combo.title}</h3>
                  <p>{combo.subtitle}</p>
                </div>
                <div className="cb-price">
                  <span>{clp(combo.price)}</span> <small>/mes</small>
                </div>
                <div className="cb-feats">
                  {combo.features.map((f, i) => (
                    <div key={i} className="feat-row"><FaCheck/> {f}</div>
                  ))}
                </div>
                <button className="btn-combo-add" onClick={() => handleAddCombo(combo)}>
                  Seleccionar Pack
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────── SECTION 7: VISTAZO AL AULA (SYLLABUS) ──────────────── */}
      <section className="syllabus-section">
        <div className="container">
          <div className="layout-split reverse">
            <div className="syllabus-content">
              <h2>¿Qué aprenderás?</h2>
              <p>Un vistazo a nuestros contenidos estrella.</p>
              
              <div className="tabs-header">
                <button 
                  className={`tab-btn ${activeTab === 'm1' ? 'active' : ''}`}
                  onClick={() => setActiveTab('m1')}
                >
                  <BiMath/> Matemática M1
                </button>
                <button 
                  className={`tab-btn ${activeTab === 'len' ? 'active' : ''}`}
                  onClick={() => setActiveTab('len')}
                >
                  <BiBookReader/> Lenguaje
                </button>
              </div>

              <div className="tab-body">
                {activeTab === 'm1' ? (
                  <ul className="syllabus-list">
                    {SYLLABUS_PREVIEW.m1.map((item, i) => (
                      <li key={i}><FaCheck className="s-icon"/> {item}</li>
                    ))}
                  </ul>
                ) : (
                  <ul className="syllabus-list">
                    {SYLLABUS_PREVIEW.len.map((item, i) => (
                      <li key={i}><FaCheck className="s-icon"/> {item}</li>
                    ))}
                  </ul>
                )}
                <div className="syllabus-note">
                  <FaInfoCircle/> Y mucho más en la plataforma online.
                </div>
              </div>
            </div>
            
            <div className="syllabus-img">
               <div className="platform-mockup">
                 <div className="pm-screen">
                    <div className="pm-video-overlay"><FaPlayCircle/></div>
                    <div className="pm-label">Clase en Vivo</div>
                 </div>
                 <div className="pm-tools">
                    <span><FaDownload/> Guía PDF</span>
                    <span><MdOutlineSupportAgent/> Chat Tutor</span>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────── SECTION 8: COMPARATIVA ──────────────── */}
      <section className="comparison-section">
        <div className="container">
          <h2>Lael vs. El Resto</h2>
          <div className="table-responsive">
            <table className="comp-table">
              <thead>
                <tr>
                  <th>Beneficio</th>
                  <th className="th-lael">Instituto Lael</th>
                  <th>Preu Tradicional</th>
                  <th>Profe Particular</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_DATA.map((row, idx) => (
                  <tr key={idx}>
                    <td className="td-feat">{row.feature}</td>
                    <td className="td-lael">
                      {row.lael === true ? <FaCheck className="chk-yes"/> : row.lael}
                    </td>
                    <td>
                       {row.other === true ? <FaCheck/> : row.other === false ? <FaTimes className="chk-no"/> : row.other}
                    </td>
                    <td>
                       {row.tutor === true ? <FaCheck/> : row.tutor === false ? <FaTimes className="chk-no"/> : row.tutor}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ──────────────── SECTION 9: EQUIPO DOCENTE ──────────────── */}
      <section className="team-section">
        <div className="container">
          <div className="section-header center">
            <h2>Aprende de los Mejores</h2>
            <p>Nuestros profesores no solo saben la materia, saben enseñarla.</p>
          </div>
          <div className="team-grid">
            {TEACHERS.map((t, i) => (
              <div className="teacher-card" key={i}>
                <div className="t-avatar">{t.img}</div>
                <div className="t-info">
                  <h4>{t.name}</h4>
                  <span className="t-area">{t.area}</span>
                  <p className="t-uni"><FaUniversity/> {t.title}</p>
                  <p className="t-uni"><FaUserGraduate/> {t.uni}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────── SECTION 10: TESTIMONIOS ──────────────── */}
      <section className="reviews-section">
        <div className="container">
          <h2>Historias de Éxito</h2>
          <div className="reviews-grid">
            {REVIEWS.map((r, i) => (
              <div className="review-card" key={i}>
                <div className="r-stars">★★★★★</div>
                <p className="r-text">"{r.text}"</p>
                <div className="r-author">
                  <div className="r-av">{r.name.charAt(0)}</div>
                  <div>
                    <strong>{r.name}</strong>
                    <span>{r.career} • {r.score}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────── SECTION 11: PREGUNTAS FRECUENTES ──────────────── */}
      <section className="faq-section-extended">
        <div className="container">
          <h2>Preguntas Frecuentes</h2>
          <div className="faq-grid">
            <details className="faq-box">
              <summary>¿Qué pasa si me pierdo una clase?</summary>
              <p>¡Tranquilo! Todas las clases se graban en alta definición y se suben a tu aula virtual en menos de 24 horas. Puedes verlas las veces que quieras.</p>
            </details>
            <details className="faq-box">
              <summary>¿Cómo funcionan los ensayos?</summary>
              <p>Tienes ensayos semanales obligatorios y ensayos libres ilimitados. La plataforma te entrega el puntaje inmediatamente con el desglose de tus errores.</p>
            </details>
            <details className="faq-box">
              <summary>¿Puedo pagar con tarjeta de crédito?</summary>
              <p>Sí, aceptamos tarjetas de débito, crédito y transferencia bancaria. Puedes pagar la mensualidad mes a mes sin amarrarte todo el año.</p>
            </details>
            <details className="faq-box">
              <summary>¿Tienen material impreso?</summary>
              <p>Nuestro enfoque es digital y ecológico. Todo el material (guías, libros, ensayos) es PDF descargable optimizado para tablets y pantallas, pero puedes imprimirlo si prefieres.</p>
            </details>
          </div>
        </div>
      </section>

      {/* ──────────────── FINAL CTA ──────────────── */}
      <footer className="final-cta-section">
        <div className="container f-cta-content">
          <h2>Tu futuro universitario comienza hoy</h2>
          <p>No dejes que pase otro mes sin prepararte. Los cupos son limitados por sección.</p>
          <div className="f-btns">
            <button onClick={scrollToBuilder} className="btn-big-pulse">
              INSCRIBIRME AHORA
            </button>
            <a href="https://wa.me/56964626568" target="_blank" rel="noreferrer" className="btn-wsp-outline">
              <FaWhatsapp/> Dudas al WhatsApp
            </a>
          </div>
          <p className="legal-disclaimer">
            *Resultados pasados no garantizan resultados futuros. El éxito depende de tu compromiso.
          </p>
        </div>
      </footer>

      {/* ──────────────── STICKY BOTTOM BAR (MÓVIL/DESKTOP) ──────────────── */}
      <div className={`sticky-bottom-bar ${showSticky ? 'visible' : ''}`}>
        <div className="container sbb-flex">
          <div className="sbb-info">
            <span>Tu Plan:</span>
            <strong>{pricing.label}</strong>
          </div>
          <div className="sbb-actions">
            <div className="sbb-price">{clp(pricing.totalMonthly)}<small>/mes</small></div>
            <button onClick={handleAddCustom} disabled={pricing.count===0} className="btn-sbb">
              INSCRIBIR
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   ESTILOS CSS (ENORME)
   ────────────────────────────────────────────────────────────────────────── */
const css = `
:root {
  --bg-main: #020204;
  --bg-card: #0F1116;
  --bg-card-hover: #151820;
  --primary: #6366f1;
  --primary-glow: rgba(99, 102, 241, 0.4);
  --accent: #F59E0B;
  --text-white: #ffffff;
  --text-gray: #9ca3af;
  --border-color: rgba(255,255,255,0.08);
  --success: #10b981;
  --font-main: 'Inter', system-ui, sans-serif;
}

/* GENERAL RESET */
.paes-huge-page { background: var(--bg-main); color: var(--text-white); font-family: var(--font-main); overflow-x: hidden; padding-bottom: 80px; }
.container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
h1, h2, h3, h4 { font-weight: 800; line-height: 1.1; margin: 0; }
button { font-family: inherit; cursor: pointer; border: none; outline: none; transition: 0.2s; }
section { padding: 80px 0; border-bottom: 1px solid rgba(255,255,255,0.03); }

/* 1. HERO */
.hero-section { min-height: 90vh; display: flex; align-items: center; position: relative; padding-top: 100px; background: radial-gradient(circle at 50% 30%, #1a1b2e 0%, #020204 70%); }
.hero-content { position: relative; z-index: 2; text-align: center; max-width: 900px; }
.hero-badge { display: inline-flex; align-items: center; gap: 8px; background: rgba(255,255,255,0.05); padding: 8px 16px; border-radius: 50px; border: 1px solid var(--border-color); font-size: 0.9rem; margin-bottom: 25px; color: #a5b4fc; }
.pulse-dot { width: 8px; height: 8px; background: var(--success); border-radius: 50%; box-shadow: 0 0 10px var(--success); animation: pulse 2s infinite; }
@keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.5; } 100% { opacity: 1; } }

.hero-title { font-size: clamp(2.5rem, 5vw, 4.5rem); letter-spacing: -0.02em; margin-bottom: 20px; }
.text-gradient { background: linear-gradient(90deg, #fff 20%, #818cf8 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
.hero-subtitle { font-size: 1.25rem; color: var(--text-gray); line-height: 1.6; max-width: 700px; margin: 0 auto 40px; }

.hero-cta-group { display: flex; gap: 20px; justify-content: center; margin-bottom: 60px; }
.btn-hero { padding: 16px 32px; border-radius: 50px; font-weight: 700; font-size: 1.1rem; display: flex; align-items: center; gap: 10px; }
.btn-hero.primary { background: var(--primary); color: white; box-shadow: 0 10px 30px var(--primary-glow); }
.btn-hero.primary:hover { transform: translateY(-3px); box-shadow: 0 15px 40px var(--primary-glow); }
.btn-hero.secondary { background: rgba(255,255,255,0.1); color: white; backdrop-filter: blur(10px); }
.btn-hero.secondary:hover { background: rgba(255,255,255,0.2); }

.hero-trust p { color: #52525b; font-size: 0.9rem; margin-bottom: 15px; text-transform: uppercase; letter-spacing: 1px; }
.logos-row { display: flex; gap: 30px; justify-content: center; flex-wrap: wrap; opacity: 0.6; grayscale: 100%; }
.logos-row span { font-size: 1.1rem; color: #a1a1aa; font-weight: 600; display: flex; gap: 6px; align-items: center; }

/* 2. STATS BAR */
.stats-bar { padding: 40px 0; background: #08080a; border-bottom: 1px solid var(--border-color); }
.stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 30px; }
.stat-item { display: flex; align-items: center; gap: 15px; justify-content: center; }
.stat-icon { font-size: 2.5rem; color: #4f46e5; opacity: 0.8; }
.stat-text strong { display: block; font-size: 1.4rem; color: white; }
.stat-text span { font-size: 0.85rem; color: var(--text-gray); }

/* 3. PAIN POINTS */
.pain-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; margin-top: 50px; }
.pain-card { background: var(--bg-card); padding: 30px; border-radius: 20px; border: 1px solid var(--border-color); transition: 0.3s; }
.pain-card:hover { transform: translateY(-5px); border-color: rgba(255,0,0,0.3); }
.pain-icon { font-size: 3rem; margin-bottom: 20px; }
.pain-card h3 { margin-bottom: 10px; font-size: 1.3rem; }
.pain-card p { color: var(--text-gray); line-height: 1.5; }
.center { text-align: center; max-width: 800px; margin: 0 auto; }

/* 4. METHODOLOGY */
.layout-split { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; }
@media(max-width: 900px) { .layout-split { grid-template-columns: 1fr; } .layout-split.reverse { display: flex; flex-direction: column-reverse; } }
.tag-accent { color: var(--accent); font-weight: 700; letter-spacing: 1px; font-size: 0.8rem; display: block; margin-bottom: 10px; }
.method-steps { list-style: none; padding: 0; margin-top: 30px; }
.method-steps li { display: flex; gap: 20px; margin-bottom: 30px; }
.step-num { width: 40px; height: 40px; background: rgba(255,255,255,0.05); border-radius: 10px; display: flex; align-items: center; justify-content: center; font-weight: 800; color: var(--primary); font-size: 1.2rem; flex-shrink: 0; }
.method-steps strong { font-size: 1.1rem; display: block; margin-bottom: 5px; color: white; }
.method-steps p { font-size: 0.95rem; color: var(--text-gray); margin: 0; }

.visual-card-glass { background: linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.01)); border: 1px solid var(--border-color); border-radius: 24px; height: 400px; position: relative; display: flex; align-items: center; justify-content: center; }
.chart-mockup { display: flex; align-items: flex-end; gap: 15px; height: 200px; }
.bar { width: 40px; background: var(--primary); border-radius: 8px 8px 0 0; animation: grow 2s ease-out forwards; }
.b1 { height: 30%; opacity: 0.3; } .b2 { height: 50%; opacity: 0.5; } .b3 { height: 75%; opacity: 0.8; } .b4 { height: 100%; box-shadow: 0 0 20px var(--primary); }
@keyframes grow { from { transform: scaleY(0); } to { transform: scaleY(1); } }
.float-badge { position: absolute; background: #fff; color: #000; padding: 8px 16px; border-radius: 12px; font-weight: 700; box-shadow: 0 10px 20px rgba(0,0,0,0.3); font-size: 0.9rem; }
.top-right { top: 40px; right: -20px; }

/* 5. BUILDER (CALCULADORA) */
.builder-wrapper { background: #08080a; }
.builder-main { display: grid; grid-template-columns: 1.5fr 1fr; gap: 40px; margin-top: 40px; align-items: start; }
@media(max-width: 900px) { .builder-main { grid-template-columns: 1fr; } }

.subjects-selection { display: flex; flex-direction: column; gap: 15px; }
.subject-row { display: flex; align-items: center; gap: 20px; background: var(--bg-card); padding: 20px; border-radius: 16px; border: 1px solid var(--border-color); cursor: pointer; transition: 0.2s; }
.subject-row:hover { border-color: rgba(255,255,255,0.2); background: var(--bg-card-hover); }
.subject-row.active { border-color: var(--primary); background: rgba(99, 102, 241, 0.05); }
.sr-icon { width: 45px; height: 45px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 1.4rem; color: #fff; }
.sr-info { flex: 1; }
.sr-info h4 { margin-bottom: 4px; font-size: 1.1rem; }
.sr-info span { font-size: 0.8rem; color: var(--text-gray); text-transform: uppercase; }
.sr-action { width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; }
.plus-btn { width: 100%; height: 100%; border-radius: 50%; border: 2px solid var(--border-color); color: var(--text-gray); display: flex; align-items: center; justify-content: center; font-size: 1.2rem; }
.chk-anim { color: var(--success); font-size: 1.2rem; }

.pricing-card-wrapper { position: sticky; top: 120px; }
.pricing-card { background: #18181b; border-radius: 20px; border: 1px solid var(--border-color); overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5); }
.pc-header { padding: 20px; border-bottom: 1px solid var(--border-color); background: #202025; text-align: center; }
.pc-body { padding: 25px; }
.pc-empty { text-align: center; color: var(--text-gray); padding: 30px 0; font-style: italic; }
.pc-list { list-style: none; padding: 0; margin-bottom: 20px; }
.pc-list li { border-bottom: 1px solid rgba(255,255,255,0.05); padding: 8px 0; font-size: 0.95rem; color: #e4e4e7; }
.pc-totals { margin-top: 20px; }
.pc-saving { background: rgba(16, 185, 129, 0.1); color: var(--success); text-align: center; padding: 8px; border-radius: 8px; font-size: 0.85rem; margin-bottom: 15px; }
.total-row { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 5px; }
.final-price { font-size: 2rem; color: white; line-height: 1; }
.sub-row { display: flex; justify-content: space-between; font-size: 0.85rem; color: var(--text-gray); margin-bottom: 25px; }
.btn-add-plan { width: 100%; background: white; color: black; font-weight: 800; padding: 18px; border-radius: 12px; font-size: 1rem; transition: 0.2s; }
.btn-add-plan:hover:not(:disabled) { transform: scale(1.02); background: #e0e7ff; }
.btn-add-plan:disabled { opacity: 0.5; cursor: not-allowed; }
.pc-note { font-size: 0.75rem; text-align: center; color: var(--text-gray); margin-top: 15px; display: flex; align-items: center; justify-content: center; gap: 5px; }

/* 6. COMBOS */
.combos-section-dark { background: #020204; }
.combos-flex { display: flex; gap: 30px; overflow-x: auto; padding-bottom: 20px; justify-content: center; flex-wrap: wrap; margin-top: 40px; }
.combo-box { flex: 0 0 300px; background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 20px; padding: 30px; position: relative; transition: 0.3s; display: flex; flex-direction: column; }
.combo-box:hover { border-color: var(--primary); transform: translateY(-10px); }
.combo-box.humanista { border-top: 4px solid #f59e0b; }
.combo-box.salud { border-top: 4px solid #14b8a6; }
.combo-box.ingenieria { border-top: 4px solid #6366f1; }
.ribbon { position: absolute; top: -10px; left: 50%; transform: translateX(-50%); background: #f43f5e; color: white; font-size: 0.7rem; font-weight: 700; padding: 4px 12px; border-radius: 20px; text-transform: uppercase; }
.cb-head { text-align: center; margin-bottom: 20px; }
.cb-price { text-align: center; font-size: 2rem; font-weight: 800; margin-bottom: 20px; color: white; }
.cb-price small { font-size: 1rem; color: var(--text-gray); font-weight: 400; }
.cb-feats { margin-bottom: 30px; flex: 1; }
.feat-row { display: flex; gap: 10px; font-size: 0.9rem; color: #d4d4d8; margin-bottom: 8px; }
.feat-row svg { color: var(--success); flex-shrink: 0; margin-top: 3px; }
.btn-combo-add { width: 100%; background: transparent; border: 1px solid rgba(255,255,255,0.2); padding: 12px; color: white; border-radius: 10px; font-weight: 600; }
.btn-combo-add:hover { background: white; color: black; }

/* 7. SYLLABUS */
.syllabus-section { background: #0c0c0e; }
.tabs-header { display: flex; gap: 10px; margin-bottom: 25px; border-bottom: 1px solid var(--border-color); padding-bottom: 10px; }
.tab-btn { background: transparent; color: var(--text-gray); padding: 10px 20px; font-weight: 600; font-size: 1rem; display: flex; align-items: center; gap: 8px; border-radius: 8px; }
.tab-btn.active { background: rgba(255,255,255,0.1); color: white; }
.syllabus-list { list-style: none; padding: 0; }
.syllabus-list li { margin-bottom: 15px; display: flex; gap: 12px; color: #e4e4e7; font-size: 1.05rem; }
.s-icon { color: var(--primary); margin-top: 4px; }
.syllabus-note { margin-top: 20px; font-size: 0.9rem; color: var(--accent); display: flex; gap: 8px; align-items: center; }

.platform-mockup { background: #1e1e24; border-radius: 16px; padding: 10px; box-shadow: 0 20px 60px rgba(0,0,0,0.6); transform: perspective(1000px) rotateY(-5deg); transition: 0.5s; }
.platform-mockup:hover { transform: perspective(1000px) rotateY(0deg); }
.pm-screen { height: 250px; background: #2d2d35; border-radius: 8px; position: relative; display: flex; align-items: center; justify-content: center; margin-bottom: 15px; }
.pm-video-overlay { font-size: 4rem; color: white; opacity: 0.8; }
.pm-label { position: absolute; top: 10px; left: 10px; background: #f43f5e; color: white; font-size: 0.7rem; padding: 4px 8px; border-radius: 4px; text-transform: uppercase; font-weight: 700; }
.pm-tools { display: flex; justify-content: space-between; padding: 0 10px; }
.pm-tools span { font-size: 0.85rem; color: var(--text-gray); display: flex; gap: 6px; align-items: center; }

/* 8. COMPARISON TABLE */
.table-responsive { overflow-x: auto; margin-top: 40px; }
.comp-table { width: 100%; border-collapse: collapse; min-width: 600px; }
.comp-table th { text-align: left; padding: 20px; border-bottom: 1px solid var(--border-color); color: var(--text-gray); font-size: 0.9rem; text-transform: uppercase; }
.comp-table th.th-lael { color: var(--primary); font-size: 1.1rem; font-weight: 800; }
.comp-table td { padding: 20px; border-bottom: 1px solid rgba(255,255,255,0.03); color: white; }
.td-feat { font-weight: 600; }
.td-lael { background: rgba(99, 102, 241, 0.03); font-weight: 700; color: #fff; }
.chk-yes { color: var(--success); }
.chk-no { color: #ef4444; opacity: 0.5; }

/* 9. TEAM */
.team-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 30px; margin-top: 40px; }
.teacher-card { background: var(--bg-card); border: 1px solid var(--border-color); padding: 30px; border-radius: 20px; text-align: center; transition: 0.3s; }
.teacher-card:hover { border-color: var(--primary); }
.t-avatar { font-size: 4rem; margin-bottom: 15px; background: rgba(255,255,255,0.05); width: 100px; height: 100px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; }
.t-info h4 { font-size: 1.2rem; margin-bottom: 5px; }
.t-area { color: var(--primary); font-weight: 700; font-size: 0.85rem; display: block; margin-bottom: 15px; text-transform: uppercase; }
.t-uni { font-size: 0.9rem; color: var(--text-gray); display: flex; align-items: center; justify-content: center; gap: 6px; margin: 4px 0; }

/* 10. REVIEWS */
.reviews-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; margin-top: 40px; }
.review-card { background: #1c1c21; padding: 30px; border-radius: 16px; }
.r-stars { color: #fbbf24; margin-bottom: 15px; letter-spacing: 2px; }
.r-text { font-style: italic; color: #e4e4e7; line-height: 1.6; margin-bottom: 20px; }
.r-author { display: flex; gap: 12px; align-items: center; }
.r-av { width: 40px; height: 40px; background: var(--primary); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; color: white; }
.r-author strong { display: block; font-size: 0.95rem; }
.r-author span { font-size: 0.8rem; color: var(--text-gray); }

/* 11. FAQ */
.faq-grid { margin-top: 40px; display: grid; gap: 15px; }
.faq-box { background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 12px; overflow: hidden; }
.faq-box summary { padding: 20px; font-weight: 600; cursor: pointer; list-style: none; position: relative; }
.faq-box[open] summary { background: rgba(255,255,255,0.02); color: var(--primary); }
.faq-box p { padding: 20px; line-height: 1.6; color: var(--text-gray); margin: 0; }

/* 12. FINAL CTA */
.final-cta-section { padding: 120px 0 100px; text-align: center; background: linear-gradient(0deg, #1e1b4b 0%, var(--bg-main) 100%); }
.f-cta-content h2 { font-size: 3rem; margin-bottom: 20px; }
.f-cta-content p { font-size: 1.2rem; color: #c7d2fe; margin-bottom: 40px; max-width: 600px; margin-left: auto; margin-right: auto; }
.f-btns { display: flex; gap: 20px; justify-content: center; flex-wrap: wrap; }
.btn-big-pulse { background: white; color: black; font-size: 1.2rem; font-weight: 800; padding: 20px 50px; border-radius: 50px; animation: pulse-btn 2s infinite; }
@keyframes pulse-btn { 0% { box-shadow: 0 0 0 0 rgba(255,255,255, 0.4); } 70% { box-shadow: 0 0 0 20px rgba(255,255,255, 0); } 100% { box-shadow: 0 0 0 0 rgba(255,255,255, 0); } }
.btn-wsp-outline { border: 2px solid #25D366; color: #25D366; padding: 18px 40px; border-radius: 50px; font-weight: 700; text-decoration: none; display: flex; align-items: center; gap: 10px; font-size: 1.1rem; }
.btn-wsp-outline:hover { background: #25D366; color: black; }
.legal-disclaimer { margin-top: 50px; font-size: 0.8rem; color: rgba(255,255,255,0.3); }

/* STICKY BOTTOM BAR */
.sticky-bottom-bar { position: fixed; bottom: -100px; left: 0; width: 100%; background: rgba(23, 23, 23, 0.95); backdrop-filter: blur(10px); border-top: 1px solid var(--border-color); z-index: 100; transition: bottom 0.4s cubic-bezier(0.16, 1, 0.3, 1); padding: 15px 0; }
.sticky-bottom-bar.visible { bottom: 0; }
.sbb-flex { display: flex; justify-content: space-between; align-items: center; }
.sbb-info { display: flex; gap: 10px; align-items: center; }
.sbb-info span { color: var(--text-gray); }
.sbb-info strong { color: white; }
.sbb-actions { display: flex; gap: 20px; align-items: center; }
.sbb-price { font-size: 1.5rem; font-weight: 700; color: white; }
.sbb-price small { font-size: 0.9rem; font-weight: 400; color: var(--text-gray); margin-left: 4px; }
.btn-sbb { background: var(--primary); color: white; padding: 10px 24px; border-radius: 8px; font-weight: 700; }
.btn-sbb:disabled { background: #4b5563; opacity: 0.6; }

@media(max-width: 600px) {
  .hero-title { font-size: 2.5rem; }
  .sbb-info { display: none; } /* Ocultar info en móvil para ahorrar espacio */
  .sbb-flex { justify-content: space-between; width: 100%; }
  .btn-big-pulse { width: 100%; }
}
`;