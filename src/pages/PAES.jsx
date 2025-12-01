// src/pages/PAES.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
// Asumiendo que tienes un componente SEOHead
import SEOHead from "../components/SEOHead.jsx"; 

// Importamos la lógica financiera que arreglamos antes
// Asegúrate de que este archivo exista y contenga las constantes y funciones necesarias.
import {
  ENROLLMENT_FEE,
  PAES_SUBJECTS,
  PAES_COMBOS,
  priceForSubjects,
  priceForCount,
  priceAnnual,
  essaysForCount,
  ACADEMIC_PERIOD_LABEL, // No usado directamente en el JSX, pero bueno tenerlo
  clp,
} from "../data/paes.js";

// Imagen (Asegúrate de que la ruta sea correcta)
import studyOnline from "../assets/img/lael/study-online.jpg"; 

/* --------------------------------------------------------------------------
   ESTILOS CSS (GLASSMORPHISM DARK - WORLD CLASS)
   -------------------------------------------------------------------------- */
const css = `
:root {
  /* Paleta de Colores y Fondos */
  --bg-deep: #050505; /* Fondo principal */
  --bg-panel: #0F1115; /* Fondo de contenedores (cards, builder) */
  --bg-darker: #000000; /* Para contraste interno (e.g., summary price box) */
  
  /* Glassmorphism */
  --glass: rgba(255, 255, 255, 0.04); 
  --glass-hover: rgba(255, 255, 255, 0.08);
  --border-light: rgba(255, 255, 255, 0.15); /* Para bordes de énfasis */
  --border: rgba(255, 255, 255, 0.08); /* Borde estándar */
  
  /* Colores de Marca y Acento */
  --primary: #6366f1; /* Indigo */
  --primary-glow: rgba(99, 102, 241, 0.5);
  --rose: #f43f5e; /* Featured */
  --rose-glow: rgba(244, 63, 94, 0.5);
  --green: #10b981; /* Success / Checkmarks */
  --amber: #f59e0b; /* Acento Secundario (Testimonios/Tags) */
  
  /* Tipografía */
  --text-main: #ffffff;
  --text-muted: #94a3b8;
  --font-sans: 'Inter', system-ui, sans-serif;
  
  /* Sombras y Radios */
  --shadow-panel: 0 10px 30px rgba(0,0,0,0.4);
  --radius-lg: 24px;
  --radius-md: 12px;
}

/* --- RESET & BASE --- */
.paes-page {
  background-color: var(--bg-deep);
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
  padding: 0 24px; /* Un poco más de padding lateral */
}

h1, h2, h3 { font-weight: 800; letter-spacing: -0.02em; line-height: 1.1; margin: 0; }
h1 { font-size: clamp(3rem, 7vw, 4.5rem); }
h2 { font-size: clamp(2rem, 5vw, 3rem); }
p { line-height: 1.7; color: var(--text-muted); margin: 0; }
button { cursor: pointer; border: none; background: none; font-family: inherit; }

/* --- AMBIENT LIGHTS --- */
.ambient-light {
  position: absolute;
  width: 600px;
  height: 600px;
  border-radius: 50%;
  filter: blur(150px); /* Más blur para un efecto más suave */
  opacity: 0.1; /* Menos opacidad */
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
  padding: 14px 28px;
  border-radius: 50px; /* Bordes más suaves en los botones principales */
  font-weight: 700;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); /* Springy transition */
  text-decoration: none;
}
.btn-primary {
  background: var(--primary);
  color: var(--bg-deep);
  box-shadow: 0 8px 25px var(--primary-glow);
}
.btn-primary:hover {
  transform: translateY(-3px) scale(1.02);
  box-shadow: 0 12px 40px var(--primary-glow);
  background: #7c7efe; /* Ligeramente más claro */
}
.btn-ghost {
  background: transparent;
  color: var(--text-muted);
  border: 1px solid var(--border);
  box-shadow: none;
  padding: 14px 28px;
}
.btn-ghost:hover {
  background: var(--glass);
  color: white;
  border-color: var(--border-light);
  transform: translateY(-1px);
}
.btn-outline {
  border: 1px solid var(--border);
  color: white;
  padding: 10px 20px;
  border-radius: 12px;
}
.btn-outline:hover { background: var(--glass-hover); border-color: var(--primary); }
.btn-lg { font-size: 1.15rem; padding: 18px 36px; }
.btn-sm { padding: 10px 20px; font-size: 0.9rem; border-radius: 50px; }
.w-full { width: 100%; }

/* --- HERO --- */
.hero {
  position: relative;
  padding: 100px 0 80px;
  z-index: 1;
}
.hero-grid {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 60px;
  align-items: center;
}
@media (max-width: 968px) { 
  .hero-grid { grid-template-columns: 1fr; text-align: center; } 
  .hero-content { order: 2; }
  .hero-visual { order: 1; margin-bottom: 30px; }
}

.badge-pill {
  display: inline-block;
  background: rgba(99, 102, 241, 0.15);
  color: #a5b4fc;
  border: 1px solid rgba(99, 102, 241, 0.3);
  padding: 8px 16px;
  border-radius: 50px;
  font-size: 0.8rem;
  font-weight: 700;
  margin-bottom: 24px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.hero-title {
  font-size: clamp(3.5rem, 6vw, 4.5rem);
  margin-bottom: 20px;
}
.text-gradient {
  background: linear-gradient(to right, var(--primary), #8b5cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-lead {
  font-size: 1.3rem;
  max-width: 600px;
  margin-bottom: 40px;
}
@media (max-width: 968px) { .hero-lead { margin-left: auto; margin-right: auto; } }

.hero-actions {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  margin-bottom: 50px;
}
@media (max-width: 968px) { .hero-actions { justify-content: center; } }

.hero-trust {
  display: flex;
  gap: 30px;
  font-size: 1rem;
  color: var(--text-muted);
}
@media (max-width: 968px) { .hero-trust { justify-content: center; flex-wrap: wrap; } }
.trust-item { display: flex; align-items: center; gap: 8px; }
.trust-item svg { color: var(--green); font-size: 1.1rem; }

/* Visual Card in Hero */
.visual-card {
  border-radius: var(--radius-lg);
  overflow: hidden;
  border: 1px solid var(--border);
  box-shadow: var(--shadow-panel);
}
.hero-img { 
  width: 100%; height: auto; display: block; 
  /* Aplicar un filtro sutil para que se vea más integrado en el tema oscuro */
  filter: brightness(0.95) contrast(1.05); 
}
.floating-badge {
  position: absolute;
  bottom: 25px;
  right: 25px;
  background: rgba(15, 17, 21, 0.9);
  backdrop-filter: blur(10px);
  border: 1px solid var(--border-light);
  padding: 12px 20px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 5px 15px rgba(0,0,0,0.4);
}
.stat-num { font-weight: 900; color: var(--green); font-size: 1.5rem; }
.stat-label { font-size: 0.8rem; color: var(--text-muted); }

/* ---------------------------------------------------- */
/* MINI TESTIMONIALS (Prueba Social Rápida) */
/* ---------------------------------------------------- */
.section-mini-testimonials { 
    padding: 30px 0; 
    background: var(--bg-darker); /* Fondo más oscuro para contraste */
    border-top: 1px solid var(--border); 
    border-bottom: 1px solid var(--border); 
}
.testimonial-snippet {
    display: flex; 
    gap: 30px; 
    align-items: center; 
    justify-content: center;
    flex-wrap: wrap;
}
.snippet-icon { 
    font-size: 2.2rem; 
    color: var(--primary); 
    flex-shrink: 0;
}
.snippet-item { 
    text-align: center; 
    border-left: 1px solid var(--border);
    padding-left: 30px;
    flex-shrink: 0;
}
.snippet-item:first-of-type { border-left: none; padding-left: 0; }

.snippet-item strong { 
    font-size: 1.3rem; 
    display: block; 
    font-weight: 800; 
    color: var(--amber); /* Acento amarillo para los puntajes */
}
.snippet-item span { 
    font-size: 0.85rem; 
    color: var(--text-muted);
}
.btn-small-link { 
    color: var(--primary); 
    font-weight: 600; 
    display: flex; 
    align-items: center; 
    gap: 5px; 
    font-size: 0.9rem;
}
@media (max-width: 600px) {
    .snippet-item { border-left: none; padding-left: 0; }
    .testimonial-snippet { flex-direction: column; }
}

/* --- SECTIONS --- */
.section { padding: 80px 0; position: relative; z-index: 1; }
.section-header { text-align: center; margin-bottom: 50px; max-width: 700px; margin-left: auto; margin-right: auto; }
.section-header h2 { font-size: 2.8rem; margin-bottom: 10px; }
.text-left { text-align: left; margin-left: 0; }

/* --- PRICING GRID --- */
.pricing-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
  align-items: stretch;
}

.pricing-card {
  background: var(--bg-panel);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 30px;
  position: relative;
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.pricing-card:hover {
  transform: translateY(-8px);
  border-color: var(--border-light);
  box-shadow: 0 15px 30px rgba(0,0,0,0.5);
}

.pricing-card.featured {
  background: linear-gradient(180deg, rgba(244,63,94,0.1), var(--bg-panel));
  border-color: var(--rose);
  box-shadow: 0 0 50px var(--rose-glow);
  transform: translateY(-10px) scale(1.05); /* Más énfasis en el destacado */
  z-index: 2;
}
@media (max-width: 768px) { .pricing-card.featured { transform: scale(1); } }

.popular-tag {
  position: absolute;
  top: -14px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--rose);
  color: white;
  font-size: 0.8rem;
  font-weight: 800;
  padding: 6px 16px;
  border-radius: 100px;
  display: flex;
  align-items: center;
  gap: 6px;
  box-shadow: 0 4px 15px var(--rose-glow);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.card-badge {
  position: absolute;
  top: 16px;
  right: 20px;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--text-muted);
  background: var(--bg-darker);
  border: 1px solid var(--border);
  padding: 4px 10px;
  border-radius: 8px;
}

.card-header h3 { font-size: 1.8rem; margin-bottom: 4px; }
.subtitle { font-size: 1rem; color: var(--text-muted); }

.card-price { margin: 30px 0 8px; display: flex; align-items: flex-end; }
.currency { font-size: 1.5rem; font-weight: 600; margin-bottom: 6px; color: var(--text-muted); }
.amount { font-size: 3.5rem; font-weight: 900; line-height: 1; color: white; }
.accent-rose .amount { color: var(--rose); }
.accent-green .amount { color: var(--green); }
.accent-indigo .amount { color: var(--primary); }
.period { font-size: 1rem; color: var(--text-muted); margin-bottom: 8px; margin-left: 6px; }

.annual-ref { font-size: 0.85rem; color: var(--text-muted); opacity: 0.8; }

.divider { height: 1px; background: var(--border); margin: 24px 0; }

.features-list { 
  list-style: none; 
  padding: 0; 
  margin: 0 0 30px 0; 
  display: flex; 
  flex-direction: column; 
  gap: 14px; 
  flex-grow: 1;
}
.features-list li { 
  display: flex; 
  align-items: start; 
  gap: 12px; 
  font-size: 0.95rem; 
  color: #e2e8f0; 
}
.icon-box { 
  color: var(--green); 
  flex-shrink: 0;
  margin-top: 2px;
}
.accent-rose .icon-box { color: var(--rose); }
.btn-full-cta {
    display: flex; justify-content: center; align-items: center; gap: 10px;
    width: 100%; background: var(--primary); color: var(--bg-dark); padding: 14px 0;
    border-radius: 50px; font-weight: 700; transition: all 0.2s;
}
.pricing-card.featured .btn-full-cta { background: var(--rose); color: white; box-shadow: 0 4px 15px rgba(244,63,94,0.3); }
.btn-full-cta:hover { transform: translateY(-2px); opacity: 0.9; }


/* ---------------------------------------------------- */
/* METODOLOGÍA SECTION */
/* ---------------------------------------------------- */
.section-methodology { 
    padding: 100px 0; 
    background: #08090C; /* Fondo ligeramente diferente para diferenciar la sección */
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
}
.sec-head-left { 
    max-width: 650px; 
    margin-bottom: 50px; 
}
.methodology-tag { 
    color: var(--amber); 
    font-weight: 700; 
    font-size: 0.9rem; 
    display: block; 
    margin-bottom: 10px; 
    letter-spacing: 1.5px;
    text-transform: uppercase;
}
.sec-head-left h2 { 
    font-size: 3.2rem; 
    font-weight: 900; 
    line-height: 1.1; 
    margin-bottom: 15px; 
}
.sec-head-left p { 
    color: var(--text-muted); 
    font-size: 1.15rem; 
}

.methodology-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 30px;
}
.methodology-card {
    background: var(--glass); 
    border: 1px solid var(--border); 
    border-radius: var(--radius-lg);
    padding: 30px; 
    transition: all 0.3s;
}
.methodology-card:hover { 
    background: var(--glass-hover); 
    border-color: var(--primary); /* Destacar al pasar el mouse */
    transform: translateY(-5px);
}
.icon-wrap {
    font-size: 2rem; 
    color: var(--primary); 
    margin-bottom: 15px;
    width: 55px; height: 55px; 
    display: flex; 
    align-items: center; 
    justify-content: center;
    border-radius: 50%; 
    background: rgba(99, 102, 241, 0.15);
    border: 1px solid rgba(99, 102, 241, 0.2);
    flex-shrink: 0;
}
.methodology-card h3 { 
    font-size: 1.4rem; 
    font-weight: 700; 
    margin-bottom: 10px; 
}
.methodology-card p { 
    color: var(--text-muted); 
    font-size: 0.95rem;
}


/* --- COMBOS SCROLL --- */
.combos-scroll {
  display: flex;
  gap: 20px;
  overflow-x: auto;
  padding-bottom: 25px; /* Más espacio para la scrollbar */
  scroll-snap-type: x mandatory;
}
.combos-scroll::-webkit-scrollbar { height: 10px; }
.combos-scroll::-webkit-scrollbar-track { background: var(--bg-darker); border-radius: 5px; }
.combos-scroll::-webkit-scrollbar-thumb { 
  background: var(--border); 
  border-radius: 5px; 
  border: 2px solid var(--bg-panel);
}

.combo-card {
  min-width: 280px;
  background: var(--glass);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: 24px;
  scroll-snap-align: start;
  transition: all 0.3s;
  position: relative;
}
.combo-card:hover { transform: translateY(-3px); background: var(--glass-hover); }

.border-rose { border-color: var(--rose); }
.border-indigo { border-color: var(--primary); }
.border-amber { border-color: var(--amber); }
.border-green { border-color: var(--green); }

.combo-badge {
  position: absolute;
  top: 15px; right: 15px;
  background: var(--bg-darker);
  font-size: 0.7rem;
  padding: 4px 10px;
  border-radius: 6px;
  border: 1px solid var(--border);
  color: var(--amber);
}
.combo-content h4 { font-size: 1.3rem; margin-bottom: 4px; font-weight: 700; }
.combo-desc { font-size: 0.9rem; margin-bottom: 16px; }
.combo-price { font-size: 1.6rem; font-weight: 800; margin-bottom: 20px; color: white; }
.combo-price .small { font-size: 0.9rem; font-weight: 400; color: var(--text-muted); }

/* --- BUILDER --- */
.section-builder { padding: 100px 0; }
.builder-panel {
  background: var(--bg-panel);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 40px;
  box-shadow: var(--shadow-panel);
}
@media (max-width: 768px) { .builder-panel { padding: 30px; } }

.builder-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}
.builder-header h2 { font-size: 2.2rem; }
.subjects-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 40px;
  border-bottom: 1px solid var(--border);
  padding-bottom: 30px;
}
.subject-chip {
  display: flex;
  align-items: center;
  gap: 10px;
  background: var(--glass);
  border: 1px solid var(--border);
  padding: 12px 20px;
  border-radius: 50px;
  color: var(--text-muted);
  font-weight: 600;
  transition: all 0.2s;
}
.subject-chip:hover { background: var(--glass-hover); color: white; }
.subject-chip.active {
  background: var(--primary);
  border-color: var(--primary);
  color: var(--bg-dark);
  box-shadow: 0 4px 15px rgba(99, 102, 241, 0.2);
}
.check-circle {
  width: 18px; height: 18px;
  border-radius: 50%;
  border: 2px solid var(--text-muted);
  display: flex; align-items: center; justify-content: center;
  color: var(--bg-dark); /* El check es invisible hasta que esté activo */
  transition: all 0.2s;
}
.subject-chip.active .check-circle {
  border-color: var(--bg-dark);
  background: var(--bg-dark);
  color: white;
}

/* Builder Summary */
.builder-summary {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 40px;
  opacity: 0;
  max-height: 0;
  overflow: hidden;
  transition: all 0.4s ease-in-out;
}
.builder-summary.visible { 
  opacity: 1; 
  max-height: 500px; /* Suficiente para mostrar el contenido */
  padding-top: 10px; 
}
@media (max-width: 768px) { 
  .builder-summary { grid-template-columns: 1fr; gap: 30px; } 
}

.summary-count { 
  font-size: 1.6rem; 
  font-weight: 800; 
  color: var(--primary); 
  display: block; 
  margin-bottom: 20px; 
}
.summary-feats { list-style: none; padding: 0; }
.summary-feats li { 
  display: flex; 
  gap: 10px; 
  margin-bottom: 12px; 
  color: white; 
  font-size: 1rem;
}
.summary-feats li svg { color: var(--green); }

.summary-price-box {
  background: var(--bg-darker); /* Más oscuro que el panel principal */
  border: 1px solid var(--border-light);
  border-radius: var(--radius-md);
  padding: 25px;
  text-align: center;
}
.price-label { font-size: 0.85rem; text-transform: uppercase; letter-spacing: 1.5px; color: var(--text-muted); }
.price-big { font-size: 3rem; font-weight: 900; color: var(--primary); margin: 5px 0 10px; }
.price-sub { font-size: 0.9rem; color: var(--text-muted); margin-bottom: 20px; }
.summary-actions .btn-primary { padding: 14px 28px; border-radius: 12px; }

/* --- FAQ --- */
.section-faq { background: var(--bg-deep); padding: 80px 0; }
.section-faq h3 { font-size: 2.5rem; font-weight: 800; margin-bottom: 40px; text-align: center; }
.faq-grid { max-width: 900px; margin: 0 auto; }
.faq-item {
  border-bottom: 1px solid var(--border);
  transition: all 0.3s;
}
.faq-item:last-child { border-bottom: none; }
.faq-item.open { background: var(--bg-panel); border-radius: 8px 8px 0 0; }
.faq-question {
  padding: 20px 24px;
  display: flex; justify-content: space-between; align-items: center;
  font-weight: 700; color: white;
  font-size: 1.1rem;
}
.chevron { transition: transform 0.3s; font-size: 1.2rem; }
.faq-item.open .chevron { transform: rotate(180deg); color: var(--primary); }
.faq-answer { 
  padding: 0 24px 20px; 
  color: var(--text-muted); 
  font-size: 1rem; 
  max-width: 95%;
}

/* --- STICKY MOBILE BAR --- */
.mobile-sticky-bar {
  position: fixed;
  bottom: 0; left: 0; right: 0;
  background: rgba(15, 17, 21, 0.95);
  backdrop-filter: blur(15px);
  border-top: 1px solid var(--border-light);
  padding: 15px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 100;
  display: none;
}
@media (max-width: 768px) { .mobile-sticky-bar { display: flex; } }
.bar-info { display: flex; flex-direction: column; }
.bar-label { font-size: 0.8rem; color: var(--text-muted); }
.bar-price { font-weight: 800; color: white; font-size: 1.4rem; }
.mobile-sticky-bar .btn-primary { 
  padding: 10px 24px; 
  font-size: 0.9rem;
  border-radius: 50px;
}
`;

/* --------------------------------------------------------------------------
   COMPONENTES VISUALES (ICONOS SVG)
   -------------------------------------------------------------------------- */
const Icons = {
  Check: (props) => <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" {...props}><polyline points="20 6 9 17 4 12"/></svg>,
  Star: (props) => <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" {...props}><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>,
  Zap: (props) => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" {...props}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  Shield: (props) => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" {...props}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  Play: (props) => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" {...props}><polygon points="5 3 19 12 5 21 5 3"/></svg>,
  ArrowRight: (props) => <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" {...props}><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
  ChevronDown: (props) => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" {...props}><polyline points="6 9 12 15 18 9"/></svg>
};

/* --------------------------------------------------------------------------
   PÁGINA PRINCIPAL PAES
   -------------------------------------------------------------------------- */
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
      {/* Cargar los estilos CSS */}
      <style>{css}</style> 
      <SEOHead title="Planes PAES 2026 | Instituto Lael" description={description} canonical={canonical} />

      {/* --- FONDO DECORATIVO GLOBAL --- */}
      <div className="ambient-light top-left" />
      <div className="ambient-light bottom-right" />

      {/* --------------------------------------------------------------------------
          1. HERO SECTION
          -------------------------------------------------------------------------- */}
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
      
      {/* --------------------------------------------------------------------------
          2. MINI TESTIMONIALS (Prueba Social)
          -------------------------------------------------------------------------- */}
      <MiniTestimonialsSection />


      {/* --------------------------------------------------------------------------
          3. PRICING CARDS 
          -------------------------------------------------------------------------- */}
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
              accent="green"
            />
            
            {/* Tarjeta 2 Ramos */}
            <PricingCard 
              title="2 Ramos"
              subtitle="Dúo Pack"
              price={stats.p2.m}
              annual={stats.p2.a}
              features={["2 ensayos mensuales", "Material PDF", "Soporte WhatsApp"]}
              accent="indigo"
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
              price={stats.p5.m} 
              annual={stats.p5.a}
              features={["5 ensayos mensuales", "Tutoría Avanzada", "Prioridad 24/7", "Orientación Vocacional"]}
              accent="rose"
              featured={true}
            />
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------------------
          4. COMBOS SLIDER 
          -------------------------------------------------------------------------- */}
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
      
      {/* --------------------------------------------------------------------------
          5. METODOLOGÍA SECTION
          -------------------------------------------------------------------------- */}
      <MethodologySection />


      {/* --------------------------------------------------------------------------
          6. PLAN BUILDER INTERACTIVO 
          -------------------------------------------------------------------------- */}
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
                    <span style={{opacity: 0.7}}>Anual ref: {clp(annual)}</span>
                </div>
                
                <div className="summary-actions">
                  {/* Cambiamos el Link a un botón para manejar el estado si es 0 */}
                  <Link 
                    to={subjectCount > 0 ? "/inscripcion" : "#"} 
                    className={`btn btn-primary w-full ${subjectCount === 0 ? 'btn-ghost' : ''}`}
                    onClick={(e) => {
                        if (subjectCount === 0) e.preventDefault();
                    }}
                  >
                    {subjectCount > 0 ? "Inscribirme ahora" : "Selecciona al menos 1 ramo"}
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------------------
          7. FAQ 
          -------------------------------------------------------------------------- */}
      <section className="section section-faq">
        <div className="container">
          <h3>Preguntas Frecuentes</h3>
          <div className="faq-grid">
            <FaqItem q="¿Qué pasa si falto a una clase?" a="Todas las clases quedan grabadas en tu aula virtual. Puedes verlas cuando quieras, además de tener el material complementario en PDF." />
            <FaqItem q="¿Cómo funcionan los ensayos?" a="Tienes ensayos mensuales programados por ramo. Usamos el formato oficial, con corrección automática y un detallado reporte de puntaje." />
            <FaqItem q="¿Puedo cambiar mis ramos después?" a="Sí, la flexibilidad es clave. Eres libre de sumar o restar ramos mes a mes según tu necesidad académica, previo aviso." />
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------------------
          8. STICKY MOBILE CTA 
          -------------------------------------------------------------------------- */}
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

function MiniTestimonialsSection() {
    return (
        <section className="section-mini-testimonials">
            <div className="container">
                <div className="testimonial-snippet">
                    <Icons.Star className="snippet-icon" />
                    <div className="snippet-item">
                        <strong>+900</strong>
                        <span>Alumnos inscritos en Lael</span>
                    </div>
                    <div className="snippet-item">
                        <strong>850+</strong>
                        <span>Puntaje promedio en Maths</span>
                    </div>
                    <div className="snippet-item">
                        <strong>4.9/5</strong>
                        <span>Valoración en Google Reviews</span>
                        <Link to="#" className="btn-small-link">Ver Opiniones <Icons.ArrowRight /></Link>
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
                    <h2>El camino comprobado para alcanzar puntajes de excelencia.</h2>
                    <p>
                        No solo memorizas, sino que aplicas y dominas. Nuestro modelo de estudio se enfoca en la práctica constante, la retroalimentación precisa y el apoyo continuo.
                    </p>
                </div>

                <div className="methodology-grid">
                    <div className="methodology-card">
                        <div className="icon-wrap"><Icons.Check /></div>
                        <h3>Clases de Dominio</h3>
                        <p>Sesiones en vivo y grabadas enfocadas 100% en la nueva PAES. Cubrimos temario, errores comunes y tips de alto rendimiento.</p>
                    </div>
                    <div className="methodology-card">
                        <div className="icon-wrap"><Icons.Zap /></div>
                        <h3>Ensayos Ilimitados</h3>
                        <p>Simulacros que replican la dificultad y formato de la prueba real. Obtén reportes detallados y corrección personalizada.</p>
                    </div>
                    <div className="methodology-card">
                        <div className="icon-wrap"><Icons.Shield /></div>
                        <h3>Tutoría Personalizada</h3>
                        <p>Sesiones uno a uno con expertos. Resuelve dudas específicas y planifica tu estrategia de estudio semana a semana.</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

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
        {/* Usamos una regex simple para quitar el signo $ que clp() podría añadir antes del amount */}
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
      
      {/* Botón de llamada a la acción */}
      <Link to="/inscripcion" className="btn-full-cta">
        Comenzar Ahora <Icons.ArrowRight />
      </Link>
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
            {/* Renderizado condicional del cuerpo de la respuesta */}
            {open && <div className="faq-answer">{a}</div>}
        </div>
    )
}