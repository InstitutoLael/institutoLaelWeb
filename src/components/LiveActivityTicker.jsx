import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaUserCircle } from "react-icons/fa";

const ACTIVITIES = [
    "3 alumnos repasando Química ahora",
    "Nuevos cupos disponibles para Inglés B1",
    "Fernando acaba de agendar tutoría PAES",
    "8 personas viendo el Plan para Empresas",
    "Matrícula 2026: 85% de avance en Bio-Bío",
    "Marta aprobó su examen de LSCh Nivel 1",
    "5 empresas consultando por ROI 2.0",
    "¡Nueva frase motivacional disponible!",
];

export default function LiveActivityTicker() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % ACTIVITIES.length);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="h-10 flex items-center justify-center overflow-hidden">
            <AnimatePresence mode="wait">
                <motion.div
                    key={index}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center gap-3 text-indigo-400 text-xs font-bold uppercase tracking-widest"
                >
                    <div className="relative">
                        <FaUserCircle className="text-lg opacity-80" />
                        <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-slate-950 animate-pulse"></div>
                    </div>
                    <span>{ACTIVITIES[index]}</span>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
