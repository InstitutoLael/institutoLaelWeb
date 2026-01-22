import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaWhatsapp, FaEnvelope, FaMapMarkerAlt, FaPaperPlane, FaInstagram, FaClock,
  FaArrowRight, FaHeadset, FaCheck, FaGraduationCap, FaBuilding, FaChalkboardTeacher,
  FaLifeRing, FaBriefcase, FaTimes
} from "react-icons/fa";
import { MdVerified, MdOutlineSmartButton } from "react-icons/md";
import SEOHead from "../components/SEOHead.jsx";
import { CONTACT_INFO, CONTACT_SUBJECTS } from "../data/contact.js";

// --- STEP DATA ---
const PORTALS = [
  {
    id: "student",
    title: "Soy Estudiante",
    subtitle: "PAES, Idiomas o Nivelación",
    icon: <FaGraduationCap />,
    color: "from-blue-500 to-indigo-600",
    actions: [
      { label: "Inscripción a Cursos", type: "whatsapp", msg: "Hola, quiero inscribirme a un curso." },
      { label: "Consultar Horarios", type: "form", subject: "inscripcion" },
      { label: "Becas y Convenios", type: "whatsapp", msg: "Hola, quiero saber sobre becas." }
    ]
  },
  {
    id: "corporate",
    title: "Soy Empresa",
    subtitle: "Capacitación y ROI B2B",
    icon: <FaBuilding />,
    color: "from-emerald-500 to-teal-600",
    actions: [
      { label: "Solicitar Cotización ROI", type: "whatsapp", msg: "Hola, quiero una cotización corporativa." },
      { label: "Factibilidad SENCE", type: "form", subject: "empresa" },
      { label: "Alianza Estratégica", type: "whatsapp", msg: "Hola, me interesa una alianza." }
    ]
  },
  {
    id: "teacher",
    title: "Soy Docente",
    subtitle: "Postulaciones y Talento",
    icon: <FaChalkboardTeacher />,
    color: "from-amber-500 to-orange-600",
    actions: [
      { label: "Enviar Currículum", type: "whatsapp", msg: "Hola, quiero postular como docente." },
      { label: "Soporte Académico", type: "form", subject: "otro" }
    ]
  },
  {
    id: "help",
    title: "Soporte",
    subtitle: "Pagos y Plataforma",
    icon: <FaLifeRing />,
    color: "from-rose-500 to-red-600",
    actions: [
      { label: "Problemas de Acceso", type: "whatsapp", msg: "Hola, tengo problemas con la plataforma." },
      { label: "Dudas de Facturación", type: "form", subject: "pagos" }
    ]
  }
];

export default function Contacto() {
  const [step, setStep] = useState(1); // 1: Selection, 2: Actions/Form
  const [selectedPortal, setSelectedPortal] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", subject: "consulta", message: "" });
  const [isSending, setIsSending] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const handlePortalSelect = (portal) => {
    setSelectedPortal(portal);
    setStep(2);
  };

  const backToPortals = () => {
    setStep(1);
    setSelectedPortal(null);
    setShowForm(false);
  };

  const handleAction = (action) => {
    if (action.type === 'whatsapp') {
      const url = `https://wa.me/${CONTACT_INFO.whatsapp.number}?text=${encodeURIComponent(action.msg)}`;
      window.open(url, '_blank');
    } else {
      setForm(prev => ({ ...prev, subject: action.subject }));
      setShowForm(true);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);
    setTimeout(() => {
      const subjectLabel = CONTACT_SUBJECTS.find(s => s.id === form.subject)?.label || form.subject;
      const text = `Hola *Instituto Lael* 👋%0A%0ASoy *${form.name}* (${selectedPortal.title}).%0A%0A📌 *Motivo:* ${subjectLabel}%0A📝 *Mensaje:* ${form.message}%0A%0A(Email: ${form.email})`;
      window.open(`https://wa.me/${CONTACT_INFO.whatsapp.number}?text=${text}`, '_blank');
      setIsSending(false);
      setSentSuccess(true);
      setForm({ name: "", email: "", subject: "consulta", message: "" });
      setTimeout(() => {
        setSentSuccess(false);
        backToPortals();
      }, 3000);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500/30 overflow-x-hidden">
      <SEOHead title="Hub de Contacto | Experience 2.0 | Instituto Lael" description="Centro inteligente de atención al estudiante y partners corporativos." />

      {/* ──────────────── 1. HERO HEADER ──────────────── */}
      <header className="relative pt-40 pb-20 px-6 text-center">
        {/* Background Ambience */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-96 bg-indigo-600/10 blur-[120px] rounded-full -z-10"></div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="container mx-auto max-w-4xl"
        >
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.4em] mb-10 text-indigo-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Sistema de Respuesta Inteligente
          </div>
          <h1 className="text-6xl md:text-8xl font-black mb-8 leading-[0.85] tracking-tighter">
            ¿Cómo podemos <br />
            <span className="bg-gradient-to-r from-white via-indigo-200 to-indigo-500 bg-clip-text text-transparent">Ayudarte Hoy?</span>
          </h1>
          <p className="text-xl text-slate-400 font-light max-w-2xl mx-auto leading-relaxed">
            Selecciona tu perfil para conectarte instantáneamente con el área correspondiente. Experiencia 2.0: Sin esperas, sin burocracia.
          </p>
        </motion.div>
      </header>

      {/* ──────────────── 2. INTERACTIVE DECISION TREE ──────────────── */}
      <section className="container mx-auto px-6 pb-40 min-h-[600px] relative">
        <AnimatePresence mode="wait">

          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto"
            >
              {PORTALS.map((portal) => (
                <button
                  key={portal.id}
                  onClick={() => handlePortalSelect(portal)}
                  className="group relative h-80 bg-[#080B14] border border-white/5 rounded-[3rem] overflow-hidden flex flex-col items-center justify-center p-10 transition-all duration-500 hover:border-white/20 hover:shadow-2xl hover:shadow-indigo-500/10 active:scale-95"
                >
                  <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${portal.color} flex items-center justify-center text-3xl text-white mb-8 shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                    {portal.icon}
                  </div>
                  <h3 className="text-2xl font-black text-white mb-2 uppercase tracking-tighter">{portal.title}</h3>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">{portal.subtitle}</p>

                  <div className="absolute bottom-10 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0 text-indigo-400 font-black text-[10px] uppercase tracking-widest flex items-center gap-2">
                    Ingresar <FaArrowRight />
                  </div>
                </button>
              ))}
            </motion.div>
          )}

          {step === 2 && selectedPortal && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="max-w-4xl mx-auto"
            >
              <div className="flex items-center gap-6 mb-12">
                <button
                  onClick={backToPortals}
                  className="p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-colors text-slate-400 hover:text-white"
                >
                  <FaTimes />
                </button>
                <div>
                  <h3 className="text-3xl font-black text-white uppercase tracking-tighter">{selectedPortal.title}</h3>
                  <p className="text-slate-500 uppercase font-black text-[10px] tracking-widest">{selectedPortal.subtitle}</p>
                </div>
              </div>

              {!showForm ? (
                <div className="grid grid-cols-1 gap-4">
                  {selectedPortal.actions.map((action, i) => (
                    <button
                      key={i}
                      onClick={() => handleAction(action)}
                      className="p-8 bg-slate-900/50 border border-white/5 rounded-3xl flex items-center justify-between group hover:border-indigo-500/30 hover:bg-slate-900 transition-all"
                    >
                      <div className="flex items-center gap-6">
                        <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                          {action.type === 'whatsapp' ? <FaWhatsapp /> : <FaEnvelope />}
                        </div>
                        <span className="text-xl font-bold text-white uppercase tracking-tight">{action.label}</span>
                      </div>
                      <FaArrowRight className="text-slate-700 group-hover:text-indigo-400 group-hover:translate-x-2 transition-all" />
                    </button>
                  ))}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-slate-900 border border-white/5 p-10 rounded-[3rem] shadow-2xl relative"
                >
                  {sentSuccess && (
                    <div className="absolute inset-0 z-20 bg-slate-950/95 flex flex-col items-center justify-center text-center p-10 rounded-[3rem]">
                      <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center text-white text-4xl mb-6 shadow-2xl shadow-emerald-500/50">
                        <FaCheck />
                      </div>
                      <h3 className="text-3xl font-black text-white mb-2 uppercase tracking-tight">¡Todo Listo!</h3>
                      <p className="text-slate-400">Redirigiendo a WhatsApp para finalizar la gestión.</p>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Tu Nombre</label>
                        <input
                          type="text" name="name" required value={form.name} onChange={handleChange}
                          className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-indigo-500 transition-all outline-none"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Email Corporativo / Personal</label>
                        <input
                          type="email" name="email" required value={form.email} onChange={handleChange}
                          className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-indigo-500 transition-all outline-none"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest">¿En qué podemos profundizar?</label>
                      <textarea
                        name="message" rows="4" required value={form.message} onChange={handleChange}
                        className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-indigo-500 transition-all outline-none"
                      ></textarea>
                    </div>
                    <button
                      type="submit" disabled={isSending}
                      className="w-full py-6 bg-indigo-600 text-white font-black rounded-2xl uppercase tracking-[0.2em] shadow-2xl shadow-indigo-600/30 hover:bg-indigo-500 active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                    >
                      {isSending ? "Validando..." : <><FaPaperPlane /> Iniciar Conversación</>}
                    </button>
                  </form>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* ──────────────── 3. GLOBAL INFO GRID ──────────────── */}
      <section className="py-24 bg-[#080B14] border-y border-white/5">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">

          <div className="flex items-start gap-6">
            <div className="p-4 bg-indigo-500/10 rounded-2xl text-indigo-400 text-2xl"><FaMapMarkerAlt /></div>
            <div>
              <h4 className="font-black text-white uppercase tracking-tighter mb-2">Visítanos</h4>
              <p className="text-slate-500 text-sm leading-relaxed">
                {CONTACT_INFO.location.address} <br />
                <span className="text-xs italic">{CONTACT_INFO.location.note}</span>
              </p>
            </div>
          </div>

          <div className="flex items-start gap-6">
            <div className="p-4 bg-amber-500/10 rounded-2xl text-amber-500 text-2xl"><FaClock /></div>
            <div>
              <h4 className="font-black text-white uppercase tracking-tighter mb-2">Atención Admisión</h4>
              <p className="text-slate-500 text-sm leading-relaxed">
                {CONTACT_INFO.schedule.week} <br />
                {CONTACT_INFO.schedule.weekend}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-6">
            <div className="p-4 bg-emerald-500/10 rounded-2xl text-emerald-400 text-2xl"><FaInstagram /></div>
            <div>
              <h4 className="font-black text-white uppercase tracking-tighter mb-2">Social Hub</h4>
              <p className="text-slate-500 text-sm leading-relaxed mb-4">Síguenos para tips de estudio y vida universitaria.</p>
              <a href={CONTACT_INFO.instagram.url} target="_blank" className="text-xs font-black text-indigo-400 hover:underline uppercase tracking-widest">@institutolael</a>
            </div>
          </div>

        </div>
      </section>

      {/* ──────────────── 4. DARK MAP EMBED ──────────────── */}
      <section className="h-[500px] w-full relative group grayscale invert contrast-125 opacity-40 hover:opacity-100 transition-opacity duration-1000">
        <iframe
          src={CONTACT_INFO.location.mapEmbed}
          className="w-full h-full border-none"
          loading="lazy"
          title="Mapa Lael 2.0"
        ></iframe>
        <div className="absolute inset-0 bg-indigo-900/10 pointer-events-none mix-blend-overlay"></div>
        <div className="absolute bottom-10 left-10 z-10">
          <div className="bg-slate-950 p-6 rounded-[2rem] border border-white/10 shadow-2xl">
            <div className="flex items-center gap-3 text-white font-black uppercase tracking-tighter">
              <MdVerified className="text-indigo-400" /> HQ Santiago de Chile
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}