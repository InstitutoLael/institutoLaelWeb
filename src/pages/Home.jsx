import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// Components
import SEOHead from "../components/SEOHead.jsx";
import PartnersMarquee from "../components/PartnersMarquee.jsx";
import LiveActivityTicker from "../components/LiveActivityTicker.jsx";

// Icons
import {
    FaBolt, FaGlobe, FaHands, FaArrowRight, FaUniversity,
    FaBuilding, FaChalkboardTeacher, FaQuoteLeft, FaStar, FaUserGraduate,
    FaCalendarAlt, FaQuoteRight, FaBookOpen, FaGamepad, FaChartLine, FaLifeRing,
    FaYoutube, FaPlay, FaRocket
} from "react-icons/fa";
import { BsStars, BsArrowRightCircleFill, BsPlayCircle, BsLightningChargeFill } from "react-icons/bs";
import { HiOutlineUserGroup } from "react-icons/hi";
import { IoSchoolOutline } from "react-icons/io5";
import { MdVerified, MdDashboardCustomize } from "react-icons/md";

// Data
import { TESTIMONIALS } from "../data/testimonials";

// --- QUOTES DATA ---
const MOTIVATIONAL_QUOTES = [
    "La educación es el arma más poderosa para cambiar el mundo. - Nelson Mandela",
    "El éxito consiste en ir de fracaso en fracaso sin perder el entusiasmo. - Winston Churchill",
    "No juzgues cada día por lo que cosechas, sino por las semillas que plantas. - Robert Louis Stevenson",
    "La mente que se abre a una nueva idea, jamás volverá a su tamaño original. - Albert Einstein",
    "Cree que puedes y casi habrás llegado. - Theodore Roosevelt",
    "Educar es redimir. - Instituto Lael Vision 2026",
];

// --- HELPERS ---
function calculateDaysToPAES() {
    const goal = new Date("2026-06-15"); // PAES Invierno 2026
    const now = new Date();
    const diff = goal - now;
    return Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
}

const RatingStars = ({ count }) => (
    <div className="flex gap-1 text-amber-400 text-sm">
        {[...Array(5)].map((_, i) => (
            <FaStar key={i} className={i < count ? "fill-current" : "text-slate-700"} />
        ))}
    </div>
);

export default function Home() {
    const [daysLeft, setDaysLeft] = useState(0);
    const [quote, setQuote] = useState("");

    useEffect(() => {
        window.scrollTo(0, 0);
        setDaysLeft(calculateDaysToPAES());
        setQuote(MOTIVATIONAL_QUOTES[Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)]);
    }, []);

    const featuredTestimonials = TESTIMONIALS.filter(t => t.featured).slice(0, 3);

    return (
        <div className="bg-[#020617] text-slate-200 font-sans overflow-x-hidden selection:bg-amber-500/30">
            <SEOHead title="Preuniversitario, Idiomas y Nivelación" description="Preuniversitario PAES, Cursos de Idiomas y Nivelación de Estudios. Educación online con acompañamiento real." />

            {/* ──────────────── 1. HERO SECTION "3 MUNDOS" (ECOSYSTEMS) ──────────────── */}
            <section className="relative min-h-screen flex flex-col items-center justify-center py-20 overflow-hidden px-6">

                {/* Immersive Background Layers */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-indigo-600/10 blur-[40px] md:blur-[60px] rounded-full"></div>
                    <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-amber-500/5 blur-[40px] md:blur-[60px] rounded-full"></div>
                    <div className="absolute inset-0 opacity-20 bg-[url('/textures/cubes.png')] bg-repeat"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto text-center w-full">

                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="mb-8"
                    >
                        <LiveActivityTicker />
                    </motion.div>

                    <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-4 leading-tight">
                        Tu futuro no tiene que esperar. <br className="hidden md:block" />
                        <span className="text-amber-500">Elige cómo quieres crecer hoy.</span>
                    </h1>
                    <p className="text-xl text-slate-400 mb-16 max-w-2xl mx-auto">
                        En Instituto Lael unimos tecnología y educación para que logres tus metas, sin importar si tienes 17 o 50 años.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* MUNDO 1: PAES (Adolescente) */}
                        <motion.div
                            whileHover={{ y: -10 }}
                            className="bg-indigo-600/10 border border-indigo-500/20 rounded-[2.5rem] p-8 md:p-12 hover:bg-indigo-600/20 hover:border-indigo-500/40 transition-all group relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                                <FaRocket size={100} />
                            </div>
                            <div className="relative z-10 flex flex-col h-full justify-between items-start text-left">
                                <div>
                                    <div className="bg-indigo-500 text-white text-[10px] font-black uppercase px-3 py-1 rounded-full mb-6 inline-block">Preuniversitario PAES</div>
                                    <h3 className="text-4xl font-black text-white mb-2 uppercase tracking-tighter">PAES 2026</h3>
                                    <p className="text-sm text-slate-300 mb-8 leading-relaxed">
                                        No estudies más, estudia mejor. Simuladores, estrategias y el puntaje que necesitas.
                                    </p>
                                </div>
                                <Link to="/paes" className="w-full py-4 bg-indigo-600 text-white font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-600/20">
                                    Ver Planes PAES <FaArrowRight />
                                </Link>
                            </div>
                        </motion.div>

                        {/* MUNDO 2: IDIOMAS (Viajeros/Global) */}
                        <motion.div
                            whileHover={{ y: -10 }}
                            className="bg-emerald-600/10 border border-emerald-500/20 rounded-[2.5rem] p-8 md:p-12 hover:bg-emerald-600/20 hover:border-emerald-500/40 transition-all group relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                                <FaGlobe size={100} />
                            </div>
                            <div className="relative z-10 flex flex-col h-full justify-between items-start text-left">
                                <div>
                                    <div className="bg-emerald-500 text-slate-950 text-[10px] font-black uppercase px-3 py-1 rounded-full mb-6 inline-block">Escuela de Idiomas</div>
                                    <h3 className="text-4xl font-black text-white mb-2 uppercase tracking-tighter">Idiomas</h3>
                                    <p className="text-sm text-slate-300 mb-8 leading-relaxed">
                                        Inglés, Coreano y Español. Rompe la barrera del idioma y conéctate con el mundo.
                                    </p>
                                </div>
                                <Link to="/idiomas" className="w-full py-4 bg-emerald-600 text-white font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-emerald-500 transition-colors shadow-lg shadow-emerald-600/20">
                                    Elegir mi Idioma <FaArrowRight />
                                </Link>
                            </div>
                        </motion.div>

                        {/* MUNDO 3: ESCUELA ADULTOS (Oportunidad) */}
                        <motion.div
                            whileHover={{ y: -10 }}
                            className="bg-amber-600/10 border border-amber-500/20 rounded-[2.5rem] p-8 md:p-12 hover:bg-amber-600/20 hover:border-amber-500/40 transition-all group relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                                <FaUserGraduate size={100} />
                            </div>
                            <div className="relative z-10 flex flex-col h-full justify-between items-start text-left">
                                <div>
                                    <div className="bg-amber-500 text-slate-950 text-[10px] font-black uppercase px-3 py-1 rounded-full mb-6 inline-block">Escuela de Adultos (2en1)</div>
                                    <h3 className="text-3xl font-black text-white mb-2 uppercase tracking-tighter">Escuela Adultos</h3>
                                    <p className="text-sm text-slate-300 mb-8 leading-relaxed">
                                        Recupera tu tiempo. Saca tu 4to medio y abre puertas laborales con nuestro programa de nivelación.
                                    </p>
                                </div>
                                <Link to="/escuela-adultos" className="w-full py-4 bg-amber-500 text-slate-950 font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-amber-400 transition-colors shadow-lg shadow-amber-500/20">
                                    Terminar mis Estudios <FaArrowRight />
                                </Link>
                            </div>
                        </motion.div>
                    </div>

                    <div className="mt-12 flex justify-center">
                        <Link to="/homeschool" className="text-slate-400 hover:text-white text-sm font-bold uppercase tracking-widest flex items-center gap-2 transition-colors">
                            <FaBookOpen /> Buscar Homeschooling (Niños) <FaArrowRight />
                        </Link>
                    </div>

                </div>
            </section>



            {/* ──────────────── 3. PARTNERS STRIP ──────────────── */}
            <section className="bg-black py-4 border-y border-white/5 relative z-20">
                <div className="text-center text-[10px] font-bold uppercase tracking-[0.2em] text-slate-600 mb-4">Confían en nuestra metodología corporativa</div>
                <PartnersMarquee speed={40} height={40} gap={80} />
            </section>

            {/* ──────────────── 4. ACADEMIC HUB (BENTO GRID) ──────────────── */}
            <section id="catalog" className="py-32 bg-[#020617] relative">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-20">
                        <span className="text-amber-500 font-black uppercase tracking-[0.3em] text-xs mb-4 block">Oferta Académica</span>
                        <h2 className="text-5xl md:text-7xl font-serif font-black text-white tracking-tighter">Camino al <br /> <span className="text-white/20">Crecimiento.</span></h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-[350px]">

                        {/* PAES CARD */}
                        <motion.div className="md:col-span-2 bg-gradient-to-br from-[#0f172a] to-[#1e293b] rounded-[3rem] border border-white/10 overflow-hidden group relative">
                            <Link to="/paes" className="absolute inset-0 p-12 flex flex-col justify-end z-20">
                                <div className="flex items-center gap-3 text-amber-400 font-black text-xs uppercase tracking-widest mb-4">
                                    <FaChartLine /> Preuniversitario
                                </div>
                                <h3 className="text-5xl font-black text-white mb-4 uppercase tracking-tighter">Preu PAES 2026</h3>
                                <p className="text-slate-400 max-w-md mb-8 leading-relaxed font-light">Estrategia, contenidos y simulacros de alta fidelidad. Tu puntaje nacional empieza aquí.</p>
                                <div className="flex items-center gap-3 text-white font-black uppercase text-xs tracking-[0.2em] group-hover:gap-6 transition-all">
                                    Ver Planes de Élite <FaArrowRight />
                                </div>
                            </Link>
                            <FaBolt className="absolute -top-10 -right-10 text-[25rem] text-white/5 group-hover:text-amber-400/10 group-hover:rotate-12 transition-all duration-1000 z-10" />
                        </motion.div>

                        {/* IDIOMAS */}
                        <div className="bg-[#0f172a] rounded-[3rem] border border-white/10 overflow-hidden relative group">
                            <Link to="/idiomas" className="absolute inset-0 p-10 flex flex-col justify-end z-20">
                                <div className="text-emerald-400 font-black text-xs uppercase tracking-widest mb-4">Academia Global</div>
                                <h3 className="text-3xl font-black text-white mb-2 uppercase tracking-tighter">Idiomas</h3>
                                <p className="text-slate-500 text-sm leading-relaxed mb-8">Inglés y Coreano con metodología de inmersión total.</p>
                                <div className="text-white font-black uppercase text-[10px] tracking-widest group-hover:text-emerald-400 transition-colors flex items-center gap-2">Explorar <FaArrowRight /></div>
                            </Link>
                            <FaGlobe className="absolute -top-10 -right-10 text-[18rem] text-white/5 opacity-40 group-hover:scale-110 transition-transform duration-1000" />
                        </div>

                        {/* LSCH */}
                        <div className="bg-[#0f172a] rounded-[3rem] border border-white/10 overflow-hidden relative group">
                            <Link to="/lsch" className="absolute inset-0 p-10 flex flex-col justify-end z-20">
                                <div className="text-purple-400 font-black text-xs uppercase tracking-widest mb-4">Inclusión Real</div>
                                <h3 className="text-3xl font-black text-white mb-2 uppercase tracking-tighter">LSCh</h3>
                                <p className="text-slate-500 text-sm leading-relaxed mb-8">Naturaleza, cultura y gramática de la lengua de señas.</p>
                                <div className="text-white font-black uppercase text-[10px] tracking-widest group-hover:text-purple-400 transition-colors flex items-center gap-2">Ver Cursos <FaArrowRight /></div>
                            </Link>
                            <FaHands className="absolute -top-10 -right-10 text-[18rem] text-white/5 opacity-40 group-hover:rotate-12 transition-transform duration-1000" />
                        </div>

                        {/* HOMESCHOOL */}
                        <motion.div className="md:col-span-2 bg-[#080B14] rounded-[3rem] border border-white/10 overflow-hidden group relative">
                            <Link to="/homeschool" className="absolute inset-0 p-12 flex flex-col md:flex-row items-center justify-between gap-12 z-20 text-center md:text-left">
                                <div className="flex-1">
                                    <div className="text-rose-400 font-black text-xs uppercase tracking-widest mb-4">Lael Academy</div>
                                    <h3 className="text-4xl font-black text-white mb-4 uppercase tracking-tighter">Homeschooling</h3>
                                    <p className="text-slate-500 leading-relaxed font-light">Tutorías personalizadas y preparación para exámenes libres. Educación humana al ritmo de tu hijo.</p>
                                </div>
                                 <div className="w-20 h-20 rounded-full border border-white/20 flex items-center justify-center text-white group-hover:bg-rose-500 group-hover:border-rose-500 group-hover:text-black transition-[background-color,border-color,color,transform] duration-500">
                                    <FaArrowRight size={30} />
                                </div>
                            </Link>
                            <FaUserGraduate className="absolute -bottom-10 right-20 text-[15rem] text-white/5 group-hover:text-rose-500/10 transition-all duration-1000" />
                        </motion.div>

                    </div>
                </div>
            </section>
            {/* ──────────────── 4.5 YOUTUBE CHANNEL CALL-TO-ACTION ──────────────── */}
            <section className="py-24 relative overflow-hidden">
                <div className="container mx-auto px-6">
                    <div className="bg-gradient-to-br from-red-600/20 via-slate-900 to-black border border-white/5 rounded-[4rem] p-12 md:p-20 relative overflow-hidden group shadow-2xl">
                        {/* Decorative Glow */}
                        <div className="absolute -right-20 -top-20 w-96 h-96 bg-red-600/10 blur-[120px] rounded-full group-hover:bg-red-600/20 transition-all duration-700"></div>

                        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
                            <div className="text-center lg:text-left max-w-2xl">
                                <div className="inline-flex items-center gap-3 bg-red-600/10 px-6 py-2 rounded-full border border-red-600/20 mb-8">
                                    <FaYoutube className="text-red-500 animate-pulse" />
                                    <span className="text-xs font-black uppercase tracking-[0.2em] text-red-500">Contenido Exclusivo</span>
                                </div>
                                <h2 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tighter leading-tight italic">
                                    Domina la PAES <br /> <span className="text-red-500">En YouTube.</span>
                                </h2>
                                <p className="text-xl text-slate-400 font-light mb-10 leading-relaxed">
                                    Clases gratuitas, resolución de ensayos y tips de última hora. Únete a nuestra comunidad de más de 3.000 suscriptores.
                                </p>
                                <a
                                    href="https://www.youtube.com/channel/UCl0JuF0HlFpQEWPV_tIxV2g"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-4 px-12 py-6 bg-red-600 hover:bg-red-500 text-white font-black rounded-[2rem] text-lg shadow-2xl shadow-red-600/30 transition-all hover:scale-105 active:scale-95 uppercase tracking-widest"
                                >
                                    Suscribirme Gratis <BsPlayCircle />
                                </a>
                            </div>

                            <div className="relative w-full max-w-md aspect-video rounded-3xl overflow-hidden border border-white/10 group-hover:border-red-500/30 transition-all shadow-2xl shadow-black/80">
                                <img
                                    src="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&q=80&w=800"
                                    alt="YouTube Channel"
                                    loading="lazy"
                                    className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                                />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center text-white scale-110 group-hover:scale-125 transition-transform shadow-2xl pl-2">
                                        <FaPlay size={30} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ──────────────── 5. HALL DE LA FAMA (SOCIAL PROOF) ──────────────── */}
            <section className="py-32 bg-[#050505] border-y border-white/5 relative overflow-hidden">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                        <div className="max-w-xl">
                            <span className="text-amber-500 font-black uppercase tracking-[0.3em] text-xs mb-4 block">Social Proof</span>
                            <h2 className="text-5xl md:text-7xl font-sans font-black text-white tracking-tighter">Hall de la <br /> <span className="text-white/20">Fama.</span></h2>
                        </div>
                        <div className="flex items-center gap-4 text-emerald-500 font-bold bg-emerald-500/5 border border-emerald-500/10 px-6 py-3 rounded-2xl text-[10px] uppercase tracking-widest">
                            <RatingStars count={5} /> +3.000 Alumnos Felices
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {[
                            {
                                name: "Sofía A.",
                                quote: "Gracias a Lael subí 150 puntos en Matemáticas. La atención personalizada y el nivel de los profes es de otro planeta.",
                                program: "PAES ANUAL 2026",
                                rating: 5
                            },
                            {
                                name: "Camila A.",
                                quote: "El método de inglés es muy dinámico. Pasé de no entender nada a poder mantener conversaciones fluidas en pocos meses.",
                                program: "INGLÉS FLEXIBLE",
                                rating: 5
                            },
                            {
                                name: "Valentina",
                                quote: "Luego de 3 años rindiendo la PAES, logré entrar a la universidad y carrera que deseaba gracias a la disciplina de Lael.",
                                program: "PAES INTENSIVO",
                                rating: 5
                            }
                        ].map((t, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ y: -15, scale: 1.02 }}
                                className="bg-[#0f172a]/50 border border-white/5 p-12 rounded-[3.5rem] relative shadow-2xl backdrop-blur-3xl group transition-all"
                            >
                                <div className="absolute -top-6 -right-6 w-12 h-12 bg-amber-500 rounded-2xl flex items-center justify-center text-slate-950 shadow-2xl scale-0 group-hover:scale-100 transition-transform">
                                    <FaQuoteRight />
                                </div>
                                <div className="flex justify-between items-start mb-10">
                                    <FaQuoteLeft className="text-4xl text-amber-500/20 group-hover:text-amber-500/40 transition-colors" />
                                    <RatingStars count={t.rating} />
                                </div>
                                <p className="text-xl text-slate-300 font-light italic leading-relaxed mb-10">"{t.quote}"</p>
                                <div className="border-t border-white/5 pt-8">
                                    <strong className="block text-white text-2xl font-black uppercase tracking-tighter mb-1">{t.name}</strong>
                                    <span className="text-[10px] text-amber-500/60 font-black uppercase tracking-widest">{t.program}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ──────────────── 6. FINAL DECISION HUB ──────────────── */}
            <section className="py-40 bg-[#020617] text-center border-t border-white/5">
                <div className="container mx-auto px-6 max-w-6xl">
                    <BsStars className="text-6xl text-amber-500 mx-auto mb-10 animate-pulse" />
                    <h2 className="text-6xl md:text-9xl font-black text-white mb-10 tracking-tighter uppercase leading-[0.8]">
                        Empieza tu <br /><span className="text-white/20">Transformación.</span>
                    </h2>
                    <p className="text-2xl text-slate-500 font-light mb-20 max-w-2xl mx-auto">
                        Toma el mando de tu futuro hoy. Elige el área que resuena con tu propósito.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <Link to="/paes" className="bg-amber-500 group rounded-[3rem] p-12 text-left hover:scale-[1.02] transition-all shadow-2xl shadow-amber-500/20 flex flex-col justify-between h-96">
                            <div>
                                <h3 className="text-4xl font-black text-slate-950 mb-4 uppercase tracking-tighter">Matrículas</h3>
                                <p className="text-slate-900 font-bold leading-relaxed">Reserva tu cupo 2026 ahora. Proceso de inscripción 100% digital.</p>
                            </div>
                            <div className="w-16 h-16 bg-slate-950 rounded-full flex items-center justify-center text-amber-500 group-hover:scale-110 transition-transform">
                                <BsArrowRightCircleFill size={32} />
                            </div>
                        </Link>

                        <Link to="/empresas" className="bg-slate-900 border border-white/5 rounded-[3rem] p-12 text-left hover:border-emerald-500/30 transition-all flex flex-col justify-between h-96 group">
                            <div>
                                <h3 className="text-3xl font-black text-white mb-4 uppercase tracking-tighter">Empresas</h3>
                                <p className="text-slate-500 leading-relaxed">Capacitación con retorno de inversión garantizado.</p>
                            </div>
                            <FaBuilding className="text-5xl text-emerald-500/50 group-hover:text-emerald-500 transition-colors" />
                        </Link>

                        <Link to="/aula" className="bg-slate-900 border border-white/5 rounded-[3rem] p-12 text-left hover:border-indigo-500/30 transition-all flex flex-col justify-between h-96 group">
                            <div>
                                <h3 className="text-3xl font-black text-white mb-4 uppercase tracking-tighter">Plataforma</h3>
                                <p className="text-slate-500 leading-relaxed">Acceso exclusivo para alumnos y apoderados vigentes.</p>
                            </div>
                            <div className="text-[10px] font-black text-indigo-400 uppercase tracking-widest group-hover:translate-x-4 transition-all flex items-center gap-2">Entrar al Aula <FaArrowRight /></div>
                        </Link>
                    </div>
                </div>
            </section>

        </div>
    );
}