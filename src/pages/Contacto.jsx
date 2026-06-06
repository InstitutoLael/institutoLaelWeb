import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Mail, Instagram, Clock, Send, CheckCircle } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

// Brand Design Tokens
const BLUE = '#071D49';
const YELLOW = '#D7E400';
const WHITE = '#FFFFFF';
const LIGHT_GRAY = '#F4F4F4';
const MUTED = '#8D8D8D';

const ease = [0.16, 1, 0.3, 1];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, delay, ease }
});

// TikTok SVG Icon (no está en Lucide)
const TikTokIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.89a8.27 8.27 0 0 0 4.83 1.55V7.01a4.85 4.85 0 0 1-1.06-.32z"/>
  </svg>
);

export default function Contacto() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    programa: 'PAES',
    mensaje: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = `Consulta Lael: ${formData.nombre} - ${formData.programa}`;
    const body = `Nombre: ${formData.nombre}\nEmail: ${formData.email}\nPrograma: ${formData.programa}\n\nMensaje:\n${formData.mensaje}`;
    window.location.href = `mailto:contacto@institutolael.cl?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSubmitted(true);
  };

  return (
    <div className="w-full text-[#071D49] overflow-hidden pt-20" style={{ backgroundColor: LIGHT_GRAY }}>
      <Helmet>
        <title>Contacto | Instituto Lael</title>
        <meta name="description" content="Escríbenos directamente por WhatsApp +56 9 6462 6568 o a contacto@institutolael.cl. Santiago, Chile. Educación 100% online." />
      </Helmet>

      <section className="py-24 px-6 min-h-[85vh] flex items-center">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Left Col: Info */}
            <motion.div {...fadeUp(0)} className="lg:col-span-5 space-y-12 text-left">
              <div>
                <motion.h1 
                  initial={{ clipPath: 'inset(0 100% 0 0)', opacity: 1 }}
                  animate={{ clipPath: 'inset(0 0% 0 0)', opacity: 1 }}
                  transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
                  className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold mb-8 uppercase tracking-tight"
                  style={{ color: BLUE }}
                >
                  Estamos a un <br />
                  <span className="italic font-normal text-[#D7E400] capitalize">mensaje de distancia.</span>
                </motion.h1>
                <p className="text-[#8D8D8D] text-sm sm:text-base leading-relaxed max-w-md">
                  No importa si eres un alumno con una duda técnica, un apoderado buscando orientación o quieres consultarnos sobre inscripciones. Respondemos todo de forma directa.
                </p>
              </div>

              {/* Contact Methods */}
              <div className="space-y-6">
                <a 
                  href="https://wa.me/56964626568?text=Hola,%20tengo%20una%20consulta."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-6 group hover:translate-x-1 transition-transform"
                >
                  <div className="w-12 h-12 rounded-xl bg-white border border-[#071D49]/10 flex items-center justify-center text-[#071D49] group-hover:bg-[#D7E400]/20 group-hover:border-[#D7E400]/40 transition-all">
                    <MessageSquare size={20} />
                  </div>
                  <div>
                    <p className="text-[9px] tracking-[0.2em] uppercase font-bold text-[#8D8D8D] mb-0.5">WhatsApp Directo</p>
                    <p className="text-base font-bold text-[#071D49]">+56 9 6462 6568</p>
                  </div>
                </a>

                <a 
                  href="mailto:contacto@institutolael.cl"
                  className="flex items-center gap-6 group hover:translate-x-1 transition-transform"
                >
                  <div className="w-12 h-12 rounded-xl bg-white border border-[#071D49]/10 flex items-center justify-center text-[#071D49] group-hover:bg-[#D7E400]/20 group-hover:border-[#D7E400]/40 transition-all">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-[9px] tracking-[0.2em] uppercase font-bold text-[#8D8D8D] mb-0.5">Email Institucional</p>
                    <p className="text-base font-bold text-[#071D49]">contacto@institutolael.cl</p>
                  </div>
                </a>

                <a 
                  href="https://instagram.com/institutolael"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-6 group hover:translate-x-1 transition-transform"
                >
                  <div className="w-12 h-12 rounded-xl bg-white border border-[#071D49]/10 flex items-center justify-center text-[#071D49] group-hover:bg-[#D7E400]/20 group-hover:border-[#D7E400]/40 transition-all">
                    <Instagram size={20} />
                  </div>
                  <div>
                    <p className="text-[9px] tracking-[0.2em] uppercase font-bold text-[#8D8D8D] mb-0.5">Instagram</p>
                    <p className="text-base font-bold text-[#071D49]">@institutolael</p>
                  </div>
                </a>

                <a 
                  href="https://tiktok.com/@institutolael"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-6 group hover:translate-x-1 transition-transform"
                >
                  <div className="w-12 h-12 rounded-xl bg-white border border-[#071D49]/10 flex items-center justify-center text-[#071D49] group-hover:bg-[#D7E400]/20 group-hover:border-[#D7E400]/40 transition-all">
                    <TikTokIcon size={20} />
                  </div>
                  <div>
                    <p className="text-[9px] tracking-[0.2em] uppercase font-bold text-[#8D8D8D] mb-0.5">TikTok</p>
                    <p className="text-base font-bold text-[#071D49]">@institutolael</p>
                  </div>
                </a>

                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 rounded-xl bg-white border border-[#071D49]/10 flex items-center justify-center text-[#071D49]">
                    <Clock size={20} />
                  </div>
                  <div>
                    <p className="text-[9px] tracking-[0.2em] uppercase font-bold text-[#8D8D8D] mb-0.5">Horario de Soporte</p>
                    <p className="text-base font-bold text-[#071D49]">Lunes a Viernes · 09:00 - 20:00</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Col: Form */}
            <motion.div {...fadeUp(0.2)} className="lg:col-span-7 bg-white p-8 sm:p-12 rounded-[40px] border border-[#071D49]/10 shadow-card">
              {submitted ? (
                <div className="text-center py-12">
                   <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle size={32} />
                   </div>
                   <h3 className="text-2xl font-display font-extrabold text-[#071D49] mb-4">¡MENSAJE ENVIADO!</h3>
                   <p className="text-[#8D8D8D] text-sm leading-relaxed max-w-sm mx-auto">
                     Hemos abierto tu cliente de correo para enviar la consulta. Te responderemos a la brevedad.
                   </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6 text-left">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[9px] uppercase tracking-[0.25em] font-extrabold text-[#071D49] ml-1">Nombre Completo</label>
                      <input 
                        type="text"
                        required
                        placeholder="Tu nombre real"
                        className="w-full bg-[#F4F4F4] border border-[#071D49]/10 rounded-2xl px-6 py-4 focus:bg-white focus:border-[#D7E400] focus:ring-0 transition-all text-[#071D49] text-sm placeholder:text-[#8D8D8D]/40 outline-none"
                        value={formData.nombre}
                        onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] uppercase tracking-[0.25em] font-extrabold text-[#071D49] ml-1">Email de Contacto</label>
                      <input 
                        type="email"
                        required
                        placeholder="ejemplo@email.com"
                        className="w-full bg-[#F4F4F4] border border-[#071D49]/10 rounded-2xl px-6 py-4 focus:bg-white focus:border-[#D7E400] focus:ring-0 transition-all text-[#071D49] text-sm placeholder:text-[#8D8D8D]/40 outline-none"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-[0.25em] font-extrabold text-[#071D49] ml-1">Programa de Interés</label>
                    <select 
                      className="w-full bg-[#F4F4F4] border border-[#071D49]/10 rounded-2xl px-6 py-4 focus:bg-white focus:border-[#D7E400] focus:ring-0 transition-all text-[#071D49] text-sm outline-none cursor-pointer"
                      value={formData.programa}
                      onChange={(e) => setFormData({...formData, programa: e.target.value})}
                    >
                      <option value="PAES">PAES Gratuito</option>
                      <option value="Idiomas">Inglés / Coreano</option>
                      <option value="LSCh">Lengua de Señas (LSCh)</option>
                      <option value="Otro">Otro requerimiento</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-[0.25em] font-extrabold text-[#071D49] ml-1">Tu Mensaje</label>
                    <textarea 
                      rows="5"
                      required
                      placeholder="Cuéntanos cómo podemos ayudarte..."
                      className="w-full bg-[#F4F4F4] border border-[#071D49]/10 rounded-2xl px-6 py-4 focus:bg-white focus:border-[#D7E400] focus:ring-0 transition-all text-[#071D49] text-sm placeholder:text-[#8D8D8D]/40 outline-none resize-none"
                      value={formData.mensaje}
                      onChange={(e) => setFormData({...formData, mensaje: e.target.value})}
                    ></textarea>
                  </div>

                  <motion.button 
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    type="submit" 
                    className="w-full bg-[#071D49] hover:bg-[#D7E400] text-white hover:text-[#071D49] py-5 rounded-2xl font-display font-extrabold uppercase tracking-[0.3em] text-[10px] flex items-center justify-center gap-3 transition-colors duration-300 shadow-md outline-none"
                  >
                    <span>ENVIAR CONSULTA</span>
                    <Send size={14} />
                  </motion.button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
