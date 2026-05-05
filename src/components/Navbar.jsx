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

  // Scroll detection
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
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
    <header
      className={`fixed left-0 w-full z-[100] transition-all duration-700 ${
        scrolled || mobileOpen
          ? 'bg-white/80 backdrop-blur-2xl border-b border-black/[0.03] py-3 shadow-[0_10px_30px_rgba(0,0,0,0.04)]'
          : 'bg-[#F8F5F0]/40 backdrop-blur-md py-6'
      }`}
      style={{ top: bannerHeight }}
    >
      <div className="max-w-7xl mx-auto px-8 lg:px-12 flex items-center justify-between relative z-10">
        
        {/* ── LOGO ───────────────────────────────────────────────────── */}
        <Link to="/" className="z-[110] relative group flex items-center gap-3">
          <img
            src={logoNegro}
            alt="Instituto Lael"
            className="h-8 lg:h-10 w-auto object-contain transition-all duration-700 group-hover:scale-105"
          />
          <div className="h-6 w-px bg-lael-bd mx-2 hidden lg:block" />
          <span className="hidden lg:block text-[10px] tracking-[0.4em] uppercase font-bold text-lael-muted opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            Pertenencia
          </span>
        </Link>

        {/* ── DESKTOP NAV ────────────────────────────────────────────── */}
        <nav className="hidden lg:flex items-center gap-12">
          {NAVIGATION.main.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `relative text-[11px] tracking-[0.15em] uppercase font-bold transition-all duration-300 group ${
                  isActive 
                    ? 'text-lael-accent' 
                    : (scrolled ? 'text-lael-muted hover:text-lael-accent' : 'text-lael-muted/70 hover:text-lael-light')
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {link.name}
                  <span
                    className={`absolute -bottom-1.5 left-0 h-[2px] bg-lael-accent transition-all duration-500 ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </>
              )}
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
              (scrolled || mobileOpen)
                ? 'bg-black/[0.02] border-black/5 text-lael-muted' 
                : 'bg-white/10 border-white/10 text-white'
            }`}
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileOpen ? (
                <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 45, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.3 }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="4" x2="12" y2="20" />
                    <line x1="7" y1="9" x2="17" y2="9" />
                  </svg>
                </motion.div>
              ) : (
                <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.3 }}>
                  <Menu size={20} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* ── MOBILE MENU — FULLSCREEN ────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' }}
            animate={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
            exit={{ clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 bg-[#F8F5F0] z-[90] flex flex-col pt-32 pb-12 px-10 overflow-hidden"
          >
            {/* Background Texture & Watermark */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02] pointer-events-none select-none">
               <img src={logoNegro} alt="" className="w-[80vw] h-auto grayscale" />
            </div>

            {/* Menu Links */}
            <nav className="flex flex-col gap-8 relative z-10">
              {NAVIGATION.main.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + (i * 0.08), ease: [0.16, 1, 0.3, 1] }}
                  className="group"
                >
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `flex items-baseline gap-6 font-display text-5xl font-bold transition-all duration-500 ${
                        isActive ? 'text-lael-accent' : 'text-[#0D0D0D]/80 hover:text-lael-accent'
                      }`
                    }
                  >
                    <span className="text-[10px] font-sans tracking-[0.3em] text-lael-rust/40 font-bold">0{i+1}</span>
                    <span className="relative">
                      {link.name}
                      <motion.span 
                        className="absolute -bottom-1 left-0 h-[3px] bg-lael-accent"
                        initial={{ width: 0 }}
                        whileInView={{ width: '100%' }}
                        transition={{ duration: 0.5, delay: 0.5 + (i * 0.1) }}
                      />
                    </span>
                  </NavLink>
                </motion.div>
              ))}
            </nav>

            {/* Footer Section in Menu */}
            <div className="mt-auto relative z-10 border-t border-black/5 pt-12">
               <motion.div 
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 transition={{ delay: 0.8 }}
                 className="flex flex-col gap-8"
               >
                  <p className="text-[10px] tracking-[0.4em] uppercase text-lael-muted font-bold">Nuestro Propósito</p>
                  <p className="font-display text-xl text-lael-light leading-relaxed italic italic-playfair max-w-xs">
                    "Lael es el nuevo comienzo tras la tormenta. Una guía real en tu proceso."
                  </p>
                  
                  <a
                    href={NAVIGATION.action.whatsapp.url}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full bg-lael-accent text-white py-5 rounded-2xl text-[11px] tracking-[0.2em] uppercase font-bold text-center shadow-lg active:scale-95 transition-all"
                  >
                    {NAVIGATION.action.whatsapp.label}
                  </a>
               </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}