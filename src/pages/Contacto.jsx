import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Mail, Instagram, Clock, Send, CheckCircle } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const ease = [0.16, 1, 0.3, 1];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, delay, ease }
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

              <div className="space-y-10">
               <div className="flex items-center gap-8 group">
                  <div className="w-14 h-14 bg-lael-secondary rounded-2xl flex items-center justify-center text-lael-accent border border-lael-bd group-hover:bg-lael-accent group-hover:text-white transition-all">
                    <MessageSquare size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] tracking-[0.3em] uppercase font-bold text-lael-muted mb-1">WhatsApp Directo</p>
                    <p className="text-xl font-bold text-lael-primary">+56 9 6462 6568</p>
                  </div>
               </div>
               <div className="flex items-center gap-8 group">
                  <div className="w-14 h-14 bg-lael-secondary rounded-2xl flex items-center justify-center text-lael-accent border border-lael-bd group-hover:bg-lael-accent group-hover:text-white transition-all">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] tracking-[0.3em] uppercase font-bold text-lael-muted mb-1">Email Institucional</p>
                    <p className="text-xl font-bold text-lael-primary">contacto@institutolael.cl</p>
                  </div>
               </div>
               <div className="flex items-center gap-8 group">
                  <div className="w-14 h-14 bg-lael-secondary rounded-2xl flex items-center justify-center text-lael-accent border border-lael-bd group-hover:bg-lael-accent group-hover:text-white transition-all">
                    <Instagram size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] tracking-[0.3em] uppercase font-bold text-lael-muted mb-1">Instagram Social</p>
                    <p className="text-xl font-bold text-lael-primary">@institutolael</p>
                  </div>
               </div>
               <div className="flex items-center gap-8 group">
                  <div className="w-14 h-14 bg-lael-secondary rounded-2xl flex items-center justify-center text-lael-accent border border-lael-bd group-hover:bg-lael-accent group-hover:text-white transition-all">
                    <Clock size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] tracking-[0.3em] uppercase font-bold text-lael-muted mb-1">Horario de Atención</p>
                    <p className="text-xl font-bold text-lael-primary">Lunes a Viernes · 09:00 - 20:00</p>
                  </div>
               </div>
            </div>
            </motion.div>

            {/* Right Col: Form */}
            <motion.div {...fadeUp(0.2)} className="bg-lael-secondary/30 p-10 md:p-16 rounded-[48px] border border-lael-bd cinematic-shadow">
              {submitted ? (
                <div className="text-center py-10">
                   <div className="w-20 h-20 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
                      <CheckCircle size={40} />
                   </div>
                   <h3 className="text-3xl font-display font-bold text-lael-primary mb-4">¡Mensaje Recibido!</h3>
                   <p className="text-lael-muted">Te responderemos en las próximas 24 horas hábiles.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] tracking-[0.3em] uppercase font-bold text-lael-muted ml-1">Nombre Completo</label>
                      <input 
                        type="text" 
                        required
                        className="w-full bg-white border border-lael-bd px-6 py-5 rounded-2xl text-lael-primary focus:outline-none focus:border-lael-accent transition-all placeholder:text-lael-muted/30"
                        placeholder="Juan Pérez"
                        value={formData.nombre}
                        onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] tracking-[0.3em] uppercase font-bold text-lael-muted ml-1">Correo Electrónico</label>
                      <input 
                        type="email" 
                        required
                        className="w-full bg-white border border-lael-bd px-6 py-5 rounded-2xl text-lael-primary focus:outline-none focus:border-lael-accent transition-all placeholder:text-lael-muted/30"
                        placeholder="juan@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] tracking-[0.3em] uppercase font-bold text-lael-muted ml-1">Programa de Interés</label>
                    <select 
                      className="w-full bg-white border border-lael-bd px-6 py-5 rounded-2xl text-lael-primary focus:outline-none focus:border-lael-accent transition-all appearance-none cursor-pointer"
                      value={formData.programa}
                      onChange={(e) => setFormData({...formData, programa: e.target.value})}
                    >
                      <option value="PAES">Preuniversitario PAES (Gratis)</option>
                      <option value="Ingles">Inglés Estratégico</option>
                      <option value="Coreano">Coreano Inmersivo</option>
                      <option value="LSCh">LSCh (Lengua de Señas)</option>
                    </select>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] tracking-[0.3em] uppercase font-bold text-lael-muted ml-1">Mensaje</label>
                    <textarea 
                      rows="5"
                      required
                      className="w-full bg-white border border-lael-bd px-6 py-5 rounded-2xl text-lael-primary focus:outline-none focus:border-lael-accent transition-all placeholder:text-lael-muted/30 resize-none"
                      placeholder="Cuéntanos tus metas..."
                      value={formData.mensaje}
                      onChange={(e) => setFormData({...formData, mensaje: e.target.value})}
                    ></textarea>
                  </div>

                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-lael-primary text-white py-6 rounded-2xl text-xs tracking-[0.4em] uppercase font-bold shadow-xl shadow-lael-primary/10 flex items-center justify-center gap-4 hover:bg-lael-rust transition-all"
                  >
                    Enviar Mensaje <Send size={16} />
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
