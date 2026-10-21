import React, { useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowRight } from 'lucide-react';
import IntensivoPaes from '../../components/IntensivoPaes';
import AvisameForm from '../../components/AvisameForm';
import { PageHero, Faq, CtaBand, Btn } from './shared';
import { INTENSIVO, INTENSIVO_RAMOS_DISPONIBLES, INTENSIVO_PRECIO_DESDE, LISTA_ESPERA_PAES, ELECTIVA_PRICE, intensivoAbierto, clp } from '../../data/paes';

// Página propia del intensivo (/intensivo-paes), pensada para que Google la
// encuentre con búsquedas como "intensivo PAES online". Usa los mismos datos
// que la sección de /paes (data/paes.js), así que se actualiza sola.
// Cuando cierra la inscripción (INTENSIVO.cierreInscripcion) cambia sola:
// sin botón de inscripción y con la lista de espera (#lista-espera).
const SITE = 'https://www.institutolael.cl';
const ramos = INTENSIVO_RAMOS_DISPONIBLES.map((r) => r.nombre).join(', ');

// Título y descripción con la inscripción cerrada. scripts/route-html.cjs
// también los lee para la vista previa de WhatsApp después del cierre.
export const META_CERRADO = {
  title: 'Intensivo PAES 2026: lista de espera | Instituto Lael',
  description: 'Las inscripciones al Intensivo PAES 2026 ya cerraron. Anótate en la lista de espera del próximo intensivo y del Preu PAES 2027 online y en vivo.',
};

const CURSOS = ['2° medio', '3° medio', '4° medio', 'Ya egresé', 'Otro'];

const faqs = (abierto) => [
  abierto
    ? { q: '¿Cuándo es el intensivo?', a: `${INTENSIVO.fechas} de 2026: ${INTENSIVO.semanas} semanas, justo antes de la PAES del ${INTENSIVO.fechaPaes}. Las inscripciones cierran el domingo 25 de octubre.` }
    : { q: '¿Todavía me puedo inscribir?', a: 'Las inscripciones de esta edición cerraron el domingo 25 de octubre. Anótate en la lista de espera y te avisamos primero cuando abramos el próximo intensivo o el Preu PAES 2027.' },
  { q: '¿Qué ramos hay?', a: `${ramos}.` },
  { q: abierto ? '¿Cuánto cuesta?' : '¿Cuánto costó esta edición?', a: `Es un pago único por todo el intensivo: ${INTENSIVO.precios.map((p) => `${p.label} ${clp(p.total)}`).join(', ')}. Mientras más ramos tomas, menos pagas por cada uno.` },
  { q: '¿Cómo son las clases?', a: 'Online y en vivo por Google Meet. Cada ramo tiene 1 clase de 2 horas a la semana (10 horas en total), más un ensayo final con corrección, grabaciones, material y un grupo de WhatsApp con el profe. Máximo 20 alumnos por curso.' },
  abierto
    ? { q: '¿Hay descuentos?', a: INTENSIVO.descuentos }
    : { q: '¿Qué es la lista de espera?', a: 'Dejas tu nombre, correo y WhatsApp, y eliges si te interesa el próximo intensivo, el Preu PAES 2027 o los dos. No pagas nada ni te compromete: apenas abramos cupos, eres de los primeros en saberlo.' },
  { q: '¿Cómo sé qué puntaje necesito?', a: 'Usa gratis nuestra calculadora en institutolael.cl/calculadora: simula tu puntaje ponderado para más de 2.000 carreras de 47 universidades.' },
];

export default function IntensivoPaesPage() {
  const abierto = intensivoAbierto();
  const FAQS = useMemo(() => faqs(abierto), [abierto]);
  const jsonLd = useMemo(() => JSON.stringify([
    {
      '@context': 'https://schema.org',
      '@type': 'Course',
      name: `${INTENSIVO.nombre} 2026 online`,
      description: `Intensivo PAES online en vivo por Google Meet, ${INTENSIVO.semanas} semanas antes de la prueba. Ramos: ${ramos}. Ensayo final corregido, grabaciones y cursos de máximo 20 alumnos.`,
      url: `${SITE}/intensivo-paes`,
      inLanguage: 'es-CL',
      provider: { '@type': 'EducationalOrganization', name: 'Instituto Lael', url: `${SITE}/` },
      offers: INTENSIVO.precios.map((p) => ({
        '@type': 'Offer',
        name: `${INTENSIVO.nombre}: ${p.label}`,
        category: 'Paid',
        price: p.total,
        priceCurrency: 'CLP',
        availability: abierto ? 'https://schema.org/InStock' : 'https://schema.org/SoldOut',
        validThrough: `${INTENSIVO.cierreInscripcion}T23:59:59-03:00`,
        url: abierto ? `${SITE}/inscripcion?programa=intensivo` : `${SITE}/intensivo-paes`,
      })),
      hasCourseInstance: {
        '@type': 'CourseInstance',
        courseMode: 'Online',
        startDate: INTENSIVO.inicio,
        endDate: INTENSIVO.fin,
        location: { '@type': 'VirtualLocation', url: `${SITE}/intensivo-paes` },
        courseWorkload: 'PT10H', // 10 horas por ramo en todo el intensivo
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: FAQS.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    },
  ]), [abierto, FAQS]);

  return (
    <div className="w-full bg-[#F4F4F4] text-[#071D49] overflow-x-clip font-sans">
      <Helmet>
        <title>Intensivo PAES 2026 online | Instituto Lael</title>
        <meta name="description" content="Intensivo PAES online en vivo, del 26 de octubre al 26 de noviembre: M1, M2, Competencia Lectora, Historia, Biología, Química y Física. Ensayo corregido. Desde $14.990." />
        <script type="application/ld+json">{jsonLd}</script>
      </Helmet>
      {!abierto && (
        <Helmet>
          <title>{META_CERRADO.title}</title>
          <meta name="description" content={META_CERRADO.description} />
        </Helmet>
      )}

      {abierto ? (
        <PageHero
          eyebrow={`${INTENSIVO.nombre} · ${INTENSIVO.lema}`}
          title="Intensivo PAES 2026,"
          accent="online y en vivo."
          desc={`${INTENSIVO.semanas} semanas antes de la prueba para repasar lo que más se repite: ${ramos}. Desde ${clp(INTENSIVO_PRECIO_DESDE)} por todo el intensivo.`}
          stats={[['26 oct.', 'Partimos'], [`${INTENSIVO.semanas} semanas`, 'Hasta la PAES'], ['20', 'Alumnos máx. por curso']]}
        >
          <Btn href="/inscripcion?programa=intensivo">Inscribirme <ArrowRight size={16} /></Btn>
          <Btn href="/calculadora" variant="outlineDark">Simula tu puntaje gratis</Btn>
        </PageHero>
      ) : (
        <PageHero
          eyebrow={`${INTENSIVO.nombre} · ${INTENSIVO.lema}`}
          title="El intensivo ya partió."
          accent="Tú puedes ser el próximo."
          desc="Las inscripciones de esta edición cerraron el domingo 25 de octubre. Anótate en la lista de espera y te avisamos primero cuando abramos el próximo intensivo o el Preu PAES 2027."
          stats={[['26 oct.', 'Partimos'], [`${INTENSIVO.semanas} semanas`, 'Hasta la PAES'], ['2027', 'Preu PAES']]}
        >
          <Btn href="#lista-espera">Anotarme en la lista de espera <ArrowRight size={16} /></Btn>
          <Btn href="/calculadora" variant="outlineDark">Simula tu puntaje gratis</Btn>
        </PageHero>
      )}

      {abierto ? <IntensivoPaes /> : (
        <section className="px-5 sm:px-6 py-14 sm:py-16 bg-[#071D49] text-white">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-10 items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#D7E400] mb-3">Lista de espera</p>
              <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight leading-[1.05] mb-4">
                Guarda tu lugar <span className="accent-serif text-[#D7E400]">para lo que viene.</span>
              </h2>
              <p className="text-white/75 leading-relaxed mb-5 max-w-xl">
                Cerramos las inscripciones del {INTENSIVO.nombre} 2026 para enfocarnos en quienes ya están en clases. Si quieres prepararte con nosotros, déjanos tus datos: sin pago y sin compromiso.
              </p>
              <ul className="space-y-2 text-sm sm:text-base text-white/85">
                <li><span className="font-bold text-[#D7E400]">Próximo Intensivo PAES:</span> te avisamos apenas abramos la siguiente edición.</li>
                <li><span className="font-bold text-[#D7E400]">Preu PAES 2027:</span> online y en vivo, desde {clp(ELECTIVA_PRICE)} al mes por ramo.</li>
              </ul>
            </div>
            <AvisameForm
              id="lista-espera"
              programa="Lista de espera PAES"
              titulo="Anótame en la lista de espera"
              texto="Eres de los primeros en saber cuando abramos cupos."
              extra={{ label: '¿Qué te interesa?', options: LISTA_ESPERA_PAES, required: true, comoPrograma: true }}
              cursos={CURSOS}
            />
          </div>
        </section>
      )}

      <Faq items={FAQS} />

      <CtaBand title="¿Cuánto te falta" accent="para tu carrera?" desc="Simula gratis tu puntaje ponderado para más de 2.000 carreras de 47 universidades.">
        <Btn href="/calculadora">Ir a la calculadora</Btn>
      </CtaBand>
    </div>
  );
}
