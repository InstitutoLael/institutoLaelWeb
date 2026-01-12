import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import SEOHead from "../components/SEOHead.jsx";
import { FaHome, FaSearch, FaWhatsapp, FaLink } from "react-icons/fa";

// 👇 AQUÍ ESTÁ EL CAMBIO: Usamos tu logo real
import logo from "../assets/img/Logos/lael-inst-blanco.png"; 

export default function NotFound() {
  const nav = useNavigate();
  const loc = useLocation();
  const [q, setQ] = useState("");
  const [lineIndex, setLineIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  // 1. Frases con personalidad
  const lines = useMemo(() => [
    "Ups... esta página se fue de vacaciones.",
    "Buscamos por todo el campus, pero no está aquí.",
    "Error 404: Motivación encontrada, URL perdida.",
    "¿Probaste reiniciando el universo? (Es broma).",
    "Esta ruta es tan secreta que ni nosotros la conocemos.",
  ], []);
  
  useEffect(() => {
    const t = setInterval(() => setLineIndex((i) => (i + 1) % lines.length), 4000);
    return () => clearInterval(t);
  }, [lines]);

  // 2. Detector de Intención (Smart Suggest)
  const suggestions = useMemo(() => {
    const p = loc.pathname.toLowerCase();
    const map = [
      { test: /inscrip|matric|pag/, to: "/inscripcion", label: "Matrícula Online" },
      { test: /adult|2x1|nive|exam/, to: "/escuela-adultos", label: "Escuela 2x1" },
      { test: /empresa|capacita|b2b/, to: "/empresas", label: "Lael Corporate" },
      { test: /idiom|english|ingles|toefl/, to: "/idiomas", label: "Idiomas" },
      { test: /pae|preu|matemat|lengu/, to: "/paes", label: "Preu PAES" },
      { test: /se[ñn]as|lsch|sordo/, to: "/lsch", label: "Lengua de Señas" },
    ];
    return map.filter((m) => m.test.test(p));
  }, [loc.pathname]);

  const handleSearch = (e) => {
    e.preventDefault();
    // Redirige al home pasando la búsqueda (si implementas búsqueda global)
    // O simplemente redirige a los programas
    if (q.trim()) nav(`/paes`); 
  };

  const copyUrl = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="nf-page">
      <SEOHead title="404 — Extraviado | Instituto Lael" description="Página no encontrada." robots="noindex" />
      <style>{css}</style>

      {/* Luces de Fondo */}
      <div className="bg-glow top-left"></div>
      <div className="bg-glow bottom-right"></div>
      <Particles />

      <div className="nf-container">
        
        {/* Navbar Flotante */}
        <nav className="nf-nav">
            <Link to="/" className="nav-logo">
                {/* Logo Real */}
                <img src={logo} alt="Instituto Lael" className="logo-img" />
            </Link>
        </nav>

        {/* Tarjeta Principal */}
        <main className="nf-card">
            
            <div className="glitch-box">
                <h1 className="error-code">404</h1>
                <div className="error-badge">Página No Encontrada</div>
            </div>

            <div className="text-content">
                <p className="rotating-text" key={lineIndex}>{lines[lineIndex]}</p>
                <p className="sub-text">
                    La URL <code className="url-badge">{loc.pathname}</code> no existe en nuestros registros.
                </p>
            </div>

            {/* Sugerencia Inteligente */}
            {suggestions.length > 0 && (
                <div className="smart-suggestion">
                    <span className="bulb">💡</span>
                    <div>
                        <span>Parece que buscabas:</span>
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

            {/* Buscador */}
            <form className="search-box" onSubmit={handleSearch}>
                <FaSearch className="search-icon"/>
                <input 
                    type="text" 
                    placeholder="¿Qué estabas buscando?" 
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                />
            </form>

            <div className="divider"><span>Accesos Directos</span></div>

            <div className="quick-grid">
                <Link to="/" className="chip primary"><FaHome/> Inicio</Link>
                <Link to="/paes" className="chip">📚 PAES</Link>
                <Link to="/idiomas" className="chip">🌍 Idiomas</Link>
                <Link to="/inscripcion" className="chip highlight">📝 Inscripción</Link>
            </div>

            <div className="actions-footer">
                <button onClick={copyUrl} className="text-btn">
                    <FaLink/> {copied ? "Copiado" : "Copiar URL"}
                </button>
                <span className="dot">•</span>
                <a href="https://wa.me/56964626568" target="_blank" rel="noreferrer" className="text-btn">
                    <FaWhatsapp/> Reportar Error
                </a>
            </div>

        </main>
      </div>
    </div>
  );
}

/* --- PARTÍCULAS (Efecto Polvo) --- */
const Particles = () => (
    <div className="particles-container" aria-hidden="true">
        {[...Array(15)].map((_, i) => (
            <div key={i} className="particle" style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${15 + Math.random() * 10}s`
            }} />
        ))}
    </div>
);

/* --- CSS FINAL --- */
const css = `
:root {
    --bg-deep: #050505;
    --card-bg: rgba(15, 23, 42, 0.6);
    --border: rgba(255, 255, 255, 0.08);
    --primary: #6366F1;
    --accent: #F59E0B;
    --text: #F8FAFC;
    --muted: #94A3B8;
}

.nf-page {
    min-height: 100vh; background: var(--bg-deep); color: var(--text);
    font-family: 'Inter', sans-serif; overflow: hidden; position: relative;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
}

/* Luces */
.bg-glow {
    position: absolute; width: 800px; height: 800px; border-radius: 50%;
    filter: blur(150px); opacity: 0.12; pointer-events: none; z-index: 0;
}
.top-left { top: -300px; left: -200px; background: var(--primary); }
.bottom-right { bottom: -300px; right: -200px; background: var(--accent); }

.nf-container { position: relative; z-index: 10; width: 100%; max-width: 550px; padding: 20px; }

/* Navbar Simple */
.nf-nav {
    position: absolute; top: 0; left: 0; width: 100%; padding: 30px;
    display: flex; justify-content: center; z-index: 20;
}
.nav-logo {
    display: block; opacity: 0.8; transition: .2s;
}
.nav-logo:hover { opacity: 1; transform: scale(1.05); }
.logo-img { height: 40px; width: auto; display: block; }

/* Card */
.nf-card {
    background: var(--card-bg); backdrop-filter: blur(24px); border: 1px solid var(--border);
    border-radius: 24px; padding: 40px; text-align: center;
    box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.6);
    animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}
@keyframes slideUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }

/* 404 Glitchy */
.glitch-box { margin-bottom: 20px; position: relative; }
.error-code {
    font-size: 7rem; font-weight: 900; margin: 0; line-height: 0.8;
    background: linear-gradient(180deg, #fff 0%, rgba(255,255,255,0.1) 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    letter-spacing: -4px;
}
.error-badge {
    position: absolute; bottom: 5px; left: 50%; transform: translateX(-50%);
    background: #1e1b4b; color: #818cf8; border: 1px solid #6366f1;
    padding: 4px 12px; border-radius: 50px; font-size: 0.7rem; font-weight: 700; 
    text-transform: uppercase; letter-spacing: 1px;
}

.text-content { margin-bottom: 30px; min-height: 70px; }
.rotating-text { font-size: 1.1rem; color: white; font-weight: 500; margin-bottom: 5px; animation: fadeIn .5s ease; }
.sub-text { font-size: 0.85rem; color: var(--muted); }
.url-badge {
    background: rgba(255,255,255,0.05); padding: 2px 6px; border-radius: 4px;
    font-family: monospace; color: var(--accent);
}

/* Suggestion */
.smart-suggestion {
    background: rgba(99, 102, 241, 0.1); border: 1px solid rgba(99, 102, 241, 0.2);
    padding: 15px; border-radius: 12px; margin-bottom: 25px; text-align: left;
    display: flex; gap: 12px; align-items: flex-start;
}
.bulb { font-size: 1.2rem; }
.smart-suggestion span { font-size: 0.8rem; color: #c7d2fe; display: block; margin-bottom: 5px; }
.suggestion-links { display: flex; gap: 8px; flex-wrap: wrap; }
.btn-suggestion {
    text-decoration: none; background: var(--primary); color: white;
    padding: 4px 10px; border-radius: 6px; font-weight: 600; font-size: 0.8rem;
    transition: 0.2s;
}
.btn-suggestion:hover { background: #4f46e5; }

/* Search */
.search-box { position: relative; margin-bottom: 25px; }
.search-box input {
    width: 100%; background: rgba(0,0,0,0.3); border: 1px solid var(--border);
    padding: 12px 12px 12px 40px; border-radius: 12px; color: white; font-size: 0.95rem;
    transition: 0.2s; font-family: inherit;
}
.search-box input:focus { outline: none; border-color: var(--primary); background: rgba(0,0,0,0.5); }
.search-icon { position: absolute; left: 14px; top: 14px; color: var(--muted); }

/* Divider & Chips */
.divider { display: flex; align-items: center; margin: 20px 0; color: var(--border); }
.divider::before, .divider::after { content: ''; flex: 1; height: 1px; background: currentColor; }
.divider span { padding: 0 10px; font-size: 0.7rem; color: var(--muted); text-transform: uppercase; }

.quick-grid { display: flex; flex-wrap: wrap; justify-content: center; gap: 8px; margin-bottom: 30px; }
.chip {
    text-decoration: none; color: var(--muted); background: rgba(255,255,255,0.03); 
    border: 1px solid var(--border); padding: 8px 14px; border-radius: 50px; 
    font-size: 0.85rem; font-weight: 500; transition: 0.2s; display: flex; align-items: center; gap: 6px;
}
.chip:hover { background: rgba(255,255,255,0.08); color: white; transform: translateY(-2px); }
.chip.primary { background: white; color: black; border-color: white; }
.chip.highlight { border-color: var(--primary); color: #a5b4fc; }

/* Footer */
.actions-footer { display: flex; justify-content: center; align-items: center; gap: 12px; font-size: 0.8rem; }
.text-btn {
    background: none; border: none; color: var(--muted); cursor: pointer; 
    text-decoration: none; padding: 5px; transition: 0.2s; display: flex; align-items: center; gap: 5px;
}
.text-btn:hover { color: white; }
.dot { color: var(--border); }

/* Particles */
.particles-container { position: absolute; inset: 0; pointer-events: none; }
.particle {
    position: absolute; bottom: -10px; width: 4px; height: 4px; background: var(--primary);
    border-radius: 50%; opacity: 0.3; animation: rise linear infinite;
}
@keyframes rise {
    from { transform: translateY(0); opacity: 0; }
    50% { opacity: 0.5; }
    to { transform: translateY(-100vh); opacity: 0; }
}
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
`;