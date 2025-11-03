{/* Cuerpo */}
<section className="py-12 bg-[#0b1220]">
  <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-12 gap-10">
    {/* Col 1 - Marca (ocupa más espacio) */}
    <div className="md:col-span-4">
      <Link
        to="/"
        aria-label="Ir al inicio"
        className="inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 rounded-md"
      >
        <img
          src={logoReal}
          alt="Instituto Lael"
          className="h-8 md:h-10 w-auto mb-3"
          loading="lazy"
          decoding="async"
        />
      </Link>
      <p className="text-slate-300 text-sm mb-4">
        Educación online, cercana y clara.
      </p>

      <nav aria-label="Redes sociales">
        <ul className="flex gap-3 items-center">
          <li>
            <ExternalA
              href="https://www.instagram.com/institutolael"
              ariaLabel="Instagram Instituto Lael"
              className="text-slate-400 hover:text-white transition"
            >
              <FaInstagram size={18} aria-hidden="true" />
              <span className="sr-only">Instagram</span>
            </ExternalA>
          </li>
          <li>
            <ExternalA
              href="https://www.youtube.com/@institutolael"
              ariaLabel="YouTube Instituto Lael"
              className="text-slate-400 hover:text-white transition"
            >
              <FaYoutube size={20} aria-hidden="true" />
              <span className="sr-only">YouTube</span>
            </ExternalA>
          </li>
          <li>
            <ExternalA
              href={wspLink("56964626568", "Hola 👋 Necesito información, por favor.")}
              ariaLabel="WhatsApp Instituto Lael"
              className="text-slate-400 hover:text-white transition"
            >
              <FaWhatsapp size={18} aria-hidden="true" />
              <span className="sr-only">WhatsApp</span>
            </ExternalA>
          </li>
        </ul>
      </nav>
    </div>

    {/* Col 2 - Programas */}
    <div className="md:col-span-3 md:border-0 border-t border-slate-800 pt-6 md:pt-0">
      <h4 className="font-semibold mb-3 text-white">Programas</h4>
      <ul className="space-y-2 text-sm text-slate-300">
        <li><Link to="/paes" className="hover:text-white/90">PAES</Link></li>
        <li><Link to="/idiomas" className="hover:text-white/90">Idiomas</Link></li>
        <li><Link to="/lsch" className="hover:text-white/90">Lengua de Señas</Link></li>
        <li><Link to="/homeschool" className="hover:text-white/90">Homeschool</Link></li>
        <li><Link to="/empresas" className="hover:text-white/90">Empresas</Link></li>
      </ul>
    </div>

    {/* Col 3 - Comunidad */}
    <div className="md:col-span-3 md:border-0 border-t border-slate-800 pt-6 md:pt-0">
      <h4 className="font-semibold mb-3 text-white">Comunidad</h4>
      <ul className="space-y-2 text-sm text-slate-300">
        <li><Link to="/docentes" className="hover:text-white/90">Docentes</Link></li>
        <li><Link to="/noticias" className="hover:text-white/90">Noticias</Link></li>
        <li><Link to="/simulador" className="hover:text-white/90">Simulador</Link></li>
        <li><Link to="/becas" className="hover:text-white/90">Becas</Link></li>
        <li><Link to="/convenios" className="hover:text-white/90">Convenios</Link></li>
      </ul>
    </div>

    {/* Col 4 - Soporte */}
    <div className="md:col-span-2 md:border-0 border-t border-slate-800 pt-6 md:pt-0">
      <h4 className="font-semibold mb-3 text-white">Soporte</h4>
      <ul className="space-y-2 text-sm text-slate-300">
        <li><Link to="/contacto" className="hover:text-white/90">Contacto</Link></li>
        <li><Link to="/inscripcion" className="hover:text-white/90">Inscripción</Link></li>
        <li><Link to="/pagos" className="hover:text-white/90">Pagos</Link></li>
        <li className="flex flex-col">
          <ExternalA
            href={wspLink("56964626568", "Hola 👋 Necesito información, por favor.")}
            className="font-semibold hover:text-white"
            ariaLabel="Abrir WhatsApp Instituto Lael"
          >
            +56 9 6462 6568 (WhatsApp)
          </ExternalA>
          <a href="tel:+56964626568" className="text-slate-400 hover:text-white text-xs">
            Llamar: +56 9 6462 6568
          </a>
        </li>
      </ul>
    </div>
  </div>
</section>