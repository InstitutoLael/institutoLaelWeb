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
    <div className="w-full bg-white text-lael-primary overflow-hidden">
      <Helmet>
        <title>Quiénes Somos | Instituto Lael</title>
        <meta name="description" content="Fundado 2021. 600 alumnos. PAES gratuita. Santiago, Chile." />
      </Helmet>

      {/* ── 1. HERO ───────────────────────────────────────────────────── */}
      <section className="relative min-h-[70vh] flex flex-col items-center justify-center text-center px-6 pt-32 pb-20 bg-lael-secondary/20">
        <div className="max-w-4xl relative z-10">
          <motion.div {...fadeUp(0)}>
            <p className="text-lael-accent text-[10px] tracking-[0.5em] uppercase mb-10 font-bold">Nuestra Génesis</p>
            <motion.h1 
              initial={{ clipPath: 'inset(0 100% 0 0)' }}
              animate={{ clipPath: 'inset(0 0% 0 0)' }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-5xl lg:text-8xl text-lael-primary font-bold leading-[0.9] mb-12 uppercase tracking-tighter"
            >
              Nacimos para los <br />
              <span className="italic italic-playfair text-lael-accent font-normal capitalize">que el sistema ignoró.</span>
            </motion.h1>
            <p className="text-lael-muted text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto">
              En 2021 comenzamos con un computador y una convicción radical: la excelencia académica es un derecho divino, no un privilegio de mercado.
            </p>
          </motion.div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white pointer-events-none" />
      </section>

      {/* ── 2. HISTORIA ───────────────────────────────────────────────── */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-1 gap-16">
          <motion.div {...fadeUp(0.2)} className="space-y-8 text-lael-primary leading-relaxed text-lg">
            <p>
              <strong className="text-lael-primary">Lael nació en 2021</strong> como un preuniversitario PAES 100% gratuito. Diego comenzó enseñando matemáticas desde cero, sin infraestructura ni financiamiento externo. En pocos meses, la voz se corrió y llegamos a tener <span className="text-lael-accent font-bold">600 alumnos simultáneos</span> conectados desde todo Chile.
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
      <section className="py-32 px-6 flex flex-col items-center">
        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <motion.div {...fadeUp(0.2)} className="relative group">
            <div className="aspect-[4/5] rounded-[48px] overflow-hidden border border-lael-bd cinematic-shadow">
               <img 
                 src={diegoAvatar} 
                 alt="Diego Chaparro" 
                 className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-lael-primary/80 via-transparent to-transparent" />
               <div className="absolute bottom-10 left-10">
                  <p className="text-white text-3xl font-display font-bold">Diego Chaparro</p>
                  <p className="text-lael-accent text-[10px] tracking-widest uppercase font-bold">Fundador & Visionario</p>
               </div>
            </div>
          </motion.div>
          
          <motion.div {...fadeUp(0.4)} className="space-y-12">
            <div>
              <p className="text-lael-accent text-[10px] tracking-[0.4em] uppercase mb-6 font-bold">La Realidad detrás del Código</p>
              <h2 className="text-4xl lg:text-5xl font-display font-bold text-lael-primary leading-tight uppercase">
                "La PAES es gratis. <br />
                <span className="italic italic-playfair text-lael-accent font-normal">Siempre lo fue. Siempre lo será."</span>
              </h2>
            </div>
            
            <div className="space-y-6 text-lael-muted text-lg leading-relaxed">
               <p>
                  Lael nació en 2021 como un acto de rebeldía educativa. Diego comenzó enseñando matemáticas desde cero, sin oficina ni capital, solo con la certeza de que el talento no tiene código postal.
               </p>
               <p>
                  En pocos meses, lo que empezó como un taller se convirtió en un ecosistema de 600 alumnos simultáneos. No escalamos por marketing, escalamos por resultados. En Lael, no eres un número de matrícula; eres una arquitectura en construcción.
               </p>
            </div>

            <div className="p-10 bg-lael-secondary/30 border border-lael-bd rounded-[40px] italic italic-playfair text-xl text-lael-primary">
               "Aquí no vendemos cursos. Activamos propósitos. Si estás aquí, es porque ya no te conformas con ser parte del promedio."
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 4. VALORES ────────────────────────────────────────────────── */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
             <h2 className="text-4xl font-display font-bold mb-4 text-lael-primary uppercase tracking-tight">Nuestros Pilares</h2>
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
                className="p-8 rounded-[32px] bg-lael-secondary/10 border border-lael-bd hover:border-lael-accent/30 transition-all duration-500 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-lael-accent/10 flex items-center justify-center text-lael-accent mb-6 group-hover:scale-110 transition-transform">
                  <v.icon size={24} />
                </div>
                <h4 className="text-xl font-bold mb-4 text-lael-primary uppercase">{v.title}</h4>
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
