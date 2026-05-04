import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { clp } from '../../data/paes';

const ease = [0.16, 1, 0.3, 1];

export default function PricingBlock({ gateData, selectedModules, priceData, isConnecting, setIsConnecting, setStep }) {
  const handleActivateSystem = () => {
    setIsConnecting(true);
    setTimeout(() => {
      setIsConnecting(false);
      setStep(3);
      setTimeout(() => {
        document.getElementById('activacion-layer')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }, 800);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.8, ease }}
      className="w-full mt-24 flex justify-center pb-32 lg:pb-48"
    >
      <div className="w-full max-w-3xl bg-[#0B0B0B] border border-lael-accent/20 rounded-3xl p-12 lg:p-16 text-center relative overflow-hidden shadow-[0_0_80px_rgba(198,166,107,0.05)]">
        {/* Glow behind */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(ellipse_at_center,_rgba(198,166,107,0.08)_0%,_transparent_70%)] pointer-events-none" />

        <div className="relative z-10">
          <p className="text-lael-accent text-[11px] tracking-[0.3em] uppercase font-bold mb-6">
            {priceData.label}
          </p>
          
          <div className="flex flex-col items-center justify-center mb-10">
            <span className="text-6xl lg:text-8xl tracking-[-0.03em] font-display font-bold text-lael-light">
              {clp(priceData.totalMonthly)}
            </span>
            <span className="text-lael-muted/50 text-[11px] tracking-[0.2em] uppercase mt-4">Inversión mensual</span>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 mb-12 text-sm text-lael-muted/80">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-lael-accent" />
              <span>{priceData.count} Módulos Activos</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-lael-accent" />
              <span>Matrícula inicial: {clp(priceData.enrollment)}</span>
            </div>
          </div>

          <button 
            onClick={handleActivateSystem} 
            disabled={isConnecting}
            className="w-full bg-lael-accent text-lael-primary py-6 rounded-xl text-xs tracking-[0.2em] uppercase font-bold transition-all duration-700 hover:scale-[1.02] active:scale-95 shadow-[0_0_30px_rgba(198,166,107,0.2)] hover:shadow-[0_0_60px_rgba(198,166,107,0.5)] flex items-center justify-center gap-3 relative overflow-hidden h-16"
          >
            <AnimatePresence mode="wait">
              {isConnecting ? (
                <motion.div 
                  key="connecting"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center justify-center gap-3 absolute"
                >
                  <span className="w-4 h-4 border-2 border-lael-primary border-t-transparent rounded-full animate-spin"></span>
                  Conectando con un mentor...
                </motion.div>
              ) : (
                <motion.div 
                  key="activate"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute"
                >
                  Activar mi rendimiento
                </motion.div>
              )}
            </AnimatePresence>
          </button>
          
          <p className="mt-8 text-[10px] text-lael-muted/40 tracking-[0.1em] uppercase">
            Pausar o ajustar sistema en cualquier momento.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
