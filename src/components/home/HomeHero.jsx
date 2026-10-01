import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import WordReveal from '../ui/WordReveal';
import Magnetic from '../experience/Magnetic';
import { Paloma } from '../ui/LaelLogo';
import { primeraPintura } from '../../lib/hidratacion';
import heroImg from '../../assets/img/Home/hero_student_lael_1780734180709.webp';

// Portada de la Home.
// Concepto: la onda del logo es el camino; la paloma, tu sueño. La línea se
// dibuja al cargar, termina en la paloma, y al bajar la paloma despega.
const ease = [0.16, 1, 0.3, 1];
const BTN = 'inline-flex items-center justify-center gap-2 whitespace-nowrap min-h-[52px] px-8 rounded-full font-display font-extrabold text-xs sm:text-sm uppercase tracking-wider transition-colors';
// La onda se arma en píxeles según el tamaño real del título: así el trazo
// es parejo a cualquier ancho. Puntos en % del área (x, y).
const PUNTOS = [[0, 97], [14, 97, 18, 88, 27, 88], [37, 88, 38, 100, 50, 100], [64, 100, 70, 92, 80, 96], [90, 100, 96, 92, 97.5, 70], [98.5, 50, 98, 22, 96.5, 6]];
function onda(w, h) {
  const p = (x, y) => `${((x / 100) * w).toFixed(1)} ${((y / 100) * h).toFixed(1)}`;
  const [m, ...cs] = PUNTOS;
  return `M${p(m[0], m[1])} ` + cs.map((c) => `C ${p(c[0], c[1])} ${p(c[2], c[3])} ${p(c[4], c[5])}`).join(' ');
}
function useTamano(ref) {
  const [t, setT] = useState(null);
  useEffect(() => {
    if (!ref.current) return undefined;
    const ro = new ResizeObserver(([e]) => setT({ w: e.contentRect.width, h: e.contentRect.height }));
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, [ref]);
  return t;
}

const DATOS = [
  { n: '+1.000', t: 'alumnos desde 2021' },
  { n: '20', t: 'máximo por curso' },
  { n: '$0', t: 'matrícula', lima: true },
];

// modo 'css': la entrada del título va en CSS. Es el modo del HTML
// pre-dibujado (src/entry-shell.jsx) y de la primera pintura en el navegador,
// que adopta ese HTML tal cual (ver src/lib/hidratacion.js).
export default function HomeHero({ modo: modoProp }) {
  const [modo] = useState(() => modoProp || (primeraPintura() ? 'css' : undefined));
  const ini = (v) => (modo ? false : v);
  const ref = useRef(null);
  const lineaRef = useRef(null);
  const tam = useTamano(lineaRef);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const tituloY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -140]);
  const fotoY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 160]);
  const vueloX = useTransform(scrollYProgress, [0, 0.8], [0, reduce ? 0 : 260]);
  const vueloY = useTransform(scrollYProgress, [0, 0.8], [0, reduce ? 0 : -420]);
  const vueloR = useTransform(scrollYProgress, [0, 0.8], [0, reduce ? 0 : -14]);

  return (
    <section ref={ref} className="grain -mt-20 relative min-h-[100svh] flex flex-col bg-[#071D49] text-white overflow-hidden">
      {/* Foto a la derecha, en duotono y muy suave */}
      <motion.div aria-hidden="true" style={{ y: fotoY }} className="absolute inset-y-0 right-0 w-full lg:w-[58%]">
        <img src={heroImg} alt="" fetchpriority="high" className="w-full h-full object-cover object-[60%_30%] grayscale opacity-[0.22] mix-blend-luminosity" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#071D49] via-[#071D49]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071D49] via-transparent to-[#071D49]/70" />
      </motion.div>

      {/* Arco de la marca arriba a la derecha */}
      <svg aria-hidden="true" className="absolute top-0 right-0 w-[40vw] max-w-[560px] pointer-events-none" viewBox="0 0 400 200">
        <path d="M80 -30 C 110 90 230 130 420 90" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="26" strokeLinecap="round" />
      </svg>

      <div className="relative flex-1 flex flex-col w-full max-w-[1600px] mx-auto px-5 sm:px-8 lg:px-12 pt-28 sm:pt-36 pb-12 sm:pb-16">
        {/* Fila de datos editorial */}
        <motion.div initial={ini({ opacity: 0 })} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.2 }} className="hidden md:grid grid-cols-3 gap-6 text-[11px] font-bold uppercase tracking-[0.22em] text-white/55 border-t border-white/15 pt-4">
          <p>Instituto Lael — Santiago, Chile</p>
          <p className="text-center">En vivo por Google Meet</p>
          <p className="text-right">Nueva temporada · <span className="text-[#D7E400]">Marzo 2027</span></p>
        </motion.div>

        <motion.div style={{ y: tituloY }} className="flex-1 flex flex-col justify-center py-8 sm:py-10">
          <motion.p initial={ini({ opacity: 0, y: 10 })} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="mb-6 sm:mb-8 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.22em] text-[#D7E400]">
            <span className="w-8 h-px bg-[#D7E400]" aria-hidden="true" />
            Instituto online · Desde 2021
          </motion.p>
          <div className="relative">
          {/* La onda pasa bajo "de vencimiento" y sube hasta la paloma */}
          <svg ref={lineaRef} aria-hidden="true" className="absolute -left-12 top-[6%] w-[calc(100%+4rem)] h-[104%] overflow-visible pointer-events-none hidden md:block">
            {tam && <path d={onda(tam.w, tam.h)} pathLength="1" className="lael-draw" style={{ animationDuration: '2s', animationDelay: '0.9s' }} fill="none" stroke="#D7E400" strokeWidth="2" strokeLinecap="round" />}
          </svg>
          <motion.svg aria-hidden="true" viewBox="226 0 40 50" style={{ x: vueloX, y: vueloY, rotate: vueloR, left: 'calc(0.965 * (100% + 4rem) - 3rem - 4px)', bottom: '87.8%' }} className="absolute w-[clamp(44px,5.5vw,84px)] origin-bottom-left hidden md:block pointer-events-none">
            <Paloma fill="#D7E400" className="lael-dove-in" style={{ animationDelay: '2.6s' }} />
          </motion.svg>
          <WordReveal
            className="relative font-display font-extrabold display-xl text-white"
            delay={0.15}
            stagger={0.07}
            modo={modo === 'css' ? 'css' : modo ? 'quieto' : undefined}
            segments={[
              { text: 'Tu sueño', className: 'block' },
              { text: 'no tiene fecha', className: 'block lg:pl-[11%]' },
              { text: 'de vencimiento.', className: 'block accent-serif text-[#D7E400] lg:pl-[30%]' },
            ]}
          />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 xl:gap-6 items-end">
          <motion.div initial={ini({ y: 16 })} animate={{ y: 0 }} transition={{ duration: 0.8, delay: 0.2, ease }} className="xl:col-span-5">
            <p className="text-white/75 text-base sm:text-lg leading-relaxed max-w-md mb-7">
              Preu PAES, inglés y nivelación de estudios en vivo. Da lo mismo si vas en cuarto medio o si dejaste el colegio hace años: te ayudamos a llegar.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Magnetic>
                <a href="/inscripcion" data-cursor="Vamos" className={`${BTN} w-full sm:w-auto bg-[#D7E400] text-[#071D49] hover:bg-white`}>
                  Inscribirme gratis <ArrowRight size={16} />
                </a>
              </Magnetic>
              <a href="#caminos" className={`${BTN} text-white border border-white/30 hover:bg-white hover:text-[#071D49]`}>
                Ver programas
              </a>
            </div>
          </motion.div>

          <motion.dl initial={ini({ opacity: 0 })} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.9 }} className="xl:col-span-6 xl:col-start-7 grid grid-cols-3 border-t border-white/15 max-w-2xl xl:max-w-none">
            {DATOS.map((d) => (
              <div key={d.t} className="pt-4 pr-3 flex flex-col-reverse">
                <dt className="text-[11px] sm:text-xs uppercase tracking-[0.14em] font-bold text-white/55 mt-1">{d.t}</dt>
                <dd className={`font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-none ${d.lima ? 'text-[#D7E400]' : 'text-white'}`}>{d.n}</dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </div>
    </section>
  );
}
