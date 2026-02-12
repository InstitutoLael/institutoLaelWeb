import React from 'react';
import { motion } from 'framer-motion';
import SEOHead from './SEOHead';
import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ArticleLayout({ children, title, description, image, category, date, author }) {
  return (
    <motion.article 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-indigo-500/30 pb-20"
    >
      <SEOHead title={`${title} | Blog Instituto Lael`} description={description} />
      
      {/* Scroll Progress Bar could go here */}

      {/* Hero Image */}
      <div className="relative h-[50vh] min-h-[400px] w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/50 to-transparent z-10" />
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover"
        />
        
        <div className="absolute top-8 left-8 z-20">
          <Link 
            to="/blog" 
            className="flex items-center gap-2 px-4 py-2 bg-slate-950/50 hover:bg-slate-900 backdrop-blur-md rounded-full text-white text-xs font-bold uppercase tracking-widest transition-colors border border-white/10"
          >
            <ChevronLeft size={16} /> Volver al Blog
          </Link>
        </div>

        <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 z-20 max-w-4xl">
          <div className="flex items-center gap-4 mb-6">
             <span className="px-3 py-1 bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg shadow-indigo-600/20">
                {category}
             </span>
             <span className="text-slate-300 text-xs font-bold uppercase tracking-widest">
                {date} · por <span className="text-white">{author}</span>
             </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-tight drop-shadow-xl">
             {title}
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 max-w-3xl py-16">
        <div className="prose prose-invert prose-lg md:prose-xl prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tight prose-a:text-indigo-400 prose-img:rounded-3xl prose-img:shadow-2xl">
          {children}
        </div>
      </div>

    </motion.article>
  );
}
