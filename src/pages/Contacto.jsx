import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaWhatsapp, FaEnvelope, FaMapMarkerAlt, FaPaperPlane, FaInstagram, FaClock, FaArrowRight, FaHeadset, FaCheck
} from "react-icons/fa";
import SEOHead from "../components/SEOHead.jsx";
import { CONTACT_INFO, CONTACT_SUBJECTS } from "../data/contact.js";

// ANIMATIONS
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export default function Contacto() {
  const [form, setForm] = useState({ name: "", email: "", subject: "consulta", message: "" });
  const [isSending, setIsSending] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);

    // Simulate sending process (UX) before opening WhatsApp
    setTimeout(() => {
      // Find label for better formatting
      const subjectLabel = CONTACT_SUBJECTS.find(s => s.id === form.subject)?.label || form.subject;

      const text = `Hola *Instituto Lael* 👋%0A%0ASoy *${form.name}* y tengo una consulta.%0A%0A📌 *Motivo:* ${subjectLabel}%0A📝 *Mensaje:* ${form.message}%0A%0A(Mi correo es: ${form.email})`;

      const url = `https://wa.me/${CONTACT_INFO.whatsapp.number}?text=${text}`;
      window.open(url, '_blank', 'noopener,noreferrer');

      setIsSending(false);
      setSentSuccess(true);
      setForm({ name: "", email: "", subject: "consulta", message: "" });

      // Reset success message after 5s
      setTimeout(() => setSentSuccess(false), 5000);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500/30 overflow-x-hidden">
      <SEOHead title="Contacto | Instituto Lael" description="Hablemos. Estamos aquí para resolver tus dudas académicas y administrativas." />

      {/* ──────────────── 1. BACKGROUND GLOWS ──────────────── */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute -top-20 -left-20 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 pt-32 pb-20">

        {/* ──────────────── 2. HERO HEADER ──────────────── */}
        <motion.header
          initial="hidden" animate="visible" variants={fadeInUp}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Equipo de Admisión: En Línea
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-4 bg-gradient-to-r from-white via-white to-slate-400 bg-clip-text text-transparent">
            Hablemos de tu Futuro
          </h1>
          <p className="text-lg text-slate-400 max-w-xl mx-auto leading-relaxed">
            ¿Dudas sobre la PAES, Idiomas o Nivelación? <br />
            Nuestro equipo es real. Sin bots, solo respuestas claras.
          </p>
        </motion.header>

        {/* ──────────────── 3. QUICK GRID (Direct Links) ──────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        >
          {/* WhatsApp */}
          <a
            href={CONTACT_INFO.whatsapp.url}
            target="_blank" rel="noreferrer"
            className="group bg-slate-900/40 backdrop-blur border border-slate-800 p-6 rounded-2xl flex items-center gap-5 hover:border-emerald-500/30 hover:bg-slate-800/60 transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-white text-2xl shadow-lg shadow-emerald-900/20">
              <FaWhatsapp />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-white text-lg">WhatsApp</h3>
              <p className="text-slate-400 text-sm">Respuesta Prioritaria</p>
            </div>
            <FaArrowRight className="text-slate-600 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
          </a>

          {/* Email */}
          <a
            href={`mailto:${CONTACT_INFO.email.address}`}
            className="group bg-slate-900/40 backdrop-blur border border-slate-800 p-6 rounded-2xl flex items-center gap-5 hover:border-indigo-500/30 hover:bg-slate-800/60 transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center text-white text-xl shadow-lg shadow-indigo-900/20">
              <FaEnvelope />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-white text-lg">Email</h3>
              <p className="text-slate-400 text-sm truncate">{CONTACT_INFO.email.address}</p>
            </div>
            <FaArrowRight className="text-slate-600 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
          </a>

          {/* Instagram */}
          <a
            href={CONTACT_INFO.instagram.url}
            target="_blank" rel="noreferrer"
            className="group bg-slate-900/40 backdrop-blur border border-slate-800 p-6 rounded-2xl flex items-center gap-5 hover:border-pink-500/30 hover:bg-slate-800/60 transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center text-white text-xl shadow-lg shadow-pink-900/20">
              <FaInstagram />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-white text-lg">Instagram</h3>
              <p className="text-slate-400 text-sm">Vida estudiantil</p>
            </div>
            <FaArrowRight className="text-slate-600 group-hover:text-pink-400 group-hover:translate-x-1 transition-all" />
          </a>
        </motion.div>

        {/* ──────────────── 4. MAIN LAYOUT (Form + Map) ──────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

          {/* LEFT: GLASS FORM */}
          <motion.section
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-3 bg-slate-900 border border-slate-800 rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden"
          >
            {/* Success Overlay */}
            {sentSuccess && (
              <div className="absolute inset-0 z-20 bg-slate-900/95 flex flex-col items-center justify-center text-center p-8 animate-fadeIn">
                <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center text-white text-4xl mb-4 shadow-[0_0_30px_rgba(16,185,129,0.5)]">
                  <FaCheck />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">¡Todo listo!</h3>
                <p className="text-slate-400">Te hemos redirigido a WhatsApp para continuar la conversación.</p>
              </div>
            )}

            <div className="flex items-start gap-4 mb-8 border-b border-white/5 pb-6">
              <FaHeadset className="text-amber-400 text-3xl shrink-0" />
              <div>
                <h2 className="text-2xl font-bold text-white">Déjanos un Mensaje</h2>
                <p className="text-slate-400 text-sm">Elige el tema y te conectaremos con el experto adecuado.</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Nombre Completo</label>
                  <input
                    type="text" name="name"
                    placeholder="Ej: Marcela Paz"
                    required value={form.name} onChange={handleChange}
                    className="w-full bg-slate-950/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tu Correo</label>
                  <input
                    type="email" name="email"
                    placeholder="nombre@gmail.com"
                    required value={form.email} onChange={handleChange}
                    className="w-full bg-slate-950/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">¿Sobre qué quieres hablar?</label>
                <div className="relative">
                  <select
                    name="subject" value={form.subject} onChange={handleChange}
                    className="w-full appearance-none bg-slate-950/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-all cursor-pointer"
                  >
                    {CONTACT_SUBJECTS.map(s => (
                      <option key={s.id} value={s.id}>{s.label}</option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                    ▼
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Mensaje</label>
                <textarea
                  name="message" rows="4"
                  placeholder="Escribe aquí tu duda..."
                  required value={form.message} onChange={handleChange}
                  className="w-full bg-slate-950/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSending}
                className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-500/25 transition-all transform active:scale-98 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-wait"
              >
                {isSending ? (
                  'Abriendo WhatsApp...'
                ) : (
                  <> <FaPaperPlane /> Enviar Mensaje </>
                )}
              </button>
              <p className="text-center text-xs text-slate-600 pt-2 opacity-60">
                Al enviar, serás redirigido a WhatsApp Web o App.
              </p>
            </form>
          </motion.section>

          {/* RIGHT: DARK MAP & INFO */}
          <aside className="lg:col-span-2 space-y-6">

            {/* Info Box: Schedule */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex items-start gap-4"
            >
              <FaClock className="text-amber-500 text-xl mt-1" />
              <div>
                <h4 className="font-bold text-white mb-1">Horarios de Atención</h4>
                <p className="text-sm text-slate-400 block">{CONTACT_INFO.schedule.week}</p>
                <p className="text-sm text-slate-400 block">{CONTACT_INFO.schedule.weekend}</p>
              </div>
            </motion.div>

            {/* Info Box: Location */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex items-start gap-4"
            >
              <FaMapMarkerAlt className="text-amber-500 text-xl mt-1" />
              <div>
                <h4 className="font-bold text-white mb-1">{CONTACT_INFO.location.name}</h4>
                <p className="text-sm text-slate-400 mb-2">{CONTACT_INFO.location.address}</p>
                <span className="text-xs bg-slate-800 text-slate-500 px-2 py-1 rounded border border-slate-700 italic">
                  {CONTACT_INFO.location.note}
                </span>
              </div>
            </motion.div>

            {/* Dark Google Map */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="h-[300px] bg-slate-800 rounded-2xl overflow-hidden border border-slate-800 relative group"
            >
              <iframe
                src={CONTACT_INFO.location.mapEmbed}
                className="w-full h-full grayscale invert brightness-90 contrast-125 opacity-70 group-hover:opacity-100 transition-opacity duration-500"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mapa Ubicación Lael"
              ></iframe>
              {/* Overlay to enforce dark mode look */}
              <div className="absolute inset-0 bg-indigo-900/10 pointer-events-none mix-blend-overlay"></div>
            </motion.div>

          </aside>

        </div>
      </div>
    </div>
  );
}