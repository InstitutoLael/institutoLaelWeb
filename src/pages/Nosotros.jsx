import { useEffect } from "react";
import { Link } from "react-router-dom";

/* ──────────────────────────────────────────────────────────────────────────
   1. ICONOS SVG (Minimalistas y Elegantes)
   ────────────────────────────────────────────────────────────────────────── */
const Icons = {
  Quote: () => <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" style={{opacity:0.2}}><path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM5.0166 21L5.0166 18C5.0166 16.8954 5.91203 16 7.0166 16H10.0166C10.5689 16 11.0166 15.5523 11.0166 15V9C11.0166 8.44772 10.5689 8 10.0166 8H6.0166C5.46432 8 5.0166 8.44772 5.0166 9V11C5.0166 11.5523 4.56889 12 4.0166 12H3.0166V5H13.0166V15C13.0166 18.3137 10.3303 21 7.0166 21H5.0166Z" /></svg>,
  Heart: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
  Star: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  Hand: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 19a4 4 0 0 0 8 0v-6a4 4 0 0 0-8 0v6Z"/><path d="M11 13V9a4 4 0 0 0-8 0v4"/><path d="M7 13v6a4 4 0 0 0 4 4"/></svg>
};

/* ──────────────────────────────────────────────────────────────────────────
   2. ESTILOS CSS
   ────────────────────────────────────────────────────────────────────────── */
const css = `
:root {
  --bg-deep: #0B1120;
  --bg-panel: #111827;
  --gold: #F59E0B;
  --gold-dim: rgba(245, 158, 11, 0.1);
  --text-main: #F8FAFC;
  --text-muted: #94A3B8;
  --border: rgba(255,255,255,0.06);
  --font-sans: 'Plus Jakarta Sans', 'Inter', system-ui, sans-serif;
}

.about-page {
  background-color: var(--bg-deep); color: var(--text-main); font-family: var(--font-sans);
  min-height: 100vh; overflow-x: hidden;
}
.container { max-width: 900px; margin: 0 auto; padding: 0 24px; }

/* HERO */
.manifesto-section {
  padding: 140px 0 60px; text-align: center;
  background: radial-gradient(circle at 50% 0%, rgba(30, 41, 59, 0.5), transparent 70%);
}
.manifesto-label {
  font-size: 0.75rem; letter-spacing: 3px; text-transform: uppercase; color: var(--gold); 
  font-weight: 700; display: block; margin-bottom: 20px;
}
.manifesto-title {
  font-size: clamp(2.5rem, 5vw, 4rem); font-weight: 800; margin-bottom: 25px; 
  line-height: 1.1; letter-spacing: -0.02em;
}
.manifesto-text {
  font-size: 1.2rem; color: var(--text-muted); line-height: 1.7; 
  max-width: 680px; margin: 0 auto;
}

/* SECTION: EL SIGNIFICADO DE LAEL */
.meaning-card {
  margin: 40px auto 80px; max-width: 600px;
  background: linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0) 100%);
  border: 1px solid var(--border); border-top: 1px solid rgba(255,255,255,0.15);
  border-radius: 24px; padding: 40px; text-align: center;
  position: relative; overflow: hidden;
}
.hebrew { 
  font-family: serif; font-size: 3.5rem; color: var(--text-main); line-height: 1; margin-bottom: 5px; 
}
.phonetic { 
  font-family: monospace; color: var(--gold); font-size: 0.9rem; margin-bottom: 20px; display: block; 
}
.definition { 
  font-size: 1.1rem; color: var(--text-muted); font-style: italic; 
}
.definition strong { color: white; font-weight: 600; font-style: normal; }

/* TIMELINE COMPACTO */
.timeline-section { padding: 40px 0 80px; }
.timeline-header { text-align: center; margin-bottom: 50px; }
.timeline-header h2 { font-size: 2rem; font-weight: 700; margin-bottom: 10px; }

.timeline-list {
  border-left: 2px solid var(--border); margin-left: 20px; padding-bottom: 20px;
}
.t-item {
  position: relative; padding-left: 40px; margin-bottom: 50px;
}
.t-item:last-child { margin-bottom: 0; }
.t-dot {
  position: absolute; left: -9px; top: 0; width: 16px; height: 16px;
  background: var(--bg-deep); border: 2px solid var(--text-muted); border-radius: 50%;
  transition: .3s;
}
.t-item:hover .t-dot { border-color: var(--gold); background: var(--gold); box-shadow: 0 0 10px var(--gold); }

.t-year { 
  font-size: 0.85rem; font-weight: 800; color: var(--gold); margin-bottom: 5px; 
  text-transform: uppercase; letter-spacing: 1px; display: inline-block;
}
.t-content h3 { font-size: 1.4rem; color: white; margin: 5px 0 10px; font-weight: 700; }
.t-content p { font-size: 1rem; color: var(--text-muted); line-height: 1.6; }

/* Highlight Box para el origen */
.origin-box {
  background: var(--gold-dim); border: 1px solid rgba(245, 158, 11, 0.2);
  padding: 25px; border-radius: 12px; margin-top: 15px;
}

/* VALORES */
.values-grid { 
  display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); 
  gap: 20px; padding: 80px 0; border-top: 1px solid var(--border); 
}
.val-card {
  padding: 25px; background: var(--bg-panel); border-radius: 16px; border: 1px solid var(--border);
}
.val-card h3 { font-size: 1.1rem; font-weight: 700; margin: 15px 0 10px; display: flex; align-items: center; gap: 10px; }
.val-icon { color: var(--gold); }
.val-card p { font-size: 0.9rem; color: var(--text-muted); line-height: 1.5; }

/* CARTA DEL DIRECTOR (SIN FOTO) */
.letter-section { 
  padding: 80px 0; background: linear-gradient(180deg, var(--bg-deep) 0%, #0d121c 100%);
  border-top: 1px solid var(--border);
}
.letter-container {
  max-width: 700px; margin: 0 auto; text-align: center;
  background: rgba(255,255,255,0.02); border: 1px solid var(--border);
  padding: 60px 40px; border-radius: 24px; position: relative;
}
.letter-quote { 
  font-size: 1.4rem; font-style: italic; line-height: 1.6; color: var(--text-main); margin-bottom: 30px; 
}
.letter-sign { 
  border-top: 1px solid var(--border); display: inline-block; padding-top: 20px; margin-top: 20px; 
}
.letter-name { display: block; font-size: 1.1rem; font-weight: 800; color: white; }
.letter-role { font-size: 0.85rem; color: var(--gold); text-transform: uppercase; letter-spacing: 1px; }

/* CTA */
.cta-box { text-align: center; padding: 80px 0; }
.cta-btn {
  background: var(--text-main); color: var(--bg-deep); padding: 14px 32px; border-radius: 50px;
  font-weight: 700; text-decoration: none; transition: .3s; display: inline-block; margin-top: 30px;
}
.cta-btn:hover { transform: scale(1.05); }

@media (max-width: 600px) {
  .manifesto-title { font-size: 2.2rem; }
  .hebrew { font-size: 2.5rem; }
  .letter-container { padding: 40px 20px; }
  .letter-quote { font-size: 1.1rem; }
}
`;

const SEOHead = () => {
  useEffect(() => { document.title = "Nuestra Esencia | Instituto Lael"; }, []);
  return null;
};

/* ──────────────────────────────────────────────────────────────────────────
   4. COMPONENTE PRINCIPAL
   ────────────────────────────────────────────────────────────────────────── */
export default function Nosotros() {
  
  return (
    <div className="about-page">
      <SEOHead />
      <style>{css}</style>

      {/* --- HERO --- */}
      <header className="manifesto-section">
        <div className="container">
            <span className="manifesto-label">Nuestra Historia</span>
            <h1 className="manifesto-title">
                Todo comenzó con un <br/>
                acto de <span style={{color:'var(--gold)'}}>gratitud.</span>
            </h1>
            <p className="manifesto-text">
                En medio de la incertidumbre, decidimos que el conocimiento no podía detenerse. 
                Lo que empezó como un servicio en pandemia, hoy es una misión de vida.
            </p>
        </div>
      </header>

      {/* --- SECCIÓN: EL SIGNIFICADO DE LAEL (NUEVO) --- */}
      <section className="container">
        <div className="meaning-card">
            <div className="hebrew">לָאֵל</div>
            <span className="phonetic">/la·el/ • Hebreo</span>
            <p className="definition">
                Significa <strong>"Perteneciente a Dios"</strong>. <br/>
                Es un recordatorio constante de que este proyecto tiene un dueño y un propósito superior: servir con excelencia.
            </p>
        </div>
      </section>

      {/* --- TIMELINE COMPACTO (LOGBOOK) --- */}
      <section className="timeline-section">
        <div className="container">
            <div className="timeline-header">
                <h2>El Camino Recorrido</h2>
            </div>
            
            <div className="timeline-list">
                
                {/* 2020 */}
                <div className="t-item">
                    <div className="t-dot"></div>
                    <span className="t-year">2020</span>
                    <div className="t-content">
                        <h3>La Semilla: Retribuir lo recibido</h3>
                        <div className="origin-box">
                            <p>
                                <strong>Diego Chaparro:</strong> "En plena pandemia, sentí el llamado de retribuir la gracia que Dios me había dado en mis estudios. Comencé a dar clases particulares gratuitas y accesibles. No era un negocio, era pura gratitud convertida en servicio."
                            </p>
                        </div>
                    </div>
                </div>

                {/* 2021 */}
                <div className="t-item">
                    <div className="t-dot"></div>
                    <span className="t-year">2021</span>
                    <div className="t-content">
                        <h3>Nace Preu Lael</h3>
                        <p>
                            La comunidad creció orgánicamente. Formalizamos el proyecto bajo el nombre <strong>Lael</strong>, creando nuestro primer programa preuniversitario enfocado no solo en puntajes, sino en vencer el miedo al futuro.
                        </p>
                    </div>
                </div>

                {/* 2024 */}
                <div className="t-item">
                    <div className="t-dot"></div>
                    <span className="t-year">2024</span>
                    <div className="t-content">
                        <h3>Expansión: Idiomas e Inclusión</h3>
                        <p>
                            Derribamos más barreras. Integramos las escuelas de <strong>Idiomas</strong> y <strong>Lengua de Señas (LSCh)</strong>, entendiendo que la comunicación es la llave maestra para las oportunidades laborales modernas.
                        </p>
                    </div>
                </div>

                {/* 2025 */}
                <div className="t-item">
                    <div className="t-dot"></div>
                    <span className="t-year">2025</span>
                    <div className="t-content">
                        <h3>Escuela de Adultos</h3>
                        <p>
                            Lanzamos nuestro programa de nivelación de estudios, cerrando el círculo educativo y honrando a quienes buscan una segunda oportunidad académica.
                        </p>
                    </div>
                </div>

            </div>
        </div>
      </section>

      {/* --- CARTA DEL DIRECTOR (SOLO TEXTO) --- */}
      <section className="letter-section">
        <div className="container">
            <div className="letter-container">
                <div style={{marginBottom:'20px'}}><Icons.Quote/></div>
                <p className="letter-quote">
                    "Lael no es solo un instituto, es mi forma de decir 'Gracias'. 
                    Ver a alguien superar el miedo a las matemáticas o aprender a comunicarse con señas 
                    me recuerda por qué empezamos en esa habitación en 2020. 
                    Aquí nadie es un número, todos tienen un propósito."
                </p>
                <div className="letter-sign">
                    <span className="letter-name">Diego Chaparro</span>
                    <span className="letter-role">Fundador & Director</span>
                </div>
            </div>
        </div>
      </section>

      {/* --- VALORES COMPACTOS --- */}
      <section className="container">
        <div className="values-grid">
            <div className="val-card">
                <h3><span className="val-icon"><Icons.Hand/></span> Servicio Genuino</h3>
                <p>No enseñamos para lucrar, lucramos para seguir sirviendo. El alumno es el centro.</p>
            </div>
            <div className="val-card">
                <h3><span className="val-icon"><Icons.Heart/></span> Gratitud Activa</h3>
                <p>Damos lo mejor en cada clase porque valoramos la oportunidad de enseñar.</p>
            </div>
            <div className="val-card">
                <h3><span className="val-icon"><Icons.Star/></span> Excelencia</h3>
                <p>Recursos accesibles no significan calidad mediocre. Aspiramos siempre a lo mejor.</p>
            </div>
        </div>
      </section>

      {/* --- CTA FINAL --- */}
      <section className="cta-box">
        <div className="container">
            <h2>¿Listo para ser parte de nuestra historia?</h2>
            <Link to="/contacto" className="cta-btn">
                Unirme a Lael
            </Link>
        </div>
      </section>

    </div>
  );
}