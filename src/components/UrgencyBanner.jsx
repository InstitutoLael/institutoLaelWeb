import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, X } from 'lucide-react';
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
          className="bg-lael-rust text-white overflow-hidden relative z-[70] lael-urgency-banner"
        >
          <div className="py-2 px-6 flex items-center justify-center gap-4 text-center relative pr-12">
            <AlertCircle size={14} className="hidden sm:block flex-shrink-0" />
            <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.1em] leading-tight">
              Quedan <span className="bg-white text-lael-rust px-1.5 py-0.5 rounded mx-1">{spots} cupos</span> 
              para el ciclo que inicia este lunes. Si no entras ahora, pierdes 7 días de avance real.
            </p>
            <div className="hidden lg:flex items-center gap-2 ml-4 pl-4 border-l border-white/20">
              <span className="text-[8px] opacity-70 uppercase tracking-tighter">Cierre en:</span>
              <span className="text-[10px] font-mono font-bold">{time}</span>
            </div>

            <button 
              onClick={closeBanner}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-white/10 rounded-full transition-colors"
              aria-label="Cerrar aviso"
            >
              <X size={14} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
