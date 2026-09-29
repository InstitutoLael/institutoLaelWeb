import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Check, ExternalLink } from 'lucide-react';
import PageHero, { fadeUp, SECTION, BTN_YELLOW } from '../components/ui/PageHero';
import PaesCountdown from '../components/PaesCountdown';
import { CALENDARIO_2027, FUENTE_ADMISION } from '../data/admision';

const MESES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
const dia = (iso) => { const [y, m, d] = iso.split('-').map(Number); return { d, m: MESES[m - 1], y }; };
const hoy = new Date().toISOString().slice(0, 10);

export default function CalendarioAdmision() {
  return (
    <div className="w-full bg-[#F4F4F4] text-[#071D49] overflow-x-clip font-sans">
      <Helmet>
        <title>Calendario Admisión 2027: fechas PAES | Instituto Lael</title>
        <meta name="description" content="Todas las fechas de la Admisión 2027 en un solo lugar: PAES regular el 30 de noviembre, 1 y 2 de diciembre; resultados el 4 de enero; postulación del 4 al 7 de enero y matrículas." />
      </Helmet>

      <PageHero eyebrow="Admisión 2027" title="Todas las fechas," accent="en un solo lugar.">
        <p className="mb-8">Desde la inscripción hasta la matrícula. Guárdala: la actualizamos si el DEMRE cambia algo.</p>
        <div className="flex justify-center"><PaesCountdown compact /></div>
      </PageHero>

      <section className={SECTION}>
        <div className="max-w-3xl mx-auto">
          <ol className="space-y-3">
            {CALENDARIO_2027.map((e, i) => {
              const inicio = dia(e.fecha);
              const fin = e.fin && dia(e.fin);
              const paso = (e.fin || e.fecha) < hoy;
              const ahora = !paso && e.fecha <= hoy;
              return (
                <motion.li
                  key={e.t}
                  {...fadeUp(Math.min(i, 5) * 0.03)}
                  className={`flex gap-4 sm:gap-6 rounded-[24px] p-5 sm:p-6 border ${e.destacado ? 'bg-[#071D49] text-white border-transparent shadow-lael' : 'bg-white border-[#071D49]/5 shadow-card'} ${paso ? 'opacity-60' : ''}`}
                >
                  <div className={`w-20 sm:w-24 flex-shrink-0 text-center rounded-2xl py-3 ${e.destacado ? 'bg-[#D7E400] text-[#071D49]' : 'bg-[#F4F4F4]'}`}>
                    <p className="font-display font-extrabold text-2xl leading-none">{inicio.d}{fin && fin.m === inicio.m ? `–${fin.d}` : ''}</p>
                    <p className="text-xs font-bold uppercase tracking-wider mt-1">{inicio.m}{fin && fin.m !== inicio.m ? ` – ${fin.d} ${fin.m}` : ''}</p>
                    <p className="text-[11px] opacity-70">{inicio.y}</p>
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h2 className="font-display font-extrabold text-lg sm:text-xl">{e.t}</h2>
                      {paso && <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#071D49]/10"><Check size={12} /> Listo</span>}
                      {ahora && <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#D7E400] text-[#071D49]">Ahora</span>}
                    </div>
                    <p className={e.destacado ? 'text-white/80' : 'text-[#071D49]/70'}>{e.d}</p>
                  </div>
                </motion.li>
              );
            })}
          </ol>
          <p className="text-sm text-[#071D49]/60 mt-6 flex items-center gap-1.5">
            Fuente: Mineduc y DEMRE. Confirma siempre en
            <a href={FUENTE_ADMISION.url} target="_blank" rel="noopener noreferrer" className="underline inline-flex items-center gap-1">{FUENTE_ADMISION.label} <ExternalLink size={12} /></a>
          </p>

          <div className="mt-12 rounded-[28px] bg-white p-6 sm:p-8 border border-[#071D49]/5 shadow-card text-center">
            <h2 className="font-display text-2xl font-extrabold mb-2">¿Y ahora qué <span className="accent-serif">hago?</span></h2>
            <p className="text-[#071D49]/70 mb-6">Calcula con qué puntaje entras a tu carrera, revisa las palabras que no entiendas y, si quieres prepararte para la PAES 2027, asegura tu cupo.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/calculadora" className={BTN_YELLOW}>Calcular mi puntaje <ArrowRight size={16} /></Link>
              <Link to="/glosario-paes" className="min-h-[48px] inline-flex items-center justify-center font-bold underline underline-offset-4">Glosario PAES</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
