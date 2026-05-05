import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { ChevronDown, MessageCircle, DollarSign, Clock, Target, HelpCircle } from 'lucide-react';

const FAQ_DATA = [
  {
    category: "Dinero & Inversión",
    icon: <DollarSign size={20} />,
    items: [
      { q: "¿Por qué es más caro que un preuniversitario tradicional?", a: "Porque no somos una guardería educativa ni una fábrica de clases grabadas. Pagas por un sistema de ingeniería que garantiza un resultado, mentoría 1:1 y una tecnología de seguimiento que reduce tu tiempo de estudio en un 40%." },
      { q: "¿Tienen planes de financiamiento?", a: "Sí. Contamos con planes mensuales flexibles y facilidades vía MercadoPago/Transbank. La inversión se recupera en la primera beca que obtengas por tu puntaje." }
    ]
  },
  {
    category: "Tiempo & Gestión",
    icon: <Clock size={20} />,
    items: [
      { q: "¿Cuánto tiempo al día necesito?", a: "El sistema se adapta a ti. Tenemos alumnos que estudian 2 horas diarias de alta eficiencia y logran más que quienes pasan 6 horas en un preuniversitario tradicional disparando a ciegas." },
      { q: "Tengo un horario difícil, ¿puedo entrar?", a: "Absolutamente. La arquitectura de puntaje está diseñada precisamente para personas con poco tiempo que necesitan máxima efectividad." }
    ]
  },
  {
    category: "Resultados & Garantía",
    icon: <Target size={20} />,
    items: [
      { q: "¿Qué pasa si no subo mi puntaje?", a: "Nuestro sistema de diagnóstico detecta fallas antes de la prueba real. Si sigues el plan y no hay avance, reevaluamos tu arquitectura sin costo adicional hasta encontrar el patrón de bloqueo." },
      { q: "¿Es solo para alumnos brillantes?", a: "Al contrario. Nuestro sistema brilla con alumnos que están estancados en los 500-600 puntos y no saben cómo romper ese techo." }
    ]
  }
];

export default function Preguntas() {
  const [activeItem, setActiveItem] = useState(null);

  return (
    <div className="bg-lael-primary min-h-screen pt-32 pb-20 px-6">
      <Helmet>
        <title>Preguntas Frecuentes | Instituto Lael</title>
      </Helmet>

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-20">
          <p className="text-lael-accent text-[10px] tracking-[0.4em] uppercase mb-4 font-bold">FAQ Avanzado</p>
          <h1 className="font-display text-5xl text-lael-light mb-8">Dudas que merecen una respuesta honesta.</h1>
        </div>

        <div className="space-y-16">
          {FAQ_DATA.map((cat, i) => (
            <div key={i}>
              <div className="flex items-center gap-3 mb-8 text-lael-accent">
                {cat.icon}
                <h2 className="text-[10px] uppercase tracking-[0.3em] font-bold">{cat.category}</h2>
              </div>
              <div className="space-y-4">
                {cat.items.map((item, j) => {
                  const id = `${i}-${j}`;
                  const isOpen = activeItem === id;
                  return (
                    <div key={j} className="border border-lael-bd rounded-2xl bg-lael-secondary overflow-hidden">
                      <button 
                        onClick={() => setActiveItem(isOpen ? null : id)}
                        className="w-full p-6 text-left flex justify-between items-center group"
                      >
                        <span className="text-lael-light font-bold text-base group-hover:text-lael-accent transition-colors">{item.q}</span>
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
           <button className="bg-white text-lael-accent px-10 py-5 rounded-xl text-[11px] font-bold uppercase tracking-widest shadow-xl hover:scale-105 transition-all">Hablar por WhatsApp</button>
        </div>
      </div>
    </div>
  );
}
