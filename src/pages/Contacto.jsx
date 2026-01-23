import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaWhatsapp, FaEnvelope, FaMapMarkerAlt, FaPaperPlane, FaInstagram, FaClock,
  FaArrowRight, FaHeadset, FaCheck, FaGraduationCap, FaBuilding, FaChalkboardTeacher,
  FaLifeRing, FaTimes
} from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import SEOHead from "../components/SEOHead.jsx";
import { CONTACT_INFO, CONTACT_SUBJECTS } from "../data/contact.js";

// --- STEP DATA ---
const PORTALS = [
  {
    id: "student",
    title: "Soy Estudiante",
    subtitle: "PAES, Idiomas o Nivelación",
    icon: <FaGraduationCap />,
    color: "from-blue-600 to-indigo-700",
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
    color: "from-emerald-600 to-teal-700",
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
    color: "from-amber-600 to-orange-700",
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
    color: "from-rose-600 to-red-700",
    actions: [
      { label: "Problemas de Acceso", type: "whatsapp", msg: "Hola, tengo problemas con la plataforma." },
      { label: "Dudas de Facturación", type: "form", subject: "pagos" }
    ]
  }
];

export default function Contacto() {
  const [step, setStep] = useState(1);
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
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-indigo-500/30 overflow-x-hidden relative">
      <SEOHead title="Hub de Admisión | Experience 2.0 | Instituto Lael" description="Centro inteligente de atención al estudiante y partners corporativos." />

      {/* Ambient Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 opacity-10 bg-[url('/textures/carbon-fibre.png')] bg-repeat"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-96 bg-indigo-600/10 blur-[100px] rounded-full"></div>
      </div>

      <div className="relative z-10">
        {/* ──────────────── 1. HERO HEADER ──────────────── */}
        <header className="pt-40 pb-20 px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="container mx-auto max-w-5xl"
          >
            <div className="inline-flex items-center gap-2 bg-indigo-500/5 border border-indigo-500/20 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.4em] mb-10 text-indigo-400">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></span> Sistema de Admisión 2.0
            </div>
            <h1 className="text-6xl md:text-8xl font-black mb-8 leading-[0.85] tracking-tighter uppercase">
              ¿Cómo podemos <br />
              <span className="bg-gradient-to-r from-white via-indigo-200 to-indigo-500 bg-clip-text text-transparent italic">Impulsarte?</span>
            </h1>
            <p className="text-xl text-slate-500 font-light max-w-2xl mx-auto leading-relaxed">
              Selecciona tu perfil para una atención especializada. Sin esperas, sin burocracia, directo a la solución.
            </p>
          </motion.div>
        </header>

        {/* ──────────────── 2. GLOBAL INFO GRID (PRIORITIZED) ──────────────── */}
        <section className="pb-24 bg-white/[0.01]">
          <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex items-start gap-6 bg-white/[0.03] p-8 rounded-[2rem] border border-white/5">
              <div className="w-14 h-14 shrink-0 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-400 text-xl border border-indigo-500/20"><FaMapMarkerAlt /></div>
              <div>
                <h4 className="font-black text-white uppercase tracking-tighter text-lg mb-2">Presencia Regional</h4>
                <p className="text-slate-500 text-xs leading-relaxed">
                  {CONTACT_INFO.location.address} <br />
                  <span className="text-[9px] font-black text-indigo-400 mt-2 block uppercase tracking-widest">Atención 100% Digital</span>
                </p>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="flex items-start gap-6 bg-white/[0.03] p-8 rounded-[2rem] border border-white/5">
              <div className="w-14 h-14 shrink-0 bg-amber-500/10 rounded-2xl flex items-center justify-center text-amber-500 text-xl border border-amber-500/20"><FaClock /></div>
              <div>
                <h4 className="font-black text-white uppercase tracking-tighter text-lg mb-2">Ciclo de Atención</h4>
                <p className="text-slate-500 text-xs leading-relaxed">
                  {CONTACT_INFO.schedule.week} <br />
                  <span className="text-slate-400">{CONTACT_INFO.schedule.weekend}</span>
                </p>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="flex items-start gap-6 bg-white/[0.03] p-8 rounded-[2rem] border border-white/5">
              <div className="w-14 h-14 shrink-0 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-400 text-xl border border-emerald-500/20"><FaInstagram /></div>
              <div>
                <h4 className="font-black text-white uppercase tracking-tighter text-lg mb-2">Comunidad</h4>
                <p className="text-slate-500 text-xs leading-relaxed mb-3">Síguenos para novedades y tips diarios.</p>
                <a href={CONTACT_INFO.instagram.url} target="_blank" className="text-xs font-black text-indigo-400 hover:text-white transition-colors uppercase tracking-[0.2em]">@institutolael</a>
              </div>
            </motion.div>

          </div>
        </section>

        {/* ──────────────── 3. INTERACTIVE DECISION TREE ──────────────── */}
        <section className="container mx-auto px-6 pb-40 min-h-[600px]">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto"
              >
                {PORTALS.map((portal) => (
                  <motion.button
                    key={portal.id}
                    onClick={() => handlePortalSelect(portal)}
                    whileHover={{ y: -10 }}
                    className="group relative h-96 bg-white/[0.02] border border-white/5 rounded-[3.5rem] overflow-hidden flex flex-col items-center justify-center p-10 transition-all duration-500 hover:border-indigo-500/30 hover:shadow-2xl hover:shadow-indigo-500/10 active:scale-95 backdrop-blur-3xl"
                  >
                    <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('/textures/pinstripe-dark.png')] bg-repeat"></div>
                    <div className={`w-24 h-24 rounded-3xl bg-gradient-to-br ${portal.color} flex items-center justify-center text-4xl text-white mb-8 shadow-xl group-hover:scale-110 transition-transform duration-500`}>
                      {portal.icon}
                    </div>
                    <h3 className="text-2xl font-black text-white mb-2 uppercase tracking-tighter">{portal.title}</h3>
                    <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em]">{portal.subtitle}</p>

                    <div className="absolute bottom-10 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0 text-indigo-400 font-black text-[10px] uppercase tracking-widest flex items-center gap-2">
                      Seleccionar <FaArrowRight />
                    </div>
                  </motion.button>
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
                    className="w-12 h-12 flex items-center justify-center bg-white/5 rounded-2xl hover:bg-white/10 transition-colors text-slate-400 hover:text-white border border-white/5"
                  >
                    <FaTimes />
                  </button>
                  <div>
                    <h3 className="text-4xl font-black text-white uppercase tracking-tighter">{selectedPortal.title}</h3>
                    <p className="text-indigo-400 uppercase font-black text-[10px] tracking-[0.3em]">{selectedPortal.subtitle}</p>
                  </div>
                </div>

                {!showForm ? (
                  <div className="grid grid-cols-1 gap-6">
                    {selectedPortal.actions.map((action, i) => (
                      <motion.button
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        onClick={() => handleAction(action)}
                        className="p-10 bg-white/[0.02] border border-white/5 rounded-[2.5rem] flex items-center justify-between group hover:border-indigo-500/30 hover:bg-indigo-500/5 transition-all backdrop-blur-3xl"
                      >
                        <div className="flex items-center gap-8">
                          <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-2xl text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                            {action.type === 'whatsapp' ? <FaWhatsapp /> : <FaEnvelope />}
                          </div>
                          <span className="text-2xl font-black text-white uppercase tracking-tighter">{action.label}</span>
                        </div>
                        <FaArrowRight className="text-slate-700 group-hover:text-indigo-400 group-hover:translate-x-3 transition-all text-xl" />
                      </motion.button>
                    ))}
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white/[0.02] border border-white/5 p-12 rounded-[3.5rem] shadow-2xl relative backdrop-blur-3xl"
                  >
                    <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('/textures/pinstripe-dark.png')] bg-repeat"></div>
                    {sentSuccess && (
                      <div className="absolute inset-0 z-20 bg-slate-950/95 flex flex-col items-center justify-center text-center p-10 rounded-[3.5rem]">
                        <div className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-500 text-5xl mb-8 shadow-2xl shadow-emerald-500/20">
                          <FaCheck />
                        </div>
                        <h3 className="text-4xl font-black text-white mb-4 uppercase tracking-tighter">¡Solicitud Recibida!</h3>
                        <p className="text-slate-500">Estamos abriendo un canal directo de WhatsApp para ti.</p>
                      </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-10 relative z-10">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="space-y-3">
                          <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-4">Identificación</label>
                          <input
                            type="text" name="name" placeholder="Tu nombre completo" required value={form.name} onChange={handleChange}
                            className="w-full bg-white/5 border border-white/10 rounded-[1.5rem] px-8 py-5 text-white focus:border-indigo-500 transition-all outline-none placeholder:text-slate-700 font-bold"
                          />
                        </div>
                        <div className="space-y-3">
                          <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-4">Canal de Contacto</label>
                          <input
                            type="email" name="email" placeholder="email@ejemplo.com" required value={form.email} onChange={handleChange}
                            className="w-full bg-white/5 border border-white/10 rounded-[1.5rem] px-8 py-5 text-white focus:border-indigo-500 transition-all outline-none placeholder:text-slate-700 font-bold"
                          />
                        </div>
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-4">Mensaje o Dudas</label>
                        <textarea
                          name="message" rows="5" placeholder="Cuéntanos en qué podemos ayudarte..." required value={form.message} onChange={handleChange}
                          className="w-full bg-white/5 border border-white/10 rounded-[1.5rem] px-8 py-5 text-white focus:border-indigo-500 transition-all outline-none placeholder:text-slate-700 font-bold resize-none"
                        ></textarea>
                      </div>
                      <button
                        type="submit" disabled={isSending}
                        className="w-full py-8 bg-white text-slate-950 font-black rounded-[1.5rem] uppercase tracking-[0.3em] shadow-xl shadow-white/5 hover:bg-indigo-600 hover:text-white active:scale-95 transition-all flex items-center justify-center gap-4 disabled:opacity-50 text-xs"
                      >
                        {isSending ? "Validando Protocolo..." : <><FaPaperPlane /> Procesar Solicitud</>}
                      </button>
                    </form>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </div>
    </div>
      </div>
    </div>
  );
}