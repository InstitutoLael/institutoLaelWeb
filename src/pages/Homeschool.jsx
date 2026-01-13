import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext.jsx";

// --- ICONOS SOLEMNES Y ACADÉMICOS ---
import { 
  FaBible, FaDove, FaScroll, FaUniversity, FaPenFancy, 
  FaChalkboardTeacher, FaHandshake, FaUserGraduate, FaSeedling,
  FaCheck, FaStar, FaQuoteLeft, FaPhoneAlt
} from "react-icons/fa";
import { 
  MdOutlineVerifiedUser, MdSchool, MdCastForEducation, 
  MdAutoStories, MdEngineering 
} from "react-icons/md";
import { BsStars, BsShieldCheck } from "react-icons/bs";
import { IoLibrary } from "react-icons/io5";

// --- IMÁGENES (Rutas Placeholder según tu estructura) ---
import logoLael from "../assets/img/Logos/lael-inst-azul.png";
import logoPartner from "../assets/img/Partners/LosOlivos.png";

// --- DATA ---
import { 
  ACADEMY_CONFIG, 
  ALLIANCE, 
  SUBJECTS, 
  LEVELS, 
  PACKS, 
  SCHOOL_SERVICES,
  clp 
} from "../data/homeschool.js";

/* ──────────────────────────────────────────────────────────────────────────
   COMPONENTES UI
   ────────────────────────────────────────────────────────────────────────── */
const SectionDivider = ({ icon: Icon, title }) => (
  <div className="section-divider">
    <div className="line"></div>
    <div className="sd-content">
      <Icon className="sd-icon"/> <span>{title}</span>
    </div>
    <div className="line"></div>
  </div>
);

export default function Academy() {
  const { addToCart, openCart } = useCart();

  // --- ESTADOS ---
  const [activeLevel, setActiveLevel] = useState("media"); // basica | media | paes
  const [selectedSubject, setSelectedSubject] = useState(null); // Para filtrar packs o mostrar interés
  const [showSticky, setShowSticky] = useState(false);

  // --- SCROLL LISTENER ---
  useEffect(() => {
    const handleScroll = () => setShowSticky(window.scrollY > 900);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // --- MANEJO DE CARRITO (Lógica de Packs) ---
  const handleEnroll = (pack) => {
    const subjectName = selectedSubject 
      ? SUBJECTS.find(s => s.id === selectedSubject)?.name 
      : "Multidisciplinario";

    addToCart({
      id: `academy-${pack.id}-${selectedSubject || 'gen'}`,
      title: `Academy: ${pack.title}`,
      price: pack.price,
      detail: `${pack.hours} Horas Cronológicas - ${subjectName}`,
      type: 'course',
      extraInfo: pack.id === 'academy-p12' 
        ? 'Matrícula GRATIS incluida' 
        : `+ Matrícula Anual ${clp(ACADEMY_CONFIG.enrollmentFee)}`
    });
    openCart();
  };

  const scrollToSection = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="academy-page">
      <style>{css}</style>

      {/* ──────────────── 1. HERO SOLEMNE ──────────────── */}
      <header className="academy-hero">
        <div className="ah-overlay"></div>
        <div className="container ah-content">
          <div className="ah-badge">
            <FaBible /> Cosmovisión Cristiana & Excelencia Académica
          </div>
          <h1 className="ah-title">
            Más que profesores,<br/>somos <span className="serif-italic">Mentores de Vida</span>.
          </h1>
          <p className="ah-subtitle">
            No somos un colegio tradicional. Somos el <strong>Hub Académico</strong> que tu familia necesita. 
            Apoyamos a familias Homeschoolers y estudiantes que requieren refuerzo con una metodología 
            personalizada y valores del Reino.
          </p>
          <div className="ah-buttons">
            <button onClick={() => scrollToSection('packs')} className="btn-hero gold">
              <FaChalkboardTeacher /> Ver Packs de Clases
            </button>
            <button onClick={() => scrollToSection('identidad')} className="btn-hero outline">
              <FaDove /> Conoce Nuestra Identidad
            </button>
          </div>
        </div>
      </header>

      {/* ──────────────── 2. IDENTIDAD & SIGNIFICADO (LAEL) ──────────────── */}
      <section id="identidad" className="identity-section">
        <div className="container">
          <SectionDivider icon={FaScroll} title="Nuestra Esencia" />
          
          <div className="identity-grid">
             {/* Columna Izquierda: El Nombre */}
             <div className="id-card text-left">
                <h3>Lael <span className="hebrew">(לָאֵל)</span></h3>
                <p className="definition">
                   Del hebreo: <strong>"Perteneciente a Dios"</strong>.
                </p>
                <p>
                  No educamos para el mundo, educamos para la eternidad. Entendemos que la mente 
                  de tus hijos es un territorio sagrado. Nuestro nombre es nuestra declaración de principios: 
                  cada alumno, cada talento y cada clase, le pertenece a Él.
                </p>
             </div>

             {/* Columna Centro: El Logo (Visual) */}
             <div className="id-center">
                <div className="logo-halo">
                  <img src={logoLael} alt="Logo Instituto Lael" className="logo-img" />
                </div>
             </div>

             {/* Columna Derecha: Simbología */}
             <div className="id-card text-right">
                <div className="symbol-row">
                   <div className="sr-icon"><FaDove/></div>
                   <div>
                      <strong>La Paloma</strong>
                      <p>Representa al Espíritu Santo, fuente de toda sabiduría e inteligencia (Éxodo 31:3).</p>
                   </div>
                </div>
                <div className="symbol-row">
                   <div className="sr-icon"><FaPenFancy/></div>
                   <div>
                      <strong>La "É" Acentuada</strong>
                      <p>Ponemos el acento donde importa. No solo en el conocimiento, sino en el carácter.</p>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* ──────────────── 3. ACLARACIÓN HOMESCHOOL & PARTNER ──────────────── */}
      <section className="alliance-section">
         <div className="container alliance-wrapper">
            <div className="aw-info">
               <div className="aw-label">ALIANZA ESTRATÉGICA 2026</div>
               <h2>Libertad Educativa,<br/>Respaldo Oficial.</h2>
               <p>
                  Sabemos que el camino del Homeschool puede ser solitario o burocráticamente complejo. 
                  Por eso, aunque <strong>Instituto Lael es un centro de entrenamiento académico</strong> (Tutores), 
                  tenemos una alianza exclusiva con <strong>{ALLIANCE.name}</strong>.
               </p>
               <ul className="aw-benefits">
                  {ALLIANCE.benefits.map((b, i) => (
                     <li key={i}><FaCheck/> {b}</li>
                  ))}
               </ul>
               <div className="aw-note">
                  * Nosotros te preparamos, ellos certifican. El equipo perfecto.
               </div>
            </div>
            <div className="aw-logo-box">
               <img src={logoPartner} alt="Los Olivos Homeschool" />
               <div className="partner-badge"><MdOutlineVerifiedUser/> Colegio Partner</div>
            </div>
         </div>
      </section>

      {/* ──────────────── 4. MATERIAS Y NIVELES ──────────────── */}
      <section className="subjects-section">
         <div className="container">
            <SectionDivider icon={IoLibrary} title="Áreas del Saber" />
            
            <div className="levels-tabs">
               {LEVELS.map(lvl => (
                  <button 
                     key={lvl.id}
                     className={`lvl-btn ${activeLevel === lvl.id ? 'active' : ''}`}
                     onClick={() => setActiveLevel(lvl.id)}
                  >
                     <strong>{lvl.label}</strong>
                     <span>{lvl.desc}</span>
                  </button>
               ))}
            </div>

            <div className="subjects-grid">
               {SUBJECTS.map((sub) => (
                  <div 
                     key={sub.id} 
                     className={`sub-card ${selectedSubject === sub.id ? 'selected' : ''}`}
                     onClick={() => setSelectedSubject(sub.id === selectedSubject ? null : sub.id)}
                     style={{'--accent': sub.color}}
                  >
                     <div className="sc-icon">{sub.icon}</div>
                     <h4>{sub.name}</h4>
                     <p>{sub.desc}</p>
                     <div className="sc-check">
                        {selectedSubject === sub.id ? <FaCheck/> : <span className="plus">+</span>}
                     </div>
                  </div>
               ))}
            </div>
            
            <p className="sub-hint">
               {selectedSubject 
                  ? <span>Has seleccionado <strong>{SUBJECTS.find(s=>s.id === selectedSubject).name}</strong>. Elige un pack abajo.</span>
                  : "Selecciona una materia para personalizar tu pack (opcional)."}
            </p>
         </div>
      </section>

      {/* ──────────────── 5. PRECIOS (PACKS) ──────────────── */}
      <section id="packs" className="pricing-section">
         <div className="container">
            <div className="pricing-header">
               <h2>Inversión Académica</h2>
               <p>Elige la intensidad del apoyo que tu hijo necesita. Horas flexibles y transferibles.</p>
            </div>

            <div className="packs-grid">
               {PACKS.map((pack) => (
                  <div key={pack.id} className={`pack-card ${pack.badge ? 'featured' : ''}`}>
                     {pack.badge && <div className="pack-badge"><BsStars/> {pack.badge}</div>}
                     
                     <div className="pc-top">
                        <h3>{pack.title}</h3>
                        <p className="pc-sub">{pack.subtitle}</p>
                     </div>

                     <div className="pc-hours">
                        <span className="num">{pack.hours}</span>
                        <div className="meta">
                           <span className="hrs">Horas</span>
                           <span className="type">Cronológicas</span>
                        </div>
                     </div>

                     <div className="pc-price">
                        {clp(pack.price)}
                     </div>

                     <ul className="pc-features">
                        {pack.features.map((f, i) => (
                           <li key={i}><FaCheck className="chk"/> {f}</li>
                        ))}
                        {selectedSubject && (
                           <li className="highlight-f"><FaStar/> Enfocado en: {SUBJECTS.find(s=>s.id === selectedSubject).name}</li>
                        )}
                     </ul>

                     <button onClick={() => handleEnroll(pack)} className="btn-pack">
                        Contratar Pack
                     </button>
                  </div>
               ))}
            </div>
            
            <div className="enrollment-warning">
               <BsShieldCheck/> Valor Matrícula Anual: <strong>{clp(ACADEMY_CONFIG.enrollmentFee)}</strong> (Se paga una sola vez por familia).
            </div>
         </div>
      </section>

      {/* ──────────────── 6. SERVICIOS PARA COLEGIOS (B2B) ──────────────── */}
      <section className="b2b-section">
         <div className="container">
            <div className="b2b-intro">
               <FaUniversity className="b2b-icon-main"/>
               <h2>Servicios para Colegios</h2>
               <p>¿Eres director o sostenedor? Llevamos la excelencia de Lael a tu institución.</p>
            </div>
            
            <div className="b2b-grid">
               {SCHOOL_SERVICES.map((serv) => (
                  <div key={serv.id} className="b2b-card">
                     <div className="b2b-head">
                        <span className="b2b-emoji">{serv.icon}</span>
                        <h4>{serv.title}</h4>
                     </div>
                     <p>{serv.desc}</p>
                     <div className="b2b-price">{serv.priceRef}</div>
                  </div>
               ))}
            </div>
            <div className="b2b-cta">
               <button className="btn-contact">
                  <FaPhoneAlt/> Agendar Reunión Corporativa
               </button>
            </div>
         </div>
      </section>

      {/* ──────────────── 7. FOOTER STICKY ──────────────── */}
      <div className={`sticky-academy ${showSticky ? 'visible' : ''}`}>
         <div className="container sa-flex">
            <div className="sa-info">
               <strong>Lael Academy</strong>
               <span>Perteneciente a Dios</span>
            </div>
            <button onClick={() => scrollToSection('packs')} className="btn-sa">
               Ver Packs Disponibles
            </button>
         </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   ESTILOS CSS "IVY LEAGUE" (Académico, Azul Profundo, Dorado)
   ────────────────────────────────────────────────────────────────────────── */
const css = `
:root {
  --royal-blue: #1e3a8a; /* Azul Institucional */
  --royal-light: #2563eb;
  --gold: #d97706;       /* Dorado Excelencia */
  --gold-light: #fbbf24;
  --paper: #f8fafc;
  --text-dark: #1e293b;
  --text-light: #64748b;
  --bg-dark: #0f172a;
}

.academy-page { font-family: 'Inter', sans-serif; background: var(--paper); color: var(--text-dark); padding-bottom: 80px; }
.container { max-width: 1100px; margin: 0 auto; padding: 0 20px; }
h1, h2, h3, h4 { font-family: 'Playfair Display', serif; /* Toque clásico */ font-weight: 700; margin: 0; }
.serif-italic { font-style: italic; color: var(--gold-light); }

/* 1. HERO */
.academy-hero { position: relative; min-height: 85vh; display: flex; align-items: center; justify-content: center; text-align: center; background: #0f172a; color: white; overflow: hidden; }
.ah-overlay { position: absolute; inset: 0; background: url('https://www.transparenttextures.com/patterns/dark-wood.png'); opacity: 0.4; }
.ah-overlay::after { content: ''; position: absolute; inset: 0; background: radial-gradient(circle at center, rgba(30, 58, 138, 0.4) 0%, #0f172a 90%); }
.ah-content { position: relative; z-index: 2; max-width: 800px; }

.ah-badge { display: inline-flex; align-items: center; gap: 8px; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); padding: 8px 20px; border-radius: 50px; font-size: 0.85rem; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 30px; color: var(--gold-light); backdrop-filter: blur(5px); }
.ah-title { font-size: clamp(3rem, 5vw, 5rem); line-height: 1.1; margin-bottom: 25px; }
.ah-subtitle { font-family: 'Inter', sans-serif; font-size: 1.2rem; color: #cbd5e1; line-height: 1.6; max-width: 700px; margin: 0 auto 50px; }

.ah-buttons { display: flex; gap: 20px; justify-content: center; flex-wrap: wrap; }
.btn-hero { padding: 16px 32px; border-radius: 4px; font-weight: 600; font-family: 'Inter', sans-serif; display: flex; align-items: center; gap: 10px; transition: 0.3s; text-transform: uppercase; letter-spacing: 1px; font-size: 0.9rem; }
.btn-hero.gold { background: var(--gold); color: white; border: 1px solid var(--gold); }
.btn-hero.gold:hover { background: var(--gold-light); border-color: var(--gold-light); color: black; }
.btn-hero.outline { background: transparent; border: 1px solid rgba(255,255,255,0.3); color: white; }
.btn-hero.outline:hover { border-color: white; background: rgba(255,255,255,0.05); }

/* 2. IDENTIDAD */
.identity-section { padding: 100px 0; background: white; }
.section-divider { display: flex; align-items: center; gap: 20px; margin-bottom: 60px; justify-content: center; opacity: 0.6; }
.line { height: 1px; width: 100px; background: var(--royal-blue); }
.sd-content { display: flex; flex-direction: column; align-items: center; color: var(--royal-blue); font-weight: 700; text-transform: uppercase; letter-spacing: 2px; font-size: 0.8rem; }
.sd-icon { font-size: 1.5rem; margin-bottom: 5px; }

.identity-grid { display: grid; grid-template-columns: 1fr 300px 1fr; gap: 40px; align-items: center; }
@media(max-width: 900px) { .identity-grid { grid-template-columns: 1fr; text-align: center; } .id-card.text-left, .id-card.text-right { text-align: center; } }

.id-card h3 { font-size: 2.5rem; color: var(--royal-blue); margin-bottom: 15px; }
.hebrew { font-family: 'Times New Roman', serif; color: var(--gold); }
.definition { font-size: 1.2rem; font-style: italic; margin-bottom: 20px; color: var(--text-dark); border-bottom: 2px solid var(--gold); display: inline-block; padding-bottom: 5px; }
.id-card p { color: var(--text-light); line-height: 1.6; }

.id-center { display: flex; justify-content: center; }
.logo-halo { width: 250px; height: 250px; border-radius: 50%; background: radial-gradient(circle, rgba(30,58,138,0.05) 0%, transparent 70%); display: flex; align-items: center; justify-content: center; border: 1px solid rgba(30,58,138,0.1); }
.logo-img { width: 180px; height: auto; }

.symbol-row { display: flex; gap: 15px; margin-bottom: 25px; align-items: flex-start; }
.text-right .symbol-row { justify-content: flex-end; text-align: right; }
@media(max-width: 900px) { .text-right .symbol-row { justify-content: center; text-align: center; flex-direction: column; align-items: center; } }

.sr-icon { width: 50px; height: 50px; background: var(--royal-blue); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; flex-shrink: 0; }
.text-right .symbol-row .sr-icon { order: 2; }
@media(max-width: 900px) { .text-right .symbol-row .sr-icon { order: -1; } }

/* 3. ALIANZA */
.alliance-section { padding: 80px 0; background: #f0f9ff; border-top: 1px solid #bae6fd; border-bottom: 1px solid #bae6fd; }
.alliance-wrapper { display: flex; gap: 60px; align-items: center; }
@media(max-width: 800px) { .alliance-wrapper { flex-direction: column-reverse; } }

.aw-info { flex: 1.5; }
.aw-label { color: var(--royal-blue); font-weight: 800; letter-spacing: 1px; margin-bottom: 10px; font-size: 0.9rem; }
.aw-info h2 { font-size: 2.8rem; color: #0f172a; margin-bottom: 20px; line-height: 1.1; }
.aw-info p { font-size: 1.1rem; color: var(--text-light); margin-bottom: 30px; line-height: 1.6; }

.aw-benefits { list-style: none; padding: 0; display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 30px; }
.aw-benefits li { display: flex; gap: 10px; color: var(--royal-blue); font-weight: 600; font-size: 1rem; align-items: center; }

.aw-note { font-size: 0.9rem; font-style: italic; color: var(--text-light); }

.aw-logo-box { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 15px; }
.aw-logo-box img { max-width: 200px; filter: drop-shadow(0 10px 20px rgba(0,0,0,0.1)); }
.partner-badge { background: #fff; border: 1px solid #e2e8f0; padding: 8px 16px; border-radius: 50px; font-size: 0.85rem; font-weight: 700; color: var(--royal-light); display: flex; align-items: center; gap: 6px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }

/* 4. SUBJECTS */
.subjects-section { padding: 100px 0; background: white; }
.levels-tabs { display: flex; justify-content: center; gap: 10px; flex-wrap: wrap; margin-bottom: 50px; }
.lvl-btn { background: white; border: 1px solid #e2e8f0; padding: 12px 24px; border-radius: 8px; text-align: left; transition: 0.2s; min-width: 140px; display: flex; flex-direction: column; align-items: center; text-align: center; }
.lvl-btn strong { display: block; color: var(--text-dark); font-size: 1.1rem; }
.lvl-btn span { font-size: 0.8rem; color: var(--text-light); }
.lvl-btn.active { border-color: var(--royal-blue); background: var(--royal-blue); }
.lvl-btn.active strong { color: white; }
.lvl-btn.active span { color: rgba(255,255,255,0.7); }

.subjects-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; max-width: 1000px; margin: 0 auto; }
.sub-card { background: white; border: 1px solid #e2e8f0; padding: 25px; border-radius: 12px; transition: 0.2s; position: relative; cursor: pointer; overflow: hidden; }
.sub-card::before { content: ''; position: absolute; top: 0; left: 0; width: 4px; height: 100%; background: var(--accent); opacity: 0.5; transition: 0.2s; }
.sub-card:hover { transform: translateY(-5px); box-shadow: 0 10px 30px rgba(0,0,0,0.05); }
.sub-card.selected { border-color: var(--accent); background: rgba(255,255,255,0.5); box-shadow: 0 0 0 2px var(--accent) inset; }
.sub-card.selected::before { opacity: 1; }

.sc-icon { font-size: 2rem; margin-bottom: 15px; }
.sub-card h4 { font-size: 1.2rem; color: var(--text-dark); margin-bottom: 5px; font-family: 'Inter', sans-serif; }
.sub-card p { font-size: 0.9rem; color: var(--text-light); line-height: 1.4; }
.sc-check { position: absolute; top: 15px; right: 15px; width: 30px; height: 30px; border-radius: 50%; border: 1px solid #e2e8f0; display: flex; align-items: center; justify-content: center; color: var(--text-light); font-size: 1.2rem; transition: 0.2s; }
.sub-card.selected .sc-check { background: var(--accent); color: white; border-color: var(--accent); }

.sub-hint { text-align: center; margin-top: 30px; font-size: 0.95rem; color: var(--royal-blue); height: 24px; }

/* 5. PRICING */
.pricing-section { padding: 80px 0; background: var(--bg-dark); color: white; position: relative; }
.pricing-header { text-align: center; max-width: 600px; margin: 0 auto 50px; }
.pricing-header h2 { font-size: 3rem; margin-bottom: 15px; color: white; }
.pricing-header p { color: #94a3b8; font-size: 1.1rem; }

.packs-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; max-width: 1000px; margin: 0 auto; }
.pack-card { background: #1e293b; border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 40px 30px; display: flex; flex-direction: column; position: relative; transition: 0.3s; }
.pack-card:hover { border-color: var(--gold); transform: translateY(-5px); }
.pack-card.featured { background: linear-gradient(145deg, #1e3a8a 0%, #1e293b 100%); border: 1px solid var(--royal-blue); box-shadow: 0 20px 40px rgba(0,0,0,0.3); transform: scale(1.05); z-index: 10; }
.pack-card.featured:hover { transform: scale(1.05) translateY(-5px); }

.pack-badge { position: absolute; top: -12px; left: 50%; transform: translateX(-50%); background: var(--gold); color: black; font-weight: 700; padding: 5px 15px; border-radius: 50px; font-size: 0.8rem; display: flex; align-items: center; gap: 5px; box-shadow: 0 5px 15px rgba(217, 119, 6, 0.4); }

.pc-top { text-align: center; margin-bottom: 20px; }
.pc-top h3 { font-size: 1.6rem; margin-bottom: 5px; color: white; }
.pc-sub { font-size: 0.9rem; color: #94a3b8; }

.pc-hours { display: flex; justify-content: center; align-items: center; gap: 10px; margin-bottom: 20px; padding: 15px; background: rgba(0,0,0,0.2); border-radius: 12px; }
.pc-hours .num { font-size: 3rem; font-weight: 800; line-height: 1; color: white; }
.pc-hours .meta { display: flex; flex-direction: column; text-align: left; }
.pc-hours .hrs { font-weight: 700; color: var(--gold); text-transform: uppercase; font-size: 0.8rem; }
.pc-hours .type { font-size: 0.8rem; color: #94a3b8; }

.pc-price { font-size: 2rem; text-align: center; font-family: 'Inter', sans-serif; font-weight: 700; margin-bottom: 25px; color: white; }

.pc-features { list-style: none; padding: 0; margin-bottom: 30px; flex: 1; }
.pc-features li { display: flex; gap: 10px; margin-bottom: 12px; font-size: 0.95rem; color: #cbd5e1; align-items: flex-start; }
.chk { color: var(--gold); margin-top: 3px; }
.highlight-f { color: var(--gold-light) !important; font-weight: 700; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 10px; margin-top: 10px; }

.btn-pack { width: 100%; padding: 15px; border-radius: 8px; font-weight: 700; font-family: 'Inter', sans-serif; cursor: pointer; border: none; transition: 0.2s; }
.pack-card.featured .btn-pack { background: var(--gold); color: black; }
.pack-card.featured .btn-pack:hover { background: var(--gold-light); }
.pack-card:not(.featured) .btn-pack { background: transparent; border: 1px solid rgba(255,255,255,0.2); color: white; }
.pack-card:not(.featured) .btn-pack:hover { background: rgba(255,255,255,0.05); border-color: white; }

.enrollment-warning { margin-top: 40px; text-align: center; background: rgba(217, 119, 6, 0.1); border: 1px solid rgba(217, 119, 6, 0.3); color: var(--gold-light); padding: 15px; border-radius: 8px; display: flex; align-items: center; justify-content: center; gap: 10px; font-size: 0.9rem; max-width: 600px; margin-left: auto; margin-right: auto; }

/* 6. B2B */
.b2b-section { padding: 80px 0; background: #fff; }
.b2b-intro { text-align: center; margin-bottom: 50px; max-width: 600px; margin-left: auto; margin-right: auto; }
.b2b-icon-main { font-size: 3rem; color: #64748b; margin-bottom: 15px; }
.b2b-intro h2 { font-size: 2.5rem; color: var(--text-dark); margin-bottom: 10px; }

.b2b-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 30px; margin-bottom: 40px; }
.b2b-card { background: #f8fafc; padding: 30px; border-radius: 12px; border: 1px solid #e2e8f0; transition: 0.2s; }
.b2b-card:hover { border-color: var(--royal-blue); }
.b2b-head { display: flex; align-items: center; gap: 10px; margin-bottom: 15px; }
.b2b-emoji { font-size: 1.5rem; }
.b2b-card h4 { font-size: 1.1rem; color: var(--text-dark); }
.b2b-card p { font-size: 0.95rem; color: var(--text-light); margin-bottom: 20px; }
.b2b-price { font-size: 0.85rem; font-weight: 700; color: var(--royal-blue); text-transform: uppercase; letter-spacing: 0.5px; }

.b2b-cta { text-align: center; }
.btn-contact { background: var(--text-dark); color: white; padding: 12px 25px; border-radius: 50px; font-weight: 600; display: inline-flex; align-items: center; gap: 10px; }

/* 7. STICKY FOOTER */
.sticky-academy { position: fixed; bottom: -100px; left: 0; width: 100%; background: rgba(15, 23, 42, 0.95); backdrop-filter: blur(10px); padding: 15px 0; z-index: 100; transition: 0.4s; border-top: 1px solid rgba(255,255,255,0.1); }
.sticky-academy.visible { bottom: 0; }
.sa-flex { display: flex; justify-content: space-between; align-items: center; color: white; }
.sa-info { display: flex; flex-direction: column; }
.sa-info strong { color: var(--gold); }
.sa-info span { font-size: 0.8rem; color: #94a3b8; }
.btn-sa { background: var(--royal-blue); color: white; padding: 10px 20px; border-radius: 6px; font-weight: 600; }
`;