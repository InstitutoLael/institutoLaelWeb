import { Link, NavLink, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/img/Logos/lael-inst-blanco.png";
import { NAVIGATION } from "../data/navigation";
import { 
  Menu, X, ShoppingBag, User, MessageCircle, 
  GraduationCap, Globe, HandHeart, BookOpen, Rocket, Shield, Briefcase, Info, Users
} from "lucide-react";
import ThemeToggle from "../components/ThemeToggle";
import LanguageSwitcher from "../components/LanguageSwitcher";

/* ─── COMPONENTE NAVBAR ─── */
export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { cart, toggleCart } = useCart();
  const cartCount = cart ? cart.length : 0;
  const location = useLocation();

  // Scroll Detection with requestAnimationFrame (Performance Optimized)
  useEffect(() => {
    let ticking = false;
    
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 10);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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
            width="140"
            height="40"
            className="h-10 w-auto object-contain transition-[filter,transform,opacity] duration-300 group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
          />
        </Link>

        {/* === DESKTOP NAVIGATION (> 1024px) === */}
        <nav className="hidden lg:flex items-center gap-10">
          {NAVIGATION.main.map((link, idx) => (
            <NavLink key={idx} to={link.path} className={({ isActive }) => `px-5 py-2.5 text-sm font-black rounded-full transition-all duration-300 ${isActive ? 'bg-white/10 text-white shadow-[0_0_15px_rgba(255,255,255,0.1)]' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* === ACTION BUTTONS === */}
        <div className="flex items-center gap-3 z-[60]">

          <LanguageSwitcher />
          <ThemeToggle />

          {/* Carrito */}
          <button
            onClick={toggleCart}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-slate-300 transition-all hover:bg-white/10 hover:text-white hover:scale-105 relative"
            aria-label="Carrito"
          >
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center bg-red-500 text-white text-[10px] font-bold rounded-full shadow-sm">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Toggle Button (Hamburger) */}
          <button
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white transition-all active:scale-95 touch-manipulation"
            onClick={() => setMobileOpen(true)}
          >
            <Menu size={24} />
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
                    className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 text-white hover:bg-white/10 active:scale-90 transition-all border border-white/10 touch-manipulation"
                    aria-label="Cerrar menú"
                  >
                    <X size={24} />
                  </button>
                </div>

                {/* User Access Card */}
                <Link to={NAVIGATION.action.aula.path} className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-white/5 to-transparent border border-white/5 hover:border-white/20 transition-all">
                  <div className="w-10 h-10 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                    <User size={20} />
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
                  {Object.entries(NAVIGATION.categories || {}).map(([category, items]) => (
                    <div key={category}>
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-4 pl-2 opacity-60">
                        {category === 'academic' ? 'Académico' : category === 'institutional' ? 'Institucional' : 'Soporte'}
                      </p>
                      <div className="space-y-1 pl-2 border-l border-white/10">
                        {items.map((item, idx) => (
                           // Note: Using a simpler link here since we don't need the icon in the list for now, 
                           // or we could add it. The original code didn't use icons in the list loop.
                          <MobileLink key={idx} to={item.path}>{item.name}</MobileLink>
                        ))}
                      </div>
                    </div>
                  ))}
                  
                  {/* Fallback for main links if categories missing */}
                  {!NAVIGATION.categories && (
                    <div>
                         <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-4 pl-2 opacity-60">Nuestra Academia</p>
                         <div className="space-y-1 pb-10">
                           {NAVIGATION.main.slice(1).map((item, idx) => (
                             <MobileLink key={idx} to={item.path}>{item.name}</MobileLink>
                           ))}
                         </div>
                    </div>
                  )}

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
                    <MessageCircle size={20} />
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