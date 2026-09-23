import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { ChevronDown } from 'lucide-react';
import { FAQ_DATA } from '../data/preguntas';

const ease = [0.16, 1, 0.3, 1];
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.6, delay, ease }
});


export default function Preguntas() {
  const [activeItem, setActiveItem] = useState(null);

  return (
    <div className="w-full bg-[#F4F4F4] text-[#071D49] overflow-x-clip font-sans">
      <Helmet>
        <title>Preguntas Frecuentes | Instituto Lael</title>
        <meta name="description" content="Lo que más nos preguntan sobre el preu PAES, idiomas, precios, horarios y cómo son las clases en Instituto Lael." />
      </Helmet>

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="px-5 sm:px-6 pt-28 sm:pt-32 pb-12 sm:pb-16">
        <div className="max-w-3xl mx-auto text-center">
          <motion.p {...fadeUp(0)} className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] mb-5">
            <span className="w-4 h-1 rounded-full bg-[#D7E400]" aria-hidden="true" />
            FAQ
          </motion.p>
          <motion.h1
            {...fadeUp(0.1)}
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-[-0.03em] leading-[1.05] mb-6"
          >
            Preguntas <br /> <span className="bg-[#071D49] text-[#D7E400] px-3">y Respuestas.</span>
          </motion.h1>
          <motion.p {...fadeUp(0.2)} className="text-[#071D49]/70 text-base sm:text-lg leading-relaxed">
            Lo que más nos preguntan sobre precios, horarios y clases.
          </motion.p>
        </div>
      </section>

      {/* ── PREGUNTAS ────────────────────────────────────────────────── */}
      <section className="px-5 sm:px-6 pb-16 sm:pb-20 lg:pb-28">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-12 text-left">
            {FAQ_DATA.map((cat, idx) => (
              <motion.div key={cat.category} {...fadeUp(0)} className="space-y-5">
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl bg-[#071D49] flex items-center justify-center flex-shrink-0">
                    <cat.icon size={22} className="text-white" />
                  </div>
                  <h2 className="font-display text-lg sm:text-xl font-extrabold uppercase tracking-tight text-[#071D49]">{cat.category}</h2>
                </div>

                <div className="grid gap-3 sm:gap-4">
                  {cat.items.map((item, i) => {
                    const id = `${idx}-${i}`;
                    const isOpen = activeItem === id;
                    return (
                      <div key={id} className={`rounded-[24px] border transition-colors duration-300 overflow-hidden bg-white ${isOpen ? 'border-[#071D49]/20 shadow-card' : 'border-[#071D49]/5 hover:border-[#071D49]/20'}`}>
                        <button
                          type="button"
                          aria-expanded={isOpen}
                          aria-controls={`faq-${id}`}
                          onClick={() => setActiveItem(isOpen ? null : id)}
                          className="w-full min-h-[64px] px-5 sm:px-6 py-5 text-left flex justify-between items-center gap-4 rounded-[24px] focus:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-[#071D49]/15"
                        >
                          <span className="text-[#071D49] font-bold text-base sm:text-lg leading-snug tracking-tight">{item.q}</span>
                          <span className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${isOpen ? 'rotate-180 bg-[#071D49] text-[#D7E400]' : 'bg-[#F4F4F4] text-[#071D49]'}`} aria-hidden="true">
                            <ChevronDown size={18} />
                          </span>
                        </button>
                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              id={`faq-${id}`}
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease }}
                            >
                              <div className="px-5 sm:px-6 pb-6 text-[#071D49]/70 text-base leading-relaxed border-t border-[#071D49]/5 pt-4">
                                {item.a}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Support block */}
          <motion.div {...fadeUp(0)} className="mt-16 sm:mt-20 p-6 sm:p-10 rounded-[28px] text-white text-center shadow-lael" style={{ backgroundColor: '#071D49' }}>
            <h3 className="font-display font-extrabold text-2xl sm:text-3xl uppercase tracking-tight mb-4">¿Tu duda es más específica?</h3>
            <p className="text-white/75 text-base max-w-md mx-auto mb-8 leading-relaxed">Escríbenos por WhatsApp y te respondemos lo antes posible.</p>
            <a
              href="https://wa.me/56964626568?text=Hola!%20Tengo%20algunas%20dudas."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto min-h-[52px] inline-flex items-center justify-center bg-[#D7E400] text-[#071D49] font-display font-extrabold text-xs sm:text-sm uppercase tracking-wider px-10 rounded-2xl active:scale-95 hover:bg-white transition-colors duration-300"
            >
              Hablar por WhatsApp
            </a>
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSehVHEaZpQaQpSDKzHarHhPfgVzEPqyl5Q--Wa5r5KJFQwh9g/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-fit mx-auto items-center min-h-[44px] mt-4 text-white/75 hover:text-white text-sm font-bold transition-colors underline underline-offset-4"
            >
              ¿No te alcanza? Postula a una beca
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
