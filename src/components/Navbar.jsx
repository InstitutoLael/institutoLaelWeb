import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Plus } from 'lucide-react';
import logoColor from '../assets/img/Logos/lael-nuevo-logo.webp';
import logoBlanco from '../assets/img/Logos/lael-nuevo-logo-blanco.webp';
import { NAVIGATION } from '../data/navigation';
import UrgencyBanner from './UrgencyBanner';
import ProgramasDropdown from './ProgramasDropdown';
import ThemeToggle from './ThemeToggle';

const ease = [0.16, 1, 0.3, 1];

// Menú de celular: programas con su precio, herramientas e instituto.
const MOBILE_MENU = [
  { title: 'Programas', grid: true, items: [
    { name: 'Preu PAES', path: '/paes', tag: 'Desde $10.000', highlight: true },
    { name: 'Escuela de Sueños', path: '/adultos', tag: 'Gratis', highlight: true },
    { name: 'Inglés', path: '/idiomas', tag: '$14.990/mes' },
    { name: 'Verano Lael', path: '/verano', tag: 'Enero' },
    { name: 'Reforzamiento', path: '/reforzamiento', tag: '7° a 2° medio' },
    { name: 'Empresas', path: '/empresas', tag: 'Cotiza' },
  ] },
  { title: 'Herramientas gratis', items: [
    { name: 'Calculadora de puntaje', path: '/calculadora', tag: '2.000+ carreras' },
    { name: 'Diagnóstico', path: '/diagnostico', tag: '2 minutos' },
    { name: 'Noticias y guías', path: '/noticias' },
  ] },
  { title: 'Instituto', grid: true, items: [
    { name: 'Nosotros', path: '/nosotros' },
    { name: 'Casos reales', path: '/casos-reales' },
    { name: 'Preguntas', path: '/preguntas' },
    { name: 'Contacto', path: '/contacto' },
  ] },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const [bannerHeight, setBannerHeight] = useState(0);

  // Páginas con fondo claro (Navbar fondo blanco/sólido siempre)
  const isLightPage = ['/nosotros', '/contacto', '/transparencia', '/preguntas', '/diagnostico', '/casos-reales', '/sistema', '/privacidad'].includes(location.pathname);

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
          <div className={`w-px h-4 hidden lg:block ${isLightPage ? "bg-[#071D49]/20" : "bg-white/20"}`} />
          <Link to="/" className={`hidden lg:flex items-center gap-2 text-xs uppercase tracking-[0.1em] font-bold ${isLightPage ? "text-[#071D49]/70 hover:text-[#071D49]" : "text-white/70 hover:text-white"}`}>
            Salir del modo foco
          </Link>
        </div>
        <Link to="/" aria-label="Salir del diagnóstico" className={`lg:hidden pointer-events-auto w-11 h-11 rounded-xl flex items-center justify-center backdrop-blur-md ${isLightPage ? "bg-[#071D49]/5 text-[#071D49] border border-[#071D49]/10" : "bg-white/10 text-white"}`}>
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
                isNavSolid ? 'h-9 xl:h-10' : 'h-10 xl:h-12'
              }`}
            />
          </Link>

          {/* ── DESKTOP NAV ──────────────────────────────────────────── */}
          <nav className="hidden xl:flex items-center gap-7">
            {NAVIGATION.main.map((item) => item.dropdown ? (
              <ProgramasDropdown key="programas" solid={isNavSolid} />
            ) : (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `text-[13px] tracking-[0.06em] uppercase font-bold transition-all duration-300 relative py-2 ${
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
                {({ isActive }) => (
                  <>
                    <span className="flex items-center gap-2">
                      {item.name}
                      {item.badge && (
                        <span className="bg-lael-accent text-lael-primary text-[10px] tracking-normal font-bold uppercase px-1.5 py-0.5 rounded">
                          {item.badge}
                        </span>
                      )}
                    </span>
                    {isActive && (
                      <motion.span
                        layoutId="nav-active-indicator"
                        className={`absolute left-0 right-0 -bottom-0.5 h-[3px] rounded-full ${isNavSolid ? "bg-lael-primary" : "bg-lael-accent"}`}
                        transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* ── RIGHT: CTA + BURGER ──────────────────────────────────── */}
          <div className="flex items-center gap-4 z-[110]">
            {/* CTA Inscribirme - amarillo */}
            <a
              href="/inscripcion"
              className="hidden xl:inline-flex items-center px-6 py-3 rounded-xl text-[13px] tracking-[0.06em] uppercase font-bold transition-all duration-300 shadow-sm bg-lael-accent text-lael-primary hover:bg-[#c4d000] hover:shadow-md"
            >
              Inscribirme
            </a>

            {/* Burger mobile */}
            <button
              onClick={() => setMobileOpen(v => !v)}
              aria-label="Toggle menu"
              className={`xl:hidden w-11 h-11 flex items-center justify-center rounded-xl transition-all active:scale-95 border ${
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
              className="absolute left-0 top-0 bottom-0 w-[92%] max-w-md bg-lael-primary rounded-r-[32px] shadow-2xl flex flex-col px-6 sm:px-8 pt-6 pb-4 overflow-y-auto"
            >
              {/* Header inside Drawer */}
              <div className="flex items-center justify-between mb-8 relative z-10">
                <Link to="/" onClick={() => setMobileOpen(false)}>
                  <img src={logoBlanco} alt="Lael" className="h-10 w-auto" />
                </Link>
                <button
                  onClick={() => setMobileOpen(false)}
                  aria-label="Cerrar menú"
                  className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Secciones del menú */}
              <nav aria-label="Menú principal" className="relative z-10 flex-1 space-y-7">
                {MOBILE_MENU.map((sec, si) => (
                  <motion.div key={sec.title} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + si * 0.06 }}>
                    <p className="text-xs font-bold uppercase tracking-[0.15em] text-white/60 mb-2 px-1">{sec.title}</p>
                    <div className={sec.grid ? 'grid grid-cols-2 gap-2' : 'space-y-1'}>
                      {sec.items.map((it) => (
                        <NavLink
                          key={it.path}
                          to={it.path}
                          onClick={() => setMobileOpen(false)}
                          className={({ isActive }) =>
                            `flex gap-3 rounded-2xl transition-colors min-h-[52px] ${sec.grid ? 'flex-col items-start justify-center p-3' : 'items-center justify-between px-4 py-3'} ${
                              isActive ? 'bg-lael-accent text-lael-primary' : 'bg-white/[0.06] text-white hover:bg-white/10'
                            }`
                          }
                        >
                          {({ isActive }) => (
                            <>
                              <span className="font-bold text-[15px] leading-tight">{it.name}</span>
                              {it.tag && (
                                <span className={`text-xs font-semibold ${isActive ? 'text-lael-primary/80' : it.highlight ? 'text-lael-accent' : 'text-white/60'}`}>{it.tag}</span>
                              )}
                            </>
                          )}
                        </NavLink>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </nav>

              {/* Acciones fijas */}
              <div className="sticky bottom-0 -mx-6 sm:-mx-8 px-6 sm:px-8 pt-5 pb-2 mt-8 bg-lael-primary border-t border-white/10 relative z-10 space-y-3">
                <a
                  href="/inscripcion"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 w-full bg-lael-accent text-lael-primary min-h-[56px] rounded-2xl text-sm tracking-wider uppercase font-display font-extrabold shadow-xl active:scale-95 transition-all"
                >
                  Inscribirme gratis
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>
                </a>
                <a
                  href="https://wa.me/56964626568?text=Hola!%20Tengo%20una%20consulta%20sobre%20Instituto%20Lael"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full min-h-[48px] rounded-2xl text-sm font-bold text-white border border-white/20"
                >
                  Escribir por WhatsApp
                </a>
                <ThemeToggle className="w-full justify-center" />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}