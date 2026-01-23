import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import PartnersMarquee from "../components/PartnersMarquee.jsx";
import LiveActivityTicker from "../components/LiveActivityTicker.jsx";
import {
    FaBolt, FaGlobe, FaHands, FaArrowRight, FaUniversity,
    FaBuilding, FaChalkboardTeacher, FaQuoteLeft, FaStar, FaUserGraduate,
    FaCalendarAlt, FaQuoteRight, FaBookOpen, FaGamepad, FaChartLine, FaLifeRing,
    FaYoutube, FaPlay
} from "react-icons/fa";
import { BsStars, BsArrowRightCircleFill, BsPlayCircle, BsLightningChargeFill } from "react-icons/bs";
import { HiOutlineUserGroup } from "react-icons/hi";
import { IoSchoolOutline } from "react-icons/io5";
import { MdVerified, MdDashboardCustomize } from "react-icons/md";

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

            {/* ──────────────── 1. HERO SECTION "VIVA" ──────────────── */}
            <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 overflow-hidden px-6">

                {/* Immersive Background Layers */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-indigo-600/10 blur-[40px] md:blur-[60px] rounded-full"></div>
                    <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-amber-500/5 blur-[40px] md:blur-[60px] rounded-full"></div>
                    <div className="absolute inset-0 opacity-20 bg-[url('/textures/cubes.png')] bg-repeat"></div>
                </div>

                <div className="relative z-10 max-w-5xl mx-auto text-center">

                    {/* Live Component Integration */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="mb-10"
                    >
                        <LiveActivityTicker />
                    </motion.div>

                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-2xl text-amber-400 text-[10px] font-black uppercase tracking-[0.4em] mb-12 shadow-2xl"
                        >
                            <BsLightningChargeFill className="animate-pulse" /> Lael Experience 2.0
                        </motion.div>

                        <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-[10rem] font-black text-white leading-[0.85] tracking-tighter mb-10 pb-4">
                            Educar <br />
                            <span className="bg-gradient-to-r from-amber-200 via-amber-500 to-amber-700 bg-clip-text text-transparent italic">Sin Límites.</span>
                        </h1>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto mb-16 font-light leading-relaxed"
                    >
                        Bienvenido al futuro de la formación. No somos una web, somos tu <span className="text-white font-bold">centro de mando académico</span> diseñado para el éxito 2026.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 1 }}
                        className="flex flex-col sm:flex-row gap-6 justify-center items-center"
                    >
                        <a href="#catalog" className="group relative px-12 py-6 bg-amber-500 text-slate-950 font-black rounded-[2rem] text-xl shadow-2xl shadow-amber-500/20 hover:scale-[1.05] active:scale-95 transition-all duration-500 overflow-hidden">
                            <span className="relative z-10 flex items-center gap-3">Explorar Oferta <FaArrowRight /></span>
                            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
                        </a>

                        <Link to="/nosotros" className="px-12 py-6 rounded-[2rem] border border-white/10 text-white font-black text-xl hover:bg-white/5 backdrop-blur-md transition-all flex items-center gap-3 group">
                            <BsPlayCircle className="text-amber-500 group-hover:rotate-12 transition-transform" /> Nuestra Visión
                        </Link>
                    </motion.div>

                    {/* Stats (Experience 2.0 Style) */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5 }}
                        className="mt-20 flex justify-center flex-wrap gap-12 text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]"
                    >
                        <div className="flex flex-col gap-2">
                            <span className="text-2xl text-white">+3K</span>
                            <span>Alumnos</span>
                        </div>
                        <div className="w-px h-12 bg-white/5"></div>
                        <div className="flex flex-col gap-2">
                            <span className="text-2xl text-white">2026</span>
                            <span>Visión Ready</span>
                        </div>
                        <div className="w-px h-12 bg-white/5"></div>
                        <div className="flex flex-col gap-2">
                            <span className="text-2xl text-white">4.9/5</span>
                            <span>Calificación</span>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ──────────────── 2. DASHBOARD PÚBLICO (SIMULATED INTRANET) ──────────────── */}
            <section className="py-24 relative z-10 -mt-20">
                <div className="container mx-auto px-6">
                    <div className="mb-12 flex items-center gap-4">
                        <div className="p-3 bg-indigo-500/20 rounded-2xl text-indigo-400 text-xl border border-indigo-500/30">
                            <MdDashboardCustomize />
                        </div>
                        <div>
                            <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Campus Virtual</h2>
                            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Dashboard de acceso rápido</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[280px]">

                        {/* WIDGET 1: COUNTDOWN */}
                        <motion.div
                            whileHover={{ y: -10 }}
                            className="bg-slate-900/50 border border-white/10 rounded-[2.5rem] p-10 backdrop-blur-xl flex flex-col justify-between group overflow-hidden relative"
                        >
                            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                                <FaCalendarAlt size={120} />
                            </div>
                            <div>
                                <span className="text-emerald-500 font-black text-[10px] uppercase tracking-widest block mb-4">Meta PAES Invierno</span>
                                <h3 className="text-5xl font-black text-white leading-none mb-2">{daysLeft}</h3>
                                <p className="text-slate-500 font-bold uppercase text-xs tracking-widest">Días para el gran desafío</p>
                            </div>
                            <Link to="/paes" className="w-fit px-6 py-3 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-slate-950 transition-all">
                                Ver Cronograma
                            </Link>
                        </motion.div>

                        {/* WIDGET 2: FRASE DEL DÍA */}
                        <motion.div
                            whileHover={{ y: -10 }}
                            className="bg-gradient-to-br from-[#1e1b4b] to-[#0f172a] border border-white/10 rounded-[2.5rem] p-10 flex flex-col justify-between relative overflow-hidden"
                        >
                            <FaQuoteLeft className="text-3xl text-indigo-500/30" />
                            <p className="text-xl text-slate-200 font-light italic leading-relaxed">
                                "{quote}"
                            </p>
                            <div className="flex justify-between items-center">
                                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Inspiración Diaria</span>
                                <FaQuoteRight className="text-indigo-500/30" />
                            </div>
                        </motion.div>

                        {/* WIDGET 3: ACCESO RECURSOS */}
                        <motion.div
                            whileHover={{ y: -10 }}
                            className="bg-[#080B14] border border-white/10 rounded-[2.5rem] p-10 flex flex-col justify-between group"
                        >
                            <div>
                                <div className="w-12 h-12 bg-amber-500/10 rounded-2xl flex items-center justify-center text-amber-500 text-2xl mb-6">
                                    <FaBookOpen />
                                </div>
                                <h3 className="text-2xl font-black text-white mb-2 uppercase tracking-tighter">Mis Recursos</h3>
                                <p className="text-slate-500 text-sm leading-relaxed">Accede a tus clases on-demand, guías y material exclusivo.</p>
                            </div>
                            <Link to="/recursos" className="flex items-center gap-2 text-amber-500 font-black text-[10px] uppercase tracking-widest hover:gap-4 transition-all">
                                Explorar Material <FaArrowRight />
                            </Link>
                        </motion.div>

                    </div>

                    {/* FAST TRACK LINKS TO PHASE 1 PAGES */}
                    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            { label: "Área Empresas", to: "/empresas", icon: <FaBuilding />, color: "hover:text-emerald-400" },
                            { label: "Nuestra Historia", to: "/nosotros", icon: <FaUniversity />, color: "hover:text-indigo-400" },
                            { label: "Staff Docente", to: "/docentes", icon: <MdVerified />, color: "hover:text-amber-400" },
                            { label: "Centro de Ayuda", to: "/contacto", icon: <FaLifeRing />, color: "hover:text-rose-400" },
                        ].map((link, idx) => (
                            <Link
                                key={idx} to={link.to}
                                 className={`p-6 bg-white/5 border border-white/5 rounded-3xl flex items-center justify-between group transition-colors duration-300 hover:bg-white/10 ${link.color}`}
                            >
                                <div className="flex items-center gap-4 font-black uppercase text-xs tracking-widest">
                                    <span className="text-xl opacity-60 group-hover:opacity-100 transition-opacity">{link.icon}</span>
                                    {link.label}
                                </div>
                                 <FaArrowRight className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-[opacity,transform] duration-300" />
                            </Link>
                        ))}
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