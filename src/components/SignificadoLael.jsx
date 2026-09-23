import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import laelLogo from '../assets/img/Logos/lael-nuevo-logo.webp';

const fade = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.6 },
};

function Callout({ label, text, align }) {
  // align: 'right' (left column on desktop) | 'left' (right column on desktop)
  const lg = align === 'right' ? 'lg:text-right lg:items-end' : 'lg:text-left lg:items-start';
  return (
    <div className={`flex flex-col items-center text-center ${lg}`}>
      <p className="inline-flex items-center gap-2 font-display text-xs font-black uppercase tracking-[0.15em] text-[#071D49] mb-1">
        <span aria-hidden="true" className="inline-block w-2 h-2 rounded-full bg-[#D7E400] ring-1 ring-[#071D49]/20" />
        {label}
      </p>
      <p className="text-[#071D49]/70 font-semibold text-sm leading-snug">{text}</p>
    </div>
  );
}

// showVerse: la página Nosotros ya cierra con Lucas 4:18, así que allí se oculta.
export default function SignificadoLael({ showVerse = true }) {
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
      content: 'Las letras LAEL forman visualmente un símbolo de infinito (∞). Nos recuerda que nunca se termina de aprender, tengas la edad que tengas.'
    },
    {
      title: 'La "E" Dorada',
      content: 'La E es la única letra en dorado, porque EL en hebreo significa "Dios". Él está al centro de lo que hacemos.'
    }
  ];

  return (
    <section className="w-full py-16 sm:py-20 lg:py-28 bg-white flex flex-col items-center px-5 sm:px-6 border-t border-lael-bd">
      <div className="w-full max-w-5xl text-center">
        <motion.p
          {...fade}
          className="inline-flex items-center gap-2 font-display text-[#071D49] text-xs tracking-[0.2em] uppercase mb-4 font-bold"
        >
          <span aria-hidden="true" className="inline-block w-5 h-1.5 rounded-full bg-[#D7E400]" />
          Por qué nos llamamos así
        </motion.p>
        <motion.h2
          {...fade}
          className="font-display text-3xl sm:text-4xl lg:text-5xl text-[#071D49] font-black mb-10 sm:mb-12 leading-[1.05] tracking-tight"
        >
          LO QUE HAY DETRÁS <br/><span className="text-[#071D49]/70">DE NUESTRO LOGO</span>
        </motion.h2>

        {/* Logo + callouts: logo first on mobile, callouts in a 2x2 grid */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 w-full max-w-4xl mx-auto mb-10 sm:mb-12">
          <div className="order-2 lg:order-1 grid grid-cols-2 gap-6 w-full lg:flex lg:flex-col lg:gap-10 lg:w-1/3">
            <Callout label="La paloma" text="Espíritu Santo" align="right" />
            <Callout label="El infinito" text="Nunca se deja de aprender" align="right" />
          </div>

          <div className="order-1 lg:order-2 relative flex justify-center items-center p-6 sm:p-8 bg-[#F4F4F4] rounded-[28px] border border-[#071D49]/5 w-full max-w-[240px] sm:max-w-[300px] lg:w-1/3 shadow-card aspect-square">
            <img
              src={laelLogo}
              alt="Logo Instituto Lael"
              loading="lazy"
              className="w-full max-w-[220px] h-auto object-contain"
            />
          </div>

          <div className="order-3 grid grid-cols-2 gap-6 w-full lg:flex lg:flex-col lg:gap-10 lg:w-1/3">
            <Callout label='La "E" dorada' text="EL: nombre de Dios" align="left" />
            <Callout label="El subtítulo" text="Instituto: aprendemos en comunidad" align="left" />
          </div>
        </div>

        {/* Tabs */}
        <div className="max-w-3xl mx-auto bg-[#F4F4F4] rounded-[28px] p-4 sm:p-6 border border-[#071D49]/5">
          <div role="tablist" className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4 sm:mb-6 border-b border-[#071D49]/10 pb-4">
            {sections.map((sec, idx) => (
              <button
                key={idx}
                role="tab"
                aria-selected={activeTab === idx}
                onClick={() => setActiveTab(idx)}
                className={`min-h-[44px] py-2.5 px-3 rounded-xl font-display text-xs font-bold uppercase tracking-wider transition-all ${
                  activeTab === idx
                    ? 'bg-[#071D49] text-white shadow-md'
                    : 'text-[#071D49]/70 hover:bg-[#071D49]/5'
                }`}
              >
                {sec.title}
              </button>
            ))}
          </div>

          <div className="min-h-[140px] sm:min-h-[110px] flex items-center justify-center px-2 sm:px-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="text-[#071D49] text-base sm:text-lg leading-relaxed max-w-2xl font-medium"
              >
                {sections[activeTab].content}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {showVerse && (
          <motion.div
            {...fade}
            className="max-w-2xl mx-auto mt-10 sm:mt-12 pt-8 border-t border-[#071D49]/10"
          >
            <p className="text-[#071D49]/70 font-medium italic text-base leading-relaxed mb-3">
              "El Espíritu del Señor está sobre mí, por cuanto me ha ungido para dar buenas nuevas a los pobres; me ha enviado a sanar a los quebrantados de corazón; a pregonar libertad a los cautivos, y vista a los ciegos; a poner en libertad a los oprimidos..."
            </p>
            <p className="font-display text-[#071D49] font-black tracking-[0.2em] text-xs uppercase">
              Lucas 4:18
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
