import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, Check, ShieldCheck, Share2, Download } from 'lucide-react';

const ease = [0.16, 1, 0.3, 1];
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.9, delay, ease },
});

export default function CertificateSection({ defaultLevel = "B2", defaultLanguage = "Inglés Estratégico Pro" }) {
  const [selectedLevel, setSelectedLevel] = useState(defaultLevel);
  const levels = ["A1", "A2", "B1", "B2"];

  return (
    <section className="py-28 px-6 bg-white flex flex-col items-center border-t border-[#071D49]/5">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* Left Column: Info */}
        <div className="lg:col-span-6 flex flex-col text-left">
          <motion.div {...fadeUp(0)} className="inline-flex items-center gap-2 mb-6 bg-[#D7E400]/20 text-[#071D49] px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase w-fit">
            <Award size={12} className="text-[#071D49]" />
            <span>CERTIFICACIÓN DE NIVEL</span>
          </motion.div>

          <motion.h2 {...fadeUp(0.1)} className="font-display text-3xl sm:text-5xl text-[#071D49] font-extrabold tracking-[-0.03em] uppercase mb-6 leading-[1.05]">
            Valida tus Logros Académicos
          </motion.h2>

          <motion.p {...fadeUp(0.2)} className="text-[#8D8D8D] text-base sm:text-lg mb-8 leading-relaxed max-w-xl">
            Al finalizar y aprobar cada nivel de tu programa, recibirás un certificado institucional verificable que acredita tus competencias comunicativas, alineado a los estándares internacionales del Marco Común Europeo (MCER).
          </motion.p>

          {/* Level Selector Buttons */}
          <motion.div {...fadeUp(0.25)} className="flex gap-2 mb-8">
            {levels.map((lvl) => (
              <button
                key={lvl}
                onClick={() => setSelectedLevel(lvl)}
                className={`w-12 h-12 rounded-xl font-bold transition-all duration-300 ${
                  selectedLevel === lvl
                    ? 'bg-[#071D49] text-white shadow-lg'
                    : 'bg-[#F4F4F4] text-[#071D49] hover:bg-[#071D49]/10'
                }`}
              >
                {lvl}
              </button>
            ))}
          </motion.div>

          {/* Benefits List */}
          <div className="space-y-4 mb-8 max-w-xl">
            {[
              { title: "Alineación con MCER", desc: "Cumple rigurosamente con las competencias del Marco Común Europeo.", icon: <ShieldCheck size={18} className="text-[#071D49]" /> },
              { title: "Verificable en Línea", desc: "Cada certificado cuenta con un código único de autenticidad para reclutadores.", icon: <Check size={18} className="text-[#071D49]" /> },
              { title: "Listo para LinkedIn & CV", desc: "Añade tu credencial digital con un solo clic a tu perfil profesional.", icon: <Share2 size={18} className="text-[#071D49]" /> },
            ].map((benefit, i) => (
              <motion.div key={benefit.title} {...fadeUp(0.3 + i * 0.05)} className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-[#F4F4F4] flex items-center justify-center flex-shrink-0 mt-0.5">
                  {benefit.icon}
                </div>
                <div>
                  <h4 className="text-[#071D49] font-bold text-sm uppercase tracking-wide">{benefit.title}</h4>
                  <p className="text-[#8D8D8D] text-xs mt-1 leading-relaxed">{benefit.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Column: Visual Mockup */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease }}
          className="lg:col-span-6 flex flex-col items-center justify-center"
        >
          {/* Mockup Frame */}
          <div className="w-full max-w-[500px] aspect-[1.414/1] bg-[#FCFAF2] border-[12px] border-[#071D49] p-6 shadow-2xl relative flex flex-col justify-between overflow-hidden rounded-md text-left font-serif select-none select-none border-t border-b border-l border-r border-[#071D49]">
            {/* Delicate inner border */}
            <div className="absolute inset-2 border border-[#C6A66B]/50 pointer-events-none" />
            {/* Decorative corners */}
            <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-[#C6A66B]" />
            <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-[#C6A66B]" />
            <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-[#C6A66B]" />
            <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-[#C6A66B]" />

            {/* Header */}
            <div className="text-center mt-2 z-10 flex flex-col items-center font-sans">
              <span className="text-[10px] tracking-[0.3em] text-[#071D49] font-bold uppercase mb-1">Instituto Lael</span>
              <div className="w-8 h-px bg-[#C6A66B] my-1" />
              <h3 className="text-[#071D49] text-xs sm:text-sm font-extrabold tracking-wide uppercase">CERTIFICADO DE APROBACIÓN</h3>
            </div>

            {/* Body */}
            <div className="text-center my-4 z-10 font-sans">
              <p className="text-[8px] sm:text-[9px] italic text-[#8D8D8D]">Se otorga el presente documento a</p>
              <p className="text-base sm:text-xl font-bold text-[#071D49] border-b border-[#071D49]/10 w-fit mx-auto px-6 py-1 my-2 font-display uppercase tracking-wide">
                [Nombre del Alumno]
              </p>
              <p className="text-[8px] sm:text-[9px] leading-relaxed text-[#8D8D8D] max-w-[320px] mx-auto mt-2">
                Por haber completado y aprobado satisfactoriamente las exigencias académicas y evaluaciones del programa de
                <strong className="text-[#071D49] ml-1 font-bold">{defaultLanguage}</strong>, alcanzando el nivel de suficiencia:
              </p>
              <div className="mt-4 flex items-center justify-center">
                <span className="bg-[#071D49] text-[#D7E400] text-xs sm:text-sm font-black px-4 py-1.5 rounded-full shadow-md font-sans">
                  MCER {selectedLevel}
                </span>
              </div>
            </div>

            {/* Footer / Signatures */}
            <div className="flex justify-between items-end mt-4 px-4 z-10 font-sans">
              <div className="text-center w-24">
                <div className="border-t border-[#8D8D8D]/40 pt-1.5">
                  <p className="text-[6px] sm:text-[7px] font-black text-[#071D49] uppercase">Diego Chaparro</p>
                  <p className="text-[5px] text-[#8D8D8D] uppercase tracking-wider">Director General</p>
                </div>
              </div>

              {/* Emblem / Seal */}
              <div className="w-10 h-10 rounded-full border-2 border-[#C6A66B] flex items-center justify-center relative bg-white/40">
                <div className="w-8 h-8 rounded-full bg-[#C6A66B]/15 flex items-center justify-center">
                  <span className="text-[#C6A66B] text-[7px] font-black tracking-tighter">LAEL</span>
                </div>
              </div>

              <div className="text-center w-24">
                <div className="border-t border-[#8D8D8D]/40 pt-1.5">
                  <p className="text-[6px] sm:text-[7px] font-black text-[#071D49] uppercase">Comité Académico</p>
                  <p className="text-[5px] text-[#8D8D8D] uppercase tracking-wider">Acreditación</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex gap-4 mt-6 text-[#8D8D8D] text-xs">
            <span className="flex items-center gap-1.5 bg-[#F4F4F4] px-3 py-1.5 rounded-full border border-black/5">
              <Download size={14} />
              PDF Descargable
            </span>
            <span className="flex items-center gap-1.5 bg-[#F4F4F4] px-3 py-1.5 rounded-full border border-black/5">
              <Share2 size={14} />
              Compartir en LinkedIn
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
