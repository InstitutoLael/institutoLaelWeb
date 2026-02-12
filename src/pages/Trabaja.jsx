import React, { useState, useEffect } from "react";
import SEOHead from "../components/SEOHead.jsx";

// 👇 AQUÍ IMPORTAMOS LOS DATOS
import { PERKS, OPENINGS, HR_EMAIL, HR_WAPP } from "../data/jobs.js";

/* ──────────────────────────────────────────────────────────────────────────
   1. ICONOS SVG (Minimalistas)
   ────────────────────────────────────────────────────────────────────────── */
const Icons = {
  Briefcase: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>,
  ChevronDown: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>,
  Send: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>,
  Heart: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg>
};

/* ──────────────────────────────────────────────────────────────────────────
   2. COMPONENTE PRINCIPAL
   ────────────────────────────────────────────────────────────────────────── */
export default function Trabaja() {
  const [activeJob, setActiveJob] = useState(null);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-slate-50 font-sans pt-32 pb-24 relative overflow-x-hidden selection:bg-violet-500/30">
      <SEOHead title="Trabaja con Nosotros | Lael Careers" description="Únete a un equipo que transforma la educación." />
      
      {/* Luces de Fondo */}
      <div className="absolute top-[-200px] right-[-100px] w-[600px] h-[600px] bg-violet-600/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[40%] left-[-200px] w-[500px] h-[500px] bg-pink-500/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-4xl relative z-10">

        {/* HERO SECTION */}
        <header className="text-center mb-24">
          <div className="inline-block bg-pink-500/10 text-pink-400 px-4 py-1.5 rounded-full text-xs font-bold uppercase mb-5 border border-pink-500/20">
            Estamos Contratando
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-[1.1]">
            Enseña con <span className="text-transparent bg-clip-text bg-gradient-to-br from-violet-400 to-pink-400">Propósito.</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            No buscamos "empleados". Buscamos mentores apasionados que quieran dejar una huella real en la vida de sus estudiantes.
            Si crees que la educación es un acto de servicio, este es tu lugar.
          </p>
          <div className="flex justify-center gap-4">
            <a href="#positions" className="bg-violet-600 text-white px-7 py-3.5 rounded-full font-bold transition-all shadow-lg shadow-violet-600/40 hover:-translate-y-1 hover:shadow-violet-600/60 hover:brightness-110">
              Ver Oportunidades
            </a>
            <a href="#culture" className="bg-transparent text-white px-7 py-3.5 rounded-full font-semibold border border-white/10 transition-all hover:bg-white/5 hover:border-white">
              Nuestra Cultura
            </a>
          </div>
        </header>

        {/* BENEFICIOS (BENTO GRID) */}
        <section id="culture" className="mb-24">
          <h2 className="text-3xl font-bold text-center mb-10">¿Por qué Lael?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {PERKS.map((p, i) => (
              <div key={i} className="bg-[#0f1115] border border-white/10 p-8 rounded-2xl text-center transition-all hover:-translate-y-1 hover:border-violet-500 group">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{p.icon}</div>
                <h3 className="text-lg font-bold mb-2 text-white">{p.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* LISTA DE VACANTES */}
        <section id="positions" className="flex flex-col gap-4">
          <h2 className="text-3xl font-bold text-center mb-10">Posiciones Abiertas</h2>
          <div className="flex flex-col gap-4">
            {OPENINGS.map(job => (
              <div 
                key={job.id} 
                className={`bg-[#0f1115] border rounded-2xl overflow-hidden transition-all duration-300
                  ${activeJob === job.id ? 'border-violet-500 bg-violet-600/5' : 'border-white/10 hover:border-white/20'}`}
              >

                {/* Header de la Tarjeta */}
                <div 
                  className="p-6 flex justify-between items-center cursor-pointer group"
                  onClick={() => setActiveJob(activeJob === job.id ? null : job.id)}
                >
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2 text-white group-hover:text-violet-400 transition-colors">{job.title}</h3>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs text-violet-300 bg-violet-500/10 px-2.5 py-1 rounded-md font-bold border border-violet-500/20">{job.type}</span>
                      {job.tags.map((t, idx) => (
                        <span key={idx} className="text-xs text-slate-400 bg-white/5 px-2.5 py-1 rounded-md border border-white/5">{t}</span>
                      ))}
                    </div>
                  </div>
                  <button 
                    className={`w-9 h-9 flex items-center justify-center rounded-full border transition-all duration-300 ml-4
                      ${activeJob === job.id 
                        ? 'bg-violet-600 text-white border-violet-600 rotate-180' 
                        : 'bg-transparent text-slate-400 border-white/10 group-hover:border-white/30'}`}
                  >
                    <Icons.ChevronDown />
                  </button>
                </div>

                {/* Cuerpo Desplegable */}
                <div 
                  className={`overflow-hidden transition-[max-height] duration-500 ease-in-out
                    ${activeJob === job.id ? 'max-h-[800px]' : 'max-h-0'}`}
                >
                  <div className="px-6 pb-8 pt-0 border-t border-white/5 mt-1 animate-fadeIn">
                    <p className="text-slate-300 leading-relaxed my-6">{job.desc}</p>

                    <div className="mb-6">
                      <h4 className="text-sm uppercase text-slate-400 mb-3 font-bold tracking-wider">Requisitos</h4>
                      <ul className="space-y-2">
                        {job.requirements.map((r, idx) => (
                          <li key={idx} className="text-sm text-slate-200 pl-5 relative before:content-['•'] before:absolute before:left-0 before:text-violet-500 before:font-bold">
                            {r}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-white/5 p-3 rounded-lg text-sm text-white mb-6 inline-block font-medium">
                      <strong>💰 Honorarios Referenciales:</strong> {job.salary}
                    </div>

                    <div className="flex flex-wrap gap-4">
                      <a
                        href={`mailto:${HR_EMAIL}?subject=Postulación: ${job.title}`}
                        className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-lg font-bold text-sm transition-all hover:bg-slate-200 hover:-translate-y-0.5"
                      >
                        <Icons.Send /> Enviar CV por Correo
                      </a>
                      <a
                        href={`https://wa.me/${HR_WAPP}?text=Hola,%20me%20interesa%20el%20puesto%20de%20${encodeURIComponent(job.title)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 bg-transparent text-white px-6 py-3 rounded-lg font-bold text-sm border border-white/10 transition-all hover:border-white hover:bg-white/5"
                      >
                        Consultar por WhatsApp
                      </a>
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </section>

        {/* CTA FINAL (TALENT POOL) */}
        <section className="mt-20 text-center">
          <div className="bg-gradient-to-br from-[#1e1b4b] to-[#0f172a] p-12 rounded-3xl border border-violet-500/30 shadow-2xl relative overflow-hidden">
             {/* Pulse animation for heart icon */}
            <div className="text-4xl text-pink-500 mb-4 animate-[pulse_2s_infinite]">
                <Icons.Heart />
            </div>
            <h3 className="text-3xl font-bold mb-3 text-white">¿No ves tu cargo ideal?</h3>
            <p className="text-slate-400 max-w-lg mx-auto mb-8 text-base">
              Siempre estamos buscando talento excepcional. Si eres psicopedagogo, diseñador, o simplemente un crack en lo que haces, queremos conocerte.
            </p>
            <a 
              href={`mailto:${HR_EMAIL}`} 
              className="inline-block bg-violet-600 text-white px-8 py-3.5 rounded-full font-bold transition-all hover:brightness-110 hover:scale-105 shadow-xl shadow-violet-600/20"
            >
              Enviar CV a Base de Talentos
            </a>
          </div>
        </section>

      </div>
    </div>
  );
}