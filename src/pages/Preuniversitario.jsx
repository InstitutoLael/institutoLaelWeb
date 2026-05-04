import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { Target, Shield, Compass, ChevronRight, Zap, Check } from 'lucide-react';
import { PAES_SUBJECTS, computePaesPrice, clp } from '../data/paes';

// Premium easing
const ease = [0.16, 1, 0.3, 1];

export default function Preuniversitario() {
  const [step, setStep] = useState(1);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  
  // Gate Form State
  const [gateData, setGateData] = useState({ name: '', phone: '', score: '' });

  const toggleSubject = (id) => {
    if (selectedSubjects.includes(id)) {
      setSelectedSubjects(selectedSubjects.filter(s => s !== id));
    } else {
      setSelectedSubjects([...selectedSubjects, id]);
    }
  };

  const handleUnlockSystem = (e) => {
    e.preventDefault();
    if (!gateData.name || !gateData.phone) return;
    
    setStep(2);
    // Smooth scroll down slightly to focus on the newly revealed section
    setTimeout(() => {
      document.getElementById('estrategia-layer')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleActivateSystem = () => {
    setStep(3);
    // Smooth scroll down to Elite layer or final confirmation (or redirect)
    setTimeout(() => {
      document.getElementById('activacion-layer')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  const priceData = computePaesPrice(selectedSubjects);

  return (
    <div className="bg-lael-primary text-lael-light overflow-hidden selection:bg-lael-accent/30 selection:text-lael-primary">
      <Helmet>
        <title>Sistema de Rendimiento | Instituto Lael</title>
        <meta name="description" content="No es un preuniversitario. Es un sistema de rendimiento avanzado." />
      </Helmet>

      {/* 1. HERO */}
      <section className="relative min-h-[70vh] flex items-center justify-center pt-20">
        <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
          <div className="w-[800px] h-[800px] bg-lael-accent/5 rounded-full blur-[150px] mix-blend-screen" />
        </div>

        <div className="relative z-20 max-w-4xl mx-auto px-6 text-center flex flex-col items-center">
          <motion.h1 
            className="text-5xl md:text-7xl font-display font-bold leading-[1.1] mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease }}
          >
            No es un preuniversitario.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-lael-light via-lael-light to-lael-muted">
              Es un sistema de rendimiento.
            </span>
          </motion.h1>
        </div>
      </section>

      {/* PROGRESSION INDICATOR */}
      <div className="sticky top-20 z-40 bg-lael-primary/80 backdrop-blur-xl border-y border-white/5 py-4 mb-20">
        <div className="max-w-3xl mx-auto px-6">
          <div className="flex items-center justify-center gap-2 md:gap-4">
            {['Diagnóstico', 'Estrategia', 'Activación'].map((s, i) => {
              const active = step >= i + 1;
              const isPast = step > i + 1;
              return (
                <div key={i} className="flex items-center gap-2 md:gap-4">
                  <div className={`flex items-center gap-3 transition-colors duration-500 ${active ? 'opacity-100' : 'opacity-40 grayscale'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-500 ${active ? 'bg-lael-accent text-lael-primary shadow-[0_0_15px_rgba(198,166,107,0.4)]' : 'bg-[#0A0A0A] border border-white/10 text-lael-light'}`}>
                      {isPast ? <Check size={14} /> : i + 1}
                    </div>
                    <span className={`text-[10px] md:text-xs tracking-[0.2em] uppercase font-bold hidden sm:block ${active ? 'text-lael-light' : 'text-lael-muted'}`}>
                      {s}
                    </span>
                  </div>
                  {i < 2 && (
                    <div className={`w-8 md:w-16 h-[1px] transition-colors duration-500 ${active ? 'bg-lael-accent/50' : 'bg-white/10'}`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ACCESS GATE LAYER (STEP 1) */}
      <section className="pb-40 relative z-20">
        <div className="max-w-2xl mx-auto px-6">
          <motion.div 
            className={`border border-white/5 bg-[#050505]/60 backdrop-blur-3xl rounded-3xl p-10 md:p-14 shadow-cinematic-shadow transition-all duration-1000 ${step > 1 ? 'opacity-50 pointer-events-none scale-[0.98]' : 'opacity-100 scale-100'}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease }}
          >
            <div className="text-center mb-10">
              <span className="text-lael-accent text-[10px] font-bold uppercase tracking-[0.2em] mb-4 block">Fase de Ingreso</span>
              <h2 className="text-3xl font-display font-bold text-lael-light mb-4">Desbloquea tu sistema</h2>
              <p className="text-sm text-lael-muted leading-relaxed">Configuramos el entorno táctico en base a tu perfil de estudiante. Ingresa tus datos para continuar.</p>
            </div>

            <form onSubmit={handleUnlockSystem} className="space-y-5">
              <input 
                type="text" 
                required
                placeholder="Nombre completo" 
                value={gateData.name}
                onChange={e => setGateData({...gateData, name: e.target.value})}
                className="w-full bg-[#0A0A0A] border border-white/5 rounded-xl px-6 py-5 text-sm text-lael-light focus:outline-none focus:border-lael-accent/40 focus:ring-1 focus:ring-lael-accent/40 focus:shadow-[0_0_20px_rgba(198,166,107,0.1)] transition-all duration-300 placeholder:text-lael-muted/40" 
              />
              <input 
                type="tel" 
                required
                placeholder="WhatsApp (Ej: +569...)" 
                value={gateData.phone}
                onChange={e => setGateData({...gateData, phone: e.target.value})}
                className="w-full bg-[#0A0A0A] border border-white/5 rounded-xl px-6 py-5 text-sm text-lael-light focus:outline-none focus:border-lael-accent/40 focus:ring-1 focus:ring-lael-accent/40 focus:shadow-[0_0_20px_rgba(198,166,107,0.1)] transition-all duration-300 placeholder:text-lael-muted/40" 
              />
              <input 
                type="text" 
                placeholder="Puntaje objetivo (Ej: 850 pts)" 
                value={gateData.score}
                onChange={e => setGateData({...gateData, score: e.target.value})}
                className="w-full bg-[#0A0A0A] border border-white/5 rounded-xl px-6 py-5 text-sm text-lael-light focus:outline-none focus:border-lael-accent/40 focus:ring-1 focus:ring-lael-accent/40 focus:shadow-[0_0_20px_rgba(198,166,107,0.1)] transition-all duration-300 placeholder:text-lael-muted/40" 
              />
              
              <button 
                type="submit"
                disabled={step > 1}
                className={`w-full mt-8 py-6 text-xs tracking-[0.2em] uppercase font-bold rounded-xl transition-all duration-700 active:scale-95 flex items-center justify-center ${step > 1 ? 'bg-lael-accent/20 text-lael-accent border border-lael-accent/20 cursor-not-allowed' : 'bg-lael-accent text-lael-primary hover:shadow-[0_0_40px_rgba(198,166,107,0.4)] hover:scale-[1.03]'}`}
              >
                {step > 1 ? 'Sistema Desbloqueado' : 'Ver mi estrategia'}
              </button>
            </form>

            <div className="mt-8 text-center border-t border-white/5 pt-6">
              <p className="text-[11px] text-lael-muted tracking-wide font-medium">
                "No es inscripción. Es el inicio de tu diagnóstico estratégico."
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SYSTEM REVEAL LAYER (STEP 2 & 3) */}
      <AnimatePresence>
        {step >= 2 && (
          <motion.section 
            id="estrategia-layer"
            className="py-40 relative overflow-hidden bg-lael-primary border-t border-white/5"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease }}
          >
            {/* Glow superior indicando nueva capa */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-lael-accent/30 to-transparent"></div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-lael-accent/5 rounded-full blur-[150px] pointer-events-none" />
            
            <div className="max-w-6xl mx-auto px-6 relative z-10">
              <div className="text-center mb-24">
                <span className="text-lael-accent text-[10px] font-bold uppercase tracking-[0.2em] mb-4 block">Capa 2: Estrategia</span>
                <h2 className="text-4xl md:text-5xl font-display font-bold text-lael-light">Arquitectura de Rendimiento</h2>
                <p className="text-lael-muted mt-6 max-w-2xl mx-auto text-lg">Selecciona los módulos estratégicos que necesitas. El sistema se calibra en tiempo real según tus objetivos.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
                {PAES_SUBJECTS.map((subject) => {
                  const isSelected = selectedSubjects.includes(subject.id);
                  return (
                    <div 
                      key={subject.id} 
                      onClick={() => toggleSubject(subject.id)}
                      className={`cursor-pointer transition-all duration-500 p-8 rounded-2xl border relative overflow-hidden group ${
                        isSelected 
                          ? 'bg-lael-secondary/80 border-lael-accent/40 shadow-[0_0_40px_rgba(198,166,107,0.15)] -translate-y-2' 
                          : 'bg-[#050505] border-white/5 hover:border-white/20 hover:-translate-y-1'
                      }`}
                    >
                      {/* Subte glow inside card when selected */}
                      {isSelected && (
                        <div className="absolute inset-0 bg-lael-accent/[0.03] pointer-events-none mix-blend-screen" />
                      )}

                      <div className="flex justify-between items-start mb-6 relative z-10">
                        <span className="text-3xl">{subject.icon}</span>
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors duration-500 ${
                          isSelected ? 'border-lael-accent bg-lael-accent/20' : 'border-white/20'
                        }`}>
                          {isSelected && <div className="w-2 h-2 bg-lael-accent rounded-full shadow-[0_0_10px_rgba(198,166,107,1)]" />}
                        </div>
                      </div>
                      <h3 className="text-lg font-bold text-lael-light mb-2 relative z-10">{subject.name}</h3>
                      <p className="text-[10px] text-lael-accent font-bold uppercase tracking-widest mb-4 relative z-10">{subject.category}</p>
                      <p className="text-sm text-lael-muted leading-relaxed relative z-10">{subject.desc}</p>
                    </div>
                  );
                })}
              </div>

              {/* DYNAMIC PRICING REVEAL */}
              <div className="min-h-[250px] flex items-center justify-center">
                <AnimatePresence mode="wait">
                  {selectedSubjects.length > 0 ? (
                    <motion.div 
                      key="pricing"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.8, ease }}
                      className="w-full max-w-3xl bg-[#080808]/90 backdrop-blur-2xl border border-lael-accent/20 rounded-3xl p-10 md:p-16 text-center shadow-[0_0_80px_rgba(198,166,107,0.08)] relative overflow-hidden"
                    >
                      {/* Pulse subtle background */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-lael-accent/5 rounded-full blur-[100px] animate-pulse pointer-events-none" style={{ animationDuration: '6s' }} />

                      <div className="relative z-10">
                        <h3 className="text-2xl font-display font-bold text-lael-light mb-2">{priceData.label}</h3>
                        <p className="text-sm text-lael-muted mb-10 tracking-wide">Inversión mensual para mantener el sistema activo</p>
                        
                        <div className="text-5xl md:text-7xl font-display font-bold text-lael-accent mb-10">
                          {clp(priceData.totalMonthly)} <span className="text-lg text-lael-muted/40 font-sans tracking-wide">/ mes</span>
                        </div>

                        <div className="flex flex-wrap justify-center gap-6 md:gap-10 text-sm text-lael-muted mb-12">
                          <div className="flex items-center gap-3">
                            <Target size={18} className="text-lael-accent" />
                            <span className="font-medium tracking-wide">{priceData.count} Módulos Activos</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <Shield size={18} className="text-lael-accent" />
                            <span className="font-medium tracking-wide">Matrícula inicial: {clp(priceData.enrollment)}</span>
                          </div>
                        </div>

                        {priceData.saving > 0 && (
                          <div className="inline-flex items-center gap-2 px-5 py-2 bg-green-500/10 border border-green-500/20 text-green-400 text-[10px] font-bold uppercase tracking-[0.2em] rounded-full mb-10">
                            <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                            Estrategia Optimizada: Ahorro de {clp(priceData.saving)} mensuales
                          </div>
                        )}

                        <button 
                          onClick={handleActivateSystem}
                          className="w-full bg-lael-accent text-lael-primary py-6 text-xs tracking-[0.2em] uppercase font-bold rounded-xl transition-all duration-700 hover:scale-[1.03] active:scale-95 shadow-[0_0_30px_rgba(198,166,107,0.2)] hover:shadow-[0_0_60px_rgba(198,166,107,0.5)]"
                        >
                          Activar mi rendimiento
                        </button>
                        
                        <p className="mt-6 text-[11px] text-lael-muted/50 tracking-wider">
                          Pausar sistema en cualquier momento. Sin compromisos forzosos.
                        </p>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="empty"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center"
                    >
                      <div className="w-16 h-16 rounded-full border border-white/5 flex items-center justify-center mx-auto mb-6 text-lael-muted/30">
                        <Compass size={24} />
                      </div>
                      <p className="text-lael-muted text-lg tracking-wide font-medium">Selecciona tus módulos tácticos para calibrar la inversión.</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ACTIVATION ELITE LAYER (STEP 3) */}
      <AnimatePresence>
        {step >= 3 && (
          <motion.section 
            id="activacion-layer"
            className="py-48 bg-lael-secondary/10 border-t border-white/5 relative overflow-hidden"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease }}
          >
            <div className="max-w-5xl mx-auto px-6 relative z-10 flex flex-col items-center text-center">
              <span className="text-lael-accent text-[10px] font-bold uppercase tracking-[0.2em] mb-4 block">Capa 3: Activación Elite</span>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-lael-light mb-8">Nivel Avanzado</h2>
              <p className="text-lael-muted leading-relaxed max-w-2xl text-lg mb-12">
                Tu configuración ha sido registrada. Ahora, un mentor validará tu perfil para asegurar que cumples con el estándar de rendimiento exigido antes de proceder con el pago final.
              </p>
              
              <Card className="p-10 md:p-14 bg-[#050505]/80 backdrop-blur-xl border border-lael-accent/20 text-center max-w-xl w-full">
                <div className="inline-flex items-center gap-3 px-5 py-2 bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-bold uppercase tracking-[0.2em] rounded-full mb-8">
                  <span className="w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse"></span>
                  Solo por postulación
                </div>
                <h3 className="text-2xl font-bold text-lael-light mb-4">Mentoría Estratégica 1:1</h3>
                <p className="text-sm text-lael-muted leading-relaxed mb-10">
                  El ingreso al Nivel Avanzado requiere aprobación. Haz clic abajo para enviar tu configuración a un mentor y agendar tu entrevista de ingreso.
                </p>
                <Button variant="primary" to="/contacto" className="w-full py-6 text-xs tracking-[0.2em] shadow-[0_0_30px_rgba(198,166,107,0.15)] hover:shadow-[0_0_60px_rgba(198,166,107,0.4)]">
                  Enviar perfil a evaluación
                </Button>
              </Card>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}
