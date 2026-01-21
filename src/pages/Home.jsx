import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PartnersMarquee from "../components/PartnersMarquee.jsx";
import {
    FaBolt, FaGlobe, FaHands, FaArrowRight, FaUniversity,
    FaBuilding, FaChalkboardTeacher, FaQuoteLeft, FaStar, FaUserGraduate
} from "react-icons/fa";
import { BsStars, BsArrowRightCircleFill, BsPlayCircle } from "react-icons/bs";
import { HiOutlineUserGroup } from "react-icons/hi";
import { IoSchoolOutline } from "react-icons/io5";

/* --- ANIMATION VARIANTS (Staggered Reveal) --- */
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1, // Escalonado rápido
            delayChildren: 0.2
        }
    }
};

const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: { type: "spring", stiffness: 50, damping: 20 }
    }
};

/* --- DATA: TESTIMONIOS --- */
const TESTIMONIALS = [
    {
        name: "Javier M.",
        program: "Preu PAES",
        quote: "Pasé de 450 a 810 puntos. No solo te enseñan a responder, te enseñan a pensar.",
        rating: 5,
    },
    {
        name: "Daniela R.",
        program: "LSCh Intermedio",
        quote: "Fernanda es una profesora excelente. Aprendí cultura sorda con una pedagogía muy paciente.",
        rating: 5,
    },
    {
        name: "Gerencia RRHH",
        program: "Corporate",
        quote: "Resultados inmediatos en el equipo de ventas. Gestión impecable y profesionalismo.",
        rating: 5,
    },
];

const RatingStars = ({ count }) => (
    <div className="flex gap-1 text-amber-400 text-sm">
        {[...Array(5)].map((_, i) => (
            <FaStar key={i} className={i < count ? "fill-current" : "text-slate-700"} />
        ))}
    </div>
);

export default function Home() {

    useEffect(() => { window.scrollTo(0, 0); }, []);

    return (
        <div className="bg-[#020617] text-slate-200 font-sans overflow-x-hidden selection:bg-amber-500/30">

            {/* ─────────────────────────────────────────────────────────────
          1. HERO SECTION (Premium Glow + Motion)
         ───────────────────────────────────────────────────────────── */}
            <section className="relative min-h-[90vh] flex items-center justify-center pt-20 overflow-hidden">
                {/* Ambient Glow */}
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,_rgba(56,189,248,0.15)_0%,_transparent_70%)] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#020617] to-transparent pointer-events-none" />

                <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">

                    <motion.div
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-amber-400 mb-8 shadow-2xl backdrop-blur-md"
                    >
                        <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shadow-[0_0_10px_#fbbf24]"></span>
                        Admisión 2026 Abierta
                    </motion.div>

                    <motion.h1
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="text-5xl md:text-7xl lg:text-8xl font-serif font-medium text-white leading-[1.1] mb-8 tracking-tight"
                    >
                        Excelencia Académica.<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600 font-bold">Principios Eternos.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed"
                    >
                        Un ecosistema educativo integral donde formamos el intelecto sin descuidar el espíritu.
                        Desde preuniversitario hasta capacitación corporativa.
                    </motion.p>

                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="flex flex-col sm:flex-row gap-5 justify-center items-center"
                    >
                        <Link to="/inscripcion" className="group relative px-8 py-4 bg-amber-400 text-black font-bold rounded-full text-lg shadow-[0_0_0_4px_rgba(251,191,36,0.1)] hover:shadow-[0_0_20px_rgba(251,191,36,0.6)] hover:scale-105 transition-all duration-300 overflow-hidden">
                            <span className="relative z-10">Postular Ahora</span>
                            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-12" />
                        </Link>

                        <Link to="/nosotros" className="flex items-center gap-3 px-8 py-4 rounded-full border border-white/10 text-white font-medium hover:bg-white/5 hover:border-white/30 transition-all group">
                            <BsPlayCircle className="text-xl group-hover:text-amber-400 transition-colors" /> Nuestra Visión
                        </Link>
                    </motion.div>

                    {/* Stats Rápidos */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8, duration: 1 }}
                        className="mt-16 flex justify-center gap-8 text-sm text-slate-500 font-medium tracking-wide uppercase"
                    >
                        <div><strong className="text-white">+3.000</strong> Alumnos</div>
                        <div className="w-px h-4 bg-white/10"></div>
                        <div><strong className="text-white">100%</strong> Online</div>
                        <div className="w-px h-4 bg-white/10"></div>
                        <div><strong className="text-white">4.9/5</strong> Satisfacción</div>
                    </motion.div>
                </div>
            </section>

            {/* ─────────────────────────────────────────────────────────────
          2. PARTNERS STRIP
         ───────────────────────────────────────────────────────────── */}
            <section className="bg-black py-4 border-y border-white/5 relative z-20">
                <div className="text-center text-[10px] font-bold uppercase tracking-[0.2em] text-slate-600 mb-4">Confían en nuestra metodología</div>
                <PartnersMarquee speed={40} height={40} gap={80} />
            </section>

            {/* ─────────────────────────────────────────────────────────────
          3. ACADEMIC HUB (BENTO GRID REVEAL)
         ───────────────────────────────────────────────────────────── */}
            <section className="py-24 bg-[#020617] relative">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <span className="text-amber-500 font-bold uppercase tracking-widest text-xs mb-3 block">Nuestra Oferta Académica</span>
                        <h2 className="text-4xl md:text-5xl font-serif text-white">Elige tu camino de crecimiento</h2>
                    </div>

                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[300px]"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                    >

                        {/* A. PAES (Large Card) */}
                        <motion.div variants={itemVariants} className="md:col-span-2 relative group overflow-hidden rounded-3xl bg-gradient-to-br from-[#0f172a] to-[#1e293b] border border-white/10 hover:border-amber-500/50 transition-colors duration-500">
                            <Link to="/paes" className="absolute inset-0 p-8 md:p-10 flex flex-col justify-end z-20">
                                <div className="text-xs font-bold text-amber-400 uppercase tracking-widest mb-2">Preuniversitario</div>
                                <h3 className="text-3xl font-bold text-white mb-3 font-serif">Preu PAES 2026</h3>
                                <p className="text-slate-400 max-w-md mb-6 leading-relaxed">Metodología intensiva con tutorías personalizadas. No solo nos enfocamos en el contenido, sino en la estrategia.</p>
                                <div className="inline-flex items-center gap-2 text-white font-bold group-hover:gap-4 transition-all">
                                    Ver Planes <FaArrowRight className="text-amber-400" />
                                </div>
                            </Link>
                            {/* Background Icon Effect */}
                            <FaBolt className="absolute -top-10 -right-10 text-[18rem] text-white/5 group-hover:text-amber-400/10 group-hover:rotate-12 transition-all duration-700 z-10" />
                        </motion.div>

                        {/* B. IDIOMAS */}
                        <motion.div variants={itemVariants} className="relative group overflow-hidden rounded-3xl bg-[#0f172a] border border-white/10 hover:border-emerald-500/50 transition-colors duration-500">
                            <Link to="/idiomas" className="absolute inset-0 p-8 flex flex-col justify-end z-20">
                                <div className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-2">Global</div>
                                <h3 className="text-2xl font-bold text-white mb-2 font-serif">Idiomas</h3>
                                <p className="text-slate-400 text-sm leading-relaxed mb-4">Inglés y Coreano con certificación. Rompe fronteras.</p>
                            </Link>
                            <FaGlobe className="absolute -top-6 -right-6 text-[10rem] text-white/5 group-hover:text-emerald-500/10 group-hover:scale-110 transition-all duration-700 z-10" />
                        </motion.div>

                        {/* C. LSCH */}
                        <motion.div variants={itemVariants} className="relative group overflow-hidden rounded-3xl bg-[#0f172a] border border-white/10 hover:border-purple-500/50 transition-colors duration-500">
                            <Link to="/lsch" className="absolute inset-0 p-8 flex flex-col justify-end z-20">
                                <div className="text-xs font-bold text-purple-400 uppercase tracking-widest mb-2">Inclusión</div>
                                <h3 className="text-2xl font-bold text-white mb-2 font-serif">Lengua de Señas</h3>
                                <p className="text-slate-400 text-sm leading-relaxed mb-4">Conecta con la cultura sorda desde el respeto.</p>
                            </Link>
                            <FaHands className="absolute -top-6 -right-6 text-[10rem] text-white/5 group-hover:text-purple-500/10 group-hover:scale-110 transition-all duration-700 z-10" />
                        </motion.div>

                        {/* D. HOMESCHOOL (Wide Card) */}
                        <motion.div variants={itemVariants} className="md:col-span-2 relative group overflow-hidden rounded-3xl bg-[#0f172a] border border-white/10 hover:border-rose-500/50 transition-colors duration-500 flex items-center">
                            <Link to="/homeschool" className="w-full h-full p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 z-20">
                                <div className="flex-1">
                                    <div className="text-xs font-bold text-rose-400 uppercase tracking-widest mb-2">Lael Academy</div>
                                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 font-serif">Homeschool & Tutorías</h3>
                                    <p className="text-slate-400 leading-relaxed">Apoyo académico personalizado para exámenes libres. Educación a tu ritmo.</p>
                                </div>
                                <div className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center text-white group-hover:bg-rose-500 group-hover:border-rose-500 group-hover:text-black transition-all">
                                    <FaArrowRight size={20} />
                                </div>
                            </Link>
                            <FaUserGraduate className="absolute -bottom-10 right-20 text-[12rem] text-white/5 group-hover:text-rose-500/10 transition-all duration-700 z-10" />
                        </motion.div>

                    </motion.div>
                </div>
            </section>

            {/* ─────────────────────────────────────────────────────────────
          4. DIVISIÓN CORPORATIVA Y SOCIAL
         ───────────────────────────────────────────────────────────── */}
            <section className="py-20 bg-black/40">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">

                    {/* EMPRESAS */}
                    <Link to="/empresas" className="group relative h-[400px] rounded-3xl overflow-hidden border border-white/10">
                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800')] bg-cover bg-center transition-transform duration-700 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-90" />

                        <div className="absolute inset-0 p-10 flex flex-col justify-end">
                            <FaBuilding className="text-4xl text-amber-400 mb-4 drop-shadow-[0_0_15px_rgba(251,191,36,0.5)]" />
                            <h3 className="text-3xl font-serif text-white mb-2">Para Empresas</h3>
                            <p className="text-slate-300 mb-6 max-h-0 opacity-0 group-hover:max-h-20 group-hover:opacity-100 transition-all duration-500 overflow-hidden">
                                Capacitación corporativa de alto nivel, inglés de negocios y desarrollo de habilidades blandas.
                            </p>
                            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest flex items-center gap-2">Soluciones B2B <FaArrowRight /></span>
                        </div>
                    </Link>

                    {/* ADULTOS */}
                    <Link to="/escuela-adultos" className="group relative h-[400px] rounded-3xl overflow-hidden border border-white/10">
                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800')] bg-cover bg-center transition-transform duration-700 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-90" />

                        <div className="absolute inset-0 p-10 flex flex-col justify-end">
                            <IoSchoolOutline className="text-4xl text-amber-400 mb-4 drop-shadow-[0_0_15px_rgba(251,191,36,0.5)]" />
                            <h3 className="text-3xl font-serif text-white mb-2">Nivelación de Estudios</h3>
                            <p className="text-slate-300 mb-6 max-h-0 opacity-0 group-hover:max-h-20 group-hover:opacity-100 transition-all duration-500 overflow-hidden">
                                Nunca es tarde. Termina tu 4to medio con nuestro programa 2x1 enfocado 100% en adultos trabajadores.
                            </p>
                            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest flex items-center gap-2">Ver Programa <FaArrowRight /></span>
                        </div>
                    </Link>

                </div>
            </section>

            {/* ─────────────────────────────────────────────────────────────
          5. TESTIMONIOS
         ───────────────────────────────────────────────────────────── */}
            <section className="py-24 bg-[#0f172a] border-y border-white/5">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                        <div>
                            <span className="text-amber-500 font-bold uppercase tracking-widest text-xs mb-2 block"><FaUserGraduate className="inline mr-2" />Historias Reales</span>
                            <h2 className="text-3xl md:text-5xl font-serif text-white">Nuestros alumnos hablan</h2>
                        </div>
                        <div className="hidden md:block h-px w-32 bg-white/10 mb-4"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {TESTIMONIALS.map((t, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-[#020617] border border-white/5 p-8 rounded-2xl hover:border-amber-500/30 transition-colors"
                            >
                                <div className="flex justify-between items-start mb-6">
                                    <FaQuoteLeft className="text-2xl text-amber-500/20" />
                                    <RatingStars count={t.rating} />
                                </div>
                                <p className="text-slate-300 text-lg leading-relaxed italic mb-6">"{t.quote}"</p>
                                <div className="border-t border-white/5 pt-4">
                                    <strong className="block text-white font-serif text-lg">{t.name}</strong>
                                    <span className="text-xs text-slate-500 uppercase tracking-wider">{t.program}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─────────────────────────────────────────────────────────────
          6. TALENTO HUMANO
         ───────────────────────────────────────────────────────────── */}
            <section className="py-24 bg-black relative overflow-hidden text-center">
                {/* Background Gradients */}
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-black to-black pointer-events-none"></div>

                <div className="relative z-10 max-w-4xl mx-auto px-6">
                    <h2 className="text-4xl md:text-6xl font-serif text-white mb-6">Mentores, no solo profesores.</h2>
                    <p className="text-xl text-slate-400 mb-12 leading-relaxed">
                        En Lael, seleccionamos a nuestro equipo no solo por su currículum,
                        sino por su corazón y capacidad de inspirar a la siguiente generación.
                    </p>

                    <div className="flex justify-center gap-4 mb-20 flex-wrap">
                        <Link to="/docentes" className="px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-amber-400 transition-colors">
                            Ver Equipo Docente
                        </Link>
                        <Link to="/trabaja" className="px-8 py-3 border border-white/20 text-white font-medium rounded-full hover:bg-white/5 hover:border-white transition-colors">
                            Trabaja con nosotros
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-white/10 pt-12">
                        <div className="flex flex-col items-center gap-4">
                            <FaChalkboardTeacher className="text-5xl text-amber-500 mb-2" />
                            <span className="text-slate-300">Profesionales Titulados<br />y Especialistas</span>
                        </div>
                        <div className="flex flex-col items-center gap-4 border-l-0 md:border-l border-white/10">
                            <HiOutlineUserGroup className="text-5xl text-amber-500 mb-2" />
                            <span className="text-slate-300">Mentoring 1 a 1<br />y Valores Cristianos</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─────────────────────────────────────────────────────────────
          7. FINAL CTA
         ───────────────────────────────────────────────────────────── */}
            <section className="py-24 bg-[#020617] border-t border-white/10 text-center">
                <div className="max-w-5xl mx-auto px-6">
                    <BsStars className="text-4xl text-amber-400 mx-auto mb-6 animate-pulse" />
                    <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">¿Listo para dar el siguiente paso?</h2>
                    <p className="text-xl text-slate-400 mb-16">
                        Ya sea que busques un convenio institucional o inscribirte como alumno.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Link to="/inscripcion" className="bg-amber-500 rounded-2xl p-8 text-left hover:-translate-y-2 transition-transform shadow-[0_0_30px_rgba(251,191,36,0.2)] group">
                            <h3 className="text-2xl font-bold text-black mb-2">Inscripción Online</h3>
                            <p className="text-black/80 mb-8">Reserva tu matrícula hoy mismo en 3 pasos simples.</p>
                            <div className="w-12 h-12 bg-black/10 rounded-full flex items-center justify-center text-black group-hover:bg-black group-hover:text-amber-500 transition-colors">
                                <BsArrowRightCircleFill size={24} />
                            </div>
                        </Link>

                        <Link to="/convenios" className="bg-[#0f172a] border border-white/10 rounded-2xl p-8 text-left hover:border-amber-500 transition-colors group">
                            <h3 className="text-xl font-bold text-white mb-2">Convenios</h3>
                            <p className="text-slate-400 text-sm mb-8">Alianzas estratégicas para colegios e instituciones.</p>
                            <FaUniversity className="text-3xl text-amber-500/50 group-hover:text-amber-500 transition-colors" />
                        </Link>

                        <Link to="/pagos" className="bg-[#0f172a] border border-white/10 rounded-2xl p-8 text-left hover:border-amber-500 transition-colors group">
                            <h3 className="text-xl font-bold text-white mb-2">Portal de Pagos</h3>
                            <p className="text-slate-400 text-sm mb-8">Gestión financiera simple y segura para apoderados.</p>
                            <span className="text-xs text-slate-500 uppercase tracking-widest group-hover:text-amber-500 transition-colors">Ir al portal →</span>
                        </Link>
                    </div>
                </div>
            </section>

        </div>
    );
}