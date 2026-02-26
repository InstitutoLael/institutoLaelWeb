import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SEOHead from "../components/SEOHead.jsx";
import { Briefcase, ChevronDown, Send, Heart } from "lucide-react";

// Data
import { PERKS, OPENINGS, HR_EMAIL, HR_WAPP } from "../data/jobs.js";

/* ──────────────────────────────────────────────────────────────────────────
   ANIMATION VARIANTS
   ────────────────────────────────────────────────────────────────────────── */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.2 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
};

/* ──────────────────────────────────────────────────────────────────────────
   COMPONENTE PRINCIPAL
   ────────────────────────────────────────────────────────────────────────── */
export default function Trabaja() {
  const [activeJob, setActiveJob] = useState(null);

  return (
    <div className="min-h-screen bg-[#050505] text-slate-50 font-sans pt-32 pb-24 relative overflow-x-hidden selection:bg-violet-500/30">
      <SEOHead title="Trabaja con Nosotros | Lael Careers" description="Únete a un equipo que transforma la educación." />
      
      {/* Luces de Fondo */}
      <div className="absolute top-[-200px] right-[-100px] w-[600px] h-[600px] bg-violet-600/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[40%] left-[-200px] w-[500px] h-[500px] bg-pink-500/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-4xl relative z-10">

        {/* HERO SECTION */}
        <motion.header 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-24"
        >
          <div className="inline-block bg-pink-500/10 text-pink-400 px-4 py-1.5 rounded-full text-xs font-bold uppercase mb-5 border border-pink-500/20">
            Estamos Contratando
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-[1.1]">
            Enseña con <span className="text-transparent bg-clip-text bg-gradient-to-br from-violet-400 to-pink-400">Propósito.</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            No buscamos "empleados". Buscamos mentores apasionados que quieran dejar una huella real en la vida de sus estudiantes.
            Si crees que la educación es un acto de servicio, este es tu lugar.
          </p>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, type: "spring" }}
            className="flex justify-center gap-4"
          >
            <a href="#positions" className="bg-violet-600 text-white px-7 py-3.5 rounded-full font-bold transition-all shadow-lg shadow-violet-600/40 hover:-translate-y-1 hover:shadow-violet-600/60 hover:brightness-110">
              Ver Oportunidades
            </a>
            <a href="#culture" className="bg-transparent text-white px-7 py-3.5 rounded-full font-semibold border border-white/10 transition-all hover:bg-white/5 hover:border-white">
              Nuestra Cultura
            </a>
          </motion.div>
        </motion.header>

        {/* BENEFICIOS (BENTO GRID) */}
        <section id="culture" className="mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-10"
          >
            ¿Por qué Lael?
          </motion.h2>
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {PERKS.map((p, i) => (
              <motion.div 
                key={i} 
                variants={itemVariants}
                whileHover={{ y: -4, borderColor: "rgba(139, 92, 246, 0.5)" }}
                className="bg-[#0f1115] border border-white/10 p-8 rounded-2xl text-center transition-all group"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{p.icon}</div>
                <h3 className="text-lg font-bold mb-2 text-white">{p.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* LISTA DE VACANTES */}
        <section id="positions" className="flex flex-col gap-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-10"
          >
            Posiciones Abiertas
          </motion.h2>
          <div className="flex flex-col gap-4">
            {OPENINGS.map(job => (
              <motion.div 
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`bg-[#0f1115] border rounded-2xl overflow-hidden transition-all duration-300
                  ${activeJob === job.id ? 'border-violet-500 bg-violet-600/5' : 'border-white/10 hover:border-white/20'}`}
              >

                {/* Header de la Tarjeta */}
                <div 
                  className="p-6 flex justify-between items-center cursor-pointer group"
                  onClick={() => setActiveJob(activeJob === job.id ? null : job.id)}
                >
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2 text-white group-hover:text-violet-400 transition-colors">{job.title}</h3>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs text-violet-300 bg-violet-500/10 px-2.5 py-1 rounded-md font-bold border border-violet-500/20">{job.type}</span>
                      {job.tags.map((t, idx) => (
                        <span key={idx} className="text-xs text-slate-400 bg-white/5 px-2.5 py-1 rounded-md border border-white/5">{t}</span>
                      ))}
                    </div>
                  </div>
                  <motion.button 
                    animate={{ rotate: activeJob === job.id ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className={`w-9 h-9 flex items-center justify-center rounded-full border transition-all duration-300 ml-4
                      ${activeJob === job.id 
                        ? 'bg-violet-600 text-white border-violet-600' 
                        : 'bg-transparent text-slate-400 border-white/10 group-hover:border-white/30'}`}
                    aria-label={`${activeJob === job.id ? 'Cerrar' : 'Abrir'} detalles de ${job.title}`}
                  >
                    <ChevronDown size={20} />
                  </motion.button>
                </div>

                {/* Cuerpo Desplegable */}
                <AnimatePresence>
                  {activeJob === job.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-8 pt-0 border-t border-white/5 mt-1">
                        <p className="text-slate-300 leading-relaxed my-6">{job.desc}</p>

                        <div className="mb-6">
                          <h4 className="text-sm uppercase text-slate-400 mb-3 font-bold tracking-wider">Requisitos</h4>
                          <ul className="space-y-2">
                            {job.requirements.map((r, idx) => (
                              <li key={idx} className="text-sm text-slate-200 pl-5 relative before:content-['•'] before:absolute before:left-0 before:text-violet-500 before:font-bold">
                                {r}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="bg-white/5 p-3 rounded-lg text-sm text-white mb-6 inline-block font-medium">
                          <strong>💰 Honorarios Referenciales:</strong> {job.salary}
                        </div>

                        <div className="flex flex-wrap gap-4">
                          <a
                            href={`mailto:${HR_EMAIL}?subject=Postulación: ${job.title}`}
                            className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-lg font-bold text-sm transition-all hover:bg-slate-200 hover:-translate-y-0.5"
                          >
                            <Send size={16} /> Enviar CV por Correo
                          </a>
                          <a
                            href={`https://wa.me/${HR_WAPP}?text=Hola,%20me%20interesa%20el%20puesto%20de%20${encodeURIComponent(job.title)}`}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-2 bg-transparent text-white px-6 py-3 rounded-lg font-bold text-sm border border-white/10 transition-all hover:border-white hover:bg-white/5"
                          >
                            Consultar por WhatsApp
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA FINAL (TALENT POOL) */}
        <motion.section 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 text-center"
        >
          <div className="bg-gradient-to-br from-[#1e1b4b] to-[#0f172a] p-12 rounded-3xl border border-violet-500/30 shadow-2xl relative overflow-hidden">
            <motion.div 
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-pink-500 mb-4 flex justify-center"
            >
              <Heart size={36} />
            </motion.div>
            <h3 className="text-3xl font-bold mb-3 text-white">¿No ves tu cargo ideal?</h3>
            <p className="text-slate-400 max-w-lg mx-auto mb-8 text-base">
              Siempre estamos buscando talento excepcional. Si eres psicopedagogo, diseñador, o simplemente un crack en lo que haces, queremos conocerte.
            </p>
            <a 
              href={`mailto:${HR_EMAIL}`} 
              className="inline-block bg-violet-600 text-white px-8 py-3.5 rounded-full font-bold transition-all hover:brightness-110 hover:scale-105 shadow-xl shadow-violet-600/20"
            >
              Enviar CV a Base de Talentos
            </a>
          </div>
        </motion.section>

      </div>
    </div>
  );
}