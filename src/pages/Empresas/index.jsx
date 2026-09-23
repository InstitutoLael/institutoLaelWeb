import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import EmpresasForm from './EmpresasForm';
import empresasRealidad from '../../assets/img/Home/mundo_empresas_bg_1777944168670.webp';
import { LANDING_SERVICES } from '../../data/empresas';

const ease = [0.16, 1, 0.3, 1];
const WA_NUMBER = '56964626568';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 1.1, delay, ease },
});

const SERVICES = LANDING_SERVICES;

export default function Empresas() {
  const handleContact = () => {
    const message = encodeURIComponent(
      'Hola, represento a una empresa y me interesa conocer los programas de capacitación de Instituto Lael.\n\n¿Podrían enviarme información y una propuesta?'
    );
    window.open(`https://wa.me/${WA_NUMBER}?text=${message}`, '_blank');
  };

  return (
    <>
      <Helmet>
        <title>Capacitación para Empresas | Instituto Lael Corporativo</title>
        <meta name="description" content="Capacitación online para empresas y colegios: preparación PAES, idiomas para equipos y Lengua de Señas Chilena (LSCh) con contexto de la Ley 21.015." />
      </Helmet>
      <main className="bg-lael-primary min-h-screen">

      {/* HERO */}
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center text-center px-6 py-20 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-lael-accent/[0.03] rounded-full blur-[120px] pointer-events-none" />
        <motion.p {...fadeUp(0)} className="text-lael-accent text-[10px] tracking-[0.35em] uppercase mb-8">
          Instituto Lael · Empresas y colegios
        </motion.p>
        <motion.h1 {...fadeUp(0.15)} className="font-display text-5xl lg:text-7xl tracking-[-0.02em] text-lael-light font-bold leading-tight max-w-4xl clip-reveal" style={{ animationDelay: '0.15s' }}>
          Capacitación para<br />
          <span className="accent-italic">
            tu equipo, en serio.
          </span>
        </motion.h1>
        <motion.p {...fadeUp(0.35)} className="mt-10 text-lael-muted text-base max-w-xl mx-auto leading-relaxed">
          Nada de taller genérico de un día. El mismo acompañamiento real que le damos a un alumno, adaptado a tu empresa.
        </motion.p>
        <motion.button {...fadeUp(0.55)} onClick={handleContact}
          className="mt-14 bg-lael-accent text-white px-10 py-5 rounded-lg text-[11px] tracking-[0.2em] uppercase font-bold hover:bg-lael-rust hover:-translate-y-1 transition-all duration-300 shadow-[0_4px_20px_rgba(196,151,62,0.3)]">
          Solicitar propuesta
        </motion.button>
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 animate-bounce text-lael-accent"
        >
          <ChevronDown size={24} />
        </motion.div>
      </section>

      {/* SERVICIOS */}
      <section className="w-full px-6 py-20 lg:py-28 flex flex-col items-center border-t border-lael-bd">
        <div className="w-full max-w-5xl">
          <motion.p {...fadeUp(0)} className="text-lael-accent text-[10px] tracking-[0.25em] uppercase mb-6 text-center">Programas disponibles</motion.p>
          <motion.h2 {...fadeUp(0.1)} className="font-display text-4xl lg:text-5xl text-lael-light font-bold text-center mb-16">
            Elige el programa para tu equipo.
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SERVICES.map((s, i) => (
              <motion.div key={s.id} {...fadeUp(i * 0.1)} className="p-8 lg:p-10 border border-lael-bd rounded-2xl bg-lael-secondary flex flex-col cinematic-shadow hover-card">
                <h3 className="font-display text-xl text-lael-primary font-bold mb-4">{s.title}</h3>
                <p className="text-lael-muted text-sm leading-relaxed mb-8 flex-1">{s.desc}</p>
                <div className="space-y-2">
                  {s.tags.map(tag => (
                    <p key={tag} className="text-[10px] tracking-[0.12em] text-lael-accent/70 uppercase">· {tag}</p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ROI & ENFOQUE ESTRATÉGICO */}
      <section className="relative w-full px-6 py-32 bg-lael-secondary border-y border-lael-bd flex flex-col items-center overflow-hidden">
         <div className="absolute top-0 right-0 w-96 h-96 bg-lael-accent/5 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
         <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeUp()}>
               <p className="text-lael-accent text-[10px] tracking-[0.25em] uppercase mb-8">Qué buscamos</p>
               <h2 className="font-display text-4xl text-lael-light mb-8">Capacitación que tu equipo sí usa.</h2>
               <p className="text-lael-muted leading-relaxed mb-8">
                  Lo importante no son las horas dictadas, sino que tu equipo use lo que aprende: que se comunique mejor, que conozca la Ley 21.015 y que avance con un plan claro.
               </p>
               <ul className="space-y-4">
                  <li className="flex items-center gap-3 text-lael-light text-sm font-medium">
                     <span className="w-1.5 h-1.5 rounded-full bg-lael-accent"></span>
                     Clases en vivo, con docente.
                  </li>
                  <li className="flex items-center gap-3 text-lael-light text-sm font-medium">
                     <span className="w-1.5 h-1.5 rounded-full bg-lael-accent"></span>
                     Contenidos de la Ley 21.015 (Inclusión).
                  </li>
                  <li className="flex items-center gap-3 text-lael-light text-sm font-medium">
                     <span className="w-1.5 h-1.5 rounded-full bg-lael-accent"></span>
                     Reportes de avance de tu equipo.
                  </li>
               </ul>
            </motion.div>
            <motion.div {...fadeUp(0.2)} className="grid grid-cols-2 gap-4">
               <div className="p-8 bg-lael-primary rounded-2xl border border-lael-bd text-center">
                  <p className="text-3xl font-display text-lael-accent font-bold mb-2">3</p>
                  <p className="text-[9px] text-lael-muted uppercase tracking-widest">Programas para equipos</p>
               </div>
               <div className="p-8 bg-lael-primary rounded-2xl border border-lael-bd text-center">
                  <p className="text-3xl font-display text-lael-accent font-bold mb-2">Online</p>
                  <p className="text-[9px] text-lael-muted uppercase tracking-widest">Clases en vivo</p>
               </div>
               <div className="p-8 bg-lael-primary rounded-2xl border border-lael-bd text-center col-span-2">
                  <p className="text-lael-light font-bold mb-2 italic">"Cursos completos, no charlas sueltas"</p>
                  <p className="text-[9px] text-lael-muted uppercase tracking-widest">Cómo trabajamos</p>
               </div>
            </motion.div>
         </div>
      </section>

      {/* ── 4.5 REALIDAD CORPORATIVA (VISUAL) ────────────────────────── */}
      <section className="relative w-full px-6 py-32 flex flex-col items-center overflow-hidden">
        <div className="w-full max-w-7xl">
          <div className="relative aspect-[21/9] rounded-[48px] overflow-hidden border border-lael-bd cinematic-shadow">
             <img 
               src={empresasRealidad} 
               alt="Capacitación de Instituto Lael para empresas" 
               className="w-full h-full object-cover"
             />
             <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent" />
             <div className="absolute inset-y-0 left-0 flex items-center px-12 lg:px-20 max-w-2xl">
                <motion.div {...fadeUp()}>
                   <p className="text-lael-accent text-[10px] tracking-[0.4em] uppercase mb-6 font-bold">Para tu equipo</p>
                   <h3 className="font-display text-4xl lg:text-6xl text-white font-bold leading-tight mb-8">
                     Clases reales <br /> para tu equipo.
                   </h3>
                   <p className="text-white/70 text-lg leading-relaxed">
                     Llevamos a tu empresa el mismo acompañamiento que damos en nuestras clases. No hablamos de "capital humano": le enseñamos a personas.
                   </p>
                </motion.div>
             </div>
          </div>
        </div>
      </section>

      {/* CASOS DE ÉXITO / PARTNERS */}
      <section className="relative w-full px-6 py-32 lg:py-48 flex flex-col items-center">
        <div className="separator-gradient top-0" />
        <div className="w-full max-w-5xl">
          <motion.p {...fadeUp()} className="text-lael-accent text-[10px] tracking-[0.25em] uppercase mb-10 text-center">Trayectoria</motion.p>
          <motion.h2 {...fadeUp(0.1)} className="font-display text-4xl text-lael-light font-bold text-center mb-20 leading-tight">Empresas que ya trabajaron con nosotros.</motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
             <motion.div {...fadeUp(0.2)} className="p-10 bg-lael-secondary rounded-3xl border border-lael-bd">
                <h4 className="text-lael-accent font-bold mb-6 text-sm uppercase tracking-widest">Naama Studio</h4>
                <p className="text-lael-muted text-sm leading-relaxed italic mb-8">
                   "El sistema de idiomas de Lael permitió que nuestro equipo creativo se comunicara con fluidez con clientes en el extranjero, eliminando la barrera del idioma en solo meses."
                </p>
                <div className="w-12 h-px bg-lael-bd"></div>
             </motion.div>

             <motion.div {...fadeUp(0.3)} className="p-10 bg-lael-secondary rounded-3xl border border-lael-bd">
                <h4 className="text-lael-accent font-bold mb-6 text-sm uppercase tracking-widest">Siloé D&V Construcciones</h4>
                <p className="text-lael-muted text-sm leading-relaxed italic mb-8">
                   "Implementar el programa de LSCh no solo nos permitió cumplir con la ley, sino que transformó la cultura de inclusión en nuestra oficina técnica."
                </p>
                <div className="w-12 h-px bg-lael-bd"></div>
             </motion.div>
          </div>
        </div>
      </section>

      {/* CTA FORMULARIO FINAL */}
      <section className="w-full px-6 py-20 lg:py-28 flex flex-col items-center border-t border-lael-bd">
        <EmpresasForm />
      </section>
    </main>
    </>
  );
}
