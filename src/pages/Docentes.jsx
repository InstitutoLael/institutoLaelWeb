import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaLinkedin, FaInstagram, FaEnvelope, FaChalkboardTeacher, FaFilter, FaSearch } from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import SEOHead from "../components/SEOHead.jsx";
import { teachers } from "../data/teachers.js";

// --- ANIMATION VARIANTS ---
const containerVar = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const cardVar = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

export default function Docentes() {
  const [filter, setFilter] = useState("Todos");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTeachers, setFilteredTeachers] = useState(teachers);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  // --- FILTER LOGIC ---
  useEffect(() => {
    let result = teachers;

    // 1. Filter by Category (using tags logic)
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

    // 2. Filter by Search
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
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500/30">
      <SEOHead
        title="Nuestro Equipo | Instituto Lael"
        description="Conoce a los mentores detrás de tu educación. Vocación, experiencia y compromiso."
      />

      {/* ──────────────── 1. HERO HEADER ──────────────── */}
      <header className="relative pt-32 pb-20 px-6 text-center overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-indigo-600/20 blur-[120px] rounded-full -z-10 pointer-events-none"></div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto max-w-4xl relative z-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-slate-700 bg-slate-900/50 backdrop-blur-sm text-indigo-400 text-xs font-bold uppercase tracking-widest mb-6">
            <FaChalkboardTeacher /> Staff Académico 2026
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            Mentores con <span className="text-indigo-500">Vocación</span>.
          </h1>

          <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Detrás de cada clase, guía y ensayo, hay un equipo de personas reales
            comprometidas con tu futuro. Conoce a quienes lideran tu proceso.
          </p>
        </motion.div>
      </header>

      {/* ──────────────── 2. FILTERS BAR ──────────────── */}
      <div className="sticky top-20 z-40 bg-slate-950/80 backdrop-blur-md border-y border-slate-800 py-4 mb-20">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all
                   ${filter === cat
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25'
                    : 'bg-slate-900 border border-slate-700 text-slate-400 hover:text-white hover:border-slate-500'
                  }
                 `}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full md:w-64">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm" />
            <input
              type="text"
              placeholder="Buscar por nombre..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2 pl-9 pr-4 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors placeholder:text-slate-600"
            />
          </div>

        </div>
      </div>

      {/* ──────────────── 3. TEACHERS GRID ──────────────── */}
      <section className="container mx-auto px-6 pb-32">
        <motion.div
          variants={containerVar}
          initial="hidden"
          animate="visible"
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredTeachers.map((t) => (
              <motion.div
                key={t.id}
                variants={cardVar}
                layout
                initial="hidden" animate="visible" exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ y: -8 }}
                className={`relative group bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300
                   ${t.featured ? 'md:col-span-2 lg:col-span-1 lg:row-span-2 flex flex-col' : ''}
                `}
                style={{ '--accent': t.accent || '#6366f1' }}
              >
                {/* Header Gradient Overlay */}
                <div
                  className="absolute top-0 inset-x-0 h-32 opacity-20 pointer-events-none transition-opacity group-hover:opacity-40"
                  style={{ background: `linear-gradient(to bottom, ${t.accent}, transparent)` }}
                ></div>

                <div className="p-8 flex flex-col items-center text-center h-full relative z-10">
                  {/* Avatar */}
                  <div className="relative mb-6">
                    <div className="w-28 h-28 rounded-full p-1 bg-gradient-to-br from-white/10 to-transparent border border-white/10 shadow-xl group-hover:scale-110 transition-transform duration-500">
                      <img
                        src={t.img}
                        alt={t.name}
                        className="w-full h-full rounded-full object-cover bg-slate-950"
                      />
                    </div>
                    {/* Badge if Featured/Director */}
                    {t.tags.includes("Liderazgo") && (
                      <div className="absolute -bottom-2 -right-2 bg-amber-500 text-slate-950 text-[10px] font-bold px-2 py-1 rounded-full shadow-lg flex items-center gap-1">
                        <MdVerified /> LÍDER
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-indigo-400 transition-colors">
                    {t.name}
                  </h3>
                  <span
                    className="text-xs font-bold uppercase tracking-wider mb-4 px-2 py-1 rounded bg-slate-800/50 border border-white/5"
                    style={{ color: t.accent }}
                  >
                    {t.role}
                  </span>

                  <p className="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-4">
                    {t.bio}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap justify-center gap-2 mb-8 mt-auto">
                    {t.tags.map((tag, i) => (
                      <span key={i} className="text-[10px] bg-slate-800 text-slate-300 px-2 py-1 rounded border border-slate-700">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Social Actions (Slide Up on Hover) */}
                  <div className="flex gap-4 opacity-100 md:opacity-0 md:translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    {t.social?.linkedin && (
                      <a href={t.social.linkedin} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white hover:bg-indigo-600 p-2 rounded-full transition-all">
                        <FaLinkedin size={20} />
                      </a>
                    )}
                    {t.social?.instagram && (
                      <a href={t.social.instagram} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white hover:bg-pink-600 p-2 rounded-full transition-all">
                        <FaInstagram size={20} />
                      </a>
                    )}
                    <a href={`mailto:contacto@institutolael.cl?subject=Contacto para ${t.name}`} className="text-slate-400 hover:text-white hover:bg-emerald-600 p-2 rounded-full transition-all">
                      <FaEnvelope size={20} />
                    </a>
                  </div>
                </div>

                {/* Decoration Lines */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-slate-700 to-transparent group-hover:via-indigo-500 transition-all"></div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredTeachers.length === 0 && (
          <div className="text-center py-20">
            <p className="text-slate-500 text-lg">No encontramos docentes con ese criterio.</p>
            <button onClick={() => { setFilter("Todos"); setSearchTerm("") }} className="text-indigo-400 hover:underline mt-2">
              Limpiar filtros
            </button>
          </div>
        )}
      </section>

      {/* ──────────────── 4. CTA JOIN ──────────────── */}
      <div className="container mx-auto px-6 pb-20">
        <div className="bg-gradient-to-r from-slate-900 to-indigo-950/30 rounded-3xl p-12 text-center border border-indigo-500/20 relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-3xl font-bold mb-4">¿Eres profe y tienes esta misma pasión?</h3>
            <p className="text-slate-400 mb-8 max-w-xl mx-auto">
              Siempre buscamos talentos para sumar a nuestras filas. Si crees que educar es trascender, hablemos.
            </p>
            <a
              href="/trabaja"
              className="inline-block px-8 py-3 bg-white text-slate-950 font-bold rounded-full hover:bg-indigo-50 transition-colors shadow-lg shadow-white/10"
            >
              Postular al Equipo
            </a>
          </div>
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-repeat"></div>
        </div>
      </div>

    </div>
  );
}