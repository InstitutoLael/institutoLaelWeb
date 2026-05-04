import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import logo from '../assets/img/Logos/lael-inst-blanco.png';
import { NAVIGATION } from '../data/navigation';

const ease = [0.16, 1, 0.3, 1];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Scroll detection
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#0B0B0B]/70 backdrop-blur-3xl border-b border-white/[0.04] py-2 shadow-[0_4px_40px_rgba(0,0,0,0.4)]'
          : 'bg-transparent border-b border-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-10">

        {/* ── LOGO ───────────────────────────────────────────────────── */}
        <Link to="/" className="z-[60] relative group flex-shrink-0">
          <img
            src={logo}
            alt="Instituto Lael"
            fetchpriority="high"
            loading="eager"
            width="140"
            height="40"
            className="h-7 lg:h-8 w-auto object-contain transition-all duration-500 group-hover:drop-shadow-[0_0_12px_rgba(198,166,107,0.5)]"
          />
        </Link>

        {/* ── DESKTOP NAV ────────────────────────────────────────────── */}
        <nav className="hidden lg:flex items-center gap-10">
          {NAVIGATION.main.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `relative text-[12px] tracking-[0.12em] uppercase font-medium transition-all duration-300 group ${
                  isActive ? 'text-lael-accent' : 'text-lael-muted hover:text-lael-light'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {link.name}
                  {/* Animated underline */}
                  <span
                    className={`absolute -bottom-1 left-0 h-px bg-lael-accent transition-all duration-500 ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* ── RIGHT: CTA + BURGER ────────────────────────────────────── */}
        <div className="flex items-center gap-4 z-[60]">
          <a
            href={NAVIGATION.action.whatsapp.url}
            target="_blank"
            rel="noreferrer"
            className="hidden lg:inline-flex items-center bg-lael-accent/10 border border-lael-accent/30 text-lael-accent px-5 py-2.5 rounded-lg text-[11px] tracking-[0.15em] uppercase font-bold hover:bg-lael-accent hover:text-lael-primary transition-all duration-500"
          >
            {NAVIGATION.action.whatsapp.label}
          </a>

          <button
            onClick={() => setMobileOpen(v => !v)}
            aria-label="Toggle menu"
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg bg-white/[0.04] border border-white/[0.08] text-lael-muted hover:text-lael-light transition-all active:scale-95"
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileOpen ? (
                <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <X size={18} />
                </motion.div>
              ) : (
                <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <Menu size={18} />
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
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.45, ease }}
            className="fixed inset-0 bg-[#080808] z-[49] flex flex-col items-center justify-center"
          >
            {/* Subtle glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-lael-accent/[0.03] rounded-full blur-[100px] pointer-events-none" />

            <nav className="flex flex-col items-center gap-10 relative z-10">
              {NAVIGATION.main.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.07, ease }}
                >
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `font-display text-4xl lg:text-5xl font-bold transition-all duration-300 ${
                        isActive ? 'text-lael-accent' : 'text-lael-muted/50 hover:text-lael-light'
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                </motion.div>
              ))}
            </nav>

            {/* CTA at bottom */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4, ease }}
              className="absolute bottom-12 left-0 right-0 flex justify-center px-6"
            >
              <a
                href={NAVIGATION.action.whatsapp.url}
                target="_blank"
                rel="noreferrer"
                className="w-full max-w-sm bg-lael-accent text-lael-primary py-4 rounded-xl text-[11px] tracking-[0.2em] uppercase font-bold text-center hover:scale-[1.02] transition-all duration-500 shadow-[0_0_30px_rgba(198,166,107,0.25)]"
              >
                {NAVIGATION.action.whatsapp.label}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}