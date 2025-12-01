// src/pages/Docentes.jsx
import { useEffect } from "react";
import { FaLinkedin, FaInstagram, FaEnvelope } from "react-icons/fa"; 
import SEOHead from "../components/SEOHead.jsx";

// --- DATA DEL EQUIPO REAL ---
const TEAM = [
  {
    id: "diego",
    name: "Diego Chaparro",
    role: "Director & Profe Matemáticas",
    bio: "Fundador de Instituto Lael. Comenzó enseñando matemáticas con una pizarra y hoy lidera la visión educativa. Cree firmemente que los números no son difíciles, solo están mal explicados.",
    tags: ["Liderazgo", "Matemáticas", "Estrategia"],
    color: "#F59E0B", // Gold
    img: "https://ui-avatars.com/api/?name=Diego+Chaparro&background=F59E0B&color=fff&size=200", // Cambiar por foto real cuando puedas
    social: { linkedin: "#", instagram: "#" }
  },
  {
    id: "camila",
    name: "Camila Acuña",
    role: "Coordinadora Académica",
    bio: "El corazón operativo de Lael. Se encarga de que cada alumno tenga su material a tiempo, los horarios cuadren y que la experiencia educativa sea impecable.",
    tags: ["Coordinación", "Gestión", "Planificación"],
    color: "#F43F5E", // Rose
    img: "https://ui-avatars.com/api/?name=Camila+Acuna&background=F43F5E&color=fff&size=200",
    social: { linkedin: "#" }
  },
  {
    id: "fernanda",
    name: "Fernanda",
    role: "Educadora & Facilitadora LSCh",
    bio: "Nuestra profesora nativa (Sorda) y Educadora de Párvulos profesional. Combina la cultura sorda con una pedagogía experta, paciente y estructurada.",
    tags: ["Sorda Nativa", "Educ. Párvulos", "LSCh"],
    color: "#10B981", // Emerald
    img: "https://ui-avatars.com/api/?name=Fernanda+LSCh&background=10B981&color=fff&size=200",
    social: { instagram: "#" }
  },
  {
    id: "martin",
    name: "Martín",
    role: "Profe de Ciencias",
    bio: "Especialista en Biología y Química. Transforma materias complejas en clases dinámicas, enfocándose en que entiendas el 'por qué' de los fenómenos científicos.",
    tags: ["Biología", "Química", "PAES Ciencias"],
    color: "#3B82F6", // Blue
    img: "https://ui-avatars.com/api/?name=Martin+Ciencias&background=3B82F6&color=fff&size=200",
    social: {}
  }
];

export default function Docentes() {
  return (
    <div className="team-page">
      <SEOHead 
        title="Nuestro Equipo | Instituto Lael" 
        description="Conoce a los profesionales detrás de tu educación. Liderazgo, vocación y experiencia." 
      />
      <style>{css}</style>

      {/* --- LUCES AMBIENTALES --- */}
      <div className="glow-spot top-center"></div>

      <div className="container">
        
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
          {TEAM.map((member) => (
            <div 
              key={member.id} 
              className={`team-card ${member.id === 'diego' ? 'featured' : ''}`}
              style={{ '--accent': member.color }}
            >
              <div className="card-bg-glow"></div>
              
              <div className="member-visual">
                <img src={member.img} alt={member.name} className="member-img" />
                <div className="member-social">
                  {member.social.linkedin && <a href={member.social.linkedin} target="_blank" rel="noreferrer"><FaLinkedin/></a>}
                  {member.social.instagram && <a href={member.social.instagram} target="_blank" rel="noreferrer"><FaInstagram/></a>}
                  <a href={`mailto:contacto@institutolael.cl`}><FaEnvelope/></a>
                </div>
              </div>

              <div className="member-info">
                <span className="member-role" style={{ color: member.color }}>{member.role}</span>
                <h3>{member.name}</h3>
                <p>{member.bio}</p>
                
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
  opacity: 0; transition: .5s; z-index: 0;
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
.member-info { position: relative; z-index: 2; }
.member-role {
  font-size: 0.8rem; font-weight: 800; text-transform: uppercase; letter-spacing: 1px;
  display: block; margin-bottom: 8px;
}
.team-card h3 { font-size: 1.5rem; margin-bottom: 15px; font-weight: 700; color: #fff; }
.team-card p { font-size: 0.95rem; color: var(--text-muted); line-height: 1.6; margin-bottom: 20px; }

/* Tags */
.tags-row { display: flex; flex-wrap: wrap; justify-content: center; gap: 8px; }
.tag {
  background: rgba(255,255,255,0.05); border: 1px solid var(--border);
  color: var(--text-muted); font-size: 0.7rem; padding: 4px 10px; border-radius: 6px;
}

/* DESTACADO (Director) */
.team-card.featured {
  grid-column: 1 / -1; /* Ocupa todo el ancho en desktop si quieres, o déjalo igual */
  background: linear-gradient(180deg, #161209, #0F1115);
  border-color: #F59E0B;
}
@media (min-width: 900px) {
  .team-card.featured {
    flex-direction: row; text-align: left; align-items: center; padding: 40px; gap: 40px;
  }
  .team-card.featured .member-img { width: 160px; height: 160px; }
  .team-card.featured .member-social { bottom: 20px; transform: translateX(-50%); } 
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