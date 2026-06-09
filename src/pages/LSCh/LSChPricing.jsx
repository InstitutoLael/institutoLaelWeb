import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { clp, calculateLschPrice, LSCH_GROUP_PLANS, LSCH_ONE2ONE_PLANS } from '../../data/lsch';
import { track } from '../../utils/analytics';

const ease = [0.16, 1, 0.3, 1];
const WA_NUMBER = '56964626568';

function getPlanLabel(planId) {
  const all = [...LSCH_GROUP_PLANS, ...LSCH_ONE2ONE_PLANS];
  return all.find(p => p.id === planId)?.title ?? planId;
}

export default function LSChPricing({ gateData, selectedPlan, isConnecting, setIsConnecting }) {
  const priceData = calculateLschPrice(selectedPlan);
  const planLabel = getPlanLabel(selectedPlan);

  useEffect(() => { track.pricingView('lsch'); }, []);

  const handleActivate = () => {
    setIsConnecting(true);
    track.whatsappClick('lsch');

    const message =
`Hola, soy ${gateData?.name || '—'}.

Estoy interesado en el programa de Lengua de Señas Chilena de Instituto Lael.

📘 Plan: ${planLabel}
💸 Inversión: ${clp(priceData.price)}${priceData.enrollment ? ` + ${clp(priceData.enrollment)} matrícula` : ' (matrícula incluida)'}

Quiero recibir orientación para comenzar.`;

    const encodedMessage = encodeURIComponent(message);

    try {
      localStorage.setItem(
        `lael_lsch_lead_${Date.now()}`,
        JSON.stringify({
          name: gateData?.name,
          phone: gateData?.phone,
          plan: planLabel,
          price: priceData.price,
          ts: new Date().toISOString(),
        })
      );
    } catch (_) {}

    setTimeout(() => {
      setIsConnecting(false);
      window.open(`https://wa.me/${WA_NUMBER}?text=${encodedMessage}`, '_blank');
    }, 900);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 1.1, ease, delay: 0.3 }}
      className="w-full flex justify-center px-6 mt-24 pb-32 lg:pb-48"
    >
      <div className="w-full max-w-3xl bg-lael-secondary border border-lael-bd rounded-3xl p-12 lg:p-16 text-center relative overflow-hidden cinematic-shadow">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(ellipse_at_center,_rgba(198,166,107,0.07)_0%,_transparent_70%)] pointer-events-none" />

        <div className="relative z-10">
          <p className="text-lael-accent text-[10px] tracking-[0.25em] uppercase mb-8">Plan seleccionado</p>

          <p className="text-lael-muted text-[11px] tracking-[0.15em] uppercase mb-4">{planLabel}</p>

          <p className="text-lael-muted/60 text-[10px] tracking-[0.2em] uppercase mb-3">Inversión mensual</p>
          <p className="font-display text-6xl lg:text-8xl text-lael-light tracking-[-0.03em] font-bold mb-6">
            {clp(priceData.price)}
          </p>

          {priceData.enrollment > 0 ? (
            <p className="text-lael-muted/60 text-[10px] tracking-[0.1em] uppercase mb-10">
              + {clp(priceData.enrollment)} matrícula anual · Primer mes {clp(priceData.price + priceData.enrollment)}
            </p>
          ) : (
            <p className="text-lael-accent/70 text-[10px] tracking-[0.1em] uppercase mb-10">
              Matrícula incluida
            </p>
          )}

          <button
            onClick={handleActivate}
            disabled={isConnecting}
            className="w-full bg-lael-accent text-lael-primary py-6 rounded-xl text-xs tracking-[0.2em] uppercase font-bold transition-all duration-700 hover:scale-[1.02] active:scale-95 shadow-[0_0_30px_rgba(198,166,107,0.2)] hover:shadow-[0_0_60px_rgba(198,166,107,0.5)] relative overflow-hidden h-16"
          >
            <AnimatePresence mode="wait">
              {isConnecting ? (
                <motion.div key="conn" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex items-center justify-center gap-3 absolute inset-0">
                  <span className="w-4 h-4 border-2 border-lael-primary border-t-transparent rounded-full animate-spin" />
                  Conectando con mentor estratégico...
                </motion.div>
              ) : (
                <motion.div key="act" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="absolute inset-0 flex items-center justify-center">
                  Activar mi sistema →
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
