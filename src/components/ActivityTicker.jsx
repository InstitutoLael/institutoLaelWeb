import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UserCheck } from "lucide-react";

const ACTIVITIES = [
  { name: "Juan P.", action: "se inscribió en", target: "Pack PAES Full", time: "Hace 2m" },
  { name: "María F.", action: "comenzó el curso", target: "Inglés A1", time: "Hace 5m" },
  { name: "Lucas S.", action: "agendó una", target: "Asesoría Homeschool", time: "Hace 12m" },
  { name: "Valentina R.", action: "compró el", target: "Pack Intensivo", time: "Hace 15m" },
  { name: "Diego C.", action: "se unió a", target: "Club de Conversación", time: "Hace 28m" },
];

export default function ActivityTicker() {
  const [index, setIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % ACTIVITIES.length);
    }, 6000); // Change every 6 seconds

    // Initial delay to show up
    const initialDelay = setTimeout(() => setIsVisible(true), 2000);

    return () => {
      clearInterval(timer);
      clearTimeout(initialDelay);
    };
  }, []);

  const current = ACTIVITIES[index];

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-6 z-40 hidden md:block">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          className="bg-slate-900/90 backdrop-blur-md border border-white/10 p-3 rounded-2xl shadow-2xl flex items-center gap-3 pr-6 hover:bg-slate-800/90 transition-colors cursor-default select-none"
        >
          <div className="bg-emerald-500/10 p-2 rounded-full">
            <UserCheck size={16} className="text-emerald-500" />
          </div>
          <div>
             <p className="text-xs text-slate-200">
                <span className="font-bold text-white">{current.name}</span> {current.action} <span className="text-indigo-400 font-bold">{current.target}</span>
             </p>
             <p className="text-[9px] text-slate-500 font-medium uppercase tracking-widest">{current.time}</p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
