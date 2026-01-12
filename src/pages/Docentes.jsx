// src/pages/Docentes.jsx
import { useEffect } from "react";
import { FaLinkedin, FaInstagram, FaEnvelope } from "react-icons/fa"; 
import SEOHead from "../components/SEOHead.jsx";
import { teachers } from "../data/teachers"; // <--- AQUÍ ESTÁ LA CONEXIÓN

export default function Docentes() {
  
  // Scroll al inicio al cargar la página
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="team-page">
      <SEOHead 
        title="Nuestro Equipo | Instituto Lael" 
        description="Conoce a los profesionales detrás de tu educación. Liderazgo, vocación y experiencia." 
      />
      <style>{css}</style>

      {/* --- LUCES AMBIENTALES --- */}
      <div className="glow-spot top-center"></div>

      <div className="container relative-z">
        
        {/* HEADER */}
        <header className="team-header">
          <span className="badge-team">Humanos, no Robots</span>
          <h1>Mentores con <span className="text-grad">Vocación.</span></h1>
          <p className="lead">
            Detrás de cada clase, guía y ensayo, hay un equipo de personas reales 
            comprometidas con tu futuro. Conoce a quienes lideran tu proceso.
          </p>
        </header>

        {/* GRID DEL EQUIPO */}
        <div className="team-grid">
          {teachers.map((member) => (
            <div 
              key={member.id} 
              className={`team-card ${member.featured ? 'featured' : ''}`}
              style={{ '--accent': member.accent }}
            >
              <div className="card-bg-glow"></div>
              
              <div className="member-visual">
                <img src={member.img} alt={member.name} className="member-img" />
                
                {/* Redes Sociales Dinámicas */}
                <div className="member-social">
                  {member.social?.linkedin && (
                    <a href={member.social.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                      <FaLinkedin/>
                    </a>
                  )}
                  {member.social?.instagram && (
                    <a href={member.social.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
                      <FaInstagram/>
                    </a>
                  )}
                  <a href={`mailto:contacto@institutolael.cl`} aria-label="Correo">
                    <FaEnvelope/>
                  </a>
                </div>
              </div>

              <div className="member-info">
                <span className="member-role" style={{ color: member.accent }}>
                  {member.role}
                </span>
                <h3>{member.name}</h3>
                <p className="member-bio">{member.bio}</p>
                
                <div className="tags-row">
                  {member.tags.map(tag => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA UNIRSE */}
        <div className="join-cta">
          <h3>¿Eres profe y tienes esta misma pasión?</h3>
          <p>Siempre buscamos talentos para sumar a nuestras filas.</p>
          <a href="/trabaja" className="btn-join">Postular al Equipo →</a>
        </div>

      </div>
    </div>
  );
}

/* ================= CSS (DARK PREMIUM TEAM) ================= */
const css = `
:root {
  --bg-deep: #050505;
  --bg-card: #0F1115;
  --border: rgba(255, 255, 255, 0.1);
  --text-main: #F8FAFC;
  --text-muted: #94A3B8;
}

.team-page {
  background-color: var(--bg-deep);
  color: var(--text-main);
  min-height: 100vh;
  font-family: 'Inter', sans-serif;
  padding-bottom: 80px;
  position: relative;
  overflow-x: hidden;
}

.container { max-width: 1100px; margin: 0 auto; padding: 0 20px; }
.relative-z { position: relative; z-index: 2; }

/* AMBIENT LIGHT */
.glow-spot {
  position: absolute; width: 600px; height: 600px; border-radius: 50%;
  filter: blur(150px); opacity: 0.15; pointer-events: none; z-index: 0;
}
.top-center { top: -300px; left: 50%; transform: translateX(-50%); background: #6366F1; }

/* HEADER */
.team-header { text-align: center; padding: 120px 0 60px; position: relative; z-index: 2; }
.badge-team {
  display: inline-block; background: rgba(255,255,255,0.05); border: 1px solid var(--border);
  padding: 6px 14px; border-radius: 50px; font-size: 0.8rem; font-weight: 700; 
  text-transform: uppercase; margin-bottom: 20px; color: #cbd5e1; letter-spacing: 1px;
}
.team-header h1 { font-size: clamp(2.5rem, 5vw, 4rem); font-weight: 800; margin-bottom: 20px; line-height: 1.1; }
.text-grad { background: linear-gradient(135deg, #fff 0%, #94a3b8 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
.lead { font-size: 1.2rem; color: var(--text-muted); max-width: 600px; margin: 0 auto; line-height: 1.6; }

/* GRID */
.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  position: relative; z-index: 2;
}

/* CARD */
.team-card {
  background: var(--bg-card); border: 1px solid var(--border); border-radius: 24px;
  padding: 30px; display: flex; flex-direction: column; align-items: center; text-align: center;
  position: relative; overflow: hidden; transition: .3s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.team-card:hover { transform: translateY(-10px); border-color: var(--accent); }

/* Glow Effect on Hover */
.card-bg-glow {
  position: absolute; top: 0; left: 0; width: 100%; height: 100%;
  background: radial-gradient(circle at top, var(--accent), transparent 70%);
  opacity: 0; transition: .5s; z-index: 0; pointer-events: none;
}
.team-card:hover .card-bg-glow { opacity: 0.1; }

/* Visuals */
.member-visual { position: relative; z-index: 2; margin-bottom: 20px; }
.member-img {
  width: 120px; height: 120px; border-radius: 50%; object-fit: cover;
  border: 2px solid var(--accent); box-shadow: 0 0 20px rgba(0,0,0,0.5);
  transition: .3s;
}
.team-card:hover .member-img { transform: scale(1.05); box-shadow: 0 0 30px var(--accent); }

/* Social Icons (Hidden by default, show on hover) */
.member-social {
  position: absolute; bottom: -10px; left: 50%; transform: translateX(-50%) translateY(20px);
  display: flex; gap: 10px; opacity: 0; transition: .3s;
  background: rgba(0,0,0,0.8); padding: 5px 10px; border-radius: 20px; border: 1px solid var(--border);
}
.team-card:hover .member-social { opacity: 1; transform: translateX(-50%) translateY(0); }
.member-social a { color: #fff; font-size: 1rem; padding: 5px; transition: .2s; }
.member-social a:hover { color: var(--accent); }

/* Info */
.member-info { position: relative; z-index: 2; width: 100%; }
.member-role {
  font-size: 0.8rem; font-weight: 800; text-transform: uppercase; letter-spacing: 1px;
  display: block; margin-bottom: 8px;
}
.team-card h3 { font-size: 1.5rem; margin-bottom: 15px; font-weight: 700; color: #fff; }
.member-bio { font-size: 0.95rem; color: var(--text-muted); line-height: 1.6; margin-bottom: 20px; }

/* Tags */
.tags-row { display: flex; flex-wrap: wrap; justify-content: center; gap: 8px; }
.tag {
  background: rgba(255,255,255,0.05); border: 1px solid var(--border);
  color: var(--text-muted); font-size: 0.7rem; padding: 4px 10px; border-radius: 6px;
}

/* DESTACADO (Director) */
.team-card.featured {
  grid-column: 1 / -1; 
  background: linear-gradient(180deg, #161209, #0F1115);
  border-color: #F59E0B;
}
@media (min-width: 900px) {
  .team-card.featured {
    flex-direction: row; text-align: left; align-items: center; padding: 40px; gap: 40px;
  }
  .team-card.featured .member-img { width: 160px; height: 160px; }
  .team-card.featured .member-social { bottom: 20px; transform: translateX(-50%); } 
  .team-card.featured .tags-row { justify-content: flex-start; }
}

/* JOIN CTA */
.join-cta {
  margin-top: 80px; text-align: center; padding: 60px;
  background: rgba(255,255,255,0.02); border: 1px dashed var(--border); border-radius: 30px;
}
.join-cta h3 { font-size: 1.8rem; margin-bottom: 10px; }
.join-cta p { color: var(--text-muted); margin-bottom: 30px; }
.btn-join {
  display: inline-block; background: #fff; color: #000; padding: 12px 30px;
  border-radius: 50px; font-weight: 700; text-decoration: none; transition: .2s;
}
.btn-join:hover { transform: scale(1.05); }
`;