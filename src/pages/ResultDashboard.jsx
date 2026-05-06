import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getDiagnosticResult } from '../data/diagnostic';
import { Helmet } from 'react-helmet-async';
import { BarChart3, Target, Zap, MessageCircle, Mail, Calendar } from 'lucide-react';
import { trackEvent } from '../utils/analytics';
import { trackFunnelEvent } from '../utils/funnel';

const ease = [0.16, 1, 0.3, 1];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease }
});

export default function ResultDashboard() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const answers = state?.answers;

  useEffect(() => {
    if (!answers) {
      navigate('/diagnostico');
    } else {
      trackEvent('diagnostic_complete', { category: answers.category });
    }
  }, [answers, navigate]);

  if (!answers) return null;

  const result = getDiagnosticResult(answers);

  const handleContact = (type) => {
    trackEvent('contact_click', { type, profile: result.title });
    if (type === 'whatsapp') {
      trackFunnelEvent('whatsapp');
      const msg = encodeURIComponent(result.wa_msg || `Hola, acabo de completar mi diagnóstico Lael. Mi perfil es: ${result.title}. Quiero activar mi ruta.`);
      window.open(`https://wa.me/56964626568?text=${msg}`, '_blank');
    }
  };

  return (
    <div className="bg-lael-primary min-h-screen pt-32 pb-20 px-6">
      <Helmet>
        <title>Tu Resultado | Ingeniería del Rendimiento Lael</title>
      </Helmet>

      <div className="max-w-6xl mx-auto">
        <motion.div {...fadeUp()} className="text-center mb-16">
          <p className="text-lael-accent text-[10px] tracking-[0.4em] uppercase mb-4 font-bold">Diagnóstico Finalizado</p>
          <h1 className="font-display text-4xl lg:text-6xl text-lael-light mb-6">
            Perfil Detectado: <br/>
            <span className={`text-lael-accent italic italic-playfair ${result.tone === 'hard' ? 'text-lael-rust' : ''}`}>{result.title}</span>
          </h1>
          <p className="text-lael-muted text-lg max-w-2xl mx-auto">
            {result.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Main Analysis */}
          <motion.div {...fadeUp(0.1)} className="lg:col-span-2 space-y-8">
            <div className="p-10 bg-lael-secondary rounded-3xl border border-lael-bd cinematic-shadow">
              <h3 className="font-display text-2xl text-lael-light mb-8 flex items-center gap-3">
                <Zap className="text-lael-accent" /> Análisis de Ejecución
              </h3>
              <p className="text-lael-muted text-lg leading-relaxed mb-10">
                {result.description}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {result.stats.map((stat, i) => (
                  <div key={i} className="p-6 bg-lael-primary rounded-2xl border border-lael-bd text-center">
                     <p className={`font-display text-3xl font-bold mb-2 ${stat.label === 'Confiabilidad' ? 'text-emerald-400' : 'text-lael-accent'}`}>{stat.value}</p>
                     <p className="text-[10px] text-lael-muted uppercase tracking-widest">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* ATRIBUTOS DE DATA */}
            {result.attributes && result.attributes.length > 0 && (
              <div className="p-10 bg-lael-secondary rounded-3xl border border-lael-bd">
                <h4 className="text-lael-muted text-[10px] tracking-[0.3em] uppercase mb-8 font-bold">Métricas Detectadas</h4>
                <div className="space-y-8">
                  {result.attributes.map((attr, i) => (
                    <div key={i}>
                      <div className="flex justify-between mb-3 text-xs uppercase tracking-widest font-bold">
                        <span className="text-lael-light">{attr.label}</span>
                        <span className="text-lael-accent">{attr.value}</span>
                      </div>
                      <div className="h-1.5 bg-lael-primary rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${attr.score}%` }}
                          transition={{ duration: 1.5, delay: 0.5 }}
                          className="h-full bg-lael-accent"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* Entry Product Card & Case Study */}
          <motion.div {...fadeUp(0.2)} className="space-y-8">
            <div className="p-10 bg-lael-accent rounded-3xl text-white shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 bg-white/10 text-[9px] font-bold uppercase tracking-widest">Cupos: 3/5 esta semana</div>
               <h3 className="font-display text-3xl mb-8">{result.entry_product}</h3>
               <p className="text-white/80 text-sm leading-relaxed mb-10">
                  Tu diagnóstico indica que tienes el potencial, pero te falta la guía correcta. Únete a nuestro equipo y accede a la **mejor preparación PAES de Chile** sin pagar ni un peso.
               </p>
               
               <div className="space-y-4">
                  <button 
                    onClick={() => handleContact('whatsapp')}
                    className="w-full py-5 bg-white text-lael-accent rounded-xl font-bold uppercase tracking-widest text-[11px] flex items-center justify-center gap-3 hover:scale-[1.02] transition-transform shadow-xl"
                  >
                     <MessageCircle size={18} /> Inscribirme Gratis vía WhatsApp
                  </button>
                  <p className="text-center text-[9px] text-white/60 uppercase tracking-[0.2em] font-bold">Un estratega te guiará para activar tu cuenta hoy mismo</p>
               </div>
            </div>

            {/* CASE STUDY */}
            {result.case_study && (
              <div className="p-8 bg-emerald-500/5 rounded-3xl border border-emerald-500/10">
                <p className="text-emerald-400 text-[9px] tracking-[0.3em] uppercase mb-4 font-bold flex items-center gap-2">
                  <BarChart3 size={12} /> Validación de Perfil
                </p>
                <p className="text-lael-light text-sm italic mb-4">"{result.case_study.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="px-3 py-1 bg-emerald-500/20 rounded-full text-emerald-400 text-[10px] font-bold">{result.case_study.metrics}</div>
                  <span className="text-lael-muted text-[10px] uppercase tracking-widest">{result.case_study.name}</span>
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* Next Steps / Inside Lael Preview */}
        <motion.div {...fadeUp(0.3)} className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center border-t border-lael-bd pt-20">
           <div>
              <h4 className="font-display text-2xl text-lael-light mb-6">¿Qué pasa después de activar?</h4>
              <ul className="space-y-6">
                 {[
                    { title: "Entrada al Aula 2.0", desc: "Acceso inmediato a tu panel de usuario y material base." },
                    { title: "Sesión de Onboarding", desc: "Definimos tu horario táctico y mentor asignado." },
                    { title: "Primera Simulación", desc: "Medimos tu base bajo presión real en la semana 1." }
                 ].map((item, i) => (
                    <li key={i} className="flex gap-4">
                       <span className="w-6 h-6 rounded-full bg-lael-accent/20 text-lael-accent flex items-center justify-center text-xs font-bold flex-shrink-0 mt-1">{i+1}</span>
                       <div>
                          <p className="text-lael-light font-bold text-sm mb-1">{item.title}</p>
                          <p className="text-lael-muted text-xs leading-relaxed">{item.desc}</p>
                       </div>
                    </li>
                 ))}
              </ul>
           </div>
           <div className="p-8 bg-lael-secondary rounded-[40px] border border-lael-bd relative overflow-hidden group">
              <div className="aspect-video bg-lael-primary rounded-2xl border border-lael-bd flex items-center justify-center text-lael-muted italic text-sm overflow-hidden">
                 {/* Placeholder for platform screenshot */}
                 <div className="absolute inset-0 bg-gradient-to-br from-lael-accent/5 to-transparent"></div>
                 <div className="relative z-10 text-center px-6">
                    <p className="mb-4">Vista previa de tu Dashboard Lael</p>
                    <div className="flex gap-2 justify-center">
                       <div className="w-2 h-2 rounded-full bg-lael-accent/40"></div>
                       <div className="w-2 h-2 rounded-full bg-lael-accent/40"></div>
                       <div className="w-2 h-2 rounded-full bg-lael-accent/40"></div>
                    </div>
                 </div>
              </div>
           </div>
        </motion.div>
      </div>
    </div>
  );
}
