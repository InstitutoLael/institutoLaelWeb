import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin } from 'lucide-react';
import Button from '../components/ui/Button';

export default function Contacto() {
  return (
    <>
      <Helmet>
        <title>Postulación y Contacto | Instituto Lael</title>
        <meta name="description" content="Inicia tu proceso de postulación a Instituto Lael." />
      </Helmet>

      <section className="relative pt-32 pb-24 bg-lael-primary overflow-hidden min-h-screen">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-lael-accent/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            
            {/* Left Col: Info */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl font-display font-bold leading-tight mb-6 text-lael-light">
                Comienza tu <br />
                <span className="text-lael-accent text-transparent bg-clip-text bg-gradient-to-r from-lael-accent to-lael-light">Proceso</span>
              </h1>
              <p className="text-lg text-lael-muted mb-12 max-w-md">
                Agenda una sesión estratégica con un mentor para evaluar tu perfil y diseñar tu plan de alto rendimiento.
              </p>

              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-lael-secondary border border-white/5 flex items-center justify-center text-lael-accent shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-lael-light mb-1">WhatsApp Directo</h3>
                    <p className="text-lael-muted mb-2">Respuestas rápidas para dudas puntuales.</p>
                    <a href="https://wa.me/56934449852" target="_blank" rel="noreferrer" className="text-lael-accent font-medium hover:underline">
                      +56 9 3444 9852
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-lael-secondary border border-white/5 flex items-center justify-center text-lael-accent shrink-0">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-lael-light mb-1">Correo Institucional</h3>
                    <p className="text-lael-muted mb-2">Para consultas corporativas o convenios.</p>
                    <a href="mailto:contacto@institutolael.cl" className="text-lael-accent font-medium hover:underline">
                      contacto@institutolael.cl
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Col: Form */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-lael-secondary border border-white/5 rounded-3xl p-8 md:p-12 shadow-cinematic-shadow"
            >
              <h3 className="text-2xl font-display font-bold mb-6 text-lael-light">Solicitud de Ingreso</h3>
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-lael-muted uppercase tracking-wider mb-2">Nombre Completo</label>
                    <input type="text" className="w-full bg-lael-primary border border-white/10 rounded-xl px-4 py-3 text-lael-light focus:outline-none focus:border-lael-accent/50 focus:ring-1 focus:ring-lael-accent/50 transition-all" placeholder="Ej. Diego Chaparro" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-lael-muted uppercase tracking-wider mb-2">WhatsApp</label>
                    <input type="tel" className="w-full bg-lael-primary border border-white/10 rounded-xl px-4 py-3 text-lael-light focus:outline-none focus:border-lael-accent/50 focus:ring-1 focus:ring-lael-accent/50 transition-all" placeholder="+56 9..." />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-lael-muted uppercase tracking-wider mb-2">Programa de Interés</label>
                  <select className="w-full bg-lael-primary border border-white/10 rounded-xl px-4 py-3 text-lael-light focus:outline-none focus:border-lael-accent/50 focus:ring-1 focus:ring-lael-accent/50 transition-all appearance-none">
                    <option>Sistema PAES de Alto Rendimiento</option>
                    <option>Dominio Estratégico Inglés</option>
                    <option>Inmersión Estructural Coreana</option>
                    <option>Otro</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-lael-muted uppercase tracking-wider mb-2">¿Cuál es tu objetivo principal?</label>
                  <textarea rows="3" className="w-full bg-lael-primary border border-white/10 rounded-xl px-4 py-3 text-lael-light focus:outline-none focus:border-lael-accent/50 focus:ring-1 focus:ring-lael-accent/50 transition-all resize-none" placeholder="Cuéntanos qué buscas lograr..."></textarea>
                </div>

                <Button variant="primary" className="w-full mt-4">
                  Enviar Solicitud
                </Button>
                <p className="text-xs text-lael-muted text-center mt-4">Un mentor estratégico te contactará en menos de 24 horas.</p>
              </form>
            </motion.div>

          </div>
        </div>
      </section>
    </>
  );
}
