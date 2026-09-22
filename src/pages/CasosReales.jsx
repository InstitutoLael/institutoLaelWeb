import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ease = [0.16, 1, 0.3, 1];
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, delay, ease }
});

export default function CasosReales() {
  const navigate = useNavigate();

  return (
    <div className="bg-lael-primary min-h-screen pt-32 pb-20 px-6">
      <Helmet>
        <title>Casos Reales | Instituto Lael</title>
      </Helmet>

      <div className="max-w-5xl mx-auto">
        <motion.div {...fadeUp()} className="text-center mb-24">
          <p className="text-lael-accent text-[10px] tracking-[0.4em] uppercase mb-4 font-bold">Evidencia Real</p>
          <h1 className="font-display text-5xl lg:text-7xl text-lael-light mb-8 font-bold tracking-tight">
            Casos reales, <br/> no inventados.
          </h1>
          <p className="text-lael-muted text-lg max-w-2xl mx-auto italic italic-playfair">
            Estamos reuniendo estas historias una por una, con nombre y autorización de cada alumno. Preferimos tener pocas y verdaderas que muchas y genéricas.
          </p>
        </motion.div>

        <motion.div {...fadeUp(0.1)} className="p-10 lg:p-16 bg-lael-secondary rounded-[50px] border border-lael-bd cinematic-shadow text-center">
          <MessageSquare className="mx-auto mb-6 text-lael-accent" size={40} />
          <p className="text-lael-light text-xl font-bold mb-4">Todavía estamos construyendo esta página.</p>
          <p className="text-lael-muted text-sm max-w-xl mx-auto leading-relaxed">
            Ya tienes uno de nuestros primeros testimonios reales en la página principal. Si estudiaste con nosotros y quieres contar tu historia, nos ayuda muchísimo — y a alguien que todavía no se atreve a empezar.
          </p>
        </motion.div>

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
