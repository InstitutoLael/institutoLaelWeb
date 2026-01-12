import { useMemo, useRef, useState, useEffect } from "react";
import MultiHello from "../components/MultiHello.jsx"; 
import flags from "../assets/img/lael/flags.png"; 

// Asegúrate de que esta ruta sea correcta según tu estructura
import { LANGUAGES, ENROLLMENT_FEE, computeLangBundle, clp } from "../data/idiomas.js";

/* ──────────────────────────────────────────────────────────────────────────
   1. DATOS ESTÁTICOS 
   ────────────────────────────────────────────────────────────────────────── */
const STATS_DATA = [
  { val: 92, suffix: "%", label: "Logra su meta" },
  { val: 1500, suffix: "+", label: "Alumnos felices" },
  { val: 12000, suffix: "", label: "Horas dictadas" },
  { val: 24, suffix: "h", label: "Soporte alumno" },
];

const FEATURES_DATA = [
  { icon: "💼", title: "Enfoque Laboral", desc: "Role-plays de entrevistas y correos formales desde el nivel A2." },
  { icon: "🌍", title: "Internacional", desc: "Preparación real para certificaciones (IELTS, TOPIK, TOEFL)." },
  { icon: "🤝", title: "Comunidad", desc: "Clubes de conversación semanales y networking entre alumnos." },
  { icon: "⚡", title: "Velocidad", desc: "Avanza un nivel completo cada 4 meses con nuestra metodología intensiva." },
];

const FAQ_DATA = [
  { q: "¿Las clases quedan grabadas?", a: "Sí, el 100% de las sesiones en vivo se suben a tu aula virtual en alta definición para que repases cuando quieras." },
  { q: "¿Entregan certificado?", a: "Absolutamente. Al finalizar cada nivel y aprobar el examen, recibes un diploma digital verificable con código QR." },
  { q: "¿Qué pasa si falto a una clase?", a: "No hay problema. Tienes la grabación y puedes enviar tus dudas directamente al profesor por el chat del aula." },
  { q: "¿Cómo funcionan los pagos?", a: "Pagas una matrícula única anual y luego tu mensualidad. Si tomas 2 idiomas, el segundo tiene 50% de descuento." },
];

/* ──────────────────────────────────────────────────────────────────────────
   2. ESTILOS CSS "LUMINOUS SLATE"
   ────────────────────────────────────────────────────────────────────────── */
const css = `
:root {
  --bg-deep: #020617;
  --bg-panel: #0f172a;
  --bg-card: #1e293b;
  --primary: #6366f1;
  --primary-glow: rgba(99, 102, 241, 0.5);
  --accent: #06b6d4;
  --text-main: #f8fafc;
  --text-muted: #94a3b8;
  --glass-border: rgba(255, 255, 255, 0.08);
  --radius-lg: 24px;
  --font-sans: 'Inter', system-ui, sans-serif;
}

.idiomas-page { background-color: var(--bg-deep); color: var(--text-main); font-family: var(--font-sans); min-height: 100vh; position: relative; overflow-x: hidden; padding-bottom: 140px; }
.container { max-width: 1140px; margin: 0 auto; padding: 0 24px; }
button { font-family: inherit; border: none; background: none; cursor: pointer; }
.text-center { text-align: center; }

/* Effects */
.ambient-orb { position: absolute; border-radius: 50%; filter: blur(120px); opacity: 0.15; pointer-events: none; z-index: 0; }
.orb-1 { width: 700px; height: 700px; top: -200px; right: -200px; background: var(--primary); }
.orb-2 { width: 500px; height: 500px; bottom: 20%; left: -150px; background: var(--accent); opacity: 0.1; }

/* Hero */
.hero { padding: 100px 0 60px; position: relative; z-index: 1; }
.hero-grid { display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 60px; align-items: center; }
.badge-pill { display: inline-flex; align-items: center; gap: 6px; background: rgba(99,102,241,0.1); color: #818cf8; border: 1px solid rgba(99,102,241,0.25); padding: 8px 16px; border-radius: 50px; font-size: 0.85rem; font-weight: 700; margin-bottom: 24px; text-transform: uppercase; }
.display-title { font-size: clamp(2.5rem, 5vw, 4.2rem); line-height: 1.1; margin-bottom: 24px; font-weight: 800; }
.text-gradient { background: linear-gradient(135deg, #818cf8 0%, #22d3ee 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
.hero-actions { display: flex; gap: 16px; margin-bottom: 40px; flex-wrap: wrap; }
.btn-lg { padding: 16px 36px; border-radius: 14px; font-weight: 700; font-size: 1.1rem; transition: all 0.3s; }
.btn-primary { background: var(--primary); color: white; box-shadow: 0 8px 20px -5px var(--primary-glow); }
.btn-primary:hover { transform: translateY(-3px); box-shadow: 0 15px 30px -5px var(--primary-glow); }
.btn-ghost { color: var(--text-muted); border: 1px solid var(--glass-border); }
.btn-ghost:hover { border-color: var(--text-main); color: var(--text-main); }

/* Stats & Visuals */
.stats-section { margin-top: 60px; border-block: 1px solid var(--glass-border); background: rgba(15,23,42,0.4); }
.stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; padding: 40px 0; max-width: 1000px; margin: 0 auto; }
.stat-number { font-size: 2.5rem; font-weight: 800; color: white; display: block; }
.stat-label { font-size: 0.8rem; color: var(--text-muted); font-weight: 600; text-transform: uppercase; letter-spacing: 1px; }

.image-card { position: relative; animation: float 6s ease-in-out infinite; }
.image-card img { width: 100%; border-radius: var(--radius-lg); border: 1px solid var(--glass-border); box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5); filter: brightness(0.9) contrast(1.1); }
@keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }

/* Cards & Builder */
.builder-section { padding: 60px 0; }
.courses-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); gap: 24px; margin-top: 40px; }
.course-card { background: var(--bg-card); border: 1px solid var(--glass-border); border-radius: var(--radius-lg); padding: 30px; transition: all 0.3s; position: relative; display: flex; flex-direction: column; }
.course-card:hover { transform: translateY(-8px); border-color: rgba(255,255,255,0.2); }
.course-card.is-selected { border-color: var(--primary); background: linear-gradient(180deg, rgba(99,102,241,0.08), var(--bg-card)); box-shadow: 0 0 0 1px var(--primary); }
.course-card.is-soon { opacity: 0.7; filter: grayscale(1); border-style: dashed; }

.check-indicator { width: 28px; height: 28px; border: 2px solid var(--glass-border); border-radius: 50%; display: flex; align-items: center; justify-content: center; transition: .2s; }
.is-selected .check-indicator { background: var(--primary); border-color: var(--primary); }
.is-selected .check-indicator::after { content: '✓'; color: white; font-weight: 800; }

.level-selector { margin: 20px 0; background: rgba(0,0,0,0.2); padding: 10px; border-radius: 12px; }
.ls-buttons { display: flex; gap: 6px; }
.lv-btn { flex: 1; padding: 8px 0; font-size: 0.85rem; font-weight: 700; color: var(--text-muted); border-radius: 8px; transition: .2s; text-align: center; }
.lv-btn:hover { background: rgba(255,255,255,0.05); color: white; }
.lv-btn.active { background: white; color: var(--bg-deep); box-shadow: 0 2px 10px rgba(255,255,255,0.2); }

.btn-select { width: 100%; padding: 14px; border-radius: 12px; font-weight: 700; margin-top: auto; background: var(--bg-panel); color: white; border: 1px solid var(--glass-border); }
.is-selected .btn-select { background: var(--primary); border-color: var(--primary); }

/* Sticky Bar */
.sticky-bar-wrapper { position: fixed; bottom: 0; left: 0; width: 100%; z-index: 100; transform: translateY(110%); transition: transform 0.4s cubic-bezier(0.19, 1, 0.22, 1); }
.sticky-bar-wrapper.show { transform: translateY(0); }
.sticky-bar { max-width: 900px; margin: 0 auto; padding: 16px 30px; display: flex; justify-content: space-between; align-items: center; background: rgba(15, 23, 42, 0.95); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.1); border-bottom: none; box-shadow: 0 -10px 40px rgba(0,0,0,0.5); border-radius: 24px 24px 0 0; }
.btn-glow { background: var(--primary); color: white; padding: 12px 28px; border-radius: 50px; font-weight: 700; box-shadow: 0 0 20px rgba(99,102,241,0.5); transition: 0.3s; text-decoration: none; display: flex; align-items: center; gap: 8px; }
.btn-glow:hover { transform: scale(1.05); }

@media (max-width: 900px) {
    .hero-grid { grid-template-columns: 1fr; text-align: center; }
    .sticky-bar { flex-direction: column; gap: 15px; text-align: center; border-radius: 0; }
    .sticky-bar .bar-info { display: none; }
}
`;

/* ──────────────────────────────────────────────────────────────────────────
   3. COMPONENTE PRINCIPAL
   ────────────────────────────────────────────────────────────────────────── */
export default function Idiomas() {
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectedLevels, setSelectedLevels] = useState({});
  const builderRef = useRef(null);

  // Asegurarnos de que LANGUAGES existe para evitar el error "undefined is not an object"
  const safeLanguages = LANGUAGES || [];

  // 1. Calcular Precios en tiempo real
  const selectedCourses = useMemo(() => {
    return safeLanguages.filter(l => selectedIds.includes(l.id));
  }, [selectedIds, safeLanguages]);

  const pricing = computeLangBundle(selectedCourses.length);
  
  // Total a pagar hoy: Matrícula + Mensualidad
  const totalFirstPayment = pricing.totalMonthly + (selectedIds.length > 0 ? ENROLLMENT_FEE : 0);

  // 2. Handlers
  const toggleCourse = (id, comingSoon) => {
    if (comingSoon) return;
    setSelectedIds(prev => {
        const newState = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id];
        // Si seleccionamos y no hay nivel, seteamos A1 por defecto para evitar errores
        if (!prev.includes(id) && !selectedLevels[id]) {
            setLevel(id, "A1");
        }
        return newState;
    });
  };

  const setLevel = (langId, level) => {
    if (!selectedIds.includes(langId)) {
        setSelectedIds(prev => [...prev, langId]);
    }
    setSelectedLevels(prev => ({ ...prev, [langId]: level }));
  };

  // 3. Generar Link de WhatsApp
  const generateWaLink = () => {
    const coursesText = selectedCourses.map(c => 
        `• ${c.name} (${selectedLevels[c.id] || "A1"})`
    ).join('%0A'); // %0A es salto de línea en URL

    const msg = `Hola! 👋 Me gustaría inscribirme en los siguientes idiomas:%0A%0A${coursesText}%0A%0APrecio Mensual: ${clp(pricing.totalMonthly)}%0AMatrícula: ${clp(ENROLLMENT_FEE)}%0A%0A¿Cómo puedo finalizar mi matrícula?`;
    
    return `https://wa.me/56964626568?text=${msg}`;
  };

  // 4. Efecto de contador visual
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting) {
          const el = entry.target;
          const target = +el.getAttribute('data-val');
          let count = 0;
          const step = Math.ceil(target / 40);
          const update = () => {
            count += step;
            if(count < target) { el.innerText = count; requestAnimationFrame(update); } 
            else { el.innerText = target; }
          };
          update();
          observer.unobserve(el);
        }
      });
    });
    document.querySelectorAll('.stat-count').forEach(el => observer.observe(el));
  }, []);

  return (
    <div className="idiomas-page">
      <style>{css}</style>

      {/* Fondo y Efectos */}
      <div className="ambient-orb orb-1" />
      <div className="ambient-orb orb-2" />

      {/* --- HERO --- */}
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-content">
            <div className="badge-pill">🚀 Matrículas 2025 Abiertas</div>
            <h1 className="display-title">
              <span className="text-gradient"><MultiHello /></span> <br/>
              con propósito real.
            </h1>
            <p style={{fontSize:'1.1rem', color:'var(--text-muted)', lineHeight:'1.7', marginBottom:'40px', maxWidth:'550px'}}>
              Deja de estudiar "de memoria" y empieza a comunicarte. 
              <b> Clases en vivo</b>, plataforma 24/7 y una comunidad que te impulsa.
            </p>
            <div className="hero-actions">
              <button onClick={() => builderRef.current?.scrollIntoView({behavior:'smooth'})} className="btn-lg btn-primary">
                Ver precios y horarios
              </button>
            </div>
          </div>

          <div className="hero-visual">
            <div className="image-card">
              <img src={flags} alt="Banderas Lael" />
            </div>
          </div>
        </div>
      </section>

      {/* --- STATS --- */}
      <section className="stats-section">
        <div className="container stats-grid">
          {STATS_DATA.map((s, i) => (
            <div key={i} className="text-center">
              <span className="stat-number">
                <span className="stat-count" data-val={s.val}>0</span>{s.suffix}
              </span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* --- SELECTOR DE CURSOS --- */}
      <section ref={builderRef} className="builder-section">
        <div className="container">
          <div className="text-center" style={{maxWidth:'700px', margin:'0 auto'}}>
            <h2 style={{fontSize:'2.5rem', marginBottom:'15px'}}>Arma tu Plan a Medida</h2>
            <p style={{color:'var(--text-muted)'}}>
              Elige los idiomas que quieres dominar.
            </p>
          </div>

          <div className="courses-grid">
            {safeLanguages.map((l) => {
              const isActive = selectedIds.includes(l.id);
              const currentLvl = selectedLevels[l.id] || "A1"; 
              const displayLevels = l.levels || ["A1", "A2", "B1", "B2"];

              return (
                <div key={l.id} className={`course-card ${isActive ? 'is-selected' : ''} ${l.comingSoon ? 'is-soon' : ''}`}>
                  <div className="card-top">
                    <span className="card-emoji">{l.emoji}</span>
                    <div className="check-indicator"></div>
                  </div>
                  
                  <h3 style={{fontSize:'1.5rem', marginBottom:'5px'}}>
                    {l.name} {l.comingSoon && <span style={{fontSize:'0.7rem', background:'#fbbf24', color:'black', padding:'2px 6px', borderRadius:'4px', verticalAlign:'middle'}}>PRONTO</span>}
                  </h3>
                  <p style={{color:'var(--text-muted)', fontSize:'0.95rem', flexGrow:1, marginBottom:'20px'}}>
                    {l.summary || "Curso intensivo enfocado en comunicación real."}
                  </p>

                  {!l.comingSoon && (
                    <div className="level-selector">
                      <small style={{display:'block', marginBottom:'8px', color:'var(--text-muted)', textTransform:'uppercase', fontSize:'0.7rem', fontWeight:700}}>Nivel:</small>
                      <div className="ls-buttons">
                        {displayLevels.slice(0,4).map(lv => (
                          <button key={lv} 
                            className={`lv-btn ${isActive && currentLvl === lv ? 'active' : ''}`}
                            onClick={(e) => { e.stopPropagation(); setLevel(l.id, lv); }}
                          >{lv}</button>
                        ))}
                      </div>
                    </div>
                  )}

                  <button className="btn-select" disabled={l.comingSoon} onClick={() => toggleCourse(l.id, l.comingSoon)}>
                    {l.comingSoon ? "Lista de Espera" : (isActive ? "Quitar del plan" : "Seleccionar Curso")}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* --- FEATURES GRID --- */}
      <section className="container" style={{padding:'80px 24px'}}>
         <div className="features-grid">
            {FEATURES_DATA.map((f, i) => (
                <div key={i} className="feat-card">
                    <span className="feat-icon">{f.icon}</span>
                    <h4 style={{fontSize:'1.2rem', marginBottom:'10px', color:'white'}}>{f.title}</h4>
                    <p style={{color:'var(--text-muted)', fontSize:'0.9rem'}}>{f.desc}</p>
                </div>
            ))}
         </div>
      </section>

      {/* --- FAQ SECTION --- */}
      <section className="container" style={{padding:'40px 24px 100px', maxWidth:'800px'}}>
        <h2 className="text-center" style={{marginBottom:'40px'}}>Preguntas Frecuentes</h2>
        <div className="faq-wrapper">
          {FAQ_DATA.map((item, i) => (
            <details key={i}>
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* --- STICKY BAR (FLOTANTE) --- */}
      <div className={`sticky-bar-wrapper ${selectedIds.length > 0 ? 'show' : ''}`}>
        <div className="sticky-bar">
            <div className="bar-info">
                <span style={{color:'var(--accent)', fontWeight:700, textTransform:'uppercase', fontSize:'0.8rem'}}>Tu Plan</span>
                <div style={{color:'white', fontWeight:700, fontSize:'1.1rem'}}>
                    {selectedIds.length} Curso{selectedIds.length !== 1 ? 's' : ''} Seleccionado{selectedIds.length !== 1 ? 's' : ''}
                </div>
            </div>

            <div style={{display:'flex', alignItems:'center', gap:'30px', flexWrap:'wrap', justifyContent:'center'}}>
                <div style={{textAlign:'right'}}>
                    <small style={{display:'block', color:'var(--text-muted)', textTransform:'uppercase', fontSize:'0.75rem'}}>Total Primer Mes (+ Matrícula)</small>
                    <span style={{color:'white', fontWeight:800, fontSize:'1.8rem'}}>{clp(totalFirstPayment)}</span>
                </div>
                
                {/* BOTÓN WHATSAPP */}
                <a 
                  href={generateWaLink()}
                  target="_blank" 
                  rel="noreferrer"
                  className="btn-glow"
                >
                  <span>Inscribirme Ahora</span>
                  <span style={{fontSize:'1.2rem'}}>→</span>
                </a>
            </div>
        </div>
      </div>

    </div>
  );
}