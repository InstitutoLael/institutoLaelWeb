import { Link, NavLink, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
// Ruta de tu logo
import logo from "../assets/img/Logos/lael-inst-naranja.png";

/* ──────────────────────────────────────────────────────────────────────────
   1. ICONOS SVG (Sistema Completo)
   ────────────────────────────────────────────────────────────────────────── */
const Icons = {
  ChevronDown: () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>,
  Menu: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>,
  X: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 18 18"/></svg>,
  WhatsApp: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.22 3.08.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.69.25-1.29.17-1.41-.08-.13-.27-.2-.57-.35M12.05 21.78h-.01A9.87 9.87 0 017.01 20.4l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 01-1.51-5.26C2.16 6.49 6.6 2.05 12.05 2.05c2.64 0 5.12 1.03 6.99 2.9a9.83 9.83 0 012.89 6.99c-.01 5.45-4.44 9.84-9.88 9.84" /></svg>,
  // Iconos Programas
  Grad: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>,
  World: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>,
  Hand: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0"/><path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2"/><path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/></svg>,
  Book: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>,
  Rocket: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>,
  ArrowR: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
};

/* ──────────────────────────────────────────────────────────────────────────
   2. COMPONENTE NAVBAR
   ────────────────────────────────────────────────────────────────────────── */
export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Cerrar menú al navegar
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Lock body scroll (IMPORTANTE: Esto evita que el fondo se mueva)
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.height = "100vh"; // Fija la altura para evitar saltos
    } else {
      document.body.style.overflow = "";
      document.body.style.height = "";
    }
    return () => { 
      document.body.style.overflow = ""; 
      document.body.style.height = "";
    };
  }, [mobileOpen]);

  // Detectar scroll para efecto glass
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`lael-nav ${scrolled ? 'scrolled' : ''}`}>
      <style>{css}</style>

      <div className="container nav-content">
        
        {/* BRAND */}
        <Link to="/" className="brand-link" aria-label="Inicio">
          <img src={logo} alt="Instituto Lael" className="logo-img" />
        </Link>

        {/* DESKTOP MENU */}
        <nav className="desktop-nav">
          <NavLink to="/" className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`}>
            Inicio
          </NavLink>
          
          <div className="dropdown-wrapper">
            <button className="nav-link drop-btn">
              Programas <span className="chevron"><Icons.ChevronDown/></span>
            </button>
            <div className="mega-menu">
              <div className="mega-grid">
                <MegaItem to="/paes" title="Preu PAES" desc="Matemática, Lenguaje y Ciencias." icon={<Icons.Grad/>} color="#3B82F6" />
                <MegaItem to="/idiomas" title="Idiomas" desc="Inglés, Coreano, Portugués." icon={<Icons.World/>} color="#10B981" />
                <MegaItem to="/lsch" title="Lengua de Señas" desc="Inclusión y cultura sorda." icon={<Icons.Hand/>} color="#8B5CF6" />
                <MegaItem to="/escuela-adultos" title="Escuela Adultos" desc="Termina tu 4to medio (2x1)." icon={<Icons.Book/>} color="#F59E0B" />
                <MegaItem to="/homeschool" title="Lael Academy" desc="Tutorías y reforzamiento." icon={<Icons.Rocket/>} color="#F43F5E" />
              </div>
            </div>
          </div>

          <NavLink to="/empresas" className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`}>Empresas</NavLink>
          <NavLink to="/nosotros" className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`}>Nosotros</NavLink>
          <NavLink to="/convenios" className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`}>Convenios</NavLink>
          <NavLink to="/trabaja" className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`}>Trabaja</NavLink>
        </nav>

        {/* ACTIONS */}
        <div className="nav-actions">
          <a href="https://wa.me/56964626568" target="_blank" rel="noreferrer" className="action-btn wa" aria-label="WhatsApp">
            <Icons.WhatsApp />
          </a>
          <Link to="/inscripcion" className="action-btn primary">
            Inscripción
          </Link>
          
          <button 
            className={`burger-btn ${mobileOpen ? 'active' : ''}`} 
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menú"
          >
            {mobileOpen ? <Icons.X /> : <Icons.Menu />}
          </button>
        </div>

      </div>

      {/* MOBILE MENU (FIXED POSITIONING) */}
      <div className={`mobile-overlay ${mobileOpen ? 'open' : ''}`}>
        <div className="mobile-backdrop" onClick={() => setMobileOpen(false)}></div>
        
        <div className="mobile-panel">
          <div className="mp-header">
            <span className="mp-title">Menú</span>
            {/* El botón de cerrar ya está en el navbar, pero dejamos uno aquí por usabilidad */}
            <button className="mp-close" onClick={() => setMobileOpen(false)}><Icons.X/></button>
          </div>

          <div className="mp-body">
            <MobileLink to="/">Inicio</MobileLink>
            
            <div className="mp-divider">Programas Educativos</div>
            <MobileLink to="/paes" icon={<Icons.Grad/>} color="#3B82F6">Preu PAES</MobileLink>
            <MobileLink to="/idiomas" icon={<Icons.World/>} color="#10B981">Idiomas</MobileLink>
            <MobileLink to="/lsch" icon={<Icons.Hand/>} color="#8B5CF6">Lengua de Señas</MobileLink>
            <MobileLink to="/escuela-adultos" icon={<Icons.Book/>} color="#F59E0B">Escuela de Adultos</MobileLink>
            <MobileLink to="/homeschool" icon={<Icons.Rocket/>} color="#F43F5E">Lael Academy</MobileLink>

            <div className="mp-divider">Institucional</div>
            <MobileLink to="/empresas">Empresas</MobileLink>
            <MobileLink to="/nosotros">Nosotros</MobileLink>
            <MobileLink to="/convenios">Convenios</MobileLink>
            <MobileLink to="/trabaja">Trabaja con Nosotros</MobileLink>
          </div>

          <div className="mp-footer">
            <Link to="/inscripcion" className="mp-btn-primary">Inscribirme Ahora</Link>
            <a href="https://wa.me/56964626568" className="mp-btn-wa"><Icons.WhatsApp/> Hablar por WhatsApp</a>
          </div>
        </div>
      </div>

    </header>
  );
}

/* --- HELPERS --- */
function MegaItem({ to, title, desc, icon, color }) {
  return (
    <Link to={to} className="mega-item" style={{'--item-color': color}}>
      <div className="mi-icon">{icon}</div>
      <div className="mi-info">
        <strong>{title}</strong>
        <span>{desc}</span>
      </div>
    </Link>
  );
}

function MobileLink({ to, children, icon, color }) {
  return (
    <Link to={to} className="mob-link" style={{'--mob-color': color || '#94a3b8'}}>
      <div className="mob-content">
        {icon && <span className="mob-icon">{icon}</span>}
        {children}
      </div>
      <Icons.ArrowR />
    </Link>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   3. CSS - CORRECCIÓN MOBILE
   ────────────────────────────────────────────────────────────────────────── */
const css = `
:root {
  --nav-height: 70px;
  --glass-bg: rgba(5, 5, 5, 0.9);
  --glass-border: rgba(255, 255, 255, 0.08);
  --text: #f8fafc;
  --text-muted: #94a3b8;
  --primary: #3b82f6;
  --accent: #f59e0b;
}

/* BASE */
.lael-nav {
  position: fixed; top: 0; left: 0; width: 100%; height: var(--nav-height);
  z-index: 9999;
  transition: all 0.3s ease;
  background: transparent;
}
.lael-nav.scrolled {
  background: var(--glass-bg);
  backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--glass-border);
}

.nav-content {
  display: flex; justify-content: space-between; align-items: center; height: 100%;
}

/* LOGO */
.brand-link { display: flex; align-items: center; z-index: 10001; /* Asegura que el logo se vea sobre el menú si es necesario */ }
.logo-img { height: 32px; width: auto; transition: transform 0.2s; }
.brand-link:hover .logo-img { transform: scale(1.05); }

/* DESKTOP NAV */
.desktop-nav { display: flex; align-items: center; gap: 6px; height: 100%; }
@media (max-width: 1024px) { .desktop-nav { display: none; } }

.nav-link {
  color: var(--text-muted); text-decoration: none; font-size: 0.9rem; font-weight: 500;
  padding: 8px 16px; border-radius: 50px; transition: 0.2s; cursor: pointer; border: none; background: none;
  font-family: inherit;
}
.nav-link:hover, .nav-link.active { color: var(--text); background: rgba(255,255,255,0.05); }

/* DROPDOWN */
.dropdown-wrapper { position: relative; height: 100%; display: flex; align-items: center; }
.drop-btn { display: flex; align-items: center; gap: 6px; }
.chevron { font-size: 0.7rem; transition: transform 0.2s; opacity: 0.7; }
.dropdown-wrapper:hover .chevron { transform: rotate(180deg); }

.mega-menu {
  position: absolute; top: calc(100% + 10px); left: 50%; transform: translateX(-50%) translateY(10px);
  width: 320px; background: #0f1115; border: 1px solid var(--glass-border);
  border-radius: 16px; padding: 10px;
  opacity: 0; visibility: hidden; pointer-events: none;
  transition: 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 20px 50px rgba(0,0,0,0.5);
}
.dropdown-wrapper:hover .mega-menu { opacity: 1; visibility: visible; pointer-events: auto; transform: translateX(-50%) translateY(0); }

.mega-grid { display: flex; flex-direction: column; gap: 4px; }
.mega-item { display: flex; gap: 15px; align-items: center; padding: 12px; border-radius: 12px; text-decoration: none; transition: 0.2s; }
.mega-item:hover { background: rgba(255,255,255,0.05); }
.mi-icon { width: 36px; height: 36px; border-radius: 10px; display: flex; align-items: center; justify-content: center; background: rgba(255,255,255,0.05); color: var(--item-color); transition: 0.2s; }
.mega-item:hover .mi-icon { background: var(--item-color); color: white; }
.mi-info strong { display: block; color: var(--text); font-size: 0.95rem; margin-bottom: 2px; }
.mi-info span { display: block; color: var(--text-muted); font-size: 0.8rem; }

/* ACTIONS */
.nav-actions { display: flex; gap: 12px; align-items: center; z-index: 10001; }
.action-btn { display: flex; align-items: center; justify-content: center; font-weight: 600; text-decoration: none; transition: 0.2s; }
.action-btn.wa { width: 40px; height: 40px; border-radius: 50%; background: rgba(37, 211, 102, 0.1); color: #25D366; border: 1px solid rgba(37, 211, 102, 0.2); }
.action-btn.wa:hover { background: #25D366; color: black; transform: scale(1.05); }
.action-btn.primary { padding: 8px 20px; border-radius: 50px; font-size: 0.9rem; background: var(--accent); color: black; box-shadow: 0 4px 15px rgba(245, 158, 11, 0.2); }
.action-btn.primary:hover { background: #fbbf24; transform: translateY(-2px); }

/* BURGER */
.burger-btn { width: 40px; height: 40px; color: var(--text); background: transparent; display: none; align-items: center; justify-content: center; z-index: 10002; }
.burger-btn.active { color: white; }
@media (max-width: 1024px) { .burger-btn { display: flex; } .action-btn.primary { display: none; } }

/* --- MOBILE MENU FIXED --- */
/* CORRECCIÓN: Usamos fixed con inset: 0 para cubrir TODO el viewport siempre */
.mobile-overlay { 
  position: fixed; inset: 0; z-index: 10000; 
  visibility: hidden; height: 100dvh; width: 100vw;
}
.mobile-overlay.open { visibility: visible; }

.mobile-backdrop { position: absolute; inset: 0; background: rgba(0,0,0,0.8); opacity: 0; transition: 0.3s; }
.mobile-overlay.open .mobile-backdrop { opacity: 1; }

.mobile-panel {
  position: absolute; top: 0; right: 0; bottom: 0; height: 100dvh; width: 85%; max-width: 320px;
  background: #0b0d11; border-left: 1px solid var(--glass-border);
  transform: translateX(100%); transition: 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  display: flex; flex-direction: column; box-shadow: -10px 0 30px rgba(0,0,0,0.5);
}
.mobile-overlay.open .mobile-panel { transform: translateX(0); }

.mp-header { padding: 20px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--glass-border); margin-top: env(safe-area-inset-top); }
.mp-title { font-weight: 800; font-size: 1.2rem; color: var(--text); }
.mp-close { color: var(--text-muted); padding: 5px; }

.mp-body { flex: 1; overflow-y: auto; padding: 20px; -webkit-overflow-scrolling: touch; }
.mp-divider { font-size: 0.75rem; text-transform: uppercase; color: var(--text-muted); margin: 25px 0 10px; font-weight: 700; letter-spacing: 1px; }

.mob-link { display: flex; justify-content: space-between; align-items: center; padding: 14px 0; border-bottom: 1px solid rgba(255,255,255,0.03); text-decoration: none; color: var(--text); font-size: 1rem; }
.mob-content { display: flex; align-items: center; gap: 12px; }
.mob-icon { color: var(--mob-color); font-size: 1.1rem; display: flex; }

.mp-footer { padding: 20px; border-top: 1px solid var(--glass-border); display: flex; flex-direction: column; gap: 12px; margin-bottom: env(safe-area-inset-bottom); }
.mp-btn-primary { display: block; text-align: center; padding: 14px; background: var(--accent); color: black; font-weight: 700; border-radius: 12px; text-decoration: none; }
.mp-btn-wa { display: flex; align-items: center; justify-content: center; gap: 8px; padding: 14px; background: rgba(255,255,255,0.05); color: var(--text); border-radius: 12px; text-decoration: none; border: 1px solid var(--glass-border); font-weight: 600; }
`;