import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock } from 'lucide-react';
import { formatFecha } from '../../data/noticias';
import CategoryIcon from './CategoryIcon';

// Tarjeta de una noticia. `compact` la hace más baja (para NoticiasDestacadas).
export default function NoticiaCard({ post, compact = false, surface = 'white' }) {
  const bg = surface === 'gray' ? 'bg-[#F4F4F4]' : 'bg-white';
  return (
    <Link
      to={`/noticias/${post.slug}`}
      className={`group flex flex-col h-full ${bg} rounded-[28px] border border-[#071D49]/5 shadow-card overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lael focus:outline-none focus-visible:ring-2 focus-visible:ring-[#071D49] focus-visible:ring-offset-2`}
    >
      {!compact && (
        <div className="relative h-32 sm:h-36 bg-[#071D49] flex items-end p-6 overflow-hidden">
          <CategoryIcon category={post.category} className="absolute -right-4 -top-4 w-36 h-36 text-white/[0.06]" strokeWidth={1.5} />
          <span className="relative inline-flex items-center gap-2 bg-[#D7E400] text-[#071D49] text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full">
            <CategoryIcon category={post.category} className="w-3.5 h-3.5" strokeWidth={2.5} />
            {post.category}
          </span>
        </div>
      )}
      <div className={`flex flex-col flex-1 ${compact ? 'p-6' : 'p-6 sm:p-7'}`}>
        {compact && (
          <span className="self-start inline-flex items-center gap-2 bg-[#071D49] text-white text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full mb-4">
            <CategoryIcon category={post.category} className="w-3.5 h-3.5 text-[#D7E400]" strokeWidth={2.5} />
            {post.category}
          </span>
        )}
        <h3 className="font-display text-lg sm:text-xl font-extrabold leading-snug tracking-tight text-[#071D49] mb-3">
          {post.title}
        </h3>
        <p className={`text-[#071D49]/70 leading-relaxed text-sm sm:text-base mb-5 ${compact ? 'line-clamp-3' : ''}`}>
          {post.excerpt}
        </p>
        <div className="mt-auto flex items-center justify-between gap-3 text-xs sm:text-sm text-[#071D49]/70">
          <span className="inline-flex items-center gap-1.5">
            <Clock className="w-4 h-4" aria-hidden="true" />
            {post.readingMinutes} min · {formatFecha(post.date)}
          </span>
          <ArrowRight className="w-5 h-5 text-[#071D49] flex-shrink-0 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </div>
      </div>
    </Link>
  );
}
