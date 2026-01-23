import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getRoutesByCategory } from "../data/routesMap";
import { FaArrowRight, FaRocket, FaGraduationCap, FaLanguage, FaHandshake, FaBriefcase, FaUserGraduate } from "react-icons/fa";

// Category Icons Mapping
const CATEGORY_ICONS = {
    "Preuniversitario": <FaRocket />,
    "Escuela": <FaGraduationCap />,
    "Idiomas": <FaLanguage />,
    "Inclusión": <FaHandshake />,
    "Corporativo": <FaBriefcase />,
    "Especiales": <FaUserGraduate />
};

const ImageWithFallback = ({ src, alt, className }) => {
    const [error, setError] = useState(false);
    if (!src || error) {
        return (
            <div className={`w-full h-full bg-gradient-to-br from-indigo-900/40 via-slate-900/40 to-black/40 flex items-center justify-center ${className}`}>
                <span className="text-white/5 font-black italic text-4xl select-none uppercase tracking-tighter">Lael</span>
            </div>
        );
    }
    return (
        <img
            src={src}
            alt={alt}
            className={className}
            onError={() => setError(true)}
            loading="lazy"
        />
    );
};

export default function Programas() {
    const categorized = getRoutesByCategory();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-[#050505] min-h-screen pt-40 pb-32 text-white font-sans relative overflow-hidden">
            {/* Background Texture & Gradients */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 opacity-20 bg-[url('/textures/carbon-fibre.png')] bg-repeat"></div>
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-600/10 blur-[150px] rounded-full"></div>
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-amber-600/5 blur-[150px] rounded-full"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">

                {/* Header */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center max-w-4xl mx-auto mb-24"
                >
                    <span className="inline-block px-4 py-1.5 rounded-full border border-indigo-500/20 bg-indigo-500/5 text-indigo-400 font-black uppercase tracking-[0.3em] text-[10px] mb-6">
                        Catálogo Académico 2026
                    </span>
                    <h1 className="text-6xl md:text-8xl font-black mb-8 leading-[0.85] tracking-tighter uppercase">
                        Nuestros <span className="bg-gradient-to-r from-white via-indigo-200 to-indigo-500 bg-clip-text text-transparent italic">Programas</span>
                    </h1>
                    <p className="text-xl text-slate-500 font-light max-w-2xl mx-auto leading-relaxed">
                        Explora una oferta educativa diseñada para transformar potencial en resultados, desde el ingreso a la universidad hasta la maestría de nuevos lenguajes.
                    </p>
                </motion.div>

                {/* Categories Loop */}
                <div className="space-y-32">
                    {Object.entries(categorized).map(([category, items], catIdx) => (
                        <motion.section 
                            key={category}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ delay: catIdx * 0.1 }}
                        >
                            <div className="flex items-center gap-6 mb-12">
                                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-indigo-400 text-2xl">
                                    {CATEGORY_ICONS[category] || <FaRocket />}
                                </div>
                                <div>
                                    <h2 className="text-4xl font-black text-white uppercase tracking-tighter">{category}</h2>
                                    <div className="h-1 w-20 bg-indigo-600 rounded-full mt-1"></div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                                {items.map((item, idx) => (
                                    <motion.div
                                        key={item.path}
                                        whileHover={{ y: -10 }}
                                        className="h-full"
                                    >
                                        <Link
                                            to={item.path}
                                            className="block h-full group relative bg-white/[0.02] rounded-[2.5rem] overflow-hidden border border-white/5 hover:border-indigo-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-500/10 backdrop-blur-3xl"
                                        >
                                            {/* Local Texture Overlay inside Card */}
                                            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('/textures/pinstripe-dark.png')] bg-repeat"></div>

                                            {/* Image container */}
                                            <div className="h-56 overflow-hidden relative">
                                                <div className="absolute inset-0 bg-slate-950/40 group-hover:bg-transparent transition-all duration-700 z-10" />
                                                <ImageWithFallback
                                                    src={item.img}
                                                    alt={item.title}
                                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000 ease-out"
                                                />
                                                <div className="absolute bottom-4 left-6 z-20">
                                                    <span className="px-3 py-1 rounded-lg bg-indigo-600 text-[9px] font-black uppercase tracking-widest text-white shadow-lg">
                                                        Cupos 2026
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Content */}
                                            <div className="p-10 relative z-20">
                                                <h3 className="text-2xl font-black text-white mb-4 group-hover:text-indigo-400 transition-colors uppercase tracking-tight">
                                                    {item.title}
                                                </h3>
                                                <p className="text-slate-500 text-sm mb-8 leading-relaxed font-light line-clamp-3">
                                                    {item.desc}
                                                </p>
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2 text-indigo-400 text-[10px] font-black uppercase tracking-[0.2em] group-hover:gap-4 transition-all transition-property-[gap]">
                                                        Explorar Programa <FaArrowRight />
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.section>
                    ))}
                </div>

            </div>
        </div>
    );
}
