import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import CountUp from '../ui/CountUp';
import { HERRAMIENTAS } from '../../data/catalogo';

// Herramientas gratis de la portada: la calculadora en grande (con un
// puntaje de muestra que se llena) y las demás en tarjetas que se vuelven
// azules al pasar el mouse.
const ease = [0.16, 1, 0.3, 1];
const fadeUp = (d = 0) => ({ initial: { opacity: 0, y: 18 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: '-60px' }, transition: { duration: 0.6, delay: d, ease } });

const PRUEBAS = [
  { k: 'NEM', v: 0.62 },
  { k: 'Ranking', v: 0.86 },
  { k: 'Lectora', v: 0.55 },
  { k: 'M1', v: 0.74 },
];

export default function Herramientas() {
  const [calc, ...resto] = HERRAMIENTAS;
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5">
      {/* Calculadora, en grande */}
      <motion.div {...fadeUp()} className="lg:col-span-6 lg:row-span-2">
        <Link to={calc.path} data-cursor="Calcular" className="group relative h-full min-h-[420px] rounded-[32px] bg-[#071D49] text-white p-7 sm:p-10 flex flex-col overflow-hidden grain" data-keep-light>
          <div className="flex items-start justify-between gap-4">
            <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#D7E400]">{calc.tag}</span>
            <span className="w-12 h-12 rounded-full bg-[#D7E400] text-[#071D49] flex items-center justify-center transition-transform duration-500 group-hover:rotate-45"><ArrowUpRight size={20} aria-hidden="true" /></span>
          </div>
          <h3 className="mt-6 font-display font-extrabold tracking-[-0.04em] leading-[0.95] text-4xl sm:text-5xl max-w-[12ch]">
            ¿Te alcanza para <span className="accent-serif text-[#D7E400]">tu carrera?</span>
          </h3>
          <p className="mt-4 text-white/75 max-w-sm">{calc.name}: pones tus puntajes y ves tu ponderado al tiro, con las ponderaciones oficiales.</p>

          {/* Muestra: barras que se llenan y un ponderado que cuenta */}
          <div className="mt-auto pt-10" aria-hidden="true">
            <div className="grid grid-cols-4 gap-3 items-end h-28">
              {PRUEBAS.map((p, i) => (
                <div key={p.k} className="flex flex-col items-center gap-2 h-full justify-end">
                  <motion.div
                    className="w-full rounded-t-xl bg-[#D7E400]/80 group-hover:bg-[#D7E400] transition-colors duration-500"
                    initial={{ height: 0 }}
                    whileInView={{ height: `${p.v * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2 + i * 0.1, ease }}
                  />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-white/60">{p.k}</span>
                </div>
              ))}
            </div>
            <div className="mt-5 pt-4 border-t border-white/15 flex items-end justify-between">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-white/60">Ponderado de ejemplo</span>
              <span className="font-display font-extrabold text-5xl tracking-tight text-[#D7E400]"><CountUp to={742} /></span>
            </div>
          </div>
        </Link>
      </motion.div>

      {/* Las demás */}
      {resto.map((h, i) => (
        <motion.div key={h.path} {...fadeUp(0.06 * (i + 1))} className="lg:col-span-3">
          <Link to={h.path} className="group relative h-full min-h-[150px] sm:min-h-[200px] rounded-[28px] bg-[#F4F4F4] border border-[#071D49]/5 p-6 sm:p-7 flex flex-col overflow-hidden">
            <span aria-hidden="true" className="absolute inset-0 bg-[#071D49] origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)]" />
            <div className="relative flex items-start justify-between gap-3">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#071D49]/75 group-hover:text-[#D7E400] transition-colors">{h.tag}</span>
              <ArrowUpRight size={20} aria-hidden="true" className="text-[#071D49] group-hover:text-[#D7E400] transition-all duration-500 group-hover:rotate-45" />
            </div>
            <h3 className="relative mt-auto pt-8 font-display font-extrabold text-2xl tracking-tight leading-tight text-[#071D49] group-hover:text-white transition-colors">{h.name}</h3>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
