import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
   FaBible, FaLightbulb, FaGraduationCap, FaHeart, FaArrowRight, FaChalkboardTeacher, FaQuoteRight,
   FaHistory, FaGlobeAmericas, FaStar, FaEye, FaTimes
} from "react-icons/fa";
import { BsStars, BsChatQuote } from "react-icons/bs";
import { RiDoubleQuotesL } from "react-icons/ri";
import { MdVerified } from "react-icons/md";

// ASSETS
import logoDorado from "../assets/img/Logos/lael-inst-amarillo.png";

// DATA
import { ABOUT_DATA } from "../data/about.js";

// SEO
import SEOHead from "../components/SEOHead.jsx";

// HELPERS FOR ICONS
const IconMap = {
   FaBible: <FaBible />,
   BsStars: <BsStars />,
   FaHeart: <FaHeart />,
   FaChalkboardTeacher: <FaChalkboardTeacher />,
   FaLightbulb: <FaLightbulb />,
   FaGraduationCap: <FaGraduationCap />
};

export default function About() {
   const [activeValue, setActiveValue] = useState(0);
   const [showModal, setShowModal] = useState(false);
   const scrollRef = useRef(null);

   const { scrollYProgress } = useScroll({
      target: scrollRef,
      offset: ["start end", "end start"]
   });

   useEffect(() => { window.scrollTo(0, 0); }, []);

   return (
      <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-amber-500/30 overflow-x-hidden">
         <SEOHead
            title="Nuestra Historia | Instituto Lael Experience 2.0"
            description="Educar es trascender. Conoce el origen, los valores y la visión 2026 de Instituto Lael."
         />

         {/* ──────────────── 1. HERO: MANIFIESTO DINÁMICO ──────────────── */}
         <header className="relative min-h-screen flex items-center justify-center text-center overflow-hidden">
            {/* Immersive Background */}
            <div className="absolute inset-0 z-0">
               <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_20%,_rgba(245,158,11,0.1),transparent)]"></div>
               <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_80%,_rgba(30,58,138,0.15),transparent)]"></div>
               <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-repeat"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10 max-w-4xl">
               <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="mb-12"
               >
                  <img src={logoDorado} alt="Lael Logo" className="w-24 md:w-32 mx-auto drop-shadow-[0_0_30px_rgba(245,158,11,0.4)]" />
               </motion.div>

               <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 1 }}
                  className="text-6xl md:text-9xl font-serif font-black mb-8 leading-[0.85] tracking-tighter"
               >
                  Educar es <br />
                  <span className="text-amber-400 italic">Trascender.</span>
               </motion.h1>

               <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2, duration: 1 }}
                  className="text-xl md:text-2xl text-slate-400 leading-relaxed max-w-2xl mx-auto font-light"
               >
                  {ABOUT_DATA.hero.subtitle}
               </motion.p>

               <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2 }}
                  className="mt-16 animate-bounce"
               >
                  <div className="w-px h-24 bg-gradient-to-b from-transparent via-amber-500 to-transparent mx-auto"></div>
               </motion.div>
            </div>
         </header>

         {/* ──────────────── 2. LAEL MEANING (INTERACTIVE) ──────────────── */}
         <section className="py-32 bg-slate-950 relative overflow-hidden border-y border-white/5">
            <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

               <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
               >
                  <div className="inline-flex items-center gap-2 text-amber-500 font-bold uppercase tracking-[0.3em] text-xs mb-6">
                     <span className="w-8 h-px bg-amber-500"></span> Propósito Original
                  </div>
                  <h2 className="text-5xl md:text-7xl font-serif font-bold mb-10 leading-tight">
                     Una identidad con <br /><span className="text-white">Raíces.</span>
                  </h2>

                  <div
                     onClick={() => setShowModal(true)}
                     className="group cursor-pointer relative p-10 bg-slate-900/50 border border-amber-500/20 rounded-[2.5rem] overflow-hidden hover:border-amber-500/50 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(245,158,11,0.1)]"
                  >
                     <div className="flex flex-col gap-2 relative z-10 text-center">
                        <span className="text-8xl md:text-9xl font-serif text-white group-hover:scale-110 transition-transform duration-700">לָאֵל</span>
                        <span className="text-amber-400 font-black text-2xl uppercase tracking-widest mt-4">
                           {ABOUT_DATA.origin.term}
                        </span>
                        <p className="text-slate-500 text-sm mt-4 uppercase tracking-[0.2em] animate-pulse">Click para descubrir profundidad</p>
                     </div>
                     <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
               </motion.div>

               <div className="space-y-8">
                  {ABOUT_DATA.origin.cards.map((card, i) => (
                     <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.15 }}
                        className="bg-[#080B14] border border-white/5 p-8 rounded-3xl flex items-center gap-8 hover:bg-slate-900 transition-colors group"
                     >
                        <div className="w-16 h-16 rounded-2xl bg-amber-500/10 flex items-center justify-center text-3xl text-amber-500 group-hover:bg-amber-500 group-hover:text-slate-950 transition-all duration-300">
                           {IconMap[card.icon]}
                        </div>
                        <div>
                           <h4 className="text-xl font-bold text-white mb-2">{card.title}</h4>
                           <p className="text-slate-500 text-sm leading-relaxed">{card.desc}</p>
                        </div>
                     </motion.div>
                  ))}
               </div>
            </div>
         </section>

         {/* ──────────────── 3. TIMELINE: STICKY SCROLL EXPERIENCE ──────────────── */}
         <section ref={scrollRef} className="py-40 bg-[#020617] relative">
            <div className="container mx-auto px-6">
               <div className="flex flex-col lg:flex-row gap-20">

                  {/* Left: Sticky Title */}
                  <div className="lg:w-4/12 lg:sticky lg:top-40 lg:h-fit">
                     <span className="text-amber-500 font-bold uppercase tracking-[0.3em] text-xs mb-4 block">Trayectoria</span>
                     <h2 className="text-5xl font-serif font-black text-white mb-8 leading-tight">Nuestra línea de <br />Tiempo.</h2>
                     <p className="text-slate-500 leading-relaxed max-w-sm">
                        Desde los primeros pasos hasta la visión 2026, cada año ha sido un ladrillo en la construcción de este ideal.
                     </p>

                     {/* Progress Indicator */}
                     <div className="mt-12 w-full h-1 bg-slate-900 rounded-full overflow-hidden relative">
                        <motion.div
                           style={{ scaleX: scrollYProgress }}
                           className="absolute top-0 left-0 w-full h-full bg-amber-500 origin-left"
                        />
                     </div>
                  </div>

                  {/* Right: Scrolling Timeline Content */}
                  <div className="lg:w-8/12 space-y-40 lg:pb-96">
                     {ABOUT_DATA.timeline.map((item, i) => (
                        <motion.div
                           key={i}
                           initial={{ opacity: 0, x: 50 }}
                           whileInView={{ opacity: 1, x: 0 }}
                           viewport={{ once: false, margin: "-20%" }}
                           transition={{ duration: 0.8 }}
                           className="relative pl-12 border-l border-white/10 group pb-10"
                        >
                           {/* Year Marker */}
                           <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-slate-950 border border-white/20 flex items-center justify-center group-hover:border-amber-500 transition-colors">
                              <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></div>
                           </div>

                           <span className="text-8xl md:text-[10rem] font-black text-white/5 absolute -top-16 left-0 pointer-events-none select-none group-hover:text-white/10 transition-colors">
                              {item.year}
                           </span>

                           <div className="relative z-10">
                              <h4 className="text-3xl font-black text-white mb-4 group-hover:text-amber-400 transition-colors">
                                 {item.title}
                              </h4>
                              <p className="text-xl text-slate-400 leading-relaxed max-w-2xl">
                                 {item.desc}
                              </p>
                           </div>
                        </motion.div>
                     ))}
                  </div>

               </div>
            </div>
         </section>

         {/* ──────────────── 4. FOUNDER PROFILE ──────────────── */}
         <section className="py-40 bg-slate-950 relative overflow-hidden">
            <div className="container mx-auto px-6">
               <div className="bg-slate-900/50 border border-white/5 rounded-[4rem] overflow-hidden grid grid-cols-1 lg:grid-cols-2 shadow-2xl backdrop-blur-3xl">

                  {/* Abstract Visual Side */}
                  <div className="relative min-h-[500px] bg-[#0c0f1d] flex items-center justify-center overflow-hidden group">
                     {/* Animated Circles/Gradients */}
                     <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-amber-500/20 blur-[100px] rounded-full group-hover:scale-150 transition-transform duration-1000"></div>
                     <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-white/5 rounded-full group-hover:w-48 transition-all duration-1000"></div>
                     <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-white/5 rounded-full group-hover:w-64 transition-all duration-1000"></div>

                     <div className="relative z-10 text-center">
                        <div className="w-24 h-24 bg-gradient-to-br from-amber-400 to-amber-600 rounded-3xl mx-auto flex items-center justify-center text-4xl text-slate-950 shadow-2xl shadow-amber-500/50 mb-6">
                           <FaQuoteRight />
                        </div>
                        <span className="text-7xl font-serif text-white/5 font-black uppercase pointer-events-none select-none">Visionary</span>
                     </div>

                     <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
                  </div>

                  {/* Content Side */}
                  <div className="p-16 flex flex-col justify-center">
                     <div className="inline-flex items-center gap-2 bg-amber-500/10 p-2 rounded-xl mb-8 w-fit text-amber-500 border border-amber-500/20">
                        <MdVerified /> <span className="text-[10px] uppercase font-black tracking-widest">Director General</span>
                     </div>
                     <h3 className="text-5xl font-black text-white mb-6 uppercase tracking-tight">{ABOUT_DATA.founder.name}</h3>
                     <div className="flex flex-wrap gap-2 mb-10">
                        {ABOUT_DATA.founder.tags.map(tag => (
                           <span key={tag} className="px-4 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                              {tag}
                           </span>
                        ))}
                     </div>
                     <p className="text-xl text-slate-400 leading-relaxed italic border-l-2 border-amber-500 pl-8 font-light mb-12">
                        "{ABOUT_DATA.founder.bio}"
                     </p>

                     <div className="bg-slate-950/80 p-8 rounded-3xl border border-white/5 flex items-start gap-6 shadow-inner">
                        <RiDoubleQuotesL className="text-5xl text-amber-500/50" />
                        <p className="text-lg text-slate-300 leading-relaxed italic">
                           {ABOUT_DATA.founder.quote}
                        </p>
                     </div>
                  </div>
               </div>
            </div>
         </section>

         {/* ──────────────── 5. DNA (INTERACTIVE) ──────────────── */}
         <section className="py-40 bg-[#020617]">
            <div className="container mx-auto px-6 text-center mb-20">
               <span className="text-amber-500 font-black uppercase tracking-[0.3em] text-xs mb-4 block">Nuestro ADN</span>
               <h2 className="text-6xl font-serif font-black text-white">Pilares 2026.</h2>
            </div>

            <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl">

               {/* Controls */}
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {ABOUT_DATA.values.map((val, idx) => (
                     <button
                        key={idx}
                        onClick={() => setActiveValue(idx)}
                        className={`text-left p-8 rounded-[2rem] border transition-all duration-500 flex flex-col gap-6 group relative overflow-hidden
                           ${activeValue === idx
                              ? 'bg-amber-600 border-amber-500 text-slate-950 shadow-2xl scale-[1.05] z-10'
                              : 'bg-slate-900/50 border-white/5 text-slate-400 hover:bg-slate-900 hover:text-white'
                           }
                        `}
                     >
                        <span className="text-4xl group-hover:scale-110 transition-transform">
                           {IconMap[val.iconName]}
                        </span>
                        <span className="font-black text-xl uppercase tracking-tight leading-none">{val.title}</span>
                        {activeValue === idx && <div className="absolute top-4 right-4 animate-pulse"><FaStar /></div>}
                     </button>
                  ))}
               </div>

               {/* Large Content Display */}
               <div className="bg-slate-900 border border-white/10 rounded-[3rem] p-16 min-h-[450px] flex flex-col items-center justify-center text-center relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 to-transparent"></div>
                  <AnimatePresence mode="wait">
                     <motion.div
                        key={activeValue}
                        initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                        exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                        transition={{ duration: 0.5 }}
                        className="relative z-10"
                     >
                        <div className="text-8xl text-amber-500 mb-10 mx-auto w-fit drop-shadow-[0_0_30px_rgba(245,158,11,0.5)]">
                           {IconMap[ABOUT_DATA.values[activeValue].iconName]}
                        </div>
                        <h3 className="text-4xl font-serif font-black text-white mb-6">
                           {ABOUT_DATA.values[activeValue].title}
                        </h3>
                        <p className="text-2xl text-slate-300 max-w-lg mx-auto leading-relaxed font-light italic">
                           "{ABOUT_DATA.values[activeValue].desc}"
                        </p>
                     </motion.div>
                  </AnimatePresence>
               </div>
            </div>
         </section>

         {/* ──────────────── 6. HEBREW MODAL EXHIBITION ──────────────── */}
         <AnimatePresence>
            {showModal && (
               <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-2xl bg-slate-950/90"
               >
                  <motion.div
                     initial={{ scale: 0.9, y: 50 }}
                     animate={{ scale: 1, y: 0 }}
                     exit={{ scale: 0.9, y: 50 }}
                     className="max-w-4xl w-full bg-slate-900 border border-white/10 rounded-[4rem] p-16 relative overflow-hidden shadow-2xl"
                  >
                     {/* Grain Effect */}
                     <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/pinstripe-dark.png')]"></div>

                     <button
                        onClick={() => setShowModal(false)}
                        className="absolute top-10 right-10 p-4 bg-white/5 hover:bg-white/10 rounded-full text-white transition-colors"
                     >
                        <FaTimes size={24} />
                     </button>

                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="text-center lg:text-right">
                           <span className="text-[12rem] md:text-[16rem] font-serif text-white block leading-none">לָאֵל</span>
                           <h3 className="text-4xl font-black text-amber-500 uppercase mt-4 tracking-[0.2em]">LA-EL</h3>
                        </div>
                        <div className="space-y-8">
                           <div className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest border border-white/10 px-4 py-2 rounded-full">
                              Exégesis de Marca
                           </div>
                           <p className="text-2xl text-slate-300 leading-relaxed font-light">
                              En hebreo, **Lael** significa literalmente *"Para Dios"* o *"Perteneciente a la Fuerza"*.
                           </p>
                           <p className="text-lg text-slate-500 leading-relaxed">
                              Cada profesor, cada seña en LSCh, y cada ecuación resuelta en nuestro preU tiene un propósito que trasciende lo material. No educamos para el ahora, educamos para la **Eternidad**.
                           </p>
                           <div className="flex gap-4 pt-6">
                              <div className="p-4 bg-white/5 rounded-2xl border border-white/10 text-center flex-1">
                                 <div className="text-amber-500 font-black text-xl mb-1">LA</div>
                                 <div className="text-[10px] text-slate-600 uppercase font-bold">Dirección / Para</div>
                              </div>
                              <div className="p-4 bg-white/5 rounded-2xl border border-white/10 text-center flex-1">
                                 <div className="text-amber-500 font-black text-xl mb-1">EL</div>
                                 <div className="text-[10px] text-slate-600 uppercase font-bold">Fuerza / Divino</div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </motion.div>
               </motion.div>
            )}
         </AnimatePresence>

         {/* ──────────────── 7. CTA EXIT ──────────────── */}
         <section className="py-40 bg-slate-950 text-center border-t border-white/5">
            <div className="container mx-auto px-6">
               <h2 className="text-6xl md:text-8xl font-black text-white mb-16 tracking-tighter uppercase leading-[0.8]">
                  Escribamos el <br /><span className="text-white/20">Siguiente Capítulo.</span>
               </h2>
               <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <a href="/programas" className="px-12 py-6 bg-amber-500 text-slate-950 font-black rounded-2xl hover:bg-amber-400 transition-all shadow-2xl shadow-amber-500/20">
                     Explorar Programas
                  </a>
                  <a href="/contacto" className="px-12 py-6 bg-slate-900 text-white font-black rounded-2xl hover:bg-slate-800 border border-white/5 transition-all">
                     Hablar con Admisión
                  </a>
               </div>
            </div>
         </section>
      </div>
   );
}