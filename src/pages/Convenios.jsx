import React from "react";
import { motion } from "framer-motion";
import SEOHead from "../components/SEOHead.jsx";
import { Handshake, Building2, GraduationCap, TrendingUp, ArrowRight, Check, Globe } from "lucide-react";

/* ──────────────────────────────────────────────────────────────────────────
   DATA
   ────────────────────────────────────────────────────────────────────────── */
const PARTNERS = [
  { name: "INO", type: "Instituto Nacional de Ortodoncia", color: "bg-blue-500" },
  { name: "Naamá Studio", type: "Potenciación Humana", color: "bg-amber-400" },
  { name: "Los Olivos", type: "Homeschool", color: "bg-lime-500" },
];

const BENEFITS = [
  {
    icon: <GraduationCap />,
    title: "Aranceles Preferenciales",
    desc: "Descuentos exclusivos para tu comunidad en todos nuestros programas PAES e Idiomas."
  },
  {
    icon: <Globe />,
    title: "Valor Agregado",
    desc: "Suma beneficios educativos a tu oferta sin costo operativo. Nosotros gestionamos todo."
  },
  {
    icon: <TrendingUp />,
    title: "Reportes de Gestión",
    desc: "Entregamos informes de asistencia y rendimiento académico para tu rendición de cuentas."
  },
  {
    icon: <Handshake />,
    title: "Co-Branding",
    desc: "Aparición en nuestra web como Partner Oficial y realización de charlas conjuntas."
  }
];

const TARGETS = [
  {
    id: "colegios",
    title: "Colegios y Homeschool",
    subtitle: "Potencia tu rendimiento PAES",
    desc: "Externaliza el reforzamiento académico o brinda un Preuniversitario de calidad a tus licenciados.",
    features: ["Ensayos Masivos", "Charlas Vocacionales", "Nivelación M1"],
    colorClass: "indigo"
  },
  {
    id: "empresas",
    title: "Empresas y Bienestar",
    subtitle: "El mejor beneficio familiar",
    desc: "Apoya a tus colaboradores donde más les importa: el futuro de sus hijos.",
    features: ["Descuento por Planilla", "Inglés Corporativo", "Soft Skills"],
    colorClass: "amber"
  },
  {
    id: "publico",
    title: "Municipios y ONGs",
    subtitle: "Impacto Social Real",
    desc: "Llevemos oportunidades de nivelación de estudios y preparación universitaria a su comuna.",
    features: ["Becas Sociales", "Programa 2x1", "Reinserción"],
    colorClass: "emerald"
  }
];

/* Animation variants */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

/* ──────────────────────────────────────────────────────────────────────────
   COMPONENTE
   ────────────────────────────────────────────────────────────────────────── */
export default function Convenios() {
  const waPartnerLink = `https://wa.me/56964626568?text=${encodeURIComponent("Hola, soy representante de una institución y me interesa generar un convenio.")}`;

  return (
    <div className="min-h-screen bg-[#020617] text-slate-50 font-sans pt-32 pb-20 relative overflow-x-hidden selection:bg-indigo-500/30">
      <SEOHead title="Convenios y Alianzas | Instituto Lael" description="Generamos alianzas estratégicas con colegios y empresas." />

      {/* FONDO AMBIENTAL */}
      <div className="absolute top-[-200px] left-[-200px] w-[800px] h-[800px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-200px] right-[-200px] w-[800px] h-[800px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">

        {/* HERO */}
        <motion.header 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-20 md:mb-32"
        >
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/5 px-4 py-1.5 rounded-full text-sm font-bold text-slate-300 mb-8">
            <span className="text-amber-400"><Handshake size={16} /></span> Red de Impacto Lael
          </div>
          <h1 className="text-5xl md:text-7xl font-black font-display tracking-tighter leading-[0.9] mb-8">
            Crezcamos <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-500">Juntos.</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed font-light">
            Establecemos alianzas con colegios, empresas y fundaciones para democratizar el acceso a la educación.
            <strong className="text-indigo-400 font-bold"> Sin costos ocultos para tu organización.</strong>
          </p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, type: "spring" }}
          >
            <a 
              href={waPartnerLink} 
              target="_blank" 
              rel="noreferrer" 
              className="inline-flex items-center gap-3 bg-indigo-600 text-white px-8 py-4 rounded-full font-bold text-lg transition-all hover:-translate-y-1 hover:bg-indigo-500 shadow-xl shadow-indigo-600/20 active:scale-95"
            >
              Quiero ser Partner <ArrowRight size={20} />
            </a>
          </motion.div>
        </motion.header>

        {/* LOGO STRIP */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-32"
        >
          <p className="text-xs font-black tracking-[0.25em] text-slate-500 mb-8 uppercase">Organizaciones que confían en nosotros</p>
          <div className="flex flex-wrap justify-center gap-4">
            {PARTNERS.map((p, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white/5 border border-white/5 px-6 py-3 rounded-full flex items-center gap-3 transition-colors hover:bg-white/10 hover:border-white/20 cursor-default"
              >
                <span className={`w-2 h-2 rounded-full ${p.color} shadow-[0_0_10px_currentColor]`}></span>
                <div className="text-left">
                  <span className="block font-bold text-sm leading-tight">{p.name}</span>
                  <span className="block text-[10px] text-slate-400 uppercase tracking-widest">{p.type}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* BENEFICIOS */}
        <section className="mb-32">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-black font-display mb-4">¿Por qué aliarse con Lael?</h2>
            <p className="text-slate-400 text-lg">Infraestructura académica lista para implementar.</p>
          </motion.div>
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {BENEFITS.map((b, i) => (
              <motion.div 
                key={i} 
                variants={itemVariants}
                whileHover={{ y: -8, borderColor: "rgba(99, 102, 241, 0.3)" }}
                className="bg-[#0f172a] p-8 rounded-3xl border border-white/5 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-indigo-500/10 text-indigo-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {React.cloneElement(b.icon, { size: 28 })}
                </div>
                <h3 className="text-xl font-bold mb-4">{b.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{b.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* SEGMENTOS */}
        <section className="mb-32">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-black font-display mb-4">Modelos de Colaboración</h2>
            <p className="text-slate-400 text-lg">Adaptamos nuestra propuesta a la naturaleza de tu institución.</p>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {TARGETS.map((t) => {
              const colors = {
                indigo: { border: 'hover:border-indigo-500', header: 'bg-indigo-500/10 text-indigo-300', check: 'text-indigo-400' },
                amber: { border: 'hover:border-amber-500', header: 'bg-amber-500/10 text-amber-300', check: 'text-amber-400' },
                emerald: { border: 'hover:border-emerald-500', header: 'bg-emerald-500/10 text-emerald-300', check: 'text-emerald-400' },
              }[t.colorClass];

              return (
                <motion.div 
                  key={t.id} 
                  variants={itemVariants}
                  whileHover={{ y: -4 }}
                  className={`bg-[#0f172a] border border-white/5 rounded-3xl overflow-hidden flex flex-col transition-all duration-300 hover:shadow-2xl ${colors.border}`}
                >
                  <div className={`p-8 border-b border-white/5 ${colors.header}`}>
                    <span className="text-xs font-black uppercase tracking-widest opacity-80 mb-2 block">{t.subtitle}</span>
                    <h3 className="text-2xl font-black font-display italic">{t.title}</h3>
                  </div>
                  <div className="p-8 flex-1 flex flex-col">
                    <p className="text-slate-400 mb-8 text-sm leading-relaxed flex-1">{t.desc}</p>
                    <ul className="space-y-4">
                      {t.features.map((f, i) => (
                        <li key={i} className="flex items-center gap-3 text-sm font-medium text-slate-200">
                          <Check className={colors.check} size={16} /> {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </section>

        {/* CTA FINAL */}
        <motion.section 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl p-12 md:p-20 text-center bg-gradient-to-br from-[#1e1b4b] to-[#312e81]"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_rgba(99,102,241,0.4),_transparent_70%)] pointer-events-none" />
          
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-black font-display mb-6">¿Listo para formalizar una alianza?</h2>
            <p className="text-indigo-200 text-lg mb-10 max-w-2xl mx-auto">
              La gestión es rápida, 100% digital y enfocada en el beneficio mutuo. Hablemos hoy mismo.
            </p>
            <a 
              href={waPartnerLink} 
              target="_blank" 
              rel="noreferrer" 
              className="inline-flex items-center gap-3 bg-white text-[#1e1b4b] px-10 py-5 rounded-full font-bold text-lg transition-all hover:scale-105 shadow-xl shadow-white/10"
            >
              <Building2 size={20} /> Agendar Reunión
            </a>
          </div>
        </motion.section>

      </div>
    </div>
  );
}