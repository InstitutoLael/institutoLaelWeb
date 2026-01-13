import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext.jsx";

// --- ICONOGRAFÍA CLARA Y GRANDE (Accesibilidad) ---
import { 
  FaUserGraduate, FaHandsHelping, FaAward, FaChalkboardTeacher, 
  FaBookReader, FaWhatsapp, FaCheckCircle, FaBuilding, FaHandHoldingHeart,
  FaVolumeUp, FaEye
} from "react-icons/fa";
import { 
  MdSchool, MdTimer, MdFamilyRestroom, MdWork, 
  MdOutlineVerifiedUser, MdQuiz 
} from "react-icons/md";
import { BsFillLightningChargeFill, BsArrowRightCircleFill } from "react-icons/bs";
import { IoMdTime } from "react-icons/io";

// --- DATA IMPORTADA ---
import { 
  CAMINOS_CONTENT, 
  STUDY_CYCLES, 
  PLANS, 
  STEPS, 
  FAQS, 
  REQUIREMENTS,
  REGISTRATION_FEE,
  getNivelacionQuote,
  clp 
} from "../data/nivelacion.js";

/* ──────────────────────────────────────────────────────────────────────────
   COMPONENTES UI PARA BAJA LECTURA
   ────────────────────────────────────────────────────────────────────────── */
const AudioHelper = ({ label }) => (
  <button className="audio-helper-btn" title="Escuchar texto (Simulado)">
    <FaVolumeUp /> <span>Escuchar</span>
  </button>
);

export default function EscuelaAdultos() {
  const { addToCart, openCart } = useCart();
  
  // --- ESTADOS ---
  const [selectedCycle, setSelectedCycle] = useState(null); // Ciclo seleccionado
  const [showSticky, setShowSticky] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

  // --- SCROLL LISTENER ---
  useEffect(() => {
    const handleScroll = () => setShowSticky(window.scrollY > 800);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // --- MANEJADOR DE INSCRIPCIÓN ---
  const handleEnroll = (planId) => {
    const quote = getNivelacionQuote(planId);
    
    addToCart({
      id: `adultos-${planId}-${selectedCycle || 'general'}`,
      title: `Nivelación: ${quote.title}`,
      price: quote.monthlyPrice,
      detail: selectedCycle 
              ? `Ciclo: ${STUDY_CYCLES.find(c=>c.id === selectedCycle)?.name}` 
              : 'Ciclo por definir',
      type: 'course',
      extraInfo: `Matrícula única: ${clp(quote.registration)}`
    });
    openCart();
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if(el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="adultos-page">
      <style>{css}</style>

      {/* ──────────────── 1. BARRA DE ACCESIBILIDAD ──────────────── */}
      <div className="access-bar">
         <div className="container ab-content">
            <span><FaEye/> Vista simplificada activada</span>
            <span>Programa Caminos 2026</span>
         </div>
      </div>

      {/* ──────────────── 2. HERO (GRANDE Y CLARO) ──────────────── */}
      <header className="hero-adults">
        <div className="container hero-content">
           <div className="hero-badge">
              <BsFillLightningChargeFill /> Modalidad 2x1 (Dos años en uno)
           </div>
           
           <h1>Tu <span className="highlight-yellow">4to Medio</span> es posible.</h1>
           <p className="hero-lead">
             {CAMINOS_CONTENT.heroText}
           </p>

           <div className="hero-actions">
              <button onClick={() => scrollToSection('pasos')} className="btn-big primary">
                 <FaUserGraduate /> Quiero Terminar mis Estudios
              </button>
              <button onClick={() => scrollToSection('colaborar')} className="btn-big outline">
                 <FaHandHoldingHeart /> Quiero Ayudar a Alguien
              </button>
           </div>
           
           <div className="trust-pill">
              <MdOutlineVerifiedUser className="tp-icon"/>
              <span>Exámenes válidos ante Ministerio de Educación</span>
           </div>
        </div>
      </header>

      {/* ──────────────── 3. EMPATÍA (NO JUZGAMOS) ──────────────── */}
      <section className="empathy-section">
         <div className="container">
            <div className="empathy-card">
               <h2>Nunca es tarde.</h2>
               <p>
                  Sabemos que la vida pasó: trabajo, hijos, falta de dinero o problemas familiares. 
                  Aquí nadie te va a preguntar "¿por qué no terminaste antes?". 
                  Aquí solo te diremos: <strong>"¡Qué bueno que llegaste!"</strong>.
               </p>
               <AudioHelper />
            </div>
         </div>
      </section>

      {/* ──────────────── 4. CICLOS (SELECCIÓN VISUAL) ──────────────── */}
      <section id="ciclos" className="cycles-section">
         <div className="container">
            <div className="sec-head">
               <span className="step-num">1</span>
               <h3>¿Qué curso te falta?</h3>
               <p>Selecciona tu nivel para empezar.</p>
            </div>

            <div className="cycles-grid">
               {STUDY_CYCLES.map((cycle) => (
                  <div 
                    key={cycle.id} 
                    className={`cycle-card ${selectedCycle === cycle.id ? 'active' : ''}`}
                    onClick={() => setSelectedCycle(cycle.id)}
                  >
                     <div className="cc-icon">{cycle.icon}</div>
                     <h4>{cycle.name}</h4>
                     <div className="cc-badge">{cycle.equivalence}</div>
                     {selectedCycle === cycle.id && <FaCheckCircle className="cc-check"/>}
                  </div>
               ))}
            </div>
            
            {!selectedCycle && (
               <p className="hint-text">* Toca una tarjeta para seleccionarla</p>
            )}
         </div>
      </section>

      {/* ──────────────── 5. CÓMO FUNCIONA (PASOS SIMPLES) ──────────────── */}
      <section id="pasos" className="steps-section">
         <div className="container">
            <div className="sec-head">
               <span className="step-num">2</span>
               <h3>¿Cómo funciona?</h3>
               <p>Es más fácil de lo que piensas.</p>
            </div>

            <div className="steps-visual">
               {STEPS.map((step, i) => (
                  <div key={i} className="step-row">
                     <div className="sr-num">{i + 1}</div>
                     <div className="sr-content">
                        <strong>{step.title}</strong>
                        <p>{step.text}</p>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* ──────────────── 6. PRECIOS (ROBIN HOOD) ──────────────── */}
      <section className="pricing-section">
         <div className="container">
            <div className="sec-head">
               <span className="step-num">3</span>
               <h3>Elige tu Plan</h3>
               <p>Si puedes pagar, ayudas a otros. Si no puedes, te ayudamos a ti.</p>
            </div>

            <div className="plans-container">
               {/* --- PLAN GRATUITO (SOCIAL) --- */}
               <div className="plan-card social">
                  <div className="pc-tag">Para quien lo necesita</div>
                  <div className="pc-header">
                     <h3>Cupo Social</h3>
                     <div className="price-big">$0 <small>/mes</small></div>
                     <p>Beca 100% Gratuita</p>
                  </div>
                  <div className="pc-body">
                     <ul>
                        <li><FaCheckCircle/> Clases en Vivo</li>
                        <li><FaCheckCircle/> Material de Estudio</li>
                        <li><MdTimer/> <strong>Exige 80% Asistencia</strong></li>
                     </ul>
                     <p className="commitment-note">
                        "Me comprometo a asistir a clases para no perder el beneficio."
                     </p>
                     <button onClick={() => handleEnroll('social')} className="btn-plan social-btn">
                        Postular a Gratuidad
                     </button>
                  </div>
               </div>

               {/* --- PLAN ESTÁNDAR (PAGADO) --- */}
               <div className="plan-card standard">
                  <div className="pc-tag highlight">Más Popular</div>
                  <div className="pc-header">
                     <h3>Plan Estándar</h3>
                     <div className="price-big">{clp(12990)} <small>/mes</small></div>
                     <p>Precio Justo y Consciente</p>
                  </div>
                  <div className="pc-body">
                     <ul>
                        <li><FaCheckCircle/> Todo lo del plan Social</li>
                        <li><FaCheckCircle/> Sin mínimo de asistencia</li>
                        <li><FaCheckCircle/> Prioridad en corrección</li>
                        <li><FaHandsHelping/> Ayudas a financiar becas</li>
                     </ul>
                     <button onClick={() => handleEnroll('consciente')} className="btn-plan std-btn">
                        Pagar mi Curso
                     </button>
                  </div>
               </div>

               {/* --- PLAN PADRINO (HEROE) --- */}
               <div className="plan-card hero">
                  <div className="pc-tag gold">Héroe Lael</div>
                  <div className="pc-header">
                     <h3>Plan Padrino</h3>
                     <div className="price-big">{clp(25000)} <small>/mes</small></div>
                     <p>Pagas el tuyo + Becas a otro</p>
                  </div>
                  <div className="pc-body">
                     <ul>
                        <li><FaAward/> Certificado de Padrino</li>
                        <li><FaCheckCircle/> Clases Particulares</li>
                        <li><FaCheckCircle/> Reporte de tu impacto</li>
                        <li><FaCheckCircle/> <strong>Beca a un alumno vulnerable</strong></li>
                     </ul>
                     <button onClick={() => handleEnroll('padrino')} className="btn-plan gold-btn">
                        Ser Padrino
                     </button>
                  </div>
               </div>
            </div>
            
            <div className="fee-notice">
               * Todos los planes pagan matrícula única de {clp(REGISTRATION_FEE)} para reservar el cupo.
            </div>
         </div>
      </section>

      {/* ──────────────── 7. COLABORADORES Y EMPRESAS (NUEVO) ──────────────── */}
      <section id="colaborar" className="sponsors-section">
         <div className="container">
            <div className="sponsors-box">
               <div className="sb-left">
                  <FaBuilding className="sb-icon"/>
                  <h2>Empresas y Mecenas</h2>
                  <p>¿Quieres apadrinar a 10, 50 o 100 estudiantes? <br/>Transforma vidas a través de la RSE.</p>
               </div>
               <div className="sb-right">
                  <div className="impact-stat">
                     <strong>$250.000</strong>
                     <span>Apadrina un aula (10 alumnos)</span>
                  </div>
                  <button className="btn-sponsor">
                     Contactar Coordinación
                  </button>
               </div>
            </div>
            <p className="sponsor-quote">
               "{CAMINOS_CONTENT.impactQuote}"
            </p>
         </div>
      </section>

      {/* ──────────────── 8. REQUISITOS Y DUDAS ──────────────── */}
      <section className="faq-section">
         <div className="container">
            <h2>Preguntas Frecuentes</h2>
            
            <div className="requirements-box">
               <h3><MdQuiz/> ¿Qué papeles necesito?</h3>
               <ul>
                  {REQUIREMENTS.map((r, i) => (
                     <li key={i}><FaCheckCircle/> {r}</li>
                  ))}
               </ul>
            </div>

            <div className="accordion">
               {FAQS.map((faq, i) => (
                  <div key={i} className={`acc-item ${activeFaq === i ? 'open' : ''}`} onClick={() => setActiveFaq(activeFaq === i ? null : i)}>
                     <div className="acc-head">
                        <span>{faq.q}</span>
                        <BsArrowRightCircleFill className="acc-arrow"/>
                     </div>
                     <div className="acc-body">
                        <p>{faq.a}</p>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* ──────────────── STICKY BAR ──────────────── */}
      <div className={`sticky-bar ${showSticky ? 'visible' : ''}`}>
         <div className="container sb-content">
            <div className="sb-text">
               <strong>Nivelación de Estudios 2026</strong>
               <span>¡Últimos cupos disponibles!</span>
            </div>
            <button onClick={() => scrollToSection('ciclos')} className="btn-sticky">
               Inscribirme
            </button>
         </div>
      </div>

    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   ESTILOS CSS (Diseño Grande, Accesible y Digno)
   ────────────────────────────────────────────────────────────────────────── */
const css = `
:root {
  --blue-dark: #1e3a8a;
  --blue-light: #3b82f6;
  --yellow: #facc15;
  --white: #ffffff;
  --gray-bg: #f3f4f6;
  --text: #1f2937;
  --gold: #d97706;
  --stone: #57534e;
}

.adultos-page { font-family: 'Inter', sans-serif; background: var(--white); color: var(--text); padding-bottom: 80px; }
.container { max-width: 1000px; margin: 0 auto; padding: 0 20px; }
h1, h2, h3 { font-weight: 800; line-height: 1.2; margin: 0; }
button { cursor: pointer; transition: 0.2s; border: none; font-family: inherit; }

/* 0. ACCESS BAR */
.access-bar { background: #000; color: #fff; padding: 8px 0; font-size: 0.8rem; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; }
.ab-content { display: flex; justify-content: space-between; align-items: center; }

/* 1. HERO */
.hero-adults { background: linear-gradient(135deg, var(--blue-dark) 0%, #172554 100%); color: white; padding: 60px 0 80px; text-align: center; position: relative; overflow: hidden; }
.hero-adults::before { content: ''; position: absolute; inset: 0; background: url('https://www.transparenttextures.com/patterns/notebook.png'); opacity: 0.1; }
.hero-content { position: relative; z-index: 2; }

.hero-badge { display: inline-flex; align-items: center; gap: 8px; background: rgba(250, 204, 21, 0.2); color: var(--yellow); padding: 8px 16px; border-radius: 50px; font-weight: 700; margin-bottom: 20px; font-size: 0.9rem; border: 1px solid var(--yellow); }
.hero-adults h1 { font-size: clamp(2.5rem, 5vw, 4rem); margin-bottom: 20px; }
.highlight-yellow { color: var(--yellow); text-decoration: underline; text-decoration-thickness: 4px; }
.hero-lead { font-size: 1.2rem; color: #dbeafe; max-width: 700px; margin: 0 auto 40px; line-height: 1.5; }

.hero-actions { display: flex; flex-direction: column; align-items: center; gap: 15px; margin-bottom: 40px; }
@media(min-width: 600px) { .hero-actions { flex-direction: row; justify-content: center; } }

.btn-big { padding: 18px 30px; border-radius: 12px; font-size: 1.1rem; font-weight: 700; display: flex; align-items: center; gap: 10px; width: 100%; max-width: 300px; justify-content: center; }
.btn-big.primary { background: var(--yellow); color: #000; box-shadow: 0 4px 0 #ca8a04; transform: translateY(-4px); }
.btn-big.primary:active { transform: translateY(0); box-shadow: none; }
.btn-big.outline { background: transparent; border: 2px solid rgba(255,255,255,0.3); color: white; }
.btn-big.outline:hover { background: rgba(255,255,255,0.1); border-color: white; }

.trust-pill { display: inline-flex; align-items: center; gap: 10px; background: rgba(0,0,0,0.3); padding: 10px 20px; border-radius: 50px; font-size: 0.9rem; color: #93c5fd; }
.tp-icon { font-size: 1.2rem; color: var(--yellow); }

/* 2. EMPATHY */
.empathy-section { padding: 40px 0; margin-top: -40px; position: relative; z-index: 3; }
.empathy-card { background: white; padding: 40px; border-radius: 20px; box-shadow: 0 20px 40px rgba(0,0,0,0.1); text-align: center; border-bottom: 4px solid var(--blue-light); }
.empathy-card h2 { color: var(--blue-dark); font-size: 1.8rem; margin-bottom: 15px; }
.empathy-card p { font-size: 1.15rem; color: var(--text); line-height: 1.6; max-width: 700px; margin: 0 auto 20px; }

.audio-helper-btn { display: inline-flex; align-items: center; gap: 8px; background: #f3f4f6; padding: 8px 16px; border-radius: 50px; font-size: 0.9rem; font-weight: 600; color: #4b5563; }
.audio-helper-btn:hover { background: #e5e7eb; color: #000; }

/* HEADERS SECCIONES */
.sec-head { text-align: center; margin-bottom: 40px; }
.step-num { display: inline-block; width: 40px; height: 40px; background: var(--blue-dark); color: white; border-radius: 50%; line-height: 40px; font-weight: 800; font-size: 1.2rem; margin-bottom: 10px; }
.sec-head h3 { font-size: 2rem; color: var(--blue-dark); margin-bottom: 5px; }
.sec-head p { font-size: 1.1rem; color: #6b7280; }

/* 3. CICLOS */
.cycles-section { padding: 60px 0; background: var(--gray-bg); }
.cycles-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; }
.cycle-card { background: white; padding: 25px; border-radius: 16px; text-align: center; border: 2px solid transparent; cursor: pointer; transition: 0.2s; position: relative; }
.cycle-card:hover { transform: translateY(-5px); border-color: #cbd5e1; }
.cycle-card.active { border-color: var(--blue-light); background: #eff6ff; box-shadow: 0 10px 20px rgba(59, 130, 246, 0.15); }
.cc-icon { font-size: 2.5rem; margin-bottom: 15px; }
.cycle-card h4 { font-size: 1.1rem; margin-bottom: 5px; color: var(--blue-dark); }
.cc-badge { background: #e0f2fe; color: #0369a1; padding: 4px 10px; border-radius: 8px; font-size: 0.85rem; font-weight: 700; display: inline-block; }
.cc-check { position: absolute; top: 10px; right: 10px; color: var(--blue-light); font-size: 1.2rem; }
.hint-text { text-align: center; margin-top: 15px; color: #94a3b8; font-style: italic; }

/* 4. PASOS */
.steps-section { padding: 60px 0; }
.steps-visual { display: flex; flex-direction: column; gap: 20px; max-width: 700px; margin: 0 auto; }
.step-row { display: flex; gap: 20px; align-items: flex-start; background: white; padding: 20px; border-radius: 12px; border: 1px solid #e5e7eb; }
.sr-num { background: var(--yellow); color: black; width: 35px; height: 35px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 800; flex-shrink: 0; margin-top: 2px; }
.sr-content strong { display: block; font-size: 1.1rem; margin-bottom: 4px; color: var(--blue-dark); }
.sr-content p { margin: 0; color: #4b5563; line-height: 1.4; }

/* 5. PRECIOS */
.pricing-section { padding: 60px 0; background: #fafaf9; }
.plans-container { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 30px; align-items: flex-start; }

.plan-card { background: white; border-radius: 20px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05); position: relative; border: 1px solid #e5e7eb; display: flex; flex-direction: column; }
.pc-tag { background: #e5e7eb; color: #374151; font-size: 0.8rem; font-weight: 700; text-align: center; padding: 5px; text-transform: uppercase; letter-spacing: 1px; }
.pc-tag.highlight { background: var(--blue-light); color: white; }
.pc-tag.gold { background: var(--gold); color: white; }

.pc-header { padding: 30px 20px; text-align: center; border-bottom: 1px solid #f3f4f6; }
.social .pc-header { background: #fafaf9; }
.standard .pc-header { background: #eff6ff; }
.hero .pc-header { background: #fffbeb; }

.pc-header h3 { font-size: 1.4rem; margin-bottom: 10px; color: #374151; }
.price-big { font-size: 2.5rem; font-weight: 800; color: #111827; }
.price-big small { font-size: 1rem; color: #6b7280; font-weight: 400; }

.pc-body { padding: 20px; display: flex; flex-direction: column; flex: 1; }
.pc-body ul { list-style: none; padding: 0; margin-bottom: 20px; }
.pc-body li { display: flex; gap: 10px; margin-bottom: 12px; font-size: 0.95rem; align-items: center; color: #4b5563; }
.pc-body li svg { flex-shrink: 0; }

.social .pc-body li svg { color: var(--stone); }
.standard .pc-body li svg { color: var(--blue-light); }
.hero .pc-body li svg { color: var(--gold); }

.commitment-note { background: #fff1f2; color: #be123c; font-size: 0.85rem; padding: 10px; border-radius: 8px; text-align: center; font-style: italic; margin-bottom: 20px; border: 1px solid #fda4af; }

.btn-plan { width: 100%; padding: 14px; border-radius: 10px; font-weight: 700; margin-top: auto; }
.social-btn { background: var(--stone); color: white; }
.social-btn:hover { background: #44403c; }
.std-btn { background: var(--blue-light); color: white; box-shadow: 0 4px 15px rgba(59, 130, 246, 0.4); }
.std-btn:hover { background: #2563eb; }
.gold-btn { background: var(--gold); color: white; box-shadow: 0 4px 15px rgba(217, 119, 6, 0.4); }
.gold-btn:hover { background: #b45309; }

.fee-notice { text-align: center; margin-top: 30px; font-size: 0.9rem; color: #6b7280; }

/* 6. SPONSORS */
.sponsors-section { padding: 60px 0; background: #1e3a8a; color: white; margin-top: 40px; }
.sponsors-box { display: flex; flex-wrap: wrap; gap: 40px; align-items: center; justify-content: space-between; }
.sb-left { flex: 1; min-width: 300px; }
.sb-icon { font-size: 3rem; color: var(--yellow); margin-bottom: 15px; }
.sb-left h2 { font-size: 2rem; margin-bottom: 10px; }
.sb-left p { font-size: 1.1rem; color: #bfdbfe; line-height: 1.5; }

.sb-right { flex: 1; background: rgba(255,255,255,0.1); padding: 30px; border-radius: 16px; text-align: center; border: 1px solid rgba(255,255,255,0.2); }
.impact-stat strong { font-size: 2.5rem; color: var(--yellow); display: block; line-height: 1; }
.impact-stat span { display: block; color: white; margin-bottom: 20px; font-size: 0.9rem; }
.btn-sponsor { background: white; color: var(--blue-dark); padding: 12px 24px; border-radius: 50px; font-weight: 800; font-size: 1rem; }
.btn-sponsor:hover { background: var(--yellow); }

.sponsor-quote { text-align: center; margin-top: 40px; font-style: italic; opacity: 0.7; max-width: 600px; margin-left: auto; margin-right: auto; }

/* 7. FAQ */
.faq-section { padding: 60px 0; }
.requirements-box { background: #fff7ed; border: 1px solid #fdba74; padding: 25px; border-radius: 12px; margin-bottom: 40px; }
.requirements-box h3 { color: #c2410c; margin-bottom: 15px; display: flex; align-items: center; gap: 10px; }
.requirements-box ul { list-style: none; padding: 0; margin: 0; }
.requirements-box li { display: flex; gap: 10px; margin-bottom: 8px; font-size: 1rem; }
.requirements-box svg { color: #f97316; }

.accordion { display: flex; flex-direction: column; gap: 10px; }
.acc-item { background: white; border: 1px solid #e5e7eb; border-radius: 10px; overflow: hidden; }
.acc-head { padding: 15px 20px; display: flex; justify-content: space-between; align-items: center; cursor: pointer; background: #f9fafb; font-weight: 600; }
.acc-head:hover { background: #f3f4f6; }
.acc-arrow { color: var(--blue-light); font-size: 1.2rem; transition: 0.3s; }
.acc-item.open .acc-arrow { transform: rotate(90deg); }
.acc-body { padding: 0 20px; max-height: 0; overflow: hidden; transition: 0.3s ease-out; background: white; }
.acc-item.open .acc-body { padding: 20px; max-height: 200px; border-top: 1px solid #e5e7eb; }

/* STICKY BAR */
.sticky-bar { position: fixed; bottom: -100px; left: 0; width: 100%; background: white; border-top: 1px solid #e5e7eb; padding: 15px 0; box-shadow: 0 -5px 20px rgba(0,0,0,0.1); z-index: 100; transition: 0.4s; }
.sticky-bar.visible { bottom: 0; }
.sb-content { display: flex; justify-content: space-between; align-items: center; }
.sb-text strong { color: var(--blue-dark); display: block; }
.sb-text span { font-size: 0.85rem; color: #6b7280; }
.btn-sticky { background: var(--blue-light); color: white; padding: 10px 24px; border-radius: 8px; font-weight: 700; }
`;