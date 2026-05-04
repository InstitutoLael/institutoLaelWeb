import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { Target, Shield, Compass, ChevronRight, Zap } from 'lucide-react';
import { PAES_SUBJECTS, computePaesPrice, clp } from '../data/paes';

// Premium easing
const easing = [0.16, 1, 0.3, 1];

export default function Preuniversitario() {
  const [selectedSubjects, setSelectedSubjects] = useState([]);

  const toggleSubject = (id) => {
    if (selectedSubjects.includes(id)) {
      setSelectedSubjects(selectedSubjects.filter(s => s !== id));
    } else {
      setSelectedSubjects([...selectedSubjects, id]);
    }
  };

  const priceData = computePaesPrice(selectedSubjects);

  return (
    <div className="bg-lael-primary text-lael-light overflow-hidden selection:bg-lael-accent/30 selection:text-lael-primary">
      <Helmet>
        <title>Sistema de Rendimiento | Instituto Lael</title>
        <meta name="description" content="No es un preuniversitario. Es un sistema de rendimiento avanzado." />
      </Helmet>

      {/* 1. HERO */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-20">
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
            <span className="text-lael-accent">Es un sistema de rendimiento.</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4, ease }}
          >
            <Button size="lg" variant="primary" to="#acceso" className="text-xs tracking-[0.2em] uppercase font-bold px-12 py-5 shadow-[0_0_30px_rgba(198,166,107,0.15)] hover:shadow-[0_0_50px_rgba(198,166,107,0.3)]">
              Iniciar proceso
            </Button>
          </motion.div>
        </div>
      </section>

      {/* 2. ACCESS LAYER (Fase de Ingreso) */}
      <section id="acceso" className="py-40 relative z-10 border-t border-white/5 bg-lael-secondary/20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-24">
            <span className="text-lael-accent text-[10px] font-bold uppercase tracking-[0.2em] mb-4 block">Capa 1</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-lael-light">Fase de Ingreso</h2>
            <p className="text-lael-muted mt-6 max-w-2xl mx-auto">El filtro inicial donde medimos tu potencial y alineamos la estrategia antes de avanzar.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              { title: "Diagnóstico de Precisión", desc: "Mapeo algorítmico de brechas.", icon: Target },
              { title: "Entrenamiento Inicial", desc: "Nivelación de bases lógicas.", icon: Zap },
              { title: "Acceso a la Comunidad", desc: "Entorno táctico exclusivo.", icon: Users },
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: i * 0.1, ease }}
              >
                <Card className="p-10 h-full bg-lael-primary text-center flex flex-col items-center border border-white/5">
                  <item.icon className="w-8 h-8 text-lael-accent mb-6" />
                  <h3 className="text-lg font-bold text-lael-light mb-2">{item.title}</h3>
                  <p className="text-sm text-lael-muted leading-relaxed">{item.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <div className="inline-block border border-white/10 bg-lael-primary px-8 py-4 rounded-2xl">
              <span className="text-sm text-lael-muted tracking-wide uppercase font-bold">
                Modelo de <span className="text-lael-light">Aporte Voluntario</span>
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. SYSTEM ACTIVATION LAYER (Selector Interactivo) */}
      <section className="py-48 relative overflow-hidden">
        <div className="absolute inset-0 bg-lael-primary" />
        
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center mb-24">
            <span className="text-lael-accent text-[10px] font-bold uppercase tracking-[0.2em] mb-4 block">Capa 2</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-lael-light">Sistema de Rendimiento Avanzado</h2>
            <p className="text-lael-muted mt-6 max-w-2xl mx-auto">Selecciona los módulos estratégicos que necesitas. El sistema se calibra según tus objetivos.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {PAES_SUBJECTS.map((subject) => {
              const isSelected = selectedSubjects.includes(subject.id);
              return (
                <div 
                  key={subject.id} 
                  onClick={() => toggleSubject(subject.id)}
                  className={`cursor-pointer transition-all duration-500 p-8 rounded-2xl border ${
                    isSelected 
                      ? 'bg-lael-secondary border-lael-accent/50 shadow-[0_0_30px_rgba(198,166,107,0.15)] -translate-y-1' 
                      : 'bg-[#050505] border-white/5 hover:border-white/20 hover:-translate-y-1'
                  }`}
                >
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-3xl">{subject.icon}</span>
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                      isSelected ? 'border-lael-accent bg-lael-accent/20' : 'border-white/20'
                    }`}>
                      {isSelected && <div className="w-2 h-2 bg-lael-accent rounded-full" />}
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-lael-light mb-2">{subject.name}</h3>
                  <p className="text-[10px] text-lael-accent font-bold uppercase tracking-widest mb-4">{subject.category}</p>
                  <p className="text-sm text-lael-muted leading-relaxed">{subject.desc}</p>
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
                  transition={{ duration: 0.6, ease }}
                  className="w-full max-w-3xl bg-[#080808] border border-lael-accent/20 rounded-3xl p-10 md:p-14 text-center shadow-[0_0_50px_rgba(198,166,107,0.05)]"
                >
                  <h3 className="text-xl font-bold text-lael-light mb-2">{priceData.label}</h3>
                  <p className="text-sm text-lael-muted mb-8">Inversión mensual para mantener el sistema activo</p>
                  
                  <div className="text-5xl md:text-6xl font-display font-bold text-lael-accent mb-8">
                    {clp(priceData.totalMonthly)} <span className="text-lg text-lael-muted/50 font-sans tracking-wide">/ mes</span>
                  </div>

                  <div className="flex flex-wrap justify-center gap-6 text-sm text-lael-muted mb-10">
                    <div className="flex items-center gap-2">
                      <Target size={16} className="text-lael-accent" />
                      <span>{priceData.count} Módulos Activos</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield size={16} className="text-lael-accent" />
                      <span>Matrícula 1er mes: {clp(priceData.enrollment)}</span>
                    </div>
                  </div>

                  {priceData.saving > 0 && (
                    <div className="inline-block px-4 py-2 bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold uppercase tracking-widest rounded-full mb-8">
                      Optimizaste {clp(priceData.saving)} mensuales
                    </div>
                  )}

                  <Button variant="primary" to="/contacto" className="w-full py-5 text-xs tracking-[0.2em] uppercase font-bold shadow-[0_0_30px_rgba(198,166,107,0.15)]">
                    Activar Sistema
                  </Button>
                  <button className="mt-4 text-xs text-lael-muted hover:text-lael-light transition-colors underline underline-offset-4">
                    Pausar sistema en cualquier momento
                  </button>
                </motion.div>
              ) : (
                <motion.div 
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center"
                >
                  <p className="text-lael-muted text-lg tracking-wide">Selecciona al menos un módulo para calcular la inversión.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* 4. ELITE LAYER */}
      <section className="py-40 bg-lael-secondary/20 border-t border-white/5 relative overflow-hidden">
        {/* Glow de fondo */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-lael-accent/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-5xl mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center gap-16">
          <div className="w-full md:w-1/2">
            <span className="text-lael-accent text-[10px] font-bold uppercase tracking-[0.2em] mb-4 block">Capa 3</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-lael-light mb-6">Nivel Avanzado</h2>
            <p className="text-lael-muted leading-relaxed mb-8">
              Para estudiantes que requieren un nivel de exigencia absoluto. Mentoría 1:1, seguimiento diario y ajustes tácticos en tiempo real.
            </p>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-lael-light text-sm font-bold"><ChevronRight className="text-lael-accent w-4 h-4" /> Mentoría Estratégica 1:1</li>
              <li className="flex items-center gap-3 text-lael-light text-sm font-bold"><ChevronRight className="text-lael-accent w-4 h-4" /> Análisis de Ponderaciones</li>
              <li className="flex items-center gap-3 text-lael-light text-sm font-bold"><ChevronRight className="text-lael-accent w-4 h-4" /> Control Táctico de Ansiedad</li>
            </ul>
          </div>
          <div className="w-full md:w-1/2">
            <Card className="p-10 bg-[#050505] border-lael-accent/20 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-bold uppercase tracking-[0.2em] rounded-full mb-6">
                <span className="w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse"></span>
                Cupos Limitados
              </div>
              <h3 className="text-xl font-bold text-lael-light mb-6">Solo por postulación</h3>
              <p className="text-sm text-lael-muted mb-8">El ingreso al Nivel Avanzado requiere aprobación de un mentor.</p>
              <Button variant="secondary" to="/contacto" className="w-full">
                Solicitar Acceso Elite
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* 5. FINAL CTA */}
      <section className="py-40 text-center px-6 relative border-t border-white/5 bg-lael-primary">
        <div className="max-w-3xl mx-auto relative z-10">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-lael-light mb-6">Domina el sistema</h2>
          <p className="text-lael-muted mb-12 text-lg">Inicia tu proceso diagnóstico y descubre tu estrategia óptima.</p>
          <Button size="lg" variant="primary" to="/contacto" className="text-xs tracking-[0.2em] uppercase font-bold px-12 py-5 shadow-[0_0_30px_rgba(198,166,107,0.15)] hover:shadow-[0_0_60px_rgba(198,166,107,0.4)]">
            Solicitar evaluación inicial
          </Button>
        </div>
      </section>
    </div>
  );
}
