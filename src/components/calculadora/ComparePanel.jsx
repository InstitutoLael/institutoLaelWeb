import React from 'react';
import { X, Star, Check } from 'lucide-react';
import { LABEL, fmt } from './utils';
import { CutoffDelta } from './CareerCard';

const WEIGHT_KEYS = ['nem', 'rank', 'cl', 'm1', 'm2', 'his', 'cie', 'hc', 'esp'];

function status(c) {
  const { r } = c;
  if (r.special) return { text: 'Prueba especial', tone: 'muted' };
  if (r.missing) return { text: `Falta: ${r.missing.map((m) => LABEL[m]).join(', ')}`, tone: 'muted' };
  const passesMin = c.min == null || r.value >= c.min;
  const passesClM1 = c.clm1 == null || c.minClM1 == null || c.clm1 >= c.minClM1;
  return passesMin && passesClM1 ? { text: 'Cumples mínimos', tone: 'ok' } : { text: 'No cumples mínimos', tone: 'bad' };
}

/** Tabla lado a lado de hasta 4 carreras favoritas. */
export default function ComparePanel({ items, cutoffs, cutoffLabel, cutoffYear, regionOf, onRemove, onClear }) {
  if (!items.length) return null;
  const weightRows = WEIGHT_KEYS.filter((k) => items.some((c) => c.w[k]));
  const cols = `112px repeat(${items.length}, minmax(168px, 1fr))`;
  const minWidth = 112 + items.length * 168;

  const Row = ({ label, children, strong = false }) => (
    <div className="contents">
      <div className="sticky left-0 z-10 bg-white py-2.5 pr-3 text-xs font-bold text-[#071D49]/70 border-t border-[#071D49]/5">{label}</div>
      {items.map((c) => (
        <div key={c.id} className={`py-2.5 px-2 border-t border-[#071D49]/5 text-sm ${strong ? 'font-display font-black text-xl tabular-nums' : ''}`}>
          {children(c)}
        </div>
      ))}
    </div>
  );

  return (
    <div className="bg-white rounded-[28px] p-5 sm:p-8 border border-[#071D49]/5 shadow-card">
      <div className="flex flex-wrap items-end justify-between gap-3 mb-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#D7E400]" aria-hidden="true" /> Comparar carreras
          </p>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold uppercase tracking-tight mt-1">Tus favoritas, lado a lado</h2>
        </div>
        <button type="button" onClick={onClear} className="min-h-[44px] text-sm font-semibold underline underline-offset-4 text-[#071D49]/70 hover:text-[#071D49]">
          Quitar todas
        </button>
      </div>

      <div className="overflow-x-auto -mx-5 px-5 sm:mx-0 sm:px-0" role="region" aria-label="Tabla comparativa" tabIndex={0}>
        <div className="grid w-full" style={{ gridTemplateColumns: cols, minWidth }}>
          {/* Encabezado */}
          <div className="sticky left-0 z-10 bg-white" />
          {items.map((c) => (
            <div key={c.id} className="px-2 pb-3">
              <div className="flex items-start gap-1.5">
                <Star size={16} className="mt-0.5 flex-shrink-0 fill-[#071D49] text-[#071D49]" aria-hidden="true" />
                <p className="font-display font-extrabold leading-tight text-sm sm:text-base flex-1">{c.n}</p>
                <button
                  type="button"
                  onClick={() => onRemove(c.id)}
                  aria-label={`Quitar ${c.n} de la comparación`}
                  className="-mt-2 -mr-2 h-11 w-11 flex-shrink-0 inline-flex items-center justify-center rounded-full text-[#071D49]/60 hover:bg-[#F4F4F4] hover:text-[#071D49]"
                >
                  <X size={16} />
                </button>
              </div>
              <p className="text-xs text-[#071D49]/70 mt-1">
                {c.u} · {c.s}
                {regionOf(c) && ` · ${regionOf(c)}`}
              </p>
            </div>
          ))}

          <Row label="Tu ponderado" strong>{(c) => (c.r.value != null ? fmt(c.r.value, 1) : <span className="text-sm font-sans font-normal text-[#071D49]/70">—</span>)}</Row>
          <Row label="Estado">
            {(c) => {
              const s = status(c);
              return (
                <span className={`inline-flex items-center gap-1 text-xs font-bold ${s.tone === 'ok' ? 'text-emerald-800' : s.tone === 'bad' ? 'text-rose-800' : 'text-[#071D49]/70'}`}>
                  {s.tone === 'ok' && <Check size={14} />}
                  {s.tone === 'bad' && <X size={14} />}
                  {s.text}
                </span>
              );
            }}
          </Row>
          <Row label={`Corte ${cutoffYear}`}>
            {(c) => {
              const cut = cutoffs[c.id];
              if (!cut) return <span className="text-[#071D49]/60">Sin dato</span>;
              return (
                <div className="space-y-1">
                  <p className="font-bold tabular-nums">{fmt(cut[0])}</p>
                  <p className="text-xs text-[#071D49]/70">{cutoffLabel(cut[1])}</p>
                  {c.r.value != null && <CutoffDelta score={c.r.value} cutoff={cut[0]} compact />}
                </div>
              );
            }}
          </Row>
          <Row label="Ponderado mínimo">{(c) => (c.min != null ? <span className="tabular-nums">{fmt(c.min)}</span> : '—')}</Row>
          <Row label="Prom. C. Lectora y M1 mínimo">{(c) => (c.minClM1 != null ? <span className="tabular-nums">{fmt(c.minClM1)}</span> : '—')}</Row>
          <Row label="Vacantes">{(c) => (c.vac != null ? <span className="tabular-nums">{c.vac}</span> : '—')}</Row>
          {weightRows.map((k) => (
            <Row key={k} label={LABEL[k]}>
              {(c) => (c.w[k] ? <span className="tabular-nums font-semibold">{c.w[k]}%</span> : <span className="text-[#071D49]/40">—</span>)}
            </Row>
          ))}
        </div>
      </div>
      <p className="text-xs text-[#071D49]/70 mt-4 leading-relaxed">
        Los puntajes de corte son del proceso {cutoffYear} y cambian cada año. "Sin dato" significa que la universidad no publicó el corte en una fuente oficial que hayamos podido revisar.
      </p>
    </div>
  );
}
