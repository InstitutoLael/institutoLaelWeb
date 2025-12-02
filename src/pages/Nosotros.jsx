import { useEffect } from "react";
import { Link } from "react-router-dom";

// --- IMÁGENES (Placeholder - Reemplazar con foto real tuya enseñando o sonriendo) ---
const FounderImg = "https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=1000&auto=format&fit=crop"; 

/* ──────────────────────────────────────────────────────────────────────────
   1. ICONOS SVG (Estilo Fino)
   ────────────────────────────────────────────────────────────────────────── */
const Icons = {
  Heart: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
  Users: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  Star: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  Hand: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 19a4 4 0 0 0 8 0v-6a4 4 0 0 0-8 0v6Z"/><path d="M11 13V9a4 4 0 0 0-8 0v4"/><path d="M7 13v6a4 4 0 0 0 4 4"/></svg>
};

/* ──────────────────────────────────────────────────────────────────────────
   2. ESTILOS CSS - "THE LEGACY"
   ────────────────────────────────────────────────────────────────────────── */
const css = `
:root {
  --bg-deep: #0B1120;
  --bg-card: #151e32;
  --gold: #F59E0B;
  --gold-glow: rgba(245, 158, 11, 0.4);
  --text-main: #F8FAFC;
  --text-muted: #94A3B8;
  --border: rgba(255,255,255,0.08);
  --font-sans: 'Plus Jakarta Sans', 'Inter', system-ui, sans-serif;
}

.about-page {
  background-color: var(--bg-deep); color: var(--text-main); font-family: var(--font-sans);
  min-height: 100vh; overflow-x: hidden;
}
.container { max-width: 1000px; margin: 0 auto; padding: 0 24px; }

/* MANIFESTO HERO */
.manifesto-section {
  padding: 140px 0 80px; text-align: center; position: relative;
  background: radial-gradient(circle at 50% 30%, rgba(30, 41, 59, 0.4), var(--bg-deep));
}
.manifesto-label {
  display: inline-block; font-size: 0.8rem; letter-spacing: 4px; text-transform: uppercase;
  color: var(--gold); margin-bottom: 20px; font-weight: 700;
}
.manifesto-title {
  font-size: clamp(2.5rem, 6vw, 4rem); font-weight: 800; margin-bottom: 30px; letter-spacing: -0.02em; line-height: 1.1;
}
.manifesto-text {
  font-size: 1.25rem; color: var(--text-muted); line-height: 1.8; max-width: 750px; margin: 0 auto 60px;
}
.scroll-line { width: 1px; height: 80px; background: linear-gradient(to bottom, var(--gold), transparent); margin: 0 auto; opacity: 0.5; }

/* TIMELINE STORY */
.timeline-section { padding: 80px 0; position: relative; }
.timeline-container { 
  max-width: 800px; margin: 0 auto; position: relative; padding-left: 40px; 
  border-left: 1px solid rgba(255,255,255,0.1);
}
.timeline-event { margin-bottom: 60px; position: relative; }
.timeline-dot {
  position: absolute; left: -46px; top: 6px; width: 12px; height: 12px;
  background: var(--bg-deep); border: 2px solid var(--text-muted); border-radius: 50%; transition: 0.3s;
}
.timeline-event:hover .timeline-dot { border-color: var(--gold); background: var(--gold); box-shadow: 0 0 15px var(--gold-glow); }

.event-year { 
  font-size: 0.85rem; font-weight: 700; color: var(--gold); margin-bottom: 8px; 
  text-transform: uppercase; letter-spacing: 1px; display: block;
}
.event-title { font-size: 1.8rem; margin-bottom: 15px; color: white; font-weight: 700; }
.event-desc { font-size: 1.05rem; color: var(--text-muted); line-height: 1.6; }

/* Highlight Card for "The Origin" */
.origin-card {
  background: linear-gradient(135deg, rgba(245,158,11,0.08), transparent);
  border: 1px solid rgba(245,158,11,0.2); padding: 35px; border-radius: 20px;
  margin-bottom: 40px; position: relative;
}
.quote-mark { font-size: 4rem; color: var(--gold); opacity: 0.2; position: absolute; top: 10px; left: 20px; line-height: 0; font-family: serif; }

/* VALUES GRID */
.values-section { padding: 80px 0; background: #0F1623; border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }
.values-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 30px; }
.value-card {
  background: var(--bg-card); padding: 35px 30px; border-radius: 16px; border: 1px solid var(--border); transition: 0.3s;
}
.value-card:hover { transform: translateY(-5px); border-color: var(--gold); }
.v-icon { color: var(--gold); margin-bottom: 20px; }
.value-card h3 { font-size: 1.3rem; margin-bottom: 10px; font-weight: 700; }
.value-card p { font-size: 0.95rem; color: var(--text-muted); line-height: 1.6; }

/* FOUNDER SECTION */
.founder-section { padding: 100px 0; }
.founder-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; }
.founder-img { 
  width: 100%; border-radius: 20px; filter: grayscale(100%); transition: 0.5s; 
  box-shadow: 20px 20px 0px rgba(255,255,255,0.05); object-fit: cover; aspect-ratio: 4/5;
}
.founder-img:hover { filter: grayscale(0%); transform: translate(-5px, -5px); box-shadow: 20px 20px 0px var(--gold); }
.founder-quote { 
  font-style: italic; font-size: 1.25rem; color: #e2e8f0; 
  border-left: 3px solid var(--gold); padding-left: 20px; margin: 30px 0; line-height: 1.6;
}

/* CTA */
.cta-section { padding: 100px 0; text-align: center; }
.cta-title { font-size: 2.5rem; margin-bottom: 20px; font-weight: 800; }
.cta-btn {
  display: inline-block; background: var(--text-main); color: var(--bg-deep);
  padding: 16px 36px; border-radius: 50px; font-weight: 700; font-size: 1.1rem;
  transition: 0.3s; text-decoration: none;
}
.cta-btn:hover { transform: scale(1.05); box-shadow: 0 0 20px rgba(255,255,255,0.3); }

@media (max-width: 900px) {
  .founder-grid { grid-template-columns: 1fr; }
  .timeline-container { border-left: none; padding-left: 0; }
  .timeline-dot { display: none; }
  .timeline-event { padding-left: 20px; border-left: 2px solid var(--border); margin-left: 10px; }
  .manifesto-title { font-size: 2.5rem; }
}
`;

const SEOHead = () => {
  useEffect(() => { document.title = "Nuestra Historia | Instituto Lael"; }, []);
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
                Lo que empezó en una habitación pequeña hoy es una comunidad que transforma vidas.
            </p>
            <div className="scroll-line"></div>
        </div>
      </header>

      {/* --- TIMELINE --- */}
      <section className="timeline-section">
        <div className="container">
            <div className="timeline-container">
                
                {/* 2020: EL ORIGEN */}
                <div className="timeline-event">
                    <div className="timeline-dot" style={{background:'var(--gold)', borderColor:'var(--gold)'}}></div>
                    <span className="event-year">2020 • La Semilla</span>
                    <div className="origin-card">
                        <span className="quote-mark">“</span>
                        <h3 className="event-title" style={{color:'var(--gold)'}}>Diego Chaparro: Retribuir lo recibido</h3>
                        <p className="event-desc">
                            En plena pandemia, el mundo se detuvo, pero las necesidades no. 
                            Yo había sido bendecido por Dios en mi formación y sentí un llamado fuerte: 
                            <strong>retribuir esa gracia</strong>. 
                            <br/><br/>
                            Comencé a dar clases particulares gratuitas y de bajo costo a quienes no tenían recursos 
                            o se sentían perdidos con el formato online. No era un negocio, era un servicio. 
                            Ahí entendí que enseñar no es solo transmitir datos, es devolver la esperanza.
                        </p>
                    </div>
                </div>

                {/* 2023 */}
                <div className="timeline-event">
                    <div className="timeline-dot"></div>
                    <span className="event-year">2021 • Nace Preu Lael</span>
                    <h3 className="event-title">Formalizando el Sueño</h3>
                    <p className="event-desc">
                        La demanda creció. Esos primeros alumnos trajeron a sus amigos, y sus amigos a otros. 
                        Decidimos estructurar todo bajo el nombre <strong>Lael</strong> ("Perteneciente a Dios"), 
                        para nunca olvidar quién es el dueño de este proyecto. Nace nuestro Preuniversitario con enfoque humano.
                    </p>
                </div>

                {/* 2024 */}
                <div className="timeline-event">
                    <div className="timeline-dot"></div>
                    <span className="event-year">2024 • Expansión</span>
                    <h3 className="event-title">Rompiendo Barreras</h3>
                    <p className="event-desc">
                        Nos dimos cuenta de que la PAES no era la única barrera. 
                        Abrimos cursos de <strong>Idiomas</strong> y <strong>Lengua de Señas (LSCh)</strong>, 
                        porque la inclusión y la comunicación global son herramientas de justicia social.
                    </p>
                </div>

                {/* 2025 */}
                <div className="timeline-event">
                    <div className="timeline-dot"></div>
                    <span className="event-year">2025 • Futuro</span>
                    <h3 className="event-title">La Promesa Cumplida</h3>
                    <p className="event-desc">
                        Lanzamos la <strong>Escuela de Adultos</strong>. Honrando a las generaciones pasadas 
                        (como nuestros abuelos) que no pudieron terminar sus estudios. 
                        Ahora, Lael es un ecosistema educativo completo.
                    </p>
                </div>

            </div>
        </div>
      </section>

      {/* --- VALORES --- */}
      <section className="values-section">
        <div className="container">
            <div style={{textAlign:'center', marginBottom:'60px'}}>
                <h2 style={{fontSize:'2.5rem', marginBottom:'15px', fontWeight:'800'}}>Nuestros Pilares</h2>
                <p style={{color:'#94a3b8'}}>La roca sobre la que construimos.</p>
            </div>
            
            <div className="values-grid">
                <div className="value-card">
                    <div className="v-icon"><Icons.Hand/></div>
                    <h3>Servicio Genuino</h3>
                    <p>No enseñamos para lucrar, lucramos para seguir sirviendo. El alumno es una persona, no un cliente.</p>
                </div>
                <div className="value-card">
                    <div className="v-icon"><Icons.Heart/></div>
                    <h3>Gratitud Activa</h3>
                    <p>Todo lo que tenemos lo hemos recibido. Nuestra forma de dar gracias es dando lo mejor en cada clase.</p>
                </div>
                <div className="value-card">
                    <div className="v-icon"><Icons.Star/></div>
                    <h3>Excelencia Digna</h3>
                    <p>Creemos que los recursos limitados no deben significar educación mediocre. Damos calidad premium a precio justo.</p>
                </div>
            </div>
        </div>
      </section>

      {/* --- MENSAJE DEL FUNDADOR --- */}
      <section className="founder-section">
        <div className="container founder-grid">
            <div className="founder-image-box">
                {/* FOTO TUYA AQUÍ */}
                <img src={FounderImg} alt="Diego Chaparro" className="founder-img" />
            </div>
            <div className="founder-text">
                <span style={{color:'var(--gold)', fontWeight:'700', textTransform:'uppercase', letterSpacing:'1px'}}>Palabras del Director</span>
                <h2 style={{fontWeight:'800', lineHeight:'1.1'}}>Diego Chaparro</h2>
                <div className="founder-quote">
                    "Lael no es solo un instituto, es mi forma de decir 'Gracias'. 
                    Ver a alguien superar el miedo a las matemáticas o aprender a comunicarse con señas 
                    me recuerda por qué empezamos en esa habitación en 2020. 
                    Aquí nadie es un número."
                </div>
                <p style={{color:'#94a3b8'}}>
                    Fundador & Director Ejecutivo
                </p>
            </div>
        </div>
      </section>

      {/* --- CTA --- */}
      <section className="cta-section">
        <div className="container">
            <h2 className="cta-title">¿Listo para aprender diferente?</h2>
            <p className="cta-desc" style={{maxWidth:'600px', margin:'0 auto 40px'}}>
                Si buscas un lugar donde te exijan pero te cuiden, donde te enseñen pero te valoren... bienvenido a casa.
            </p>
            <Link to="/contacto" className="cta-btn">
                Unirme a Lael
            </Link>
        </div>
      </section>

    </div>
  );
}