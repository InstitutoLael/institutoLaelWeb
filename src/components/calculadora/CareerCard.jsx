import React from 'react';
import { Check, X, AlertCircle, Star, Share2 } from 'lucide-react';
import { LABEL, fmt, weightsText, shareText, shareResult } from './utils';

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

  return (
    <article className="bg-white rounded-[20px] p-4 sm:p-5 border border-[#071D49]/5 shadow-card" data-career={c.id}>
      <div className="flex items-start gap-3 sm:gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="font-display font-extrabold leading-tight">{c.n}</h3>
          <p className="text-sm text-[#071D49]/70 mt-0.5">
            {c.u} · {c.s}
            {region && <span className="whitespace-nowrap"> · {region}</span>}
          </p>
        </div>
        {r.value != null && (
          <div className="text-right flex-shrink-0">
            <p className="font-display text-2xl sm:text-3xl font-black leading-none tabular-nums">{fmt(r.value, 1)}</p>
            <p className="text-[11px] font-semibold text-[#071D49]/70 mt-1">tu ponderado</p>
          </div>
        )}
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {r.value != null && (
          <p className={`text-xs font-bold inline-flex items-center gap-1 px-2.5 py-1 rounded-full ${ok ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-800'}`}>
            {ok ? <Check size={14} /> : <X size={14} />}
            {ok ? 'Cumples los mínimos para postular' : !passesMin ? 'Bajo el ponderado mínimo' : 'No llegas al promedio mínimo'}
          </p>
        )}
        {r.special && (
          <p className="text-xs font-semibold inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-[#F4F4F4] text-[#071D49]/80">
            <AlertCircle size={14} className="flex-shrink-0" /> Pide prueba especial de la universidad
          </p>
        )}
        {r.missing && (
          <p className="text-xs font-semibold inline-flex px-2.5 py-1 rounded-xl bg-[#F4F4F4] text-[#071D49]/80">
            Te falta: {r.missing.map((m) => LABEL[m]).join(', ')}
          </p>
        )}
      </div>

      {(hasMins || cutoff != null) && (
        <div className={`mt-3 grid gap-3 ${hasMins && cutoff != null ? 'sm:grid-cols-2' : ''}`}>
          {hasMins && (
            <div className="rounded-2xl bg-[#F4F4F4] p-3.5">
              <p className="text-xs font-bold uppercase tracking-[0.12em] mb-2">Mínimos para postular</p>
              <div className="space-y-1.5">
                {c.min != null && <Requirement label="Ponderado mínimo" value={c.min} mine={r.value} ok={r.value != null ? passesMin : null} />}
                {c.minClM1 != null && (
                  <Requirement label="Promedio C. Lectora y M1" value={c.minClM1} mine={c.clm1} ok={c.clm1 != null ? passesClM1 : null} />
                )}
              </div>
            </div>
          )}
          {cutoff != null && (
            <div className="rounded-2xl border border-[#071D49]/10 p-3.5">
              <p className="text-xs font-bold uppercase tracking-[0.12em] mb-1">Puntaje de corte</p>
              <p className="text-sm">
                <span className="text-[#071D49]/70">{cutoffLabel} {cutoffYear}: </span>
                <span className="font-bold tabular-nums">{fmt(cutoff)}</span>
              </p>
              {r.value != null && (
                <div className="mt-2">
                  <CutoffDelta score={r.value} cutoff={cutoff} />
                </div>
              )}
              <p className="text-xs text-[#071D49]/70 mt-2 leading-snug">Referencia del proceso {cutoffYear}. El corte cambia cada año.</p>
            </div>
          )}
        </div>
      )}

      <p className="text-xs text-[#071D49]/70 leading-relaxed mt-3">
        {weightsText(c.w)}
        {c.vac != null && ` · ${c.vac} vacantes`}
      </p>

      <div className="mt-3 pt-3 border-t border-[#071D49]/5 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => onToggleFav(c.id)}
          disabled={!isFav && !canFav}
          aria-pressed={isFav}
          className={`min-h-[44px] inline-flex items-center gap-2 rounded-xl px-3.5 text-sm font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
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
            className="min-h-[44px] inline-flex items-center gap-2 rounded-xl px-3.5 text-sm font-semibold bg-[#F4F4F4] text-[#071D49] hover:bg-[#071D49]/10 transition-colors"
          >
            <Share2 size={16} /> Compartir
          </button>
        )}
      </div>
    </article>
  );
}
