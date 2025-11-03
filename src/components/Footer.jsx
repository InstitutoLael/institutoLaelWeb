// src/components/Footer.jsx
import { Link } from "react-router-dom";
import { FaInstagram, FaYoutube, FaWhatsapp } from "react-icons/fa";
import logoReal from "../assets/img/Logos/lael-inst-naranja.png";

export default function Footer() {
  const year = new Date().getFullYear();
  const wsp = (msg) =>
    `https://wa.me/56964626568?text=${encodeURIComponent(msg)}`;

  return (
    <footer className="bg-[#0b1220] text-slate-100 border-t border-slate-800" role="contentinfo">
      {/* CTA */}
      <section className="bg-[#0e1424] border-b border-slate-800 py-10">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <span className="inline-block px-3 py-1 text-xs font-semibold border border-slate-700 rounded-full">
              ¿Listo/a para empezar?
            </span>
            <h4 className="text-xl font-semibold mt-3 leading-tight">
              Clases en vivo + cápsulas + acompañamiento real.
            </h4>
            <p className="text-slate-300 text-sm">
              Matrícula única. Precios claros. Sin letra chica.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/inscripcion"
              className="bg-amber-400 hover:bg-amber-500 text-[#0b1220] font-semibold px-4 py-2 rounded-xl transition"
            >
              Inscribirme
            </Link>
            <a
              href={wsp("Hola 👋 Me gustaría conversar mi caso.")}
              target="_blank"
              rel="noreferrer"
              className="border border-slate-600 hover:border-slate-400 px-4 py-2 rounded-xl transition"
            >
              WhatsApp
            </a>
            <Link
              to="/becas"
              className="border border-slate-600 hover:border-slate-400 px-4 py-2 rounded-xl transition"
            >
              Becas
            </Link>
          </div>
        </div>
      </section>

      {/* Cuerpo */}
      <section className="py-12 bg-[#0b1220]">
        <div className="max-w-6xl mx-auto px-4 grid sm:grid-cols-2 md:grid-cols-4 gap-10">
          {/* Col 1 - Marca */}
          <div>
            <Link to="/" aria-label="Inicio">
              <img src={logoReal} alt="Instituto Lael" className="h-10 mb-3" loading="lazy" />
            </Link>
            <p className="text-slate-300 text-sm mb-4 font-medium">
              Educación online, cercana y clara.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/institutolael"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram Instituto Lael"
                className="text-slate-400 hover:text-white transition"
              >
                <FaInstagram size={20} />
              </a>
              <a
                href="https://www.youtube.com/@institutolael"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube Instituto Lael"
                className="text-slate-400 hover:text-white transition"
              >
                <FaYoutube size={22} />
              </a>
              <a
                href={wsp("Hola 👋 Necesito información, por favor.")}
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp Instituto Lael"
                className="text-slate-400 hover:text-white transition"
              >
                <FaWhatsapp size={20} />
              </a>
            </div>
          </div>

          {/* Col 2 - Programas */}
          <div>
            <h4 className="font-semibold mb-3 text-white">Programas</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/paes" className="hover:underline">PAES</Link></li>
              <li><Link to="/idiomas" className="hover:underline">Idiomas</Link></li>
              <li><Link to="/lsch" className="hover:underline">Lengua de Señas</Link></li>
              <li><Link to="/homeschool" className="hover:underline">Homeschool</Link></li>
              <li><Link to="/empresas" className="hover:underline">Empresas</Link></li>
            </ul>
          </div>

          {/* Col 3 - Comunidad */}
          <div>
            <h4 className="font-semibold mb-3 text-white">Comunidad</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/docentes" className="hover:underline">Docentes</Link></li>
              <li><Link to="/noticias" className="hover:underline">Noticias</Link></li>
              <li><Link to="/simulador" className="hover:underline">Simulador</Link></li>
              <li><Link to="/becas" className="hover:underline">Becas</Link></li>
              <li><Link to="/convenios" className="hover:underline">Convenios</Link></li>
            </ul>
          </div>

          {/* Col 4 - Soporte */}
          <div>
            <h4 className="font-semibold mb-3 text-white">Soporte</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/contacto" className="hover:underline">Contacto</Link></li>
              <li><Link to="/inscripcion" className="hover:underline">Inscripción</Link></li>
              <li><Link to="/pagos" className="hover:underline">Pagos</Link></li>
              <li>
                <a
                  href={wsp("Hola 👋 Necesito información, por favor.")}
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold hover:underline"
                >
                  +56 9 6462 6568 (WhatsApp)
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Legal */}
      <section className="border-t border-slate-800 py-5 text-center text-sm text-slate-400">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <nav className="flex flex-wrap justify-center gap-4">
            <Link to="/terminos" className="hover:text-white">Términos</Link>
            <Link to="/privacidad" className="hover:text-white">Privacidad</Link>
            <Link to="/nosotros" className="hover:text-white">Nosotros</Link>
          </nav>
          <p className="opacity-90">© {year} Instituto Lael · Hecho con 💙 desde Chile.</p>
        </div>
      </section>
    </footer>
  );
}