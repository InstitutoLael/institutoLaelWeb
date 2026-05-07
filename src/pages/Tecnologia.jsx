import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Cpu, Database, Activity, Shield, Zap, Target } from 'lucide-react';

const ease = [0.16, 1, 0.3, 1];
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 1, delay, ease }
});

export default function Tecnologia() {
  return (
    <div className="bg-lael-primary min-h-screen pt-32 pb-20 px-6">
      <Helmet>
        <title>Tecnología | Ingeniería del Rendimiento Lael</title>
        <meta name="description" content="Conoce el motor tecnológico detrás del éxito de nuestros estudiantes. Inteligencia de datos aplicada al rendimiento académico." />
      </Helmet>

      <div className="max-w-6xl mx-auto">
        <motion.div {...fadeUp()} className="text-center mb-24">
          <p className="text-lael-accent text-[10px] tracking-[0.4em] uppercase mb-4 font-bold">Arquitectura Lael</p>
          <h1 className="font-display text-5xl lg:text-7xl text-lael-light mb-8 leading-tight">
            No es un curso. <br/>
            <span className="text-lael-accent italic italic-playfair">Es un sistema experto.</span>
          </h1>
          <p className="text-lael-muted text-lg max-w-2xl mx-auto leading-relaxed">
            Hemos digitalizado la experiencia de los mejores estrategas educativos para crear un motor de diagnóstico y seguimiento que no tiene competencia en el mercado tradicional.
          </p>
        </motion.div>

        {/* TECH STACK VISUAL */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
          {[
            { 
              title: "Motor de Diagnóstico", 
              desc: "Analiza patrones de respuesta, niveles de disciplina y brechas teóricas para asignar un perfil quirúrgico.", 
              icon: <Cpu className="text-lael-accent" size={32} /> 
            },
            { 
              title: "Sistema de Feedback 2.0", 
              desc: "Cada error es catalogado y transformado en una micro-lección inmediata. Cerramos la brecha en tiempo real.", 
              icon: <Activity className="text-emerald-400" size={32} /> 
            },
            { 
              title: "Data Intelligence", 
              desc: "Medimos el tiempo por pregunta, la curva de fatiga y la efectividad bajo presión extrema.", 
              icon: <Database className="text-blue-400" size={32} /> 
            },
            { 
              title: "Escudo de Confianza", 
              desc: "Algoritmos de validación cruzada que aseguran una confiabilidad del 98.2% en nuestras proyecciones.", 
              icon: <Shield className="text-lael-accent" size={32} /> 
            },
            { 
              title: "Flash Activation", 
              desc: "Sistema de priorización de contenidos que optimiza tu tiempo de estudio hasta en un 40%.", 
              icon: <Zap className="text-lael-rust" size={32} /> 
            },
            { 
              title: "Objetivo Quirúrgico", 
              desc: "No estudiamos por estudiar. Cada minuto está alineado con la meta de puntaje definida en tu arquitectura.", 
              icon: <Target className="text-lael-light" size={32} /> 
            }
          ].map((item, i) => (
            <motion.div 
              key={i} 
              {...fadeUp(i * 0.1)} 
              className="p-10 bg-lael-secondary rounded-3xl border border-lael-bd hover:border-lael-accent/50 transition-all duration-500 group"
            >
              <div className="mb-8 p-4 bg-lael-primary rounded-2xl w-fit group-hover:scale-110 transition-transform duration-500">
                {item.icon}
              </div>
              <h3 className="text-lael-primary font-bold text-xl mb-4">{item.title}</h3>
              <p className="text-lael-muted text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* TANGIBILITY SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center border-t border-lael-bd pt-32">
           <motion.div {...fadeUp()}>
              <h2 className="font-display text-4xl text-lael-light mb-8">Hardware Pedagógico.</h2>
              <p className="text-lael-muted leading-relaxed mb-8">
                 Nuestra tecnología no es solo código. Es la unión de la neurociencia aplicada al aprendizaje y el análisis de datos masivos. 
                 En el Aula 2.0, el sistema sabe cuándo estás perdiendo el foco y recalibra tu sesión de entrenamiento para mantener el rendimiento máximo.
              </p>
              <div className="space-y-4">
                 {[
                   "Algoritmo de espaciamiento adaptativo.",
                   "Mapas de calor de rendimiento por eje temático.",
                   "Simuladores de entorno real bajo presión de tiempo."
                 ].map(t => (
                   <div key={t} className="flex items-center gap-3 text-lael-light text-sm font-medium">
                      <div className="w-1.5 h-1.5 rounded-full bg-lael-accent" />
                      {t}
                   </div>
                 ))}
              </div>
           </motion.div>
           <motion.div {...fadeUp(0.2)} className="relative p-1 bg-lael-bd rounded-[40px] overflow-hidden shadow-2xl">
              <div className="bg-lael-secondary p-12 rounded-[38px]">
                 <div className="aspect-square bg-lael-primary rounded-3xl border border-lael-bd flex items-center justify-center">
                    <div className="text-center">
                       <Cpu size={64} className="text-lael-accent/20 mb-6 mx-auto" />
                       <p className="text-[10px] text-lael-muted uppercase tracking-[0.3em]">Core Engine Active</p>
                    </div>
                 </div>
              </div>
           </motion.div>
        </div>
      </div>
    </div>
  );
}
