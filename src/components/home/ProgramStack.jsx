import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import Duotone from '../ui/Duotone';
import { COLORES, AUDIENCIAS } from '../../data/catalogo';
import heroImg from '../../assets/img/Home/hero_student_lael_1780734180709.webp';
import adultosImg from '../../assets/img/Home/mundo_adultos_bg_1777944001677.webp';
import inglesImg from '../../assets/img/Home/idiomas_execution_bg_1777948997295.webp';

// Los tres caminos principales como tarjetas que se apilan al bajar (en
// computador): cada una queda pegada arriba y la siguiente la cubre, mientras
// la anterior se achica un poco. En celular van una debajo de la otra.
// La última tarjeta es el índice completo por "para quién".
const BTN = 'inline-flex items-center justify-center gap-2 min-h-[52px] px-7 rounded-full font-display font-extrabold text-xs sm:text-sm uppercase tracking-wider transition-colors';

const CAMINOS = [
  {
    id: 'paes',
    n: '01',
    nombre: 'Preu PAES 2027',
    lema: 'Nadie se queda afuera.',
    texto: 'Siete ramos por separado: pagas solo lo que tomas. Clases en vivo desde las 18:00, ensayos cada mes y grabaciones cada semana. Desde $12.000 al mes por ramo.',
    cta: { label: 'Inscribirme', href: '/inscripcion?programa=paes' },
    more: { label: 'Ver el preu', to: '/paes' },
    img: heroImg,
    color: COLORES.paes,
  },
  {
    id: 'adultos',
    n: '02',
    nombre: 'Escuela de Sueños',
    lema: 'El colegio no es la meta. Es el inicio de tu nueva vida.',
    texto: 'Si eres mayor de 18, te preparamos gratis para los exámenes libres del Mineduc. Clases online en la noche, a tu ritmo.',
    cta: { label: 'Quiero terminar el colegio', href: '/inscripcion?programa=adultos' },
    more: { label: 'Cómo funciona', to: '/adultos' },
    img: adultosImg,
    color: COLORES.adultos,
  },
  {
    id: 'ingles',
    n: '03',
    nombre: 'Inglés',
    lema: 'Hablar sin miedo.',
    texto: 'Casi todos entendemos más de lo que nos atrevemos a decir. Clases en vivo donde hablas desde el primer día, del A1 al B2.',
    cta: { label: 'Inscribirme', href: '/inscripcion?programa=ingles' },
    more: { label: 'Hacer el test de nivel', to: '/idiomas/test' },
    img: inglesImg,
    color: COLORES.ingles,
  },
];

function Tarjeta({ c, i, total, progress }) {
  const reduce = useReducedMotion();
  const desde = i / total;
  const scale = useTransform(progress, [desde, 1], [1, reduce ? 1 : 1 - (total - i) * 0.035]);
  return (
    <div className="lg:h-[92vh] lg:sticky" style={{ top: `calc(6rem + ${i * 18}px)` }}>
      <motion.article
        style={{ scale, backgroundColor: c.color }}
        data-keep-light
        className="group origin-top rounded-[32px] lg:rounded-[44px] text-[#071D49] overflow-hidden grid lg:grid-cols-12 lg:h-[78vh] shadow-[0_-20px_60px_-30px_rgba(7,29,73,0.5)]"
      >
        <div className="lg:col-span-7 p-6 sm:p-10 lg:p-14 flex flex-col">
          <div className="flex items-center justify-between font-display font-bold text-xs uppercase tracking-[0.2em]">
            <span>{c.n} / 0{total}</span>
            <span>{c.nombre}</span>
          </div>
          <h3 className="mt-10 lg:mt-auto font-display font-extrabold tracking-[-0.035em] leading-[0.95] text-[2.5rem] sm:text-6xl xl:text-7xl">
            {c.lema.split('. ').length > 1 ? (
              <>{c.lema.split('. ')[0]}. <span className="accent-serif block">{c.lema.split('. ')[1]}</span></>
            ) : (
              <span className="accent-serif">{c.lema}</span>
            )}
          </h3>
          <p className="mt-6 text-base sm:text-lg leading-relaxed max-w-xl text-[#071D49]/80">{c.texto}</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <a href={c.cta.href} className={`${BTN} bg-[#071D49] text-white hover:bg-white hover:text-[#071D49]`}>
              {c.cta.label} <ArrowRight size={16} />
            </a>
            <Link to={c.more.to} className={`${BTN} border border-[#071D49]/30 hover:bg-[#071D49] hover:text-white`}>
              {c.more.label}
            </Link>
          </div>
        </div>
        <div className="lg:col-span-5 p-3 sm:p-4 lg:pl-0">
          <Duotone src={c.img} color={c.color} className="h-64 sm:h-80 lg:h-full rounded-[24px] lg:rounded-[32px]" />
        </div>
      </motion.article>
    </div>
  );
}

function Indice() {
  return (
    <div className="lg:sticky" style={{ top: 'calc(6rem + 54px)' }}>
      <article className="grain rounded-[32px] lg:rounded-[44px] bg-[#071D49] text-white p-6 sm:p-10 lg:p-14 flex flex-col overflow-hidden">
        <div className="flex items-center justify-between font-display font-bold text-xs uppercase tracking-[0.2em] text-white/60">
          <span>Índice</span>
          <span>Todo lo que hacemos</span>
        </div>
        <h3 className="mt-8 font-display font-extrabold tracking-[-0.035em] leading-[0.95] text-[2.5rem] sm:text-6xl">
          ¿Qué estás <span className="accent-serif text-[#D7E400]">buscando?</span>
        </h3>
        <div className="mt-12 lg:mt-16 grid sm:grid-cols-2 xl:grid-cols-4 gap-x-8 gap-y-10">
          {AUDIENCIAS.map((a) => (
            <nav key={a.id} aria-label={`Para ${a.title.toLowerCase()}`}>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/50 pb-3 border-b border-white/15">Para {a.title.toLowerCase()}</p>
              <ul>
                {a.items.map((p) => (
                  <li key={p.path} className="border-b border-white/10">
                    <Link to={p.path} className="group/l relative flex items-center gap-3 py-3 min-h-[52px] overflow-hidden">
                      <span aria-hidden="true" className="absolute inset-0 origin-left scale-x-0 group-hover/l:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)]" style={{ backgroundColor: p.color }} />
                      <span aria-hidden="true" className="relative w-2 h-2 rounded-full flex-shrink-0 transition-opacity group-hover/l:opacity-0" style={{ backgroundColor: p.color }} />
                      <span className="relative flex-1 min-w-0 font-bold group-hover/l:text-[#071D49] transition-colors duration-300 group-hover/l:translate-x-1 transition-transform">{p.name}</span>
                      <ArrowUpRight size={16} aria-hidden="true" className="relative flex-shrink-0 text-white/40 group-hover/l:text-[#071D49] transition-colors" />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </article>
    </div>
  );
}

export default function ProgramStack() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  return (
    <div ref={ref} className="relative flex flex-col gap-5 lg:gap-0">
      {CAMINOS.map((c, i) => <Tarjeta key={c.id} c={c} i={i} total={CAMINOS.length} progress={scrollYProgress} />)}
      <Indice />
    </div>
  );
}
