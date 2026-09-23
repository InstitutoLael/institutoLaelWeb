import React from 'react';
import { motion } from 'framer-motion';

// Línea de tiempo en estilo claro (actualmente no se usa en ninguna página).
export default function MethodSteps({ steps }) {
  return (
    <section className="px-5 sm:px-6 py-16 sm:py-20 lg:py-28 bg-white text-[#071D49]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight mb-4">Paso a paso</h2>
          <p className="text-[#071D49]/70 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">Lo que pasa desde que entras hasta el día de la prueba.</p>
        </div>

        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-[#071D49]/15 -translate-x-1/2" aria-hidden="true" />

          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              className={`relative flex items-center mb-10 sm:mb-16 last:mb-0 ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <div className="absolute left-4 md:left-1/2 w-3.5 h-3.5 rounded-full bg-[#D7E400] ring-4 ring-[#071D49] -translate-x-1/2" aria-hidden="true" />
              <div className={`ml-12 md:ml-0 md:w-1/2 ${idx % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16 md:text-left'}`}>
                <span className="text-xs font-bold uppercase tracking-[0.2em] mb-2 block">Fase {idx + 1}</span>
                <h3 className="text-xl sm:text-2xl font-display font-extrabold mb-2">{step.title}</h3>
                <p className="text-[#071D49]/70 text-base leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
