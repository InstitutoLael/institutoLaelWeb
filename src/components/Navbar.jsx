import { Link, NavLink, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/img/Logos/lael-inst-blanco.png";
import { NAVIGATION } from "../data/navigation";
import { 
  Menu, X 
} from "lucide-react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

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

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const navClasses = `fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled
    ? "bg-lael-primary/90 backdrop-blur-2xl border-b border-white/5 shadow-cinematic-shadow py-3"
    : "bg-transparent py-6"
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
            className="h-8 md:h-10 w-auto object-contain transition-all duration-500 group-hover:drop-shadow-[0_0_15px_rgba(198,166,107,0.4)]"
          />
        </Link>

        {/* === DESKTOP NAVIGATION === */}
        <nav className="hidden lg:flex items-center gap-8">
          {NAVIGATION.main.map((link, idx) => (
            <NavLink key={idx} to={link.path} className={({ isActive }) => `text-sm font-medium transition-all duration-300 ${isActive ? 'text-lael-accent border-b border-lael-accent pb-1' : 'text-lael-muted hover:text-lael-light'}`}>
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* === ACTION BUTTONS === */}
        <div className="flex items-center gap-4 z-[60]">
          {/* <LanguageSwitcher /> */}
          {/* <ThemeToggle /> */}
          
          <a
            href={NAVIGATION.action.whatsapp.url}
            target="_blank"
            rel="noreferrer"
            className="hidden lg:inline-flex items-center gap-2 bg-transparent text-lael-accent border border-lael-accent/30 px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-lael-accent/10 transition-all duration-300"
          >
            Postular Ahora
          </a>

          <button
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 text-white transition-all active:scale-95"
            onClick={() => setMobileOpen(true)}
          >
            <Menu size={20} />
          </button>
        </div>
      </div>

      {/* === MOBILE MENU OVERLAY === */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-lael-primary/80 backdrop-blur-md z-[90]"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-lael-secondary border-l border-white/10 z-[100] flex flex-col shadow-2xl"
            >
              <div className="flex-1 overflow-y-auto p-8 space-y-10">
                <div className="flex items-center justify-between pb-6 border-b border-white/5">
                  <span className="text-xl font-display font-bold text-lael-light">Instituto Lael</span>
                  <button
                    onClick={() => setMobileOpen(false)}
                    className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/5 text-lael-muted hover:text-white transition-all border border-white/10"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="space-y-6">
                  {NAVIGATION.main.map((item, idx) => (
                    <MobileLink key={idx} to={item.path}>{item.name}</MobileLink>
                  ))}
                </div>
              </div>

              <div className="p-8 border-t border-white/5 bg-lael-primary">
                <a
                  href={NAVIGATION.action.whatsapp.url}
                  target="_blank"
                  rel="noreferrer"
                  className="block w-full py-4 bg-lael-accent text-lael-primary text-center font-medium rounded-lg hover:bg-lael-accent/90 transition-colors shadow-[0_0_20px_rgba(198,166,107,0.2)]"
                >
                  Postular Ahora
                </a>
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
        `block text-lg font-medium transition-all ${isActive
          ? "text-lael-accent pl-4 border-l-2 border-lael-accent"
          : "text-lael-muted hover:text-lael-light"
        }`
      }
    >
      {children}
    </NavLink>
  );
}