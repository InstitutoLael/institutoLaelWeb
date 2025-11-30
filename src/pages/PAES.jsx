// src/pages/PAES.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import SEOHead from "../components/SEOHead.jsx";

// Importamos la lógica financiera que arreglamos antes
import {
  ENROLLMENT_FEE,
  PAES_SUBJECTS,
  PAES_COMBOS,
  priceForSubjects,
  priceForCount,
  priceAnnual,
  essaysForCount,
  ACADEMIC_MONTHS,
  ACADEMIC_PERIOD_LABEL,
  clp,
} from "../data/paes.js";

// Imagen (asegúrate de que la ruta sea correcta)
import studyOnline from "../assets/img/lael/study-online.jpg";

/* --------------------------------------------------------------------------
   COMPONENTES VISUALES (ICONOS SVG)
   Para no depender de librerías externas y que funcione al copiar/pegar
   -------------------------------------------------------------------------- */
const Icons = {
  Check: () => <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>,
  Star: () => <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>,
  Zap: () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  Shield: () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  Play: () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"/></svg>,
  ArrowRight: () => <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
  ChevronDown: () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"/></svg>
};

export default function PAES() {
  const [selectedSubjectIds, setSelectedSubjectIds] = useState([]);
  const builderRef = useRef(null);
  const loc = useLocation();

  // Lógica de cálculo (Reactiva)
  const selectedSubjects = useMemo(
    () => PAES_SUBJECTS.filter((s) => selectedSubjectIds.includes(s.id)),
    [selectedSubjectIds]
  );
  const subjectCount = selectedSubjects.length;
  const monthly = subjectCount ? priceForSubjects(selectedSubjectIds) : 0;
  const annual = subjectCount ? priceAnnual(subjectCount) : 0;

  // Acciones
  const toggleSubject = (id) =>
    setSelectedSubjectIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  const chooseCombo = (ids) => {
    setSelectedSubjectIds([...ids]);
    // Scroll suave hacia el constructor
    setTimeout(() => {
        builderRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 100);
  };

  // WhatsApp Link Generator
  const waMsg = encodeURIComponent(
    `Hola 👋, vengo de la web.
Me interesa el plan PAES con: ${selectedSubjects.map((s) => s.name).join(", ") || "Ver opciones"}
Mensual estimado: ${subjectCount ? clp(monthly) : "—"}
¿Me ayudan con la inscripción?`
  );

  // Combos a mostrar (Filtramos los mejores para vender)
  const COMBOS_TOP = ["hum-duo", "stem-fuerte", "trio-fundamental", "full-5", "completo-7"];
  const combos = PAES_COMBOS.filter((c) => COMBOS_TOP.includes(c.id));

  // Datos pre-calculados para las tarjetas estáticas
  const stats = {
    p1: { count: 1, m: priceForCount(1), a: priceAnnual(1) },
    p2: { count: 2, m: priceForCount(2), a: priceAnnual(2) },
    p3: { count: 3, m: priceForCount(3), a: priceAnnual(3) },
    p5: { count: 5, m: priceForCount(5), a: priceAnnual(5) }, // El Full
  };

  /* SEO & SCHEMA (Sin cambios en lógica, solo mantenemos lo bueno) */
  const description = "Preuniversitario PAES 2026. Clases en vivo, ensayos y tutorías. Planes flexibles desde $6.990 mensual. Matricula única.";
  const canonical = "https://www.institutolael.cl/paes";

  useEffect(() => { /* Pixel tracking placeholder */ }, [loc.pathname]);

  return (
    <div className="paes-page">
      <style>{css}</style>
      <SEOHead title="Planes PAES 2026 | Instituto Lael" description={description} canonical={canonical} />

      {/* --- FONDO DECORATIVO GLOBAL --- */}
      <div className="ambient-light top-left" />
      <div className="ambient-light bottom-right" />

      {/* --- HERO SECTION --- */}
      <header className="hero">
        <div className="container hero-grid">
          <div className="hero-content">
            <div className="badge-pill">🚀 ADMISIÓN 2026</div>
            <h1 className="hero-title">
              Tu futuro universitario <br/>
              <span className="text-gradient">empieza aquí.</span>
            </h1>
            <p className="hero-lead">
              Sin precios inflados. Sin contratos amarrados. 
              Solo clases de calidad, ensayos reales y el apoyo que necesitas para entrar a la U.
            </p>
            
            <div className="hero-actions">
              <button onClick={() => builderRef.current?.scrollIntoView({ behavior: 'smooth' })} className="btn btn-primary btn-lg">
                Armar mi Plan <Icons.ArrowRight />
              </button>
              <a href={`https://wa.me/56964626568?text=${waMsg}`} target="_blank" rel="noreferrer" className="btn btn-ghost">
                Hablar con un humano
              </a>
            </div>

            <div className="hero-trust">
              <div className="trust-item"><Icons.Zap /> Clases en vivo + Grabadas</div>
              <div className="trust-item"><Icons.Shield /> Matrícula única {clp(ENROLLMENT_FEE)}</div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="glass-card visual-card">
              <img src={studyOnline} alt="Estudiante Lael" className="hero-img" />
              <div className="floating-badge">
                <span className="stat-num">100%</span>
                <span className="stat-label">Compromiso</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* --- PRICING CARDS (EL CORAZÓN DE LA VENTA) --- */}
      <section className="section section-pricing">
        <div className="container">
          <div className="section-header">
            <h2>Planes transparentes</h2>
            <p>Paga mensual. Cancela cuando quieras. Sin letra chica.</p>
          </div>

          <div className="pricing-grid">
            {/* Tarjeta 1 Ramo */}
            <PricingCard 
              title="1 Ramo"
              subtitle="Refuerzo puntual"
              price={stats.p1.m}
              annual={stats.p1.a}
              features={["1 ensayo mensual", "Clases en vivo", "Acceso a grabaciones"]}
            />
            
            {/* Tarjeta 2 Ramos */}
            <PricingCard 
              title="2 Ramos"
              subtitle="Dúo Pack"
              price={stats.p2.m}
              annual={stats.p2.a}
              features={["2 ensayos mensuales", "Material PDF", "Soporte WhatsApp"]}
              accent="green"
            />

            {/* Tarjeta 3 Ramos */}
            <PricingCard 
              title="3 Ramos"
              subtitle="Trío Fundamental"
              price={stats.p3.m}
              annual={stats.p3.a}
              features={["3 ensayos mensuales", "Tutoría mensual", "Corrección de ensayos"]}
              accent="indigo"
              badge="Equilibrado"
            />

            {/* Tarjeta FULL (La Estrella) */}
            <PricingCard 
              title="Full 5 Ramos"
              subtitle="Preparación Total"
              price={stats.p5.m} // Aquí se verá el precio con descuento (~26k)
              annual={stats.p5.a}
              features={["5 ensayos mensuales", "Tutoría Avanzada", "Prioridad 24/7", "Orientación Vocacional"]}
              accent="rose"
              featured={true}
            />
          </div>
        </div>
      </section>

      {/* --- COMBOS SLIDER --- */}
      <section className="section section-combos">
        <div className="container">
          <div className="section-header text-left">
            <h3>Combos Populares</h3>
            <p>Packs pre-armados para carreras específicas.</p>
          </div>
          
          <div className="combos-scroll">
            {combos.map((combo) => (
              <ComboCard 
                key={combo.id} 
                combo={combo} 
                onSelect={() => chooseCombo(combo.subjects || [])} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* --- PLAN BUILDER INTERACTIVO --- */}
      <section ref={builderRef} className="section section-builder">
        <div className="container">
          <div className="builder-panel">
            <div className="builder-header">
              <div className="text-content">
                <h2>Arma tu propio plan</h2>
                <p>Selecciona los ramos que necesitas. El precio se ajusta solo.</p>
              </div>
              <button className="btn btn-ghost btn-sm" onClick={() => setSelectedSubjectIds([])}>
                Limpiar todo
              </button>
            </div>

            <div className="subjects-grid">
              {PAES_SUBJECTS.map((s) => {
                const isSelected = selectedSubjectIds.includes(s.id);
                return (
                  <button
                    key={s.id}
                    onClick={() => toggleSubject(s.id)}
                    className={`subject-chip ${isSelected ? 'active' : ''}`}
                  >
                    <div className="check-circle">
                      {isSelected && <Icons.Check />}
                    </div>
                    <span>{s.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Resumen del Builder */}
            <div className={`builder-summary ${subjectCount > 0 ? 'visible' : ''}`}>
              <div className="summary-info">
                <span className="summary-count">{subjectCount} ramos seleccionados</span>
                <ul className="summary-feats">
                    <li><Icons.Play/> Clases en vivo</li>
                    <li><Icons.Zap/> {essaysForCount(subjectCount)} ensayos al mes</li>
                    {subjectCount >= 3 && <li><Icons.Star/> Tutoría incluida</li>}
                </ul>
              </div>
              
              <div className="summary-price-box">
                <div className="price-label">Valor Mensual</div>
                <div className="price-big">{subjectCount ? clp(monthly) : "$0"}</div>
                <div className="price-sub">
                    Matrícula única {clp(ENROLLMENT_FEE)} <br/>
                    <span className="opacity-50">Anual ref: {clp(annual)}</span>
                </div>
                
                <div className="summary-actions">
                  <Link to="/inscripcion" className="btn btn-primary w-full">
                    Inscribirme ahora
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- FAQ --- */}
      <section className="section section-faq">
        <div className="container">
          <h3>Preguntas Frecuentes</h3>
          <div className="faq-grid">
            <FaqItem q="¿Qué pasa si falto a una clase?" a="Todas las clases quedan grabadas en tu aula virtual. Puedes verlas cuando quieras." />
            <FaqItem q="¿Cómo funcionan los ensayos?" a="Tienes ensayos mensuales programados por ramo. Recibes feedback y pautas de corrección." />
            <FaqItem q="¿Puedo cambiar mis ramos después?" a="Sí. Eres libre de sumar o restar ramos mes a mes según tu necesidad académica." />
          </div>
        </div>
      </section>

      {/* --- STICKY MOBILE CTA --- */}
      <div className="mobile-sticky-bar">
        <div className="bar-info">
            <span className="bar-label">Plan {subjectCount} ramos</span>
            <span className="bar-price">{subjectCount ? clp(monthly) : "Arma tu plan"}</span>
        </div>
        <Link to="/inscripcion" className="btn btn-primary btn-sm">Inscribirme</Link>
      </div>

    </div>
  );
}

/* --------------------------------------------------------------------------
   SUB-COMPONENTES (Para mantener el código limpio)
   -------------------------------------------------------------------------- */

function PricingCard({ title, subtitle, price, annual, features, accent = "slate", featured = false, badge }) {
  return (
    <div className={`pricing-card accent-${accent} ${featured ? 'featured' : ''}`}>
      {badge && <div className="card-badge">{badge}</div>}
      {featured && <div className="popular-tag"><Icons.Star /> MÁS VENDIDO</div>}
      
      <div className="card-header">
        <h3>{title}</h3>
        <span className="subtitle">{subtitle}</span>
      </div>

      <div className="card-price">
        <span className="currency">$</span>
        <span className="amount">{clp(price).replace("$", "").replace(/\./g, ".")}</span> 
        <span className="period">/ mes</span>
      </div>
      <div className="annual-ref">Total anual ref: {clp(annual)}</div>

      <div className="divider"></div>

      <ul className="features-list">
        {features.map((f, i) => (
          <li key={i}><div className="icon-box"><Icons.Check /></div> {f}</li>
        ))}
      </ul>
    </div>
  );
}

function ComboCard({ combo, onSelect }) {
    // Calculamos precios al vuelo usando helpers
    const count = combo.subjects?.length || 0;
    const monthly = priceForCount(count);
    
    return (
        <div className={`combo-card border-${combo.color || 'indigo'}`}>
            {combo.badge && <span className="combo-badge">{combo.badge}</span>}
            <div className="combo-content">
                <h4>{combo.title}</h4>
                <p className="combo-desc">{combo.tagline}</p>
                <div className="combo-price">
                    {clp(monthly)} <span className="small">/mes</span>
                </div>
            </div>
            <button onClick={onSelect} className="btn btn-outline btn-sm w-full">
                Seleccionar
            </button>
        </div>
    )
}

function FaqItem({ q, a }) {
    const [open, setOpen] = useState(false);
    return (
        <div className={`faq-item ${open ? 'open' : ''}`} onClick={() => setOpen(!open)}>
            <div className="faq-question">
                {q} <span className="chevron"><Icons.ChevronDown /></span>
            </div>
            {open && <div className="faq-answer">{a}</div>}
        </div>
    )
}


/* --------------------------------------------------------------------------
   ESTILOS CSS (GLASSMORPHISM DARK)
   -------------------------------------------------------------------------- */
const css = `
:root {
  --bg-dark: #050505;
  --bg-panel: #0F1115;
  --glass: rgba(255, 255, 255, 0.03);
  --glass-hover: rgba(255, 255, 255, 0.06);
  --border: rgba(255, 255, 255, 0.08);
  
  --primary: #6366f1; /* Indigo */
  --primary-glow: rgba(99, 102, 241, 0.4);
  
  --rose: #f43f5e;
  --rose-glow: rgba(244, 63, 94, 0.4);
  
  --green: #10b981;
  --amber: #f59e0b;
  
  --text-main: #ffffff;
  --text-muted: #94a3b8;
  
  --radius: 16px;
  --font-sans: 'Inter', system-ui, sans-serif;
}

/* --- RESET & BASE --- */
.paes-page {
  background-color: var(--bg-dark);
  color: var(--text-main);
  font-family: var(--font-sans);
  min-height: 100vh;
  overflow-x: hidden;
  position: relative;
  padding-bottom: 80px; /* espacio para sticky bar */
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

h1, h2, h3 { font-weight: 800; letter-spacing: -0.02em; line-height: 1.1; margin: 0; }
p { line-height: 1.6; color: var(--text-muted); margin: 0; }
button { cursor: pointer; border: none; background: none; font-family: inherit; }

/* --- AMBIENT LIGHTS --- */
.ambient-light {
  position: absolute;
  width: 600px;
  height: 600px;
  border-radius: 50%;
  filter: blur(120px);
  opacity: 0.15;
  pointer-events: none;
  z-index: 0;
}
.top-left { top: -200px; left: -200px; background: var(--primary); }
.bottom-right { bottom: -200px; right: -200px; background: var(--rose); }

/* --- BUTTONS --- */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 24px;
  border-radius: 12px;
  font-weight: 600;
  transition: all 0.2s ease;
  text-decoration: none;
}
.btn-primary {
  background: var(--primary);
  color: white;
  box-shadow: 0 4px 20px var(--primary-glow);
}
.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px var(--primary-glow);
}
.btn-ghost {
  background: transparent;
  color: var(--text-muted);
  border: 1px solid var(--border);
}
.btn-ghost:hover {
  background: var(--glass);
  color: white;
  border-color: rgba(255,255,255,0.2);
}
.btn-outline {
  border: 1px solid var(--border);
  color: white;
}
.btn-outline:hover { background: var(--glass); border-color: var(--primary); }
.btn-lg { font-size: 1.1rem; padding: 16px 32px; }
.btn-sm { padding: 8px 16px; font-size: 0.9rem; }
.w-full { width: 100%; }

/* --- HERO --- */
.hero {
  position: relative;
  padding: 80px 0 60px;
  z-index: 1;
}
.hero-grid {
  display: grid;
  grid-template-columns: 1fr 0.8fr;
  gap: 40px;
  align-items: center;
}
@media (max-width: 968px) { .hero-grid { grid-template-columns: 1fr; text-align: center; } }

.badge-pill {
  display: inline-block;
  background: rgba(99, 102, 241, 0.1);
  color: #818cf8;
  border: 1px solid rgba(99, 102, 241, 0.2);
  padding: 6px 12px;
  border-radius: 100px;
  font-size: 0.85rem;
  font-weight: 700;
  margin-bottom: 20px;
}

.hero-title {
  font-size: 3.5rem;
  margin-bottom: 20px;
}
.text-gradient {
  background: linear-gradient(to right, #fff, #94a3b8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-lead {
  font-size: 1.2rem;
  max-width: 50ch;
  margin-bottom: 30px;
}
@media (max-width: 968px) { .hero-lead { margin-left: auto; margin-right: auto; } }

.hero-actions {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 40px;
}
@media (max-width: 968px) { .hero-actions { justify-content: center; } }

.hero-trust {
  display: flex;
  gap: 20px;
  font-size: 0.9rem;
  color: var(--text-muted);
}
@media (max-width: 968px) { .hero-trust { justify-content: center; } }
.trust-item { display: flex; align-items: center; gap: 6px; }

/* Visual Card in Hero */
.hero-visual { position: relative; }
.visual-card {
  position: relative;
  border-radius: 24px;
  overflow: hidden;
  border: 1px solid var(--border);
  box-shadow: 0 20px 40px rgba(0,0,0,0.5);
}
.hero-img { width: 100%; height: auto; display: block; }
.floating-badge {
  position: absolute;
  bottom: 20px;
  right: 20px;
  background: rgba(15, 17, 21, 0.85);
  backdrop-filter: blur(10px);
  border: 1px solid var(--border);
  padding: 12px 20px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
}
.stat-num { font-weight: 800; color: var(--green); font-size: 1.2rem; }
.stat-label { font-size: 0.8rem; color: var(--text-muted); }

/* --- SECTIONS --- */
.section { padding: 60px 0; position: relative; z-index: 1; }
.section-header { text-align: center; margin-bottom: 40px; max-width: 600px; margin-left: auto; margin-right: auto; }
.section-header h2 { font-size: 2.5rem; margin-bottom: 10px; }
.text-left { text-align: left; margin-left: 0; }

/* --- PRICING GRID --- */
.pricing-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 20px;
  align-items: start;
}

.pricing-card {
  background: var(--bg-panel);
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 24px;
  position: relative;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.pricing-card:hover {
  transform: translateY(-5px);
  border-color: rgba(255,255,255,0.2);
}

.pricing-card.featured {
  background: linear-gradient(180deg, rgba(244,63,94,0.05), var(--bg-panel));
  border-color: var(--rose);
  box-shadow: 0 0 40px rgba(244,63,94,0.1);
  transform: scale(1.05);
  z-index: 2;
}
@media (max-width: 768px) { .pricing-card.featured { transform: scale(1); } }

.popular-tag {
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--rose);
  color: white;
  font-size: 0.75rem;
  font-weight: 800;
  padding: 4px 12px;
  border-radius: 100px;
  display: flex;
  align-items: center;
  gap: 4px;
  box-shadow: 0 4px 12px var(--rose-glow);
}

.card-badge {
  position: absolute;
  top: 16px;
  right: 16px;
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--text-muted);
  border: 1px solid var(--border);
  padding: 2px 8px;
  border-radius: 8px;
}

.card-header h3 { font-size: 1.25rem; margin-bottom: 4px; }
.subtitle { font-size: 0.9rem; color: var(--text-muted); }

.card-price { margin: 24px 0 4px; display: flex; align-items: flex-end; }
.currency { font-size: 1.5rem; font-weight: 600; margin-bottom: 6px; }
.amount { font-size: 3rem; font-weight: 800; line-height: 1; color: white; }
.accent-rose .amount { color: var(--rose); }
.period { font-size: 0.9rem; color: var(--text-muted); margin-bottom: 8px; margin-left: 6px; }

.annual-ref { font-size: 0.8rem; color: var(--text-muted); opacity: 0.7; }

.divider { height: 1px; background: var(--border); margin: 24px 0; }

.features-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 12px; }
.features-list li { display: flex; align-items: start; gap: 10px; font-size: 0.95rem; color: #e2e8f0; }
.icon-box { color: var(--primary); margin-top: 2px; }
.accent-rose .icon-box { color: var(--rose); }
.accent-green .icon-box { color: var(--green); }

/* --- COMBOS SCROLL --- */
.combos-scroll {
  display: flex;
  gap: 16px;
  overflow-x: auto;
  padding-bottom: 20px;
  scroll-snap-type: x mandatory;
}
.combos-scroll::-webkit-scrollbar { height: 8px; }
.combos-scroll::-webkit-scrollbar-thumb { background: var(--border); border-radius: 4px; }

.combo-card {
  min-width: 260px;
  background: var(--glass);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 20px;
  scroll-snap-align: start;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.border-rose { border-color: rgba(244,63,94,0.3); }
.border-indigo { border-color: rgba(99,102,241,0.3); }
.border-amber { border-color: rgba(245,158,11,0.3); }
.border-green { border-color: rgba(16,185,129,0.3); }

.combo-badge {
  position: absolute;
  top: 10px; right: 10px;
  background: var(--bg-panel);
  font-size: 0.7rem;
  padding: 2px 8px;
  border-radius: 6px;
  border: 1px solid var(--border);
}
.combo-content h4 { font-size: 1.1rem; margin-bottom: 4px; }
.combo-desc { font-size: 0.85rem; margin-bottom: 12px; }
.combo-price { font-size: 1.4rem; font-weight: 700; margin-bottom: 16px; color: white; }
.combo-price .small { font-size: 0.8rem; font-weight: 400; color: var(--text-muted); }

/* --- BUILDER --- */
.builder-panel {
  background: var(--bg-panel);
  border: 1px solid var(--border);
  border-radius: 24px;
  padding: 40px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.3);
}
@media (max-width: 768px) { .builder-panel { padding: 20px; } }

.builder-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}
.subjects-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 40px;
}
.subject-chip {
  display: flex;
  align-items: center;
  gap: 10px;
  background: var(--glass);
  border: 1px solid var(--border);
  padding: 10px 16px;
  border-radius: 12px;
  color: var(--text-muted);
  font-weight: 600;
  transition: all 0.2s;
}
.subject-chip:hover { background: var(--glass-hover); color: white; }
.subject-chip.active {
  background: rgba(99, 102, 241, 0.15);
  border-color: var(--primary);
  color: white;
  box-shadow: 0 0 15px rgba(99, 102, 241, 0.2);
}
.check-circle {
  width: 20px; height: 20px;
  border-radius: 50%;
  border: 2px solid var(--border);
  display: flex; align-items: center; justify-content: center;
  color: var(--primary);
}
.subject-chip.active .check-circle {
  border-color: var(--primary);
  background: var(--bg-dark);
}

/* Builder Summary */
.builder-summary {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 30px;
  border-top: 1px solid var(--border);
  padding-top: 30px;
  opacity: 0.5;
  pointer-events: none;
  transition: opacity 0.3s;
}
.builder-summary.visible { opacity: 1; pointer-events: auto; }
@media (max-width: 768px) { .builder-summary { grid-template-columns: 1fr; } }

.summary-count { font-size: 1.5rem; font-weight: 700; color: white; display: block; margin-bottom: 10px; }
.summary-feats { list-style: none; padding: 0; }
.summary-feats li { display: flex; gap: 8px; margin-bottom: 8px; color: var(--text-muted); }

.summary-price-box {
  background: var(--bg-dark);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 20px;
  text-align: center;
}
.price-label { font-size: 0.8rem; text-transform: uppercase; letter-spacing: 1px; color: var(--text-muted); }
.price-big { font-size: 2.5rem; font-weight: 800; color: var(--primary); margin: 5px 0; }
.price-sub { font-size: 0.85rem; color: var(--text-muted); margin-bottom: 15px; }

/* --- FAQ --- */
.faq-grid { max-width: 800px; margin: 0 auto; }
.faq-item {
  border-bottom: 1px solid var(--border);
  padding: 20px 0;
  cursor: pointer;
}
.faq-question {
  display: flex; justify-content: space-between; align-items: center;
  font-weight: 600; color: white;
}
.chevron { transition: transform 0.3s; }
.faq-item.open .chevron { transform: rotate(180deg); }
.faq-answer { margin-top: 10px; color: var(--text-muted); font-size: 0.95rem; }

/* --- STICKY MOBILE BAR --- */
.mobile-sticky-bar {
  position: fixed;
  bottom: 0; left: 0; right: 0;
  background: rgba(15, 17, 21, 0.9);
  backdrop-filter: blur(12px);
  border-top: 1px solid var(--border);
  padding: 12px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 100;
  display: none;
}
@media (max-width: 768px) { .mobile-sticky-bar { display: flex; } }
.bar-info { display: flex; flex-direction: column; }
.bar-label { font-size: 0.75rem; color: var(--text-muted); }
.bar-price { font-weight: 700; color: white; }

`