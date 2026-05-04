import React from 'react';
import { motion } from 'framer-motion';
import Button from './ui/Button';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-lael-primary pt-20">
      {/* Cinematic Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-lael-primary/80 to-lael-primary z-10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-lael-accent/5 rounded-full blur-[120px] pointer-events-none" />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, filter: 'blur(10px)', y: 30 }}
          animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <span className="inline-block py-1 px-3 rounded-full border border-lael-accent/30 bg-lael-accent/10 text-lael-accent text-sm font-medium tracking-widest uppercase mb-6">
            Sistema de Alto Rendimiento Académico
          </span>
        </motion.div>

        <motion.h1 
          className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-tight mb-8"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
        >
          No nacimos para preparar pruebas.<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-lael-light to-lael-muted">
            Nacimos para cambiar resultados.
          </span>
        </motion.h1>

        <motion.p 
          className="text-lg md:text-xl text-lael-muted max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          Si buscas algo rápido, hay muchas opciones. Si buscas dominio real, estrategia y un sistema comprobado, estás en el lugar correcto.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button size="lg" variant="primary" to="/postulacion">
            Postula ahora
          </Button>
          <Button size="lg" variant="secondary" to="/metodo">
            Descubrir el Sistema
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
