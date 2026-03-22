import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaLinkedin, FaInstagram, FaEnvelope, FaChalkboardTeacher, FaFilter, FaSearch,
  FaStar, FaTrophy, FaAward, FaBookReader, FaCertificate, FaHandshake,
  FaChartLine, FaUserTie, FaCheckDouble, FaArrowRight
} from "react-icons/fa";
import { MdVerified, MdOutlineSchool } from "react-icons/md";
import SEOHead from "../components/SEOHead.jsx";
import { teachers } from "../data/teachers.js";

// --- HELPERS FOR BADGES & STATS ---
const BADGE_MAP = {
  "Liderazgo": { icon: <FaTrophy />, label: "Liderazgo", color: "text-amber-500", bg: "bg-amber-500/10" },
  "Sorda Nativa": { icon: <FaHandshake />, label: "Comunicación Nativa", color: "text-emerald-400", bg: "bg-emerald-500/10" },
  "Matemáticas": { icon: <FaStar />, label: "Puntaje Nacional", color: "text-blue-400", bg: "bg-blue-500/10" },
  "Ciencia": { icon: <FaAward />, label: "Académico de Élite", color: "text-indigo-400", bg: "bg-indigo-500/10" },
  "Literatura": { icon: <FaBookReader />, label: "Maestro de Letras", color: "text-rose-400", bg: "bg-rose-500/10" },
  "default": { icon: <FaCertificate />, label: "Certificado 2026", color: "text-slate-400", bg: "bg-slate-500/10" }
};

const getTeacherStats = (id) => {
  const stats = {
    diego: { classes: "1.5k+", satisfaction: "100%", exp: "12y" },
    fernanda: { classes: "100+", satisfaction: "98%", exp: "8y" },
    martin: { classes: "200+", satisfaction: "99%", exp: "6y" },
    javiera: { classes: "400+", satisfaction: "97%", exp: "5y" },
    carlos: { classes: "900+", satisfaction: "99%", exp: "10y" },
    ana: { classes: "500+", satisfaction: "100%", exp: "15y" },
  };
  return stats[id] || { classes: "200+", satisfaction: "95%", exp: "3y" };
};

// --- ANIMATION VARIANTS ---
const containerVar = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const cardVar = {
  hidden: { opacity: 0, scale: 0.95, y: 30 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

export default function Docentes() {
  const [filter, setFilter] = useState("Todos");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTeachers, setFilteredTeachers] = useState(teachers);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  useEffect(() => {
    let result = teachers;
    if (filter !== "Todos") {
      result = result.filter(t => {
        const joinTags = t.tags.join(" ").toLowerCase();
        const mapCategory = {
          "Ciencias": ["ciencia", "biología", "química", "física", "matemática"],
          "Humanidades": ["lenguaje", "literatura", "historia"],
          "Idiomas": ["inglés", "lsch", "sorda"],
          "Gestión": ["liderazgo", "director"]
        };
        const keywords = mapCategory[filter] || [];
        return keywords.some(k => joinTags.includes(k));
      });
    }
    if (searchTerm.trim() !== "") {
      const lowerTerm = searchTerm.toLowerCase();
      result = result.filter(t =>
        t.name.toLowerCase().includes(lowerTerm) ||
        t.role.toLowerCase().includes(lowerTerm) ||
        t.subject.toLowerCase().includes(lowerTerm)
      );
    }
    setFilteredTeachers(result);
  }, [filter, searchTerm]);

  const categories = ["Todos", "Ciencias", "Humanidades", "Idiomas", "Gestión"];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500/30 overflow-x-hidden">
      <SEOHead
        title="Nuestro Equipo | Experience 2.0 | Instituto Lael"
        description="Mentores de élite, insignias de logros y compromiso educativo trascendente."
      />

      {/* ──────────────── 1. HERO HEADER (DRAMATIC) ──────────────── */}
      <header className="relative pt-40 pb-32 px-6 text-center overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[600px] bg-indigo-600/10 blur-[150px] rounded-full -z-10 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="container mx-auto max-w-5xl relative z-10"
        >
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-indigo-500/20 bg-indigo-500/5 backdrop-blur-md text-indigo-400 text-xs font-black uppercase tracking-[0.4em] mb-10">
            <FaChalkboardTeacher /> Elite Faculty 2026
          </div>

          <h1 className="text-6xl md:text-8xl font-black mb-8 leading-[0.85] tracking-tighter">
            Nuestra Fuerza es <br />
            <span className="bg-gradient-to-r from-white via-indigo-200 to-indigo-500 bg-clip-text text-transparent">la Calidad.</span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto leading-relaxed font-light">
            No solo profesores, sino arquitectos de futuro con insignias que validan años de compromiso y resultados comprobables.
          </p>
        </motion.div>
      </header>

      {/* ──────────────── 2. FILTER & SEARCH BAR ──────────────── */}
      <div className="sticky top-20 z-40 bg-slate-950/60 backdrop-blur-2xl border-y border-white/5 py-6 mb-24">
        <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all
                           ${filter === cat
                    ? 'bg-indigo-600 text-white shadow-2xl shadow-indigo-500/30 ring-2 ring-indigo-500/50'
                    : 'bg-white/5 border border-white/5 text-slate-500 hover:text-white hover:border-white/20'
                  }
                        `}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="relative w-full lg:w-80">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" />
            <input
              type="text"
              placeholder="Identificar mentor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all placeholder:text-slate-700"
            />
          </div>
        </div>
      </div>

      {/* ──────────────── 3. TEACHERS GRID (EXPERIENCE 2.0) ──────────────── */}
      <section className="container mx-auto px-6 pb-40">
        <motion.div
          variants={containerVar}
          initial="hidden"
          animate="visible"
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          <AnimatePresence>
            {filteredTeachers.map((t) => {
              const stats = getTeacherStats(t.id);
              const primaryBadge = Object.keys(BADGE_MAP).find(tag => t.tags.includes(tag)) || "default";
              const badge = BADGE_MAP[primaryBadge];

              return (
                <motion.div
                  key={t.id}
                  variants={cardVar}
                  layout
                  whileHover={{ y: -15, transition: { duration: 0.3 } }}
                  className={`relative bg-[#080B14] border border-white/5 rounded-[3rem] overflow-hidden group shadow-2xl
                              ${t.featured ? 'md:col-span-2 lg:col-span-1 border-indigo-500/10' : ''}
                           `}
                >
                  {/* Decorative Gradient Head */}
                  <div className="h-3 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-30 group-hover:opacity-100 transition-opacity"></div>

                  <div className="p-10 flex flex-col h-full">

                    {/* Hero Area of Card */}
                    <div className="flex justify-between items-start mb-10">
                      <div className="relative">
                        <div className="w-24 h-24 rounded-[2rem] p-1 bg-white/5 border border-white/10 overflow-hidden transform rotate-3 group-hover:rotate-0 transition-transform duration-500">
                          <img src={t.img} alt={t.name} loading="lazy" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                        </div>
                        <div className="absolute -bottom-2 -right-2 bg-slate-950 p-1.5 rounded-xl border border-white/10">
                          <MdVerified className="text-indigo-400 text-xl" />
                        </div>
                      </div>

                      {/* Achievement Badge */}
                      <div className={`px-4 py-2 rounded-2xl border border-white/5 flex items-center gap-2 ${badge.bg} ${badge.color} text-[10px] font-black uppercase tracking-widest`}>
                        {badge.icon} {badge.label}
                      </div>
                    </div>

                    {/* Info Content */}
                    <div className="mb-8">
                      <h3 className="text-3xl font-black text-white mb-2 group-hover:text-indigo-400 transition-colors uppercase tracking-tighter">
                        {t.name}
                      </h3>
                      <div className="text-sm font-black text-indigo-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                        <MdOutlineSchool /> {t.role}
                      </div>
                      <p className="text-slate-500 text-sm leading-relaxed mb-8 font-light italic">
                        "{t.bio}"
                      </p>
                    </div>

                    {/* Performance Stats Dashboard */}
                    <div className="grid grid-cols-3 gap-2 py-6 border-y border-white/5 mb-8">
                      <div className="text-center">
                        <div className="text-[10px] font-black text-slate-600 uppercase mb-1">Impacto</div>
                        <div className="text-lg font-black text-white">{stats.classes}</div>
                      </div>
                      <div className="text-center border-x border-white/5">
                        <div className="text-[10px] font-black text-slate-600 uppercase mb-1">Rate</div>
                        <div className="text-lg font-black text-emerald-400">{stats.satisfaction}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-[10px] font-black text-slate-600 uppercase mb-1">Exp.</div>
                        <div className="text-lg font-black text-white">{stats.exp}</div>
                      </div>
                    </div>

                    {/* Tags (Secondary) */}
                    <div className="flex flex-wrap gap-2 mb-10">
                      {t.tags.slice(0, 3).map((tag, i) => (
                        <span key={i} className="text-[9px] font-black uppercase tracking-widest px-3 py-1 bg-white/5 text-slate-500 rounded-lg border border-white/5">
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Action Footer */}
                    <div className="mt-auto flex justify-between items-center opacity-40 group-hover:opacity-100 transition-opacity">
                      <div className="flex gap-4">
                        <a href="#" className="text-slate-500 hover:text-white transition-colors"><FaLinkedin size={18} /></a>
                        <a href="#" className="text-slate-500 hover:text-white transition-colors"><FaInstagram size={18} /></a>
                      </div>
                      <button className="text-[10px] font-black text-indigo-400 uppercase tracking-widest flex items-center gap-2 hover:gap-4 transition-all">
                        Perfil Detallado <FaArrowRight />
                      </button>
                    </div>

                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* ──────────────── 4. RECRUITMENT HUB ──────────────── */}
      <section className="py-24 bg-slate-950 border-t border-white/5 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="relative p-16 md:p-24 bg-gradient-to-br from-indigo-900/20 to-slate-950 rounded-[4rem] border border-white/10 text-center flex flex-col items-center">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(99,102,241,0.05),transparent)]"></div>

            <motion.div
              whileInView={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="w-20 h-20 rounded-3xl bg-indigo-500/20 border border-indigo-500/50 flex items-center justify-center text-4xl text-indigo-400 mb-10"
            >
              <FaUserTie />
            </motion.div>

            <h3 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter uppercase">
              Únete a la <span className="text-indigo-500 italic">Vanguardia.</span>
            </h3>
            <p className="text-xl text-slate-500 max-w-2xl leading-relaxed mb-12 font-light">
              Buscamos mentes brillantes para la temporada 2026. Si tu pasión es la educación de alto impacto, queremos conocerte.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 relative z-10 font-black">
              <a href="/trabaja" className="px-12 py-5 bg-white text-slate-950 rounded-2xl hover:bg-indigo-500 hover:text-white transition-all shadow-2xl">
                Enviar Currículum
              </a>
              <button className="px-12 py-5 bg-slate-900 border border-white/10 text-white rounded-2xl hover:bg-slate-800 transition-all flex items-center gap-3">
                <FaCheckDouble /> Ver Requisitos
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}