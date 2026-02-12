import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";

// Components
import BackgroundAurora from "../components/BackgroundAurora";
import Testimonials from "../components/Testimonials";
import ActivityTicker from "../components/ActivityTicker";

// Icons (Lucide React)
import { 
  Rocket, 
  Globe, 
  Laptop, 
  GraduationCap, 
  CheckCircle, 
  MessageCircle, // Replacing FaWhatsapp
  ArrowRight,
  BookOpen
} from "lucide-react";

// Assets
import logoDorado from "../assets/img/Logos/lael-inst-amarillo.png";

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

const BentoCard = ({ to, title, description, icon, className, size = "small" }) => (
  <motion.div
    variants={itemVariants}
    whileHover={{ scale: 1.02, borderColor: "rgba(99, 102, 241, 0.4)" }}
    className={`relative group overflow-hidden rounded-[2.5rem] border border-white/5 bg-slate-900/40 backdrop-blur-xl p-8 flex flex-col justify-between transition-all cursor-pointer ${className}`}
  >
    <Link to={to} className="absolute inset-0 z-10" />
    <div className="relative z-0">
      <div className={`mb-6 p-4 rounded-2xl inline-flex items-center justify-center bg-white/5 text-indigo-400 group-hover:bg-indigo-500/20 group-hover:text-indigo-400 transition-colors`}>
        {/* Render Icon Clone with Size */}
        {React.cloneElement(icon, { size: size === "large" ? 40 : 28 })}
      </div>
      <h3 className={`font-black text-white uppercase tracking-tighter mb-2 ${size === "large" ? "text-3xl md:text-4xl" : "text-xl"}`}>
        {title}
      </h3>
      <p className="text-slate-400 font-medium leading-relaxed">
        {description}
      </p>
    </div>
    <div className="mt-8 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity">
      Explorar Mundo <ArrowRight size={14} />
    </div>
    {/* Hover Glow Effect */}
    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
  </motion.div>
);

export default function Home() {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 200]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-indigo-500/30 overflow-x-hidden relative">
      
      {/* ──────────────── 0. BACKGROUND AURORA ──────────────── */}
      <BackgroundAurora />

      {/* ──────────────── A. TOP BANNER (URGENCY) ──────────────── */}
      <div className="fixed top-0 left-0 w-full z-[100] bg-gradient-to-r from-pink-600 to-rose-600 py-3 px-4 shadow-lg shadow-pink-600/20">
        <p className="text-center text-white text-[10px] md:text-xs font-black uppercase tracking-[0.2em]">
          🔥 MATRÍCULAS 2026 ABIERTAS | Descuento Early Bird por tiempo limitado.
        </p>
      </div>

      {/* ──────────────── B. HERO SECTION (LA PROMESA) ──────────────── */}
      <header className="relative pt-32 pb-20 px-6 overflow-hidden min-h-[90vh] flex flex-col justify-center">
        <div className="container mx-auto max-w-5xl text-center relative z-10">
          
          <motion.div style={{ y: heroY, opacity: heroOpacity }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, type: "spring" }}
              className="mb-10 flex justify-center"
            >
              <img src={logoDorado} alt="Instituto Lael" className="w-20 md:w-24 drop-shadow-[0_0_30px_rgba(99,102,241,0.5)]" />
            </motion.div>
  
            <h1 className="text-6xl md:text-9xl font-black text-white tracking-tighter uppercase leading-[0.85] mb-8">
              <motion.span 
                initial={{ opacity: 0, y: 50 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.2 }}
                className="block"
              >
                El Futuro
              </motion.span>
              <motion.span 
                initial={{ opacity: 0, y: 50 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.4 }}
                className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-white to-pink-400 animate-gradient-x"
              >
                Es Tuyo.
              </motion.span>
            </h1>
  
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-lg md:text-2xl text-slate-300 font-light max-w-3xl mx-auto mb-12 leading-relaxed text-balance"
            >
              No somos solo un instituto. Somos el ecosistema educativo más avanzado de Chile. 
              Preuniversitario, Idiomas, Colegio Online y Capacitación en un solo lugar.
            </motion.p>
  
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, type: "spring" }}
              className="flex justify-center"
            >
              <a 
                href="https://wa.me/56931379968" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative px-10 py-5 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-2xl transition-all shadow-2xl shadow-indigo-600/30 uppercase tracking-widest text-sm flex items-center gap-3 hover:-translate-y-1"
              >
                <div className="absolute inset-0 bg-white/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-50 transition-opacity" />
                <MessageCircle className="text-xl group-hover:rotate-12 transition-transform relative z-10" />
                <span className="relative z-10">Hablar con un Asesor</span>
              </a>
            </motion.div>
          </motion.div>

        </div>
      </header>

      {/* ──────────────── C. THE BENTO GRID (PRODUCTOS) ──────────────── */}
      <section className="container mx-auto px-6 max-w-7xl mb-32 relative z-10">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-6 auto-rows-[minmax(200px,auto)]"
        >
          
          {/* Tarjeta 1 (Grande - Focus Principal): PREU PAES */}
          <BentoCard 
            to="/paes"
            title="Preu PAES"
            description="Asegura tu puntaje con Simuladores IA y Coaching Estratégico."
            icon={<Rocket />}
            className="md:col-span-2 md:row-span-2 border-indigo-500/20 bg-indigo-900/10"
            size="large"
          />

          {/* Tarjeta 2 (Mediana): IDIOMAS */}
          <BentoCard 
            to="/idiomas"
            title="Idiomas"
            description="Inglés y Coreano. Viaja, conecta y trabaja sin fronteras."
            icon={<Globe />}
            className="md:col-span-2 border-emerald-500/20 bg-emerald-900/10"
          />

          {/* Tarjeta 3 (Mediana): LAEL ACADEMY */}
          <BentoCard 
            to="/homeschool"
            title="Lael Academy"
            description="Homeschool Cristiano & Refuerzo Académico. Valores + Excelencia."
            icon={<GraduationCap />}
            className="md:col-span-2 border-amber-500/20 bg-amber-900/10"
          />

          {/* Tarjeta 4 (Pequeña): LSCh */}
          <BentoCard 
            to="/lsch"
            title="LSCh"
            description="Cultura Sorda y Gramática Visual."
            icon={<CheckCircle />}
            className="md:col-span-1 border-teal-500/20 bg-teal-900/10"
          />

          {/* Tarjeta 5 (Pequeña): ESCUELA 2x1 */}
          <BentoCard 
            to="/escuela-adultos"
            title="Escuela 2x1"
            description="Termina tu 4to medio 100% Online."
            icon={<BookOpen />}
            className="md:col-span-1 border-blue-500/20 bg-blue-900/10"
          />

          {/* Tarjeta 6 (Pequeña): EMPRESAS */}
          <BentoCard 
            to="/empresas"
            title="Empresas"
            description="Capacitación B2B con ROI medible."
            icon={<Laptop />}
            className="md:col-span-2 border-slate-500/20 bg-slate-800/20"
          />

        </motion.div>
      </section>

      {/* ──────────────── D. SECCIÓN DE CONFIANZA (SOCIAL PROOF) ──────────────── */}
      <section className="py-32 relative z-10">
        <div className="absolute inset-0 bg-slate-900/50 -skew-y-3 transform origin-top-left scale-110 pointer-events-none" />
        
        <div className="container mx-auto px-6 max-w-6xl relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center group"
            >
              <div className="mb-6 p-4 rounded-full bg-indigo-500/10 text-indigo-500 group-hover:scale-110 transition-transform duration-300">
                <Laptop size={48} />
              </div>
              <h4 className="text-xl font-black text-white uppercase tracking-widest mb-4">Tecnología</h4>
              <p className="text-slate-400 leading-relaxed">
                Plataforma propia con <strong className="text-indigo-400">Inteligencia Artificial</strong> diseñada para optimizar tu aprendizaje.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center group"
            >
              <div className="mb-6 p-4 rounded-full bg-pink-500/10 text-pink-500 group-hover:scale-110 transition-transform duration-300">
                <Globe size={48} />
              </div>
              <h4 className="text-xl font-black text-white uppercase tracking-widest mb-4">Flexibilidad</h4>
              <p className="text-slate-400 leading-relaxed">
                Estudia a tu ritmo, <strong className="text-pink-400">100% Online o Híbrido</strong>. Sin horarios rígidos que frenen tu vida.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center group"
            >
              <div className="mb-6 p-4 rounded-full bg-emerald-500/10 text-emerald-500 group-hover:scale-110 transition-transform duration-300">
                <CheckCircle size={48} />
              </div>
              <h4 className="text-xl font-black text-white uppercase tracking-widest mb-4">Comunidad</h4>
              <p className="text-slate-400 leading-relaxed">
                Más de <strong className="text-emerald-400">+1200 Alumnos activos</strong> transformando su realidad educativa hoy mismo.
              </p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ──────────────── E. FOOTER SIMPLE ──────────────── */}
      <footer className="py-12 bg-[#020617] text-center border-t border-white/5 relative z-10">
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