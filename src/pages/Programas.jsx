import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { routesMap, getRoutesByCategory } from "../data/routesMap";
import { FaArrowRight } from "react-icons/fa";

// Image with fallback logic

const ImageWithFallback = ({ src, alt, className }) => {
    const [error, setError] = useState(false);

    // If no src is provided or if it errored out, show gradient
    if (!src || error) {
        return (
            <div className={`w-full h-full bg-gradient-to-br from-indigo-900 via-slate-900 to-black flex items-center justify-center ${className}`}>
                <span className="text-white/20 font-serif italic text-2xl select-none">Lael</span>
            </div>
        );
    }

    return (
        <img
            src={src}
            alt={alt}
            className={className}
            onError={() => setError(true)}
        />
    );
};

export default function Programas() {
    const categorized = getRoutesByCategory();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-[#020617] min-h-screen pt-32 pb-20 text-white font-sans">
            <div className="container mx-auto px-6">

                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <span className="text-indigo-400 font-bold uppercase tracking-widest text-sm mb-2 block">Catálogo Académico</span>
                    <h1 className="text-4xl md:text-6xl font-serif mb-6">Nuestros Programas</h1>
                    <p className="text-xl text-slate-400">
                        Explora nuestra oferta educativa integral, desde preuniversitario hasta capacitación corporativa.
                    </p>
                </div>

                {/* Categories Loop */}
                <div className="space-y-24">
                    {Object.entries(categorized).map(([category, items]) => (
                        <section key={category}>
                            <div className="flex items-center gap-4 mb-8">
                                <h2 className="text-3xl font-bold text-white">{category}</h2>
                                <div className="h-px bg-white/10 flex-1"></div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {items.map((item) => (
                                    <Link
                                        to={item.path}
                                        key={item.path}
                                        className="group relative bg-[#0f172a] rounded-2xl overflow-hidden border border-white/5 hover:border-indigo-500/50 transition-all hover:-translate-y-1 shadow-lg hover:shadow-indigo-500/10"
                                    >
                                        {/* Image or Gradient Fallback */}
                                        <div className="h-48 overflow-hidden relative bg-[#1e293b]">
                                            <div className="absolute inset-0 bg-indigo-900/20 group-hover:bg-transparent transition-colors z-10" />
                                            <ImageWithFallback
                                                src={item.img}
                                                alt={item.title}
                                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                            />
                                        </div>

                                        {/* Content */}
                                        <div className="p-6">
                                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">
                                                {item.title}
                                            </h3>
                                            <p className="text-slate-400 text-sm mb-6 line-clamp-2">
                                                {item.desc}
                                            </p>
                                            <div className="flex items-center gap-2 text-indigo-400 text-sm font-bold uppercase tracking-wider group-hover:gap-3 transition-all">
                                                Ver Detalles <FaArrowRight />
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    ))}
                </div>

            </div>
        </div>
    );
}
