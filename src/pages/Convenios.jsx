import React, { useEffect } from "react";
import SEOHead from "../components/SEOHead"; // Asegúrate de tener este componente o quítalo si no lo usas
import { FaHandshake, FaBuilding, FaUserGraduate, FaChartLine, FaArrowRight, FaCheck } from "react-icons/fa";
import { BiWorld } from "react-icons/bi";

/* ──────────────────────────────────────────────────────────────────────────
   DATA: PARTNERS Y BENEFICIOS
   ────────────────────────────────────────────────────────────────────────── */
const PARTNERS = [
  { name: "Los Olivos", type: "Homeschool", color: "#84cc16" }, // Lime
  { name: "Muni. Santiago", type: "Alianza Pública", color: "#3b82f6" }, // Blue
  { name: "Caja Los Andes", type: "Bienestar", color: "#f97316" }, // Orange
  { name: "Fundación Futuro", type: "ONG Educativa", color: "#ec4899" }, // Pink
];

const BENEFITS = [
  {
    icon: <FaUserGraduate />,
    title: "Aranceles Preferenciales",
    desc: "Descuentos exclusivos para alumnos, colaboradores y sus cargas familiares en todos nuestros programas."
  },
  {
    icon: <BiWorld />,
    title: "Valor Agregado",
    desc: "Suma beneficios educativos a tu oferta sin costo operativo. Nosotros gestionamos matrícula y soporte."
  },
  {
    icon: <FaChartLine />,
    title: "Reportes de Impacto",
    desc: "Si becas a un grupo, entregamos informes de asistencia y rendimiento para tu rendición de cuentas."
  },
  {
    icon: <FaHandshake />,
    title: "Co-Branding",
    desc: "Aparece en nuestra web como Partner Oficial y realicemos charlas o webinars conjuntos."
  }
];

const TARGETS = [
  {
    id: "colegios",
    title: "Colegios y Homeschool",
    subtitle: "Potencia tu rendimiento PAES",
    desc: "Externaliza el reforzamiento académico o brinda un Preuniversitario de calidad a tus licenciados.",
    features: ["Ensayos Masivos", "Charlas Vocacionales", "Nivelación M1"],
    accent: "indigo"
  },
  {
    id: "empresas",
    title: "Empresas y Bienestar",
    subtitle: "El mejor beneficio familiar",
    desc: "Apoya a tus colaboradores donde más les importa: el futuro de sus hijos. Educación de calidad a un clic.",
    features: ["Descuento por Planilla", "Inglés Corporativo", "Soft Skills"],
    accent: "amber"
  },
  {
    id: "publico",
    title: "Municipios y ONGs",
    subtitle: "Impacto Social Real",
    desc: "Llevemos oportunidades de nivelación de estudios y preparación universitaria a su comuna.",
    features: ["Becas Sociales", "Programa 2x1", "Reinserción"],
    accent: "emerald"
  }
];

/* ──────────────────────────────────────────────────────────────────────────
   COMPONENTE PRINCIPAL
   ────────────────────────────────────────────────────────────────────────── */
export default function Convenios() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  // Link directo a WhatsApp B2B
  const waPartnerLink = `https://wa.me/56964626568?text=${encodeURIComponent("Hola, soy representante de una institución y me interesa generar un convenio.")}`;

  return (
    <div className="partners-page">
      {/* <SEOHead title="Convenios y Alianzas | Instituto Lael" description="Generamos alianzas con colegios y empresas." /> */}
      <style>{css}</style>

      {/* FONDO AMBIENTAL (Igual a Contacto para consistencia) */}
      <div className="ambient-orb c1"></div>
      <div className="ambient-orb c2"></div>

      <div className="container relative-z">
        
        {/* HERO */}
        <header className="hero-partners">
          <div className="hero-pill">
            <span className="pill-icon"><FaHandshake/></span> Red de Impacto Lael
          </div>
          <h1 className="hero-title">
            Crezcamos <span className="highlight">Juntos.</span>
          </h1>
          <p className="hero-desc">
            Establecemos alianzas estratégicas con colegios, empresas y fundaciones para democratizar el acceso a la educación. 
            <strong> Sin costos ocultos para tu organización.</strong>
          </p>
          <div className="cta-group">
            <a href={waPartnerLink} target="_blank" rel="noreferrer" className="btn-main">
              Quiero ser Partner <FaArrowRight />
            </a>
          </div>
        </header>

        {/* LOGO STRIP (Diseño Tipográfico Profesional) */}
        <div className="partner-strip">
          <p className="strip-label">ORGANIZACIONES QUE CONFÍAN EN NOSOTROS</p>
          <div className="logo-grid">
            {PARTNERS.map((p, i) => (
              <div key={i} className="partner-badge" style={{'--p-color': p.color}}>
                <span className="p-dot"></span>
                <div className="p-info">
                  <span className="p-name">{p.name}</span>
                  <span className="p-type">{p.type}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* BENEFICIOS */}
        <section className="benefits-section">
          <div className="section-header">
            <h2>¿Por qué aliarse con Lael?</h2>
          </div>
          <div className="grid-benefits">
            {BENEFITS.map((b, i) => (
              <div key={i} className="benefit-card">
                <div className="b-icon-box">{b.icon}</div>
                <h3>{b.title}</h3>
                <p>{b.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SEGMENTOS */}
        <section className="segments-section">
          <div className="section-header">
            <h2>Modelos de Colaboración</h2>
            <p>Adaptamos nuestra propuesta a la naturaleza de tu institución.</p>
          </div>
          
          <div className="seg-grid">
            {TARGETS.map((t) => (
              <div key={t.id} className={`seg-card border-${t.accent}`}>
                <div className={`seg-header bg-${t.accent}-dim`}>
                   <span className="seg-subtitle">{t.subtitle}</span>
                   <h3>{t.title}</h3>
                </div>
                <div className="seg-body">
                  <p>{t.desc}</p>
                  <ul className="features-list">
                    {t.features.map((f, i) => (
                      <li key={i}><FaCheck className={`check-${t.accent}`}/> {f}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="cta-box-section">
          <div className="cta-box">
            <div className="glow-overlay"></div>
            <div className="cta-content">
              <h2>¿Listo para formalizar una alianza?</h2>
              <p>La gestión es rápida, 100% digital y enfocada en el beneficio mutuo. Hablemos hoy mismo.</p>
              <a href={waPartnerLink} target="_blank" rel="noreferrer" className="btn-white">
                <FaBuilding /> Agendar Reunión
              </a>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   CSS SCOPED (DARK PREMIUM)
   ────────────────────────────────────────────────────────────────────────── */
const css = `
:root {
  --bg-deep: #050505;
  --bg-card: #0F1115;
  --primary: #6366f1; /* Indigo */
  --accent: #fbbf24;  /* Amber */
  --text-main: #f8fafc;
  --text-muted: #94a3b8;
  --border: rgba(255,255,255,0.08);
}

.partners-page {
  background-color: var(--bg-deep); color: var(--text-main);
  min-height: 100vh; font-family: 'Inter', sans-serif;
  padding-top: 120px; position: relative; overflow-x: hidden;
}

.container { max-width: 1100px; margin: 0 auto; padding: 0 24px; position: relative; z-index: 2; }
.relative-z { position: relative; z-index: 10; }

/* AMBIENT LIGHTS */
.ambient-orb { position: absolute; width: 60vw; height: 60vw; border-radius: 50%; filter: blur(120px); opacity: 0.1; pointer-events: none; }
.c1 { top: -20%; left: -20%; background: var(--primary); }
.c2 { bottom: -10%; right: -20%; background: var(--accent); }

/* HERO */
.hero-partners { text-align: center; margin-bottom: 80px; }
.hero-pill {
  display: inline-flex; align-items: center; gap: 8px;
  background: rgba(255,255,255,0.05); border: 1px solid var(--border);
  padding: 6px 16px; border-radius: 50px; font-size: 0.85rem; font-weight: 600;
  color: #cbd5e1; margin-bottom: 25px;
}
.pill-icon { color: var(--accent); }

.hero-title { 
  font-size: clamp(2.5rem, 5vw, 4.5rem); line-height: 1.1; font-weight: 800; margin-bottom: 20px; 
}
.highlight { 
  background: linear-gradient(to right, var(--primary), #a855f7); 
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; 
}
.hero-desc { color: var(--text-muted); font-size: 1.2rem; max-width: 700px; margin: 0 auto 40px; line-height: 1.6; }

.btn-main {
  background: var(--primary); color: white; padding: 15px 35px; border-radius: 50px;
  font-weight: 700; font-size: 1.1rem; display: inline-flex; align-items: center; gap: 10px;
  transition: 0.3s; text-decoration: none; box-shadow: 0 10px 30px -10px rgba(99, 102, 241, 0.4);
}
.btn-main:hover { transform: translateY(-3px); background: #4f46e5; }

/* LOGO STRIP */
.partner-strip { margin-bottom: 100px; text-align: center; }
.strip-label { font-size: 0.75rem; letter-spacing: 2px; color: #64748b; margin-bottom: 30px; font-weight: 700; }
.logo-grid { display: flex; flex-wrap: wrap; justify-content: center; gap: 20px; }

.partner-badge {
  background: rgba(255,255,255,0.03); border: 1px solid var(--border);
  padding: 12px 20px; border-radius: 12px; display: flex; align-items: center; gap: 12px;
  transition: 0.3s; cursor: default;
}
.partner-badge:hover { background: rgba(255,255,255,0.06); border-color: rgba(255,255,255,0.2); }
.p-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--p-color); box-shadow: 0 0 10px var(--p-color); }
.p-info { display: flex; flex-direction: column; text-align: left; }
.p-name { font-weight: 700; font-size: 0.95rem; line-height: 1.2; }
.p-type { font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase; }

/* BENEFITS */
.benefits-section { margin-bottom: 100px; }
.section-header { text-align: center; margin-bottom: 50px; }
.section-header h2 { font-size: 2rem; margin-bottom: 10px; }
.section-header p { color: var(--text-muted); font-size: 1.1rem; }

.grid-benefits { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 25px; }
.benefit-card {
  background: var(--bg-card); padding: 30px; border-radius: 20px; border: 1px solid var(--border);
  transition: 0.3s;
}
.benefit-card:hover { transform: translateY(-5px); border-color: var(--primary); }
.b-icon-box { 
  font-size: 2rem; color: var(--primary); margin-bottom: 20px; 
  background: rgba(99, 102, 241, 0.1); width: 60px; height: 60px; 
  display: flex; align-items: center; justify-content: center; border-radius: 14px;
}
.benefit-card h3 { font-size: 1.2rem; margin-bottom: 10px; }
.benefit-card p { color: var(--text-muted); font-size: 0.95rem; line-height: 1.5; }

/* SEGMENTS */
.segments-section { margin-bottom: 100px; }
.seg-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; }

.seg-card {
  background: var(--bg-card); border: 1px solid var(--border); border-radius: 24px; overflow: hidden;
  display: flex; flex-direction: column; transition: 0.3s;
}
.seg-card:hover { transform: translateY(-5px); }
.seg-header { padding: 30px; border-bottom: 1px solid var(--border); }
.seg-subtitle { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 1px; font-weight: 700; opacity: 0.8; }
.seg-header h3 { margin: 10px 0 0 0; font-size: 1.6rem; }
.seg-body { padding: 30px; flex: 1; display: flex; flex-direction: column; }
.seg-body p { color: var(--text-muted); margin-bottom: 25px; flex: 1; line-height: 1.5; }

.features-list { list-style: none; padding: 0; margin: 0; }
.features-list li { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; font-size: 0.9rem; }

/* Colors for Segments */
.border-indigo:hover { border-color: #6366f1; } .bg-indigo-dim { background: rgba(99, 102, 241, 0.1); color: #818cf8; } .check-indigo { color: #6366f1; }
.border-amber:hover { border-color: #f59e0b; } .bg-amber-dim { background: rgba(245, 158, 11, 0.1); color: #fbbf24; } .check-amber { color: #f59e0b; }
.border-emerald:hover { border-color: #10b981; } .bg-emerald-dim { background: rgba(16, 185, 129, 0.1); color: #34d399; } .check-emerald { color: #10b981; }

/* CTA BOX */
.cta-box {
  background: linear-gradient(135deg, #1e1b4b, #312e81);
  border-radius: 30px; padding: 60px; text-align: center; position: relative; overflow: hidden;
  border: 1px solid rgba(255,255,255,0.1);
}
.glow-overlay {
  position: absolute; top: 0; left: 0; width: 100%; height: 100%;
  background: radial-gradient(circle at 50% 0%, rgba(99, 102, 241, 0.4), transparent 70%);
}
.cta-content { position: relative; z-index: 2; }
.cta-content h2 { font-size: 2.2rem; margin-bottom: 15px; }
.cta-content p { font-size: 1.1rem; color: #c7d2fe; margin-bottom: 30px; max-width: 600px; margin-inline: auto; }

.btn-white {
  background: white; color: #1e1b4b; padding: 16px 40px; border-radius: 50px;
  font-weight: 800; font-size: 1rem; display: inline-flex; align-items: center; gap: 10px;
  text-decoration: none; transition: 0.3s;
}
.btn-white:hover { transform: scale(1.05); box-shadow: 0 0 30px rgba(255,255,255,0.3); }

@media (max-width: 768px) {
  .hero-partners { padding-top: 20px; }
  .logo-grid { gap: 10px; }
  .partner-badge { width: 100%; justify-content: center; }
  .cta-box { padding: 40px 20px; }
}
`;