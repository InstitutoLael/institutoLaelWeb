import { Link, NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import logo from "../assets/img/Logos/lael-inst-blanco.png";

/* ─── 1. ICONOS SVG (Optimizados) ─── */
const Icons = {
  ChevronDown: () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>,
  Menu: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" /></svg>,
  X: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 18 18" /></svg>,
  WhatsApp: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.22 3.08.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.69.25-1.29.17-1.41-.08-.13-.27-.2-.57-.35M12.05 21.78h-.01A9.87 9.87 0 017.01 20.4l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 01-1.51-5.26C2.16 6.49 6.6 2.05 12.05 2.05c2.64 0 5.12 1.03 6.99 2.9a9.83 9.83 0 012.89 6.99c-.01 5.45-4.44 9.84-9.88 9.84" /></svg>,
  User: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>,
  Bag: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /><path d="M3 6h18" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>,
  // Iconos Programas
  Grad: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></svg>,
  World: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /><path d="M2 12h20" /></svg>,
  Hand: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0" /><path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2" /><path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8" /><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" /></svg>,
  Book: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></svg>,
  Rocket: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" /><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" /><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" /><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" /></svg>,
  ArrowR: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
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

  // Clases dinámicas
  const navClasses = `fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled
      ? "bg-[#050505]/95 backdrop-blur-xl border-b border-white/10 shadow-xl h-[70px]"
      : "h-[80px] bg-gradient-to-b from-black/60 to-transparent"
    }`;

  const linkBase = "text-slate-400 text-sm font-medium px-4 py-2 rounded-lg transition-all flex items-center gap-2 hover:text-gray-100 hover:bg-white/5";
  const linkActive = "text-indigo-400 bg-indigo-500/10 font-bold";

  return (
    <header className={navClasses}>
      <div className="max-w-7xl mx-auto px-5 h-full flex justify-between items-center relative">

        {/* LOGO */}
        <Link to="/" className="flex items-center z-[52] group" aria-label="Inicio Instituto Lael">
          <img
            src={logo}
            alt="Instituto Lael"
            className="h-10 w-auto filter drop-shadow transition-transform group-hover:scale-105"
          />
        </Link>

        {/* MENÚ ESCRITORIO */}
        <nav className="hidden lg:flex items-center gap-1 h-full">
          <NavLink to="/" className={({ isActive }) => `${linkBase} ${isActive ? linkActive : ''}`}>Inicio</NavLink>

          {/* MEGA MENÚ */}
          <div className="relative h-full flex items-center group/dropdown">
            <button className={`${linkBase} ${['/paes', '/idiomas', '/lsch', '/escuela-adultos', '/homeschool'].includes(location.pathname) ? linkActive : ''}`}>
              Programas <span className="text-xs mt-0.5 opacity-70 transition-transform group-hover/dropdown:rotate-180"><Icons.ChevronDown /></span>
            </button>
            <div className="absolute top-[80%] left-1/2 -translate-x-1/2 translate-y-4 w-[340px] bg-[#0f1115] border border-white/10 rounded-2xl p-2 opacity-0 invisible pointer-events-none transition-all duration-200 group-hover/dropdown:opacity-100 group-hover/dropdown:visible group-hover/dropdown:pointer-events-auto group-hover/dropdown:translate-y-0 shadow-2xl">
              <div className="flex flex-col gap-0.5">
                <MegaItem to="/paes" title="Preu PAES" desc="Matemática, Lenguaje y Ciencias." icon={<Icons.Grad />} color="text-blue-500" bg="group-hover:bg-blue-500" />
                <MegaItem to="/idiomas" title="Idiomas" desc="Inglés, Coreano, Portugués." icon={<Icons.World />} color="text-emerald-500" bg="group-hover:bg-emerald-500" />
                <MegaItem to="/lsch" title="Lengua de Señas" desc="Inclusión y cultura sorda." icon={<Icons.Hand />} color="text-purple-500" bg="group-hover:bg-purple-500" />
                <MegaItem to="/escuela-adultos" title="Escuela Adultos" desc="Termina tu 4to medio (2x1)." icon={<Icons.Book />} color="text-amber-500" bg="group-hover:bg-amber-500" />
                <MegaItem to="/homeschool" title="Lael Academy" desc="Tutorías y exámenes libres." icon={<Icons.Rocket />} color="text-rose-500" bg="group-hover:bg-rose-500" />
              </div>
            </div>
          </div>

          <NavLink to="/empresas" className={({ isActive }) => `${linkBase} ${isActive ? linkActive : ''}`}>Empresas</NavLink>
          <NavLink to="/nosotros" className={({ isActive }) => `${linkBase} ${isActive ? linkActive : ''}`}>Nosotros</NavLink>
        </nav>

        {/* ACCIONES */}
        <div className="flex gap-3 items-center z-[52]">

          {/* Carrito */}
          <button
            onClick={toggleCart}
            className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center bg-black/20 text-gray-200 transition hover:bg-white/20 hover:text-white hover:border-white/50 relative"
            aria-label="Carrito de compras"
          >
            <Icons.Bag />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[10px] font-extrabold w-[18px] h-[18px] flex items-center justify-center rounded-full border-2 border-black">
                {cartCount}
              </span>
            )}
          </button>

          {/* Login / Aula Virtual */}
          <Link to="/aula" className="hidden lg:flex w-10 h-10 rounded-full border border-white/10 items-center justify-center bg-black/20 text-gray-200 transition hover:bg-white/20 hover:text-white hover:border-white/50" aria-label="Aula Virtual">
            <Icons.User />
          </Link>

          {/* WhatsApp */}
          <a href="https://wa.me/56964626568" target="_blank" rel="noreferrer" className="hidden lg:flex w-10 h-10 rounded-full border border-green-500/40 items-center justify-center bg-green-500/10 text-[#25D366] transition hover:bg-[#25D366] hover:text-black hover:scale-105 hover:border-[#25D366]">
            <Icons.WhatsApp />
          </a>

          {/* Botón Principal CTA */}
          <Link to="/inscripcion" className="hidden lg:flex items-center justify-center px-6 py-2.5 rounded-full text-sm font-semibold bg-gray-100 text-black border border-white transition shadow-lg hover:bg-amber-500 hover:border-amber-500 hover:-translate-y-0.5">
            Inscripción
          </Link>

          {/* BOTÓN MÓVIL (HAMBURGUESA) */}
          <button
            className="lg:hidden w-10 h-10 flex items-center justify-center text-gray-200 bg-black/30 border border-white/20 rounded-lg backdrop-blur"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
          >
            <div className={`transition-transform duration-300 ${mobileOpen ? 'rotate-90' : ''}`}>
              {mobileOpen ? <Icons.X /> : <Icons.Menu />}
            </div>
          </button>
        </div>
      </div>

      {/* MENÚ MÓVIL (PANEL DESLIZANTE) */}
      <div className={`fixed inset-0 z-[51] transition-visibility duration-300 ${mobileOpen ? 'visible' : 'invisible'}`}>
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300 ${mobileOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setMobileOpen(false)}
        ></div>

        {/* Panel */}
        <div className={`absolute top-0 right-0 bottom-0 w-full max-w-[300px] bg-[#09090b] border-l border-white/10 shadow-2xl transform transition-transform duration-300 pt-[90px] flex flex-col ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex-1 overflow-y-auto p-5">

            <Link to="/aula" className="flex items-center gap-3 bg-white/5 p-3 rounded-xl text-white border border-white/10 mb-6 active:scale-95 transition-transform" onClick={() => setMobileOpen(false)}>
              <div className="w-9 h-9 bg-indigo-600 rounded-full flex items-center justify-center text-white"><Icons.User /></div>
              <div>
                <strong className="block text-sm">Aula Virtual</strong>
                <span className="text-xs text-slate-400">Acceso Alumnos</span>
              </div>
              <div className="ml-auto opacity-50"><Icons.ArrowR /></div>
            </Link>

            <span className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Navegación</span>
            <MobileLink to="/">Inicio</MobileLink>

            <span className="block text-xs font-bold text-slate-500 uppercase tracking-widest mt-6 mb-3">Nuestros Programas</span>
            <MobileLink to="/paes" icon={<Icons.Grad />} color="text-blue-500">Preu PAES</MobileLink>
            <MobileLink to="/idiomas" icon={<Icons.World />} color="text-emerald-500">Idiomas</MobileLink>
            <MobileLink to="/lsch" icon={<Icons.Hand />} color="text-purple-500">Lengua de Señas</MobileLink>
            <MobileLink to="/escuela-adultos" icon={<Icons.Book />} color="text-amber-500">Escuela de Adultos</MobileLink>
            <MobileLink to="/homeschool" icon={<Icons.Rocket />} color="text-rose-500">Lael Academy</MobileLink>

            <span className="block text-xs font-bold text-slate-500 uppercase tracking-widest mt-6 mb-3">Institucional</span>
            <MobileLink to="/empresas">Empresas</MobileLink>
            <MobileLink to="/nosotros">Nosotros</MobileLink>
          </div>

          <div className="p-5 border-t border-white/10 bg-black/30">
            <Link to="/inscripcion" className="block text-center w-full py-3.5 bg-amber-400 text-black font-extrabold rounded-xl mb-4 transition active:scale-95" onClick={() => setMobileOpen(false)}>
              🚀 Matricúlate Aquí
            </Link>
            <div className="text-center">
              <a href="https://wa.me/56964626568" className="inline-flex items-center gap-2 text-slate-400 text-sm hover:text-white"><Icons.WhatsApp /> ¿Dudas? Hablemos</a>
            </div>
          </div>
        </div>
      </div>

    </header>
  );
}

/* ─── HELPERS ─── */
function MegaItem({ to, title, desc, icon, color, bg }) {
  return (
    <Link to={to} className="flex gap-3.5 items-center p-3 rounded-lg hover:bg-white/5 transition group">
      <div className={`w-9 h-9 rounded-lg flex items-center justify-center bg-white/5 border border-white/10 transition ${color} ${bg} group-hover:text-white group-hover:border-transparent`}>
        {icon}
      </div>
      <div>
        <strong className="block text-gray-200 text-sm group-hover:text-white">{title}</strong>
        <span className="block text-slate-500 text-xs">{desc}</span>
      </div>
    </Link>
  );
}

function MobileLink({ to, children, icon, color }) {
  return (
    <NavLink to={to} className={({ isActive }) => `flex justify-between items-center py-3 border-b border-white/5 text-slate-200 text-sm ${isActive ? 'pl-2 border-l-2 border-indigo-500 text-indigo-400' : ''}`} onClick={() => document.body.style.overflow = ""}>
      <div className="flex items-center gap-3">
        {icon && <span className={`${color || 'text-slate-400'} text-lg`}>{icon}</span>}
        {children}
      </div>
      <Icons.ArrowR />
    </NavLink>
  );
}