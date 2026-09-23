import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Youtube } from 'lucide-react';
import logoBlanco from '../assets/img/Logos/lael-nuevo-logo-blanco.webp';
import { BECAS_FORM_URL } from '../data/paes';
import ThemeToggle from './ThemeToggle';

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
  { name: 'Reforzamiento escolar', path: '/reforzamiento' },
  { name: 'Talleres de IA', path: '/talleres-ia' },
  { name: 'Orientación vocacional', path: '/orientacion' },
  { name: 'Ensayo PAES gratis', path: '/ensayo-gratis' },
  { name: 'Empresas', path: '/empresas' },
];

const LINKS_INSTITUTO = [
  { name: 'Sobre Nosotros', path: '/nosotros' },
  { name: 'Cómo funciona', path: '/sistema' },
  { name: 'Nuestro método', path: '/metodo' },
  { name: 'Casos reales', path: '/casos-reales' },
  { name: 'Noticias y guías', path: '/noticias' },
  { name: 'Alumnos Lael', path: '/alumnos' },
  { name: 'Trae un amigo', path: '/trae-un-amigo' },
  { name: 'Charla para apoderados', path: '/apoderados' },
  { name: 'Alianzas', path: '/alianzas' },
  { name: 'Deja tu testimonio', path: '/testimonio' },
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
            <Link to="/" aria-label="Instituto Lael, ir al inicio">
              <img
                src={logoBlanco}
                alt=""
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
              className="text-white/70 text-sm hover:text-white transition-colors"
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
                  aria-label={`${name} (se abre en otra pestaña)`}
                  className="w-11 h-11 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 text-white/75 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Programas */}
          <div>
            <h2 id="footer-programas" className="text-xs tracking-[0.15em] uppercase text-white/70 mb-5 font-bold">Programas</h2>
            <nav aria-labelledby="footer-programas" className="flex flex-col gap-4">
              {LINKS_PROGRAMAS.map(l => (
                <Link key={l.path} to={l.path} className="text-sm text-white/75 hover:text-white transition-colors">
                  {l.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Instituto */}
          <div>
            <h2 id="footer-instituto" className="text-xs tracking-[0.15em] uppercase text-white/70 mb-5 font-bold">Instituto</h2>
            <nav aria-labelledby="footer-instituto" className="flex flex-col gap-4">
              {LINKS_INSTITUTO.map(l => (
                l.external ? (
                  <a key={l.path} href={l.path} target="_blank" rel="noopener noreferrer" className="text-sm text-white/75 hover:text-white transition-colors">
                    {l.name}
                  </a>
                ) : (
                  <Link key={l.path} to={l.path} className="text-sm text-white/75 hover:text-white transition-colors">
                    {l.name}
                  </Link>
                )
              ))}
            </nav>
          </div>

          {/* Legal */}
          <div>
            <h2 id="footer-legal" className="text-xs tracking-[0.15em] uppercase text-white/70 mb-5 font-bold">Legal</h2>
            <nav aria-labelledby="footer-legal" className="flex flex-col gap-4">
              {LINKS_LEGAL.map(l => (
                <Link key={l.path} to={l.path} className="text-sm text-white/75 hover:text-white transition-colors">
                  {l.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* CTA rápido */}
        <div className="mb-12 p-8 rounded-3xl border border-white/10 bg-white/[0.03] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-xs tracking-[0.15em] uppercase text-[#D7E400] font-bold mb-1">PAES 2027</p>
            <p className="text-white font-bold text-lg">Empieza a prepararte. Matrícula gratis.</p>
          </div>
          <Link
            to="/paes"
            className="flex-shrink-0 px-8 py-4 rounded-xl text-sm tracking-wider uppercase font-bold transition-all hover:opacity-90 active:scale-95"
            style={{ backgroundColor: '#D7E400', color: '#071D49' }}
          >
            Inscribirme Ahora
          </Link>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-10 flex flex-col items-center gap-3 text-center">
          <p className="text-xs text-white/60 italic tracking-[0.1em] uppercase font-bold">
            Lucas 4:18
          </p>
          <p className="text-xs text-white/60 tracking-wide">
            © {year} Instituto Lael SpA · Santiago, Chile
          </p>
          <ThemeToggle className="mt-2" />
        </div>

      </div>
    </footer>
  );
}