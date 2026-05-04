import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const FAQS = [
  {
    q: "¿Y si no tengo plata?",
    a: "Entendemos que la educación es una inversión. Por eso creamos el Plan Mensual Flexible: sin contratos de permanencia eterna. Si el sistema no te da valor el primer mes, puedes pausar sin explicaciones. Pero recuerda: el costo de no mejorar tu puntaje o no aprender el idioma suele ser mucho más alto a largo plazo."
  },
  {
    q: "¿Y si no tengo tiempo?",
    a: "Nadie tiene tiempo, el tiempo se gestiona. El sistema Lael está diseñado para sesiones tácticas de alto impacto. No te pedimos 5 horas al día, te pedimos 60-90 minutos de ejecución concentrada. Si puedes scrollear en redes sociales, tienes tiempo para entrenar tu rendimiento."
  },
  {
    q: "¿Y si ya fallé antes en otros preus o cursos?",
    a: "La mayoría falla porque intenta resolver problemas nuevos con métodos viejos (memorización). Si fallaste antes, probablemente no fue tu culpa, fue del sistema genérico. Aquí diagnosticamos por qué fallaste y atacamos esa brecha específica. No repetimos la materia, recalibramos tu ejecución."
  },
  {
    q: "¿Qué pasa si no me resulta?",
    a: "Lo que no se mide, no mejora. Si sigues el plan, haces las simulaciones de presión y asistes a las sesiones de feedback, es estadísticamente improbable que no veas avances. El sistema Lael es ingeniería educativa, no una promesa vacía."
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
