import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { Target, Compass, Users, LineChart, GraduationCap, Globe, HandHeart, Building } from 'lucide-react';

export default function Home() {
  return (
    <div className="bg-lael-primary text-lael-light overflow-hidden">
      <Helmet>
        <title>Instituto Lael | Sistema de Rendimiento Académico</title>
        <meta name="description" content="No preparamos para una prueba. Formamos resultados reales. Sistema de alto rendimiento académico." />
      </Helmet>

      {/* 1. HERO (Cinemático absoluto) */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Grain overlay */}
        <div className="absolute inset-0 z-10 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
        
        {/* Luces sutiles */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-lael-accent/5 rounded-full blur-[150px] pointer-events-none mix-blend-screen" />
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-lael-primary to-transparent z-10" />
        </div>

        <div className="relative z-20 max-w-5xl mx-auto px-6 text-center flex flex-col items-center mt-[-5vh]">
          <motion.h1 
            className="text-5xl md:text-7xl lg:text-[5.5rem] font-display font-bold leading-[1.05] mb-8 tracking-tight"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            No preparamos para una prueba.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-lael-light via-lael-light to-lael-muted">
              Formamos resultados reales.
            </span>
          </motion.h1>

          <motion.p 
            className="text-lg md:text-xl text-lael-muted max-w-2xl mb-12 font-medium tracking-wide"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            Sistema de alto rendimiento académico para estudiantes que van en serio.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <Button size="lg" variant="primary" to="/contacto" className="text-xs tracking-[0.2em] uppercase font-bold px-10 py-5 shadow-[0_0_30px_rgba(198,166,107,0.15)] hover:shadow-[0_0_50px_rgba(198,166,107,0.3)]">
              Solicitar evaluación inicial
            </Button>
          </motion.div>
        </div>
      </section>

      {/* 2. PARTNER MARQUEE (Confianza silenciosa) */}
      <section className="py-10 border-y border-white/5 bg-lael-primary relative z-10 overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-lael-primary to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-lael-primary to-transparent z-10" />
        
        <p className="text-center text-[10px] uppercase tracking-[0.3em] text-lael-muted/50 font-bold mb-8">
          Confían en nuestro sistema
        </p>
        
        <div className="flex w-max animate-marquee">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex gap-20 px-10 items-center justify-center">
              {['Universidad de Chile', 'Pontificia Universidad Católica', 'Corporate Partners', 'Exalumnos Destacados', 'Colegios de Excelencia'].map((partner, idx) => (
                <div key={idx} className="text-lael-muted/40 font-display font-bold text-xl md:text-2xl tracking-wide whitespace-nowrap hover:text-lael-light transition-colors duration-500">
                  {partner}
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* 3. PRUEBA SOCIAL INMEDIATA */}
      <section className="py-24 bg-lael-secondary/30 relative z-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-white/5">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }}>
            <p className="text-5xl md:text-6xl font-display font-bold text-lael-light mb-2">+2000</p>
            <p className="text-xs uppercase tracking-[0.2em] text-lael-muted font-bold">Estudiantes formados</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, delay: 0.1 }} className="pt-12 md:pt-0">
            <p className="text-5xl md:text-6xl font-display font-bold text-lael-light mb-2">2021</p>
            <p className="text-xs uppercase tracking-[0.2em] text-lael-muted font-bold">Innovando desde</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, delay: 0.2 }} className="pt-12 md:pt-0">
            <p className="text-5xl md:text-6xl font-display font-bold text-lael-accent mb-2">100%</p>
            <p className="text-xs uppercase tracking-[0.2em] text-lael-accent/80 font-bold">Resultados Reales</p>
          </motion.div>
        </div>
      </section>

      {/* 4. DIFERENCIA (Golpe estratégico) */}
      <section className="py-40 bg-lael-primary text-center px-6 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[300px] bg-lael-accent/5 blur-[100px] pointer-events-none" />
        <motion.div 
          className="max-w-5xl mx-auto relative z-10 space-y-16"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight">
              <span className="text-lael-muted">La mayoría memoriza.</span><br/>
              <span className="text-lael-light">Nosotros entrenamos criterio.</span>
            </h2>
          </div>
          <div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight">
              <span className="text-lael-muted">La mayoría repite.</span><br/>
              <span className="text-lael-accent">Nosotros formamos resultados.</span>
            </h2>
          </div>
        </motion.div>
      </section>

      {/* 5. MÉTODO LAEL (Flujo de Experiencia) */}
      <section className="py-32 bg-lael-secondary relative border-y border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-24">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-lael-light tracking-wide mb-4">Arquitectura del Sistema</h2>
            <p className="text-lael-muted">El proceso exacto que convierte esfuerzo en rendimiento.</p>
          </div>

          <div className="relative">
            {/* Línea conectora horizontal (desktop) */}
            <div className="hidden lg:block absolute top-[45px] left-0 right-0 h-px bg-gradient-to-r from-transparent via-lael-accent/30 to-transparent" />

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-6 relative z-10">
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
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.8, delay: i * 0.15, ease: "easeOut" }}
                >
                  <div className="w-24 h-24 rounded-full bg-lael-primary border border-white/5 flex items-center justify-center mb-8 relative group-hover:border-lael-accent/40 group-hover:shadow-[0_0_30px_rgba(198,166,107,0.15)] transition-all duration-500">
                    <pilar.icon className="w-8 h-8 text-lael-muted group-hover:text-lael-accent transition-colors duration-500" />
                    {/* Número de paso */}
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-lael-accent text-lael-primary flex items-center justify-center text-xs font-bold shadow-lg">
                      {i + 1}
                    </div>
                  </div>
                  <h3 className="text-xl font-display font-bold text-lael-light mb-3">{pilar.title}</h3>
                  <p className="text-sm text-lael-muted max-w-[200px] leading-relaxed">{pilar.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. SECCIÓN DE TENSIÓN (Conexión emocional) */}
      <section className="py-40 bg-lael-primary text-center px-6 relative overflow-hidden">
        {/* Spotlight radial */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-[400px] bg-white/[0.02] rounded-full blur-[100px]" />
        
        <motion.div 
          className="max-w-3xl mx-auto relative z-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold leading-relaxed mb-12">
            <span className="text-lael-light">Estudiar más no siempre significa mejorar.</span>
          </h2>
          <p className="text-xl md:text-2xl text-lael-muted font-medium leading-relaxed mb-12">
            Sin estrategia, sin guía y sin presión real,<br className="hidden md:block" /> los resultados no cambian.
          </p>
          <p className="text-2xl md:text-3xl font-display font-bold text-lael-accent uppercase tracking-widest">
            Por eso existe Lael.
          </p>
        </motion.div>
      </section>

      {/* 7. PROGRAMAS */}
      <section className="py-32 bg-lael-secondary border-y border-white/5 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-lael-light tracking-wide mb-4">Módulos de Sistema</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: GraduationCap, title: "Preuniversitario", sub: "Alto Rendimiento", path: "/preuniversitario" },
              { icon: Globe, title: "Idiomas", sub: "Dominio Estructural", path: "/idiomas" },
              { icon: HandHeart, title: "Lengua de Señas", sub: "Inclusión Real", path: "/lsch" },
              { icon: Building, title: "Empresas", sub: "Capacitación Táctica", path: "/empresas" }
            ].map((prog, i) => (
              <Link to={prog.path} key={i} className="group block h-full">
                <motion.div 
                  className="h-full"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
                >
                  <Card hoverEffect className="p-10 h-full bg-lael-primary text-center flex flex-col items-center justify-center border border-white/5 group-hover:border-lael-accent/50 group-hover:shadow-[0_0_30px_rgba(198,166,107,0.1)] transition-all duration-500">
                    <prog.icon className="w-10 h-10 text-lael-muted group-hover:text-lael-accent transition-colors duration-500 mb-6" />
                    <h3 className="text-xl font-bold text-lael-light mb-2">{prog.title}</h3>
                    <p className="text-[10px] uppercase tracking-widest text-lael-muted group-hover:text-lael-accent font-bold transition-colors">{prog.sub}</p>
                  </Card>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 8. EXPERIENCIA (Exclusividad Split Layout) */}
      <section className="py-0 bg-lael-primary relative overflow-hidden flex flex-col lg:flex-row">
        {/* Lado Imagen/Abstracto */}
        <div className="w-full lg:w-1/2 min-h-[400px] lg:min-h-[600px] bg-lael-secondary relative overflow-hidden flex items-center justify-center">
           <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-luminosity grayscale"></div>
           <div className="absolute inset-0 bg-gradient-to-r from-transparent to-lael-primary lg:to-lael-primary/0"></div>
           <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="w-64 h-64 border border-lael-accent/20 rounded-full flex items-center justify-center relative z-10"
           >
              <div className="w-48 h-48 border border-lael-accent/30 rounded-full flex items-center justify-center">
                 <div className="w-32 h-32 bg-lael-accent/5 rounded-full blur-xl"></div>
              </div>
           </motion.div>
        </div>

        {/* Lado Contenido */}
        <div className="w-full lg:w-1/2 p-12 md:p-24 flex flex-col justify-center relative z-10 bg-lael-primary">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <h2 className="text-3xl md:text-5xl font-display font-bold text-lael-light mb-8 leading-tight">
              Un ecosistema diseñado <br/> para la élite.
            </h2>
            <p className="text-lg text-lael-muted mb-10 leading-relaxed font-medium">
              No eres un número más en un aula gigante. Formarás parte de un grupo exclusivo enfocado en la excelencia.
            </p>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <div className="mt-1 w-5 h-5 rounded-full bg-lael-accent/10 border border-lael-accent/30 flex items-center justify-center shrink-0">
                  <div className="w-1.5 h-1.5 bg-lael-accent rounded-full"></div>
                </div>
                <div>
                  <h4 className="text-lael-light font-bold mb-1">Comunidad Táctica</h4>
                  <p className="text-sm text-lael-muted">Avanzas junto a pares con tu mismo nivel de ambición.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="mt-1 w-5 h-5 rounded-full bg-lael-accent/10 border border-lael-accent/30 flex items-center justify-center shrink-0">
                  <div className="w-1.5 h-1.5 bg-lael-accent rounded-full"></div>
                </div>
                <div>
                  <h4 className="text-lael-light font-bold mb-1">Acompañamiento Constante</h4>
                  <p className="text-sm text-lael-muted">Tus mentores saben exactamente dónde estás fallando.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="mt-1 w-5 h-5 rounded-full bg-lael-accent/10 border border-lael-accent/30 flex items-center justify-center shrink-0">
                  <div className="w-1.5 h-1.5 bg-lael-accent rounded-full"></div>
                </div>
                <div>
                  <h4 className="text-lael-light font-bold mb-1">Entorno de Alto Nivel</h4>
                  <p className="text-sm text-lael-muted">Sin distracciones. Solo enfoque absoluto en la meta.</p>
                </div>
              </li>
            </ul>
          </motion.div>
        </div>
      </section>

      {/* 9. CTA FINAL (Alta Conversión) */}
      <section className="py-32 bg-lael-primary relative overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-lael-accent/10 via-lael-primary to-lael-primary opacity-50"></div>
        
        <div className="max-w-3xl mx-auto px-6 relative z-10">
          <motion.div 
            className="border border-white/10 bg-lael-secondary/40 backdrop-blur-2xl rounded-3xl p-10 md:p-16 shadow-cinematic-shadow text-center relative overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Glow superior de la tarjeta */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-lael-accent/50 to-transparent"></div>

            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-lael-accent/10 border border-lael-accent/20 text-lael-accent text-[10px] font-bold uppercase tracking-[0.2em] rounded-full mb-8">
              <span className="w-1.5 h-1.5 bg-lael-accent rounded-full animate-pulse"></span>
              Proceso de Selección Abierto
            </span>
            
            <h2 className="text-4xl md:text-5xl font-display font-bold text-lael-light mb-4">Da el primer paso</h2>
            <p className="text-lael-muted mb-10 text-lg">Cupos limitados por sección para garantizar el estándar de rendimiento.</p>

            <form className="text-left space-y-4 mb-8" onSubmit={(e) => e.preventDefault()}>
              <input type="text" placeholder="Nombre completo" className="w-full bg-[#050505] border border-white/5 rounded-xl px-5 py-4 text-sm text-lael-light focus:outline-none focus:border-lael-accent/50 focus:ring-1 focus:ring-lael-accent/50 transition-all" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" placeholder="Programa de interés" className="w-full bg-[#050505] border border-white/5 rounded-xl px-5 py-4 text-sm text-lael-light focus:outline-none focus:border-lael-accent/50 focus:ring-1 focus:ring-lael-accent/50 transition-all" />
                <input type="text" placeholder="Objetivo (Ej: 850 puntos)" className="w-full bg-[#050505] border border-white/5 rounded-xl px-5 py-4 text-sm text-lael-light focus:outline-none focus:border-lael-accent/50 focus:ring-1 focus:ring-lael-accent/50 transition-all" />
              </div>
              <Button variant="primary" className="w-full mt-6 py-5 text-xs tracking-[0.2em] uppercase font-bold shadow-[0_0_20px_rgba(198,166,107,0.2)]">
                Solicitar evaluación inicial
              </Button>
            </form>
            
            <p className="text-xs text-lael-muted/50 tracking-wide">Tus datos están protegidos. Un mentor se pondrá en contacto pronto.</p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
