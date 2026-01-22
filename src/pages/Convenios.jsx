import React, { useEffect } from "react";
import SEOHead from "../components/SEOHead.jsx";
import { FaHandshake, FaBuilding, FaUserGraduate, FaChartLine, FaArrowRight, FaCheck } from "react-icons/fa";
import { BiWorld } from "react-icons/bi";

/* ──────────────────────────────────────────────────────────────────────────
   DATA
   ────────────────────────────────────────────────────────────────────────── */
const PARTNERS = [
  { name: "INO", type: "Salud Visual", color: "#3b82f6" },
  { name: "Naamá Studio", type: "Potenciación Humana", color: "#fbbf24" },
  { name: "Los Olivos", type: "Homeschool", color: "#84cc16" },
];

const BENEFITS = [
  {
    icon: <FaUserGraduate />,
    title: "Aranceles Preferenciales",
    desc: "Descuentos exclusivos para tu comunidad en todos nuestros programas PAES e Idiomas."
  },
  {
    icon: <BiWorld />,
    title: "Valor Agregado",
    desc: "Suma beneficios educativos a tu oferta sin costo operativo. Nosotros gestionamos todo."
  },
  {
    icon: <FaChartLine />,
    title: "Reportes de Gestión",
    desc: "Entregamos informes de asistencia y rendimiento académico para tu rendición de cuentas."
  },
  {
    icon: <FaHandshake />,
    title: "Co-Branding",
    desc: "Aparición en nuestra web como Partner Oficial y realización de charlas conjuntas."
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
    desc: "Apoya a tus colaboradores donde más les importa: el futuro de sus hijos.",
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
   COMPONENTE
   ────────────────────────────────────────────────────────────────────────── */
export default function Convenios() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const waPartnerLink = `https://wa.me/56964626568?text=${encodeURIComponent("Hola, soy representante de una institución y me interesa generar un convenio.")}`;

  return (
    <div className="partners-page">
      <SEOHead title="Convenios y Alianzas | Instituto Lael" description="Generamos alianzas estratégicas con colegios y empresas." />
      <style>{css}</style>

      {/* FONDO AMBIENTAL */}
      <div className="glow-orb orb-1"></div>
      <div className="glow-orb orb-2"></div>

      <div className="container relative-z">

        {/* HERO */}
        <header className="hero-partners">
          <div className="hero-pill">
            <span className="pill-icon"><FaHandshake /></span> Red de Impacto Lael
          </div>
          <h1 className="hero-title">
            Crezcamos <span className="highlight">Juntos.</span>
          </h1>
          <p className="hero-desc">
            Establecemos alianzas con colegios, empresas y fundaciones para democratizar el acceso a la educación.
            <strong> Sin costos ocultos para tu organización.</strong>
          </p>
          <div className="cta-group">
            <a href={waPartnerLink} target="_blank" rel="noreferrer" className="btn-main">
              Quiero ser Partner <FaArrowRight />
            </a>
          </div>
        </header>

        {/* LOGO STRIP */}
        <div className="partner-strip">
          <p className="strip-label">ORGANIZACIONES QUE CONFÍAN EN NOSOTROS</p>
          <div className="logo-grid">
            {PARTNERS.map((p, i) => (
              <div key={i} className="partner-badge" style={{ '--p-color': p.color }}>
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
            <p>Infraestructura académica lista para implementar.</p>
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
                      <li key={i}><FaCheck className={`check-${t.accent}`} /> {f}</li>
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
   CSS SCOPED
   ────────────────────────────────────────────────────────────────────────── */
const css = `
:root {
  --bg-deep: #020617;
  --bg-card: #0f172a;
  --bg-input: #1e293b;
  --primary: #6366f1; /* Indigo */
  --accent: #fbbf24;  /* Amber */
  --text-main: #f8fafc;
  --text-muted: #94a3b8;
  --border: rgba(255,255,255,0.08);
}

.partners-page {
  background-color: var(--bg-deep); color: var(--text-main);
  min-height: 100vh; font-family: 'Inter', sans-serif;
  padding-top: 120px; padding-bottom: 80px; position: relative; overflow-x: hidden;
}

.container { max-width: 1100px; margin: 0 auto; padding: 0 24px; position: relative; z-index: 2; }
.relative-z { position: relative; z-index: 10; }

/* ORBES DE FONDO */
.glow-orb { position: absolute; width: 800px; height: 800px; border-radius: 50%; filter: blur(120px); opacity: 0.08; pointer-events: none; }
.orb-1 { top: -200px; left: -200px; background: var(--primary); }
.orb-2 { bottom: -200px; right: -200px; background: var(--accent); }

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
  font-family: 'Playfair Display', serif;
  font-size: clamp(2.5rem, 5vw, 4rem); line-height: 1.1; margin-bottom: 20px; 
}
.highlight { 
  background: linear-gradient(to right, #fff, #94a3b8); 
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; 
}
.hero-desc { color: var(--text-muted); font-size: 1.15rem; max-width: 700px; margin: 0 auto 40px; line-height: 1.6; }

.btn-main {
  background: var(--primary); color: white; padding: 15px 35px; border-radius: 50px;
  font-weight: 700; font-size: 1.1rem; display: inline-flex; align-items: center; gap: 10px;
  transition: 0.3s; text-decoration: none; box-shadow: 0 10px 30px -10px rgba(99, 102, 241, 0.4);
}
.btn-main:hover { transform: translateY(-3px); background: #4f46e5; color: white; }

/* LOGO STRIP */
.partner-strip { margin-bottom: 100px; text-align: center; }
.strip-label { font-size: 0.75rem; letter-spacing: 2px; color: #64748b; margin-bottom: 30px; font-weight: 700; opacity: 0.7; }
.logo-grid { display: flex; flex-wrap: wrap; justify-content: center; gap: 20px; }

.partner-badge {
  background: rgba(255,255,255,0.03); border: 1px solid var(--border);
  padding: 12px 24px; border-radius: 50px; display: flex; align-items: center; gap: 12px;
  transition: 0.3s; cursor: default;
}
.partner-badge:hover { background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.2); }
.p-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--p-color); box-shadow: 0 0 10px var(--p-color); }
.p-info { display: flex; flex-direction: column; text-align: left; }
.p-name { font-weight: 700; font-size: 0.95rem; line-height: 1.2; }
.p-type { font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase; }

/* BENEFITS */
.benefits-section { margin-bottom: 120px; }
.section-header { text-align: center; margin-bottom: 60px; }
.section-header h2 { font-size: 2.2rem; margin-bottom: 10px; font-family: 'Playfair Display', serif; }
.section-header p { color: var(--text-muted); font-size: 1.1rem; }

.grid-benefits { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 30px; }
.benefit-card {
  background: var(--bg-card); padding: 35px; border-radius: 20px; border: 1px solid var(--border);
  transition: 0.3s; position: relative; overflow: hidden;
}
.benefit-card:hover { transform: translateY(-7px); border-color: rgba(99, 102, 241, 0.4); box-shadow: 0 10px 40px rgba(0,0,0,0.4); }

.b-icon-box { 
  font-size: 1.8rem; color: var(--primary); margin-bottom: 25px; 
  background: rgba(99, 102, 241, 0.1); width: 60px; height: 60px; 
  display: flex; align-items: center; justify-content: center; border-radius: 14px;
}
.benefit-card h3 { font-size: 1.25rem; margin-bottom: 12px; font-weight: 700; }
.benefit-card p { color: var(--text-muted); font-size: 0.95rem; line-height: 1.6; }

/* SEGMENTS */
.segments-section { margin-bottom: 120px; }
.seg-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 30px; }

.seg-card {
  background: var(--bg-card); border: 1px solid var(--border); border-radius: 24px; overflow: hidden;
  display: flex; flex-direction: column; transition: 0.3s;
}
.seg-card:hover { transform: translateY(-5px); box-shadow: 0 20px 40px rgba(0,0,0,0.3); }

.seg-header { padding: 40px 30px; border-bottom: 1px solid var(--border); }
.seg-subtitle { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 1px; font-weight: 800; opacity: 0.9; }
.seg-header h3 { margin: 10px 0 0 0; font-size: 1.7rem; font-family: 'Playfair Display', serif; }

.seg-body { padding: 30px; flex: 1; display: flex; flex-direction: column; }
.seg-body p { color: var(--text-muted); margin-bottom: 30px; flex: 1; line-height: 1.6; font-size: 0.95rem; }

.features-list { list-style: none; padding: 0; margin: 0; }
.features-list li { display: flex; align-items: center; gap: 12px; margin-bottom: 15px; font-size: 0.95rem; color: #e2e8f0; }

/* Colors for Segments */
.border-indigo:hover { border-color: #6366f1; } .bg-indigo-dim { background: linear-gradient(135deg, rgba(99,102,241,0.1), rgba(99,102,241,0.02)); color: #a5b4fc; } .check-indigo { color: #818cf8; }
.border-amber:hover { border-color: #f59e0b; } .bg-amber-dim { background: linear-gradient(135deg, rgba(245,158,11,0.1), rgba(245,158,11,0.02)); color: #fcd34d; } .check-amber { color: #fbbf24; }
.border-emerald:hover { border-color: #10b981; } .bg-emerald-dim { background: linear-gradient(135deg, rgba(16,185,129,0.1), rgba(16,185,129,0.02)); color: #6ee7b7; } .check-emerald { color: #34d399; }

/* CTA BOX */
.cta-box {
  background: linear-gradient(135deg, #1e1b4b 0%, #312e81 100%);
  border-radius: 30px; padding: 80px 40px; text-align: center; position: relative; overflow: hidden;
  border: 1px solid rgba(255,255,255,0.1);
  box-shadow: 0 20px 60px rgba(0,0,0,0.4);
}
.glow-overlay {
  position: absolute; top: 0; left: 0; width: 100%; height: 100%;
  background: radial-gradient(circle at 50% 0%, rgba(99, 102, 241, 0.4), transparent 70%);
  pointer-events: none;
}
.cta-content { position: relative; z-index: 2; }
.cta-content h2 { font-size: 2.5rem; margin-bottom: 15px; font-family: 'Playfair Display', serif; }
.cta-content p { font-size: 1.1rem; color: #c7d2fe; margin-bottom: 35px; max-width: 600px; margin-inline: auto; }

.btn-white {
  background: white; color: #1e1b4b; padding: 18px 45px; border-radius: 50px;
  font-weight: 800; font-size: 1.1rem; display: inline-flex; align-items: center; gap: 10px;
  text-decoration: none; transition: 0.3s;
}
.btn-white:hover { transform: scale(1.05); box-shadow: 0 0 30px rgba(255,255,255,0.4); }

@media (max-width: 768px) {
  .hero-partners { padding-top: 20px; }
  .logo-grid { gap: 10px; }
  .partner-badge { width: 100%; justify-content: center; }
  .cta-box { padding: 50px 20px; }
}
`;