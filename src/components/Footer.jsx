import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Linkedin, Youtube } from 'lucide-react';
import logo from '../assets/img/Logos/lael-inst-negro.png';
import { NAVIGATION } from '../data/navigation';

const SOCIAL = [
  { name: 'Instagram', href: 'https://instagram.com/institutolael', Icon: Instagram },
  { name: 'YouTube', href: 'https://www.youtube.com/channel/UCl0JuF0HlFpQEWPV_tIxV2g', Icon: Youtube },
  { name: 'LinkedIn', href: 'https://linkedin.com/company/instituto-lael', Icon: Linkedin },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-lael-primary border-t border-lael-bd pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">

        {/* Top grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">

          {/* Marca */}
          <div className="flex flex-col gap-6 lg:col-span-2">
            <Link to="/">
              <img src={logo} alt="Instituto Lael" loading="lazy" className="h-7 w-auto opacity-90 hover:opacity-100 transition-opacity" />
            </Link>
            <p className="text-lael-muted text-sm leading-relaxed max-w-xs">
              Ingeniería del rendimiento académico. No vendemos cursos, diseñamos el éxito de nuestros alumnos a través de datos y estrategia.
            </p>
            {/* Social */}
            <div className="flex gap-3">
              {SOCIAL.map(({ name, href, Icon }) => (
                <a key={name} href={href} target="_blank" rel="noreferrer" aria-label={name}
                  className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/5 border border-lael-bd text-lael-muted hover:text-lael-accent hover:border-lael-accent/30 transition-all duration-300">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Programas */}
          <div>
            <h4 className="text-[10px] tracking-[0.25em] uppercase text-lael-muted mb-6 font-bold">Mundos</h4>
            <nav className="flex flex-col gap-4">
              <Link to="/paes" className="text-sm text-lael-muted hover:text-lael-accent transition-colors">PAES</Link>
              <Link to="/idiomas" className="text-sm text-lael-muted hover:text-lael-accent transition-colors">Idiomas</Link>
              <Link to="/lsch" className="text-sm text-lael-muted hover:text-lael-accent transition-colors">Inclusión LSCh</Link>
              <Link to="/adultos" className="text-sm text-lael-muted hover:text-lael-accent transition-colors">Adultos</Link>
            </nav>
          </div>

          {/* El Sistema */}
          <div>
            <h4 className="text-[10px] tracking-[0.25em] uppercase text-lael-muted mb-6 font-bold">El Sistema</h4>
            <nav className="flex flex-col gap-4">
              <Link to="/metodo" className="text-sm text-lael-muted hover:text-lael-accent transition-colors">El Método</Link>
              <Link to="/tecnologia" className="text-sm text-lael-muted hover:text-lael-accent transition-colors">Tecnología</Link>
              <Link to="/transparencia" className="text-sm text-lael-muted hover:text-lael-accent transition-colors">Transparencia</Link>
              <Link to="/preguntas" className="text-sm text-lael-muted hover:text-lael-accent transition-colors">FAQ Avanzado</Link>
            </nav>
          </div>

          {/* Instituto */}
          <div>
            <h4 className="text-[10px] tracking-[0.25em] uppercase text-lael-muted mb-6 font-bold">Instituto</h4>
            <nav className="flex flex-col gap-4 mb-8">
              <Link to="/nosotros" className="text-sm text-lael-muted hover:text-lael-accent transition-colors">Sobre Nosotros</Link>
              <Link to="/contacto" className="text-sm text-lael-muted hover:text-lael-accent transition-colors">Contacto</Link>
              <Link to="/diagnostico" className="text-sm text-lael-accent font-bold hover:underline transition-colors">Iniciar Diagnóstico</Link>
            </nav>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-lael-bd pt-12 flex flex-col items-center gap-8 text-center">
          <p className="text-lael-muted text-sm italic max-w-2xl leading-relaxed">
             “Nacimos en medio de una crisis, con clases gratis en Zoom para quienes no podían pagar un preu. Hoy somos tecnología, pero el espíritu es el mismo: que nadie se quede atrás.”
          </p>
          <div className="flex flex-col items-center gap-2">
            <p className="text-[11px] text-lael-muted/60 italic tracking-[0.2em] uppercase font-bold">
              Jeremías 33:3 · Lucas 4:18
            </p>
            <p className="text-[10px] text-lael-muted/40 tracking-widest">
              © {year} Instituto Lael SpA · Santiago, Chile
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}