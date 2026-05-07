import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Users, Heart, Star, ChevronRight } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import diegoAvatar from '../assets/img/Home/paes_mentor_strategy_1777948898105.png'; // Using existing mentor image as placeholder or actual

const ease = [0.16, 1, 0.3, 1];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 1.1, delay, ease },
});

export default function Nosotros() {
  return (
    <div className="w-full bg-lael-primary text-white overflow-hidden">
      <Helmet>
        <title>Quiénes Somos | Instituto Lael</title>
        <meta name="description" content="Fundado 2021. 600 alumnos. PAES gratuita. Santiago, Chile." />
      </Helmet>

      {/* ── 1. HERO ───────────────────────────────────────────────────── */}
      <section className="relative min-h-[70vh] flex flex-col items-center justify-center text-center px-6 pt-32 pb-20 border-b border-white/5">
        <motion.div {...fadeUp(0)} className="max-w-4xl">
          <span className="text-[10px] tracking-[0.4em] uppercase font-bold text-lael-accent mb-6 block">
            Santiago, Chile · Fundado 2021
          </span>
          <motion.h1 
            initial={{ clipPath: 'inset(0 100% 0 0)', opacity: 1 }}
            animate={{ clipPath: 'inset(0 0% 0 0)', opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
            className="text-5xl md:text-7xl font-display font-bold leading-tight mb-8"
          >
            Nacimos para los que el <br /> 
            <span className="italic italic-playfair text-lael-accent">sistema decidió ignorar.</span>
          </motion.h1>
          <p className="text-lael-muted text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            En 2021 comenzamos con una pizarra y la convicción de que la educación de calidad no puede ser un privilegio. Hoy, volvemos con más claridad y el mismo propósito.
          </p>
        </motion.div>
      </section>

      {/* ── 2. HISTORIA ───────────────────────────────────────────────── */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-1 gap-16">
          <motion.div {...fadeUp(0.2)} className="space-y-8 text-lael-light leading-relaxed text-lg">
            <p>
              <strong className="text-white">Lael nació en 2021</strong> como un preuniversitario PAES 100% gratuito. Diego comenzó enseñando matemáticas desde cero, sin infraestructura ni financiamiento externo. En pocos meses, la voz se corrió y llegamos a tener <span className="text-lael-accent font-bold">600 alumnos simultáneos</span> conectados desde todo Chile.
            </p>
            <p>
              Luego crecimos. Sumamos Inglés, Coreano y LSCh con Fernanda Gaete —educadora de párvulos y hablante nativa de Lengua de Señas Chilena. Construimos algo que nadie más estaba haciendo: un sistema de alto rendimiento que no filtraba por billetera, sino por compromiso.
            </p>
            <p>
              En 2026 tomamos la decisión más honesta: parar, reestructurar y volver mejor. Este sitio es el resultado de esa pausa. Volvemos con más claridad, mejor estructura y el mismo compromiso innegociable de que nadie se quede atrás.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── 3. FUNDADOR ───────────────────────────────────────────────── */}
      <section className="py-32 px-6 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <motion.div {...fadeUp(0)} className="w-64 h-64 md:w-80 md:h-80 relative flex-shrink-0">
             <div className="absolute inset-0 border border-lael-accent/30 rounded-full scale-110 animate-pulse" />
             <img src={diegoAvatar} alt="Diego Chaparro" className="w-full h-full object-cover rounded-full grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl" />
          </motion.div>
          <motion.div {...fadeUp(0.2)} className="space-y-6 text-center md:text-left">
            <div>
              <h3 className="text-3xl font-display font-bold">Diego Chaparro</h3>
              <p className="text-lael-accent tracking-widest uppercase text-xs font-bold mt-1">Fundador & Director General</p>
            </div>
            <p className="text-lael-muted leading-relaxed">
              Comenzó enseñando matemáticas en 2021. Llevó el Instituto a 600 alumnos sin financiamiento externo. Cree que la fe y la educación de calidad no son contradictorias, sino que son inseparables en la construcción de un futuro real.
            </p>
            <blockquote className="text-2xl italic italic-playfair text-white border-l-4 border-lael-accent pl-6 py-2">
              "La PAES es gratis. Siempre lo fue. Siempre lo será."
            </blockquote>
          </motion.div>
        </div>
      </section>

      {/* ── 4. VALORES ────────────────────────────────────────────────── */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
             <h2 className="text-4xl font-display font-bold mb-4 text-white">Nuestros Pilares</h2>
             <p className="text-lael-muted max-w-xl mx-auto">Lo que nos mueve no es el mercado, es la misión.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Heart, title: "Fe Activa", desc: "La fe es nuestro fundamento, no nuestra etiqueta. Se nota en cómo tratamos a cada alumno, no en cuántos versículos publicamos." },
              { icon: Star, title: "Accesibilidad Radical", desc: "La PAES es gratis. Los Talleres de IA son gratis. La barrera para aprender en Lael es cero." },
              { icon: Users, title: "Inclusión Real", desc: "LSCh, educación diferencial, adultos sin escolaridad: todos tienen un lugar como estructura, no como marketing." },
              { icon: Shield, title: "Excelencia sin Excusa", desc: "Ser gratuito no justifica ser mediocre. Cada clase preparada. Cada profe comprometido con tu resultado." }
            ].map((v, i) => (
              <motion.div 
                key={v.title}
                {...fadeUp(i * 0.1)}
                className="p-8 rounded-[32px] bg-white/[0.03] border border-white/10 hover:border-lael-accent/30 transition-all duration-500 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-lael-accent/10 flex items-center justify-center text-lael-accent mb-6 group-hover:scale-110 transition-transform">
                  <v.icon size={24} />
                </div>
                <h4 className="text-xl font-bold mb-4">{v.title}</h4>
                <p className="text-sm text-lael-muted leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. CIERRE ─────────────────────────────────────────────────── */}
      <section className="py-40 px-6 text-center border-t border-white/5">
         <motion.div {...fadeUp(0)}>
            <p className="text-2xl md:text-3xl italic italic-playfair text-lael-accent max-w-2xl mx-auto leading-relaxed">
              "El Espíritu del Señor está sobre mí, por cuanto me ha ungido para dar buenas nuevas a los pobres; Me ha enviado a sanar a los quebrantados de corazón; A pregonar libertad a los cautivos..."
            </p>
            <p className="mt-8 text-[10px] tracking-[0.4em] uppercase font-bold text-lael-muted">
              Lucas 4:18
            </p>
         </motion.div>
      </section>
    </div>
  );
}
