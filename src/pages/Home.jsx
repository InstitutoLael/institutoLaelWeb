import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// Icons
import { 
  FaRocket, 
  FaGlobeAmericas, 
  FaLaptopCode, 
  FaUserGraduate, 
  FaCheckCircle, 
  FaWhatsapp,
  FaArrowRight
} from "react-icons/fa";

// Assets
import logoDorado from "../assets/img/Logos/lael-inst-amarillo.png";

const BentoCard = ({ to, title, description, icon, className, delay = 0, size = "small" }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    whileHover={{ scale: 1.02, borderColor: "rgba(99, 102, 241, 0.4)" }}
    className={`relative group overflow-hidden rounded-[2.5rem] border border-white/5 bg-slate-900/40 backdrop-blur-xl p-8 flex flex-col justify-between transition-all cursor-pointer ${className}`}
  >
    <Link to={to} className="absolute inset-0 z-10" />
    <div className="relative z-0">
      <div className={`mb-6 p-4 rounded-2xl inline-flex items-center justify-center bg-white/5 text-2xl group-hover:bg-indigo-500/20 group-hover:text-indigo-400 transition-colors`}>
        {icon}
      </div>
      <h3 className={`font-black text-white uppercase tracking-tighter mb-2 ${size === "large" ? "text-3xl md:text-4xl" : "text-xl"}`}>
        {title}
      </h3>
      <p className="text-slate-400 font-medium leading-relaxed">
        {description}
      </p>
    </div>
    <div className="mt-8 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity">
      Explorar Mundo <FaArrowRight />
    </div>
    {/* Hover Glow Effect */}
    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
  </motion.div>
);

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-indigo-500/30 overflow-x-hidden">
      
      {/* ──────────────── A. TOP BANNER (URGENCY) ──────────────── */}
      <div className="fixed top-0 left-0 w-full z-[100] bg-gradient-to-r from-pink-600 to-rose-600 py-3 px-4 shadow-lg shadow-pink-600/20">
        <p className="text-center text-white text-[10px] md:text-xs font-black uppercase tracking-[0.2em]">
          🔥 MATRÍCULAS 2026 ABIERTAS | Descuento Early Bird por tiempo limitado.
        </p>
      </div>

      {/* ──────────────── B. HERO SECTION (LA PROMESA) ──────────────── */}
      <header className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/10 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-pink-600/10 blur-[100px] rounded-full" />
        </div>

        <div className="container mx-auto max-w-5xl text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-10 flex justify-center"
          >
            <img src={logoDorado} alt="Instituto Lael" className="w-16 md:w-20 drop-shadow-[0_0_20px_rgba(99,102,241,0.3)]" />
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-9xl font-black text-white tracking-tighter uppercase leading-[0.85] mb-8"
          >
            El Futuro <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-white to-pink-400">
              Es Tuyo.
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-lg md:text-2xl text-slate-400 font-light max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            No somos solo un instituto. Somos el ecosistema educativo más avanzado de Chile. 
            Preuniversitario, Idiomas, Colegio Online y Capacitación en un solo lugar.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex justify-center"
          >
            <a 
              href="https://wa.me/56931379968" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group relative px-10 py-5 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-2xl transition-all shadow-2xl shadow-indigo-600/30 uppercase tracking-widest text-sm flex items-center gap-3"
            >
              <FaWhatsapp className="text-xl group-hover:rotate-12 transition-transform" />
              Hablar con un Asesor
            </a>
          </motion.div>
        </div>
      </header>

      {/* ──────────────── C. THE BENTO GRID (PRODUCTOS) ──────────────── */}
      <section className="container mx-auto px-6 max-w-7xl mb-32">
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-6 auto-rows-[minmax(200px,auto)]">
          
          {/* Tarjeta 1 (Grande - Focus Principal): PREU PAES */}
          <BentoCard 
            to="/paes"
            title="Preu PAES"
            description="Asegura tu puntaje con Simuladores IA y Coaching Estratégico."
            icon={<FaRocket />}
            className="md:col-span-2 md:row-span-2 border-indigo-500/20 bg-indigo-900/10"
            size="large"
            delay={0.1}
          />

          {/* Tarjeta 2 (Mediana): IDIOMAS */}
          <BentoCard 
            to="/idiomas"
            title="Idiomas"
            description="Inglés y Coreano. Viaja, conecta y trabaja sin fronteras."
            icon={<FaGlobeAmericas />}
            className="md:col-span-2 border-emerald-500/20 bg-emerald-900/10"
            delay={0.2}
          />

          {/* Tarjeta 3 (Mediana): LAEL ACADEMY */}
          <BentoCard 
            to="/homeschool"
            title="Lael Academy"
            description="Homeschool Cristiano & Refuerzo Académico. Valores + Excelencia."
            icon={<FaUserGraduate />}
            className="md:col-span-2 border-amber-500/20 bg-amber-900/10"
            delay={0.3}
          />

          {/* Tarjeta 4 (Pequeña): LSCh */}
          <BentoCard 
            to="/lsch"
            title="LSCh"
            description="Cultura Sorda y Gramática Visual."
            icon={<FaCheckCircle />}
            className="md:col-span-1 border-teal-500/20 bg-teal-900/10"
            delay={0.4}
          />

          {/* Tarjeta 5 (Pequeña): ESCUELA 2x1 */}
          <BentoCard 
            to="/escuela-adultos"
            title="Escuela 2x1"
            description="Termina tu 4to medio 100% Online."
            icon={<FaUserGraduate />}
            className="md:col-span-1 border-blue-500/20 bg-blue-900/10"
            delay={0.5}
          />

          {/* Tarjeta 6 (Pequeña): EMPRESAS */}
          <BentoCard 
            to="/empresas"
            title="Empresas"
            description="Capacitación B2B con ROI medible."
            icon={<FaLaptopCode />}
            className="md:col-span-2 border-slate-500/20 bg-slate-800/20"
            delay={0.6}
          />

        </div>
      </section>

      {/* ──────────────── D. SECCIÓN DE CONFIANZA (SOCIAL PROOF) ──────────────── */}
      <section className="py-24 bg-slate-900/50 border-y border-white/5 relative">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center text-center"
            >
              <div className="mb-6 text-5xl text-indigo-500"><FaLaptopCode /></div>
              <h4 className="text-xl font-black text-white uppercase tracking-widest mb-4">Tecnología</h4>
              <p className="text-slate-400 leading-relaxed">
                Plataforma propia con <strong className="text-indigo-400">Inteligencia Artificial</strong> diseñada para optimizar tu aprendizaje.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col items-center text-center"
            >
              <div className="mb-6 text-5xl text-pink-500"><FaGlobeAmericas /></div>
              <h4 className="text-xl font-black text-white uppercase tracking-widest mb-4">Flexibilidad</h4>
              <p className="text-slate-400 leading-relaxed">
                Estudia a tu ritmo, <strong className="text-pink-400">100% Online o Híbrido</strong>. Sin horarios rígidos que frenen tu vida.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col items-center text-center"
            >
              <div className="mb-6 text-5xl text-emerald-500"><FaCheckCircle /></div>
              <h4 className="text-xl font-black text-white uppercase tracking-widest mb-4">Comunidad</h4>
              <p className="text-slate-400 leading-relaxed">
                Más de <strong className="text-emerald-400">+1200 Alumnos activos</strong> transformando su realidad educativa hoy mismo.
              </p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ──────────────── E. FOOTER SIMPLE ──────────────── */}
      <footer className="py-12 bg-[#020617] text-center border-t border-white/5">
        <div className="container mx-auto px-6">
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] mb-6">
            © 2026 Instituto Lael. Todos los derechos reservados.
          </p>
          <div className="flex flex-wrap justify-center gap-8 text-[10px] font-black uppercase tracking-widest">
            <Link to="/legal" className="text-slate-400 hover:text-white transition-colors">Términos y Condiciones</Link>
            <Link to="/privacidad" className="text-slate-400 hover:text-white transition-colors">Política de Privacidad</Link>
            <Link to="/contacto" className="text-indigo-400 hover:text-indigo-300 transition-colors">Soporte Técnico</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}