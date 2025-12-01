import { useEffect } from "react";
import { Link } from "react-router-dom";

/* ──────────────────────────────────────────────────────────────────────────
   1. ASSETS & DATA INTERNA (Para que funcione de inmediato)
   ────────────────────────────────────────────────────────────────────────── */
// Imagen de fondo inspiradora (Networking / Apretón de manos moderno)
const NetworkImg = "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1200&auto=format&fit=crop";

// Logos de Partners (Placeholder para que veas el efecto, reemplázalos con los tuyos)
// Aquí deberías poner el de "Los Olivos" y otros que tengas.
const PARTNERS = [
  { name: "Los Olivos", type: "Homeschool" },
  { name: "Muni. Santiago", type: "Municipalidad" }, 
  { name: "Caja Los Andes", type: "Bienestar" },
  { name: "Fundación X", type: "ONG" },
];

const BENEFITS = [
  {
    icon: "💎",
    title: "Descuentos Exclusivos",
    desc: "Tus colaboradores o alumnos acceden a aranceles preferenciales en todos nuestros programas (Idiomas, PAES, Nivelación)."
  },
  {
    icon: "🚀",
    title: "Valor Agregado",
    desc: "Suma beneficios educativos a tu oferta sin costo operativo para tu organización. Nosotros gestionamos todo."
  },
  {
    icon: "📊",
    title: "Reportes de Impacto",
    desc: "Si becas a un grupo, te entregamos informes detallados de asistencia y rendimiento académico."
  },
  {
    icon: "🤝",
    title: "Co-Branding",
    desc: "Aparece en nuestra web como Partner Oficial y realicemos webinars o talleres conjuntos."
  }
];

const TARGETS = [
  {
    id: "colegios",
    title: "Colegios y Homeschools",
    desc: "Externaliza el reforzamiento académico o brinda opciones de preuniversitario premium a tus alumnos.",
    tags: ["Ensayos PAES", "Nivelación", "Talleres Extraprogramáticos"]
  },
  {
    id: "empresas",
    title: "Bienestar Corporativo",
    desc: "El mejor beneficio para tus empleados y sus familias. Educación de calidad a un clic.",
    tags: ["Descuento por Planilla", "Beneficio Extensible", "Idiomas"]
  },
  {
    id: "publico",
    title: "Municipios y ONGs",
    desc: "Llevemos oportunidades reales de nivelación de estudios y oficios a su comuna.",
    tags: ["Becas Sociales", "Programa Caminos", "Reinserción"]
  }
];

/* ──────────────────────────────────────────────────────────────────────────
   2. ICONOS SVG
   ────────────────────────────────────────────────────────────────────────── */
const Icons = {
  Handshake: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m11 17 2 2a1 1 0 1 0 3-3"/><path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4"/><path d="m21 3 1 11h-2"/><path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3"/><path d="M3 4h8"/></svg>,
  ArrowRight: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>,
  Check: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
};

/* ──────────────────────────────────────────────────────────────────────────
   3. ESTILOS CSS - "NETWORK HUB"
   ────────────────────────────────────────────────────────────────────────── */
const css = `
:root {
  --bg-deep: #0f0518; /* Dark Violet Tone */
  --bg-card: #1a0b2e;
  --primary: #a855f7; /* Purple 500 */
  --accent: #22d3ee;  /* Cyan 400 */
  --text-main: #faf5ff;
  --text-muted: #d8b4fe;
  --border: rgba(168, 85, 247, 0.2);
  --radius: 20px;
}

.partners-page {
  background-color: var(--bg-deep);
  color: var(--text-main);
  font-family: 'Inter', sans-serif;
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
}

.container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
a { text-decoration: none; color: inherit; transition: 0.2s; }

/* BACKGROUND GRID EFFECT */
.bg-grid {
  position: absolute; top: 0; left: 0; width: 100%; height: 100%;
  background-image: 
    linear-gradient(rgba(168, 85, 247, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(168, 85, 247, 0.05) 1px, transparent 1px);
  background-size: 40px 40px;
  pointer-events: none; z-index: 0;
  mask-image: linear-gradient(to bottom, black 40%, transparent 100%);
}

/* HERO */
.hero-partners { padding: 120px 0 80px; position: relative; z-index: 1; text-align: center; }
.hero-pill {
  display: inline-flex; align-items: center; gap: 8px;
  background: rgba(168, 85, 247, 0.1); border: 1px solid var(--border);
  color: var(--accent); padding: 8px 16px; border-radius: 50px;
  font-weight: 700; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 1px;
  margin-bottom: 30px;
}

h1 { 
  font-size: clamp(3rem, 6vw, 5rem); line-height: 1.1; font-weight: 800; margin-bottom: 24px; 
  background: linear-gradient(135deg, #fff 30%, var(--primary) 100%);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
}

.lead { font-size: 1.25rem; color: var(--text-muted); max-width: 700px; margin: 0 auto 50px; line-height: 1.6; }

.cta-group { display: flex; gap: 20px; justify-content: center; }
.btn-main {
  background: var(--primary); color: white; padding: 16px 36px; border-radius: 50px;
  font-weight: 700; font-size: 1.1rem; box-shadow: 0 0 30px rgba(168, 85, 247, 0.4);
}
.btn-main:hover { transform: translateY(-3px); background: #9333ea; }

/* PARTNER SLIDER (Visual) */
.partner-strip { margin: 60px 0; border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); background: rgba(0,0,0,0.3); padding: 40px 0; }
.strip-title { text-align: center; color: var(--text-muted); text-transform: uppercase; letter-spacing: 2px; font-size: 0.9rem; margin-bottom: 30px; font-weight: 700; }
.logo-grid { 
  display: flex; justify-content: center; gap: 50px; flex-wrap: wrap; opacity: 0.7; 
}
.partner-logo { 
  font-size: 1.5rem; font-weight: 800; color: white; display: flex; align-items: center; gap: 10px; 
  background: rgba(255,255,255,0.05); padding: 15px 30px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);
}

/* BENEFITS SECTION */
.benefits-section { padding: 100px 0; }
.grid-benefits { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 30px; }
.benefit-card {
  background: var(--bg-card); padding: 35px; border-radius: var(--radius); border: 1px solid var(--border);
  transition: 0.3s; position: relative; overflow: hidden;
}
.benefit-card:hover { border-color: var(--accent); transform: translateY(-5px); }
.benefit-card::before {
  content:''; position: absolute; top: 0; left: 0; width: 100%; height: 4px; background: linear-gradient(90deg, var(--primary), var(--accent));
  opacity: 0; transition: 0.3s;
}
.benefit-card:hover::before { opacity: 1; }

.b-icon { font-size: 2.5rem; margin-bottom: 20px; display: block; }
.benefit-card h3 { font-size: 1.4rem; margin-bottom: 10px; color: white; }
.benefit-card p { color: var(--text-muted); line-height: 1.6; }

/* SEGMENTS */
.segments-section { padding: 80px 0; background: #0b0214; }
.seg-title { text-align: center; font-size: 2.5rem; margin-bottom: 60px; font-weight: 800; }
.seg-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 40px; }

.seg-card {
  border: 1px solid var(--border); border-radius: 24px; padding: 40px;
  background: linear-gradient(180deg, var(--bg-card) 0%, rgba(26, 11, 46, 0) 100%);
}
.seg-card h3 { font-size: 1.8rem; margin-bottom: 15px; color: var(--accent); }
.seg-card p { font-size: 1.1rem; color: #e9d5ff; margin-bottom: 30px; height: 60px; }
.tags-list { display: flex; flex-wrap: wrap; gap: 10px; }
.tag { 
  background: rgba(255,255,255,0.05); color: var(--text-muted); padding: 6px 12px; 
  border-radius: 20px; font-size: 0.8rem; border: 1px solid rgba(255,255,255,0.1); 
}

/* CTA BOX */
.cta-box-section { padding: 100px 0; }
.cta-box {
  background: linear-gradient(135deg, var(--primary), #4c1d95);
  border-radius: 30px; padding: 60px; text-align: center; position: relative; overflow: hidden;
  box-shadow: 0 20px 60px rgba(168, 85, 247, 0.3);
}
.cta-box h2 { font-size: 2.5rem; color: white; margin-bottom: 20px; position: relative; z-index: 2; }
.cta-box p { font-size: 1.2rem; color: rgba(255,255,255,0.9); margin-bottom: 40px; max-width: 600px; margin-inline: auto; position: relative; z-index: 2; }
.btn-white {
  background: white; color: var(--primary); padding: 16px 40px; border-radius: 50px;
  font-weight: 800; font-size: 1.1rem; position: relative; z-index: 2; display: inline-flex; align-items: center; gap: 10px;
}
.btn-white:hover { transform: scale(1.05); box-shadow: 0 10px 20px rgba(0,0,0,0.2); }

/* Decoration */
.glow-circle {
  position: absolute; width: 400px; height: 400px; background: white; opacity: 0.1;
  border-radius: 50%; filter: blur(80px);
}
.gc-1 { top: -200px; left: -100px; }
.gc-2 { bottom: -200px; right: -100px; }

@media (max-width: 768px) {
  .hero-partners { padding-top: 100px; }
  .cta-group { flex-direction: column; }
  .cta-box { padding: 40px 20px; }
}
`;

/* ──────────────────────────────────────────────────────────────────────────
   4. SEO COMPONENT
   ────────────────────────────────────────────────────────────────────────── */
const SEOHead = () => {
  useEffect(() => { document.title = "Red de Convenios y Alianzas | Instituto Lael"; }, []);
  return null;
};

/* ──────────────────────────────────────────────────────────────────────────
   5. COMPONENTE PRINCIPAL
   ────────────────────────────────────────────────────────────────────────── */
export default function Convenios() {
  
  // Link directo a WhatsApp de "Partners"
  const waPartnerLink = `https://wa.me/56964626568?text=${encodeURIComponent("Hola, me interesa generar un convenio o alianza con Instituto Lael.")}`;

  return (
    <div className="partners-page">
      <SEOHead />
      <style>{css}</style>
      
      {/* Fondo Decorativo */}
      <div className="bg-grid"></div>

      {/* HERO */}
      <header className="hero-partners">
        <div className="container">
          <div className="hero-pill"><Icons.Handshake/> Red de Impacto Lael</div>
          <h1>
            Crezcamos Juntos. <br/>
            Crea valor para <span style={{color:'var(--accent)'}}>tu comunidad.</span>
          </h1>
          <p className="lead">
            Generamos alianzas estratégicas con colegios, empresas y fundaciones para democratizar el acceso a educación de excelencia.
            <strong> Sin letra chica. Sin costos ocultos.</strong>
          </p>
          <div className="cta-group">
            <a href={waPartnerLink} target="_blank" rel="noreferrer" className="btn-main">
              Quiero ser Partner
            </a>
          </div>
        </div>
      </header>

      {/* PARTNER STRIP */}
      <div className="partner-strip">
        <div className="container">
          <div className="strip-title">Confían en nosotros</div>
          <div className="logo-grid">
            {/* Si tienes las imágenes, usa <img>. Si no, este diseño de texto se ve muy pro */}
            {PARTNERS.map((p, i) => (
              <div key={i} className="partner-logo">
                {p.name} <span style={{fontSize:'0.7rem', color:'var(--accent)', textTransform:'uppercase', opacity:0.8}}>{p.type}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* BENEFITS */}
      <section className="benefits-section">
        <div className="container">
          <div className="grid-benefits">
            {BENEFITS.map((b, i) => (
              <div key={i} className="benefit-card">
                <span className="b-icon">{b.icon}</span>
                <h3>{b.title}</h3>
                <p>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEGMENTS */}
      <section className="segments-section">
        <div className="container">
          <h2 className="seg-title">¿Cómo podemos colaborar?</h2>
          <div className="seg-grid">
            {TARGETS.map((t) => (
              <div key={t.id} className="seg-card">
                <h3>{t.title}</h3>
                <p>{t.desc}</p>
                <div className="tags-list">
                  {t.tags.map((tag, i) => (
                    <span key={i} className="tag"><Icons.Check/> {tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BOX */}
      <section className="cta-box-section">
        <div className="container">
          <div className="cta-box">
            <div className="glow-circle gc-1"></div>
            <div className="glow-circle gc-2"></div>
            <h2>¿Listo para formalizar una alianza?</h2>
            <p>Hablemos hoy mismo. La gestión es rápida, digital y enfocada en el beneficio mutuo.</p>
            <a href={waPartnerLink} target="_blank" rel="noreferrer" className="btn-white">
              Agendar Reunión de Alianza <Icons.ArrowRight/>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}