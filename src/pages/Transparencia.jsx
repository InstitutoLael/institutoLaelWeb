import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { CheckCircle2, XCircle, ShieldCheck, AlertTriangle } from 'lucide-react';

const ease = [0.16, 1, 0.3, 1];
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 1, delay, ease }
});

export default function Transparencia() {
  return (
    <div className="bg-lael-primary min-h-screen pt-32 pb-20 px-6">
      <Helmet>
        <title>Transparencia & Ética | Instituto Lael</title>
        <meta name="description" content="Conoce nuestra ética de trabajo. Sin promesas vacías, solo ingeniería de resultados y honestidad radical sobre tu rendimiento." />
      </Helmet>

      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-24">
          <p className="text-lael-accent text-[10px] tracking-[0.4em] uppercase mb-4 font-bold">Ética de Resultados</p>
          <motion.h1 
            initial={{ clipPath: 'inset(0 100% 0 0)', opacity: 1 }}
            animate={{ clipPath: 'inset(0 0% 0 0)', opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
            className="font-display text-5xl lg:text-7xl text-lael-light mb-8"
          >
            Sin letras pequeñas.
          </motion.h1>
          <p className="text-lael-muted text-lg max-w-2xl mx-auto leading-relaxed">
            Preferimos perder un alumno a prometer un milagro. Aquí detallamos exactamente qué hacemos y qué NO hacemos en el Sistema Lael.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* LO QUE HACEMOS */}
          <motion.div {...fadeUp(0.1)} className="p-10 bg-emerald-500/5 rounded-3xl border border-emerald-500/10">
             <div className="flex items-center gap-3 mb-10 text-emerald-400">
                <ShieldCheck size={28} />
                <h3 className="font-display text-2xl font-bold uppercase tracking-widest">Lo que sí hacemos</h3>
             </div>
             <ul className="space-y-8">
                {[
                  { t: "Diagnóstico Real", d: "Identificamos tus brechas aunque duela escucharlas." },
                  { t: "Seguimiento Diario", d: "Tu mentor sabe qué hiciste (y qué no) cada día." },
                  { t: "Material Estratégico", d: "Actualizado según los últimos cambios oficiales del DEMRE." },
                  { t: "Presión Controlada", d: "Te entrenamos para que el día de la prueba sea el día más fácil de tu semana." }
                ].map((item, i) => (
                  <li key={i} className="flex gap-4">
                    <CheckCircle2 className="text-emerald-400 flex-shrink-0 mt-1" size={18} />
                    <div>
                       <p className="text-lael-light font-bold text-sm mb-1">{item.t}</p>
                       <p className="text-lael-muted text-xs leading-relaxed">{item.d}</p>
                    </div>
                  </li>
                ))}
             </ul>
          </motion.div>

          {/* LO QUE NO HACEMOS */}
          <motion.div {...fadeUp(0.2)} className="p-10 bg-lael-rust/5 rounded-3xl border border-lael-rust/10">
             <div className="flex items-center gap-3 mb-10 text-lael-rust">
                <AlertTriangle size={28} />
                <h3 className="font-display text-2xl font-bold uppercase tracking-widest">Lo que NO hacemos</h3>
             </div>
             <ul className="space-y-8">
                {[
                  { t: "No hacemos milagros", d: "Si no aplicas el sistema, los resultados no llegarán por arte de magia." },
                  { t: "No vendemos humo", d: "Vendemos un resultado. Si buscas solo sentarte a ver videos, esto no es para ti." },
                  { t: "No regalamos puntaje", d: "El éxito en Lael requiere disciplina quirúrgica y honestidad brutal." },
                  { t: "No aceptamos a todos", d: "Si el diagnóstico muestra que no tienes compromiso, no te inscribiremos en el programa." }
                ].map((item, i) => (
                  <li key={i} className="flex gap-4">
                    <XCircle className="text-lael-rust flex-shrink-0 mt-1" size={18} />
                    <div>
                       <p className="text-lael-light font-bold text-sm mb-1">{item.t}</p>
                       <p className="text-lael-muted text-xs leading-relaxed">{item.d}</p>
                    </div>
                  </li>
                ))}
             </ul>
          </motion.div>
        </div>

        <motion.div {...fadeUp(0.4)} className="mt-24 p-12 bg-lael-secondary rounded-[40px] border border-lael-bd text-center">
           <h4 className="font-display text-2xl text-lael-light mb-6">Nuestra Filosofía</h4>
           <p className="text-lael-muted text-sm max-w-3xl mx-auto leading-relaxed italic">
              "El rendimiento académico no es una cuestión de suerte, es una cuestión de ingeniería. Si controlas las variables, controlas el resultado. Pero no puedes controlar las variables si no estás dispuesto a trabajar duro."
           </p>
        </motion.div>
      </div>
    </div>
  );
}
