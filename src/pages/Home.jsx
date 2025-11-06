import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import PartnersMarquee from "../components/PartnersMarquee.jsx";
import id1 from "../assets/img/lael/1.png";
import id3 from "../assets/img/lael/3.png";

/* --- Extrae ID de YouTube --- */
const extractYouTubeId = (url) => {
  try {
    const u = new URL(url);
    if (u.hostname === "youtu.be") return u.pathname.slice(1);
    if (u.searchParams.get("v")) return u.searchParams.get("v");
    const m = u.pathname.match(/\/embed\/([a-zA-Z0-9_-]{6,})/);
    return m ? m[1] : "";
  } catch {
    return "";
  }
};

/* --- Video responsivo --- */
const YouTubeBox = ({
  url = "https://youtu.be/THBr7MOVS0s?si=nODyq69xbCt1TqRr",
  title = "Clase real: PAES M1 (ejercitación guiada)",
}) => {
  const id = extractYouTubeId(url);
  const src = `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1`;
  return (
    <div className="relative pb-[56.25%] rounded-2xl overflow-hidden border border-slate-800 shadow-lg">
      <iframe
        src={src}
        title={title}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
};

export default function Home() {
  return (
    <div className="bg-[#0b1220] text-white">
      {/* HERO */}
      <section className="pt-20 pb-12 border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-5 grid md:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-amber-200 font-bold mb-2">Educación online, cercana y clara</p>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
              PAES, <span className="text-green-400">Idiomas</span> y{" "}
              <span className="text-yellow-400">LSCh</span> con{" "}
              <span className="underline underline-offset-4 decoration-indigo-400">
                acompañamiento real
              </span>.
            </h1>
            <p className="text-slate-200 mb-6">
              Clases en vivo + cápsulas, material descargable y seguimiento.{" "}
              <strong>87%</strong> logra su objetivo y <strong>9 de 10</strong> nos recomiendan.
            </p>

            <div className="flex flex-wrap gap-3 mb-4">
              <Link to="/inscripcion" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-5 py-2.5 rounded-lg shadow-md">
                Inscribirme
              </Link>
              <Link to="/paes" className="border border-slate-700 text-slate-100 hover:bg-slate-800 font-semibold px-5 py-2.5 rounded-lg">
                Ver programas
              </Link>
              <a
                href="https://wa.me/56964626568?text=Hola%20Lael,%20quisiera%20informaci%C3%B3n"
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-4 text-slate-300 hover:text-white"
              >
                WhatsApp
              </a>
            </div>

            <div className="flex flex-wrap gap-2">
              <Chip to="/paes" label="PAES Matemáticas M1" />
              <Chip to="/idiomas" label="Inglés B1–B2" />
              <Chip to="/lsch" label="Lengua de Señas (LSCh)" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col gap-4"
          >
            <YouTubeBox />
            <ul className="flex gap-3 flex-wrap text-sm">
              <li><Link to="/paes" className="px-3 py-1 bg-slate-800 rounded-full font-semibold">PAES</Link></li>
              <li><Link to="/idiomas" className="px-3 py-1 bg-slate-800 rounded-full font-semibold">Idiomas</Link></li>
              <li><Link to="/lsch" className="px-3 py-1 bg-slate-800 rounded-full font-semibold">LSCh</Link></li>
            </ul>
          </motion.div>
        </div>
      </section>

      {/* MARQUEE */}
      <section className="py-4 border-y border-slate-800">
        <div className="max-w-6xl mx-auto px-5">
          <PartnersMarquee speed={32} height={28} gap={48} />
        </div>
      </section>

      {/* TRUST */}
      <section className="py-8">
        <div className="max-w-5xl mx-auto grid sm:grid-cols-3 gap-4 px-5">
          <TrustPill kpi="87%" label="alcanza su meta" />
          <TrustPill kpi="+11.000 h" label="clases en vivo" />
          <TrustPill kpi="9/10" label="nos recomiendan" />
        </div>
      </section>

      {/* PROGRAMAS */}
      <section className="py-14">
        <div className="max-w-6xl mx-auto px-5">
          <header className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">Programas Lael</h2>
            <p className="text-slate-300">Elige tu camino y avanza con acompañamiento real.</p>
          </header>

          <div className="grid md:grid-cols-3 gap-6">
            <ProgramCard title="PAES" tag="Ingreso a la U" accent="indigo" to="/paes"
              text="Planifica ramos o toma un plan con ensayos y tutorías."
              bullets={["M1, M2, Lenguaje, Historia, Ciencias", "Ensayos + retro detallada"]}
            />
            <ProgramCard title="Idiomas" tag="EN · KR" accent="green" to="/idiomas"
              text="Aprende Inglés (B1–B2) o Coreano TOPIK I con práctica real."
              bullets={["Cápsulas + clases en vivo", "Club de conversación"]}
            />
            <ProgramCard title="LSCh" tag="Lengua de Señas" accent="rose" to="/lsch"
              text="Proceso práctico y comunicativo, con proyecto final."
              bullets={["Inicio trimestral", "Acompañamiento docente"]}
            />
          </div>

          <div className="text-center mt-8">
            <Link to="/empresas" className="text-slate-300 hover:text-white underline underline-offset-4">
              Capacitación para empresas →
            </Link>
          </div>
        </div>
      </section>

      {/* HIGHLIGHTS */}
      <section className="py-12 border-t border-slate-800">
        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-6 px-5">
          <Feature icon="📈" title="Acompañamiento medible">Tutorías y reportes simples.</Feature>
          <Feature icon="🧠" title="Clases claras">En vivo + cápsulas con pautas.</Feature>
          <Feature icon="⏱️" title="Flexibilidad real">Grabadas y recuperaciones.</Feature>
          <Feature icon="💳" title="Precio transparente">Matrícula única, sin letra chica.</Feature>
        </div>
      </section>

      {/* IDENTIDAD */}
      <section className="py-14">
        <div className="max-w-6xl mx-auto px-5 text-center">
          <p className="inline-block text-sm border border-slate-700 rounded-full px-3 py-1 mb-3">Quiénes somos</p>
          <h2 className="text-3xl font-bold mb-6">La identidad detrás de nuestro nombre</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <IdCard img={id1} title="Cobertura y propósito" text="Estudiar sin estar solos, guiados y con propósito." />
            <IdCard img={id3} title="La paloma" text="Símbolo de comienzos genuinos y esperanza." />
          </div>
        </div>
      </section>

      {/* TESTIMONIOS */}
      <section className="py-14 border-y border-slate-800">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6 px-5">
          <Quote q="Subí 150 puntos en la PAES. Clases claras y apoyo constante." a="Vicente — M1" />
          <Quote q="Perdí el miedo a hablar inglés. Hoy me expreso con confianza en el trabajo." a="Valentina — Inglés B2" />
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-14 text-center">
        <div className="max-w-xl mx-auto border border-slate-800 rounded-2xl p-8 bg-[#0e1424] shadow-lg">
          <h3 className="text-2xl font-bold mb-3">¿Listo para empezar?</h3>
          <p className="text-slate-300 mb-6">
            Inscríbete en minutos y comienza con clases en vivo, cápsulas y acompañamiento.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-3">
            <Link className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-5 py-2.5 rounded-lg" to="/inscripcion">
              Inscribirme
            </Link>
            <a
              className="border border-slate-700 text-slate-100 hover:bg-slate-800 font-semibold px-5 py-2.5 rounded-lg"
              href="https://wa.me/56964626568?text=Hola%20Lael%20👋%20¿me%20orientan%20para%20elegir%20mi%20plan?"
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp
            </a>
          </div>
          <p className="text-sm text-slate-400">Respondemos de lunes a viernes. Todas las clases quedan grabadas.</p>
        </div>
      </section>
    </div>
  );
}

/* --- Componentes menores --- */
function Chip({ to, label }) {
  return (
    <Link
      to={to}
      className="inline-flex items-center gap-2 border border-slate-700 bg-slate-900/60 rounded-full px-3 py-1 text-sm font-semibold text-white hover:bg-slate-800 transition"
    >
      <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
      {label}
    </Link>
  );
}
function Feature({ icon, title, children }) {
  return (
    <div className="border border-slate-800 rounded-2xl p-5 bg-slate-900/50">
      <div className="text-xl mb-2">{icon}</div>
      <h3 className="font-bold text-lg mb-1">{title}</h3>
      <p className="text-slate-300 text-sm">{children}</p>
    </div>
  );
}
function ProgramCard({ title, tag, text, bullets, to, accent }) {
  const colors = {
    indigo: "from-indigo-500 to-indigo-700",
    green: "from-green-500 to-green-700",
    rose: "from-rose-500 to-rose-700",
  };
  return (
    <div className="bg-white text-slate-900 rounded-xl shadow-md overflow-hidden">
      <div className={`h-2 bg-gradient-to-r ${colors[accent] || "from-indigo-500 to-indigo-700"}`} />
      <div className="p-5">
        <div className="text-xs font-bold uppercase tracking-wide text-slate-500">{tag}</div>
        <h3 className="font-extrabold text-lg mt-1 mb-2">{title}</h3>
        <p className="text-slate-600 mb-3">{text}</p>
        <ul className="text-sm text-slate-600 list-disc pl-5 mb-4">
          {bullets.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
        <Link to={to} className="font-bold text-indigo-600 hover:underline">
          Ver más →
        </Link>
      </div>
    </div>
  );
}
function IdCard({ img, title, text }) {
  return (
    <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-900/60">
      <img src={img} alt={title} loading="lazy" className="aspect-[4/3] object-contain w-full" />
      <div className="p-4">
        <h3 className="font-bold mb-1">{title}</h3>
        <p className="text-slate-300 text-sm">{text}</p>
      </div>
    </div>
  );
}
function Quote({ q, a }) {
  return (
    <blockquote className="border border-slate-800 rounded-xl p-5 bg-slate-900/50">
      <p className="text-slate-100 mb-2 italic">“{q}”</p>
      <footer className="text-slate-400 text-sm">— {a}</footer>
    </blockquote>
  );
}
function TrustPill({ kpi, label }) {
  return (
    <div className="border border-slate-800 rounded-xl bg-slate-900/70 py-3 px-5 text-center">
      <div className="font-extrabold text-xl text-white">{kpi}</div>
      <div className="text-slate-400 text-sm">{label}</div>
    </div>
  );
}