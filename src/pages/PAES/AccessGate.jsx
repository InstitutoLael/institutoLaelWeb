import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Timing constants ---
const ease = [0.16, 1, 0.3, 1];

// Gate fades/blurs/shrinks when locked — feels "closed out of the system"
const gateVariants = {
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    filter: 'blur(0px)',
  },
  locked: {
    opacity: 0.08,
    scale: 0.93,
    y: 30,
    filter: 'blur(6px)',
  },
};

export default function AccessGate({ step, gateData, setGateData, setStep }) {
  const [isPending, setIsPending] = useState(false); // visual "validating" state

  const handleSubmit = (e) => {
    e.preventDefault();
    if (gateData.name && gateData.phone && !isPending) {
      setIsPending(true); // trigger button text swap immediately
      // micro‑pause: feels like "system is validating access"
      setTimeout(() => {
        setStep(2);
        // additional delay before scroll so reveal has time to mount
        setTimeout(() => {
          document.getElementById('estrategia-layer')?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }, 150);
      }, 400);
    }
  };

  const isLocked = step > 1;

  return (
    <motion.section
      className="w-full px-6 pb-32 lg:pb-48 flex justify-center"
      variants={gateVariants}
      initial="visible"
      animate={isLocked ? 'locked' : 'visible'}
      transition={{ duration: 1.1, ease }}
      style={{ pointerEvents: isLocked ? 'none' : 'auto' }}
    >
      <div className="w-full max-w-xl bg-[#050505]/60 backdrop-blur-2xl rounded-2xl p-8 lg:p-16 border border-white/[0.01] shadow-[0_0_80px_rgba(0,0,0,0.6)]">

        <div className="text-center mb-12">
          <h2 className="font-display text-2xl lg:text-3xl text-lael-light mb-2">Fase de Ingreso</h2>
          <p className="text-lael-accent text-[11px] tracking-[0.2em] uppercase">Desbloquea tu sistema</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] text-lael-muted/50 tracking-[0.2em] uppercase ml-4">Nombre Completo</label>
            <input
              type="text"
              required
              value={gateData.name}
              onChange={e => setGateData({ ...gateData, name: e.target.value })}
              disabled={isLocked}
              className="w-full bg-transparent border-b border-white/10 px-4 py-3 text-lael-light focus:outline-none focus:border-lael-accent focus:shadow-[0_10px_20px_-10px_rgba(198,166,107,0.1)] transition-all duration-500 placeholder:text-white/10"
              placeholder="Ingresa tu nombre..."
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] text-lael-muted/50 tracking-[0.2em] uppercase ml-4">WhatsApp (Contacto directo)</label>
            <input
              type="tel"
              required
              value={gateData.phone}
              onChange={e => setGateData({ ...gateData, phone: e.target.value })}
              disabled={isLocked}
              className="w-full bg-transparent border-b border-white/10 px-4 py-3 text-lael-light focus:outline-none focus:border-lael-accent focus:shadow-[0_10px_20px_-10px_rgba(198,166,107,0.1)] transition-all duration-500 placeholder:text-white/10"
              placeholder="+56 9..."
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] text-lael-muted/50 tracking-[0.2em] uppercase ml-4">Puntaje Objetivo</label>
            <input
              type="text"
              value={gateData.score}
              onChange={e => setGateData({ ...gateData, score: e.target.value })}
              disabled={isLocked}
              className="w-full bg-transparent border-b border-white/10 px-4 py-3 text-lael-light focus:outline-none focus:border-lael-accent focus:shadow-[0_10px_20px_-10px_rgba(198,166,107,0.1)] transition-all duration-500 placeholder:text-white/10"
              placeholder="Ej: 850 (Opcional)"
            />
          </div>

          <div className="pt-8">
            <button
              type="submit"
              disabled={isLocked || isPending}
              className="w-full bg-lael-accent/10 border border-lael-accent/30 text-lael-accent py-5 rounded-lg text-[11px] tracking-[0.2em] uppercase font-bold hover:bg-lael-accent hover:text-lael-primary hover:shadow-[0_0_30px_rgba(198,166,107,0.3)] transition-all duration-500 relative overflow-hidden h-[54px]"
            >
              <AnimatePresence mode="wait">
                {isLocked ? (
                  <motion.div
                    key="locked"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.5, ease }}
                    className="absolute inset-0 flex items-center justify-center tracking-[0.25em]"
                  >
                    ✓ Acceso Concedido
                  </motion.div>
                ) : isPending ? (
                  <motion.div
                    key="pending"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4, ease }}
                    className="absolute inset-0 flex items-center justify-center gap-3"
                  >
                    <span className="w-3 h-3 border border-lael-accent border-t-transparent rounded-full animate-spin" />
                    Validando sistema...
                  </motion.div>
                ) : (
                  <motion.div
                    key="unlocked"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4, ease }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    Ver mi estrategia
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
            <p className="mt-6 text-center text-[10px] text-lael-muted/40 tracking-wider">
              No es inscripción. Es el inicio de tu diagnóstico estratégico.
            </p>
          </div>
        </form>
      </div>
    </motion.section>
  );
}
