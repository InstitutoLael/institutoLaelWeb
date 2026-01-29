import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// Components
import SEOHead from "../components/SEOHead.jsx";
import PartnersMarquee from "../components/PartnersMarquee.jsx"; // Keeping this as it adds credibility subtly

// Icons
import { FaArrowRight, FaRocket, FaGlobe, FaUserGraduate } from "react-icons/fa";

export default function Home() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-[#020617] text-slate-200 font-sans overflow-x-hidden selection:bg-amber-500/30">
            {/* Page Metadata */}
            <SEOHead 
                title="Instituto Lael | Preuniversitario, Idiomas y Nivelación Online" 
                description="Educación Online de calidad, humana y tecnológica. Ya sea para entrar a la U, aprender un idioma o terminar tu colegio." 
            />

            {/* ──────────────── BLOQUE 2: HERO SECTION (La Promesa) ──────────────── */}
            <section className="relative min-h-[90vh] flex flex-col items-center justify-center py-20 overflow-hidden px-6">
                
                {/* Aurora Background (Clean & Non-distracting) */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[80vw] h-[50vh] bg-indigo-600/20 blur-[120px] rounded-full mix-blend-screen"></div>
                    <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vh] bg-emerald-500/10 blur-[100px] rounded-full mix-blend-screen"></div>
                    {/* Subtle noise texture for premium feel */}
                    <div className="absolute inset-0 opacity-10 bg-[url('/textures/noise.png')] bg-repeat"></div>
                </div>

                <div className="relative z-10 max-w-5xl mx-auto text-center w-full mt-10">
                    
                    <motion.h1 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter mb-8 leading-[1.1]"
                    >
                        Tu futuro no tiene que esperar. <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-white to-amber-200">
                            Elige crecer hoy.
                        </span>
                    </motion.h1>

                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-xl md:text-2xl text-slate-400 mb-16 max-w-3xl mx-auto leading-relaxed font-light"
                    >
                        Educación Online de calidad, humana y tecnológica. Ya sea para entrar a la U, aprender un idioma o terminar tu colegio.
                    </motion.p>

                    {/* ──────────────── BLOQUE 3: LOS 3 MUNDOS (Tarjetas) ──────────────── */}
                    <div id="mundos" className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                        
                        {/* CARD 1: PAES */}
                        <motion.div 
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            whileHover={{ y: -10 }}
                            className="bg-[#0f172a]/80 border border-white/5 p-10 rounded-[2.5rem] hover:border-indigo-500/50 hover:bg-[#0f172a] transition-all group relative overflow-hidden flex flex-col items-start text-left backdrop-blur-xl"
                        >
                            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                                <FaRocket size={80} />
                            </div>
                            <div className="bg-indigo-500/10 text-indigo-400 text-[10px] font-black uppercase px-3 py-1 rounded-full mb-6 inline-block border border-indigo-500/20">Preu PAES</div>
                            <h3 className="text-3xl font-black text-white mb-3 uppercase tracking-tighter">Preu PAES</h3>
                            <p className="text-slate-400 mb-10 leading-relaxed font-medium">Estrategia y simuladores para asegurar tu puntaje.</p>
                            <Link to="/paes" className="mt-auto w-full py-4 bg-indigo-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-600/20 group-hover:scale-[1.02]">
                                Ver Planes <FaArrowRight />
                            </Link>
                        </motion.div>

                        {/* CARD 2: IDIOMAS */}
                        <motion.div 
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            whileHover={{ y: -10 }}
                            className="bg-[#0f172a]/80 border border-white/5 p-10 rounded-[2.5rem] hover:border-emerald-500/50 hover:bg-[#0f172a] transition-all group relative overflow-hidden flex flex-col items-start text-left backdrop-blur-xl"
                        >
                            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                                <FaGlobe size={80} />
                            </div>
                            <div className="bg-emerald-500/10 text-emerald-400 text-[10px] font-black uppercase px-3 py-1 rounded-full mb-6 inline-block border border-emerald-500/20">Idiomas</div>
                            <h3 className="text-3xl font-black text-white mb-3 uppercase tracking-tighter">Idiomas</h3>
                            <p className="text-slate-400 mb-10 leading-relaxed font-medium">Inglés y Coreano. Conéctate con el mundo.</p>
                            <Link to="/idiomas" className="mt-auto w-full py-4 bg-emerald-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-emerald-500 transition-all shadow-lg shadow-emerald-600/20 group-hover:scale-[1.02]">
                                Elegir Idioma <FaArrowRight />
                            </Link>
                        </motion.div>

                        {/* CARD 3: ADULTOS */}
                        <motion.div 
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            whileHover={{ y: -10 }}
                            className="bg-[#0f172a]/80 border border-white/5 p-10 rounded-[2.5rem] hover:border-amber-500/50 hover:bg-[#0f172a] transition-all group relative overflow-hidden flex flex-col items-start text-left backdrop-blur-xl"
                        >
                            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                                <FaUserGraduate size={80} />
                            </div>
                            <div className="bg-amber-500/10 text-amber-500 text-[10px] font-black uppercase px-3 py-1 rounded-full mb-6 inline-block border border-amber-500/20">Adultos</div>
                            <h3 className="text-3xl font-black text-white mb-3 uppercase tracking-tighter">Escuela Adultos</h3>
                            <p className="text-slate-400 mb-10 leading-relaxed font-medium">2 años en 1. Saca tu 4to medio 100% Online.</p>
                            <Link to="/escuela-adultos" className="mt-auto w-full py-4 bg-amber-500 text-slate-950 font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-amber-400 transition-all shadow-lg shadow-amber-500/20 group-hover:scale-[1.02]">
                                Terminar Estudios <FaArrowRight />
                            </Link>
                        </motion.div>

                    </div>
                </div>
            </section>

            {/* ──────────────── BLOQUE 4: SOCIAL PROOF ──────────────── */}
            <section className="bg-black py-6 border-y border-white/5">
                <div className="container mx-auto px-6 text-center">
                    <p className="text-slate-500 text-sm md:text-base font-medium tracking-wide">
                        <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
                        Únete a estudiantes de todo Chile que ya están aprendiendo online.
                    </p>
                </div>
            </section>

            {/* Optional: Partners Strip for extra credibility without distraction */}
            <section className="bg-[#020617] py-10 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
                 <PartnersMarquee speed={30} />
            </section>

        </div>
    );
}