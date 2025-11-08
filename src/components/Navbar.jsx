// src/components/Navbar.jsx
import { Link, NavLink, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import logo from "../assets/img/Logos/lael-inst-naranja.png";

const link = ({ isActive }) => "nav-link" + (isActive ? " active" : "");

export default function Navbar({ onOpenSearch }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [progOpen, setProgOpen] = useState(false);
  const [kbdOpen, setKbdOpen] = useState(false);
  const isTouch = useRef(false);
  const closeTimer = useRef(null);
  const dropRef = useRef(null);
  const firstItemRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const firstTouch = () => { isTouch.current = true; };
    window.addEventListener("touchstart", firstTouch, { once: true, passive: true });
    return () => window.removeEventListener("touchstart", firstTouch);
  }, []);

  useEffect(() => {
    const cls = "no-scroll";
    document.documentElement.classList.toggle(cls, mobileOpen);
    document.body.classList.toggle(cls, mobileOpen);
    return () => {
      document.documentElement.classList.remove(cls);
      document.body.classList.remove(cls);
    };
  }, [mobileOpen]);

  useEffect(() => {
    setMobileOpen(false);
    setProgOpen(false);
  }, [location.pathname]);

  const openDrop = () => {
    if (isTouch.current) return;
    clearTimeout(closeTimer.current);
    setProgOpen(true);
  };
  const closeDrop = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setProgOpen(false), 120);
  };

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setProgOpen(false);
        setMobileOpen(false);
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onOpenSearch?.();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onOpenSearch]);

  useEffect(() => {
    if (!progOpen) return;
    const onDocDown = (e) => {
      if (!dropRef.current?.contains(e.target)) setProgOpen(false);
    };
    document.addEventListener("mousedown", onDocDown);
    return () => document.removeEventListener("mousedown", onDocDown);
  }, [progOpen]);

  useEffect(() => {
    if (progOpen && kbdOpen) {
      firstItemRef.current?.focus();
      setKbdOpen(false);
    }
  }, [progOpen, kbdOpen]);

  const closeMobile = () => {
    setMobileOpen(false);
    setProgOpen(false);
  };

  const onDropKeyDown = (e) => {
    const items = Array.from(dropRef.current?.querySelectorAll('[role="menuitem"]') || []);
    const i = items.indexOf(document.activeElement);
    if (e.key === "ArrowDown") { e.preventDefault(); items[Math.min(i + 1, items.length - 1)]?.focus(); }
    else if (e.key === "ArrowUp") { e.preventDefault(); items[Math.max(i - 1, 0)]?.focus(); }
    else if (e.key === "Home") { e.preventDefault(); items[0]?.focus(); }
    else if (e.key === "End") { e.preventDefault(); items[items.length - 1]?.focus(); }
    else if (e.key === "Escape") { e.preventDefault(); setProgOpen(false); }
  };

  return (
    <header className="lael-nav">
      <style>{css}</style>

      <div className="container nav-row">
        <Link to="/" className="brand" aria-label="Inicio Instituto Lael">
          <img src={logo} alt="Instituto Lael" className="brand-logo" />
        </Link>

        {/* NAV DESKTOP */}
        <nav className="navwrap" aria-label="Navegación principal">
          <ul className="nav">
            <li><NavLink to="/" end className={link}>Inicio</NavLink></li>
            <li className={"has-drop " + (progOpen ? "open" : "")}
                onMouseEnter={openDrop} onMouseLeave={closeDrop}>
              <button
                type="button" className="nav-link drop-btn"
                onClick={() => setProgOpen((v) => !v)}
                aria-expanded={progOpen}
                aria-haspopup="true"
                aria-controls="prog-menu"
                onFocus={openDrop}>
                Programas ▾
              </button>

              <div id="prog-menu" className="dropdown" role="menu" ref={dropRef} onKeyDown={onDropKeyDown}>
                <div className="drop-head">
                  <div className="drop-title">Programas</div>
                  <p className="drop-sub">Elige tu ruta. Todo con acompañamiento.</p>
                </div>
                <div className="drop-grid">
                  <DropItem refEl={firstItemRef} to="/paes" title="PAES" kicker="Ingreso a la U" badge="Top elección">
                    Matemáticas, Lenguaje, Ciencias e Historia con tutoría y ensayos.
                  </DropItem>
                  <DropItem to="/idiomas" title="Idiomas" kicker="EN · KR" accent="green">
                    Clases en vivo + cápsulas. Conversación y objetivos laborales.
                  </DropItem>
                  <DropItem to="/lsch" title="LSCh" kicker="Lengua de Señas" accent="rose">
                    4 módulos + taller final. Inclusión real y práctica.
                  </DropItem>
                  <DropItem to="/homeschool" title="Homeschool" kicker="Apoyo escolar" accent="amber">
                    Planes flexibles, seguimiento y material por niveles.
                  </DropItem>
                </div>
              </div>
            </li>
            <li><NavLink to="/empresas" className={link}>Empresas</NavLink></li>
            <li><NavLink to="/nosotros" className={link}>Nosotros</NavLink></li>
            <li><NavLink to="/escuelaadultos" className={link}>Escuela Adultos</NavLink></li>
            <li><NavLink to="/convenios" className={link}>Convenios</NavLink></li>
            <li><NavLink to="/trabaja" className={link}>Trabaja</NavLink></li>
            <li><NavLink to="/inscripcion" className="nav-cta">Inscripción</NavLink></li>
          </ul>
        </nav>

        <div className="tools">
          <button className="tool-btn" onClick={onOpenSearch} aria-label="Buscar (Ctrl/⌘+K)">
            <SearchIcon />
          </button>
          <button className={"burger " + (mobileOpen ? "on" : "")}
                  onClick={() => setMobileOpen((v) => !v)}
                  aria-label="Abrir menú móvil"
                  aria-expanded={mobileOpen}
                  aria-controls="mobile-panel">
            <span /><span /><span />
          </button>
        </div>
      </div>

      {/* Overlay móvil */}
      <div className={"mp-overlay " + (mobileOpen ? "show" : "")} onClick={closeMobile} aria-hidden={!mobileOpen} />

      {/* Panel móvil */}
      <aside id="mobile-panel"
             className={"mobile-panel " + (mobileOpen ? "open" : "")}
             aria-hidden={!mobileOpen}
             aria-label="Menú móvil"
             role="dialog"
             aria-modal="true">
        <div className="mp-head" style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}>
          <div className="mp-title">Menú</div>
          <button className="mp-close" onClick={closeMobile} aria-label="Cerrar">✕</button>
        </div>

        <div className="mp-section">
          <Link to="/" className="mp-link" onClick={closeMobile}>Inicio</Link>
          <Link to="/nosotros" className="mp-link" onClick={closeMobile}>Nosotros</Link>
          <Link to="/empresas" className="mp-link" onClick={closeMobile}>Empresas</Link>
        </div>

        <div className="mp-section">
          <div className="mp-kicker">Programas</div>
          <Link to="/paes" className="mp-link" onClick={closeMobile}>PAES</Link>
          <Link to="/idiomas" className="mp-link" onClick={closeMobile}>Idiomas</Link>
          <Link to="/lsch" className="mp-link" onClick={closeMobile}>LSCh</Link>
          <Link to="/homeschool" className="mp-link" onClick={closeMobile}>Homeschool</Link>
        </div>

        <div className="mp-section">
          <div className="mp-kicker">Oportunidades</div>
          <Link to="/escuelaadultos" className="mp-link" onClick={closeMobile}>Escuela Adultos</Link>
          <Link to="/convenios" className="mp-link" onClick={closeMobile}>Convenios</Link>
          <Link to="/trabaja" className="mp-link" onClick={closeMobile}>Trabaja con nosotros</Link>
        </div>

        <div className="mp-actions" style={{ paddingBottom: "env(safe-area-inset-bottom, 12px)" }}>
          <Link to="/inscripcion" className="mp-cta" onClick={closeMobile}>Inscripción</Link>
          <a className="mp-wa"
             href="https://wa.me/56964626568?text=Hola%20%F0%9F%91%8B%20quisiera%20informaci%C3%B3n%20sobre%20los%20programas%20LAEL"
             target="_blank"
             rel="noreferrer">WhatsApp</a>
        </div>
      </aside>
    </header>
  );
}

function DropItem({ to, title, kicker, children, badge, accent = "indigo", refEl }) {
  const accentClass =
    accent === "green" ? "acc-green" :
    accent === "rose" ? "acc-rose" :
    accent === "amber" ? "acc-amber" : "acc-indigo";
  return (
    <Link to={to} className={"drop-item " + accentClass} role="menuitem" ref={refEl}>
      <div className="di-head">
        <span className="kicker">{kicker}</span>
        {badge && <span className="mini-badge">{badge}</span>}
      </div>
      <div className="title">{title}</div>
      <div className="desc">{children}</div>
      <span className="go">Ver más →</span>
    </Link>
  );
}

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M21 21l-4.2-4.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

const css = `
:root{
  --nav-bg: rgba(11,18,32,.78);
  --nav-bd: #1f2a44;
  --link: #eaf2ff;
  --link-act: #ffffff;
  --cta: #fde047; --cta-text:#111827;
  --drop-bg:#0e1424; --drop-bd:#1f2a44;
  --indigo:#5850EC; --green:#16a34a; --rose:#e11d48; --amber:#f59e0b;
  --wa:#25D366;
}

html.no-scroll, body.no-scroll { overflow: hidden; }

/* Overlay móvil */
.mp-overlay{
  position:fixed; inset:0;
  background:rgba(0,0,0,.72);
  opacity:0; transition:opacity .25s ease;
  pointer-events:none;
  z-index:9000;
}
.mp-overlay.show{ opacity:1; pointer-events:auto; }

/* Panel móvil */
.mobile-panel{
  position:fixed; inset:0;
  width:100vw;
  background:#0b1220;
  transform:translateX(100%);
  transition:transform .25s ease-out;
  display:flex; flex-direction:column;
  z-index:9500;
  pointer-events:none;
  overflow-y:auto;
  -webkit-overflow-scrolling:touch;
}
.mobile-panel.open{ transform:translateX(0); pointer-events:auto; }
`;