import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { 
  Download, Trash2, Settings, Share2, HelpCircle, ArrowLeft, 
  Zap, Target, Activity, Layout, Maximize, Play, Pause, RefreshCcw,
  Circle, ChevronRight, Binary, Cpu
} from 'lucide-react';
import { Link } from 'react-router-dom';

const ease = [0.16, 1, 0.3, 1];

export default function AppletCirculos() {
  const canvasRef = useRef(null);
  const [ctx, setCtx] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [symmetry, setSymmetry] = useState(12);
  const [strokeWidth, setStrokeWidth] = useState(2);
  const [color, setColor] = useState('#00FF9D'); // Neon Green
  const [radius, setRadius] = useState(200);
  const [showArcs, setShowArcs] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [rotationSpeed, setRotationSpeed] = useState(0.5);
  const [currentRotation, setCurrentRotation] = useState(0);

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas.parentElement;
    canvas.width = parent.clientWidth;
    canvas.height = parent.clientHeight;
    const context = canvas.getContext('2d');
    context.lineCap = 'round';
    context.lineJoin = 'round';
    setCtx(context);

    const handleResize = () => {
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
      context.lineCap = 'round';
      context.lineJoin = 'round';
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Animation Loop
  useEffect(() => {
    let frame;
    if (isAnimating) {
      const loop = () => {
        setCurrentRotation(prev => (prev + rotationSpeed) % 360);
        frame = requestAnimationFrame(loop);
      };
      frame = requestAnimationFrame(loop);
    }
    return () => cancelAnimationFrame(frame);
  }, [isAnimating, rotationSpeed]);

  const getPos = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = (e.clientX || (e.touches && e.touches[0].clientX)) - rect.left - rect.width / 2;
    const y = (e.clientY || (e.touches && e.touches[0].clientY)) - rect.top - rect.height / 2;
    return { x, y };
  };

  const lastPos = useRef(null);

  const handleDraw = (e) => {
    if (!isDrawing || !ctx) return;
    const { x, y } = getPos(e);
    
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = strokeWidth;

    const sliceAngle = (Math.PI * 2) / symmetry;
    const centerX = canvasRef.current.width / 2;
    const centerY = canvasRef.current.height / 2;

    for (let i = 0; i < symmetry; i++) {
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(i * sliceAngle + (currentRotation * Math.PI / 180));

      if (lastPos.current) {
        ctx.beginPath();
        ctx.moveTo(lastPos.current.x, lastPos.current.y);
        ctx.lineTo(x, y);
        ctx.stroke();
        
        if (showArcs) {
          // Add a subtle glow/arc effect
          ctx.globalAlpha = 0.1;
          ctx.beginPath();
          ctx.arc(0, 0, Math.sqrt(x*x + y*y), 0, Math.PI * 2);
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
      } else {
        ctx.beginPath();
        ctx.arc(x, y, strokeWidth / 2, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }
    lastPos.current = { x, y };
  };

  const clearCanvas = () => ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  const downloadImage = () => {
    const link = document.createElement('a');
    link.download = 'diegobet-design.png';
    link.href = canvasRef.current.toDataURL();
    link.click();
  };

  return (
    <div className="relative w-full min-h-screen bg-[#05080F] text-white font-inter overflow-x-hidden selection:bg-[#00FF9D]/30">
      <Helmet>
        <title>DIEGO BET | High Performance Geometry</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      {/* ── BACKGROUND EFFECTS ────────────────────────────────────────── */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-cyan-500/5 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#00FF9D]/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#05080F]/50 to-[#05080F]" />
      </div>

      {/* ── 1. HERO SECTION ────────────────────────────────────────────── */}
      <section className="relative w-full h-screen flex items-center px-8 lg:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 w-full gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease }}
            className="z-10"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#00FF9D] rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(0,255,157,0.4)]">
                <Binary className="text-[#05080F]" size={20} />
              </div>
              <span className="text-[#00FF9D] text-xs font-bold tracking-[0.4em] uppercase">Applet Educativo Premium</span>
            </div>
            
            <h1 className="text-7xl lg:text-9xl font-display font-black tracking-tighter mb-4 italic italic-playfair leading-[0.8] drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]">
              DIEGO <span className="text-[#00FF9D]">BET</span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-lael-muted max-w-lg mb-10 leading-relaxed font-light">
              Diseña patrones circulares usando <span className="text-white font-bold">radios, arcos y simetría.</span>
            </p>
            
            <p className="text-[10px] text-lael-muted/60 uppercase tracking-[0.3em] font-bold mb-12">
              Exclusivo para alumnos de Los Olivos Homeschool e Instituto Lael.
            </p>
            
            <div className="flex flex-wrap gap-6">
              <button 
                onClick={() => document.getElementById('applet').scrollIntoView({ behavior: 'smooth' })}
                className="group relative px-10 py-5 bg-[#00FF9D] text-[#05080F] font-bold uppercase tracking-widest text-xs rounded-xl overflow-hidden shadow-[0_10px_40px_rgba(0,255,157,0.2)] hover:shadow-[0_15px_50px_rgba(0,255,157,0.4)] transition-all duration-500"
              >
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
                <span className="relative z-10 flex items-center gap-3">EMPEZAR A DISEÑAR <ChevronRight size={16}/></span>
              </button>
              
              <button 
                onClick={() => document.getElementById('desafios').scrollIntoView({ behavior: 'smooth' })}
                className="px-10 py-5 bg-white/5 border border-white/10 text-white font-bold uppercase tracking-widest text-xs rounded-xl hover:bg-white/10 transition-all duration-300"
              >
                VER DESAFÍOS
              </button>
            </div>
          </motion.div>

          <div className="relative hidden lg:flex items-center justify-center">
             <div className="absolute w-[500px] h-[500px] border border-[#00FF9D]/20 rounded-full animate-[spin_20s_linear_infinite]" />
             <div className="absolute w-[400px] h-[400px] border border-cyan-500/10 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
             <div className="absolute w-[300px] h-[300px] border border-white/5 rounded-full" />
             
             {/* Dynamic Hero Visual */}
             <div className="relative z-10 w-[450px] h-[450px]">
                <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_20px_rgba(0,255,157,0.3)]">
                   <motion.circle 
                     cx="50" cy="50" r="45" fill="none" stroke="#00FF9D" strokeWidth="0.2" strokeDasharray="2 2"
                     animate={{ rotate: 360 }} transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                   />
                   {[...Array(12)].map((_, i) => (
                      <line 
                        key={i} x1="50" y1="50" x2="50" y2="5" 
                        stroke="#00FF9D" strokeWidth="0.1" opacity="0.4"
                        transform={`rotate(${i * 30} 50 50)`}
                      />
                   ))}
                   <motion.path 
                     d="M50 10 A40 40 0 0 1 90 50" fill="none" stroke="#00FF9D" strokeWidth="0.5"
                     animate={{ strokeDashoffset: [400, 0] }} transition={{ duration: 4, repeat: Infinity }}
                   />
                </svg>
             </div>
          </div>
        </div>
      </section>

      {/* ── 2. APPLET INTERACTIVO ─────────────────────────────────────── */}
      <section id="applet" className="relative w-full px-8 lg:px-12 py-32 bg-[#080C14] border-t border-white/5">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* LEFT PANEL: DASHBOARD CONTROLS */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-[#0D121F] border border-white/5 p-8 rounded-[35px] shadow-2xl">
                <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/5">
                  <div className="flex items-center gap-4">
                    <Layout className="text-[#00FF9D]" size={20} />
                    <h2 className="text-xl font-bold tracking-tight">Panel de Control</h2>
                  </div>
                  <div className="flex gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    <div className="w-2 h-2 rounded-full bg-yellow-500" />
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                  </div>
                </div>

                <div className="space-y-8">
                  {/* Control Item: Symmetry */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] text-lael-muted uppercase tracking-[0.2em] font-bold">Cantidad de Divisiones</span>
                      <span className="text-[#00FF9D] font-mono text-xs">{symmetry}</span>
                    </div>
                    <input 
                      type="range" min="1" max="64" value={symmetry}
                      onChange={(e) => setSymmetry(parseInt(e.target.value))}
                      className="w-full accent-[#00FF9D] h-1.5 bg-black/40 rounded-full appearance-none cursor-pointer"
                    />
                  </div>

                  {/* Control Item: Stroke */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] text-lael-muted uppercase tracking-[0.2em] font-bold">Grosor de Trazo</span>
                      <span className="text-[#00FF9D] font-mono text-xs">{strokeWidth}px</span>
                    </div>
                    <input 
                      type="range" min="1" max="15" value={strokeWidth}
                      onChange={(e) => setStrokeWidth(parseInt(e.target.value))}
                      className="w-full accent-[#00FF9D] h-1.5 bg-black/40 rounded-full appearance-none cursor-pointer"
                    />
                  </div>

                  {/* Switches */}
                  <div className="grid grid-cols-2 gap-4">
                    <button 
                      onClick={() => setShowArcs(!showArcs)}
                      className={`p-4 rounded-2xl border transition-all flex flex-col items-center gap-2 ${showArcs ? 'bg-[#00FF9D]/5 border-[#00FF9D] text-[#00FF9D]' : 'bg-black/20 border-white/10 text-lael-muted'}`}
                    >
                      <Circle size={18} />
                      <span className="text-[8px] font-bold uppercase tracking-widest">Activar Arcos</span>
                    </button>
                    <button 
                      onClick={() => setIsAnimating(!isAnimating)}
                      className={`p-4 rounded-2xl border transition-all flex flex-col items-center gap-2 ${isAnimating ? 'bg-cyan-500/5 border-cyan-500 text-cyan-500' : 'bg-black/20 border-white/10 text-lael-muted'}`}
                    >
                      {isAnimating ? <Pause size={18} /> : <Play size={18} />}
                      <span className="text-[8px] font-bold uppercase tracking-widest">Rotación Live</span>
                    </button>
                  </div>

                  {/* Speed */}
                  {isAnimating && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-4 pt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] text-lael-muted uppercase tracking-[0.2em] font-bold">Velocidad de Giro</span>
                        <span className="text-cyan-500 font-mono text-xs">{rotationSpeed}x</span>
                      </div>
                      <input 
                        type="range" min="0.1" max="5" step="0.1" value={rotationSpeed}
                        onChange={(e) => setRotationSpeed(parseFloat(e.target.value))}
                        className="w-full accent-cyan-500 h-1.5 bg-black/40 rounded-full appearance-none cursor-pointer"
                      />
                    </motion.div>
                  )}

                  {/* Colors */}
                  <div className="space-y-4">
                    <span className="text-[10px] text-lael-muted uppercase tracking-[0.2em] font-bold">Color Neón</span>
                    <div className="flex gap-3">
                      {['#00FF9D', '#00F0FF', '#FF00FF', '#F5F5F5'].map(c => (
                        <button 
                          key={c} onClick={() => setColor(c)}
                          className={`w-10 h-10 rounded-xl border-2 transition-all shadow-lg ${color === c ? 'border-white scale-110' : 'border-transparent opacity-40'}`}
                          style={{ backgroundColor: c, boxShadow: color === c ? `0 0 20px ${c}44` : 'none' }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="grid grid-cols-2 gap-4 pt-8">
                    <button onClick={clearCanvas} className="flex items-center justify-center gap-3 py-4 bg-white/5 text-white text-[10px] font-bold uppercase tracking-widest rounded-xl hover:bg-red-500/20 hover:text-red-500 transition-all border border-white/5">
                      <Trash2 size={16} /> RESET
                    </button>
                    <button onClick={downloadImage} className="flex items-center justify-center gap-3 py-4 bg-[#00FF9D] text-[#05080F] text-[10px] font-bold uppercase tracking-widest rounded-xl hover:shadow-[0_0_30px_rgba(0,255,157,0.3)] transition-all">
                      <Download size={16} /> EXPORT
                    </button>
                  </div>
                </div>
              </div>

              {/* Stats Card */}
              <div className="bg-[#0D121F] border border-[#00FF9D]/20 p-6 rounded-[35px] flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#00FF9D]/10 rounded-2xl flex items-center justify-center text-[#00FF9D]">
                    <Activity size={20} />
                  </div>
                  <div>
                    <p className="text-[8px] text-lael-muted uppercase tracking-[0.2em]">Carga de GPU</p>
                    <p className="text-sm font-mono font-bold text-white">OPTIMIZADA</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[8px] text-lael-muted uppercase tracking-[0.2em]">FPS</p>
                  <p className="text-sm font-mono font-bold text-[#00FF9D]">60.0</p>
                </div>
              </div>
            </div>

            {/* RIGHT PANEL: MAIN CANVAS */}
            <div className="lg:col-span-8 relative group">
              <div className="absolute inset-0 bg-[#0D121F] border border-white/5 rounded-[45px] shadow-2xl overflow-hidden">
                {/* Tech Overlays */}
                <div className="absolute top-8 left-8 flex flex-col gap-2 z-20 pointer-events-none">
                  <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-4 py-2 rounded-lg border border-white/5">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#00FF9D]" />
                    <span className="text-[9px] font-mono text-[#00FF9D] uppercase tracking-widest">Live Rendering</span>
                  </div>
                  <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-4 py-2 rounded-lg border border-white/5">
                    <span className="text-[9px] font-mono text-white/40 uppercase tracking-widest">Ang: {currentRotation.toFixed(1)}°</span>
                  </div>
                </div>

                <div className="absolute bottom-8 right-8 z-20 pointer-events-none">
                   <div className="bg-black/40 backdrop-blur-md p-4 rounded-xl border border-white/5 flex gap-6">
                      <div className="flex flex-col">
                        <span className="text-[7px] text-white/30 uppercase tracking-widest mb-1">X-COORD</span>
                        <span className="text-[10px] font-mono text-[#00FF9D]">24.882</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[7px] text-white/30 uppercase tracking-widest mb-1">Y-COORD</span>
                        <span className="text-[10px] font-mono text-[#00FF9D]">12.041</span>
                      </div>
                   </div>
                </div>

                <canvas
                  ref={canvasRef}
                  onMouseDown={(e) => { setIsDrawing(true); handleDraw(e); }}
                  onMouseMove={handleDraw}
                  onMouseUp={() => { setIsDrawing(false); lastPos.current = null; }}
                  onMouseLeave={() => { setIsDrawing(false); lastPos.current = null; }}
                  className="w-full h-full cursor-crosshair relative z-10"
                />

                {/* Grid Visual */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#00FF9D 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
                
                {/* Center Crosshair */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                   <div className="w-10 h-px bg-white/10" />
                   <div className="h-10 w-px bg-white/10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                   <div className="w-4 h-4 border border-white/10 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 3. SECCIÓN DESAFÍOS ───────────────────────────────────────── */}
      <section id="desafios" className="relative w-full px-8 lg:px-24 py-48 bg-[#05080F]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center mb-24">
             <p className="text-[#00FF9D] text-xs font-bold tracking-[0.5em] uppercase mb-4 text-center">Protocolos de Validación</p>
             <h2 className="text-5xl lg:text-7xl font-display font-black text-center tracking-tighter uppercase italic italic-playfair">Desafíos Matemáticos</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { t: "La Orden del Doce", d: "Crea un patrón usando exactamente 12 radios con simetría perfecta.", icon: <Cpu size={24} /> },
              { t: "Arco de Sesenta", d: "Diseña una figura compuesta por arcos de 60° que se intercepten.", icon: <Target size={24} /> },
              { t: "Flor Geométrica", d: "Construye una flor usando la repetición de 8 pétalos simétricos.", icon: <Activity size={24} /> },
              { t: "Estrella Táctica", d: "Haz una simetría de orden 8 con trazos neón alternados.", icon: <Zap size={24} /> }
            ].map((card, i) => (
              <motion.div 
                key={i} {...fadeUp(i * 0.1)}
                className="group p-10 bg-[#0D121F] border border-white/5 rounded-[45px] hover:border-[#00FF9D]/30 transition-all duration-500 cursor-default"
              >
                <div className="w-16 h-16 bg-white/5 rounded-[25px] flex items-center justify-center text-[#00FF9D] mb-8 group-hover:scale-110 group-hover:bg-[#00FF9D]/10 transition-all duration-500">
                  {card.icon}
                </div>
                <h3 className="text-xl font-bold mb-4 group-hover:text-[#00FF9D] transition-colors">{card.t}</h3>
                <p className="text-lael-muted text-sm leading-relaxed">{card.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────── */}
      <footer className="py-20 px-8 border-t border-white/5 text-center">
        <p className="text-[10px] text-lael-muted/40 uppercase tracking-[0.4em] font-bold">
          © 2026 DIEGO BET · Propiedad Intelectual de Los Olivos Homeschool e Instituto Lael.
        </p>
        <div className="mt-8 flex justify-center gap-10">
           <Link to="/" className="text-white/20 hover:text-white transition-colors flex items-center gap-2 uppercase text-[9px] tracking-widest font-bold">
             <ArrowLeft size={12} /> Salir del Applet
           </Link>
        </div>
      </footer>

    </div>
  );
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }
});
