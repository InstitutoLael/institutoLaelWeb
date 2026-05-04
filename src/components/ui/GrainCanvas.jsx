import React, { useEffect, useRef } from 'react';

export default function GrainCanvas({ opacity = 0.12 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    let animationFrameId;
    let width = window.innerWidth;
    let height = window.innerHeight;

    // Resize handling
    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    
    window.addEventListener('resize', resize);
    resize();

    // Noise generation
    const noise = () => {
      const imgData = ctx.createImageData(width, height);
      const data = imgData.data;
      
      for (let i = 0; i < data.length; i += 4) {
        // Mono noise
        const val = Math.random() * 255;
        data[i] = val;     // red
        data[i + 1] = val; // green
        data[i + 2] = val; // blue
        data[i + 3] = (Math.random() * 255 * opacity); // alpha
      }
      
      ctx.putImageData(imgData, 0, 0);
      
      // Slower animation for subtleness: around 15fps
      setTimeout(() => {
        animationFrameId = requestAnimationFrame(noise);
      }, 1000 / 15);
    };

    noise();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [opacity]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none w-full h-full"
      style={{ mixBlendMode: 'overlay' }}
    />
  );
}
