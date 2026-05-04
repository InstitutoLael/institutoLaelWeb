import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import EmpresasForm from './EmpresasForm';

const ease = [0.16, 1, 0.3, 1];
const WA_NUMBER = '56964626568';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 1.1, delay, ease },
});

const SERVICES = [
  {
    id: 'paes',
    title: 'PAES Institucional',
    desc: 'Preparación colectiva para colegios y liceos. Sistema de alto rendimiento adaptado al contexto institucional con métricas por curso.',
    tags: ['Puntaje promedio medido', 'Docentes especializados', 'Reportes por alumno'],
  },
  {
    id: 'idiomas',
    title: 'Idiomas Corporativos',
    desc: 'Programas intensivos de inglés, coreano o español para equipos que necesitan comunicarse en entornos internacionales.',
    tags: ['Grupos reducidos', 'Horario flexible', 'Certificación institucional'],
  },
  {
    id: 'lsch',
    title: 'LSCh — Inclusión Real',
    desc: 'Capacitación en Lengua de Señas Chilena para empresas que deben cumplir con la Ley 21.015 de inclusión laboral.',
    tags: ['Cumplimiento Ley 21.015', 'Instructora Sorda nativa', 'Certificado por competencias'],
  },
];

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
        <meta name="description" content="Sistemas de rendimiento adaptados a tu organización. PAES Institucional, Idiomas Corporativos y LSCh para cumplimiento de la Ley 21.015." />
      </Helmet>
      <main className="bg-lael-primary min-h-screen">

      {/* HERO */}
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center text-center px-6 py-20 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-lael-accent/[0.03] rounded-full blur-[120px] pointer-events-none" />
        <motion.p {...fadeUp(0)} className="text-lael-accent text-[10px] tracking-[0.35em] uppercase mb-8">
          Instituto Lael · Soluciones Corporativas
        </motion.p>
        <motion.h1 {...fadeUp(0.15)} className="font-display text-5xl lg:text-7xl tracking-[-0.02em] text-lael-light font-bold leading-tight max-w-4xl clip-reveal" style={{ animationDelay: '0.15s' }}>
          Capacitación estratégica<br />
          <span className="accent-italic">
            para equipos de alto nivel.
          </span>
        </motion.h1>
        <motion.p {...fadeUp(0.35)} className="mt-10 text-lael-muted text-base max-w-xl mx-auto leading-relaxed">
          No son talleres genéricos. Son sistemas de rendimiento adaptados a las necesidades reales de tu organización.
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
            Elige el sistema que necesita tu equipo.
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SERVICES.map((s, i) => (
              <motion.div key={s.id} {...fadeUp(i * 0.1)} className="p-8 lg:p-10 border border-lael-bd rounded-2xl bg-lael-secondary flex flex-col cinematic-shadow hover-card">
                <h3 className="font-display text-xl text-lael-light font-bold mb-4">{s.title}</h3>
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

      {/* CTA FORMULARIO FINAL */}
      <section className="w-full px-6 py-20 lg:py-28 flex flex-col items-center border-t border-lael-bd">
        <EmpresasForm />
      </section>
    </main>
    </>
  );
}
