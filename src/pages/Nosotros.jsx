import { useEffect } from "react";
import { Link } from "react-router-dom";

/* ──────────────────────────────────────────────────────────────────────────
   1. ICONOS SVG (Estilo Pluma / Editorial)
   ────────────────────────────────────────────────────────────────────────── */
const Icons = {
  QuoteBig: () => (
    <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor" style={{opacity:0.05, position:'absolute', top:-20, left:20, pointerEvents:'none'}}>
      <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM5.0166 21L5.0166 18C5.0166 16.8954 5.91203 16 7.0166 16H10.0166C10.5689 16 11.0166 15.5523 11.0166 15V9C11.0166 8.44772 10.5689 8 10.0166 8H6.0166C5.46432 8 5.0166 8.44772 5.0166 9V11C5.0166 11.5523 4.56889 12 4.0166 12H3.0166V15C13.0166 18.3137 10.3303 21 7.0166 21H5.0166Z" />
    </svg>
  ),
  Heart: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
  Star: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  Hand: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 19a4 4 0 0 0 8 0v-6a4 4 0 0 0-8 0v6Z"/><path d="M11 13V9a4 4 0 0 0-8 0v4"/><path d="M7 13v6a4 4 0 0 0 4 4"/></svg>,
  Sparkle: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" /></svg>
};

/* ──────────────────────────────────────────────────────────────────────────
   2. ESTILOS CSS - "GOLDEN HERITAGE"
   ────────────────────────────────────────────────────────────────────────── */
const css = `
:root {
  --bg-deep: #0f172a;       /* Slate 900 */
  --bg-panel: #1e293b;      /* Slate 800 */
  --gold: #fbbf24;          /* Amber 400 */
  --gold-glow: rgba(251, 191, 36, 0.25);
  --text-main: #f8fafc;
  --text-muted: #94a3b8;
  --border: rgba(255,255,255,0.08);
  --font-serif: 'Playfair Display', serif; /* Si no carga, usa serif por defecto */
  --font-sans: 'Inter', system-ui, sans-serif;
}

.about-page {
  background-color: var(--bg-deep);
  color: var(--text-main);
  font-family: var(--font-sans);
  min-height: 100vh;
  overflow-x: hidden;
  position: relative;
}

.container { max-width: 1000px; margin: 0 auto; padding: 0 24px; }

/* ORBS BACKGROUND */
.orb {
  position: absolute; border-radius: 50%; filter: blur(100px); opacity: 0.15; z-index: 0; pointer-events: none;
}
.orb-gold { width: 400px; height: 400px; top: 10%; right: -100px; background: var(--gold); }
.orb-blue { width: 500px; height: 500px; bottom: 20%; left: -200px; background: #3b82f6; opacity: 0.1; }

/* HERO SECTION */
.hero-section {
  padding: 160px 0 80px; text-align: center; position: relative; z-index: 1;
}
.label-pill {
  display: inline-block; padding: 6px 16px; border: 1px solid var(--gold-glow);
  background: rgba(251, 191, 36, 0.05); color: var(--gold); border-radius: 50px;
  font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 2px;
  margin-bottom: 24px;
}
.hero-title {
  font-size: clamp(2.5rem, 5vw, 4.5rem); font-weight: 800; line-height: 1.1; margin-bottom: 24px;
}
.text-gold { color: var(--gold); position: relative; display: inline-block; }
.text-gold::after {
  content: ''; position: absolute; bottom: 5px; left: 0; width: 100%; height: 8px;
  background: var(--gold); opacity: 0.2; z-index: -1; transform: skewX(-10deg);
}
.hero-desc {
  font-size: 1.25rem; color: var(--text-muted); max-width: 650px; margin: 0 auto; line-height: 1.6;
}

/* MEANING CARD */
.meaning-wrapper { padding: 40px 0 80px; position: relative; z-index: 1; }
.meaning-card {
  background: rgba(30, 41, 59, 0.6); backdrop-filter: blur(12px);
  border: 1px solid var(--border); border-top: 1px solid rgba(255,255,255,0.15);
  border-radius: 30px; padding: 60px 40px; text-align: center;
  position: relative; overflow: hidden;
  box-shadow: 0 20px 40px -10px rgba(0,0,0,0.3);
  transition: transform 0.3s;
}
.meaning-card:hover { transform: translateY(-5px); border-color: var(--gold-glow); }

.hebrew-text {
  font-family: 'Times New Roman', serif; font-size: clamp(4rem, 8vw, 6rem);
  background: linear-gradient(180deg, #fff 0%, #94a3b8 100%);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  line-height: 1; margin-bottom: 10px; display: block;
}
.phonetic { 
  font-family: monospace; color: var(--gold); letter-spacing: 2px; font-size: 1rem; opacity: 0.9; 
}
.divider { width: 40px; height: 2px; background: var(--border); margin: 30px auto; }
.meaning-desc { font-size: 1.2rem; color: var(--text-muted); font-style: italic; max-width: 500px; margin: 0 auto; }

/* TIMELINE */
.timeline-section { padding: 80px 0; position: relative; z-index: 1; }
.section-title { font-size: 2rem; text-align: center; margin-bottom: 60px; font-weight: 700; }

.timeline-track {
  border-left: 2px solid var(--border); margin-left: 50%; transform: translateX(-1px);
  padding: 20px 0; position: relative;
}
@media (max-width: 768px) { .timeline-track { margin-left: 20px; border-left: 2px solid var(--border); } }

.t-event {
  position: relative; width: 50%; padding: 0 40px; margin-bottom: 60px;
}
.t-event:nth-child(even) { left: 50%; }
.t-event:nth-child(odd) { left: 0; text-align: right; }

@media (max-width: 768px) {
  .t-event { width: 100%; left: 0 !important; padding-left: 50px; padding-right: 0; text-align: left !important; }
}

.t-dot {
  position: absolute; top: 0; width: 20px; height: 20px; border-radius: 50%;
  background: var(--bg-deep); border: 2px solid var(--gold);
  box-shadow: 0 0 15px var(--gold-glow); z-index: 2;
}
.t-event:nth-child(odd) .t-dot { right: -11px; }
.t-event:nth-child(even) .t-dot { left: -11px; }
@media (max-width: 768px) { .t-dot { left: -30px !important; right: auto !important; } }

.t-year {
  font-size: 3rem; font-weight: 800; color: rgba(255,255,255,0.05);
  position: absolute; top: -30px; line-height: 1; pointer-events: none;
}
.t-event:nth-child(odd) .t-year { right: 40px; }
.t-event:nth-child(even) .t-year { left: 40px; }
@media (max-width: 768px) { .t-year { left: 50px !important; right: auto !important; } }

.t-card {
  background: var(--bg-panel); border: 1px solid var(--border); border-radius: 16px; padding: 24px;
  position: relative; transition: 0.3s;
}
.t-card:hover { border-color: var(--gold); box-shadow: 0 10px 30px -10px rgba(0,0,0,0.5); }

/* FOUNDER LETTER */
.founder-section { padding: 100px 0; background: linear-gradient(180deg, rgba(15,23,42,0) 0%, rgba(15,23,42,1) 100%); position: relative; }
.paper-card {
  background: #182030; max-width: 750px; margin: 0 auto; padding: 60px;
  border-radius: 2px; position: relative; border: 1px solid var(--border);
  box-shadow: 0 20px 50px rgba(0,0,0,0.3);
}
.quote-text {
  font-family: var(--font-serif); font-size: 1.5rem; line-height: 1.8; color: #e2e8f0; position: relative; z-index: 1;
}
.founder-info {
  margin-top: 30px; padding-top: 20px; border-top: 1px solid var(--border);
  display: flex; justify-content: space-between; align-items: center;
}
.signature { font-family: 'Cursive', cursive; font-size: 1.5rem; color: var(--gold); transform: rotate(-5deg); }

/* VALUES GRID */
.values-section { padding: 60px 0 120px; position: relative; z-index: 1; }
.val-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px; }
.val-box {
  background: rgba(30, 41, 59, 0.4); border: 1px solid var(--border); padding: 30px; border-radius: 20px;
  transition: 0.3s; text-align: center;
}
.val-box:hover { background: rgba(30, 41, 59, 0.8); border-color: var(--text-muted); transform: translateY(-5px); }
.val-icon-wrap {
  width: 50px; height: 50px; margin: 0 auto 20px; background: rgba(251, 191, 36, 0.1);
  color: var(--gold); border-radius: 12px; display: flex; align-items: center; justify-content: center;
}

/* CTA */
.cta-wrapper { text-align: center; margin-bottom: 80px; }
.btn-gold {
  background: var(--gold); color: #0f172a; font-weight: 800; padding: 16px 40px; border-radius: 50px;
  font-size: 1.1rem; box-shadow: 0 0 20px var(--gold-glow); transition: 0.3s; display: inline-block;
}
.btn-gold:hover { transform: scale(1.05); box-shadow: 0 0 40px var(--gold-glow); background: #fcd34d; }

@media (max-width: 600px) {
  .paper-card { padding: 30px 20px; }
  .quote-text { font-size: 1.2rem; }
  .hebrew-text { font-size: 3.5rem; }
}
`;

export default function Nosotros() {
  
  useEffect(() => {
    document.title = "Nuestra Esencia | Instituto Lael";
    window.scrollTo(0,0);
  }, []);

  return (
    <div className="about-page">
      <style>{css}</style>
      
      {/* ORBS */}
      <div className="orb orb-gold" />
      <div className="orb orb-blue" />

      {/* HERO */}
      <section className="hero-section">
        <div className="container">
          <span className="label-pill">Nuestra Historia</span>
          <h1 className="hero-title">
            Un origen de <br/>
            <span className="text-gold">Gratitud Pura.</span>
          </h1>
          <p className="hero-desc">
            En tiempos de incertidumbre, elegimos servir. <br/>
            Lo que comenzó como ayuda gratuita en pandemia, hoy es una misión de vida.
          </p>
        </div>
      </section>

      {/* MEANING */}
      <section className="meaning-wrapper container">
        <div className="meaning-card">
          <span className="hebrew-text">לָאֵל</span>
          <span className="phonetic">/la·el/</span>
          <div className="divider" />
          <p className="meaning-desc">
            Del hebreo: <strong>"Perteneciente a Dios"</strong>.<br/>
            Este nombre no es casualidad; es nuestro recordatorio diario de que este proyecto tiene un dueño y un propósito superior: servir con excelencia.
          </p>
        </div>
      </section>

      {/* TIMELINE (ALTERNADA) */}
      <section className="timeline-section">
        <div className="container">
          <h2 className="section-title">El Camino Recorrido</h2>
          
          <div className="timeline-track">
            
            <div className="t-event">
              <div className="t-dot" />
              <span className="t-year">2020</span>
              <div className="t-card">
                <h3 style={{color:'white', marginBottom:'10px', fontSize:'1.3rem'}}>La Semilla</h3>
                <p style={{color:'var(--text-muted)', fontSize:'0.95rem', lineHeight:'1.6'}}>
                  <strong>Diego Chaparro</strong> siente el llamado de retribuir. En plena pandemia, comienza a dar clases particulares gratuitas. Sin marca, sin precio, solo con el deseo de ayudar.
                </p>
              </div>
            </div>

            <div className="t-event">
              <div className="t-dot" />
              <span className="t-year">2021</span>
              <div className="t-card">
                <h3 style={{color:'white', marginBottom:'10px', fontSize:'1.3rem'}}>Nace Preu Lael</h3>
                <p style={{color:'var(--text-muted)', fontSize:'0.95rem', lineHeight:'1.6'}}>
                  La comunidad crece. Se formaliza el proyecto enfocado en vencer el miedo al futuro universitario, no solo en obtener puntajes.
                </p>
              </div>
            </div>

            <div className="t-event">
              <div className="t-dot" />
              <span className="t-year">2024</span>
              <div className="t-card">
                <h3 style={{color:'white', marginBottom:'10px', fontSize:'1.3rem'}}>Expansión Total</h3>
                <p style={{color:'var(--text-muted)', fontSize:'0.95rem', lineHeight:'1.6'}}>
                  Integramos las escuelas de <strong>Idiomas</strong> y <strong>Lengua de Señas</strong>. Entendemos que la comunicación es la llave maestra de la inclusión.
                </p>
              </div>
            </div>

            <div className="t-event">
              <div className="t-dot" />
              <span className="t-year">2025</span>
              <div className="t-card">
                <h3 style={{color:'white', marginBottom:'10px', fontSize:'1.3rem'}}>Ciclo Completo</h3>
                <p style={{color:'var(--text-muted)', fontSize:'0.95rem', lineHeight:'1.6'}}>
                  Lanzamiento de la nivelación de estudios para adultos. Ahora servimos a todas las etapas de la vida académica.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FOUNDER LETTER */}
      <section className="founder-section">
        <div className="container">
          <div className="paper-card">
            <Icons.QuoteBig />
            <p className="quote-text">
              "Lael no es solo un instituto, es mi forma de decir 'Gracias'. 
              Ver a alguien superar el miedo a las matemáticas o aprender a comunicarse con señas 
              me recuerda por qué empezamos en esa habitación en 2020. 
              Aquí nadie es un número, todos tienen un propósito."
            </p>
            <div className="founder-info">
              <div>
                <strong style={{display:'block', fontSize:'1.1rem', color:'white'}}>Diego Chaparro</strong>
                <span style={{fontSize:'0.85rem', color:'var(--text-muted)', textTransform:'uppercase', letterSpacing:'1px'}}>Fundador & Director</span>
              </div>
              <div className="signature">Diego Ch.</div>
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="values-section container">
        <h2 className="section-title" style={{fontSize:'1.8rem', marginBottom:'40px'}}>Nuestros Pilares</h2>
        <div className="val-grid">
          <div className="val-box">
            <div className="val-icon-wrap"><Icons.Hand /></div>
            <h3 style={{color:'white', marginBottom:'10px'}}>Servicio Genuino</h3>
            <p style={{color:'var(--text-muted)', fontSize:'0.9rem'}}>No enseñamos para lucrar, lucramos para seguir sirviendo. El alumno siempre es el centro.</p>
          </div>
          <div className="val-box">
            <div className="val-icon-wrap"><Icons.Sparkle /></div>
            <h3 style={{color:'white', marginBottom:'10px'}}>Gratitud Activa</h3>
            <p style={{color:'var(--text-muted)', fontSize:'0.9rem'}}>Damos lo mejor en cada clase porque valoramos profundamente la oportunidad de enseñar.</p>
          </div>
          <div className="val-box">
            <div className="val-icon-wrap"><Icons.Star /></div>
            <h3 style={{color:'white', marginBottom:'10px'}}>Excelencia</h3>
            <p style={{color:'var(--text-muted)', fontSize:'0.9rem'}}>Que sea accesible no significa que sea "barato". Aspiramos a la calidad mundial.</p>
          </div>
        </div>

        <div className="cta-wrapper">
          <Link to="/contacto" className="btn-gold">
            Ser parte de Lael →
          </Link>
        </div>
      </section>

    </div>
  );
}