import { useState, useMemo, useRef, useEffect } from "react";
// Importamos la lógica robusta que acabas de guardar
import { 
  SERVICE_LINES, 
  EMP_PACKS, 
  calcQuote, 
  clp, 
  WAPP_INTL 
} from "../data/empresas.js";

// IMAGEN: Busca una foto de oficina moderna o equipo trabajando
const corpImg = "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop";

/* ──────────────────────────────────────────────────────────────────────────
   1. ICONOS SVG (Estilo Ejecutivo / Minimalista)
   ────────────────────────────────────────────────────────────────────────── */
const Icons = {
  Chart: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/></svg>,
  Users: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  Check: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
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
  --accent: #94a3b8;        /* Slate 400 (Neutro) */
  
  --text-main: #f8fafc;
  --text-muted: #64748b;
  
  --border: rgba(255,255,255,0.1);
  --radius: 12px;
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
.hero-b2b { padding: 100px 0 80px; position: relative; overflow: hidden; }
.hero-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; }

.label-corp { 
  display: inline-flex; align-items: center; gap: 8px;
  background: rgba(59, 130, 246, 0.1); color: var(--primary); 
  padding: 6px 14px; border-radius: 4px; font-weight: 700; font-size: 0.8rem; 
  text-transform: uppercase; letter-spacing: 1px; margin-bottom: 24px; 
  border: 1px solid rgba(59, 130, 246, 0.3);
}

h1 { font-size: clamp(2.5rem, 5vw, 4rem); line-height: 1.1; font-weight: 800; margin-bottom: 24px; letter-spacing: -0.02em; }
.text-highlight { color: var(--primary); }

.hero-lead { font-size: 1.2rem; color: var(--text-muted); line-height: 1.6; margin-bottom: 40px; max-width: 550px; }

.hero-stats { display: flex; gap: 40px; border-top: 1px solid var(--border); padding-top: 30px; }
.stat-box strong { display: block; font-size: 2rem; font-weight: 800; color: white; }
.stat-box span { font-size: 0.85rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.5px; }

.hero-img-box { position: relative; }
.hero-img { width: 100%; border-radius: 16px; filter: grayscale(20%); border: 1px solid var(--border); box-shadow: 0 25px 60px -12px rgba(0,0,0,0.6); }
.float-msg {
  position: absolute; bottom: -25px; left: -25px; background: var(--bg-card);
  padding: 20px 30px; border-radius: 12px; border: 1px solid var(--border);
  box-shadow: 0 10px 40px rgba(0,0,0,0.5); display: flex; align-items: center; gap: 15px;
}
.icon-circle { background: rgba(59, 130, 246, 0.2); color: var(--primary); width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; }

/* CALCULATOR SECTION */
.calc-section { padding: 80px 0; background: #0b1120; border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }
.calc-container { display: grid; grid-template-columns: 1fr 400px; gap: 60px; }

.calc-header h2 { font-size: 2.2rem; margin-bottom: 10px; font-weight: 700; }
.calc-header p { font-size: 1.1rem; color: var(--text-muted); margin-bottom: 40px; }

/* Controls */
.control-group { margin-bottom: 30px; }
.control-label { display: block; font-size: 0.9rem; font-weight: 600; color: var(--accent); margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.5px; }

.select-grid { display: flex; flex-wrap: wrap; gap: 10px; }
.select-chip {
  background: var(--bg-input); border: 1px solid var(--border); padding: 12px 20px; border-radius: 8px;
  text-align: center; cursor: pointer; color: var(--text-muted); font-size: 0.9rem; font-weight: 600; transition: 0.2s;
}
.select-chip:hover { border-color: var(--primary); color: white; }
.select-chip.active { background: var(--primary); color: white; border-color: var(--primary); box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3); }

.range-display { 
  display: flex; justify-content: space-between; align-items: center; 
  background: var(--bg-input); padding: 15px 20px; border-radius: 8px; border: 1px solid var(--border); 
}
.range-val { font-size: 1.4rem; font-weight: 700; color: white; }
input[type=range] { width: 100%; -webkit-appearance: none; background: transparent; margin-top: 15px; }
input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; height: 20px; width: 20px; border-radius: 50%; background: var(--primary); cursor: pointer; margin-top: -8px; }
input[type=range]::-webkit-slider-runnable-track { width: 100%; height: 4px; cursor: pointer; background: #475569; border-radius: 2px; }

/* QUOTE TICKET (Sticky) */
.quote-ticket {
  background: var(--bg-card); border: 1px solid var(--border); border-radius: 16px; padding: 30px;
  position: sticky; top: 30px; box-shadow: 0 20px 50px rgba(0,0,0,0.4);
}
.q-title { font-size: 1.2rem; font-weight: 700; margin-bottom: 20px; padding-bottom: 15px; border-bottom: 1px solid var(--border); color: white; }

.q-row { display: flex; justify-content: space-between; margin-bottom: 12px; font-size: 0.95rem; color: var(--text-muted); }
.q-row strong { color: white; }
.q-total { margin-top: 25px; padding-top: 20px; border-top: 1px dashed var(--border); }
.q-total span { display: block; font-size: 0.9rem; color: var(--text-muted); margin-bottom: 5px; }
.q-total .big-price { font-size: 2.2rem; font-weight: 800; color: white; display: block; line-height: 1; }
.per-person { font-size: 0.8rem; color: var(--primary); display: block; margin-top: 8px; }

.btn-quote {
  width: 100%; background: var(--primary); color: white; padding: 16px; border-radius: 8px;
  font-weight: 700; font-size: 1rem; margin-top: 25px; display: block; text-align: center; transition: 0.2s;
}
.btn-quote:hover { background: var(--primary-dark); transform: translateY(-2px); }

/* PACKS GRID */
.packs-section { padding: 80px 0; }
.packs-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; }
.pack-card {
  background: var(--bg-card); border: 1px solid var(--border); padding: 30px; border-radius: 16px;
  transition: 0.3s; display: flex; flex-direction: column; height: 100%; position: relative; overflow: hidden;
}
.pack-card:hover { transform: translateY(-5px); border-color: var(--primary); }
.brand-line { width: 40px; height: 4px; background: var(--border); margin-bottom: 20px; border-radius: 2px; }
.pack-card h3 { font-size: 1.4rem; margin-bottom: 10px; color: white; }
.pack-card p { color: var(--text-muted); line-height: 1.6; font-size: 0.95rem; margin-bottom: 25px; flex-grow: 1; }
.pack-bullets { list-style: none; padding: 0; margin-bottom: 25px; }
.pack-bullets li { font-size: 0.9rem; color: #cbd5e1; margin-bottom: 10px; display: flex; gap: 10px; align-items: center; }
.srv-link { color: var(--primary); font-weight: 700; display: flex; align-items: center; gap: 8px; font-size: 0.9rem; }

/* FEATURES */
.features-strip { border-top: 1px solid var(--border); padding: 60px 0; background: rgba(59, 130, 246, 0.02); }
.feat-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 40px; }
.feat-item { display: flex; gap: 20px; }
.feat-icon { 
  width: 50px; height: 50px; background: var(--bg-card); border: 1px solid var(--border); 
  border-radius: 12px; display: flex; align-items: center; justify-content: center; color: var(--primary); flex-shrink: 0;
}
.feat-item h4 { margin: 0 0 5px; font-size: 1.1rem; color: white; }
.feat-item p { margin: 0; font-size: 0.9rem; color: var(--text-muted); line-height: 1.5; }

@media (max-width: 968px) {
  .hero-grid { grid-template-columns: 1fr; text-align: center; }
  .hero-lead { margin-inline: auto; }
  .hero-stats { justify-content: center; }
  .calc-container { grid-template-columns: 1fr; }
  .quote-ticket { position: static; margin-top: 40px; }
  .hero-img-box { margin-top: 50px; }
  .float-msg { left: 50%; transform: translateX(-50%); width: max-content; bottom: -25px; }
}
`;

/* ──────────────────────────────────────────────────────────────────────────
   3. COMPONENTE SEO
   ────────────────────────────────────────────────────────────────────────── */
const SEOHead = () => {
  useEffect(() => { document.title = "Lael Corporate | Capacitación para Empresas"; }, []);
  return null;
};

/* ──────────────────────────────────────────────────────────────────────────
   4. COMPONENTE PRINCIPAL
   ────────────────────────────────────────────────────────────────────────── */
export default function Empresas() {
  const scrollRef = useRef(null);

  // ESTADO DEL COTIZADOR
  const [lineId, setLineId] = useState("ingles");
  const [headcount, setHeadcount] = useState(20); // Default: 20 personas
  const [durationMonths, setDurationMonths] = useState(3); // Default: 3 meses
  const [modality, setModality] = useState("online");

  // CÁLCULO EN TIEMPO REAL
  const quote = useMemo(() => {
    return calcQuote({
      lineId,
      headcount,
      durationMonths, // Ajustado para coincidir con la lógica del JS
      modality,
      // Valores por defecto para mantener la UI simple
      durationUnit: "months",
      sessionsPerWeek: 2, 
      hoursPerSession: 1.5,
    });
  }, [lineId, headcount, durationMonths, modality]);

  const activeLine = SERVICE_LINES.find(l => l.id === lineId) || SERVICE_LINES[0];

  // LINK DE WHATSAPP CON DATA
  const waLink = `https://wa.me/${WAPP_INTL}?text=${encodeURIComponent(
    `Hola Lael Corporate, me interesa una propuesta formal:\n\n` +
    `📋 *Servicio:* ${activeLine?.label}\n` +
    `👥 *Equipo:* ${headcount} colaboradores\n` +
    `📅 *Duración:* ${durationMonths} meses\n` +
    `💻 *Modalidad:* ${modality === 'online' ? 'Online' : 'Presencial'}\n\n` +
    `💰 *Presupuesto Estimado:* ${clp(quote.total)}`
  )}`;

  return (
    <div className="business-page">
      <SEOHead />
      <style>{css}</style>

      {/* HERO SECTION */}
      <header className="hero-b2b">
        <div className="container hero-grid">
          <div className="hero-content">
            <div className="label-corp">Soluciones B2B</div>
            <h1>
              Capacitación Ágil. <br/>
              <span className="text-highlight">Resultados Reales.</span>
            </h1>
            <p className="hero-lead">
              Sin burocracia SENCE. Gestionamos programas de alto impacto, rápidos de implementar y enfocados en el ROI de tu empresa.
            </p>
            
            <div className="hero-stats">
              <div className="stat-box"><strong>+50</strong> <span>Clientes</span></div>
              <div className="stat-box"><strong>4.9</strong> <span>Satisfacción</span></div>
              <div className="stat-box"><strong>24h</strong> <span>Respuesta</span></div>
            </div>

            <button 
              onClick={() => scrollRef.current?.scrollIntoView({behavior:'smooth'})} 
              style={{marginTop:'40px', background:'white', color:'#0f172a', padding:'14px 28px', borderRadius:'8px', fontWeight:'700', fontSize:'1rem'}}
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
                <small style={{color:'var(--text-muted)', fontSize:'0.8rem'}}>Implementación en &lt; 48 hrs</small>
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
            <p>Calcula el presupuesto para capacitar a tu equipo en tiempo real.</p>
          </div>

          <div className="calc-container">
            {/* CONTROLES */}
            <div className="calc-controls">
              
              {/* 1. SERVICIO */}
              <div className="control-group">
                <span className="control-label">Área de Capacitación</span>
                <div className="select-grid">
                  {SERVICE_LINES.map(s => (
                    <button 
                      key={s.id} 
                      className={`select-chip ${lineId === s.id ? 'active' : ''}`}
                      onClick={() => setLineId(s.id)}
                    >
                      {s.label.split(" ")[0]} {s.label.includes("Inglés") ? "Corporativo" : ""}
                    </button>
                  ))}
                </div>
                <div style={{marginTop:'15px', fontSize:'0.9rem', color:'white'}}>
                  <span style={{color:'var(--primary)'}}>Seleccionado:</span> {activeLine?.label}
                </div>
              </div>

              <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'30px', marginTop:'30px'}}>
                {/* 2. PERSONAS */}
                <div className="control-group">
                  <span className="control-label">Nº Colaboradores: {headcount}</span>
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
                <span className="control-label">Modalidad Preferida</span>
                <div className="select-grid" style={{gridTemplateColumns:'1fr 1fr'}}>
                   <button className={`select-chip ${modality === 'online' ? 'active' : ''}`} onClick={() => setModality('online')}>
                      💻 100% Online
                   </button>
                   <button className={`select-chip ${modality === 'onsite' ? 'active' : ''}`} onClick={() => setModality('onsite')}>
                      🏢 Presencial (Oficina)
                   </button>
                </div>
              </div>

            </div>

            {/* TICKET RESUMEN */}
            <div className="quote-ticket">
              <div className="q-title">Presupuesto Estimado</div>
              
              <div className="q-row">
                <span>Programa</span>
                <strong>{activeLine?.label.substring(0,25)}...</strong>
              </div>
              <div className="q-row">
                <span>Equipo</span>
                <strong>{headcount} colaboradores</strong>
              </div>
              <div className="q-row">
                <span>Duración</span>
                <strong>{durationMonths} meses</strong>
              </div>
              <div className="q-row">
                <span>Modalidad</span>
                <strong style={{textTransform:'capitalize'}}>{modality}</strong>
              </div>

              <div className="q-total">
                <span>Inversión Total Proyecto</span>
                <span className="big-price">{clp(quote.total)}</span>
                <span className="per-person">aprox. {clp(quote.perPersonMonth)} / persona al mes</span>
              </div>

              <a href={waLink} target="_blank" rel="noreferrer" className="btn-quote">
                Solicitar Propuesta Formal
              </a>
              <p style={{fontSize:'0.75rem', color:'#64748b', marginTop:'15px', textAlign:'center'}}>
                *Valores netos referenciales. Sujeto a evaluación de necesidades.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* PACKS SUGERIDOS */}
      <section className="packs-section">
        <div className="container">
          <h2 style={{fontSize:'2rem', marginBottom:'50px', textAlign:'center'}}>Programas Listos para Implementar</h2>
          <div className="packs-grid">
            {EMP_PACKS.slice(0,3).map(pack => {
                const line = SERVICE_LINES.find(l=>l.id===pack.line);
                return (
                  <div key={pack.id} className="pack-card">
                    <div className="brand-line" style={{background: line?.brandColor}}></div>
                    <h3>{pack.title}</h3>
                    <p>{pack.subtitle}</p>
                    <ul className="pack-bullets">
                      {pack.bullets.map((b, i) => (
                        <li key={i}><Icons.Check/> {b}</li>
                      ))}
                    </ul>
                    <a href={waLink} className="srv-link" style={{color: line?.brandColor}}>
                      Ver detalles <Icons.ArrowRight/>
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
              <h4>Reportes de Avance</h4>
              <p>Seguimiento mensual de asistencia y notas.</p>
            </div>
          </div>
          <div className="feat-item">
            <div className="feat-icon"><Icons.Check/></div>
            <div>
              <h4>Facturación Simple</h4>
              <p>Proceso administrativo rápido y sin trabas.</p>
            </div>
          </div>
          <div className="feat-item">
            <div className="feat-icon"><Icons.Briefcase/></div>
            <div>
              <h4>A la Medida</h4>
              <p>Adaptamos contenidos a su rubro específico.</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}