import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { 
  Download, Trash2, Settings, Share2, HelpCircle, ArrowLeft, 
  Zap, Target, Activity, Layout, Maximize, Play, Pause, RefreshCcw,
  Circle, ChevronRight, Binary, Cpu, MousePointer2, GitCommit,
  Scissors, Type, Eye, EyeOff, Ruler, Menu, X, SlidersHorizontal
} from 'lucide-react';
import { Link } from 'react-router-dom';

const ease = [0.16, 1, 0.3, 1];

export default function AppletCirculos() {
  const canvasRef = useRef(null);
  const guideCanvasRef = useRef(null);
  const [ctx, setCtx] = useState(null);
  const [guideCtx, setGuideCtx] = useState(null);
  
  const [isDrawing, setIsDrawing] = useState(false);
  const [symmetry, setSymmetry] = useState(12);
  const [strokeWidth, setStrokeWidth] = useState(2);
  const [color, setColor] = useState('#00FF9D'); 
  const [mode, setMode] = useState('radio');
  const [showGuides, setShowGuides] = useState(true);
  const [showInscribedAngle, setShowInscribedAngle] = useState(false);
  const [showControls, setShowControls] = useState(true);
  
  const [startPoint, setStartPoint] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Initialize canvas
  useEffect(() => {
    const initCanvas = (ref) => {
      const canvas = ref.current;
      const parent = canvas.parentElement;
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
      const context = canvas.getContext('2d');
      context.lineCap = 'round';
      context.lineJoin = 'round';
      return context;
    };

    setCtx(initCanvas(canvasRef));
    setGuideCtx(initCanvas(guideCanvasRef));

    const handleResize = () => {
      const parent = canvasRef.current.parentElement;
      [canvasRef, guideCanvasRef].forEach(ref => {
        const c = ref.current;
        c.width = parent.clientWidth;
        c.height = parent.clientHeight;
        const context = c.getContext('2d');
        context.lineCap = 'round';
        context.lineJoin = 'round';
      });
      drawGuides(mousePos);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty dependency array to run once on mount

  // Separate effect for guides if needed, or just rely on mouse move
  useEffect(() => {
    drawGuides(mousePos);
  }, [mousePos, symmetry, showGuides, showInscribedAngle, isDrawing, startPoint]);

  const getPos = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    return { x: x - centerX, y: y - centerY, rawX: x, rawY: y };
  };

  const lastPos = useRef(null);

  const handleMouseDown = (e) => {
    if (e.touches && e.touches.length > 1) return; // Ignore multi-touch
    const pos = getPos(e);
    setIsDrawing(true);
    setStartPoint(pos);
    if (mode === 'pincel') lastPos.current = pos;
  };

  const handleMouseMove = (e) => {
    const pos = getPos(e);
    setMousePos(pos);
    if (isDrawing && mode === 'pincel' && ctx) {
      drawSymmetricLine(lastPos.current, pos);
      lastPos.current = pos;
    }
    drawGuides(pos);
  };

  const handleMouseUp = (e) => {
    if (!isDrawing) return;
    const endPos = getPos(e);
    if (ctx) {
      if (mode === 'radio') drawSymmetricRadios(startPoint, endPos);
      if (mode === 'cuerda') drawSymmetricChords(startPoint, endPos);
      if (mode === 'diametro') drawSymmetricDiameters(startPoint, endPos);
      if (mode === 'tangente') drawSymmetricTangents(endPos);
    }
    setIsDrawing(false);
    setStartPoint(null);
    lastPos.current = null;
  };

  // Drawing Functions
  const drawSymmetricLine = (p1, p2) => {
    const sliceAngle = (Math.PI * 2) / symmetry;
    const centerX = canvasRef.current.width / 2;
    const centerY = canvasRef.current.height / 2;
    for (let i = 0; i < symmetry; i++) {
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(i * sliceAngle);
      ctx.strokeStyle = color;
      ctx.lineWidth = strokeWidth;
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.stroke();
      ctx.restore();
    }
  };

  const drawSymmetricRadios = (p1, p2) => {
    const sliceAngle = (Math.PI * 2) / symmetry;
    const centerX = canvasRef.current.width / 2;
    const centerY = canvasRef.current.height / 2;
    for (let i = 0; i < symmetry; i++) {
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(i * sliceAngle);
      ctx.strokeStyle = color;
      ctx.lineWidth = strokeWidth;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(p2.x, p2.y);
      ctx.stroke();
      ctx.restore();
    }
  };

  const drawSymmetricChords = (p1, p2) => {
    const sliceAngle = (Math.PI * 2) / symmetry;
    const centerX = canvasRef.current.width / 2;
    const centerY = canvasRef.current.height / 2;
    for (let i = 0; i < symmetry; i++) {
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(i * sliceAngle);
      ctx.strokeStyle = color;
      ctx.lineWidth = strokeWidth;
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.stroke();
      ctx.restore();
    }
  };

  const drawSymmetricDiameters = (p1, p2) => {
    const sliceAngle = (Math.PI * 2) / symmetry;
    const centerX = canvasRef.current.width / 2;
    const centerY = canvasRef.current.height / 2;
    for (let i = 0; i < symmetry; i++) {
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(i * sliceAngle);
      ctx.strokeStyle = color;
      ctx.lineWidth = strokeWidth;
      ctx.beginPath();
      ctx.moveTo(p2.x, p2.y);
      ctx.lineTo(-p2.x, -p2.y);
      ctx.stroke();
      ctx.restore();
    }
  };

  const drawSymmetricTangents = (p) => {
    const sliceAngle = (Math.PI * 2) / symmetry;
    const centerX = canvasRef.current.width / 2;
    const centerY = canvasRef.current.height / 2;
    const length = 200;
    const angle = Math.atan2(p.y, p.x);
    const t1 = { x: p.x + Math.cos(angle + Math.PI/2) * length, y: p.y + Math.sin(angle + Math.PI/2) * length };
    const t2 = { x: p.x + Math.cos(angle - Math.PI/2) * length, y: p.y + Math.sin(angle - Math.PI/2) * length };
    for (let i = 0; i < symmetry; i++) {
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(i * sliceAngle);
      ctx.strokeStyle = color;
      ctx.lineWidth = strokeWidth;
      ctx.beginPath();
      ctx.moveTo(t1.x, t1.y);
      ctx.lineTo(t2.x, t2.y);
      ctx.stroke();
      ctx.restore();
    }
  };

  const drawGuides = (pos) => {
    if (!guideCtx) return;
    const canvas = guideCanvasRef.current;
    guideCtx.clearRect(0, 0, canvas.width, canvas.height);
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    if (showGuides) {
      guideCtx.strokeStyle = 'rgba(255,255,255,0.05)';
      guideCtx.lineWidth = 1;
      for (let r = 100; r <= 600; r += 100) {
        guideCtx.beginPath(); guideCtx.arc(centerX, centerY, r, 0, Math.PI * 2); guideCtx.stroke();
      }
      const sliceAngle = (Math.PI * 2) / symmetry;
      for (let i = 0; i < symmetry; i++) {
        guideCtx.beginPath();
        guideCtx.moveTo(centerX, centerY);
        guideCtx.lineTo(centerX + Math.cos(i * sliceAngle) * 1000, centerY + Math.sin(i * sliceAngle) * 1000);
        guideCtx.stroke();
      }
    }

    if (showInscribedAngle) {
      const sliceAngle = (Math.PI * 2) / symmetry;
      const radius = 250;
      const top = { x: 0, y: -radius };
      const p1 = { x: Math.cos(0) * radius, y: Math.sin(0) * radius };
      const p2 = { x: Math.cos(sliceAngle) * radius, y: Math.sin(sliceAngle) * radius };
      guideCtx.save();
      guideCtx.translate(centerX, centerY);
      guideCtx.strokeStyle = '#00FF9D'; guideCtx.lineWidth = 1.5; guideCtx.setLineDash([5, 5]);
      guideCtx.beginPath(); guideCtx.moveTo(0, 0); guideCtx.lineTo(p1.x, p1.y); guideCtx.moveTo(0, 0); guideCtx.lineTo(p2.x, p2.y); guideCtx.stroke();
      guideCtx.strokeStyle = '#00F0FF';
      guideCtx.beginPath(); guideCtx.moveTo(top.x, top.y); guideCtx.lineTo(p1.x, p1.y); guideCtx.moveTo(top.x, top.y); guideCtx.lineTo(p2.x, p2.y); guideCtx.stroke();
      guideCtx.fillStyle = '#00FF9D'; guideCtx.font = 'bold 10px monospace'; guideCtx.fillText(`${(360/symmetry).toFixed(1)}°`, 10, 10);
      guideCtx.fillStyle = '#00F0FF'; guideCtx.fillText(`${(360/symmetry/2).toFixed(1)}°`, top.x - 20, top.y - 10);
      guideCtx.restore();
    }

    if (isDrawing && startPoint) {
       guideCtx.save();
       guideCtx.translate(centerX, centerY);
       guideCtx.strokeStyle = color;
       guideCtx.setLineDash([2, 2]);
       if (mode === 'radio') { guideCtx.beginPath(); guideCtx.moveTo(0,0); guideCtx.lineTo(pos.x, pos.y); guideCtx.stroke(); }
       else if (mode === 'cuerda') { guideCtx.beginPath(); guideCtx.moveTo(startPoint.x, startPoint.y); guideCtx.lineTo(pos.x, pos.y); guideCtx.stroke(); }
       else if (mode === 'diametro') { guideCtx.beginPath(); guideCtx.moveTo(pos.x, pos.y); guideCtx.lineTo(-pos.x, -pos.y); guideCtx.stroke(); }
       guideCtx.restore();
    }
  };

  const clearCanvas = () => ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  const downloadImage = () => {
    ctx.save();
    ctx.fillStyle = 'rgba(5, 8, 15, 0.9)';
    ctx.fillRect(0, canvasRef.current.height - 100, 450, 100);
    ctx.fillStyle = '#00FF9D'; ctx.font = 'bold 14px monospace'; ctx.fillText(`DIEGO BET | GEOMETRIC LAB`, 40, canvasRef.current.height - 60);
    ctx.fillStyle = '#ffffff'; ctx.font = '10px monospace';
    ctx.fillText(`SYMMETRY: ${symmetry} AXES | ANGLE: ${(360/symmetry).toFixed(1)}°`, 40, canvasRef.current.height - 40);
    ctx.fillText(`EDUCATIONAL DATA EXPORT | INSTITUTO LAEL`, 40, canvasRef.current.height - 25);
    const link = document.createElement('a');
    link.download = `diego-bet-geometry-${Date.now()}.jpg`;
    link.href = canvasRef.current.toDataURL('image/jpeg', 0.9);
    link.click();
    ctx.restore();
    ctx.clearRect(0, canvasRef.current.height - 100, 450, 100);
  };

  return (
    <div className="relative w-full h-[100dvh] bg-[#05080F] text-white font-inter overflow-hidden touch-none">
      <Helmet>
        <title>DIEGO BET | Responsive Geometric Lab</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      {/* ── HEADER DASHBOARD (Integrated with Navbar) ───────────────── */}
      <header className="absolute top-0 left-0 w-full z-50 p-4 lg:p-8 flex justify-between items-center pointer-events-none">
        <div className="flex items-center gap-4 lg:ml-20"> {/* Offset to let Navbar logo breathe */}
          <div className="hidden sm:block">
            <h1 className="text-xl lg:text-3xl font-black italic italic-playfair tracking-tighter leading-none text-white">DIEGO <span className="text-[#00FF9D]">BET</span></h1>
            <p className="text-[7px] text-[#00FF9D] font-mono tracking-[0.4em] uppercase mt-1">Sistemas Simétricos Circulares</p>
          </div>
        </div>

        <div className="flex gap-2 lg:gap-4 pointer-events-auto">
           <div className="hidden md:flex bg-black/60 backdrop-blur-md px-6 py-2 rounded-xl border border-white/10 items-center gap-4">
              <div className="flex flex-col">
                <span className="text-[7px] text-white/40 uppercase tracking-widest font-bold">Angle</span>
                <span className="text-sm font-mono text-[#00FF9D] font-bold">{(360/symmetry).toFixed(1)}°</span>
              </div>
           </div>
           <button onClick={downloadImage} className="bg-[#00FF9D] text-black px-4 lg:px-8 py-2 rounded-xl lg:rounded-2xl font-bold uppercase text-[9px] lg:text-[10px] tracking-widest hover:scale-105 transition-all">
              <span className="hidden sm:inline">Guardar JPG</span>
              <Download className="sm:hidden" size={16} />
           </button>
           <button onClick={() => setShowControls(!showControls)} className="lg:hidden w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center border border-white/10">
              {showControls ? <X size={20} /> : <SlidersHorizontal size={20} />}
           </button>
        </div>
      </header>

      {/* ── WORKSPACE ─────────────────────────────────────────────────── */}
      <main className="relative w-full h-full">
        
        {/* CANVAS LAYERS */}
        <div className="absolute inset-0 z-0">
          <canvas ref={canvasRef} className="w-full h-full cursor-crosshair" onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onTouchStart={handleMouseDown} onTouchMove={handleMouseMove} onTouchEnd={handleMouseUp} />
          <canvas ref={guideCanvasRef} className="absolute inset-0 pointer-events-none" />
          <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        </div>

        {/* FLOATING CONTROLS (RESPONSIVE) */}
        <AnimatePresence>
          {showControls && (
            <motion.aside 
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 w-[280px] lg:w-80 z-40 max-h-[80vh] overflow-y-auto no-scrollbar pointer-events-none"
            >
              <div className="space-y-4 pointer-events-auto">
                {/* Tools Grid */}
                <div className="bg-[#0D121F]/90 backdrop-blur-xl border border-white/10 p-5 lg:p-6 rounded-[30px] lg:rounded-[35px] shadow-2xl space-y-2">
                  <p className="text-[8px] text-white/30 uppercase tracking-[0.3em] font-bold mb-3">Geometría Táctica</p>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'radio', label: 'Radio', icon: <Binary size={16}/> },
                      { id: 'cuerda', label: 'Cuerda', icon: <GitCommit size={16}/> },
                      { id: 'diametro', label: 'Diámetro', icon: <Ruler size={16}/> },
                      { id: 'tangente', label: 'Tangente', icon: <Maximize size={16}/> },
                      { id: 'pincel', label: 'Arco', icon: <MousePointer2 size={16}/>, full: true },
                    ].map(t => (
                      <button 
                        key={t.id} onClick={() => setMode(t.id)}
                        className={`flex items-center justify-center gap-3 p-3 lg:p-4 rounded-xl lg:rounded-2xl border transition-all ${t.full ? 'col-span-2' : ''} ${mode === t.id ? 'bg-[#00FF9D] text-black border-[#00FF9D]' : 'bg-white/5 border-white/5 text-white hover:bg-white/10'}`}
                      >
                        {t.icon}
                        <span className="text-[9px] font-bold uppercase tracking-widest">{t.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Settings Card */}
                <div className="bg-[#0D121F]/90 backdrop-blur-xl border border-white/10 p-5 lg:p-6 rounded-[30px] lg:rounded-[35px] shadow-2xl space-y-5">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-[8px] text-white/40 uppercase tracking-[0.3em] font-bold">Simetría: {symmetry}</span>
                      <span className="text-[8px] text-[#00FF9D] font-mono">{(360/symmetry).toFixed(1)}°</span>
                    </div>
                    <input type="range" min="2" max="48" value={symmetry} onChange={(e) => setSymmetry(e.target.value)} className="w-full accent-[#00FF9D] h-1.5 bg-white/5 rounded-full appearance-none cursor-pointer" />
                  </div>

                  <div className="space-y-2">
                    <span className="text-[8px] text-white/40 uppercase tracking-[0.3em] font-bold">Grosor: {strokeWidth}px</span>
                    <input type="range" min="1" max="15" value={strokeWidth} onChange={(e) => setStrokeWidth(e.target.value)} className="w-full accent-[#00FF9D] h-1.5 bg-white/5 rounded-full appearance-none cursor-pointer" />
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <button onClick={() => setShowGuides(!showGuides)} className={`p-3 rounded-xl border flex items-center justify-center transition-all ${showGuides ? 'bg-white/10 border-white/20 text-[#00FF9D]' : 'bg-white/5 border-transparent opacity-40'}`}>
                      <Eye size={18}/>
                    </button>
                    <button onClick={() => setShowInscribedAngle(!showInscribedAngle)} className={`p-3 rounded-xl border flex items-center justify-center transition-all ${showInscribedAngle ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-400' : 'bg-white/5 border-transparent opacity-40'}`}>
                      <Target size={18}/>
                    </button>
                    <button onClick={clearCanvas} className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white transition-all">
                      <Trash2 size={18}/>
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {['#00FF9D', '#00F0FF', '#FF00FF', '#F5F5F5', '#FFFB00', '#FF6B00', '#8F00FF', '#FF0055', '#3DFFFD'].map(c => (
                      <button key={c} onClick={() => setColor(c)} className={`w-8 h-8 rounded-lg border-2 transition-all ${color === c ? 'border-white scale-110 shadow-lg' : 'border-transparent opacity-40'}`} style={{ backgroundColor: c, boxShadow: color === c ? `0 0 15px ${c}66` : 'none' }} />
                    ))}
                  </div>
                </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* TECH HUD (ADAPTIVE) */}
        <div className="absolute bottom-6 lg:bottom-12 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
          <div className="bg-black/40 backdrop-blur-md px-6 lg:px-10 py-3 lg:py-4 rounded-full border border-white/5 flex gap-6 lg:gap-12">
             <div className="flex flex-col items-center">
                <span className="text-[6px] lg:text-[7px] text-white/30 uppercase tracking-[0.4em] mb-0.5 font-bold">Radius</span>
                <span className="text-[8px] lg:text-[10px] font-mono text-[#00FF9D]">{Math.sqrt(mousePos.x**2 + mousePos.y**2).toFixed(1)}</span>
             </div>
             <div className="flex flex-col items-center">
                <span className="text-[6px] lg:text-[7px] text-white/30 uppercase tracking-[0.4em] mb-0.5 font-bold">Angle</span>
                <span className="text-[8px] lg:text-[10px] font-mono text-[#00FF9D]">{((Math.atan2(mousePos.y, mousePos.x) * 180 / Math.PI + 360) % 360).toFixed(0)}°</span>
             </div>
             <div className="hidden sm:flex flex-col items-center">
                <span className="text-[6px] lg:text-[7px] text-white/30 uppercase tracking-[0.4em] mb-0.5 font-bold">Mode</span>
                <span className="text-[8px] lg:text-[10px] font-mono text-cyan-400 uppercase tracking-widest">{mode}</span>
             </div>
          </div>
        </div>

        {/* Center Indicator */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10">
           <div className="w-6 h-px bg-white/10" />
           <div className="h-6 w-px bg-white/10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        </div>

      </main>

      {/* FOOTER INFO (DESKTOP) */}
      <footer className="hidden lg:block absolute bottom-8 right-12 z-50 text-right pointer-events-none">
         <p className="text-[8px] text-white/10 tracking-[0.5em] uppercase font-bold">
           LABORATORIO GEOMÉTRICO · INSTITUTO LAEL 2026
         </p>
      </footer>

    </div>
  );
}
