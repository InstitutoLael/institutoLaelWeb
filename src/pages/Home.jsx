import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { Target, Compass, Users, LineChart, Globe, HandHeart, Building, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Instituto Lael | Alto Rendimiento Académico</title>
        <meta name="description" content="No preparamos para una prueba. Formamos resultados reales. Sistema de alto rendimiento académico." />
      </Helmet>

      {/* 1. HERO */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-lael-primary pt-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-lael-primary/80 to-lael-primary z-10" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-lael-accent/10 rounded-full blur-[150px] pointer-events-none" />
        </div>

        <div className="relative z-20 max-w-5xl mx-auto px-6 text-center flex flex-col items-center">
          <motion.h1 
            className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-[1.1] mb-8 tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            No preparamos para una prueba.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-lael-light to-lael-muted">
              Formamos resultados reales.
            </span>
          </motion.h1>

          <motion.p 
            className="text-lg md:text-xl text-lael-muted max-w-2xl mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            Sistema de alto rendimiento académico para estudiantes que van en serio.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <Button size="lg" variant="primary" to="/contacto" className="text-sm tracking-widest uppercase shadow-[0_0_30px_rgba(198,166,107,0.3)] hover:shadow-[0_0_40px_rgba(198,166,107,0.5)]">
              Postula ahora
            </Button>
          </motion.div>
        </div>
      </section>

      {/* 2. PRUEBA SOCIAL */}
      <section className="py-12 border-y border-white/5 bg-lael-secondary/50 relative z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-around items-center gap-8 text-center">
          <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="text-4xl font-display font-bold text-lael-light mb-1">+2000</p>
            <p className="text-xs uppercase tracking-widest text-lael-muted font-bold">Estudiantes</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
            <p className="text-4xl font-display font-bold text-lael-light mb-1">2021</p>
            <p className="text-xs uppercase tracking-widest text-lael-muted font-bold">Desde</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            <p className="text-4xl font-display font-bold text-lael-accent mb-1">100%</p>
            <p className="text-xs uppercase tracking-widest text-lael-accent/80 font-bold">Resultados Reales</p>
          </motion.div>
        </div>
      </section>

      {/* 3. DIFERENCIA (Ataque directo) */}
      <section className="py-32 bg-lael-primary text-center px-6">
        <motion.div 
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-lael-muted text-lg md:text-xl font-medium mb-4 tracking-wide uppercase">
            No somos un instituto tradicional
          </p>
          <h2 className="text-4xl md:text-6xl font-display font-bold leading-tight">
            La mayoría estudia contenido.<br/>
            <span className="text-lael-accent">Nosotros entrenamos rendimiento.</span>
          </h2>
        </motion.div>
      </section>

      {/* 4. MÉTODO LAEL */}
      <section className="py-24 bg-lael-secondary relative border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-display font-bold text-lael-light">Arquitectura del Rendimiento</h2>
            <p className="text-lael-muted mt-4">Los 4 pilares de nuestra metodología táctica.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Target, title: "Diagnóstico", desc: "No trabajamos a ciegas. Medimos tu punto de partida con precisión." },
              { icon: Compass, title: "Estrategia", desc: "Ruta optimizada para maximizar resultados en el menor tiempo." },
              { icon: Users, title: "Acompañamiento", desc: "Mentores tácticos que ajustan tu desempeño en tiempo real." },
              { icon: LineChart, title: "Evaluación", desc: "Simulacros de presión constante para forjar dominio mental." }
            ].map((pilar, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Card className="p-8 h-full bg-lael-primary border-white/5 hover:border-lael-accent/30 transition-colors">
                  <pilar.icon className="w-10 h-10 text-lael-accent mb-6" />
                  <h3 className="text-xl font-bold text-lael-light mb-3">{pilar.title}</h3>
                  <p className="text-sm text-lael-muted leading-relaxed">{pilar.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. PROGRAMAS */}
      <section className="py-32 bg-lael-primary">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-display font-bold text-lael-light mb-4">Sistemas de Inmersión</h2>
            <p className="text-lael-muted">Resultados escalables para cada área de desarrollo.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: GraduationCap, title: "Preuniversitario", sub: "Alto Rendimiento", path: "/preuniversitario" },
              { icon: Globe, title: "Idiomas", sub: "Dominio Estructural", path: "/idiomas" },
              { icon: HandHeart, title: "Lengua de Señas", sub: "Inclusión Real", path: "/lsch" },
              { icon: Building, title: "Empresas", sub: "Capacitación Táctica", path: "/empresas" }
            ].map((prog, i) => (
              <Link to={prog.path} key={i} className="group block">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <Card hoverEffect className="p-8 text-center flex flex-col items-center border border-transparent group-hover:border-lael-accent/20">
                    <prog.icon className="w-12 h-12 text-lael-muted group-hover:text-lael-accent transition-colors duration-500 mb-6" />
                    <h3 className="text-xl font-bold text-lael-light mb-2">{prog.title}</h3>
                    <p className="text-xs uppercase tracking-widest text-lael-accent font-bold">{prog.sub}</p>
                  </Card>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 6. EXPERIENCIA / ESTILO */}
      <section className="py-32 bg-lael-secondary relative overflow-hidden border-t border-white/5">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-full bg-lael-primary transform skew-x-12 translate-x-32 hidden lg:block" />
        <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-lael-light mb-6">
              El nivel que estabas buscando.
            </h2>
            <p className="text-lg text-lael-muted mb-8 leading-relaxed">
              No eres un número más en un aula gigante. Formarás parte de una comunidad exclusiva enfocada en la excelencia, donde el acompañamiento es uno a uno y la exigencia es constante.
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3 text-lael-light font-medium"><div className="w-2 h-2 rounded-full bg-lael-accent" /> Comunidad táctica</li>
              <li className="flex items-center gap-3 text-lael-light font-medium"><div className="w-2 h-2 rounded-full bg-lael-accent" /> Acompañamiento inquebrantable</li>
              <li className="flex items-center gap-3 text-lael-light font-medium"><div className="w-2 h-2 rounded-full bg-lael-accent" /> Entorno de alto nivel</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 7. CTA FINAL */}
      <section className="py-32 bg-lael-primary relative overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] bg-lael-accent/5 blur-[120px] pointer-events-none" />
        
        <div className="max-w-3xl mx-auto px-6 relative z-10">
          <motion.div 
            className="border border-white/10 bg-lael-secondary/80 backdrop-blur-xl rounded-3xl p-10 md:p-16 shadow-cinematic-shadow text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-3 py-1 bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold uppercase tracking-widest rounded-full mb-6">
              Proceso de Selección Abierto
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-lael-light mb-4">Comienza tu proceso</h2>
            <p className="text-lael-muted mb-10">Cupos limitados por sección para garantizar el rendimiento.</p>

            <form className="text-left space-y-4 mb-8" onSubmit={(e) => e.preventDefault()}>
              <input type="text" placeholder="Nombre completo" className="w-full bg-lael-primary border border-white/10 rounded-xl px-5 py-4 text-sm text-lael-light focus:outline-none focus:border-lael-accent transition-colors" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" placeholder="Programa de interés" className="w-full bg-lael-primary border border-white/10 rounded-xl px-5 py-4 text-sm text-lael-light focus:outline-none focus:border-lael-accent transition-colors" />
                <input type="text" placeholder="Objetivo principal" className="w-full bg-lael-primary border border-white/10 rounded-xl px-5 py-4 text-sm text-lael-light focus:outline-none focus:border-lael-accent transition-colors" />
              </div>
              <Button variant="primary" className="w-full mt-4 py-4 text-sm tracking-widest uppercase">
                Postula Hoy
              </Button>
            </form>
            
            <p className="text-xs text-lael-muted/50">Tus datos están protegidos. Te contactaremos vía WhatsApp.</p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
