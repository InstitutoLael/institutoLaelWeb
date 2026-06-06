import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Users, Heart, Star, Quote, Sparkles } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import diegoAvatar from '../assets/img/Home/paes_mentor_strategy_1777948898105.png';
import SignificadoLael from '../components/SignificadoLael';

// Brand Design Tokens
const BLUE = '#071D49';
const YELLOW = '#D7E400';
const WHITE = '#FFFFFF';
const LIGHT_GRAY = '#F4F4F4';
const MUTED = '#8D8D8D';

const ease = [0.16, 1, 0.3, 1];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.9, delay, ease },
});

export default function Nosotros() {
  const team = [
    {
      name: "Diego Chaparro",
      role: "Director & Profe Matemáticas",
      subject: "PAES M1/M2 · Estrategia",
      bio: "Fundador de Instituto Lael. Se especializa en simplificar las matemáticas y enseñar la estrategia analítica detrás de cada pregunta para asegurar tu puntaje máximo.",
      img: "https://ui-avatars.com/api/?name=Diego+Chaparro&background=071D49&color=D7E400&size=200&bold=true",
      confirmed: true
    },
    {
      name: "Fernanda Gaete",
      role: "Educadora & Facilitadora LSCh",
      subject: "Lengua de Señas Chilena",
      bio: "Instructora nativa Sorda y Educadora de Párvulos profesional. Combina la inmersión de la cultura sorda con una pedagogía sumamente paciente y estructurada.",
      img: "https://ui-avatars.com/api/?name=Fernanda+Gaete&background=071D49&color=D7E400&size=200&bold=true",
      confirmed: true
    },
    {
      name: "Martín",
      role: "Profe de Ciencias",
      subject: "Biología + Química",
      bio: "Especialista del área científica. Enfocado en desglosar teorías abstractas y explicarlas a través de simulaciones y fenómenos de la vida diaria.",
      img: "https://ui-avatars.com/api/?name=Martin+Ciencias&background=071D49&color=D7E400&size=200&bold=true",
      confirmed: true
    },
    {
      name: "Kathy",
      role: "Profe de Matemáticas",
      subject: "Matemática M2",
      bio: "Docente experta en matemáticas superiores. Apasionada por potenciar y preparar las competencias lógicas necesarias para la prueba selectiva M2.",
      img: "https://ui-avatars.com/api/?name=Kathy+M2&background=071D49&color=D7E400&size=200&bold=true",
      confirmed: true
    },
    {
      name: "Próximamente CL",
      role: "Profe de Lenguaje",
      subject: "Competencia Lectora",
      bio: "Estamos seleccionando al docente especialista con la mayor trayectoria en comprensión de lectura crítica y descarte rápido.",
      img: "https://ui-avatars.com/api/?name=Proximamente+CL&background=F4F4F4&color=8D8D8D&size=200&bold=true",
      confirmed: false
    },
    {
      name: "Próximamente Electivos",
      role: "Profe de Ciencias / Historia",
      subject: "Física + Historia",
      bio: "Sumaremos nuevos docentes especialistas dedicados a preparar las electivas de física e historia con alto rendimiento.",
      img: "https://ui-avatars.com/api/?name=Proximamente+Electivos&background=F4F4F4&color=8D8D8D&size=200&bold=true",
      confirmed: false
    }
  ];

  return (
    <div className="w-full bg-[#F4F4F4] text-[#071D49] overflow-hidden font-sans">
      <Helmet>
        <title>Nuestra Génesis | Instituto Lael</title>
        <meta name="description" content="Fundado 2021. 600 alumnos. PAES gratuita. Santiago, Chile. Conoce nuestra historia, misión y equipo de mentores." />
      </Helmet>

      {/* ── 1. HERO ────────────────────────────────────────────────── */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-6 pt-32 pb-20" style={{ backgroundColor: LIGHT_GRAY }}>
        <div className="max-w-7xl w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <motion.div {...fadeUp(0)} className="lg:col-span-7 text-left">
            <p className="text-[#071D49] text-[11px] tracking-[0.5em] uppercase mb-8 font-bold flex items-center gap-2">
              <Sparkles size={12} className="text-[#D7E400]" />
              <span>FUNDADO EN SANTIAGO DE CHILE · 2021</span>
            </p>
            <motion.h1 
              initial={{ clipPath: 'inset(0 100% 0 0)' }}
              animate={{ clipPath: 'inset(0 0% 0 0)' }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[0.95] mb-12 uppercase tracking-tighter"
              style={{ color: BLUE }}
            >
              Nacimos para los <br />
              <span className="italic font-normal text-[#D7E400] capitalize">que el sistema ignoró.</span>
            </motion.h1>
            <div className="space-y-6 text-[#8D8D8D] text-lg leading-relaxed max-w-xl">
              <p>
                En 2021 comenzamos con un computador y una convicción radical: la excelencia académica es un derecho fundamental, no un privilegio del mercado.
              </p>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease }}
            className="lg:col-span-5 relative flex justify-center"
          >
             <div className="aspect-[4/5] rounded-[48px] overflow-hidden border border-[#071D49]/10 shadow-2xl relative w-full max-w-[380px] bg-[#092254]">
                <img 
                  src={diegoAvatar} 
                  alt="Diego Chaparro - Fundador" 
                  className="w-full h-full object-cover grayscale mix-blend-luminosity hover:grayscale-0 hover:mix-blend-normal transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071D49]/90 via-transparent to-transparent" />
                <div className="absolute bottom-12 left-10 right-10 text-left">
                   <p className="text-[#D7E400] text-[10px] tracking-[0.4em] uppercase font-bold mb-3">Diego Chaparro</p>
                   <p className="text-white text-2xl font-display font-extrabold leading-tight uppercase">
                     "Aquí no vendemos cursos. <br/> Activamos propósitos."
                   </p>
                </div>
             </div>
             {/* Decorative element */}
             <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#D7E400]/10 rounded-full blur-3xl animate-pulse -z-10" />
          </motion.div>
        </div>
      </section>

      {/* ── 2. HISTORIA DETALLADA (THE REBELLION) ────────────────────── */}
      <section className="py-32 px-6 text-white relative" style={{ backgroundColor: BLUE }}>
        <div className="max-w-5xl mx-auto">
           <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
              <motion.div {...fadeUp(0)} className="lg:col-span-5 text-left">
                 <h2 className="font-display text-4xl lg:text-5xl font-extrabold leading-tight uppercase tracking-tighter mb-10">
                   La realidad <br /> <span className="text-[#D7E400]">detrás del código.</span>
                 </h2>
                 <div className="w-20 h-1 bg-[#D7E400]/30 mb-10" />
              </motion.div>
              
              <motion.div {...fadeUp(0.2)} className="lg:col-span-7 space-y-8 text-white/70 text-lg leading-relaxed text-left">
                 <p>
                   <strong className="text-white font-extrabold">Lael nació como un acto de rebeldía educativa.</strong> Diego comenzó enseñando matemáticas desde cero en 2021, sin oficina ni capital, solo con la certeza de que el talento no tiene código postal.
                 </p>
                 <p>
                   En pocos meses, lo que empezó como un taller se convirtió en un ecosistema de <span className="text-[#D7E400] font-extrabold">600 alumnos simultáneos</span> conectados desde todo Chile. No escalamos por marketing, escalamos por resultados que el sistema tradicional no podía explicar.
                 </p>
                 <p>
                   Luego crecimos. Sumamos Inglés, Coreano y LSCh con Fernanda Gaete. Construimos un sistema de alto rendimiento que no filtraba por billetera, sino por compromiso innegociable.
                 </p>
                 <div className="pt-8">
                    <p className="text-[#D7E400] font-display text-xl italic leading-relaxed">
                       "En 2026 tomamos la decisión más honesta: parar, reestructurar y volver mejor. Este sitio es el resultado de esa pausa sagrada."
                    </p>
                 </div>
              </motion.div>
           </div>
        </div>
      </section>

      {/* ── 3. SIGNIFICADO DE LAEL (IDENTITY) ────────────────────────── */}
      <SignificadoLael />

      {/* ── 4. PILARES / VALORES (EDITORIAL LAYOUT) ───────────────────── */}
      <section className="py-32 px-6 bg-[#F4F4F4]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-end justify-between mb-20 gap-8 text-left">
             <div className="max-w-2xl">
                <p className="text-[#071D49] text-[11px] tracking-[0.5em] uppercase mb-6 font-bold">Nuestros Pilares</p>
                <h2 className="font-display text-4xl lg:text-6xl font-extrabold leading-tight uppercase tracking-tighter" style={{ color: BLUE }}>
                  Lo que nos mueve <br/> <span className="italic font-normal text-[#D7E400] capitalize">no es el mercado.</span>
                </h2>
             </div>
             <p className="text-[#8D8D8D] text-base max-w-sm pb-4">La misión es el centro de cada línea de código y cada clase que impartimos.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {[
              { icon: Heart, title: "FE ACTIVA", desc: "La fe es nuestro fundamento, no nuestra etiqueta. Se nota en cómo tratamos a cada alumno, no en cuántos versículos publicamos." },
              { icon: Star, title: "ACCESIBILIDAD RADICAL", desc: "La PAES es gratis. Los talleres de IA son gratis. La barrera para aprender en Lael es cero. Sin excusas." },
              { icon: Users, title: "INCLUSIÓN REAL", desc: "LSCh, educación diferencial, adultos: todos tienen un lugar como estructura, no como estrategia de marketing." },
              { icon: Shield, title: "EXCELENCIA SIN EXCUSA", desc: "Ser gratuito no justifica ser mediocre. Cada clase preparada. Cada profesor comprometido con tu resultado final." }
            ].map((v, i) => (
              <motion.div 
                key={v.title}
                {...fadeUp(i * 0.15)}
                className="flex gap-6 items-start text-left"
              >
                <div className="w-16 h-16 rounded-2xl bg-[#071D49] text-[#D7E400] flex items-center justify-center flex-shrink-0 shadow-md">
                  <v.icon size={28} />
                </div>
                <div>
                  <h4 className="text-xl font-black mb-2 text-[#071D49] tracking-wider font-display uppercase">{v.title}</h4>
                  <p className="text-[#8D8D8D] text-sm leading-relaxed">{v.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4.5 EQUIPO COMPLETO (NUEVO SECTOR) ────────────────────────── */}
      <section className="py-28 px-6 bg-white border-y border-[#071D49]/5 flex flex-col items-center">
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center mb-20">
            <motion.p {...fadeUp(0)} className="text-[#071D49] text-[10px] font-bold uppercase tracking-[0.4em] mb-4">Acompañamiento Profesional</motion.p>
            <motion.h2 {...fadeUp(0.1)} className="font-display text-3xl sm:text-5xl text-[#071D49] font-extrabold tracking-[-0.03em] uppercase">
              EQUIPO DOCENTE
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {team.map((t, i) => {
              const isDiego = t.name === "Diego Chaparro";
              const isFernanda = t.name === "Fernanda Gaete";
              const isPlaceholder = !t.confirmed;

              return (
                <motion.div 
                  key={t.name}
                  {...fadeUp(i * 0.08)}
                  className={`rounded-[32px] p-8 border transition-all duration-300 flex flex-col items-center text-center ${isPlaceholder ? 'bg-[#F4F4F4]/50 border-dashed border-[#071D49]/10 opacity-70' : 'bg-white border-[#071D49]/10 shadow-sm hover:shadow-card hover:border-[#D7E400]/40'}`}
                >
                  <div className="w-20 h-20 rounded-full overflow-hidden border border-[#071D49]/10 shadow-md mb-6 flex items-center justify-center bg-[#071D49]/5 relative">
                    {isPlaceholder ? (
                      <span className="text-3xl text-lael-muted font-bold">?</span>
                    ) : (
                      <img src={t.img} alt={`Foto de ${t.name}`} className="w-full h-full object-cover" />
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2 flex-wrap justify-center mb-1">
                    <h3 className="text-[#071D49] font-display font-extrabold text-base uppercase tracking-tight">{t.name}</h3>
                    {isDiego && (
                      <span className="text-[8px] font-black uppercase tracking-wider bg-[#071D49] text-white px-2 py-0.5 rounded">
                        FUNDADOR
                      </span>
                    )}
                    {isFernanda && (
                      <span className="text-[8px] font-black uppercase tracking-wider bg-[#D7E400] text-[#071D49] px-2 py-0.5 rounded">
                        INSTRUCTORA NATIVA
                      </span>
                    )}
                  </div>

                  <p className={`text-[10px] font-bold uppercase tracking-wider mb-4 px-3 py-1 rounded-full ${t.confirmed ? 'bg-[#D7E400] text-[#071D49]' : 'bg-white border border-[#071D49]/15 text-[#8D8D8D]'}`}>
                    {t.subject}
                  </p>
                  
                  <p className="text-[#8D8D8D] text-xs sm:text-sm leading-relaxed">{t.bio}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 5. CIERRE ESPIRITUAL (MANIFIESTO) ────────────────────────── */}
      <section className="py-32 px-6 text-center bg-[#F4F4F4]">
         <motion.div {...fadeUp(0)} className="max-w-4xl mx-auto">
            <Quote className="text-[#D7E400]/25 mx-auto mb-10" size={56} />
            <p className="text-2xl sm:text-3xl lg:text-4xl italic text-[#071D49] font-medium leading-relaxed mb-12 max-w-3xl mx-auto">
              "El Espíritu del Señor está sobre mí, por cuanto me ha ungido para dar buenas nuevas a los pobres; Me ha enviado a sanar a los quebrantados de corazón; A pregonar libertad a los cautivos..."
            </p>
            <div className="flex flex-col items-center gap-4">
               <p className="text-[11px] tracking-[0.5em] uppercase font-bold text-[#071D49]">
                 Lucas 4:18
               </p>
               <div className="w-px h-20 bg-gradient-to-b from-[#071D49]/30 to-transparent" />
            </div>
         </motion.div>
      </section>
    </div>
  );
}
