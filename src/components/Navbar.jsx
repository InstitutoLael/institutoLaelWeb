// src/components/Navbar.jsx
import { Link, NavLink, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import logo from "../assets/img/Logos/lael-inst-naranja.png";

const linkClass = ({ isActive }) => "nav-link" + (isActive ? " active" : "");

export default function Navbar({ onOpenSearch }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [progOpen, setProgOpen] = useState(false);
  const location = useLocation();
  const headerRef = useRef(null);

  // 1. Cerrar menú al cambiar de ruta
  useEffect(() => {
    setMobileOpen(false);
    setProgOpen(false);
  }, [location.pathname]);

  // 2. Bloquear scroll del body (Optimizado)
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // 3. Scroll Handler de Alto Rendimiento (requestAnimationFrame)
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (window.scrollY > 10) {
            headerRef.current?.classList.add("scrolled");
          } else {
            headerRef.current?.classList.remove("scrolled");
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="lael-nav" ref={headerRef}>
      <style>{css}</style>

      <div className="container nav-content">
        
        {/* LOGO */}
        <Link to="/" className="brand-link" aria-label="Inicio">
          <img src={logo} alt="Instituto Lael" className="logo-img" width="140" height="40" />
        </Link>

        {/* DESKTOP NAV */}
        <nav className="desktop-nav">
          <NavLink to="/" className={linkClass}>Inicio</NavLink>
          
          {/* Dropdown: Programas */}
          <div 
            className="nav-item-drop"
            onMouseEnter={() => setProgOpen(true)}
            onMouseLeave={() => setProgOpen(false)}
          >
            <button 
                className={`nav-link drop-trigger ${progOpen ? 'active' : ''}`}
                onClick={() => setProgOpen(!progOpen)}
            >
              Programas <span className="arrow">▾</span>
            </button>
            
            {/* Mega Menu Optimizado */}
            <div className={`mega-menu ${progOpen ? 'visible' : ''}`}>
                <div className="mega-grid">
                    <MegaItem to="/paes" title="Preu PAES" desc="Matemática, Lenguaje y Ciencias." icon="🎓" color="#3B82F6" />
                    <MegaItem to="/idiomas" title="Idiomas" desc="Inglés, Coreano y más." icon="🌍" color="#10B981" />
                    <MegaItem to="/lsch" title="Lengua de Señas" desc="Inclusión y cultura sorda." icon="🤟" color="#8B5CF6" />
                    <MegaItem to="/escuela-adultos" title="Nivelación Estudios" desc="Termina tu 4to medio." icon="📜" color="#F59E0B" />
                    <MegaItem to="/homeschool" title="Lael Academy" desc="Tutorías y reforzamiento." icon="🚀" color="#F43F5E" />
                </div>
            </div>
          </div>

          <NavLink to="/empresas" className={linkClass}>Empresas</NavLink>
          <NavLink to="/nosotros" className={linkClass}>Nosotros</NavLink>
          <NavLink to="/trabaja" className={linkClass}>Trabaja</NavLink>
        </nav>

        {/* RIGHT ACTIONS */}
        <div className="nav-actions">
            {/* Botón WhatsApp Desktop */}
            <a 
                href="https://wa.me/56964626568" 
                target="_blank" 
                rel="noreferrer" 
                className="btn-whatsapp-nav"
                aria-label="WhatsApp"
            >
                <WhatsAppIcon />
            </a>
            
            {/* Botón Inscripción */}
            <Link to="/inscripcion" className="btn-inscripcion-nav">
                Inscripción
            </Link>
            
            {/* Burger Button (Solo Móvil) */}
            <button 
                className={`burger-btn ${mobileOpen ? 'open' : ''}`} 
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Menú"
            >
                <span className="b-line top"></span>
                <span className="b-line mid"></span>
                <span className="b-line bot"></span>
            </button>
        </div>

      </div>

      {/* MOBILE MENU (Optimizada GPU) */}
      <div className={`mobile-menu-overlay ${mobileOpen ? 'open' : ''}`}>
        
        {/* Fondo Blur */}
        <div className="mm-backdrop" onClick={() => setMobileOpen(false)}></div>

        {/* Panel Deslizante */}
        <div className="mobile-menu-content">
            <div className="mm-header">
                <span className="mm-title">Menú</span>
                <button className="mm-close" onClick={() => setMobileOpen(false)}>✕</button>
            </div>
            
            <div className="mm-scroll-area">
                <MobileLink to="/" onClick={() => setMobileOpen(false)}>Inicio</MobileLink>
                
                <div className="mm-divider">Programas</div>
                <MobileLink to="/paes" onClick={() => setMobileOpen(false)}>Preu PAES</MobileLink>
                <MobileLink to="/idiomas" onClick={() => setMobileOpen(false)}>Idiomas</MobileLink>
                <MobileLink to="/lsch" onClick={() => setMobileOpen(false)}>Lengua de Señas</MobileLink>
                <MobileLink to="/escuela-adultos" onClick={() => setMobileOpen(false)}>Nivelación de Estudios</MobileLink>
                <MobileLink to="/homeschool" onClick={() => setMobileOpen(false)}>Lael Academy (Tutorías)</MobileLink>
                
                <div className="mm-divider">Institucional</div>
                <MobileLink to="/empresas" onClick={() => setMobileOpen(false)}>Empresas</MobileLink>
                <MobileLink to="/nosotros" onClick={() => setMobileOpen(false)}>Nosotros</MobileLink>
                <MobileLink to="/convenios" onClick={() => setMobileOpen(false)}>Convenios</MobileLink>
                <MobileLink to="/trabaja" onClick={() => setMobileOpen(false)}>Trabaja con Nosotros</MobileLink>
            </div>

            <div className="mm-footer">
                <Link to="/inscripcion" className="btn-mm-primary" onClick={() => setMobileOpen(false)}>
                    Inscribirme Ahora
                </Link>
                <a href="https://wa.me/56964626568" className="btn-mm-secondary">
                    WhatsApp
                </a>
            </div>
        </div>
      </div>

    </header>
  );
}

/* --- SUBCOMPONENTES --- */
function MegaItem({ to, title, desc, icon, color }) {
    return (
        <Link to={to} className="mega-item">
            <div className="mi-icon" style={{backgroundColor: `${color}15`, color: color}}>{icon}</div>
            <div className="mi-text">
                <strong>{title}</strong>
                <span>{desc}</span>
            </div>
        </Link>
    );
}

function MobileLink({ to, children, onClick }) {
    return (
        <Link to={to} className="mm-link" onClick={onClick}>
            {children} <span className="mm-arrow">→</span>
        </Link>
    );
}

function WhatsAppIcon() {
    return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.22 3.08.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.69.25-1.29.17-1.41-.08-.13-.27-.2-.57-.35M12.05 21.78h-.01A9.87 9.87 0 017.01 20.4l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 01-1.51-5.26C2.16 6.49 6.6 2.05 12.05 2.05c2.64 0 5.12 1.03 6.99 2.9a9.83 9.83 0 012.89 6.99c-.01 5.45-4.44 9.84-9.88 9.84" />
        </svg>
    );
}

/* ================= CSS OPTIMIZADO ================= */
const css = `
:root {
    --nav-height: 70px;
    --bg-glass: rgba(11, 18, 32, 0.85); /* Fondo oscuro semitransparente */
    --border: rgba(255, 255, 255, 0.08);
    --text: #F8FAFC;
    --text-muted: #94A3B8;
    --primary: #3B82F6;
    --accent: #F59E0B;
}

/* --- HEADER BASE --- */
.lael-nav {
    position: fixed; top: 0; left: 0; width: 100%; height: var(--nav-height);
    z-index: 9999;
    transition: background 0.3s ease, box-shadow 0.3s ease, border 0.3s ease;
    will-change: background, box-shadow; /* Optimización GPU */
    /* Gradiente sutil inicial */
    background: linear-gradient(180deg, rgba(0,0,0,0.4) 0%, transparent 100%);
}

/* Estado Scrolled: Glassmorphism Puro */
.lael-nav.scrolled {
    background: var(--bg-glass);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px); /* Safari */
    border-bottom: 1px solid var(--border);
    box-shadow: 0 4px 20px rgba(0,0,0,0.3);
}

.nav-content {
    display: flex; justify-content: space-between; align-items: center;
    height: 100%;
}

/* LOGO */
.brand-link { display: flex; align-items: center; padding: 5px 0; }
.logo-img { height: 36px; width: auto; transition: transform 0.2s; }
.brand-link:hover .logo-img { transform: scale(1.05); }

/* --- DESKTOP NAV --- */
.desktop-nav { display: flex; gap: 8px; align-items: center; height: 100%; }
@media (max-width: 960px) { .desktop-nav { display: none; } }

.nav-link {
    color: var(--text-muted); text-decoration: none; font-weight: 600; font-size: 0.95rem;
    transition: all 0.2s; padding: 8px 14px; border-radius: 8px;
}
.nav-link:hover, .nav-link.active, .drop-trigger.active { 
    color: var(--text); background: rgba(255,255,255,0.08); 
}

/* DROPDOWN FLOTANTE */
.nav-item-drop { position: relative; height: 100%; display: flex; align-items: center; }
.drop-trigger { display: flex; align-items: center; gap: 6px; border: none; background: none; font-family: inherit; cursor: pointer; }
.arrow { font-size: 0.7rem; transition: transform 0.2s; }
.drop-trigger.active .arrow { transform: rotate(180deg); }

.mega-menu {
    position: absolute; top: calc(100% + 15px); left: 50%; transform: translateX(-50%) translateY(10px);
    width: 340px; background: #151e32; border: 1px solid var(--border);
    border-radius: 16px; padding: 12px;
    opacity: 0; visibility: hidden;
    transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
    box-shadow: 0 20px 40px rgba(0,0,0,0.4);
}
.mega-menu::before { /* Triángulo */
    content:''; position: absolute; top: -6px; left: 50%; margin-left: -6px;
    width: 12px; height: 12px; background: #151e32; transform: rotate(45deg);
    border-top: 1px solid var(--border); border-left: 1px solid var(--border);
}
.mega-menu.visible { opacity: 1; visibility: visible; transform: translateX(-50%) translateY(0); }

.mega-grid { display: flex; flex-direction: column; gap: 4px; }
.mega-item {
    display: flex; gap: 14px; align-items: center; padding: 12px; border-radius: 10px;
    text-decoration: none; transition: .2s;
}
.mega-item:hover { background: rgba(255,255,255,0.05); }
.mi-icon { 
    width: 32px; height: 32px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 1.1rem; 
}
.mi-text { display: flex; flex-direction: column; }
.mi-text strong { color: var(--text); font-size: 0.95rem; margin-bottom: 2px; }
.mi-text span { color: var(--text-muted); font-size: 0.8rem; }

/* --- RIGHT ACTIONS --- */
.nav-actions { display: flex; align-items: center; gap: 12px; }

.btn-whatsapp-nav {
    width: 42px; height: 42px; border-radius: 12px; background: rgba(37, 211, 102, 0.1); 
    color: #25D366; display: flex; align-items: center; justify-content: center; 
    transition: .2s; border: 1px solid rgba(37, 211, 102, 0.2);
}
.btn-whatsapp-nav:hover { background: rgba(37, 211, 102, 0.2); transform: scale(1.05); }

.btn-inscripcion-nav {
    background: var(--accent); color: #000; padding: 10px 24px; border-radius: 50px;
    font-weight: 700; text-decoration: none; font-size: 0.9rem; transition: .2s;
    box-shadow: 0 4px 15px rgba(245, 158, 11, 0.25);
}
.btn-inscripcion-nav:hover { background: #d97706; transform: translateY(-1px); }
@media (max-width: 600px) { .btn-inscripcion-nav { display: none; } } 

/* --- BURGER ANIMADO --- */
.burger-btn {
    width: 44px; height: 44px; background: transparent; border: none;
    display: none; flex-direction: column; align-items: center; justify-content: center; gap: 6px;
    cursor: pointer; z-index: 5000; /* Sobre el menú */
}
@media (max-width: 960px) { .burger-btn { display: flex; } }

.b-line { width: 24px; height: 2px; background: var(--text); border-radius: 4px; transition: 0.3s cubic-bezier(0.68, -0.6, 0.32, 1.6); }
/* Animación hamburguesa a X */
.burger-btn.open .top { transform: rotate(45deg) translate(5px, 6px); }
.burger-btn.open .mid { opacity: 0; }
.burger-btn.open .bot { transform: rotate(-45deg) translate(5px, -6px); }

/* --- MOBILE MENU PANEL (Optimizado) --- */
.mobile-menu-overlay {
    position: fixed; inset: 0; z-index: 4500; visibility: hidden;
}
.mobile-menu-overlay.open { visibility: visible; }

.mm-backdrop {
    position: absolute; inset: 0; background: rgba(0,0,0,0.6); opacity: 0; transition: opacity 0.3s;
}
.mobile-menu-overlay.open .mm-backdrop { opacity: 1; }

.mobile-menu-content {
    position: absolute; top: 0; right: 0; bottom: 0; width: 85%; max-width: 320px;
    background: #0F172A; border-left: 1px solid var(--border);
    transform: translateX(100%); transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    display: flex; flex-direction: column;
    will-change: transform;
}
.mobile-menu-overlay.open .mobile-menu-content { transform: translateX(0); }

.mm-header {
    display: flex; justify-content: space-between; align-items: center;
    padding: 20px; border-bottom: 1px solid var(--border);
    margin-top: env(safe-area-inset-top); /* Notch support */
}
.mm-title { font-size: 1.2rem; font-weight: 800; color: var(--text); }
.mm-close { font-size: 1.5rem; color: var(--text-muted); background: none; border: none; padding: 5px; }

.mm-scroll-area { flex: 1; overflow-y: auto; padding: 20px; display: flex; flex-direction: column; gap: 8px; }

.mm-divider { 
    margin-top: 20px; margin-bottom: 10px; font-size: 0.75rem; text-transform: uppercase; 
    color: var(--primary); font-weight: 700; letter-spacing: 1px; 
}

.mm-link {
    display: flex; justify-content: space-between; align-items: center;
    padding: 14px; border-radius: 12px; background: rgba(255,255,255,0.03);
    color: var(--text); text-decoration: none; font-weight: 600; font-size: 1rem;
}
.mm-link:active { background: rgba(255,255,255,0.1); transform: scale(0.98); }
.mm-arrow { color: var(--text-muted); font-size: 1.2rem; }

.mm-footer { 
    padding: 20px; border-top: 1px solid var(--border); display: flex; flex-direction: column; gap: 12px; 
    margin-bottom: env(safe-area-inset-bottom);
}
.btn-mm-primary {
    background: var(--accent); color: #000; padding: 14px; border-radius: 12px;
    text-align: center; font-weight: 800; text-decoration: none; font-size: 1rem;
}
.btn-mm-secondary {
    background: transparent; color: var(--text); border: 1px solid var(--border);
    padding: 14px; border-radius: 12px; text-align: center; font-weight: 600; text-decoration: none;
}
`;