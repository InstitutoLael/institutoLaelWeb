import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Zap, Target, BarChart3, RotateCcw, ArrowRight } from 'lucide-react';

const ease = [0.16, 1, 0.3, 1];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 1, delay, ease }
});

const COMPONENTS = [
  {
    id: 'diagnostico',
    label: 'Diagnóstico',
    desc: 'No comenzamos sin saber dónde estás. Identificamos brechas académicas, bloqueos mentales y potencial real.',
    icon: <Target className="text-lael-accent" size={32} />
  },
  {
    id: 'estrategia',
    label: 'Estrategia',
    desc: 'Diseñamos tu ruta táctica. Qué módulos priorizar, cómo gestionar tu tiempo y qué palancas mover para subir el rendimiento.',
    icon: <Zap className="text-lael-accent" size={32} />
  },
  {
    id: 'activacion',
    label: 'Activación',
    desc: 'Entrenamiento puro. Clases en vivo, simulacros bajo presión y mentoría directa. Aquí es donde sucede el cambio.',
    icon: <BarChart3 className="text-lael-accent" size={32} />
  },
  {
    id: 'feedback',
    label: 'Feedback',
    desc: 'Mejora continua. Analizamos cada resultado para recalibrar la estrategia. El sistema aprende de ti.',
    icon: <RotateCcw className="text-lael-accent" size={32} />
  }
];

export default function SistemaLael() {
  return (
    <div className="bg-lael-primary min-h-screen pt-20">
      <Helmet>
        <title>El Sistema Lael | Rendimiento Educativo de Alto Nivel</title>
        <meta name="description" content="No enseñamos contenido, optimizamos rendimiento. Conoce el sistema de 4 pilares de Instituto Lael: Diagnóstico, Estrategia, Activación y Feedback." />
      </Helmet>

      {/* Hero Section */}
      <section className="px-6 py-24 lg:py-32 flex flex-col items-center text-center overflow-hidden">
        <motion.div {...fadeUp()} className="max-w-4xl relative z-10">
          <p className="text-lael-accent text-[10px] tracking-[0.4em] uppercase mb-8 font-bold">Arquitectura Educativa</p>
          <h1 className="font-display text-5xl lg:text-7xl text-lael-light mb-8 leading-tight">
            El Sistema <span className="text-lael-accent italic italic-playfair">Lael</span>
          </h1>
          <h2 className="font-display text-2xl lg:text-3xl text-lael-muted mb-12 max-w-2xl mx-auto">
            No enseñamos contenido.<br/>Optimizamos rendimiento.
          </h2>
          <div className="w-16 h-[1px] bg-lael-bd mx-auto mb-12" />
          <p className="text-lael-muted text-lg leading-relaxed max-w-2xl mx-auto">
            La mayoría de las instituciones te entregan información. Nosotros te entregamos un sistema de ejecución diseñado para que esa información se convierta en resultados medibles.
          </p>
        </motion.div>
      </section>

      {/* Pillars Section */}
      <section className="px-6 py-24 bg-lael-secondary border-y border-lael-bd">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {COMPONENTS.map((item, i) => (
              <motion.div key={item.id} {...fadeUp(i * 0.1)} className="p-8 bg-lael-primary rounded-2xl border border-lael-bd cinematic-shadow group hover:border-lael-accent transition-all duration-500">
                <div className="mb-6 group-hover:scale-110 transition-transform duration-500">
                  {item.icon}
                </div>
                <h3 className="text-lael-light font-bold mb-4 text-xl tracking-wide">{item.label}</h3>
                <p className="text-lael-muted text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Flow */}
      <section className="px-6 py-32 lg:py-48">
        <div className="max-w-4xl mx-auto">
           <motion.div {...fadeUp()} className="space-y-24">
              <div className="flex flex-col lg:flex-row gap-12 items-start">
                 <div className="w-12 h-12 bg-lael-accent text-white rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">1</div>
                 <div>
                    <h3 className="font-display text-3xl text-lael-light mb-6">Diagnóstico de Precisión</h3>
                    <p className="text-lael-muted leading-relaxed">
                       Antes de la primera clase, evaluamos no solo lo que sabes, sino cómo procesas la información. Usamos data para identificar dónde está el cuello de botella que impide tu crecimiento.
                    </p>
                 </div>
              </div>
              <div className="flex flex-col lg:flex-row gap-12 items-start">
                 <div className="w-12 h-12 bg-lael-accent text-white rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">2</div>
                 <div>
                    <h3 className="font-display text-3xl text-lael-light mb-6">Activación del Potencial</h3>
                    <p className="text-lael-muted leading-relaxed">
                       Las clases no son conferencias pasivas. Son sesiones de entrenamiento. Aplicamos el modelo de "Dificultad Deseable" para que el cerebro trabaje al máximo nivel de retención.
                    </p>
                 </div>
              </div>
           </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-lael-accent py-24 px-6 flex flex-col items-center text-center">
         <motion.h2 {...fadeUp()} className="font-display text-4xl lg:text-5xl text-white font-bold mb-10 max-w-3xl">
            ¿Listo para dejar de estudiar y empezar a rendir?
         </motion.h2>
         <motion.button {...fadeUp(0.2)} className="bg-white text-lael-accent px-12 py-6 rounded-xl text-xs tracking-[0.2em] uppercase font-bold hover:shadow-2xl transition-all duration-500 flex items-center gap-3">
            Solicitar Evaluación Inicial <ArrowRight size={16} />
         </motion.button>
      </section>
    </div>
  );
}
