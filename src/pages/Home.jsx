import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// Components
import SEOHead from "../components/SEOHead.jsx";

// Icons
import {
  FaRocket, FaGlobe, FaUserGraduate, FaHandsHelping, FaLaptopCode,
  FaArrowRight, FaPlay, FaStar, FaVideo, FaGraduationCap, FaDove
} from "react-icons/fa";
import { BiWorld } from "react-icons/bi";
import { MdVerified } from "react-icons/md";
import { BsLightningChargeFill } from "react-icons/bs";

// Assets
import logoDorado from "../assets/img/Logos/lael-inst-amarillo.png";

const BentoItem = ({ to, className, children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, delay }}
    whileHover={{ scale: 1.02 }}
    className={`relative overflow-hidden rounded-[2rem] border border-white/5 bg-slate-900/50 backdrop-blur-xl group hover:border-white/20 transition-all cursor-pointer ${className}`}
  >
    <Link to={to} className="block w-full h-full p-8 relative z-10 flex flex-col justify-between">
      {children}
    </Link>
    {/* Hover Glow */}
    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
  </motion.div>
);

export default function Home() {
  const [ticketCount, setTicketCount] = useState(1284);

  useEffect(() => {
    window.scrollTo(0, 0);
    // Simulate live numbers
    const interval = setInterval(() => {
      setTicketCount(prev => prev + Math.floor(Math.random() * 3));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-indigo-500/30 pb-20">
      <SEOHead
        title="Instituto Lael | Tu Centro de Mando Educativo"
        description="Plataforma educativa integral: Preuniversitario, Idiomas, Escuela 2x1 y Homeschool. El futuro comienza aquí."
      />

      {/* ──────────────── HEADER / STATUS BAR ──────────────── */}
      <header className="pt-8 px-6 container mx-auto flex justify-between items-center mb-12">
        <div className="flex items-center gap-3">
          <img src={logoDorado} alt="Lael" className="w-10 opacity-80" />
          <div className="hidden md:block">
             <span className="block text-xs font-black uppercase tracking-widest text-slate-500">Sistema Operativo</span>
             <span className="block text-sm font-bold text-white">LaelOS v2.6 <span className="text-emerald-500 text-[10px] ml-1">● ONLINE</span></span>
          </div>
        </div>
        <div className="flex items-center gap-4">
             <div className="px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                </span>
                <span className="text-[10px] font-black uppercase tracking-widest text-indigo-300">{ticketCount} Alumnos Activos</span>
             </div>
        </div>
      </header>

      {/* ──────────────── HERO ──────────────── */}
      <div className="container mx-auto px-6 text-center max-w-4xl mb-16">
         <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-8xl font-black text-white tracking-tighter uppercase leading-none mb-6"
         >
            El Futuro <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-white to-amber-200">Es Tuyo.</span>
         </motion.h1>
         <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-slate-400 font-light max-w-2xl mx-auto"
         >
            Selecciona tu destino. Bienvenido al ecosistema educativo más avanzado de Chile.
         </motion.p>
      </div>

      {/* ──────────────── MISION CONTROL (BENTO GRID) ──────────────── */}
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-6 h-auto md:h-[800px]">

          {/* 1. PAES (MAIN LEFT) - Tall (2x2) */}
          <BentoItem to="/paes" className="md:col-span-2 md:row-span-2 bg-indigo-950/20 hover:border-indigo-500/50" delay={0.1}>
             <div className="absolute top-0 right-0 p-32 bg-indigo-600/20 blur-[100px] rounded-full" />
             <div className="flex justify-between items-start mb-10">
                <div className="p-4 bg-indigo-500/20 rounded-2xl text-indigo-400 text-3xl"><FaRocket /></div>
                <span className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-400 border border-white/10">Adms. 2026</span>
             </div>
             <div>
                <h3 className="text-4xl font-black text-white uppercase tracking-tighter mb-2">Preu PAES</h3>
                <p className="text-indigo-200 text-lg font-light leading-relaxed mb-6">
                   El único preuniversitario con simuladores de IA y coaching estratégico.
                   <br/><strong className="text-white">Asegura tu puntaje.</strong>
                </p>
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-indigo-400 group-hover:gap-4 transition-all">
                   Explorar Programa <FaArrowRight />
                </div>
             </div>
          </BentoItem>

          {/* 2. IDIOMAS (TOP RIGHT) - Wide (2x1) */}
          <BentoItem to="/idiomas" className="md:col-span-2 bg-emerald-950/20 hover:border-emerald-500/50" delay={0.2}>
             <div className="absolute bottom-0 left-0 p-24 bg-emerald-600/10 blur-[80px] rounded-full" />
             <div className="flex items-center gap-6 h-full">
                <div className="flex-1">
                   <div className="flex items-center gap-3 mb-4">
                      <div className="p-3 bg-emerald-500/20 rounded-xl text-emerald-400 text-2xl"><FaGlobe /></div>
                      <h3 className="text-2xl font-black text-white uppercase tracking-tight">Idiomas</h3>
                   </div>
                   <p className="text-slate-400 text-sm mb-4">
                      Viaja, trabaja y conecta. <span className="text-white font-bold">Inglés y Coreano</span> con nativos.
                   </p>
                   <div className="flex gap-2">
                      <span className="text-2xl grayscale hover:grayscale-0 transition-all cursor-help" title="USA">🇺🇸</span>
                      <span className="text-2xl grayscale hover:grayscale-0 transition-all cursor-help" title="Korea">🇰🇷</span>
                   </div>
                </div>
                <div className="hidden sm:flex flex-col gap-2">
                   <div className="px-4 py-2 bg-black/40 rounded-lg text-[10px] font-mono text-emerald-400 border border-emerald-500/20 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Speaking Club
                   </div>
                   <div className="px-4 py-2 bg-black/40 rounded-lg text-[10px] font-mono text-pink-400 border border-pink-500/20 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-pink-500"></span> K-Pop Culture
                   </div>
                </div>
             </div>
          </BentoItem>

          {/* 3. LSCH (MIDDLE CENTER) - Single (1x1) */}
          <BentoItem to="/lsch" className="bg-teal-950/20 hover:border-teal-500/50" delay={0.3}>
             <div className="text-right mb-4">
                <span className="text-4xl">🤟</span>
             </div>
             <h3 className="text-xl font-black text-white uppercase tracking-tight mb-2">LSCh</h3>
             <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Rompe la barrera del sonido. Cultura Sorda y gramática visual.
             </p>
             <div className="mt-auto text-[10px] font-black uppercase text-teal-400 flex items-center gap-2">
                Ver Curso <FaArrowRight />
             </div>
          </BentoItem>

          {/* 4. EMPRESAS (MIDDLE RIGHT) - Single (1x1) */}
          <BentoItem to="/empresas" className="bg-slate-800/20 hover:border-slate-500/50" delay={0.4}>
             <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-slate-700/30 rounded-lg text-slate-300"><FaLaptopCode /></div>
                <div className="px-2 py-0.6 bg-amber-500 text-slate-950 text-[9px] font-black uppercase rounded">B2B</div>
             </div>
             <h3 className="text-xl font-black text-white uppercase tracking-tight mb-1">Empresas</h3>
             <p className="text-xs text-slate-400 leading-relaxed">
                Capacitación corporativa con ROI medible.
             </p>
          </BentoItem>

          {/* 5. HOMESCHOOL (BOTTOM LEFT) - Wide (2x1) */}
          <BentoItem to="/homeschool" className="md:col-span-2 bg-amber-900/10 hover:border-amber-500/50" delay={0.5}>
             <div className="flex items-center gap-6">
                <div className="p-4 bg-amber-500/20 rounded-2xl text-amber-500 text-3xl"><FaDove /></div>
                <div>
                   <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-2">Lael Academy</h3>
                   <p className="text-slate-400 text-sm font-light">
                      Homeschool Cristiano & Refuerzo Académico. <br/>
                      <span className="text-amber-500 font-bold">Valores + Excelencia.</span>
                   </p>
                </div>
             </div>
          </BentoItem>

          {/* 6. ADULTOS (BOTTOM RIGHT) - Wide (2x1) */}
          <BentoItem to="/escuela-adultos" className="md:col-span-2 bg-blue-900/10 hover:border-blue-500/50" delay={0.6}>
             <div className="flex justify-between items-center h-full">
                <div>
                   <div className="flex items-center gap-2 mb-2">
                      <FaUserGraduate className="text-blue-400" />
                      <span className="text-xs font-black uppercase tracking-widest text-blue-400">Escuela 2x1</span>
                   </div>
                   <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-2">Termina tu 4to Medio</h3>
                   <p className="text-slate-400 text-sm max-w-xs">Nunca es tarde. Modalidad 100% Online y flexible.</p>
                </div>
                <div className="hidden sm:block">
                   <div className="w-16 h-16 rounded-full border-4 border-blue-500/20 flex items-center justify-center text-xl font-black text-white">
                      100%
                   </div>
                </div>
             </div>
          </BentoItem>

        </div>
      </div>

      {/* ──────────────── FOOTER TICKER ──────────────── */}
      <div className="fixed bottom-0 left-0 w-full bg-slate-950 border-t border-white/5 py-2 px-6 overflow-hidden hidden md:flex gap-8 items-center z-50">
         <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 whitespace-nowrap">
            Últimas Actualizaciones:
         </div>
         <div className="flex gap-12 animate-marquee whitespace-nowrap">
            <span className="text-xs text-slate-400 flex items-center gap-2">
               <span className="text-pink-500">●</span> Nuevo curso de Coreano disponible
            </span>
            <span className="text-xs text-slate-400 flex items-center gap-2">
               <span className="text-indigo-500">●</span> Admisiones PAES 2026 Abiertas
            </span>
            <span className="text-xs text-slate-400 flex items-center gap-2">
               <span className="text-emerald-500">●</span> Speaking Club: Jueves 19:00 hrs
            </span>
         </div>
      </div>

    </div>
  );
}