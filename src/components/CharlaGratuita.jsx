import React from 'react';
import { motion } from 'framer-motion';

export default function CharlaGratuita() {
  return (
    <section className="w-full py-24 lg:py-32 bg-lael-primary flex flex-col items-center px-6">
      <div className="w-full max-w-4xl relative">
        {/* Glow behind the card */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-lael-accent/[0.05] rounded-3xl blur-[80px] pointer-events-none" />
        
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative bg-lael-secondary rounded-3xl border border-lael-bd p-8 lg:p-16 overflow-hidden cinematic-shadow text-center"
        >
          {/* Subtle background pattern or color */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-lael-accent via-lael-rust to-lael-accent" />

          <p className="text-lael-rust text-[10px] tracking-[0.25em] uppercase mb-4 font-bold">
            Área de Apoyo y Orientación Psicológica
          </p>
          
          <h2 className="font-display text-5xl lg:text-7xl text-lael-light font-bold mb-6">
            Charla Gratuita
          </h2>

          <h3 className="font-display text-2xl lg:text-4xl italic text-lael-muted mb-12">
            "Cómo sobrevivir emocionalmente a la PAES"
          </h3>

          <div className="flex flex-col md:flex-row justify-center items-center gap-8 mb-12">
            <div className="flex flex-col items-center">
              <span className="text-[10px] tracking-[0.2em] uppercase text-lael-muted/50 mb-1">Fecha</span>
              <span className="font-medium text-lael-light">09 de Junio</span>
            </div>
            <div className="w-px h-8 bg-lael-bd hidden md:block" />
            <div className="flex flex-col items-center">
              <span className="text-[10px] tracking-[0.2em] uppercase text-lael-muted/50 mb-1">Hora</span>
              <span className="font-medium text-lael-light">18:00 P.M</span>
            </div>
            <div className="w-px h-8 bg-lael-bd hidden md:block" />
            <div className="flex flex-col items-center">
              <span className="text-[10px] tracking-[0.2em] uppercase text-lael-muted/50 mb-1">Plataforma</span>
              <span className="font-medium text-lael-light">Google Meet</span>
            </div>
            <div className="w-px h-8 bg-lael-bd hidden md:block" />
            <div className="flex flex-col items-center">
              <span className="text-[10px] tracking-[0.2em] uppercase text-lael-muted/50 mb-1">Expone</span>
              <span className="font-medium text-lael-light">Tiare Pozo (Psicóloga)</span>
            </div>
          </div>

          <a 
            href="https://wa.me/56964626568?text=Hola,%20me%20gustar%C3%ADa%20inscribirme%20a%20la%20charla%20gratuita%20de%20apoyo%20psicol%C3%B3gico."
            target="_blank"
            rel="noreferrer"
            className="inline-block bg-lael-accent text-white px-10 py-4 rounded-lg text-[11px] tracking-[0.2em] uppercase font-bold hover:bg-lael-rust transition-all duration-300 shadow-[0_4px_20px_rgba(196,151,62,0.3)] hover:shadow-[0_4px_30px_rgba(184,92,56,0.4)] hover:-translate-y-1"
          >
            Inscribirme Gratis
          </a>
        </motion.div>
      </div>
    </section>
  );
}
