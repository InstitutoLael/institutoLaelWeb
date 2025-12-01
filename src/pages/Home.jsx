// src/pages/Home.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SEOHead from "../components/SEOHead.jsx";
// Si no tienes este componente, coméntalo o pídemelo
import PartnersMarquee from "../components/PartnersMarquee.jsx"; 

// ASSETS (Ajusta las rutas a tus imágenes reales)
import heroBg from "../assets/img/lael/study-online.jpg"; // Una imagen inspiradora general
import id1 from "../assets/img/lael/1.png";
import id3 from "../assets/img/lael/3.png";

/* --------------------------------------------------------------------------
   ICONOS SVG (Minimalistas Premium)
   -------------------------------------------------------------------------- */
const Icons = {
  ArrowRight: () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
  Play: () => <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>,
  CheckCircle: () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
  Users: () => <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  Zap: () => <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  Star: () => <svg width="20" height="20" fill="currentColor" stroke="none" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
};

/* --- COMPONENTES UI --- */
const Typewriter = ({ words }) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  // Efecto de escritura simple
  useEffect(() => {
    if (subIndex === words[index].length + 1 && !reverse) {
      setTimeout(() => setReverse(true), 2000);
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

/* --- Utilidades YouTube --- */
function extractYouTubeId(url) {
  try {
    const u = new URL(url);
    if (u.hostname === "youtu.be") return u.pathname.slice(1);
    if (u.searchParams.get("v")) return u.searchParams.get("v");
    const m = u.pathname.match(/\/embed\/([a-zA-Z0-9_-]{6,})/);
    return m ? m[1] : "";
  } catch { return ""; }
}

function YouTubeBox({ url }) {
  const id = extractYouTubeId(url);
  const src = `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1`;
  return (
    <div className="hero-video-frame">
      <div className="video-glow"></div>
      <iframe
        src={src}
        title="Clase demostrativa Lael"
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}

export default function Home() {
  // Efecto Reveal al hacer scroll
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const videoUrl = "https://youtu.be/THBr7MOVS0s?si=nODyq69xbCt1TqRr";

  return (
    <div className="home-page">
      <SEOHead title="Instituto Lael | Preuniversitario y Cursos Online" description="Prepara la PAES, aprende idiomas o LSCh con metodología probada. Clases en vivo, plataforma 24/7 y profesores que sí explican." path="/" />
      <style>{css}</style>

      {/* --- LUCES AMBIENTALES (El toque premium) --- */}
      <div className="ambient-light hero-light" />
      <div className="ambient-light section-light" />

      {/* --- HERO SECTION --- */}
      <section className="hero-section">
        <div className="container hero-grid">
          <div className="hero-content reveal-on-scroll">
            
            <div className="badge-wrapper">
              <span className="pill-badge">🎓 ADMISIÓN 2026 ABIERTA</span>
            </div>

            <h1 className="hero-title">
              Educación para <br/>
              <Typewriter words={["tu Futuro.", "la PAES.", "el Trabajo.", "la Vida."]} />
            </h1>
            
            <p className="hero-desc">
              Ya sea para la <b>PAES</b>, aprender <b>Idiomas</b> o <b>Lengua de Señas</b>. 
              Olvídate de ser un número más. Aquí te conocemos, te guiamos y celebramos tus logros.
            </p>

            <div className="hero-actions">
              <Link className="btn btn-primary btn-glow" to="/inscripcion">
                Asegurar mi cupo <Icons.ArrowRight />
              </Link>
              <a href="https://wa.me/56964626568" target="_blank" rel="noreferrer" className="btn btn-outline">
                Hablar con un asesor
              </a>
            </div>

            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-val">87%</span>
                <span className="stat-label">Logra su meta</span>
              </div>
              <div className="divider-v"></div>
              <div className="stat-item">
                <span className="stat-val">+11k</span>
                <span className="stat-label">Horas dictadas</span>
              </div>
              <div className="divider-v"></div>
              <div className="stat-item">
                <span className="stat-val">4.9/5</span>
                <span className="stat-label">Valoración</span>
              </div>
            </div>
          </div>

          <div className="hero-media reveal-on-scroll">
            <YouTubeBox url={videoUrl} />
            
            {/* Quick Links Flotantes */}
            <div className="quick-links-card glass-panel">
              <span className="ql-label">Explora rápido:</span>
              <div className="ql-buttons">
                <Link to="/paes" className="ql-btn">PAES</Link>
                <Link to="/idiomas" className="ql-btn">Idiomas</Link>
                <Link to="/lsch" className="ql-btn">LSCh</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- MARQUEE (Tu favorito, intacto pero en mejor contenedor) --- */}
      {/* Si tienes el componente PartnersMarquee, descomenta esto: */}
      {/* <section className="marquee-section">
        <div className="marquee-wrapper">
          <PartnersMarquee speed={35} height={32} gap={60} />
        </div>
      </section> 
      */}

      {/* --- PROGRAMAS (Diseño Glass Cards) --- */}
      <section className="programs-section">
        <div className="container">
          <div className="section-head reveal-on-scroll">
            <h2>Elige tu camino</h2>
            <p>Programas diseñados para resultados reales, no para rellenar horas.</p>
          </div>

          <div className="programs-grid">
            <ProgramCard 
              title="Preu PAES"
              subtitle="Ingreso a la Universidad"
              desc="La preparación más completa. M1, M2, Ciencias, Historia y Lenguaje con ensayos mensuales y tutorías."
              tags={["Ensayos Reales", "Clases Grabadas", "Tutorías"]}
              link="/paes"
              color="indigo"
              icon={<Icons.Zap />}
            />
            <ProgramCard 
              title="Idiomas"
              subtitle="Inglés y Coreano"
              desc="Rompe la barrera del idioma. Metodología comunicativa para que hables desde las primeras semanas."
              tags={["Niveles A1-B2", "Club de Conversación"]}
              link="/idiomas"
              color="green"
              icon={<Icons.Users />}
            />
            <ProgramCard 
              title="Inclusión LSCh"
              subtitle="Lengua de Señas Chilena"
              desc="Aprende a comunicarte con la comunidad sorda. Un curso transformador con enfoque cultural."
              tags={["Certificado", "Profesores Nativos"]}
              link="/lsch"
              color="rose"
              icon={<Icons.Star />}
            />
          </div>
        </div>
      </section>

      {/* --- POR QUÉ ELEGIRNOS (Grid Bento) --- */}
      <section className="features-section">
        <div className="container">
          <div className="bento-grid reveal-on-scroll">
            <div className="bento-item large glass-panel">
              <h3><span className="icon-circle"><Icons.Users/></span> Acompañamiento Real</h3>
              <p>No eres un usuario más. Nuestros tutores monitorean tu asistencia y rendimiento para que no te quedes atrás.</p>
            </div>
            <div className="bento-item glass-panel">
              <h3><span className="icon-circle"><Icons.Play/></span> Todo Grabado</h3>
              <p>¿Faltaste? No importa. Accede a la repetición en Full HD cuando quieras.</p>
            </div>
            <div className="bento-item glass-panel">
              <h3><span className="icon-circle"><Icons.CheckCircle/></span> Sin Letra Chica</h3>
              <p>Matrícula única. Precios transparentes. Sin cláusulas de amarre abusivas.</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- IDENTIDAD (Mejorada) --- */}
      <section className="identity-section">
        <div className="container identity-grid">
          <div className="id-text reveal-on-scroll">
            <span className="pill-badge">NUESTRA ESENCIA</span>
            <h2>Más que un instituto,<br/>una comunidad.</h2>
            <p>
              "Lael" significa <i>perteneciente a Dios</i>. Creemos en la educación con valores, 
              donde la excelencia académica va de la mano con la calidad humana.
            </p>
            <p>
              Aquí encontrarás un ambiente seguro, respetuoso y motivador para alcanzar tus sueños.
            </p>
          </div>
          <div className="id-images reveal-on-scroll">
            <div className="img-card card-1">
              <img src={id1} alt="Estudiantes Lael" />
            </div>
            <div className="img-card card-2">
              <img src={id3} alt="Símbolo Lael" />
            </div>
          </div>
        </div>
      </section>

      {/* --- CTA FINAL --- */}
      <section className="final-cta">
        <div className="container">
          <div className="cta-box glass-panel reveal-on-scroll">
            <div className="cta-content">
              <h2>¿Listo para empezar tu futuro?</h2>
              <p>Las vacantes son limitadas para asegurar la calidad de las clases.</p>
              <div className="cta-buttons">
                <Link to="/inscripcion" className="btn btn-primary btn-lg btn-glow">
                  Inscribirme Ahora
                </Link>
                <a href="https://wa.me/56964626568" target="_blank" rel="noreferrer" className="btn btn-ghost btn-lg">
                  Consultar por WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

/* --------------------------------------------------------------------------
   SUB-COMPONENTES
   -------------------------------------------------------------------------- */
function ProgramCard({ title, subtitle, desc, tags, link, color, icon }) {
  return (
    <Link to={link} className={`program-card accent-${color} reveal-on-scroll`}>
      <div className="card-icon">{icon}</div>
      <div className="card-content">
        <span className="card-subtitle">{subtitle}</span>
        <h3>{title}</h3>
        <p>{desc}</p>
        <div className="card-tags">
          {tags.map((t, i) => <span key={i} className="tag">{t}</span>)}
        </div>
        <div className="card-link">Ver programa →</div>
      </div>
      <div className="card-bg-glow" />
    </Link>
  );
}

/* --------------------------------------------------------------------------
   CSS STYLES (Glassmorphism Dark Theme)
   -------------------------------------------------------------------------- */
const css = `
:root {
  --bg-dark: #050505;
  --bg-panel: #0F1115;
  --primary: #6366f1; /* Indigo */
  --primary-glow: rgba(99, 102, 241, 0.5);
  --text-main: #ffffff;
  --text-muted: #94a3b8;
  --border: rgba(255, 255, 255, 0.08);
  --glass: rgba(255, 255, 255, 0.03);
  --glass-hover: rgba(255, 255, 255, 0.06);
  
  --indigo: #6366f1;
  --green: #10b981;
  --rose: #f43f5e;
}

.home-page {
  background-color: var(--bg-dark);
  color: var(--text-main);
  font-family: 'Inter', system-ui, sans-serif;
  overflow-x: hidden;
  position: relative;
}

.container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
a { text-decoration: none; color: inherit; }

/* AMBIENT LIGHTS */
.ambient-light {
  position: absolute;
  width: 600px; height: 600px;
  border-radius: 50%;
  filter: blur(140px);
  opacity: 0.15;
  pointer-events: none;
  z-index: 0;
}
.hero-light { top: -200px; right: -100px; background: var(--primary); }
.section-light { top: 40%; left: -200px; background: var(--rose); opacity: 0.1; }

/* REVEAL ANIMATION */
.reveal-on-scroll { opacity: 0; transform: translateY(30px); transition: all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1); }
.reveal-on-scroll.visible { opacity: 1; transform: translateY(0); }

/* BUTTONS */
.btn {
  display: inline-flex; align-items: center; justify-content: center; gap: 8px;
  padding: 12px 24px; border-radius: 12px; font-weight: 600; transition: all 0.3s ease;
  cursor: pointer; font-size: 0.95rem;
}
.btn-lg { padding: 16px 32px; font-size: 1.1rem; }
.btn-primary { background: var(--primary); color: white; border: none; }
.btn-glow { box-shadow: 0 0 20px rgba(99, 102, 241, 0.4); }
.btn-glow:hover { box-shadow: 0 0 30px rgba(99, 102, 241, 0.6); transform: translateY(-2px); }
.btn-outline { background: transparent; border: 1px solid var(--border); color: var(--text-main); }
.btn-outline:hover { border-color: var(--primary); background: var(--glass); }
.btn-ghost { background: transparent; border: 1px solid var(--border); color: var(--text-muted); }
.btn-ghost:hover { background: var(--glass); color: white; }

/* HERO SECTION */
.hero-section {
  padding: 80px 0;
  position: relative;
  z-index: 1;
  min-height: 90vh;
  display: flex;
  align-items: center;
}
.hero-grid { display: grid; grid-template-columns: 1fr 0.9fr; gap: 60px; align-items: center; }
@media (max-width: 968px) { 
  .hero-section { padding: 40px 0; text-align: center; min-height: auto; }
  .hero-grid { grid-template-columns: 1fr; gap: 40px; }
  .hero-actions { justify-content: center; }
  .hero-stats { justify-content: center; }
}

.badge-wrapper { margin-bottom: 20px; }
.pill-badge {
  background: rgba(99, 102, 241, 0.1); border: 1px solid rgba(99, 102, 241, 0.3);
  color: #818cf8; padding: 6px 16px; border-radius: 100px; font-size: 0.8rem; font-weight: 700; letter-spacing: 1px;
}

.hero-title {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 800; line-height: 1.1; margin-bottom: 24px; letter-spacing: -0.02em;
}
.text-gradient {
  background: linear-gradient(135deg, #fff 0%, #a5b4fc 100%);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
}

/* TYPEWRITER */
.typewriter { color: var(--primary); display: inline-block; min-width: 200px; text-align: left; }
.cursor { animation: blink 1s step-end infinite; color: var(--text-muted); font-weight: 100; margin-left: 5px; }
@keyframes blink { 50% { opacity: 0; } }

.hero-desc {
  font-size: 1.15rem; color: var(--text-muted); line-height: 1.6; max-width: 540px; margin-bottom: 40px;
}
@media (max-width: 968px) { .hero-desc { margin-left: auto; margin-right: auto; } }

.hero-actions { display: flex; gap: 16px; margin-bottom: 48px; flex-wrap: wrap; }

.hero-stats {
  display: flex; gap: 24px; align-items: center;
  padding-top: 24px; border-top: 1px solid var(--border);
}
.stat-item { display: flex; flex-direction: column; }
.stat-val { font-size: 1.5rem; font-weight: 800; color: white; }
.stat-label { font-size: 0.8rem; color: var(--text-muted); text-transform: uppercase; }
.divider-v { width: 1px; height: 30px; background: var(--border); }

/* HERO MEDIA (VIDEO) */
.hero-video-frame {
  position: relative;
  border-radius: 24px;
  overflow: hidden;
  border: 1px solid var(--border);
  aspect-ratio: 16/9;
  background: #000;
  box-shadow: 0 20px 50px rgba(0,0,0,0.5);
  transform: perspective(1000px) rotateY(-5deg);
  transition: transform 0.5s ease;
}
.hero-video-frame:hover { transform: perspective(1000px) rotateY(0deg); }
.hero-video-frame iframe { width: 100%; height: 100%; border: none; }
.video-glow {
  position: absolute; inset: 0;
  box-shadow: inset 0 0 60px rgba(99, 102, 241, 0.2);
  pointer-events: none; z-index: 2;
}

.quick-links-card {
  margin-top: 24px; padding: 16px 24px; border-radius: 16px;
  display: flex; align-items: center; gap: 16px;
  background: rgba(15, 17, 21, 0.6); backdrop-filter: blur(10px);
  border: 1px solid var(--border);
}
@media (max-width: 968px) { .quick-links-card { flex-direction: column; width: 100%; } }

.ql-label { font-size: 0.9rem; font-weight: 600; color: var(--text-muted); }
.ql-buttons { display: flex; gap: 10px; flex-wrap: wrap; justify-content: center; }
.ql-btn {
  padding: 6px 16px; border-radius: 100px; font-size: 0.85rem; font-weight: 600;
  background: var(--glass); border: 1px solid var(--border); color: white;
  transition: all 0.2s;
}
.ql-btn:hover { background: var(--primary); border-color: var(--primary); }

/* MARQUEE */
.marquee-section { padding: 20px 0; border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); background: #08090c; }
.marquee-wrapper { opacity: 0.7; transition: opacity 0.3s; }
.marquee-wrapper:hover { opacity: 1; }

/* PROGRAMS SECTION */
.programs-section { padding: 100px 0; }
.section-head { text-align: center; margin-bottom: 60px; max-width: 700px; margin-left: auto; margin-right: auto; }
.section-head h2 { font-size: 2.5rem; margin-bottom: 16px; font-weight: 800; }
.section-head p { font-size: 1.1rem; color: var(--text-muted); }

.programs-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; }

.program-card {
  position: relative;
  background: var(--bg-panel);
  border: 1px solid var(--border);
  padding: 32px;
  border-radius: 24px;
  overflow: hidden;
  transition: all 0.4s ease;
  display: flex; flex-direction: column; height: 100%;
}
.program-card:hover { transform: translateY(-10px); border-color: rgba(255,255,255,0.2); }

.card-icon {
  width: 48px; height: 48px; border-radius: 12px;
  display: flex; align-items: center; justify-content: center;
  margin-bottom: 24px; font-size: 1.5rem;
  background: var(--glass); border: 1px solid var(--border);
}
.accent-indigo .card-icon { color: var(--indigo); background: rgba(99, 102, 241, 0.1); }
.accent-green .card-icon { color: var(--green); background: rgba(16, 185, 129, 0.1); }
.accent-rose .card-icon { color: var(--rose); background: rgba(244, 63, 94, 0.1); }

.card-subtitle { font-size: 0.8rem; text-transform: uppercase; font-weight: 700; color: var(--text-muted); letter-spacing: 1px; }
.program-card h3 { font-size: 1.5rem; margin: 8px 0 12px; font-weight: 800; }
.program-card p { font-size: 0.95rem; color: var(--text-muted); line-height: 1.6; margin-bottom: 24px; flex-grow: 1; }

.card-tags { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 24px; }
.tag { font-size: 0.75rem; padding: 4px 10px; border-radius: 6px; background: var(--glass); color: var(--text-muted); }

.card-link { font-weight: 700; font-size: 0.9rem; display: flex; align-items: center; gap: 6px; }
.accent-indigo .card-link { color: var(--indigo); }
.accent-green .card-link { color: var(--green); }
.accent-rose .card-link { color: var(--rose); }

/* BENTO FEATURES */
.features-section { padding: 60px 0; }
.bento-grid { display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 24px; }
@media (max-width: 768px) { .bento-grid { grid-template-columns: 1fr; } }

.glass-panel {
  background: var(--bg-panel); border: 1px solid var(--border);
  padding: 32px; border-radius: 20px;
}
.bento-item h3 { display: flex; align-items: center; gap: 12px; font-size: 1.2rem; margin-bottom: 12px; }
.icon-circle { 
  width: 36px; height: 36px; background: var(--glass); border-radius: 50%; 
  display: flex; align-items: center; justify-content: center; color: var(--primary); 
}
.bento-item p { font-size: 0.95rem; color: var(--text-muted); }

/* IDENTITY SECTION */
.identity-section { padding: 100px 0; position: relative; }
.identity-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; }
@media (max-width: 968px) { .identity-grid { grid-template-columns: 1fr; } }

.id-text h2 { font-size: 2.5rem; margin-bottom: 24px; line-height: 1.1; }
.id-text p { font-size: 1.1rem; color: var(--text-muted); margin-bottom: 20px; line-height: 1.6; }

.id-images { display: grid; grid-template-columns: repeat(12, 1fr); gap: 20px; position: relative; height: 400px; }
.img-card { 
  border-radius: 20px; overflow: hidden; border: 1px solid var(--border);
  box-shadow: 0 20px 40px rgba(0,0,0,0.4);
  position: absolute; transition: transform 0.5s ease;
}
.img-card img { width: 100%; height: 100%; object-fit: cover; display: block; }
.card-1 { width: 60%; height: 80%; top: 0; left: 0; z-index: 1; transform: rotate(-3deg); }
.card-2 { width: 50%; height: 60%; bottom: 0; right: 0; z-index: 2; transform: rotate(3deg); border: 4px solid var(--bg-dark); }
.id-images:hover .card-1 { transform: rotate(-5deg) scale(1.02); }
.id-images:hover .card-2 { transform: rotate(5deg) scale(1.05); }

/* FINAL CTA */
.final-cta { padding: 80px 0 120px; }
.cta-box {
  text-align: center; padding: 60px 20px;
  background: linear-gradient(180deg, var(--bg-panel), #08090c);
  border: 1px solid var(--border);
  position: relative; overflow: hidden;
}
.cta-box::before {
  content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
  background: linear-gradient(90deg, transparent, var(--primary), transparent);
}
.cta-content h2 { font-size: 2.5rem; margin-bottom: 16px; }
.cta-content p { color: var(--text-muted); margin-bottom: 32px; font-size: 1.1rem; }
.cta-buttons { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }

`;