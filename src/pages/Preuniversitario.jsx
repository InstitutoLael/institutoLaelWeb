import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import CTASection from '../components/CTASection';
import { PAES_SUBJECTS, PAES_COMBOS } from '../data/paes';

export default function Preuniversitario() {
  return (
    <>
      <Helmet>
        <title>Sistema PAES | Instituto Lael</title>
        <meta name="description" content="Sistema Integral de Rendimiento PAES. Estrategia y táctica para asegurar tu ingreso a la universidad." />
      </Helmet>

      <section className="relative pt-32 pb-24 bg-lael-primary overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-lael-accent/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.h1 
            className="text-4xl md:text-6xl font-display font-bold leading-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Sistema PAES de <br />
            <span className="text-lael-accent text-transparent bg-clip-text bg-gradient-to-r from-lael-accent to-lael-light">Alto Rendimiento</span>
          </motion.h1>
          <motion.p 
            className="text-lg text-lael-muted max-w-2xl mx-auto mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            No vendemos "clases de matemáticas". Diseñamos tácticas de resolución rápida, control de ansiedad y dominio estructural para maximizar tu puntaje.
          </motion.p>
        </div>
      </section>

      {/* Módulos de Entrenamiento */}
      <section className="py-24 bg-lael-secondary relative border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-display font-bold mb-4">Módulos Estratégicos</h2>
            <p className="text-lael-muted">Estructuras de conocimiento optimizadas para la evaluación.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PAES_SUBJECTS.map((subject) => (
              <Card key={subject.id} hoverEffect className="p-8">
                <div className="text-3xl mb-4">{subject.icon}</div>
                <div className="text-lael-accent text-xs font-bold uppercase tracking-wider mb-2">{subject.category}</div>
                <h3 className="text-xl font-bold mb-3 text-lael-light">{subject.name}</h3>
                <p className="text-lael-muted text-sm leading-relaxed">{subject.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Estrategias de Rendimiento */}
      <section className="py-24 bg-lael-primary relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-display font-bold mb-4">Sistemas Integrales</h2>
            <p className="text-lael-muted">Combos tácticos diseñados para objetivos específicos.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PAES_COMBOS.map((combo) => (
              <Card key={combo.id} hoverEffect className="p-8 flex flex-col border border-white/5 relative">
                {/* Glow sutil si es full */}
                {combo.id === 'combo-full' && (
                  <div className="absolute inset-0 bg-lael-accent/5 pointer-events-none rounded-2xl" />
                )}
                
                <div className="mb-6 relative z-10">
                  <span className="inline-block py-1 px-3 rounded-md bg-white/5 text-lael-accent text-xs font-bold uppercase tracking-wider mb-4">
                    {combo.tag || "Estrategia"}
                  </span>
                  <h3 className="text-2xl font-bold text-lael-light mb-2">{combo.title}</h3>
                  <p className="text-lael-muted text-sm">{combo.subtitle}</p>
                </div>

                <ul className="space-y-4 mb-8 flex-grow relative z-10">
                  {combo.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-lael-muted">
                      <span className="text-lael-accent mt-0.5">●</span>
                      {feat}
                    </li>
                  ))}
                </ul>

                <Button variant={combo.id === 'combo-full' ? 'primary' : 'secondary'} className="w-full relative z-10">
                  Postular a este Sistema
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <CTASection 
        title="¿Listo para dominar la PAES?"
        subtitle="Postula hoy a nuestro sistema de alto rendimiento y asegura tu cupo."
        btnText="Iniciar Diagnóstico"
      />
    </>
  );
}
