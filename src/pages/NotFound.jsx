import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import SEOHead from "../components/SEOHead.jsx";

/* --- LOGO COMPONENT (Para consistencia visual) --- */
const LaelLogoSmall = () => (
  <svg viewBox="0 0 40 40" className="logo-icon" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 8C10 8 4 20 4 26C4 31 8 35 13 35C18 35 22 31 22 26C22 20 16 8 16 8" stroke="url(#p_linear)" strokeWidth="3" strokeLinecap="round"/>
    <path d="M13 35V23" stroke="url(#p_linear)" strokeWidth="3" strokeLinecap="round"/>
    <path d="M13 23L19 17" stroke="url(#p_linear)" strokeWidth="3" strokeLinecap="round"/>
    <defs>
      <linearGradient id="p_linear" x1="4" y1="35" x2="22" y2="8" gradientUnits="userSpaceOnUse">
        <stop stopColor="#6366F1"/>
        <stop offset="1" stopColor="#A855F7"/>
      </linearGradient>
    </defs>
  </svg>
);

export default function NotFound() {
  const nav = useNavigate();
  const loc = useLocation();
  const inputRef = useRef(null);

  // SEO: Canonical dinámica
  const canonicalUrl = `https://www.institutolael.cl${loc.pathname}`;

  // 1. Frases Rotativas con estilo
  const lines = useMemo(() => [
    "Ups... esta página se fue a recreo y no volvió.",
    "Buscamos por todo el campus, pero no está aquí.",
    "Error 404: Motivación encontrada, URL perdida.",
    "¿Probaste reiniciando el universo? (Es broma).",
    "Esta ruta es tan secreta que ni nosotros la conocemos.",
  ], []);
  
  const [lineIndex, setLineIndex] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setLineIndex((i) => (i + 1) % lines.length), 3500);
    return () => clearInterval(t);
  }, [lines]);

  // 2. Lógica de Sugerencias Inteligentes
  const suggestions = useMemo(() => {
    const p = loc.pathname.toLowerCase();
    const map = [
      { test: /inscrip|inscri|postula/, to: "/inscripcion", label: "Inscripción" },
      { test: /adult|2x1/, to: "/escuelaadultos", label: "Escuela Adultos" },
      { test: /empresa|capacita/, to: "/empresas", label: "Capacitación Empresas" },
      { test: /idiom|english|ingles|toefl/, to: "/idiomas", label: "Cursos de Idiomas" },
      { test: /pae|preu|matemat|lengu/, to: "/paes", label: "Preuniversitario PAES" },
      { test: /se[ñn]as|lsch|sordo/, to: "/lsch", label: "Lengua de Señas (LSCh)" },
      { test: /home|libre|exame/, to: "/homeschool", label: "Homeschool" },
      { test: /pago|transf|banc/, to: "/pagos", label: "Portal de Pagos" },
    ];
    return map.filter((m) => m.test.test(p));
  }, [loc.pathname]);

  // 3. Buscador
  const [q, setQ] = useState("");
  const handleSearch = (e) => {
    e.preventDefault();
    if (!q.trim()) return;
    nav(`/?q=${encodeURIComponent(q.trim())}`);
  };

  // 4. Utilidades (Copiar URL)
  const [copied, setCopied] = useState(false);
  const copyUrl = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // 5. Atajo de teclado "H" -> Home
  useEffect(() => {
    const onKey = (e) => {
      // Solo si no está escribiendo en el input
      if (document.activeElement !== inputRef.current && e.key.toLowerCase() === "h") {
        nav("/");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [nav]);

  return (
    <div className="nf-page">
      <SEOHead
        title="404 — Extraviado | Instituto Lael"
        description="Esta página no existe, pero tu futuro sí. Encuentra tu camino en Instituto Lael."
        robots="noindex, follow"
      />
      <style>{css}</style>

      {/* Background Decorations */}
      <div className="bg-glow top-left"></div>
      <div className="bg-glow bottom-right"></div>
      <Particles />

      <div className="nf-container">
        
        {/* Navbar Minimalista */}
        <nav className="nf-nav">
            <Link to="/" className="nav-logo">
                <LaelLogoSmall />
                <span>INSTITUTO <strong>LAEL</strong></span>
            </Link>
        </nav>

        {/* Contenido Principal */}
        <main className="nf-card">
            
            <div className="error-code-wrapper">
                <h1 className="error-code">404</h1>
                <div className="error-badge">Página No Encontrada</div>
            </div>

            <div className="text-content">
                <p className="rotating-text" key={lineIndex}>{lines[lineIndex]}</p>
                <p className="sub-text">
                    La URL <code className="url-badge">{loc.pathname}</code> no existe en nuestros registros.
                </p>
            </div>

            {/* Sugerencia Inteligente (Si detecta algo parecido) */}
            {suggestions.length > 0 && (
                <div className="smart-suggestion">
                    <span>💡 ¿Buscabas esto?</span>
                    <div className="suggestion-links">
                        {suggestions.map(s => (
                            <Link key={s.to} to={s.to} className="btn-suggestion">
                                {s.label} <span className="arrow">→</span>
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            {/* Buscador Integrado */}
            <form className="search-box" onSubmit={handleSearch}>
                <input 
                    ref={inputRef}
                    type="text" 
                    placeholder="Escribe qué necesitas... (Ej: PAES, Inglés)" 
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                />
                <button type="submit" className="search-btn">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                </button>
            </form>

            <div className="divider"><span>O explora nuestras áreas</span></div>

            {/* Grid de Accesos Rápidos (Estilo Chips) */}
            <div className="quick-grid">
                <Link to="/" className="chip primary">🏠 Inicio</Link>
                <Link to="/paes" className="chip">📚 PAES</Link>
                <Link to="/idiomas" className="chip">🇺🇸 Idiomas</Link>
                <Link to="/lsch" className="chip">👐 LSCh</Link>
                <Link to="/inscripcion" className="chip highlight">📝 Inscripción</Link>
                <Link to="/pagos" className="chip">💳 Pagos</Link>
            </div>

            {/* Footer de Acciones */}
            <div className="actions-footer">
                <button onClick={copyUrl} className="text-btn">
                    {copied ? "✅ URL Copiada" : "🔗 Copiar URL"}
                </button>
                <span className="dot">•</span>
                <a href="https://wa.me/56964626568" target="_blank" rel="noreferrer" className="text-btn">
                    💬 Ayuda por WhatsApp
                </a>
            </div>

            <div className="keyboard-hint">
                Presiona la tecla <kbd>H</kbd> para volver al inicio
            </div>

        </main>
      </div>
    </div>
  );
}

/* --- PARTÍCULAS DE FONDO (CSS PURE) --- */
const Particles = () => (
    <div className="particles-container" aria-hidden="true">
        {[...Array(12)].map((_, i) => (
            <div key={i} className="particle" style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${10 + Math.random() * 10}s`
            }} />
        ))}
    </div>
);

/* --- ESTILOS MODERNOS (CSS IN JS) --- */
const css = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;800&display=swap');

:root {
    --bg-dark: #09090b;
    --card-bg: rgba(20, 20, 25, 0.6);
    --border: rgba(255, 255, 255, 0.08);
    --primary: #6366F1;
    --accent: #A855F7;
    --text: #F8FAFC;
    --muted: #94A3B8;
}

/* Layout General */
.nf-page {
    min-height: 100vh;
    background: var(--bg-dark);
    font-family: 'Plus Jakarta Sans', sans-serif;
    color: var(--text);
    overflow: hidden;
    position: relative;
    display: flex;
    flex-direction: column;
}

/* Glow Background Effects */
.bg-glow {
    position: absolute;
    width: 600px; height: 600px;
    border-radius: 50%;
    filter: blur(120px);
    opacity: 0.15;
    z-index: 0;
    pointer-events: none;
}
.top-left { top: -200px; left: -200px; background: var(--primary); }
.bottom-right { bottom: -200px; right: -200px; background: var(--accent); }

.nf-container {
    position: relative; z-index: 10;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
}

/* Navbar */
.nf-nav {
    position: absolute; top: 0; left: 0; width: 100%;
    padding: 20px 40px;
    display: flex; justify-content: flex-start;
}
.nav-logo {
    display: flex; align-items: center; gap: 10px;
    text-decoration: none; color: white; font-size: 1.1rem;
}
.logo-icon { width: 32px; height: 32px; }

/* Main Card */
.nf-card {
    background: var(--card-bg);
    backdrop-filter: blur(20px);
    border: 1px solid var(--border);
    border-radius: 24px;
    padding: 50px 40px;
    width: 100%; max-width: 600px;
    text-align: center;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
    animation: fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes fadeUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
}

/* Typography & Hero */
.error-code-wrapper { margin-bottom: 20px; position: relative; }
.error-code {
    font-size: 8rem;
    font-weight: 800;
    margin: 0;
    line-height: 0.8;
    background: linear-gradient(135deg, var(--text) 30%, rgba(255,255,255,0.2));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    letter-spacing: -5px;
}
.error-badge {
    position: absolute; bottom: 10px; left: 50%; transform: translateX(-50%);
    background: linear-gradient(90deg, var(--primary), var(--accent));
    padding: 4px 12px; border-radius: 20px;
    font-size: 0.75rem; font-weight: 800; text-transform: uppercase; letter-spacing: 1px;
    box-shadow: 0 5px 15px rgba(99, 102, 241, 0.4);
}

.text-content { margin-bottom: 30px; }
.rotating-text { font-size: 1.25rem; font-weight: 600; margin-bottom: 10px; min-height: 1.5em; animation: textFade 0.5s ease; }
@keyframes textFade { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }

.sub-text { font-size: 0.9rem; color: var(--muted); }
.url-badge {
    background: rgba(0,0,0,0.3); padding: 2px 6px; border-radius: 4px;
    font-family: monospace; color: #E2E8F0; border: 1px solid var(--border);
}

/* Smart Suggestion */
.smart-suggestion {
    background: rgba(99, 102, 241, 0.1);
    border: 1px solid rgba(99, 102, 241, 0.3);
    padding: 15px; border-radius: 12px;
    margin-bottom: 25px;
    text-align: left;
}
.smart-suggestion span { display: block; font-size: 0.8rem; font-weight: 700; color: #A5B4FC; margin-bottom: 8px; text-transform: uppercase; }
.suggestion-links { display: flex; gap: 10px; flex-wrap: wrap; }
.btn-suggestion {
    text-decoration: none; background: var(--primary); color: white;
    padding: 8px 16px; border-radius: 8px; font-weight: 600; font-size: 0.9rem;
    display: inline-flex; align-items: center; gap: 6px; transition: 0.3s;
}
.btn-suggestion:hover { transform: translateY(-2px); box-shadow: 0 5px 15px rgba(99, 102, 241, 0.4); }

/* Search Box */
.search-box {
    position: relative; margin-bottom: 30px;
    display: flex; align-items: center;
}
.search-box input {
    width: 100%;
    background: rgba(0,0,0,0.3);
    border: 1px solid var(--border);
    padding: 14px 20px;
    padding-right: 50px;
    border-radius: 12px;
    color: white; font-size: 1rem;
    transition: 0.3s;
}
.search-box input:focus { outline: none; border-color: var(--primary); background: rgba(0,0,0,0.5); }
.search-btn {
    position: absolute; right: 8px; top: 8px; bottom: 8px;
    background: var(--border); border: none; color: white;
    width: 36px; border-radius: 8px; cursor: pointer;
    display: grid; place-items: center; transition: 0.2s;
}
.search-btn:hover { background: var(--primary); }
.search-btn svg { width: 18px; height: 18px; }

/* Divider */
.divider { display: flex; align-items: center; margin: 20px 0; color: var(--border); }
.divider::before, .divider::after { content: ''; flex: 1; height: 1px; background: currentColor; }
.divider span { padding: 0 10px; font-size: 0.75rem; color: var(--muted); text-transform: uppercase; letter-spacing: 1px; }

/* Quick Grid */
.quick-grid { display: flex; flex-wrap: wrap; justify-content: center; gap: 10px; margin-bottom: 30px; }
.chip {
    text-decoration: none; color: var(--muted);
    background: rgba(255,255,255,0.03); border: 1px solid var(--border);
    padding: 8px 14px; border-radius: 20px; font-size: 0.85rem; font-weight: 600;
    transition: 0.3s;
}
.chip:hover { background: rgba(255,255,255,0.1); color: white; border-color: rgba(255,255,255,0.3); transform: translateY(-2px); }
.chip.primary { background: white; color: black; border-color: white; }
.chip.primary:hover { background: #E2E8F0; }
.chip.highlight { border-color: var(--primary); color: #A5B4FC; }

/* Footer Actions */
.actions-footer { display: flex; justify-content: center; align-items: center; gap: 10px; font-size: 0.85rem; }
.text-btn {
    background: none; border: none; color: var(--muted); cursor: pointer; text-decoration: none; padding: 5px; transition: 0.2s;
}
.text-btn:hover { color: white; }
.dot { color: var(--border); }

/* Keyboard Hint */
.keyboard-hint {
    margin-top: 30px; font-size: 0.75rem; color: var(--muted); opacity: 0.6;
}
.keyboard-hint kbd {
    background: rgba(255,255,255,0.1); padding: 2px 6px; border-radius: 4px;
    border: 1px solid var(--border); font-family: monospace; color: white;
}

/* Particles Animation */
.particles-container { position: absolute; inset: 0; overflow: hidden; pointer-events: none; }
.particle {
    position: absolute; bottom: -10px; width: 6px; height: 6px;
    background: var(--primary); border-radius: 50%;
    opacity: 0.3; filter: blur(2px);
    animation: rise linear infinite;
}
@keyframes rise {
    from { transform: translateY(0); opacity: 0; }
    50% { opacity: 0.5; }
    to { transform: translateY(-110vh); opacity: 0; }
}

@media (max-width: 600px) {
    .nf-card { padding: 30px 20px; }
    .error-code { font-size: 6rem; }
    .nf-nav { justify-content: center; padding: 20px; }
}
`;