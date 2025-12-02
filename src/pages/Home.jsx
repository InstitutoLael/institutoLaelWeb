// src/pages/Home.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SEOHead from "../components/SEOHead.jsx";
import PartnersMarquee from "../components/PartnersMarquee.jsx"; 
import { FaBolt, FaGlobe, FaHands, FaArrowRight, FaQuoteLeft, FaStar, FaUserGraduate, FaDove } from "react-icons/fa";
import { GiOlive } from "react-icons/gi"; // Icono de Rama de Olivo (opcional, o usar FaLeaf)

/* --------------------------------------------------------------------------
   DATOS DE TESTIMONIOS
   -------------------------------------------------------------------------- */
const TESTIMONIALS = [
    {
        name: "Javier M.",
        program: "PAES Matemáticas",
        quote: "Pasé de tener 450 puntos en Matemáticas a 810. La tutoría personalizada de Diego Chaparro fue increíble. Se enfocan en entender, no solo en memorizar.",
        rating: 5,
    },
    {
        name: "Daniela R.",
        program: "LSCh Nivel Intermedio",
        quote: "Fernanda es una profesora sorda nativa excelente. Aprendí cultura y lengua de señas con una pedagogía muy paciente y didáctica. 100% recomendado.",
        rating: 5,
    },
    {
        name: "Sebastián V.",
        program: "Inglés Corporate",
        quote: "Contratamos el plan de capacitación para el equipo de ventas y los resultados fueron inmediatos. Lael es profesional y se adapta a las necesidades B2B.",
        rating: 4,
    },
];

/* --- COMPONENTE TYPEWRITER --- */
const Typewriter = ({ words }) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    if (subIndex === words[index].length + 1 && !reverse) {
      setTimeout(() => setReverse(true), 2500);
      return;
    }
    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }
    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, Math.max(reverse ? 50 : 100, parseInt(Math.random() * 50)));
    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, words]);

  return <span className="typewriter">{words[index].substring(0, subIndex)}<span className="cursor">|</span></span>;
};

/* --- COMPONENTE RATING STAR --- */
const RatingStars = ({ count }) => (
    <div className="rating">
        {[...Array(5)].map((_, i) => (
            <FaStar key={i} className={i < count ? "star filled" : "star"} aria-hidden="true" />
        ))}
    </div>
);


export default function Home() {
  return (
    <div className="home-v2">
      <SEOHead title="Instituto Lael | Educación con Propósito" description="Formación online de alto nivel bajo principios sólidos. Prepara la PAES, domina idiomas y certifícate profesionalmente." />
      <style>{css}</style>

      {/* --- HERO CINEMÁTICO --- */}
      <section className="hero-cinema">
        <div className="glow-spot top-left"></div>
        <div className="glow-spot bottom-right"></div>
        
        <div className="container hero-content">
            <div className="badge-glass" role="status">✨ Admisión 2026 Abierta</div>
            <h1 className="hero-title">
                Aprendizaje que <br/>
                <Typewriter words={["Transforma.", "Conecta.", "Trasciende.", "Funciona."]} />
            </h1>
            <p className="hero-sub">
                Somos el punto de encuentro entre excelencia académica y principios sólidos. 
                Educación con propósito para un mundo que necesita líderes.
            </p>
            <div className="hero-btns">
                <Link to="/inscripcion" className="btn-main">
                    Empezar Ahora <FaArrowRight />
                </Link>
                <Link to="/nosotros" className="btn-sec">
                    Ver Manifiesto
                </Link>
            </div>

            {/* Stats Flotantes */}
            <div className="hero-stats-glass">
                <div className="stat">
                    <strong>+3k</strong>
                    <span>Alumnos</span>
                </div>
                <div className="sep"></div>
                <div className="stat">
                    <strong>98%</strong>
                    <span>Aprobación</span>
                </div>
                <div className="sep"></div>
                <div className="stat">
                    <strong>100%</strong>
                    <span>Online</span>
                </div>
            </div>
        </div>
      </section>

      {/* --- NUEVA SECCIÓN: SIGNIFICADO LAEL (IDENTITY) --- */}
      <section className="meaning-section">
        <div className="container meaning-grid">
            <div className="meaning-text">
                <span className="tiny-label">Nuestra Identidad</span>
                <h2>Más que un nombre,<br/>una declaración.</h2>
                <p className="meaning-desc">
                    El nombre <strong>Lael</strong> (לָאֵל) tiene origen hebreo y significa <em>"Perteneciente a Dios"</em>. 
                    Aparece en el libro de Números (3:24) y refleja que todo lo que hacemos está bajo una cobertura y dirección superior.
                </p>
                <div className="meaning-list">
                    <div className="m-item">
                        <div className="m-icon"><FaDove/></div>
                        <div>
                            <strong>Paz y Nuevo Comienzo</strong>
                            <p>Como la paloma que anunció el fin del diluvio, creemos en las segundas oportunidades a través de la educación.</p>
                        </div>
                    </div>
                    <div className="m-item">
                        <div className="m-icon"><GiOlive/></div>
                        <div>
                            <strong>Excelencia y Fruto</strong>
                            <p>Buscamos que cada estudiante dé fruto en su vida profesional y personal.</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="meaning-visual">
                <div className="lael-card-glass">
                    <div className="hebrew-text">לָאֵל</div>
                    <div className="phonetic">/la·el/</div>
                    <div className="definition">
                        1. adj. Perteneciente a Dios.<br/>
                        2. m. Consagrado al propósito divino.
                    </div>
                    <div className="card-decoration"></div>
                </div>
            </div>
        </div>
      </section>

      {/* --- MARQUEE DE PARTNERS --- */}
      <section className="marquee-section">
        <div className="marquee-label">Nuestros aliados estratégicos:</div>
        <div className="marquee-wrapper">
            <PartnersMarquee speed={35} height={32} gap={60} />
        </div>
      </section>

      {/* --- BENTO GRID (El Hub) --- */}
      <section className="hub-section">
        <div className="container">
            <div className="sec-head">
                <h2>Explora nuestros mundos</h2>
                <p>Cada programa es un ecosistema diseñado para tu éxito.</p>
            </div>

            <div className="bento-grid">
                
                {/* PAES */}
                <Link to="/paes" className="bento-card large paes" aria-label="Explorar Preu PAES">
                    <div className="card-bg-icon"><FaBolt /></div>
                    <div className="card-info">
                        <span className="card-tag">Preuniversitario</span>
                        <h3>Preu PAES</h3>
                        <p>El programa más completo. Ensayos, clases en vivo y tutoría personalizada.</p>
                        <span className="link-arrow">Ver Planes <FaArrowRight/></span>
                    </div>
                </Link>

                {/* IDIOMAS */}
                <Link to="/idiomas" className="bento-card medium lang" aria-label="Explorar Cursos de Idiomas">
                    <div className="card-bg-icon"><FaGlobe /></div>
                    <div className="card-info">
                        <span className="card-tag">Global</span>
                        <h3>Idiomas</h3>
                        <p>Inglés, Coreano y más. Habla desde el día 1.</p>
                    </div>
                </Link>

                {/* LSCh */}
                <Link to="/lsch" className="bento-card medium lsch" aria-label="Explorar Lengua de Señas Chilena">
                    <div className="card-bg-icon"><FaHands /></div>
                    <div className="card-info">
                        <span className="card-tag">Inclusión</span>
                        <h3>Lengua de Señas</h3>
                        <p>Cultura sorda y comunicación real.</p>
                    </div>
                </Link>

                {/* EMPRESAS */}
                <Link to="/empresas" className="bento-card wide corporate" aria-label="Lael Corporate: Capacitación para empresas">
                    <div className="card-info row">
                        <div>
                            <span className="card-tag">B2B</span>
                            <h3>Lael Corporate</h3>
                            <p>Capacitación para equipos de alto rendimiento.</p>
                        </div>
                        <button className="btn-small">Cotizar</button>
                    </div>
                </Link>

                {/* ADULTOS */}
                <Link to="/escuela-adultos" className="bento-card wide adults" aria-label="Escuela de Adultos: Nivelación de Estudios">
                    <div className="card-info row">
                        <div>
                            <span className="card-tag">Impacto Social</span>
                            <h3>Nivelación de Estudios</h3>
                            <p>Termina tu 4to medio con dignidad y tecnología.</p>
                        </div>
                        <button className="btn-small">Ver Becas</button>
                    </div>
                </Link>

            </div>
        </div>
      </section>

      {/* --- TESTIMONIOS DE ALUMNOS --- */}
      <section className="testimonials-section">
        <div className="container">
            <div className="sec-head">
                <span className="tag-line"><FaUserGraduate/> Historias de Éxito</span>
                <h2>Más de 3.000 alumnos <br/>respaldan nuestro método.</h2>
            </div>
            <div className="testimonials-grid">
                {TESTIMONIALS.map((t, index) => (
                    <article key={index} className="testimonial-card">
                        <FaQuoteLeft className="quote-icon" />
                        <RatingStars count={t.rating} />
                        <p className="quote">{t.quote}</p>
                        <div className="author-info">
                            <strong>{t.name}</strong>
                            <small className="program-tag">{t.program}</small>
                        </div>
                    </article>
                ))}
            </div>
        </div>
      </section>

      {/* --- PROMO ACADEMY --- */}
      <section className="academy-promo">
        <div className="container promo-inner">
            <div className="promo-txt">
                <span className="promo-badge">NUEVO LANZAMIENTO</span>
                <h2>¿Necesitas un refuerzo puntual?</h2>
                <p>Presentamos <strong>Lael Academy</strong>. Packs de tutorías 1 a 1 para salvar el semestre escolar o preparar un examen específico.</p>
                <Link to="/homeschool" className="btn-white">Explorar Tutorías</Link>
            </div>
            
            <div className="promo-visual">
                <div className="circle c1"></div>
                <div className="circle c2"></div>
                
                <div className="promo-card-float">
                    <span className="emoji">👩‍🏫</span>
                    <strong>Profe Particular</strong>
                    <small style={{ color: '#94a3b8' }}>A un click de distancia</small> 
                </div>
            </div>
        </div>
      </section>

      {/* --- CTA FINAL --- */}
      <section className="final-cta">
        <div className="container">
            <h2>No dejes para mañana <br/>lo que puedes aprender hoy.</h2>
            <div className="cta-grid">
                <Link to="/inscripcion" className="cta-box primary" aria-label="Ir a Inscripción Online">
                    <h3>Inscripción Online</h3>
                    <p>Reserva tu cupo en 2 minutos.</p>
                    <span className="arr">→</span>
                </Link>
                <a href="https://wa.me/56964626568" target="_blank" rel="noreferrer" className="cta-box secondary" aria-label="Hablar con Admisión por WhatsApp">
                    <h3>Hablar con Admisión</h3>
                    <p>Resolvemos tus dudas por WhatsApp.</p>
                    <span className="arr">💬</span>
                </a>
            </div>
        </div>
      </section>

    </div>
  );
}

/* ================= CSS (FINAL WORLD CLASS) ================= */
const css = `
:root {
  --bg-deep: #050505;
  --bg-card: #141414;
  --text-main: #FFFFFF;
  --text-muted: #A1A1AA;
  --primary: #6366F1; /* Azul/Violeta */
  --accent: #F59E0B; /* Naranja/Dorado */
  --gradient-main: linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%);
  --border: rgba(255,255,255,0.08);
}

.home-v2 {
  background-color: var(--bg-deep);
  color: var(--text-main);
  font-family: 'Plus Jakarta Sans', 'Inter', sans-serif;
  overflow-x: hidden;
  width: 100%;
}

.container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
a { text-decoration: none; color: inherit; }

/* HERO CINEMÁTICO */
.hero-cinema {
    position: relative; min-height: 85vh; display: flex; align-items: center; justify-content: center;
    text-align: center; overflow: hidden; padding: 120px 0 80px;
}
.glow-spot {
    position: absolute; width: 600px; height: 600px; border-radius: 50%; filter: blur(120px); opacity: 0.15; pointer-events: none;
    z-index: 0;
}
.top-left { top: -200px; left: -100px; background: var(--primary); }
.bottom-right { bottom: -200px; right: -100px; background: var(--accent); }

.badge-glass {
    display: inline-block; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
    padding: 8px 16px; border-radius: 50px; font-size: 0.85rem; font-weight: 600; margin-bottom: 24px;
    backdrop-filter: blur(10px); color: #c7d2fe; letter-spacing: 1px; text-transform: uppercase;
}

.hero-title {
    font-size: clamp(2.8rem, 8vw, 5.5rem); font-weight: 800; line-height: 1.05; margin-bottom: 24px; letter-spacing: -0.03em;
}
.typewriter {
    background: var(--gradient-main); -webkit-background-clip: text; -webkit-text-fill-color: transparent;
}
.cursor { color: var(--text-muted); font-weight: 100; animation: blink 1s infinite; }

.hero-sub {
    font-size: 1.25rem; color: var(--text-muted); max-width: 600px; margin: 0 auto 40px; line-height: 1.6;
}

.hero-btns { display: flex; gap: 16px; justify-content: center; margin-bottom: 60px; flex-wrap: wrap; }
.btn-main {
    background: var(--text-main); color: #000; padding: 16px 32px; border-radius: 100px;
    font-weight: 700; font-size: 1.1rem; display: flex; align-items: center; gap: 10px;
    transition: transform 0.2s; box-shadow: 0 0 30px rgba(255,255,255,0.15);
}
.btn-main:hover { transform: scale(1.05); }
.btn-sec {
    background: rgba(255,255,255,0.05); color: #fff; padding: 16px 32px; border-radius: 100px;
    font-weight: 600; border: 1px solid rgba(255,255,255,0.1); transition: background 0.2s;
}
.btn-sec:hover { background: rgba(255,255,255,0.1); }

.hero-stats-glass {
    display: inline-flex; gap: 40px; padding: 20px 40px; border-radius: 20px;
    background: rgba(15, 17, 21, 0.6); border: 1px solid var(--border); backdrop-filter: blur(12px);
}
@media (max-width: 768px) { 
    .hero-stats-glass { flex-direction: row; gap: 20px; width: 100%; box-sizing: border-box; justify-content: space-around; } 
    .sep { display: none; } 
    .hero-title { font-size: 2.5rem; }
}

.stat strong { font-size: 1.8rem; display: block; color: var(--text-main); }
.stat span { font-size: 0.8rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px; }
.sep { width: 1px; height: 40px; background: var(--border); }

/* --- MEANING SECTION (NUEVA) --- */
.meaning-section {
    padding: 100px 0;
    background: linear-gradient(180deg, var(--bg-deep) 0%, #0a0a0c 100%);
    position: relative;
}
.meaning-grid {
    display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center;
}
@media (max-width: 900px) { .meaning-grid { grid-template-columns: 1fr; text-align: center; } .meaning-list { text-align: left; } }

.tiny-label { font-size: 0.8rem; text-transform: uppercase; color: var(--accent); letter-spacing: 2px; font-weight: 700; display: block; margin-bottom: 10px; }
.meaning-text h2 { font-size: 3rem; line-height: 1.1; margin-bottom: 20px; font-weight: 800; }
.meaning-desc { font-size: 1.1rem; color: var(--text-muted); line-height: 1.7; margin-bottom: 30px; }
.meaning-desc strong { color: white; }
.meaning-desc em { color: var(--primary); font-style: normal; font-weight: 600; }

.meaning-list { display: flex; flex-direction: column; gap: 20px; }
.m-item { display: flex; gap: 15px; align-items: flex-start; }
.m-icon { 
    min-width: 40px; height: 40px; border-radius: 50%; background: rgba(99, 102, 241, 0.1); 
    color: var(--primary); display: flex; align-items: center; justify-content: center; font-size: 1.2rem;
}
.m-item strong { display: block; font-size: 1rem; color: white; margin-bottom: 4px; }
.m-item p { font-size: 0.9rem; color: var(--text-muted); line-height: 1.4; margin: 0; }

/* Tarjeta Hebrea Visual */
.lael-card-glass {
    background: rgba(255,255,255,0.03); border: 1px solid var(--border);
    border-radius: 24px; padding: 50px; text-align: center;
    position: relative; overflow: hidden;
    backdrop-filter: blur(10px);
    transition: transform 0.3s;
}
.lael-card-glass:hover { transform: translateY(-5px); border-color: var(--accent); }
.hebrew-text { font-size: 5rem; font-weight: 800; color: var(--text-main); margin-bottom: 10px; font-family: 'Times New Roman', serif; }
.phonetic { font-size: 1.2rem; color: var(--accent); font-family: monospace; margin-bottom: 20px; letter-spacing: 2px; }
.definition { font-size: 0.95rem; color: var(--text-muted); line-height: 1.8; border-top: 1px solid var(--border); padding-top: 20px; display: inline-block; text-align: left; }
.card-decoration {
    position: absolute; top: 0; left: 0; width: 100%; height: 5px;
    background: linear-gradient(90deg, var(--primary), var(--accent));
}

/* MARQUEE */
.marquee-section { 
    border-top: 1px solid var(--border); border-bottom: 1px solid var(--border);
    background: #08090c; padding: 20px 0; text-align: center;
}
.marquee-label { font-size: 0.75rem; text-transform: uppercase; color: var(--text-muted); margin-bottom: 15px; letter-spacing: 2px; font-weight: 700; }
.marquee-wrapper { opacity: 0.8; }

/* BENTO GRID */
.hub-section { padding: 100px 0; }
.sec-head { text-align: center; margin-bottom: 60px; }
.sec-head h2 { font-size: 2.5rem; margin-bottom: 10px; font-weight: 700; }
.sec-head p { color: var(--text-muted); font-size: 1.2rem; }

.bento-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, 280px);
    gap: 24px;
}
.bento-card {
    background: var(--bg-card); border: 1px solid var(--border); border-radius: 30px;
    position: relative; overflow: hidden; padding: 32px; display: flex; flex-direction: column;
    justify-content: flex-end; transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.bento-card:hover { transform: translateY(-8px); border-color: var(--primary); box-shadow: 0 10px 20px rgba(99, 102, 241, 0.2); }
.card-bg-icon {
    position: absolute; top: -20px; right: -20px; font-size: 12rem; opacity: 0.05;
    transition: transform 0.5s ease; color: #fff;
}
.bento-card:hover .card-bg-icon { transform: scale(1.1) rotate(5deg); opacity: 0.15; }
.card-info { position: relative; z-index: 2; }
.card-tag { font-size: 0.75rem; text-transform: uppercase; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 8px; letter-spacing: 1px; }
.bento-card h3 { font-size: 1.8rem; margin-bottom: 8px; font-weight: 700; }
.bento-card p { font-size: 1rem; color: var(--text-muted); line-height: 1.5; margin-bottom: 20px; }
.link-arrow { color: var(--primary); font-weight: 700; font-size: 0.9rem; display: flex; align-items: center; gap: 5px; }

/* Grid Desktop */
.large.paes { grid-column: 1 / 3; grid-row: 1 / 3; background: radial-gradient(circle at 100% 0%, #1e1b4b, var(--bg-card)); }
.large.paes h3 { font-size: 2.5rem; }
.medium.lang { grid-column: 3 / 4; grid-row: 1 / 2; }
.medium.lsch { grid-column: 3 / 4; grid-row: 2 / 3; }
.wide.corporate { grid-column: 1 / 3; padding: 40px; }
.wide.adults { grid-column: 3 / 4; padding: 40px; }
@media (min-width: 901px) { .wide { grid-column: span 3; } }
.card-info.row { display: flex; justify-content: space-between; align-items: center; width: 100%; }
.btn-small { background: rgba(255,255,255,0.1); border: 1px solid var(--border); color: #fff; padding: 10px 20px; border-radius: 50px; font-weight: 600; font-size: 0.9rem; transition: background 0.2s; }
.btn-small:hover { background: rgba(255,255,255,0.2); }

@media (max-width: 900px) {
    .bento-grid { grid-template-columns: 1fr; grid-template-rows: auto; gap: 20px; }
    .large.paes, .medium.lang, .medium.lsch, .wide.corporate, .wide.adults { grid-column: 1 / -1 !important; grid-row: auto !important; min-height: 250px; }
    .card-info.row { flex-direction: column; align-items: flex-start; gap: 15px; }
    .btn-small { width: 100%; }
}

/* TESTIMONIOS */
.testimonials-section { padding: 80px 0; background: var(--bg-card); border-top: 1px solid var(--border); }
.tag-line { color: var(--accent); font-weight: 700; font-size: 0.9rem; display: flex; align-items: center; justify-content: center; gap: 8px; margin-bottom: 10px; }
.testimonials-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; margin-top: 50px; }
.testimonial-card { background: var(--bg-deep); border: 1px solid var(--border); border-radius: 20px; padding: 30px; box-shadow: 0 10px 25px rgba(0,0,0,0.3); }
.quote-icon { font-size: 1.8rem; color: var(--primary); margin-bottom: 15px; }
.rating { color: var(--accent); margin-bottom: 15px; }
.star { margin-right: 2px; }
.star.filled { color: var(--accent); }
.quote { font-size: 1.1rem; color: var(--text-main); line-height: 1.6; margin-bottom: 20px; font-style: italic; }
.author-info strong { display: block; font-weight: 800; margin-bottom: 4px; }
.program-tag { color: var(--text-muted); font-size: 0.8rem; }

/* PROMO SECTION */
.academy-promo { margin: 60px 0; padding: 0 20px; }
.promo-inner { background: linear-gradient(90deg, #0F172A, #1e1b4b); border: 1px solid var(--border); border-radius: 40px; padding: 80px; display: flex; align-items: center; justify-content: space-between; position: relative; overflow: hidden; }
@media (max-width: 900px) { .promo-inner { flex-direction: column; text-align: center; gap: 50px; padding: 40px; } .promo-visual { margin-top: 30px; } }
.promo-badge { background: var(--accent); color: #000; font-weight: 800; font-size: 0.75rem; padding: 4px 12px; border-radius: 4px; margin-bottom: 20px; display: inline-block; }
.promo-txt h2 { font-size: 2.5rem; margin-bottom: 15px; }
.promo-txt p { font-size: 1.2rem; color: var(--text-muted); margin-bottom: 30px; max-width: 500px; }
.btn-white { background: #fff; color: #000; padding: 14px 32px; border-radius: 50px; font-weight: 700; display: inline-block; transition: .2s; }
.btn-white:hover { transform: scale(1.05); }
.promo-visual { position: relative; width: 200px; height: 200px; display: flex; justify-content: center; align-items: center; }
.circle { position: absolute; border-radius: 50%; border: 1px solid rgba(255,255,255,0.1); }
.c1 { width: 100%; height: 100%; animation: spin 20s linear infinite; }
.c2 { width: 70%; height: 70%; border-style: dashed; animation: spin 10s linear infinite reverse; }
.promo-card-float { background: #1f2937; border: 1px solid rgba(255,255,255,0.1); padding: 20px 30px; border-radius: 20px; text-align: center; z-index: 2; transform: rotate(-5deg); transition: .3s; box-shadow: 0 20px 40px rgba(0,0,0,0.4); }
.promo-card-float strong { display: block; color: #ffffff; font-size: 1.1rem; margin-bottom: 4px; }
.emoji { font-size: 2rem; display: block; margin-bottom: 5px; }

/* CTA FINAL */
.final-cta { padding: 100px 0; text-align: center; }
.final-cta h2 { font-size: 3rem; margin-bottom: 60px; line-height: 1.1; }
.cta-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 30px; max-width: 800px; margin: 0 auto; }
@media (max-width: 700px) { .cta-grid { grid-template-columns: 1fr; } }
.cta-box { padding: 40px; border-radius: 30px; text-align: left; position: relative; transition: .3s; display: flex; flex-direction: column; justify-content: space-between; height: 200px; }
.cta-box.primary { background: var(--text-main); color: #000; }
.cta-box.secondary { background: #1a1a1a; border: 1px solid var(--border); color: #fff; }
.cta-box h3 { font-size: 1.8rem; margin-bottom: 10px; }
.cta-box .arr { font-size: 2rem; align-self: flex-end; }
.cta-box:hover { transform: translateY(-10px); }

@keyframes blink { 50% { opacity: 0; } }
@keyframes spin { to { transform: rotate(360deg); } }
`;