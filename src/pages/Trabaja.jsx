// src/pages/Trabaja.jsx
import { useState, useEffect } from "react";
// Asegúrate de tener una foto de equipo o alguien trabajando feliz (estilo remoto)
import teamImg from "../assets/img/lael/coaching.jpg"; 

const WAPP = "56964626568";

/* --- DATOS DE VACANTES (Job Board) --- */
const JOBS = [
  {
    id: "docencia",
    title: "Docentes PAES & Reforzamiento",
    type: "Part-Time / Honorarios",
    tags: ["Matemáticas", "Lenguaje", "Ciencias", "Historia"],
    desc: "Buscamos expertos que no solo sepan la materia, sino que sepan conectar. Clases en vivo dinámicas, creación de material propio y acompañamiento real a estudiantes.",
    reqs: ["Experiencia comprobable en aula o preu", "Manejo experto de Zoom/Meet", "Empatía y paciencia a toda prueba"]
  },
  {
    id: "idiomas",
    title: "Teachers de Idiomas",
    type: "Part-Time / Honorarios",
    tags: ["Inglés", "Coreano", "Portugués"],
    desc: "Enseña tu idioma con enfoque comunicativo real. Nada de clases de gramática aburrida. Queremos que los alumnos hablen desde el día uno.",
    reqs: ["Certificación nivel avanzado/nativo", "Experiencia enseñando online", "Disponibilidad vespertina"]
  },
  {
    id: "lsch",
    title: "Facilitadores LSCh (Sordos/Oyentes)",
    type: "Part-Time / Honorarios",
    tags: ["Inclusión", "Cultura Sorda"],
    desc: "Docentes para nuestros cursos de Lengua de Señas Chilena. Buscamos transmitir no solo las señas, sino la cultura y el respeto.",
    reqs: ["Dominio nativo o intérprete certificado", "Experiencia docente", "Manejo de grupos"]
  },
  {
    id: "marketing",
    title: "Creadores de Contenido & Diseño",
    type: "Freelance / Proyecto",
    tags: ["RRSS", "Video", "Gráfica"],
    desc: "Ayúdanos a contar nuestra historia. Diseño gráfico, edición de video para Reels/TikTok y gestión de comunidades.",
    reqs: ["Portafolio (excluyente)", "Manejo de Adobe/Canva/CapCut", "Creatividad y autonomía"]
  },
  {
    id: "soporte",
    title: "Coordinación & Soporte Alumno",
    type: "Full-Time / Part-Time",
    tags: ["Administración", "Atención al Cliente"],
    desc: "El corazón operativo. Ayuda a alumnos y docentes a tener una experiencia fluida, resolviendo dudas y organizando horarios.",
    reqs: ["Orden extremo", "Excelente ortografía", "Manejo de Excel/CRM", "Paciencia y buen trato"]
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

      {/* --- HERO: CULTURA & PROPÓSITO --- */}
      <header className="hero-careers">
        <div className="container hero-split">
            <div className="hero-txt">
                <span className="pill-hiring">Estamos Contratando 🚀</span>
                <h1>
                    Construye el futuro de la <br/>
                    <span className="text-grad">educación online.</span>
                </h1>
                <p className="lead">
                    En Instituto Lael no buscamos empleados, buscamos aliados. 
                    Únete a un equipo que valora tu tiempo, respeta tu trabajo y 
                    donde tu impacto se ve todos los días.
                </p>
                <div className="hero-btns">
                    <a href="#vacantes" className="btn-primary">Ver Vacantes</a>
                    <a href="#cultura" className="btn-outline">Nuestra Cultura</a>
                </div>
            </div>
            <div className="hero-img-box">
                <div className="img-frame">
                    <img src={teamImg} alt="Equipo Lael" />
                    <div className="float-card glass">
                        <span className="icon">🌍</span>
                        <div>
                            <strong>100% Remoto</strong>
                            <small>Trabaja desde donde quieras</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </header>

      {/* --- VALORES (BENEFICIOS) --- */}
      <section id="cultura" className="perks-section">
        <div className="container">
            <div className="sec-header">
                <h2>¿Por qué trabajar aquí?</h2>
                <p>No somos una "fábrica de clases". Somos una comunidad de profesionales.</p>
            </div>
            
            <div className="perks-grid">
                <div className="perk-card">
                    <span className="p-icon">🏠</span>
                    <h3>Full Remoto</h3>
                    <p>Olvídate del taco. Trabajamos 100% online, con herramientas digitales modernas y sin horarios de oficina rígidos.</p>
                </div>
                <div className="perk-card">
                    <span className="p-icon">💰</span>
                    <h3>Pagos Sagrados</h3>
                    <p>Sabemos que ser freelance es difícil. Aquí los honorarios son claros y las fechas de pago se respetan siempre.</p>
                </div>
                <div className="perk-card">
                    <span className="p-icon">⏰</span>
                    <h3>Flexibilidad Real</h3>
                    <p>Tú gestionas tus bloques. Valoramos el cumplimiento de objetivos y la calidad, no las horas sentado en la silla.</p>
                </div>
                <div className="perk-card">
                    <span className="p-icon">🚀</span>
                    <h3>Crecimiento</h3>
                    <p>Capacitación constante, acceso a nuestros cursos y posibilidades reales de liderar nuevos proyectos.</p>
                </div>
            </div>
        </div>
      </section>

      {/* --- JOB BOARD (VACANTES MODERNAS) --- */}
      <section id="vacantes" className="jobs-section">
        <div className="container">
            <div className="jobs-header">
                <h2>Posiciones Abiertas</h2>
                <p>Encuentra tu rol ideal y postula hoy mismo.</p>
            </div>

            <div className="jobs-list">
                {JOBS.map(job => (
                    <div key={job.id} className={`job-card ${expandedJob === job.id ? 'open' : ''}`}>
                        
                        {/* Cabecera del Job (Siempre visible) */}
                        <div className="job-summary" onClick={() => toggleJob(job.id)}>
                            <div className="job-main">
                                <h3>{job.title}</h3>
                                <div className="job-tags">
                                    <span className="type-badge">{job.type}</span>
                                    {job.tags.slice(0, 2).map(t => <span key={t} className="tag">{t}</span>)}
                                </div>
                            </div>
                            <button className="btn-toggle">
                                {expandedJob === job.id ? 'Cerrar' : 'Ver Detalle'}
                            </button>
                        </div>
                        
                        {/* Detalle (Expandible) */}
                        {expandedJob === job.id && (
                            <div className="job-details fade-in">
                                <p className="job-desc">{job.desc}</p>
                                
                                <div className="reqs-box">
                                    <h4>Requisitos clave:</h4>
                                    <ul>
                                        {job.reqs.map((r, i) => <li key={i}>{r}</li>)}
                                    </ul>
                                </div>

                                <div className="job-actions">
                                    <a 
                                        href={`mailto:coordinacion@institutolael.cl?subject=Postulación: ${job.title}&body=Hola, adjunto mi CV y portafolio para el cargo de ${job.title}.`} 
                                        className="btn-apply"
                                    >
                                        📧 Enviar CV por Correo
                                    </a>
                                    <a 
                                        href={`https://wa.me/${WAPP}?text=${encodeURIComponent(`Hola, soy [Nombre] y quiero postular al cargo de ${job.title}.`)}`} 
                                        target="_blank" 
                                        rel="noreferrer" 
                                        className="btn-wa-job"
                                    >
                                        💬 Postular por WhatsApp
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
            <div className="cta-txt">
                <h3>¿No encuentras tu rol exacto?</h3>
                <p>Siempre buscamos talento excepcional. Si crees que puedes aportar valor, escríbenos.</p>
            </div>
            <a href="mailto:coordinacion@institutolael.cl" className="link-white">coordinacion@institutolael.cl →</a>
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
  --primary-hover: #4F46E5;
  --accent: #F43F5E; /* Rose */
  --border: #334155;
  --radius: 16px;
}

.careers-page {
  background-color: var(--bg);
  color: var(--text);
  font-family: 'Inter', sans-serif;
  min-height: 100vh;
  line-height: 1.6;
}

.container { max-width: 1100px; margin: 0 auto; padding: 0 20px; }

/* HERO */
.hero-careers { 
    padding: 100px 0 80px; 
    background: radial-gradient(circle at top right, #1e293b 0%, var(--bg) 60%); 
    overflow: hidden;
}
.hero-split { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; }
@media (max-width: 900px) { .hero-split { grid-template-columns: 1fr; text-align: center; } .hero-img-box { order: -1; margin-bottom: 30px; } .hero-btns { justify-content: center; } }

.pill-hiring { 
    display: inline-block; background: rgba(99, 102, 241, 0.15); color: #818cf8; 
    padding: 6px 14px; border-radius: 50px; font-size: 0.8rem; font-weight: 700; margin-bottom: 24px; border: 1px solid rgba(99, 102, 241, 0.3); text-transform: uppercase; letter-spacing: 1px;
}
h1 { font-size: clamp(2.5rem, 5vw, 4rem); line-height: 1.1; margin-bottom: 24px; font-weight: 800; }
.text-grad {
    background: linear-gradient(120deg, #818cf8, #f43f5e);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
}
.lead { font-size: 1.15rem; color: var(--text-muted); margin-bottom: 40px; max-width: 500px; }
@media (max-width: 900px) { .lead { margin-left: auto; margin-right: auto; } }

.hero-btns { display: flex; gap: 15px; flex-wrap: wrap; }
.btn-primary {
    background: var(--primary); color: white; padding: 14px 32px; border-radius: 8px; font-weight: 600; text-decoration: none; transition: .2s;
    box-shadow: 0 4px 15px rgba(99, 102, 241, 0.4);
}
.btn-primary:hover { background: var(--primary-hover); transform: translateY(-2px); }
.btn-outline {
    background: transparent; color: white; padding: 14px 32px; border-radius: 8px; font-weight: 600; text-decoration: none; border: 1px solid var(--border);
}
.btn-outline:hover { border-color: white; background: rgba(255,255,255,0.05); }

/* HERO IMAGE */
.hero-img-box { position: relative; display: flex; justify-content: center; }
.img-frame { position: relative; width: 100%; max-width: 450px; }
.img-frame img { width: 100%; border-radius: 24px; transform: rotate(3deg); border: 1px solid var(--border); box-shadow: 0 20px 50px rgba(0,0,0,0.5); }
.float-card {
    position: absolute; bottom: 30px; left: -30px; background: rgba(15, 23, 42, 0.9); backdrop-filter: blur(10px);
    padding: 15px 25px; border-radius: 16px; border: 1px solid var(--border); box-shadow: 0 10px 30px rgba(0,0,0,0.5);
    display: flex; gap: 12px; align-items: center;
}
.float-card .icon { font-size: 2rem; }
.float-card strong { display: block; font-size: 1rem; color: #fff; }
.float-card small { font-size: 0.8rem; color: var(--text-muted); }

/* PERKS */
.perks-section { padding: 80px 0; background: #0b1120; }
.sec-header { text-align: center; margin-bottom: 60px; }
.sec-header h2 { font-size: 2.5rem; margin-bottom: 15px; font-weight: 800; }
.sec-header p { color: var(--text-muted); font-size: 1.2rem; }

.perks-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 30px; }
.perk-card {
    background: var(--card-bg); padding: 35px 30px; border-radius: var(--radius); border: 1px solid var(--border); text-align: center; transition: .3s;
}
.perk-card:hover { transform: translateY(-5px); border-color: var(--primary); box-shadow: 0 10px 30px rgba(0,0,0,0.3); }
.p-icon { font-size: 3rem; display: block; margin-bottom: 20px; }
.perk-card h3 { font-size: 1.3rem; margin-bottom: 12px; }
.perk-card p { font-size: 0.95rem; color: var(--text-muted); }

/* JOBS BOARD */
.jobs-section { padding: 80px 0; }
.jobs-header { margin-bottom: 40px; }
.jobs-header h2 { font-size: 2rem; margin-bottom: 5px; }
.jobs-header p { color: var(--text-muted); }

.jobs-list { display: flex; flex-direction: column; gap: 20px; }

.job-card {
    background: var(--card-bg); border: 1px solid var(--border); border-radius: var(--radius); overflow: hidden; transition: .3s;
}
.job-card:hover { border-color: var(--text-muted); }
.job-card.open { border-color: var(--primary); box-shadow: 0 0 0 2px rgba(99,102,241,0.2); }

/* Job Summary Row */
.job-summary { 
    padding: 25px 30px; display: flex; justify-content: space-between; align-items: center; cursor: pointer; 
}
@media (max-width: 600px) { .job-summary { flex-direction: column; align-items: flex-start; gap: 15px; } .btn-toggle { align-self: flex-start; } }

.job-main h3 { margin: 0 0 10px; font-size: 1.3rem; font-weight: 700; color: #fff; }
.job-tags { display: flex; gap: 10px; flex-wrap: wrap; align-items: center; }
.type-badge { font-size: 0.75rem; color: var(--accent); font-weight: 700; text-transform: uppercase; border: 1px solid var(--accent); padding: 2px 8px; border-radius: 4px; }
.tag { font-size: 0.8rem; background: #334155; padding: 2px 10px; border-radius: 20px; color: var(--text-muted); }

.btn-toggle { 
    background: transparent; border: 1px solid var(--border); color: var(--text); 
    padding: 8px 16px; border-radius: 8px; font-size: 0.85rem; font-weight: 600; transition: .2s;
}
.btn-toggle:hover { background: #334155; }

/* Job Details */
.job-details { padding: 0 30px 30px; border-top: 1px solid var(--border); margin-top: 0; background: rgba(0,0,0,0.1); }
.job-desc { margin: 25px 0; color: var(--text-muted); line-height: 1.6; font-size: 1rem; }

.reqs-box { margin-bottom: 30px; }
.reqs-box h4 { margin-bottom: 15px; color: var(--text); font-size: 1rem; }
.reqs-box ul { padding-left: 20px; color: var(--text-muted); list-style: disc; }
.reqs-box li { margin-bottom: 8px; }

.job-actions { display: flex; gap: 15px; flex-wrap: wrap; }
.btn-apply {
    background: var(--text); color: var(--bg); padding: 12px 24px; border-radius: 8px; font-weight: 700; text-decoration: none; transition: .2s;
}
.btn-apply:hover { background: #e2e8f0; transform: translateY(-2px); }
.btn-wa-job {
    background: transparent; color: var(--text); border: 1px solid var(--border); padding: 12px 24px; border-radius: 8px; font-weight: 600; text-decoration: none; transition: .2s;
}
.btn-wa-job:hover { border-color: var(--text); background: rgba(255,255,255,0.05); }

/* CTA */
.cta-general { padding: 60px 0; }
.cta-box {
    background: linear-gradient(90deg, #1e293b, #0f172a); border: 1px solid var(--border); border-radius: 20px;
    padding: 40px; display: flex; justify-content: space-between; align-items: center; gap: 30px;
}
@media (max-width: 700px) { .cta-box { flex-direction: column; text-align: center; } }
.cta-txt h3 { font-size: 1.5rem; margin-bottom: 10px; }
.cta-txt p { color: var(--text-muted); margin: 0; }
.link-white { color: var(--primary); font-size: 1.1rem; font-weight: 700; text-decoration: none; border-bottom: 2px solid transparent; transition: .2s; }
.link-white:hover { border-color: var(--primary); }

@keyframes fadeIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
`;