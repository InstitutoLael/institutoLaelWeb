import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { clp, PAES_SUBJECTS } from '../../data/paes';
import { track } from '../../utils/analytics';

const ease = [0.16, 1, 0.3, 1];

// WhatsApp number — Instituto Lael
const WA_NUMBER = '56964626568';

export default function PricingBlock({ gateData, selectedModules, priceData, isConnecting, setIsConnecting, setStep }) {

  // Track pricing view (high-intent signal)
  useEffect(() => { track.pricingView('paes'); }, []);

  const handleActivateSystem = () => {
    setIsConnecting(true);
    track.whatsappClick('paes');

    // Resolve human-readable module names from IDs
    const moduleNames = selectedModules
      .map(id => {
        const mod = PAES_SUBJECTS.find(s => s.id === id);
        return mod?.name ?? id;
      })
      .join(', ');

    // Premium conversion message
    const message =
`Hola, soy ${gateData.name}.

Acabo de completar mi diagnóstico en Instituto Lael y quiero activar mi sistema de preparación PAES.

🎯 Objetivo: ${gateData.score || 'A definir'}
🧠 Pruebas seleccionadas: ${moduleNames}
💸 Inversión mensual: ${clp(priceData?.totalMonthly ?? 0)}

Me gustaría avanzar al siguiente paso con un mentor.`;

    const encodedMessage = encodeURIComponent(message);

    // Persist lead locally (conversion tracking)
    try {
      localStorage.setItem(
        `lael_lead_${Date.now()}`,
        JSON.stringify({
          name: gateData.name,
          phone: gateData.phone,
          score: gateData.score,
          modules: moduleNames,
          total: priceData?.totalMonthly ?? 0,
          ts: new Date().toISOString(),
        })
      );
    } catch (_) {}

    setTimeout(() => {
      setIsConnecting(false);
      setStep(3);
      window.open(`https://wa.me/${WA_NUMBER}?text=${encodedMessage}`, '_blank');
    }, 900);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30, filter: 'blur(4px)' }}
      transition={{ duration: 1.1, ease, delay: 0.3 }}
      className="w-full flex justify-center pb-32 lg:pb-48 px-6 mt-24"
    >
      <div className="w-full max-w-3xl bg-lael-secondary border border-lael-bd rounded-3xl p-12 lg:p-16 text-center relative overflow-hidden cinematic-shadow">

        {/* Radial glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(ellipse_at_center,_rgba(198,166,107,0.07)_0%,_transparent_70%)] pointer-events-none" />

        <div className="relative z-10">
          <p className="text-lael-accent text-[10px] tracking-[0.25em] uppercase mb-10">Tu sistema confirmado</p>

          {/* Selected module pills */}
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {selectedModules.map(id => {
              const mod = PAES_SUBJECTS.find(s => s.id === id);
              return (
                <span key={id} className="text-[10px] tracking-[0.12em] text-lael-accent border border-lael-accent/30 px-3 py-1 rounded-full uppercase bg-lael-accent/5 font-bold">
                  {mod?.name ?? id}
                </span>
              );
            })}
          </div>

          {/* Package label */}
          {priceData?.label && (
            <p className="text-lael-muted text-[11px] tracking-[0.15em] uppercase mb-4">
              {priceData.label}
            </p>
          )}

          {/* Price — dominant */}
          <div className="mb-4">
            <p className="text-lael-muted/60 text-[10px] tracking-[0.2em] uppercase mb-3">Inversión mensual</p>
            <p className="font-display text-6xl lg:text-8xl text-lael-light tracking-[-0.03em] font-bold">
              {clp(priceData?.totalMonthly ?? 0)}
            </p>
          </div>

          {/* Savings badge */}
          {priceData?.saving > 0 && (
            <p className="text-lael-accent text-[11px] tracking-[0.1em] mb-12">
              Ahorras {clp(priceData.saving)} respecto a contratar módulos individuales
            </p>
          )}

          {/* First month breakdown */}
          <p className="text-lael-muted/60 text-[10px] tracking-[0.1em] uppercase mb-12">
            Primer mes: {clp(priceData?.totalFirstMonth ?? 0)} (incluye matrícula)
          </p>

          {/* CTA */}
          <button
            onClick={handleActivateSystem}
            disabled={isConnecting}
            className="w-full bg-lael-accent text-lael-primary py-6 rounded-xl text-xs tracking-[0.2em] uppercase font-bold transition-all duration-700 hover:scale-[1.02] active:scale-95 shadow-[0_0_30px_rgba(198,166,107,0.2)] hover:shadow-[0_0_60px_rgba(198,166,107,0.5)] relative overflow-hidden h-16"
          >
            <AnimatePresence mode="wait">
              {isConnecting ? (
                <motion.div
                  key="connecting"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, ease }}
                  className="flex items-center justify-center gap-3 absolute inset-0"
                >
                  <span className="w-4 h-4 border-2 border-lael-primary border-t-transparent rounded-full animate-spin" />
                  Conectando con mentor estratégico...
                </motion.div>
              ) : (
                <motion.div
                  key="activate"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, ease }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  Activar sistema de rendimiento →
                </motion.div>
              )}
            </AnimatePresence>
          </button>

          <p className="mt-8 text-[10px] text-lael-muted/60 tracking-[0.1em] uppercase">
            Sin permanencia mínima · Cancela cuando quieras
          </p>
        </div>
      </div>
    </motion.div>
  );
}
