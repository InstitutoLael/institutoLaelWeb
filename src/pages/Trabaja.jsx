import React, { useState, useEffect } from "react";
import SEOHead from "../components/SEOHead.jsx";

// 👇 AQUÍ IMPORTAMOS LOS DATOS
import { PERKS, OPENINGS, HR_EMAIL, HR_WAPP } from "../data/jobs.js";

/* ──────────────────────────────────────────────────────────────────────────
   1. ICONOS SVG (Minimalistas)
   ────────────────────────────────────────────────────────────────────────── */
const Icons = {
  Briefcase: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>,
  ChevronDown: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>,
  Send: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>,
  Heart: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg>
};

/* ──────────────────────────────────────────────────────────────────────────
   2. COMPONENTE PRINCIPAL
   ────────────────────────────────────────────────────────────────────────── */
export default function Trabaja() {
  const [activeJob, setActiveJob] = useState(null);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="careers-page">
      <SEOHead title="Trabaja con Nosotros | Lael Careers" description="Únete a un equipo que transforma la educación." />
      <style>{css}</style>

      {/* Luces de Fondo */}
      <div className="career-glow glow-1"></div>
      <div className="career-glow glow-2"></div>

      <div className="container">

        {/* HERO SECTION */}
        <header className="career-hero">
          <div className="pill-badge">Hiring Now</div>
          <h1>
            Enseña con <span className="text-gradient">Propósito.</span>
          </h1>
          <p className="hero-lead">
            No buscamos "empleados". Buscamos mentores apasionados que quieran dejar una huella real en la vida de sus estudiantes.
            Si crees que la educación es un acto de servicio, este es tu lugar.
          </p>
          <div className="hero-btns">
            <a href="#positions" className="btn-primary">Ver Oportunidades</a>
            <a href="#culture" className="btn-ghost">Nuestra Cultura</a>
          </div>
        </header>

        {/* BENEFICIOS (BENTO GRID) */}
        <section id="culture" className="perks-section">
          <h2 className="section-title">¿Por qué Lael?</h2>
          <div className="perks-grid">
            {PERKS.map((p, i) => (
              <div key={i} className="perk-card">
                <div className="perk-icon">{p.icon}</div>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* LISTA DE VACANTES */}
        <section id="positions" className="jobs-section">
          <h2 className="section-title">Posiciones Abiertas</h2>
          <div className="jobs-list">
            {OPENINGS.map(job => (
              <div key={job.id} className={`job-card ${activeJob === job.id ? 'open' : ''}`}>

                {/* Header de la Tarjeta */}
                <div className="job-header" onClick={() => setActiveJob(activeJob === job.id ? null : job.id)}>
                  <div className="job-main-info">
                    <h3>{job.title}</h3>
                    <div className="tags-row">
                      <span className="tag type">{job.type}</span>
                      {job.tags.map((t, idx) => <span key={idx} className="tag">{t}</span>)}
                    </div>
                  </div>
                  <button className="toggle-btn">
                    <Icons.ChevronDown />
                  </button>
                </div>

                {/* Cuerpo Desplegable */}
                <div className="job-body">
                  <div className="job-content">
                    <p className="description">{job.desc}</p>

                    <div className="req-box">
                      <h4>Requisitos</h4>
                      <ul>
                        {job.requirements.map((r, idx) => <li key={idx}>{r}</li>)}
                      </ul>
                    </div>

                    <div className="salary-box">
                      <strong>💰 Honorarios Referenciales:</strong> {job.salary}
                    </div>

                    <div className="apply-actions">
                      <a
                        href={`mailto:${HR_EMAIL}?subject=Postulación: ${job.title}`}
                        className="btn-apply"
                      >
                        <Icons.Send /> Enviar CV por Correo
                      </a>
                      <a
                        href={`https://wa.me/${HR_WAPP}?text=Hola,%20me%20interesa%20el%20puesto%20de%20${encodeURIComponent(job.title)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-link"
                      >
                        Consultar por WhatsApp
                      </a>
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </section>

        {/* CTA FINAL (TALENT POOL) */}
        <section className="talent-pool">
          <div className="pool-content">
            <div className="icon-heart"><Icons.Heart /></div>
            <h3>¿No ves tu cargo ideal?</h3>
            <p>
              Siempre estamos buscando talento excepcional. Si eres psicopedagogo, diseñador, o simplemente un crack en lo que haces, queremos conocerte.
            </p>
            <a href={`mailto:${HR_EMAIL}`} className="btn-pool">Enviar CV a Base de Talentos</a>
          </div>
        </section>

      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   3. ESTILOS CSS - "CAREER HUB"
   ────────────────────────────────────────────────────────────────────────── */
const css = `
:root {
  --bg-deep: #050505;
  --bg-card: #0f1115;
  --bg-hover: #18181b;
  
  --primary: #8b5cf6; /* Violeta */
  --primary-glow: rgba(139, 92, 246, 0.4);
  --accent: #ec4899;  /* Rosa */
  
  --text-main: #f8fafc;
  --text-muted: #94a3b8;
  
  --border: rgba(255,255,255,0.08);
  --radius: 16px;
}

.careers-page {
  background-color: var(--bg-deep); color: var(--text-main);
  font-family: 'Inter', sans-serif; min-height: 100vh;
  padding: 120px 0 100px; position: relative; overflow-x: hidden;
}

.container { max-width: 900px; margin: 0 auto; padding: 0 24px; position: relative; z-index: 2; }

/* Background FX */
.career-glow { position: absolute; border-radius: 50%; filter: blur(120px); opacity: 0.15; pointer-events: none; }
.glow-1 { width: 600px; height: 600px; top: -200px; right: -100px; background: var(--primary); }
.glow-2 { width: 500px; height: 500px; top: 40%; left: -200px; background: var(--accent); }

/* HERO */
.career-hero { text-align: center; margin-bottom: 100px; }
.pill-badge { 
  display: inline-block; background: rgba(236, 72, 153, 0.1); color: #f472b6; 
  padding: 6px 14px; border-radius: 50px; font-size: 0.75rem; font-weight: 700; 
  text-transform: uppercase; margin-bottom: 20px; border: 1px solid rgba(236, 72, 153, 0.2);
}
.career-hero h1 { font-size: clamp(2.5rem, 5vw, 4.5rem); margin-bottom: 20px; font-weight: 800; line-height: 1.1; }
.text-gradient { background: linear-gradient(135deg, #a78bfa 0%, #f472b6 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
.hero-lead { font-size: 1.2rem; color: var(--text-muted); max-width: 600px; margin: 0 auto 40px; line-height: 1.6; }

.hero-btns { display: flex; gap: 15px; justify-content: center; }
.btn-primary { 
  background: var(--primary); color: white; padding: 14px 28px; border-radius: 50px; 
  font-weight: 700; text-decoration: none; transition: 0.3s; box-shadow: 0 10px 25px -5px var(--primary-glow);
}
.btn-primary:hover { transform: translateY(-3px); box-shadow: 0 15px 35px -5px var(--primary-glow); filter: brightness(1.1); }
.btn-ghost { 
  background: transparent; color: white; padding: 14px 28px; border-radius: 50px; 
  font-weight: 600; text-decoration: none; border: 1px solid var(--border); transition: 0.3s;
}
.btn-ghost:hover { background: rgba(255,255,255,0.05); border-color: white; }

/* PERKS (BENTO) */
.section-title { font-size: 2rem; margin-bottom: 40px; text-align: center; }
.perks-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 100px; }
.perk-card {
  background: var(--bg-card); border: 1px solid var(--border); padding: 30px; border-radius: var(--radius);
  text-align: center; transition: 0.3s;
}
.perk-card:hover { transform: translateY(-5px); border-color: var(--primary); }
.perk-icon { font-size: 2.5rem; margin-bottom: 15px; }
.perk-card h3 { font-size: 1.1rem; margin-bottom: 8px; color: white; }
.perk-card p { font-size: 0.9rem; color: var(--text-muted); line-height: 1.5; margin: 0; }

/* JOB LIST (ACCORDION PREMIUM) */
.jobs-list { display: flex; flex-direction: column; gap: 15px; }
.job-card {
  background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius);
  overflow: hidden; transition: 0.3s;
}
.job-card:hover { border-color: rgba(255,255,255,0.2); }
.job-card.open { border-color: var(--primary); background: rgba(139, 92, 246, 0.03); }

.job-header { 
  padding: 25px; display: flex; justify-content: space-between; align-items: center; cursor: pointer; 
}
.job-main-info h3 { font-size: 1.25rem; margin-bottom: 8px; font-weight: 700; color: white; }
.tags-row { display: flex; gap: 8px; flex-wrap: wrap; }
.tag { font-size: 0.75rem; color: var(--text-muted); background: rgba(255,255,255,0.05); padding: 4px 10px; border-radius: 6px; }
.tag.type { color: var(--primary); background: rgba(139, 92, 246, 0.1); font-weight: 700; }

.toggle-btn { 
  background: transparent; color: var(--text-muted); width: 36px; height: 36px; 
  display: flex; align-items: center; justify-content: center; border-radius: 50%; border: 1px solid var(--border); transition: 0.3s;
}
.job-card.open .toggle-btn { transform: rotate(180deg); background: var(--primary); color: white; border-color: var(--primary); }

.job-body { 
  max-height: 0; overflow: hidden; transition: max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1); 
}
.job-card.open .job-body { max-height: 600px; /* Suficiente para contenido */ }

.job-content { padding: 0 25px 30px; border-top: 1px solid var(--border); margin-top: 5px; animation: fadeIn 0.5s ease; }
.description { font-size: 1rem; color: #cbd5e1; line-height: 1.6; margin: 20px 0; }

.req-box h4 { font-size: 0.9rem; text-transform: uppercase; color: var(--text-muted); margin-bottom: 10px; letter-spacing: 1px; }
.req-box ul { list-style: none; padding: 0; margin-bottom: 25px; }
.req-box li { position: relative; padding-left: 20px; margin-bottom: 6px; font-size: 0.95rem; color: #e2e8f0; }
.req-box li::before { content: '•'; color: var(--primary); position: absolute; left: 0; font-weight: bold; }

.salary-box { background: rgba(255,255,255,0.03); padding: 12px; border-radius: 8px; font-size: 0.9rem; color: white; margin-bottom: 25px; display: inline-block; }

.apply-actions { display: flex; gap: 15px; flex-wrap: wrap; }
.btn-apply {
  background: white; color: black; padding: 12px 24px; border-radius: 8px; font-weight: 700; 
  display: flex; align-items: center; gap: 8px; font-size: 0.9rem; text-decoration: none; transition: 0.2s;
}
.btn-apply:hover { background: #e2e8f0; transform: translateY(-2px); }
.btn-link {
  background: transparent; color: white; padding: 12px 24px; border-radius: 8px; font-weight: 600; 
  border: 1px solid var(--border); text-decoration: none; transition: 0.2s; font-size: 0.9rem;
}
.btn-link:hover { border-color: white; }

/* TALENT POOL */
.talent-pool { margin-top: 80px; text-align: center; }
.pool-content { 
  background: linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%); 
  padding: 50px 30px; border-radius: 24px; border: 1px solid rgba(139, 92, 246, 0.3);
  box-shadow: 0 20px 50px -10px rgba(0,0,0,0.5);
}
.icon-heart { font-size: 2rem; color: var(--accent); margin-bottom: 15px; animation: pulse 2s infinite; }
.pool-content h3 { font-size: 1.8rem; margin-bottom: 10px; }
.pool-content p { color: var(--text-muted); max-width: 500px; margin: 0 auto 30px; font-size: 1rem; }
.btn-pool { 
  display: inline-block; background: var(--primary); color: white; padding: 14px 30px; 
  border-radius: 50px; font-weight: 700; text-decoration: none; transition: 0.3s;
}
.btn-pool:hover { filter: brightness(1.1); transform: scale(1.05); }

@keyframes fadeIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
@keyframes pulse { 0% { transform: scale(1); } 50% { transform: scale(1.1); } 100% { transform: scale(1); } }

@media (max-width: 600px) {
  .job-header { flex-direction: column; align-items: flex-start; gap: 15px; }
  .toggle-btn { position: absolute; top: 20px; right: 20px; }
  .job-card { position: relative; }
  .apply-actions { flex-direction: column; }
  .btn-apply, .btn-link { width: 100%; justify-content: center; }
}
`;