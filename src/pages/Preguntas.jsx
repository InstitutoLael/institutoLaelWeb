import React, { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Search, ChevronDown } from 'lucide-react';
import PageHero, { SECTION, BTN_YELLOW } from '../components/ui/PageHero';
import { FAQ_DATA } from '../data/preguntas';
import { LANDING_FAQS } from '../data/paes';
import { ADULT_FAQS } from '../data/nivelacion';
import { REFORZAMIENTO } from '../data/reforzamiento';
import { ORIENTACION } from '../data/orientacion';
import { TALLERES_IA } from '../data/talleres-ia';
import { APODERADOS } from '../data/apoderados';
import { ENSAYO_GRATIS } from '../data/ensayo-gratis';
import { REFERIDO_FAQS } from '../data/trae-un-amigo';
import { whatsappUrl } from '../lib/backend';

// Todas las preguntas frecuentes del sitio en un solo lugar, con buscador.
// Cada grupo sale de los datos de su programa, así que si cambias una
// respuesta en la página del programa, cambia también aquí.
const PAGOS_FAQS = [
  { q: '¿Cómo pago la mensualidad?', a: 'Por transferencia a la cuenta de Instituto Lael SpA en Mercado Pago. Los datos te llegan por correo al confirmar tu cupo, y el comprobante se manda a pagos@institutolael.cl.' },
  { q: '¿Cuándo se paga?', a: 'Por adelantado, antes de que termine cada mes, para las clases del mes siguiente.' },
  { q: '¿Qué pasa si me quiero retirar?', a: 'Avísanos por escrito a contacto@institutolael.cl. Antes de decidir, conversemos: muchas veces se puede cambiar de horario o postular a una beca. También puedes traspasar tu cupo a otra persona.' },
  { q: '¿Hay becas?', a: 'Sí, becas parciales para quien las necesite. Se postula en la página de becas y cada caso lo revisamos con calma.' },
];

const GRUPOS = [
  ...FAQ_DATA.map((c) => ({ id: c.category, title: c.category, items: c.items })),
  { id: 'paes', title: 'Preu PAES', items: LANDING_FAQS, link: '/paes' },
  { id: 'pagos', title: 'Pagos, becas y retiro', items: PAGOS_FAQS, link: '/como-pagar' },
  { id: 'adultos', title: 'Escuela de Sueños', items: ADULT_FAQS, link: '/adultos' },
  { id: 'reforzamiento', title: 'Reforzamiento escolar', items: REFORZAMIENTO.faqs, link: '/reforzamiento' },
  { id: 'talleres', title: 'Talleres de IA', items: TALLERES_IA.faqs, link: '/talleres-ia' },
  { id: 'orientacion', title: 'Orientación vocacional', items: ORIENTACION.faqs, link: '/orientacion' },
  { id: 'apoderados', title: 'Apoderados', items: APODERADOS.faqs, link: '/apoderados' },
  { id: 'ensayo', title: 'Ensayo PAES gratis', items: ENSAYO_GRATIS.faqs, link: '/ensayo-gratis' },
  { id: 'amigo', title: 'Trae un amigo', items: REFERIDO_FAQS, link: '/trae-un-amigo' },
].filter((g) => g.items && g.items.length);

const norm = (s) => String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

function Item({ q, a }) {
  const [open, setOpen] = useState(false);
  const id = `faq-${norm(q).replace(/[^a-z0-9]+/g, '-').slice(0, 40)}`;
  return (
    <div className={`rounded-[20px] border bg-white transition-colors ${open ? 'border-[#071D49]/20 shadow-card' : 'border-[#071D49]/5 hover:border-[#071D49]/20'}`}>
      <button type="button" aria-expanded={open} aria-controls={id} onClick={() => setOpen((o) => !o)} className="w-full min-h-[60px] px-5 py-4 text-left flex justify-between items-center gap-4 rounded-[20px]">
        <span className="font-bold leading-snug">{q}</span>
        <span className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-transform ${open ? 'rotate-180 bg-[#071D49] text-[#D7E400]' : 'bg-[#F4F4F4]'}`} aria-hidden="true"><ChevronDown size={16} /></span>
      </button>
      {open && <div id={id} className="px-5 pb-5 pt-1 text-[#071D49]/75 leading-relaxed">{a}</div>}
    </div>
  );
}

export default function Preguntas() {
  const [q, setQ] = useState('');
  const [grupo, setGrupo] = useState('todos');

  const visibles = useMemo(() => {
    const n = norm(q.trim());
    return GRUPOS
      .filter((g) => grupo === 'todos' || g.id === grupo)
      .map((g) => ({ ...g, items: n ? g.items.filter((it) => norm(it.q + ' ' + it.a).includes(n)) : g.items }))
      .filter((g) => g.items.length);
  }, [q, grupo]);
  const total = visibles.reduce((t, g) => t + g.items.length, 0);

  // Datos estructurados para que Google muestre las preguntas en sus resultados
  const jsonLd = useMemo(() => JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: GRUPOS.flatMap((g) => g.items).slice(0, 40).map((it) => ({ '@type': 'Question', name: it.q, acceptedAnswer: { '@type': 'Answer', text: it.a } })),
  }), []);

  return (
    <div className="w-full bg-[#F4F4F4] text-[#071D49] overflow-x-clip font-sans">
      <Helmet>
        <title>Preguntas Frecuentes | Instituto Lael</title>
        <meta name="description" content="Todas las preguntas frecuentes de Instituto Lael en un lugar: precios, pagos, becas, horarios, clases, preu PAES, Escuela de Sueños, reforzamiento y más." />
        <script type="application/ld+json">{jsonLd}</script>
      </Helmet>

      <PageHero eyebrow="Preguntas frecuentes" title="¿Tienes una duda?" accent="Búscala aquí.">
        Juntamos lo que más nos preguntan de todos los programas. Escribe una palabra y te mostramos las respuestas.
      </PageHero>

      <section className={SECTION}>
        <div className="max-w-3xl mx-auto">
          <label htmlFor="faq-buscar" className="sr-only">Buscar en las preguntas</label>
          <div className="relative mb-4">
            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#071D49]/50" aria-hidden="true" />
            <input id="faq-buscar" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Por ejemplo: beca, grabaciones, horario" className="w-full rounded-2xl border border-[#071D49]/15 bg-white pl-12 pr-4 min-h-[56px] text-base focus:outline-none focus:border-[#071D49] focus:ring-4 focus:ring-[#071D49]/10" />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 mb-8 -mx-5 px-5 sm:mx-0 sm:px-0 sm:flex-wrap" role="group" aria-label="Filtrar por tema">
            {[{ id: 'todos', title: 'Todas' }, ...GRUPOS].map((g) => (
              <button key={g.id} type="button" aria-pressed={grupo === g.id} onClick={() => setGrupo(g.id)} className={`whitespace-nowrap min-h-[40px] px-4 rounded-full text-sm font-semibold border transition-colors ${grupo === g.id ? 'bg-[#071D49] text-white border-[#071D49]' : 'bg-white border-[#071D49]/15 hover:border-[#071D49]/40'}`}>
                {g.title}
              </button>
            ))}
          </div>
          <p className="sr-only" aria-live="polite">{total} preguntas</p>

          <div className="space-y-10">
            {visibles.map((g) => (
              <div key={g.id}>
                <div className="flex items-baseline justify-between gap-4 mb-4">
                  <h2 className="font-display text-xl sm:text-2xl font-extrabold">{g.title}</h2>
                  {g.link && <Link to={g.link} className="text-sm font-semibold underline underline-offset-4 whitespace-nowrap">Ver programa</Link>}
                </div>
                <div className="space-y-3">{g.items.map((it) => <Item key={it.q} {...it} />)}</div>
              </div>
            ))}
            {total === 0 && <p className="text-center text-[#071D49]/70 py-8">No encontramos nada con esa palabra. Escríbenos y te respondemos.</p>}
          </div>

          <div className="mt-16 p-6 sm:p-10 rounded-[28px] bg-[#071D49] text-white text-center">
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl mb-3">¿No encontraste <span className="accent-serif text-[#D7E400]">tu respuesta?</span></h2>
            <p className="text-white/75 max-w-md mx-auto mb-7">Escríbenos por WhatsApp y te respondemos lo antes posible.</p>
            <a href={whatsappUrl('Hola! Tengo una duda que no encontré en las preguntas frecuentes.')} target="_blank" rel="noopener noreferrer" className={BTN_YELLOW}>Hablar por WhatsApp</a>
          </div>
        </div>
      </section>
    </div>
  );
}
