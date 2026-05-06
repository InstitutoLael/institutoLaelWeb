import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const FAQS = [
  {
    q: "¿Y si no tengo plata?",
    a: "No importa. El entrenamiento PAES en Lael es 100% gratuito. Nuestra misión es que el dinero no sea el motivo por el que no entras a la carrera que quieres. Para los otros mundos (Idiomas o LSCh), tenemos opciones flexibles, pero PAES es costo $0 para siempre."
  },
  {
    q: "¿Y si no tengo tiempo?",
    a: "Nadie tiene tiempo, el tiempo se hace. Nuestras clases son intensas y al grano. No te pedimos 5 horas al día, te pedimos un par de horas de esfuerzo real. Si tienes tiempo para ver reels, tienes tiempo para asegurar tu futuro."
  },
  {
    q: "¿Y si ya fallé antes?",
    a: "Mejor. Significa que ya sabes lo que no funciona. La mayoría falla porque intenta memorizar en vez de entrenar. Aquí no repetimos materia, detectamos por qué te equivocas y corregimos el error antes de la prueba real."
  },
  {
    q: "¿De verdad me va a resultar?",
    a: "Si vienes a las clases, haces los ensayos y sigues el plan, es casi imposible que no mejores. Esto no es magia, es entrenamiento guiado por profes que saben exactamente lo que la prueba pide."
  }
];

export default function ObjectionsFAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="w-full max-w-4xl mx-auto py-24 px-6">
      <div className="text-center mb-16">
        <p className="text-lael-accent text-[10px] tracking-[0.4em] uppercase mb-4 font-bold">Respuestas Directas</p>
        <h2 className="font-display text-4xl lg:text-5xl text-lael-light font-bold">Hablemos claro.</h2>
      </div>

      <div className="space-y-4">
        {FAQS.map((faq, i) => (
          <div key={i} className="border-b border-lael-bd">
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full py-8 flex items-center justify-between text-left group"
            >
              <h3 className={`font-display text-xl lg:text-2xl transition-colors duration-300 ${openIndex === i ? 'text-lael-accent' : 'text-lael-light group-hover:text-lael-accent/70'}`}>
                {faq.q}
              </h3>
              <div className={`p-2 rounded-full border transition-all duration-300 ${openIndex === i ? 'bg-lael-accent border-lael-accent text-white rotate-180' : 'bg-lael-secondary border-lael-bd text-lael-muted'}`}>
                {openIndex === i ? <Minus size={16} /> : <Plus size={16} />}
              </div>
            </button>

            <AnimatePresence>
              {openIndex === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="text-lael-muted text-base lg:text-lg leading-relaxed pb-10 max-w-3xl">
                    {faq.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}
