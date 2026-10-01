import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, RotateCcw } from 'lucide-react';
import PageHero, { BTN_YELLOW } from '../../components/ui/PageHero';
import { INGLES_NIVELES } from '../../data/idiomas';
import { trackEvent } from '../../utils/analytics';

// Test de nivel de inglés: 10 preguntas que van de A1 a B2. Es orientativo:
// en la primera clase la profe confirma el nivel.
const PREGUNTAS = [
  { q: 'She ___ from Chile.', o: ['are', 'is', 'am'], a: 1 },
  { q: 'I usually ___ breakfast at 7 a.m.', o: ['have', 'has', 'having'], a: 0 },
  { q: 'Yesterday we ___ to the beach.', o: ['go', 'gone', 'went'], a: 2 },
  { q: 'This book is ___ than the movie.', o: ['more interesting', 'most interesting', 'interestinger'], a: 0 },
  { q: "I'm ___ visit my aunt next weekend.", o: ['will', 'going to', 'go to'], a: 1 },
  { q: 'If it rains tomorrow, we ___ at home.', o: ['stay', 'would stay', 'will stay'], a: 2 },
  { q: 'When I arrived, the movie ___ already started.', o: ['had', 'has', 'was'], a: 0 },
  { q: '"I\'m tired," she said. → She said that she ___ tired.', o: ['is', 'was', 'be'], a: 1 },
  { q: 'The new bridge ___ next year.', o: ['will build', 'is building', 'will be built'], a: 2 },
  { q: 'I wish I ___ more time to study.', o: ['had', 'have', 'will have'], a: 0 },
];

const nivelPorPuntaje = (n) => (n <= 3 ? 'A1' : n <= 5 ? 'A2' : n <= 8 ? 'B1' : 'B2');

export default function TestNivel() {
  const [i, setI] = useState(0);
  const [resp, setResp] = useState([]);
  const fin = i >= PREGUNTAS.length;
  const correctas = resp.filter((r, k) => r === PREGUNTAS[k].a).length;
  const nivel = INGLES_NIVELES.find((n) => n.code === nivelPorPuntaje(correctas));

  const elegir = (op) => {
    const nuevas = [...resp, op];
    setResp(nuevas);
    setI(i + 1);
    if (nuevas.length === PREGUNTAS.length) {
      const ok = nuevas.filter((r, k) => r === PREGUNTAS[k].a).length;
      trackEvent('test_ingles_terminado', { nivel: nivelPorPuntaje(ok), correctas: ok });
    }
  };
  const reiniciar = () => { setI(0); setResp([]); };

  return (
    <div className="w-full bg-[#F4F4F4] text-[#071D49] overflow-x-clip font-sans">
      <Helmet>
        <title>Test de nivel de inglés gratis | Instituto Lael</title>
        <meta name="description" content="Test de nivel de inglés gratis y online: 10 preguntas, 3 minutos. Te dice si partes en A1, A2, B1 o B2 según el Marco Común Europeo." />
      </Helmet>

      <PageHero eyebrow="Test de nivel · Inglés" title="¿Desde dónde" accent="partes?">
        Diez preguntas, tres minutos. Responde sin traductor: si no sabes, elige la que te suene mejor.
      </PageHero>

      <section className="px-5 sm:px-6 py-12 sm:py-16">
        <div className="max-w-xl mx-auto">
          {!fin && (
            <div className="mb-6" aria-hidden="true">
              <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-[#071D49]/75 mb-2">
                <span>Pregunta {i + 1} de {PREGUNTAS.length}</span>
                <span>{Math.round((i / PREGUNTAS.length) * 100)}%</span>
              </div>
              <div className="h-2 rounded-full bg-[#071D49]/10 overflow-hidden">
                <motion.div className="h-full bg-[#071D49] rounded-full" animate={{ width: `${(i / PREGUNTAS.length) * 100}%` }} transition={{ duration: 0.3 }} />
              </div>
            </div>
          )}

          <AnimatePresence mode="wait">
            {!fin ? (
              <motion.fieldset key={i} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.22 }} className="bg-white rounded-[28px] p-6 sm:p-8 border border-[#071D49]/5 shadow-card">
                <legend className="sr-only">Pregunta {i + 1} de {PREGUNTAS.length}</legend>
                <p className="text-sm text-[#071D49]/75 mb-2">Completa la frase:</p>
                <p lang="en" className="font-display text-xl sm:text-2xl font-bold mb-6 leading-snug">{PREGUNTAS[i].q}</p>
                <div className="grid gap-3">
                  {PREGUNTAS[i].o.map((op, k) => (
                    <button key={op} type="button" lang="en" onClick={() => elegir(k)} className="min-h-[56px] rounded-2xl border-2 border-[#071D49]/15 px-5 text-left font-semibold hover:border-[#071D49] hover:bg-[#F4F4F4] transition-colors">
                      {op}
                    </button>
                  ))}
                </div>
              </motion.fieldset>
            ) : (
              <motion.div key="resultado" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="bg-[#071D49] text-white rounded-[28px] p-7 sm:p-10 text-center" role="status">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/60 mb-3">Tu nivel aproximado</p>
                <p className="font-display font-extrabold text-7xl text-programa leading-none mb-2">{nivel.code}</p>
                <p className="accent-serif text-3xl mb-4">{nivel.name}</p>
                <p className="text-white/75 leading-relaxed mb-2">{nivel.desc}</p>
                <p className="text-white/60 text-sm mb-8">Acertaste {correctas} de {PREGUNTAS.length}. En la primera clase Monse lo confirma contigo.</p>
                <div className="flex flex-col gap-3">
                  <a href={`/inscripcion?programa=ingles&nivel=${nivel.code}`} className={`${BTN_YELLOW} w-full`}>Inscribirme desde {nivel.code} <ArrowRight size={16} /></a>
                  <button type="button" onClick={reiniciar} className="min-h-[44px] inline-flex items-center justify-center gap-2 text-sm font-semibold text-white/80 hover:text-white"><RotateCcw size={14} /> Hacer el test de nuevo</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <p className="text-center text-sm text-[#071D49]/70 mt-8"><Link to="/idiomas" className="underline font-semibold">Ver el programa de inglés</Link></p>
        </div>
      </section>
    </div>
  );
}
