import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext.jsx";

// --- ICONOS (Colección Masiva) ---
import { 
  FaSignLanguage, FaHandsHelping, FaUniversalAccess, FaUserGraduate, 
  FaChurch, FaVideo, FaWhatsapp, FaCheck, FaStar, FaAward, FaBuilding,
  FaUsers, FaLaptopHouse, FaRegLightbulb, FaBookReader, FaInfoCircle
} from "react-icons/fa";
import { 
  MdOutlineHearingDisabled, MdRecordVoiceOver, MdOutlinePsychology, 
  MdSchool, MdWorkspacePremium, MdGTranslate 
} from "react-icons/md";
import { BiWorld, BiBody, BiHappyBeaming } from "react-icons/bi";
import { IoIosInfinite, IoMdCheckmarkCircleOutline } from "react-icons/io";

// --- IMPORTAMOS TU DATA EXACTA ---
import { 
  LSCH_MODULES, 
  LSCH_GROUP_PLANS, 
  LSCH_ONE2ONE_PLANS, 
  LSCH_WHY_US,
  ENROLLMENT_FEE, 
  CHURCH_PRICE,
  calculateLschPrice,
  clp 
} from "../data/lsch.js";

/* ──────────────────────────────────────────────────────────────────────────
   CONTENIDO ESTÁTICO EXTRA (Para enriquecer la UI)
   ────────────────────────────────────────────────────────────────────────── */
const TEACHER_PROFILE = {
  name: "Fernanda",
  role: "Educadora de Párvulos & Instructora Sorda",
  img: "👩🏻‍🏫", // Aquí iría la foto real
  bio: "Fernanda no solo es hablante nativa de LSCh, es una pedagoga profesional titulada. Esta combinación es única: posee la paciencia y didáctica de una educadora de párvulos, sumado a la autoridad cultural de una persona Sorda. Ella no te enseñará 'español señado', te enseñará a pensar visualmente.",
  badges: ["Nativa LSCh", "Pedagogía Profesional", "Cultura Sorda", "Experta en Inclusión"]
};

const COMPARISON = [
  { feature: "Profesor", us: "Sordo Nativo + Pedagogo", others: "Oyente (o Sordo sin título)" },
  { feature: "Metodología", us: "Inmersión Visual (Sin Voz)", others: "Bimodal (Hablan y señan)" },
  { feature: "Enfoque", us: "Gramática & Cultura", others: "Vocabulario Suelto" },
  { feature: "Certificación", us: "Por Competencias (Ley 21.015)", others: "Solo asistencia" }
];

export default function Lsch() {
  const { addToCart, openCart } = useCart();

  // --- ESTADOS ---
  const [activeModule, setActiveModule] = useState(0); // Para el syllabus
  const [planType, setPlanType] = useState("group"); // 'group' | 'one2one'
  const [isChurch, setIsChurch] = useState(false); // Modo Iglesia
  const [showSticky, setShowSticky] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

  // --- SCROLL LISTENER ---
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 900) setShowSticky(true);
      else setShowSticky(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // --- MANEJO DE CARRITO ---
  const handleEnroll = (planId) => {
    const calc = calculateLschPrice(planId, isChurch);
    
    // Generar un ID único para el carrito
    const cartId = `lsch-${planId}-${isChurch ? 'church' : 'std'}`;
    
    addToCart({
      id: cartId,
      title: isChurch ? `LSCh Social: ${calc.label}` : `LSCh: ${calc.label}`,
      price: calc.price,
      detail: isChurch ? 'Convenio Iglesia/Social' : (planId.includes('quarter') ? 'Plan Trimestral' : 'Plan Mensual'),
      type: 'course',
      extraInfo: calc.enrollment > 0 ? `+ Matrícula ${clp(calc.enrollment)}` : 'Matrícula Gratis'
    });
    openCart();
  };

  const scrollToPricing = () => {
    document.getElementById("pricing-anchor").scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="lsch-mega-page">
      <style>{css}</style>

      {/* ──────────────── 1. HERO SECTION CINEMÁTICO ──────────────── */}
      <header className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content container">
          <div className="hero-badge">
            <FaUniversalAccess className="pulse-icon"/> Admisión Abierta 2026
          </div>
          <h1 className="hero-title">
            Rompe la barrera del <span className="highlight-cyan">Sonido</span>.
          </h1>
          <p className="hero-subtitle">
            Aprende <strong>Lengua de Señas Chilena (LSCh)</strong> con Fernanda, nuestra educadora nativa. 
            Deja de usar "gestos" y empieza a comunicarte con gramática, cultura y respeto real.
          </p>

          <div className="hero-buttons">
            <button onClick={scrollToPricing} className="btn-hero primary">
              <FaSignLanguage /> Ver Planes y Horarios
            </button>
            <button className="btn-hero secondary">
              <FaVideo /> Ver Clase de Muestra
            </button>
          </div>

          <div className="hero-trust">
            <div className="trust-item">
              <strong>+500</strong> Alumnos Certificados
            </div>
            <div className="sep"></div>
            <div className="trust-item">
              <strong>Ley 21.015</strong> Cumplimiento Inclusión
            </div>
          </div>
        </div>
      </header>

      {/* ──────────────── 2. INTRODUCCIÓN EMOTIVA (IMPACTO) ──────────────── */}
      <section className="impact-section">
        <div className="container impact-grid">
           <div className="impact-text">
             <h2>No es mímica.<br/>Es un idioma completo.</h2>
             <p>
               Mucha gente cree que la lengua de señas es universal o que basta con mover las manos. 
               La realidad es que la LSCh tiene su propia sintaxis, gramática espacial y cultura.
             </p>
             <p>
               En el <strong>Instituto Lael</strong>, no solo aprendes vocabulario; aprendes a 
               <strong>pensar visualmente</strong>.
             </p>
             <ul className="check-list">
                <li><FaCheck/> Abandona el "español señado" (mal visto).</li>
                <li><FaCheck/> Domina la expresión facial (parte de la gramática).</li>
                <li><FaCheck/> Entiende la cultura sorda desde adentro.</li>
             </ul>
           </div>
           <div className="impact-visual">
             <div className="card-floating">
                <MdOutlineHearingDisabled className="cf-icon"/>
                <strong>Cultura Sorda</strong>
                <span>Respeto e Identidad</span>
             </div>
             <div className="card-floating delay">
                <FaHandsHelping className="cf-icon"/>
                <strong>Inclusión Real</strong>
                <span>Conexión Humana</span>
             </div>
           </div>
        </div>
      </section>

      {/* ──────────────── 3. LA PROFESORA (AUTORIDAD) ──────────────── */}
      <section className="teacher-section">
        <div className="container">
          <div className="teacher-wrapper">
             <div className="t-image-col">
                <div className="t-avatar-box">
                   <span className="t-emoji">{TEACHER_PROFILE.img}</span>
                   <div className="t-badge-float">
                      <FaAward/> Educadora Titulada
                   </div>
                </div>
             </div>
             <div className="t-content-col">
                <div className="t-label">TU INSTRUCTORA</div>
                <h2>Conoce a Fernanda</h2>
                <div className="t-roles">
                   {TEACHER_PROFILE.badges.map((b, i) => (
                      <span key={i} className="role-pill">{b}</span>
                   ))}
                </div>
                <p className="t-bio">{TEACHER_PROFILE.bio}</p>
                
                <div className="t-stats">
                   <div className="stat">
                      <strong>100%</strong>
                      <span>Nativa</span>
                   </div>
                   <div className="stat">
                      <strong>5+</strong>
                      <span>Años Enseñando</span>
                   </div>
                   <div className="stat">
                      <strong>Pedagogía</strong>
                      <span>Método Didáctico</span>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* ──────────────── 4. SYLLABUS INTERACTIVO (TUS MÓDULOS) ──────────────── */}
      <section className="syllabus-section">
        <div className="container">
          <div className="section-header center">
             <h2>Malla Curricular</h2>
             <p>Un viaje estructurado desde lo básico hasta la fluidez profesional.</p>
          </div>

          <div className="syllabus-container">
            {/* Navegación de Módulos */}
            <div className="syllabus-tabs">
              {LSCH_MODULES.map((mod, idx) => (
                <button 
                  key={mod.id}
                  className={`tab-btn ${activeModule === idx ? 'active' : ''}`}
                  onClick={() => setActiveModule(idx)}
                  style={{'--accent': mod.color}}
                >
                  <span className="tab-icon">{mod.icon}</span>
                  <div className="tab-info">
                     <span className="tab-tag">{mod.tag}</span>
                     <strong className="tab-name">{mod.name}</strong>
                  </div>
                </button>
              ))}
            </div>

            {/* Contenido del Módulo */}
            <div className="syllabus-content">
               <div className="sc-header" style={{background: LSCH_MODULES[activeModule].color}}>
                  <div className="sc-title">
                     <h3>{LSCH_MODULES[activeModule].name}</h3>
                     <span className="sc-dur"><FaRegLightbulb/> Duración: {LSCH_MODULES[activeModule].duration}</span>
                  </div>
                  <p className="sc-desc">{LSCH_MODULES[activeModule].desc}</p>
               </div>
               
               <div className="sc-body">
                  <h4><BiBody/> Resultados de Aprendizaje:</h4>
                  <div className="outcomes-grid">
                     {LSCH_MODULES[activeModule].outcomes.map((outcome, i) => (
                        <div key={i} className="outcome-card">
                           <IoMdCheckmarkCircleOutline className="oc-icon" style={{color: LSCH_MODULES[activeModule].color}}/>
                           <p>{outcome}</p>
                        </div>
                     ))}
                  </div>
                  <div className="sc-note">
                     <FaInfoCircle/> Certificación disponible al completar este nivel.
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────── 5. COMPARATIVA DE MERCADO ──────────────── */}
      <section className="comparison-section">
        <div className="container">
           <h2>¿Por qué Lael es diferente?</h2>
           <div className="table-responsive">
             <table className="comp-table">
               <thead>
                 <tr>
                   <th>Característica</th>
                   <th className="th-highlight">Instituto Lael</th>
                   <th>Otros Cursos / Talleres</th>
                 </tr>
               </thead>
               <tbody>
                 {COMPARISON.map((row, i) => (
                   <tr key={i}>
                     <td className="td-feat">{row.feature}</td>
                     <td className="td-highlight"><FaCheck className="chk"/> {row.us}</td>
                     <td className="td-dim">{row.others}</td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
        </div>
      </section>

      {/* ──────────────── 6. PRECIOS Y PLANES (LÓGICA COMPLEJA) ──────────────── */}
      <section id="pricing-anchor" className="pricing-section">
        <div className="container">
           <div className="pricing-header">
              <h2>Elige tu modalidad</h2>
              <p>Clases en vivo, acceso a grabaciones y material digital incluido.</p>
           </div>

           {/* CONTROLES DE FILTRO */}
           <div className="pricing-controls">
              {/* Toggle Grupo / Individual */}
              <div className="toggle-group">
                 <button 
                    className={`tg-btn ${planType === 'group' ? 'active' : ''}`}
                    onClick={() => { setPlanType('group'); setIsChurch(false); }}
                 >
                    <FaUsers/> Clases Grupales
                 </button>
                 <button 
                    className={`tg-btn ${planType === 'one2one' ? 'active' : ''}`}
                    onClick={() => { setPlanType('one2one'); setIsChurch(false); }}
                 >
                    <FaUserGraduate/> Personalizado (1 a 1)
                 </button>
              </div>

              {/* Toggle Iglesia (Solo visible en Grupales) */}
              {planType === 'group' && (
                 <div className="church-toggle" onClick={() => setIsChurch(!isChurch)}>
                    <div className={`chk-box ${isChurch ? 'checked' : ''}`}>
                       {isChurch && <FaCheck/>}
                    </div>
                    <span>Soy de una <strong>Iglesia / Fundación</strong> <small>(Tarifa Social)</small></span>
                 </div>
              )}
           </div>

           {/* GRID DE TARJETAS DE PRECIO */}
           <div className="plans-grid">
              {/* LÓGICA: Si es iglesia, mostramos una tarjeta especial única */}
              {isChurch ? (
                 <div className="plan-card special-church">
                    <div className="pc-head">
                       <FaChurch className="pc-icon"/>
                       <h3>Convenio Social</h3>
                       <p>Para iglesias, fundaciones y ONGs.</p>
                    </div>
                    <div className="pc-price">
                       <span className="currency">$</span>
                       <span className="amount">{clp(CHURCH_PRICE).replace('$','')}</span>
                       <span className="period">/mes</span>
                    </div>
                    <ul className="pc-feat">
                       <li><FaCheck/> Matrícula Exonerada ($0)</li>
                       <li><FaCheck/> Acceso completo a cursos grupales</li>
                       <li><FaCheck/> Certificado de participación</li>
                       <li><FaCheck/> Enfoque en Ministerio de Sordos</li>
                    </ul>
                    <button onClick={() => handleEnroll('church-promo')} className="btn-plan church">
                       Solicitar Cupo Social
                    </button>
                 </div>
              ) : (
                 // Si NO es iglesia, mostramos los planes según planType
                 <>
                   {(planType === 'group' ? LSCH_GROUP_PLANS : LSCH_ONE2ONE_PLANS).map((plan) => (
                      <div key={plan.id} className={`plan-card ${plan.highlight ? 'highlight' : ''}`}>
                         {plan.highlight && <div className="ribbon">Recomendado</div>}
                         
                         <div className="pc-head">
                            <h3>{plan.title}</h3>
                            <p>{plan.desc}</p>
                         </div>
                         
                         <div className="pc-price">
                            <span className="currency">$</span>
                            <span className="amount">{clp(plan.price).replace('$','')}</span>
                            <span className="period">{planType === 'group' ? (plan.id === 'g-quarter' ? '/mes' : '/mes') : '/pack'}</span>
                         </div>
                         
                         {/* Info extra de pago para trimestral */}
                         {plan.totalPayment && (
                            <div className="pc-subprice">Pago único de {clp(plan.totalPayment)}</div>
                         )}

                         <ul className="pc-feat">
                            {plan.features.map((f, i) => (
                               <li key={i}><FaCheck/> {f}</li>
                            ))}
                         </ul>

                         {/* Info Matrícula */}
                         {planType === 'group' && !plan.enrollmentWaived && (
                            <div className="enrollment-alert">
                               + {clp(ENROLLMENT_FEE)} Matrícula Anual
                            </div>
                         )}
                         {plan.enrollmentWaived && (
                            <div className="enrollment-success">
                               ¡Matrícula GRATIS! (Ahorras {clp(ENROLLMENT_FEE)})
                            </div>
                         )}

                         <button onClick={() => handleEnroll(plan.id)} className={`btn-plan ${plan.highlight ? 'primary' : 'outline'}`}>
                            {planType === 'group' ? 'Inscribirme' : 'Comprar Pack'}
                         </button>
                      </div>
                   ))}
                 </>
              )}
           </div>

           <p className="pricing-disclaimer">
             * Todos los planes incluyen acceso al Campus Virtual, material PDF y grabaciones.
           </p>
        </div>
      </section>

      {/* ──────────────── 7. VALORES CORPORATIVOS (TU DATA) ──────────────── */}
      <section className="values-section">
        <div className="container">
           <h2>Compromiso Lael</h2>
           <div className="values-grid">
              {LSCH_WHY_US.map((val, i) => (
                 <div key={i} className="value-card">
                    <div className="vc-icon">
                       {i === 0 ? <BiWorld/> : i === 1 ? <FaBuilding/> : <FaAward/>}
                    </div>
                    <h3>{val.title}</h3>
                    <p>{val.desc}</p>
                 </div>
              ))}
           </div>
        </div>
      </section>

      {/* ──────────────── 8. STICKY MOBILE BAR ──────────────── */}
      <div className={`sticky-bar ${showSticky ? 'visible' : ''}`}>
         <div className="container sb-flex">
            <div className="sb-info">
               <strong>LSCh con Fernanda</strong>
               <span>{isChurch ? 'Tarifa Social Activa' : 'Matrículas 2026'}</span>
            </div>
            <button onClick={scrollToPricing} className="btn-sticky">
               Ver Precios
            </button>
         </div>
      </div>

    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   ESTILOS CSS "MONSTER" (Moderno, Turquesa/Cyan, Dark Mode)
   ────────────────────────────────────────────────────────────────────────── */
const css = `
:root {
  --bg-deep: #080a0f;
  --bg-card: #111827;
  --bg-hover: #1f2937;
  --cyan-main: #06b6d4;
  --cyan-glow: #22d3ee;
  --cyan-dark: #0e7490;
  --text-white: #f8fafc;
  --text-gray: #94a3b8;
  --border: rgba(255,255,255,0.08);
  --success: #10b981;
}

.lsch-mega-page { background: var(--bg-deep); color: var(--text-white); font-family: 'Inter', sans-serif; overflow-x: hidden; padding-bottom: 80px; }
.container { max-width: 1140px; margin: 0 auto; padding: 0 20px; }
h1, h2, h3, h4 { font-weight: 800; margin: 0; line-height: 1.2; }
button { cursor: pointer; border: none; font-family: inherit; transition: 0.2s; }

/* 1. HERO */
.hero-section { position: relative; min-height: 90vh; display: flex; align-items: center; justify-content: center; text-align: center; background: radial-gradient(circle at 50% 30%, #164e63 0%, var(--bg-deep) 60%); padding-top: 80px; overflow: hidden; }
.hero-overlay { position: absolute; inset: 0; background: url('https://www.transparenttextures.com/patterns/cubes.png'); opacity: 0.05; }
.hero-content { position: relative; z-index: 2; max-width: 800px; }
.hero-badge { display: inline-flex; align-items: center; gap: 8px; background: rgba(6, 182, 212, 0.1); border: 1px solid var(--cyan-dark); color: var(--cyan-glow); padding: 6px 16px; border-radius: 50px; font-size: 0.9rem; margin-bottom: 25px; font-weight: 600; }
.pulse-icon { animation: pulse 2s infinite; }
@keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.5; } 100% { opacity: 1; } }

.hero-title { font-size: clamp(3rem, 6vw, 5.5rem); letter-spacing: -2px; margin-bottom: 20px; }
.highlight-cyan { color: transparent; -webkit-text-stroke: 1px var(--cyan-glow); position: relative; }
.highlight-cyan::before { content: 'Sonido'; position: absolute; left: 0; color: var(--cyan-glow); filter: blur(15px); opacity: 0.5; }

.hero-subtitle { font-size: 1.25rem; color: var(--text-gray); line-height: 1.6; max-width: 650px; margin: 0 auto 40px; }
.hero-buttons { display: flex; gap: 20px; justify-content: center; flex-wrap: wrap; margin-bottom: 60px; }
.btn-hero { padding: 16px 32px; border-radius: 50px; font-weight: 700; font-size: 1.1rem; display: flex; align-items: center; gap: 10px; }
.btn-hero.primary { background: var(--cyan-main); color: #000; box-shadow: 0 0 30px rgba(6, 182, 212, 0.3); }
.btn-hero.primary:hover { background: var(--cyan-glow); transform: translateY(-3px); }
.btn-hero.secondary { background: rgba(255,255,255,0.05); color: white; border: 1px solid var(--border); backdrop-filter: blur(10px); }
.btn-hero.secondary:hover { background: rgba(255,255,255,0.1); }

.hero-trust { display: flex; align-items: center; justify-content: center; gap: 30px; font-size: 0.9rem; color: var(--text-gray); text-transform: uppercase; letter-spacing: 1px; }
.trust-item strong { display: block; font-size: 1.4rem; color: white; margin-bottom: 4px; }
.sep { width: 1px; height: 40px; background: var(--border); }

/* 2. IMPACT */
.impact-section { padding: 100px 0; background: #0b111a; }
.impact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; }
@media(max-width: 900px) { .impact-grid { grid-template-columns: 1fr; } }

.impact-text h2 { font-size: 2.8rem; margin-bottom: 25px; color: var(--cyan-glow); }
.impact-text p { font-size: 1.1rem; color: var(--text-gray); margin-bottom: 20px; line-height: 1.6; }
.check-list { list-style: none; padding: 0; margin-top: 30px; }
.check-list li { display: flex; gap: 12px; margin-bottom: 15px; font-size: 1.05rem; align-items: center; }
.check-list svg { color: var(--cyan-main); }

.impact-visual { position: relative; height: 400px; display: flex; align-items: center; justify-content: center; }
.card-floating { position: absolute; background: var(--bg-card); border: 1px solid var(--border); padding: 25px; border-radius: 20px; width: 220px; display: flex; flex-direction: column; align-items: center; text-align: center; box-shadow: 0 20px 50px rgba(0,0,0,0.4); animation: float 6s ease-in-out infinite; }
.card-floating.delay { animation-delay: 3s; top: 200px; left: 50%; }
.card-floating:first-child { top: 50px; right: 50%; }
.cf-icon { font-size: 2.5rem; color: var(--cyan-main); margin-bottom: 10px; }
.card-floating strong { display: block; margin-bottom: 5px; font-size: 1.1rem; }
.card-floating span { font-size: 0.85rem; color: var(--text-gray); }
@keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }

/* 3. TEACHER */
.teacher-section { padding: 80px 0; background: linear-gradient(90deg, #0f172a 0%, #16243a 100%); }
.teacher-wrapper { display: flex; gap: 50px; align-items: center; }
@media(max-width: 800px) { .teacher-wrapper { flex-direction: column; } }

.t-image-col { flex: 1; display: flex; justify-content: center; }
.t-avatar-box { width: 300px; height: 300px; background: var(--cyan-dark); border-radius: 30px; position: relative; display: flex; align-items: center; justify-content: center; transform: rotate(-3deg); }
.t-emoji { font-size: 8rem; }
.t-badge-float { position: absolute; bottom: -20px; right: -20px; background: white; color: black; padding: 10px 20px; border-radius: 50px; font-weight: 700; box-shadow: 0 10px 30px rgba(0,0,0,0.3); display: flex; align-items: center; gap: 8px; transform: rotate(3deg); }

.t-content-col { flex: 1.5; }
.t-label { color: var(--cyan-main); font-weight: 700; letter-spacing: 2px; font-size: 0.9rem; margin-bottom: 10px; display: block; }
.t-content-col h2 { font-size: 3rem; margin-bottom: 20px; }
.t-roles { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 25px; }
.role-pill { background: rgba(255,255,255,0.05); border: 1px solid var(--border); padding: 5px 12px; border-radius: 6px; font-size: 0.8rem; color: #cbd5e1; }
.t-bio { font-size: 1.1rem; color: var(--text-gray); line-height: 1.7; margin-bottom: 30px; border-left: 3px solid var(--cyan-main); padding-left: 20px; }
.t-stats { display: flex; gap: 40px; }
.stat strong { display: block; font-size: 1.5rem; color: white; }
.stat span { font-size: 0.85rem; color: var(--text-gray); }

/* 4. SYLLABUS */
.syllabus-section { padding: 80px 0; }
.center { text-align: center; margin-bottom: 50px; }
.syllabus-container { display: grid; grid-template-columns: 350px 1fr; gap: 40px; }
@media(max-width: 900px) { .syllabus-container { grid-template-columns: 1fr; } }

.syllabus-tabs { display: flex; flex-direction: column; gap: 15px; }
.tab-btn { background: var(--bg-card); border: 1px solid var(--border); padding: 20px; border-radius: 12px; display: flex; align-items: center; gap: 15px; color: var(--text-gray); text-align: left; position: relative; overflow: hidden; }
.tab-btn:hover { background: var(--bg-hover); }
.tab-btn.active { border-color: var(--accent); background: rgba(6, 182, 212, 0.05); color: white; box-shadow: inset 4px 0 0 var(--accent); }
.tab-icon { font-size: 1.5rem; }
.tab-info { display: flex; flex-direction: column; }
.tab-tag { font-size: 0.75rem; text-transform: uppercase; font-weight: 700; margin-bottom: 4px; color: var(--accent); }
.tab-name { font-size: 1rem; }

.syllabus-content { background: var(--bg-card); border-radius: 20px; overflow: hidden; border: 1px solid var(--border); display: flex; flex-direction: column; }
.sc-header { padding: 40px; color: #fff; }
.sc-title { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 15px; }
.sc-title h3 { font-size: 2rem; margin: 0; }
.sc-dur { background: rgba(0,0,0,0.2); padding: 5px 12px; border-radius: 50px; font-size: 0.85rem; display: flex; align-items: center; gap: 6px; }
.sc-desc { font-size: 1.1rem; opacity: 0.9; max-width: 90%; }

.sc-body { padding: 40px; flex: 1; }
.sc-body h4 { margin-bottom: 25px; display: flex; align-items: center; gap: 10px; font-size: 1.2rem; color: var(--cyan-glow); }
.outcomes-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
.outcome-card { display: flex; gap: 12px; background: rgba(255,255,255,0.03); padding: 15px; border-radius: 10px; border: 1px solid var(--border); }
.oc-icon { font-size: 1.4rem; flex-shrink: 0; }
.sc-note { margin-top: 30px; font-size: 0.9rem; color: var(--text-gray); display: flex; align-items: center; gap: 8px; border-top: 1px solid var(--border); padding-top: 20px; }

/* 5. COMPARISON TABLE */
.comparison-section { padding: 80px 0; background: #0c0f14; }
.table-responsive { overflow-x: auto; margin-top: 40px; }
.comp-table { width: 100%; min-width: 600px; border-collapse: collapse; }
.comp-table th { text-align: left; padding: 20px; border-bottom: 2px solid var(--border); color: var(--text-gray); font-size: 0.9rem; text-transform: uppercase; }
.th-highlight { color: var(--cyan-main) !important; font-size: 1.1rem !important; }
.comp-table td { padding: 25px 20px; border-bottom: 1px solid rgba(255,255,255,0.05); font-size: 1rem; }
.td-feat { font-weight: 600; color: white; }
.td-highlight { color: var(--cyan-glow); font-weight: 700; background: rgba(6, 182, 212, 0.03); }
.td-dim { color: var(--text-gray); opacity: 0.7; }
.chk { color: var(--success); }

/* 6. PRICING */
.pricing-section { padding: 100px 0; }
.pricing-header { text-align: center; max-width: 700px; margin: 0 auto 50px; }
.pricing-header h2 { font-size: 3rem; margin-bottom: 15px; }

.pricing-controls { display: flex; flex-direction: column; align-items: center; gap: 20px; margin-bottom: 50px; }
.toggle-group { background: var(--bg-card); padding: 5px; border-radius: 50px; display: inline-flex; border: 1px solid var(--border); }
.tg-btn { padding: 10px 24px; border-radius: 40px; background: transparent; color: var(--text-gray); font-weight: 600; display: flex; align-items: center; gap: 8px; }
.tg-btn.active { background: var(--cyan-main); color: black; box-shadow: 0 4px 15px rgba(6, 182, 212, 0.3); }

.church-toggle { display: flex; align-items: center; gap: 10px; cursor: pointer; background: rgba(255,255,255,0.03); padding: 10px 20px; border-radius: 8px; border: 1px solid var(--border); transition: 0.2s; }
.church-toggle:hover { background: rgba(255,255,255,0.05); border-color: var(--cyan-main); }
.chk-box { width: 20px; height: 20px; border: 2px solid var(--text-gray); border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 0.8rem; color: black; }
.chk-box.checked { background: var(--cyan-main); border-color: var(--cyan-main); }

.plans-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; max-width: 900px; margin: 0 auto; }
.plan-card { background: var(--bg-card); border: 1px solid var(--border); border-radius: 20px; padding: 40px; display: flex; flex-direction: column; position: relative; transition: 0.3s; }
.plan-card:hover { transform: translateY(-5px); border-color: var(--cyan-main); }
.plan-card.highlight { border: 2px solid var(--cyan-main); background: linear-gradient(180deg, rgba(6, 182, 212, 0.05) 0%, var(--bg-card) 100%); }
.ribbon { position: absolute; top: 0; right: 0; background: var(--cyan-main); color: black; font-weight: 800; font-size: 0.75rem; padding: 5px 15px; border-bottom-left-radius: 12px; }

.pc-head { text-align: center; margin-bottom: 25px; }
.pc-head h3 { font-size: 1.4rem; margin-bottom: 8px; }
.pc-head p { color: var(--text-gray); font-size: 0.9rem; }

.pc-price { display: flex; justify-content: center; align-items: flex-start; color: white; margin-bottom: 5px; }
.currency { font-size: 1.5rem; margin-top: 5px; }
.amount { font-size: 3.5rem; font-weight: 800; letter-spacing: -2px; }
.period { align-self: flex-end; margin-bottom: 10px; color: var(--text-gray); }

.pc-subprice { text-align: center; color: var(--success); font-weight: 600; font-size: 0.9rem; margin-bottom: 20px; }

.pc-feat { list-style: none; padding: 0; margin-bottom: 30px; }
.pc-feat li { display: flex; gap: 10px; margin-bottom: 12px; font-size: 0.95rem; color: #cbd5e1; }
.pc-feat li svg { color: var(--cyan-main); flex-shrink: 0; margin-top: 3px; }

.enrollment-alert { text-align: center; font-size: 0.85rem; color: var(--text-gray); margin-bottom: 20px; padding: 10px; background: rgba(255,255,255,0.03); border-radius: 8px; }
.enrollment-success { text-align: center; font-size: 0.85rem; color: var(--success); margin-bottom: 20px; padding: 10px; background: rgba(16, 185, 129, 0.1); border-radius: 8px; font-weight: 700; }

.btn-plan { width: 100%; padding: 16px; border-radius: 12px; font-weight: 700; font-size: 1rem; margin-top: auto; }
.btn-plan.primary { background: var(--cyan-main); color: black; }
.btn-plan.primary:hover { background: var(--cyan-glow); }
.btn-plan.outline { background: transparent; border: 2px solid var(--border); color: white; }
.btn-plan.outline:hover { border-color: var(--cyan-main); }
.btn-plan.church { background: #8b5cf6; color: white; }

/* Special Church Card */
.special-church { border-color: #8b5cf6; max-width: 400px; margin: 0 auto; box-shadow: 0 0 40px rgba(139, 92, 246, 0.2); }
.special-church .pc-icon { font-size: 3rem; color: #8b5cf6; margin-bottom: 15px; }
.pricing-disclaimer { text-align: center; margin-top: 40px; color: var(--text-gray); font-size: 0.9rem; font-style: italic; }

/* 7. VALUES */
.values-section { padding: 80px 0; background: #080a0f; border-top: 1px solid var(--border); }
.values-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px; margin-top: 40px; }
@media(max-width: 700px) { .values-grid { grid-template-columns: 1fr; } }
.value-card { text-align: center; padding: 30px; background: rgba(255,255,255,0.02); border-radius: 16px; border: 1px solid transparent; transition: 0.3s; }
.value-card:hover { border-color: var(--cyan-dark); background: rgba(255,255,255,0.04); }
.vc-icon { font-size: 2.5rem; color: var(--cyan-main); margin-bottom: 20px; }
.value-card h3 { margin-bottom: 10px; font-size: 1.2rem; }
.value-card p { color: var(--text-gray); font-size: 0.95rem; }

/* STICKY */
.sticky-bar { position: fixed; bottom: -100px; left: 0; width: 100%; background: rgba(17, 24, 39, 0.95); backdrop-filter: blur(12px); border-top: 1px solid var(--border); padding: 15px 0; z-index: 100; transition: 0.4s; }
.sticky-bar.visible { bottom: 0; }
.sb-flex { display: flex; justify-content: space-between; align-items: center; }
.sb-info { display: flex; flex-direction: column; }
.sb-info strong { color: var(--cyan-main); }
.sb-info span { font-size: 0.8rem; color: var(--text-gray); }
.btn-sticky { background: var(--cyan-main); color: black; padding: 10px 24px; border-radius: 8px; font-weight: 700; }
`;