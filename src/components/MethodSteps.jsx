import React from 'react';
import { motion } from 'framer-motion';

export default function MethodSteps({ steps }) {
  return (
    <section className="py-32 bg-lael-primary relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-lael-accent/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">El Sistema Lael</h2>
          <p className="text-lael-muted max-w-2xl mx-auto text-lg">Un proceso lineal diseñado con precisión de ingeniería para garantizar el dominio del contenido bajo presión.</p>
        </div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-lael-accent/20 to-transparent -translate-x-1/2" />

          {steps.map((step, idx) => (
            <motion.div 
              key={idx}
              className={`relative flex items-center mb-24 last:mb-0 ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {/* Timeline Dot */}
              <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-lael-accent shadow-[0_0_15px_rgba(198,166,107,0.5)] -translate-x-1/2" />
              
              {/* Content Box */}
              <div className={`ml-12 md:ml-0 md:w-1/2 ${idx % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16 md:text-left'}`}>
                <span className="text-lael-accent font-medium tracking-widest uppercase text-sm mb-2 block">Fase {idx + 1}</span>
                <h3 className="text-3xl font-display font-semibold mb-4 text-lael-light">{step.title}</h3>
                <p className="text-lael-muted text-lg leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
