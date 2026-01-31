import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { FaArrowRight, FaUsers, FaLightbulb, FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import SEOHead from "../components/SEOHead.jsx";
import { MANIFESTO, STATS, VALUES, TEAM_ROLES, THE_NAME } from "../data/nosotros.js";

export default function Nosotros() {
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-indigo-500/30 overflow-x-hidden">
      <SEOHead 
        title="Nosotros | Instituto Lael" 
        description="Conoce nuestra misión, valores y el equipo detrás de la democratización de la educación de calidad." 
      />

      {/* ──────────────── 1. HERO SECTION (TYPOGRAPHIC) ──────────────── */}
      <section className="relative pt-40 pb-24 px-6 overflow-hidden">
        {/* Abstract Background Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-[radial-gradient(circle_at_center,_rgba(99,102,241,0.08)_0%,_transparent_70%)] pointer-events-none" />
        
        <div className="container mx-auto max-w-5xl text-center relative z-10">
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="inline-block text-xs font-black uppercase tracking-[0.4em] text-indigo-400 mb-6"
          >
            {MANIFESTO.tagline}
          </motion.span>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl lg:text-7xl font-black mb-10 leading-[0.9] tracking-tighter uppercase"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-indigo-200 to-cyan-400">
              {MANIFESTO.title}
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-base md:text-xl lg:text-2xl text-slate-400 font-light leading-relaxed max-w-3xl mx-auto"
          >
            {MANIFESTO.description}
          </motion.p>
        </div>
      </section>

      {/* ──────────────── 1.5 EL SIGNIFICADO (THE NAME) ──────────────── */}
      <section className="py-24 bg-white/[0.02] border-y border-white/5 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-500/5 blur-[100px] rounded-full -translate-x-1/2 -translate-y-1/2" />
        
        <div className="container mx-auto px-6 max-w-4xl text-center relative z-10">
          <motion.div {...fadeIn}>
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-500 mb-8 italic">El significado de nuestra identidad</h2>
            
            <div className="mb-10">
              <span className="text-5xl md:text-7xl font-black text-indigo-400 block mb-2">{THE_NAME.term}</span>
              <span className="text-2xl md:text-3xl font-light text-white tracking-widest uppercase">{THE_NAME.definition}</span>
            </div>

            <div className="max-w-2xl mx-auto">
              <p className="text-lg text-slate-400 leading-relaxed mb-6 font-medium italic">
                "{THE_NAME.description}"
              </p>
              <span className="inline-block px-4 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-[10px] font-black text-indigo-300 uppercase tracking-widest">
                Ref: {THE_NAME.biblicalRef}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ──────────────── 2. STATS BAR ──────────────── */}
      <section className="py-12 border-y border-white/5 bg-white/[0.01]">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-white/5 border-x border-white/5">
            {STATS.map((stat) => (
              <motion.div 
                key={stat.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="p-8 text-center"
              >
                <div className="text-3xl md:text-5xl font-black text-white mb-2 tracking-tighter">{stat.value}</div>
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────── 3. VALUES SECTION ──────────────── */}
      <section className="py-32 bg-slate-950">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div {...fadeIn} className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4">Nuestro ADN</h2>
            <p className="text-slate-500 font-medium">Lo que nos impulsa a mejorar cada día.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {VALUES.map((value, i) => (
              <motion.div 
                key={value.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="group bg-slate-900/40 border border-white/5 p-10 rounded-[3rem] hover:bg-slate-900/60 hover:border-indigo-500/30 transition-all shadow-xl"
              >
                <div className="text-5xl mb-8 group-hover:scale-110 transition-transform inline-block">{value.icon}</div>
                <h3 className="text-xl font-black text-white uppercase tracking-tight mb-4 group-hover:text-indigo-400 transition-colors">{value.title}</h3>
                <p className="text-base text-slate-400 leading-relaxed font-medium">
                  {value.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────── 4. TEAM SECTION (ABSTRACT) ──────────────── */}
      <section className="py-32 bg-slate-900/30 overflow-hidden relative">
        {/* Decorative Light */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <motion.div {...fadeIn} className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4">El Equipo de Impacto</h2>
            <p className="text-slate-500 font-medium">Talento comprometido con tu crecimiento.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TEAM_ROLES.map((role, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-white/[0.02] border border-white/5 p-10 rounded-[2.5rem] flex flex-col items-center text-center group hover:border-white/10 transition-colors"
              >
                <div className={`w-20 h-20 rounded-2xl ${role.color} flex items-center justify-center text-2xl font-black mb-8 group-hover:scale-110 transition-transform`}>
                  {role.initials}
                </div>
                <h3 className="text-lg font-black text-white uppercase tracking-tight mb-3">{role.role}</h3>
                <p className="text-sm text-slate-500 leading-relaxed max-w-[200px] font-medium">
                  {role.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────── 5. CTA FINAL ──────────────── */}
      <section className="py-32">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-[4rem] p-12 md:p-20 text-center shadow-2xl relative overflow-hidden"
          >
            {/* Glossy overlay */}
            <div className="absolute top-0 left-0 w-full h-full bg-white/5 opacity-40 pointer-events-none" />
            
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white mb-10">
                ¿LISTO PARA <br /> EMPEZAR?
              </h2>
              <Link 
                to="/programas"
                className="inline-flex items-center gap-4 px-10 py-6 bg-white text-indigo-600 font-black rounded-2xl shadow-xl hover:bg-slate-50 transition-all uppercase tracking-widest text-sm group"
              >
                VER TODOS LOS CURSOS
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}