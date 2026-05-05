import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Target, Zap, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ease = [0.16, 1, 0.3, 1];
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, delay, ease }
});

const CASOS = [
  {
    name: "Javiera",
    profile: "Memorístico Saturado",
    result: "+130 pts",
    antes: "Estudiaba 6 horas diarias repasando guías, pero en los ensayos no subía de 610.",
    quiebre: "En el diagnóstico detectamos que su problema era el almacenamiento: acumulaba datos pero no tenía una ruta de ejecución para preguntas de análisis.",
    despues: "En 10 semanas, aplicando la arquitectura de respuesta Lael, alcanzó los 740 puntos constantes."
  },
  {
    name: "Matías",
    profile: "Ansioso Bajo Presión",
    result: "+125 pts",
    antes: "Se sabía toda la materia, pero al ver el cronómetro del ensayo su mente se nublaba.",
    quiebre: "Cambiamos su enfoque de 'resolver todo' a 'gestión de variables'. Aprendió a sacrificar 2 preguntas para ganar 10.",
    despues: "Subió de 620 a 745 puntos, controlando el tiempo en lugar de ser controlado por él."
  },
  {
    name: "Sofía",
    profile: "Estratégicamente Perdido",
    result: "960 pts",
    antes: "Venía de un preuniversitario masivo. Hacía todo bien pero estaba estancada en los 800.",
    quiebre: "Identificamos que perdía tiempo en lo que ya sabía. Redirigimos el 100% de su esfuerzo a sus brechas específicas en Geometría.",
    despues: "Logró 960 puntos en Matemáticas, entrando a su primera opción en Medicina."
  }
];

export default function CasosReales() {
  const navigate = useNavigate();

  return (
    <div className="bg-lael-primary min-h-screen pt-32 pb-20 px-6">
      <Helmet>
        <title>Casos Reales | Instituto Lael</title>
      </Helmet>

      <div className="max-w-5xl mx-auto">
        <motion.div {...fadeUp()} className="text-center mb-24">
          <p className="text-lael-accent text-[10px] tracking-[0.4em] uppercase mb-4 font-bold">Evidencia Táctica</p>
          <h1 className="font-display text-5xl lg:text-7xl text-lael-light mb-8 font-bold tracking-tight">
            Resultados, <br/> no promesas.
          </h1>
          <p className="text-lael-muted text-lg max-w-2xl mx-auto italic italic-playfair">
            Mira cómo el diagnóstico detectó el fallo y cómo la arquitectura Lael cambió el resultado.
          </p>
        </motion.div>

        <div className="space-y-12">
          {CASOS.map((caso, i) => (
            <motion.div 
              key={i} {...fadeUp(i * 0.1)}
              className="p-10 lg:p-16 bg-lael-secondary rounded-[50px] border border-lael-bd cinematic-shadow relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-12 text-lael-accent/5 font-display text-9xl font-bold italic">{caso.result}</div>
              
              <div className="relative z-10">
                <div className="flex flex-wrap items-center gap-4 mb-12">
                  <span className="text-lael-accent text-[10px] tracking-[0.2em] uppercase font-bold">{caso.profile}</span>
                  <div className="h-px w-12 bg-lael-accent/30"></div>
                  <span className="text-lael-light text-xs font-bold uppercase tracking-widest">{caso.name}</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-20">
                  <div>
                    <p className="text-lael-muted/50 text-[9px] uppercase tracking-widest mb-4 font-bold">Antes</p>
                    <p className="text-lael-muted text-sm leading-relaxed italic">"{caso.antes}"</p>
                  </div>
                  <div>
                    <p className="text-lael-accent text-[9px] uppercase tracking-widest mb-4 font-bold">El Quiebre</p>
                    <p className="text-lael-light text-sm leading-relaxed font-bold">"{caso.quiebre}"</p>
                  </div>
                  <div>
                    <p className="text-lael-rust text-[9px] uppercase tracking-widest mb-4 font-bold">Después</p>
                    <p className="text-lael-accent font-display text-4xl font-bold">{caso.result}</p>
                    <p className="text-lael-muted text-xs mt-2">{caso.despues}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div {...fadeUp(0.4)} className="mt-32 text-center">
          <h2 className="font-display text-4xl text-lael-light mb-12 font-bold uppercase tracking-widest">¿Quieres ser el siguiente?</h2>
          <button 
            onClick={() => navigate('/diagnostico')}
            className="bg-lael-accent text-white px-16 py-7 rounded-2xl text-[11px] tracking-[0.3em] uppercase font-bold hover:bg-lael-rust transition-all duration-500 shadow-2xl"
          >
            Iniciar mi diagnóstico →
          </button>
        </motion.div>
      </div>
    </div>
  );
}
