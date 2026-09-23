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
        <title>Cómo enseñamos | Instituto Lael</title>
        <meta name="description" content="Así trabajamos en Lael: clases en vivo por Google Meet, un ensayo PAES cada mes y un profe que sigue tu avance." />
      </Helmet>

      <section className="relative pt-32 pb-24 bg-lael-primary overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <motion.p {...fadeUp()} className="text-lael-accent text-[10px] tracking-[0.4em] uppercase mb-4 font-bold">Cómo trabajamos</motion.p>
          <motion.h1 {...fadeUp(0.1)} className="text-5xl md:text-8xl font-display font-bold leading-tight mb-8 text-lael-light">
            Nuestra forma <br />
            <span className="text-lael-accent italic italic-playfair">de enseñar</span>
          </motion.h1>
          <motion.p {...fadeUp(0.2)} className="text-xl text-lael-muted leading-relaxed max-w-2xl mx-auto">
            No te llenamos de videos. Clases en vivo, grabaciones para repasar, un ensayo cada mes y un profe que sabe cómo vas.
          </motion.p>
        </div>
      </section>

      {/* 1. LO QUE NO FUNCIONA */}
      <section className="py-24 bg-lael-secondary border-y border-lael-bd">
        <div className="max-w-6xl mx-auto px-6">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <motion.div {...fadeUp()}>
                 <h2 className="font-display text-4xl text-lael-rust mb-8">Lo que no funciona.</h2>
                 <p className="text-lael-muted leading-relaxed mb-10">
                    Mucha gente cree que para mejorar necesita "más materia". Se inscribe en cursos con cientos de videos y termina <strong>saturada</strong>, sin saber por dónde seguir.
                 </p>
                 <ul className="space-y-6">
                    {[
                      "Clases donde solo escuchas y nunca practicas.",
                      "Ensayos que nadie revisa contigo.",
                      "Memorizar sin entender para qué sirve.",
                      "Estudiar horas seguidas, sin pausas ni orden."
                    ].map((t, i) => (
                      <li key={i} className="flex gap-4 text-sm text-lael-muted/60">
                         <div className="w-5 h-5 rounded-full bg-lael-rust/20 flex items-center justify-center text-lael-rust flex-shrink-0">✕</div>
                         {t}
                      </li>
                    ))}
                 </ul>
              </motion.div>
              <motion.div {...fadeUp(0.2)} className="p-12 bg-lael-primary rounded-[40px] border border-lael-bd cinematic-shadow">
                 <p className="text-lael-rust text-[10px] tracking-[0.3em] uppercase mb-6 font-bold">Lo que pasa:</p>
                 <p className="text-2xl text-lael-light italic">"Estudias 8 horas y el puntaje sigue estancado. Te sientes cansado, pero no más inteligente."</p>
              </motion.div>
           </div>
        </div>
      </section>

      {/* 2. LO QUE SÍ FUNCIONA */}
      <section className="py-32">
        <div className="max-w-6xl mx-auto px-6">
           <div className="text-center mb-24">
              <h2 className="font-display text-5xl text-lael-primary mb-6">Lo que sí hacemos.</h2>
              <p className="text-lael-muted max-w-xl mx-auto">No se trata de estudiar más horas, sino de estudiar mejor y con alguien que te guíe.</p>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                { t: "Repaso Espaciado", d: "Volvemos a los temas cada cierto tiempo para que no se te olviden." },
                { t: "Práctica Activa", d: "En clase resuelves ejercicios, no solo escuchas. Se aprende haciendo." },
                { t: "Seguimiento", d: "Con el ensayo de cada mes vemos en qué preguntas fallas y dónde se te va el tiempo." }
              ].map((item, i) => (
                <motion.div key={i} {...fadeUp(i * 0.1)} className="space-y-4">
                   <div className="text-lael-accent font-display text-4xl">0{i+1}</div>
                   <h3 className="text-lael-primary font-bold text-xl uppercase tracking-widest">{item.t}</h3>
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
                 <p className="text-lael-accent text-[10px] tracking-[0.4em] uppercase mb-4 font-bold">Paso a paso</p>
                 <h2 className="font-display text-4xl lg:text-6xl text-lael-primary mb-10">Cómo partes.</h2>
                 <div className="space-y-10">
                    {[
                      { t: "Paso 1: Ver dónde estás", d: "Un primer diagnóstico para saber qué te cuesta más." },
                      { t: "Paso 2: Armar tu plan", d: "Ordenamos qué ramos y temas priorizar según tu tiempo." },
                      { t: "Paso 3: Practicar", d: "Clases en vivo por Google Meet en la tarde y un ensayo PAES cada mes." }
                    ].map((f, i) => (
                      <div key={i} className="flex gap-6">
                         <div className="w-12 h-12 bg-lael-accent text-lael-light flex items-center justify-center rounded-2xl font-bold flex-shrink-0">{i+1}</div>
                         <div>
                            <h4 className="text-lael-primary font-bold mb-2">{f.t}</h4>
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
            <h2 className="font-display text-4xl text-lael-light mb-12">Lo concreto. <br/> Sin letra chica.</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
               <div className="p-8 bg-lael-secondary rounded-2xl border border-lael-bd">
                  <p className="text-emerald-400 font-bold text-3xl mb-2">En vivo</p>
                  <p className="text-lael-muted text-sm">Clases por Google Meet en la tarde, con un profe al que le puedes preguntar.</p>
               </div>
               <div className="p-8 bg-lael-secondary rounded-2xl border border-lael-bd">
                  <p className="text-emerald-400 font-bold text-3xl mb-2">Mensual</p>
                  <p className="text-lael-muted text-sm">Un ensayo PAES cada mes para medir cómo vas y qué te falta.</p>
               </div>
            </div>
         </div>
      </section>

      <CTASection 
        title="Parte por saber dónde estás."
        subtitle="Empieza con el diagnóstico gratuito y deja de estudiar a ciegas."
        btnText="Hacer el diagnóstico"
      />
    </>
  );
}
