// src/pages/Trabaja.jsx
import { useState, useEffect } from "react";
// Asegúrate de tener una foto de equipo o alguien trabajando feliz
import teamImg from "../assets/img/lael/coaching.jpg"; 

const WAPP = "56964626568";

/* --- DATOS DE VACANTES (Job Board) --- */
const JOBS = [
  {
    id: "docencia",
    title: "Docentes PAES & Reforzamiento",
    type: "Part-Time / Honorarios",
    tags: ["Matemáticas", "Lenguaje", "Ciencias", "Historia"],
    desc: "Buscamos expertos apasionados por enseñar. Clases en vivo, creación de material y acompañamiento real a estudiantes.",
    reqs: ["Experiencia comprobable", "Manejo de Zoom/Meet", "Empatía y paciencia"]
  },
  {
    id: "idiomas",
    title: "Teachers de Idiomas",
    type: "Part-Time / Honorarios",
    tags: ["Inglés", "Coreano", "Portugués"],
    desc: "Enseña tu idioma con enfoque comunicativo. Clases dinámicas para adultos y jóvenes.",
    reqs: ["Certificación nivel avanzado", "Experiencia online", "Disponibilidad vespertina"]
  },
  {
    id: "lsch",
    title: "Facilitadores LSCh",
    type: "Part-Time / Honorarios",
    tags: ["Inclusión", "Cultura Sorda"],
    desc: "Docentes sordos o intérpretes para nuestros cursos de Lengua de Señas Chilena.",
    reqs: ["Dominio nativo o intérprete certificado", "Experiencia docente"]
  },
  {
    id: "marketing",
    title: "Creadores de Contenido & Diseño",
    type: "Freelance / Proyecto",
    tags: ["RRSS", "Video", "Gráfica"],
    desc: "Ayúdanos a contar nuestra historia. Diseño gráfico, edición de video y gestión de comunidades.",
    reqs: ["Portafolio", "Manejo de Adobe/Canva", "Creatividad"]
  },
  {
    id: "soporte",
    title: "Coordinación & Soporte",
    type: "Full-Time / Part-Time",
    tags: ["Administración", "Atención Alumno"],
    desc: "El corazón operativo. Ayuda a alumnos y docentes a tener una experiencia fluida.",
    reqs: ["Orden", "Buena ortografía", "Manejo de Excel/CRM"]
  }
];

/* --- SEO COMPONENT --- */
const SEOHead = () => {
  useEffect(() => { document.title = "Únete al Equipo | Instituto Lael Careers"; }, []);
  return null;
};

export default function Trabaja() {
  const [expandedJob, setExpandedJob] = useState(null);

  const toggleJob = (id) => {
    setExpandedJob(expandedJob === id ? null : id);
  };

  return (
    <div className="careers-page">
      <SEOHead />
      <style>{css}</style>

      {/* --- HERO: CULTURA --- */}
      <header className="hero-careers">
        <div className="container hero-split">
            <div className="hero-txt">
                <span className="pill-hiring">Estamos Contratando 🚀</span>
                <h1>
                    Construye el futuro de la <br/>
                    <span className="text-grad">educación online.</span>
                </h1>
                <p className="lead">
                    En Instituto Lael no solo damos clases. Creamos oportunidades. 
                    Buscamos personas talentosas que quieran trabajar con propósito, 
                    flexibilidad y trato digno.
                </p>
                <a href="#vacantes" className="btn-primary">Ver Vacantes Abiertas</a>
            </div>
            <div className="hero-img-box">
                <img src={teamImg} alt="Equipo Lael" />
                <div className="float-stat">
                    <strong>100% Remoto</strong>
                    <small>Trabaja desde donde quieras</small>
                </div>
            </div>
        </div>
      </header>

      {/* --- VALORES (BENEFICIOS) --- */}
      <section className="perks-section">
        <div className="container">
            <div className="sec-header">
                <h2>¿Por qué Lael?</h2>
                <p>No somos una "fábrica de clases". Somos una comunidad.</p>
            </div>
            
            <div className="perks-grid">
                <div className="perk-card">
                    <span className="icon">🏠</span>
                    <h3>Full Remoto</h3>
                    <p>Olvídate del taco. Trabajamos 100% online, con herramientas digitales modernas.</p>
                </div>
                <div className="perk-card">
                    <span className="icon">⏰</span>
                    <h3>Flexibilidad Real</h3>
                    <p>Tú gestionas tus bloques horarios. Valoramos el cumplimiento de objetivos, no las horas silla.</p>
                </div>
                <div className="perk-card">
                    <span className="icon">💰</span>
                    <h3>Pagos Puntuales</h3>
                    <p>Respetamos tu trabajo. Honorarios claros y fechas de pago sagradas.</p>
                </div>
                <div className="perk-card">
                    <span className="icon">🚀</span>
                    <h3>Crecimiento</h3>
                    <p>Capacitación constante y posibilidades de liderar nuevos proyectos.</p>
                </div>
            </div>
        </div>
      </section>

      {/* --- JOB BOARD (VACANTES) --- */}
      <section id="vacantes" className="jobs-section">
        <div className="container">
            <div className="jobs-header">
                <h2>Posiciones Abiertas</h2>
                <p>Encuentra tu rol y postula hoy mismo.</p>
            </div>

            <div className="jobs-list">
                {JOBS.map(job => (
                    <div key={job.id} className={`job-card ${expandedJob === job.id ? 'open' : ''}`}>
                        <div className="job-summary" onClick={() => toggleJob(job.id)}>
                            <div className="job-info">
                                <h3>{job.title}</h3>
                                <div className="job-meta">
                                    <span className="type">{job.type}</span>
                                    {job.tags.map(t => <span key={t} className="tag">{t}</span>)}
                                </div>
                            </div>
                            <button className="btn-toggle">{expandedJob === job.id ? '−' : '+'}</button>
                        </div>
                        
                        {expandedJob === job.id && (
                            <div className="job-details">
                                <p className="job-desc">{job.desc}</p>
                                <h4>Requisitos:</h4>
                                <ul>
                                    {job.reqs.map((r, i) => <li key={i}>{r}</li>)}
                                </ul>
                                <div className="job-actions">
                                    <a 
                                        href={`mailto:coordinacion@institutolael.cl?subject=Postulación: ${job.title}`} 
                                        className="btn-apply"
                                    >
                                        Enviar CV por Correo
                                    </a>
                                    <a 
                                        href={`https://wa.me/${WAPP}?text=${encodeURIComponent(`Hola, quiero postular al cargo de ${job.title}.`)}`} 
                                        target="_blank" 
                                        rel="noreferrer" 
                                        className="btn-wa-job"
                                    >
                                        Postular por WhatsApp
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* --- CTA GENERAL --- */}
      <section className="cta-general">
        <div className="container cta-box">
            <h3>¿No encuentras tu rol?</h3>
            <p>Siempre buscamos talento. Si crees que puedes aportar, escríbenos.</p>
            <a href="mailto:coordinacion@institutolael.cl" className="link-white">coordinacion@institutolael.cl</a>
        </div>
      </section>

    </div>
  );
}

/* ================= CSS MODERN CAREERS ================= */
const css = `
:root {
  --bg: #0F172A;
  --card-bg: #1E293B;
  --text: #F8FAFC;
  --text-muted: #94A3B8;
  --primary: #6366F1; /* Indigo */
  --accent: #F43F5E; /* Rose */
  --border: #334155;
  --radius: 12px;
}

.careers-page {
  background-color: var(--bg);
  color: var(--text);
  font-family: 'Inter', sans-serif;
  min-height: 100vh;
}

.container { max-width: 1100px; margin: 0 auto; padding: 0 20px; }

/* HERO */
.hero-careers { padding: 80px 0; background: radial-gradient(circle at top right, #1e293b, var(--bg)); }
.hero-split { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; }
@media (max-width: 900px) { .hero-split { grid-template-columns: 1fr; text-align: center; } .hero-img-box { order: -1; } }

.pill-hiring { 
    display: inline-block; background: rgba(99, 102, 241, 0.1); color: #818cf8; 
    padding: 6px 12px; border-radius: 50px; font-size: 0.8rem; font-weight: 700; margin-bottom: 20px; border: 1px solid rgba(99, 102, 241, 0.3);
}
h1 { font-size: 3.5rem; line-height: 1.1; margin-bottom: 20px; font-weight: 800; }
.text-grad {
    background: linear-gradient(90deg, #818cf8, #f43f5e);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
}
.lead { font-size: 1.1rem; color: var(--text-muted); margin-bottom: 40px; line-height: 1.6; }

.btn-primary {
    background: var(--primary); color: white; padding: 14px 32px; border-radius: 8px; font-weight: 600; text-decoration: none; display: inline-block; transition: .2s;
}
.btn-primary:hover { background: #4f46e5; transform: translateY(-2px); }

.hero-img-box { position: relative; }
.hero-img-box img { width: 100%; border-radius: 20px; transform: rotate(2deg); border: 1px solid var(--border); }
.float-stat {
    position: absolute; bottom: 20px; left: -20px; background: rgba(15, 23, 42, 0.95);
    padding: 15px 25px; border-radius: 12px; border: 1px solid var(--border); box-shadow: 0 10px 30px rgba(0,0,0,0.5);
}
.float-stat strong { display: block; font-size: 1.2rem; color: var(--accent); }
.float-stat small { font-size: 0.8rem; color: var(--text-muted); }

/* PERKS */
.perks-section { padding: 80px 0; background: #0b1120; }
.sec-header { text-align: center; margin-bottom: 50px; }
.sec-header h2 { font-size: 2.5rem; margin-bottom: 10px; }
.sec-header p { color: var(--text-muted); font-size: 1.1rem; }

.perks-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 30px; }
.perk-card {
    background: var(--card-bg); padding: 30px; border-radius: var(--radius); border: 1px solid var(--border); text-align: center; transition: .3s;
}
.perk-card:hover { transform: translateY(-5px); border-color: var(--primary); }
.perk-card .icon { font-size: 2.5rem; display: block; margin-bottom: 20px; }
.perk-card h3 { font-size: 1.2rem; margin-bottom: 10px; }
.perk-card p { font-size: 0.9rem; color: var(--text-muted); line-height: 1.5; }

/* JOBS */
.jobs-section { padding: 80px 0; }
.jobs-header { margin-bottom: 40px; }
.jobs-list { display: flex; flex-direction: column; gap: 20px; }

.job-card {
    background: var(--card-bg); border: 1px solid var(--border); border-radius: var(--radius); overflow: hidden; transition: .3s;
}
.job-card:hover { border-color: var(--text-muted); }
.job-card.open { border-color: var(--primary); }

.job-summary { padding: 25px; display: flex; justify-content: space-between; align-items: center; cursor: pointer; }
.job-info h3 { margin: 0 0 10px; font-size: 1.4rem; }
.job-meta { display: flex; gap: 10px; flex-wrap: wrap; }
.type { font-size: 0.8rem; color: var(--accent); font-weight: 600; text-transform: uppercase; }
.tag { font-size: 0.8rem; background: #334155; padding: 2px 8px; border-radius: 4px; color: var(--text-muted); }

.btn-toggle { font-size: 2rem; color: var(--text-muted); line-height: 0; padding-bottom: 5px; }

.job-details { padding: 0 25px 25px; border-top: 1px solid var(--border); margin-top: 0; animation: fadeIn 0.3s; }
.job-desc { margin: 20px 0; color: var(--text-muted); line-height: 1.6; font-size: 1rem; }
.job-details h4 { margin-bottom: 10px; color: var(--text); }
.job-details ul { margin-bottom: 30px; padding-left: 20px; color: var(--text-muted); }
.job-details li { margin-bottom: 5px; }

.job-actions { display: flex; gap: 15px; flex-wrap: wrap; }
.btn-apply {
    background: var(--text); color: var(--bg); padding: 12px 24px; border-radius: 6px; font-weight: 700; text-decoration: none; transition: .2s;
}
.btn-apply:hover { background: #e2e8f0; }
.btn-wa-job {
    background: transparent; color: var(--text); border: 1px solid var(--border); padding: 12px 24px; border-radius: 6px; font-weight: 600; text-decoration: none;
}
.btn-wa-job:hover { border-color: var(--text); }

/* CTA */
.cta-general { padding: 60px 0; text-align: center; border-top: 1px solid var(--border); }
.cta-box h3 { font-size: 1.8rem; margin-bottom: 10px; }
.cta-box p { color: var(--text-muted); margin-bottom: 20px; }
.link-white { color: var(--primary); font-size: 1.2rem; font-weight: 700; }

@keyframes fadeIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
`;