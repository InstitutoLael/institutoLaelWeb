import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

// Bloque de cierre claro: tarjeta navy sobre fondo gris (mismo estilo que /calculadora).
export default function CTASection({ title, subtitle, btnText = "Postula ahora", btnLink = "/diagnostico" }) {
  return (
    <section className="px-5 sm:px-6 py-16 sm:py-20 lg:py-28 bg-[#F4F4F4]">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-3xl mx-auto rounded-[32px] bg-[#071D49] text-white text-center p-8 sm:p-12 lg:p-16 shadow-lael"
      >
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight leading-[1.05] mb-4">
          {title || "¿Partimos?"}
        </h2>
        <p className="text-white/75 text-base sm:text-lg leading-relaxed mb-8 max-w-xl mx-auto">
          {subtitle || "Escríbenos y vemos juntos por dónde empezar."}
        </p>
        <Link
          to={btnLink}
          className="min-h-[48px] w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#D7E400] text-[#071D49] hover:bg-white font-display font-extrabold text-xs sm:text-sm uppercase tracking-wider px-8 py-4 rounded-2xl transition-all duration-300 active:scale-95"
        >
          {btnText} <ArrowRight size={16} />
        </Link>
      </motion.div>
    </section>
  );
}
