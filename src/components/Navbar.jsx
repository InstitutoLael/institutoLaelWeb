import { Link, NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext"; 
import logo from "../assets/img/Logos/lael-inst-blanco.png"; 

/* ─── 1. ICONOS SVG (Optimizados) ─── */
const Icons = {
  ChevronDown: () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>,
  Menu: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>,
  X: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 18 18"/></svg>,
  WhatsApp: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.22 3.08.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.69.25-1.29.17-1.41-.08-.13-.27-.2-.57-.35M12.05 21.78h-.01A9.87 9.87 0 017.01 20.4l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 01-1.51-5.26C2.16 6.49 6.6 2.05 12.05 2.05c2.64 0 5.12 1.03 6.99 2.9a9.83 9.83 0 012.89 6.99c-.01 5.45-4.44 9.84-9.88 9.84" /></svg>,
  User: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  Bag: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>,
  // Iconos Programas
  Grad: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>,
  World: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>,
  Hand: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0"/><path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2"/><path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/></svg>,
  Book: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>,
  Rocket: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>,
  ArrowR: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
};

/* ─── 2. COMPONENTE NAVBAR ─── */
export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  
  // CONEXIÓN AL CARRITO REAL (Traemos toggleCart para abrir el panel)
  const { cart, toggleCart } = useCart(); 
  const cartCount = cart ? cart.length : 0;

  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  useEffect(() => {
    if (mobileOpen) { document.body.style.overflow = "hidden"; } 
    else { document.body.style.overflow = ""; }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // DETECTAR SCROLL PARA EFECTO GLASS
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`lael-nav ${scrolled ? 'scrolled' : ''}`}>
      <style>{css}</style>

      <div className="container nav-content">
        
        {/* LOGO */}
        <Link to="/" className="brand-link" aria-label="Inicio Instituto Lael">
          <img src={logo} alt="Instituto Lael" className="logo-img" />
        </Link>

        {/* MENÚ ESCRITORIO */}
        <nav className="desktop-nav">
          <NavLink to="/" className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`}>Inicio</NavLink>
          
          {/* MEGA MENÚ */}
          <div className="dropdown-wrapper">
            <button className={`nav-link drop-btn ${['/paes','/idiomas','/lsch','/escuela-adultos','/homeschool'].includes(location.pathname) ? 'active' : ''}`}>
              Programas <span className="chevron"><Icons.ChevronDown/></span>
            </button>
            <div className="mega-menu">
              <div className="mega-grid">
                <MegaItem to="/paes" title="Preu PAES" desc="Matemática, Lenguaje y Ciencias." icon={<Icons.Grad/>} color="#3B82F6" />
                <MegaItem to="/idiomas" title="Idiomas" desc="Inglés, Coreano, Portugués." icon={<Icons.World/>} color="#10B981" />
                <MegaItem to="/lsch" title="Lengua de Señas" desc="Inclusión y cultura sorda." icon={<Icons.Hand/>} color="#8B5CF6" />
                <MegaItem to="/escuela-adultos" title="Escuela Adultos" desc="Termina tu 4to medio (2x1)." icon={<Icons.Book/>} color="#F59E0B" />
                <MegaItem to="/homeschool" title="Lael Academy" desc="Tutorías y exámenes libres." icon={<Icons.Rocket/>} color="#F43F5E" />
              </div>
            </div>
          </div>

          <NavLink to="/empresas" className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`}>Empresas</NavLink>
          <NavLink to="/nosotros" className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`}>Nosotros</NavLink>
        </nav>

        {/* ACCIONES */}
        <div className="nav-actions">
          
          {/* Carrito de Compras (Ahora abre el Drawer) */}
          <button 
            onClick={toggleCart} 
            className="action-btn icon-only" 
            aria-label="Carrito de compras"
            title="Ver mi mochila"
          >
            <Icons.Bag />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>

          {/* Login / Aula Virtual */}
          <Link to="/aula" className="action-btn icon-only mobile-hide-btn" aria-label="Aula Virtual" title="Ingresar al Aula">
            <Icons.User />
          </Link>

          {/* WhatsApp */}
          <a href="https://wa.me/56964626568" target="_blank" rel="noreferrer" className="action-btn wa mobile-hide-btn" aria-label="Hablar por WhatsApp">
            <Icons.WhatsApp />
          </a>

          {/* Botón Principal CTA (Abre el proceso de matrícula) */}
          <Link to="/inscripcion" className="action-btn primary mobile-hide-btn">
            Inscripción
          </Link>
          
          {/* BOTÓN MÓVIL (HAMBURGUESA) */}
          <button 
            className="burger-btn"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
          >
            <div className={`icon-transition ${mobileOpen ? 'rotate' : ''}`}>
                {mobileOpen ? <Icons.X /> : <Icons.Menu />}
            </div>
          </button>
        </div>
      </div>

      {/* MENÚ MÓVIL (PANEL DESLIZANTE) */}
      <div className={`mobile-overlay ${mobileOpen ? 'open' : ''}`}>
        <div className="mobile-backdrop" onClick={() => setMobileOpen(false)}></div>
        
        <div className="mobile-panel">
          <div className="mp-body">
            
            <Link to="/aula" className="mob-user-card" onClick={() => setMobileOpen(false)}>
                <div className="muc-icon"><Icons.User /></div>
                <div className="muc-info">
                    <strong>Aula Virtual</strong>
                    <span>Acceso Alumnos</span>
                </div>
                <Icons.ArrowR />
            </Link>

            <span className="mp-label mt-4">Navegación</span>
            <MobileLink to="/">Inicio</MobileLink>
            
            <span className="mp-label mt-4">Nuestros Programas</span>
            <MobileLink to="/paes" icon={<Icons.Grad/>} color="#3B82F6">Preu PAES</MobileLink>
            <MobileLink to="/idiomas" icon={<Icons.World/>} color="#10B981">Idiomas</MobileLink>
            <MobileLink to="/lsch" icon={<Icons.Hand/>} color="#8B5CF6">Lengua de Señas</MobileLink>
            <MobileLink to="/escuela-adultos" icon={<Icons.Book/>} color="#F59E0B">Escuela de Adultos</MobileLink>
            <MobileLink to="/homeschool" icon={<Icons.Rocket/>} color="#F43F5E">Lael Academy</MobileLink>

            <span className="mp-label mt-4">Institucional</span>
            <MobileLink to="/empresas">Empresas</MobileLink>
            <MobileLink to="/nosotros">Nosotros</MobileLink>
          </div>

          <div className="mp-footer">
            <Link to="/inscripcion" className="mp-btn-primary" onClick={() => setMobileOpen(false)}>
                🚀 Matricúlate Aquí
            </Link>
            <div className="mp-socials">
                <a href="https://wa.me/56964626568" className="mp-soc-link"><Icons.WhatsApp /> ¿Dudas? Hablemos</a>
            </div>
          </div>
        </div>
      </div>

    </header>
  );
}

/* ─── HELPERS ─── */
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
    <NavLink to={to} className={({isActive}) => `mob-link ${isActive ? 'active' : ''}`} style={{'--mob-color': color || '#94a3b8'}} onClick={() => document.body.style.overflow = ""}>
      <div className="mob-content">
        {icon && <span className="mob-icon">{icon}</span>}
        {children}
      </div>
      <Icons.ArrowR />
    </NavLink>
  );
}

/* ─── CSS ESTILIZADO ─── */
const css = `
:root {
  --nav-height: 80px;
  --text: #f8fafc;
  --text-muted: #cbd5e1;
  --primary: #6366F1;
  --accent: #f59e0b;
}

/* NAVBAR BASE (SOLUCIÓN TRANSPARENCIA) */
.lael-nav {
  position: fixed; top: 0; left: 0; width: 100%; height: var(--nav-height);
  z-index: 1000; /* Aseguramos que esté por encima de banners pero debajo de modales */
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  
  /* DEGRADADO SUTIL SUPERIOR: Esto hace que el texto blanco SIEMPRE se lea, 
     incluso sobre fondos blancos, sin bloquear la imagen. */
  background: linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 100%);
}

/* ESTADO SCROLLED (EFECTO GLASS FUERTE) */
.lael-nav.scrolled {
  background: rgba(5, 5, 5, 0.9); /* Más oscuro para mejor contraste */
  backdrop-filter: blur(20px);      /* Blur intenso */
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.5);
  height: 70px;
}

.container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
.nav-content {
  display: flex; justify-content: space-between; align-items: center; height: 100%;
  position: relative;
}

/* LOGO */
.brand-link { display: flex; align-items: center; z-index: 1002; }
.logo-img { height: 40px; width: auto; transition: transform 0.2s; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3)); }
.brand-link:hover .logo-img { transform: scale(1.05); }

/* DESKTOP NAV */
.desktop-nav { display: flex; align-items: center; gap: 4px; height: 100%; }
@media (max-width: 1024px) { .desktop-nav { display: none; } }

.nav-link {
  color: var(--text-muted); text-decoration: none; font-size: 0.9rem; font-weight: 500;
  padding: 8px 14px; border-radius: 8px; transition: all 0.2s; cursor: pointer; border: none; background: none;
  font-family: inherit; display: flex; align-items: center; gap: 6px;
  text-shadow: 0 1px 2px rgba(0,0,0,0.5); /* Sombra de texto para legibilidad extra */
}
.nav-link:hover { color: var(--text); background: rgba(255,255,255,0.1); }
.nav-link.active { color: var(--primary); background: rgba(99, 102, 241, 0.15); font-weight: 700; text-shadow: none; }

/* MEGA MENU */
.dropdown-wrapper { position: relative; height: 100%; display: flex; align-items: center; }
.chevron { font-size: 0.7rem; transition: transform 0.3s; opacity: 0.8; display: flex; margin-top: 2px; }
.dropdown-wrapper:hover .chevron { transform: rotate(180deg); }

.mega-menu {
  position: absolute; top: 80%; left: 50%; transform: translateX(-50%) translateY(20px);
  width: 340px; 
  background: #0f1115;
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 16px; padding: 8px;
  opacity: 0; visibility: hidden; pointer-events: none;
  transition: all 0.2s ease;
  box-shadow: 0 20px 50px rgba(0,0,0,0.6);
}
.dropdown-wrapper:hover .mega-menu { opacity: 1; visibility: visible; pointer-events: auto; transform: translateX(-50%) translateY(0); }

.mega-grid { display: flex; flex-direction: column; gap: 2px; }
.mega-item { display: flex; gap: 14px; align-items: center; padding: 12px; border-radius: 10px; text-decoration: none; transition: 0.2s; }
.mega-item:hover { background: rgba(255,255,255,0.05); }
.mi-icon { width: 38px; height: 38px; border-radius: 10px; display: flex; align-items: center; justify-content: center; background: rgba(255,255,255,0.03); color: var(--item-color); border: 1px solid rgba(255,255,255,0.1); }
.mega-item:hover .mi-icon { background: var(--item-color); color: white; border-color: transparent; }
.mi-info strong { display: block; color: var(--text); font-size: 0.95rem; }
.mi-info span { display: block; color: #94a3b8; font-size: 0.8rem; }

/* ACCIONES */
.nav-actions { display: flex; gap: 10px; align-items: center; z-index: 1002; }
.action-btn { display: flex; align-items: center; justify-content: center; font-weight: 600; text-decoration: none; transition: 0.2s; cursor: pointer; border: none; background: transparent; color: var(--text); }

.action-btn.icon-only { width: 40px; height: 40px; border-radius: 50%; border: 1px solid rgba(255,255,255,0.15); position: relative; background: rgba(0,0,0,0.2); }
.action-btn.icon-only:hover { background: rgba(255,255,255,0.2); color: white; border-color: rgba(255,255,255,0.5); }

.action-btn.wa { color: #25D366; border-color: rgba(37, 211, 102, 0.4); background: rgba(37, 211, 102, 0.1); }
.action-btn.wa:hover { background: #25D366; color: black; border-color: #25D366; transform: scale(1.05); }

.action-btn.primary { padding: 10px 24px; border-radius: 50px; font-size: 0.9rem; background: var(--text); color: black; border: 1px solid white; margin-left: 4px; box-shadow: 0 4px 10px rgba(0,0,0,0.3); }
.action-btn.primary:hover { background: var(--accent); border-color: var(--accent); transform: translateY(-1px); }

.cart-badge { 
    position: absolute; top: -2px; right: -2px; 
    background: #ef4444; color: white; 
    font-size: 0.7rem; font-weight: 800; 
    width: 18px; height: 18px; 
    display: flex; align-items: center; justify-content: center; 
    border-radius: 50%; border: 2px solid #000;
}

.burger-btn { width: 40px; height: 40px; color: var(--text); background: rgba(0,0,0,0.3); display: none; align-items: center; justify-content: center; border: 1px solid rgba(255,255,255,0.2); border-radius: 8px; cursor: pointer; backdrop-filter: blur(4px); }
.burger-btn:active { transform: scale(0.95); }

@media (max-width: 1024px) { 
    .burger-btn { display: flex; } 
    .mobile-hide-btn { display: none; }
}

/* MOBILE PANEL */
.mobile-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100vh; z-index: 999; visibility: hidden; }
.mobile-overlay.open { visibility: visible; }
.mobile-backdrop { position: absolute; inset: 0; background: rgba(0,0,0,0.7); backdrop-filter: blur(5px); opacity: 0; transition: 0.3s; }
.mobile-overlay.open .mobile-backdrop { opacity: 1; }

.mobile-panel {
  position: absolute; top: 0; right: 0; bottom: 0; 
  width: 100%; max-width: 300px;
  background: #09090b; 
  border-left: 1px solid rgba(255,255,255,0.1);
  transform: translateX(100%); transition: 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  display: flex; flex-direction: column; 
  box-shadow: -10px 0 40px rgba(0,0,0,0.8);
  padding-top: 90px;
}
.mobile-overlay.open .mobile-panel { transform: translateX(0); }

.mp-body { flex: 1; overflow-y: auto; padding: 20px; }
.mob-user-card { display: flex; align-items: center; gap: 12px; background: rgba(255,255,255,0.05); padding: 12px; border-radius: 12px; text-decoration: none; color: white; border: 1px solid rgba(255,255,255,0.1); margin-bottom: 20px; }
.muc-icon { width: 36px; height: 36px; background: var(--primary); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; }
.muc-info strong { display: block; font-size: 0.9rem; }
.muc-info span { font-size: 0.75rem; color: #94a3b8; }

.mp-label { display: block; font-size: 0.7rem; text-transform: uppercase; color: #64748b; margin-bottom: 10px; font-weight: 700; letter-spacing: 1px; }
.mp-label.mt-4 { margin-top: 25px; }

.mob-link { display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.03); text-decoration: none; color: #e2e8f0; font-size: 0.95rem; }
.mob-link.active { color: var(--primary); padding-left: 10px; border-left: 2px solid var(--primary); }
.mob-content { display: flex; align-items: center; gap: 12px; }
.mob-icon { color: var(--mob-color); font-size: 1.1rem; display: flex; }

.mp-footer { padding: 20px; border-top: 1px solid rgba(255,255,255,0.1); background: rgba(0,0,0,0.3); }
.mp-btn-primary { display: block; text-align: center; padding: 14px; background: #fbbf24; color: black; font-weight: 800; border-radius: 10px; text-decoration: none; font-size: 1rem; margin-bottom: 15px; }
.mp-socials { text-align: center; }
.mp-soc-link { display: inline-flex; align-items: center; gap: 6px; color: #94a3b8; text-decoration: none; font-size: 0.85rem; }
`;