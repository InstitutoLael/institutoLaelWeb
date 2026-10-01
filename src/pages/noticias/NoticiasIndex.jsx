import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import PageHero from '../../components/ui/PageHero';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Clock } from 'lucide-react';
import { CATEGORIES, getAllNoticias, formatFecha } from '../../data/noticias';
import CategoryIcon from '../../components/noticias/CategoryIcon';

const SITE = 'https://www.institutolael.cl';

// Color de cada categoría (el de su programa)
const CAT_COLOR = { PAES: '#D7E400', Adultos: '#FF9F7A', Homeschool: '#F7A8D0', Lael: '#7CC6FF' };
const colorDe = (c) => CAT_COLOR[c] || '#D7E400';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] },
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
      <PageHero eyebrow="Noticias y guías" title="Lo que necesitas saber," accent="en simple.">
        <p>Fechas de la PAES, exámenes libres y validación de estudios, explicados paso a paso y con las fuentes oficiales a la vista.</p>
          {/* Filtro por categoría */}
          <motion.div {...fadeUp(0.3)} className="mt-8 -mx-5 px-5 text-base sm:mx-0 sm:px-0 overflow-x-auto">
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
      </PageHero>

      <section className="px-5 sm:px-8 lg:px-12 pt-12 sm:pt-16 pb-20 sm:pb-28">
        <div className="max-w-[1400px] mx-auto">
          {/* Destacada: portada de revista */}
          {showFeatured && (
            <motion.div {...fadeUp(0.2)} className="mb-14 sm:mb-20">
              <Link
                to={`/noticias/${featured.slug}`}
                data-cursor="Leer"
                className="group grain relative grid lg:grid-cols-12 rounded-[32px] lg:rounded-[44px] bg-[#071D49] text-white overflow-hidden"
                data-keep-light
              >
                <div className="lg:col-span-8 p-7 sm:p-10 lg:p-14 flex flex-col">
                  <p className="flex items-center gap-3 text-[11px] sm:text-xs font-bold uppercase tracking-[0.22em] text-white/70">
                    <span style={{ color: colorDe(featured.category) }}>Destacado</span>
                    <span aria-hidden="true" className="w-8 h-px bg-white/30" />
                    {featured.category}
                  </p>
                  <h2 className="mt-8 font-display font-extrabold tracking-[-0.04em] leading-[0.98] text-3xl sm:text-5xl lg:text-6xl max-w-[18ch]">
                    {featured.title}
                  </h2>
                  <p className="mt-6 text-white/75 text-base sm:text-lg leading-relaxed max-w-2xl">{featured.excerpt}</p>
                  <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                    <span className="inline-flex items-center justify-center gap-2 min-h-[52px] w-full sm:w-auto bg-[#D7E400] text-[#071D49] group-hover:bg-white font-display font-extrabold text-xs sm:text-sm uppercase tracking-wider px-7 rounded-full transition-colors">
                      Leer la guía <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </span>
                    <span className="inline-flex items-center gap-2 text-sm text-white/70">
                      <Clock className="w-4 h-4" aria-hidden="true" />
                      {featured.readingMinutes} min de lectura · {formatFecha(featured.date)}
                    </span>
                  </div>
                </div>
                <div aria-hidden="true" className="hidden lg:flex lg:col-span-4 items-center justify-center relative">
                  <CategoryIcon category={featured.category} className="w-64 h-64 transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:rotate-6 group-hover:scale-105" style={{ color: colorDe(featured.category) }} strokeWidth={1} />
                </div>
              </Link>
            </motion.div>
          )}

          {/* Índice editorial */}
          {list.length > 0 ? (
            <ol className="border-t border-[#071D49]/15">
              {list.map((post, i) => (
                <motion.li
                  key={post.slug}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
                  className="border-b border-[#071D49]/15"
                >
                  <Link to={`/noticias/${post.slug}`} className="group relative grid grid-cols-[2.5rem_1fr_auto] lg:grid-cols-[3.5rem_10rem_1fr_12rem_3rem] items-start lg:items-center gap-x-4 lg:gap-x-6 gap-y-2 py-7 sm:py-9 overflow-hidden">
                    <span aria-hidden="true" className="absolute inset-0 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] opacity-20" style={{ backgroundColor: colorDe(post.category) }} />
                    <span className="relative font-display font-bold text-xs tracking-[0.2em] text-[#071D49]/70 pt-1 lg:pt-0">{String(i + 1).padStart(2, '0')}</span>
                    <span className="relative hidden lg:inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em]">
                      <span aria-hidden="true" className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: colorDe(post.category) }} />
                      {post.category}
                    </span>
                    <span className="relative min-w-0">
                      <span className="lg:hidden inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] mb-2">
                        <span aria-hidden="true" className="w-2 h-2 rounded-full" style={{ backgroundColor: colorDe(post.category) }} />
                        {post.category}
                      </span>
                      <span className="block font-display font-extrabold text-xl sm:text-3xl tracking-tight leading-tight text-[#071D49]">{post.title}</span>
                      <span className="block mt-2 text-sm sm:text-base text-[#071D49]/70 leading-relaxed max-w-2xl line-clamp-2">{post.excerpt}</span>
                    </span>
                    <span className="relative hidden lg:block text-sm text-[#071D49]/70">
                      {post.readingMinutes} min · {formatFecha(post.date)}
                    </span>
                    <ArrowUpRight size={22} aria-hidden="true" className="relative text-[#071D49] justify-self-end transition-transform duration-500 group-hover:rotate-45" />
                  </Link>
                </motion.li>
              ))}
            </ol>
          ) : (
            <p className="text-center text-[#071D49]/70 py-12">Pronto publicaremos guías sobre este tema.</p>
          )}
        </div>
      </section>
    </div>
  );
}
