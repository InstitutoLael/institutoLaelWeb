import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { ChevronDown, DollarSign, Clock, Target } from 'lucide-react';

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

const FAQ_DATA = [
  {
    category: "Costos & Acceso",
    icon: <DollarSign size={20} className="text-[#071D49]" />,
    items: [
      { q: "¿Por qué la PAES es gratis en Lael?", a: "Porque creemos que el talento no tiene estrato social. Nuestra misión es democratizar el acceso a la educación de élite, y lo logramos gracias a un modelo de gestión eficiente y el apoyo de nuestra comunidad." },
      { q: "¿Hay algún costo oculto o matrícula?", a: "No. En el programa PAES no pagas matrícula, ni mensualidad, ni materiales. Es 100% gratuito de principio a fin." }
    ]
  },
  {
    category: "Tiempo & Gestión",
    icon: <Clock size={20} className="text-[#071D49]" />,
    items: [
      { q: "¿Cuánto tiempo al día necesito?", a: "El sistema se adapta a ti. Tenemos alumnos que estudian 2 horas diarias de alta eficiencia y logran más que quienes pasan 6 horas en un preuniversitario tradicional disparando a ciegas." },
      { q: "Tengo un horario difícil, ¿puedo entrar?", a: "Absolutamente. Nuestras clases son vespertinas y quedan grabadas para que puedas compatibilizar el estudio con el colegio, el trabajo o tu vida personal." }
    ]
  },
  {
    category: "Metodología & Resultados",
    icon: <Target size={20} className="text-[#071D49]" />,
    items: [
      { q: "¿Qué pasa si me bloqueo en la prueba?", a: "Nuestro sistema de diagnóstico detecta fallas antes de la prueba real. Te enseñamos estrategias de manejo de ansiedad y técnicas de descarte para que tu conocimiento se traduzca en puntaje." },
      { q: "¿Es solo para alumnos brillantes?", a: "Al contrario. Nuestro sistema brilla con alumnos que sienten que 'no les da la cabeza' y necesitan un método claro, paso a paso, para recuperar la confianza." }
    ]
  }
];

export default function Preguntas() {
  const [activeItem, setActiveItem] = useState(null);

  return (
    <div className="min-h-screen pt-32 pb-20 px-6" style={{ backgroundColor: LIGHT_GRAY }}>
      <Helmet>
        <title>Preguntas Frecuentes | Instituto Lael</title>
        <meta name="description" content="Resolvemos tus dudas sobre el programa PAES gratuito, idiomas y metodología. Honestidad radical desde el primer contacto." />
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
            Sin rodeos. Todo lo que necesitas saber sobre nuestro ecosistema educativo.
          </p>
        </div>

        <div className="space-y-12 text-left">
          {FAQ_DATA.map((cat, idx) => (
            <div key={cat.category} className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white border border-[#071D49]/10 flex items-center justify-center shadow-sm">
                  {cat.icon}
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
           <p className="text-white/60 text-xs sm:text-sm max-w-md mx-auto mb-8 leading-relaxed">Escríbenos directamente por WhatsApp y resolveremos tus dudas hoy mismo.</p>
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
        </div>
      </div>
    </div>
  );
}
