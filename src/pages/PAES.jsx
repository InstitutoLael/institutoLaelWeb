import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaCheck, FaInfoCircle, FaFire, FaBookOpen, FaLaptopCode, FaWhatsapp, FaArrowRight, FaTrash, FaStar } from "react-icons/fa";
import { useCart } from "../context/CartContext.jsx";

// Importamos TU lógica maestra
import { 
  PAES_SUBJECTS, 
  PAES_COMBOS, 
  PAES_FEATURES, 
  PAES_FAQS, 
  computePaesPrice, 
  clp 
} from "../data/paes.js";

export default function Paes() {
  const { addToCart, openCart } = useCart();
  
  // Estado para la "Calculadora de Ramos"
  const [selectedIds, setSelectedIds] = useState([]);
  const [pricing, setPricing] = useState(computePaesPrice([]));

  // Actualizar precio cuando cambian los seleccionados
  useEffect(() => {
    setPricing(computePaesPrice(selectedIds));
  }, [selectedIds]);

  // Manejar selección de ramos
  const toggleSubject = (id) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  // Agregar Personalizado al Carrito
  const handleAddCustom = () => {
    if (selectedIds.length === 0) return;
    
    // Creamos un nombre descriptivo para el carrito
    const names = selectedIds.map(id => PAES_SUBJECTS.find(s => s.id === id).name).join(", ");
    
    addToCart({
      id: `custom-${selectedIds.join('-')}`, // ID único basado en la combinación
      title: `${pricing.label} (${selectedIds.length} ramos)`,
      price: pricing.totalMonthly,
      detail: names,
      type: 'plan'
    });
    openCart(); // Abrimos feedback
  };

  // Agregar Combo Pre-armado al Carrito
  const handleAddCombo = (combo) => {
    addToCart({
      id: `combo-${combo.id}`,
      title: `Pack ${combo.title}`,
      price: combo.price,
      detail: combo.features.join(", "),
      type: 'pack'
    });
    openCart();
  };

  return (
    <div className="paes-page">
      <style>{css}</style>
      
      {/* 1. HERO SECTION: EL PROBLEMA Y LA PROMESA */}
      <header className="paes-hero">
        <div className="container hero-grid">
          <div className="hero-text">
            <span className="badge-new">Admisión 2026 Abierta</span>
            <h1>Domina la PAES,<br/><span className="gradient-text">no dejes que te domine.</span></h1>
            <p className="hero-desc">
              La Prueba de Acceso a la Educación Superior no mide tu inteligencia, mide tu estrategia. 
              En Lael te enseñamos a hackear la prueba con un método centrado en entender, no en memorizar.
            </p>
            <div className="hero-stats">
              <div className="h-stat">
                <strong>+150pts</strong>
                <span>Promedio de alza</span>
              </div>
              <div className="sep"></div>
              <div className="h-stat">
                <strong>En Vivo</strong>
                <span>Clases 100% Online</span>
              </div>
            </div>
            <button onClick={() => document.getElementById('builder').scrollIntoView({behavior:'smooth'})} className="btn-cta-main">
              Armar mi Plan Ahora <FaArrowRight/>
            </button>
          </div>
          <div className="hero-visual">
             <div className="floating-card c1">
                <FaStar className="icon-y"/> <span>850 pts</span> <small>Matemáticas</small>
             </div>
             <div className="floating-card c2">
                <FaBookOpen className="icon-b"/> <span>Comprensión</span> <small>Lectora</small>
             </div>
             <div className="glow-bg"></div>
          </div>
        </div>
      </header>

      {/* 2. VALUE PROPOSITION: POR QUÉ ELEGIRNOS */}
      <section className="value-section">
        <div className="container">
          <div className="sec-title center">
            <h2>Más que clases, un ecosistema de aprendizaje</h2>
            <p>Olvídate de ser un número más en una sala de 100 personas.</p>
          </div>
          
          <div className="features-grid">
            {PAES_FEATURES.map((f, i) => (
              <div className="feat-card" key={i}>
                <div className="feat-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. CONSTRUCTOR DE PLANES (INTERACTIVO) */}
      <section className="builder-section" id="builder">
        <div className="container">
          <div className="sec-title">
            <h2>Diseña tu Estrategia</h2>
            <p>Elige solo los ramos que necesitas. Mientras más agregas, más ahorras.</p>
          </div>

          <div className="builder-interface">
            {/* COLUMNA IZQUIERDA: LISTA DE RAMOS */}
            <div className="subjects-grid">
              {PAES_SUBJECTS.map((sub) => {
                const isSelected = selectedIds.includes(sub.id);
                return (
                  <div 
                    key={sub.id} 
                    className={`subject-card ${isSelected ? 'selected' : ''}`}
                    onClick={() => toggleSubject(sub.id)}
                    style={{ '--accent-color': sub.color }}
                  >
                    <div className="sub-check">
                      {isSelected && <FaCheck />}
                    </div>
                    <div className="sub-icon" style={{background: sub.color}}>{sub.icon}</div>
                    <div className="sub-info">
                      <span className="sub-cat">{sub.category}</span>
                      <h4>{sub.name}</h4>
                      <p>{sub.desc}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* COLUMNA DERECHA: RESUMEN FLOTANTE */}
            <div className="summary-sidebar">
              <div className="sticky-ticket">
                <div className="ticket-header">
                  <h3>Tu Plan Personalizado</h3>
                  {pricing.count > 0 ? (
                    <span className="plan-label-dynamic">{pricing.label}</span>
                  ) : (
                    <span className="plan-label-empty">Sin selección</span>
                  )}
                </div>

                <div className="ticket-body">
                  {pricing.count === 0 ? (
                    <p className="empty-msg">Selecciona asignaturas a la izquierda para ver tu precio.</p>
                  ) : (
                    <ul className="selected-list">
                      {selectedIds.map(id => {
                        const s = PAES_SUBJECTS.find(x => x.id === id);
                        return <li key={id}><span>{s.name}</span> <FaCheck size={10}/></li>
                      })}
                    </ul>
                  )}
                  
                  {pricing.saving > 0 && (
                    <div className="saving-alert">
                      <FaFire /> ¡Ahorras {clp(pricing.saving)} mensuales!
                    </div>
                  )}

                  <div className="price-row">
                    <span>Mensualidad:</span>
                    <strong className="price-big">{clp(pricing.totalMonthly)}</strong>
                  </div>
                  <div className="price-row sm">
                    <span>Matrícula anual:</span>
                    <span>{clp(pricing.enrollment)}</span>
                  </div>
                </div>

                <div className="ticket-footer">
                  <button 
                    className="btn-add-cart" 
                    disabled={pricing.count === 0}
                    onClick={handleAddCustom}
                  >
                    {pricing.count === 0 ? 'Elige tus ramos' : `Inscribir este Plan`}
                  </button>
                  <p className="guarantee"><FaInfoCircle/> Cupos limitados por sección</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PACKS RÁPIDOS (COMBOS) */}
      <section className="combos-section">
        <div className="container">
          <div className="sec-title center">
            <h2>¿No sabes qué elegir?</h2>
            <p>Te recomendamos estos packs según tu objetivo universitario.</p>
          </div>
          
          <div className="combos-grid">
            {PAES_COMBOS.map((combo) => (
              <div className={`combo-card ${combo.color}`} key={combo.id}>
                 {combo.tag && <div className="best-tag">{combo.tag}</div>}
                 <div className="combo-head">
                    <h3>{combo.title}</h3>
                    <p className="subtitle">{combo.subtitle}</p>
                 </div>
                 <div className="combo-price">
                    <span className="curr">{clp(combo.price)}</span>
                    <span className="per">/mes</span>
                 </div>
                 <ul className="combo-feats">
                    {combo.features.map((f, i) => <li key={i}><FaCheck className="chk"/> {f}</li>)}
                 </ul>
                 <button className="btn-combo" onClick={() => handleAddCombo(combo)}>
                    Elegir Pack
                 </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FAQs */}
      <section className="faq-section">
        <div className="container">
           <h2>Preguntas Frecuentes</h2>
           <div className="faq-grid">
              {PAES_FAQS.map((item, idx) => (
                  <details key={idx} className="faq-item">
                      <summary>{item.q}</summary>
                      <p>{item.a}</p>
                  </details>
              ))}
           </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="final-banner">
        <div className="container fb-content">
            <h2>¿Listo para el puntaje nacional?</h2>
            <p>Habla con un orientador si tienes dudas específicas sobre tu carrera.</p>
            <div className="fb-btns">
                <a href="https://wa.me/56964626568" target="_blank" rel="noreferrer" className="btn-wsp">
                    <FaWhatsapp/> Hablar por WhatsApp
                </a>
            </div>
        </div>
      </section>

    </div>
  );
}

/* ================= CSS STYLES ================= */
const css = `
/* VARIABLES & BASE */
:root {
  --bg-dark: #050505;
  --bg-card: #0F1115;
  --bg-card-hover: #161920;
  --primary: #6366f1;
  --accent: #F59E0B;
  --border: rgba(255,255,255,0.08);
  --text-main: #fff;
  --text-muted: #94a3b8;
}
.paes-page { background: var(--bg-dark); color: var(--text-main); font-family: 'Inter', sans-serif; overflow-x: hidden; }
.container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
.gradient-text { background: linear-gradient(90deg, #818cf8, #c084fc); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }

/* 1. HERO */
.paes-hero { padding: 140px 0 80px; position: relative; overflow: hidden; }
.hero-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; }
@media(max-width: 900px) { .hero-grid { grid-template-columns: 1fr; text-align: center; } .hero-stats { justify-content: center; } }

.badge-new { background: rgba(99, 102, 241, 0.15); color: #818cf8; padding: 6px 12px; border-radius: 50px; font-weight: 700; font-size: 0.85rem; text-transform: uppercase; margin-bottom: 20px; display: inline-block; }
.hero-text h1 { font-size: clamp(2.5rem, 5vw, 4.2rem); line-height: 1.1; font-weight: 800; margin-bottom: 24px; }
.hero-desc { font-size: 1.2rem; color: var(--text-muted); line-height: 1.6; margin-bottom: 40px; max-width: 550px; }
.hero-stats { display: flex; gap: 30px; margin-bottom: 40px; align-items: center; }
.h-stat strong { display: block; font-size: 1.5rem; color: #fff; }
.h-stat span { font-size: 0.9rem; color: var(--text-muted); }
.sep { width: 1px; height: 40px; background: var(--border); }
.btn-cta-main { background: #fff; color: #000; padding: 16px 32px; border-radius: 50px; font-weight: 700; font-size: 1.1rem; display: inline-flex; align-items: center; gap: 10px; cursor: pointer; transition: 0.3s; border: none; }
.btn-cta-main:hover { transform: translateY(-3px); box-shadow: 0 10px 25px rgba(255,255,255,0.2); }

/* Hero Visual */
.hero-visual { position: relative; height: 400px; display: flex; justify-content: center; align-items: center; }
.floating-card { position: absolute; background: rgba(20, 20, 30, 0.9); backdrop-filter: blur(10px); padding: 20px; border-radius: 20px; border: 1px solid var(--border); display: flex; flex-direction: column; align-items: center; width: 160px; box-shadow: 0 20px 40px rgba(0,0,0,0.4); animation: float 6s ease-in-out infinite; }
.c1 { top: 20%; right: 10%; z-index: 2; }
.c2 { bottom: 20%; left: 10%; z-index: 1; animation-delay: 3s; }
.glow-bg { width: 300px; height: 300px; background: radial-gradient(circle, rgba(99,102,241,0.4) 0%, rgba(0,0,0,0) 70%); border-radius: 50%; position: absolute; }
.icon-y { color: #fbbf24; font-size: 1.5rem; margin-bottom: 5px; }
.icon-b { color: #60a5fa; font-size: 1.5rem; margin-bottom: 5px; }
@keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }

/* 2. FEATURES */
.value-section { padding: 80px 0; background: #08090c; }
.sec-title { margin-bottom: 50px; }
.sec-title.center { text-align: center; }
.sec-title h2 { font-size: 2.5rem; font-weight: 700; margin-bottom: 10px; }
.sec-title p { color: var(--text-muted); font-size: 1.1rem; }
.features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 30px; }
.feat-card { background: var(--bg-card); padding: 30px; border-radius: 20px; border: 1px solid var(--border); transition: 0.3s; }
.feat-card:hover { border-color: var(--primary); transform: translateY(-5px); }
.feat-icon { font-size: 2rem; margin-bottom: 20px; }
.feat-card h3 { font-size: 1.2rem; margin-bottom: 10px; font-weight: 700; }
.feat-card p { color: var(--text-muted); line-height: 1.5; font-size: 0.95rem; }

/* 3. BUILDER INTERFACE */
.builder-section { padding: 80px 0; }
.builder-interface { display: grid; grid-template-columns: 2fr 1fr; gap: 40px; align-items: start; }
@media(max-width: 900px) { .builder-interface { grid-template-columns: 1fr; } .summary-sidebar { order: -1; } }

.subjects-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px; }
.subject-card { 
  background: var(--bg-card); border: 2px solid var(--border); border-radius: 20px; 
  padding: 24px; cursor: pointer; position: relative; transition: all 0.2s ease;
  display: flex; gap: 20px; align-items: flex-start;
}
.subject-card:hover { background: var(--bg-card-hover); }
.subject-card.selected { border-color: var(--accent-color); background: rgba(255,255,255,0.03); }
.sub-check { position: absolute; top: 15px; right: 15px; width: 24px; height: 24px; border: 2px solid var(--border); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 0.8rem; transition: 0.2s; }
.subject-card.selected .sub-check { background: var(--accent-color); border-color: var(--accent-color); }

.sub-icon { width: 50px; height: 50px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; flex-shrink: 0; }
.sub-cat { font-size: 0.7rem; text-transform: uppercase; color: var(--text-muted); letter-spacing: 1px; font-weight: 700; }
.sub-info h4 { font-size: 1.1rem; margin: 5px 0 8px; font-weight: 700; }
.sub-info p { font-size: 0.85rem; color: var(--text-muted); line-height: 1.4; margin: 0; }

/* Sticky Summary */
.summary-sidebar { position: relative; }
.sticky-ticket { position: sticky; top: 100px; background: #18181b; border-radius: 24px; border: 1px solid var(--border); overflow: hidden; box-shadow: 0 20px 50px rgba(0,0,0,0.5); }
.ticket-header { background: #27272a; padding: 24px; text-align: center; border-bottom: 1px solid var(--border); }
.ticket-header h3 { font-size: 1rem; color: var(--text-muted); margin-bottom: 8px; text-transform: uppercase; letter-spacing: 1px; }
.plan-label-dynamic { color: #fbbf24; font-weight: 800; font-size: 1.3rem; }
.plan-label-empty { color: #52525b; font-weight: 700; font-size: 1.2rem; }

.ticket-body { padding: 24px; }
.empty-msg { text-align: center; color: var(--text-muted); font-size: 0.9rem; font-style: italic; padding: 20px 0; }
.selected-list { list-style: none; padding: 0; margin-bottom: 20px; }
.selected-list li { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.05); color: #d4d4d8; font-size: 0.95rem; }
.saving-alert { background: rgba(16, 185, 129, 0.15); color: #34d399; font-size: 0.85rem; padding: 8px; border-radius: 8px; text-align: center; margin-bottom: 20px; font-weight: 600; display: flex; align-items: center; justify-content: center; gap: 6px; }

.price-row { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 8px; }
.price-row.sm { color: var(--text-muted); font-size: 0.9rem; }
.price-big { font-size: 2rem; color: #fff; line-height: 1; }

.ticket-footer { padding: 24px; background: #202025; border-top: 1px solid var(--border); text-align: center; }
.btn-add-cart { width: 100%; padding: 16px; border-radius: 12px; background: #fff; color: #000; font-weight: 800; font-size: 1rem; border: none; cursor: pointer; transition: 0.2s; }
.btn-add-cart:disabled { background: #3f3f46; color: #71717a; cursor: not-allowed; }
.btn-add-cart:hover:not(:disabled) { transform: scale(1.02); background: #e0e7ff; }
.guarantee { margin-top: 12px; font-size: 0.8rem; color: var(--text-muted); display: flex; align-items: center; justify-content: center; gap: 6px; }

/* 4. COMBOS */
.combos-section { padding: 80px 0; background: linear-gradient(180deg, var(--bg-dark), #0f1115); border-top: 1px solid var(--border); }
.combos-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; }
.combo-card { background: var(--bg-card); border: 1px solid var(--border); border-radius: 24px; padding: 40px; position: relative; display: flex; flex-direction: column; transition: 0.3s; }
.combo-card:hover { transform: translateY(-10px); }
.best-tag { position: absolute; top: -12px; left: 50%; transform: translateX(-50%); background: #f59e0b; color: #000; font-weight: 800; padding: 4px 12px; border-radius: 50px; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 1px; }

.combo-card.amber { border-top: 4px solid #f59e0b; }
.combo-card.teal { border-top: 4px solid #14b8a6; }
.combo-card.indigo { border-top: 4px solid #6366f1; }

.combo-head { text-align: center; margin-bottom: 20px; }
.combo-head h3 { font-size: 1.5rem; margin-bottom: 5px; }
.combo-head .subtitle { font-size: 0.9rem; color: var(--text-muted); }
.combo-price { text-align: center; margin-bottom: 30px; }
.combo-price .curr { font-size: 2.5rem; font-weight: 800; }
.combo-price .per { color: var(--text-muted); }
.combo-feats { list-style: none; padding: 0; margin: 0 0 30px 0; flex-grow: 1; }
.combo-feats li { margin-bottom: 12px; color: #d4d4d8; display: flex; gap: 10px; font-size: 0.95rem; }
.chk { color: var(--primary); margin-top: 2px; }
.btn-combo { width: 100%; background: transparent; border: 1px solid rgba(255,255,255,0.2); color: #fff; padding: 14px; border-radius: 12px; font-weight: 600; cursor: pointer; transition: 0.2s; }
.btn-combo:hover { background: #fff; color: #000; }

/* 5. FAQ & FINAL */
.faq-section { padding: 80px 0; max-width: 800px; margin: 0 auto; }
.faq-section h2 { text-align: center; margin-bottom: 40px; }
.faq-item { background: var(--bg-card); margin-bottom: 15px; border-radius: 12px; border: 1px solid var(--border); overflow: hidden; }
.faq-item summary { padding: 20px; cursor: pointer; font-weight: 600; list-style: none; position: relative; }
.faq-item summary::-webkit-details-marker { display: none; }
.faq-item summary:after { content: '+'; position: absolute; right: 20px; font-size: 1.2rem; color: var(--text-muted); }
.faq-item[open] summary:after { content: '-'; }
.faq-item p { padding: 0 20px 20px; color: var(--text-muted); line-height: 1.6; }

.final-banner { padding: 100px 0; text-align: center; border-top: 1px solid var(--border); }
.fb-content h2 { font-size: 2.5rem; margin-bottom: 15px; }
.fb-content p { color: var(--text-muted); margin-bottom: 30px; }
.btn-wsp { background: #25D366; color: #000; padding: 14px 28px; border-radius: 50px; text-decoration: none; font-weight: 700; display: inline-flex; align-items: center; gap: 8px; transition: 0.3s; }
.btn-wsp:hover { transform: scale(1.05); }
`;