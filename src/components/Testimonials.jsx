import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";

const TESTIMONIALS_DATA = [
  {
    id: 1,
    name: "Sofía M.",
    role: "Estudiante Medicina U. Chile",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    text: "El método de Lael cambió mi forma de estudiar. No solo subí 200 puntos en Ciencias, sino que aprendí a gestionar mi tiempo. Los profes son increíbles.",
    rating: 5,
    program: "Preu PAES"
  },
  {
    id: 2,
    name: "Carlos R.",
    role: "Programador en Seúl",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    text: "Empecé con cero coreano y en 8 meses ya podía tener conversaciones fluidas. Ahora trabajo remoto para una empresa en Corea gracias al inglés y coreano que aprendí aquí.",
    rating: 5,
    program: "Idiomas (KR/EN)"
  },
  {
    id: 3,
    name: "Valentina T.",
    role: "Apoderada Homeschool",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    text: "Buscábamos una educación con valores cristianos y excelencia académica. Lael Academy superó nuestras expectativas. Mi hija nunca había estado tan motivada por aprender.",
    rating: 5,
    program: "Homeschool"
  },
  {
    id: 4,
    name: "Javier P.",
    role: "Estudiante Ingeniería PUC",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    text: "La plataforma es otro nivel. Las clases quedan grabadas, los ensayos son interactivos y el feedback es inmediato. Vale totalmente la pena.",
    rating: 5,
    program: "Preu PAES"
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS_DATA.length) % TESTIMONIALS_DATA.length);
  };

  useEffect(() => {
    const timer = setInterval(next, 8000); // Auto-advance every 8s
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4">
            Historias de <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Éxito Real</span>
          </h2>
          <p className="text-slate-400 font-light text-lg">
            Más de 1200 alumnos ya transformaron su futuro con nosotros.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Controls */}
          <button 
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 z-20 p-3 rounded-full bg-white/5 hover:bg-white/10 text-white transition-all hidden md:flex items-center justify-center border border-white/5 backdrop-blur-sm group"
            aria-label="Anterior testimonio"
          >
            <ChevronLeft className="group-hover:-translate-x-0.5 transition-transform" />
          </button>
          
          <button 
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 z-20 p-3 rounded-full bg-white/5 hover:bg-white/10 text-white transition-all hidden md:flex items-center justify-center border border-white/5 backdrop-blur-sm group"
            aria-label="Siguiente testimonio"
          >
            <ChevronRight className="group-hover:translate-x-0.5 transition-transform" />
          </button>

          {/* Cards Container */}
          <div className="relative h-[400px] md:h-[300px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5, ease: "circOut" }}
                className="absolute inset-0"
              >
                  <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 h-full flex flex-col md:flex-row gap-8 items-center shadow-2xl relative overflow-hidden">
                    {/* Decorative Quote */}
                    <Quote className="absolute top-8 right-8 text-white/5 w-24 h-24 rotate-12 pointer-events-none" />

                    {/* Image */}
                    <div className="shrink-0 relative">
                        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-amber-500/50 shadow-lg shadow-amber-500/20">
                            <img 
                                src={TESTIMONIALS_DATA[currentIndex].image} 
                                alt={TESTIMONIALS_DATA[currentIndex].name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-slate-950 border border-white/10 px-3 py-1 rounded-full flex gap-0.5 shadow-lg">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} size={10} className="text-amber-400 fill-amber-400" />
                            ))}
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 text-center md:text-left z-10">
                        <p className="text-lg md:text-xl text-slate-200 font-medium italic leading-relaxed mb-6">
                            "{TESTIMONIALS_DATA[currentIndex].text}"
                        </p>
                        <div>
                            <h4 className="text-white font-bold text-lg">{TESTIMONIALS_DATA[currentIndex].name}</h4>
                            <p className="text-amber-400 text-xs font-black uppercase tracking-widest mb-1">{TESTIMONIALS_DATA[currentIndex].role}</p>
                            <span className="text-slate-500 text-xs font-medium bg-white/5 px-2 py-0.5 rounded border border-white/5 inline-block">
                                {TESTIMONIALS_DATA[currentIndex].program}
                            </span>
                        </div>
                    </div>
                  </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {TESTIMONIALS_DATA.map((_, i) => (
                <button
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${i === currentIndex ? 'w-8 bg-amber-400' : 'bg-white/10 hover:bg-white/20'}`}
                    aria-label={`Ir al testimonio ${i + 1}`}
                />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
