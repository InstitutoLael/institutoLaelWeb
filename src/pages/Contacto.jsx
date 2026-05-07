import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Mail, Instagram, Clock, Send, CheckCircle } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const ease = [0.16, 1, 0.3, 1];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 1.1, delay, ease },
});

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
    <div className="w-full bg-lael-primary text-white overflow-hidden pt-20">
      <Helmet>
        <title>Contacto | Instituto Lael SpA</title>
        <meta name="description" content="WhatsApp +56 9 6462 6568 · contacto@institutolael.cl · Santiago, Chile." />
      </Helmet>

      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            
            {/* Left Col: Info */}
            <motion.div {...fadeUp(0)} className="space-y-12">
              <div>
                <motion.h1 
                  initial={{ clipPath: 'inset(0 100% 0 0)', opacity: 1 }}
                  animate={{ clipPath: 'inset(0 0% 0 0)', opacity: 1 }}
                  transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
                  className="text-5xl md:text-6xl font-display font-bold mb-8"
                >
                  Estamos a un <br />
                  <span className="italic italic-playfair text-lael-accent">mensaje de distancia.</span>
                </motion.h1>
                <p className="text-lael-muted text-lg leading-relaxed max-w-md">
                  No importa si eres un alumno con una duda técnica o un apoderado buscando orientación. Respondemos todo.
                </p>
              </div>

              <div className="space-y-8">
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-lael-accent shrink-0">
                    <MessageSquare size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">WhatsApp Directo</h4>
                    <p className="text-sm text-lael-muted mb-3">Respuesta rápida para inscripciones.</p>
                    <a href="https://wa.me/56964626568" target="_blank" rel="noreferrer" className="text-lael-accent font-bold hover:underline">
                      +56 9 6462 6568
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-lael-accent shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Email Institucional</h4>
                    <p className="text-sm text-lael-muted mb-3">Para consultas formales o empresas.</p>
                    <a href="mailto:contacto@institutolael.cl" className="text-lael-accent font-bold hover:underline">
                      contacto@institutolael.cl
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-lael-accent shrink-0">
                    <Clock size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Horarios de Atención</h4>
                    <p className="text-sm text-lael-muted">Lunes a Viernes: 09:00 - 19:00</p>
                    <p className="text-sm text-lael-muted">Sábados: 10:00 - 14:00</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Col: Form */}
            <motion.div {...fadeUp(0.2)} className="relative">
              <div className="absolute inset-0 bg-lael-accent/5 blur-3xl rounded-full -z-10" />
              <div className="bg-white/[0.03] border border-white/10 p-8 md:p-12 rounded-[40px] shadow-2xl">
                {submitted ? (
                  <div className="text-center py-20">
                    <div className="w-20 h-20 bg-lael-accent/20 text-lael-accent rounded-full flex items-center justify-center mx-auto mb-8">
                       <CheckCircle size={40} />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">¡Mensaje Preparado!</h3>
                    <p className="text-lael-muted mb-8">Hemos abierto tu gestor de correo para que envíes la consulta. ¡Te responderemos pronto!</p>
                    <button onClick={() => setSubmitted(false)} className="text-lael-accent font-bold hover:underline">Enviar otro mensaje</button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-lael-muted pl-1">Nombre Completo</label>
                      <input 
                        required
                        type="text" 
                        value={formData.nombre}
                        onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                        placeholder="Ej: Diego Chaparro"
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-lael-accent/50 transition-colors"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-lael-muted pl-1">Correo Electrónico</label>
                      <input 
                        required
                        type="email" 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder="tu@email.com"
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-lael-accent/50 transition-colors"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-lael-muted pl-1">Programa de Interés</label>
                      <select 
                        value={formData.programa}
                        onChange={(e) => setFormData({...formData, programa: e.target.value})}
                        className="w-full bg-[#1A1A1A] border border-white/10 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-lael-accent/50 transition-colors appearance-none"
                      >
                        <option value="PAES">PAES Gratuita</option>
                        <option value="Inglés">Inglés</option>
                        <option value="Coreano">Coreano</option>
                        <option value="LSCh">Lengua de Señas (LSCh)</option>
                        <option value="Otro">Otro / Consulta General</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-lael-muted pl-1">Mensaje</label>
                      <textarea 
                        required
                        rows="4"
                        value={formData.mensaje}
                        onChange={(e) => setFormData({...formData, mensaje: e.target.value})}
                        placeholder="Cuéntanos en qué podemos ayudarte..."
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-lael-accent/50 transition-colors resize-none"
                      />
                    </div>

                    <motion.button 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      type="submit"
                      className="w-full bg-lael-accent text-white py-5 rounded-2xl font-bold tracking-widest uppercase text-xs flex items-center justify-center gap-3 hover:bg-lael-rust transition-all shadow-xl shadow-lael-accent/10"
                    >
                      <Send size={16} />
                      Enviar Mensaje
                    </motion.button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
