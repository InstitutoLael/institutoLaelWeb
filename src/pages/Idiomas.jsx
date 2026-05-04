import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import CTASection from '../components/CTASection';
import { LANGUAGES } from '../data/idiomas';

export default function Idiomas() {
  return (
    <>
      <Helmet>
        <title>Sistemas de Inmersión Lingüística | Instituto Lael</title>
        <meta name="description" content="Decodifica idiomas con nuestro sistema estructural. Inglés, Coreano y Español para Expats." />
      </Helmet>

      <section className="relative pt-32 pb-24 bg-lael-primary overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.h1 
            className="text-4xl md:text-6xl font-display font-bold leading-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Sistemas de <br />
            <span className="text-lael-accent text-transparent bg-clip-text bg-gradient-to-r from-lael-accent to-lael-light">Inmersión Lingüística</span>
          </motion.h1>
          <motion.p 
            className="text-lg text-lael-muted max-w-2xl mx-auto mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            No enseñamos listas de vocabulario. Hacemos ingeniería inversa del idioma para que domines su estructura en tiempo récord.
          </motion.p>
        </div>
      </section>

      {/* Programas */}
      <section className="py-24 bg-lael-secondary relative border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {LANGUAGES.map((lang) => (
              <Card key={lang.id} hoverEffect className="p-8 flex flex-col border border-white/5 relative">
                <div className="mb-6">
                  <div className="text-4xl mb-4">{lang.emoji}</div>
                  <h3 className="text-2xl font-bold text-lael-light mb-2">{lang.name}</h3>
                  <p className="text-lael-muted text-sm">{lang.summary}</p>
                </div>

                <ul className="space-y-4 mb-8 flex-grow">
                  {lang.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-lael-muted">
                      <span className="text-lael-accent mt-0.5">●</span>
                      {feat}
                    </li>
                  ))}
                </ul>

                <div className="border-t border-white/5 pt-6 mb-8">
                  <div className="text-xs font-bold text-lael-muted uppercase tracking-wider mb-3">Niveles Disponibles:</div>
                  <div className="flex flex-wrap gap-2">
                    {lang.levels.map((lvl, i) => (
                      <span key={i} className="px-3 py-1 rounded-md bg-white/5 text-lael-light text-xs">
                        {lvl}
                      </span>
                    ))}
                  </div>
                </div>

                <Button variant="secondary" className="w-full">
                  Ver Detalles Estratégicos
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <CTASection 
        title="Rompe la barrera del idioma"
        subtitle="Postula a nuestras secciones exclusivas y comienza a dominar la estructura."
        btnText="Postular Ahora"
      />
    </>
  );
}
