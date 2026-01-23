import { Link, NavLink, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/img/Logos/lael-inst-blanco.png";
import { NAVIGATION } from "../data/navigation";

/* ─── ICONOS SVG (Lucide-like optimizados) ─── */
// Nota: Para este refactor mantengo los SVG inline por rendimiento y estilo visual específico
// aunque NAVIGATION use react-icons. Los íconos del MegaMenu se mapean visualmente aquí.
const Icons = {
  ChevronDown: ({ className }) => <svg className={className} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>,
  Menu: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" /></svg>,
  X: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="4" x2="12" y2="20" /><line x1="6" y1="9" x2="18" y2="9" /></svg>,
  Bag: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /><path d="M3 6h18" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>,
  WhatsApp: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.22 3.08.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.69.25-1.29.17-1.41-.08-.13-.27-.2-.57-.35M12.05 21.78h-.01A9.87 9.87 0 017.01 20.4l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 01-1.51-5.26C2.16 6.49 6.6 2.05 12.05 2.05c2.64 0 5.12 1.03 6.99 2.9a9.83 9.83 0 012.89 6.99c-.01 5.45-4.44 9.84-9.88 9.84" /></svg>,
  User: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>,
  // Icon mapping helpers for MegaMenu
  Grad: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></svg>,
  World: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /><path d="M2 12h20" /></svg>,
  Hand: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0" /><path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2" /><path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8" /><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" /></svg>,
  Book: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></svg>,
  Rocket: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" /><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" /><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" /><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" /></svg>,
};

// Helper para mapear string icon a componente
const getIcon = (name) => {
  const map = {
    "FaGraduationCap": <Icons.Grad />,
    "FaGlobeAmericas": <Icons.World />,
    "FaHandsHelping": <Icons.Hand />,
    "FaBookReader": <Icons.Book />,
    "FaRocket": <Icons.Rocket />
  };
  return map[name] || <Icons.Book />;
};

/* ─── COMPONENTE NAVBAR ─── */
export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { cart, toggleCart } = useCart();
  const cartCount = cart ? cart.length : 0;
  const location = useLocation();

  // Scroll Detection
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close Mobile Menu on Route Change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Lock Body Scroll
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // Navbar Classes (Glass effect)
  const navClasses = `fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled
    ? "bg-[#050505]/95 backdrop-blur-2xl border-b border-white/5 shadow-2xl py-3"
    : "bg-transparent py-5"
    }`;

  return (
    <header className={navClasses}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

        {/* === LOGO === */}
        <Link to="/" className="z-[60] relative group">
          <img
            src={logo}
            alt="Instituto Lael"
            fetchpriority="high"
            loading="eager"
            className="h-10 w-auto object-contain transition-[filter,transform,opacity] duration-300 group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
          />
        </Link>

        {/* === DESKTOP NAVIGATION (> 1024px) === */}
        <nav className="hidden lg:flex items-center gap-6">
          {/* Main Links (Inicio) */}
          <NavLink to={NAVIGATION.main[0].path} className={({ isActive }) => `px-5 py-2.5 text-sm font-black rounded-full transition-all duration-300 ${isActive ? 'bg-white/10 text-white shadow-[0_0_15px_rgba(255,255,255,0.1)]' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
            {NAVIGATION.main[0].name}
          </NavLink>

          {/* Mega Menu Trigger */}
          <div className="relative group/dropdown px-2 py-2">
            <button className="flex items-center gap-1.5 text-sm font-medium text-slate-300 transition-colors group-hover/dropdown:text-white">
              Programas
              <Icons.ChevronDown className="opacity-70 transition-transform duration-300 group-hover/dropdown:rotate-180" />
            </button>

            {/* Mega Menu Dropdown */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[600px] p-6 bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl opacity-0 invisible translate-y-2 transition-all duration-300 group-hover/dropdown:opacity-100 group-hover/dropdown:visible group-hover/dropdown:translate-y-0 z-50">
              <div className="grid grid-cols-3 gap-8">
                {Object.entries(NAVIGATION.megaMenu).map(([category, items]) => (
                  <div key={category}>
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 border-b border-white/5 pb-2">{category}</h4>
                    <div className="flex flex-col gap-2">
                      {items.map((item, idx) => (
                        <MegaItem
                          key={idx}
                          to={item.path}
                          title={item.title}
                          icon={getIcon(item.icon)}
                          color={item.color}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Links Restantes (Empresas, Nosotros) */}
          {NAVIGATION.main.slice(1).map((link, idx) => (
            <NavLink key={idx} to={link.path} className={({ isActive }) => `px-5 py-2.5 text-sm font-black rounded-full transition-all duration-300 ${isActive ? 'bg-white/10 text-white shadow-[0_0_15px_rgba(255,255,255,0.1)]' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* === ACTION BUTTONS === */}
        <div className="flex items-center gap-3 z-[60]">

          {/* Carrito */}
          <button
            onClick={toggleCart}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-slate-300 transition-all hover:bg-white/10 hover:text-white hover:scale-105 relative"
            aria-label="Carrito"
          >
            <Icons.Bag />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center bg-red-500 text-white text-[10px] font-bold rounded-full shadow-sm">
                {cartCount}
              </span>
            )}
          </button>

          {/* Desktop Only Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <Link to={NAVIGATION.action.aula.path} className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-slate-300 transition-all hover:bg-white/10 hover:text-white hover:scale-105" title={NAVIGATION.action.aula.name}>
              <Icons.User />
            </Link>

            <Link to="/#catalog" className="px-6 py-2.5 bg-white text-black text-sm font-bold rounded-full hover:bg-amber-400 transition-colors shadow-[0_0_15px_rgba(255,255,255,0.2)]">
              Oferta Académica
            </Link>
          </div>

          {/* Mobile Toggle Button (Hamburger) */}
          <button
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white transition-all active:scale-95"
            onClick={() => setMobileOpen(true)}
          >
            <Icons.Menu />
          </button>
        </div>
      </div>

      {/* === MOBILE MENU OVERLAY (Framer Motion) === */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90]"
            />

            {/* Drawer Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-[#09090b]/95 backdrop-blur-xl border-l border-white/10 z-[100] flex flex-col shadow-2xl"
            >
              {/* Drawer Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-8">
                {/* Header & Close */}
                <div className="flex items-center justify-between pb-6 border-b border-white/5">
                  <div className="flex flex-col">
                    <span className="text-lg font-black text-white uppercase tracking-tighter">Instituto <span className="text-indigo-500">Lael</span></span>
                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest leading-none">Menú de Navegación</span>
                  </div>
                  <button
                    onClick={() => setMobileOpen(false)}
                    className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 text-white hover:bg-white/10 active:scale-90 transition-all border border-white/10"
                    aria-label="Cerrar menú"
                  >
                    <Icons.X />
                  </button>
                </div>

                {/* User Access Card */}
                <Link to={NAVIGATION.action.aula.path} className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-white/5 to-transparent border border-white/5 hover:border-white/20 transition-all">
                  <div className="w-10 h-10 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                    <Icons.User />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm">Aula Virtual</h4>
                    <p className="text-xs text-slate-400">Acceso Estudiantes</p>
                  </div>
                </Link>

                {/* Navigation Links */}
                <div className="space-y-6">
                  <div>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-4 pl-2 opacity-60">Explorar</p>
                    <div className="space-y-1">
                      <MobileLink to={NAVIGATION.main[0].path}>{NAVIGATION.main[0].name}</MobileLink>
                    </div>
                  </div>

                  {/* Categorized Mobile Menu */}
                  {Object.entries(NAVIGATION.megaMenu).map(([category, items]) => (
                    <div key={category}>
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-4 pl-2 opacity-60">{category}</p>
                      <div className="space-y-1 pl-2 border-l border-white/10">
                        {items.map((item, idx) => (
                          <MobileLink key={idx} to={item.path}>{item.title}</MobileLink>
                        ))}
                      </div>
                    </div>
                  ))}

                  <div>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-4 pl-2 opacity-60">Nuestra Academia</p>
                    <div className="space-y-1 pb-10">
                      {NAVIGATION.main.slice(1).map((item, idx) => (
                        <MobileLink key={idx} to={item.path}>{item.name}</MobileLink>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Drawer Footer */}
              <div className="p-6 border-t border-white/10 bg-black/20">
                <button
                  onClick={() => { setMobileOpen(false); toggleCart(); }}
                  className="block w-full py-4 bg-white text-black text-center font-extrabold text-lg rounded-xl hover:bg-amber-400 transition-colors shadow-lg shadow-white/10"
                >
                  🛒 Ver Mi Mochila
                </button>
                <div className="mt-4 text-center">
                  <a href={NAVIGATION.action.whatsapp.url} className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors inline-flex items-center gap-2">
                    <Icons.WhatsApp />
                    ¿Consultas vía WhatsApp?
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ─── HELPER COMPONENTS ─── */
function MegaItem({ to, title, icon, color }) {
  return (
    <Link to={to} className="group flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors">
      <span className={`${color} bg - white / 5 p - 2 rounded - md group - hover: scale - 110 transition - transform`}>
        {icon}
      </span>
      <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">{title}</span>
    </Link>
  );
}

function MobileLink({ to, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `block py-4 px-5 rounded-2xl text-lg font-black transition-all ${isActive
          ? "bg-white/10 text-white border-l-4 border-indigo-500 pl-6 shadow-xl shadow-indigo-500/10"
          : "text-slate-500 hover:text-white hover:bg-white/5"
        }`
      }
    >
      {children}
    </NavLink>
  );
}