import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SEOHead from "../components/SEOHead.jsx";
import PartnersMarquee from "../components/PartnersMarquee.jsx"; 

/* --------------------------------------------------------------------------
   ICONOS SVG (Tus originales, estilizados con Tailwind)
   -------------------------------------------------------------------------- */
const Icons = {
  Arrow: () => (
    <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M5 12h14M12 5l7 7-7 7"/>
    </svg>
  ),
  Bolt: () => (
    <svg className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
    </svg>
  ),
  Globe: () => (
    <svg className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  ),
  Hand: () => (
    <svg className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0"/><path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2"/><path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/>
    </svg>
  )
};

/* --- COMPONENTE AURORA BACKGROUND (Efecto Visual de Fondo) --- */
const BackgroundAurora = () => (
  <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-bg-deep">
    {/* Orbe Dorado (PAES) */}
    <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-lael-gold/10 rounded-full blur-[120px] animate-blob mix-blend-screen" />
    {/* Orbe Rosa (Idiomas) */}
    <div className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] bg-lael-pink/10 rounded-full blur-[100px] animate-blob animation-delay-2000 mix-blend-screen" />
    {/* Orbe Azul (Institucional) */}
    <div className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] bg-lael-navy/15 rounded-full blur-[130px] animate-blob animation-delay-4000 mix-blend-screen" />
    {/* Textura de Ruido (Noise) para calidad cinematográfica */}
    <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
  </div>
);

/* --- COMPONENTE TYPEWRITER (Tu lógica original) --- */
const Typewriter = ({ words }) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    if (subIndex === words[index].length + 1 && !reverse) {
      setTimeout(() => setReverse(true), 2500);
      return;
    }
    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }
    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, Math.max(reverse ? 50 : 100, parseInt(Math.random() * 50)));
    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, words]);

  return (
    <span className="inline-block bg-gradient-to-r from-lael-gold via-white to-lael-pink bg-clip-text text-transparent">
      {words[index].substring(0, subIndex)}
      <span className="animate-pulse text-white ml-1">|</span>
    </span>
  );
};

export default function Home() {
  return (
    <div className="relative min-h-screen bg-bg-deep text-white font-sans selection:bg-lael-gold selection:text-black overflow-x-hidden">
      <SEOHead title="Instituto Lael | El Futuro de la Educación" description="Formación online de alto nivel." />
      
      {/* 1. FONDO ANIMADO AURORA */}
      <BackgroundAurora />

      {/* 2. CONTENIDO PRINCIPAL (Z-Index para estar sobre el fondo) */}
      <main className="relative z-10">

        {/* --- HERO CINEMÁTICO --- */}
        <section className="relative min-h-[90vh] flex flex-col justify-center items-center text-center px-4 pt-24 pb-12">
            
            {/* Badge Brillante */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8 animate-float shadow-lg shadow-lael-navy/20">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lael-green opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-lael-green"></span>
                </span>
                <span className="text-sm font-medium text-gray-200 tracking-wider uppercase text-[11px]">Admisión 2026 Abierta</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[1.1] mb-6 drop-shadow-2xl">
                Aprendizaje que <br className="hidden md:block"/>
                <Typewriter words={["Transforma.", "Conecta.", "Impulsa.", "Funciona."]} />
            </h1>
            
            <p className="text-lg md:text-2xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
                Somos el punto de encuentro entre tecnología y humanidad. <br className="hidden md:block"/>
                Prepara la <span className="text-white font-medium">PAES</span>, domina <span className="text-lael-pink font-medium">idiomas</span> o certifícate.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md sm:max-w-none justify-center mb-16">
                <Link to="/inscripcion" className="group relative px-8 py-4 bg-white text-black rounded-full font-bold text-lg flex items-center justify-center gap-2 hover:scale-105 transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                    Empezar Ahora <Icons.Arrow />
                </Link>
                <Link to="/nosotros" className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-full font-medium text-lg hover:bg-white/10 backdrop-blur-md transition-all">
                    Ver Manifiesto
                </Link>
            </div>

            {/* Stats Flotantes (Glassmorphism Puro) */}
            <div className="hidden md:flex gap-12 px-10 py-6 rounded-2xl bg-bg-surface/60 border border-white/5 backdrop-blur-xl shadow-2xl">
                <div className="text-center group">
                    <strong className="block text-3xl font-bold text-white group-hover:text-lael-blue transition-colors">+3k</strong>
                    <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Alumnos</span>
                </div>
                <div className="w-px h-12 bg-white/10"></div>
                <div className="text-center group">
                    <strong className="block text-3xl font-bold text-white group-hover:text-lael-gold transition-colors">98%</strong>
                    <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Aprobación</span>
                </div>
                <div className="w-px h-12 bg-white/10"></div>
                <div className="text-center group">
                    <strong className="block text-3xl font-bold text-white group-hover:text-lael-green transition-colors">100%</strong>
                    <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Online</span>
                </div>
            </div>
        </section>

        {/* --- MARQUEE DE PARTNERS --- */}
        <section className="py-10 border-y border-white/5 bg-black/20 backdrop-blur-sm relative z-20">
            <div className="container mx-auto px-4 text-center mb-6">
                <span className="text-xs font-bold tracking-[0.3em] text-gray-600 uppercase">Confían en nosotros:</span>
            </div>
            <div className="opacity-60 grayscale hover:grayscale-0 transition-all duration-700">
                <PartnersMarquee speed={35} height={32} gap={60} />
            </div>
        </section>

        {/* --- BENTO GRID (El Hub) --- */}
        <section className="py-24 px-4 relative z-10">
            <div className="container mx-auto max-w-6xl">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Explora nuestros mundos</h2>
                    <p className="text-gray-400 text-lg">Cada programa es un ecosistema diseñado para tu éxito.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[minmax(280px,auto)]">
                    
                    {/* 1. PAES (Grande - Gold Theme) */}
                    <Link to="/paes" className="group relative md:col-span-2 lg:col-span-2 lg:row-span-2 overflow-hidden rounded-[2rem] bg-bg-surface border border-white/5 hover:border-lael-gold/50 transition-all duration-500 p-8 flex flex-col justify-end min-h-[400px]">
                        {/* Glow Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-lael-gold/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                        
                        {/* Icono de Fondo Gigante */}
                        <div className="absolute -right-8 -top-8 w-64 h-64 text-white opacity-[0.03] group-hover:opacity-[0.08] group-hover:rotate-12 transition-all duration-700">
                           <Icons.Bolt />
                        </div>

                        {/* Logo Color (Asegúrate de tener la imagen) */}
                        <img src="/lael-inst-amarillo.png" alt="PAES" className="absolute top-8 right-8 w-20 opacity-20 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />

                        <div className="relative z-10">
                            <span className="inline-block px-3 py-1 bg-lael-gold/10 border border-lael-gold/20 text-lael-gold rounded-lg text-xs font-bold uppercase tracking-wider mb-4">
                                Preuniversitario
                            </span>
                            <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">Preu PAES</h3>
                            <p className="text-gray-400 max-w-md mb-6 leading-relaxed">El programa más completo. Ensayos, clases en vivo y tutoría personalizada.</p>
                            <span className="inline-flex items-center text-lael-gold font-bold text-sm uppercase tracking-wide group-hover:translate-x-2 transition-transform">
                                Ver Planes <span className="ml-2">→</span>
                            </span>
                        </div>
                    </Link>

                    {/* 2. IDIOMAS (Vertical - Pink Theme) */}
                    <Link to="/idiomas" className="group relative md:col-span-1 lg:col-span-1 lg:row-span-2 overflow-hidden rounded-[2rem] bg-bg-surface border border-white/5 hover:border-lael-pink/50 transition-all duration-500 p-8 flex flex-col justify-between min-h-[300px]">
                        <div className="absolute inset-0 bg-gradient-to-b from-lael-pink/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        
                        <div className="w-14 h-14 bg-lael-pink/10 rounded-2xl flex items-center justify-center text-lael-pink border border-lael-pink/20 mb-4 group-hover:scale-110 transition-transform">
                            <div className="w-8 h-8"><Icons.Globe /></div>
                        </div>

                        <div className="relative z-10 mt-auto">
                            <span className="text-lael-pink text-xs font-bold uppercase tracking-wider block mb-2">Global</span>
                            <h3 className="text-2xl font-bold text-white mb-2">Idiomas</h3>
                            <p className="text-gray-400 text-sm leading-relaxed mb-4">Inglés, Coreano y más. Habla desde el día 1.</p>
                            <img src="/lael-inst-rosa.png" alt="Idiomas" className="w-12 opacity-50 group-hover:opacity-100 transition-opacity absolute bottom-4 right-4" />
                        </div>
                    </Link>

                    {/* 3. LENGUA DE SEÑAS (Green Theme) */}
                    <Link to="/lsch" className="group relative md:col-span-1 lg:col-span-1 lg:row-span-1 overflow-hidden rounded-[2rem] bg-bg-surface border border-white/5 hover:border-lael-green/50 transition-all duration-500 p-8 flex flex-col justify-between min-h-[280px]">
                        <div className="absolute inset-0 bg-gradient-to-br from-lael-green/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        
                        <div className="absolute top-4 right-4 text-lael-green opacity-20 group-hover:opacity-100 transition-opacity">
                            <div className="w-10 h-10"><Icons.Hand /></div>
                        </div>

                        <div className="relative z-10 mt-auto">
                            <span className="text-lael-green text-xs font-bold uppercase tracking-wider block mb-2">Inclusión</span>
                            <h3 className="text-xl font-bold text-white mb-1">Lengua de Señas</h3>
                            <p className="text-gray-400 text-sm">Cultura sorda y comunicación real.</p>
                        </div>
                    </Link>

                    {/* 4. EMPRESAS (Corporate - Navy Theme) */}
                    <Link to="/empresas" className="group relative md:col-span-2 lg:col-span-2 overflow-hidden rounded-[2rem] bg-gradient-to-r from-bg-surface to-lael-navy/10 border border-white/5 hover:border-lael-navy/50 transition-all duration-500 p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="text-left">
                            <span className="text-lael-navy text-xs font-bold uppercase tracking-wider block mb-2">B2B</span>
                            <h3 className="text-2xl font-bold text-white mb-1">Lael Corporate</h3>
                            <p className="text-gray-400 text-sm">Capacitación para equipos de alto rendimiento.</p>
                        </div>
                        <button className="px-6 py-2 rounded-full border border-white/20 text-white text-sm font-bold group-hover:bg-white group-hover:text-lael-navy transition-all shrink-0">
                            Cotizar
                        </button>
                    </Link>

                    {/* 5. ADULTOS (Orange Theme) */}
                    <Link to="/escuela-adultos" className="group relative md:col-span-2 lg:col-span-2 overflow-hidden rounded-[2rem] bg-gradient-to-r from-bg-surface to-lael-orange/10 border border-white/5 hover:border-lael-orange/50 transition-all duration-500 p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="text-left">
                            <span className="text-lael-orange text-xs font-bold uppercase tracking-wider block mb-2">Impacto Social</span>
                            <h3 className="text-2xl font-bold text-white mb-1">Nivelación de Estudios</h3>
                            <p className="text-gray-400 text-sm">Termina tu 4to medio con dignidad y tecnología.</p>
                        </div>
                        <button className="px-6 py-2 rounded-full border border-white/20 text-white text-sm font-bold group-hover:bg-white group-hover:text-lael-orange transition-all shrink-0">
                            Ver Becas
                        </button>
                    </Link>

                </div>
            </div>
        </section>

        {/* --- PROMO ACADEMY --- */}
        <section className="py-10 px-4 mb-10">
            <div className="container mx-auto max-w-5xl">
                <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-r from-[#0F172A] to-[#1e1b4b] border border-white/10 p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10 group">
                    
                    {/* Elementos Decorativos de Fondo */}
                    <div className="absolute -right-20 -top-20 w-80 h-80 bg-lael-blue/20 rounded-full blur-[80px]" />
                    <div className="absolute left-10 bottom-10 w-40 h-40 border border-white/5 rounded-full animate-spin-slow opacity-30"></div>
                    
                    <div className="relative z-10 max-w-lg text-center md:text-left">
                        <span className="inline-block px-3 py-1 bg-lael-gold text-black text-xs font-extrabold rounded-md mb-4 shadow-[0_0_15px_rgba(242,192,78,0.4)]">
                            NUEVO LANZAMIENTO
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">¿Necesitas un refuerzo puntual?</h2>
                        <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                            Presentamos <strong className="text-white">Lael Academy</strong>. Packs de tutorías 1 a 1 para salvar el semestre escolar o preparar un examen.
                        </p>
                        <Link to="/homeschool" className="inline-block bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-gray-200 hover:scale-105 transition-all shadow-lg">
                            Explorar Tutorías
                        </Link>
                    </div>
                    
                    {/* Visual Flotante */}
                    <div className="relative z-10 transform rotate-[-3deg] group-hover:rotate-0 transition-transform duration-500 ease-out">
                         <div className="bg-[#1A1A1A] border border-white/10 p-6 rounded-2xl shadow-2xl w-64 text-center backdrop-blur-md">
                            <div className="text-5xl mb-4">👩‍🏫</div>
                            <strong className="block text-white text-lg">Profe Particular</strong>
                            <small className="text-gray-500 block mb-3">A un click de distancia</small>
                            <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden">
                                <div className="bg-lael-green h-full w-3/4 animate-pulse"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* --- CTA FINAL --- */}
        <section className="py-24 px-4 bg-black/30">
            <div className="container mx-auto max-w-3xl text-center">
                <h2 className="text-4xl md:text-5xl font-bold mb-12 tracking-tight">
                    No dejes para mañana <br/>
                    <span className="text-gray-500">lo que puedes aprender hoy.</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <Link to="/inscripcion" className="group p-8 rounded-3xl bg-white text-black text-left hover:scale-[1.02] transition-transform shadow-xl">
                        <h3 className="text-2xl font-bold mb-2 flex items-center justify-between">
                            Inscripción Online <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </h3>
                        <p className="text-gray-600">Reserva tu cupo en 2 minutos.</p>
                    </Link>
                    <a href="https://wa.me/56964626568" target="_blank" rel="noreferrer" className="group p-8 rounded-3xl bg-bg-surface border border-white/10 text-white text-left hover:border-lael-green/50 hover:bg-white/5 transition-all">
                        <h3 className="text-2xl font-bold mb-2 flex items-center justify-between">
                            Hablar con Admisión <span className="text-2xl">💬</span>
                        </h3>
                        <p className="text-gray-400">Resolvemos tus dudas por WhatsApp.</p>
                    </a>
                </div>
            </div>
        </section>

      </main>
    </div>
  );
}