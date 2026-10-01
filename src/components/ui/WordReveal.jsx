import React from 'react';
import { motion } from 'framer-motion';

// Título que aparece palabra por palabra (cada palabra sube desde abajo de una
// máscara). Respeta el ajuste de línea natural, así que funciona igual en
// celular y en computador.
//
// segments: [{ text: 'Tu sueño', className?: string, style?: object, breakAfter?: 'sm' | true }]
const ease = [0.16, 1, 0.3, 1];

// modo: undefined → animación con framer-motion (lo normal)
//       'css'     → misma animación pero en CSS (HTML pre-dibujado, ver entry-shell)
//       'quieto'  → sin animación (cuando React toma una portada ya dibujada)
export default function WordReveal({ as = 'h1', segments, className = '', delay = 0, stagger = 0.06, modo }) {
  const Tag = modo ? as : motion[as];
  const tagProps = modo ? {} : { initial: 'hidden', animate: 'visible' };
  let index = 0;

  return (
    <Tag className={className} {...tagProps} aria-label={segments.map((s) => s.text).join(' ')}>
      {segments.map((seg, si) => (
        <React.Fragment key={si}>
          <span className={seg.className} style={seg.style} aria-hidden="true">
            {seg.text.split(' ').map((word, wi, arr) => {
              const i = index++;
              return (
                <React.Fragment key={wi}>
                  <span className="inline-block overflow-hidden align-bottom pb-[0.08em] -mb-[0.08em]">
                    {modo ? (
                      <span className={modo === 'css' ? 'inline-block lael-rise' : 'inline-block'} style={modo === 'css' ? { animationDelay: `${delay + i * stagger}s` } : undefined}>{word}</span>
                    ) : (
                      <motion.span
                        className="inline-block"
                        variants={{
                          hidden: { y: '105%' },
                          visible: { y: 0, transition: { duration: 0.7, ease, delay: delay + i * stagger } },
                        }}
                      >
                        {word}
                      </motion.span>
                    )}
                  </span>
                  {wi < arr.length - 1 && ' '}
                </React.Fragment>
              );
            })}
          </span>
          {seg.breakAfter === true && <br />}
          {seg.breakAfter === 'sm' && <br className="hidden sm:block" />}
          {!seg.breakAfter && si < segments.length - 1 && ' '}
          {seg.breakAfter === 'sm' && <span className="sm:hidden"> </span>}
        </React.Fragment>
      ))}
    </Tag>
  );
}
