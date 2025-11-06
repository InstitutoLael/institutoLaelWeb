// src/pages/EscuelaAdultos.jsx
import { GraduationCap, Clock, Users2, CheckCircle2 } from "lucide-react";

export default function EscuelaAdultos() {
  return (
    <div className="adultos">
      <style>{css}</style>

      {/* HERO SIMPLIFICADO */}
      <section className="hero">
        <div className="container hero-inner">
          <div className="text">
            <h1>Termina tus estudios <span>con apoyo real</span></h1>
            <p>
              Programa flexible para personas adultas (18+) que necesitan completar
              su enseñanza Básica o Media, incluyendo quienes retoman tras años,
              migran desde <strong>homeschool</strong> o buscan reinserción educativa.
            </p>

            <div className="actions">
              <a
                href="https://wa.me/56964626568"
                className="btn btn-primary"
                target="_blank"
                rel="noreferrer"
              >
                Hablar por WhatsApp
              </a>
              <a href="/inscripcion" className="btn btn-outline">
                Preinscribirme
              </a>
            </div>
          </div>

          <div className="icon">
            <GraduationCap size={140} strokeWidth={1.5} />
          </div>
        </div>
      </section>

      {/* INFO SIMPLE */}
      <section className="info">
        <div className="container grid">
          <div className="item">
            <Users2 size={40} />
            <h3>¿A quién va dirigido?</h3>
            <p>
              Adultos que no completaron sus estudios, jóvenes desde 18 años que dejan homeschool
              o personas en proceso de reinserción educativa.
            </p>
          </div>

          <div className="item">
            <Clock size={40} />
            <h3>Horarios y modalidad</h3>
            <p>
              Clases 100% online, <strong>en vivo</strong> y quedan grabadas.
              Modalidad tarde/noche para compatibilizar con trabajo o familia.
            </p>
          </div>

          <div className="item">
            <CheckCircle2 size={40} />
            <h3>Certificación</h3>
            <p>
              Alinéado a los <strong>Exámenes Libres del Mineduc</strong>, con acompañamiento
              semanal y planificación personalizada por tramo.
            </p>
          </div>
        </div>
      </section>

      {/* RUTAS */}
      <section className="rutas">
        <div className="container">
          <h2>Elige tu ruta</h2>
          <div className="steps">
            <div><span>1° a 8° Básico</span> <p>Alfabetización académica, cálculo base y comprensión lectora.</p></div>
            <div><span>1° y 2° Medio</span> <p>Refuerzo de bases, lenguaje, matemáticas y ciencias.</p></div>
            <div><span>3° y 4° Medio</span> <p>Preparación intensiva y simulacros de Exámenes Libres.</p></div>
          </div>
        </div>
      </section>

      {/* APOYOS */}
      <section className="apoyos">
        <div className="container inner">
          <div>
            <h2>Apoyos y becas (caso a caso)</h2>
            <p>
              Evaluamos <strong>apoyos económicos</strong> según tu situación (prioridad: reinserción y jefas de hogar).
              No son becas masivas: cada caso se revisa con cuidado.
            </p>
          </div>
          <div className="actions">
            <a
              href="https://wa.me/56964626568"
              className="btn btn-primary"
              target="_blank"
              rel="noreferrer"
            >
              Consultar por apoyo
            </a>
            <a href="/inscripcion" className="btn btn-outline">
              Preinscribirme
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq container">
        <details>
          <summary>¿Puedo trabajar y estudiar?</summary>
          <p>Sí. Las clases son PM y quedan grabadas para repasar.</p>
        </details>
        <details>
          <summary>¿Sirve para Exámenes Libres?</summary>
          <p>Todo el plan está alineado al Mineduc para rendir por tramo.</p>
        </details>
        <details>
          <summary>¿Puedo combinar con Preu?</summary>
          <p>Sí, diseñamos trayectos combinados Adultos + Preu.</p>
        </details>
      </section>

      {/* CTA FINAL */}
      <section className="cta-final">
        <div className="container">
          <h3>Nunca es tarde para terminar el colegio.</h3>
          <p>Estudia con método, en la tarde y con acompañamiento real.</p>
          <div className="actions">
            <a href="https://wa.me/56964626568" target="_blank" rel="noreferrer" className="btn btn-primary">
              Hablar por WhatsApp
            </a>
            <a href="/inscripcion" className="btn btn-outline">Preinscribirme</a>
          </div>
        </div>
      </section>
    </div>
  );
}

const css = `
.adultos { color:#eaf2ff; background:#0b1220; }
.container{ width:min(1100px, 90vw); margin:0 auto; }

/* HERO */
.hero{
  background:linear-gradient(135deg,#0b1220,#111a2f 80%);
  padding:90px 0 60px; text-align:left;
}
.hero-inner{ display:flex; justify-content:space-between; align-items:center; gap:40px; flex-wrap:wrap; }
.hero h1{ font-size:clamp(2rem,3.4vw,3rem); line-height:1.2; margin:0 0 14px; }
.hero h1 span{ color:#fbbf24; }
.hero p{ max-width:600px; opacity:.9; }
.hero .icon{ color:#fbbf24; opacity:.85; }
.actions{ display:flex; gap:12px; margin-top:18px; }
.btn{ padding:.8rem 1.2rem; border-radius:10px; font-weight:700; text-decoration:none; border:1px solid transparent; }
.btn-primary{ background:#fbbf24; color:#0b1220; border-color:#d97706; }
.btn-outline{ background:transparent; border-color:#2f3341; color:#eaf2ff; }

/* INFO */
.info{ background:#0c152b; padding:60px 0; }
.grid{ display:grid; gap:20px; grid-template-columns:repeat(auto-fit,minmax(280px,1fr)); text-align:left; }
.item{ border:1px solid #1f2a44; border-radius:16px; background:#0e162c; padding:20px; }
.item h3{ margin:.4rem 0; }
.item p{ opacity:.9; }

/* RUTAS */
.rutas{ padding:60px 0; text-align:center;
  background: radial-gradient(900px 300px at 20% 120%, rgba(34,211,238,.12), transparent 60%),
              radial-gradient(900px 300px at 120% -20%, rgba(88,80,236,.12), transparent 60%),
              #0b1220;
}
.steps{ display:grid; grid-template-columns:repeat(auto-fit,minmax(250px,1fr)); gap:16px; margin-top:20px; }
.steps div{ border:1px solid #22304d; border-radius:16px; background:#0f172a; padding:18px; }
.steps span{ font-weight:900; color:#22d3ee; }

/* APOYOS */
.apoyos{ padding:60px 0; background:#0c1428; border-top:1px solid #1f2a44; }
.inner{ display:flex; justify-content:space-between; gap:20px; flex-wrap:wrap; align-items:center; }
.inner .actions{ flex-shrink:0; display:flex; gap:10px; }

/* FAQ */
.faq{ padding:40px 0; display:grid; gap:10px; }
details{ border:1px solid #22304d; border-radius:12px; background:#0f172a; padding:10px 12px; }
summary{ font-weight:800; cursor:pointer; }
summary::marker{ color:#fbbf24; }

/* CTA FINAL */
.cta-final{
  background:linear-gradient(90deg,rgba(245,158,11,.15),rgba(88,80,236,.12)),#0b1220;
  text-align:center; padding:60px 0;
}
.cta-final .actions{ margin-top:14px; display:flex; gap:10px; justify-content:center; flex-wrap:wrap; }

/* RESPONSIVE */
@media(max-width:700px){
  .hero-inner{ text-align:center; justify-content:center; }
  .hero .icon{ display:none; }
}
`;