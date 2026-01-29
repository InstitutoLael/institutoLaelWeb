import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaWhatsapp, FaEnvelope, FaClock, FaPaperPlane, FaInstagram,
  FaArrowRight, FaGraduationCap, FaBuilding, FaChalkboardTeacher,
  FaLifeRing, FaTimes, FaCheck
} from "react-icons/fa";
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
      const url = `https://wa.me/56964626568?text=${encodeURIComponent(action.msg)}`;
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
      window.open(`https://wa.me/56964626568?text=${text}`, '_blank');
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
      <SEOHead title="Contacto y Soporte | Instituto Lael" description="Canales de atención directa para estudiantes y empresas." />

      {/* Hero Section */}
      <header className="pt-32 pb-20 px-6 text-center">
         <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           className="container mx-auto max-w-4xl"
         >
            <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight tracking-tighter uppercase">
               Somos <br /> <span className="text-indigo-500">Instituto Lael.</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-400 font-light leading-relaxed mb-6">
               Nacimos para democratizar la educación de calidad. Creemos que la tecnología debe servir a las personas, no al revés.
            </p>
         </motion.div>
      </header>

      {/* ──────────────── 2. CONTACT DATA (HARD DATA) ──────────────── */}
      <section className="pb-24">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
           
           {/* Whatsapp */}
           <div className="bg-white/[0.03] p-8 rounded-3xl border border-white/5 flex flex-col items-center text-center hover:bg-white/5 transition-colors group">
              <div className="w-16 h-16 bg-[#25D366]/10 text-[#25D366] rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform"><FaWhatsapp /></div>
              <h3 className="text-lg font-black uppercase text-white mb-2">WhatsApp Directo</h3>
              <p className="text-slate-400 text-sm mb-4">+56 9 6462 6568</p>
              <a href="https://wa.me/56964626568" target="_blank" className="text-xs font-black uppercase tracking-widest text-indigo-400 hover:text-white">Iniciar Chat</a>
           </div>

           {/* Email */}
           <div className="bg-white/[0.03] p-8 rounded-3xl border border-white/5 flex flex-col items-center text-center hover:bg-white/5 transition-colors group">
              <div className="w-16 h-16 bg-amber-500/10 text-amber-500 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform"><FaEnvelope /></div>
              <h3 className="text-lg font-black uppercase text-white mb-2">Correo Electrónico</h3>
              <p className="text-slate-400 text-sm mb-4">contacto@institutolael.cl</p>
              <a href="mailto:contacto@institutolael.cl" className="text-xs font-black uppercase tracking-widest text-indigo-400 hover:text-white">Enviar Correo</a>
           </div>

           {/* Schedule */}
           <div className="bg-white/[0.03] p-8 rounded-3xl border border-white/5 flex flex-col items-center text-center hover:bg-white/5 transition-colors group">
              <div className="w-16 h-16 bg-blue-500/10 text-blue-500 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform"><FaClock /></div>
              <h3 className="text-lg font-black uppercase text-white mb-2">Horario Atención</h3>
              <p className="text-slate-400 text-sm mb-1">Lunes a Viernes</p>
              <p className="text-white font-bold text-lg">09:00 - 19:00 hrs</p>
           </div>

        </div>
      </section>

      {/* ──────────────── 3. INTERACTIVE PORTAL ──────────────── */}
      <section className="container mx-auto px-6 pb-40">
        <h2 className="text-3xl font-black text-center text-white uppercase tracking-tighter mb-12">Selecciona tu Perfil</h2>
        
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {PORTALS.map((portal) => (
                <motion.button
                  key={portal.id}
                  onClick={() => handlePortalSelect(portal)}
                  whileHover={{ y: -5 }}
                  className="group bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-8 flex flex-col items-center text-center hover:border-indigo-500/30 transition-all cursor-pointer"
                >
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${portal.color} flex items-center justify-center text-3xl text-white mb-6 shadow-xl`}>
                    {portal.icon}
                  </div>
                  <h3 className="text-xl font-black text-white mb-1 uppercase tracking-tight">{portal.title}</h3>
                  <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em]">{portal.subtitle}</p>
                </motion.button>
              ))}
            </motion.div>
          )}

          {step === 2 && selectedPortal && (
             <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="max-w-3xl mx-auto bg-white/[0.02] border border-white/5 rounded-[3rem] p-10 relative"
             >
                <button
                  onClick={backToPortals}
                  className="absolute top-8 right-8 w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-slate-400 hover:text-white"
                >
                  <FaTimes />
                </button>

                <h3 className="text-3xl font-black text-white uppercase tracking-tighter mb-8">{selectedPortal.title}</h3>

                {!showForm ? (
                   <div className="grid gap-4">
                      {selectedPortal.actions.map((action, i) => (
                         <button
                           key={i}
                           onClick={() => handleAction(action)}
                           className="flex items-center justify-between p-6 bg-white/5 rounded-2xl hover:bg-white/10 transition-colors group text-left"
                         >
                            <span className="font-bold text-white uppercase tracking-tight">{action.label}</span>
                            <FaArrowRight className="text-slate-600 group-hover:text-indigo-400 transform group-hover:translate-x-2 transition-all" />
                         </button>
                      ))}
                   </div>
                ) : (
                   <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                         <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-2">Nombre</label>
                         <input type="text" name="name" required value={form.name} onChange={handleChange} className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-indigo-500 outline-none" placeholder="Tu nombre" />
                      </div>
                      <div>
                         <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-2">Email</label>
                         <input type="email" name="email" required value={form.email} onChange={handleChange} className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-indigo-500 outline-none" placeholder="tucorreo@ejemplo.com" />
                      </div>
                      <div>
                         <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-2">Mensaje</label>
                         <textarea name="message" rows="4" required value={form.message} onChange={handleChange} className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-indigo-500 outline-none" placeholder="¿En qué podemos ayudarte?"></textarea>
                      </div>
                      <button type="submit" disabled={isSending} className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-black uppercase tracking-widest rounded-xl transition-all disabled:opacity-50">
                         {isSending ? "Enviando..." : "Enviar Solicitud"}
                      </button>
                   </form>
                )}
             </motion.div>
          )}
        </AnimatePresence>
      </section>

    </div>
  );
}