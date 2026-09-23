import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Search, Check, X, AlertCircle, ArrowRight, Calculator } from 'lucide-react';

// Datos: DEMRE, Oferta Definitiva de Carreras, Vacantes y Ponderaciones.
// Se generan con scripts/parse-demre.cjs a partir del PDF oficial. Cuando el
// DEMRE publique el proceso siguiente, se vuelve a correr el script.
const BLUE = '#071D49';
const YELLOW = '#D7E400';
const STORAGE_KEY = 'lael_calculadora_puntajes';

const FIELDS = [
  { key: 'nem', label: 'NEM', hint: 'Puntaje de notas' },
  { key: 'rank', label: 'Ranking', hint: 'Puntaje ranking' },
  { key: 'cl', label: 'Comp. Lectora', hint: 'C. Lectora' },
  { key: 'm1', label: 'Matemática M1', hint: 'M1' },
  { key: 'm2', label: 'Matemática M2', hint: 'Opcional' },
  { key: 'his', label: 'Historia', hint: 'Opcional' },
  { key: 'cie', label: 'Ciencias', hint: 'Opcional' },
];

const LOWER = new Set(['de', 'del', 'la', 'las', 'los', 'y', 'en', 'e']);
const titleCase = (s) =>
  s.toLowerCase().split(' ').map((w, i) => (i > 0 && LOWER.has(w) ? w : w.charAt(0).toUpperCase() + w.slice(1))).join(' ');
const norm = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

function loadScores() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; } catch (_) { return {}; }
}

// Calcula el puntaje ponderado de una carrera. Devuelve { value } o { missing: [...] }.
function computeScore(w, sc) {
  const val = (k) => {
    const n = Number(sc[k]);
    return n >= 100 && n <= 1000 ? n : null;
  };
  if (w.esp) return { special: true };
  const missing = [];
  let total = 0;
  for (const k of ['nem', 'rank', 'cl', 'm1', 'm2', 'his', 'cie']) {
    if (!w[k]) continue;
    const v = val(k);
    if (v == null) missing.push(k);
    else total += (w[k] / 100) * v;
  }
  if (w.hc) {
    const best = Math.max(val('his') ?? -1, val('cie') ?? -1);
    if (best < 0) missing.push('his o cie');
    else total += (w.hc / 100) * best;
  }
  if (missing.length) return { missing };
  return { value: Math.round(total * 10) / 10 };
}

const LABEL = { nem: 'NEM', rank: 'Ranking', cl: 'C. Lectora', m1: 'M1', m2: 'M2', his: 'Historia', cie: 'Ciencias', 'his o cie': 'Historia o Ciencias' };

export default function Calculadora() {
  const [data, setData] = useState(null);
  const [scores, setScores] = useState(loadScores);
  const [query, setQuery] = useState('');
  const [uni, setUni] = useState('');

  useEffect(() => {
    import('../data/carreras-2026.json').then((m) => setData(m.default || m));
  }, []);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(scores)); } catch (_) {}
  }, [scores]);

  const careers = useMemo(() => {
    if (!data) return [];
    return data.universidades.flatMap((u) => u.c.map((c) => ({ ...c, u: titleCase(u.u), key: `${u.u}-${c.id}` })));
  }, [data]);

  const universities = useMemo(() => (data ? data.universidades.map((u) => titleCase(u.u)) : []), [data]);

  const results = useMemo(() => {
    const q = norm(query.trim());
    if (q.length < 3 && !uni) return [];
    return careers
      .filter((c) => (!uni || c.u === uni) && (!q || norm(c.n).includes(q) || norm(c.u).includes(q)))
      .slice(0, 60)
      .map((c) => {
        const r = computeScore(c.w, scores);
        const clm1 = Number(scores.cl) && Number(scores.m1) ? (Number(scores.cl) + Number(scores.m1)) / 2 : null;
        return { ...c, r, clm1 };
      });
  }, [careers, query, uni, scores]);

  const setScore = (k, v) => setScores((s) => ({ ...s, [k]: v.replace(/[^0-9]/g, '').slice(0, 4) }));

  return (
    <div className="w-full bg-[#F4F4F4] text-[#071D49] font-sans">
      <Helmet>
        <title>Calculadora de Puntaje Ponderado PAES | Instituto Lael</title>
        <meta name="description" content="Calcula gratis tu puntaje ponderado PAES para más de 2.000 carreras de 47 universidades, con las ponderaciones oficiales del DEMRE." />
      </Helmet>

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative -mt-20 pt-36 pb-14 sm:pb-16 px-5 sm:px-6 text-white" style={{ backgroundColor: BLUE }}>
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-[0.2em]" style={{ backgroundColor: YELLOW, color: BLUE }}>
            <Calculator size={14} /> Gratis
          </motion.div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight leading-[1.05] mb-5 text-white">
            ¿Te alcanza para <br /> <span style={{ color: YELLOW }}>la carrera que quieres?</span>
          </h1>
          <p className="text-white/75 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Pon tus puntajes, busca la carrera y te mostramos tu puntaje ponderado al tiro. Más de 2.000 carreras de 47 universidades.
          </p>
        </div>
      </section>

      <section className="px-4 sm:px-6 py-10 sm:py-12">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6 items-start">
          {/* ── PUNTAJES ──────────────────────────────────────────── */}
          <div className="bg-white rounded-[28px] p-5 sm:p-6 border border-[#071D49]/5 shadow-card lg:sticky lg:top-28">
            <h2 className="font-display text-lg font-extrabold uppercase tracking-tight mb-1">1. Tus puntajes</h2>
            <p className="text-sm text-[#071D49]/70 mb-4 leading-relaxed">De 100 a 1.000. Si no has dado la PAES, prueba con puntajes de ensayo.</p>
            <div className="grid grid-cols-2 gap-3">
              {FIELDS.map((f) => (
                <label key={f.key} className="block">
                  <span className="block text-xs font-bold mb-1">{f.label}</span>
                  <input
                    inputMode="numeric"
                    value={scores[f.key] || ''}
                    onChange={(e) => setScore(f.key, e.target.value)}
                    placeholder={f.hint}
                    className="w-full rounded-xl border border-[#071D49]/15 bg-[#F4F4F4] px-3 py-3 min-h-[48px] text-base font-semibold focus:outline-none focus:ring-2 focus:ring-[#071D49] placeholder:text-[#071D49]/45 placeholder:font-normal placeholder:text-sm"
                  />
                </label>
              ))}
            </div>
            <button onClick={() => setScores({})} className="mt-2 min-h-[44px] text-sm font-semibold underline underline-offset-4 text-[#071D49]/70 hover:text-[#071D49]">
              Borrar puntajes
            </button>
          </div>

          {/* ── BUSCADOR Y RESULTADOS ─────────────────────────────── */}
          <div>
            <div className="bg-white rounded-[28px] p-5 sm:p-6 border border-[#071D49]/5 shadow-card mb-4">
              <h2 className="font-display text-lg font-extrabold uppercase tracking-tight mb-4">2. Busca la carrera</h2>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#071D49]/40" />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Ej: medicina, derecho, ingeniería"
                    className="w-full rounded-xl border border-[#071D49]/15 bg-[#F4F4F4] pl-10 pr-3 py-3 min-h-[48px] text-base focus:outline-none focus:ring-2 focus:ring-[#071D49]"
                  />
                </div>
                <select
                  value={uni}
                  onChange={(e) => setUni(e.target.value)}
                  className="sm:w-64 min-h-[48px] rounded-xl border border-[#071D49]/15 bg-[#F4F4F4] px-3 py-3 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#071D49]"
                >
                  <option value="">Todas las universidades</option>
                  {universities.map((u) => <option key={u} value={u}>{u}</option>)}
                </select>
              </div>
            </div>

            {!data && <p className="text-center text-sm text-[#071D49]/70 py-10">Cargando carreras…</p>}
            {data && results.length === 0 && (
              <p className="text-center text-sm text-[#071D49]/70 py-10">
                Escribe al menos 3 letras del nombre de la carrera, o elige una universidad.
              </p>
            )}

            <div className="space-y-3">
              {results.map((c) => {
                const { r } = c;
                const passesMin = r.value != null && (c.min == null || r.value >= c.min);
                const passesClM1 = c.clm1 == null || c.minClM1 == null || c.clm1 >= c.minClM1;
                const ok = r.value != null && passesMin && passesClM1;
                return (
                  <div key={c.key} className="bg-white rounded-[20px] p-4 sm:p-5 border border-[#071D49]/5 shadow-card">
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className="flex-1 min-w-0">
                        <p className="font-display font-extrabold leading-tight">{c.n}</p>
                        <p className="text-sm text-[#071D49]/70 mt-0.5">{c.u} · {c.s}</p>
                      </div>
                      {r.value != null && (
                        <div className="text-right flex-shrink-0">
                          <p className="font-display text-2xl sm:text-3xl font-black leading-none tabular-nums">{r.value.toLocaleString('es-CL')}</p>
                        </div>
                      )}
                    </div>

                    <div className="mt-3">
                      {r.value != null && (
                        <p className={`text-xs font-bold inline-flex items-center gap-1 px-2.5 py-1 rounded-full ${ok ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-800'}`}>
                          {ok ? <Check size={14} /> : <X size={14} />}
                          {ok ? 'Puedes postular' : !passesClM1 ? 'No llegas al promedio mínimo' : 'Bajo el mínimo para postular'}
                        </p>
                      )}
                      {r.special && (
                        <p className="text-xs font-semibold inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-[#F4F4F4] text-[#071D49]/80"><AlertCircle size={14} className="flex-shrink-0" /> Pide prueba especial de la universidad</p>
                      )}
                      {r.missing && (
                        <p className="text-xs font-semibold inline-flex px-2.5 py-1 rounded-xl bg-[#F4F4F4] text-[#071D49]/80">Te falta: {r.missing.map((m) => LABEL[m]).join(', ')}</p>
                      )}
                    </div>

                    <p className="text-xs text-[#071D49]/70 leading-relaxed mt-3 pt-3 border-t border-[#071D49]/5">
                      {Object.entries(c.w).filter(([k, v]) => typeof v === 'number' && v > 0).map(([k, v]) => `${k === 'hc' ? 'Hist. o Cs.' : k === 'esp' ? 'Prueba especial' : LABEL[k]} ${v}%`).join(' · ')}
                      {c.min != null && ` · Mínimo ponderado ${c.min}`}
                      {c.minClM1 != null && ` · Promedio C.Lectora y M1 mínimo ${c.minClM1}`}
                      {c.vac != null && ` · ${c.vac} vacantes`}
                    </p>
                  </div>
                );
              })}
            </div>

            <p className="text-xs text-[#071D49]/70 mt-6 leading-relaxed">
              Ponderaciones oficiales del DEMRE, Proceso de Admisión {data?.proceso || 2026}. Las del proceso 2027 las publica el DEMRE a fines de septiembre y las actualizaremos. Cumplir los mínimos no asegura el ingreso: depende del puntaje de corte de cada año. Confirma siempre en demre.cl y en la universidad.
            </p>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section className="px-5 sm:px-6 pb-16 sm:pb-20 lg:pb-28">
        <div className="max-w-3xl mx-auto rounded-[32px] p-8 sm:p-10 text-center text-white" style={{ backgroundColor: BLUE }}>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold uppercase tracking-tight mb-4">¿Te faltan puntos?</h2>
          <p className="text-white/75 mb-8 max-w-xl mx-auto">
            En el preu de Lael tomas solo los ramos que necesitas subir, desde $10.000 al mes, con matrícula gratis y becas.
          </p>
          <Link to="/paes" className="min-h-[48px] w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#D7E400] text-[#071D49] hover:bg-white font-display font-extrabold text-xs sm:text-sm uppercase tracking-wider px-8 py-4 rounded-2xl transition-all">
            Ver el preu PAES <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
