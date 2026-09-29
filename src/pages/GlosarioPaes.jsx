import React, { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Search, ArrowRight } from 'lucide-react';
import PageHero, { SECTION, BTN_YELLOW } from '../components/ui/PageHero';

// Glosario PAES: las palabras que aparecen en la calculadora y en el
// proceso de admisión, explicadas sin enredo. Ordenadas alfabéticamente.
export const GLOSARIO = [
  { t: 'Competencia Lectora (CL)', d: 'Prueba obligatoria que mide cómo lees y entiendes textos: localizar información, interpretar y evaluar lo que dice un texto.' },
  { t: 'Competencia Matemática 1 (M1)', d: 'Prueba obligatoria de matemática. Evalúa los contenidos de 7° básico a 2° medio. Todas las carreras la piden.' },
  { t: 'Competencia Matemática 2 (M2)', d: 'Prueba electiva de matemática más avanzada (3° y 4° medio). La piden sobre todo las carreras científicas, de ingeniería y de economía.' },
  { t: 'Ciencias', d: 'Prueba electiva. Tiene un módulo común con preguntas de Biología, Física y Química, y un módulo electivo donde eliges una de las tres (o Técnico Profesional).' },
  { t: 'DEMRE', d: 'Departamento de Evaluación, Medición y Registro Educacional de la Universidad de Chile. Es quien hace y corrige la PAES y publica los resultados.' },
  { t: 'FUAS', d: 'Formulario Único de Acreditación Socioeconómica. Hay que llenarlo para postular a la gratuidad, becas y créditos del Estado. Se llena en fuas.cl.' },
  { t: 'Gratuidad', d: 'Beneficio del Estado que cubre el arancel y la matrícula en las instituciones adscritas, para estudiantes de los hogares de menores ingresos. Para pedirla hay que llenar el FUAS.' },
  { t: 'Historia y Ciencias Sociales', d: 'Prueba electiva sobre historia, geografía, economía y formación ciudadana. La piden carreras como Derecho, Periodismo o Pedagogía en Historia.' },
  { t: 'Lista de espera', d: 'Si no quedas seleccionado en una carrera pero tu puntaje está cerca, quedas en una lista. Si alguien seleccionado no se matricula, se va corriendo la lista.' },
  { t: 'NEM', d: 'Notas de Enseñanza Media. Tu promedio de 1° a 4° medio convertido a puntaje PAES (de 100 a 1000) con las tablas del DEMRE, que cambian según el tipo de colegio.' },
  { t: 'PAES', d: 'Prueba de Acceso a la Educación Superior. Reemplazó a la PSU y a la PDT. Los puntajes van de 100 a 1000.' },
  { t: 'PAES de invierno y PAES regular', d: 'Hay dos fechas para rendir: una en invierno (junio) y la regular (fines de noviembre). Puedes dar las dos y, al postular, se usa tu mejor puntaje de cada prueba entre las que estén vigentes.' },
  { t: 'Percentil', d: 'Indica en qué lugar quedaste comparado con los demás. Percentil 80 significa que te fue igual o mejor que al 80% de las personas que rindieron esa prueba.' },
  { t: 'Ponderación', d: 'El porcentaje que cada carrera le da a cada puntaje. Por ejemplo, una carrera puede pedir 30% de M1 y solo 10% de Competencia Lectora. Cambia según la carrera y la universidad.' },
  { t: 'Postulación', d: 'La etapa en que eliges tus carreras en orden de preferencia, justo después de los resultados. Quedas en la primera de tu lista donde te alcance el puntaje.' },
  { t: 'Puntaje de corte', d: 'El puntaje ponderado del último seleccionado de una carrera el año anterior. Sirve de referencia, pero cambia cada año.' },
  { t: 'Puntaje ponderado', d: 'Tu puntaje final para una carrera: cada puntaje multiplicado por su ponderación y todo sumado. Es lo que calcula nuestra calculadora.' },
  { t: 'Ranking', d: 'Puntaje que premia cuánto te destacaste en tu colegio comparado con las generaciones anteriores. Nunca es menor que tu puntaje NEM.' },
  { t: 'Vacantes', d: 'Cuántos cupos ofrece cada carrera por la vía regular de admisión.' },
];

const norm = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

export default function GlosarioPaes() {
  const [q, setQ] = useState('');
  const lista = useMemo(() => {
    const n = norm(q.trim());
    return n ? GLOSARIO.filter((g) => norm(g.t + ' ' + g.d).includes(n)) : GLOSARIO;
  }, [q]);

  return (
    <div className="w-full bg-[#F4F4F4] text-[#071D49] overflow-x-clip font-sans">
      <Helmet>
        <title>Glosario PAES: NEM, ranking, ponderación y más | Instituto Lael</title>
        <meta name="description" content="Qué significan NEM, ranking, ponderación, puntaje de corte, percentil y otras palabras de la PAES y la Admisión 2027, explicadas simple." />
      </Helmet>

      <PageHero eyebrow="Glosario PAES" title="Las palabras de la PAES," accent="en simple.">
        NEM, ranking, ponderación, percentil... Si alguna te suena a chino, aquí está explicada.
      </PageHero>

      <section className={SECTION}>
        <div className="max-w-3xl mx-auto">
          <label htmlFor="glosario-buscar" className="sr-only">Buscar una palabra</label>
          <div className="relative mb-8">
            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#071D49]/50" aria-hidden="true" />
            <input
              id="glosario-buscar"
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Busca una palabra, por ejemplo: ranking"
              className="w-full rounded-2xl border border-[#071D49]/15 bg-white pl-12 pr-4 min-h-[56px] text-base focus:outline-none focus:border-[#071D49] focus:ring-4 focus:ring-[#071D49]/10"
            />
          </div>
          <p className="sr-only" aria-live="polite">{lista.length} resultados</p>
          <dl className="space-y-3">
            {lista.map((g) => (
              <div key={g.t} className="rounded-[20px] bg-white p-5 sm:p-6 border border-[#071D49]/5 shadow-card">
                <dt className="font-display font-extrabold text-lg mb-1.5">{g.t}</dt>
                <dd className="text-[#071D49]/75 leading-relaxed">{g.d}</dd>
              </div>
            ))}
          </dl>
          {lista.length === 0 && (
            <p className="text-center text-[#071D49]/70 py-8">No encontramos esa palabra. <Link to="/contacto" className="underline font-semibold">Pregúntanos</Link> y la sumamos.</p>
          )}
          <div className="mt-12 text-center">
            <Link to="/calculadora" className={BTN_YELLOW}>Probar la calculadora de puntaje <ArrowRight size={16} /></Link>
            <p className="mt-4 text-sm"><Link to="/calendario-admision" className="underline font-semibold">Ver el calendario de la Admisión 2027</Link></p>
          </div>
        </div>
      </section>
    </div>
  );
}
