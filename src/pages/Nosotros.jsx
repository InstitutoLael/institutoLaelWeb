import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

// --- IMÁGENES (Placeholder de alta calidad) ---
// NOTA: Cuando tengas la foto de tu papá o del equipo, cámbiala aquí.
const HeroImg = "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1000&auto=format&fit=crop"; 
const FounderImg = "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1000&auto=format&fit=crop"; // Idealmente una foto real del equipo

/* ──────────────────────────────────────────────────────────────────────────
   1. ICONOS SVG (Elegantes)
   ────────────────────────────────────────────────────────────────────────── */
const Icons = {
  Heart: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
  Users: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  Star: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  Lightbulb: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="9" y1="18" x2="15" y2="18"/><line x1="10" y1="22" x2="14" y2="22"/><path d="M15.09 14c.18-.9.66-1.74 1.41-2.5A4.65 4.65 0 0 0 18.3 8c0-3.5-3.07-6.23-6.5-6-3.21.21-5.8 3.02-5.8 6.23 0 1.5.55 2.91 1.41 3.75 1.13 1.1 1.59 2.22 1.59 4.02"/></svg>
};

/* ──────────────────────────────────────────────────────────────────────────
   2. ESTILOS CSS - "THE LEGACY" (Docu-Style)
   ────────────────────────────────────────────────────────────────────────── */
const css = `
:root {
  --bg-deep: #0B1120;       /* Midnight Blue */
  --bg-card: #151e32;
  
  --gold: #F59E0B;          /* El color del legado */
  --gold-glow: rgba(245, 158, 11, 0.4);
  
  --text-main: #F8FAFC;
  --text-muted: #94A3B8;
  
  --border: rgba(255,255,255,0.1);
  --font-serif: 'Playfair Display', serif; /* Si puedes importarla, ideal. Si no, usa serif genérica */
  --font-sans: 'Inter', system-ui, sans-serif;
}

.about-page {
  background-color: var(--bg-deep);
  color: var(--text-main);
  font-family: var(--font-sans);
  min-height: 100vh;
  overflow-x: hidden;
}

.container { max-width: 1000px; margin: 0 auto; padding: 0 24px; }
h1, h2, h3 { line-height: 1.1; margin: 0; }

/* MANIFESTO HERO */
.manifesto-section {
  padding: 120px 0 80px; text-align: center; position: relative;
  background: radial-gradient(circle at 50% 30%, rgba(30, 41, 59, 0.8), var(--bg-deep));
}
.manifesto-label {
  display: inline-block; font-size: 0.8rem; letter-spacing: 4px; text-transform: uppercase;
  color: var(--gold); margin-bottom: 20px; font-weight: 700;
}
.manifesto-title {
  font-size: clamp(2.5rem, 6vw, 4.5rem); font-weight: 800; margin-bottom: 40px;
  font-family: var(--font-sans); letter-spacing: -0.02em;
}
.text-gold { color: var(--gold); font-family: 'Times New Roman', serif; font-style: italic; }

.manifesto-text {
  font-size: 1.3rem; color: var(--text-muted); line-height: 1.8; max-width: 750px; margin: 0 auto 60px;
}
.manifesto-text strong { color: white; font-weight: 600; }

.scroll-line {
  width: 1px; height: 80px; background: linear-gradient(to bottom, var(--gold), transparent);
  margin: 0 auto; opacity: 0.5;
}

/* ORIGIN STORY (TIMELINE) */
.timeline-section { padding: 80px 0; position: relative; }
.timeline-container { 
  max-width: 800px; margin: 0 auto; position: relative; padding-left: 40px; 
  border-left: 1px solid rgba(255,255,255,0.1);
}

.timeline-event { margin-bottom: 60px; position: relative; }
.timeline-dot {
  position: absolute; left: -46px; top: 0; width: 12px; height: 12px;
  background: var(--bg-deep); border: 2px solid var(--text-muted); border-radius: 50%;
  transition: 0.3s;
}
.timeline-event:hover .timeline-dot { border-color: var(--gold); background: var(--gold); box-shadow: 0 0 15px var(--gold-glow); }

.event-year { 
  font-size: 0.9rem; font-weight: 700; color: var(--gold); margin-bottom: 10px; 
  text-transform: uppercase; letter-spacing: 1px; display: block;
}
.event-title { font-size: 1.8rem; margin-bottom: 15px; color: white; }
.event-desc { font-size: 1.05rem; color: var(--text-muted); line-height: 1.6; }

/* Highlight Card for "The Origin" */
.origin-card {
  background: linear-gradient(135deg, rgba(245,158,11,0.1), transparent);
  border: 1px solid rgba(245,158,11,0.3); padding: 30px; border-radius: 20px;
  margin-bottom: 40px; position: relative;
}
.origin-card::before {
  content: '"'; font-family: serif; font-size: 6rem; color: var(--gold); opacity: 0.2;
  position: absolute; top: -20px; left: 20px; line-height: 1;
}

/* VALUES GRID */
.values-section { padding: 80px 0; background: #0F1623; }
.values-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 30px; }
.value-card {
  background: var(--bg-card); padding: 35px 30px; border-radius: 16px; border: 1px solid var(--border);
  transition: 0.3s;
}
.value-card:hover { transform: translateY(-5px); border-color: var(--gold); }
.v-icon { color: var(--gold); margin-bottom: 20px; }
.value-card h3 { font-size: 1.3rem; margin-bottom: 10px; }
.value-card p { font-size: 0.95rem; color: var(--text-muted); line-height: 1.6; }

/* TEAM / FOUNDER */
.founder-section { padding: 100px 0; }
.founder-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; }
.founder-img { 
  width: 100%; border-radius: 20px; filter: grayscale(100%); transition: 0.5s; 
  box-shadow: 20px 20px 0px rgba(255,255,255,0.05);
}
.founder-img:hover { filter: grayscale(0%); transform: translate(-5px, -5px); box-shadow: 25px 25px 0px var(--gold); }

.founder-text h2 { font-size: 2.5rem; margin-bottom: 20px; }
.founder-quote { 
  font-family: serif; font-style: italic; font-size: 1.4rem; color: #e2e8f0; 
  border-left: 3px solid var(--gold); padding-left: 20px; margin: 30px 0; line-height: 1.5;
}

/* CTA */
.cta-section { padding: 100px 0; text-align: center; border-top: 1px solid var(--border); }
.cta-title { font-size: 2.5rem; margin-bottom: 20px; }
.cta-desc { font-size: 1.2rem; color: var(--text-muted); margin-bottom: 40px; }
.cta-btn {
  display: inline-block; background: var(--text-main); color: var(--bg-deep);
  padding: 16px 36px; border-radius: 50px; font-weight: 700; font-size: 1.1rem;
  transition: 0.3s;
}
.cta-btn:hover { transform: scale(1.05); box-shadow: 0 0 30px rgba(255,255,255,0.3); }

@media (max-width: 900px) {
  .hero-grid, .founder-grid { grid-template-columns: 1fr; }
  .timeline-container { border-left: none; padding-left: 0; }
  .timeline-dot { display: none; }
  .timeline-event { padding-left: 20px; border-left: 2px solid var(--border); margin-left: 10px; }
  .founder-img { margin-bottom: 40px; }
}
`;

/* ──────────────────────────────────────────────────────────────────────────
   3. COMPONENTE SEO
   ────────────────────────────────────────────────────────────────────────── */
const SEOHead = () => {
  useEffect(() => { document.title = "Nuestra Historia | Instituto Lael"; }, []);
  return null;
};

/* ──────────────────────────────────────────────────────────────────────────
   4. COMPONENTE PRINCIPAL (NOSOTROS)
   ────────────────────────────────────────────────────────────────────────── */
export default function Nosotros() {
  
  return (
    <div className="about-page">
      <SEOHead />
      <style>{css}</style>

      {/* --- HERO: MANIFIESTO --- */}
      <header className="manifesto-section">
        <div className="container">
            <span className="manifesto-label">Nuestra Esencia</span>
            <h1 className="manifesto-title">
                La educación no es un privilegio. <br/>
                Es un acto de <span className="text-gold">justicia.</span>
            </h1>
            <p className="manifesto-text">
                En Instituto Lael creemos que nunca es tarde. Creemos que una nota no define tu inteligencia 
                y que tu pasado no dicta tu futuro. Nacimos para devolver la dignidad al proceso de aprender.
            </p>
            <div className="scroll-line"></div>
        </div>
      </header>

      {/* --- TIMELINE: EL LEGADO --- */}
      <section className="timeline-section">
        <div className="container">
            <div className="timeline-container">
                
                {/* EL ORIGEN (La parte emotiva) */}
                <div className="timeline-event">
                    <div className="timeline-dot" style={{background:'var(--gold)', borderColor:'var(--gold)'}}></div>
                    <span className="event-year">El Origen</span>
                    <div className="origin-card">
                        <h3 className="event-title" style={{color:'var(--gold)'}}>Una promesa familiar</h3>
                        <p className="event-desc">
                            Esta historia no comienza con un edificio, sino con un sueño pendiente. 
                            Inspirados por nuestros padres y abuelos, quienes no tuvieron la oportunidad de terminar sus estudios, 
                            decidimos que nadie más debería sentir que "ya pasó su tiempo". 
                            Lael nace para honrar ese esfuerzo.
                        </p>
                    </div>
                </div>

                {/* 2023 */}
                <div className="timeline-event">
                    <div className="timeline-dot"></div>
                    <span className="event-year">2023</span>
                    <h3 className="event-title">Nace Preu Lael</h3>
                    <p className="event-desc">
                        Empezamos con una misión clara: ayudar a los jóvenes a enfrentar la PAES sin miedo. 
                        No queríamos ser una fábrica de puntajes, sino un espacio de contención y estrategia.
                    </p>
                </div>

                {/* 2024 */}
                <div className="timeline-event">
                    <div className="timeline-dot"></div>
                    <span className="event-year">2024</span>
                    <h3 className="event-title">La Comunidad Crece</h3>
                    <p className="event-desc">
                        Escuchamos a nuestros alumnos. Abrimos las áreas de <strong>Idiomas</strong> y <strong>Lengua de Señas</strong>, 
                        entendiendo que la comunicación es la herramienta más poderosa para abrir puertas laborales.
                    </p>
                </div>

                {/* 2025 */}
                <div className="timeline-event">
                    <div className="timeline-dot"></div>
                    <span className="event-year">2025</span>
                    <h3 className="event-title">Escuela de Adultos</h3>
                    <p className="event-desc">
                        Cerramos el círculo. Lanzamos el <strong>Programa Caminos</strong> para nivelación de estudios, 
                        cumpliendo finalmente la promesa que dio origen a todo esto. Reinserción real y digna.
                    </p>
                </div>

            </div>
        </div>
      </section>

      {/* --- VALORES --- */}
      <section className="values-section">
        <div className="container">
            <div style={{textAlign:'center', marginBottom:'60px'}}>
                <h2 style={{fontSize:'2.5rem', marginBottom:'15px'}}>Nuestros Pilares</h2>
                <p style={{color:'#94a3b8'}}>Lo que nos mantiene firmes en el camino.</p>
            </div>
            
            <div className="values-grid">
                <div className="value-card">
                    <div className="v-icon"><Icons.Heart/></div>
                    <h3>Humanidad Radical</h3>
                    <p>Detrás de cada pantalla hay una persona con sueños y miedos. Nuestra prioridad es el vínculo humano, no la transacción.</p>
                </div>
                <div className="value-card">
                    <div className="v-icon"><Icons.Star/></div>
                    <h3>Excelencia Accesible</h3>
                    <p>Calidad premium no debería significar precios impagables. Democratizamos el acceso a la mejor educación.</p>
                </div>
                <div className="value-card">
                    <div className="v-icon"><Icons.Lightbulb/></div>
                    <h3>Innovación con Sentido</h3>
                    <p>Usamos tecnología para facilitar tu vida, ahorrar tus datos y respetar tu tiempo. Tecnología al servicio de las personas.</p>
                </div>
            </div>
        </div>
      </section>

      {/* --- EQUIPO / MENSAJE FINAL --- */}
      <section className="founder-section">
        <div className="container founder-grid">
            <div className="founder-image-box">
                <img src={FounderImg} alt="Equipo Lael" className="founder-img" />
            </div>
            <div className="founder-text">
                <span style={{color:'var(--gold)', fontWeight:'700', textTransform:'uppercase', letterSpacing:'1px'}}>El Equipo</span>
                <h2>Más que profesores,<br/>somos mentores.</h2>
                <div className="founder-quote">
                    "En Instituto Lael no medimos el éxito solo por las notas, sino por las vidas que cambian. 
                    Ver a un padre graduarse junto a su hijo, o a un joven entrar a la universidad contra todo pronóstico... 
                    ese es nuestro verdadero sueldo."
                </div>
                <p style={{color:'#94a3b8'}}>
                    Contamos con un equipo multidisciplinario de docentes, psicopedagogos y orientadores comprometidos con tu proceso.
                </p>
            </div>
        </div>
      </section>

      {/* --- CTA --- */}
      <section className="cta-section">
        <div className="container">
            <h2 className="cta-title">Escribe tu historia con nosotros</h2>
            <p className="cta-desc">Las puertas están abiertas. Solo faltas tú.</p>
            <Link to="/contacto" className="cta-btn">
                Hablemos
            </Link>
        </div>
      </section>

    </div>
  );
}