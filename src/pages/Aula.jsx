import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaVideo, FaGoogleDrive, FaChalkboardTeacher, FaUserCircle,
  FaCalendarCheck, FaBook, FaBell, FaArrowRight, FaLock, FaPlay,
  FaBroadcastTower, FaClock, FaCheckCircle
} from "react-icons/fa";
import { SiGooglemeet, SiGoogledrive, SiMoodle } from "react-icons/si";
import ReactPlayer from "react-player";
import SEOHead from "../components/SEOHead.jsx";

// CONFIG & DATA
import { LIVE_MEET_LINK, LIVE_STATUS } from "../data/configAula";
import { RECORDED_CLASSES } from "../data/curriculum";
import { useAuth } from "../context/AuthContext";

const LOBBY_TOOLS = [
  {
    id: "drive",
    name: "Material Teórico",
    desc: "Plataforma central de guías, textos y recursos descargables.",
    icon: <SiGoogledrive />,
    color: "bg-blue-500/10 text-blue-500",
    link: "https://drive.google.com"
  },
  {
    id: "moodle",
    name: "Campus Moodle",
    desc: "Plataforma de ejercitación oficial y simulacros PAES.",
    icon: <SiMoodle />,
    color: "bg-orange-500/10 text-orange-500",
    link: "https://moodle.org"
  }
];

export default function Aula() {
  const { user, profile, loading } = useAuth();
  const [activeVideo, setActiveVideo] = useState(null);

  if (loading) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-[#050505]">
        <div className="w-12 h-12 border-4 border-amber-500/20 border-t-amber-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Si no está pagado: Muro de Pago
  if (profile && !profile.is_paid) {
    const textWsp = `Hola Lael! Mi correo es ${user?.email}. Solicito la activación de mi acceso al Aula Virtual.`;
    const linkWsp = `https://wa.me/56964626568?text=${encodeURIComponent(textWsp)}`;

    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 font-sans relative overflow-hidden">
        <SEOHead title="Activación Pendiente | Instituto Lael" description="Tu cuenta está creada. Activa tu acceso enviando tu comprobante." />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,_#1e1b4b_0%,_#050505_80%)] opacity-50" />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full relative z-10"
        >
          <div className="bg-slate-900/50 border border-white/10 p-12 rounded-[3.5rem] backdrop-blur-3xl shadow-2xl text-center">
            <div className="w-24 h-24 bg-amber-500/10 rounded-3xl flex items-center justify-center text-amber-500 text-4xl mx-auto mb-10 border border-amber-500/20 relative">
              <FaLock />
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-[10px] text-white font-bold border-4 border-[#0a0a0b]">!</div>
            </div>

            <h2 className="text-3xl font-black text-white mb-4 uppercase tracking-tighter">¡Hola, <span className="text-amber-500">{profile?.full_name?.split(' ')[0] || 'Estudiante'}</span>!</h2>
            <p className="text-slate-400 mb-10 text-sm leading-relaxed">
              Tu cuenta ha sido creada exitosamente. <br /><br />
              Para desbloquear tu acceso al **Learning Hub** y las clases en vivo, por favor envía tu comprobante de pago por WhatsApp.
            </p>

            <div className="space-y-4">
              <a
                href={linkWsp}
                target="_blank"
                rel="noreferrer"
                className="w-full py-6 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl flex items-center justify-center gap-3 transition-all shadow-2xl shadow-emerald-600/20 uppercase tracking-widest text-xs"
              >
                Solicitar Activación
              </a>
              <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Activación instantánea tras verificación</p>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-slate-200 font-sans pt-32 pb-40 overflow-x-hidden selection:bg-indigo-500/30">
      <SEOHead title="Live Learning Hub | Mi Aula Lael" description="Acceso a clases en vivo, grabaciones y material académico exclusivo." />

      {/* Decorative gradients */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-600/5 blur-[150px] rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-amber-500/5 blur-[150px] rounded-full"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 max-w-6xl">

        {/* HEADER */}
        <header className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-[10px] font-black uppercase tracking-widest mb-6">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span> Sistema In-House v2.0
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none">
              Live learning <br /><span className="text-white/20 uppercase">Hub.</span>
            </h1>
          </div>
          <div className="flex items-center gap-5 bg-white/5 p-5 rounded-[2.5rem] border border-white/5 backdrop-blur-3xl shadow-2xl">
            <div className="relative">
              <div className="w-14 h-14 rounded-2xl bg-indigo-500/20 flex items-center justify-center text-3xl text-indigo-400 border border-indigo-500/10">
                <FaUserCircle />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 border-4 border-[#0a0a0b] rounded-full"></div>
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none mb-1">Sesión Activa</p>
              <h3 className="text-white font-black text-lg leading-none">{profile?.full_name || 'Estudiante Lael'}</h3>
            </div>
          </div>
        </header>

        {/* 1. LIVE COMMAND CENTER (HERO) */}
        <section className="mb-20">
          <div className="relative bg-slate-900 border border-white/10 rounded-[4rem] p-12 md:p-16 overflow-hidden shadow-2xl group">
            {/* Grid background */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none"></div>
            <div className="absolute -right-20 -top-20 w-96 h-96 bg-indigo-600/10 blur-[100px] rounded-full group-hover:bg-indigo-600/20 transition-all duration-700"></div>

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="text-center md:text-left">
                <div className="inline-flex items-center gap-3 bg-black/40 px-6 py-2 rounded-full border border-white/5 mb-8">
                  <span className={`w-3 h-3 rounded-full ${LIVE_STATUS ? 'bg-red-500 animate-pulse shadow-[0_0_15px_rgba(239,68,68,0.5)]' : 'bg-slate-600'}`}></span>
                  <span className="text-xs font-black uppercase tracking-[0.2em] text-white">
                    {LIVE_STATUS ? 'BROADCASTING LIVE' : 'OFF AIR'}
                  </span>
                </div>
                <h2 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tighter leading-tight italic">
                  Sala de Clases <br /> <span className="text-indigo-400">En Vivo</span>
                </h2>
                <p className="text-xl text-slate-400 font-light mb-10 max-w-md">
                  Únete a la transmisión en tiempo real. Activa tu cámara y prepárate para participar.
                </p>

                <a
                  href={LIVE_MEET_LINK}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-4 px-12 py-6 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-[2rem] text-lg shadow-2xl shadow-indigo-600/30 transition-all hover:scale-105 active:scale-95 uppercase tracking-widest"
                >
                  <SiGooglemeet className="text-2xl" /> UNIRSE A LA CLASE (MEET)
                </a>
              </div>

              <div className="w-full md:w-[400px] space-y-4">
                <div className="bg-black/40 p-8 rounded-[3rem] border border-white/5 backdrop-blur-md">
                  <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                    <FaClock /> Agenda del Día
                  </h4>
                  <div className="space-y-6">
                    <div className="flex border-b border-white/5 pb-4">
                      <div className="text-indigo-400 font-black text-xl mr-4">18:30</div>
                      <div>
                        <p className="text-white font-black text-sm uppercase tracking-tight">Matemática M1</p>
                        <p className="text-xs text-slate-500">Prof. Diego Chaparro</p>
                      </div>
                    </div>
                    <div className="flex opacity-50">
                      <div className="text-slate-600 font-black text-xl mr-4">20:15</div>
                      <div>
                        <p className="text-white font-black text-sm uppercase tracking-tight">Lenguaje PAES</p>
                        <p className="text-xs text-slate-500">Nivelación Base</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. VIDEOTECA & TOOLS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* VIDEOTECA (ON-DEMAND) */}
          <div className="lg:col-span-8 space-y-12">
            <div>
              <div className="flex justify-between items-end mb-10">
                <div>
                  <h3 className="text-3xl font-black text-white uppercase tracking-tighter mb-2 italic">Videoteca On-Demand</h3>
                  <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Repasa las últimas grabaciones</p>
                </div>
                <button className="text-[10px] font-black text-indigo-400 hover:text-white transition-colors uppercase tracking-widest">Ver Todo</button>
              </div>

              {/* Player Modal / Inline Placeholder */}
              <AnimatePresence>
                {activeVideo && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="mb-12 bg-black rounded-[3rem] overflow-hidden border border-indigo-500/20 shadow-2xl aspect-video relative group"
                  >
                    <ReactPlayer
                      url={activeVideo.url}
                      width="100%"
                      height="100%"
                      controls
                      playing
                    />
                    <button
                      onClick={() => setActiveVideo(null)}
                      className="absolute top-6 right-6 bg-white/10 hover:bg-white/20 p-3 rounded-full text-white backdrop-blur-md transition-colors"
                    >
                      <FaArrowRight className="rotate-45" />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {RECORDED_CLASSES.map((video) => (
                  <div
                    key={video.id}
                    onClick={() => {
                      setActiveVideo(video);
                      window.scrollTo({ top: 400, behavior: 'smooth' });
                    }}
                    className="bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-6 hover:border-indigo-500/30 transition-all group cursor-pointer"
                  >
                    <div className="relative aspect-video rounded-2xl overflow-hidden mb-6">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-slate-950 pl-1 shadow-2xl">
                          <FaPlay />
                        </div>
                      </div>
                      <div className="absolute bottom-4 right-4 bg-black/80 px-3 py-1 rounded-lg text-[10px] font-black text-white backdrop-blur-md">
                        {video.duration}
                      </div>
                    </div>
                    <span className="text-[9px] font-black text-indigo-500 uppercase tracking-widest mb-2 block">{video.subject}</span>
                    <h4 className="text-white font-black text-lg leading-tight uppercase tracking-tight mb-2 group-hover:text-indigo-400 transition-colors">{video.title}</h4>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{new Date(video.date).toLocaleDateString('es-CL', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SIDEBAR TOOLS */}
          <div className="lg:col-span-4 space-y-12">
            <div className="sticky top-40 space-y-8">

              <div className="bg-indigo-600/10 border border-indigo-500/20 rounded-[3rem] p-10 backdrop-blur-3xl shadow-2xl relative overflow-hidden group">
                <div className="absolute -right-10 -bottom-10 p-8 text-indigo-500/5 group-hover:text-indigo-500/10 transition-colors">
                  <FaBell size={120} />
                </div>
                <h3 className="text-xl font-black text-white mb-8 uppercase tracking-tighter">Campus & Recursos</h3>

                <div className="space-y-6">
                  {LOBBY_TOOLS.map((tool) => (
                    <a
                      key={tool.id}
                      href={tool.link}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-5 p-5 bg-white/5 rounded-[2rem] border border-white/5 hover:bg-white/10 hover:border-white/10 transition-all"
                    >
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${tool.color}`}>
                        {tool.icon}
                      </div>
                      <div>
                        <h4 className="text-white font-black text-sm uppercase tracking-tight">{tool.name}</h4>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Acceder Ahora</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Support Card */}
              <div className="bg-slate-900 border border-white/10 rounded-[3rem] p-10 text-center shadow-2xl">
                <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-500 text-3xl mx-auto mb-6">
                  <FaChalkboardTeacher />
                </div>
                <h4 className="text-xl font-black text-white mb-2 uppercase tracking-tight">Tutoría Personal</h4>
                <p className="text-xs text-slate-500 mb-8 leading-relaxed font-medium px-4">Resuelve tus dudas directamente con nuestro equipo académico vía WhatsApp.</p>
                <a
                  href="https://wa.me/56964626568"
                  className="w-full py-5 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl text-[10px] uppercase tracking-widest transition-all block shadow-2xl shadow-emerald-600/20"
                >
                  Contactar Tutor Ahora
                </a>
              </div>

              {/* Verified Badge */}
              <div className="flex items-center justify-center gap-3 text-[10px] font-black text-slate-600 uppercase tracking-[0.3em]">
                <FaCheckCircle className="text-emerald-500" /> Acceso Verificado 2026
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}