import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { getTimeUntilNextCycle, getRemainingSpots } from '../utils/urgency';

export default function UrgencyBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const time = getTimeUntilNextCycle();
  const spots = getRemainingSpots();

  useEffect(() => {
    const hidden = sessionStorage.getItem('lael_urgency_hidden');
    if (!hidden) setIsVisible(true);
  }, []);

  const closeBanner = () => {
    setIsVisible(false);
    sessionStorage.setItem('lael_urgency_hidden', 'true');
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
            {/* Dot animado */}
            <span className="hidden sm:block w-1.5 h-1.5 rounded-full bg-[#071D49] animate-pulse flex-shrink-0" />

            <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.12em] leading-tight" style={{ color: '#071D49' }}>
              Quedan{' '}
              <span className="bg-[#071D49] text-[#D7E400] px-1.5 py-0.5 rounded mx-1">
                {spots} cupos
              </span>{' '}
              para el próximo ciclo PAES.{' '}
              <span className="opacity-70">Sin costo · 100% online</span>
            </p>

            <div className="hidden lg:flex items-center gap-2 ml-4 pl-4 border-l border-[#071D49]/20">
              <span className="text-[8px] opacity-50 uppercase tracking-tighter" style={{ color: '#071D49' }}>Cierre en:</span>
              <span className="text-[10px] font-mono font-bold" style={{ color: '#071D49' }}>{time}</span>
            </div>

            <button
              onClick={closeBanner}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full transition-colors hover:bg-[#071D49]/10"
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
