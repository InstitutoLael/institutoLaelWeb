import React from 'react';
import { motion } from 'framer-motion';

const ease = [0.16, 1, 0.3, 1];

export default function ProgressBar({ step }) {
  const steps = [
    { id: 1, label: 'Diagnóstico' },
    { id: 2, label: 'Estrategia' },
    { id: 3, label: 'Activación' }
  ];

  return (
    <div className="sticky top-20 z-40 w-full bg-[#0B0B0B]/80 backdrop-blur-2xl border-b border-white/[0.02] py-6">
      <div className="max-w-3xl mx-auto px-6 lg:px-12 relative flex items-center justify-between">
        {/* Background Line */}
        <div className="absolute left-6 right-6 lg:left-12 lg:right-12 top-1/2 -translate-y-1/2 h-[0.5px] bg-white/[0.03] -z-10" />
        
        {/* Progress Line */}
        <motion.div 
          className="absolute left-6 lg:left-12 top-1/2 -translate-y-1/2 h-[0.5px] bg-lael-accent -z-10 origin-left"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: step === 1 ? 0 : step === 2 ? 0.5 : 1 }}
          transition={{ duration: 1.2, ease }}
        />

        {steps.map((s) => {
          const isActive = step >= s.id;
          const isCurrent = step === s.id;
          
          return (
            <div key={s.id} className="flex flex-col items-center gap-3 bg-[#0B0B0B] px-4">
              <div className={`w-1.5 h-1.5 rounded-full transition-all duration-700 ${isActive ? 'bg-lael-accent shadow-[0_0_8px_rgba(198,166,107,0.8)]' : 'bg-white/10'}`} />
              <span className={`text-[10px] tracking-[0.2em] uppercase transition-colors duration-700 ${isCurrent ? 'text-lael-accent font-bold' : isActive ? 'text-lael-light' : 'text-lael-muted/30'}`}>
                {s.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
