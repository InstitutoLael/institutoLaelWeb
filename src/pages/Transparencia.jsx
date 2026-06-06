import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { CheckCircle2, XCircle, ShieldCheck, AlertTriangle, Scale, Eye, FileText, Lock } from 'lucide-react';

// Brand Design Tokens
const BLUE = '#071D49';
const YELLOW = '#D7E400';
const WHITE = '#FFFFFF';
const LIGHT_GRAY = '#F4F4F4';
const MUTED = '#8D8D8D';

const ease = [0.16, 1, 0.3, 1];
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 1, delay, ease }
});

export default function Transparencia() {
  return (
    <div className="min-h-screen text-[#071D49] pt-20" style={{ backgroundColor: WHITE }}>
      <Helmet>
        <title>Transparencia & Ética Radical | Instituto Lael</title>
        <meta name="description" content="Nuestra ética de resultados. Sin promesas vacías, solo ingeniería de rendimiento y honestidad radical sobre tu proceso educativo." />
      </Helmet>

      {/* ── 1. HERO (MINIMALIST & BOLD) ───────────────────────────────── */}
      <section className="relative min-h-[60vh] flex flex-col items-center justify-center text-center px-6 py-20 overflow-hidden" style={{ backgroundColor: LIGHT_GRAY }}>
        <div className="absolute inset-0 z-0">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#D7E400]/[0.03] rounded-full blur-[120px] animate-pulse" />
        </div>
        
        <div className="max-w-4xl relative z-10">
          <motion.div {...fadeUp(0)}>
            <p className="text-[#071D49] text-[11px] tracking-[0.5em] uppercase mb-8 font-bold">Ética de Resultados</p>
            <motion.h1 
              initial={{ clipPath: 'inset(0 100% 0 0)' }}
              animate={{ clipPath: 'inset(0 0% 0 0)' }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[0.95] mb-10 uppercase tracking-tighter"
              style={{ color: BLUE }}
            >
              Honestidad <br />
              <span className="italic font-normal text-[#D7E400] capitalize">radical.</span>
            </motion.h1>
            <p className="text-[#8D8D8D] text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto italic font-medium">
              "Preferimos perder un alumno a alimentar una falsa esperanza."
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── 2. EL CONTRATO MORAL ─────────────────────────────────────── */}
      <section className="py-28 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-24 text-left">
            {/* LO QUE HACEMOS */}
            <motion.div {...fadeUp(0.1)} className="p-10 sm:p-16 bg-emerald-50 rounded-[40px] border border-emerald-500/10 shadow-sm relative overflow-hidden">
               <div className="absolute top-0 right-0 p-10 text-emerald-500/5"><ShieldCheck size={140} /></div>
               <div className="flex items-center gap-4 mb-10 relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600"><ShieldCheck size={22} /></div>
                  <h3 className="font-display text-2xl font-extrabold uppercase tracking-tight text-[#071D49]">Lo que sí garantizamos</h3>
               </div>
               <ul className="space-y-8 relative z-10">
                  {[
                    { t: "Diagnóstico Clínico", d: "Identificamos tus brechas aunque duela. No te diremos lo que quieres oír, sino lo que necesitas arreglar." },
                    { t: "Ingeniería de Datos", d: "Cada ensayo se desglosa en variables tácticas. Sabemos exactamente dónde pierdes tiempo y puntos." },
                    { t: "Actualización Quirúrgica", d: "Nuestro material muta con cada cambio del DEMRE. Si algo cambia el lunes, el martes ya está en tu dashboard." },
                    { t: "Entorno de Alta Presión", d: "Te entrenamos para que el día de la prueba real sea el momento de mayor calma de tu semana." }
                  ].map((item, i) => (
                    <li key={i} className="flex gap-5 group">
                      <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-1 transition-transform group-hover:scale-110"><CheckCircle2 className="text-emerald-600" size={14} /></div>
                      <div>
                         <p className="text-[#071D49] font-bold text-base mb-1.5">{item.t}</p>
                         <p className="text-[#8D8D8D] text-xs sm:text-sm leading-relaxed">{item.d}</p>
                      </div>
                    </li>
                  ))}
               </ul>
            </motion.div>

            {/* LO QUE NO HACEMOS */}
            <motion.div {...fadeUp(0.2)} className="p-10 sm:p-16 bg-rose-50 rounded-[40px] border border-rose-500/10 shadow-sm relative overflow-hidden">
               <div className="absolute top-0 right-0 p-10 text-rose-500/5"><AlertTriangle size={140} /></div>
               <div className="flex items-center gap-4 mb-10 relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-rose-500/10 flex items-center justify-center text-rose-600"><AlertTriangle size={22} /></div>
                  <h3 className="font-display text-2xl font-extrabold uppercase tracking-tight text-[#071D49]">Lo que NO hacemos</h3>
               </div>
               <ul className="space-y-8 relative z-10">
                  {[
                    { t: "Sin Promesas de Puntaje", d: "El puntaje es una consecuencia de tu trabajo, no un producto que se pueda comprar por catálogo." },
                    { t: "Cero Contenido Pasivo", d: "No vendemos videos para que los mires mientras haces otra cosa. En Lael se viene a ejecutar en vivo." },
                    { t: "Filtro de Compromiso", d: "Si el diagnóstico muestra falta de voluntad para el cambio, no permitiremos tu ingreso al sistema." },
                    { t: "Sin Atajos Mágicos", d: "No hay 'trucos' que reemplacen la disciplina. Hay estrategia, técnica y muchas horas de práctica real." }
                  ].map((item, i) => (
                    <li key={i} className="flex gap-5 group">
                      <div className="w-6 h-6 rounded-full bg-rose-500/20 flex items-center justify-center flex-shrink-0 mt-1 transition-transform group-hover:scale-110"><XCircle className="text-rose-600" size={14} /></div>
                      <div>
                         <p className="text-[#071D49] font-bold text-base mb-1.5">{item.t}</p>
                         <p className="text-[#8D8D8D] text-xs sm:text-sm leading-relaxed">{item.d}</p>
                      </div>
                    </li>
                  ))}
               </ul>
            </motion.div>
          </div>

          {/* ── 3. PILARES LEGALES & PRIVACIDAD ───────────────────────────── */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
             {[
                { icon: Scale, title: "Ética Comercial", desc: "No hay renovaciones automáticas sorpresa ni cláusulas de permanencia. Te quedas porque te sirve, no porque te obligamos." },
                { icon: Eye, title: "Transparencia de Datos", desc: "Tus datos de rendimiento son tuyos. Puedes exportar tu historial de progreso en cualquier momento de tu ciclo." },
                { icon: Lock, title: "Seguridad Institucional", desc: "Instituto Lael SpA es una entidad constituida bajo las leyes chilenas, con domicilio real en Santiago de Chile." }
             ].map((item, i) => (
                <motion.div key={i} {...fadeUp(i * 0.1)} className="p-8 rounded-[32px] border border-[#071D49]/10 bg-white hover:border-[#D7E400]/40 transition-all duration-300">
                   <item.icon className="text-[#071D49] mb-5" size={24} />
                   <h4 className="text-[#071D49] font-display font-bold text-sm uppercase tracking-wide mb-3">{item.title}</h4>
                   <p className="text-[#8D8D8D] text-xs leading-relaxed">{item.desc}</p>
                </motion.div>
             ))}
          </div>
        </div>
      </section>

      {/* ── 4. DOCUMENTACIÓN & CONTACTO ──────────────────────────────── */}
      <section className="py-28 px-6 text-white text-center" style={{ backgroundColor: BLUE }}>
        <div className="max-w-4xl mx-auto">
           <motion.div {...fadeUp(0)}>
              <FileText className="text-[#D7E400] mx-auto mb-8" size={40} />
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold mb-6 uppercase tracking-tight">Canal de Cumplimiento</h2>
              <p className="text-white/60 text-base max-w-xl mx-auto mb-12 leading-relaxed">
                 Si tienes alguna duda sobre nuestra gestión, términos de servicio o políticas de reembolso, nuestro canal legal está abierto permanentemente.
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                 <a href="mailto:legal@institutolael.cl" className="w-full sm:w-auto px-10 py-4.5 bg-white text-[#071D49] rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-[#D7E400] hover:text-[#071D49] transition-all">legal@institutolael.cl</a>
                 <a href="https://wa.me/56964626568" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto px-10 py-4.5 bg-[#D7E400] text-[#071D49] rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-white transition-all">Atención Directa</a>
              </div>
           </motion.div>
        </div>
      </section>

      {/* ── 5. CIERRE FILOSÓFICO ─────────────────────────────────────── */}
      <section className="py-32 px-6 text-center">
        <motion.div {...fadeUp(0.2)} className="max-w-3xl mx-auto flex flex-col items-center">
           <p className="text-[#071D49] text-xl sm:text-2xl font-display font-medium leading-relaxed italic max-w-2xl">
              "En Lael, no vendemos la idea de que todos pueden ser lo que quieran. Vendemos la ingeniería necesaria para que el que esté dispuesto a trabajar, logre exactamente lo que se propuso."
           </p>
           <div className="mt-10 flex flex-col items-center gap-4">
              <div className="w-12 h-0.5 bg-[#071D49]/15" />
              <p className="text-[10px] tracking-[0.4em] uppercase font-bold text-[#8D8D8D]">Ecosistema Lael SpA</p>
           </div>
        </motion.div>
      </section>
    </div>
  );
}
