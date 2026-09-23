import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Youtube } from 'lucide-react';
import logoBlanco from '../assets/img/Logos/lael-nuevo-logo-blanco.webp';
import { BECAS_FORM_URL } from '../data/paes';

const SOCIAL = [
  { name: 'Instagram', href: 'https://instagram.com/institutolael', Icon: Instagram },
  { name: 'YouTube', href: 'https://www.youtube.com/@Laelinstituto', Icon: Youtube },
];

const LINKS_PROGRAMAS = [
  { name: 'PAES', path: '/paes' },
  { name: 'Verano Lael', path: '/verano' },
  { name: 'Calculadora de puntaje', path: '/calculadora' },
  { name: 'Idiomas (Inglés)', path: '/idiomas' },
  { name: 'Español para extranjeros', path: '/espanol' },
  { name: 'Nivelación adultos', path: '/adultos' },
  { name: 'LSCh (Señas)', path: '/lsch' },
  { name: 'Empresas', path: '/empresas' },
];

const LINKS_INSTITUTO = [
  { name: 'Sobre Nosotros', path: '/nosotros' },
  { name: 'Cómo funciona', path: '/sistema' },
  { name: 'Nuestro método', path: '/metodo' },
  { name: 'Casos reales', path: '/casos-reales' },
  { name: 'Contacto', path: '/contacto' },
  { name: 'Preguntas Frecuentes', path: '/preguntas' },
  { name: 'Postula a una Beca', path: BECAS_FORM_URL, external: true },
];

const LINKS_LEGAL = [
  { name: 'Transparencia', path: '/transparencia' },
  { name: 'Política de privacidad', path: '/privacidad' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{ backgroundColor: '#071D49' }} className="pt-20 pb-10 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">

        {/* Top grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">

          {/* Marca - ocupa 2 columnas */}
          <div className="flex flex-col gap-6 lg:col-span-2">
            <Link to="/">
              <img
                src={logoBlanco}
                alt="Instituto Lael"
                loading="lazy"
                className="h-10 w-auto opacity-90 hover:opacity-100 transition-opacity"
              />
            </Link>

            {/* Tagline oficial */}
            <p className="text-white/60 text-sm leading-relaxed max-w-xs">
              Acompañamos tu camino.<br />
              Impulsamos tu futuro.
            </p>

            {/* Email */}
            <a
              href="mailto:contacto@institutolael.cl"
              className="text-white/40 text-xs hover:text-white transition-colors tracking-wide"
            >
              contacto@institutolael.cl
            </a>

            {/* Social */}
            <div className="flex gap-3">
              {SOCIAL.map(({ name, href, Icon }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={name}
                  className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 text-white/50 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Programas */}
          <div>
            <h4 className="text-[10px] tracking-[0.25em] uppercase text-white/40 mb-6 font-bold">Programas</h4>
            <nav className="flex flex-col gap-4">
              {LINKS_PROGRAMAS.map(l => (
                <Link key={l.path} to={l.path} className="text-sm text-white/60 hover:text-white transition-colors">
                  {l.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Instituto */}
          <div>
            <h4 className="text-[10px] tracking-[0.25em] uppercase text-white/40 mb-6 font-bold">Instituto</h4>
            <nav className="flex flex-col gap-4">
              {LINKS_INSTITUTO.map(l => (
                l.external ? (
                  <a key={l.path} href={l.path} target="_blank" rel="noopener noreferrer" className="text-sm text-white/60 hover:text-white transition-colors">
                    {l.name}
                  </a>
                ) : (
                  <Link key={l.path} to={l.path} className="text-sm text-white/60 hover:text-white transition-colors">
                    {l.name}
                  </Link>
                )
              ))}
            </nav>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-[10px] tracking-[0.25em] uppercase text-white/40 mb-6 font-bold">Legal</h4>
            <nav className="flex flex-col gap-4">
              {LINKS_LEGAL.map(l => (
                <Link key={l.path} to={l.path} className="text-sm text-white/60 hover:text-white transition-colors">
                  {l.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* CTA rápido */}
        <div className="mb-12 p-8 rounded-3xl border border-white/10 bg-white/[0.03] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase text-[#D7E400] font-bold mb-1">PAES 2027</p>
            <p className="text-white font-bold text-lg">Empieza a prepararte. Matrícula gratis.</p>
          </div>
          <Link
            to="/paes"
            className="flex-shrink-0 px-8 py-4 rounded-xl text-[11px] tracking-[0.2em] uppercase font-bold transition-all hover:opacity-90 active:scale-95"
            style={{ backgroundColor: '#D7E400', color: '#071D49' }}
          >
            Inscribirme Ahora
          </Link>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-10 flex flex-col items-center gap-3 text-center">
          <p className="text-[11px] text-white/30 italic tracking-[0.15em] uppercase font-bold">
            Lucas 4:18
          </p>
          <p className="text-[10px] text-white/20 tracking-widest">
            © {year} Instituto Lael SpA · Santiago, Chile
          </p>
        </div>

      </div>
    </footer>
  );
}