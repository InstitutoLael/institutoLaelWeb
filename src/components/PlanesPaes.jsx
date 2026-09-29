import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { PAES_PLANS, PAES_FORM_URL } from '../data/paes';

// Planes del preu PAES. En computador se ven los tres lado a lado; en
// celular, con pestañas arriba, para comparar sin bajar tarjeta por tarjeta.
const BTN = 'min-h-[48px] inline-flex items-center justify-center gap-2 font-display font-extrabold text-xs sm:text-sm uppercase tracking-wider px-8 py-4 rounded-2xl transition-all active:scale-95';

function Plan({ plan }) {
  const f = plan.featured;
  return (
    <div className={`relative h-full rounded-[28px] p-6 sm:p-8 flex flex-col border ${f ? 'bg-[#071D49] border-[#071D49] text-white shadow-lael' : 'bg-white border-[#071D49]/5 text-[#071D49] shadow-card'}`}>
      {f && <span className="absolute -top-3.5 left-6 sm:left-8 bg-[#D7E400] text-[#071D49] text-[11px] font-black uppercase tracking-wider px-3 py-1.5 rounded-full shadow-md">Más conveniente</span>}
      <h3 className="font-display text-xl font-extrabold tracking-tight mb-1">{plan.name}</h3>
      <p className={`text-sm leading-relaxed mb-4 ${f ? 'text-white/75' : 'text-[#071D49]/70'}`}>{plan.desc}</p>
      <p className={`mb-5 pb-5 border-b ${f ? 'border-white/10' : 'border-[#071D49]/10'}`}>
        <span className={`font-display text-4xl md:text-3xl lg:text-4xl font-extrabold leading-none tracking-tight ${f ? 'text-[#D7E400]' : ''}`}>{plan.priceLabel}</span>
        <span className={`text-sm font-semibold ml-1 ${f ? 'text-white/75' : 'text-[#071D49]/70'}`}>{plan.period}</span>
      </p>
      <ul className="space-y-2.5 mb-6 flex-grow">
        {plan.features.map((t) => (
          <li key={t} className="flex items-start gap-2 text-sm leading-snug">
            <CheckCircle2 size={18} className={`flex-shrink-0 ${f ? 'text-[#D7E400]' : 'text-[#071D49]'}`} aria-hidden="true" />
            <span className={f ? 'text-white/85' : 'text-[#071D49]/80'}>{t}</span>
          </li>
        ))}
      </ul>
      <a href={PAES_FORM_URL} className={`${BTN} w-full ${f ? 'bg-[#D7E400] text-[#071D49] hover:bg-white' : 'bg-[#071D49] text-white hover:bg-[#0B2A66]'}`}>
        Inscribirme <ArrowRight size={16} />
      </a>
    </div>
  );
}

export default function PlanesPaes() {
  const inicial = Math.max(0, PAES_PLANS.findIndex((p) => p.featured));
  const [tab, setTab] = useState(inicial);

  return (
    <>
      {/* Celular: pestañas */}
      <div className="md:hidden">
        <div role="tablist" aria-label="Planes PAES" className="grid grid-cols-3 gap-1 p-1 rounded-2xl bg-white border border-[#071D49]/10 mb-6">
          {PAES_PLANS.map((p, i) => (
            <button
              key={p.id}
              type="button"
              role="tab"
              id={`tab-plan-${p.id}`}
              aria-selected={tab === i}
              aria-controls={`panel-plan-${p.id}`}
              onClick={() => setTab(i)}
              className={`relative min-h-[48px] rounded-xl text-xs font-bold leading-tight px-1 ${tab === i ? 'text-white' : 'text-[#071D49]'}`}
            >
              {tab === i && <motion.span layoutId="plan-tab" className="absolute inset-0 rounded-xl bg-[#071D49]" transition={{ type: 'spring', stiffness: 420, damping: 34 }} />}
              <span className="relative block">{p.name}</span>
              <span className={`relative block font-normal mt-0.5 ${tab === i ? 'text-[#D7E400]' : 'text-[#071D49]/60'}`}>{p.priceLabel}</span>
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={PAES_PLANS[tab].id}
            role="tabpanel"
            id={`panel-plan-${PAES_PLANS[tab].id}`}
            aria-labelledby={`tab-plan-${PAES_PLANS[tab].id}`}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.2 }}
            className="pt-3"
          >
            <Plan plan={PAES_PLANS[tab]} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Computador: los tres juntos */}
      <div className="hidden md:grid grid-cols-3 gap-6 items-stretch pt-3">
        {PAES_PLANS.map((p) => (
          <div key={p.id} className={p.featured ? 'md:-translate-y-3' : ''}><Plan plan={p} /></div>
        ))}
      </div>
    </>
  );
}
