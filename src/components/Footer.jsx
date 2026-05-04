import { Link } from "react-router-dom";
import { Instagram, Linkedin, Youtube, Phone } from "lucide-react";
import logo from "../assets/img/Logos/lael-inst-blanco.png";
import { NAVIGATION } from "../data/navigation";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative z-10 bg-lael-primary text-lael-muted border-t border-white/5 pt-20 pb-8">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

                {/* COLUMNA 1: MARCA */}
                <div className="flex flex-col gap-6">
                    <Link to="/" className="inline-block hover:opacity-80 transition-opacity">
                        <img src={logo} alt="Instituto Lael" loading="lazy" className="h-8 w-auto" />
                    </Link>
                    <p className="text-sm leading-relaxed max-w-xs">
                        Sistema de Alto Rendimiento Académico. Resultados comprobados mediante ingeniería y estrategia.
                    </p>
                    <div className="flex gap-4">
                        {NAVIGATION.social.map((social, idx) => (
                            <SocialLink key={idx} href={social.url} icon={getLucideIcon(social.name)} label={social.name} />
                        ))}
                    </div>
                </div>

                {/* COLUMNA 2: PROGRAMAS */}
                <div className="flex flex-col gap-6">
                    <h4 className="text-lael-light text-sm font-semibold uppercase tracking-widest">Programas</h4>
                    <nav className="flex flex-col gap-4 text-sm">
                        {NAVIGATION.footer.programs.map((link, i) => (
                            <FooterLink key={i} to={link.path}>{link.name}</FooterLink>
                        ))}
                    </nav>
                </div>

                {/* COLUMNA 3: INSTITUCIONAL */}
                <div className="flex flex-col gap-6">
                    <h4 className="text-lael-light text-sm font-semibold uppercase tracking-widest">Institución</h4>
                    <nav className="flex flex-col gap-4 text-sm">
                        {NAVIGATION.footer.company.map((link, i) => (
                            <FooterLink key={i} to={link.path}>{link.name}</FooterLink>
                        ))}
                    </nav>
                </div>

                {/* COLUMNA 4: CONTACTO */}
                <div className="flex flex-col gap-6">
                    <h4 className="text-lael-light text-sm font-semibold uppercase tracking-widest">Contacto</h4>
                    <div className="flex flex-col gap-4 text-sm">
                        <a href={NAVIGATION.action.whatsapp.url} target="_blank" rel="noreferrer" className="hover:text-lael-accent transition-colors flex items-center gap-2">
                            <Phone size={16} /> Contactar a un Mentor
                        </a>
                        <a href="mailto:contacto@institutolael.cl" className="hover:text-lael-accent transition-colors">
                            contacto@institutolael.cl
                        </a>
                        <span className="text-lael-muted/50">Lunes a Viernes 09:00 - 19:00 hrs</span>
                    </div>
                </div>
            </div>

            {/* BARRA INFERIOR */}
            <div className="border-t border-white/5 pt-8 mt-8">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-lael-muted/50">
                    <p>© {currentYear} Instituto Lael SpA. Todos los derechos reservados.</p>
                    <div className="flex gap-6">
                        {NAVIGATION.footer.legal.map((link, i) => (
                            <Link key={i} to={link.path} className="hover:text-lael-light transition-colors">{link.name}</Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}

function getLucideIcon(name) {
    if (name === 'Instagram') return <Instagram size={18} />;
    if (name === 'YouTube') return <Youtube size={18} />;
    if (name === 'LinkedIn') return <Linkedin size={18} />;
    return <Phone size={18} />;
}

function SocialLink({ href, icon, label }) {
    return (
        <a
            href={href} target="_blank" rel="noreferrer" aria-label={label}
            className="w-10 h-10 flex items-center justify-center rounded-lg bg-lael-secondary border border-white/5 text-lael-muted hover:text-lael-accent hover:border-lael-accent/30 transition-all duration-300"
        >
            {icon}
        </a>
    );
}

function FooterLink({ to, children }) {
    return (
        <Link to={to} className="hover:text-lael-accent transition-colors duration-300">
            {children}
        </Link>
    );
}