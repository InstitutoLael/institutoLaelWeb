import React, { useEffect, useState } from 'react';
import { ChevronDown, ArrowUp } from 'lucide-react';

// Tablas OFICIALES del DEMRE de transformación de notas (NEM) a puntaje:
// https://demre.cl/paes/factores-seleccion/tabla-transformacion-nem
// Se generan con scripts/fetch-nem.cjs -> src/data/nem-tablas.json (se cargan
// sólo cuando el alumno abre esta herramienta).
const GROUPS = [
  { key: 'A', label: 'Científico-Humanista diurno' },
  { key: 'B', label: 'Científico-Humanista adultos (vespertino / nocturno / exámenes libres)' },
  { key: 'C', label: 'Técnico-Profesional' },
];

/** "6,25" | "6.25" | "625" -> 6.25 (null si no es un promedio válido 4,00–7,00). */
function parseGrade(s) {
  let t = String(s).trim().replace(',', '.');
  if (/^\d{3}$/.test(t)) t = t[0] + '.' + t.slice(1);
  if (!/^\d(\.\d{1,2})?$/.test(t)) return null;
  const v = parseFloat(t);
  return v >= 4 && v <= 7 ? v : null;
}

export default function NemCalculator({ onUse }) {
  const [open, setOpen] = useState(false);
  const [tables, setTables] = useState(null);
  const [grade, setGrade] = useState('');
  const [group, setGroup] = useState('A');
  const [used, setUsed] = useState(false);

  useEffect(() => {
    if (open && !tables) import('../../data/nem-tablas.json').then((m) => setTables(m.default || m));
  }, [open, tables]);

  const g = parseGrade(grade);
  const score = tables && g != null ? tables.grupos[group][Math.round((g - 4) * 100)] : null;
  const showError = grade.trim().length >= 1 && g == null && !/^[4-7][.,]?\d?$/.test(grade.trim());

  return (
    <div className="mt-4 rounded-2xl border border-[#071D49]/10">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="nem-calc"
        className="w-full min-h-[48px] flex items-center justify-between gap-3 px-4 py-3 text-left"
      >
        <span>
          <span className="block text-sm font-bold">¿No sabes tu puntaje NEM?</span>
          <span className="block text-xs text-[#071D49]/70">Calcúlalo con tu promedio de notas</span>
        </span>
        <ChevronDown size={18} className={`flex-shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div id="nem-calc" className="px-4 pb-4">
          <label className="block">
            <span className="block text-xs font-bold mb-1">Promedio de notas de enseñanza media</span>
            <input
              inputMode="decimal"
              value={grade}
              onChange={(e) => { setGrade(e.target.value.replace(/[^0-9.,]/g, '').slice(0, 4)); setUsed(false); }}
              placeholder="Ej: 6,25"
              aria-invalid={showError}
              className="w-full rounded-xl border border-[#071D49]/15 bg-[#F4F4F4] px-3 py-3 min-h-[48px] text-base font-semibold focus:outline-none focus:ring-2 focus:ring-[#071D49] placeholder:text-[#071D49]/45 placeholder:font-normal placeholder:text-sm"
            />
          </label>
          {showError && <p className="text-xs font-semibold text-rose-700 mt-1">Escribe un promedio entre 4,0 y 7,0 (ej: 5,85).</p>}

          <fieldset className="mt-3">
            <legend className="block text-xs font-bold mb-1">Tipo de enseñanza media</legend>
            <div className="space-y-1.5">
              {GROUPS.map((o) => (
                <label key={o.key} className="flex items-start gap-2.5 min-h-[44px] rounded-xl px-3 py-2.5 bg-[#F4F4F4] cursor-pointer has-[:checked]:bg-[#071D49] has-[:checked]:text-white">
                  <input
                    type="radio"
                    name="nem-group"
                    value={o.key}
                    checked={group === o.key}
                    onChange={() => { setGroup(o.key); setUsed(false); }}
                    className="mt-0.5 accent-[#D7E400]"
                  />
                  <span className="text-sm leading-snug">{o.label}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <div className="mt-3 flex items-center justify-between gap-3 rounded-xl bg-[#071D49] text-white px-4 py-3" aria-live="polite">
            <span className="text-sm text-white/75">Tu puntaje NEM</span>
            <span className="font-display text-2xl font-black tabular-nums">{score ?? '—'}</span>
          </div>

          <button
            type="button"
            disabled={score == null}
            onClick={() => { onUse(String(score)); setUsed(true); }}
            className="mt-2 w-full min-h-[48px] inline-flex items-center justify-center gap-2 rounded-2xl bg-[#D7E400] text-[#071D49] font-display font-extrabold text-xs uppercase tracking-wider px-4 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#071D49] hover:text-white transition-colors"
          >
            <ArrowUp size={16} /> {used ? 'Listo, se usó como NEM' : 'Usar como NEM'}
          </button>

          <p className="text-xs text-[#071D49]/70 mt-3 leading-relaxed">
            Tablas oficiales del DEMRE{tables ? `, Proceso de Admisión ${tables.proceso}` : ''} (
            <a href="https://demre.cl/paes/factores-seleccion/tabla-transformacion-nem" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 font-semibold">
              demre.cl
            </a>
            ). Usa tu promedio con dos decimales, tal como sale en tu concentración de notas.
          </p>
        </div>
      )}
    </div>
  );
}
