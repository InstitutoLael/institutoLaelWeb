import React from 'react';
import { motion } from 'framer-motion';
import { Monitor, FileText, MessageSquare, PlayCircle } from 'lucide-react';

const FEATURES = [
  {
    title: "Realidad Virtual 2.0",
    desc: "Tu dashboard de rendimiento. No es una plataforma, es el mapa exacto de tus fallos y avances en tiempo real.",
    icon: <Monitor size={24} />,
    img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800" // Close-up focus on screen glow
  },
  {
    title: "Material de Quiebre",
    desc: "Guías diseñadas para la ejecución bajo presión, donde cada error se convierte en una instrucción táctica.",
    icon: <FileText size={24} />,
    img: "https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?auto=format&fit=crop&q=80&w=800" // Messy notes with corrections
  },
  {
    title: "Feedback Humano",
    desc: "Mentores reales que analizan tu proceso, no solo tu resultado. Correcciones que te cambian la mentalidad.",
    icon: <MessageSquare size={24} />,
    img: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800" // Focused interaction online
  }
];

export default function InsideLael() {
  return (
    <div className="w-full bg-lael-secondary py-32 border-y border-lael-bd overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-center mb-24">
          <div className="flex-1">
            <p className="text-lael-accent text-[10px] tracking-[0.4em] uppercase mb-4 font-bold">Inmersión</p>
            <h2 className="font-display text-4xl lg:text-6xl text-lael-light font-bold mb-8">Dentro de Lael.</h2>
            <p className="text-lael-muted text-lg leading-relaxed max-w-xl">
              Somos 100% online, pero nuestra presencia es constante. Mira cómo se entrena el rendimiento académico desde cualquier lugar de Chile.
            </p>
          </div>
          <div className="flex-shrink-0 flex gap-4">
             <div className="px-6 py-4 bg-lael-primary border border-lael-bd rounded-2xl flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-[10px] text-lael-light font-bold uppercase tracking-widest">En Vivo ahora</span>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {FEATURES.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="group relative"
            >
              <div className="aspect-[4/5] bg-lael-primary rounded-[48px] border border-lael-bd overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.3)] mb-8 relative">
                <img 
                  src={f.img} 
                  alt={f.title}
                  className="w-full h-full object-cover opacity-30 grayscale group-hover:grayscale-0 group-hover:scale-110 group-hover:opacity-50 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-lael-primary via-lael-primary/40 to-transparent"></div>
                
                <div className="absolute bottom-10 left-10 right-10">
                   <div className="w-14 h-14 bg-lael-accent text-white rounded-2xl flex items-center justify-center mb-6 shadow-[0_10px_30px_rgba(196,151,62,0.3)] group-hover:scale-110 transition-transform duration-500">
                      {f.icon}
                   </div>
                   <h3 className="text-lael-light font-display text-3xl font-bold mb-4 tracking-tight">{f.title}</h3>
                   <p className="text-lael-muted/90 text-sm leading-relaxed font-medium">{f.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Video simulation placeholder */}
        <div className="mt-16 p-8 bg-lael-primary rounded-[40px] border border-lael-bd flex flex-col lg:flex-row items-center gap-12 group cursor-pointer hover:border-lael-accent transition-all duration-500">
           <div className="w-full lg:w-1/2 aspect-video bg-lael-secondary rounded-2xl overflow-hidden relative border border-lael-bd flex items-center justify-center">
              <div className="absolute inset-0 bg-lael-accent/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <PlayCircle className="text-lael-accent group-hover:scale-110 transition-transform" size={64} />
           </div>
           <div className="w-full lg:w-1/2">
              <p className="text-lael-accent text-[9px] tracking-[0.3em] uppercase mb-4 font-bold">Simulación de Sesión</p>
              <h3 className="font-display text-3xl text-lael-light mb-6">Sesión Táctica en Vivo</h3>
              <p className="text-lael-muted text-sm leading-relaxed mb-8">
                 Mira cómo un estratega Lael desglosa un ejercicio complejo y recalibra la ejecución de los alumnos en tiempo real. No es una clase, es una corrección táctica.
              </p>
              <div className="flex flex-wrap gap-3">
                 <span className="px-3 py-1 bg-lael-accent/10 border border-lael-accent/20 rounded-full text-[9px] text-lael-accent uppercase tracking-widest font-bold">Full HD</span>
                 <span className="px-3 py-1 bg-lael-accent/10 border border-lael-accent/20 rounded-full text-[9px] text-lael-accent uppercase tracking-widest font-bold">Interactivo</span>
              </div>
           </div>
        </div>

        {/* ── HUMAN IMPERFECTION (REAL MOMENTS) ────────────────────────── */}
        <div className="mt-24 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="p-10 bg-lael-primary rounded-[40px] border border-lael-bd relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
              <MessageSquare size={120} />
            </div>
            <p className="text-lael-accent text-[10px] tracking-[0.3em] uppercase mb-8 font-bold">Corrección Real</p>
            <div className="p-8 bg-lael-secondary rounded-3xl border border-lael-bd mb-8 relative z-10">
              <p className="text-lael-muted text-sm italic leading-relaxed">
                "Aquí el alumno se equivocó en esto: no falló por no saber la materia, falló por no leer la restricción del enunciado. Es un error táctico de lectura bajo presión."
              </p>
            </div>
            <p className="text-lael-light text-sm font-bold leading-relaxed relative z-10">
              No ocultamos los errores. Los usamos como materia prima para el éxito.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="p-10 bg-lael-primary rounded-[40px] border border-lael-bd relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
              <Monitor size={120} />
            </div>
            <p className="text-lael-accent text-[10px] tracking-[0.3em] uppercase mb-8 font-bold">Momento de Quiebre</p>
            <div className="space-y-4 relative z-10">
              <div className="flex gap-3 justify-end">
                <div className="p-5 bg-lael-accent text-white rounded-3xl rounded-tr-none text-xs font-medium shadow-xl max-w-[80%]">
                  Profe, por fin bajé de los 2 minutos por pregunta en Geometría. ¡El truco de la variable me salvó!
                </div>
              </div>
              <div className="flex gap-3">
                <div className="p-5 bg-lael-secondary border border-lael-bd text-lael-light rounded-3xl rounded-tl-none text-xs font-medium max-w-[80%]">
                  ¡Eso es! Ahora ese tiempo lo usamos para las preguntas de alta dificultad. Vamos por ese 800+.
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
