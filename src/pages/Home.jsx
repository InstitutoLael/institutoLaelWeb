import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PartnersMarquee from "../components/PartnersMarquee.jsx"; 
import { 
  FaBolt, FaGlobe, FaHands, FaArrowRight, FaUniversity, 
  FaBuilding, FaChalkboardTeacher, FaQuoteLeft, FaStar, FaUserGraduate
} from "react-icons/fa";
import { BsStars, BsArrowRightCircleFill, BsPlayCircle } from "react-icons/bs";
import { HiOutlineUserGroup } from "react-icons/hi";
import { IoSchoolOutline } from "react-icons/io5";

/* --------------------------------------------------------------------------
   DATOS DE TESTIMONIOS (Vital para reemplazar Noticias/Naama con confianza)
   -------------------------------------------------------------------------- */
const TESTIMONIALS = [
    {
        name: "Javier M.",
        program: "Preu PAES",
        quote: "Pasé de 450 a 810 puntos. No solo te enseñan a responder, te enseñan a pensar.",
        rating: 5,
    },
    {
        name: "Daniela R.",
        program: "LSCh Intermedio",
        quote: "Fernanda es una profesora excelente. Aprendí cultura sorda con una pedagogía muy paciente.",
        rating: 5,
    },
    {
        name: "Gerencia RRHH",
        program: "Corporate",
        quote: "Resultados inmediatos en el equipo de ventas. Gestión impecable y profesionalismo.",
        rating: 5,
    },
];

const RatingStars = ({ count }) => (
    <div className="rating-row">
        {[...Array(5)].map((_, i) => (
            <FaStar key={i} className={i < count ? "star filled" : "star"} />
        ))}
    </div>
);

export default function Home() {
  
  useEffect(() => { window.scrollTo(0,0); }, []);

  return (
    <div className="home-master">
      <style>{css}</style>

      {/* ─────────────────────────────────────────────────────────────
          1. HERO SECTION
         ───────────────────────────────────────────────────────────── */}
      <section className="hero-master">
        <div className="hero-bg-glow"></div>
        <div className="container hero-container">
            
            <div className="hero-badge">
                <span className="pulse-dot"></span> Admisión 2026 Abierta
            </div>

            <h1 className="hero-title">
                Excelencia Académica.<br/>
                <span className="text-gradient-gold">Principios Eternos.</span>
            </h1>

            <p className="hero-subtitle">
                Bienvenido a <strong>Instituto Lael</strong>. Un ecosistema educativo integral donde 
                formamos el intelecto sin descuidar el espíritu. Desde preuniversitario hasta 
                capacitación corporativa.
            </p>

            <div className="hero-buttons">
                <Link to="/inscripcion" className="btn-royal-solid">
                    Postular Ahora
                </Link>
                <Link to="/nosotros" className="btn-royal-outline">
                    <BsPlayCircle className="icon-left"/> Nuestra Visión
                </Link>
            </div>

            {/* Stats Rápidos */}
            <div className="hero-stats-row">
                <div className="h-stat"><strong>+3.000</strong> Alumnos</div>
                <div className="h-sep">/</div>
                <div className="h-stat"><strong>100%</strong> Online</div>
                <div className="h-sep">/</div>
                <div className="h-stat"><strong>4.9/5</strong> Satisfacción</div>
            </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          2. PARTNERS STRIP
         ───────────────────────────────────────────────────────────── */}
      <section className="partners-section">
         <div className="partners-label">Confían en nuestra metodología</div>
         <PartnersMarquee speed={40} height={40} gap={80} />
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. ACADEMIC HUB (BENTO GRID)
         ───────────────────────────────────────────────────────────── */}
      <section className="hub-section">
        <div className="container">
            <div className="section-header">
                <span className="sub-gold">Nuestra Oferta Académica</span>
                <h2>Elige tu camino de crecimiento</h2>
            </div>

            <div className="bento-grid">
                
                {/* A. PAES */}
                <Link to="/paes" className="b-card large paes-theme">
                    <div className="b-bg-icon"><FaBolt/></div>
                    <div className="b-content">
                        <div className="b-tag">Preuniversitario</div>
                        <h3>Preu PAES</h3>
                        <p>El programa insignia. Metodología intensiva, ensayos y tutoría para asegurar tu puntaje.</p>
                        <span className="b-link">Ver Planes <FaArrowRight/></span>
                    </div>
                </Link>

                {/* B. IDIOMAS */}
                <Link to="/idiomas" className="b-card standard">
                    <div className="b-bg-icon"><FaGlobe/></div>
                    <div className="b-content">
                        <div className="b-tag">Global</div>
                        <h3>Idiomas</h3>
                        <p>Inglés y Coreano. Rompe fronteras.</p>
                    </div>
                </Link>

                {/* C. LSCH */}
                <Link to="/lsch" className="b-card standard">
                    <div className="b-bg-icon"><FaHands/></div>
                    <div className="b-content">
                        <div className="b-tag">Inclusión</div>
                        <h3>Lengua de Señas</h3>
                        <p>Cultura sorda y conexión real.</p>
                    </div>
                </Link>

                {/* D. HOMESCHOOL */}
                <Link to="/homeschool" className="b-card wide academy-theme">
                    <div className="b-row">
                        <div>
                            <div className="b-tag gold-text">Refuerzo Escolar</div>
                            <h3>Lael Academy & Homeschool</h3>
                            <p>Tutorías personalizadas y apoyo para exámenes libres.</p>
                        </div>
                        <div className="b-action">
                            <span className="btn-circle">→</span>
                        </div>
                    </div>
                </Link>

            </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. DIVISIÓN CORPORATIVA Y SOCIAL
         ───────────────────────────────────────────────────────────── */}
      <section className="split-section">
        <div className="container split-grid">
            
            {/* EMPRESAS */}
            <Link to="/empresas" className="split-card corporate">
                <div className="sc-overlay"></div>
                <div className="sc-content">
                    <FaBuilding className="sc-icon"/>
                    <h3>Para Empresas</h3>
                    <p>Capacitación corporativa, inglés de negocios y habilidades blandas para equipos de alto rendimiento.</p>
                    <span className="sc-link">Soluciones B2B →</span>
                </div>
            </Link>

            {/* ADULTOS */}
            <Link to="/escuela-adultos" className="split-card social">
                <div className="sc-overlay"></div>
                <div className="sc-content">
                    <IoSchoolOutline className="sc-icon"/>
                    <h3>Nivelación de Estudios</h3>
                    <p>Nunca es tarde. Termina tu 4to medio con nuestro programa 2x1 enfocado en adultos.</p>
                    <span className="sc-link">Ver Programa →</span>
                </div>
            </Link>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          5. TESTIMONIOS (Sustituye a Naamá/Noticias)
         ───────────────────────────────────────────────────────────── */}
      <section className="reviews-section">
        <div className="container">
            <div className="section-header">
                <span className="sub-gold"><FaUserGraduate/> Historias Reales</span>
                <h2>Nuestros alumnos hablan</h2>
            </div>
            <div className="reviews-grid">
                {TESTIMONIALS.map((t, index) => (
                    <div key={index} className="review-card">
                        <div className="rc-top">
                            <FaQuoteLeft className="rc-quote-icon" />
                            <RatingStars count={t.rating} />
                        </div>
                        <p className="rc-text">"{t.quote}"</p>
                        <div className="rc-author">
                            <strong>{t.name}</strong>
                            <small>{t.program}</small>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          6. TALENTO HUMANO (DOCENTES Y TRABAJO)
         ───────────────────────────────────────────────────────────── */}
      <section className="talent-section">
        <div className="container talent-container">
            <div className="talent-content">
                <h2>Mentores, no solo profesores.</h2>
                <p>
                    En Lael, seleccionamos a nuestro equipo no solo por su currículum, 
                    sino por su corazón y capacidad de inspirar a la siguiente generación.
                </p>
                <div className="talent-actions">
                    <Link to="/docentes" className="btn-talent primary">Ver Equipo Docente</Link>
                    <Link to="/trabaja" className="btn-talent secondary">¿Quieres unirte? (Trabaja con nosotros)</Link>
                </div>
            </div>
            
            <div className="talent-features">
                 <div className="tf-item">
                    <FaChalkboardTeacher className="tf-icon"/>
                    <span>Profesionales<br/>Titulados</span>
                 </div>
                 <div className="tf-sep"></div>
                 <div className="tf-item">
                    <HiOutlineUserGroup className="tf-icon"/>
                    <span>Mentoring<br/>1 a 1</span>
                 </div>
            </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          7. FINAL CTA (CONVENIOS & PAGOS)
         ───────────────────────────────────────────────────────────── */}
      <section className="final-master">
        <div className="container fm-content">
            <BsStars className="fm-star"/>
            <h2>¿Listo para dar el siguiente paso?</h2>
            <p>Ya sea que busques un convenio institucional o inscribirte como alumno.</p>
            
            <div className="fm-grid">
                <Link to="/inscripcion" className="fm-card primary">
                    <h3>Inscripción Online</h3>
                    <p>Reserva tu matrícula hoy mismo.</p>
                    <BsArrowRightCircleFill className="fm-arrow"/>
                </Link>

                <Link to="/convenios" className="fm-card secondary">
                    <h3>Convenios</h3>
                    <p>Alianzas para instituciones.</p>
                    <FaUniversity className="fm-icon-sm"/>
                </Link>

                <Link to="/pagos" className="fm-card secondary">
                    <h3>Portal de Pagos</h3>
                    <p>Gestión financiera simple.</p>
                    <span className="fm-small-link">Ir al portal</span>
                </Link>
            </div>
        </div>
      </section>

    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   CSS (Dark Royal Theme - Optimized)
   ────────────────────────────────────────────────────────────────────────── */
const css = `
:root {
  --bg-deep: #020617;
  --bg-panel: #0f172a;
  --bg-card: #1e293b;
  --gold: #fbbf24;
  --gold-dim: #b45309;
  --text-main: #f8fafc;
  --text-muted: #94a3b8;
  --border: rgba(255,255,255,0.08);
}

.home-master { font-family: 'Inter', sans-serif; background-color: var(--bg-deep); color: var(--text-main); overflow-x: hidden; }
.container { max-width: 1100px; margin: 0 auto; padding: 0 20px; }
h1, h2, h3, h4 { font-family: 'Playfair Display', serif; color: white; margin: 0; }
a { text-decoration: none; color: inherit; transition: 0.3s; }
.sub-gold { color: var(--gold); text-transform: uppercase; font-size: 0.8rem; font-weight: 700; letter-spacing: 2px; display: block; margin-bottom: 10px; }

/* 1. HERO MASTER */
.hero-master { position: relative; min-height: 85vh; display: flex; align-items: center; justify-content: center; text-align: center; overflow: hidden; padding-top: 80px; }
.hero-bg-glow { position: absolute; width: 100%; height: 100%; top: 0; left: 0; background: radial-gradient(circle at 50% 30%, #1e3a8a33 0%, var(--bg-deep) 70%); pointer-events: none; }
.hero-container { position: relative; z-index: 2; }

.hero-badge { display: inline-flex; align-items: center; gap: 8px; background: rgba(255,255,255,0.05); border: 1px solid var(--border); padding: 6px 16px; border-radius: 50px; font-size: 0.8rem; margin-bottom: 30px; color: var(--gold); text-transform: uppercase; letter-spacing: 1px; }
.pulse-dot { width: 8px; height: 8px; background: var(--gold); border-radius: 50%; box-shadow: 0 0 10px var(--gold); animation: pulse 2s infinite; }

.hero-title { font-size: clamp(3rem, 6vw, 5rem); line-height: 1.1; margin-bottom: 25px; font-weight: 700; }
.text-gradient-gold { background: linear-gradient(to right, #fff, var(--gold)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
.hero-subtitle { font-size: 1.2rem; color: var(--text-muted); max-width: 700px; margin: 0 auto 40px; line-height: 1.6; }

.hero-buttons { display: flex; gap: 20px; justify-content: center; margin-bottom: 60px; flex-wrap: wrap; }
.btn-royal-solid { background: var(--gold); color: #000; padding: 16px 36px; border-radius: 50px; font-weight: 700; font-size: 1.1rem; box-shadow: 0 0 20px rgba(251, 191, 36, 0.3); }
.btn-royal-solid:hover { transform: scale(1.05); background: white; }
.btn-royal-outline { background: transparent; border: 1px solid rgba(255,255,255,0.2); color: white; padding: 16px 36px; border-radius: 50px; font-weight: 600; display: flex; align-items: center; gap: 10px; }
.btn-royal-outline:hover { border-color: white; background: rgba(255,255,255,0.05); }

.hero-stats-row { display: flex; justify-content: center; gap: 20px; align-items: center; opacity: 0.7; font-size: 0.9rem; letter-spacing: 1px; }
.h-stat strong { color: white; margin-right: 5px; }
.h-sep { color: var(--border); }

/* 2. PARTNERS */
.partners-section { background: #000; padding: 20px 0; border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }
.partners-label { text-align: center; font-size: 0.75rem; text-transform: uppercase; color: var(--text-muted); margin-bottom: 15px; letter-spacing: 2px; }

/* 3. HUB SECTION (BENTO) */
.hub-section { padding: 100px 0; background: var(--bg-deep); }
.section-header { text-align: center; margin-bottom: 60px; }
.section-header h2 { font-size: 2.5rem; }

.bento-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
.b-card { background: var(--bg-panel); border: 1px solid var(--border); border-radius: 20px; padding: 30px; position: relative; overflow: hidden; display: flex; flex-direction: column; justify-content: flex-end; min-height: 280px; transition: 0.3s; }
.b-card:hover { transform: translateY(-5px); border-color: var(--gold); }
.b-bg-icon { position: absolute; top: -10px; right: -10px; font-size: 8rem; opacity: 0.03; transition: 0.5s; color: white; }
.b-card:hover .b-bg-icon { transform: scale(1.1) rotate(5deg); opacity: 0.1; }

.b-content { position: relative; z-index: 2; }
.b-tag { font-size: 0.7rem; text-transform: uppercase; font-weight: 700; color: var(--text-muted); margin-bottom: 10px; letter-spacing: 1px; }
.b-card h3 { font-size: 1.5rem; margin-bottom: 10px; font-family: 'Inter', sans-serif; font-weight: 700; }
.b-card p { font-size: 0.95rem; color: var(--text-muted); line-height: 1.5; margin-bottom: 20px; }
.b-link { font-size: 0.9rem; font-weight: 600; color: var(--gold); display: flex; align-items: center; gap: 5px; }

/* Specific Cards */
.large { grid-column: span 2; background: linear-gradient(145deg, var(--bg-panel), #1e293b); }
.large h3 { font-size: 2rem; }
.paes-theme { border-top: 2px solid var(--gold); }
.wide { grid-column: span 3; padding: 40px; }
.academy-theme { background: #0f172a; }
.b-row { display: flex; justify-content: space-between; align-items: center; width: 100%; }
.gold-text { color: var(--gold); }
.btn-circle { width: 40px; height: 40px; border-radius: 50%; border: 1px solid rgba(255,255,255,0.2); display: flex; align-items: center; justify-content: center; color: white; transition: 0.3s; }
.b-card:hover .btn-circle { background: var(--gold); color: black; border-color: var(--gold); }

@media(max-width: 900px) { .bento-grid { grid-template-columns: 1fr; } .large, .wide { grid-column: span 1; } }

/* 4. SPLIT SECTION */
.split-section { padding: 50px 0 100px; }
.split-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 30px; }
@media(max-width: 800px) { .split-grid { grid-template-columns: 1fr; } }

.split-card { position: relative; height: 350px; border-radius: 20px; overflow: hidden; display: flex; align-items: flex-end; padding: 40px; border: 1px solid var(--border); group; }
.corporate { background: linear-gradient(to top, rgba(0,0,0,0.9), transparent), url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=600'); background-size: cover; }
.social { background: linear-gradient(to top, rgba(0,0,0,0.9), transparent), url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=600'); background-size: cover; }

.sc-content { position: relative; z-index: 2; transition: 0.3s; transform: translateY(10px); }
.split-card:hover .sc-content { transform: translateY(0); }
.sc-icon { font-size: 2rem; color: var(--gold); margin-bottom: 15px; }
.split-card h3 { font-size: 1.8rem; margin-bottom: 10px; }
.split-card p { font-size: 1rem; color: #cbd5e1; margin-bottom: 20px; line-height: 1.5; opacity: 0; transition: 0.3s; height: 0; overflow: hidden; }
.split-card:hover p { opacity: 1; height: auto; margin-bottom: 20px; }
.sc-link { color: var(--gold); font-weight: 700; text-transform: uppercase; font-size: 0.8rem; letter-spacing: 1px; }

/* 5. TESTIMONIOS (Clean Dark) */
.reviews-section { padding: 80px 0; background: var(--bg-panel); border-top: 1px solid var(--border); }
.reviews-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; margin-top: 40px; }
.review-card { background: var(--bg-deep); border: 1px solid var(--border); border-radius: 16px; padding: 30px; transition: 0.3s; }
.review-card:hover { border-color: var(--gold); transform: translateY(-5px); }
.rc-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
.rc-quote-icon { color: var(--gold); font-size: 1.5rem; opacity: 0.5; }
.rating-row { color: var(--gold); font-size: 0.9rem; }
.rc-text { color: var(--text-muted); font-style: italic; line-height: 1.6; margin-bottom: 20px; font-size: 1rem; }
.rc-author strong { display: block; color: white; margin-bottom: 2px; }
.rc-author small { color: var(--text-muted); font-size: 0.8rem; text-transform: uppercase; }

/* 6. TALENT SECTION (Centered) */
.talent-section { padding: 120px 0; background: #000; position: relative; overflow: hidden; text-align: center; }
.talent-container { position: relative; z-index: 2; display: flex; flex-direction: column; align-items: center; gap: 50px; }
.talent-content { max-width: 600px; }
.talent-content h2 { font-size: 3rem; margin-bottom: 20px; }
.talent-content p { color: var(--text-muted); font-size: 1.2rem; margin-bottom: 40px; }
.talent-actions { display: flex; gap: 20px; justify-content: center; flex-wrap: wrap; }

.btn-talent { padding: 12px 30px; border-radius: 50px; font-weight: 600; transition: 0.3s; font-size: 0.95rem; }
.btn-talent.primary { background: white; color: black; }
.btn-talent.primary:hover { background: var(--gold); }
.btn-talent.secondary { border: 1px solid rgba(255,255,255,0.2); color: white; }
.btn-talent.secondary:hover { border-color: white; }

.talent-features { display: flex; gap: 60px; margin-top: 20px; }
.tf-item { text-align: center; }
.tf-icon { font-size: 2.5rem; color: var(--gold); margin-bottom: 10px; display: block; margin-left: auto; margin-right: auto; }
.tf-item span { color: var(--text-muted); font-size: 0.9rem; line-height: 1.4; display: block; }
.tf-sep { width: 1px; background: var(--border); height: 80px; }
@media(max-width: 600px) { .talent-features { flex-direction: column; gap: 30px; } .tf-sep { display: none; } }

/* 7. FINAL MASTER */
.final-master { padding: 100px 0; text-align: center; background: var(--bg-deep); border-top: 1px solid var(--border); }
.fm-star { font-size: 2rem; color: var(--gold); margin-bottom: 20px; }
.fm-content h2 { font-size: 2.8rem; margin-bottom: 15px; }
.fm-content p { color: var(--text-muted); margin-bottom: 50px; font-size: 1.2rem; }

.fm-grid { display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 20px; max-width: 900px; margin: 0 auto; }
@media(max-width: 800px) { .fm-grid { grid-template-columns: 1fr; } }

.fm-card { padding: 30px; border-radius: 16px; display: flex; flex-direction: column; justify-content: center; align-items: center; transition: 0.3s; min-height: 180px; }
.fm-card:hover { transform: translateY(-5px); }
.fm-card.primary { background: var(--gold); color: black; align-items: flex-start; text-align: left; }
.fm-card.primary h3, .fm-card.primary p { color: black; font-family: 'Inter', sans-serif; }
.fm-card.primary h3 { font-size: 1.8rem; font-weight: 800; margin-bottom: 5px; }
.fm-card.primary .fm-arrow { font-size: 2rem; margin-top: 20px; align-self: flex-end; }

.fm-card.secondary { background: var(--bg-panel); border: 1px solid var(--border); color: white; }
.fm-card.secondary:hover { border-color: var(--gold); }
.fm-card.secondary h3 { font-size: 1.2rem; margin-bottom: 5px; font-family: 'Inter', sans-serif; }
.fm-card.secondary p { font-size: 0.9rem; color: var(--text-muted); }
.fm-icon-sm { font-size: 1.5rem; color: var(--gold); margin-top: 15px; }
.fm-small-link { font-size: 0.8rem; text-decoration: underline; margin-top: 15px; color: var(--text-muted); }

@keyframes pulse { 0% { box-shadow: 0 0 0 0 rgba(251, 191, 36, 0.4); } 70% { box-shadow: 0 0 0 10px rgba(251, 191, 36, 0); } 100% { box-shadow: 0 0 0 0 rgba(251, 191, 36, 0); } }
`;