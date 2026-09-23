import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Pause, Play } from 'lucide-react';
import WordReveal from './ui/WordReveal';

// Portada rotativa de la Home: cambia sola cada 7 segundos entre los
// programas principales. Se pausa al pasar el mouse, al enfocar con teclado
// o con el botón de pausa, y no rota sola si la persona pidió menos movimiento.
const YELLOW = '#D7E400';
const BTN = 'inline-flex items-center justify-center gap-2 min-h-[48px] px-8 py-4 rounded-2xl font-display font-extrabold text-xs sm:text-sm uppercase tracking-wider transition-all active:scale-95';
const INTERVALO = 7000;

export default function HeroCarousel({ slides, titleClassName }) {
  const [i, setI] = useState(0);
  const [pausado, setPausado] = useState(false);
  const [hover, setHover] = useState(false);
  const reduce = useReducedMotion();
  const timer = useRef(null);
  const auto = !pausado && !hover && !reduce;

  const ir = useCallback((n) => setI((n + slides.length) % slides.length), [slides.length]);

  useEffect(() => {
    if (!auto) return undefined;
    timer.current = setTimeout(() => ir(i + 1), INTERVALO);
    return () => clearTimeout(timer.current);
  }, [i, auto, ir]);

  const s = slides[i];

  return (
    <div
      className="w-full flex flex-col items-center"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocusCapture={() => setHover(true)}
      onBlurCapture={() => setHover(false)}
      role="region"
      aria-roledescription="carrusel"
      aria-label="Programas de Instituto Lael"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={s.id}
          className="w-full flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35 }}
          aria-live={auto ? 'off' : 'polite'}
        >
          <span className="inline-flex items-center gap-2 font-display text-xs font-bold uppercase tracking-[0.2em] px-4 py-2 rounded-full mb-6" style={{ backgroundColor: YELLOW, color: '#071D49' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-current" aria-hidden="true" />
            {s.badge}
          </span>
          <WordReveal className={titleClassName} segments={s.title} />
          <p className="text-white/75 text-base sm:text-lg md:text-xl leading-relaxed mb-8 sm:mb-10 max-w-xl">{s.text}</p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch w-full sm:w-auto">
            <a href={s.cta.href} className={`${BTN} w-full sm:w-auto bg-[#D7E400] text-[#071D49] hover:opacity-90 shadow-xl`}>
              {s.cta.label} <ArrowRight size={16} />
            </a>
            <Link to={s.more.href} className={`${BTN} w-full sm:w-auto text-white border-2 border-white/30 hover:bg-white/10`}>
              {s.more.label}
            </Link>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Controles */}
      <div className="mt-8 flex items-center gap-3">
        {slides.map((sl, n) => (
          <button
            key={sl.id}
            onClick={() => ir(n)}
            aria-label={`Ver ${sl.badge}`}
            aria-current={n === i}
            className="h-11 flex items-center px-1"
          >
            <span className={`block h-1.5 rounded-full transition-all duration-300 ${n === i ? 'w-10 bg-[#D7E400]' : 'w-5 bg-white/30 hover:bg-white/60'}`}>
              {n === i && auto && (
                <motion.span key={`${sl.id}-${i}`} className="block h-full rounded-full bg-white/60 origin-left" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: INTERVALO / 1000, ease: 'linear' }} />
              )}
            </span>
          </button>
        ))}
        {!reduce && (
          <button onClick={() => setPausado((p) => !p)} aria-label={pausado ? 'Reanudar carrusel' : 'Pausar carrusel'} className="w-11 h-11 rounded-full flex items-center justify-center text-white/70 hover:text-white">
            {pausado ? <Play size={16} /> : <Pause size={16} />}
          </button>
        )}
      </div>
    </div>
  );
}
