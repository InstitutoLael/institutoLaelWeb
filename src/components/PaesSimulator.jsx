import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaCalculator, FaUniversity, FaTrophy, FaArrowRight } from "react-icons/fa";

export default function PaesSimulator() {
    const [nem, setNem] = useState(6.0);
    const [ranking, setRanking] = useState(6.0);
    const [goal, setGoal] = useState(850);

    // Simulated logic: Score depends on Prep + Base (NEM/Ranking approximation)
    // Converting 1.0-7.0 scale to 100-1000 range approx
    const basePoints = ((nem + ranking) / 2) * 110;
    const neededScore = Math.max(0, goal - (basePoints * 0.4)); // Simplified 40% weight to NEM/Ranking

    return (
        <div className="bg-slate-900 border border-white/10 rounded-[3rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 blur-[80px] rounded-full pointer-events-none"></div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                    <div className="flex items-center gap-3 text-amber-500 font-bold uppercase tracking-widest text-xs mb-4">
                        <FaCalculator /> Simulador de Metas
                    </div>
                    <h3 className="text-3xl md:text-5xl font-black text-white mb-6 uppercase tracking-tighter leading-none">
                        Proyecta tu <br /><span className="text-white/20">Éxito Real.</span>
                    </h3>
                    <p className="text-slate-400 mb-10 leading-relaxed font-light">
                        Ingresa tus datos actuales y tu meta. Te diremos cuánto esfuerzo necesitas para conquistar esa vacante en la U.
                    </p>

                    <div className="space-y-8">
                        {/* NEM SLIDER */}
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <label className="text-white font-bold text-sm uppercase tracking-widest">Promedio NEM</label>
                                <span className="text-amber-500 font-black text-xl">{nem.toFixed(1)}</span>
                            </div>
                            <input
                                type="range" min="4.0" max="7.0" step="0.1"
                                value={nem} onChange={(e) => setNem(parseFloat(e.target.value))}
                                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                            />
                        </div>

                        {/* RANKING SLIDER */}
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <label className="text-white font-bold text-sm uppercase tracking-widest">Ranking Estimado</label>
                                <span className="text-amber-500 font-black text-xl">{ranking.toFixed(1)}</span>
                            </div>
                            <input
                                type="range" min="4.0" max="7.0" step="0.1"
                                value={ranking} onChange={(e) => setRanking(parseFloat(e.target.value))}
                                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                            />
                        </div>

                        {/* GOAL SLIDER */}
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <label className="text-white font-bold text-sm uppercase tracking-widest">Meta de Puntaje</label>
                                <span className="text-emerald-400 font-black text-xl">{goal} pts</span>
                            </div>
                            <input
                                type="range" min="400" max="1000" step="10"
                                value={goal} onChange={(e) => setGoal(parseInt(e.target.value))}
                                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                            />
                        </div>
                    </div>
                </div>

                {/* RESULT CARD */}
                <div className="bg-slate-950/50 border border-white/5 rounded-[2.5rem] p-10 text-center relative">
                    <FaTrophy className="text-6xl text-amber-500/20 mx-auto mb-6" />
                    <h4 className="text-slate-500 font-bold uppercase tracking-widest text-xs mb-2">Puntaje PAES Requerido</h4>
                    <motion.div
                        key={neededScore}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-6xl md:text-8xl font-black text-white mb-6 tracking-tighter"
                    >
                        {Math.round(neededScore)}
                    </motion.div>

                    <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl mb-8">
                        <p className="text-emerald-400 text-sm font-bold">
                            {neededScore > 800 ? "¡Desafío Élite! Necesitas preparación intensiva." : "¡Meta alcanzable! Con estrategia lo logras."}
                        </p>
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-slate-500 border-b border-white/5 pb-2">
                            <span>Nivel de Esfuerzo</span>
                            <span className="text-white">{neededScore > 800 ? "Máximo" : "Moderado"}</span>
                        </div>
                        <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-slate-500">
                            <span>Probabilidad de Éxito Lael</span>
                            <span className="text-amber-500">92%</span>
                        </div>
                    </div>

                    <button className="w-full mt-10 py-5 bg-amber-500 text-slate-950 font-black rounded-2xl hover:scale-[1.02] transition-all flex items-center justify-center gap-3">
                        Inscribir Plan PAES <FaArrowRight />
                    </button>
                </div>
            </div>
        </div>
    );
}
