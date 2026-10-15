import React, { useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowRight } from 'lucide-react';
import IntensivoPaes from '../../components/IntensivoPaes';
import { PageHero, Faq, CtaBand, Btn } from './shared';
import { INTENSIVO, INTENSIVO_RAMOS_DISPONIBLES, INTENSIVO_PRECIO_DESDE, intensivoAbierto, clp } from '../../data/paes';

// Página propia del intensivo (/intensivo-paes), pensada para que Google la
// encuentre con búsquedas como "intensivo PAES online". Usa los mismos datos
// que la sección de /paes (data/paes.js), así que se actualiza sola.
const SITE = 'https://www.institutolael.cl';
const ramos = INTENSIVO_RAMOS_DISPONIBLES.map((r) => r.nombre).join(', ');

const FAQS = [
  { q: '¿Cuándo es el intensivo?', a: `${INTENSIVO.fechas} de 2026: ${INTENSIVO.semanas} semanas, justo antes de la PAES del ${INTENSIVO.fechaPaes}. Las inscripciones cierran el domingo 25 de octubre.` },
  { q: '¿Qué ramos hay?', a: `${ramos}.` },
  { q: '¿Cuánto cuesta?', a: `Es un pago único por todo el intensivo: ${INTENSIVO.precios.map((p) => `${p.label} ${clp(p.total)}`).join(', ')}. Mientras más ramos tomas, menos pagas por cada uno.` },
  { q: '¿Cómo son las clases?', a: 'Online y en vivo por Google Meet. Cada ramo tiene 1 clase de 2 horas a la semana (10 horas en total), más un ensayo final con corrección, grabaciones, material y un grupo de WhatsApp con el profe. Máximo 20 alumnos por curso.' },
  { q: '¿Hay descuentos?', a: INTENSIVO.descuentos },
  { q: '¿Cómo sé qué puntaje necesito?', a: 'Usa gratis nuestra calculadora en institutolael.cl/calculadora: simula tu puntaje ponderado para más de 2.000 carreras de 47 universidades.' },
];

export default function IntensivoPaesPage() {
  const abierto = intensivoAbierto();
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
        availability: 'https://schema.org/InStock',
        validThrough: `${INTENSIVO.cierreInscripcion}T23:59:59-03:00`,
        url: `${SITE}/inscripcion?programa=intensivo`,
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
  ]), []);

  return (
    <div className="w-full bg-[#F4F4F4] text-[#071D49] overflow-x-clip font-sans">
      <Helmet>
        <title>Intensivo PAES 2026 online | Instituto Lael</title>
        <meta name="description" content="Intensivo PAES online en vivo, del 26 de octubre al 27 de noviembre: Matemática M1, M2, Biología y Química. Ensayo corregido y grabaciones. Desde $14.990 por todo el intensivo." />
        <script type="application/ld+json">{jsonLd}</script>
      </Helmet>

      <PageHero
        eyebrow={`${INTENSIVO.nombre} · ${INTENSIVO.lema}`}
        title="Intensivo PAES 2026,"
        accent="online y en vivo."
        desc={`${INTENSIVO.semanas} semanas antes de la prueba para repasar lo que más se repite: ${ramos}. Desde ${clp(INTENSIVO_PRECIO_DESDE)} por todo el intensivo.`}
        stats={[['26 oct.', 'Partimos'], [`${INTENSIVO.semanas} semanas`, 'Hasta la PAES'], ['20', 'Alumnos máx. por curso']]}
      >
        {abierto && <Btn href="/inscripcion?programa=intensivo">Inscribirme <ArrowRight size={16} /></Btn>}
        <Btn href="/calculadora" variant="outlineDark">Simula tu puntaje gratis</Btn>
      </PageHero>

      {abierto ? <IntensivoPaes /> : (
        <section className="px-5 sm:px-6 py-14 text-center">
          <p className="max-w-xl mx-auto text-lg">Las inscripciones al intensivo 2026 ya cerraron. En marzo partimos con el preu PAES 2027.</p>
          <div className="mt-6"><Btn href="/paes" variant="navy">Ver el preu PAES 2027</Btn></div>
        </section>
      )}

      <Faq items={FAQS} />

      <CtaBand title="¿Cuánto te falta" accent="para tu carrera?" desc="Simula gratis tu puntaje ponderado para más de 2.000 carreras de 47 universidades.">
        <Btn href="/calculadora">Ir a la calculadora</Btn>
      </CtaBand>
    </div>
  );
}
