// src/components/Navbar.jsx
import { Link, NavLink, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
// Asegúrate de que la ruta de tu logo sea correcta
import logo from "../assets/img/Logos/lael-inst-naranja.png";

const linkClass = ({ isActive }) => "nav-link" + (isActive ? " active" : "");

export default function Navbar({ onOpenSearch }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [progOpen, setProgOpen] = useState(false);
  const location = useLocation();
  const headerRef = useRef(null);

  // Cerrar menú al cambiar de ruta
  useEffect(() => {
    setMobileOpen(false);
    setProgOpen(false);
  }, [location.pathname]);

  // Bloquear scroll del body cuando el menú móvil está abierto
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // Efecto de sombra al hacer scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        headerRef.current?.classList.add("scrolled");
      } else {
        headerRef.current?.classList.remove("scrolled");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="lael-nav" ref={headerRef}>
      <style>{css}</style>

      <div className="container nav-content">
        
        {/* LOGO */}
        <Link to="/" className="brand-link" aria-label="Volver al inicio">
          <img src={logo} alt="Instituto Lael" className="logo-img" />
        </Link>

        {/* DESKTOP NAV */}
        <nav className="desktop-nav">
          <NavLink to="/" className={linkClass}>Inicio</NavLink>
          
          {/* Dropdown Programas */}
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
            
            <div className={`mega-menu ${progOpen ? 'visible' : ''}`}>
                <div className="mega-grid">
                    <MegaItem to="/paes" title="Preu PAES" desc="Matemática, Lenguaje, Ciencias." icon="🎓" color="#3B82F6" />
                    <MegaItem to="/idiomas" title="Idiomas" desc="Inglés, Coreano, Portugués." icon="🌍" color="#10B981" />
                    <MegaItem to="/lsch" title="Lengua de Señas" desc="Inclusión y cultura sorda." icon="🤟" color="#8B5CF6" />
                    <MegaItem to="/escuelaadultos" title="Nivelación Estudios" desc="Termina tu 4to medio." icon="📜" color="#F59E0B" />
                </div>
            </div>
          </div>

          <NavLink to="/empresas" className={linkClass}>Empresas</NavLink>
          <NavLink to="/nosotros" className={linkClass}>Nosotros</NavLink>
          <NavLink to="/trabaja" className={linkClass}>Trabaja</NavLink>
        </nav>

        {/* RIGHT ACTIONS */}
        <div className="nav-actions">
            <a 
                href="https://wa.me/56964626568" 
                target="_blank" 
                rel="noreferrer" 
                className="btn-whatsapp-nav"
                aria-label="Hablar por WhatsApp"
            >
                <WhatsAppIcon />
            </a>
            <Link to="/inscripcion" className="btn-inscripcion-nav">
                Inscripción
            </Link>
            
            {/* Burger Button */}
            <button 
                className={`burger-btn ${mobileOpen ? 'open' : ''}`} 
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Abrir menú"
            >
                <span></span>
                <span></span>
                <span></span>
            </button>
        </div>

      </div>

      {/* MOBILE MENU OVERLAY */}
      <div className={`mobile-menu-overlay ${mobileOpen ? 'open' : ''}`}>
        <div className="mobile-menu-content">
            <div className="mm-header">
                <span className="mm-title">Menú</span>
                <button className="mm-close" onClick={() => setMobileOpen(false)}>✕</button>
            </div>
            
            <div className="mm-links">
                <MobileLink to="/" onClick={() => setMobileOpen(false)}>Inicio</MobileLink>
                <div className="mm-divider">Programas</div>
                <MobileLink to="/paes" onClick={() => setMobileOpen(false)}>Preu PAES</MobileLink>
                <MobileLink to="/idiomas" onClick={() => setMobileOpen(false)}>Idiomas</MobileLink>
                <MobileLink to="/lsch" onClick={() => setMobileOpen(false)}>Lengua de Señas</MobileLink>
                <MobileLink to="/escuelaadultos" onClick={() => setMobileOpen(false)}>Nivelación de Estudios</MobileLink>
                
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
                    Hablar por WhatsApp
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
            <div className="mi-icon" style={{backgroundColor: `${color}20`, color: color}}>{icon}</div>
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
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"/>
            <path d="M12.046 2a9.95 9.95 0 0 0-8.6 14.971L2 22l5.18-1.374A9.95 9.95 0 1 0 12.046 2zM7.2 18.4l-.311.09-3.023.802.807-2.947.093-.317A8.05 8.05 0 1 1 7.2 18.4z"/>
        </svg>
    );
}

/* ================= CSS (GLASS & RESPONSIVE) ================= */
const css = `
:root {
    --nav-height: 70px;
    --bg-glass: rgba(15, 23, 42, 0.85);
    --border: rgba(255, 255, 255, 0.1);
    --text: #F8FAFC;
    --text-muted: #94A3B8;
    --primary: #3B82F6;
    --accent: #F59E0B;
}

/* HEADER BASE */
.lael-nav {
    position: fixed; top: 0; left: 0; width: 100%; height: var(--nav-height);
    z-index: 999; transition: background 0.3s, box-shadow 0.3s;
    background: transparent;
}
.lael-nav.scrolled {
    background: var(--bg-glass);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--border);
    box-shadow: 0 4px 20px rgba(0,0,0,0.2);
}

.nav-content {
    display: flex; justify-content: space-between; align-items: center;
    height: 100%;
}

/* BRAND */
.brand-link { display: flex; align-items: center; }
.logo-img { height: 32px; width: auto; transition: .2s; }
.brand-link:hover .logo-img { filter: brightness(1.1); }

/* DESKTOP NAV */
.desktop-nav { display: flex; gap: 24px; align-items: center; height: 100%; }
@media (max-width: 900px) { .desktop-nav { display: none; } }

.nav-link {
    color: var(--text-muted); text-decoration: none; font-weight: 600; font-size: 0.95rem;
    transition: .2s; padding: 8px 12px; border-radius: 8px;
}
.nav-link:hover, .nav-link.active { color: var(--text); background: rgba(255,255,255,0.05); }

/* DROPDOWN */
.nav-item-drop { position: relative; height: 100%; display: flex; align-items: center; }
.drop-trigger { display: flex; align-items: center; gap: 6px; border: none; background: none; font-family: inherit; cursor: pointer; }
.arrow { font-size: 0.7rem; transition: transform 0.2s; }
.drop-trigger.active .arrow { transform: rotate(180deg); }

.mega-menu {
    position: absolute; top: calc(100% + 10px); left: -50px; 
    width: 320px; background: #1e293b; border: 1px solid var(--border);
    border-radius: 16px; padding: 10px; opacity: 0; visibility: hidden;
    transform: translateY(10px); transition: .2s ease;
    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
}
.mega-menu.visible { opacity: 1; visibility: visible; transform: translateY(0); }

.mega-grid { display: flex; flex-direction: column; gap: 5px; }
.mega-item {
    display: flex; gap: 12px; align-items: center; padding: 12px; border-radius: 10px;
    text-decoration: none; transition: .2s;
}
.mega-item:hover { background: rgba(255,255,255,0.05); }
.mi-icon { 
    width: 36px; height: 36px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; 
}
.mi-text strong { display: block; color: var(--text); font-size: 0.9rem; margin-bottom: 2px; }
.mi-text span { display: block; color: var(--text-muted); font-size: 0.75rem; }

/* NAV ACTIONS */
.nav-actions { display: flex; align-items: center; gap: 12px; }

.btn-whatsapp-nav {
    width: 40px; height: 40px; border-radius: 10px; background: #25D366; color: #000;
    display: flex; align-items: center; justify-content: center; transition: .2s;
}
.btn-whatsapp-nav:hover { transform: translateY(-2px); }

.btn-inscripcion-nav {
    background: var(--accent); color: #000; padding: 10px 20px; border-radius: 50px;
    font-weight: 700; text-decoration: none; font-size: 0.9rem; transition: .2s;
    box-shadow: 0 0 15px rgba(245, 158, 11, 0.2);
}
.btn-inscripcion-nav:hover { background: #d97706; }
@media (max-width: 600px) { .btn-inscripcion-nav { display: none; } } /* Ocultar botón texto en móvil muy chico */

/* BURGER BTN */
.burger-btn {
    width: 40px; height: 40px; background: transparent; border: 1px solid var(--border);
    border-radius: 10px; display: none; flex-direction: column; align-items: center; justify-content: center; gap: 5px;
    cursor: pointer;
}
@media (max-width: 900px) { .burger-btn { display: flex; } }

.burger-btn span { width: 20px; height: 2px; background: var(--text); transition: .3s; }
.burger-btn.open span:nth-child(1) { transform: rotate(45deg) translate(5px, 5px); }
.burger-btn.open span:nth-child(2) { opacity: 0; }
.burger-btn.open span:nth-child(3) { transform: rotate(-45deg) translate(5px, -5px); }

/* MOBILE MENU FULLSCREEN */
.mobile-menu-overlay {
    position: fixed; inset: 0; background: #0f172a; z-index: 3000;
    transform: translateX(100%); transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    display: flex; flex-direction: column;
}
.mobile-menu-overlay.open { transform: translateX(0); }

.mobile-menu-content {
    flex: 1; display: flex; flex-direction: column; padding: 20px; overflow-y: auto;
}

.mm-header {
    display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px;
    border-bottom: 1px solid var(--border); padding-bottom: 20px;
}
.mm-title { font-size: 1.5rem; font-weight: 800; color: var(--text); }
.mm-close { font-size: 1.5rem; color: var(--text-muted); background: none; border: none; padding: 10px; }

.mm-links { display: flex; flex-direction: column; gap: 5px; }
.mm-divider { 
    margin-top: 20px; margin-bottom: 10px; font-size: 0.75rem; text-transform: uppercase; 
    color: var(--primary); font-weight: 700; letter-spacing: 1px; 
}

.mm-link {
    display: flex; justify-content: space-between; align-items: center;
    padding: 15px; border-radius: 12px; background: rgba(255,255,255,0.03);
    color: var(--text); text-decoration: none; font-weight: 600; font-size: 1.1rem;
}
.mm-link:active { background: rgba(255,255,255,0.1); }
.mm-arrow { color: var(--text-muted); }

.mm-footer { margin-top: auto; padding-top: 30px; display: flex; flex-direction: column; gap: 15px; }
.btn-mm-primary {
    background: var(--accent); color: #000; padding: 16px; border-radius: 12px;
    text-align: center; font-weight: 800; text-decoration: none; font-size: 1.1rem;
}
.btn-mm-secondary {
    background: transparent; color: var(--text); border: 1px solid var(--border);
    padding: 16px; border-radius: 12px; text-align: center; font-weight: 600; text-decoration: none;
}
`;