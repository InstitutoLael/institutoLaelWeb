import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
// Asumiendo que SEOHead existe en tu proyecto
import SEOHead from "../components/SEOHead.jsx"; 

// IMPORTANTE: Asegúrate de tener la imagen en esta ruta
import studyOnline from "../assets/img/lael/study-online.jpg"; 

// Importamos tu lógica de precios (El cerebro)
import {
  ENROLLMENT_FEE,
  PAES_SUBJECTS,
  PAES_COMBOS,
  priceForSubjects,
  priceForCount,
  priceAnnual,
  essaysForCount,
  clp,
} from "../data/paes.js";

/* --------------------------------------------------------------------------
   1. ESTILOS CSS - DISEÑO "WORLD CLASS" (DARK GLASSMORPHISM)
   -------------------------------------------------------------------------- */
const css = `
:root {
  /* --- PALETA DE COLORES VIBRANTES --- */
  --bg-deep: #050505;       /* Fondo Infinito */
  --bg-panel: #0F1115;      /* Paneles */
  --bg-darker: #000000;     /* Contraste */
  
  --glass: rgba(255, 255, 255, 0.03);
  --glass-hover: rgba(255, 255, 255, 0.07);
  --border: rgba(255, 255, 255, 0.08);
  --border-light: rgba(255, 255, 255, 0.15);

  /* Colores de Marca (Tus Logos) */
  --primary: #6366f1;       /* Indigo/Azul - Confianza */
  --primary-glow: rgba(99, 102, 241, 0.5);
  --rose: #f43f5e;          /* Rosa - Pasión/Destacado */
  --rose-glow: rgba(244, 63, 94, 0.5);
  --green: #10b981;         /* Verde - Ciencias/Éxito */
  --green-glow: rgba(16, 185, 129, 0.5);
  --amber: #f59e0b;         /* Amarillo - Humanista/Estrellas */
  
  --text-main: #ffffff;
  --text-muted: #94a3b8;
  --font-sans: 'Inter', system-ui, -apple-system, sans-serif;
  
  --radius-lg: 24px;
  --radius-md: 16px;
  --shadow-float: 0 20px 40px -10px rgba(0,0,0,0.5);
}

/* --- RESET & BASE --- */
.paes-page {
  background-color: var(--bg-deep);
  color: var(--text-main);
  font-family: var(--font-sans);
  min-height: 100vh;
  position: relative;
  overflow-x: hidden; /* Previene scroll horizontal indeseado */
  padding-bottom: 100px; /* Espacio para el footer flotante móvil */
}

.container {
  max-width: 1240px;
  margin: 0 auto;
  padding: 0 24px;
}

h1, h2, h3, h4 { font-weight: 800; letter-spacing: -0.02em; line-height: 1.1; margin: 0; }
p { line-height: 1.6; color: var(--text-muted); margin: 0; }
button { cursor: pointer; border: none; background: none; font-family: inherit; -webkit-tap-highlight-color: transparent; }
a { text-decoration: none; color: inherit; }

/* --- LUCES AMBIENTALES (El secreto para que no se vea "fome") --- */
.ambient-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
  opacity: 0.15;
  pointer-events: none;
  z-index: 0;
}
.orb-1 { width: 600px; height: 600px; top: -200px; left: -100px; background: var(--primary); }
.orb-2 { width: 500px; height: 500px; bottom: 20%; right: -100px; background: var(--rose); }
.orb-3 { width: 400px; height: 400px; top: 40%; left: 20%; background: var(--green); opacity: 0.08; }

/* --- BOTONES MODERNOS --- */
.btn {
  display: inline-flex; align-items: center; justify-content: center; gap: 8px;
  padding: 14px 32px; border-radius: 50px; font-weight: 700; font-size: 1rem;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  position: relative; overflow: hidden;
}

.btn-primary {
  background: var(--primary); color: white;
  box-shadow: 0 8px 25px -5px var(--primary-glow);
}
.btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 15px 35px -5px var(--primary-glow);
  filter: brightness(1.1);
}

.btn-ghost {
  background: transparent; color: var(--text-muted);
  border: 1px solid var(--border);
}
.btn-ghost:hover {
  border-color: var(--text-main); color: var(--text-main);
  background: var(--glass); transform: translateY(-2px);
}

.btn-full-cta {
  width: 100%; display: flex; justify-content: center; align-items: center;
  padding: 16px; border-radius: 16px; font-weight: 700; background: var(--primary);
  color: white; transition: 0.3s; margin-top: auto;
}
.btn-full-cta:hover { filter: brightness(1.1); transform: translateY(-2px); }

/* --- HERO SECTION --- */
.hero { padding: 140px 0 80px; position: relative; z-index: 1; }
.hero-grid { display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 60px; align-items: center; }

.badge-pill {
  display: inline-flex; align-items: center; gap: 6px;
  background: rgba(99, 102, 241, 0.1); border: 1px solid rgba(99, 102, 241, 0.3);
  color: #a5b4fc; padding: 6px 16px; border-radius: 100px;
  font-size: 0.85rem; font-weight: 700; margin-bottom: 24px; text-transform: uppercase; letter-spacing: 1px;
}

.hero-title { font-size: clamp(3rem, 6vw, 4.8rem); margin-bottom: 24px; }
.text-gradient {
  background: linear-gradient(135deg, #fff 30%, #a5b4fc 100%);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
}

.hero-lead { font-size: 1.25rem; max-width: 580px; margin-bottom: 40px; color: #cbd5e1; }

.hero-actions { display: flex; gap: 16px; flex-wrap: wrap; margin-bottom: 50px; }

.hero-trust { display: flex; gap: 30px; font-size: 0.95rem; color: var(--text-muted); }
.trust-item { display: flex; align-items: center; gap: 8px; }
.trust-item svg { color: var(--green); }

/* Hero Visual */
.visual-card {
  position: relative; border-radius: var(--radius-lg); overflow: hidden;
  box-shadow: var(--shadow-float); border: 1px solid var(--border);
  animation: float 6s ease-in-out infinite;
}
@keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }

.hero-img { width: 100%; height: auto; display: block; filter: brightness(0.9); }
.floating-badge {
  position: absolute; bottom: 30px; right: 30px;
  background: rgba(15, 17, 21, 0.85); backdrop-filter: blur(12px);
  border: 1px solid var(--border-light); padding: 14px 24px;
  border-radius: 20px; text-align: center;
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);
}
.stat-num { display: block; font-size: 1.8rem; font-weight: 800; color: var(--green); line-height: 1; }
.stat-label { font-size: 0.8rem; color: var(--text-muted); font-weight: 600; text-transform: uppercase; }

@media (max-width: 968px) {
  .hero { padding-top: 100px; text-align: center; }
  .hero-grid { grid-template-columns: 1fr; }
  .hero-content { order: 2; }
  .hero-visual { order: 1; margin-bottom: 20px; max-width: 500px; margin-inline: auto; }
  .hero-lead { margin-inline: auto; }
  .hero-actions, .hero-trust { justify-content: center; }
}

/* --- MINI TESTIMONIALS --- */
.section-mini-testimonials {
  border-top: 1px solid var(--border); border-bottom: 1px solid var(--border);
  background: rgba(0,0,0,0.3); padding: 30px 0; margin-bottom: 80px; position: relative; z-index: 1;
}
.testimonial-snippet { display: flex; justify-content: center; gap: 40px; align-items: center; flex-wrap: wrap; }
.snippet-item { text-align: center; }
.snippet-item strong { display: block; font-size: 1.5rem; color: var(--text-main); }
.snippet-item span { color: var(--text-muted); font-size: 0.9rem; }
.snippet-icon { color: var(--amber); font-size: 2rem; }
.btn-small-link { font-size: 0.9rem; color: var(--primary); font-weight: 700; margin-top: 4px; display: inline-flex; align-items: center; gap: 4px; }

/* --- PRICING SECTION --- */
.section-pricing { position: relative; z-index: 1; }
.pricing-grid {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px; align-items: stretch;
}

.pricing-card {
  background: var(--bg-panel); border: 1px solid var(--border);
  border-radius: var(--radius-lg); padding: 35px 30px;
  display: flex; flex-direction: column; position: relative;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.pricing-card:hover { transform: translateY(-10px); box-shadow: 0 20px 40px -10px rgba(0,0,0,0.6); border-color: var(--border-light); }

/* Variaciones por acento */
.pricing-card.accent-rose:hover { border-color: var(--rose); box-shadow: 0 20px 50px -10px var(--rose-glow); }
.pricing-card.accent-indigo:hover { border-color: var(--primary); box-shadow: 0 20px 50px -10px var(--primary-glow); }
.pricing-card.accent-green:hover { border-color: var(--green); box-shadow: 0 20px 50px -10px var(--green-glow); }

.pricing-card.featured {
  background: linear-gradient(180deg, rgba(244, 63, 94, 0.08), var(--bg-panel) 60%);
  border: 1px solid rgba(244, 63, 94, 0.4);
  transform: scale(1.05); z-index: 2;
}
.pricing-card.featured:hover { transform: scale(1.05) translateY(-10px); }
@media(max-width: 900px) { .pricing-card.featured { transform: scale(1); } }

.popular-tag {
  position: absolute; top: -14px; left: 50%; transform: translateX(-50%);
  background: var(--rose); color: white; padding: 6px 14px; border-radius: 100px;
  font-size: 0.75rem; font-weight: 800; text-transform: uppercase; letter-spacing: 1px;
  box-shadow: 0 4px 15px var(--rose-glow); display: flex; align-items: center; gap: 4px;
}
.card-badge {
  position: absolute; top: 20px; right: 20px;
  background: var(--bg-darker); border: 1px solid var(--border);
  padding: 4px 10px; border-radius: 8px; font-size: 0.75rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase;
}

.card-header h3 { font-size: 1.6rem; margin-bottom: 5px; }
.subtitle { font-size: 0.95rem; color: var(--text-muted); }

.card-price { margin: 30px 0 5px; display: flex; align-items: flex-end; }
.currency { font-size: 1.5rem; color: var(--text-muted); margin-bottom: 6px; }
.amount { font-size: 3.5rem; font-weight: 800; line-height: 1; color: white; }
.accent-rose .amount { color: var(--rose); }
.accent-green .amount { color: var(--green); }
.accent-indigo .amount { color: var(--primary); }
.period { margin-bottom: 8px; margin-left: 5px; color: var(--text-muted); }

.annual-ref { font-size: 0.85rem; color: var(--text-muted); opacity: 0.7; margin-bottom: 25px; }
.divider { height: 1px; background: var(--border); margin-bottom: 25px; }

.features-list { list-style: none; padding: 0; margin: 0 0 30px 0; display: flex; flex-direction: column; gap: 14px; flex-grow: 1; }
.features-list li { display: flex; gap: 12px; font-size: 0.95rem; align-items: flex-start; }
.icon-box { color: var(--green); flex-shrink: 0; margin-top: 2px; }
.accent-rose .icon-box { color: var(--rose); }

/* --- COMBOS SECTION --- */
.section-combos { padding: 80px 0; overflow: hidden; }
.combos-scroll {
  display: flex; gap: 20px; overflow-x: auto; padding: 10px 5px 30px 5px;
  scroll-snap-type: x mandatory; -webkit-overflow-scrolling: touch;
}
.combos-scroll::-webkit-scrollbar { height: 8px; }
.combos-scroll::-webkit-scrollbar-thumb { background: var(--border-light); border-radius: 4px; }

.combo-card {
  min-width: 300px; background: var(--bg-panel); border: 1px solid var(--border);
  border-radius: var(--radius-md); padding: 25px; position: relative;
  scroll-snap-align: center; transition: 0.3s; display: flex; flex-direction: column;
}
.combo-card:hover { transform: translateY(-5px); background: var(--glass-hover); }
.combo-badge {
  position: absolute; top: 15px; right: 15px; background: rgba(245, 158, 11, 0.1); color: var(--amber);
  font-size: 0.7rem; font-weight: 700; padding: 4px 8px; border-radius: 6px; border: 1px solid rgba(245, 158, 11, 0.2);
}
/* Bordes dinámicos */
.border-rose { border-top: 3px solid var(--rose); }
.border-indigo { border-top: 3px solid var(--primary); }
.border-green { border-top: 3px solid var(--green); }
.border-amber { border-top: 3px solid var(--amber); }

.combo-content h4 { font-size: 1.3rem; margin-bottom: 5px; }
.combo-desc { font-size: 0.9rem; margin-bottom: 15px; color: var(--text-muted); flex-grow: 1; }
.combo-price { font-size: 1.8rem; font-weight: 800; color: white; margin-bottom: 20px; }

/* --- METHODOLOGY --- */
.section-methodology { background: #08090C; border-block: 1px solid var(--border); padding: 100px 0; }
.methodology-tag { color: var(--amber); font-weight: 700; font-size: 0.9rem; display: block; margin-bottom: 15px; letter-spacing: 1px; text-transform: uppercase; }
.sec-head-left { max-width: 700px; margin-bottom: 60px; }
.sec-head-left h2 { font-size: 2.8rem; margin-bottom: 20px; }

.methodology-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 40px; }
.methodology-card {
  padding: 30px; background: var(--glass); border-radius: var(--radius-lg);
  border: 1px solid var(--border); transition: 0.3s;
}
.methodology-card:hover { background: var(--glass-hover); border-color: var(--primary); transform: translateY(-5px); }
.icon-wrap {
  width: 60px; height: 60px; background: rgba(99, 102, 241, 0.1); color: var(--primary);
  border-radius: 50%; display: flex; align-items: center; justify-content: center;
  font-size: 1.8rem; margin-bottom: 20px; border: 1px solid rgba(99, 102, 241, 0.2);
}
.methodology-card h3 { margin-bottom: 12px; font-size: 1.4rem; }

/* --- BUILDER (ARMADOR) --- */
.section-builder { position: relative; z-index: 2; }
.builder-panel {
  background: var(--bg-panel); border: 1px solid var(--border); border-radius: var(--radius-lg);
  padding: 50px; box-shadow: var(--shadow-float);
}
.builder-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 40px; flex-wrap: wrap; gap: 20px; }
.subjects-grid { display: flex; flex-wrap: wrap; gap: 12px; margin-bottom: 40px; padding-bottom: 30px; border-bottom: 1px solid var(--border); }

.subject-chip {
  display: flex; align-items: center; gap: 10px; background: var(--bg-deep);
  border: 1px solid var(--border); padding: 12px 24px; border-radius: 50px;
  color: var(--text-muted); font-weight: 600; cursor: pointer; transition: all 0.2s;
}
.subject-chip:hover { border-color: var(--text-main); color: white; background: var(--glass); }
.subject-chip.active {
  background: var(--primary); border-color: var(--primary); color: white;
  box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3); transform: scale(1.05);
}
.check-circle {
  width: 20px; height: 20px; border-radius: 50%; border: 2px solid rgba(255,255,255,0.3);
  display: flex; align-items: center; justify-content: center; transition: 0.2s;
}
.subject-chip.active .check-circle { background: white; border-color: white; color: var(--primary); }

/* Builder Summary */
.builder-summary {
  display: grid; grid-template-columns: 1fr 350px; gap: 50px; align-items: center;
  opacity: 0; max-height: 0; overflow: hidden; transition: all 0.5s ease;
}
.builder-summary.visible { opacity: 1; max-height: 600px; padding-top: 10px; }

.summary-count { font-size: 2rem; font-weight: 800; color: var(--primary); margin-bottom: 20px; display: block; }
.summary-feats li { display: flex; gap: 12px; margin-bottom: 12px; font-size: 1.1rem; }
.summary-feats li svg { color: var(--green); }

.summary-price-box {
  background: var(--bg-darker); border: 1px solid var(--border-light);
  border-radius: var(--radius-md); padding: 30px; text-align: center;
}
.price-big { font-size: 3.5rem; font-weight: 900; color: white; margin: 10px 0; letter-spacing: -2px; }
.price-sub { font-size: 0.9rem; color: var(--text-muted); margin-bottom: 25px; line-height: 1.5; }

@media (max-width: 800px) {
  .builder-panel { padding: 30px 20px; }
  .builder-summary { grid-template-columns: 1fr; }
  .summary-price-box { order: -1; } /* Precio arriba en móvil */
}

/* --- FAQ --- */
.section-faq { max-width: 800px; margin: 0 auto; padding-top: 0; }
.faq-item { border-bottom: 1px solid var(--border); margin-bottom: 10px; }
.faq-question {
  padding: 24px 0; display: flex; justify-content: space-between; align-items: center;
  font-weight: 700; font-size: 1.1rem; cursor: pointer; color: #e2e8f0;
}
.faq-question:hover { color: var(--primary); }
.chevron { transition: transform 0.3s; }
.faq-item.open .chevron { transform: rotate(180deg); color: var(--primary); }
.faq-answer {
  padding-bottom: 24px; color: var(--text-muted); line-height: 1.7;
  animation: fadeIn 0.3s ease;
}
@keyframes fadeIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }

/* --- STICKY MOBILE --- */
.mobile-sticky-bar {
  position: fixed; bottom: 0; left: 0; right: 0;
  background: rgba(15, 17, 21, 0.9); backdrop-filter: blur(15px);
  border-top: 1px solid var(--border-light); padding: 15px 24px;
  display: flex; justify-content: space-between; align-items: center;
  z-index: 100; display: none;
}
@media (max-width: 768px) { .mobile-sticky-bar { display: flex; } }
.bar-label { font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; }
.bar-price { font-weight: 800; font-size: 1.5rem; color: white; line-height: 1; }
.btn-sticky { background: var(--primary); color: white; padding: 10px 24px; border-radius: 50px; font-weight: 700; font-size: 0.9rem; }
`;

/* --------------------------------------------------------------------------
   2. ICONOS (SVG PUROS PARA NO DEPENDER DE LIBRERÍAS)
   -------------------------------------------------------------------------- */
const Icons = {
  Check: (props) => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" {...props}><polyline points="20 6 9 17 4 12"/></svg>,
  Star: (props) => <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24" {...props}><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>,
  Zap: (props) => <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" {...props}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  Shield: (props) => <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" {...props}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  Play: (props) => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" {...props}><polygon points="5 3 19 12 5 21 5 3"/></svg>,
  ArrowRight: (props) => <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" {...props}><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
  ChevronDown: (props) => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" {...props}><polyline points="6 9 12 15 18 9"/></svg>
};

/* --------------------------------------------------------------------------
   3. SUB-COMPONENTES VISUALES
   -------------------------------------------------------------------------- */

function MiniTestimonialsSection() {
    return (
        <section className="section-mini-testimonials">
            <div className="container">
                <div className="testimonial-snippet">
                    <div className="snippet-item">
                        <strong>+900</strong>
                        <span>Alumnos felices</span>
                    </div>
                     <div className="snippet-item">
                         <Icons.Star className="snippet-icon" style={{color: '#f59e0b'}} />
                    </div>
                    <div className="snippet-item">
                        <strong>850+</strong>
                        <span>Promedio M1</span>
                    </div>
                    <div className="snippet-item">
                        <strong>4.9/5</strong>
                        <span>Google Reviews</span>
                        <Link to="#" className="btn-small-link">Ver opiniones <Icons.ArrowRight size={14} /></Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

function MethodologySection() {
    return (
        <section className="section section-methodology">
            <div className="container">
                <div className="sec-head-left">
                    <span className="methodology-tag">Nuestra Metodología</span>
                    <h2>El camino comprobado a la excelencia.</h2>
                    <p>No solo memorizas, aplicas. Un sistema diseñado para hackear la PAES.</p>
                </div>
                <div className="methodology-grid">
                    <div className="methodology-card">
                        <div className="icon-wrap"><Icons.Play /></div>
                        <h3>Clases de Dominio</h3>
                        <p>Sesiones en vivo enfocadas en la resolución de problemas reales, no teoría aburrida. Grabadas en HD.</p>
                    </div>
                    <div className="methodology-card">
                        <div className="icon-wrap"><Icons.Zap /></div>
                        <h3>Ensayos Ilimitados</h3>
                        <p>Plataforma inteligente que simula la presión real. Detecta tus fallas antes de que lo haga el DEMRE.</p>
                    </div>
                    <div className="methodology-card">
                        <div className="icon-wrap"><Icons.Shield /></div>
                        <h3>Tutoría Personalizada</h3>
                        <p>No eres un número. Tendrás seguimiento constante para ajustar tu estrategia de estudio.</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

function PricingCard({ title, subtitle, price, annual, features, accent = "indigo", featured = false, badge }) {
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
      
      <Link to="/inscripcion" className="btn-full-cta">
        Inscribirme <Icons.ArrowRight />
      </Link>
    </div>
  );
}

function ComboCard({ combo, onSelect }) {
    const count = combo.subjects?.length || 0;
    const monthly = priceForCount(count);
    return (
        <div className={`combo-card border-${combo.color || 'indigo'}`}>
            {combo.badge && <span className="combo-badge">{combo.badge}</span>}
            <div className="combo-content">
                <h4>{combo.title}</h4>
                <p className="combo-desc">{combo.tagline}</p>
                <div className="combo-price">{clp(monthly)}</div>
            </div>
            <button onClick={onSelect} className="btn btn-ghost btn-sm w-full">
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
   4. COMPONENTE PRINCIPAL (PAGE)
   -------------------------------------------------------------------------- */
export default function PAES() {
  const [selectedSubjectIds, setSelectedSubjectIds] = useState([]);
  const builderRef = useRef(null);
  const location = useLocation();

  // --- LÓGICA DE NEGOCIO ---
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
    setTimeout(() => {
        builderRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 100);
  };

  // WhatsApp Link
  const waMsg = encodeURIComponent(
    `Hola 👋, vengo de la web. Me interesa el plan PAES con: ${selectedSubjects.map((s) => s.name).join(", ") || "Ver opciones"}. Mensual estimado: ${subjectCount ? clp(monthly) : "—"}.`
  );

  // Filtramos combos para UI
  const COMBOS_TOP = ["hum-duo", "stem-basico", "trio-fundamental", "full-5", "completo-7"];
  const combos = PAES_COMBOS.filter((c) => COMBOS_TOP.includes(c.id));

  // Datos estáticos
  const stats = {
    p1: { count: 1, m: priceForCount(1), a: priceAnnual(1) },
    p2: { count: 2, m: priceForCount(2), a: priceAnnual(2) },
    p3: { count: 3, m: priceForCount(3), a: priceAnnual(3) },
    p5: { count: 5, m: priceForCount(5), a: priceAnnual(5) },
  };

  useEffect(() => { window.scrollTo(0,0); }, [location.pathname]);

  return (
    <div className="paes-page">
      <style>{css}</style> 
      <SEOHead 
        title="Planes PAES 2026 | Instituto Lael" 
        description="Preuniversitario PAES 2026. Clases en vivo, ensayos y tutorías. Planes flexibles desde $6.990 mensual." 
        canonical="https://www.institutolael.cl/paes" 
      />

      {/* FONDO ANIMADO */}
      <div className="ambient-orb orb-1" />
      <div className="ambient-orb orb-2" />
      <div className="ambient-orb orb-3" />

      {/* HEADER HERO */}
      <header className="hero">
        <div className="container hero-grid">
          <div className="hero-content">
            <div className="badge-pill">🚀 Admisión 2026 Abierta</div>
            <h1 className="hero-title">
              Tu ingreso a la U <br/>
              <span className="text-gradient">empieza aquí.</span>
            </h1>
            <p className="hero-lead">
              Sin precios inflados ni contratos que te amarran.
              Calidad académica premium a un precio justo.
            </p>
            
            <div className="hero-actions">
              <button onClick={() => builderRef.current?.scrollIntoView({ behavior: 'smooth' })} className="btn btn-primary btn-lg">
                Armar mi Plan <Icons.ArrowRight />
              </button>
              <a href={`https://wa.me/56964626568?text=${waMsg}`} target="_blank" rel="noreferrer" className="btn btn-ghost">
                Hablar por WhatsApp
              </a>
            </div>

            <div className="hero-trust">
              <div className="trust-item"><Icons.Zap /> Clases en vivo + Grabadas</div>
              <div className="trust-item"><Icons.Shield /> Matrícula única {clp(ENROLLMENT_FEE)}</div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="visual-card">
              <img src={studyOnline} alt="Estudiante Lael" className="hero-img" />
              <div className="floating-badge">
                <span className="stat-num">100%</span>
                <span className="stat-label">Compromiso</span>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      <MiniTestimonialsSection />

      {/* PRECIOS DESTACADOS */}
      <section className="section section-pricing">
        <div className="container">
          <div className="section-header">
            <h2>Planes Transparentes</h2>
            <p>Paga mensual. Cancela cuando quieras. Sin letra chica.</p>
          </div>

          <div className="pricing-grid">
            <PricingCard 
              title="1 Ramo"
              subtitle="Refuerzo puntual"
              price={stats.p1.m}
              annual={stats.p1.a}
              features={["1 ensayo mensual", "Clases en vivo", "Acceso a grabaciones"]}
              accent="indigo" // Color sutil
            />
            
            <PricingCard 
              title="3 Ramos"
              subtitle="Fundamental"
              price={stats.p3.m}
              annual={stats.p3.a}
              features={["3 ensayos mensuales", "Tutoría mensual", "Corrección de ensayos"]}
              accent="green"
              badge="Equilibrado"
            />

            <PricingCard 
              title="Full 5 Ramos"
              subtitle="Preparación Total"
              price={stats.p5.m} 
              annual={stats.p5.a}
              features={["5 ensayos mensuales", "Tutoría Avanzada", "Prioridad 24/7", "Orientación Vocacional"]}
              accent="rose" // Color llamativo
              featured={true}
            />
          </div>
        </div>
      </section>

      {/* COMBOS SLIDER */}
      <section className="section section-combos">
        <div className="container">
          <div className="section-header text-left" style={{textAlign: 'left', margin: '0 0 30px'}}>
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
      
      <MethodologySection />

      {/* BUILDER INTERACTIVO */}
      <section ref={builderRef} className="section section-builder">
        <div className="container">
          <div className="builder-panel">
            <div className="builder-header">
              <div className="text-content">
                <h2>Arma tu propio plan</h2>
                <p>Selecciona los ramos que necesitas. El precio se ajusta en tiempo real.</p>
              </div>
              {subjectCount > 0 && (
                <button className="btn btn-ghost btn-sm" onClick={() => setSelectedSubjectIds([])}>
                  Limpiar selección
                </button>
              )}
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
                      {isSelected && <Icons.Check size={14} strokeWidth={4} />}
                    </div>
                    <span>{s.name}</span>
                  </button>
                );
              })}
            </div>

            <div className={`builder-summary ${subjectCount > 0 ? 'visible' : ''}`}>
              <div className="summary-info">
                <span className="summary-count">
                    {subjectCount === 0 ? "Selecciona ramos..." : `${subjectCount} ramos seleccionados`}
                </span>
                <ul className="summary-feats">
                    <li><Icons.Play/> Clases en vivo + Grabadas</li>
                    <li><Icons.Zap/> {essaysForCount(subjectCount)} ensayos al mes</li>
                    {subjectCount >= 3 && <li><Icons.Star/> Tutoría incluida</li>}
                </ul>
              </div>
              
              <div className="summary-price-box">
                <div style={{textTransform:'uppercase', fontSize:'0.8rem', color:'#94a3b8', letterSpacing:'1px'}}>Valor Mensual</div>
                <div className="price-big">{subjectCount ? clp(monthly) : "$0"}</div>
                <div className="price-sub">
                    Matrícula única {clp(ENROLLMENT_FEE)} <br/>
                    <span style={{opacity: 0.6}}>Anual ref: {clp(annual)}</span>
                </div>
                
                <Link 
                    to={subjectCount > 0 ? "/inscripcion" : "#"} 
                    className={`btn btn-primary w-full ${subjectCount === 0 ? 'btn-ghost' : ''}`}
                    onClick={(e) => { if (subjectCount === 0) e.preventDefault(); }}
                >
                    {subjectCount > 0 ? "Inscribirme al Plan" : "Elige tus ramos"}
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section section-faq">
        <div className="container">
          <h3 style={{textAlign: 'center', marginBottom: '40px', fontSize: '2rem'}}>Preguntas Frecuentes</h3>
          <FaqItem q="¿Qué pasa si falto a una clase?" a="Todas las clases quedan grabadas en tu aula virtual. Puedes verlas cuando quieras, a tu propio ritmo." />
          <FaqItem q="¿Cómo funcionan los ensayos?" a="Tienes ensayos mensuales programados por ramo. Usamos el formato oficial DEMRE con corrección automática." />
          <FaqItem q="¿Puedo cambiar mis ramos después?" a="Sí. Puedes sumar o restar ramos mes a mes. Solo debes avisarnos antes del cierre de mes." />
        </div>
      </section>

      {/* STICKY MOBILE CTA */}
      <div className="mobile-sticky-bar">
        <div className="bar-info">
            <span className="bar-label">Tu Plan ({subjectCount} ramos)</span>
            <div className="bar-price">{subjectCount ? clp(monthly) : "---"}</div>
        </div>
        <Link to="/inscripcion" className="btn-sticky">
            Inscribirme
        </Link>
      </div>

    </div>
  );
}