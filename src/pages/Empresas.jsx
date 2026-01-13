import { useState, useEffect } from "react";
import { 
  FaBuilding, FaChartLine, FaHandshake, FaUserTie, 
  FaWhatsapp, FaEnvelope, FaCheckCircle, FaCalculator 
} from "react-icons/fa";
import { MdDashboardCustomize, MdOutlineTimer } from "react-icons/md";
import { BsLightningChargeFill, BsGraphUpArrow } from "react-icons/bs";

// IMPORTAR DATA Y LÓGICA (Asegúrate de que la ruta sea correcta)
import { 
  SERVICE_LINES, 
  EMP_PACKS, 
  WAPP_INTL, 
  calcQuote, 
  clp 
} from "../data/empresas.js";

export default function Business() {
  // --- ESTADOS DEL COTIZADOR ---
  const [selectedServiceId, setSelectedServiceId] = useState("ingles");
  const [headcount, setHeadcount] = useState(10);
  const [months, setMonths] = useState(3);
  const [modality, setModality] = useState("online"); // online | onsite
  
  // Estado para el resultado del cálculo
  const [quote, setQuote] = useState(null);

  // --- EFECTO: Recalcular cuando cambian los inputs ---
  useEffect(() => {
    const result = calcQuote({
      lineId: selectedServiceId,
      headcount: Number(headcount),
      durationMonths: Number(months),
      modality: modality
    });
    setQuote(result);
  }, [selectedServiceId, headcount, months, modality]);

  // --- HANDLER: Enviar cotización a WhatsApp ---
  const handleWappClick = () => {
    if (!quote) return;
    const msg = `Hola Instituto Lael Corporate. Hice una cotización en la web:%0A%0A` +
      `📌 *Servicio:* ${quote.service.label}%0A` +
      `👥 *Equipo:* ${headcount} personas%0A` +
      `⏳ *Duración:* ${months} meses (${modality === 'online' ? 'Online' : 'Presencial'})%0A` +
      `💰 *Presupuesto Est:* ${clp(quote.financials.total)} + IVA%0A%0A` +
      `Me gustaría agendar una reunión para cerrar detalles.`;
    
    window.open(`https://wa.me/${WAPP_INTL}?text=${msg}`, '_blank');
  };

  return (
    <div className="business-page">
      <style>{css}</style>

      {/* ──────────────── 1. HERO B2B ──────────────── */}
      <header className="biz-hero">
        <div className="container bh-content">
           <div className="bh-badge">
              <FaHandshake /> Soluciones Corporativas 2026
           </div>
           <h1>Potencia tu Capital Humano con <span className="highlight">Propósito</span>.</h1>
           <p>
             Capacitación, Idiomas y Beneficios para el colaborador moderno. 
             Precios transparentes, ejecución ágil y valores cristianos que fortalecen la cultura organizacional.
           </p>
           <div className="bh-actions">
              <a href="#cotizador" className="btn-biz primary">
                 <FaCalculator /> Cotizar Online Ahora
              </a>
              <a href="#servicios" className="btn-biz ghost">
                 Explorar Servicios
              </a>
           </div>
        </div>
      </header>

      {/* ──────────────── 2. TRUST INDICATORS (Por qué elegirnos) ──────────────── */}
      <section className="trust-section">
         <div className="container trust-grid">
            <div className="trust-item">
               <MdDashboardCustomize className="t-icon" />
               <h3>A Medida</h3>
               <p>No vendemos enlatados. Adaptamos la malla curricular a la industria de tu empresa.</p>
            </div>
            <div className="trust-item">
               <BsGraphUpArrow className="t-icon" />
               <h3>ROI Real</h3>
               <p>Precios de entrada agresivos y métricas de asistencia para asegurar el retorno de inversión.</p>
            </div>
            <div className="trust-item">
               <FaUserTie className="t-icon" />
               <h3>Ética & Valores</h3>
               <p>Nuestros profesionales no solo enseñan técnica; transmiten integridad y excelencia.</p>
            </div>
         </div>
      </section>

      {/* ──────────────── 3. SERVICIOS (GRID) ──────────────── */}
      <section id="servicios" className="services-section">
         <div className="container">
            <div className="sec-header">
               <h2>Líneas de Servicio</h2>
               <p>Selecciona el área que tu equipo necesita reforzar.</p>
            </div>

            <div className="serv-grid">
               {SERVICE_LINES.map((srv) => (
                  <div 
                    key={srv.id} 
                    className={`serv-card ${selectedServiceId === srv.id ? 'active' : ''}`}
                    onClick={() => {
                       setSelectedServiceId(srv.id);
                       // Scroll suave al cotizador al seleccionar
                       document.getElementById('cotizador').scrollIntoView({ behavior: 'smooth' });
                    }}
                    style={{ '--brand': srv.brandColor }}
                  >
                     <div className="sc-icon-box">{srv.icon}</div>
                     <div className="sc-info">
                        <h3>{srv.label}</h3>
                        <p>{srv.desc}</p>
                     </div>
                     <div className="sc-cta">Cotizar &rarr;</div>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* ──────────────── 4. COTIZADOR INTERACTIVO (LA JOYA) ──────────────── */}
      <section id="cotizador" className="calculator-section">
         <div className="container">
            <div className="calc-wrapper">
               
               {/* --- LADO IZQUIERDO: CONTROLES --- */}
               <div className="calc-controls">
                  <div className="cc-header">
                     <FaCalculator className="cc-icon"/>
                     <h3>Configura tu Plan</h3>
                  </div>

                  {/* Input: Servicio */}
                  <div className="input-group">
                     <label>Servicio Requerido</label>
                     <select 
                        value={selectedServiceId} 
                        onChange={(e) => setSelectedServiceId(e.target.value)}
                     >
                        {SERVICE_LINES.map(s => (
                           <option key={s.id} value={s.id}>{s.label}</option>
                        ))}
                     </select>
                  </div>

                  {/* Input: Cantidad Personas (Slider + Number) */}
                  <div className="input-group">
                     <label>Nº de Colaboradores: <strong>{headcount}</strong></label>
                     <input 
                        type="range" min="1" max="50" step="1"
                        value={headcount}
                        onChange={(e) => setHeadcount(e.target.value)}
                     />
                     <div className="range-labels">
                        <span>1</span>
                        <span>50+</span>
                     </div>
                  </div>

                  {/* Input: Duración */}
                  <div className="input-group">
                     <label>Duración del programa: <strong>{months} Meses</strong></label>
                     <div className="months-selector">
                        {[1, 3, 6, 10].map(m => (
                           <button 
                              key={m} 
                              className={months === m ? 'active' : ''}
                              onClick={() => setMonths(m)}
                           >
                              {m} Mes{m>1 && 'es'}
                           </button>
                        ))}
                     </div>
                  </div>

                  {/* Input: Modalidad (Solo si aplica) */}
                  {quote?.service.type !== 'flat' && (
                     <div className="input-group">
                        <label>Modalidad</label>
                        <div className="toggle-modality">
                           <button 
                              className={modality === 'online' ? 'active' : ''}
                              onClick={() => setModality('online')}
                           >Online (Zoom)</button>
                           <button 
                              className={modality === 'onsite' ? 'active' : ''}
                              onClick={() => setModality('onsite')}
                           >Presencial (Oficina)</button>
                        </div>
                     </div>
                  )}

               </div>

               {/* --- LADO DERECHO: RESULTADOS --- */}
               <div className="calc-results">
                  {quote && (
                     <>
                        <div className="cr-header">
                           <span>Presupuesto Estimado</span>
                           {quote.financials.discountPercent > 0 && (
                              <span className="discount-tag">
                                 {quote.financials.discountPercent}% OFF por Volumen
                              </span>
                           )}
                        </div>
                        
                        <div className="cr-big-price">
                           {clp(quote.financials.total)}
                           <small> + IVA / Total</small>
                        </div>

                        <div className="cr-breakdown">
                           <div className="cr-row">
                              <span>Costo por persona (Total):</span>
                              <strong>{clp(quote.financials.perPersonTotal)}</strong>
                           </div>
                           <div className="cr-row">
                              <span>Costo mensual empresa:</span>
                              <strong>{clp(quote.financials.total / quote.params.durationMonths)}</strong>
                           </div>
                        </div>

                        <div className="cr-actions">
                           <button onClick={handleWappClick} className="btn-wapp-calc">
                              <FaWhatsapp /> Solicitar esta Cotización
                           </button>
                           <p className="legal-note">
                              *Valores referenciales sujetos a disponibilidad de agenda.
                           </p>
                        </div>
                     </>
                  )}
               </div>

            </div>
         </div>
      </section>

      {/* ──────────────── 5. PACKS GANCHO ──────────────── */}
      <section className="packs-section">
         <div className="container">
            <h2>Packs de Entrada Rápida</h2>
            <p className="subtitle">¿Poco presupuesto? Prueba con estas soluciones empaquetadas.</p>
            
            <div className="packs-grid">
               {EMP_PACKS.map(pack => (
                  <div key={pack.id} className="emp-pack-card">
                     <div className="ep-badge"><BsLightningChargeFill/> Quick Win</div>
                     <h4>{pack.title}</h4>
                     <p>{pack.subtitle}</p>
                     <ul>
                        {pack.bullets.map((b,i) => <li key={i}><FaCheckCircle/> {b}</li>)}
                     </ul>
                     <div className="ep-price">{pack.priceLabel}</div>
                     <a 
                        href={`https://wa.me/${WAPP_INTL}?text=Hola, me interesa el pack empresas: ${pack.title}`}
                        target="_blank" rel="noopener noreferrer"
                        className="btn-link"
                     >
                        Contratar Pack &rarr;
                     </a>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* ──────────────── 6. CTA FINAL ──────────────── */}
      <section className="biz-cta">
         <div className="container">
            <h2>¿Listo para profesionalizar a tu equipo?</h2>
            <div className="cta-buttons">
               <a href={`mailto:contacto@institutolael.cl`} className="btn-biz outline">
                  <FaEnvelope /> Solicitar Propuesta PDF
               </a>
               <a href={`https://wa.me/${WAPP_INTL}`} className="btn-biz whatsapp">
                  <FaWhatsapp /> Hablar con un Asesor
               </a>
            </div>
         </div>
      </section>

    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   ESTILOS CSS (Corporate Modern - Clean & Trustworthy)
   ────────────────────────────────────────────────────────────────────────── */
const css = `
:root {
  --b-blue: #0f172a;       /* Dark Navy */
  --b-blue-light: #334155;
  --b-accent: #2563eb;     /* Corporate Blue */
  --b-accent-hover: #1d4ed8;
  --b-bg: #f8fafc;
  --b-white: #ffffff;
  --b-green: #10b981;
}

.business-page { font-family: 'Inter', sans-serif; background: var(--b-bg); color: var(--b-blue); }
.container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
h1, h2, h3 { font-family: 'Playfair Display', serif; font-weight: 700; color: var(--b-blue); }
.highlight { color: var(--b-accent); font-style: italic; }

/* 1. HERO */
.biz-hero { background: white; padding: 80px 0 60px; text-align: center; border-bottom: 1px solid #e2e8f0; }
.bh-content { max-width: 800px; margin: 0 auto; }
.bh-badge { display: inline-flex; align-items: center; gap: 8px; background: #eff6ff; color: var(--b-accent); padding: 6px 16px; border-radius: 50px; font-size: 0.85rem; font-weight: 600; margin-bottom: 20px; border: 1px solid #dbeafe; }
.biz-hero h1 { font-size: clamp(2.5rem, 5vw, 4rem); line-height: 1.1; margin-bottom: 20px; letter-spacing: -1px; }
.biz-hero p { font-size: 1.15rem; color: #64748b; margin-bottom: 40px; line-height: 1.6; }
.bh-actions { display: flex; gap: 15px; justify-content: center; flex-wrap: wrap; }

.btn-biz { padding: 14px 28px; border-radius: 6px; font-weight: 600; text-decoration: none; display: flex; align-items: center; gap: 8px; transition: 0.2s; }
.btn-biz.primary { background: var(--b-blue); color: white; }
.btn-biz.primary:hover { background: var(--b-accent); transform: translateY(-2px); }
.btn-biz.ghost { background: transparent; color: var(--b-blue-light); border: 1px solid #cbd5e1; }
.btn-biz.ghost:hover { border-color: var(--b-blue); color: var(--b-blue); }
.btn-biz.whatsapp { background: #25D366; color: white; }
.btn-biz.outline { border: 2px solid white; color: white; }

/* 2. TRUST */
.trust-section { padding: 50px 0; border-bottom: 1px solid #e2e8f0; background: white; }
.trust-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 40px; text-align: center; }
.t-icon { font-size: 2.5rem; color: var(--b-accent); margin-bottom: 15px; }
.trust-item h3 { font-size: 1.2rem; margin-bottom: 10px; font-family: 'Inter', sans-serif; }
.trust-item p { font-size: 0.95rem; color: #64748b; line-height: 1.5; }

/* 3. SERVICES */
.services-section { padding: 80px 0; }
.sec-header { text-align: center; margin-bottom: 50px; }
.sec-header h2 { font-size: 2.5rem; margin-bottom: 10px; }
.sec-header p { color: #64748b; }

.serv-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; }
.serv-card { background: white; border: 1px solid #e2e8f0; padding: 25px; border-radius: 12px; display: flex; align-items: flex-start; gap: 15px; cursor: pointer; transition: 0.2s; position: relative; overflow: hidden; }
.serv-card:hover { transform: translateY(-3px); box-shadow: 0 10px 20px rgba(0,0,0,0.05); border-color: var(--brand); }
.serv-card.active { border-color: var(--brand); background: #f0f9ff; box-shadow: 0 0 0 1px var(--brand); }
.sc-icon-box { font-size: 2rem; width: 50px; text-align: center; flex-shrink: 0; }
.sc-info h3 { font-size: 1.1rem; margin-bottom: 5px; font-family: 'Inter', sans-serif; }
.sc-info p { font-size: 0.9rem; color: #64748b; line-height: 1.4; }
.sc-cta { position: absolute; bottom: 15px; right: 20px; font-size: 0.8rem; font-weight: 700; color: var(--brand); opacity: 0; transform: translateX(10px); transition: 0.2s; }
.serv-card:hover .sc-cta { opacity: 1; transform: translateX(0); }

/* 4. CALCULATOR */
.calculator-section { padding: 60px 0; background: linear-gradient(to bottom, var(--b-bg) 0%, #e2e8f0 100%); }
.calc-wrapper { display: grid; grid-template-columns: 1fr 1fr; gap: 30px; background: white; border-radius: 20px; box-shadow: 0 20px 50px rgba(0,0,0,0.1); overflow: hidden; }
@media(max-width: 800px) { .calc-wrapper { grid-template-columns: 1fr; } }

/* Left Controls */
.calc-controls { padding: 40px; background: white; }
.cc-header { display: flex; align-items: center; gap: 10px; margin-bottom: 30px; color: var(--b-blue); }
.cc-icon { font-size: 1.5rem; color: var(--b-accent); }

.input-group { margin-bottom: 25px; }
.input-group label { display: block; font-weight: 600; margin-bottom: 10px; font-size: 0.9rem; color: var(--b-blue-light); }
.input-group select, .input-group input[type="range"] { width: 100%; padding: 10px; border-radius: 8px; border: 1px solid #cbd5e1; font-family: 'Inter', sans-serif; }
.input-group input[type="range"] { cursor: pointer; }
.range-labels { display: flex; justify-content: space-between; font-size: 0.8rem; color: #94a3b8; margin-top: 5px; }

.months-selector { display: flex; gap: 5px; background: #f1f5f9; padding: 4px; border-radius: 8px; }
.months-selector button { flex: 1; border: none; background: transparent; padding: 8px; border-radius: 6px; font-size: 0.9rem; font-weight: 600; color: #64748b; cursor: pointer; transition: 0.2s; }
.months-selector button.active { background: white; color: var(--b-accent); box-shadow: 0 2px 5px rgba(0,0,0,0.05); }

.toggle-modality { display: flex; gap: 10px; }
.toggle-modality button { flex: 1; border: 1px solid #e2e8f0; background: white; padding: 10px; border-radius: 8px; font-weight: 600; color: #64748b; cursor: pointer; }
.toggle-modality button.active { border-color: var(--b-accent); color: var(--b-accent); background: #eff6ff; }

/* Right Results */
.calc-results { background: var(--b-blue); color: white; padding: 40px; display: flex; flex-direction: column; justify-content: center; position: relative; }
.cr-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; font-size: 0.9rem; color: #94a3b8; }
.discount-tag { background: var(--b-green); color: white; padding: 4px 10px; border-radius: 4px; font-size: 0.75rem; font-weight: 700; }

.cr-big-price { font-size: 3rem; font-weight: 700; font-family: 'Playfair Display', serif; line-height: 1; margin-bottom: 30px; }
.cr-big-price small { display: block; font-size: 0.9rem; font-family: 'Inter', sans-serif; font-weight: 400; color: #cbd5e1; margin-top: 5px; }

.cr-breakdown { background: rgba(255,255,255,0.1); border-radius: 8px; padding: 20px; margin-bottom: 30px; }
.cr-row { display: flex; justify-content: space-between; margin-bottom: 10px; font-size: 0.95rem; }
.cr-row:last-child { margin-bottom: 0; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 10px; }

.btn-wapp-calc { width: 100%; background: white; color: var(--b-blue); border: none; padding: 15px; border-radius: 8px; font-weight: 700; font-size: 1rem; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 10px; transition: 0.2s; }
.btn-wapp-calc:hover { background: #f8fafc; transform: translateY(-2px); }
.legal-note { font-size: 0.75rem; color: #64748b; margin-top: 20px; text-align: center; opacity: 0.6; }

/* 5. PACKS */
.packs-section { padding: 80px 0; background: white; }
.subtitle { text-align: center; color: #64748b; margin-bottom: 40px; }
.packs-grid { display: flex; flex-wrap: wrap; gap: 20px; justify-content: center; }
.emp-pack-card { background: white; border: 1px solid #e2e8f0; padding: 30px; border-radius: 12px; width: 300px; display: flex; flex-direction: column; transition: 0.3s; }
.emp-pack-card:hover { border-color: var(--b-accent); transform: translateY(-5px); box-shadow: 0 15px 30px rgba(0,0,0,0.08); }
.ep-badge { color: var(--b-accent); font-weight: 700; font-size: 0.8rem; margin-bottom: 10px; display: flex; align-items: center; gap: 5px; }
.emp-pack-card h4 { font-size: 1.3rem; margin-bottom: 5px; font-family: 'Inter', sans-serif; }
.emp-pack-card p { font-size: 0.9rem; color: #64748b; margin-bottom: 20px; flex-grow: 1; }
.emp-pack-card ul { list-style: none; padding: 0; margin-bottom: 20px; }
.emp-pack-card li { display: flex; gap: 8px; font-size: 0.9rem; margin-bottom: 8px; color: var(--b-blue-light); }
.ep-price { font-size: 1.1rem; font-weight: 700; color: var(--b-blue); margin-bottom: 20px; padding-top: 15px; border-top: 1px dashed #e2e8f0; }
.btn-link { color: var(--b-accent); text-decoration: none; font-weight: 600; font-size: 0.9rem; }

/* 6. CTA */
.biz-cta { background: var(--b-blue); padding: 80px 0; text-align: center; color: white; }
.biz-cta h2 { color: white; margin-bottom: 30px; }
.cta-buttons { display: flex; gap: 20px; justify-content: center; }

/* Responsive Adjustments */
@media(max-width: 600px) {
  .bh-actions, .cta-buttons { flex-direction: column; }
  .btn-biz { width: 100%; justify-content: center; }
  .cr-big-price { font-size: 2.5rem; }
}
`;