// src/components/Navbar.jsx
import { Link, NavLink } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import logo from "../assets/img/Logos/lael-inst-naranja.png";

const link = ({ isActive }) => "nav-link" + (isActive ? " active" : "");

export default function Navbar({ onOpenSearch }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [progOpen, setProgOpen] = useState(false);
  const closeTimer = useRef(null);
  const dropRef = useRef(null);

  // Lock scroll en móvil + cleanup
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = mobileOpen ? "hidden" : prev || "";
    return () => { document.body.style.overflow = prev || ""; };
  }, [mobileOpen]);

  // Dropdown hover con delay suave
  const openDrop = () => {
    clearTimeout(closeTimer.current);
    setProgOpen(true);
  };
  const closeDrop = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setProgOpen(false), 120);
  };

  // Cerrar con ESC
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setProgOpen(false);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const closeMobile = () => {
    setMobileOpen(false);
    setProgOpen(false);
  };

  // Cierra dropdown si se abre el panel móvil
  useEffect(() => {
    if (mobileOpen) setProgOpen(false);
  }, [mobileOpen]);

  return (
    <header className="lael-nav">
      <style>{css}</style>

      <div className="container nav-row">
        {/* Logo */}
        <Link
          to="/"
          className="brand"
          onClick={() => setProgOpen(false)}
          aria-label="Inicio Instituto Lael"
        >
          {/* altura controlada (no crece) */}
          <img src={logo} alt="Instituto Lael" className="brand-logo" />
        </Link>

        {/* NAV DESKTOP */}
        <nav className="navwrap" aria-label="Navegación principal">
          <ul className="nav">
            <li><NavLink to="/" className={link}>Inicio</NavLink></li>

            <li
              className={"has-drop " + (progOpen ? "open" : "")}
              onMouseEnter={openDrop}
              onMouseLeave={closeDrop}
            >
              <button
                type="button"
                className="nav-link drop-btn"
                onClick={() => setProgOpen((v) => !v)}
                aria-expanded={progOpen}
                aria-haspopup="true"
                aria-controls="prog-menu"
                onFocus={openDrop}
              >
                Programas ▾
              </button>

              <div
                id="prog-menu"
                className="dropdown"
                onMouseEnter={openDrop}
                onMouseLeave={closeDrop}
                role="menu"
                ref={dropRef}
              >
                <div className="drop-head">
                  <div className="drop-title">Programas</div>
                  <p className="drop-sub">Elige tu ruta. Todo con acompañamiento.</p>
                </div>

                <div className="drop-grid">
                  <DropItem to="/paes" title="PAES" kicker="Ingreso a la U" badge="Top elección">
                    Matemáticas M1/M2, Lenguaje, Ciencias e Historia. Ensayos + tutoría.
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

            {/* Accesos directos */}
            <li><NavLink to="/becas" className={link}>Becas</NavLink></li>
            <li><NavLink to="/convenios" className={link}>Convenios</NavLink></li>
            <li><NavLink to="/trabaja" className={link}>Trabaja</NavLink></li>

            {/* CTA */}
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
      >
        <div className="mp-head">
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
          <Link to="/becas" className="mp-link" onClick={closeMobile}>Becas</Link>
          <Link to="/convenios" className="mp-link" onClick={closeMobile}>Convenios</Link>
          <Link to="/trabaja" className="mp-link" onClick={closeMobile}>Trabaja con nosotros</Link>
        </div>

        <div className="mp-actions">
          <Link to="/inscripcion" className="mp-cta" onClick={closeMobile}>Inscripción</Link>
          <a className="mp-ghost" href="https://wa.me/56964626568" target="_blank" rel="noreferrer">
            WhatsApp
          </a>
        </div>
      </aside>
    </header>
  );
}

function DropItem({ to, title, kicker, children, badge, accent = "indigo" }) {
  const accentClass =
    accent === "green" ? "acc-green" :
    accent === "rose"  ? "acc-rose"  :
    accent === "amber" ? "acc-amber" : "acc-indigo";

  return (
    <Link to={to} className={"drop-item " + accentClass} role="menuitem">
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
      <path d="M21 21l-4.2-4.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2"/>
    </svg>
  );
}

const css = `
:root{
  --nav-bg: rgba(11,18,32,.75);
  --nav-bd: #1f2a44;
  --link: #eaf2ff;
  --link-act: #ffffff;
  --cta: #f59e0b;
  --cta-text: #0b1220;

  --drop-bg: #0e1424;
  --drop-bd: #1f2a44;

  --indigo: #5850EC;
  --green: #16a34a;
  --rose: #e11d48;
  --amber: #f59e0b;
}

/* Barra */
.lael-nav{
  position: sticky; top: 0; z-index: 2000;
  backdrop-filter: saturate(120%) blur(10px);
  background:
    radial-gradient(900px 240px at 10% -20%, rgba(88,80,236,.10), transparent 60%),
    radial-gradient(900px 240px at 90% -20%, rgba(22,163,74,.08), transparent 60%),
    var(--nav-bg);
  border-bottom: 1px solid var(--nav-bd);
}
.nav-row{ display:flex; align-items:center; gap:16px; min-height:66px; position:relative; }

/* Logo */
.brand{ display:inline-flex; align-items:center; gap:10px; padding:8px 0; }
.brand-logo{ height:36px; width:auto; display:block; }        /* ← tamaño controlado */
@media (min-width: 768px){ .brand-logo{ height:40px; } }      /* ← en desktop un poco más */

/* Nav desktop */
.navwrap{ margin-left:auto; }
.nav{
  display:flex; align-items:center; gap:8px; margin:0; padding:0; list-style:none; /* ← sin bullets */
}
.nav-link, .nav-cta, .drop-btn{
  appearance:none; border:0; background:transparent; cursor:pointer;
  color:var(--link); text-decoration:none; font-weight:900;
  padding:.55rem .75rem; border-radius:10px; line-height:1;
  white-space:nowrap;
}
.nav-link:hover, .drop-btn:hover{ color:var(--link-act); background:#0f172a; }
.nav-link.active{
  color:#fff; background:linear-gradient(180deg,#101a2f,#0f172a); border:1px solid #233154;
}
.nav-cta{
  color:var(--cta-text); background: linear-gradient(180deg,#fbbf24,#f59e0b);
  border:1px solid #d97706; box-shadow:0 10px 22px rgba(245,158,11,.18);
}
.nav-cta:hover{ filter: brightness(1.05); }

/* Tools */
.tools{ display:flex; align-items:center; gap:8px; margin-left:8px; }
.tool-btn{
  display:inline-grid; place-items:center; width:38px; height:38px; border-radius:10px;
  background:#0f172a; border:1px solid #233154; color:#fff; font-size:16px;
  transition: transform .15s ease, box-shadow .15s ease;
}
.tool-btn:hover{ transform: translateY(-1px); box-shadow:0 12px 24px rgba(2,6,23,.28); }

/* Burger */
.burger{
  margin-left:6px; width:42px; height:38px; border-radius:10px; border:1px solid #233154;
  background:#0f172a; display:none; align-items:center; justify-content:center; gap:4px;
}
.burger span{ width:18px; height:2px; background:#cfe0ff; display:block; border-radius:2px; transition: transform .18s ease; }
.burger.on span:nth-child(2){ transform: scaleX(.7); }

/* Dropdown Programas */
.lael-nav { z-index: 2000; }
.dropdown { z-index: 2100; }
.mp-overlay { z-index: 2200; }
.mobile-panel { z-index: 2300; }

.mobile-panel {
  background: linear-gradient(180deg, #0b1220, #0e1424 90%);
  box-shadow: -6px 0 20px rgba(0,0,0,.45);
}
.has-drop{ position:relative; }
.drop-btn{ display:inline-flex; align-items:center; gap:6px; }
.dropdown{
  position:absolute; left:0; top: calc(100% + 10px);
  width: min(92vw, 920px); min-width: 560px;
  background: var(--drop-bg); border:1px solid var(--drop-bd); border-radius:14px;
  box-shadow: 0 26px 60px rgba(2,6,23,.38); z-index: 2200;
  opacity:0; transform: translateY(6px); pointer-events:none; transition: all .16s ease;
  padding:12px;
  max-height: calc(100dvh - 120px);
  overflow: hidden;
}
.has-drop.open .dropdown{ opacity:1; transform: translateY(0); pointer-events:auto; }

.drop-head{ padding:6px 6px 10px; border-bottom:1px dashed #22304d; margin-bottom:10px; }
.drop-title{ font-weight:1000; color:#fff; }
.drop-sub{ margin:4px 0 0; color:#cfe0ff; font-size:.9rem; }

.drop-grid{ display:grid; gap:10px; grid-template-columns: repeat(2, minmax(0,1fr)); overflow:auto; padding-right:4px; }
.drop-item{
  display:block; padding:12px; border-radius:12px; text-decoration:none;
  color:#ffffff; border:1px solid #22304d; background: linear-gradient(180deg,#0f172a,#0b1220);
  transition: transform .12s ease, box-shadow .12s ease, border-color .12s ease;
  word-break: break-word;
}
.drop-item:hover{ transform: translateY(-2px); box-shadow:0 18px 36px rgba(2,6,23,.35); border-color:#2f3b60; }
.drop-item .di-head{ display:flex; align-items:center; gap:8px; }
.drop-item .kicker{ font-size:.82rem; color:#cfe0ff; font-weight:900; letter-spacing:.2px; }
.drop-item .mini-badge{ font-size:.7rem; padding:.15rem .45rem; border-radius:999px; font-weight:900; background:#f59e0b; color:#0b1220; }
.drop-item .title{ margin:.2rem 0 .12rem; font-weight:1000; letter-spacing:.2px; }
.drop-item .desc{ color:#ffffff; font-size:.95rem; line-height:1.35; }
.drop-item .go{ display:inline-block; margin-top:6px; color:#cfe0ff; font-weight:800; }

.acc-indigo{ outline:1px solid rgba(88,80,236,.35); }
.acc-green { outline:1px solid rgba(22,163,74,.35); }
.acc-rose  { outline:1px solid rgba(225,29,72,.35); }
.acc-amber { outline:1px solid rgba(245,158,11,.35); }

/* Responsive del dropdown (evita solaparse) */
@media (max-width: 1200px){
  .dropdown{ width: min(94vw, 820px); min-width: 0; }
}
@media (max-width: 900px){
  .dropdown{ width: 92vw; min-width: 0; }
  .drop-grid{ grid-template-columns: 1fr; }
}

/* Móvil */
@media (max-width: 1000px){
  .navwrap{ display:none; }
  .burger{ display:flex; }
}

/* Overlay móvil */
.mp-overlay{
  position:fixed; inset:0; z-index:2190; background:rgba(2,6,23,.45);
  opacity:0; pointer-events:none; transition: opacity .18s ease;
}
.mp-overlay.show{ opacity:1; pointer-events:auto; }

/* Panel móvil */
.mobile-panel{
  position: fixed; inset: 0 0 0 auto; width: 86vw; max-width: 420px; z-index: 2200;
  background: linear-gradient(180deg,#0f172a,#0b1220);
  border-left:1px solid #1f2a44; transform: translateX(100%); transition: transform .18s ease;
  display:flex; flex-direction:column;
}
.mobile-panel.open{ transform: translateX(0); }

.mp-head{ display:flex; align-items:center; justify-content:space-between; gap:10px; padding:12px 14px; border-bottom:1px solid #1f2a44; }
.mp-title{ font-weight:1000; color:#ffffff; }
.mp-close{
  width:36px; height:36px; border-radius:10px; background:#101a2f; border:1px solid #233154; color:#fff; font-size:18px;
}

.mp-section{ padding:12px 14px; border-bottom:1px dashed #1f2a44; }
.mp-kicker{ color:#a5b4fc; font-weight:900; letter-spacing:.2px; margin-bottom:6px; }
.mp-link{ display:block; padding:10px 10px; border-radius:10px; color:#ffffff; text-decoration:none; }
.mp-link:hover{ background:#101a2f; }

.mp-actions{ padding:12px 14px; display:flex; flex-direction:column; gap:10px; }
.mp-cta{
  text-decoration:none; text-align:center; font-weight:1000; padding:.75rem 1rem; border-radius:12px;
  color:#0b1220; background:linear-gradient(180deg,#fbbf24,#f59e0b); border:1px solid #d97706;
}
.mp-ghost{
  text-align:center; text-decoration:none; font-weight:900; padding:.7rem 1rem; border-radius:12px;
  color:#ffffff; border:1px solid #233154; background:transparent;
}

/* Foco accesible */
.drop-btn:focus-visible, .nav-link:focus-visible, .nav-cta:focus-visible,
.tool-btn:focus-visible, .burger:focus-visible,
.mp-close:focus-visible, .mp-link:focus-visible,
.mp-cta:focus-visible, .mp-ghost:focus-visible {
  outline: 2px solid #22d3ee; outline-offset: 2px;
}
`;