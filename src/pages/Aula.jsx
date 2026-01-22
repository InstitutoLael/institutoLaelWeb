import { motion } from "framer-motion";
import {
  FaVideo, FaGoogleDrive, FaChalkboardTeacher, FaUserCircle,
  FaCalendarCheck, FaBook, FaBell, FaArrowRight, FaLock
} from "react-icons/fa";
import { SiGooglemeet, SiGoogledrive, SiMoodle } from "react-icons/si";
import SEOHead from "../components/SEOHead.jsx";

const COURSES = [
  { name: "Matemática M1", time: "18:30 - 20:00", tutor: "Prof. García" },
  { name: "Comprensión Lectora", time: "16:00 - 17:30", tutor: "Prof. Soto" },
];

const LOBBY_TOOLS = [
  {
    id: "meet",
    name: "Sala de Clases",
    desc: "Entrada directa a Google Meet para tus clases en vivo.",
    icon: <SiGooglemeet />,
    color: "bg-emerald-500/10 text-emerald-500",
    link: "https://meet.google.com" // Placeholder
  },
  {
    id: "drive",
    name: "Material Teórico",
    desc: "Acceso a Google Drive con guías y material de estudio.",
    icon: <SiGoogledrive />,
    color: "bg-blue-500/10 text-blue-500",
    link: "https://drive.google.com" // Placeholder
  },
  {
    id: "moodle",
    name: "Campus Moodle",
    desc: "Plataforma de ejercitación y exámenes de simulación.",
    icon: <SiMoodle />,
    color: "bg-orange-500/10 text-orange-500",
    link: "https://moodle.org" // Placeholder
  }
];

export default function Aula() {
  return (
    <div className="min-h-screen bg-[#050505] text-slate-200 font-sans pt-32 pb-24 overflow-x-hidden">
      <SEOHead title="Mí Aula | Lael Student Lobby" description="Panel central para estudiantes de Instituto Lael. Acceso a clases, material y campus." />

      {/* Background Decorations */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-600/5 blur-[150px] rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-amber-500/5 blur-[150px] rounded-full"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 max-w-6xl">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-amber-500 text-[10px] font-black uppercase tracking-widest mb-6"
            >
              <FaLock /> Acceso Estudiante
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-sans font-black text-white tracking-tighter"
            >
              Bienvenido al <br /><span className="text-white/20 uppercase">Lobby Académico.</span>
            </motion.h1>
          </div>
          <div className="flex items-center gap-4 bg-white/5 p-4 rounded-3xl border border-white/10 backdrop-blur-xl">
            <div className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center text-2xl text-indigo-400">
              <FaUserCircle />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none">Mi Perfil</p>
              <h3 className="text-white font-black text-lg">Estudiante Lael</h3>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* LEFT AREA: TOOLS */}
          <div className="lg:col-span-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {LOBBY_TOOLS.map((tool, idx) => (
                <motion.a
                  key={tool.id}
                  href={tool.link}
                  target="_blank"
                  rel="noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-slate-900/50 border border-white/5 p-8 rounded-[2.5rem] flex flex-col justify-between group hover:border-white/20 transition-all shadow-2xl backdrop-blur-3xl min-h-[280px]"
                >
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-8 ${tool.color}`}>
                    {tool.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-white mb-3 uppercase tracking-tight">{tool.name}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed mb-6 font-medium">{tool.desc}</p>
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-white transition-colors">
                      Acceder ahora <FaArrowRight />
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Announcements / News */}
            <div className="bg-[#080B14]/80 border border-white/5 rounded-[3rem] p-12 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 text-amber-500/10 group-hover:text-amber-500/20 transition-colors">
                <FaBell size={120} />
              </div>
              <div className="relative z-10">
                <h3 className="text-2xl font-black text-white mb-6 uppercase tracking-tighter">Novedades del Campus</h3>
                <div className="space-y-6">
                  <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                    <span className="text-[10px] font-bold text-amber-500 uppercase tracking-[0.2em] block mb-2">Aviso Importante</span>
                    <p className="text-slate-300 font-medium">Inscripciones para el primer ensayo nacional de invierno abiertas.</p>
                  </div>
                  <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                    <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-[0.2em] block mb-2">Nuevo Recurso</span>
                    <p className="text-slate-300 font-medium">Ya puedes descargar la guía de Estrategia para M1 en la sección de Drive.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT AREA: SCHEDULE & INFO */}
          <div className="lg:col-span-4 space-y-8">

            {/* Weekly Schedule Preview */}
            <div className="bg-slate-900 border border-white/10 rounded-[3rem] p-10 shadow-2xl backdrop-blur-3xl h-fit">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-amber-500/10 rounded-xl text-amber-500"><FaCalendarCheck /></div>
                <h3 className="font-black uppercase tracking-widest text-sm">Mis Clases</h3>
              </div>

              <div className="space-y-6">
                {COURSES.map((c, i) => (
                  <div key={i} className="group p-6 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
                    <h4 className="text-white font-black uppercase tracking-tight mb-2 text-lg">{c.name}</h4>
                    <div className="flex justify-between text-[11px] font-bold text-slate-500">
                      <span className="flex items-center gap-2"><FaVideo className="text-indigo-400" /> {c.time}</span>
                      <span className="text-amber-500/80">{c.tutor}</span>
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full mt-10 py-4 border border-white/5 bg-white/5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:bg-white hover:text-slate-950 transition-all">
                Ver Calendario Completo
              </button>
            </div>

            {/* Support Card */}
            <div className="bg-gradient-to-br from-indigo-900/30 to-slate-900 border border-indigo-500/20 rounded-[3rem] p-10 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-indigo-500 rounded-full flex items-center justify-center text-white text-2xl mb-6 shadow-xl shadow-indigo-500/20">
                <FaChalkboardTeacher />
              </div>
              <h4 className="text-xl font-black text-white mb-2 uppercase tracking-tight">Dudas Académicas</h4>
              <p className="text-xs text-slate-500 mb-8 leading-relaxed font-medium">Si tienes dudas sobre el material o necesitas apoyo pedagógico, contáctanos.</p>
              <a
                href="https://wa.me/56964626568"
                className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-2xl text-[10px] uppercase tracking-widest transition-all"
              >
                Contactar Tutor
              </a>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}