import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import { getTimeUntilNextCycle, getRemainingSpots } from '../utils/urgency';

export default function UrgencyBanner() {
  const time = getTimeUntilNextCycle();
  const spots = getRemainingSpots();

  return (
    <motion.div 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-lael-rust text-white py-3 px-6 flex items-center justify-center gap-4 relative z-[100] text-center"
    >
      <AlertCircle size={16} className="hidden sm:block" />
      <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.1em]">
        Quedan <span className="bg-white text-lael-rust px-1.5 py-0.5 rounded ml-1 mr-1">{spots} cupos</span> 
        para el ciclo que inicia este lunes. Si no entras ahora, pierdes 7 días de avance real.
      </p>
      <div className="hidden lg:flex items-center gap-2 ml-4 pl-4 border-l border-white/20">
        <span className="text-[9px] opacity-70">Cierre en:</span>
        <span className="text-[10px] font-mono">{time}</span>
      </div>
    </motion.div>
  );
}
