import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Target } from 'lucide-react';
import MethodSteps from '../components/MethodSteps';
import CTASection from '../components/CTASection';
import { metodoData } from '../data/metodo';

const ease = [0.16, 1, 0.3, 1];
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 1, delay, ease }
});

export default function MetodoLael() {
  return (
    <>
      <Helmet>
        <title>El Método Lael | Arquitectura de Rendimiento</title>
        <meta name="description" content="Conoce la ingeniería detrás del Sistema Lael. Un método comprobado para dominar cualquier área académica." />
      </Helmet>

      <section className="relative pt-32 pb-24 bg-lael-primary overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <motion.p {...fadeUp()} className="text-lael-accent text-[10px] tracking-[0.4em] uppercase mb-4 font-bold">La Ciencia del Éxito</motion.p>
          <motion.h1 {...fadeUp(0.1)} className="text-5xl md:text-8xl font-display font-bold leading-tight mb-8 text-lael-light">
            Arquitectura del <br />
            <span className="text-lael-accent italic italic-playfair">Rendimiento</span>
          </motion.h1>
          <motion.p {...fadeUp(0.2)} className="text-xl text-lael-muted leading-relaxed max-w-2xl mx-auto">
            El 95% de los preuniversitarios fallan porque son fábricas de contenido. Nosotros somos una ingeniería de resultados.
          </motion.p>
        </div>
      </section>

      {/* 1. LO QUE NO FUNCIONA */}
      <section className="py-24 bg-lael-secondary border-y border-lael-bd">
        <div className="max-w-6xl mx-auto px-6">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <motion.div {...fadeUp()}>
                 <h2 className="font-display text-4xl text-lael-rust mb-8">El Error Tradicional.</h2>
                 <p className="text-lael-muted leading-relaxed mb-10">
                    La mayoría de las personas creen que para mejorar necesitan "más materia". Se inscriben en cursos con miles de videos y clases grabadas. Esto solo genera <strong>infoxicación</strong>.
                 </p>
                 <ul className="space-y-6">
                    {[
                      "Clases magistrales pasivas (donde solo escuchas).",
                      "Ensayos sin retroalimentación inmediata.",
                      "Estudio basado en memorización lineal.",
                      "Falta de medición de fatiga cognitiva."
                    ].map((t, i) => (
                      <li key={i} className="flex gap-4 text-sm text-lael-muted/60">
                         <div className="w-5 h-5 rounded-full bg-lael-rust/20 flex items-center justify-center text-lael-rust flex-shrink-0">✕</div>
                         {t}
                      </li>
                    ))}
                 </ul>
              </motion.div>
              <motion.div {...fadeUp(0.2)} className="p-12 bg-lael-primary rounded-[40px] border border-lael-bd cinematic-shadow">
                 <p className="text-lael-rust text-[10px] tracking-[0.3em] uppercase mb-6 font-bold">Resultado de esto:</p>
                 <p className="text-2xl text-lael-light italic">"Estudias 8 horas y el puntaje sigue estancado. Te sientes cansado, pero no más inteligente."</p>
              </motion.div>
           </div>
        </div>
      </section>

      {/* 2. LO QUE SÍ FUNCIONA */}
      <section className="py-32">
        <div className="max-w-6xl mx-auto px-6">
           <div className="text-center mb-24">
              <h2 className="font-display text-5xl text-lael-light mb-6">La Solución Táctica.</h2>
              <p className="text-lael-muted max-w-xl mx-auto">No estudiamos más. Estudiamos mejor bajo los parámetros de la neurociencia aplicada.</p>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                { t: "Estudio Espaciado", d: "Optimizamos la retención a largo plazo mediante algoritmos de repetición." },
                { t: "Entrenamiento Activo", d: "El cerebro solo aprende cuando resuelve. El 80% de Lael es acción." },
                { t: "Gestión de Variables", d: "Medimos ansiedad, tiempo y precisión para crear un perfil invencible." }
              ].map((item, i) => (
                <motion.div key={i} {...fadeUp(i * 0.1)} className="space-y-4">
                   <div className="text-lael-accent font-display text-4xl">0{i+1}</div>
                   <h3 className="text-lael-light font-bold text-xl uppercase tracking-widest">{item.t}</h3>
                   <p className="text-lael-muted text-sm leading-relaxed">{item.d}</p>
                </motion.div>
              ))}
           </div>
        </div>
      </section>

      {/* 3. CÓMO LO HACEMOS (EJECUCIÓN) */}
      <section className="py-32 bg-lael-accent/5">
        <div className="max-w-6xl mx-auto px-6">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
              <motion.div {...fadeUp()}>
                 <p className="text-lael-accent text-[10px] tracking-[0.4em] uppercase mb-4 font-bold">La Ejecución</p>
                 <h2 className="font-display text-4xl lg:text-6xl text-lael-light mb-10">Tu Ruta Táctica.</h2>
                 <div className="space-y-10">
                    {[
                      { t: "Fase 1: El Espejo", d: "Diagnóstico profundo para encontrar tus brechas ciegas." },
                      { t: "Fase 2: Arquitectura", d: "Diseño de tu plan de entrenamiento semanal personalizado." },
                      { t: "Fase 3: El Fuego", d: "Simulaciones de presión real con mentor asignado." }
                    ].map((f, i) => (
                      <div key={i} className="flex gap-6">
                         <div className="w-12 h-12 bg-lael-accent text-white flex items-center justify-center rounded-2xl font-bold flex-shrink-0">{i+1}</div>
                         <div>
                            <h4 className="text-lael-light font-bold mb-2">{f.t}</h4>
                            <p className="text-lael-muted text-sm leading-relaxed">{f.d}</p>
                         </div>
                      </div>
                    ))}
                 </div>
              </motion.div>
              <motion.div {...fadeUp(0.2)} className="relative group">
                 <div className="absolute inset-0 bg-lael-accent/20 rounded-[40px] blur-3xl group-hover:bg-lael-accent/30 transition-all duration-700" />
                 <div className="relative bg-lael-secondary border border-lael-bd p-1 rounded-[40px]">
                    <div className="p-12 rounded-[38px] bg-lael-primary flex items-center justify-center aspect-square">
                       <Target size={120} className="text-lael-accent/20" />
                    </div>
                 </div>
              </motion.div>
           </div>
        </div>
      </section>

      {/* 4. EVIDENCIA */}
      <section className="py-32 bg-lael-primary">
         <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="font-display text-4xl text-lael-light mb-12">No es una opinión. <br/> Es evidencia.</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
               <div className="p-8 bg-lael-secondary rounded-2xl border border-lael-bd">
                  <p className="text-emerald-400 font-bold text-3xl mb-2">+240 pts</p>
                  <p className="text-lael-muted text-sm">Mejora promedio en estudiantes que completan 6 meses de Arquitectura Lael.</p>
               </div>
               <div className="p-8 bg-lael-secondary rounded-2xl border border-lael-bd">
                  <p className="text-emerald-400 font-bold text-3xl mb-2">98.2%</p>
                  <p className="text-lael-muted text-sm">Tasa de precisión en nuestro motor de diagnóstico táctico.</p>
               </div>
            </div>
         </div>
      </section>

      <CTASection 
        title="Diseña tu éxito."
        subtitle="Empieza con el diagnóstico gratuito y deja de estudiar a ciegas."
        btnText="Iniciar Diagnóstico"
      />
    </>
  );
}
