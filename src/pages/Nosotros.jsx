// src/pages/Nosotros.jsx
import { useEffect } from "react";
import { Link } from "react-router-dom";

// --- IMÁGENES (Asegúrate de que estas rutas existan o usa tus nuevas fotos) ---
const HeroImg = new URL("../assets/img/lael/onboarding.jpg", import.meta.url).href;
const StoryImg = new URL("../assets/img/lael/inclusion.jpg", import.meta.url).href;

/* --- SEO COMPONENT --- */
const SEOHead = () => {
  useEffect(() => {
    document.title = "Nuestra Historia | Instituto Lael";
  }, []);
  return null;
};

export default function Nosotros() {
  return (
    <div className="about-page">
      <SEOHead />
      <style>{css}</style>

      {/* --- HERO: MANIFIESTO --- */}
      <header className="manifesto-hero">
        <div className="container">
            <span className="label-top">Nuestra Esencia</span>
            <h1 className="manifesto-title">
                No somos solo un instituto. <br/>
                Somos tu <span className="text-highlight">punto de inflexión.</span>
            </h1>
            <p className="manifesto-lead">
                Nacimos con una obsesión: demostrar que la educación online puede ser 
                <strong> humana, exigente y transformadora</strong>. 
                Dejamos atrás la frialdad de las pantallas para construir una comunidad que aprende, crece y se acompaña.
            </p>
        </div>
        <div className="hero-scroll-indicator">
            <span>Conoce nuestra historia</span>
            <div className="line"></div>
        </div>
      </header>

      {/* --- HISTORIA (TIMELINE VISUAL) --- */}
      <section className="story-section">
        <div className="container story-grid">
            <div className="story-text">
                <h2>De Preu a Instituto</h2>
                <div className="timeline-item">
                    <span className="year">2023</span>
                    <p>
                        Nacemos como <strong>Preu Lael</strong>. Vimos que los estudiantes PAES estaban solos y ansiosos. 
                        Creamos un método basado en el acompañamiento real, no solo en facsímiles.
                    </p>
                </div>
                <div className="timeline-item">
                    <span className="year">2024</span>
                    <p>
                        La comunidad creció. Nos pidieron más. Abrimos <strong>Idiomas</strong> y <strong>Lengua de Señas</strong>, 
                        aplicando la misma filosofía: clases en vivo que sí funcionan.
                    </p>
                </div>
                <div className="timeline-item active">
                    <span className="year">HOY</span>
                    <p>
                        Somos <strong>Instituto Lael</strong>. Un ecosistema educativo integral (Escuela, Empresas, Idiomas) 
                        donde la tecnología sirve a las personas, y no al revés.
                    </p>
                </div>
            </div>
            <div className="story-image">
                <img src={StoryImg} alt="Comunidad Lael" />
                <div className="image-caption">
                    <span>+2.500</span>
                    <small>Estudiantes impactados</small>
                </div>
            </div>
        </div>
      </section>

      {/* --- VALORES (GRID MODERNO) --- */}
      <section className="values-section">
        <div className="container">
            <div className="sec-header">
                <h2>Lo que nos mueve</h2>
                <p>Nuestros pilares no son negociables.</p>
            </div>
            
            <div className="values-grid">
                <div className="value-card">
                    <div className="v-icon">🔥</div>
                    <h3>Excelencia con Propósito</h3>
                    <p>No enseñamos por enseñar. Cada clase tiene un objetivo claro y medible para tu vida.</p>
                </div>
                <div className="value-card">
                    <div className="v-icon">🤝</div>
                    <h3>Acompañamiento Real</h3>
                    <p>Si faltas, te escribimos. Si te cuesta, te ayudamos. Aquí no eres un número de matrícula.</p>
                </div>
                <div className="value-card">
                    <div className="v-icon">🌍</div>
                    <h3>Inclusión Radical</h3>
                    <p>Desde LSCh hasta becas de reinserción. Creemos que el talento está en todas partes.</p>
                </div>
                <div className="value-card">
                    <div className="v-icon">🚀</div>
                    <h3>Innovación Práctica</h3>
                    <p>Usamos tecnología para facilitarte la vida, no para complicártela.</p>
                </div>
            </div>
        </div>
      </section>

      {/* --- EQUIPO / STAFF (TEXTO) --- */}
      <section className="team-text-section">
        <div className="container">
            <div className="team-box">
                <h3>¿Quiénes están detrás?</h3>
                <p>
                    Un equipo multidisciplinario de docentes, psicólogos y profesionales apasionados. 
                    No somos "profes youtubers", somos educadores de carrera comprometidos con tu proceso.
                </p>
                <div className="signatures">
                    <span>Directiva Académica</span>
                    <span>Coordinación Estudiantil</span>
                    <span>Equipo Docente</span>
                </div>
            </div>
        </div>
      </section>

      {/* --- CTA FINAL --- */}
      <section className="cta-final">
        <div className="container cta-content">
            <h2>Sé parte de la nueva educación</h2>
            <p>Ya conoces nuestra historia. Ahora queremos ser parte de la tuya.</p>
            <div className="cta-buttons">
                <Link to="/paes" className="btn-primary">Ver Preu PAES</Link>
                <Link to="/idiomas" className="btn-outline">Ver Idiomas</Link>
                <Link to="/escuela-adultos" className="btn-outline">Escuela Adultos</Link>
            </div>
        </div>
      </section>

    </div>
  );
}

/* ================= CSS (STORYTELLING & ELEGANCE) ================= */
const css = `
:root {
  --bg: #0B1120;
  --bg-card: #151E32;
  --text: #F8FAFC;
  --text-muted: #94A3B8;
  --primary: #3B82F6;
  --gold: #F59E0B;
}

.about-page {
  background-color: var(--bg);
  color: var(--text);
  font-family: 'Inter', system-ui, sans-serif;
  min-height: 100vh;
}

.container { max-width: 1100px; margin: 0 auto; padding: 0 24px; }

/* MANIFESTO HERO */
.manifesto-hero {
  padding: 100px 0 60px;
  text-align: center;
  background: radial-gradient(circle at center, #1e293b 0%, var(--bg) 70%);
  position: relative;
}

.label-top {
  color: var(--gold); text-transform: uppercase; letter-spacing: 3px;
  font-size: 0.8rem; font-weight: 700; margin-bottom: 20px; display: block;
}

.manifesto-title {
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  line-height: 1.1; font-weight: 800; margin-bottom: 30px;
}

.text-highlight {
  background: linear-gradient(120deg, #60A5FA, #A78BFA);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
}

.manifesto-lead {
  font-size: 1.25rem; color: var(--text-muted); line-height: 1.6;
  max-width: 700px; margin: 0 auto 60px;
}
.manifesto-lead strong { color: var(--text); }

.hero-scroll-indicator {
  display: flex; flex-direction: column; align-items: center; gap: 10px;
  font-size: 0.8rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px;
  opacity: 0.7;
}
.hero-scroll-indicator .line {
  width: 1px; height: 40px; background: var(--text-muted);
}

/* STORY SECTION */
.story-section { padding: 80px 0; }
.story-grid {
  display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center;
}
@media (max-width: 900px) { .story-grid { grid-template-columns: 1fr; } }

.story-text h2 { font-size: 2.5rem; margin-bottom: 40px; }

.timeline-item {
  border-left: 2px solid #334155; padding-left: 20px; margin-bottom: 30px; position: relative;
}
.timeline-item::before {
  content: ''; position: absolute; left: -6px; top: 0; width: 10px; height: 10px;
  border-radius: 50%; background: #334155;
}
.timeline-item.active { border-color: var(--primary); }
.timeline-item.active::before { background: var(--primary); box-shadow: 0 0 10px var(--primary); }

.year {
  display: block; font-size: 0.9rem; font-weight: 700; color: var(--text-muted); margin-bottom: 5px;
}
.timeline-item.active .year { color: var(--primary); }
.timeline-item p { font-size: 1.05rem; line-height: 1.5; margin: 0; }

.story-image { position: relative; }
.story-image img {
  width: 100%; border-radius: 20px;
  box-shadow: 20px 20px 0px rgba(59,130,246,0.1);
  filter: grayscale(20%); transition: .3s;
}
.story-image:hover img { filter: grayscale(0%); transform: translate(-5px, -5px); }

.image-caption {
  position: absolute; bottom: 30px; left: -20px;
  background: var(--bg-card); padding: 15px 25px; border-radius: 12px;
  border: 1px solid #334155; box-shadow: 0 10px 30px rgba(0,0,0,0.5);
}
.image-caption span { display: block; font-size: 1.8rem; font-weight: 800; color: var(--gold); }
.image-caption small { font-size: 0.8rem; text-transform: uppercase; letter-spacing: 1px; }

/* VALUES GRID */
.values-section { padding: 80px 0; background: #0F1623; }
.sec-header { text-align: center; margin-bottom: 60px; }
.sec-header h2 { font-size: 2.5rem; margin-bottom: 10px; }
.sec-header p { color: var(--text-muted); font-size: 1.1rem; }

.values-grid {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 30px;
}

.value-card {
  background: var(--bg-card); padding: 30px; border-radius: 20px;
  border: 1px solid rgba(255,255,255,0.05); transition: .3s;
}
.value-card:hover { transform: translateY(-5px); border-color: var(--primary); }

.v-icon { font-size: 2.5rem; margin-bottom: 20px; }
.value-card h3 { font-size: 1.3rem; margin-bottom: 10px; }
.value-card p { color: var(--text-muted); line-height: 1.6; }

/* TEAM TEXT */
.team-text-section { padding: 80px 0; }
.team-box {
  text-align: center; max-width: 800px; margin: 0 auto;
  border: 1px solid #334155; padding: 50px; border-radius: 24px;
  background: radial-gradient(circle at center, #1e293b 0%, #0B1120 100%);
}
.team-box h3 { font-size: 2rem; margin-bottom: 20px; }
.team-box p { font-size: 1.2rem; color: var(--text-muted); margin-bottom: 30px; }
.signatures {
  display: flex; justify-content: center; gap: 30px; flex-wrap: wrap;
  font-family: serif; font-style: italic; color: var(--gold); font-size: 1.1rem;
}

/* CTA FINAL */
.cta-final { padding: 80px 0; text-align: center; }
.cta-content h2 { font-size: 2.5rem; margin-bottom: 15px; }
.cta-content p { font-size: 1.2rem; color: var(--text-muted); margin-bottom: 40px; }

.cta-buttons { display: flex; gap: 20px; justify-content: center; flex-wrap: wrap; }
.btn-primary {
  background: var(--primary); color: white; padding: 14px 32px; border-radius: 50px;
  font-weight: 700; text-decoration: none; transition: .2s;
}
.btn-primary:hover { background: #2563EB; transform: translateY(-3px); }
.btn-outline {
  background: transparent; color: white; border: 1px solid #334155;
  padding: 14px 32px; border-radius: 50px; font-weight: 700; text-decoration: none; transition: .2s;
}
.btn-outline:hover { border-color: var(--text); background: rgba(255,255,255,0.05); }
`;