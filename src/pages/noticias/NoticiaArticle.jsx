import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import { ChevronRight, Clock, RefreshCw, CalendarDays, ExternalLink, ArrowLeft } from 'lucide-react';
import { getNoticia, getRelatedNoticias, formatFecha } from '../../data/noticias';
import NoticiaBody from '../../components/noticias/NoticiaBody';
import NoticiaCard from '../../components/noticias/NoticiaCard';
import CategoryIcon from '../../components/noticias/CategoryIcon';

const SITE = 'https://institutolael.cl';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
});

function NoEncontrada() {
  return (
    <div className="w-full bg-[#F4F4F4] text-[#071D49] overflow-x-clip px-5 sm:px-6 pt-32 pb-24 min-h-[70vh]">
      <Helmet>
        <title>Noticia no encontrada | Instituto Lael</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold uppercase tracking-tight mb-4">No encontramos esta noticia</h1>
        <p className="text-[#071D49]/70 mb-8">Puede que el link esté mal escrito o que la hayamos movido.</p>
        <Link
          to="/noticias"
          className="min-h-[48px] inline-flex items-center justify-center gap-2 bg-[#071D49] text-white hover:bg-[#0B2A66] font-display font-extrabold text-xs sm:text-sm uppercase tracking-wider px-6 rounded-2xl"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" /> Ver todas las noticias
        </Link>
      </div>
    </div>
  );
}

export default function NoticiaArticle() {
  const { slug } = useParams();
  const post = getNoticia(slug);
  if (!post) return <NoEncontrada />;

  const url = `${SITE}/noticias/${post.slug}`;
  const related = getRelatedNoticias(post, 3);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: post.title,
        description: post.excerpt,
        datePublished: post.date,
        dateModified: post.updated || post.date,
        inLanguage: 'es-CL',
        articleSection: post.category,
        mainEntityOfPage: { '@type': 'WebPage', '@id': url },
        url,
        image: `${SITE}/meta/og-lael.png`,
        author: { '@type': 'Organization', name: 'Instituto Lael', url: `${SITE}/` },
        publisher: {
          '@type': 'Organization',
          name: 'Instituto Lael',
          logo: { '@type': 'ImageObject', url: `${SITE}/meta/logo-lael.png` },
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${SITE}/` },
          { '@type': 'ListItem', position: 2, name: 'Noticias y guías', item: `${SITE}/noticias` },
          { '@type': 'ListItem', position: 3, name: post.title, item: url },
        ],
      },
    ],
  };

  return (
    <div className="w-full bg-[#F4F4F4] text-[#071D49] overflow-x-clip font-sans">
      <Helmet>
        <title>{`${post.title} | Instituto Lael`}</title>
        <meta name="description" content={post.excerpt} />
        <link rel="canonical" href={url} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:url" content={url} />
        <meta property="article:published_time" content={post.date} />
        <meta property="article:modified_time" content={post.updated || post.date} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      {/* Encabezado */}
      <header className="relative -mt-20 pt-36 sm:pt-40 pb-12 sm:pb-16 px-5 sm:px-6 bg-[#071D49] text-white">
        <div className="max-w-3xl mx-auto">
          <motion.nav {...fadeUp(0)} aria-label="Ruta de navegación" className="mb-6">
            <ol className="flex flex-wrap items-center gap-1 text-sm text-white/75">
              <li><Link to="/" className="hover:text-white underline-offset-4 hover:underline py-2 inline-block">Inicio</Link></li>
              <li aria-hidden="true"><ChevronRight className="w-4 h-4" /></li>
              <li><Link to="/noticias" className="hover:text-white underline-offset-4 hover:underline py-2 inline-block">Noticias y guías</Link></li>
              <li aria-hidden="true"><ChevronRight className="w-4 h-4" /></li>
              <li aria-current="page" className="font-semibold text-white truncate max-w-[12rem] sm:max-w-xs">{post.title}</li>
            </ol>
          </motion.nav>

          <motion.span {...fadeUp(0.05)} className="inline-flex items-center gap-2 bg-[#D7E400] text-[#071D49] text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full mb-5">
            <CategoryIcon category={post.category} className="w-3.5 h-3.5" strokeWidth={2.5} />
            {post.category}
          </motion.span>

          <motion.h1 {...fadeUp(0.1)} className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-[-0.02em] leading-[1.1] mb-5">
            {post.title}
          </motion.h1>
          <motion.p {...fadeUp(0.15)} className="text-white/75 text-base sm:text-lg leading-relaxed mb-6">
            {post.excerpt}
          </motion.p>

          <motion.ul {...fadeUp(0.2)} className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/75">
            <li className="inline-flex items-center gap-1.5">
              <CalendarDays className="w-4 h-4" aria-hidden="true" />
              <time dateTime={post.date}>{formatFecha(post.date)}</time>
            </li>
            <li className="inline-flex items-center gap-1.5">
              <Clock className="w-4 h-4" aria-hidden="true" />
              {post.readingMinutes} min de lectura
            </li>
            <li className="inline-flex items-center gap-1.5">
              <RefreshCw className="w-4 h-4" aria-hidden="true" />
              Última actualización: <time dateTime={post.updated || post.date}>{formatFecha(post.updated || post.date)}</time>
            </li>
          </motion.ul>
        </div>
      </header>

      {/* Contenido */}
      <section className="px-5 sm:px-6 pt-8 sm:pt-12 pb-16 sm:pb-20">
        <motion.article
          {...fadeUp(0.25)}
          className="max-w-3xl mx-auto bg-white rounded-[28px] p-6 sm:p-10 lg:p-12 border border-[#071D49]/5 shadow-card"
        >
          <NoticiaBody blocks={post.body} />

          {post.sources?.length > 0 && (
            <footer className="mt-10 pt-8 border-t border-[#071D49]/10">
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] mb-4">Fuentes oficiales</h2>
              <ul className="space-y-3">
                {post.sources.map((s) => (
                  <li key={s.url}>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-start gap-2 text-sm sm:text-base text-[#071D49]/80 hover:text-[#071D49] leading-relaxed"
                    >
                      <ExternalLink className="w-4 h-4 mt-1 flex-shrink-0" aria-hidden="true" />
                      <span className="underline underline-offset-4 decoration-[#071D49]/25 group-hover:decoration-[#071D49] break-words">{s.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm text-[#071D49]/70 leading-relaxed">
                Revisamos esta guía el {formatFecha(post.updated || post.date)}. Las fechas y reglas las fija cada organismo y pueden cambiar: confírmalas siempre en la fuente oficial.
              </p>
            </footer>
          )}
        </motion.article>
      </section>

      {/* Relacionadas */}
      {related.length > 0 && (
        <section className="px-5 sm:px-6 py-16 sm:py-20 bg-white">
          <div className="max-w-6xl mx-auto">
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] mb-4">
              <span className="w-4 h-1 rounded-full bg-[#D7E400]" aria-hidden="true" />
              Sigue leyendo
            </p>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold uppercase tracking-tight leading-[1.05]">Guías relacionadas</h2>
              <Link to="/noticias" className="inline-flex items-center gap-2 min-h-[44px] font-display font-extrabold text-xs sm:text-sm uppercase tracking-wider underline underline-offset-4">
                Ver todas
              </Link>
            </div>
            <div className="grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <NoticiaCard key={p.slug} post={p} surface="gray" />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
