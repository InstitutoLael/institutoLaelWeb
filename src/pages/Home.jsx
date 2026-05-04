import React, { useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import { Target, Compass, Users, LineChart, GraduationCap, Globe, HandHeart, Building } from 'lucide-react';

import demre from '../assets/img/Partners/DEMRE.png';
import google from '../assets/img/Partners/GoogleWorkspace.png';
import ino from '../assets/img/Partners/INO.png';
import losOlivos from '../assets/img/Partners/LosOlivos.png';
import mercadoPago from '../assets/img/Partners/MercadoPago.png';
import naama from '../assets/img/Partners/naama-studio.png';
import onepay from '../assets/img/Partners/onepay.png';
import transbank from '../assets/img/Partners/Transbank.png';

const partners = [demre, google, ino, losOlivos, mercadoPago, naama, onepay, transbank];

// Premium easing
const ease = [0.16, 1, 0.3, 1];

// Signature Visual Element (Lael Identity)
const SignatureRing = ({ className }) => (
  <div className={`absolute pointer-events-none flex items-center justify-center ${className}`}>
    <div className="w-[600px] h-[600px] border-[0.5px] border-lael-accent/10 rounded-full flex items-center justify-center relative">
      <div className="w-[400px] h-[400px] border-[0.5px] border-lael-accent/5 rounded-full" />
      <div className="w-[200px] h-[200px] border-[0.5px] border-lael-accent/5 rounded-full" />
      <div className="absolute inset-0 bg-lael-accent/[0.02] blur-3xl rounded-full mix-blend-screen animate-pulse" style={{ animationDuration: '4s' }} />
    </div>
  </div>
);

export default function Home() {
  const { scrollYProgress } = useScroll();
  
  // Subtle global parallax
  const yHeroGlow = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacityHeroGlow = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  // Method Line activation
  const methodRef = useRef(null);
  const { scrollYProgress: methodScroll } = useScroll({
    target: methodRef,
    offset: ["start center", "end center"]
  });
  const lineWidth = useTransform(methodScroll, [0, 1], ["0%", "100%"]);

  return (
    <div className="bg-lael-primary text-lael-light overflow-hidden selection:bg-lael-accent/30 selection:text-lael-primary">
      <Helmet>
        <title>Instituto Lael | Sistema de Rendimiento Académico</title>
        <meta name="description" content="No preparamos para una prueba. Formamos resultados reales. Sistema de alto rendimiento académico." />
      </Helmet>

      {/* FIXED TEXTURE (Noise) */}
      <div className="fixed inset-0 z-50 pointer-events-none opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>

      {/* 1. HERO (Cinemático absoluto) */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        <SignatureRing className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-40" />

        {/* Glow animado y parallax */}
        <motion.div 
          className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none"
          style={{ y: yHeroGlow, opacity: opacityHeroGlow }}
        >
          <div className="w-[800px] h-[800px] bg-lael-accent/5 rounded-full blur-[150px] mix-blend-screen animate-blob" />
        </motion.div>

        <div className="relative z-20 max-w-5xl mx-auto px-6 text-center flex flex-col items-center mt-[-5vh]">
          <motion.h1 
            className="text-5xl md:text-7xl lg:text-[5.5rem] font-display font-bold leading-[1.05] mb-10 tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease }}
          >
            No preparamos para una prueba.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-lael-light via-lael-light to-lael-muted">
              Formamos resultados reales.
            </span>
          </motion.h1>

          <motion.p 
            className="text-lg md:text-xl text-lael-muted max-w-2xl mb-16 font-medium tracking-wide"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease }}
          >
            Sistema de alto rendimiento académico para estudiantes que van en serio.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4, ease }}
          >
            <Button size="lg" variant="primary" to="/contacto" className="text-xs tracking-[0.2em] uppercase font-bold px-12 py-5 shadow-[0_0_30px_rgba(198,166,107,0.15)] hover:shadow-[0_0_60px_rgba(198,166,107,0.4)] hover:scale-105 transition-all duration-700">
              Solicitar evaluación inicial
            </Button>
          </motion.div>
        </div>
      </section>

      {/* 2. PARTNER MARQUEE (Ultra Premium Fade) */}
      <section className="py-6 bg-lael-primary relative z-10 overflow-hidden">
        {/* Soft edge masks */}
        <div className="absolute left-0 top-0 bottom-0 w-48 bg-gradient-to-r from-lael-primary to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-48 bg-gradient-to-l from-lael-primary to-transparent z-10" />
        
        <div className="flex w-max animate-marquee opacity-30">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex gap-24 px-12 items-center justify-center">
              {partners.map((partnerImg, idx) => (
                <img 
                  key={idx} 
                  src={partnerImg} 
                  alt="Partner" 
                  className="h-8 md:h-10 w-auto object-contain opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700" 
                />
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* 3. PRUEBA SOCIAL INMEDIATA (Clean, no borders) */}
      <section className="py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, ease }}>
            <p className="text-5xl md:text-6xl font-display font-bold text-lael-light mb-3">+2000</p>
            <p className="text-xs uppercase tracking-[0.2em] text-lael-muted font-medium">Estudiantes formados</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, delay: 0.1, ease }}>
            <p className="text-5xl md:text-6xl font-display font-bold text-lael-light mb-3">2021</p>
            <p className="text-xs uppercase tracking-[0.2em] text-lael-muted font-medium">Innovando desde</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, delay: 0.2, ease }}>
            <p className="text-5xl md:text-6xl font-display font-bold text-lael-accent mb-3">100%</p>
            <p className="text-xs uppercase tracking-[0.2em] text-lael-accent/80 font-medium">Resultados Reales</p>
          </motion.div>
        </div>
      </section>

      {/* 4. DIFERENCIA (Golpe estratégico puro contraste) */}
      <section className="py-48 text-center px-6 relative overflow-hidden">
        <SignatureRing className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20" />
        <motion.div 
          className="max-w-5xl mx-auto relative z-10 space-y-24"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease }}
        >
          <div>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-tight">
              <span className="text-lael-muted/50">La mayoría memoriza.</span><br/>
              <span className="text-lael-light">Nosotros entrenamos criterio.</span>
            </h2>
          </div>
          <div>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-tight">
              <span className="text-lael-muted/50">La mayoría repite.</span><br/>
              <span className="text-lael-accent">Nosotros formamos resultados.</span>
            </h2>
          </div>
        </motion.div>
      </section>

      {/* 5. MÉTODO LAEL (Sistema conectado) */}
      <section className="py-40 relative overflow-hidden" ref={methodRef}>
        <div className="absolute inset-0 bg-lael-secondary/30" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-32">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-lael-light tracking-wide mb-6">Arquitectura del Sistema</h2>
            <p className="text-lael-muted text-lg">El proceso exacto que convierte esfuerzo en rendimiento.</p>
          </div>

          <div className="relative">
            {/* Línea conectora inactiva */}
            <div className="hidden lg:block absolute top-[45px] left-0 right-0 h-px bg-white/5" />
            
            {/* Línea conectora ACTIVA (scroll) */}
            <motion.div 
              className="hidden lg:block absolute top-[45px] left-0 h-px bg-lael-accent shadow-[0_0_10px_rgba(198,166,107,0.5)]"
              style={{ width: lineWidth }}
            />

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-16 lg:gap-6 relative z-10">
              {[
                { icon: Target, title: "Diagnóstico", desc: "Mapeo de precisión de tus brechas." },
                { icon: Compass, title: "Estrategia", desc: "Ruta trazada al objetivo exacto." },
                { icon: Users, title: "Acompañamiento", desc: "Mentores corrigiendo tu técnica." },
                { icon: LineChart, title: "Evaluación", desc: "Presión controlada constante." }
              ].map((pilar, i) => (
                <motion.div 
                  key={i}
                  className="flex flex-col items-center text-center group"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: i * 0.15, ease }}
                >
                  <div className="w-24 h-24 rounded-full bg-lael-primary border border-white/5 flex items-center justify-center mb-10 relative group-hover:border-lael-accent/50 group-hover:shadow-[0_0_30px_rgba(198,166,107,0.2)] group-hover:scale-110 transition-all duration-700">
                    <pilar.icon className="w-8 h-8 text-lael-muted group-hover:text-lael-accent transition-colors duration-700" />
                    {/* Número de paso que pulsa */}
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-lael-accent text-lael-primary flex items-center justify-center text-xs font-bold shadow-[0_0_15px_rgba(198,166,107,0.5)] animate-pulse" style={{ animationDuration: '3s' }}>
                      {i + 1}
                    </div>
                  </div>
                  <h3 className="text-xl font-display font-bold text-lael-light mb-4">{pilar.title}</h3>
                  <p className="text-sm text-lael-muted max-w-[200px] leading-relaxed">{pilar.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. SECCIÓN DE TENSIÓN (Conexión emocional) */}
      <section className="py-48 text-center px-6 relative overflow-hidden">
        {/* Spotlight effect that fades in */}
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-white/[0.015] rounded-full blur-[100px] pointer-events-none"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-200px" }}
          transition={{ duration: 2 }}
        />
        
        <div className="max-w-3xl mx-auto relative z-10">
          <motion.h2 
            className="text-3xl md:text-4xl lg:text-5xl font-display font-bold leading-relaxed mb-16 text-lael-light"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease }}
          >
            Estudiar más no siempre significa mejorar.
          </motion.h2>
          
          <motion.p 
            className="text-xl md:text-2xl text-lael-muted/60 font-medium leading-relaxed mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.3, ease }}
          >
            Sin estrategia, sin guía y sin presión real,<br className="hidden md:block" /> los resultados no cambian.
          </motion.p>
          
          <motion.p 
            className="text-2xl md:text-3xl font-display font-bold text-lael-accent uppercase tracking-widest"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, delay: 0.6, ease }}
          >
            Por eso existe Lael.
          </motion.p>
        </div>
      </section>

      {/* 7. PROGRAM CARDS (Interaction Upgrade) */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-lael-light tracking-wide mb-6">Módulos de Sistema</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: GraduationCap, title: "Preuniversitario", sub: "Alto Rendimiento", path: "/paes" },
              { icon: Globe, title: "Idiomas", sub: "Dominio Estructural", path: "/idiomas" },
              { icon: HandHeart, title: "Lengua de Señas", sub: "Inclusión Real", path: "/lsch" },
              { icon: Building, title: "Empresas", sub: "Capacitación Táctica", path: "/empresas" }
            ].map((prog, i) => (
              <Link to={prog.path} key={i} className="group block h-full">
                <motion.div 
                  className="h-full"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.8, delay: i * 0.1, ease }}
                >
                  {/* Card with lift and gradient shift */}
                  <div className="p-12 h-full bg-lael-secondary/30 hover:bg-gradient-to-b hover:from-lael-secondary/80 hover:to-lael-primary text-center flex flex-col items-center justify-center rounded-2xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(198,166,107,0.05)] border border-transparent hover:border-lael-accent/20">
                    <prog.icon className="w-10 h-10 text-lael-muted group-hover:text-lael-accent transition-colors duration-500 mb-8" />
                    <h3 className="text-xl font-bold text-lael-light mb-3">{prog.title}</h3>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-lael-muted/50 group-hover:text-lael-accent font-bold transition-colors">{prog.sub}</p>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 8. CTA SECTION (Irresistible & Premium) */}
      <section className="py-48 relative overflow-hidden">
        {/* Animated gradient glow behind card */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-lael-accent/5 rounded-full blur-[150px] animate-pulse pointer-events-none" style={{ animationDuration: '6s' }} />
        
        <SignatureRing className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30" />

        <div className="max-w-3xl mx-auto px-6 relative z-10">
          <motion.div 
            className="bg-[#050505]/80 backdrop-blur-2xl rounded-3xl p-10 md:p-16 shadow-cinematic-shadow text-center relative overflow-hidden border border-white/[0.02]"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease }}
          >
            {/* Glow superior de la tarjeta */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-lael-accent/30 to-transparent"></div>

            {/* Badge shimmer */}
            <div className="inline-flex items-center gap-3 px-5 py-2 bg-lael-accent/5 border border-lael-accent/20 text-lael-accent text-[10px] font-bold uppercase tracking-[0.2em] rounded-full mb-10 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]" />
              <span className="w-1.5 h-1.5 bg-lael-accent rounded-full animate-pulse"></span>
              Proceso de Selección Abierto
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-lael-light mb-6">Da el primer paso</h2>
            <p className="text-lael-muted mb-12 text-lg">Cupos limitados por sección para garantizar el estándar de rendimiento.</p>

            <form className="text-left space-y-5 mb-8" onSubmit={(e) => e.preventDefault()}>
              <input type="text" placeholder="Nombre completo" className="w-full bg-[#0A0A0A] border border-white/5 rounded-xl px-6 py-5 text-sm text-lael-light focus:outline-none focus:border-lael-accent/40 focus:ring-1 focus:ring-lael-accent/40 focus:shadow-[0_0_20px_rgba(198,166,107,0.1)] transition-all duration-300 placeholder:text-lael-muted/40" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <input type="text" placeholder="Programa de interés" className="w-full bg-[#0A0A0A] border border-white/5 rounded-xl px-6 py-5 text-sm text-lael-light focus:outline-none focus:border-lael-accent/40 focus:ring-1 focus:ring-lael-accent/40 focus:shadow-[0_0_20px_rgba(198,166,107,0.1)] transition-all duration-300 placeholder:text-lael-muted/40" />
                <input type="text" placeholder="Objetivo (Ej: 850 puntos)" className="w-full bg-[#0A0A0A] border border-white/5 rounded-xl px-6 py-5 text-sm text-lael-light focus:outline-none focus:border-lael-accent/40 focus:ring-1 focus:ring-lael-accent/40 focus:shadow-[0_0_20px_rgba(198,166,107,0.1)] transition-all duration-300 placeholder:text-lael-muted/40" />
              </div>
              <Button variant="primary" className="w-full mt-8 py-6 text-xs tracking-[0.2em] uppercase font-bold shadow-[0_0_30px_rgba(198,166,107,0.15)] hover:shadow-[0_0_60px_rgba(198,166,107,0.4)] hover:scale-105 transition-all duration-700">
                Solicitar evaluación inicial
              </Button>
            </form>
            
            <p className="text-xs text-lael-muted/40 tracking-wider">Tus datos están protegidos. Un mentor se pondrá en contacto pronto.</p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
