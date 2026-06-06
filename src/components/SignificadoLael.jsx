import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import laelLogo from '../assets/img/Logos/lael-nuevo-logo.png';

export default function SignificadoLael() {
  const [activeTab, setActiveTab] = useState(0);

  const sections = [
    {
      title: 'El Nombre',
      content: 'LAEL tiene origen hebreo. Significa "de Dios" o "perteneciente a Dios", y aparece en la Biblia en el libro de Números (3:24).'
    },
    {
      title: 'La Paloma',
      content: 'La paloma simboliza al Espíritu Santo, quien descendió sobre Jesús en su bautismo (Mateo 3:16). También evoca el momento en que llevó una rama de olivo a Noé, marcando el fin de la tormenta y un nuevo comienzo de paz y esperanza (Génesis 8:11).'
    },
    {
      title: 'El Infinito',
      content: 'Las letras LAEL forman visualmente un símbolo de infinito (∞). El aprendizaje no tiene fin. El potencial humano es ilimitado.'
    },
    {
      title: 'La "E" Dorada',
      content: 'La letra E es la única en dorado — EL en hebreo significa "Dios". Es el centro de todo lo que hacemos.'
    }
  ];

  return (
    <section className="w-full py-28 bg-white flex flex-col items-center px-6 border-t border-lael-bd">
      <div className="w-full max-w-5xl text-center">
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-lael-accent text-[10px] tracking-[0.4em] uppercase mb-4 font-bold"
        >
          Nuestra Identidad
        </motion.p>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-4xl lg:text-5xl text-lael-primary font-black mb-16 leading-tight"
        >
          MÁS QUE UN LOGO — <br/><span className="text-lael-primary/70">UNA DECLARACIÓN DE FE</span>
        </motion.h2>

        {/* Logo and Callouts Diagram */}
        <div className="relative flex flex-col lg:flex-row items-center justify-between gap-12 w-full max-w-4xl mx-auto mb-20">
          
          {/* Left Callouts (Desktop) */}
          <div className="flex flex-col gap-8 lg:w-1/3 text-center lg:text-right">
            <div className="group cursor-pointer">
              <p className="text-xs font-black uppercase tracking-wider text-lael-accent mb-1">La paloma</p>
              <p className="text-lael-primary font-bold text-sm">Espíritu Santo</p>
              <div className="h-0.5 w-12 bg-lael-accent/50 ml-auto mr-auto lg:mr-0 mt-2 transition-all group-hover:w-20" />
            </div>
            <div className="group cursor-pointer">
              <p className="text-xs font-black uppercase tracking-wider text-lael-accent mb-1">El infinito</p>
              <p className="text-lael-primary font-bold text-sm">Aprendizaje sin límites</p>
              <div className="h-0.5 w-12 bg-lael-accent/50 ml-auto mr-auto lg:mr-0 mt-2 transition-all group-hover:w-20" />
            </div>
          </div>

          {/* Center Logo */}
          <div className="relative flex justify-center items-center p-8 bg-lael-secondary/40 rounded-[40px] border border-lael-primary/5 lg:w-1/3 max-w-[320px] shadow-card aspect-square">
            <img 
              src={laelLogo} 
              alt="Logo Instituto Lael" 
              className="w-full max-w-[240px] h-auto object-contain"
            />
          </div>

          {/* Right Callouts (Desktop) */}
          <div className="flex flex-col gap-8 lg:w-1/3 text-center lg:text-left">
            <div className="group cursor-pointer">
              <p className="text-xs font-black uppercase tracking-wider text-lael-accent mb-1">La "E" dorada</p>
              <p className="text-lael-primary font-bold text-sm">EL — Nombre de Dios</p>
              <div className="h-0.5 w-12 bg-lael-accent/50 mr-auto ml-auto lg:ml-0 mt-2 transition-all group-hover:w-20" />
            </div>
            <div className="group cursor-pointer">
              <p className="text-xs font-black uppercase tracking-wider text-lael-accent mb-1 text-right lg:text-left">El subtítulo</p>
              <p className="text-lael-primary font-bold text-sm">Instituto — Comunidad de formación</p>
              <div className="h-0.5 w-12 bg-lael-accent/50 mr-auto ml-auto lg:ml-0 mt-2 transition-all group-hover:w-20" />
            </div>
          </div>

        </div>

        {/* Tabs/Accordion for text details */}
        <div className="max-w-3xl mx-auto mb-20 bg-lael-secondary/30 rounded-3xl p-6 border border-lael-primary/5">
          {/* Tab buttons */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-8 border-b border-lael-primary/10 pb-4">
            {sections.map((sec, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTab(idx)}
                className={`py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                  activeTab === idx 
                    ? 'bg-lael-primary text-white shadow-md' 
                    : 'text-lael-primary/60 hover:bg-lael-primary/5'
                }`}
              >
                {sec.title}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="min-h-[120px] flex items-center justify-center px-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="text-lael-primary text-lg leading-relaxed max-w-2xl font-medium"
              >
                {sections[activeTab].content}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Versicle Lucas 4:18 at the end */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto p-8 border-t border-lael-primary/10"
        >
          <p className="text-lael-primary/70 font-medium italic text-base leading-relaxed mb-4">
            "El Espíritu del Señor está sobre mí, por cuanto me ha ungido para dar buenas nuevas a los pobres; me ha enviado a sanar a los quebrantados de corazón; a pregonar libertad a los cautivos, y vista a los ciegos; a poner en libertad a los oprimidos..."
          </p>
          <p className="text-lael-accent font-black tracking-widest text-[11px] uppercase">
            Lucas 4:18
          </p>
        </motion.div>

      </div>
    </section>
  );
}
