import React, { useEffect, useState } from "react";
import { RESOURCES } from "../data/resources";
import { FaShoppingCart, FaPlay, FaCheck, FaArrowRight, FaHeadphones } from "react-icons/fa";
import { motion } from "framer-motion";
import SEOHead from "../components/SEOHead.jsx";

const ImageWithFallback = ({ src, alt, className }) => {
    const [error, setError] = useState(false);
    if (!src || error) {
        return (
            <div className={`w-full h-full bg-gradient-to-br from-indigo-900 via-slate-900 to-black flex items-center justify-center ${className}`}>
                <span className="text-white/20 font-black italic text-4xl select-none">Lael</span>
            </div>
        );
    }
    return <img src={src} alt={alt} loading="lazy" className={className} onError={() => setError(true)} />;
};

export default function Recursos() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-[#050505] min-h-screen pt-40 pb-32 text-white font-sans selection:bg-indigo-500/30 overflow-hidden relative">
            <SEOHead title="Academia On-Demand | Instituto Lael" description="Accede a nuestra biblioteca de clases grabadas y material exclusivo." />

            {/* Background Ambient */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-96 bg-indigo-600/10 blur-[150px] rounded-full"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-600/5 blur-[100px] rounded-full"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">

                {/* ──────────────── 1. HERO HEADER ──────────────── */}
                <header className="text-center max-w-4xl mx-auto mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/20 bg-indigo-500/5 text-indigo-400 font-black uppercase tracking-[0.3em] text-[10px] mb-8">
                            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span> Academy Store
                        </span>
                        <h1 className="text-6xl md:text-8xl font-black mb-8 leading-[0.85] tracking-tighter uppercase">
                            Aprende a tu <br />
                            <span className="bg-gradient-to-r from-white via-indigo-200 to-indigo-500 bg-clip-text text-transparent italic px-2">Propio Ritmo.</span>
                        </h1>
                        <p className="text-xl text-slate-500 font-light max-w-2xl mx-auto leading-relaxed">
                            Acceso inmediato a nuestra biblioteca de clases grabadas, masterclasses y material premium diseñado por expertos.
                        </p>
                    </motion.div>
                </header>

                {/* ──────────────── 2. ON-DEMAND GRID ──────────────── */}
                <section className="mb-40">
                    <div className="flex items-center gap-6 mb-16">
                        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-indigo-400 text-2xl">
                            <FaPlay size={20} />
                        </div>
                        <h2 className="text-4xl font-black text-white uppercase tracking-tighter italic">Biblioteca de Clases</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {RESOURCES.on_demand.map((item, idx) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: idx * 0.1 }}
                                whileHover={{ y: -10 }}
                                className="group relative bg-white/[0.02] rounded-[3rem] overflow-hidden border border-white/5 hover:border-indigo-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-500/10 flex flex-col backdrop-blur-3xl"
                            >
                                {/* Local Texture */}
                                <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('/textures/pinstripe-dark.png')] bg-repeat"></div>

                                {/* Image Section */}
                                <div className="h-64 overflow-hidden relative">
                                    <div className="absolute inset-0 bg-slate-950/40 group-hover:bg-transparent transition-all duration-700 z-10" />
                                    <ImageWithFallback
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000 ease-out"
                                    />
                                    {item.tag && (
                                        <div className="absolute top-6 left-6 z-20">
                                            <span className="px-4 py-1.5 rounded-full bg-indigo-600 text-[10px] font-black uppercase tracking-widest text-white shadow-xl">
                                                {item.tag}
                                            </span>
                                        </div>
                                    )}
                                    <div className="absolute bottom-6 right-6 z-20 bg-slate-950/80 backdrop-blur-xl px-5 py-2 rounded-2xl border border-white/10 shadow-2xl">
                                        <span className="text-white font-black text-lg tracking-tighter">{item.price}</span>
                                    </div>
                                </div>

                                {/* Content Section */}
                                <div className="p-10 flex-1 flex flex-col relative z-20">
                                    <h3 className="text-2xl font-black text-white mb-4 group-hover:text-indigo-400 transition-colors uppercase tracking-tight leading-none">
                                        {item.title}
                                    </h3>
                                    <p className="text-slate-500 text-sm mb-8 line-clamp-2 leading-relaxed font-light italic">
                                        "{item.description}"
                                    </p>

                                    <div className="space-y-4 mb-10 flex-1">
                                        {item.features?.map((f, i) => (
                                            <div key={i} className="flex items-center gap-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                                <FaCheck className="text-indigo-500 text-sm" /> {f}
                                            </div>
                                        ))}
                                    </div>

                                    <a
                                        href={item.buyLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-between group/btn w-full px-8 py-5 bg-white text-slate-950 rounded-[1.5rem] font-black uppercase tracking-widest text-[10px] transition-all hover:bg-indigo-600 hover:text-white"
                                    >
                                        <span className="flex items-center gap-3"><FaShoppingCart /> Adquirir Pack</span>
                                        <FaArrowRight className="group-hover/btn:translate-x-2 transition-transform" />
                                    </a>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* ──────────────── 3. RECOMENDED / GEAR ──────────────── */}
                <section className="pt-20 border-t border-white/5">
                    <div className="flex items-center justify-between mb-16">
                        <div className="flex items-center gap-6">
                            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-amber-500 text-2xl">
                                <FaHeadphones size={20} />
                            </div>
                            <h2 className="text-4xl font-black text-white uppercase tracking-tighter italic text-opacity-50">Equipo Recomendado</h2>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {RESOURCES.recomended?.map((item) => (
                            <a
                                key={item.id}
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative bg-white/[0.01] rounded-[2rem] p-8 border border-white/5 hover:border-amber-500/30 transition-all flex flex-col"
                            >
                                <div className="aspect-square rounded-2xl overflow-hidden bg-white/5 mb-6 relative">
                                    <ImageWithFallback src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-50 group-hover:opacity-100" />
                                </div>
                                <div className="text-[10px] text-amber-500 uppercase font-black mb-2 tracking-widest">{item.store}</div>
                                <h3 className="text-white font-black uppercase tracking-tight mb-2 group-hover:text-amber-400 transition-colors">{item.title}</h3>
                                <p className="text-slate-500 text-xs mb-4 line-clamp-2 italic leading-relaxed">{item.description}</p>
                            </a>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
