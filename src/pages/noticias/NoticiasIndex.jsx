import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock } from 'lucide-react';
import { CATEGORIES, getAllNoticias, formatFecha } from '../../data/noticias';
import NoticiaCard from '../../components/noticias/NoticiaCard';
import CategoryIcon from '../../components/noticias/CategoryIcon';

const SITE = 'https://institutolael.cl';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
});

export default function NoticiasIndex() {
  const all = useMemo(() => getAllNoticias(), []);
  const [cat, setCat] = useState('Todas');

  // Solo mostramos filtros de categorías que tienen al menos una noticia.
  const cats = ['Todas', ...CATEGORIES.filter((c) => all.some((p) => p.category === c))];
  const featured = all.find((p) => p.featured) || all[0];
  const list = all.filter((p) => (cat === 'Todas' ? p.slug !== featured?.slug : p.category === cat));
  const showFeatured = featured && cat === 'Todas';

  return (
    <div className="w-full bg-[#F4F4F4] text-[#071D49] overflow-x-clip font-sans">
      <Helmet>
        <title>Noticias y guías PAES, exámenes libres y homeschool | Instituto Lael</title>
        <meta
          name="description"
          content="Fechas PAES, cómo funciona el puntaje, exámenes libres para adultos y validación de estudios para familias homeschool. Guías claras con fuentes oficiales."
        />
        <link rel="canonical" href={`${SITE}/noticias`} />
        <meta property="og:title" content="Noticias y guías | Instituto Lael" />
        <meta property="og:url" content={`${SITE}/noticias`} />
      </Helmet>

      {/* Encabezado */}
      <section className="relative -mt-20 pt-36 sm:pt-40 pb-12 sm:pb-16 px-5 sm:px-6 bg-[#071D49] text-white">
        <div className="max-w-6xl mx-auto">
          <motion.p {...fadeUp(0)} className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] mb-5 text-[#D7E400]">
            <span className="w-4 h-1 rounded-full bg-[#D7E400]" aria-hidden="true" />
            Noticias y guías
          </motion.p>
          <motion.h1 {...fadeUp(0.1)} className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-[-0.03em] leading-[1.05] mb-5 max-w-3xl">
            Lo que necesitas saber, en simple
          </motion.h1>
          <motion.p {...fadeUp(0.2)} className="text-white/75 text-base sm:text-lg leading-relaxed max-w-2xl">
            Fechas de la PAES, exámenes libres y validación de estudios, explicados paso a paso y con las fuentes oficiales a la vista.
          </motion.p>

          {/* Filtro por categoría */}
          <motion.div {...fadeUp(0.3)} className="mt-8 -mx-5 px-5 sm:mx-0 sm:px-0 overflow-x-auto">
            <div role="group" aria-label="Filtrar por tema" className="flex gap-2 w-max sm:w-auto sm:flex-wrap">
              {cats.map((c) => {
                const active = c === cat;
                return (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setCat(c)}
                    aria-pressed={active}
                    className={`min-h-[44px] px-5 rounded-full text-sm font-bold whitespace-nowrap transition-colors border ${
                      active
                        ? 'bg-[#D7E400] text-[#071D49] border-[#D7E400]'
                        : 'bg-white/10 text-white border-white/20 hover:border-white/60'
                    }`}
                  >
                    {c}
                  </button>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="px-5 sm:px-6 pt-10 sm:pt-14 pb-16 sm:pb-20 lg:pb-28">
        <div className="max-w-6xl mx-auto">
          {/* Destacada */}
          {showFeatured && (
            <motion.div {...fadeUp(0.35)} className="mb-8 sm:mb-10">
              <Link
                to={`/noticias/${featured.slug}`}
                className="group grid md:grid-cols-[2fr_3fr] rounded-[28px] bg-white overflow-hidden border border-[#071D49]/5 shadow-card transition-shadow hover:shadow-lael focus:outline-none focus-visible:ring-2 focus-visible:ring-[#071D49] focus-visible:ring-offset-2"
              >
                <div className="relative bg-[#D7E400] min-h-[140px] md:min-h-full flex items-end p-6 sm:p-8 overflow-hidden">
                  <CategoryIcon category={featured.category} className="absolute -right-6 -top-6 w-44 h-44 md:w-64 md:h-64 text-[#071D49]/10" strokeWidth={1.25} />
                  <span className="relative inline-flex items-center gap-2 bg-[#071D49] text-white text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full">
                    <CategoryIcon category={featured.category} className="w-3.5 h-3.5 text-[#D7E400]" strokeWidth={2.5} />
                    Destacado · {featured.category}
                  </span>
                </div>
                <div className="p-6 sm:p-10">
                  <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-[1.1] mb-4 text-[#071D49]">
                    {featured.title}
                  </h2>
                  <p className="text-[#071D49]/70 text-base sm:text-lg leading-relaxed mb-6">{featured.excerpt}</p>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                    <span className="inline-flex items-center gap-2 text-sm text-[#071D49]/70">
                      <Clock className="w-4 h-4" aria-hidden="true" />
                      {featured.readingMinutes} min de lectura · {formatFecha(featured.date)}
                    </span>
                    <span className="inline-flex items-center justify-center gap-2 min-h-[48px] w-full sm:w-auto bg-[#071D49] text-white group-hover:bg-[#0B2A66] font-display font-extrabold text-xs sm:text-sm uppercase tracking-wider px-6 rounded-2xl transition-colors">
                      Leer la guía <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          )}

          {/* Tarjetas */}
          {list.length > 0 ? (
            <div className="grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {list.map((post) => (
                <NoticiaCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <p className="text-center text-[#071D49]/70 py-12">Pronto publicaremos guías sobre este tema.</p>
          )}
        </div>
      </section>
    </div>
  );
}
