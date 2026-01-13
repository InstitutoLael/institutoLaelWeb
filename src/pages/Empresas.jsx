import { useState, useEffect } from "react";
import { 
  FaBuilding, FaChartLine, FaHandshake, FaUserTie, 
  FaWhatsapp, FaEnvelope, FaCheckCircle, FaCalculator, FaArrowRight
} from "react-icons/fa";
import { MdDashboardCustomize, MdOutlineTimer, MdVerified } from "react-icons/md";
import { BsLightningChargeFill, BsGraphUpArrow } from "react-icons/bs";

// --- IMÁGENES (Usamos Blanco para contraste y Amarillo para acento) ---
import logoBlanco from "../assets/img/Logos/lael-inst-blanco.png";
import logoAmarillo from "../assets/img/Logos/lael-inst-amarillo.png";

// IMPORTAR DATA
import { 
  SERVICE_LINES, 
  EMP_PACKS, 
  WAPP_INTL, 
  calcQuote, 
  clp 
} from "../data/empresas.js";

export default function Business() {
  const [selectedServiceId, setSelectedServiceId] = useState("ingles");
  const [headcount, setHeadcount] = useState(10);
  const [months, setMonths] = useState(3);
  const [modality, setModality] = useState("online");
  const [quote, setQuote] = useState(null);

  useEffect(() => {
    const result = calcQuote({
      lineId: selectedServiceId,
      headcount: Number(headcount),
      durationMonths: Number(months),
      modality: modality
    });
    setQuote(result);
  }, [selectedServiceId, headcount, months, modality]);

  const handleWappClick = () => {
    if (!quote) return;
    const msg = `Hola Lael Corporate. Cotización Web:%0A%0A` +
      `📌 *Servicio:* ${quote.service.label}%0A` +
      `👥 *Equipo:* ${headcount} p.%0A` +
      `⏳ *Duración:* ${months} meses (${modality})%0A` +
      `💰 *Total:* ${clp(quote.financials.total)} + IVA%0A` +
      `Quiero agendar reunión.`;
    window.open(`https://wa.me/${WAPP_INTL}?text=${msg}`, '_blank');
  };

  return (
    <div className="biz-dark-page">
      <style>{css}</style>

      {/* ──────────────── 1. HERO DARK MODE ──────────────── */}
      <header className="biz-hero">
        <div className="hero-glow"></div>
        <div className="container bh-flex">
           <div className="bh-text">
              <div className="bh-badge">
                 <MdVerified /> Soluciones Corporativas B2B
              </div>
              <h1>
                 Transforma tu equipo,<br/>
                 <span className="text-gradient">Eleva tu Cultura.</span>
              </h1>
              <p>
                 Capacitación de alto impacto y beneficios educativos para empresas que buscan más que resultados: buscan trascendencia.
              </p>
              <div className="bh-actions">
                 <a href="#cotizador" className="btn-neon primary">
                    <FaCalculator /> Cotizar en Tiempo Real
                 </a>
                 <a href="#servicios" className="btn-neon outline">
                    Ver Servicios
                 </a>
              </div>
           </div>
           
           {/* Imagen decorativa Hero (Logo Flotante) */}
           <div className="bh-visual">
              <div className="logo-halo">
                 <img src={logoBlanco} alt="Instituto Lael Corporate" />
              </div>
           </div>
        </div>
      </header>

      {/* ──────────────── 2. METRICS & TRUST ──────────────── */}
      <section className="metrics-bar">
         <div className="container mb-grid">
            <div className="metric">
               <span className="m-num">+15</span>
               <span className="m-lbl">Programas a Medida</span>
            </div>
            <div className="metric">
               <span className="m-num">ROI</span>
               <span className="m-lbl">Reportes Mensuales</span>
            </div>
            <div className="metric">
               <span className="m-num">100%</span>
               <span className="m-lbl">Deducible SENCE (Consultar)</span>
            </div>
         </div>
      </section>

      {/* ──────────────── 3. SERVICIOS (NEON CARDS) ──────────────── */}
      <section id="servicios" className="services-section">
         <div className="container">
            <div className="sec-head">
               <h2>Ecosistema de Formación</h2>
               <p>Selecciona una vertical para proyectar tu inversión.</p>
            </div>

            <div className="serv-grid">
               {SERVICE_LINES.map((srv) => (
                  <div 
                    key={srv.id} 
                    className={`serv-card ${selectedServiceId === srv.id ? 'active' : ''}`}
                    onClick={() => {
                       setSelectedServiceId(srv.id);
                       document.getElementById('cotizador').scrollIntoView({ behavior: 'smooth' });
                    }}
                    // Inyectamos el color de marca (pink, teal, indigo) dinámicamente
                    style={{ '--brand-color': srv.brandColor }}
                  >
                     <div className="sc-glow-bg"></div>
                     <div className="sc-icon">{srv.icon}</div>
                     <h3>{srv.label}</h3>
                     <p>{srv.desc}</p>
                     <div className="sc-arrow"><FaArrowRight/></div>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* ──────────────── 4. COTIZADOR "BLACK EDITION" ──────────────── */}
      <section id="cotizador" className="calculator-section">
         <div className="container">
            <div className="calc-frame">
               
               {/* Lado A: Controles */}
               <div className="calc-panel controls">
                  <div className="cp-head">
                     <FaCalculator className="cp-icon"/>
                     <h3>Configurador de Plan</h3>
                  </div>

                  <div className="c-input">
                     <label>Línea de Servicio</label>
                     <select 
                        value={selectedServiceId} 
                        onChange={(e) => setSelectedServiceId(e.target.value)}
                     >
                        {SERVICE_LINES.map(s => (
                           <option key={s.id} value={s.id}>{s.label}</option>
                        ))}
                     </select>
                  </div>

                  <div className="c-input">
                     <div className="lbl-row">
                        <label>Colaboradores</label>
                        <span className="val-display">{headcount}</span>
                     </div>
                     <input 
                        type="range" min="1" max="50" 
                        value={headcount}
                        onChange={(e) => setHeadcount(e.target.value)}
                        className="dark-slider"
                     />
                  </div>

                  <div className="c-input">
                     <label>Duración</label>
                     <div className="btn-group">
                        {[1, 3, 6, 12].map(m => (
                           <button 
                              key={m} 
                              className={months === m ? 'active' : ''}
                              onClick={() => setMonths(m)}
                           >
                              {m} M
                           </button>
                        ))}
                     </div>
                  </div>

                  {quote?.service.type !== 'flat' && (
                     <div className="c-input">
                        <label>Modalidad</label>
                        <div className="btn-group">
                           <button className={modality==='online'?'active':''} onClick={()=>setModality('online')}>Online</button>
                           <button className={modality==='onsite'?'active':''} onClick={()=>setModality('onsite')}>Presencial</button>
                        </div>
                     </div>
                  )}
               </div>

               {/* Lado B: Resultados */}
               <div className="calc-panel results">
                  {quote && (
                     <>
                        <div className="r-logo-bg">
                           <img src={logoAmarillo} alt="watermark" />
                        </div>
                        <div className="r-content">
                           <span className="r-label">Inversión Total Estimada</span>
                           <div className="r-total">
                              {clp(quote.financials.total)}
                              <small>+ IVA</small>
                           </div>

                           {quote.financials.discountPercent > 0 && (
                              <div className="r-badge">
                                 Ahorras un {quote.financials.discountPercent}% por volumen
                              </div>
                           )}

                           <div className="r-stats">
                              <div className="stat">
                                 <span>Por Persona/Mes</span>
                                 <strong>{clp(quote.financials.perPersonMonth)}</strong>
                              </div>
                              <div className="stat">
                                 <span>Costo Total Bruto</span>
                                 <strong>{clp(quote.financials.totalBeforeDiscount)}</strong>
                              </div>
                           </div>

                           <button onClick={handleWappClick} className="btn-neon full green">
                              <FaWhatsapp /> Confirmar Cupos
                           </button>
                           <p className="r-note">Precios sujetos a disponibilidad de agenda.</p>
                        </div>
                     </>
                  )}
               </div>
            </div>
         </div>
      </section>

      {/* ──────────────── 5. PACKS RAPIDOS (Quick Wins) ──────────────── */}
      <section className="packs-section">
         <div className="container">
            <h2>Packs "Quick Win"</h2>
            <p className="sub-h2">Soluciones empaquetadas de rápida implementación.</p>

            <div className="packs-row">
               {EMP_PACKS.map((pack) => (
                  <div key={pack.id} className="pack-dark">
                     <div className="pd-head">
                        <BsLightningChargeFill />
                        <h4>{pack.title}</h4>
                     </div>
                     <p>{pack.subtitle}</p>
                     <div className="pd-price">{pack.priceLabel}</div>
                     <a 
                       href={`https://wa.me/${WAPP_INTL}?text=Interesado en ${pack.title}`}
                       className="pd-link" target="_blank"
                     >
                        Contratar <FaArrowRight/>
                     </a>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* ──────────────── 6. CTA FOOTER ──────────────── */}
      <section className="dark-cta">
         <div className="container">
            <div className="cta-box">
               <h2>Hablemos de Negocios</h2>
               <p>Envíanos un correo o escríbenos. Respondemos en menos de 2 horas.</p>
               <div className="cta-btns">
                  <a href="mailto:contacto@institutolael.cl" className="btn-neon outline">
                     <FaEnvelope/> Correo Corporativo
                  </a>
                  <a href={`https://wa.me/${WAPP_INTL}`} className="btn-neon primary">
                     <FaWhatsapp/> Chat Directo
                  </a>
               </div>
            </div>
         </div>
      </section>

    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   CSS DARK MODE (Embedded)
   ────────────────────────────────────────────────────────────────────────── */
const css = `
:root {
  --bg-main: #020617;     /* Slate 950 - Fondo casi negro */
  --bg-card: #0f172a;     /* Slate 900 - Fondo tarjetas */
  --bg-input: #1e293b;    /* Slate 800 - Inputs */
  
  --txt-main: #f8fafc;    /* Blanco */
  --txt-muted: #94a3b8;   /* Gris */
  
  --accent-gold: #fbbf24; /* Amber 400 - Color Lael */
  --accent-gold-glow: rgba(251, 191, 36, 0.4);
}

.biz-dark-page {
  font-family: 'Inter', sans-serif;
  background-color: var(--bg-main);
  color: var(--txt-main);
  min-height: 100vh;
}
.container { max-width: 1100px; margin: 0 auto; padding: 0 20px; }
h1, h2, h3 { font-family: 'Playfair Display', serif; color: white; margin: 0; }

/* 1. HERO */
.biz-hero {
  position: relative;
  min-height: 80vh;
  display: flex;
  align-items: center;
  overflow: hidden;
  border-bottom: 1px solid rgba(255,255,255,0.05);
}
/* Efecto de fondo sutil */
.hero-glow {
  position: absolute;
  top: -20%; right: -10%;
  width: 50%; height: 80%;
  background: radial-gradient(circle, rgba(37,99,235,0.15) 0%, transparent 70%);
  filter: blur(80px);
  z-index: 0;
}

.bh-flex { display: flex; align-items: center; justify-content: space-between; position: relative; z-index: 1; gap: 40px; }
@media(max-width: 800px) { .bh-flex { flex-direction: column-reverse; text-align: center; } }

.bh-text { flex: 1; }
.bh-badge {
  display: inline-flex; align-items: center; gap: 8px;
  background: rgba(255,255,255,0.1);
  border: 1px solid rgba(255,255,255,0.2);
  color: var(--accent-gold);
  padding: 6px 16px; border-radius: 50px;
  font-size: 0.85rem; text-transform: uppercase; letter-spacing: 1px;
  margin-bottom: 25px;
}
.bh-text h1 { font-size: 3.5rem; line-height: 1.1; margin-bottom: 20px; }
.text-gradient {
  background: linear-gradient(to right, #fff, #94a3b8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.bh-text p { font-size: 1.15rem; color: var(--txt-muted); margin-bottom: 40px; line-height: 1.6; }

.bh-visual { flex: 1; display: flex; justify-content: center; }
.logo-halo {
  width: 300px; height: 300px;
  background: radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%);
  display: flex; align-items: center; justify-content: center;
  border-radius: 50%;
  border: 1px solid rgba(255,255,255,0.05);
  animation: float 6s ease-in-out infinite;
}
.logo-halo img { width: 180px; opacity: 0.9; }

@keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }

/* BUTTONS */
.bh-actions { display: flex; gap: 15px; flex-wrap: wrap; }
@media(max-width: 800px) { .bh-actions { justify-content: center; } }

.btn-neon {
  padding: 14px 28px; border-radius: 6px; font-weight: 600; cursor: pointer;
  display: inline-flex; align-items: center; gap: 10px; transition: 0.3s;
  text-decoration: none; border: none; font-size: 0.95rem;
}
.btn-neon.primary {
  background: white; color: black;
  box-shadow: 0 0 20px rgba(255,255,255,0.2);
}
.btn-neon.primary:hover {
  background: var(--accent-gold); 
  box-shadow: 0 0 30px var(--accent-gold-glow);
}
.btn-neon.outline {
  background: transparent; border: 1px solid rgba(255,255,255,0.3); color: white;
}
.btn-neon.outline:hover { border-color: white; background: rgba(255,255,255,0.05); }

.btn-neon.full { width: 100%; justify-content: center; margin-top: 20px; }
.btn-neon.green { background: #10b981; color: white; box-shadow: 0 0 20px rgba(16, 185, 129, 0.4); }
.btn-neon.green:hover { background: #059669; }

/* 2. METRICS */
.metrics-bar { border-bottom: 1px solid rgba(255,255,255,0.05); }
.mb-grid { display: grid; grid-template-columns: repeat(3, 1fr); text-align: center; }
.metric { padding: 30px; border-right: 1px solid rgba(255,255,255,0.05); }
.metric:last-child { border-right: none; }
.m-num { display: block; font-size: 1.8rem; font-weight: 700; color: white; margin-bottom: 5px; }
.m-lbl { font-size: 0.85rem; color: var(--txt-muted); text-transform: uppercase; letter-spacing: 1px; }

/* 3. SERVICES (Dark Cards) */
.services-section { padding: 80px 0; }
.sec-head { margin-bottom: 50px; text-align: center; }
.sec-head h2 { font-size: 2.5rem; margin-bottom: 10px; }
.sec-head p { color: var(--txt-muted); }

.serv-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; }
.serv-card {
  position: relative;
  background: var(--bg-card);
  border: 1px solid rgba(255,255,255,0.05);
  padding: 30px; border-radius: 12px;
  cursor: pointer; transition: 0.3s; overflow: hidden;
  display: flex; flex-direction: column; height: 100%;
}
.sc-glow-bg {
  position: absolute; inset: 0;
  background: radial-gradient(circle at top right, var(--brand-color), transparent);
  opacity: 0; transition: 0.3s; pointer-events: none;
}
.serv-card:hover { transform: translateY(-5px); border-color: var(--brand-color); }
.serv-card:hover .sc-glow-bg { opacity: 0.15; }
.serv-card.active { border-color: var(--brand-color); background: #141c2f; }
.serv-card.active .sc-glow-bg { opacity: 0.1; }

.sc-icon { font-size: 2rem; margin-bottom: 20px; position: relative; z-index: 1; }
.serv-card h3 { font-family: 'Inter', sans-serif; font-size: 1.2rem; margin-bottom: 10px; position: relative; z-index: 1; }
.serv-card p { font-size: 0.9rem; color: var(--txt-muted); line-height: 1.5; position: relative; z-index: 1; flex-grow: 1; }
.sc-arrow { margin-top: 20px; color: var(--brand-color); opacity: 0; transform: translateX(-10px); transition: 0.3s; }
.serv-card:hover .sc-arrow { opacity: 1; transform: translateX(0); }

/* 4. CALCULATOR (Black Edition) */
.calculator-section { padding: 60px 0; background: #020617; }
.calc-frame {
  display: grid; grid-template-columns: 1.2fr 1fr;
  background: var(--bg-card);
  border-radius: 20px; overflow: hidden;
  border: 1px solid rgba(255,255,255,0.05);
  box-shadow: 0 50px 100px -20px rgba(0,0,0,0.5);
}
@media(max-width: 800px) { .calc-frame { grid-template-columns: 1fr; } }

/* Panel Controls */
.calc-panel.controls { padding: 40px; border-right: 1px solid rgba(255,255,255,0.05); }
.cp-head { display: flex; align-items: center; gap: 10px; margin-bottom: 30px; color: var(--accent-gold); }
.cp-icon { font-size: 1.4rem; }

.c-input { margin-bottom: 25px; }
.c-input label { display: block; color: var(--txt-muted); font-size: 0.85rem; margin-bottom: 8px; text-transform: uppercase; font-weight: 700; letter-spacing: 0.5px; }
.c-input select {
  width: 100%; background: var(--bg-main); color: white;
  border: 1px solid rgba(255,255,255,0.1); padding: 12px;
  border-radius: 6px; font-family: 'Inter', sans-serif;
  outline: none;
}
.lbl-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
.val-display { background: var(--accent-gold); color: black; font-weight: 700; padding: 2px 8px; border-radius: 4px; font-size: 0.9rem; }

.dark-slider { width: 100%; cursor: pointer; accent-color: var(--accent-gold); }

.btn-group { display: flex; gap: 8px; }
.btn-group button {
  flex: 1; background: var(--bg-main); border: 1px solid rgba(255,255,255,0.1);
  color: var(--txt-muted); padding: 10px; border-radius: 6px; cursor: pointer;
  transition: 0.2s; font-weight: 600;
}
.btn-group button.active {
  background: var(--accent-gold); color: black; border-color: var(--accent-gold);
}

/* Panel Results */
.calc-panel.results {
  position: relative; padding: 40px; display: flex; flex-direction: column; justify-content: center;
  background: radial-gradient(circle at bottom right, #1e293b, #0f172a);
}
.r-logo-bg {
  position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
  opacity: 0.05; pointer-events: none;
}
.r-logo-bg img { width: 250px; }

.r-content { position: relative; z-index: 2; text-align: center; }
.r-label { font-size: 0.9rem; color: var(--txt-muted); text-transform: uppercase; letter-spacing: 1px; }
.r-total {
  font-size: 3.5rem; font-weight: 700; color: white;
  margin: 10px 0 20px; font-family: 'Inter', sans-serif;
}
.r-total small { font-size: 1rem; color: var(--txt-muted); font-weight: 400; margin-left: 5px; }
.r-badge {
  display: inline-block; background: rgba(16, 185, 129, 0.2); color: #34d399;
  border: 1px solid rgba(16, 185, 129, 0.3); padding: 5px 12px; border-radius: 50px;
  font-size: 0.8rem; margin-bottom: 30px;
}
.r-stats { display: flex; justify-content: space-between; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 20px; text-align: left; }
.stat span { display: block; font-size: 0.8rem; color: var(--txt-muted); }
.stat strong { display: block; font-size: 1.1rem; color: white; margin-top: 5px; }
.r-note { margin-top: 20px; font-size: 0.75rem; color: var(--txt-muted); opacity: 0.6; }

/* 5. PACKS */
.packs-section { padding: 80px 0; background: var(--bg-main); border-top: 1px solid rgba(255,255,255,0.05); }
.sub-h2 { text-align: center; color: var(--txt-muted); margin-bottom: 40px; }
.packs-row { display: flex; justify-content: center; gap: 20px; flex-wrap: wrap; }
.pack-dark {
  background: var(--bg-card); border: 1px solid rgba(255,255,255,0.05);
  padding: 30px; border-radius: 12px; width: 300px;
  display: flex; flex-direction: column; transition: 0.3s;
}
.pack-dark:hover { border-color: var(--accent-gold); transform: translateY(-5px); }
.pd-head { color: var(--accent-gold); display: flex; align-items: center; gap: 8px; margin-bottom: 10px; font-size: 1.2rem; }
.pack-dark p { color: var(--txt-muted); font-size: 0.9rem; flex-grow: 1; margin-bottom: 20px; }
.pd-price { font-size: 1.1rem; font-weight: 700; color: white; padding-top: 15px; border-top: 1px dashed rgba(255,255,255,0.1); margin-bottom: 15px; }
.pd-link { color: var(--accent-gold); text-decoration: none; font-weight: 600; display: flex; align-items: center; gap: 5px; font-size: 0.9rem; }

/* 6. CTA */
.dark-cta { padding: 60px 0; }
.cta-box {
  background: linear-gradient(135deg, #1e293b, #0f172a);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 20px; padding: 60px 20px; text-align: center;
}
.cta-box h2 { font-size: 2.5rem; margin-bottom: 15px; }
.cta-box p { color: var(--txt-muted); margin-bottom: 30px; }
.cta-btns { display: flex; justify-content: center; gap: 20px; flex-wrap: wrap; }
`;