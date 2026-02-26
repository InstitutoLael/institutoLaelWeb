import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, MessageCircle, ShoppingCart, UserCircle, ChevronDown } from "lucide-react";
import { useCart } from "../../context/CartContext";
import logoBlanco from "../../assets/img/Logos/lael-inst-blanco.png";
import { NAVIGATION } from "../../data/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const { cart, toggleCart } = useCart();
  const location = useLocation();

  const cartCount = cart ? cart.length : 0;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setActiveSubmenu(null);
  }, [location.pathname]);

  // Bloquear scroll cuando el menú móvil está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  const menuVariants = {
    closed: { x: "100%", transition: { type: "spring", stiffness: 300, damping: 30 } },
    opened: { x: 0, transition: { type: "spring", stiffness: 300, damping: 30 } }
  };

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled ? "bg-slate-950/90 backdrop-blur-xl border-b border-white/10 py-3 shadow-2xl" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        
        {/* LOGO */}
        <Link to="/" className="relative z-[110] flex items-center group">
          <img 
            src={logoBlanco} 
            alt="Instituto Lael" 
            className="h-8 md:h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105" 
          />
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8">
          {NAVIGATION.main.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-300 relative group ${
                  isActive ? "text-indigo-400" : "text-slate-300 hover:text-white"
                }`
              }
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-500 transition-all duration-300 group-hover:w-full"></span>
            </NavLink>
          ))}
          
          {/* ACCIONES SECUNDARIAS DESKTOP */}
          <div className="flex items-center gap-4 ml-4 pl-6 border-l border-white/10">
            {/* Aula Virtual */}
            <Link 
              to={NAVIGATION.action.aula.path}
              className="text-slate-300 hover:text-indigo-400 transition-colors flex items-center gap-2 text-[10px] font-black uppercase tracking-widest"
              title="Acceso Aula Virtual"
            >
              <UserCircle size={18} />
              <span className="hidden xl:inline">Aula </span>
            </Link>

            {/* Carrito */}
            <button 
              onClick={toggleCart}
              className="relative p-2 text-slate-300 hover:text-white transition-colors"
              aria-label="Abrir Carrito"
            >
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-indigo-500 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Contacto CTA */}
            <Link
              to="/contacto"
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full transition-all shadow-lg shadow-indigo-600/20 active:scale-95"
            >
              Contacto
            </Link>
          </div>
        </div>

        {/* MOBILE CONTROLS */}
        <div className="flex lg:hidden items-center gap-4 z-[110]">
          <button 
            onClick={toggleCart}
            className="relative p-2 text-white"
          >
            <ShoppingCart size={22} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-indigo-500 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
          <button 
            className="text-white p-2 transition-transform active:scale-90"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="opened"
            exit="closed"
            className="fixed inset-0 bg-slate-950 z-[100] flex flex-col pt-32 pb-10 px-8 lg:hidden overflow-y-auto"
          >
            {/* GRADIENT DECORATION */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
            
            <div className="flex flex-col gap-6 relative z-10">
              {/* PRIMARY LINKS */}
              <div className="space-y-4">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-4">Navegación</p>
                {NAVIGATION.main.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    className={({ isActive }) =>
                      `block text-3xl font-black uppercase tracking-tighter transition-colors ${
                        isActive ? "text-indigo-500" : "text-white"
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                ))}
              </div>

              {/* SECONDARY CATEGORIES ACCORDIAN-LIKE */}
              <div className="mt-8 space-y-8">
                <div>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-4">Académico</p>
                  <div className="grid grid-cols-1 gap-4">
                    {NAVIGATION.categories.academic.map((item) => (
                      <Link key={item.path} to={item.path} className="flex items-center gap-4 text-slate-400 font-bold hover:text-white transition-colors">
                        {typeof item.icon === 'function' ? <item.icon className="text-indigo-500" size={18} /> : React.cloneElement(item.icon, { className: "text-indigo-500", size: 18 })}
                        <span className="text-sm uppercase tracking-widest">{item.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-4">Institución</p>
                  <div className="grid grid-cols-2 gap-4">
                    {NAVIGATION.categories.institutional.map((item) => (
                      <Link key={item.path} to={item.path} className="text-slate-500 font-bold hover:text-white transition-colors text-xs uppercase tracking-widest">
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* CTA MOBILE */}
              <div className="mt-10 flex flex-col gap-4">
                <Link
                  to="/contacto"
                  className="w-full py-5 bg-indigo-600 text-white text-center font-black uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-indigo-600/20"
                >
                  Hablar con un Asesor
                </Link>
                <Link
                  to={NAVIGATION.action.aula.path}
                  className="w-full py-5 bg-white/5 border border-white/10 text-white text-center font-black uppercase tracking-[0.2em] rounded-2xl flex items-center justify-center gap-3"
                >
                  <UserCircle size={20} /> Aula Virtual
                </Link>
              </div>

              {/* SOCIAL FOOTER MOBILE */}
              <div className="mt-12 pt-8 border-t border-white/5 flex flex-col items-center gap-6">
                <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.4em]">Propósito mayor</p>
                <div className="flex gap-8">
                  {NAVIGATION.social.map((s, i) => (
                    <a key={i} href={s.url} target="_blank" className="text-slate-500 hover:text-white transition-colors">
                      <s.icon size={20} />
                    </a>
                  ))}
                  <a href={NAVIGATION.action.whatsapp.url} target="_blank" className="text-emerald-500" aria-label="WhatsApp">
                    <MessageCircle size={20} />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
