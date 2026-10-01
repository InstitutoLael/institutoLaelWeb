import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Plus } from 'lucide-react';
import LaelLogo from './ui/LaelLogo';
import { NAVIGATION } from '../data/navigation';
import UrgencyBanner from './UrgencyBanner';
import ProgramasDropdown from './ProgramasDropdown';
import ThemeToggle from './ThemeToggle';
import { AUDIENCIAS, HERRAMIENTAS } from '../data/catalogo';

const ease = [0.16, 1, 0.3, 1];

// Menú de celular: enlaces principales en grande y programas por "para quién".
const MENU_GRANDE = [
  { name: 'Inicio', path: '/' },
  { name: 'Preu PAES', path: '/paes' },
  { name: 'Calculadora', path: '/calculadora' },
  { name: 'Nosotros', path: '/nosotros' },
  { name: 'Alumnos', path: '/alumnos' },
  { name: 'Noticias', path: '/noticias' },
  { name: 'Contacto', path: '/contacto' },
];

const MOBILE_MENU = [
  ...AUDIENCIAS.map((a) => ({ title: `Para ${a.title.toLowerCase()}`, grid: true, items: a.items })),
  { title: 'Herramientas gratis', items: HERRAMIENTAS },
  { title: 'Instituto', grid: true, items: [
    { name: 'Nosotros', path: '/nosotros' },
    { name: 'Así se estudia', path: '/metodo' },
    { name: 'Casos reales', path: '/casos-reales' },
    { name: 'Noticias', path: '/noticias' },
    { name: 'Preguntas', path: '/preguntas' },
    { name: 'Contacto', path: '/contacto' },
  ] },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const [bannerHeight, setBannerHeight] = useState(0);
  const burgerRef = useRef(null);
  const drawerRef = useRef(null);

  // Páginas con fondo claro (Navbar fondo blanco/sólido siempre)
  const isLightPage = ['/contacto', '/diagnostico', '/iconos'].includes(location.pathname);

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

  // Menú de celular accesible: foco adentro al abrir, Tab no se escapa,
  // Escape cierra y el foco vuelve al botón de menú.
  useEffect(() => {
    if (!mobileOpen) return undefined;
    const burger = burgerRef.current;
    const t = setTimeout(() => {
      const first = drawerRef.current && drawerRef.current.querySelector('a[href], button');
      if (first) first.focus();
    }, 50);
    const onKey = (e) => {
      if (e.key === 'Escape') { setMobileOpen(false); return; }
      if (e.key !== 'Tab' || !drawerRef.current) return;
      const els = Array.from(drawerRef.current.querySelectorAll('a[href], button:not([disabled])'));
      if (!els.length) return;
      const first = els[0]; const last = els[els.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      else if (!drawerRef.current.contains(document.activeElement)) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      clearTimeout(t);
      document.removeEventListener('keydown', onKey);
      // Si se cerró con Escape o con la X, el foco vuelve al botón de menú.
      // Si se cerró porque cambió la página, el foco ya está en el contenido.
      const a = document.activeElement;
      const drawer = drawerRef.current;
      if (burger && document.body.contains(burger) && (a === document.body || (drawer && drawer.contains(a)))) burger.focus({ preventScroll: true });
    };
  }, [mobileOpen]);

  const isFocusPage =
    location.pathname === '/diagnostico' ||
    location.pathname === '/resultado-diagnostico' ||
    location.pathname.startsWith('/arcade') ||
    location.pathname === '/diegobet';

  // Determinar si mostrar logo claro u oscuro
  const isNavSolid = scrolled || mobileOpen || isLightPage;

  if (isFocusPage) {
    return (
      <header className="fixed left-0 top-0 w-full z-[100] p-4 lg:p-8 flex justify-between items-center pointer-events-none transition-all duration-500">
        <div className="flex items-center gap-4 pointer-events-auto">
          <Link to="/" className="group">
            <LaelLogo variant={isLightPage ? 'marino' : 'blanco'} className={`h-8 lg:h-10 w-auto transition-transform group-hover:scale-105 ${isLightPage ? 'logo-adapt' : ''}`} />
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
            <LaelLogo
              variant={isNavSolid ? 'marino' : 'blanco'}
              className={`w-auto transition-all duration-500 group-hover:scale-105 ${isNavSolid ? 'h-9 xl:h-10 logo-adapt' : 'h-10 xl:h-12'}`}
            />
          </Link>

          {/* ── DESKTOP NAV ──────────────────────────────────────────── */}
          <nav aria-label="Principal" className="hidden xl:flex items-center gap-7">
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
                        : 'text-lael-primary/75 hover:text-lael-primary'
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
              ref={burgerRef}
              type="button"
              onClick={() => setMobileOpen(v => !v)}
              aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={mobileOpen}
              aria-controls="menu-movil"
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

      {/* ── MENÚ DE CELULAR Y TABLET ───────────────────────────────── */}
      {/* Pantalla completa: se abre como cortina desde arriba, con los
          enlaces principales en letra grande y los programas por color. */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            ref={drawerRef}
            id="menu-movil"
            role="dialog"
            aria-modal="true"
            aria-label="Menú"
            initial={{ clipPath: 'inset(0% 0% 100% 0%)' }}
            animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
            exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            data-lenis-prevent
            className="grain fixed inset-0 z-[200] bg-lael-primary text-white overflow-y-auto overscroll-contain"
          >
            <div className="min-h-full max-w-5xl mx-auto px-5 sm:px-10 pt-5 pb-8 flex flex-col">
              <div className="flex items-center justify-between mb-10 sm:mb-14">
                <Link to="/" onClick={() => setMobileOpen(false)}>
                  <LaelLogo variant="blanco" title="Instituto Lael, ir al inicio" className="h-10 w-auto" />
                </Link>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Cerrar menú"
                  className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white hover:text-lael-primary transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <nav aria-label="Menú principal" className="flex-1 grid gap-12 md:grid-cols-2 md:gap-10">
                {/* Enlaces principales en grande */}
                <ul>
                  {MENU_GRANDE.map((it, i) => (
                    <motion.li key={it.path} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 + i * 0.05, duration: 0.6, ease }} className="border-b border-white/10">
                      <NavLink
                        to={it.path}
                        end={it.path === '/'}
                        onClick={() => setMobileOpen(false)}
                        className={({ isActive }) => `group flex items-baseline gap-4 py-3 min-h-[56px] font-display font-extrabold tracking-[-0.03em] text-[2.1rem] sm:text-5xl leading-none transition-colors ${isActive ? 'text-lael-accent' : 'text-white hover:text-lael-accent'}`}
                      >
                        <span className="text-[11px] font-bold tracking-[0.2em] text-white/60 w-6">{String(i + 1).padStart(2, '0')}</span>
                        <span className="transition-transform duration-300 group-hover:translate-x-2">{it.name}</span>
                      </NavLink>
                    </motion.li>
                  ))}
                </ul>

                {/* Programas por "para quién" */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45, duration: 0.5 }} className="space-y-7">
                  {MOBILE_MENU.filter((sec) => sec.title !== 'Instituto').map((sec) => (
                    <div key={sec.title}>
                      <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/70 mb-2">{sec.title}</h2>
                      <ul className="flex flex-wrap gap-2">
                        {sec.items.map((it) => (
                          <li key={it.path}>
                            <NavLink
                              to={it.path}
                              onClick={() => setMobileOpen(false)}
                              className={({ isActive }) => `inline-flex items-center gap-2 min-h-[44px] px-4 rounded-full text-sm font-bold border transition-colors ${isActive ? 'bg-lael-accent text-lael-primary border-lael-accent' : 'border-white/20 text-white hover:bg-white hover:text-lael-primary'}`}
                            >
                              {it.color && <span aria-hidden="true" className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: it.color }} />}
                              {it.name}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </motion.div>
              </nav>

              {/* Acciones */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.5 }} className="mt-12 pt-6 border-t border-white/15 grid sm:grid-cols-3 gap-3">
                <a
                  href="/inscripcion"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 bg-lael-accent text-lael-primary min-h-[56px] rounded-full text-sm tracking-wider uppercase font-display font-extrabold"
                >
                  Inscribirme gratis
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>
                </a>
                <a
                  href="https://wa.me/56964626568?text=Hola!%20Tengo%20una%20consulta%20sobre%20Instituto%20Lael"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 min-h-[56px] rounded-full text-sm font-bold text-white border border-white/25 hover:bg-white/10"
                >
                  Escribir por WhatsApp
                </a>
                <ThemeToggle className="w-full justify-center min-h-[56px] rounded-full" />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}