import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import PageHero from '../components/ui/PageHero';
import { Link } from 'react-router-dom';
import { Search, ArrowRight, Star, ArrowDown } from 'lucide-react';
import { CtaBand, Btn } from './Programas/shared';
import CareerCard from '../components/calculadora/CareerCard';
import NemCalculator from '../components/calculadora/NemCalculator';
import ComparePanel from '../components/calculadora/ComparePanel';
import { computeScore, clM1, titleCase, norm, loadFavs, saveFavs, MAX_FAVS } from '../components/calculadora/utils';

// Datos (todos se cargan con import() para que la página pese poco):
//  - carreras-2027.json: DEMRE, Oferta Definitiva de Carreras, Vacantes y
//    Ponderaciones (scripts/parse-demre.cjs a partir del PDF oficial).
//  - cortes-2026.json: puntajes de corte publicados por cada universidad
//    (scripts/fetch-cortes.cjs; ver scripts/fetch-cortes-report.txt).
//  - regiones-sedes.json: región de cada sede (scripts/check-regiones.cjs).
//  - nem-tablas.json: tablas oficiales NEM del DEMRE (scripts/fetch-nem.cjs),
//    se carga sólo al abrir la calculadora NEM.
const BLUE = '#071D49';
const YELLOW = '#D7E400';
const STORAGE_KEY = 'lael_calculadora_puntajes';
const MAX_RESULTS = 60;
const SUGERENCIAS = ['Medicina', 'Derecho', 'Psicología', 'Enfermería', 'Ingeniería Civil', 'Pedagogía', 'Arquitectura'];

const FIELDS = [
  { key: 'nem', label: 'NEM', hint: 'Puntaje de notas' },
  { key: 'rank', label: 'Ranking', hint: 'Puntaje ranking' },
  { key: 'cl', label: 'Comp. Lectora', hint: 'C. Lectora' },
  { key: 'm1', label: 'Matemática M1', hint: 'M1' },
  { key: 'm2', label: 'Matemática M2', hint: 'Opcional' },
  { key: 'his', label: 'Historia', hint: 'Opcional' },
  { key: 'cie', label: 'Ciencias', hint: 'Opcional' },
];

const CUTOFF_LABEL = { s: 'Último seleccionado', m: 'Último matriculado', c: 'Puntaje de corte' };

function loadScores() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; } catch (_) { return {}; }
}

export default function Calculadora() {
  const [data, setData] = useState(null);
  const [cortes, setCortes] = useState(null);
  const [regiones, setRegiones] = useState(null);
  const [scores, setScores] = useState(loadScores);
  const [query, setQuery] = useState('');
  const [uni, setUni] = useState('');
  const [region, setRegion] = useState('');
  const [favs, setFavs] = useState(loadFavs);
  const [toast, setToast] = useState('');
  const compareRef = useRef(null);
  const nemRef = useRef(null);

  useEffect(() => {
    import('../data/carreras-2027.json').then((m) => setData(m.default || m));
    import('../data/cortes-2026.json').then((m) => setCortes(m.default || m)).catch(() => setCortes({ d: {} }));
    import('../data/regiones-sedes.json').then((m) => setRegiones(m.default || m)).catch(() => {});
  }, []);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(scores)); } catch (_) {}
  }, [scores]);

  useEffect(() => { saveFavs(favs); }, [favs]);

  useEffect(() => {
    if (!toast) return undefined;
    const t = setTimeout(() => setToast(''), 2500);
    return () => clearTimeout(t);
  }, [toast]);

  const careers = useMemo(() => {
    if (!data) return [];
    return data.universidades.flatMap((u) =>
      u.c.map((c) => ({ ...c, U: u.u, u: titleCase(u.u), key: `${u.u}-${c.id}` })),
    );
  }, [data]);

  const byId = useMemo(() => new Map(careers.map((c) => [c.id, c])), [careers]);
  const universities = useMemo(() => (data ? data.universidades.map((u) => titleCase(u.u)) : []), [data]);

  const regionCode = (c) => (regiones ? regiones.sedes[`${c.U}|${c.s}`] : null);
  const regionName = (c) => {
    const r = regionCode(c);
    return r ? regiones.regiones[r] : null;
  };

  const withScore = (c) => ({ ...c, r: computeScore(c.w, scores), clm1: clM1(scores) });

  const { results, total } = useMemo(() => {
    const q = norm(query.trim());
    if (q.length < 3 && !uni && !region) return { results: [], total: 0 };
    const all = careers.filter(
      (c) =>
        (!uni || c.u === uni) &&
        (!region || (regiones && regiones.sedes[`${c.U}|${c.s}`] === region)) &&
        (q.length < 3 || norm(c.n).includes(q) || norm(c.u).includes(q)),
    );
    return { results: all.slice(0, MAX_RESULTS).map(withScore), total: all.length };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [careers, query, uni, region, scores, regiones]);

  const favItems = useMemo(() => favs.map((id) => byId.get(id)).filter(Boolean).map(withScore),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [favs, byId, scores]);

  const setScore = (k, v) => setScores((s) => ({ ...s, [k]: v.replace(/[^0-9]/g, '').slice(0, 4) }));

  const toggleFav = (id) =>
    setFavs((f) => (f.includes(id) ? f.filter((x) => x !== id) : f.length >= MAX_FAVS ? f : [...f, id]));

  // Pone el NEM calculado en su casilla y la resalta un momento (sin enfocar,
  // para no abrir el teclado en el celular).
  const [nemFlash, setNemFlash] = useState(false);
  const applyNem = (v) => {
    setScore('nem', v);
    setNemFlash(true);
    setTimeout(() => setNemFlash(false), 1600);
    if (nemRef.current) nemRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const listos = ['nem', 'rank', 'cl', 'm1'].filter((k) => { const v = Number(scores[k]); return v >= 100 && v <= 1000; }).length;
  const cutoffYear = cortes?.proceso || 2026;
  const cutoffOf = (id) => (cortes && cortes.d[id] ? cortes.d[id] : null);

  return (
    <div className="w-full bg-[#F4F4F4] text-[#071D49] font-sans overflow-x-clip">
      <Helmet>
        <title>Calculadora de Puntaje Ponderado PAES | Instituto Lael</title>
        <meta name="description" content="Calcula gratis tu puntaje ponderado PAES para más de 2.000 carreras de 47 universidades, con las ponderaciones oficiales del DEMRE." />
      </Helmet>

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <PageHero eyebrow="Calculadora PAES · Gratis" title="¿Te alcanza para" accent="la carrera que quieres?">
        <p>Pon tus puntajes, busca la carrera y te mostramos tu puntaje ponderado al tiro. Más de 2.000 carreras de 47 universidades.</p>
        <p className="mt-5 text-sm text-white/75 flex flex-wrap gap-x-5 gap-y-1">
          <Link to="/glosario-paes" className="underline underline-offset-4 hover:text-white min-h-[32px] inline-flex items-center">¿Qué es el NEM o el ranking?</Link>
          <Link to="/calendario-admision" className="underline underline-offset-4 hover:text-white min-h-[32px] inline-flex items-center">Fechas de la Admisión 2027</Link>
        </p>
      </PageHero>

      <section className="px-4 sm:px-8 lg:px-12 py-10 sm:py-14">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-6 lg:gap-10 items-start">
          {/* ── PUNTAJES: "tu tablero" ──────────────────────────────── */}
          <div className="lg:sticky lg:top-28 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto rounded-[32px]" data-lenis-prevent>
            <div className="grain rounded-[32px] bg-[#071D49] text-white p-5 sm:p-7" data-keep-light>
              <div className="flex items-baseline justify-between gap-3">
                <h2 className="font-display text-2xl font-extrabold tracking-tight">Tus puntajes</h2>
                <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#D7E400]">{listos}/4 base</span>
              </div>
              <p className="text-sm text-white/70 mt-1 mb-5 leading-relaxed">De 100 a 1.000. Si no has dado la PAES, prueba con puntajes de ensayo.</p>
              <div className="grid grid-cols-2 gap-x-4 gap-y-4">
                {FIELDS.map((f) => {
                  const v = Number(scores[f.key]);
                  const valido = v >= 100 && v <= 1000;
                  return (
                    <label key={f.key} className="block">
                      <span className="flex items-center justify-between text-[11px] font-bold uppercase tracking-[0.14em] text-white/70 mb-1">
                        {f.label}
                        {scores[f.key] && !valido && <span className="text-[#FF9F7A] normal-case tracking-normal">100 a 1.000</span>}
                      </span>
                      <input
                        ref={f.key === 'nem' ? nemRef : undefined}
                        inputMode="numeric"
                        value={scores[f.key] || ''}
                        onChange={(e) => setScore(f.key, e.target.value)}
                        placeholder={f.hint}
                        className={`w-full rounded-2xl border px-3 min-h-[56px] font-display text-2xl font-extrabold tabular-nums text-white placeholder:text-white/50 placeholder:text-sm placeholder:font-semibold placeholder:font-sans focus:outline-none focus:border-[#D7E400] transition-colors duration-500 ${f.key === 'nem' && nemFlash ? 'bg-[#D7E400]/30 border-[#D7E400]' : 'bg-white/[0.06] border-white/15'}`}
                      />
                      <span aria-hidden="true" className="mt-1.5 block h-1 rounded-full bg-white/10 overflow-hidden">
                        <span className="block h-full rounded-full bg-[#D7E400] transition-all duration-700 ease-[cubic-bezier(.16,1,.3,1)]" style={{ width: valido ? `${((v - 100) / 900) * 100}%` : '0%' }} />
                      </span>
                    </label>
                  );
                })}
              </div>
              <button type="button" onClick={() => setScores({})} className="mt-4 min-h-[44px] text-sm font-semibold underline underline-offset-4 text-white/70 hover:text-white">
                Borrar puntajes
              </button>
            </div>
            <div className="mt-4">
              <NemCalculator onUse={applyNem} />
            </div>
          </div>

          {/* ── BUSCADOR Y RESULTADOS ─────────────────────────────── */}
          <div className="min-w-0">
            <div className="mb-6">
              <h2 className="font-display text-2xl font-extrabold tracking-tight mb-4">Busca la carrera</h2>
              <div className="relative">
                <Search size={22} className="absolute left-5 top-1/2 -translate-y-1/2 text-[#071D49]/60" aria-hidden="true" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Medicina, derecho, ingeniería…"
                  aria-label="Buscar carrera o universidad"
                  className="w-full rounded-full border-2 border-[#071D49]/15 bg-white pl-14 pr-5 min-h-[64px] font-display text-lg sm:text-xl font-bold placeholder:font-semibold placeholder:text-[#071D49]/50 focus:outline-none focus:border-[#071D49]"
                />
              </div>
              <div className="mt-3 flex flex-wrap gap-2" aria-label="Búsquedas rápidas">
                {SUGERENCIAS.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setQuery(t)}
                    aria-pressed={norm(query.trim()) === norm(t)}
                    className={`min-h-[40px] px-4 rounded-full text-sm font-bold border transition-colors ${norm(query.trim()) === norm(t) ? 'bg-[#071D49] text-white border-[#071D49]' : 'bg-white border-[#071D49]/15 text-[#071D49] hover:border-[#071D49]'}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <select
                  value={uni}
                  onChange={(e) => setUni(e.target.value)}
                  aria-label="Universidad"
                  className="min-w-0 min-h-[52px] rounded-full border border-[#071D49]/15 bg-white px-5 text-base sm:text-sm font-semibold focus:outline-none focus:border-[#071D49]"
                >
                  <option value="">Todas las universidades</option>
                  {universities.map((u) => <option key={u} value={u}>{u}</option>)}
                </select>
                <select
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  aria-label="Región"
                  className="min-w-0 min-h-[52px] rounded-full border border-[#071D49]/15 bg-white px-5 text-base sm:text-sm font-semibold focus:outline-none focus:border-[#071D49]"
                >
                  <option value="">Todas las regiones</option>
                  {regiones && regiones.orden.map((r) => (
                    <option key={r} value={r}>{r === 'RM' ? 'Región Metropolitana' : `Región de ${regiones.regiones[r]}`}</option>
                  ))}
                </select>
              </div>
            </div>

            {favItems.length > 0 && (
              <div className="rounded-[20px] p-4 sm:p-5 mb-4 text-white flex flex-col sm:flex-row sm:items-center gap-3" style={{ backgroundColor: BLUE }}>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold flex items-center gap-2">
                    <Star size={16} className="fill-[#D7E400] text-[#D7E400]" /> {favItems.length} de {MAX_FAVS} carreras para comparar
                  </p>
                  <p className="text-xs text-white/75 mt-1 truncate">{favItems.map((c) => c.n).join(' · ')}</p>
                </div>
                <button
                  type="button"
                  onClick={() => compareRef.current && compareRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                  className="min-h-[48px] w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-[#D7E400] text-[#071D49] hover:bg-white font-display font-extrabold text-xs uppercase tracking-wider px-5 transition-colors"
                >
                  Ver comparación <ArrowDown size={16} />
                </button>
              </div>
            )}

            {!data && <p className="text-center text-sm text-[#071D49]/70 py-10">Cargando carreras…</p>}
            {data && results.length === 0 && (
              <div className="rounded-[32px] border-2 border-dashed border-[#071D49]/15 px-6 py-14 text-center">
                <p className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight">
                  {query.trim().length >= 3 || uni || region ? 'Nada por aquí.' : <>Más de 2.000 carreras <span className="accent-serif">te esperan.</span></>}
                </p>
                <p className="mt-3 text-[#071D49]/70 max-w-md mx-auto">
                  {query.trim().length >= 3 || uni || region
                    ? 'No encontramos carreras con esos filtros. Prueba con otra palabra.'
                    : 'Escribe al menos 3 letras del nombre de la carrera, toca una búsqueda rápida o elige una universidad.'}
                </p>
              </div>
            )}
            {results.length > 0 && total <= MAX_RESULTS && (
              <p className="text-sm font-semibold text-[#071D49]/75 mb-3" aria-live="polite">
                {total.toLocaleString('es-CL')} {total === 1 ? 'carrera' : 'carreras'}
              </p>
            )}
            {total > MAX_RESULTS && (
              <p className="text-sm text-[#071D49]/70 mb-3">
                Mostrando {MAX_RESULTS} de {total.toLocaleString('es-CL')} carreras. Escribe el nombre de la carrera para afinar.
              </p>
            )}

            <div className="space-y-3" id="resultados">
              {results.map((c) => {
                const cut = cutoffOf(c.id);
                return (
                  <CareerCard
                    key={c.key}
                    c={c}
                    cutoff={cut ? cut[0] : null}
                    cutoffLabel={cut ? CUTOFF_LABEL[cut[1]] : ''}
                    cutoffYear={cutoffYear}
                    region={regionName(c)}
                    isFav={favs.includes(c.id)}
                    canFav={favs.length < MAX_FAVS}
                    onToggleFav={toggleFav}
                    onShared={(how) => how === 'whatsapp' && setToast('Abrimos WhatsApp con tu resultado')}
                  />
                );
              })}
            </div>

            <div className="text-xs text-[#071D49]/70 mt-6 leading-relaxed space-y-2">
              <p>
                Ponderaciones oficiales del DEMRE, Proceso de Admisión {data?.proceso || 2027}, publicadas el 24 de septiembre de 2026. Cumplir los mínimos no asegura el ingreso: depende del puntaje de corte de cada año. Confirma siempre en demre.cl y en la universidad.
              </p>
              <p>
                Puntajes de corte: proceso {cutoffYear}, tal como los publica cada universidad en su sitio oficial (algunas informan el último seleccionado y otras el último matriculado). Cambian cada año y son solo una referencia. Si una carrera no muestra corte es porque su universidad no lo publicó en una fuente oficial que pudimos revisar.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── COMPARAR ─────────────────────────────────────────────────── */}
      {favItems.length > 0 && (
        <section ref={compareRef} className="px-4 sm:px-6 pb-10 sm:pb-12 scroll-mt-32">
          <div className="max-w-6xl mx-auto">
            <ComparePanel
              items={favItems}
              cutoffs={cortes ? cortes.d : {}}
              cutoffLabel={(t) => CUTOFF_LABEL[t]}
              cutoffYear={cutoffYear}
              regionOf={regionName}
              onRemove={toggleFav}
              onClear={() => setFavs([])}
            />
          </div>
        </section>
      )}

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <CtaBand title="¿Te faltan puntos?" accent="Los subimos juntos." desc="En el preu de Lael tomas solo los ramos que necesitas subir, desde $12.000 al mes, con matrícula gratis y becas.">
        <Btn href="/paes" variant="yellow">Ver el preu PAES <ArrowRight size={16} /></Btn>
        <Btn href="/inscripcion?programa=clase-prueba" variant="outlineDark">Pedir una clase de prueba</Btn>
      </CtaBand>

      {toast && (
        <div role="status" className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 rounded-2xl bg-[#071D49] text-white text-sm font-semibold px-4 py-3 shadow-lael">
          {toast}
        </div>
      )}
    </div>
  );
}
