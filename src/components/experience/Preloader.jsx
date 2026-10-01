import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import LaelLogo from '../ui/LaelLogo';

// Intro de la primera visita: el logo se dibuja solo, la paloma aparece, el
// contador llega a 100 y la cortina azul sube. Una vez por sesión, se salta
// con un clic o una tecla, y no aparece si la persona pidió menos movimiento.
const DURACION = 1700;
const ease = [0.76, 0, 0.24, 1];

function debeMostrarse() {
  try {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
    if (navigator.webdriver) return false;
    return !sessionStorage.getItem('lael_intro');
  } catch (_) {
    return false;
  }
}

export default function Preloader() {
  const [visible, setVisible] = useState(debeMostrarse);
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!visible) return undefined;
    try { sessionStorage.setItem('lael_intro', '1'); } catch (_) {}
    const t0 = performance.now();
    let raf = requestAnimationFrame(function tick(t) {
      const p = Math.min(1, (t - t0) / DURACION);
      setN(Math.round(100 * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => setVisible(false), 180);
    });
    const saltar = () => setVisible(false);
    window.addEventListener('keydown', saltar, { once: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('keydown', saltar);
    };
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="intro"
          aria-hidden="true"
          onClick={() => setVisible(false)}
          className="grain fixed inset-0 z-[1100] bg-[#071D49] text-white flex flex-col items-center justify-center cursor-pointer"
          initial={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
          transition={{ duration: 0.85, ease }}
        >
          <motion.div exit={{ y: -60, opacity: 0 }} transition={{ duration: 0.6, ease }} className="w-[min(62vw,340px)]">
            <LaelLogo variant="blanco" draw title="" />
          </motion.div>
          <div className="absolute bottom-8 inset-x-6 sm:inset-x-10 flex items-end justify-between font-display">
            <p className="text-[11px] uppercase tracking-[0.25em] text-white/55 max-w-[14rem] leading-relaxed">
              Tu sueño no tiene <span className="font-serif italic normal-case tracking-normal text-[#D7E400] text-base">fecha de vencimiento</span>
            </p>
            <p className="font-extrabold text-[clamp(3rem,10vw,7rem)] leading-none tabular-nums tracking-tighter">
              {n}<span className="text-[#D7E400]">%</span>
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
