import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PAES_INICIO } from '../data/admision';
import { ahora } from '../lib/hidratacion';

// Cuenta regresiva a la PAES regular. Se actualiza cada minuto (no cada
// segundo: no queremos que la página se sienta ansiosa). Cuando la prueba
// ya pasó, no se muestra.
function restante() {
  const ms = new Date(PAES_INICIO).getTime() - ahora();
  if (ms <= 0) return null;
  const min = Math.floor(ms / 60000);
  return { dias: Math.floor(min / 1440), horas: Math.floor((min % 1440) / 60), minutos: min % 60 };
}

export default function PaesCountdown({ dark = true, compact = false, className = '' }) {
  const [r, setR] = useState(restante);
  useEffect(() => {
    setR(restante()); // corrige a la hora real si la página venía pre-dibujada
    const id = setInterval(() => setR(restante()), 60000);
    return () => clearInterval(id);
  }, []);
  if (!r) return null;

  const box = dark ? 'bg-white/[0.06] border-white/10 text-white' : 'bg-white border-[#071D49]/10 text-[#071D49]';
  const muted = dark ? 'text-white/60' : 'text-[#071D49]/60';
  const items = [['días', r.dias], ['horas', r.horas], ['min', r.minutos]];

  return (
    <div className={className} role="timer" aria-label={`Faltan ${r.dias} días para la PAES regular`}>
      <p className={`text-xs font-bold uppercase tracking-[0.18em] mb-3 ${muted}`}>
        Faltan para la PAES <span className="normal-case tracking-normal">(30 nov)</span>
      </p>
      <div className="flex gap-2 sm:gap-3" aria-hidden="true">
        {items.map(([label, n]) => (
          <div key={label} className={`rounded-2xl border ${box} ${compact ? 'px-3 py-2 min-w-[64px]' : 'px-4 py-3 min-w-[78px] sm:min-w-[92px]'} text-center`}>
            <p className={`font-display font-extrabold tabular-nums leading-none ${compact ? 'text-2xl' : 'text-3xl sm:text-4xl'}`}>{String(n).padStart(2, '0')}</p>
            <p className={`text-[11px] uppercase tracking-[0.12em] font-bold mt-1 ${muted}`}>{label}</p>
          </div>
        ))}
      </div>
      {!compact && (
        <Link to="/calendario-admision" className={`inline-block mt-3 text-sm font-semibold underline underline-offset-4 ${dark ? 'text-white/80 hover:text-white' : ''}`}>
          Ver todas las fechas de la Admisión 2027
        </Link>
      )}
    </div>
  );
}

// Franja para las páginas de PAES: a quien da la prueba este año le damos
// las fechas y la calculadora; a quien no, le recordamos que partimos en
// marzo. Desaparece sola cuando pasa la prueba.
export function PaesEsteAnio() {
  if (!restante()) return null;
  return (
    <section className="px-5 sm:px-6 py-12 sm:py-14 bg-[#071D49] text-white border-t border-white/10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#D7E400] mb-3">¿Das la PAES este año?</p>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight leading-[1.05] mb-4">
            Aprovecha estas <span className="accent-serif text-[#D7E400]">semanas.</span>
          </h2>
          <p className="text-white/75 leading-relaxed mb-5">
            Revisa las fechas, calcula con qué puntaje entras a tu carrera y practica con nuestros videos. Y si quieres otra oportunidad, en marzo partimos con el preu para la PAES 2027.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-bold">
            <Link to="/calendario-admision" className="underline underline-offset-4 min-h-[44px] inline-flex items-center">Calendario Admisión 2027</Link>
            <Link to="/calculadora" className="underline underline-offset-4 min-h-[44px] inline-flex items-center">Calculadora de puntaje</Link>
            <Link to="/glosario-paes" className="underline underline-offset-4 min-h-[44px] inline-flex items-center">Glosario PAES</Link>
          </div>
        </div>
        <div className="lg:justify-self-end"><PaesCountdown /></div>
      </div>
    </section>
  );
}
