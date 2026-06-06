import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Plus } from 'lucide-react';
import logoColor from '../assets/img/Logos/lael-nuevo-logo.png';
import logoBlanco from '../assets/img/Logos/lael-nuevo-logo-blanco.png';
import { NAVIGATION } from '../data/navigation';
import UrgencyBanner from './UrgencyBanner';

const ease = [0.16, 1, 0.3, 1];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const [bannerHeight, setBannerHeight] = useState(0);

  // Páginas con fondo claro (Navbar fondo blanco/sólido siempre)
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

  // Body scroll lock
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

  const isFocusPage =
    location.pathname === '/diagnostico' ||
    location.pathname === '/resultado-diagnostico' ||
    location.pathname.startsWith('/arcade') ||
    location.pathname === '/diegobet';

  // Determinar si mostrar logo claro u oscuro
  const isNavSolid = scrolled || mobileOpen || isLightPage;
  const activeLogo = isNavSolid ? logoColor : logoBlanco;

  if (isFocusPage) {
    return (
      <header className="fixed left-0 top-0 w-full z-[100] p-4 lg:p-8 flex justify-between items-center pointer-events-none transition-all duration-500">
        <div className="flex items-center gap-4 pointer-events-auto">
          <Link to="/" className="group">
            <img
              src={isLightPage ? logoColor : logoBlanco}
              alt="Instituto Lael"
              className="h-8 lg:h-10 w-auto transition-transform group-hover:scale-105"
            />
          </Link>
          <div className="w-px h-4 bg-white/20 hidden lg:block" />
          <Link to="/" className="hidden lg:flex items-center gap-2 text-[8px] uppercase tracking-[0.3em] text-white/40 font-bold hover:text-[#D7E400] transition-colors">
            Salir del modo foco
          </Link>
        </div>
        <Link to="/" className="lg:hidden pointer-events-auto w-10 h-10 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center text-white">
          <X size={20} />
        </Link>
      </header>
    );
  }

  return (
    <>
      <header
        className={`fixed left-0 top-0 w-full z-[100] transition-all duration-500 ease-in-out ${
          isNavSolid
            ? 'bg-white/95 backdrop-blur-md border-b border-black/[0.05] shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <UrgencyBanner />
        <div className={`max-w-7xl mx-auto px-8 lg:px-12 flex items-center justify-between relative z-10 transition-all duration-500 ${
          isNavSolid ? 'py-3' : 'py-5'
        }`}>

          {/* ── LOGO ─────────────────────────────────────────────────── */}
          <Link to="/" className="z-[110] relative group flex items-center gap-3">
            <img
              src={activeLogo}
              alt="Instituto Lael"
              className={`w-auto object-contain transition-all duration-500 group-hover:scale-105 ${
                isNavSolid ? 'h-12 lg:h-14' : 'h-16 lg:h-20'
              }`}
            />
          </Link>

          {/* ── DESKTOP NAV ──────────────────────────────────────────── */}
          <nav className="hidden lg:flex items-center gap-10">
            {NAVIGATION.main.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `text-[10px] tracking-[0.3em] uppercase font-bold transition-all duration-300 relative py-2 ${
                    isNavSolid
                      ? isActive
                        ? 'text-lael-primary'
                        : 'text-lael-primary/60 hover:text-lael-primary'
                      : isActive
                        ? 'text-lael-accent'
                        : 'text-white/80 hover:text-white'
                  }`
                }
              >
                <span className="flex items-center gap-2">
                  {item.name}
                  {item.badge && (
                    <span className="bg-lael-accent text-lael-primary text-[9px] font-bold uppercase px-1.5 py-0.5 rounded-sm">
                      {item.badge}
                    </span>
                  )}
                </span>
              </NavLink>
            ))}
          </nav>

          {/* ── RIGHT: CTA + BURGER ──────────────────────────────────── */}
          <div className="flex items-center gap-4 z-[110]">
            {/* CTA Inscribirme — amarillo */}
            <a
              href="https://forms.gle/H86nFAQ2DJ8CCQ7y6"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline-flex items-center px-6 py-3 rounded-xl text-[10px] tracking-[0.2em] uppercase font-bold transition-all duration-300 shadow-sm bg-lael-accent text-lael-primary hover:bg-[#c4d000] hover:shadow-md"
            >
              Inscribirme
            </a>

            {/* Burger mobile */}
            <button
              onClick={() => setMobileOpen(v => !v)}
              aria-label="Toggle menu"
              className={`lg:hidden w-11 h-11 flex items-center justify-center rounded-xl transition-all active:scale-95 border ${
                mobileOpen
                  ? 'bg-lael-primary text-white border-lael-primary'
                  : isNavSolid
                    ? 'bg-lael-primary text-white border-lael-primary shadow-xl'
                    : 'bg-white/10 text-white border-white/20 backdrop-blur-sm'
              }`}
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileOpen ? (
                  <motion.div key="cross" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
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

      {/* ── MOBILE DRAWER ─────────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <div className="fixed inset-0 z-[200]">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="absolute inset-0 bg-lael-primary/90 backdrop-blur-lg"
            />

            {/* Drawer Content */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="absolute left-0 top-0 bottom-0 w-[85%] max-w-sm bg-lael-primary rounded-r-[40px] shadow-2xl flex flex-col p-10 overflow-y-auto"
            >
              {/* Header inside Drawer */}
              <div className="flex items-center justify-between mb-12 relative z-10">
                <Link to="/" onClick={() => setMobileOpen(false)}>
                  <img src={logoBlanco} alt="Lael" className="h-10 w-auto" />
                </Link>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Links */}
              <nav className="flex flex-col gap-2 relative z-10">
                {NAVIGATION.main.map((link, i) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + (i * 0.07) }}
                  >
                    <NavLink
                      to={link.path}
                      onClick={() => setMobileOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 font-bold text-base ${
                          isActive
                            ? 'bg-lael-accent text-lael-primary'
                            : 'text-white/80 hover:bg-white/10'
                        }`
                      }
                    >
                      <span className="flex items-center gap-3">
                        {link.name}
                        {link.badge && (
                          <span className="bg-lael-accent text-lael-primary text-[9px] font-bold uppercase px-2 py-0.5 rounded-sm">
                            {link.badge}
                          </span>
                        )}
                      </span>
                    </NavLink>
                  </motion.div>
                ))}
              </nav>

              {/* Footer Section */}
              <div className="mt-auto relative z-10 pt-8 border-t border-white/10">
                <p className="text-xs text-white/40 uppercase tracking-widest font-bold mb-4">Misión Lael</p>
                <p className="text-sm text-white/70 leading-relaxed italic mb-8">
                  "No eres un puntaje. Tu futuro empieza ahora."
                </p>
                <a
                  href="https://forms.gle/H86nFAQ2DJ8CCQ7y6"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-3 w-full bg-lael-accent text-lael-primary py-5 rounded-2xl text-[11px] tracking-[0.2em] uppercase font-bold shadow-xl active:scale-95 transition-all hover:bg-[#c4d000]"
                >
                  <span>Inscribirme Gratis</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}