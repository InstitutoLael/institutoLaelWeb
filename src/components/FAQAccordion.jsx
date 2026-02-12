import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle, Plus, Minus } from "lucide-react";

export default function FAQAccordion({ items, title = "Preguntas Frecuentes", subtitle = "Todo lo que necesitas saber." }) {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-slate-950/80 border-t border-white/5 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-3xl relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-indigo-400 text-[10px] font-black uppercase tracking-widest mb-6">
            <HelpCircle size={14} />
            <span>Centro de Ayuda</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4">
            {title}
          </h2>
          <p className="text-slate-400 font-light text-lg">{subtitle}</p>
        </div>

        <div className="space-y-4">
          {items.map((item, i) => (
            <div
              key={i}
              className={`group border rounded-[2rem] transition-all duration-300 ${
                activeIndex === i
                  ? "bg-white/5 border-indigo-500/30 shadow-lg shadow-indigo-500/5"
                  : "bg-transparent border-white/5 hover:border-white/10 hover:bg-white/[0.02]"
              }`}
            >
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-center justify-between p-6 md:p-8 text-left select-none outline-none"
                aria-expanded={activeIndex === i}
              >
                <span className={`text-lg md:text-xl font-bold uppercase tracking-tight transition-colors ${activeIndex === i ? 'text-white' : 'text-slate-300 group-hover:text-white'}`}>
                  {item.q || item.question}
                </span>
                <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 ${activeIndex === i ? 'bg-indigo-500 border-indigo-500 text-white rotate-180' : 'border-white/10 text-slate-500 group-hover:border-white/30'}`}>
                  <ChevronDown size={18} />
                </div>
              </button>
              
              <AnimatePresence>
                {activeIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 md:px-8 pb-8 pt-0">
                      <div className="h-px w-full bg-white/5 mb-6" />
                      <p className="text-slate-400 leading-relaxed font-light text-base md:text-lg">
                        {item.a || item.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
