import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { clp } from '../../data/paes';

const ease = [0.16, 1, 0.3, 1];

// PricingBlock is the "consequence" — it arrives last, with most weight
// Delay is handled here, outside SystemReveal, so it truly comes after modules
export default function PricingBlock({ gateData, selectedModules, priceData, isConnecting, setIsConnecting, setStep }) {
  const handleActivateSystem = () => {
    setIsConnecting(true);
    setTimeout(() => {
      setStep(3);
      setIsConnecting(false);
    }, 1800);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30, filter: 'blur(4px)' }}
      transition={{ duration: 1.1, ease, delay: 0.3 }}
      className="w-full flex justify-center pb-32 lg:pb-48 px-6 mt-24"
    >
      <div className="w-full max-w-3xl bg-[#0B0B0B] border border-lael-accent/20 rounded-3xl p-12 lg:p-16 text-center relative overflow-hidden shadow-[0_0_80px_rgba(198,166,107,0.05)]">

        {/* Radial glow behind pricing */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(ellipse_at_center,_rgba(198,166,107,0.08)_0%,_transparent_70%)] pointer-events-none" />

        <div className="relative z-10">
          <p className="text-lael-accent text-[10px] tracking-[0.25em] uppercase mb-10">Tu sistema confirmado</p>

          {/* Module list */}
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {selectedModules.map(m => (
              <span key={m} className="text-[10px] tracking-[0.15em] text-lael-muted/70 border border-white/10 px-3 py-1 rounded-full uppercase">
                {m}
              </span>
            ))}
          </div>

          {/* Price — dominant */}
          <div className="mb-12">
            <p className="text-lael-muted/40 text-[10px] tracking-[0.2em] uppercase mb-3">Inversión mensual</p>
            <p className="font-display text-6xl lg:text-8xl text-lael-light tracking-[-0.03em] font-bold">
              {clp(priceData?.monthly ?? 0)}
            </p>
            {priceData?.hasDiscount && (
              <p className="text-lael-accent text-[11px] tracking-[0.1em] mt-3">
                {priceData.discountLabel}
              </p>
            )}
          </div>

          {/* CTA */}
          <button
            onClick={handleActivateSystem}
            disabled={isConnecting}
            className="w-full bg-lael-accent text-lael-primary py-6 rounded-xl text-xs tracking-[0.2em] uppercase font-bold transition-all duration-700 hover:scale-[1.02] active:scale-95 shadow-[0_0_30px_rgba(198,166,107,0.2)] hover:shadow-[0_0_60px_rgba(198,166,107,0.5)] flex items-center justify-center relative overflow-hidden h-16"
          >
            <AnimatePresence mode="wait">
              {isConnecting ? (
                <motion.div
                  key="connecting"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, ease }}
                  className="flex items-center justify-center gap-3 absolute"
                >
                  <span className="w-4 h-4 border-2 border-lael-primary border-t-transparent rounded-full animate-spin" />
                  Conectando con un mentor...
                </motion.div>
              ) : (
                <motion.div
                  key="activate"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, ease }}
                  className="absolute"
                >
                  Activar mi rendimiento
                </motion.div>
              )}
            </AnimatePresence>
          </button>

          <p className="mt-8 text-[10px] text-lael-muted/40 tracking-[0.1em] uppercase">
            Sin compromiso de permanencia · Cancela cuando quieras
          </p>
        </div>
      </div>
    </motion.div>
  );
}
