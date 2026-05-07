import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { ChevronDown, MessageCircle, DollarSign, Clock, Target, HelpCircle } from 'lucide-react';

const FAQ_DATA = [
  {
    category: "Costos & Acceso",
    icon: <DollarSign size={20} />,
    items: [
      { q: "¿Por qué la PAES es gratis en Lael?", a: "Porque creemos que el talento no tiene estrato social. Nuestra misión es democratizar el acceso a la educación de élite, y lo logramos gracias a un modelo de gestión eficiente y el apoyo de nuestra comunidad." },
      { q: "¿Hay algún costo oculto o matrícula?", a: "No. En el programa PAES no pagas matrícula, ni mensualidad, ni materiales. Es 100% gratuito de principio a fin." }
    ]
  },
  {
    category: "Tiempo & Gestión",
    icon: <Clock size={20} />,
    items: [
      { q: "¿Cuánto tiempo al día necesito?", a: "El sistema se adapta a ti. Tenemos alumnos que estudian 2 horas diarias de alta eficiencia y logran más que quienes pasan 6 horas en un preuniversitario tradicional disparando a ciegas." },
      { q: "Tengo un horario difícil, ¿puedo entrar?", a: "Absolutamente. Nuestras clases son vespertinas y quedan grabadas para que puedas compatibilizar el estudio con el colegio, el trabajo o tu vida personal." }
    ]
  },
  {
    category: "Metodología & Resultados",
    icon: <Target size={20} />,
    items: [
      { q: "¿Qué pasa si me bloqueo en la prueba?", a: "Nuestro sistema de diagnóstico detecta fallas antes de la prueba real. Te enseñamos estrategias de manejo de ansiedad y técnicas de descarte para que tu conocimiento se traduzca en puntaje." },
      { q: "¿Es solo para alumnos brillantes?", a: "Al contrario. Nuestro sistema brilla con alumnos que sienten que 'no les da la cabeza' y necesitan un método claro, paso a paso, para recuperar la confianza." }
    ]
  }
];

export default function Preguntas() {
  const [activeItem, setActiveItem] = useState(null);

  return (
    <div className="bg-white min-h-screen pt-32 pb-20 px-6">
      <Helmet>
        <title>Preguntas Frecuentes | Instituto Lael</title>
        <meta name="description" content="Resolvemos tus dudas sobre el programa PAES gratuito, idiomas y metodología. Honestidad radical desde el primer contacto." />
      </Helmet>

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-24">
          <p className="text-lael-accent text-[10px] tracking-[0.5em] uppercase mb-6 font-bold">FAQ</p>
          <motion.h1 
            initial={{ clipPath: 'inset(0 100% 0 0)' }}
            animate={{ clipPath: 'inset(0 0% 0 0)' }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-5xl lg:text-7xl text-lael-primary font-bold leading-tight mb-8 uppercase"
          >
            Preguntas <br /> <span className="italic italic-playfair text-lael-accent font-normal capitalize">y Respuestas.</span>
          </motion.h1>
          <p className="text-lael-muted text-lg leading-relaxed">
            Sin rodeos. Todo lo que necesitas saber antes de tu diagnóstico táctico.
          </p>
        </div>

        <div className="space-y-16">
          {FAQ_DATA.map((cat, idx) => (
            <div key={cat.category} className="space-y-8">
              <div className="flex items-center gap-4 text-lael-accent">
                <div className="w-10 h-10 rounded-xl bg-lael-accent/10 flex items-center justify-center">
                  {cat.icon}
                </div>
                <h2 className="text-xs tracking-[0.3em] uppercase font-bold">{cat.category}</h2>
              </div>

              <div className="grid gap-4">
                {cat.items.map((item, i) => {
                  const id = `${idx}-${i}`;
                  const isOpen = activeItem === id;
                  return (
                    <div key={id} className={`rounded-[32px] border transition-all duration-500 overflow-hidden ${isOpen ? 'bg-lael-secondary/30 border-lael-accent/20' : 'bg-white border-lael-bd hover:border-lael-accent/30'}`}>
                      <button 
                        onClick={() => setActiveItem(isOpen ? null : id)}
                        className="w-full p-6 text-left flex justify-between items-center group"
                      >
                        <span className="text-lael-primary font-bold text-base group-hover:text-lael-accent transition-colors">{item.q}</span>
                        <ChevronDown size={20} className={`text-lael-muted transition-transform duration-500 ${isOpen ? 'rotate-180 text-lael-accent' : ''}`} />
                      </button>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="px-6 pb-6"
                          >
                            <p className="text-lael-muted text-sm leading-relaxed pt-2 border-t border-lael-bd/50">{item.a}</p>
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

        <div className="mt-24 p-10 bg-lael-accent rounded-3xl text-white text-center">
           <h3 className="font-display text-2xl mb-6">¿Tu duda es más específica?</h3>
           <p className="text-white/80 text-sm mb-8">Habla directamente con un estratega y resolvamos tu caso hoy mismo.</p>
           <motion.button 
             whileHover={{ scale: 1.05 }}
             whileTap={{ scale: 0.95 }}
             onClick={() => window.open('https://wa.me/56964626568', '_blank')}
             className="bg-white text-lael-accent px-10 py-5 rounded-xl text-[11px] font-bold uppercase tracking-widest shadow-xl transition-all"
           >
             Hablar por WhatsApp
           </motion.button>
        </div>
      </div>
    </div>
  );
}
