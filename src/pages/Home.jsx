// src/pages/Home.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SEOHead from "../components/SEOHead.jsx";
// Asegúrate de tener este componente, si no, comenta la línea
import PartnersMarquee from "../components/PartnersMarquee.jsx"; 

// ASSETS (Ajusta las rutas a tus imágenes reales)
import heroVideoPoster from "../assets/img/lael/study-online.jpg"; 
import id1 from "../assets/img/lael/1.png";
import id3 from "../assets/img/lael/3.png";

/* --------------------------------------------------------------------------
   ICONOS SVG (Estilo Bold)
   -------------------------------------------------------------------------- */
const Icons = {
  Arrow: () => <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>,
  Star: () => <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>,
  Bolt: () => <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>,
  Globe: () => <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
  Hand: () => <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0"/><path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2"/><path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/></svg>
};

/* --- COMPONENTE TYPEWRITER --- */
const Typewriter = ({ words }) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [blink, setBlink] = useState(true);

  // Blinking cursor
  useEffect(() => {
    const timeout2 = setTimeout(() => setBlink((prev) => !prev), 500);
    return () => clearTimeout(timeout2);
  }, [blink]);

  // Typing logic
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

/* --- MAIN --- */
export default function Home() {
  return (
    <div className="home-v2">
      <SEOHead title="Instituto Lael | El Futuro de la Educación" description="Formación online de alto nivel." />
      <style>{css}</style>

      {/* --- HERO CINEMÁTICO --- */}
      <section className="hero-cinema">
        <div className="glow-spot top-left"></div>
        <div className="glow-spot bottom-right"></div>
        
        <div className="container hero-content">
            <div className="badge-glass">✨ Admisión 2026 Abierta</div>
            <h1 className="hero-title">
                Aprendizaje que <br/>
                <Typewriter words={["Transforma.", "Conecta.", "Impulsa.", "Funciona."]} />
            </h1>
            <p className="hero-sub">
                Somos el punto de encuentro entre tecnología y humanidad. 
                Prepara la PAES, domina idiomas o certifícate profesionalmente.
            </p>
            <div className="hero-btns">
                <Link to="/inscripcion" className="btn-main">
                    Empezar Ahora <Icons.Arrow />
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

      {/* --- MARQUEE DE PARTNERS --- */}
      <section className="marquee-section">
        <div className="marquee-label">Confían en nosotros:</div>
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
                
                {/* PAES (Grande) */}
                <Link to="/paes" className="bento-card large paes">
                    <div className="card-bg-icon"><Icons.Bolt /></div>
                    <div className="card-info">
                        <span className="card-tag">Preuniversitario</span>
                        <h3>Preu PAES</h3>
                        <p>El programa más completo. Ensayos, clases en vivo y tutoría personalizada.</p>
                        <span className="link-arrow">Ver Planes →</span>
                    </div>
                </Link>

                {/* IDIOMAS */}
                <Link to="/idiomas" className="bento-card medium lang">
                    <div className="card-bg-icon"><Icons.Globe /></div>
                    <div className="card-info">
                        <span className="card-tag">Global</span>
                        <h3>Idiomas</h3>
                        <p>Inglés, Coreano y más. Habla desde el día 1.</p>
                    </div>
                </Link>

                {/* LSCh */}
                <Link to="/lsch" className="bento-card medium lsch">
                    <div className="card-bg-icon"><Icons.Hand /></div>
                    <div className="card-info">
                        <span className="card-tag">Inclusión</span>
                        <h3>Lengua de Señas</h3>
                        <p>Cultura sorda y comunicación real.</p>
                    </div>
                </Link>

                {/* EMPRESAS */}
                <Link to="/empresas" className="bento-card wide corporate">
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
                <Link to="/escuela-adultos" className="bento-card wide adults">
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

      {/* --- PROMO ACADEMY (FIXED) --- */}
      <section className="academy-promo">
        <div className="container promo-inner">
            <div className="promo-txt">
                <span className="promo-badge">NUEVO LANZAMIENTO</span>
                <h2>¿Necesitas un refuerzo puntual?</h2>
                <p>Presentamos <strong>Lael Academy</strong>. Packs de tutorías 1 a 1 para salvar el semestre escolar o preparar un examen específico.</p>
                <Link to="/homeschool" className="btn-white">Explorar Tutorías</Link>
            </div>
            
            <div className="promo-visual">
                {/* Círculos decorativos */}
                <div className="circle c1"></div>
                <div className="circle c2"></div>
                
                {/* TARJETA CORREGIDA: FONDO OSCURO Y TEXTO BLANCO */}
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
                <Link to="/inscripcion" className="cta-box primary">
                    <h3>Inscripción Online</h3>
                    <p>Reserva tu cupo en 2 minutos.</p>
                    <span className="arr">→</span>
                </Link>
                <a href="https://wa.me/56964626568" target="_blank" rel="noreferrer" className="cta-box secondary">
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

/* ================= CSS (FUTURISTIC DARK PREMIUM) ================= */
const css = `
:root {
  --bg-deep: #050505;
  --bg-surface: #0F1115;
  --bg-card: #141414;
  --text-main: #FFFFFF;
  --text-muted: #A1A1AA;
  --primary: #6366F1;
  --accent: #F59E0B;
  --gradient-main: linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%);
  --border: rgba(255,255,255,0.08);
}

.home-v2 {
  background-color: var(--bg-deep);
  color: var(--text-main);
  font-family: 'Inter', system-ui, sans-serif;
  overflow-x: hidden;
}

.container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
a { text-decoration: none; color: inherit; }

/* HERO CINEMÁTICO */
.hero-cinema {
    position: relative; min-height: 85vh; display: flex; align-items: center; justify-content: center;
    text-align: center; overflow: hidden; padding-top: 80px;
}

.glow-spot {
    position: absolute; width: 600px; height: 600px; border-radius: 50%; filter: blur(120px); opacity: 0.15; pointer-events: none;
}
.top-left { top: -200px; left: -100px; background: var(--primary); }
.bottom-right { bottom: -200px; right: -100px; background: var(--accent); }

.badge-glass {
    display: inline-block; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
    padding: 8px 16px; border-radius: 50px; font-size: 0.85rem; font-weight: 600; margin-bottom: 24px;
    backdrop-filter: blur(10px); color: #c7d2fe; letter-spacing: 1px; text-transform: uppercase;
}

.hero-title {
    font-size: clamp(3.5rem, 7vw, 5.5rem); font-weight: 800; line-height: 1.05; margin-bottom: 24px; letter-spacing: -0.03em;
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
@media (max-width: 600px) { .hero-stats-glass { flex-direction: column; gap: 15px; width: 100%; } .sep { display: none; } }

.stat strong { font-size: 1.8rem; display: block; color: var(--text-main); }
.stat span { font-size: 0.8rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px; }
.sep { width: 1px; height: 40px; background: var(--border); }

/* MARQUEE SECTION (NUEVO) */
.marquee-section { 
    border-top: 1px solid var(--border); border-bottom: 1px solid var(--border);
    background: #08090c; padding: 20px 0; text-align: center;
}
.marquee-label { 
    font-size: 0.75rem; text-transform: uppercase; color: var(--text-muted); 
    margin-bottom: 15px; letter-spacing: 2px; font-weight: 700;
}
.marquee-wrapper { opacity: 0.7; transition: opacity 0.3s; }
.marquee-wrapper:hover { opacity: 1; }

/* BENTO GRID */
.hub-section { padding: 100px 0; }
.sec-head { text-align: center; margin-bottom: 60px; }
.sec-head h2 { font-size: 2.5rem; margin-bottom: 10px; font-weight: 700; }
.sec-head p { color: var(--text-muted); font-size: 1.2rem; }

.bento-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, 280px); /* Altura fija para alineación perfecta */
    gap: 24px;
}
@media (max-width: 900px) { .bento-grid { grid-template-columns: 1fr; grid-template-rows: auto; } }

.bento-card {
    background: var(--bg-card); border: 1px solid var(--border); border-radius: 30px;
    position: relative; overflow: hidden; padding: 32px; display: flex; flex-direction: column;
    justify-content: flex-end; transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    box-shadow: 0 4px 20px rgba(0,0,0,0.2);
}
.bento-card:hover { transform: translateY(-8px); border-color: rgba(255,255,255,0.2); box-shadow: 0 20px 40px rgba(0,0,0,0.4); }

.card-bg-icon {
    position: absolute; top: -20px; right: -20px; font-size: 12rem; opacity: 0.05;
    transition: transform 0.5s ease; color: #fff;
}
.bento-card:hover .card-bg-icon { transform: scale(1.1) rotate(5deg); opacity: 0.1; }

.card-info { position: relative; z-index: 2; }
.card-tag { font-size: 0.75rem; text-transform: uppercase; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 8px; letter-spacing: 1px; }
.bento-card h3 { font-size: 1.8rem; margin-bottom: 8px; font-weight: 700; }
.bento-card p { font-size: 1rem; color: var(--text-muted); line-height: 1.5; margin-bottom: 20px; }
.link-arrow { color: var(--primary); font-weight: 700; font-size: 0.9rem; }

/* Grid Areas */
.large.paes { 
    grid-column: 1 / 3; grid-row: 1 / 3; 
    background: radial-gradient(circle at 100% 0%, #1e1b4b, var(--bg-card));
}
.large.paes h3 { font-size: 2.5rem; }
.medium.lang { grid-column: 3 / 4; grid-row: 1 / 2; }
.medium.lsch { grid-column: 3 / 4; grid-row: 2 / 3; }

/* Filas inferiores */
.wide { grid-column: span 3; height: auto; padding: 40px; }
@media (min-width: 900px) { 
    .wide.corporate { grid-column: 1 / 3; }
    .wide.adults { grid-column: 3 / 4; }
}
.card-info.row { display: flex; justify-content: space-between; align-items: center; width: 100%; }
@media (max-width: 600px) { .card-info.row { flex-direction: column; align-items: flex-start; gap: 20px; } }

.btn-small { background: rgba(255,255,255,0.1); border: 1px solid var(--border); color: #fff; padding: 10px 20px; border-radius: 50px; font-weight: 600; font-size: 0.9rem; }
.bento-card:hover .btn-small { background: #fff; color: #000; }

/* ACADEMY PROMO */
.academy-promo { margin: 60px 0; padding: 0 20px; }
.promo-inner {
    background: linear-gradient(90deg, #0F172A, #1e1b4b);
    border: 1px solid var(--border); border-radius: 40px; padding: 80px;
    display: flex; align-items: center; justify-content: space-between;
    position: relative; overflow: hidden;
}
@media (max-width: 900px) { .promo-inner { flex-direction: column; text-align: center; gap: 50px; padding: 40px; } }

.promo-badge { background: var(--accent); color: #000; font-weight: 800; font-size: 0.75rem; padding: 4px 12px; border-radius: 4px; margin-bottom: 20px; display: inline-block; }
.promo-txt h2 { font-size: 2.5rem; margin-bottom: 15px; }
.promo-txt p { font-size: 1.2rem; color: var(--text-muted); margin-bottom: 30px; max-width: 500px; }
.btn-white { background: #fff; color: #000; padding: 14px 32px; border-radius: 50px; font-weight: 700; display: inline-block; transition: .2s; }
.btn-white:hover { transform: scale(1.05); }

.promo-visual { position: relative; width: 200px; height: 200px; display: flex; justify-content: center; align-items: center; }
.circle { position: absolute; border-radius: 50%; border: 1px solid rgba(255,255,255,0.1); }
.c1 { width: 100%; height: 100%; animation: spin 20s linear infinite; }
.c2 { width: 70%; height: 70%; border-style: dashed; animation: spin 10s linear infinite reverse; }

/* --- CORRECCIÓN CSS TARJETA FLOTANTE --- */
.promo-card-float { 
    background: #1f2937; /* Fondo Gris Oscuro Sólido */
    border: 1px solid rgba(255,255,255,0.1);
    padding: 20px 30px; 
    border-radius: 20px; 
    text-align: center; 
    z-index: 2;
    transform: rotate(-5deg); 
    transition: .3s;
    box-shadow: 0 20px 40px rgba(0,0,0,0.4);
}
/* Aseguramos que el texto sea blanco */
.promo-card-float strong {
    display: block;
    color: #ffffff;
    font-size: 1.1rem;
    margin-bottom: 4px;
}
/* Efecto Hover */
.promo-inner:hover .promo-card-float { 
    transform: rotate(0deg) scale(1.1); 
    background: #000000;
    border-color: var(--primary);
}

.emoji { font-size: 2rem; display: block; margin-bottom: 5px; }

/* FINAL CTA */
.final-cta { padding: 100px 0; text-align: center; }
.final-cta h2 { font-size: 3rem; margin-bottom: 60px; line-height: 1.1; }
.cta-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 30px; max-width: 800px; margin: 0 auto; }
@media (max-width: 700px) { .cta-grid { grid-template-columns: 1fr; } }

.cta-box {
    padding: 40px; border-radius: 30px; text-align: left; position: relative; transition: .3s;
    display: flex; flex-direction: column; justify-content: space-between; height: 200px;
}
.cta-box.primary { background: var(--text-main); color: #000; }
.cta-box.secondary { background: #1a1a1a; border: 1px solid var(--border); color: #fff; }

.cta-box h3 { font-size: 1.8rem; margin-bottom: 10px; }
.cta-box .arr { font-size: 2rem; align-self: flex-end; }
.cta-box:hover { transform: translateY(-10px); }

@keyframes blink { 50% { opacity: 0; } }
@keyframes spin { to { transform: rotate(360deg); } }
`;