import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

// Párrafo que se "enciende" palabra por palabra mientras bajas: cada palabra
// pasa de tenue a su color completo. El texto está entero desde el inicio
// (los lectores de pantalla lo leen normal); solo cambia la opacidad.
//
// parts: [{ text, className? }] o un string. Un part con `node` inserta un
// elemento (p. ej. una foto redonda en medio de la frase).
function Word({ progress, range, children, className, dim }) {
  const opacity = useTransform(progress, range, [dim ? 0.14 : 1, 1]);
  return <motion.span style={{ opacity }} className={className}>{children}</motion.span>;
}

export default function ScrollWords({ parts, as: Tag = 'p', className = '' }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.5'] });
  // Las palabras recién se atenúan cuando la persona empieza a bajar (y el
  // párrafo todavía está más abajo): así nadie ve el texto tenue de entrada.
  const [dim, setDim] = useState(false);
  useEffect(() => {
    if (reduce) return undefined;
    const on = () => {
      const r = ref.current && ref.current.getBoundingClientRect();
      if (r && r.top > window.innerHeight * 0.85) setDim(true);
      window.removeEventListener('scroll', on);
    };
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, [reduce]);
  const lista = typeof parts === 'string' ? [{ text: parts }] : parts;

  const words = [];
  lista.forEach((p) => {
    if (p.node) words.push({ node: p.node });
    else p.text.split(' ').filter(Boolean).forEach((w) => words.push({ w, className: p.className }));
  });
  const n = words.length;

  return (
    <Tag ref={ref} className={className}>
      {words.map((it, i) => {
        const range = [i / n, Math.min(1, (i + 1.5) / n)];
        const content = it.node || it.w;
        return (
          <React.Fragment key={`${i}-${dim}`}>
            {reduce ? <span className={it.className}>{content}</span> : <Word progress={scrollYProgress} range={range} dim={dim} className={it.className}>{content}</Word>}
            {i < n - 1 && ' '}
          </React.Fragment>
        );
      })}
    </Tag>
  );
}
