import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaWhatsapp, FaEnvelope, FaClock, FaPaperPlane, FaInstagram,
  FaMapMarkerAlt, FaExclamationTriangle, FaCheckCircle
} from "react-icons/fa";
import SEOHead from "../components/SEOHead.jsx";
import { CONTACT_INFO, CONTACT_SUBJECTS } from "../data/contact.js";
import { supabase } from "../lib/supabaseClient";
import toast from "react-hot-toast";

import { formatPhone } from "../utils/formatters";

export default function Contacto() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "general", message: "" });
  const [isSending, setIsSending] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const finalValue = name === "phone" ? formatPhone(value) : value;
    setForm(prev => ({ ...prev, [name]: finalValue }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);
    
    try {
      const { error } = await supabase.from('leads').insert([{
        name: form.name,
        email: form.email,
        phone: form.phone,
        message: form.message,
        subject: form.subject,
        type: 'contact',
        status: 'nuevo'
      }]);

      if (error) throw error;

      setIsSending(false);
      setSentSuccess(true);
      toast.success('¡Mensaje enviado con éxito!');
      setForm({ name: "", email: "", phone: "", subject: "general", message: "" });
      
      setTimeout(() => setSentSuccess(false), 5000);
    } catch (error) {
      console.error("Error al enviar el mensaje:", error);
      toast.error('Hubo un problema al enviar tu mensaje. Intenta por WhatsApp.');
      setIsSending(false);
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(CONTACT_INFO.email.address);
    alert("Correo copiado al portapapeles");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-indigo-500/30 overflow-x-hidden relative">
      <SEOHead title="Contacto | Instituto Lael" description="Hablemos. Estamos a un clic de distancia para resolver todas tus dudas." />

      {/* ──────────────── 1. HERO SECTION ──────────────── */}
      <header className="pt-40 pb-20 px-6 text-center relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(99,102,241,0.05)_0%,_transparent_70%)] pointer-events-none" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="container mx-auto max-w-4xl relative z-10"
        >
          <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight tracking-tighter uppercase">
            Hablemos<span className="text-indigo-500">.</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-400 font-light leading-relaxed max-w-2xl mx-auto">
            ¿Dudas? Estamos a un clic de distancia para acompañarte en tu próximo gran paso.
          </p>
        </motion.div>
      </header>

      {/* ──────────────── 2. MAIN CONTENT GRID ──────────────── */}
      <main className="container mx-auto px-6 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* LEFT COLUMN: Información y Confianza */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            {/* Canales Directos */}
            <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-10 shadow-2xl">
              <h3 className="text-sm font-black uppercase tracking-[0.2em] text-indigo-400 mb-8">Canales Directos</h3>
              
              <div className="grid gap-4">
                {/* WhatsApp Action */}
                <a 
                  href={CONTACT_INFO.whatsapp.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-6 bg-emerald-600/10 border border-emerald-500/20 rounded-2xl hover:bg-emerald-600/20 transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-500 text-white rounded-xl flex items-center justify-center text-2xl shadow-lg shadow-emerald-500/20">
                      <FaWhatsapp />
                    </div>
                    <div>
                      <p className="text-xs font-black uppercase tracking-widest text-emerald-400">Atención Inmediata</p>
                      <p className="text-lg font-bold text-white">{CONTACT_INFO.whatsapp.label}</p>
                    </div>
                  </div>
                  <FaPaperPlane className="text-emerald-500/50 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </a>

                {/* Email Action */}
                <button 
                  onClick={copyEmail}
                  className="flex items-center justify-between p-6 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-all group text-left"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/10 text-white rounded-xl flex items-center justify-center text-2xl">
                      <FaEnvelope />
                    </div>
                    <div>
                      <p className="text-xs font-black uppercase tracking-widest text-slate-500">Correo Electrónico</p>
                      <p className="text-lg font-bold text-white truncate max-w-[200px] md:max-w-none">{CONTACT_INFO.email.address}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity">Copiar</span>
                </button>

                {/* Instagram Action */}
                <a 
                  href={CONTACT_INFO.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-6 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-all group text-left"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-tr from-amber-500 via-pink-500 to-purple-600 text-white rounded-xl flex items-center justify-center text-2xl">
                      <FaInstagram />
                    </div>
                    <div>
                      <p className="text-xs font-black uppercase tracking-widest text-slate-500">Comunidad</p>
                      <p className="text-lg font-bold text-white">{CONTACT_INFO.instagram.user}</p>
                    </div>
                  </div>
                  <FaPaperPlane className="text-slate-700 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>

            {/* Horarios */}
            <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-10 shadow-2xl">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-10 bg-indigo-500/10 text-indigo-400 rounded-xl flex items-center justify-center text-xl">
                  <FaClock />
                </div>
                <h3 className="text-sm font-black uppercase tracking-[0.2em] text-white">Horarios de Atención</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-white/5 pb-4">
                   <span className="text-slate-400 text-sm font-medium">Semana</span>
                   <span className="text-white font-bold">{CONTACT_INFO.schedule.week}</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/5 pb-4">
                   <span className="text-slate-400 text-sm font-medium">Sábados</span>
                   <span className="text-white font-bold">{CONTACT_INFO.schedule.weekend}</span>
                </div>
                <div className="pt-2">
                   <span className="text-indigo-400 text-xs font-black uppercase tracking-widest">{CONTACT_INFO.schedule.note}</span>
                </div>
              </div>
            </div>

            {/* Ubicación y Warning */}
            <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-10 shadow-2xl">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-10 bg-amber-500/10 text-amber-500 rounded-xl flex items-center justify-center text-xl">
                  <FaMapMarkerAlt />
                </div>
                <h3 className="text-sm font-black uppercase tracking-[0.2em] text-white">{CONTACT_INFO.location.title}</h3>
              </div>
              
              <div className="space-y-6">
                <div>
                  <p className="text-white font-bold text-lg mb-1">{CONTACT_INFO.location.address}</p>
                  <p className="text-slate-500 text-sm">Chile</p>
                </div>

                <div className="inline-flex items-center gap-3 px-5 py-3 bg-amber-500/10 border border-amber-500/20 rounded-2xl text-amber-500">
                  <FaExclamationTriangle className="shrink-0" />
                  <p className="text-xs font-black uppercase tracking-widest leading-relaxed">
                    {CONTACT_INFO.location.note}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Formulario de Acción */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="sticky top-32"
          >
            <div className="bg-slate-900 border border-white/10 rounded-[3rem] p-10 md:p-14 shadow-2xl relative overflow-hidden">
              {/* Form entries */}
              <div className="relative z-10">
                <div className="mb-10">
                  <h2 className="text-3xl font-black text-white uppercase tracking-tighter mb-2">Envíanos un mensaje</h2>
                  <p className="text-slate-500 text-sm font-medium">Responderemos en menos de 24 horas hábiles.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Nombre */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Nombre Completo</label>
                    <input 
                      type="text" name="name" required value={form.name} onChange={handleChange}
                      className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-slate-700 focus:border-indigo-500 outline-none transition-all"
                      placeholder="Ej: Diego Chaparro"
                    />
                  </div>

                  {/* Email & Phone Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Correo Electrónico</label>
                      <input 
                        type="email" name="email" required value={form.email} onChange={handleChange}
                        className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-slate-700 focus:border-indigo-500 outline-none transition-all"
                        placeholder="tucorreo@ejemplo.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Teléfono</label>
                      <input 
                        type="tel" name="phone" required value={form.phone} onChange={handleChange}
                        className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-slate-700 focus:border-indigo-500 outline-none transition-all"
                        placeholder="+56 9 XXXX XXXX"
                      />
                    </div>
                  </div>

                  {/* Subject Select */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">¿En qué podemos ayudarte?</label>
                    <select 
                      name="subject" value={form.subject} onChange={handleChange}
                      className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-indigo-500 outline-none transition-all appearance-none cursor-pointer"
                    >
                      {CONTACT_SUBJECTS.map(s => (
                        <option key={s.id} value={s.id} className="bg-slate-900">{s.label}</option>
                      ))}
                    </select>
                  </div>

                  {/* Mensaje */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Tu Mensaje</label>
                    <textarea 
                      name="message" rows="4" required value={form.message} onChange={handleChange}
                      className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-slate-700 focus:border-indigo-500 outline-none transition-all resize-none"
                      placeholder="Escribe aquí tu consulta..."
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <button 
                    type="submit" 
                    disabled={isSending || sentSuccess}
                    className={`w-full py-5 rounded-2xl font-black uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-3 active:scale-95 ${sentSuccess ? 'bg-emerald-600' : 'bg-indigo-600 hover:bg-indigo-500'} disabled:opacity-50`}
                  >
                    {isSending ? (
                      <span className="flex items-center gap-2">
                        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}><FaPaperPlane /></motion.div>
                        Enviando...
                      </span>
                    ) : sentSuccess ? (
                      <span className="flex items-center gap-2">
                        <FaCheckCircle /> ¡Mensaje Recibido!
                      </span>
                    ) : (
                      "Enviar Mensaje"
                    )}
                  </button>
                </form>
              </div>

              {/* Decorative light effect */}
              <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-indigo-500/10 blur-[80px] rounded-full pointer-events-none" />
            </div>
          </motion.div>

        </div>
      </main>
    </div>
  );
}