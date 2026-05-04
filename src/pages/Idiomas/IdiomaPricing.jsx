import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { clp, LANGUAGES } from '../../data/idiomas';

const ease = [0.16, 1, 0.3, 1];
const WA_NUMBER = '56964626568';

export default function IdiomaPricing({ gateData, selectedLanguages, priceData, isConnecting, setIsConnecting }) {
  const handleActivate = () => {
    setIsConnecting(true);

    const langNames = selectedLanguages
      .map(id => LANGUAGES.find(l => l.id === id)?.name ?? id)
      .join(', ');

    const message =
`Hola, soy ${gateData?.name || '—'}.

Quiero activar mi programa de idiomas en Instituto Lael.

🌍 Idiomas: ${langNames}
💸 Inversión mensual: ${clp(priceData?.totalMonthly ?? 0)}

Quiero que me orienten para comenzar.`;

    const encodedMessage = encodeURIComponent(message);

    try {
      localStorage.setItem(
        `lael_idiomas_lead_${Date.now()}`,
        JSON.stringify({
          name: gateData?.name,
          phone: gateData?.phone,
          languages: langNames,
          total: priceData?.totalMonthly ?? 0,
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
      className="w-full flex justify-center pb-32 lg:pb-48 px-6 mt-24"
    >
      <div className="w-full max-w-3xl bg-[#0B0B0B] border border-lael-accent/20 rounded-3xl p-12 lg:p-16 text-center relative overflow-hidden shadow-[0_0_80px_rgba(198,166,107,0.05)]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(ellipse_at_center,_rgba(198,166,107,0.07)_0%,_transparent_70%)] pointer-events-none" />

        <div className="relative z-10">
          <p className="text-lael-accent text-[10px] tracking-[0.25em] uppercase mb-8">Programa configurado</p>

          {/* Selected language pills */}
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {selectedLanguages.map(id => {
              const lang = LANGUAGES.find(l => l.id === id);
              return (
                <span key={id} className="text-[10px] tracking-[0.12em] text-lael-muted/60 border border-white/10 px-3 py-1 rounded-full uppercase">
                  {lang?.name ?? id}
                </span>
              );
            })}
          </div>

          {priceData?.label && (
            <p className="text-lael-muted/40 text-[11px] tracking-[0.15em] uppercase mb-4">{priceData.label}</p>
          )}

          <p className="text-lael-muted/40 text-[10px] tracking-[0.2em] uppercase mb-3">Inversión mensual</p>
          <p className="font-display text-6xl lg:text-8xl text-lael-light tracking-[-0.03em] font-bold mb-4">
            {clp(priceData?.totalMonthly ?? 0)}
          </p>

          {priceData?.saving > 0 && (
            <p className="text-lael-accent text-[11px] tracking-[0.1em] mb-8">
              Ahorras {clp(priceData.saving)} respecto a programas individuales
            </p>
          )}

          {priceData?.pricePerLanguage > 0 && (
            <p className="text-lael-muted/30 text-[10px] tracking-[0.1em] uppercase mb-10">
              {clp(priceData.pricePerLanguage)} por idioma · Primer mes {clp(priceData.totalFirstMonth)}
            </p>
          )}

          <button
            onClick={handleActivate}
            disabled={isConnecting}
            className="w-full bg-lael-accent text-lael-primary py-6 rounded-xl text-xs tracking-[0.2em] uppercase font-bold transition-all duration-700 hover:scale-[1.02] active:scale-95 shadow-[0_0_30px_rgba(198,166,107,0.2)] hover:shadow-[0_0_60px_rgba(198,166,107,0.5)] relative overflow-hidden h-16"
          >
            <AnimatePresence mode="wait">
              {isConnecting ? (
                <motion.div key="connecting" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex items-center justify-center gap-3 absolute inset-0">
                  <span className="w-4 h-4 border-2 border-lael-primary border-t-transparent rounded-full animate-spin" />
                  Conectando con mentor estratégico...
                </motion.div>
              ) : (
                <motion.div key="activate" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="absolute inset-0 flex items-center justify-center">
                  Activar mi programa →
                </motion.div>
              )}
            </AnimatePresence>
          </button>

          <p className="mt-8 text-[10px] text-lael-muted/30 tracking-[0.1em] uppercase">
            Sin permanencia mínima · Cancela cuando quieras
          </p>
        </div>
      </div>
    </motion.div>
  );
}
