import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import MethodSteps from '../components/MethodSteps';
import CTASection from '../components/CTASection';
import { metodoData } from '../data/metodo';

export default function MetodoLael() {
  return (
    <>
      <Helmet>
        <title>El Método Lael | Arquitectura de Rendimiento</title>
        <meta name="description" content="Conoce la ingeniería detrás del Sistema Lael. Un método comprobado para dominar cualquier área académica." />
      </Helmet>

      <section className="relative pt-32 pb-16 bg-lael-primary overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight mb-8">
              Arquitectura del <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-lael-accent to-lael-light">
                Rendimiento
              </span>
            </h1>
            <p className="text-xl text-lael-muted leading-relaxed">
              {metodoData.hero.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      <MethodSteps steps={metodoData.pillars} />

      <CTASection 
        title="Experimenta la Diferencia"
        subtitle="Entra a un ecosistema diseñado para quienes no se conforman con el promedio."
        btnText="Comenzar ahora"
      />
    </>
  );
}
