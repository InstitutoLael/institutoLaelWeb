import { useMemo, useRef, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import MultiHello from "../components/MultiHello.jsx"; 
// Asegúrate de tener esta imagen o quita la referencia si usas puro CSS
import flags from "../assets/img/lael/flags.png"; 

// Importa tus datos y helpers
import { LANGUAGES, ENROLLMENT_FEE, computeLangBundle, clp } from "../data/idiomas.js";

/* ──────────────────────────────────────────────────────────────────────────
   1. ESTILOS CSS - "LUMINOUS SLATE" (WORLD CLASS UI)
   ────────────────────────────────────────────────────────────────────────── */
const css = `
:root {
  /* --- PALETA DE COLORES "CYBER-ACADEMIC" --- */
  --bg-deep: #020617;       /* Fondo Infinito */
  --bg-panel: #0f172a;      /* Paneles */
  --bg-card: #1e293b;       /* Tarjetas */
  
  --primary: #6366f1;       /* Indigo Vibrante */
  --primary-glow: rgba(99, 102, 241, 0.5);
  --accent: #06b6d4;        /* Cyan */
  --accent-glow: rgba(6, 182, 212, 0.5);
  --rose: #f43f5e;          /* Rosa para alertas/descuentos */
  
  --text-main: #f8fafc;
  --text-muted: #94a3b8;
  
  --glass: rgba(30, 41, 59, 0.4);
  --glass-border: rgba(255, 255, 255, 0.08);
  --glass-hover: rgba(255, 255, 255, 0.05);
  
  --radius-lg: 24px;
  --radius-md: 16px;
  --font-sans: 'Inter', system-ui, -apple-system, sans-serif;
  --nav-clearance: 120px; 
}

/* --- RESET & BASE --- */
.idiomas-page {
  background-color: var(--bg-deep);
  color: var(--text-main);
  font-family: var(--font-sans);
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
  padding-bottom: var(--nav-clearance);
}

.container { max-width: 1140px; margin: 0 auto; padding: 0 24px; }
a { text-decoration: none; color: inherit; transition: all .2s; }
button { font-family: inherit; border: none; background: none; cursor: pointer; -webkit-tap-highlight-color: transparent; }
.text-center { text-align: center; }

/* --- LUCES AMBIENTALES --- */
.ambient-orb {
  position: absolute; border-radius: 50%; filter: blur(120px);
  opacity: 0.15; pointer-events: none; z-index: 0;
}
.orb-indigo { width: 700px; height: 700px; top: -300px; right: -200px; background: var(--primary); }
.orb-cyan { width: 500px; height: 500px; bottom: 20%; left: -150px; background: var(--accent); opacity: 0.1; }

/* --- BREADCRUMBS --- */
.breadcrumbs { padding: 20px 0; font-size: 0.9rem; color: var(--text-muted); border-bottom: 1px solid var(--glass-border); position: relative; z-index: 10; }
.breadcrumbs a:hover { color: var(--primary); }
.breadcrumbs .sep { margin: 0 10px; opacity: .4; }
.breadcrumbs .curr { color: var(--text-main); font-weight: 600; }

/* --- HERO SECTION --- */
.hero { padding: 100px 0 60px; position: relative; z-index: 1; }
.hero-grid { display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 60px; align-items: center; }

.badge-pill { 
    display: inline-flex; align-items: center; gap: 6px;
    background: rgba(99,102,241,0.1); color: #818cf8; 
    border: 1px solid rgba(99,102,241,0.25); padding: 8px 16px; border-radius: 50px; 
    font-size: 0.85rem; font-weight: 700; margin-bottom: 24px; text-transform: uppercase; letter-spacing: 0.5px;
}

.display-title { font-size: clamp(2.5rem, 5vw, 4.2rem); line-height: 1.1; margin-bottom: 24px; font-weight: 800; letter-spacing: -0.02em; }
.text-gradient { 
    background: linear-gradient(135deg, #818cf8 0%, #22d3ee 100%); 
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; 
}
.hello-wrapper { display: inline-block; min-width: 120px; }

.lead-text { font-size: 1.15rem; color: var(--text-muted); line-height: 1.7; margin-bottom: 40px; max-width: 580px; }
.lead-text b { color: var(--text-main); font-weight: 600; }

.hero-actions { display: flex; gap: 16px; margin-bottom: 40px; flex-wrap: wrap; }
.btn { 
    padding: 14px 28px; border-radius: 14px; font-weight: 700; font-size: 1rem; 
    display: inline-flex; align-items: center; justify-content: center; gap: 8px;
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.btn-lg { padding: 16px 36px; font-size: 1.1rem; }
.btn-primary { 
    background: var(--primary); color: white; 
    box-shadow: 0 8px 20px -5px var(--primary-glow);
}
.btn-primary:hover { 
    background: #5558e6; transform: translateY(-3px); 
    box-shadow: 0 15px 30px -5px var(--primary-glow); 
}
.btn-ghost { color: var(--text-muted); border: 1px solid var(--glass-border); }
.btn-ghost:hover { border-color: var(--text-main); color: var(--text-main); background: var(--glass); transform: translateY(-2px); }

.trust-badges { display: flex; gap: 20px; flex-wrap: wrap; font-size: 0.9rem; font-weight: 600; color: var(--text-muted); }
.t-badge { display: flex; align-items: center; gap: 8px; background: rgba(255,255,255,0.03); padding: 6px 12px; border-radius: 8px; border: 1px solid var(--glass-border); }
.dot { width: 8px; height: 8px; border-radius: 50%; display: inline-block; }
.i-blue { background: #60a5fa; box-shadow: 0 0 8px #60a5fa; } 
.i-amber { background: #fbbf24; box-shadow: 0 0 8px #fbbf24; } 
.i-teal { background: #2dd4bf; box-shadow: 0 0 8px #2dd4bf; }

/* Hero Visual */
.image-card { 
    position: relative; border-radius: var(--radius-lg); overflow: visible; 
    animation: float 6s ease-in-out infinite; 
}
.image-card img { 
    width: 100%; display: block; height: auto; border-radius: var(--radius-lg);
    border: 1px solid var(--glass-border); 
    box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5); 
    filter: brightness(0.9) contrast(1.1);
}
@keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }

.float-card { 
    position: absolute; background: rgba(15, 23, 42, 0.9); backdrop-filter: blur(12px); 
    padding: 12px 20px; border-radius: 16px; border: 1px solid rgba(255,255,255,0.1);
    display: flex; align-items: center; gap: 12px; box-shadow: 0 15px 35px rgba(0,0,0,0.3);
}
.float-1 { bottom: 30px; left: -30px; }
.float-2 { top: 40px; right: -30px; }
.emoji-box { font-size: 1.6rem; background: rgba(255,255,255,0.05); padding: 8px; border-radius: 10px; }
.float-card div { display: flex; flex-direction: column; line-height: 1.2; }
.float-card strong { font-size: 0.95rem; color: white; }
.float-card small { font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; margin-top: 2px; }

@media (max-width: 900px) { 
    .hero-grid { grid-template-columns: 1fr; text-align: center; } 
    .hero-actions, .trust-badges { justify-content: center; }
    .lead-text { margin-left: auto; margin-right: auto; }
    .image-card { max-width: 500px; margin: 40px auto 0; }
    .float-1 { left: 0; bottom: -20px; }
    .float-2 { right: 0; top: -20px; }
}

/* --- STATS BAR --- */
.stats-section { margin-top: 60px; border-block: 1px solid var(--glass-border); background: rgba(15,23,42,0.4); backdrop-filter: blur(10px); }
.stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; padding: 40px 0; max-width: 1000px; margin: 0 auto; }
.stat-item { text-align: center; }
.stat-number { display: block; font-size: 2.5rem; font-weight: 800; color: white; margin-bottom: 5px; line-height: 1; }
.stat-label { font-size: 0.8rem; color: var(--text-muted); font-weight: 600; text-transform: uppercase; letter-spacing: 1px; }
@media (max-width: 768px) { .stats-grid { grid-template-columns: 1fr 1fr; gap: 40px; } }

/* --- HIGHLIGHT SECTION --- */
.highlight-section { padding: 100px 0; position: relative; z-index: 1; }
.highlight-grid { display: grid; grid-template-columns: 1fr 0.8fr; gap: 60px; align-items: center; }
.sub-caption { color: var(--accent); font-weight: 700; text-transform: uppercase; font-size: 0.85rem; letter-spacing: 1.5px; margin-bottom: 12px; display: block; }
.highlight-section h2 { font-size: 2.5rem; margin-bottom: 20px; }

.benefit-list { margin: 30px 0; display: grid; gap: 16px; }
.benefit-list li { display: flex; align-items: center; gap: 12px; font-size: 1.05rem; color: var(--text-muted); }
.benefit-list b { color: white; font-weight: 600; }
.link-arrow { color: var(--primary); font-weight: 700; font-size: 1.1rem; display: inline-flex; align-items: center; gap: 6px; margin-top: 10px; }
.link-arrow:hover { text-decoration: underline; gap: 10px; }

.path-card { background: var(--bg-card); padding: 40px; border-radius: var(--radius-lg); border: 1px solid var(--glass-border); box-shadow: 0 20px 40px rgba(0,0,0,0.2); }
.path-card h3 { margin-bottom: 25px; font-size: 1.4rem; border-bottom: 1px solid var(--glass-border); padding-bottom: 15px; }
.timeline { display: flex; flex-direction: column; gap: 24px; position: relative; border-left: 2px solid var(--glass-border); padding-left: 24px; margin-left: 10px; }
.step { position: relative; }
.step .circle { 
    position: absolute; left: -41px; top: 0; width: 32px; height: 32px; background: var(--bg-deep); 
    border: 2px solid var(--text-muted); border-radius: 50%; color: var(--text-muted);
    display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 0.8rem; z-index: 2; transition: 0.3s;
}
.step.done .circle { border-color: var(--primary); background: var(--primary); color: white; box-shadow: 0 0 10px var(--primary-glow); }
.step.active .circle { border-color: var(--accent); color: var(--bg-deep); background: var(--accent); box-shadow: 0 0 15px var(--accent-glow); transform: scale(1.1); }
.step .info strong { display: block; color: white; font-size: 1.1rem; margin-bottom: 2px; }

/* --- BUILDER (Cards) --- */
.builder-section { padding: 60px 0; position: relative; z-index: 2; }
.section-header { margin-bottom: 50px; max-width: 650px; margin-inline: auto; }
.section-header h2 { font-size: 2.5rem; margin-bottom: 16px; }

.quick-filters { display: flex; justify-content: center; gap: 12px; flex-wrap: wrap; margin-bottom: 40px; align-items: center; }
.chip { 
    background: var(--bg-card); border: 1px solid var(--glass-border); padding: 10px 20px; border-radius: 50px; 
    color: var(--text-muted); font-weight: 600; font-size: 0.9rem; transition: all .2s; 
}
.chip:hover { border-color: var(--primary); color: white; background: rgba(99,102,241,0.1); transform: translateY(-2px); }

.courses-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 24px; }
.course-card { 
    background: var(--bg-card); border: 1px solid var(--glass-border); border-radius: var(--radius-lg); padding: 30px; 
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1); position: relative; display: flex; flex-direction: column;
}
.course-card:hover { transform: translateY(-8px); box-shadow: 0 20px 40px rgba(0,0,0,0.3); border-color: rgba(255,255,255,0.2); }

.course-card.is-selected { 
    border-color: var(--primary); 
    background: linear-gradient(180deg, rgba(99,102,241,0.08), var(--bg-card)); 
    box-shadow: 0 0 0 1px var(--primary), 0 20px 40px rgba(99,102,241,0.15); 
}
.course-card.is-soon { opacity: 0.8; filter: grayscale(0.5); border-style: dashed; }

.card-top { display: flex; gap: 16px; align-items: flex-start; margin-bottom: 20px; }
.card-emoji { font-size: 2.8rem; line-height: 1; filter: drop-shadow(0 4px 6px rgba(0,0,0,0.3)); }
.card-titles h3 { margin: 0; font-size: 1.4rem; margin-bottom: 6px; }
.badge-live { background: rgba(34,197,94,0.1); color: #4ade80; padding: 4px 10px; border-radius: 6px; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; border: 1px solid rgba(34,197,94,0.2); }
.badge-soon { background: rgba(251,191,36,0.1); color: #fbbf24; padding: 4px 10px; border-radius: 6px; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; border: 1px solid rgba(251,191,36,0.2); }

.checkbox-indicator { 
    width: 26px; height: 26px; border: 2px solid var(--glass-border); border-radius: 50%; margin-left: auto; transition: .2s; 
    display: flex; align-items: center; justify-content: center;
}
.is-selected .checkbox-indicator { background: var(--primary); border-color: var(--primary); }
.is-selected .checkbox-indicator::after { content: '✓'; color: white; font-weight: 800; font-size: 14px; }

.card-summary { font-size: 0.95rem; color: var(--text-muted); margin-bottom: 24px; flex-grow: 1; line-height: 1.6; }

.level-selector { margin-bottom: 24px; background: rgba(0,0,0,0.2); padding: 12px; border-radius: 12px; }
.ls-label { font-size: 0.75rem; text-transform: uppercase; color: var(--text-muted); font-weight: 700; display: block; margin-bottom: 8px; letter-spacing: 0.5px; }
.ls-buttons { display: flex; gap: 8px; flex-wrap: wrap; }
.lv-btn { 
    border: 1px solid var(--glass-border); border-radius: 8px; padding: 6px 14px; font-size: 0.85rem; font-weight: 700; color: var(--text-muted); 
    transition: .2s; background: rgba(255,255,255,0.02);
}
.lv-btn:hover { background: rgba(255,255,255,0.08); color: white; }
.lv-btn.active { background: white; color: var(--bg-deep); border-color: white; box-shadow: 0 2px 10px rgba(255,255,255,0.2); }

.btn-select-course { 
    width: 100%; padding: 14px; border-radius: 12px; font-weight: 700; font-size: 1rem;
    background: var(--bg-panel); color: white; border: 1px solid var(--glass-border); transition: .2s; 
}
.btn-select-course:hover { border-color: var(--text-muted); }
.is-selected .btn-select-course { background: var(--primary); border-color: var(--primary); box-shadow: 0 4px 15px var(--primary-glow); }
.btn-select-course:disabled { opacity: 0.5; cursor: not-allowed; }

/* Details Dropdown */
.card-details { margin-top: 20px; border-top: 1px solid var(--glass-border); padding-top: 15px; }
.card-details summary { font-size: 0.9rem; font-weight: 600; color: var(--accent); opacity: 0.9; }
.card-details summary:hover { opacity: 1; text-decoration: underline; }
.det-content { margin-top: 12px; padding-left: 12px; border-left: 2px solid var(--accent); }
.det-item { font-size: 0.9rem; margin-bottom: 6px; color: var(--text-muted); }
.det-item strong { color: white; }

/* --- FEATURES --- */
.features-section { padding: 80px 0; background: linear-gradient(to bottom, var(--bg-deep), #061021); }
.features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 30px; }
.feat-card { 
    background: var(--bg-panel); padding: 35px 25px; border-radius: var(--radius-lg); 
    border: 1px solid var(--glass-border); text-align: center; transition: 0.3s;
}
.feat-card:hover { transform: translateY(-5px); border-color: rgba(255,255,255,0.2); }
.feat-card .icon { font-size: 3rem; margin-bottom: 20px; display: inline-block; filter: drop-shadow(0 0 15px rgba(255,255,255,0.1)); }
.feat-card h4 { font-size: 1.25rem; margin-bottom: 12px; color: white; }

/* --- TESTIMONIALS --- */
.testimonials-section { padding: 80px 0; }
.testi-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 24px; }
.testi-card { 
    background: var(--bg-card); padding: 30px; border-radius: 20px; 
    border: 1px solid var(--glass-border); box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}
.testi-card p { font-style: italic; font-size: 1.1rem; line-height: 1.6; margin-bottom: 25px; color: #e2e8f0; }
.testi-card .user { display: flex; align-items: center; gap: 15px; }
.testi-card .avatar { 
    width: 45px; height: 45px; border-radius: 50%; background: var(--primary); color: white;
    display: flex; justify-content: center; align-items: center; font-weight: 700; font-size: 1.2rem;
}
.testi-card span { font-size: 0.85rem; color: var(--accent); font-weight: 600; display: block; }

/* --- FAQ --- */
.faq-section { padding: 60px 0 80px; max-width: 800px; margin: 0 auto; }
.faq-wrapper details { 
    border: 1px solid var(--glass-border); border-radius: 12px; margin-bottom: 12px; 
    background: var(--bg-card); overflow: hidden; transition: 0.3s;
}
.faq-wrapper details[open] { border-color: var(--primary); }
.faq-wrapper summary { 
    padding: 24px; font-weight: 700; font-size: 1.1rem; cursor: pointer; 
    position: relative; list-style: none; color: #e2e8f0;
}
.faq-wrapper summary:hover { color: white; }
.faq-wrapper summary::after { 
    content: '+'; position: absolute; right: 24px; font-size: 1.5rem; color: var(--primary);
    top: 50%; transform: translateY(-50%); font-weight: 300;
}
.faq-wrapper details[open] summary::after { content: '−'; }
.faq-wrapper details p { padding: 0 24px 24px; color: var(--text-muted); line-height: 1.7; }

/* --- STICKY BAR --- */
.sticky-bar-wrapper {
    position: fixed; bottom: 0; left: 0; width: 100%; z-index: 100;
    transform: translateY(110%); transition: transform 0.4s cubic-bezier(0.19, 1, 0.22, 1);
}
.sticky-bar-wrapper.show { transform: translateY(0); }

.sticky-bar {
    max-width: 900px; margin: 0 auto; padding: 16px 30px;
    display: flex; justify-content: space-between; align-items: center;
    background: rgba(15, 23, 42, 0.85); backdrop-filter: blur(20px);
    border: 1px solid rgba(255,255,255,0.1); border-bottom: none;
    box-shadow: 0 -10px 40px rgba(0,0,0,0.5); border-radius: 24px 24px 0 0;
}

.bar-info { display: flex; flex-direction: column; }
.bar-count { font-size: 0.8rem; color: var(--accent); font-weight: 700; text-transform: uppercase; letter-spacing: 1px; }
.bar-names { font-size: 1rem; font-weight: 700; color: white; margin-top: 2px; }

.bar-pricing { display: flex; align-items: center; gap: 24px; }
.price-group { text-align: right; line-height: 1.1; }
.price-group small { font-size: 0.75rem; color: var(--text-muted); display: block; text-transform: uppercase; }
.price-big { font-size: 1.6rem; font-weight: 800; color: white; letter-spacing: -0.5px; }

.btn-glow { 
    background: var(--primary); color: white; padding: 12px 28px; border-radius: 50px; font-weight: 700;
    box-shadow: 0 0 20px rgba(99,102,241,0.5); transition: 0.3s;
}
.btn-glow:hover { transform: scale(1.05); box-shadow: 0 0 30px rgba(99,102,241,0.7); }

@media (max-width: 1000px) { .sticky-bar { border-radius: 0; max-width: 100%; padding: 15px 20px; } }
@media (max-width: 600px) {
    .sticky-bar { flex-direction: column; gap: 15px; align-items: stretch; text-align: center; }
    .bar-pricing { justify-content: space-between; flex-direction: row-reverse; }
    .price-group { text-align: left; }
    .btn-glow { padding: 10px 20px; font-size: 0.9rem; }
}
`;

/* ──────────────────────────────────────────────────────────────────────────
   2. SEO HEAD HELPER
   ────────────────────────────────────────────────────────────────────────── */
function SEOHead({ title, description, canonical }) {
  const location = useLocation();
  useEffect(() => {
    document.title = title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", description);
    
    // Canonical
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
        linkCanonical = document.createElement('link');
        linkCanonical.setAttribute('rel', 'canonical');
        document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', canonical || window.location.href);
  }, [title, description, canonical]);
  return null;
}

/* ──────────────────────────────────────────────────────────────────────────
   3. DATA & CONSTANTS
   ────────────────────────────────────────────────────────────────────────── */
const TESTIMONIOS = [
  { name: "Camila R.", note: "Ex-alumna IELTS", quote: "Necesitaba un 6.5 para mi visa y logré un 7.0. Los simulacros son idénticos a la prueba real, me sentí súper preparada." },
  { name: "Felipe M.", note: "Inglés B2", quote: "Lo mejor es que las clases quedan grabadas. Trabajo por turnos y nunca me pierdo materia. La plataforma es un 7." },
  { name: "Andrea S.", note: "Coreano A1", quote: "Empecé sabiendo cero y en 3 meses ya podía leer Hangul fluido. Las profes tienen mucha paciencia." },
];

const COURSE_FAQ = {
  ingles: [
    ["Frecuencia", "2 Clases en vivo semanales + Cápsulas HD."],
    ["Nivelación", "Diagnóstico gratuito al inscribirte."],
    ["Certificado", "Diploma digital verificable al aprobar nivel."],
  ],
  coreano: [
    ["Objetivo", "TOPIK 1 (Lectura y vocabulario básico)."],
    ["Material", "Guías PDF incluidas semana a semana."],
    ["Horario", "Vespertinos (19:00 hrs en adelante)."],
  ],
  portugues: [
    ["Enfoque", "Portugués brasileño comunicacional."],
    ["Duración", "4 meses intensivos por nivel."],
  ],
};

/* ──────────────────────────────────────────────────────────────────────────
   4. COMPONENTE PRINCIPAL (IDIOMAS)
   ────────────────────────────────────────────────────────────────────────── */
export default function Idiomas() {
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectedLevels, setSelectedLevels] = useState({});
  const builderRef = useRef(null);

  // Compute Prices
  const selected = useMemo(() => LANGUAGES.filter((l) => selectedIds.includes(l.id)), [selectedIds]);
  const monthly = computeLangBundle(selected.length);

  // Handlers
  const toggle = (id, comingSoon) => {
    if (comingSoon) return;
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };
  
  const setLevel = (langId, level) => setSelectedLevels((prev) => ({ ...prev, [langId]: level }));

  const quickFilter = (ids, levels) => {
    setSelectedIds(ids);
    setSelectedLevels(levels);
    setTimeout(() => builderRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 100);
  };

  // Quick Options
  const QUICK_OPTS = [
      { label: "Inglés desde Cero", ids: ["ingles"], levels: { ingles: "A1" } },
      { label: "Pack Asiático (Coreano + Inglés)", ids: ["coreano", "ingles"], levels: { coreano: "A1", ingles: "B1" } },
      { label: "Certificación IELTS", ids: ["ingles"], levels: { ingles: "B2" } },
  ];

  // WhatsApp
  const waMsg = encodeURIComponent(`Hola 👋, vengo de la web. Quiero inscribirme en: ${selected.map(s => s.name).join(" + ") || "Idiomas"}.`);

  // Animation for numbers
  useEffect(() => {
    const counters = document.querySelectorAll(".stat-number");
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.dataset.target);
                let count = 0;
                const inc = target / 50;
                const update = () => {
                    count += inc;
                    if(count < target) {
                        el.innerText = Math.ceil(count).toLocaleString('es-CL');
                        requestAnimationFrame(update);
                    } else {
                        el.innerText = target.toLocaleString('es-CL') + (el.dataset.suffix || "");
                    }
                };
                update();
                observer.unobserve(el);
            }
        })
    });
    counters.forEach(c => observer.observe(c));
  }, []);

  return (
    <div className="idiomas-page">
      <style>{css}</style>
      <SEOHead title="Cursos de Idiomas Online | Instituto Lael" description="Inglés, Coreano y Preparación IELTS." canonical="https://institutolael.cl/idiomas" />

      {/* AMBIENT LIGHTS */}
      <div className="ambient-orb orb-indigo" />
      <div className="ambient-orb orb-cyan" />

      {/* HERO SECTION */}
      <header className="hero">
        <div className="container hero-grid">
          <div className="hero-content">
            <div className="badge-pill">🚀 Matrículas 2025 Abiertas</div>
            <h1 className="display-title">
              <span className="hello-wrapper"><MultiHello /></span>{" "}
              con <span className="text-gradient">propósito real</span>.
            </h1>
            <p className="lead-text">
              Deja de estudiar "de memoria" y empieza a comunicarte. 
              <b> Clases en vivo</b>, plataforma 24/7 y una comunidad que te impulsa.
              Empieza hoy con matrícula única de <b>{clp(ENROLLMENT_FEE)}</b>.
            </p>
            
            <div className="hero-actions">
              <button onClick={() => builderRef.current?.scrollIntoView({ behavior: "smooth" })} className="btn btn-primary btn-lg">
                Ver precios y horarios
              </button>
              <a href={`https://wa.me/56964626568?text=${waMsg}`} target="_blank" rel="noreferrer" className="btn btn-ghost">
                Hablar con asesor
              </a>
            </div>

            <div className="trust-badges">
              <span className="t-badge"><i className="dot i-blue"></i> Inglés A1–B2</span>
              <span className="t-badge"><i className="dot i-amber"></i> IELTS / TOEFL</span>
              <span className="t-badge"><i className="dot i-teal"></i> Coreano TOPIK</span>
            </div>
          </div>

          <div className="hero-visual">
            <div className="image-card">
              <img src={flags} alt="Banderas del mundo" loading="eager" />
              <div className="float-card float-1">
                <div className="emoji-box">🎓</div>
                <div><strong>Certificado</strong><small>Al aprobar nivel</small></div>
              </div>
              <div className="float-card float-2">
                <div className="emoji-box">📹</div>
                <div><strong>Grabaciones</strong><small>Disponibles 24/7</small></div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* STATS */}
      <section className="stats-section">
        <div className="stats-grid">
          <div className="stat-item"><span className="stat-number" data-target="92" data-suffix="%">0</span><span className="stat-label">Logra su meta</span></div>
          <div className="stat-item"><span className="stat-number" data-target="1500" data-suffix="+">0</span><span className="stat-label">Alumnos felices</span></div>
          <div className="stat-item"><span className="stat-number" data-target="12000">0</span><span className="stat-label">Horas dictadas</span></div>
           <div className="stat-item"><span className="stat-number" data-target="24">0</span><span className="stat-label">Meses promedio</span></div>
        </div>
      </section>

      {/* HIGHLIGHT */}
      <section className="highlight-section">
        <div className="container highlight-grid">
          <div className="hl-content">
            <span className="sub-caption">Programa Estrella</span>
            <h2>Inglés: Del A1 al B2 + Certificación</h2>
            <p className="lead-text" style={{marginBottom:'20px'}}>No es solo gramática. Es un sistema híbrido diseñado para que hables, entiendas y certifiques tu nivel.</p>
            
            <ul className="benefit-list">
              <li>✅ <b>2 Clases en vivo/semana</b> + Cápsulas</li>
              <li>✅ <b>Diagnóstico de nivel</b> gratuito</li>
              <li>✅ <b>Simulacros IELTS/TOEFL</b> con feedback</li>
              <li>✅ <b>Club de conversación</b> incluido</li>
            </ul>

            <a href="https://wa.me/56964626568?text=Quiero%20diagnostico%20ingles" target="_blank" rel="noreferrer" className="link-arrow">
              Pedir diagnóstico gratis →
            </a>
          </div>
          
          <div className="hl-visual">
            <div className="path-card">
              <h3>Tu Ruta de Aprendizaje</h3>
              <div className="timeline">
                <div className="step done"><span className="circle">A1</span><div className="info"><strong>Inicial</strong></div></div>
                <div className="step done"><span className="circle">A2</span><div className="info"><strong>Básico</strong></div></div>
                <div className="step active"><span className="circle">B1</span><div className="info"><strong>Intermedio</strong></div></div>
                <div className="step"><span className="circle">B2</span><div className="info"><strong>Avanzado / IELTS</strong></div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BUILDER SECTION */}
      <section ref={builderRef} className="builder-section">
        <div className="container">
          <div className="section-header text-center">
            <h2>Arma tu Plan a Medida</h2>
            <p>Elige tu idioma. Si llevas más de uno, obtienes descuento automático.</p>
          </div>

          <div className="quick-filters">
            <span>Atajos rápidos:</span>
            {QUICK_OPTS.map((q, i) => (
                <button key={i} className="chip" onClick={() => quickFilter(q.ids, q.levels)}>{q.label}</button>
            ))}
          </div>

          <div className="courses-grid">
            {LANGUAGES.map((l) => {
              const active = selectedIds.includes(l.id);
              const levels = (l.levels || ["A1", "A2", "B1", "B2"]).slice(0, 4);
              const lvl = selectedLevels[l.id];

              return (
                <article key={l.id} className={`course-card ${active ? "is-selected" : ""} ${l.comingSoon ? "is-soon" : ""}`}>
                  <div className="card-top">
                    <span className="card-emoji">{l.emoji}</span>
                    <div className="card-titles">
                      <h3>{l.name}</h3>
                      {l.comingSoon ? <span className="badge-soon">Lista de espera</span> : <span className="badge-live">En vivo</span>}
                    </div>
                    <div className="checkbox-indicator"></div>
                  </div>

                  <p className="card-summary">{l.summary}</p>

                  <div className="level-selector">
                    <span className="ls-label">Selecciona tu nivel:</span>
                    <div className="ls-buttons">
                      {levels.map((lv) => (
                        <button key={lv} className={`lv-btn ${lvl === lv ? "active" : ""}`}
                          onClick={(e) => { e.stopPropagation(); if(!l.comingSoon) { if(!active) toggle(l.id); setLevel(l.id, lv); }}}
                        >{lv}</button>
                      ))}
                    </div>
                  </div>

                  <button className="btn-select-course" disabled={l.comingSoon} onClick={() => toggle(l.id, l.comingSoon)}>
                    {l.comingSoon ? "Pronto disponible" : active ? "Quitar del plan" : "Seleccionar Curso"}
                  </button>
                  
                  {COURSE_FAQ[l.id] && (
                     <details className="card-details">
                        <summary>Ver horarios y detalles</summary>
                        <div className="det-content">
                            {COURSE_FAQ[l.id].map(([q,a], i) => (
                                <div key={i} className="det-item"><strong>{q}:</strong> {a}</div>
                            ))}
                        </div>
                     </details>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features-section">
        <div className="container">
            <h2 className="text-center" style={{marginBottom:'40px'}}>¿Por qué elegir Lael?</h2>
            <div className="features-grid">
                <div className="feat-card"><div className="icon">💼</div><h4>Enfoque Laboral</h4><p>Role-plays de entrevistas y emails formales.</p></div>
                <div className="feat-card"><div className="icon">🌍</div><h4>Internacional</h4><p>Preparación real para certificaciones (IELTS/TOPIK).</p></div>
                <div className="feat-card"><div className="icon">🤝</div><h4>Comunidad</h4><p>Clubes de conversación y networking entre alumnos.</p></div>
                <div className="feat-card"><div className="icon">⚡</div><h4>Velocidad</h4><p>Avanza un nivel completo cada 3-4 meses.</p></div>
            </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonials-section">
        <div className="container">
            <div className="testi-grid">
                {TESTIMONIOS.map((t,i) => (
                    <div className="testi-card" key={i}>
                        <p>"{t.quote}"</p>
                        <div className="user">
                            <div className="avatar">{t.name.charAt(0)}</div>
                            <div><strong>{t.name}</strong><span>{t.note}</span></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq-section">
        <div className="container">
            <h2 className="text-center" style={{marginBottom:'40px'}}>Preguntas Frecuentes</h2>
            <div className="faq-wrapper">
                <details><summary>¿Las clases quedan grabadas?</summary><p>Sí, absolutamente todas las clases se suben a la plataforma en HD 24hrs después de la sesión en vivo.</p></details>
                <details><summary>¿Entregan certificado?</summary><p>Sí, al aprobar el examen final de cada nivel recibes un diploma digital con código de verificación QR.</p></details>
                <details><summary>¿Cómo sé mi nivel?</summary><p>Al inscribirte te agendamos un diagnóstico gratuito de 15 minutos con un coordinador académico.</p></details>
            </div>
        </div>
      </section>

      {/* STICKY BAR (Mobile & Desktop Conversion) */}
      <div className={`sticky-bar-wrapper ${selected.length > 0 ? 'show' : ''}`}>
        <div className="sticky-bar">
            <div className="bar-info">
                <span className="bar-count">{selected.length} Cursos seleccionados</span>
                <div className="bar-names">{selected.map(s => s.name).join(" + ")}</div>
            </div>
            <div className="bar-pricing">
                <div className="price-group">
                    <small>Valor Mensual</small>
                    <span className="price-big">{clp(monthly)}</span>
                </div>
                <a href={`https://wa.me/56964626568?text=${waMsg}`} target="_blank" rel="noreferrer" className="btn-glow">
                    Inscribirme Ahora
                </a>
            </div>
        </div>
      </div>

    </div>
  );
}