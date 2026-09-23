import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { ChevronDown } from 'lucide-react';
import { FAQ_DATA } from '../data/preguntas';

// Brand Design Tokens
const BLUE = '#071D49';
const YELLOW = '#D7E400';
const WHITE = '#FFFFFF';
const LIGHT_GRAY = '#F4F4F4';
const MUTED = '#8D8D8D';

const ease = [0.16, 1, 0.3, 1];
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, delay, ease }
});


export default function Preguntas() {
  const [activeItem, setActiveItem] = useState(null);

  return (
    <div className="min-h-screen pt-32 pb-20 px-6" style={{ backgroundColor: LIGHT_GRAY }}>
      <Helmet>
        <title>Preguntas Frecuentes | Instituto Lael</title>
        <meta name="description" content="Respuestas claras sobre el preu PAES, idiomas, precios, horarios y cómo son las clases en Instituto Lael." />
      </Helmet>

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-20">
          <p className="text-[#071D49] text-[10px] tracking-[0.5em] uppercase mb-4 font-bold">FAQ</p>
          <motion.h1 
            initial={{ clipPath: 'inset(0 100% 0 0)' }}
            animate={{ clipPath: 'inset(0 0% 0 0)' }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 uppercase"
            style={{ color: BLUE }}
          >
            Preguntas <br /> <span className="italic font-normal text-[#D7E400] capitalize">y Respuestas.</span>
          </motion.h1>
          <p className="text-[#8D8D8D] text-sm sm:text-base leading-relaxed">
            Sin rodeos. Lo que más nos preguntan sobre precios, horarios y clases.
          </p>
        </div>

        <div className="space-y-12 text-left">
          {FAQ_DATA.map((cat, idx) => (
            <div key={cat.category} className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white border border-[#071D49]/10 flex items-center justify-center shadow-sm">
                  <cat.icon size={20} className="text-[#071D49]" />
                </div>
                <h2 className="text-xs tracking-[0.25em] uppercase font-bold text-[#071D49]">{cat.category}</h2>
              </div>

              <div className="grid gap-4">
                {cat.items.map((item, i) => {
                  const id = `${idx}-${i}`;
                  const isOpen = activeItem === id;
                  return (
                    <div key={id} className={`rounded-[24px] border transition-all duration-300 overflow-hidden bg-white ${isOpen ? 'border-[#071D49]/15 shadow-sm' : 'border-[#071D49]/10 hover:border-[#D7E400]/40'}`}>
                      <button 
                        onClick={() => setActiveItem(isOpen ? null : id)}
                        className="w-full p-6 text-left flex justify-between items-center group focus:outline-none"
                      >
                        <span className="text-[#071D49] font-bold text-sm sm:text-base tracking-tight transition-colors">{item.q}</span>
                        <div className={`w-8 h-8 rounded-full border border-[#071D49]/15 flex items-center justify-center text-[#071D49] flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 bg-[#071D49] text-white' : ''}`}>
                          <ChevronDown size={14} />
                        </div>
                      </button>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease }}
                          >
                            <div className="px-6 pb-6 text-[#8D8D8D] text-xs sm:text-sm leading-relaxed border-t border-[#071D49]/5 pt-4">
                              {item.a}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Support block */}
        <div className="mt-20 p-10 rounded-[32px] text-white text-center shadow-lael" style={{ backgroundColor: BLUE }}>
           <h3 className="font-display font-extrabold text-xl sm:text-2xl uppercase tracking-tight mb-4">¿Tu duda es más específica?</h3>
           <p className="text-white/60 text-xs sm:text-sm max-w-md mx-auto mb-8 leading-relaxed">Escríbenos por WhatsApp y te respondemos lo antes posible.</p>
           <motion.a 
             whileHover={{ scale: 1.02 }}
             whileTap={{ scale: 0.98 }}
             href="https://wa.me/56964626568?text=Hola!%20Tengo%20algunas%20dudas."
             target="_blank"
             rel="noopener noreferrer"
             className="inline-flex bg-[#D7E400] text-[#071D49] font-display font-extrabold text-xs uppercase tracking-widest px-10 py-5 rounded-2xl active:scale-95 hover:bg-white transition-colors duration-300"
           >
             Hablar por WhatsApp
           </motion.a>
           <a
             href="https://docs.google.com/forms/d/e/1FAIpQLSehVHEaZpQaQpSDKzHarHhPfgVzEPqyl5Q--Wa5r5KJFQwh9g/viewform"
             target="_blank"
             rel="noopener noreferrer"
             className="block mt-6 text-white/50 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors underline underline-offset-4"
           >
             ¿El costo es una barrera? Postula a una beca
           </a>
        </div>
      </div>
    </div>
  );
}
