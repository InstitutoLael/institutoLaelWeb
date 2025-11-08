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

  // Detecta primer toque para desactivar hover en táctiles
  useEffect(() => {
    const firstTouch = () => { isTouch.current = true; };
    window.addEventListener("touchstart", firstTouch, { once: true, passive: true });
    return () => window.removeEventListener("touchstart", firstTouch);
  }, []);

  // Bloquea scroll cuando el panel móvil está abierto
  useEffect(() => {
    const cls = "no-scroll";
    document.documentElement.classList.toggle(cls, mobileOpen);
    document.body.classList.toggle(cls, mobileOpen);
    return () => {
      document.documentElement.classList.remove(cls);
      document.body.classList.remove(cls);
    };
  }, [mobileOpen]);

  // Cierra todo al cambiar de ruta
  useEffect(() => {
    setMobileOpen(false);
    setProgOpen(false);
  }, [location.pathname]);

  // Hover del dropdown (solo desktop)
  const openDrop = () => {
    if (isTouch.current) return;
    clearTimeout(closeTimer.current);
    setProgOpen(true);
  };
  const closeDrop = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setProgOpen(false), 120);
  };

  // ESC y Ctrl/⌘+K
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

  // Clic afuera del dropdown
  useEffect(() => {
    if (!progOpen) return;
    const onDocDown = (e) => {
      if (!dropRef.current?.contains(e.target)) setProgOpen(false);
    };
    document.addEventListener("mousedown", onDocDown);
    return () => document.removeEventListener("mousedown", onDocDown);
  }, [progOpen]);

  // Accesibilidad: foco al primer ítem del dropdown
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

  // Navegación con flechas dentro del dropdown
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
        {/* Logo */}
        <Link to="/" className="brand" aria-label="Inicio Instituto Lael">
          <img src={logo} alt="Instituto Lael" className="brand-logo" />
        </Link>

        {/* NAV DESKTOP */}
        <nav className="navwrap" aria-label="Navegación principal">
          <ul className="nav">
            <li><NavLink to="/" end className={link}>Inicio</NavLink></li>

            <li
              className={"has-drop " + (progOpen ? "open" : "")}
              onMouseEnter={openDrop}
              onMouseLeave={closeDrop}
            >
              <button
                type="button"
                className="nav-link drop-btn"
                onClick={() => setProgOpen((v) => !v)}
                onKeyDown={(e) => e.key === "ArrowDown" && (setProgOpen(true), setKbdOpen(true))}
                aria-expanded={progOpen}
                aria-haspopup="true"
                aria-controls="prog-menu"
                onFocus={openDrop}
              >
                Programas ▾
              </button>

              {/* Dropdown solo se muestra en >=1000px */}
              <div
                id="prog-menu"
                className="dropdown"
                role="menu"
                ref={dropRef}
                onKeyDown={onDropKeyDown}
              >
                <div className="drop-head">
                  <div className="drop-title">Programas</div>
                  <p className="drop-sub">Elige tu ruta. Todo con acompañamiento.</p>
                </div>

                <div className="drop-grid">
                  <DropItem
                    refEl={firstItemRef}
                    to="/paes"
                    title="PAES"
                    kicker="Ingreso a la U"
                    badge="Top elección"
                  >
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

        {/* TOOLS */}
        <div className="tools">
          <button
            className="tool-btn"
            onClick={onOpenSearch}
            aria-label="Abrir búsqueda (Ctrl/⌘+K)"
            title="Buscar (Ctrl/⌘+K)"
          >
            <SearchIcon />
          </button>
          <button
            className={"burger " + (mobileOpen ? "on" : "")}
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Abrir menú móvil"
            aria-expanded={mobileOpen}
            aria-controls="mobile-panel"
          >
            <span /><span /><span />
          </button>
        </div>
      </div>

      {/* Overlay móvil */}
      <div
        className={"mp-overlay " + (mobileOpen ? "show" : "")}
        onClick={closeMobile}
        aria-hidden={!mobileOpen}
      />

      {/* Panel móvil */}
      <aside
        id="mobile-panel"
        className={"mobile-panel " + (mobileOpen ? "open" : "")}
        aria-hidden={!mobileOpen}
        aria-label="Menú móvil"
        role="dialog"
        aria-modal="true"
      >
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
          <a
            className="mp-wa"
            href="https://wa.me/56964626568?text=Hola%20%F0%9F%91%8B%20quisiera%20informaci%C3%B3n%20sobre%20los%20programas%20LAEL"
            target="_blank"
            rel="noreferrer"
          >
            WhatsApp
          </a>
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

/* no scroll cuando panel móvil abierto */
html.no-scroll, body.no-scroll { overflow: hidden; }

/* Barra */
.lael-nav{
  position: sticky; top: 0; z-index: 4000;
  backdrop-filter: saturate(120%) blur(10px);
  background:
    radial-gradient(900px 240px at 10% -20%, rgba(88,80,236,.10), transparent 60%),
    radial-gradient(900px 240px at 90% -20%, rgba(22,163,74,.08), transparent 60%),
    var(--nav-bg);
  border-bottom: 1px solid var(--nav-bd);
}
.nav-row{ display:flex; align-items:center; gap:16px; min-height:66px; position:relative; }

/* Logo */
.brand-logo{ height:36px; width:auto; display:block; }
@media (min-width: 768px){ .brand-logo{ height:40px; } }

/* Nav desktop */
.navwrap{ margin-left:auto; }
.nav{ display:flex; align-items:center; gap:8px; list-style:none; margin:0; padding:0; }
.nav-link, .nav-cta, .drop-btn{
  background:transparent; border:0; cursor:pointer;
  color:var(--link); font-weight:900;
  padding:.55rem .75rem; border-radius:10px; transition:background .15s ease, transform .15s ease;
}
.nav-link:hover, .drop-btn:hover{ color:var(--link-act); background:#0f172a; }
.nav-link.active{
  color:#fff; background:linear-gradient(180deg,#101a2f,#0f172a); border:1px solid #233154;
}
.nav-cta{
  color:var(--cta-text);
  background:linear-gradient(180deg,#fde047,#facc15);
  border:1px solid #eab308;
  box-shadow:0 10px 22px rgba(250,204,21,.25);
}
.nav-cta:hover{ filter:brightness(1.05); }

/* Tools */
.tools{ display:flex; align-items:center; gap:8px; margin-left:8px; }
.tool-btn{
  width:38px; height:38px; border-radius:10px; background:#0f172a;
  border:1px solid #233154; color:#fff;
}
.tool-btn:hover{ transform:translateY(-1px); }

/* --- Hamburguesa --- */
.burger{
  display:none;
  width:42px; height:42px;
  border-radius:12px;
  background:#141b2e; border:1px solid #233154;
  place-items:center;
}
.burger span{
  width:22px; height:3px; background:#fff; display:block; border-radius:2px;
  transition:all .25s ease;
}
.burger.on span:nth-child(1){ transform: rotate(45deg) translate(5px, 5px); }
.burger.on span:nth-child(2){ opacity:0; }
.burger.on span:nth-child(3){ transform: rotate(-45deg) translate(5px, -5px); }

/* Dropdown escritorio */
.has-drop{ position:relative; }
.dropdown{
  position:absolute; left:0; top:calc(100% + 10px);
  width:min(92vw,900px);
  background:var(--drop-bg); border:1px solid var(--drop-bd); border-radius:14px;
  box-shadow:0 26px 60px rgba(2,6,23,.38);
  opacity:0; transform:translateY(6px); pointer-events:none; transition:.16s;
  padding:12px; z-index:4500;
}
.has-drop.open .dropdown{ opacity:1; transform:translateY(0); pointer-events:auto; }
.drop-head{ padding:8px 10px 12px; }
.drop-title{ color:#fff; font-weight:900; font-size:1.05rem; }
.drop-sub{ color:#a3b2d8; margin:2px 0 0; font-size:.9rem; }
.drop-grid{ display:grid; gap:10px; grid-template-columns:repeat(2,minmax(0,1fr)); }
.drop-item{
  display:block; padding:12px; border-radius:12px;
  background:linear-gradient(180deg,#0f172a,#0b1220);
  color:#fff; border:1px solid #22304d; transition:transform .12s, box-shadow .12s;
}
.drop-item:hover{ transform:translateY(-2px); box-shadow:0 18px 36px rgba(2,6,23,.35); }
.di-head{ display:flex; align-items:center; gap:8px; color:#a5b4fc; font-weight:800; font-size:.78rem; }
.mini-badge{ background:#1f2937; color:#fde047; border:1px solid #eab308; padding:.14rem .35rem; border-radius:999px; font-size:.68rem; }
.drop-item .title{ font-weight:900; font-size:1.05rem; margin-top:4px; }
.drop-item .desc{ color:#c9d4f6; margin-top:4px; font-size:.92rem; line-height:1.35; }
.drop-item .go{ display:inline-block; margin-top:6px; color:#c7d2fe; font-weight:800; }

.acc-indigo{ border-color:#31386b; }
.acc-green{ border-color:#1f7a3a; }
.acc-rose{ border-color:#781a2a; }
.acc-amber{ border-color:#7a560e; }

/* ***** MÓVIL ***** */
@media(max-width:1000px){
  .navwrap{ display:none; }
  .burger{ display:grid; }
  .dropdown{ display:none !important; }
}

/* Overlay móvil oscuro para separar del contenido */
.mp-overlay{
  position:fixed; inset:0; background:rgba(0,0,0,.7);
  opacity:0; transition:.18s; pointer-events:none; z-index:4900;
}
.mp-overlay.show{ opacity:1; pointer-events:auto; }

/* Panel móvil con fondo sólido (no se mezcla con el hero) */
.mobile-panel{
  position:fixed; top:0; right:0; bottom:0; left:0;   /* ocupa todo */
  width:100vw;
  background:#0b1220; /* sólido */
  box-shadow:0 0 0 1px #22304d inset;
  transform:translateX(100%);
  transition:transform .22s ease-out;
  display:flex; flex-direction:column;
  z-index:5000; overscroll-behavior:contain; -webkit-overflow-scrolling:touch;
  pointer-events:none;
}
.mobile-panel.open{
  transform:translateX(0);
  pointer-events:auto;
  padding-bottom: env(safe-area-inset-bottom, 0px);
}

.mp-head{ display:flex; align-items:center; justify-content:space-between; padding:12px 14px; border-bottom:1px solid #22304d; }
.mp-title{ color:#fff; font-weight:900; }
.mp-close{
  appearance:none; background:#0f172a; color:#fff; border:1px solid #233154;
  border-radius:10px; padding:.45rem .6rem; font-weight:900;
}

.mp-section{ padding:10px 14px; border-bottom:1px solid #14203a; }
.mp-kicker{ font-size:.8rem; color:#a5b4fc; font-weight:900; margin-bottom:6px; }
.mp-link{ display:block; color:#eaf2ff; padding:.5rem 0; font-weight:700; text-decoration:none; }
.mp-link:active{ opacity:.85; }

.mp-actions{ padding:14px; display:grid; gap:10px; margin-top:auto; }
.mp-cta{
  display:inline-block; text-align:center; font-weight:900;
  padding:.8rem 1rem; border-radius:12px;
  color:#111827; background:linear-gradient(180deg,#fde047,#facc15); border:1px solid #eab308;
}
.mp-wa{
  display:inline-block; text-align:center; font-weight:900;
  padding:.8rem 1rem; border-radius:12px;
  color:#0a3d21; background:var(--wa); border:1px solid #128C7E; text-decoration:none;
}

/* misc */
.container{ width:min(1100px, 100%); margin-inline:auto; padding-inline:14px; }
.brand{ display:flex; align-items:center; gap:10px; text-decoration:none; }
`;