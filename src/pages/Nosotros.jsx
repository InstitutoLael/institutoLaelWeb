import { useState } from "react";
import { 
  FaBible, FaLightbulb, FaGraduationCap, FaHeart, FaArrowRight, FaChalkboardTeacher 
} from "react-icons/fa";
import { BsStars, BsChatQuote } from "react-icons/bs";
import { RiDoubleQuotesL } from "react-icons/ri";

// --- IMÁGENES ---
import logoDorado from "../assets/img/Logos/lael-inst-amarillo.png";

// IMPORTANTE: Pon tu foto real aquí. 
// Si la tienes en la carpeta assets, impórtala así:
// import diegoFoto from "../assets/img/Equipo/diego.jpg"; 
// Por ahora usaré un placeholder elegante.

export default function About() {
  const [activeValue, setActiveValue] = useState(0);

  const VALUES = [
    {
      icon: <FaBible/>,
      title: "Cosmovisión Bíblica",
      desc: "No separamos la fe del intelecto. Creemos que toda verdad es verdad de Dios y educamos desde esa certeza."
    },
    {
      icon: <BsStars/>,
      title: "Excelencia",
      desc: "Hacemos todo como para el Señor. La mediocridad no tiene cabida en nuestra metodología ni en nuestro servicio."
    },
    {
      icon: <FaHeart/>,
      title: "Mentoring",
      desc: "Más que profesores, somos mentores. Nos importa el corazón y el carácter del alumno, no solo su nota."
    }
  ];

  return (
    <div className="about-page">
      <style>{css}</style>

      {/* ──────────────── 1. HERO: EL MANIFIESTO ──────────────── */}
      <header className="about-hero">
        <div className="ah-overlay"></div>
        <div className="container ah-content">
          <div className="logo-reveal">
             <img src={logoDorado} alt="Lael Logo" className="logo-hero"/>
          </div>
          <h1 className="ah-title">
            Educar es <span className="text-gold">Trascender</span>.
          </h1>
          <p className="ah-subtitle">
            Somos Instituto Lael. Nacimos en 2020 en una pequeña habitación con un gran propósito: 
            desafiar el estándar educativo uniendo excelencia académica y principios eternos.
          </p>
        </div>
      </header>

      {/* ──────────────── 2. EL ORIGEN (SIGNIFICADO) ──────────────── */}
      <section className="origin-section">
         <div className="container origin-grid">
            <div className="origin-text">
               <span className="section-label">Nuestro Origen</span>
               <h2>¿Por qué <span className="hebrew">LAEL</span>?</h2>
               
               <div className="meaning-box">
                  <div className="mb-row">
                     <span className="mb-term">Lael (לָאֵל)</span>
                     <span className="mb-def">= Perteneciente a Dios.</span>
                  </div>
               </div>

               <p>
                  En Números 3:24 aparece este nombre. Elegimos llamarnos así porque es nuestra 
                  declaración de propiedad: <strong>Esta institución, nuestros talentos y nuestros alumnos 
                  tienen un propósito divino.</strong>
               </p>
               <p>
                  En un mundo confundido, queremos ser un faro de claridad. Aquí los números se entienden y las señas comunican vida.
               </p>
            </div>
            
            <div className="origin-visual">
               <div className="ov-card">
                  <FaChalkboardTeacher className="ov-icon"/>
                  <h4>Pedagogía</h4>
                  <p>Explicamos fácil lo difícil</p>
               </div>
               <div className="ov-card">
                  <FaLightbulb className="ov-icon"/>
                  <h4>Mente</h4>
                  <p>Pensamiento Crítico</p>
               </div>
               <div className="ov-card">
                  <FaGraduationCap className="ov-icon"/>
                  <h4>Academia</h4>
                  <p>Rigor Intelectual</p>
               </div>
            </div>
         </div>
      </section>

      {/* ──────────────── 3. EL DIRECTOR (MAIN FEATURE) ──────────────── */}
      <section className="founder-section">
         <div className="container">
            <div className="section-label center">Liderazgo</div>
            <h2 className="center-h2">Quien guía la visión</h2>

            <div className="founder-card">
               {/* FOTO: CAMBIAR EL SRC POR TU FOTO REAL */}
               <div className="fc-image">
                  <img 
                    src="https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80&w=600" 
                    alt="Diego Chaparro" 
                  />
                  <div className="fc-overlay"></div>
               </div>
               
               <div className="fc-content">
                  <div className="fc-header">
                     <div>
                        <h3>Diego Chaparro</h3>
                        <span className="fc-role">Fundador & Director • Profe Matemáticas</span>
                     </div>
                     <span className="fc-hebrew">לָאֵל</span>
                  </div>

                  <div className="fc-tags">
                     <span className="tag">Liderazgo</span>
                     <span className="tag">Matemáticas</span>
                  </div>

                  <p className="fc-bio">
                     Fundador de Instituto Lael. Comenzó enseñando matemáticas con una pizarra 
                     en una habitación en 2020 y hoy lidera la visión educativa. 
                     <span className="highlight-text"> Cree firmemente que los números no son difíciles, solo están mal explicados.</span>
                  </p>

                  <div className="fc-quote-box">
                     <BsChatQuote className="quote-mark"/>
                     <p>
                        "Lael no es solo un instituto, es mi forma de decir 'Gracias'. 
                        Ver a alguien superar el miedo a las matemáticas o aprender a comunicarse con señas 
                        me recuerda por qué empezamos en esa habitación. <strong>Aquí nadie es un número, todos tienen un propósito.</strong>"
                     </p>
                  </div>
               </div>
            </div>

         </div>
      </section>

      {/* ──────────────── 4. VALORES INTERACTIVOS ──────────────── */}
      <section className="dna-section">
         <div className="container">
            <div className="dna-head">
               <h2>Nuestro ADN</h2>
               <p>Los pilares innegociables sobre los que construimos.</p>
            </div>

            <div className="dna-wrapper">
               <div className="dna-list">
                  {VALUES.map((val, idx) => (
                     <button 
                        key={idx} 
                        className={`dna-btn ${activeValue === idx ? 'active' : ''}`}
                        onClick={() => setActiveValue(idx)}
                     >
                        <div className="dna-icon-sm">{val.icon}</div>
                        <span>{val.title}</span>
                        {activeValue === idx && <FaArrowRight className="arrow-indic"/>}
                     </button>
                  ))}
               </div>

               <div className="dna-display">
                  <div className="dd-content">
                     <div className="dd-icon-big">
                        {VALUES[activeValue].icon}
                     </div>
                     <h3>{VALUES[activeValue].title}</h3>
                     <p>{VALUES[activeValue].desc}</p>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* ──────────────── 5. CITA FINAL / CTA ──────────────── */}
      <section className="quote-section">
         <div className="container">
            <RiDoubleQuotesL className="quote-icon"/>
            <blockquote>
               La educación no es llenar un cubo, es encender un fuego. 
               Y en Lael, encendemos fuegos que alumbran eternamente.
            </blockquote>
            
            <div className="cta-about">
               <h3>¿Listo para aprender diferente?</h3>
               <div className="cta-btns-row">
                  <a href="/academy" className="btn-gold">Ver Cursos</a>
                  <a href="/empresas" className="btn-outline">Para Empresas</a>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   ESTILOS CSS (Dark Royal Theme)
   ────────────────────────────────────────────────────────────────────────── */
const css = `
:root {
  --navy-dark: #0a1128;   /* Fondo principal */
  --navy-light: #1c2a4e;  /* Fondo paneles */
  --gold: #fbbf24;        /* Dorado principal */
  --gold-dark: #d97706;   /* Dorado oscuro */
  --text-main: #f8fafc;
  --text-muted: #94a3b8;
}

.about-page { font-family: 'Inter', sans-serif; background: var(--navy-dark); color: var(--text-main); }
.container { max-width: 1000px; margin: 0 auto; padding: 0 20px; }
h1, h2, h3, h4 { font-family: 'Playfair Display', serif; margin: 0; color: white; }
.text-gold { color: var(--gold); font-style: italic; }
.section-label { color: var(--gold); text-transform: uppercase; letter-spacing: 2px; font-size: 0.8rem; font-weight: 700; display: block; margin-bottom: 10px; }

/* 1. HERO */
.about-hero { position: relative; min-height: 60vh; display: flex; align-items: center; justify-content: center; text-align: center; overflow: hidden; background: radial-gradient(circle at center, #1e3a8a22 0%, var(--navy-dark) 80%); border-bottom: 1px solid rgba(255,255,255,0.05); }
.ah-overlay { position: absolute; inset: 0; background-image: url("https://www.transparenttextures.com/patterns/cubes.png"); opacity: 0.05; pointer-events: none; }
.ah-content { position: relative; z-index: 2; max-width: 700px; padding: 40px 0; }

.logo-reveal { margin-bottom: 25px; animation: fadeInDown 1.5s ease; }
.logo-hero { width: 100px; filter: drop-shadow(0 0 20px rgba(251, 191, 36, 0.3)); }
.ah-title { font-size: clamp(2.5rem, 5vw, 4rem); line-height: 1.1; margin-bottom: 25px; animation: fadeInUp 1.5s ease; }
.ah-subtitle { font-size: 1.1rem; color: var(--text-muted); line-height: 1.6; max-width: 600px; margin: 0 auto; animation: fadeInUp 2s ease; }

@keyframes fadeInDown { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
@keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }

/* 2. ORIGEN */
.origin-section { padding: 80px 0; background: var(--navy-dark); }
.origin-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; }
@media(max-width: 800px) { .origin-grid { grid-template-columns: 1fr; } }

.meaning-box { border-left: 3px solid var(--gold); padding-left: 20px; margin: 30px 0; }
.mb-term { font-size: 2.2rem; font-family: 'Playfair Display', serif; color: white; display: block; }
.mb-def { font-size: 1rem; color: var(--gold); font-weight: 600; text-transform: uppercase; letter-spacing: 1px; }
.hebrew { color: var(--gold); font-family: sans-serif; }

.origin-text p { color: var(--text-muted); line-height: 1.7; margin-bottom: 20px; font-size: 1rem; }

.origin-visual { display: grid; grid-template-columns: 1fr; gap: 20px; }
.ov-card { background: var(--navy-light); padding: 20px; border-radius: 8px; display: flex; align-items: center; gap: 15px; border: 1px solid rgba(255,255,255,0.05); transition: 0.3s; }
.ov-card:hover { border-color: var(--gold); transform: translateX(10px); }
.ov-icon { font-size: 1.5rem; color: var(--gold); }
.ov-card h4 { font-size: 1rem; margin-bottom: 2px; }
.ov-card p { font-size: 0.85rem; color: var(--text-muted); margin: 0; }

/* 3. FOUNDER SECTION (NUEVO) */
.founder-section { padding: 60px 0 100px; background: #080c1b; }
.center { text-align: center; }
.center-h2 { text-align: center; font-size: 2.5rem; margin-bottom: 50px; }

.founder-card { 
  background: var(--navy-light); 
  border-radius: 20px; 
  overflow: hidden; 
  display: grid; 
  grid-template-columns: 350px 1fr; 
  border: 1px solid rgba(255,255,255,0.05);
  box-shadow: 0 20px 50px rgba(0,0,0,0.3);
}
@media(max-width: 900px) { .founder-card { grid-template-columns: 1fr; } }

.fc-image { position: relative; height: 100%; min-height: 300px; }
.fc-image img { width: 100%; height: 100%; object-fit: cover; }
.fc-overlay { position: absolute; inset: 0; background: linear-gradient(to right, rgba(10,17,40,0) 0%, var(--navy-light) 100%); }
@media(max-width: 900px) { .fc-overlay { background: linear-gradient(to top, var(--navy-light) 10%, rgba(10,17,40,0) 100%); } }

.fc-content { padding: 40px; display: flex; flex-direction: column; justify-content: center; }

.fc-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px; }
.fc-header h3 { font-size: 2rem; color: white; line-height: 1; }
.fc-role { color: var(--gold); font-size: 0.85rem; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin-top: 5px; display: block; }
.fc-hebrew { font-size: 2.5rem; color: rgba(255,255,255,0.1); font-family: sans-serif; font-weight: 700; }

.fc-tags { display: flex; gap: 10px; margin-bottom: 25px; }
.tag { background: rgba(255,255,255,0.05); padding: 5px 12px; border-radius: 50px; font-size: 0.75rem; color: var(--text-muted); border: 1px solid rgba(255,255,255,0.1); }

.fc-bio { color: var(--text-muted); line-height: 1.6; margin-bottom: 30px; font-size: 1rem; }
.highlight-text { color: white; font-weight: 500; }

.fc-quote-box { background: rgba(0,0,0,0.2); border-left: 3px solid var(--gold); padding: 20px; border-radius: 0 8px 8px 0; position: relative; }
.quote-mark { position: absolute; top: -10px; left: -10px; background: var(--navy-light); color: var(--gold); padding: 5px; font-size: 1.5rem; border-radius: 50%; }
.fc-quote-box p { font-style: italic; color: #cbd5e1; font-size: 0.95rem; line-height: 1.6; margin: 0; }
.fc-quote-box strong { color: white; font-weight: 600; }

/* 4. ADN (Tabs Verticales) */
.dna-section { padding: 80px 0; background: linear-gradient(to bottom, var(--navy-dark), #0f172a); }
.dna-head { text-align: center; margin-bottom: 50px; }
.dna-head h2 { font-size: 2.5rem; margin-bottom: 10px; }

.dna-wrapper { display: grid; grid-template-columns: 300px 1fr; gap: 40px; }
@media(max-width: 768px) { .dna-wrapper { grid-template-columns: 1fr; } }

.dna-list { display: flex; flex-direction: column; gap: 10px; }
.dna-btn { display: flex; align-items: center; gap: 15px; padding: 20px; background: transparent; border: 1px solid rgba(255,255,255,0.1); color: var(--text-muted); text-align: left; cursor: pointer; transition: 0.3s; border-radius: 8px; font-size: 1rem; position: relative; }
.dna-btn:hover { background: rgba(255,255,255,0.03); color: white; }
.dna-btn.active { background: var(--gold); color: black; border-color: var(--gold); font-weight: 700; }
.dna-icon-sm { font-size: 1.2rem; }
.arrow-indic { position: absolute; right: 20px; font-size: 0.9rem; }

.dna-display { background: var(--navy-light); border-radius: 12px; padding: 40px; display: flex; align-items: center; justify-content: center; border: 1px solid rgba(255,255,255,0.05); min-height: 300px; }
.dd-content { text-align: center; max-width: 500px; animation: fadeIn 0.4s ease; }
@keyframes fadeIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }

.dd-icon-big { font-size: 4rem; color: var(--gold); margin-bottom: 20px; }
.dd-content h3 { font-size: 2rem; margin-bottom: 15px; color: white; }
.dd-content p { font-size: 1.1rem; color: var(--text-muted); line-height: 1.6; }

/* 5. CTA / QUOTE */
.quote-section { padding: 80px 0; background: #020617; text-align: center; border-top: 1px solid rgba(255,255,255,0.1); }
.quote-icon { font-size: 3rem; color: var(--gold); margin-bottom: 20px; opacity: 0.5; }
blockquote { font-family: 'Playfair Display', serif; font-size: clamp(1.5rem, 4vw, 2.2rem); color: white; max-width: 800px; margin: 0 auto 40px; line-height: 1.3; }

.cta-about h3 { margin-bottom: 25px; font-size: 1.5rem; color: var(--text-muted); }
.cta-btns-row { display: flex; justify-content: center; gap: 20px; flex-wrap: wrap; }
.btn-gold { background: var(--gold); color: black; padding: 12px 30px; border-radius: 4px; font-weight: 700; text-decoration: none; transition: 0.3s; }
.btn-gold:hover { background: white; }
.btn-outline { border: 1px solid white; color: white; padding: 12px 30px; border-radius: 4px; font-weight: 600; text-decoration: none; transition: 0.3s; }
.btn-outline:hover { background: rgba(255,255,255,0.1); }
`;