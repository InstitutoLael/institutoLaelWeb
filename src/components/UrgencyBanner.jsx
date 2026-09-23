import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';

// Aviso superior. Solo información verdadera: nada de cupos o cuentas
// regresivas inventadas.
export default function UrgencyBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      if (!sessionStorage.getItem('lael_banner_hidden')) setIsVisible(true);
    } catch (_) {
      setIsVisible(true);
    }
  }, []);

  const closeBanner = () => {
    setIsVisible(false);
    try { sessionStorage.setItem('lael_banner_hidden', 'true'); } catch (_) {}
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          style={{ backgroundColor: '#D7E400' }}
          className="overflow-hidden relative z-[70] lael-urgency-banner"
        >
          <div className="py-2 px-6 flex items-center justify-center gap-4 text-center relative pr-12">
            <span className="hidden sm:block w-1.5 h-1.5 rounded-full bg-[#071D49] animate-pulse [animation-iteration-count:2] flex-shrink-0" aria-hidden="true" />
            <p className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.06em] leading-tight" style={{ color: '#071D49' }}>
              Verano Lael: cursos en enero, algunos gratis.{' '}
              <Link to="/verano" onClick={closeBanner} className="underline underline-offset-2">Ver cursos</Link>
              <span className="hidden sm:inline opacity-80"> · En marzo partimos de lleno</span>
            </p>
            <button
              type="button"
              onClick={closeBanner}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full transition-colors hover:bg-[#071D49]/10"
              aria-label="Cerrar aviso"
              style={{ color: '#071D49' }}
            >
              <X size={14} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
