import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Users, Heart, Star, ChevronRight, Quote } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import diegoAvatar from '../assets/img/Home/paes_mentor_strategy_1777948898105.png';
import SignificadoLael from '../components/SignificadoLael';

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
        <title>Nuestra Génesis | Instituto Lael</title>
        <meta name="description" content="Fundado 2021. 600 alumnos. PAES gratuita. Santiago, Chile. Conoce nuestra historia y propósito." />
      </Helmet>

      {/* ── 1. HERO (FIGMA STYLE) ────────────────────────────────────── */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-6 pt-32 pb-20 bg-lael-secondary/10">
        <div className="max-w-7xl w-full relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div {...fadeUp(0)}>
            <p className="text-lael-accent text-[11px] tracking-[0.5em] uppercase mb-8 font-bold">Nuestra Génesis</p>
            <motion.h1 
              initial={{ clipPath: 'inset(0 100% 0 0)' }}
              animate={{ clipPath: 'inset(0 0% 0 0)' }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-6xl lg:text-8xl text-lael-primary font-bold leading-[0.85] mb-12 uppercase tracking-tighter"
            >
              Nacimos para los <br />
              <span className="italic italic-playfair text-lael-accent font-normal capitalize">que el sistema ignoró.</span>
            </motion.h1>
            <div className="space-y-6 text-lael-muted text-lg lg:text-xl leading-relaxed max-w-xl">
              <p>
                En 2021 comenzamos con un computador y una convicción radical: la excelencia académica es un derecho divino, no un privilegio de mercado.
              </p>
              <p className="text-sm uppercase tracking-widest font-bold text-lael-primary">Fundado en Santiago de Chile · 2021</p>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease }}
            className="relative"
          >
             <div className="aspect-[4/5] rounded-[60px] overflow-hidden border border-lael-bd shadow-2xl relative">
                <img 
                  src={diegoAvatar} 
                  alt="Diego Chaparro - Fundador" 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-lael-primary/90 via-transparent to-transparent" />
                <div className="absolute bottom-12 left-12 right-12">
                   <p className="text-lael-accent text-[10px] tracking-[0.4em] uppercase font-bold mb-4">Diego Chaparro</p>
                   <p className="text-white text-3xl font-display font-bold leading-tight">
                     "Aquí no vendemos cursos. <br/> Activamos propósitos."
                   </p>
                </div>
             </div>
             {/* Decorative element */}
             <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-lael-accent/10 rounded-full blur-3xl animate-pulse" />
          </motion.div>
        </div>
      </section>

      {/* ── 2. HISTORIA DETALLADA (THE REBELLION) ────────────────────── */}
      <section className="py-40 px-6 bg-lael-primary text-white">
        <div className="max-w-5xl mx-auto">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
              <motion.div {...fadeUp(0)}>
                 <h2 className="font-display text-4xl lg:text-6xl font-bold leading-tight uppercase tracking-tighter mb-12">
                   La realidad <br /> <span className="text-lael-accent">detrás del código.</span>
                 </h2>
                 <div className="w-24 h-1 bg-lael-accent/30 mb-12" />
              </motion.div>
              
              <motion.div {...fadeUp(0.2)} className="space-y-10 text-lael-muted text-lg lg:text-xl leading-relaxed">
                 <p>
                   <strong className="text-white">Lael nació como un acto de rebeldía educativa.</strong> Diego comenzó enseñando matemáticas desde cero en 2021, sin oficina ni capital, solo con la certeza de que el talento no tiene código postal.
                 </p>
                 <p>
                   En pocos meses, lo que empezó como un taller se convirtió en un ecosistema de <span className="text-lael-accent font-bold">600 alumnos simultáneos</span> conectados desde todo Chile. No escalamos por marketing, escalamos por resultados que el sistema tradicional no podía explicar.
                 </p>
                 <p>
                   Luego crecimos. Sumamos Inglés, Coreano y LSCh con Fernanda Gaete. Construimos un sistema de alto rendimiento que no filtraba por billetera, sino por compromiso innegociable.
                 </p>
                 <div className="pt-10">
                    <p className="text-lael-accent font-display text-2xl italic italic-playfair leading-relaxed">
                       "En 2026 tomamos la decisión más honesta: parar, reestructurar y volver mejor. Este sitio es el resultado de esa pausa sagrada."
                    </p>
                 </div>
              </motion.div>
           </div>
        </div>
      </section>

      {/* ── 3. SIGNIFICADO DE LAEL (IDENTITY) ────────────────────────── */}
      <SignificadoLael />

      {/* ── 4. PILARES (THE CORE) ─────────────────────────────────────── */}
      <section className="py-40 px-6 bg-lael-secondary/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-end justify-between mb-24 gap-8">
             <div className="max-w-2xl">
                <p className="text-lael-accent text-[11px] tracking-[0.5em] uppercase mb-6 font-bold">Nuestros Pilares</p>
                <h2 className="font-display text-5xl lg:text-7xl text-lael-primary font-bold leading-tight uppercase tracking-tighter">
                  Lo que nos mueve <br/> <span className="italic italic-playfair text-lael-accent font-normal capitalize">no es el mercado.</span>
                </h2>
             </div>
             <p className="text-lael-muted text-lg max-w-sm pb-4">La misión es el centro de cada línea de código y cada clase que impartimos.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { icon: Heart, title: "Fe Activa", desc: "La fe es nuestro fundamento, no nuestra etiqueta. Se nota en cómo tratamos a cada alumno, no en cuántos versículos publicamos." },
              { icon: Star, title: "Accesibilidad Radical", desc: "La PAES es gratis. Los Talleres de IA son gratis. La barrera para aprender en Lael es cero. Sin excusas." },
              { icon: Users, title: "Inclusión Real", desc: "LSCh, educación diferencial, adultos sin escolaridad: todos tienen un lugar como estructura, no como estrategia de marketing." },
              { icon: Shield, title: "Excelencia sin Excusa", desc: "Ser gratuito no justifica ser mediocre. Cada clase preparada. Cada profesor comprometido con tu resultado final." }
            ].map((v, i) => (
              <motion.div 
                key={v.title}
                {...fadeUp(i * 0.1)}
                className="p-12 rounded-[50px] bg-white border border-lael-bd cinematic-shadow hover:border-lael-accent transition-all duration-700 group"
              >
                <div className="w-16 h-16 rounded-2xl bg-lael-secondary flex items-center justify-center text-lael-accent mb-8 group-hover:bg-lael-accent group-hover:text-white transition-all duration-500">
                  <v.icon size={28} />
                </div>
                <h4 className="text-2xl font-bold mb-6 text-lael-primary uppercase tracking-tight">{v.title}</h4>
                <p className="text-lael-muted leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. CIERRE ESPIRITUAL ──────────────────────────────────────── */}
      <section className="py-48 px-6 text-center bg-white">
         <motion.div {...fadeUp(0)} className="max-w-4xl mx-auto">
            <Quote className="text-lael-accent/20 mx-auto mb-12" size={64} />
            <p className="text-3xl lg:text-5xl italic italic-playfair text-lael-primary font-medium leading-tight mb-16">
              "El Espíritu del Señor está sobre mí, por cuanto me ha ungido para dar buenas nuevas a los pobres; Me ha enviado a sanar a los quebrantados de corazón; A pregonar libertad a los cautivos..."
            </p>
            <div className="flex flex-col items-center gap-4">
               <p className="text-[12px] tracking-[0.5em] uppercase font-bold text-lael-accent">
                 Lucas 4:18
               </p>
               <div className="w-px h-24 bg-gradient-to-b from-lael-accent to-transparent" />
            </div>
         </motion.div>
      </section>
    </div>
  );
}
