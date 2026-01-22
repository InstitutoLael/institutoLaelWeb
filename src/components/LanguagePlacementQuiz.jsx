import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGraduationCap, FaPaperPlane, FaUndo, FaArrowRight, FaGlobeAmericas } from "react-icons/fa";

const QUESTIONS = [
    {
        id: 1,
        title: "¿Cuál es tu objetivo principal?",
        options: [
            { id: "travel", label: "Viajes y Vacaciones", icon: "✈️" },
            { id: "work", label: "Trabajo y Negocios", icon: "💼" },
            { id: "study", label: "Estudios Académicos", icon: "🎓" },
            { id: "hobby", label: "Cultura y Hobby", icon: "🎨" },
        ]
    },
    {
        id: 2,
        title: "¿Cuánto tiempo puedes dedicar al día?",
        options: [
            { id: "casual", label: "15 min (Casual)", icon: "☕" },
            { id: "regular", label: "30 min (Regular)", icon: "🏃" },
            { id: "serious", label: "1 hora (Serio)", icon: "🔥" },
            { id: "intense", label: "+2 horas (Intenso)", icon: "🧠" },
        ]
    },
    {
        id: 3,
        title: "¿Cuál es tu nivel actual percibido?",
        options: [
            { id: "none", label: "Desde Cero", icon: "🐣", level: "A1" },
            { id: "basic", label: "Sé lo básico", icon: "🚲", level: "A2" },
            { id: "medium", label: "Puedo conversar", icon: "🚗", level: "B1" },
            { id: "high", label: "Fluidez moderada", icon: "🚀", level: "B2/C1" },
        ]
    }
];

export default function LanguagePlacementQuiz() {
    const [step, setStep] = useState(0); // 0 = intro, 1-3 = questions, 4 = result
    const [answers, setAnswers] = useState({});

    const handleNext = (optId, level) => {
        const newAnswers = { ...answers, [step]: optId };
        if (level) newAnswers.targetLevel = level;
        setAnswers(newAnswers);
        setStep(step + 1);
    };

    const reset = () => {
        setStep(0);
        setAnswers({});
    };

    return (
        <div className="bg-[#0f172a] border border-emerald-500/20 rounded-[3rem] p-8 md:p-12 shadow-2xl relative overflow-hidden min-h-[500px] flex flex-col justify-center">

            {/* Duolingo-style Progress Bar */}
            {step > 0 && step <= QUESTIONS.length && (
                <div className="absolute top-0 left-0 w-full h-3 bg-white/5">
                    <motion.div
                        className="h-full bg-emerald-500 rounded-r-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${(step / QUESTIONS.length) * 100}%` }}
                        transition={{ duration: 0.5 }}
                    />
                </div>
            )}

            <AnimatePresence mode="wait">

                {/* STEP 0: INTRO */}
                {step === 0 && (
                    <motion.div
                        key="intro"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="text-center"
                    >
                        <div className="w-20 h-20 bg-emerald-500/20 rounded-3xl flex items-center justify-center text-emerald-500 text-4xl mx-auto mb-8 animate-bounce">
                            <FaGlobeAmericas />
                        </div>
                        <h3 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tighter uppercase">¿Cuál es tu Plan Ideal?</h3>
                        <p className="text-slate-400 mb-10 max-w-sm mx-auto">Responde 3 preguntas rápidas y descubre qué curso se adapta mejor a tu ritmo.</p>
                        <button
                            onClick={() => setStep(1)}
                            className="px-10 py-5 bg-emerald-500 text-slate-950 font-black rounded-2xl hover:scale-[1.05] transition-all flex items-center justify-center gap-3 mx-auto"
                        >
                            Comenzar Test <FaArrowRight />
                        </button>
                    </motion.div>
                )}

                {/* QUESTIONS */}
                {step > 0 && step <= QUESTIONS.length && (
                    <motion.div
                        key={`q-${step}`}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        className="text-center"
                    >
                        <h3 className="text-2xl md:text-3xl font-black text-white mb-10 uppercase tracking-tighter">
                            {QUESTIONS[step - 1].title}
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
                            {QUESTIONS[step - 1].options.map((opt) => (
                                <button
                                    key={opt.id}
                                    onClick={() => handleNext(opt.id, opt.level)}
                                    className="p-6 bg-slate-900 border border-white/5 rounded-2xl flex items-center gap-5 hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all group"
                                >
                                    <span className="text-3xl grayscale group-hover:grayscale-0 transition-all">{opt.icon}</span>
                                    <span className="text-white font-bold text-lg">{opt.label}</span>
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* RESULT */}
                {step > QUESTIONS.length && (
                    <motion.div
                        key="result"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center"
                    >
                        <div className="inline-block bg-emerald-500 text-slate-950 px-6 py-2 rounded-full font-black text-xs uppercase tracking-widest mb-6">
                            Recomendación Lael
                        </div>
                        <h3 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tighter uppercase">
                            Plan <span className="text-emerald-400">{(answers.targetLevel === 'A1' || answers.targetLevel === 'A2') ? 'Iniciación' : 'Intermedio'}</span>
                        </h3>
                        <p className="text-slate-400 mb-10 max-w-md mx-auto leading-relaxed">
                            Basado en tus respuestas, te recomendamos el nivel <strong className="text-white">{answers.targetLevel || 'A1'}</strong>. Es el balance perfecto para tus metas de {answers[1]}.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <button className="px-8 py-5 bg-emerald-500 text-slate-950 font-black rounded-2xl hover:scale-105 transition-all flex items-center gap-3">
                                Inscribir este Plan <FaPaperPlane />
                            </button>
                            <button
                                onClick={reset}
                                className="px-8 py-5 bg-white/5 border border-white/10 text-white font-bold rounded-2xl hover:bg-white/10 transition-all flex items-center gap-2"
                            >
                                <FaUndo /> Repetir
                            </button>
                        </div>
                    </motion.div>
                )}

            </AnimatePresence>
        </div>
    );
}
