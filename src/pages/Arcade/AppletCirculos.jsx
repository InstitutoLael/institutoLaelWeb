import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { 
  Download, Trash2, Settings, Share2, HelpCircle, ArrowLeft, 
  Zap, Target, Activity, Layout, Maximize, Play, Pause, RefreshCcw,
  Circle, ChevronRight, Binary, Cpu, MousePointer2, GitCommit,
  Scissors, Type, Eye, EyeOff, Ruler
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
  const [mode, setMode] = useState('radio'); // radio, cuerda, diametro, tangente
  const [showGuides, setShowGuides] = useState(true);
  const [showInscribedAngle, setShowInscribedAngle] = useState(false);
  
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
        ref.current.width = parent.clientWidth;
        ref.current.height = parent.clientHeight;
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getPos = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = (e.clientX || (e.touches && e.touches[0].clientX)) - rect.left;
    const y = (e.clientY || (e.touches && e.touches[0].clientY)) - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    return { x: x - centerX, y: y - centerY, rawX: x, rawY: y };
  };

  const lastPos = useRef(null);

  // Drawing Logic
  const handleMouseDown = (e) => {
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

  // Geometry Drawing Functions
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
      ctx.moveTo(0, 0); // Always from center
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
      ctx.lineTo(-p2.x, -p2.y); // Passes through center
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
      // Concentric Circles
      guideCtx.strokeStyle = 'rgba(255,255,255,0.05)';
      guideCtx.lineWidth = 1;
      for (let r = 100; r <= 400; r += 100) {
        guideCtx.beginPath();
        guideCtx.arc(centerX, centerY, r, 0, Math.PI * 2);
        guideCtx.stroke();
      }
      
      // Symmetry Lines
      const sliceAngle = (Math.PI * 2) / symmetry;
      for (let i = 0; i < symmetry; i++) {
        guideCtx.beginPath();
        guideCtx.moveTo(centerX, centerY);
        guideCtx.lineTo(centerX + Math.cos(i * sliceAngle) * 500, centerY + Math.sin(i * sliceAngle) * 500);
        guideCtx.stroke();
      }
    }

    if (showInscribedAngle) {
      const sliceAngle = (Math.PI * 2) / symmetry;
      const top = { x: 0, y: -300 };
      const p1 = { x: Math.cos(0) * 300, y: Math.sin(0) * 300 };
      const p2 = { x: Math.cos(sliceAngle) * 300, y: Math.sin(sliceAngle) * 300 };

      guideCtx.save();
      guideCtx.translate(centerX, centerY);
      
      // Central Angle
      guideCtx.strokeStyle = '#00FF9D';
      guideCtx.lineWidth = 1.5;
      guideCtx.setLineDash([5, 5]);
      guideCtx.beginPath();
      guideCtx.moveTo(0, 0); guideCtx.lineTo(p1.x, p1.y);
      guideCtx.moveTo(0, 0); guideCtx.lineTo(p2.x, p2.y);
      guideCtx.stroke();
      
      // Inscribed Angle
      guideCtx.strokeStyle = '#00F0FF';
      guideCtx.beginPath();
      guideCtx.moveTo(top.x, top.y); guideCtx.lineTo(p1.x, p1.y);
      guideCtx.moveTo(top.x, top.y); guideCtx.lineTo(p2.x, p2.y);
      guideCtx.stroke();
      
      // Labels
      guideCtx.fillStyle = '#00FF9D';
      guideCtx.font = 'bold 10px monospace';
      guideCtx.fillText(`CENTRAL: ${(360/symmetry).toFixed(1)}°`, 20, 20);
      guideCtx.fillStyle = '#00F0FF';
      guideCtx.fillText(`INSCRIBED: ${(360/symmetry/2).toFixed(1)}°`, top.x - 40, top.y - 15);
      guideCtx.restore();
    }

    // Preview
    if (isDrawing && startPoint) {
       guideCtx.save();
       guideCtx.translate(centerX, centerY);
       guideCtx.strokeStyle = color;
       guideCtx.setLineDash([2, 2]);
       if (mode === 'radio') {
          guideCtx.beginPath(); guideCtx.moveTo(0,0); guideCtx.lineTo(pos.x, pos.y); guideCtx.stroke();
       } else if (mode === 'cuerda') {
          guideCtx.beginPath(); guideCtx.moveTo(startPoint.x, startPoint.y); guideCtx.lineTo(pos.x, pos.y); guideCtx.stroke();
       } else if (mode === 'diametro') {
          guideCtx.beginPath(); guideCtx.moveTo(pos.x, pos.y); guideCtx.lineTo(-pos.x, -pos.y); guideCtx.stroke();
       }
       guideCtx.restore();
    }
  };

  const clearCanvas = () => ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

  const downloadImage = () => {
    // Add Metadata to Canvas before export
    ctx.save();
    ctx.fillStyle = 'rgba(5, 8, 15, 0.8)';
    ctx.fillRect(0, canvasRef.current.height - 80, 400, 80);
    ctx.fillStyle = '#00FF9D';
    ctx.font = 'bold 12px monospace';
    ctx.fillText(`DIEGO BET | GEOMETRIC DATA`, 30, canvasRef.current.height - 50);
    ctx.font = '10px monospace';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(`SYMMETRY: ${symmetry} AXES | CENTRAL ANGLE: ${(360/symmetry).toFixed(1)}°`, 30, canvasRef.current.height - 35);
    ctx.fillText(`TOOLS: RADIO, CUERDA, DIAMETRO, TANGENTE`, 30, canvasRef.current.height - 20);
    
    const link = document.createElement('a');
    link.download = `lael-mandala-${symmetry}axes.jpg`;
    link.href = canvasRef.current.toDataURL('image/jpeg', 0.9);
    link.click();
    
    // Restore Canvas (re-clear the data box or just undo)
    ctx.restore();
    // We can't really "undo" the pixels unless we store them, so let's just warning the user
    // or redraw the background if it's plain. 
    // Actually, I'll just clear the area.
    ctx.clearRect(0, canvasRef.current.height - 80, 400, 80);
  };

  return (
    <div className="relative w-full min-h-screen bg-[#05080F] text-white font-inter overflow-hidden selection:bg-[#00FF9D]/30">
      <Helmet>
        <title>DIEGO BET | Laboratorio Geométrico</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      {/* ── BACKGROUND ────────────────────────────────────────────────── */}
      <div className="fixed inset-0 pointer-events-none opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* ── HEADER DASHBOARD ─────────────────────────────────────────── */}
      <header className="absolute top-0 left-0 w-full z-50 p-8 flex justify-between items-center pointer-events-none">
        <div className="pointer-events-auto">
          <Link to="/" className="flex items-center gap-4 group">
            <div className="w-12 h-12 bg-white/5 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/10 group-hover:bg-[#00FF9D] group-hover:text-black transition-all">
              <ArrowLeft size={20} />
            </div>
            <div>
              <h1 className="text-3xl font-black italic italic-playfair tracking-tighter leading-none text-white">DIEGO <span className="text-[#00FF9D]">BET</span></h1>
              <p className="text-[8px] text-[#00FF9D] font-mono tracking-[0.4em] uppercase mt-1">Sistemas Simétricos Circulares</p>
            </div>
          </Link>
        </div>

        <div className="flex gap-4 pointer-events-auto">
           <div className="bg-black/60 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/10 flex items-center gap-4">
              <div className="flex flex-col">
                <span className="text-[7px] text-white/40 uppercase tracking-widest font-bold">Symmetry</span>
                <span className="text-sm font-mono text-[#00FF9D] font-bold">{symmetry} Ejes</span>
              </div>
              <div className="w-px h-6 bg-white/10" />
              <div className="flex flex-col">
                <span className="text-[7px] text-white/40 uppercase tracking-widest font-bold">Central Angle</span>
                <span className="text-sm font-mono text-[#00F0FF] font-bold">{(360/symmetry).toFixed(1)}°</span>
              </div>
           </div>
           <button onClick={downloadImage} className="group relative bg-[#00FF9D] text-black px-8 rounded-2xl font-bold uppercase text-[10px] tracking-widest hover:shadow-[0_0_30_rgba(0,255,157,0.4)] transition-all">
              Guardar con Data
           </button>
        </div>
      </header>

      {/* ── MAIN WORKSPACE ────────────────────────────────────────────── */}
      <main className="relative w-full h-screen flex">
        
        {/* LEFT TOOLBAR */}
        <aside className="w-80 h-full flex flex-col justify-center p-8 z-50 pointer-events-none">
          <div className="space-y-4 pointer-events-auto">
            
            {/* Tool Selection */}
            <div className="bg-[#0D121F] border border-white/5 p-6 rounded-[35px] shadow-2xl space-y-2">
              <p className="text-[8px] text-white/30 uppercase tracking-[0.3em] font-bold mb-4">Módulos Geométricos</p>
              {[
                { id: 'radio', label: 'Radio', icon: <Binary size={18}/> },
                { id: 'cuerda', label: 'Cuerda', icon: <GitCommit size={18}/> },
                { id: 'diametro', label: 'Diámetro', icon: <Ruler size={18}/> },
                { id: 'tangente', label: 'Tangente', icon: <Maximize size={18}/> },
                { id: 'pincel', label: 'Arco (Libre)', icon: <MousePointer2 size={18}/> },
              ].map(t => (
                <button 
                  key={t.id} onClick={() => setMode(t.id)}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-all ${mode === t.id ? 'bg-[#00FF9D] text-black border-[#00FF9D]' : 'bg-white/5 border-white/5 text-white hover:bg-white/10'}`}
                >
                  {t.icon}
                  <span className="text-[10px] font-bold uppercase tracking-widest">{t.label}</span>
                </button>
              ))}
            </div>

            {/* Config Panel */}
            <div className="bg-[#0D121F] border border-white/5 p-6 rounded-[35px] shadow-2xl space-y-6">
              <div className="space-y-3">
                 <p className="text-[8px] text-white/30 uppercase tracking-[0.3em] font-bold">Simetría (Divisiones)</p>
                 <input type="range" min="2" max="64" value={symmetry} onChange={(e) => setSymmetry(e.target.value)} className="w-full accent-[#00FF9D]" />
              </div>
              <div className="space-y-3">
                 <p className="text-[8px] text-white/30 uppercase tracking-[0.3em] font-bold">Ancho de Línea</p>
                 <input type="range" min="1" max="20" value={strokeWidth} onChange={(e) => setStrokeWidth(e.target.value)} className="w-full accent-[#00FF9D]" />
              </div>
              <div className="flex gap-4">
                 <button onClick={() => setShowGuides(!showGuides)} className={`flex-1 p-3 rounded-xl border flex items-center justify-center transition-all ${showGuides ? 'bg-white/10 border-white/20' : 'opacity-30 border-transparent'}`}>
                    {showGuides ? <Eye size={18}/> : <EyeOff size={18}/>}
                 </button>
                 <button onClick={() => setShowInscribedAngle(!showInscribedAngle)} title="Proyectar Ángulo Inscrito" className={`flex-1 p-3 rounded-xl border flex items-center justify-center transition-all ${showInscribedAngle ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-400' : 'opacity-30 border-transparent'}`}>
                    <Target size={18}/>
                 </button>
                 <button onClick={clearCanvas} className="flex-1 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-500 hover:bg-red-500 hover:text-white transition-all">
                    <Trash2 size={18}/>
                 </button>
              </div>
            </div>

            {/* Color Palette */}
            <div className="bg-[#0D121F] border border-white/5 p-4 rounded-[25px] flex justify-between items-center">
               {['#00FF9D', '#00F0FF', '#FF00FF', '#F5F5F5'].map(c => (
                 <button key={c} onClick={() => setColor(c)} className={`w-8 h-8 rounded-lg border-2 transition-all ${color === c ? 'border-white scale-110' : 'border-transparent opacity-40'}`} style={{ backgroundColor: c }} />
               ))}
            </div>

          </div>
        </aside>

        {/* CANVAS WORKSPACE */}
        <div className="flex-grow relative h-full">
          <canvas ref={canvasRef} className="absolute inset-0 z-10" onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onTouchStart={handleMouseDown} onTouchMove={handleMouseMove} onTouchEnd={handleMouseUp} />
          <canvas ref={guideCanvasRef} className="absolute inset-0 z-0 pointer-events-none" />
          
          {/* Tech HUD Overlay */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 bg-black/40 backdrop-blur-md px-10 py-4 rounded-full border border-white/5 flex gap-12 pointer-events-none">
             <div className="flex flex-col items-center">
                <span className="text-[7px] text-white/30 uppercase tracking-[0.4em] mb-1 font-bold">Radial Distance</span>
                <span className="text-[10px] font-mono text-[#00FF9D]">{Math.sqrt(mousePos.x**2 + mousePos.y**2).toFixed(1)}u</span>
             </div>
             <div className="flex flex-col items-center">
                <span className="text-[7px] text-white/30 uppercase tracking-[0.4em] mb-1 font-bold">Central Angle</span>
                <span className="text-[10px] font-mono text-[#00FF9D]">{((Math.atan2(mousePos.y, mousePos.x) * 180 / Math.PI + 360) % 360).toFixed(1)}°</span>
             </div>
             <div className="flex flex-col items-center">
                <span className="text-[7px] text-white/30 uppercase tracking-[0.4em] mb-1 font-bold">Geometric Module</span>
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest">{mode}</span>
             </div>
          </div>
        </div>

      </main>

      {/* FOOTER INFO */}
      <footer className="absolute bottom-8 right-12 z-50 text-right pointer-events-none">
         <p className="text-[8px] text-white/20 tracking-[0.5em] uppercase font-bold">
           Arquitectura del Rendimiento <br className="lg:hidden" /> Los Olivos & Lael
         </p>
      </footer>

    </div>
  );
}
