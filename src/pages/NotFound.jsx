import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import SEOHead from "../components/SEOHead.jsx"; // Asegúrate que la ruta sea correcta
import { FaHome, FaSearch, FaWhatsapp, FaLink, FaCompass } from "react-icons/fa";

// Logo oficial
import logo from "../assets/img/Logos/lael-inst-blanco.png"; 

export default function NotFound() {
  const nav = useNavigate();
  const loc = useLocation();
  const [q, setQ] = useState("");
  const [lineIndex, setLineIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  // 1. Frases Rotativas (Con un toque de humor humano)
  const lines = useMemo(() => [
    "Parece que esta página se fue de año sabático.",
    "Error 404: Motivación encontrada, URL perdida.",
    "Exploramos el campus y... nada por aquí.",
    "¿Probaste reiniciando el universo?",
    "Esta ruta es tan secreta que ni el Director la conoce.",
  ], []);
  
  useEffect(() => {
    const t = setInterval(() => setLineIndex((i) => (i + 1) % lines.length), 4000);
    return () => clearInterval(t);
  }, [lines]);

  // 2. Smart Suggest (El cerebro de esta página)
  // Detecta qué intentaba escribir el usuario
  const suggestions = useMemo(() => {
    const p = loc.pathname.toLowerCase();
    const map = [
      { test: /inscrip|matric|pag|comprar/, to: "/inscripcion", label: "Matrícula Online" },
      { test: /adult|2x1|nive|exam|liceo/, to: "/escuela-adultos", label: "Escuela 2x1" },
      { test: /empresa|capacita|b2b/, to: "/empresas", label: "Lael Corporate" },
      { test: /idiom|english|ingles|toefl/, to: "/idiomas", label: "Idiomas" },
      { test: /pae|preu|matemat|lengu|historia/, to: "/paes", label: "Preu PAES" },
      { test: /se[ñn]as|lsch|sordo|mudos/, to: "/lsch", label: "Lengua de Señas" },
      { test: /nosotr|quienes|equipo/, to: "/nosotros", label: "Nuestra Historia" },
    ];
    return map.filter((m) => m.test.test(p));
  }, [loc.pathname]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (q.trim()) {
        // Redirección inteligente básica si no tienes buscador global
        if(q.toLowerCase().includes("paes")) nav("/paes");
        else if(q.toLowerCase().includes("idiom")) nav("/idiomas");
        else nav("/"); // Fallback al home
    }
  };

  const copyUrl = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="nf-page">
      <SEOHead title="404 — Señal Perdida | Instituto Lael" description="Página no encontrada." robots="noindex" />
      <style>{css}</style>

      {/* FONDO DINÁMICO */}
      <div className="noise-overlay"></div>
      <div className="bg-glow glow-1"></div>
      <div className="bg-glow glow-2"></div>
      <Particles />

      <div className="nf-container">
        
        {/* NAVBAR FLOTANTE */}
        <nav className="nf-nav">
            <Link to="/" className="nav-logo">
                <img src={logo} alt="Instituto Lael" className="logo-img" />
            </Link>
        </nav>

        {/* TARJETA DE CRISTAL */}
        <main className="nf-card">
            
            <div className="glitch-wrapper">
                <h1 className="glitch-text" data-text="404">404</h1>
                <div className="scan-line"></div>
            </div>

            <div className="text-content">
                <div className="rotating-text-wrapper">
                    <p key={lineIndex} className="rotating-text">{lines[lineIndex]}</p>
                </div>
                <div className="url-display">
                    <span className="blink-dot"></span>
                    <code className="url-code">{loc.pathname}</code>
                    <span className="status-label">OFFLINE</span>
                </div>
            </div>

            {/* SUGERENCIA INTELIGENTE (SOLO APARECE SI HAY MATCH) */}
            {suggestions.length > 0 && (
                <div className="smart-suggestion">
                    <div className="suggestion-icon"><FaCompass/></div>
                    <div>
                        <span className="suggestion-label">Creemos que buscabas esto:</span>
                        <div className="suggestion-links">
                            {suggestions.map(s => (
                                <Link key={s.to} to={s.to} className="btn-suggestion">
                                    {s.label} →
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* BUSCADOR */}
            <form className="search-box" onSubmit={handleSearch}>
                <FaSearch className="search-icon"/>
                <input 
                    type="text" 
                    placeholder="Escribe lo que buscas..." 
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                />
            </form>

            <div className="divider"><span>Rutas Seguras</span></div>

            <div className="quick-grid">
                <Link to="/" className="chip primary"><FaHome/> Inicio</Link>
                <Link to="/paes" className="chip">📚 PAES</Link>
                <Link to="/idiomas" className="chip">🌍 Idiomas</Link>
                <Link to="/inscripcion" className="chip highlight">📝 Inscripción</Link>
            </div>

            <div className="actions-footer">
                <button onClick={copyUrl} className="text-btn">
                    <FaLink/> {copied ? "Copiado" : "Copiar Enlace"}
                </button>
                <span className="dot">•</span>
                <a href="https://wa.me/56964626568" target="_blank" rel="noreferrer" className="text-btn">
                    <FaWhatsapp/> Soporte Humano
                </a>
            </div>

        </main>
      </div>
    </div>
  );
}

/* --- PARTÍCULAS (Efecto Polvo Espacial) --- */
const Particles = () => (
    <div className="particles-container" aria-hidden="true">
        {[...Array(20)].map((_, i) => (
            <div key={i} className="particle" style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${10 + Math.random() * 10}s`,
                opacity: Math.random() * 0.5
            }} />
        ))}
    </div>
);

/* --- CSS --- */
const css = `
:root {
    --bg-deep: #020617; /* Slate 950 */
    --card-bg: rgba(15, 23, 42, 0.7);
    --border: rgba(255, 255, 255, 0.1);
    --primary: #6366F1; /* Indigo */
    --accent: #F43F5E; /* Rose (para error) */
    --text: #F8FAFC;
    --muted: #94A3B8;
}

.nf-page {
    min-height: 100vh; background: var(--bg-deep); color: var(--text);
    font-family: 'Inter', system-ui, sans-serif; overflow: hidden; position: relative;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
}

/* TEXTURA DE RUIDO (Cinematográfico) */
.noise-overlay {
    position: absolute; inset: 0; opacity: 0.03; pointer-events: none; z-index: 1;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
}

/* LUCES AMBIENTALES */
.bg-glow {
    position: absolute; width: 600px; height: 600px; border-radius: 50%;
    filter: blur(120px); opacity: 0.15; pointer-events: none; z-index: 0;
}
.glow-1 { top: -20%; left: -10%; background: var(--primary); }
.glow-2 { bottom: -20%; right: -10%; background: #06b6d4; }

.nf-container { position: relative; z-index: 10; width: 100%; max-width: 500px; padding: 20px; }

/* NAVBAR */
.nf-nav {
    position: absolute; top: 0; left: 0; width: 100%; padding: 25px;
    display: flex; justify-content: center; z-index: 20;
}
.nav-logo { transition: .3s; display: block; }
.nav-logo:hover { transform: scale(1.05); filter: drop-shadow(0 0 10px rgba(255,255,255,0.3)); }
.logo-img { height: 45px; width: auto; display: block; }

/* CARD PRINCIPAL */
.nf-card {
    background: var(--card-bg); backdrop-filter: blur(20px); 
    border: 1px solid var(--border); box-shadow: 0 40px 80px -20px rgba(0, 0, 0, 0.7);
    border-radius: 30px; padding: 40px; text-align: center;
    transform: translateY(20px); opacity: 0;
    animation: floatUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
}
@keyframes floatUp { to { transform: translateY(0); opacity: 1; } }

/* GLITCH EFFECT REAL */
.glitch-wrapper { position: relative; margin-bottom: 20px; display: inline-block; }
.glitch-text {
    font-size: 6rem; font-weight: 900; line-height: 1; margin: 0; letter-spacing: -5px;
    background: linear-gradient(180deg, #fff 20%, rgba(255,255,255,0.4) 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    position: relative;
}
.glitch-text::before, .glitch-text::after {
    content: attr(data-text); position: absolute; top: 0; left: 0; width: 100%; height: 100%;
    background: var(--bg-deep); opacity: 0.8;
}
.glitch-text::before {
    color: var(--accent); z-index: -1; animation: glitch-effect 3s infinite; clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%);
    transform: translate(-2px, 0); opacity: 0.3;
}
.glitch-text::after {
    color: #06b6d4; z-index: -2; animation: glitch-effect 2s infinite reverse; clip-path: polygon(0 80%, 100% 20%, 100% 100%, 0 100%);
    transform: translate(2px, 0); opacity: 0.3;
}
@keyframes glitch-effect {
    0% { transform: translate(0); }
    20% { transform: translate(-2px, 2px); }
    40% { transform: translate(-2px, -2px); }
    60% { transform: translate(2px, 2px); }
    80% { transform: translate(2px, -2px); }
    100% { transform: translate(0); }
}

.scan-line {
    width: 100%; height: 2px; background: rgba(255,255,255,0.1);
    position: absolute; top: 0; left: 0; animation: scan 3s linear infinite;
}
@keyframes scan { 0% { top: 0%; opacity: 0; } 50% { opacity: 1; } 100% { top: 100%; opacity: 0; } }

/* TEXT CONTENT */
.text-content { margin-bottom: 30px; }
.rotating-text-wrapper { height: 30px; margin-bottom: 10px; overflow: hidden; }
.rotating-text { 
    font-size: 1.1rem; color: white; font-weight: 500; 
    animation: fadeSlide 0.5s ease; 
}
@keyframes fadeSlide { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

.url-display {
    display: inline-flex; align-items: center; gap: 8px;
    background: rgba(0,0,0,0.3); border: 1px solid var(--border);
    padding: 6px 12px; border-radius: 8px; font-size: 0.8rem;
}
.blink-dot { width: 8px; height: 8px; background: var(--accent); border-radius: 50%; animation: blink 1.5s infinite; }
.url-code { color: var(--muted); font-family: monospace; max-width: 180px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.status-label { font-size: 0.65rem; font-weight: 800; color: var(--accent); letter-spacing: 0.5px; }

@keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }

/* SMART SUGGESTION */
.smart-suggestion {
    background: rgba(99, 102, 241, 0.08); border: 1px solid rgba(99, 102, 241, 0.25);
    padding: 16px; border-radius: 16px; margin-bottom: 25px; text-align: left;
    display: flex; gap: 15px; align-items: flex-start;
}
.suggestion-icon {
    background: var(--primary); color: white; width: 32px; height: 32px;
    border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 1rem;
    flex-shrink: 0;
}
.suggestion-label { font-size: 0.8rem; color: #a5b4fc; display: block; margin-bottom: 8px; }
.suggestion-links { display: flex; gap: 8px; flex-wrap: wrap; }
.btn-suggestion {
    text-decoration: none; background: var(--primary); color: white;
    padding: 6px 12px; border-radius: 8px; font-weight: 600; font-size: 0.8rem;
    transition: 0.2s; box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
}
.btn-suggestion:hover { background: #4f46e5; transform: translateY(-1px); }

/* INPUT & CHIPS */
.search-box { position: relative; margin-bottom: 30px; }
.search-box input {
    width: 100%; background: rgba(15, 23, 42, 0.6); border: 1px solid var(--border);
    padding: 14px 14px 14px 45px; border-radius: 14px; color: white; font-size: 0.95rem;
    transition: 0.2s; font-family: inherit;
}
.search-box input:focus { outline: none; border-color: var(--primary); background: rgba(15, 23, 42, 0.9); box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15); }
.search-icon { position: absolute; left: 16px; top: 16px; color: var(--muted); }

.divider { display: flex; align-items: center; margin: 25px 0; color: var(--border); }
.divider::before, .divider::after { content: ''; flex: 1; height: 1px; background: currentColor; }
.divider span { padding: 0 10px; font-size: 0.7rem; color: var(--muted); text-transform: uppercase; letter-spacing: 1px; }

.quick-grid { display: flex; flex-wrap: wrap; justify-content: center; gap: 10px; margin-bottom: 30px; }
.chip {
    text-decoration: none; color: var(--muted); background: rgba(255,255,255,0.03); 
    border: 1px solid var(--border); padding: 8px 16px; border-radius: 50px; 
    font-size: 0.85rem; font-weight: 500; transition: 0.2s; display: flex; align-items: center; gap: 8px;
}
.chip:hover { background: rgba(255,255,255,0.08); color: white; transform: translateY(-2px); border-color: rgba(255,255,255,0.2); }
.chip.primary { background: white; color: black; border-color: white; font-weight: 700; }
.chip.highlight { border-color: rgba(99, 102, 241, 0.5); color: #a5b4fc; background: rgba(99, 102, 241, 0.1); }

/* FOOTER */
.actions-footer { display: flex; justify-content: center; align-items: center; gap: 15px; font-size: 0.85rem; }
.text-btn {
    background: none; border: none; color: var(--muted); cursor: pointer; 
    text-decoration: none; padding: 5px; transition: 0.2s; display: flex; align-items: center; gap: 6px;
}
.text-btn:hover { color: white; }
.dot { color: var(--border); }

/* PARTICLES */
.particles-container { position: absolute; inset: 0; pointer-events: none; }
.particle {
    position: absolute; bottom: -10px; width: 3px; height: 3px; background: white;
    border-radius: 50%; animation: rise linear infinite;
}
@keyframes rise {
    from { transform: translateY(0); }
    to { transform: translateY(-120vh); }
}
`;