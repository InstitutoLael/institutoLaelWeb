import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import logoBlanco from '../assets/img/Logos/lael-inst-blanco.png';
import logoNegro from '../assets/img/Logos/lael-inst-negro.png';
import { NAVIGATION } from '../data/navigation';
import { Plus } from 'lucide-react';

const ease = [0.16, 1, 0.3, 1];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const [bannerHeight, setBannerHeight] = useState(0);

  const isLightPage = ['/nosotros', '/contacto', '/transparencia', '/preguntas', '/diagnostico'].includes(location.pathname);

  // Scroll detection
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Measure banner height
  useEffect(() => {
    const measure = () => {
      const banner = document.querySelector('.lael-urgency-banner');
      setBannerHeight(banner ? banner.offsetHeight : 0);
    };
    measure();
    const observer = new MutationObserver(measure);
    observer.observe(document.body, { childList: true, subtree: true });
    window.addEventListener('resize', measure);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

  // Body scroll lock (Better stability)
  useEffect(() => {
    const html = document.documentElement;
    if (mobileOpen) {
      html.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    } else {
      html.style.overflow = '';
      document.body.style.overflow = '';
    }
    return () => {
      html.style.overflow = '';
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  const isFocusPage = location.pathname === '/diagnostico' || location.pathname === '/resultado-diagnostico';

  if (isFocusPage) {
    return (
      <header 
        className="fixed left-0 w-full z-[100] py-8 px-8 flex justify-between items-center transition-all duration-500"
        style={{ top: bannerHeight }}
      >
        <Link to="/" className="pointer-events-auto group">
           <img src={logoNegro} alt="Instituto Lael" className="h-7 w-auto transition-transform group-hover:scale-105" />
        </Link>
        <Link to="/" className="pointer-events-auto text-[10px] uppercase tracking-[0.3em] text-lael-muted font-bold hover:text-lael-accent transition-colors flex items-center gap-2">
          <span>Salir del modo foco</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="rotate-45">
            <line x1="12" y1="4" x2="12" y2="20" />
            <line x1="7" y1="9" x2="17" y2="9" />
          </svg>
        </Link>
      </header>
    );
  }

  return (
    <>
      <header
        className={`fixed left-0 w-full z-[100] transition-all duration-500 ease-in-out ${
          scrolled || mobileOpen || isLightPage
            ? 'bg-white/95 backdrop-blur-md border-b border-black/[0.05] py-3 shadow-lg'
            : 'bg-transparent py-7'
        }`}
        style={{ top: bannerHeight }}
      >
        <div className="max-w-7xl mx-auto px-8 lg:px-12 flex items-center justify-between relative z-10">
          
          {/* ── LOGO ───────────────────────────────────────────────────── */}
          <Link to="/" className="z-[110] relative group flex items-center gap-3">
            <img
              src={scrolled || mobileOpen || isLightPage ? logoNegro : logoBlanco}
              alt="Instituto Lael"
              className={`w-auto object-contain transition-all duration-500 group-hover:scale-105 ${
                scrolled ? 'h-7 lg:h-8' : 'h-8 lg:h-10'
              }`}
            />
            <div className="h-6 w-px bg-lael-bd mx-2 hidden lg:block" />
            <span className="hidden lg:block text-[10px] tracking-[0.4em] uppercase font-bold text-lael-muted opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              Pertenencia
            </span>
          </Link>

          {/* ── DESKTOP NAV ────────────────────────────────────────────── */}
          <nav className="hidden lg:flex items-center gap-10">
            {NAVIGATION.main.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => 
                  `text-[10px] tracking-[0.3em] uppercase font-bold transition-all duration-300 hover:text-lael-accent relative py-2 ${
                    isActive ? 'text-lael-accent' : (scrolled || mobileOpen || isLightPage ? 'text-lael-primary/70' : 'text-white/70')
                  }`
                }
              >
                <span className="flex items-center gap-2">
                  {item.name}
                  {item.badge && (
                    <span className="bg-[#5C6E4E] text-white text-[9px] font-bold uppercase px-1.5 py-0.5 rounded-sm">
                      {item.badge}
                    </span>
                  )}
                </span>
              </NavLink>
            ))}
          </nav>

          {/* ── RIGHT: CTA + BURGER ────────────────────────────────────── */}
          <div className="flex items-center gap-6 z-[110]">
            <a
              href={NAVIGATION.action.whatsapp.url}
              target="_blank"
              rel="noreferrer"
              className={`hidden lg:inline-flex items-center px-6 py-3 rounded-xl text-[10px] tracking-[0.2em] uppercase font-bold transition-all duration-500 shadow-sm ${
                scrolled 
                  ? 'bg-lael-accent text-white hover:bg-lael-rust' 
                  : 'bg-lael-accent/10 border border-lael-accent/20 text-lael-accent hover:bg-lael-accent hover:text-white'
              }`}
            >
              {NAVIGATION.action.whatsapp.label}
            </a>

            <button
              onClick={() => setMobileOpen(v => !v)}
              aria-label="Toggle menu"
              className={`lg:hidden w-11 h-11 flex items-center justify-center rounded-xl transition-all active:scale-95 border ${
                mobileOpen
                  ? 'bg-lael-accent text-white border-lael-accent'
                  : 'bg-[#0D0D0D] text-white border-black shadow-xl'
              }`}
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileOpen ? (
                  <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <X size={20} />
                  </motion.div>
                ) : (
                  <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <Menu size={20} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      {/* ── MOBILE DRAWER — APP-STYLE OVERLAY ────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <div className="fixed inset-0 z-[200]">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-lg"
            />

            {/* Drawer Content */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="absolute left-0 top-0 bottom-0 w-[85%] max-w-sm bg-white rounded-r-[40px] shadow-2xl flex flex-col p-10 overflow-y-auto"
            >
              {/* Header inside Drawer */}
              <div className="flex items-center justify-between mb-16 relative z-10">
                <Link to="/" onClick={() => setMobileOpen(false)}>
                  <img src={logoNegro} alt="Lael" className="h-8 w-auto" />
                </Link>
                <button 
                  onClick={() => setMobileOpen(false)}
                  className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center text-lael-muted hover:bg-black/10"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Links with Icons */}
              <nav className="flex flex-col gap-4 relative z-10">
                {NAVIGATION.main.map((link, i) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + (i * 0.08) }}
                  >
                    <NavLink
                      to={link.path}
                      onClick={() => setMobileOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center gap-5 p-4 rounded-2xl transition-all duration-300 ${
                          isActive 
                            ? 'bg-lael-accent text-white shadow-lg shadow-lael-accent/20' 
                            : 'text-[#0D0D0D]/80 hover:bg-black/5'
                        }`
                      }
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                        location.pathname === link.path ? 'bg-white/20 text-white' : 'bg-lael-accent/10 text-lael-accent'
                      }`}>
                         <span className="text-[10px] font-bold">{i+1}</span>
                      </div>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-3">
                          <span className="font-display text-2xl font-bold">{link.name}</span>
                          {link.badge && (
                            <span className="bg-[#5C6E4E] text-white text-[9px] font-bold uppercase px-2 py-1 leading-none">
                              {link.badge}
                            </span>
                          )}
                        </div>
                      </div>
                    </NavLink>
                  </motion.div>
                ))}
              </nav>

              {/* Footer Section */}
              <div className="mt-auto relative z-10 pt-10 border-t border-black/5">
                 <div className="bg-lael-accent/5 p-6 rounded-[30px] border border-lael-accent/10 mb-8">
                    <p className="text-[9px] tracking-[0.3em] uppercase text-lael-muted font-bold mb-4">Misión Lael</p>
                    <p className="text-sm text-lael-light leading-relaxed italic italic-playfair">
                      "No es solo aprender, es pertenecer a un sistema de alto rendimiento espiritual y académico."
                    </p>
                 </div>
                 <a
                    href={NAVIGATION.action.whatsapp.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-3 w-full bg-lael-accent text-white py-5 rounded-2xl text-[11px] tracking-[0.2em] uppercase font-bold shadow-xl active:scale-95 transition-all"
                  >
                    <span>Contactar ahora</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                  </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}