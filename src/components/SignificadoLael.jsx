import React from 'react';
import { motion } from 'framer-motion';
import laelLogo from '../assets/img/Logos/lael-inst-negro.png';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
};

export default function SignificadoLael() {
  return (
    <section className="w-full py-24 lg:py-32 bg-lael-primary flex flex-col items-center px-6 border-t border-lael-bd">
      <div className="w-full max-w-5xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
        >
          {/* Visual Column */}
          <div className="relative flex justify-center items-center p-12 bg-lael-secondary rounded-3xl border border-lael-bd cinematic-shadow">
            <img 
              src={laelLogo} 
              alt="Logo Instituto Lael" 
              className="w-full max-w-[300px] h-auto object-contain"
            />
          </div>

          {/* Text Column */}
          <div>
            <motion.p variants={fadeUp} className="text-lael-rust text-[10px] tracking-[0.25em] uppercase mb-4 font-bold">
              Nuestra Identidad
            </motion.p>
            <motion.h2 variants={fadeUp} className="font-display text-4xl lg:text-5xl text-lael-light font-bold mb-8 leading-tight">
              Más que un logo, <br/><span className="italic text-lael-accent">una declaración de fe.</span>
            </motion.h2>

            <motion.div variants={fadeUp} className="space-y-6 text-lael-muted text-sm leading-relaxed">
              <p>
                El nombre <strong className="text-lael-light">Lael</strong> tiene origen hebreo. Significa <strong className="text-lael-light">"de Dios"</strong> o <strong className="text-lael-light">"perteneciente a Dios"</strong>, y aparece en la Biblia específicamente en el libro de Números (Números 3:24).
              </p>
              <div className="h-px w-16 bg-lael-bd my-4" />
              <p>
                La <strong className="text-lael-light">paloma</strong> simboliza al <strong className="text-lael-light">Espíritu Santo</strong>, quien descendió sobre Jesús en su bautismo, representando la <strong className="text-lael-light">presencia y guía de Dios</strong> (Mateo 3:16). 
              </p>
              <p>
                También evoca el momento en que llevó una rama de olivo a Noé, marcando el fin de la tormenta y un <strong className="text-lael-light">nuevo comienzo lleno de paz y esperanza</strong> (Génesis 8:11).
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-10 p-6 bg-lael-accent/5 border-l-2 border-lael-accent rounded-r-xl">
              <p className="text-lael-light font-medium italic text-sm mb-4">
                "Nuestro logo nos recuerda que todo lo que hacemos tiene un propósito mayor: llevar luz, esperanza y educación a quienes lo necesitan, bajo la cobertura y dirección de Dios."
              </p>
              <div className="pt-4 border-t border-lael-accent/10">
                <p className="text-lael-muted text-[11px] uppercase tracking-widest font-bold">
                  Esto no partió como un sistema. <span className="text-lael-accent">Partió como una ayuda.</span>
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
