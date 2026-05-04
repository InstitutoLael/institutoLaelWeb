import React from 'react';
import { motion } from 'framer-motion';
import Button from './ui/Button';

export default function CTASection({ title, subtitle, btnText = "Postula ahora", btnLink = "/postulacion" }) {
  return (
    <section className="py-32 bg-lael-primary relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-lael-secondary to-lael-primary z-0" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-1/2 bg-lael-accent/10 blur-[100px] z-0 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="border border-white/5 bg-white/[0.01] backdrop-blur-md rounded-3xl p-12 md:p-20 shadow-cinematic-shadow relative overflow-hidden"
        >
          {/* Subtle inner top glow */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-lael-accent/30 to-transparent" />

          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 text-lael-light">{title || "Comienza tu proceso hoy"}</h2>
          <p className="text-xl text-lael-muted mb-10 max-w-2xl mx-auto">
            {subtitle || "No aceptamos a cualquiera, buscamos a quienes están dispuestos a seguir el sistema y obtener resultados reales."}
          </p>
          
          <Button size="lg" variant="primary" to={btnLink} className="w-full sm:w-auto">
            {btnText}
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
