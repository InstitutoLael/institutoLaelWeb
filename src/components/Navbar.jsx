import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, ChevronDown, Search } from "lucide-react";
import logo from "../assets/img/Logos/lael-inst-naranja.png";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [progOpen, setProgOpen] = useState(false);

  // cerrar con Esc
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        setProgOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const closeAll = () => {
    setMobileOpen(false);
    setProgOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-slate-900/80 border-b border-slate-800 text-slate-100">
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-4 h-16">
        {/* Logo */}
        <Link to="/" onClick={closeAll} className="flex items-center gap-2">
          <img src={logo} alt="Instituto Lael" className="h-8" />
        </Link>

        {/* Links desktop */}
        <ul className="hidden md:flex items-center gap-6 text-sm font-semibold">
          <li><NavLink to="/" className={navLink}>Inicio</NavLink></li>

          <li className="relative group">
            <button
              onClick={() => setProgOpen((v) => !v)}
              className="inline-flex items-center gap-1 font-semibold hover:text-white"
            >
              Programas <ChevronDown size={16} />
            </button>
            {progOpen && (
              <div
                onMouseLeave={() => setProgOpen(false)}
                className="absolute left-0 mt-3 w-72 rounded-xl border border-slate-700 bg-slate-800/90 shadow-2xl backdrop-blur-md p-4"
              >
                <DropLink to="/paes" title="PAES" desc="Ingreso a la U" />
                <DropLink to="/idiomas" title="Idiomas" desc="Inglés · Coreano" />
                <DropLink to="/lsch" title="Lengua de Señas" desc="3 niveles + taller final" />
                <DropLink to="/homeschool" title="Homeschool" desc="Apoyo escolar flexible" />
              </div>
            )}
          </li>

          <li><NavLink to="/empresas" className={navLink}>Empresas</NavLink></li>
          <li><NavLink to="/nosotros" className={navLink}>Nosotros</NavLink></li>
          <li><NavLink to="/becas" className={navLink}>Becas</NavLink></li>
          <li><NavLink to="/convenios" className={navLink}>Convenios</NavLink></li>

          <li>
            <Link
              to="/inscripcion"
              className="ml-2 bg-amber-400 text-slate-900 px-3 py-2 rounded-lg font-bold hover:bg-amber-500 transition"
            >
              Inscripción
            </Link>
          </li>
        </ul>

        {/* Tools */}
        <div className="flex items-center gap-3">
          <button
            className="hidden md:inline-flex items-center justify-center w-9 h-9 rounded-lg bg-slate-800 hover:bg-slate-700 transition"
            aria-label="Buscar"
            title="Buscar"
          >
            <Search size={18} />
          </button>

          {/* Burger */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg bg-slate-800 hover:bg-slate-700 transition"
            aria-label="Abrir menú"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Panel móvil */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/90 backdrop-blur-sm p-6 flex flex-col text-lg"
          role="dialog"
          aria-label="Menú móvil"
        >
          <div className="flex items-center justify-between mb-6">
            <span className="font-semibold text-slate-100">Menú</span>
            <button onClick={closeAll} className="text-slate-300 hover:text-white">
              <X size={26} />
            </button>
          </div>

          <MobileLink to="/" onClick={closeAll}>Inicio</MobileLink>
          <MobileGroup title="Programas">
            <MobileLink to="/paes" onClick={closeAll}>PAES</MobileLink>
            <MobileLink to="/idiomas" onClick={closeAll}>Idiomas</MobileLink>
            <MobileLink to="/lsch" onClick={closeAll}>LSCh</MobileLink>
            <MobileLink to="/homeschool" onClick={closeAll}>Homeschool</MobileLink>
          </MobileGroup>
          <MobileLink to="/empresas" onClick={closeAll}>Empresas</MobileLink>
          <MobileLink to="/nosotros" onClick={closeAll}>Nosotros</MobileLink>
          <MobileLink to="/becas" onClick={closeAll}>Becas</MobileLink>
          <MobileLink to="/convenios" onClick={closeAll}>Convenios</MobileLink>

          <Link
            to="/inscripcion"
            onClick={closeAll}
            className="mt-6 bg-amber-400 text-slate-900 text-center py-3 rounded-xl font-bold hover:bg-amber-500 transition"
          >
            Inscripción
          </Link>
        </div>
      )}
    </header>
  );
}

/* Helpers */

function DropLink({ to, title, desc }) {
  return (
    <Link
      to={to}
      className="block rounded-lg px-3 py-2 hover:bg-slate-700/50 transition"
    >
      <div className="font-semibold text-white">{title}</div>
      <div className="text-slate-300 text-sm">{desc}</div>
    </Link>
  );
}

function MobileGroup({ title, children }) {
  return (
    <div className="mt-4">
      <div className="text-slate-400 text-sm font-semibold mb-1">{title}</div>
      <div className="space-y-1">{children}</div>
    </div>
  );
}

function MobileLink({ to, children, onClick }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="block py-2 text-slate-100 font-medium hover:text-amber-400 transition"
    >
      {children}
    </Link>
  );
}

function navLink({ isActive }) {
  return (
    "px-2 py-1 rounded-lg font-semibold transition hover:text-white " +
    (isActive ? "text-amber-400" : "text-slate-300")
  );
}