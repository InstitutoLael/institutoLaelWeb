import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Search, ArrowRight, Calculator, Star, ArrowDown } from 'lucide-react';
import CareerCard from '../components/calculadora/CareerCard';
import NemCalculator from '../components/calculadora/NemCalculator';
import ComparePanel from '../components/calculadora/ComparePanel';
import { computeScore, clM1, titleCase, norm, loadFavs, saveFavs, MAX_FAVS } from '../components/calculadora/utils';

// Datos (todos se cargan con import() para que la página pese poco):
//  - carreras-2026.json: DEMRE, Oferta Definitiva de Carreras, Vacantes y
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
    import('../data/carreras-2026.json').then((m) => setData(m.default || m));
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

  const cutoffYear = cortes?.proceso || 2026;
  const cutoffOf = (id) => (cortes && cortes.d[id] ? cortes.d[id] : null);

  return (
    <div className="w-full bg-[#F4F4F4] text-[#071D49] font-sans overflow-x-clip">
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
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-6 items-start">
          {/* ── PUNTAJES ──────────────────────────────────────────── */}
          <div className="bg-white rounded-[28px] p-5 sm:p-6 border border-[#071D49]/5 shadow-card lg:sticky lg:top-28 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto">
            <h2 className="font-display text-lg font-extrabold uppercase tracking-tight mb-1">1. Tus puntajes</h2>
            <p className="text-sm text-[#071D49]/70 mb-4 leading-relaxed">De 100 a 1.000. Si no has dado la PAES, prueba con puntajes de ensayo.</p>
            <div className="grid grid-cols-2 gap-3">
              {FIELDS.map((f) => (
                <label key={f.key} className="block">
                  <span className="block text-xs font-bold mb-1">{f.label}</span>
                  <input
                    ref={f.key === 'nem' ? nemRef : undefined}
                    inputMode="numeric"
                    value={scores[f.key] || ''}
                    onChange={(e) => setScore(f.key, e.target.value)}
                    placeholder={f.hint}
                    className={`w-full rounded-xl border border-[#071D49]/15 px-3 py-3 min-h-[48px] text-base font-semibold focus:outline-none focus:ring-2 focus:ring-[#071D49] placeholder:text-[#071D49]/60 placeholder:font-normal placeholder:text-sm transition-colors duration-500 ${f.key === 'nem' && nemFlash ? 'bg-[#D7E400] ring-2 ring-[#071D49]' : 'bg-[#F4F4F4]'}`}
                  />
                </label>
              ))}
            </div>
            <button onClick={() => setScores({})} className="mt-2 min-h-[44px] text-sm font-semibold underline underline-offset-4 text-[#071D49]/70 hover:text-[#071D49]">
              Borrar puntajes
            </button>

            <NemCalculator onUse={applyNem} />
          </div>

          {/* ── BUSCADOR Y RESULTADOS ─────────────────────────────── */}
          <div className="min-w-0">
            <div className="bg-white rounded-[28px] p-5 sm:p-6 border border-[#071D49]/5 shadow-card mb-4">
              <h2 className="font-display text-lg font-extrabold uppercase tracking-tight mb-4">2. Busca la carrera</h2>
              <div className="relative">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#071D49]/40" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Ej: medicina, derecho, ingeniería"
                  aria-label="Buscar carrera o universidad"
                  className="w-full rounded-xl border border-[#071D49]/15 bg-[#F4F4F4] pl-10 pr-3 py-3 min-h-[48px] text-base focus:outline-none focus:ring-2 focus:ring-[#071D49]"
                />
              </div>
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <select
                  value={uni}
                  onChange={(e) => setUni(e.target.value)}
                  aria-label="Universidad"
                  className="min-w-0 min-h-[48px] rounded-xl border border-[#071D49]/15 bg-[#F4F4F4] px-3 py-3 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#071D49]"
                >
                  <option value="">Todas las universidades</option>
                  {universities.map((u) => <option key={u} value={u}>{u}</option>)}
                </select>
                <select
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  aria-label="Región"
                  className="min-w-0 min-h-[48px] rounded-xl border border-[#071D49]/15 bg-[#F4F4F4] px-3 py-3 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#071D49]"
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
              <p className="text-center text-sm text-[#071D49]/70 py-10">
                {query.trim().length >= 3 || uni || region
                  ? 'No encontramos carreras con esos filtros.'
                  : 'Escribe al menos 3 letras del nombre de la carrera, o elige una universidad o región.'}
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
                Ponderaciones oficiales del DEMRE, Proceso de Admisión {data?.proceso || 2026}. Las del proceso 2027 las publica el DEMRE a fines de septiembre y las actualizaremos. Cumplir los mínimos no asegura el ingreso: depende del puntaje de corte de cada año. Confirma siempre en demre.cl y en la universidad.
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

      {toast && (
        <div role="status" className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 rounded-2xl bg-[#071D49] text-white text-sm font-semibold px-4 py-3 shadow-lael">
          {toast}
        </div>
      )}
    </div>
  );
}
