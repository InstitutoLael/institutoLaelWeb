import { motion } from "framer-motion";
import { FaFlagCheckered, FaMapMarkerAlt } from "react-icons/fa";

export default function VisualRoadmap({ steps, title, color = "indigo" }) {
    const colorMap = {
        indigo: "bg-indigo-500 border-indigo-500/50 text-indigo-400",
        amber: "bg-amber-500 border-amber-500/50 text-amber-500",
        emerald: "bg-emerald-500 border-emerald-500/50 text-emerald-400",
        purple: "bg-purple-500 border-purple-500/50 text-purple-400"
    };

    const selectedColor = colorMap[color] || colorMap.indigo;

    return (
        <div className="py-12">
            <div className="text-center mb-16">
                <h3 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tighter mb-2">{title}</h3>
                <p className="text-slate-500 text-xs font-bold uppercase tracking-[0.3em]">Tu camino hacia la maestría</p>
            </div>

            <div className="relative max-w-5xl mx-auto px-6">
                {/* Connecting Line */}
                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white/5 -translate-y-1/2 hidden md:block"></div>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-8 lg:gap-12 relative z-10">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="relative flex flex-col items-center text-center group"
                        >
                            {/* Node Icon */}
                            <div className={`w-14 h-14 rounded-2xl ${selectedColor} bg-opacity-10 border flex items-center justify-center text-xl mb-6 shadow-2xl group-hover:scale-110 transition-transform duration-500`}>
                                {step.icon || <FaMapMarkerAlt />}
                            </div>

                            {/* Connector for Mobile */}
                            {index < steps.length - 1 && (
                                <div className="w-px h-8 bg-white/10 md:hidden mb-6"></div>
                            )}

                            <h4 className="text-white font-black text-sm uppercase tracking-widest mb-3">{step.title}</h4>
                            <p className="text-slate-500 text-xs leading-relaxed max-w-[180px]">{step.desc}</p>

                            {/* Percentage / Badge */}
                            <div className="mt-4 px-3 py-1 bg-white/5 rounded-full text-[10px] font-black uppercase text-slate-400 border border-white/5">
                                {step.subinfo}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Final Goal Decoration */}
                <div className="absolute -right-4 top-1/2 -translate-y-1/2 opacity-10 hidden lg:block">
                    <FaFlagCheckered size={120} className="text-white" />
                </div>
            </div>
        </div>
    );
}
