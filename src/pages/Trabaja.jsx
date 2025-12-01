import { useState, useEffect } from "react";
import { PERKS, OPENINGS, HR_EMAIL, HR_WAPP } from "../data/jobs.js";

// IMAGEN: Ambiente de trabajo relajado/remoto
const teamImg = "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop";

/* ──────────────────────────────────────────────────────────────────────────
   1. ICONOS SVG
   ────────────────────────────────────────────────────────────────────────── */
const Icons = {
  Briefcase: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>,
  Clock: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  ChevronDown: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>,
  Send: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>,
  Whatsapp: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
};

/* ──────────────────────────────────────────────────────────────────────────
   2. ESTILOS CSS - "TALENT HUB" (Neon Green & Dark)
   ────────────────────────────────────────────────────────────────────────── */
const css = `
:root {
  --bg-deep: #050505;
  --bg-card: #111;
  --bg-hover: #1a1a1a;
  
  --primary: #10b981;       /* Emerald 500 (Crecimiento/Dinero) */
  --primary-glow: rgba(16, 185, 129, 0.4);
  
  --text-main: #fff;
  --text-muted: #a3a3a3;
  
  --border: rgba(255,255,255,0.1);
  --radius: 16px;
  --font-sans: 'Inter', system-ui, sans-serif;
}

.jobs-page {
  background-color: var(--bg-deep);
  color: var(--text-main);
  font-family: var(--font-sans);
  min-height: 100vh;
  padding-bottom: 100px;
}

.container { max-width: 1100px; margin: 0 auto; padding: 0 24px; }
button { cursor: pointer; border: none; font-family: inherit; transition: 0.2s; }
a { text-decoration: none; color: inherit; transition: 0.2s; }

/* HERO */
.hero-jobs { padding: 120px 0 80px; position: relative; overflow: hidden; }
.hero-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; }

.badge-hiring {
  display: inline-flex; align-items: center; gap: 8px;
  background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3);
  color: var(--primary); padding: 6px 14px; border-radius: 50px; 
  font-size: 0.8rem; font-weight: 700; text-transform: uppercase; margin-bottom: 24px; letter-spacing: 1px;
}
.badge-hiring::before { content: ''; width: 8px; height: 8px; background: var(--primary); border-radius: 50%; box-shadow: 0 0 10px var(--primary); animation: pulse 2s infinite; }

h1 { font-size: clamp(2.8rem, 5vw, 4.5rem); line-height: 1.05; font-weight: 800; margin-bottom: 24px; letter-spacing: -0.02em; }
.text-green { color: var(--primary); }

.lead { font-size: 1.2rem; color: var(--text-muted); line-height: 1.6; margin-bottom: 40px; max-width: 500px; }

.hero-actions { display: flex; gap: 15px; }
.btn-primary {
  background: var(--primary); color: #000; padding: 14px 32px; border-radius: 50px;
  font-weight: 700; font-size: 1rem; box-shadow: 0 0 20px rgba(16, 185, 129, 0.3);
}
.btn-primary:hover { transform: translateY(-3px); box-shadow: 0 0 30px rgba(16, 185, 129, 0.5); }

.btn-outline {
  background: transparent; color: white; border: 1px solid var(--border); padding: 14px 32px; border-radius: 50px; font-weight: 600;
}
.btn-outline:hover { border-color: white; background: rgba(255,255,255,0.05); }

/* Hero Visual */
.hero-img-box { position: relative; }
.hero-img { width: 100%; border-radius: 20px; border: 1px solid var(--border); filter: grayscale(20%); opacity: 0.9; }
.float-stat {
  position: absolute; bottom: 30px; left: -30px; background: rgba(10,10,10,0.9);
  padding: 15px 25px; border-radius: 12px; border: 1px solid var(--border);
  display: flex; gap: 15px; align-items: center; box-shadow: 0 20px 40px rgba(0,0,0,0.5);
}
.fs-icon { font-size: 1.8rem; }

@media (max-width: 900px) {
  .hero-grid { grid-template-columns: 1fr; text-align: center; }
  .lead { margin-inline: auto; }
  .hero-actions { justify-content: center; }
  .hero-img-box { margin-top: 40px; width: 90%; margin-left: auto; margin-right: auto; }
  .float-stat { left: 50%; transform: translateX(-50%); width: max-content; bottom: -20px; }
}

/* PERKS */
.perks-section { padding: 80px 0; background: #0a0a0a; border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }
.sec-title { text-align: center; font-size: 2.5rem; margin-bottom: 60px; font-weight: 800; }

.perks-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 30px; }
.perk-card {
  background: var(--bg-card); padding: 35px 30px; border-radius: var(--radius); border: 1px solid var(--border);
  text-align: center; transition: 0.3s;
}
.perk-card:hover { border-color: var(--primary); transform: translateY(-5px); }
.p-icon { font-size: 3rem; margin-bottom: 20px; display: block; filter: drop-shadow(0 0 20px rgba(255,255,255,0.1)); }
.perk-card h3 { font-size: 1.25rem; margin-bottom: 12px; color: white; }
.perk-card p { font-size: 0.95rem; color: var(--text-muted); line-height: 1.5; }

/* JOB BOARD */
.jobs-section { padding: 100px 0; }
.jobs-list { display: flex; flex-direction: column; gap: 20px; max-width: 900px; margin: 0 auto; }

.job-item {
  background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius);
  overflow: hidden; transition: 0.3s;
}
.job-item:hover { border-color: var(--text-muted); }
.job-item.active { border-color: var(--primary); box-shadow: 0 0 30px rgba(16, 185, 129, 0.1); }

.job-header { 
  padding: 25px 30px; display: flex; justify-content: space-between; align-items: center; 
  cursor: pointer; background: rgba(255,255,255,0.01);
}
.job-info h3 { font-size: 1.3rem; margin: 0 0 8px; color: white; }
.job-meta { display: flex; gap: 10px; flex-wrap: wrap; }
.job-tag { 
  font-size: 0.75rem; background: #262626; color: var(--text-muted); padding: 4px 10px; 
  border-radius: 4px; font-weight: 600; text-transform: uppercase; 
}
.job-type { color: var(--primary); border: 1px solid var(--primary); background: rgba(16, 185, 129, 0.1); }

.btn-toggle { 
  background: transparent; color: var(--text-muted); padding: 10px; border-radius: 50%; border: 1px solid var(--border);
  display: flex; align-items: center; justify-content: center; transition: 0.3s;
}
.job-item.active .btn-toggle { transform: rotate(180deg); background: var(--primary); color: black; border-color: var(--primary); }

.job-body { 
  padding: 0 30px 30px; border-top: 1px solid var(--border); margin-top: 0; 
  animation: slideDown 0.3s ease-out;
}
.job-desc { margin: 25px 0; color: #d4d4d4; font-size: 1rem; line-height: 1.6; }
.req-title { font-size: 0.9rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px; font-weight: 700; margin-bottom: 10px; }
.req-list { list-style: none; padding: 0; margin-bottom: 30px; }
.req-list li { margin-bottom: 8px; padding-left: 20px; position: relative; color: #e5e5e5; }
.req-list li::before { content: '•'; color: var(--primary); position: absolute; left: 0; font-weight: bold; }

.job-actions { display: flex; gap: 15px; flex-wrap: wrap; }
.btn-apply {
  background: white; color: black; padding: 12px 24px; border-radius: 8px; font-weight: 700;
  display: flex; align-items: center; gap: 8px; font-size: 0.9rem;
}
.btn-apply:hover { background: #e5e5e5; }
.btn-wapp {
  background: transparent; color: white; border: 1px solid var(--border); padding: 12px 24px; 
  border-radius: 8px; font-weight: 700; display: flex; align-items: center; gap: 8px; font-size: 0.9rem;
}
.btn-wapp:hover { background: rgba(255,255,255,0.05); border-color: white; }

/* CTA GENERAL */
.cta-box { 
  margin: 60px 0; padding: 50px; background: linear-gradient(135deg, #111, #0a0a0a); 
  border: 1px solid var(--border); border-radius: 20px; text-align: center;
}
.cta-box h3 { font-size: 1.8rem; margin-bottom: 15px; color: white; }
.cta-box p { color: var(--text-muted); margin-bottom: 30px; max-width: 600px; margin-left: auto; margin-right: auto; }
.link-mail { color: var(--primary); font-size: 1.2rem; font-weight: 700; border-bottom: 2px solid var(--primary); padding-bottom: 2px; }
.link-mail:hover { color: white; border-color: white; }

@keyframes slideDown { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
@keyframes pulse { 0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4); } 70% { box-shadow: 0 0 0 10px rgba(16, 185, 129, 0); } 100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); } }

@media (max-width: 600px) {
  .job-header { flex-direction: column; align-items: flex-start; gap: 15px; }
  .btn-toggle { position: absolute; top: 20px; right: 20px; }
  .job-item { position: relative; }
  .job-actions { width: 100%; }
  .btn-apply, .btn-wapp { width: 100%; justify-content: center; }
}
`;

/* ──────────────────────────────────────────────────────────────────────────
   3. COMPONENTE SEO
   ────────────────────────────────────────────────────────────────────────── */
const SEOHead = () => {
  useEffect(() => { document.title = "Trabaja con Nosotros | Lael Careers"; }, []);
  return null;
};

/* ──────────────────────────────────────────────────────────────────────────
   4. COMPONENTE PRINCIPAL
   ────────────────────────────────────────────────────────────────────────── */
export default function Trabaja() {
  const [activeJob, setActiveJob] = useState(null);

  const toggleJob = (id) => {
    setActiveJob(activeJob === id ? null : id);
  };

  return (
    <div className="jobs-page">
      <SEOHead />
      <style>{css}</style>

      {/* HERO */}
      <header className="hero-jobs">
        <div className="container hero-grid">
          <div className="hero-content">
            <div className="badge-hiring">Estamos Contratando</div>
            <h1>
              Construye el futuro <br/>
              de la <span className="text-green">educación.</span>
            </h1>
            <p className="lead">
              En Instituto Lael no buscamos empleados, buscamos aliados. 
              Únete a un equipo que valora tu tiempo, respeta tu trabajo y premia tu impacto.
            </p>
            <div className="hero-actions">
              <a href="#vacantes" className="btn-primary">Ver Vacantes</a>
              <a href="#cultura" className="btn-outline">Nuestra Cultura</a>
            </div>
          </div>

          <div className="hero-img-box">
            <img src={teamImg} alt="Lael Team" className="hero-img" />
            <div className="float-stat">
              <span className="fs-icon">🌍</span>
              <div>
                <strong style={{display:'block', color:'white'}}>100% Remoto</strong>
                <small style={{color:'#a3a3a3'}}>Trabaja desde donde quieras</small>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* PERKS */}
      <section id="cultura" className="perks-section">
        <div className="container">
          <h2 className="sec-title">Por qué elegir Lael</h2>
          <div className="perks-grid">
            {PERKS.map((p, i) => (
              <div key={i} className="perk-card">
                <span className="p-icon">{p.icon}</span>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* JOB BOARD */}
      <section id="vacantes" className="jobs-section">
        <div className="container">
          <h2 className="sec-title">Posiciones Abiertas</h2>
          
          <div className="jobs-list">
            {OPENINGS.map(job => (
              <div key={job.id} className={`job-item ${activeJob === job.id ? 'active' : ''}`}>
                <div className="job-header" onClick={() => toggleJob(job.id)}>
                  <div className="job-info">
                    <h3>{job.title}</h3>
                    <div className="job-meta">
                      <span className="job-tag job-type">{job.type}</span>
                      {job.tags.map((t, i) => <span key={i} className="job-tag">{t}</span>)}
                    </div>
                  </div>
                  <button className="btn-toggle"><Icons.ChevronDown/></button>
                </div>

                {activeJob === job.id && (
                  <div className="job-body">
                    <p className="job-desc">{job.desc}</p>
                    
                    <div className="req-title">Requisitos</div>
                    <ul className="req-list">
                      {job.requirements.map((r, i) => <li key={i}>{r}</li>)}
                    </ul>

                    <div style={{marginBottom:'20px', fontSize:'0.9rem', color:'#d4d4d4'}}>
                      <strong>Sueldo Ref:</strong> {job.salary}
                    </div>

                    <div className="job-actions">
                      <a 
                        href={`mailto:${HR_EMAIL}?subject=Postulación ${job.title}&body=Hola, adjunto mi CV y portafolio.`}
                        className="btn-apply"
                      >
                        <Icons.Briefcase/> Enviar CV
                      </a>
                      <a 
                        href={`https://wa.me/${HR_WAPP}?text=${encodeURIComponent(`Hola, soy [Nombre] y me interesa el puesto de ${job.title}.`)}`}
                        target="_blank" 
                        rel="noreferrer" 
                        className="btn-wapp"
                      >
                        <Icons.Whatsapp/> Postular Rápido
                      </a>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="cta-box">
            <h3>¿No encuentras tu rol?</h3>
            <p>Siempre estamos buscando talento excepcional. Si crees que puedes aportar valor en otra área, escríbenos directamente.</p>
            <a href={`mailto:${HR_EMAIL}`} className="link-mail">{HR_EMAIL}</a>
          </div>

        </div>
      </section>

    </div>
  );
}