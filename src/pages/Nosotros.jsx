import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
   FaBible, FaLightbulb, FaGraduationCap, FaHeart, FaArrowRight, FaChalkboardTeacher, FaQuoteRight
} from "react-icons/fa";
import { BsStars, BsChatQuote } from "react-icons/bs";
import { RiDoubleQuotesL } from "react-icons/ri";

// ASSETS
import logoDorado from "../assets/img/Logos/lael-inst-amarillo.png";

// DATA
import { ABOUT_DATA } from "../data/about.js";

// SEO
import SEOHead from "../components/SEOHead.jsx";

// HELPERS FOR ICONS (Mapping string names to components)
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

   useEffect(() => { window.scrollTo(0, 0); }, []);

   return (
      <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-amber-500/30">
         <SEOHead
            title="Nuestra Historia | Instituto Lael"
            description="Educar es trascender. Conoce el origen, los valores y la visión detrás de Instituto Lael."
         />

         {/* ──────────────── 1. HERO: EL MANIFIESTO ──────────────── */}
         <header className="relative min-h-[70vh] flex items-center justify-center text-center overflow-hidden border-b border-white/5">
            {/* Background Texture */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-950 to-slate-950"></div>
            <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-repeat"></div>

            <div className="container mx-auto px-6 relative z-10 max-w-3xl">
               <motion.div
                  initial={{ opacity: 0, y: -30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                  className="mb-8"
               >
                  <img src={logoDorado} alt="Lael Logo" className="w-24 mx-auto drop-shadow-[0_0_20px_rgba(245,158,11,0.3)] filter brightness-110" />
               </motion.div>

               <motion.h1
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, duration: 1 }}
                  className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-tight"
               >
                  {ABOUT_DATA.hero.title.split(' ').map((word, i) =>
                     word === 'Trascender' ? <span key={i} className="text-amber-400 italic font-serif block sm:inline">{word}</span> : word + ' '
                  )}
               </motion.h1>

               <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="text-lg text-slate-400 leading-relaxed"
               >
                  {ABOUT_DATA.hero.subtitle}
               </motion.p>
            </div>
         </header>

         {/* ──────────────── 2. EL ORIGEN (SIGNIFICADO) ──────────────── */}
         <section className="py-24 bg-slate-950 relative">
            <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

               {/* Left: Text */}
               <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
               >
                  <span className="text-amber-500 font-bold uppercase tracking-[0.2em] text-xs mb-4 block">
                     {ABOUT_DATA.origin.title}
                  </span>
                  <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8">
                     El significado de <br /><span className="text-white">LAEL</span>
                  </h2>

                  <div className="border-l-4 border-amber-500 pl-6 py-2 my-8 bg-gradient-to-r from-amber-500/10 to-transparent rounded-r-lg">
                     <div className="flex flex-col">
                        <span className="text-5xl font-serif text-white mb-1">{ABOUT_DATA.origin.term}</span>
                        <span className="text-amber-500 font-bold uppercase tracking-widest text-sm">
                           = {ABOUT_DATA.origin.definition}
                        </span>
                     </div>
                  </div>

                  <p className="text-slate-400 text-lg leading-relaxed mb-6">
                     {ABOUT_DATA.origin.description}
                  </p>
                  <p className="text-slate-500 font-light italic">
                     En un mundo confundido, queremos ser un faro de claridad. Aquí los números se entienden y las señas comunican vida.
                  </p>
               </motion.div>

               {/* Right: Visual Blocks */}
               <div className="space-y-6">
                  {ABOUT_DATA.origin.cards.map((card, i) => (
                     <motion.div
                        key={i}
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.2 }}
                        className="bg-slate-900 border border-slate-800 p-6 rounded-xl flex items-center gap-6 hover:border-amber-500/50 hover:bg-slate-800 transition-all group cursor-default"
                     >
                        <div className="text-3xl text-amber-500 group-hover:scale-110 transition-transform">
                           {IconMap[card.icon]}
                        </div>
                        <div>
                           <h4 className="text-lg font-bold text-white group-hover:text-amber-200 transition-colors">
                              {card.title}
                           </h4>
                           <p className="text-slate-500 text-sm group-hover:text-slate-400">
                              {card.desc}
                           </p>
                        </div>
                     </motion.div>
                  ))}
               </div>
            </div>
         </section>

         {/* ──────────────── 3. EL DIRECTOR (Ficha Técnica) ──────────────── */}
         <section className="py-24 bg-[#0B0F19] border-y border-white/5">
            <div className="container mx-auto px-6">
               <div className="text-center mb-16">
                  <span className="text-amber-500 font-bold text-xs uppercase tracking-widest">Liderazgo</span>
                  <h2 className="text-3xl font-serif font-bold text-white mt-2">Quien guía la visión</h2>
               </div>

               <div className="max-w-5xl mx-auto bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row">

                  {/* Image Placeholder */}
                  <div className="md:w-5/12 bg-slate-800 relative min-h-[300px]">
                     {/* Pseudo Image div */}
                     <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent z-10"></div>
                     <img
                        src="https://ui-avatars.com/api/?name=Diego+Chaparro&background=0F172A&color=fbbf24&size=400&bold=true"
                        alt="Diego Chaparro"
                        className="w-full h-full object-cover opacity-80 mix-blend-overlay"
                     />
                     <div className="absolute bottom-6 left-6 z-20">
                        <span className="text-6xl font-serif text-white/10 font-bold select-none">לָאֵל</span>
                     </div>
                  </div>

                  {/* Content */}
                  <div className="md:w-7/12 p-10 md:p-14 flex flex-col justify-center">
                     <div className="flex items-start justify-between mb-6">
                        <div>
                           <h3 className="text-3xl font-bold text-white mb-1">{ABOUT_DATA.founder.name}</h3>
                           <span className="text-amber-500 font-bold text-sm uppercase tracking-wider">{ABOUT_DATA.founder.role}</span>
                        </div>
                     </div>

                     <div className="flex gap-2 mb-8">
                        {ABOUT_DATA.founder.tags.map(tag => (
                           <span key={tag} className="px-3 py-1 rounded bg-white/5 border border-white/10 text-xs text-slate-400">
                              {tag}
                           </span>
                        ))}
                     </div>

                     <p className="text-slate-300 leading-relaxed mb-8 text-lg">
                        {ABOUT_DATA.founder.bio}
                     </p>

                     <div className="relative pl-6 border-l-2 border-amber-500/50 bg-slate-950/50 p-4 rounded-r-lg">
                        <FaQuoteRight className="absolute top-2 right-2 text-white/5 text-2xl" />
                        <p className="italic text-slate-400">
                           "{ABOUT_DATA.founder.quote}"
                        </p>
                     </div>
                  </div>

               </div>
            </div>
         </section>

         {/* ──────────────── 4. TIMELINE (SCROLL) ──────────────── */}
         <section className="py-24 bg-slate-950 relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
               <h2 className="text-3xl font-bold text-center mb-20 text-white">Nuestra Trayectoria</h2>

               <div className="relative max-w-4xl mx-auto">
                  {/* Vertical Line */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-slate-800"></div>

                  {ABOUT_DATA.timeline.map((item, i) => (
                     <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ delay: i * 0.2 }}
                        className={`relative flex items-center justify-between mb-16 last:mb-0 ${i % 2 === 0 ? 'flex-row-reverse' : ''}`}
                     >
                        {/* Content Side */}
                        <div className={`w-5/12 ${i % 2 === 0 ? 'text-right' : 'text-left'}`}>
                           <span className="text-5xl font-bold text-slate-800 block mb-2">{item.year}</span>
                           <h4 className="text-xl font-bold text-white mb-2">{item.title}</h4>
                           <p className="text-slate-400 text-sm">{item.desc}</p>
                        </div>

                        {/* Center Dot */}
                        <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-amber-500 border-4 border-slate-950 shadow-[0_0_15px_rgba(245,158,11,0.5)] z-10"></div>

                        {/* Empty Side */}
                        <div className="w-5/12"></div>
                     </motion.div>
                  ))}
               </div>
            </div>
         </section>

         {/* ──────────────── 5. ADN / VALORES INTERACTIVOS ──────────────── */}
         <section className="py-24 bg-[#080B14]">
            <div className="container mx-auto px-6">
               <div className="text-center mb-16">
                  <h2 className="text-3xl font-bold text-white mb-2">Nuestro ADN</h2>
                  <p className="text-slate-400">Los pilares innegociables sobre los que construimos.</p>
               </div>

               <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start max-w-6xl mx-auto">
                  {/* Buttons List */}
                  <div className="flex flex-col gap-4">
                     {ABOUT_DATA.values.map((val, idx) => (
                        <button
                           key={idx}
                           onClick={() => setActiveValue(idx)}
                           className={`text-left p-6 rounded-xl border transition-all duration-300 flex items-center gap-4 group
                           ${activeValue === idx
                                 ? 'bg-amber-500 text-slate-900 border-amber-500 shadow-lg shadow-amber-500/20'
                                 : 'bg-transparent border-slate-800 text-slate-400 hover:bg-slate-900 hover:text-white'
                              }
                        `}
                        >
                           <span className={`text-xl ${activeValue === idx ? 'text-slate-900' : 'text-amber-600'}`}>
                              {IconMap[val.iconName]}
                           </span>
                           <span className="font-bold text-lg">{val.title}</span>
                           {activeValue === idx && <FaArrowRight className="ml-auto animate-pulse" />}
                        </button>
                     ))}
                  </div>

                  {/* Display Area */}
                  <div className="lg:col-span-2 bg-slate-900/50 border border-slate-800 rounded-2xl p-12 min-h-[300px] flex flex-col items-center justify-center text-center relative overflow-hidden">
                     <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 to-transparent pointer-events-none"></div>

                     <motion.div
                        key={activeValue}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4 }}
                        className="relative z-10"
                     >
                        <div className="text-6xl text-amber-500 mb-6 mx-auto w-fit filter drop-shadow-[0_0_15px_rgba(245,158,11,0.4)]">
                           {IconMap[ABOUT_DATA.values[activeValue].iconName]}
                        </div>
                        <h3 className="text-3xl font-serif font-bold text-white mb-4">
                           {ABOUT_DATA.values[activeValue].title}
                        </h3>
                        <p className="text-xl text-slate-300 max-w-lg mx-auto leading-relaxed">
                           {ABOUT_DATA.values[activeValue].desc}
                        </p>
                     </motion.div>
                  </div>
               </div>

            </div>
         </section>

         {/* ──────────────── 6. CTA FINAL ──────────────── */}
         <section className="py-24 bg-slate-950 border-t border-slate-900 text-center">
            <div className="container mx-auto px-6 max-w-2xl">
               <RiDoubleQuotesL className="text-4xl text-amber-500 mx-auto mb-6 opacity-50" />
               <blockquote className="text-2xl md:text-3xl font-serif text-white mb-12 italic">
                  "La educación no es llenar un cubo, es encender un fuego. Y en Lael, encendemos fuegos que alumbran eternamente."
               </blockquote>

               <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a href="/programas" className="px-8 py-3 bg-amber-500 text-slate-900 font-bold rounded-lg hover:bg-amber-400 transition-colors shadow-[0_4px_20px_rgba(245,158,11,0.3)]">
                     Ver Cursos
                  </a>
                  <a href="/empresas" className="px-8 py-3 bg-transparent border border-slate-600 text-slate-300 font-bold rounded-lg hover:border-white hover:text-white transition-colors">
                     Soluciones Empresas
                  </a>
               </div>
            </div>
         </section>

      </div>
   );
}