import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { ArrowRight, Search } from 'lucide-react';

import SEOHead from '../components/SEOHead';
import BackgroundAurora from '../components/BackgroundAurora';
import { BLOG_POSTS } from '../data/blog';

export default function Blog() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-indigo-500/30 overflow-x-hidden">
      <SEOHead 
        title="Lael Blog | Consejos de Estudio, Idiomas y Futuro" 
        description="Recursos gratuitos para estudiantes exigentes. Tips PAES, guías de idiomas y desarrollo personal."
      />
      
      <BackgroundAurora />

      {/* Header */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-5xl text-center relative z-10">
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400 mb-8"
           >
              Recursos Gratuitos
           </motion.div>
           <motion.h1 
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             className="text-5xl md:text-8xl font-black text-white tracking-tighter uppercase leading-[0.85] mb-8"
           >
             CONOCIMIENTO<br />
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-white to-sky-400">
                ACCIONABLE.
             </span>
           </motion.h1>
           <p className="text-lg md:text-xl text-slate-400 font-light max-w-2xl mx-auto mb-12">
              No solo enseñamos materias, enseñamos a pensar. Explora nuestras guías y artículos.
           </p>

           {/* Search Bar (Visual Only for now) */}
           <div className="max-w-md mx-auto relative group">
              <input 
                 type="text" 
                 placeholder="Buscar tema..." 
                 className="w-full bg-white/5 border border-white/10 rounded-full py-4 pl-12 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500/50 transition-all group-hover:bg-white/10"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
           </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-20 bg-slate-900/10 border-t border-white/5">
         <div className="container mx-auto px-6 max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               {BLOG_POSTS.map((post, i) => (
                  <motion.div
                     key={post.slug}
                     initial={{ opacity: 0, y: 20 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     transition={{ delay: i * 0.1 }}
                     className="group bg-white/[0.02] border border-white/5 rounded-3xl overflow-hidden hover:border-indigo-500/30 hover:bg-white/[0.04] transition-all duration-300"
                  >
                     {/* Image */}
                     <div className="aspect-video relative overflow-hidden">
                        <div className="absolute inset-0 bg-indigo-900/20 mix-blend-overlay z-10" />
                        <img 
                           src={post.image} 
                           alt={post.title} 
                           className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute top-4 left-4 z-20">
                           <span className="bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest text-indigo-400 border border-white/10">
                              {post.category}
                           </span>
                        </div>
                     </div>

                     {/* Content */}
                     <div className="p-8">
                        <div className="flex items-center justify-between text-xs text-slate-500 font-bold uppercase tracking-widest mb-4">
                           <span>{format(new Date(post.date), "dd MMM yyyy", { locale: es })}</span>
                           <span>{post.author.split(" ")[0]}</span>
                        </div>
                        <Link to={`/blog/${post.slug}`}>
                           <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-3 group-hover:text-indigo-400 transition-colors leading-tight">
                              {post.title}
                           </h3>
                        </Link>
                        <p className="text-slate-400 text-sm leading-relaxed mb-8 line-clamp-3">
                           {post.excerpt}
                        </p>
                        
                        <Link 
                           to={`/blog/${post.slug}`}
                           className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-white hover:text-indigo-400 transition-colors group/link"
                        >
                           Leer Artículo <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                        </Link>
                     </div>
                  </motion.div>
               ))}
            </div>
         </div>
      </section>

    </div>
  );
}
