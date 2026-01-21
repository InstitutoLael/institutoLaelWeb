import { useEffect, useState } from "react";
import { RESOURCES } from "../data/resources";
import { FaShoppingCart, FaExternalLinkAlt, FaCheck } from "react-icons/fa";

/* 
  Estilo Marketplace Premium
  Bento Grid + Glassmorphism
*/

const ImageWithFallback = ({ src, alt, className }) => {
    const [error, setError] = useState(false);
    if (!src || error) {
        return (
            <div className={`w-full h-full bg-gradient-to-br from-indigo-900 via-slate-900 to-black flex items-center justify-center ${className}`}>
                <span className="text-white/20 font-serif italic text-2xl select-none">Lael</span>
            </div>
        );
    }
    return <img src={src} alt={alt} className={className} onError={() => setError(true)} />;
};

export default function Recursos() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-[#020617] min-h-screen pt-32 pb-20 text-white font-sans selection:bg-indigo-500/30">
            <div className="container mx-auto px-6 max-w-7xl">

                {/* HEADER */}
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <span className="text-emerald-400 font-bold uppercase tracking-widest text-sm mb-2 block">Tienda Digital</span>
                    <h1 className="text-4xl md:text-6xl font-serif mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-500">
                        Recursos & Herramientas
                    </h1>
                    <p className="text-xl text-slate-400">
                        Material exclusivo para potenciar tu aprendizaje y nuestras recomendaciones favoritas.
                    </p>
                </div>

                {/* SECCIÓN 1: CLASES ON-DEMAND */}
                <section className="mb-24">
                    <div className="flex items-center gap-4 mb-8">
                        <h2 className="text-3xl font-bold text-white">Clases On-Demand</h2>
                        <div className="h-px bg-white/10 flex-1"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {RESOURCES.on_demand.map((item) => (
                            <div key={item.id} className="group relative bg-[#0f172a] rounded-3xl overflow-hidden border border-white/5 hover:border-indigo-500/50 transition-all hover:shadow-2xl hover:shadow-indigo-500/10 flex flex-col">
                                {/* Imagen */}
                                <div className="h-48 overflow-hidden relative bg-[#1e293b]">
                                    <div className="absolute inset-0 bg-indigo-900/10 group-hover:bg-transparent transition-colors z-10" />
                                    <ImageWithFallback
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 z-20">
                                        <span className="text-emerald-400 font-bold text-sm tracking-wide">{item.price}</span>
                                    </div>
                                </div>

                                {/* Contenido */}
                                <div className="p-6 flex-1 flex flex-col">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-xl font-bold text-white">{item.title}</h3>
                                        {item.tag && (
                                            <span className="bg-amber-500/20 text-amber-400 text-xs font-bold px-2 py-1 rounded uppercase tracking-wider">{item.tag}</span>
                                        )}
                                    </div>
                                    <p className="text-slate-400 text-sm mb-4 line-clamp-2">{item.description}</p>

                                    {/* Features */}
                                    <ul className="mb-6 space-y-2">
                                        {item.features?.map((f, i) => (
                                            <li key={i} className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                                                <FaCheck className="text-indigo-500" /> {f}
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="mt-auto">
                                        <a href={item.buyLink} className="flex items-center justify-center gap-2 w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold transition-all hover:scale-[1.02] shadow-lg shadow-indigo-600/20">
                                            <FaShoppingCart /> Comprar Pack
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* SECCIÓN 2: KIT DEL ESTUDIANTE (AFILIADOS) */}
                <section>
                    <div className="flex items-center gap-4 mb-4">
                        <h2 className="text-3xl font-bold text-white">Lo que recomendamos para la U</h2>
                        <div className="h-px bg-white/10 flex-1"></div>
                    </div>

                    <div className="mb-8 p-4 bg-indigo-900/20 border border-indigo-500/20 rounded-xl max-w-2xl">
                        <p className="text-indigo-300 text-sm flex items-center gap-2">
                            <FaCheck className="shrink-0" />
                            Estos son los equipos que usamos y recomendamos en el Instituto. No es publicidad, ¡es lo que funciona!
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {RESOURCES.affiliates.map((item) => (
                            <a
                                href={item.affiliateLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                key={item.id}
                                className="group bg-[#0f172a] rounded-2xl p-4 border border-white/5 hover:border-amber-500/30 transition-all hover:-translate-y-1 block"
                            >
                                <div className="aspect-square rounded-xl overflow-hidden bg-white/5 mb-4 relative">
                                    <ImageWithFallback src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                </div>
                                <div className="text-xs text-amber-500 uppercase font-bold mb-1 tracking-wider">{item.store}</div>
                                <h3 className="text-white font-bold leading-tight mb-2 group-hover:text-amber-400 transition-colors">{item.title}</h3>
                                <p className="text-slate-500 text-xs mb-4 line-clamp-2">{item.description}</p>
                                <div className="flex items-center justify-between border-t border-white/5 pt-3">
                                    <span className="text-white font-bold text-sm">Ver Precio</span>
                                    <FaExternalLinkAlt className="text-slate-500 text-xs" />
                                </div>
                            </a>
                        ))}
                    </div>
                </section>

            </div>
        </div>
    );
}
