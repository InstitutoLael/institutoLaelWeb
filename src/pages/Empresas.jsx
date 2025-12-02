import { useState, useMemo, useRef, useEffect } from "react";
// Importamos la lógica robusta que acabas de guardar
import { 
  SERVICE_LINES, 
  EMP_PACKS, 
  calcQuote, 
  clp, 
  WAPP_INTL 
} from "../data/empresas.js";

// IMAGEN: Oficina moderna, colaborativa, high-end
const corpImg = "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1632&auto=format&fit=crop";

/* ──────────────────────────────────────────────────────────────────────────
   1. ICONOS SVG (Estilo Ejecutivo / Minimalista)
   ────────────────────────────────────────────────────────────────────────── */
const Icons = {
  Chart: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/></svg>,
  Users: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  Check: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  Briefcase: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>,
  Zap: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  ArrowRight: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
};

/* ──────────────────────────────────────────────────────────────────────────
   2. ESTILOS CSS - "CORPORATE SLATE" (AZUL ACERO & GRAFITO)
   ────────────────────────────────────────────────────────────────────────── */
const css = `
:root {
  /* Paleta Corporativa: Slate 950 (Fondo), Slate 800 (Tarjetas) */
  --bg-corp: #020617;
  --bg-card: #0f172a;
  --bg-input: #1e293b;
  
  --primary: #3b82f6;       /* Blue 500 (Confianza y Tecnología) */
  --primary-dark: #1d4ed8;
  --primary-glow: rgba(59, 130, 246, 0.5);
  
  --accent: #94a3b8;        /* Slate 400 (Neutro) */
  
  --text-main: #f8fafc;
  --text-muted: #64748b;
  
  --border: rgba(255,255,255,0.08);
  --radius: 16px;
  --font-sans: 'Inter', system-ui, sans-serif;
}

.business-page {
  background-color: var(--bg-corp);
  color: var(--text-main);
  font-family: var(--font-sans);
  min-height: 100vh;
  padding-bottom: 120px;
}

.container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
button { cursor: pointer; border: none; font-family: inherit; transition: 0.2s; }
a { text-decoration: none; color: inherit; }

/* HERO */
.hero-b2b { padding: 120px 0 80px; position: relative; overflow: hidden; }
.hero-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }

.label-corp { 
  display: inline-flex; align-items: center; gap: 8px;
  background: rgba(59, 130, 246, 0.1); color: var(--primary); 
  padding: 6px 14px; border-radius: 50px; font-weight: 700; font-size: 0.8rem; 
  text-transform: uppercase; letter-spacing: 1px; margin-bottom: 24px; 
  border: 1px solid rgba(59, 130, 246, 0.3);
}

h1 { font-size: clamp(2.8rem, 5vw, 4.5rem); line-height: 1.1; font-weight: 800; margin-bottom: 24px; letter-spacing: -0.03em; }
.text-highlight { 
    background: linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
}

.hero-lead { font-size: 1.2rem; color: var(--text-muted); line-height: 1.6; margin-bottom: 40px; max-width: 550px; }

.hero-stats { display: flex; gap: 40px; border-top: 1px solid var(--border); padding-top: 30px; }
.stat-box strong { display: block; font-size: 2rem; font-weight: 800; color: white; }
.stat-box span { font-size: 0.8rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600; }

.hero-img-box { position: relative; }
.hero-img { 
    width: 100%; border-radius: 20px; 
    filter: brightness(0.8) contrast(1.1); 
    border: 1px solid var(--border); 
    box-shadow: 0 40px 80px -20px rgba(0,0,0,0.7); 
}
.float-msg {
  position: absolute; bottom: -30px; left: -30px; background: rgba(15, 23, 42, 0.95); backdrop-filter: blur(10px);
  padding: 20px 30px; border-radius: 16px; border: 1px solid var(--border);
  box-shadow: 0 20px 50px rgba(0,0,0,0.5); display: flex; align-items: center; gap: 15px;
}
.icon-circle { background: rgba(59, 130, 246, 0.2); color: var(--primary); width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; }

/* CALCULATOR SECTION */
.calc-section { padding: 100px 0; background: #050912; position: relative; }
.calc-container { display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 60px; }

.calc-header h2 { font-size: 2.5rem; margin-bottom: 10px; font-weight: 800; }
.calc-header p { font-size: 1.1rem; color: var(--text-muted); margin-bottom: 40px; }

/* Controls */
.control-group { margin-bottom: 35px; }
.control-label { display: block; font-size: 0.85rem; font-weight: 700; color: var(--accent); margin-bottom: 15px; text-transform: uppercase; letter-spacing: 1px; }

.select-grid { display: flex; flex-wrap: wrap; gap: 10px; }
.select-chip {
  background: var(--bg-input); border: 1px solid var(--border); padding: 14px 20px; border-radius: 10px;
  text-align: left; cursor: pointer; color: var(--text-muted); font-size: 0.95rem; font-weight: 600; transition: 0.2s;
  flex: 1 1 calc(50% - 10px); display: flex; align-items: center; gap: 10px;
}
.select-chip:hover { border-color: var(--primary); color: white; background: rgba(59, 130, 246, 0.05); }
.select-chip.active { background: var(--primary); color: white; border-color: var(--primary); box-shadow: 0 8px 20px -5px var(--primary-glow); }

.range-display { 
  display: flex; justify-content: space-between; align-items: center; 
  background: var(--bg-input); padding: 15px 20px; border-radius: 12px; border: 1px solid var(--border); 
}
.range-val { font-size: 1.4rem; font-weight: 700; color: white; }
input[type=range] { width: 100%; -webkit-appearance: none; background: transparent; margin-top: 20px; }
input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; height: 24px; width: 24px; border-radius: 50%; background: var(--primary); cursor: pointer; margin-top: -10px; border: 4px solid #1e293b; box-shadow: 0 0 10px var(--primary-glow); }
input[type=range]::-webkit-slider-runnable-track { width: 100%; height: 4px; cursor: pointer; background: #334155; border-radius: 2px; }

/* QUOTE TICKET (Sticky) */
.quote-ticket {
  background: var(--bg-card); border: 1px solid var(--border); border-radius: 24px; padding: 40px;
  position: sticky; top: 40px; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5);
  display: flex; flex-direction: column; height: fit-content;
}
.q-title { font-size: 1.1rem; font-weight: 700; margin-bottom: 25px; padding-bottom: 20px; border-bottom: 1px solid var(--border); color: white; display: flex; justify-content: space-between; align-items: center; }
.q-status { font-size: 0.7rem; background: rgba(34, 197, 94, 0.1); color: #22c55e; padding: 4px 10px; border-radius: 50px; text-transform: uppercase; }

.q-row { display: flex; justify-content: space-between; margin-bottom: 16px; font-size: 1rem; color: var(--text-muted); align-items: center; }
.q-row strong { color: white; text-align: right; }
.q-total { margin-top: 30px; padding-top: 25px; border-top: 1px dashed var(--border); }
.q-total .label { display: block; font-size: 0.9rem; color: var(--text-muted); margin-bottom: 5px; text-transform: uppercase; letter-spacing: 1px; }
.q-total .big-price { font-size: 3rem; font-weight: 800; color: white; display: block; line-height: 1; letter-spacing: -1px; }
.per-person { font-size: 0.9rem; color: var(--primary); display: block; margin-top: 10px; font-weight: 500; }

.btn-quote {
  width: 100%; background: var(--primary); color: white; padding: 18px; border-radius: 12px;
  font-weight: 700; font-size: 1.1rem; margin-top: 30px; display: block; text-align: center; transition: 0.2s;
  box-shadow: 0 10px 30px -10px var(--primary-glow);
}
.btn-quote:hover { background: var(--primary-dark); transform: translateY(-2px); }

/* PACKS GRID */
.packs-section { padding: 100px 0; }
.packs-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 30px; }
.pack-card {
  background: var(--bg-card); border: 1px solid var(--border); padding: 35px; border-radius: 20px;
  transition: 0.3s; display: flex; flex-direction: column; height: 100%; position: relative; overflow: hidden;
}
.pack-card:hover { transform: translateY(-8px); border-color: var(--primary); box-shadow: 0 20px 40px -10px rgba(0,0,0,0.5); }
.brand-line { width: 50px; height: 5px; background: var(--border); margin-bottom: 25px; border-radius: 10px; }
.pack-card h3 { font-size: 1.6rem; margin-bottom: 10px; color: white; font-weight: 800; }
.pack-card p { color: var(--text-muted); line-height: 1.6; font-size: 1rem; margin-bottom: 30px; flex-grow: 1; }
.price-tag { display: inline-block; background: rgba(255,255,255,0.05); color: white; padding: 6px 12px; border-radius: 6px; font-size: 0.85rem; font-weight: 700; margin-bottom: 20px; border: 1px solid var(--border); }

.pack-bullets { list-style: none; padding: 0; margin-bottom: 30px; }
.pack-bullets li { font-size: 0.95rem; color: #cbd5e1; margin-bottom: 12px; display: flex; gap: 12px; align-items: center; }
.srv-link { color: var(--primary); font-weight: 700; display: flex; align-items: center; gap: 8px; font-size: 1rem; margin-top: auto; }

/* FEATURES */
.features-strip { border-top: 1px solid var(--border); padding: 80px 0; background: rgba(59, 130, 246, 0.02); }
.feat-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 50px; }
.feat-item { display: flex; gap: 20px; align-items: flex-start; }
.feat-icon { 
  width: 50px; height: 50px; background: var(--bg-card); border: 1px solid var(--border); 
  border-radius: 12px; display: flex; align-items: center; justify-content: center; color: var(--primary); flex-shrink: 0;
  box-shadow: 0 10px 20px rgba(0,0,0,0.2);
}
.feat-item h4 { margin: 0 0 8px; font-size: 1.2rem; color: white; font-weight: 700; }
.feat-item p { margin: 0; font-size: 0.95rem; color: var(--text-muted); line-height: 1.6; }

@media (max-width: 968px) {
  .hero-grid { grid-template-columns: 1fr; text-align: center; }
  .hero-lead { margin-inline: auto; }
  .hero-stats { justify-content: center; }
  .calc-container { grid-template-columns: 1fr; }
  .quote-ticket { position: static; margin-top: 40px; }
  .hero-img-box { margin-top: 50px; max-width: 500px; margin-inline: auto; }
  .float-msg { left: 50%; transform: translateX(-50%); width: max-content; bottom: -30px; }
}
`;

/* ──────────────────────────────────────────────────────────────────────────
   3. COMPONENTE SEO
   ────────────────────────────────────────────────────────────────────────── */
const SEOHead = () => {
  useEffect(() => { document.title = "Lael Corporate | Soluciones B2B"; }, []);
  return null;
};

/* ──────────────────────────────────────────────────────────────────────────
   4. COMPONENTE PRINCIPAL
   ────────────────────────────────────────────────────────────────────────── */
export default function Empresas() {
  const scrollRef = useRef(null);

  // ESTADO DEL COTIZADOR
  const [lineId, setLineId] = useState("ingles");
  const [headcount, setHeadcount] = useState(20); 
  const [durationMonths, setDurationMonths] = useState(3); 
  const [modality, setModality] = useState("online");

  // CÁLCULO EN TIEMPO REAL
  const quote = useMemo(() => {
    return calcQuote({
      lineId,
      headcount,
      durationMonths,
      modality,
    });
  }, [lineId, headcount, durationMonths, modality]);

  const activeLine = SERVICE_LINES.find(l => l.id === lineId) || SERVICE_LINES[0];

  // LINK DE WHATSAPP CON DATA
  const waLink = `https://wa.me/${WAPP_INTL}?text=${encodeURIComponent(
    `Hola Lael Corporate, quiero validar esta cotización web:\n\n` +
    `📋 *Servicio:* ${activeLine?.label}\n` +
    `👥 *Equipo:* ${headcount} personas\n` +
    `📅 *Duración:* ${durationMonths} meses\n` +
    `💻 *Modalidad:* ${modality === 'online' ? 'Online' : 'Presencial'}\n\n` +
    `💰 *Estimado:* ${clp(quote.total)}`
  )}`;

  return (
    <div className="business-page">
      <SEOHead />
      <style>{css}</style>

      {/* HERO SECTION */}
      <header className="hero-b2b">
        <div className="container hero-grid">
          <div className="hero-content">
            <div className="label-corp">Lael Corporate</div>
            <h1>
              Capacitación Ágil. <br/>
              <span className="text-highlight">Resultados Reales.</span>
            </h1>
            <p className="hero-lead">
              Sin burocracia SENCE. Programas de alto impacto, rápidos de implementar y enfocados en el ROI de tu empresa. 
              Desde Inglés de Negocios hasta Beneficios Educativos para las familias.
            </p>
            
            <div className="hero-stats">
              <div className="stat-box"><strong>+50</strong> <span>Empresas</span></div>
              <div className="stat-box"><strong>4.9</strong> <span>Satisfacción</span></div>
              <div className="stat-box"><strong>48h</strong> <span>Implementación</span></div>
            </div>

            <button 
              onClick={() => scrollRef.current?.scrollIntoView({behavior:'smooth'})} 
              style={{marginTop:'40px', background:'white', color:'#0f172a', padding:'16px 32px', borderRadius:'50px', fontWeight:'700', fontSize:'1rem', boxShadow:'0 10px 20px rgba(255,255,255,0.1)'}}
            >
              Cotizar Programa
            </button>
          </div>

          <div className="hero-img-box">
            <img src={corpImg} alt="Corporate Meeting" className="hero-img" />
            <div className="float-msg">
              <div className="icon-circle"><Icons.Zap/></div>
              <div>
                <strong style={{display:'block', fontSize:'0.9rem', color:'white'}}>Inicio Rápido</strong>
                <small style={{color:'var(--text-muted)', fontSize:'0.8rem'}}>Diagnóstico y puesta en marcha express</small>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* COTIZADOR INTERACTIVO */}
      <section ref={scrollRef} className="calc-section">
        <div className="container">
          <div className="calc-header">
            <h2>Estimador de Inversión</h2>
            <p>Transparencia total. Calcula el presupuesto para tu equipo en tiempo real.</p>
          </div>

          <div className="calc-container">
            {/* CONTROLES */}
            <div className="calc-controls">
              
              {/* 1. SERVICIO */}
              <div className="control-group">
                <span className="control-label">¿Qué necesitas potenciar?</span>
                <div className="select-grid">
                  {SERVICE_LINES.map(s => (
                    <button 
                      key={s.id} 
                      className={`select-chip ${lineId === s.id ? 'active' : ''}`}
                      onClick={() => setLineId(s.id)}
                    >
                      <span style={{fontSize:'1.2rem'}}>{s.icon}</span>
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'30px', marginTop:'30px'}}>
                {/* 2. PERSONAS */}
                <div className="control-group">
                  <span className="control-label">Equipo: {headcount} pax</span>
                  <div className="range-display">
                    <Icons.Users />
                    <span className="range-val">{headcount}</span>
                  </div>
                  <input 
                    type="range" min="5" max="100" step="1" 
                    value={headcount} onChange={(e) => setHeadcount(Number(e.target.value))} 
                  />
                </div>

                {/* 3. DURACIÓN */}
                <div className="control-group">
                  <span className="control-label">Duración: {durationMonths} Meses</span>
                  <div className="range-display">
                    <Icons.Zap />
                    <span className="range-val">{durationMonths}</span>
                  </div>
                  <input 
                    type="range" min="1" max="12" step="1" 
                    value={durationMonths} onChange={(e) => setDurationMonths(Number(e.target.value))} 
                  />
                </div>
              </div>

              {/* 4. MODALIDAD */}
              <div className="control-group" style={{marginTop:'30px'}}>
                <span className="control-label">Modalidad</span>
                <div className="select-grid" style={{gridTemplateColumns:'1fr 1fr'}}>
                   <button className={`select-chip ${modality === 'online' ? 'active' : ''}`} onClick={() => setModality('online')}>
                      💻 Online (Zoom/Meet)
                   </button>
                   <button className={`select-chip ${modality === 'onsite' ? 'active' : ''}`} onClick={() => setModality('onsite')}>
                      🏢 Presencial (In-Company)
                   </button>
                </div>
              </div>

            </div>

            {/* TICKET RESUMEN */}
            <div className="quote-ticket">
              <div className="q-title">
                Presupuesto Estimado
                <span className="q-status">Activo</span>
              </div>
              
              <div className="q-row">
                <span>Programa</span>
                <strong>{activeLine?.label}</strong>
              </div>
              <div className="q-row">
                <span>Alcance</span>
                <strong>{headcount} colaboradores</strong>
              </div>
              <div className="q-row">
                <span>Duración</span>
                <strong>{durationMonths} meses</strong>
              </div>
              {quote.discountPercent > 0 && (
                 <div className="q-row" style={{color:'#4ade80'}}>
                    <span>Descuento Volumen</span>
                    <strong>{quote.discountPercent.toFixed(0)}% OFF</strong>
                 </div>
              )}

              <div className="q-total">
                <span className="label">Inversión Total Proyecto</span>
                <span className="big-price">{clp(quote.total)}</span>
                
                {quote.isSpecial ? (
                    <span className="per-person">
                        Valor por beneficiario: {clp(quote.perPersonMonth)}/mes
                    </span>
                ) : (
                    <span className="per-person">
                        Costo por hora/persona: aprox. {clp(quote.total / (headcount * durationMonths * 8))}
                    </span>
                )}
              </div>

              <a href={waLink} target="_blank" rel="noreferrer" className="btn-quote">
                Solicitar Propuesta Formal
              </a>
              <p style={{fontSize:'0.75rem', color:'#64748b', marginTop:'15px', textAlign:'center'}}>
                *Valores netos. Propuesta final sujeta a evaluación técnica.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* PACKS SUGERIDOS */}
      <section className="packs-section">
        <div className="container">
          <h2 style={{fontSize:'2.5rem', marginBottom:'50px', textAlign:'center', fontWeight:'800'}}>Packs de Implementación Rápida</h2>
          <div className="packs-grid">
            {EMP_PACKS.map(pack => {
                const line = SERVICE_LINES.find(l=>l.id===pack.line);
                return (
                  <div key={pack.id} className="pack-card">
                    <div className="brand-line" style={{background: line?.brandColor}}></div>
                    <h3>{pack.title}</h3>
                    {pack.priceLabel && <span className="price-tag">{pack.priceLabel}</span>}
                    <p>{pack.subtitle}</p>
                    <ul className="pack-bullets">
                      {pack.bullets.map((b, i) => (
                        <li key={i}><Icons.Check/> {b}</li>
                      ))}
                    </ul>
                    <a href={waLink} className="srv-link" style={{color: line?.brandColor}}>
                      Contratar este Pack <Icons.ArrowRight/>
                    </a>
                  </div>
                )
            })}
          </div>
        </div>
      </section>

      {/* FEATURES STRIP */}
      <div className="features-strip">
        <div className="container feat-grid">
          <div className="feat-item">
            <div className="feat-icon"><Icons.Chart/></div>
            <div>
              <h4>Reportabilidad Real</h4>
              <p>Dashboard de asistencia y notas mensual para RRHH. Sabrás exactamente quién asiste y quién avanza.</p>
            </div>
          </div>
          <div className="feat-item">
            <div className="feat-icon"><Icons.Check/></div>
            <div>
              <h4>Facturación Ágil</h4>
              <p>Sin contratos eternos. Proceso administrativo simplificado para órdenes de compra.</p>
            </div>
          </div>
          <div className="feat-item">
            <div className="feat-icon"><Icons.Briefcase/></div>
            <div>
              <h4>Adaptabilidad</h4>
              <p>¿Tu rubro es minería, retail o tecnología? Adaptamos el vocabulario a tu industria.</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}