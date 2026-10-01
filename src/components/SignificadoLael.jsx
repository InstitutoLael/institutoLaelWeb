import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LOGO_PATHS, Paloma } from './ui/LaelLogo';

// Lo que hay detrás del logo, en interactivo: eliges un significado y se
// ilumina esa parte del logo (que se vuelve a dibujar). El resto queda tenue.
// Pestañas accesibles: flechas para moverse, Inicio/Fin para ir a los extremos.
const ORO = '#C49A3A';

const PARTES = [
  {
    id: 'nombre',
    titulo: 'El nombre',
    corto: 'De Dios',
    texto: 'LAEL tiene origen hebreo. Significa "de Dios" o "perteneciente a Dios", y aparece en la Biblia en el libro de Números (3:24).',
    activa: ['onda', 'ola', 'e', 'eMedio', 'ele'],
  },
  {
    id: 'infinito',
    titulo: 'El infinito',
    corto: 'Nunca se deja de aprender',
    texto: 'Las letras LAEL forman visualmente un símbolo de infinito (∞). Nos recuerda que nunca se termina de aprender, tengas la edad que tengas.',
    activa: ['onda', 'ola'],
  },
  {
    id: 'e',
    titulo: 'La E dorada',
    corto: 'EL: nombre de Dios',
    texto: 'La E es la única letra en dorado, porque EL en hebreo significa "Dios". Él está al centro de lo que hacemos.',
    activa: ['e', 'eMedio'],
  },
  {
    id: 'paloma',
    titulo: 'La paloma',
    corto: 'Espíritu Santo',
    texto: 'La paloma simboliza al Espíritu Santo, que descendió sobre Jesús en su bautismo (Mateo 3:16). También evoca la rama de olivo que llevó a Noé: el fin de la tormenta y un nuevo comienzo (Génesis 8:11).',
    activa: ['paloma'],
  },
  {
    id: 'instituto',
    titulo: 'El subtítulo',
    corto: 'Aprendemos en comunidad',
    texto: 'Instituto, porque aprendemos en comunidad: profes, alumnos y familias empujando para el mismo lado.',
    activa: ['texto'],
  },
];

const ORO_PARTES = ['e', 'eMedio', 'paloma', 'texto'];

export default function SignificadoLael({ showVerse = true }) {
  const [i, setI] = useState(0);
  const tabs = useRef([]);
  const parte = PARTES[i];
  const on = (k) => parte.activa.includes(k);
  const color = (k) => (ORO_PARTES.includes(k) ? ORO : '#FFFFFF');

  const ir = (n) => {
    const j = (n + PARTES.length) % PARTES.length;
    setI(j);
    tabs.current[j] && tabs.current[j].focus();
  };
  const tecla = (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); ir(i + 1); }
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); ir(i - 1); }
    if (e.key === 'Home') { e.preventDefault(); ir(0); }
    if (e.key === 'End') { e.preventDefault(); ir(PARTES.length - 1); }
  };

  const trazo = (k) => (
    <path
      key={`${k}-${on(k) ? i : 'off'}`}
      d={LOGO_PATHS[k]}
      pathLength="1"
      className={on(k) ? 'lael-draw' : undefined}
      style={{
        stroke: color(k),
        opacity: on(k) ? 1 : 0.14,
        transition: 'opacity .5s',
        animationDuration: '1.1s',
        filter: on(k) ? 'drop-shadow(0 0 10px rgba(215,228,0,0.35))' : 'none',
      }}
      fill="none"
      strokeWidth="9.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  );

  return (
    <section className="grain w-full bg-[#071D49] text-white py-20 sm:py-28 lg:py-32 px-5 sm:px-8 lg:px-12 overflow-hidden">
      <div className="max-w-[1600px] mx-auto">
        <p className="flex items-center gap-3 text-[11px] sm:text-xs font-bold uppercase tracking-[0.22em] text-white/70">
          <span className="text-[#D7E400]">Lael</span>
          <span aria-hidden="true" className="w-8 h-px bg-white/30" />
          Por qué nos llamamos así
        </p>
        <h2 className="mt-6 font-display font-extrabold tracking-[-0.04em] leading-[0.95] text-[2.4rem] sm:text-6xl lg:text-7xl max-w-3xl">
          Lo que hay detrás <span className="accent-serif text-[#D7E400]">de nuestro logo.</span>
        </h2>

        <div className="mt-12 sm:mt-16 grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Pestañas */}
          <div role="tablist" aria-label="Partes del logo" aria-orientation="vertical" className="lg:col-span-5 order-2 lg:order-1 border-t border-white/15">
            {PARTES.map((p, n) => (
              <button
                key={p.id}
                ref={(el) => { tabs.current[n] = el; }}
                type="button"
                role="tab"
                id={`logo-tab-${p.id}`}
                aria-selected={i === n}
                aria-controls="logo-panel"
                tabIndex={i === n ? 0 : -1}
                onClick={() => setI(n)}
                onKeyDown={tecla}
                className={`group w-full flex items-center gap-4 sm:gap-5 py-4 sm:py-5 border-b border-white/15 text-left transition-colors ${i === n ? 'text-white' : 'text-white/60 hover:text-white'}`}
              >
                <span className={`text-xs font-bold tracking-[0.2em] w-6 ${i === n ? 'text-[#D7E400]' : ''}`}>{String(n + 1).padStart(2, '0')}</span>
                <span className="flex-1 font-display font-extrabold text-2xl sm:text-3xl tracking-tight">{p.titulo}</span>
                <span className={`hidden sm:block text-sm transition-opacity ${i === n ? 'opacity-100' : 'opacity-0 group-hover:opacity-70'}`}>{p.corto}</span>
                <span aria-hidden="true" className={`h-2.5 rounded-full transition-all duration-500 ${i === n ? 'w-8 bg-[#D7E400]' : 'w-2.5 bg-white/25'}`} />
              </button>
            ))}
          </div>

          {/* Logo que se ilumina por partes + explicación */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="rounded-[32px] lg:rounded-[44px] bg-white/[0.04] border border-white/10 px-6 sm:px-12 py-10 sm:py-14">
              <svg viewBox="0 0 290 160" className="w-full h-auto" role="img" aria-label={`Logo de Lael: ${parte.titulo.toLowerCase()}`}>
                {['onda', 'ola', 'ele', 'e', 'eMedio'].map(trazo)}
                <g key={`paloma-${on('paloma') ? i : 'off'}`} style={{ opacity: on('paloma') ? 1 : 0.14, transition: 'opacity .5s', filter: on('paloma') ? 'drop-shadow(0 0 10px rgba(196,154,58,0.6))' : 'none' }}>
                  <Paloma fill={ORO} className={on('paloma') ? 'lael-dove-in' : undefined} />
                </g>
                <text x="146.5" y="157" textAnchor="middle" fontFamily="Montserrat, Arial, sans-serif" fontWeight="600" fontSize="14.5" letterSpacing="9.6" style={{ fill: ORO, opacity: on('texto') ? 1 : 0.14, transition: 'opacity .5s' }}>
                  INSTITUTO LAEL
                </text>
              </svg>
            </div>
            <div id="logo-panel" role="tabpanel" aria-labelledby={`logo-tab-${parte.id}`} className="mt-6 min-h-[7.5rem] sm:min-h-[6rem]">
              <AnimatePresence mode="wait">
                <motion.p
                  key={parte.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="text-lg sm:text-xl leading-relaxed text-white/85 max-w-2xl"
                >
                  {parte.texto}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {showVerse && (
          <div className="mt-16 pt-10 border-t border-white/15 max-w-3xl">
            <p className="font-serif italic text-2xl sm:text-3xl leading-snug text-white/90">
              “El Espíritu del Señor está sobre mí, por cuanto me ha ungido para dar buenas nuevas a los pobres; me ha enviado a sanar a los quebrantados de corazón…”
            </p>
            <p className="mt-4 font-display font-bold tracking-[0.2em] text-xs uppercase text-[#D7E400]">Lucas 4:18</p>
          </div>
        )}
      </div>
    </section>
  );
}
