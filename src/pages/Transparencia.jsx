import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { CheckCircle2, XCircle, ShieldCheck, AlertTriangle, Scale, Eye, FileText, Lock } from 'lucide-react';

const ease = [0.16, 1, 0.3, 1];
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 1, delay, ease }
});

export default function Transparencia() {
  return (
    <div className="bg-white min-h-screen text-lael-primary">
      <Helmet>
        <title>Transparencia & Ética Radical | Instituto Lael</title>
        <meta name="description" content="Nuestra ética de resultados. Sin promesas vacías, solo ingeniería de rendimiento y honestidad radical sobre tu proceso educativo." />
      </Helmet>

      {/* ── 1. HERO (MINIMALIST & BOLD) ───────────────────────────────── */}
      <section className="relative min-h-[70vh] flex flex-col items-center justify-center text-center px-6 pt-32 pb-20 bg-lael-secondary/10 overflow-hidden">
        <div className="absolute inset-0 z-0">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-lael-accent/[0.03] rounded-full blur-[120px] animate-pulse" />
        </div>
        
        <div className="max-w-4xl relative z-10">
          <motion.div {...fadeUp(0)}>
            <p className="text-lael-accent text-[11px] tracking-[0.5em] uppercase mb-10 font-bold">Ética de Resultados</p>
            <motion.h1 
              initial={{ clipPath: 'inset(0 100% 0 0)' }}
              animate={{ clipPath: 'inset(0 0% 0 0)' }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-6xl lg:text-9xl text-lael-primary font-bold leading-[0.85] mb-12 uppercase tracking-tighter"
            >
              Honestidad <br />
              <span className="italic italic-playfair text-lael-accent font-normal capitalize">radical.</span>
            </motion.h1>
            <p className="text-lael-muted text-xl lg:text-2xl leading-relaxed max-w-3xl mx-auto italic italic-playfair">
              "Preferimos perder un alumno a alimentar una falsa esperanza."
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── 2. EL CONTRATO MORAL ─────────────────────────────────────── */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 mb-32">
            {/* LO QUE HACEMOS */}
            <motion.div {...fadeUp(0.1)} className="p-12 lg:p-20 bg-emerald-500/5 rounded-[60px] border border-emerald-500/10 shadow-sm relative overflow-hidden">
               <div className="absolute top-0 right-0 p-10 text-emerald-500/5"><ShieldCheck size={160} /></div>
               <div className="flex items-center gap-4 mb-12 relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-600"><ShieldCheck size={24} /></div>
                  <h3 className="font-display text-3xl font-bold uppercase tracking-tight">Lo que sí garantizamos</h3>
               </div>
               <ul className="space-y-10 relative z-10">
                  {[
                    { t: "Diagnóstico Clínico", d: "Identificamos tus brechas aunque duela. No te diremos lo que quieres oír, sino lo que necesitas arreglar." },
                    { t: "Ingeniería de Datos", d: "Cada ensayo se desglosa en variables tácticas. Sabemos exactamente dónde pierdes tiempo y puntos." },
                    { t: "Actualización Quirúrgica", d: "Nuestro material muta con cada cambio del DEMRE. Si algo cambia el lunes, el martes ya está en tu dashboard." },
                    { t: "Entorno de Alta Presión", d: "Te entrenamos para que el día de la prueba real sea el momento de mayor calma de tu semana." }
                  ].map((item, i) => (
                    <li key={i} className="flex gap-6 group">
                      <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-1 transition-transform group-hover:scale-110"><CheckCircle2 className="text-emerald-600" size={14} /></div>
                      <div>
                         <p className="text-lael-primary font-bold text-lg mb-2">{item.t}</p>
                         <p className="text-lael-muted text-sm leading-relaxed">{item.d}</p>
                      </div>
                    </li>
                  ))}
               </ul>
            </motion.div>

            {/* LO QUE NO HACEMOS */}
            <motion.div {...fadeUp(0.2)} className="p-12 lg:p-20 bg-lael-rust/5 rounded-[60px] border border-lael-rust/10 shadow-sm relative overflow-hidden">
               <div className="absolute top-0 right-0 p-10 text-lael-rust/5"><AlertTriangle size={160} /></div>
               <div className="flex items-center gap-4 mb-12 relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-lael-rust/10 flex items-center justify-center text-lael-rust"><AlertTriangle size={24} /></div>
                  <h3 className="font-display text-3xl font-bold uppercase tracking-tight">Lo que NO hacemos</h3>
               </div>
               <ul className="space-y-10 relative z-10">
                  {[
                    { t: "Sin Promesas de Puntaje", d: "El puntaje es una consecuencia de tu trabajo, no un producto que se pueda comprar por catálogo." },
                    { t: "Cero Contenido Pasivo", d: "No vendemos videos para que los mires mientras haces otra cosa. En Lael se viene a ejecutar en vivo." },
                    { t: "Filtro de Compromiso", d: "Si el diagnóstico muestra falta de voluntad para el cambio, no permitiremos tu ingreso al sistema." },
                    { t: "Sin Atajos Mágicos", d: "No hay 'trucos' que reemplacen la disciplina. Hay estrategia, técnica y muchas horas de práctica real." }
                  ].map((item, i) => (
                    <li key={i} className="flex gap-6 group">
                      <div className="w-6 h-6 rounded-full bg-lael-rust/20 flex items-center justify-center flex-shrink-0 mt-1 transition-transform group-hover:scale-110"><XCircle className="text-lael-rust" size={14} /></div>
                      <div>
                         <p className="text-lael-primary font-bold text-lg mb-2">{item.t}</p>
                         <p className="text-lael-muted text-sm leading-relaxed">{item.d}</p>
                      </div>
                    </li>
                  ))}
               </ul>
            </motion.div>
          </div>

          {/* ── 3. PILARES LEGALES & PRIVACIDAD ───────────────────────────── */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {[
                { icon: Scale, title: "Ética Comercial", desc: "No hay renovaciones automáticas sorpresa ni cláusulas de permanencia. Te quedas porque te sirve, no porque te obligamos." },
                { icon: Eye, title: "Transparencia de Datos", desc: "Tus datos de rendimiento son tuyos. Puedes exportar tu historial de progreso en cualquier momento de tu ciclo." },
                { icon: Lock, title: "Seguridad Institucional", desc: "Instituto Lael SpA es una entidad constituida bajo las leyes chilenas, con domicilio real en Santiago de Chile." }
             ].map((item, i) => (
                <motion.div key={i} {...fadeUp(i * 0.1)} className="p-10 rounded-[40px] border border-lael-bd bg-lael-secondary/5 hover:border-lael-accent transition-all duration-500">
                   <item.icon className="text-lael-accent mb-6" size={28} />
                   <h4 className="text-lael-primary font-bold mb-4 uppercase tracking-wide">{item.title}</h4>
                   <p className="text-lael-muted text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
             ))}
          </div>
        </div>
      </section>

      {/* ── 4. DOCUMENTACIÓN & CONTACTO ──────────────────────────────── */}
      <section className="py-32 px-6 bg-lael-primary text-white">
        <div className="max-w-5xl mx-auto text-center">
           <motion.div {...fadeUp(0)}>
              <FileText className="text-lael-accent mx-auto mb-10" size={48} />
              <h2 className="font-display text-4xl lg:text-6xl font-bold mb-8 uppercase">Canal de Cumplimiento</h2>
              <p className="text-lael-muted text-lg max-w-2xl mx-auto mb-16 leading-relaxed">
                 Si tienes alguna duda sobre nuestra gestión, términos de servicio o políticas de reembolso, nuestro canal legal está abierto permanentemente.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                 <a href="mailto:legal@institutolael.cl" className="px-12 py-5 bg-white text-lael-primary rounded-2xl text-[11px] font-bold uppercase tracking-widest hover:bg-lael-accent hover:text-white transition-all">legal@institutolael.cl</a>
                 <button onClick={() => window.open('https://wa.me/56964626568', '_blank')} className="px-12 py-5 bg-lael-accent text-white rounded-2xl text-[11px] font-bold uppercase tracking-widest hover:bg-lael-rust transition-all">Atención Directa</button>
              </div>
           </motion.div>
        </div>
      </section>

      {/* ── 5. CIERRE FILOSÓFICO ─────────────────────────────────────── */}
      <section className="py-40 px-6 text-center">
        <motion.div {...fadeUp(0.2)} className="max-w-3xl mx-auto">
           <p className="text-lael-primary text-xl lg:text-3xl font-display font-medium leading-relaxed italic italic-playfair">
              "En Lael, no vendemos la idea de que todos pueden ser lo que quieran. Vendemos la ingeniería necesaria para que el que esté dispuesto a trabajar, logre exactamente lo que se propuso."
           </p>
           <div className="mt-12 flex flex-col items-center gap-4">
              <div className="w-12 h-1 bg-lael-accent/30" />
              <p className="text-[10px] tracking-[0.4em] uppercase font-bold text-lael-accent">Ecosistema Lael SpA</p>
           </div>
        </motion.div>
      </section>
    </div>
  );
}
