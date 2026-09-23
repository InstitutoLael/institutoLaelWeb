import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { getAllNoticias } from '../data/noticias';
import NoticiaCard from './noticias/NoticiaCard';

// Sección con las últimas noticias (3 por defecto), para poner en cualquier página.
//
// Uso:
//   import NoticiasDestacadas from '../components/NoticiasDestacadas';
//   <NoticiasDestacadas />                          -> las 3 más recientes
//   <NoticiasDestacadas category="PAES" />          -> solo noticias PAES
//   <NoticiasDestacadas bg="gray" title="Guías para tu PAES" />
export default function NoticiasDestacadas({
  category,
  limit = 3,
  bg = 'white',
  eyebrow = 'Noticias y guías',
  title = 'Lo último para ti',
}) {
  const posts = getAllNoticias()
    .filter((p) => !category || p.category === category)
    .slice(0, limit);
  if (!posts.length) return null;

  const sectionBg = bg === 'gray' ? 'bg-[#F4F4F4]' : 'bg-white';
  const cardSurface = bg === 'gray' ? 'white' : 'gray';

  return (
    <section className={`${sectionBg} text-[#071D49] px-5 sm:px-6 py-16 sm:py-20 lg:py-28`}>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 sm:mb-10">
          <div>
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] mb-4">
              <span className="w-4 h-1 rounded-full bg-[#D7E400]" aria-hidden="true" />
              {eyebrow}
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight leading-[1.05]">
              {title}
            </h2>
          </div>
          <Link
            to="/noticias"
            className="self-start sm:self-auto min-h-[48px] inline-flex items-center justify-center gap-2 bg-[#071D49] text-white hover:bg-[#0B2A66] font-display font-extrabold text-xs sm:text-sm uppercase tracking-wider px-6 rounded-2xl transition-colors"
          >
            Ver todas <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
        <div className="grid gap-5 sm:gap-6 md:grid-cols-3">
          {posts.map((post) => (
            <NoticiaCard key={post.slug} post={post} compact surface={cardSurface} />
          ))}
        </div>
      </div>
    </section>
  );
}
