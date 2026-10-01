import React, { useEffect, useRef, useState } from 'react';
import { animate, motion, useReducedMotion } from 'framer-motion';
import { Check, X, AlertCircle, Star, Share2 } from 'lucide-react';
import { LABEL, fmt, weightsText, shareText, shareResult } from './utils';

/** El puntaje sube (o baja) hasta su nuevo valor cuando cambian tus notas. */
function CountUp({ value, digits = 1 }) {
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(value);
  const prev = useRef(value);
  useEffect(() => {
    if (reduce || prev.current == null) { setShown(value); prev.current = value; return undefined; }
    const ctrl = animate(prev.current, value, { duration: 0.6, ease: [0.16, 1, 0.3, 1], onUpdate: setShown });
    prev.current = value;
    return () => ctrl.stop();
  }, [value, reduce]);
  return <>{fmt(shown, digits)}</>;
}

/** Escala: dónde está tu ponderado respecto del mínimo para postular y del
 *  último puntaje de corte. Las tres marcas en una sola línea. */
function Escala({ score, cutoff, minimo }) {
  if (score == null || (cutoff == null && minimo == null)) return null;
  const vals = [score, cutoff, minimo].filter((v) => v != null);
  const lo = Math.floor((Math.min(...vals) - 40) / 10) * 10;
  const hi = Math.ceil((Math.max(...vals) + 40) / 10) * 10;
  const pct = (v) => ((v - lo) / (hi - lo)) * 100;
  const llega = cutoff != null ? score >= cutoff : score >= minimo;
  return (
    <div className="mt-5" aria-hidden="true">
      <div className="relative h-16 mt-2">
        {/* línea base */}
        <div className="absolute left-0 right-0 top-6 h-2 rounded-full bg-[#071D49]/10" />
        <motion.div
          className={`absolute left-0 top-6 h-2 rounded-full ${llega ? 'bg-[#D7E400]' : 'bg-[#071D49]'}`}
          initial={{ width: 0 }}
          animate={{ width: `${pct(score)}%` }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        />
        {minimo != null && (
          <span className="absolute -top-2 -translate-x-1/2 flex flex-col-reverse items-center" style={{ left: `${pct(minimo)}%` }}>
            <span className="w-0.5 h-7 bg-[#071D49]/40" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#071D49]/70 whitespace-nowrap">mínimo {fmt(minimo, 0)}</span>
          </span>
        )}
        {cutoff != null && (
          <span className="absolute top-3 -translate-x-1/2 flex flex-col items-center" style={{ left: `${pct(cutoff)}%` }}>
            <span className="w-0.5 h-8 bg-[#071D49]" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#071D49] whitespace-nowrap">corte {fmt(cutoff, 0)}</span>
          </span>
        )}
        <motion.span
          className="absolute top-[14px] -translate-x-1/2 w-6 h-6 rounded-full border-4 border-white shadow-md bg-[#071D49]"
          initial={{ left: '0%' }}
          animate={{ left: `${pct(score)}%` }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  );
}

/** Diferencia entre el puntaje del alumno y el corte, en palabras. */
export function CutoffDelta({ score, cutoff, compact = false }) {
  if (score == null || cutoff == null) return null;
  const diff = Math.round((score - cutoff) * 10) / 10;
  const above = diff >= 0;
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold ${
        above ? 'bg-emerald-50 text-emerald-800' : 'bg-amber-50 text-amber-900'
      }`}
    >
      {above
        ? diff === 0
          ? 'Justo en el corte'
          : `${compact ? '+' : 'Estás '}${fmt(diff, 1)} ${compact ? 'pts' : 'puntos sobre el corte'}`
        : `${compact ? '−' : 'Te faltan '}${fmt(-diff, 1)} ${compact ? 'pts' : 'puntos'}`}
    </span>
  );
}

function Requirement({ label, value, mine, ok }) {
  return (
    <div className="flex items-start gap-2.5">
      <span
        className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full ${
          ok == null ? 'bg-[#071D49]/10 text-[#071D49]' : ok ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
        }`}
        aria-hidden="true"
      >
        {ok == null ? <span className="h-1.5 w-1.5 rounded-full bg-[#071D49]" /> : ok ? <Check size={12} strokeWidth={3} /> : <X size={12} strokeWidth={3} />}
      </span>
      <p className="text-sm leading-snug">
        <span className="text-[#071D49]/70">{label}: </span>
        <span className="font-bold tabular-nums">{fmt(value)}</span>
        {mine != null && (
          <span className="text-[#071D49]/70">
            {' '}· tú <span className="font-semibold tabular-nums text-[#071D49]">{fmt(mine, 1)}</span>
          </span>
        )}
        {ok != null && <span className="sr-only">{ok ? ' (cumples)' : ' (no cumples)'}</span>}
      </p>
    </div>
  );
}

export default function CareerCard({ c, cutoff, cutoffLabel, cutoffYear, region, isFav, canFav, onToggleFav, onShared }) {
  const { r } = c;
  const passesMin = r.value != null && (c.min == null || r.value >= c.min);
  const passesClM1 = c.clm1 == null || c.minClM1 == null || c.clm1 >= c.minClM1;
  const ok = r.value != null && passesMin && passesClM1;
  const hasMins = c.min != null || c.minClM1 != null;

  const share = async () => {
    const how = await shareResult(shareText(c, r.value));
    if (onShared) onShared(how);
  };

  const sobreCorte = r.value != null && cutoff != null ? r.value >= cutoff : null;
  const estado = r.value == null
    ? null
    : !ok
      ? { tono: 'mal', txt: !passesMin ? 'Bajo el ponderado mínimo' : 'No llegas al promedio mínimo de C. Lectora y M1' }
      : sobreCorte === false
        ? { tono: 'cerca', txt: `Cumples los mínimos · te faltan ${fmt(Math.round((cutoff - r.value) * 10) / 10, 1)} pts para el corte` }
        : sobreCorte
          ? { tono: 'bien', txt: `Te alcanza: ${fmt(Math.round((r.value - cutoff) * 10) / 10, 1)} pts sobre el corte ${cutoffYear}` }
          : { tono: 'bien', txt: 'Cumples los mínimos para postular' };
  const TONO = {
    bien: 'bg-[#D7E400] text-[#071D49]',
    cerca: 'bg-amber-50 text-amber-900',
    mal: 'bg-rose-50 text-rose-800',
  };

  return (
    <article className={`relative bg-white rounded-[28px] p-5 sm:p-7 border overflow-hidden ${estado && estado.tono === 'bien' ? 'border-[#071D49]/20' : 'border-[#071D49]/5'}`} data-career={c.id}>
      {estado && estado.tono === 'bien' && <span aria-hidden="true" className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#D7E400]" />}
      <div className="flex items-start gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="font-display font-extrabold text-xl sm:text-2xl tracking-tight leading-tight">{c.n}</h3>
          <p className="text-sm text-[#071D49]/70 mt-1">
            {c.u} · {c.s}
            {region && <span className="whitespace-nowrap"> · {region}</span>}
          </p>
        </div>
        {r.value != null && (
          <div className="text-right flex-shrink-0">
            <p className="font-display text-4xl sm:text-5xl font-extrabold leading-none tracking-tight tabular-nums"><CountUp value={r.value} /></p>
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#071D49]/70 mt-1.5">tu ponderado</p>
          </div>
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {estado && (
          <p className={`text-xs sm:text-sm font-bold inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full ${TONO[estado.tono]}`}>
            {estado.tono === 'mal' ? <X size={14} /> : <Check size={14} />}
            {estado.txt}
          </p>
        )}
        {r.special && (
          <p className="text-xs font-semibold inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#F4F4F4] text-[#071D49]/80">
            <AlertCircle size={14} className="flex-shrink-0" /> Pide prueba especial de la universidad
          </p>
        )}
        {r.missing && (
          <p className="text-xs font-semibold inline-flex px-3 py-1.5 rounded-full bg-[#F4F4F4] text-[#071D49]/80">
            Te falta: {r.missing.map((m) => LABEL[m]).join(', ')}
          </p>
        )}
      </div>

      <Escala score={r.value} cutoff={cutoff} minimo={c.min} />

      {(hasMins || cutoff != null) && (
        <div className="mt-4 grid gap-x-6 gap-y-2 sm:grid-cols-2">
          {c.min != null && <Requirement label="Ponderado mínimo" value={c.min} mine={r.value} ok={r.value != null ? passesMin : null} />}
          {c.minClM1 != null && (
            <Requirement label="Promedio C. Lectora y M1" value={c.minClM1} mine={c.clm1} ok={c.clm1 != null ? passesClM1 : null} />
          )}
          {cutoff != null && (
            <Requirement label={`${cutoffLabel} ${cutoffYear}`} value={cutoff} mine={null} ok={null} />
          )}
        </div>
      )}

      <p className="text-xs text-[#071D49]/70 leading-relaxed mt-4">
        {weightsText(c.w)}
        {c.vac != null && ` · ${c.vac} vacantes`}
        {cutoff != null && ` · El corte cambia cada año: es solo una referencia.`}
      </p>

      <div className="mt-4 pt-4 border-t border-[#071D49]/10 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => onToggleFav(c.id)}
          disabled={!isFav && !canFav}
          aria-pressed={isFav}
          className={`min-h-[44px] inline-flex items-center gap-2 rounded-full px-4 text-sm font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
            isFav ? 'bg-[#071D49] text-white hover:bg-[#0B2A66]' : 'bg-[#F4F4F4] text-[#071D49] hover:bg-[#071D49]/10'
          }`}
          title={!isFav && !canFav ? 'Puedes comparar hasta 4 carreras' : undefined}
        >
          <Star size={16} className={isFav ? 'fill-[#D7E400] text-[#D7E400]' : ''} />
          {isFav ? 'Guardada' : canFav ? 'Comparar' : 'Comparar (máx. 4)'}
        </button>
        {r.value != null && (
          <button
            type="button"
            onClick={share}
            className="min-h-[44px] inline-flex items-center gap-2 rounded-full px-4 text-sm font-bold bg-[#F4F4F4] text-[#071D49] hover:bg-[#071D49]/10 transition-colors"
          >
            <Share2 size={16} /> Compartir
          </button>
        )}
      </div>
    </article>
  );
}
