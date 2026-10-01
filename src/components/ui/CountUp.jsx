import React, { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';

// Número que cuenta desde 0 cuando aparece en pantalla (una sola vez).
const fmt = new Intl.NumberFormat('es-CL');

export default function CountUp({ to, prefix = '', suffix = '', duration = 1.6, className = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-15% 0px' });
  const reduce = useReducedMotion();
  const [n, setN] = useState(0);
  useEffect(() => { if (reduce) setN(to); }, [reduce, to]);

  useEffect(() => {
    if (!inView || reduce) return undefined;
    const t0 = performance.now();
    let raf = requestAnimationFrame(function tick(t) {
      const p = Math.min(1, (t - t0) / (duration * 1000));
      setN(Math.round(to * (1 - Math.pow(1 - p, 4))));
      if (p < 1) raf = requestAnimationFrame(tick);
    });
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, to, duration]);

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      <span aria-hidden="true">{prefix}{fmt.format(n)}{suffix}</span>
      <span className="sr-only">{prefix}{fmt.format(to)}{suffix}</span>
    </span>
  );
}
