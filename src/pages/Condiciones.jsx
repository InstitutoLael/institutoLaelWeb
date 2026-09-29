import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import PageHero from '../components/ui/PageHero';

// Resumen en lenguaje simple del compromiso educativo que se firma al
// inscribirse. Si cambia el contrato, actualiza este archivo y la fecha.
const ACTUALIZADO = 'septiembre de 2026';

const SECCIONES = [
  {
    id: 'inscripcion',
    t: 'Inscripción y matrícula',
    p: [
      'La matrícula es gratis. Al confirmar tu cupo firmas un compromiso educativo con Instituto Lael SpA, donde queda por escrito todo lo de esta página.',
      'Si eres menor de 18 años, tu mamá, papá o apoderado también firma y queda como responsable.',
    ],
  },
  {
    id: 'pagos',
    t: 'Pagos',
    p: [
      'La mensualidad se paga por adelantado, antes de que termine cada mes, para las clases del mes siguiente. Se paga el programa y no cada clase: el valor es el mismo aunque un mes faltes a alguna.',
      'Si te atrasas, el acceso a clases, material y grabaciones se pausa hasta que te pongas al día.',
      'Si pagaste el semestre o el año por adelantado y te retiras, te devolvemos los meses completos que no alcanzaste a usar, al mismo valor con descuento que pagaste por ellos.',
      'Los descuentos por pago adelantado, hermanos y verano no se suman entre sí: se aplica el que más te convenga. "Trae un amigo" y las becas van aparte.',
    ],
    link: { to: '/como-pagar', label: 'Cómo pagar paso a paso' },
  },
  {
    id: 'clases',
    t: 'Clases',
    p: [
      'Las clases son online y en vivo por Google Meet. El material y los avisos van en Google Classroom.',
      'Te pedimos entrar con la cámara prendida: así el profe ve cuando algo no se entendió. Si un día no puedes, avísale a coordinación.',
      'Si una clase no se puede hacer, la reprogramamos. Si por fuerza mayor tenemos que cambiar un horario o un profe, te avisamos con anticipación.',
    ],
  },
  {
    id: 'grabaciones',
    t: 'Grabaciones',
    p: [
      'Las clases se graban y cada semana compartimos las grabaciones con los alumnos que están al día, en YouTube en modo "no listado": solo las ve quien tiene el link.',
      'Las grabaciones son solo para el curso. No las usamos para publicidad sin tu permiso por escrito, y tú tampoco puedes grabar ni compartir las clases sin autorización de Lael.',
    ],
  },
  {
    id: 'convivencia',
    t: 'Convivencia',
    p: [
      'Lael es un lugar donde nadie se queda afuera, y eso se cuida entre todos. No aceptamos burlas, acoso, discriminación ni amenazas hacia compañeros, profes o el equipo, ni en clases ni por chat o redes.',
      'Una falta grave puede significar la suspensión o la salida del curso. Cada caso lo revisa coordinación con calma.',
      'Copiar en los ensayos o compartir el material de Lael sin permiso también se considera falta.',
    ],
  },
  {
    id: 'traspaso',
    t: 'Si no puedes seguir',
    p: [
      'Puedes traspasar tu cupo a otra persona. Avísanos con al menos cinco días hábiles a coordinacion@institutolael.cl o contacto@institutolael.cl; la persona nueva firma su propio compromiso y paga desde ese mes.',
      'Si te quieres retirar, avísanos por escrito a contacto@institutolael.cl (no sirve un mensaje por redes sociales). Antes de decidir, conversemos: muchas veces se puede cambiar de horario o postular a una beca.',
    ],
  },
  {
    id: 'quorum',
    t: 'Si un curso no se abre',
    p: [
      'Si un curso no alcanza el mínimo de alumnos y no lo podemos abrir, te devolvemos todo lo que hayas pagado en un plazo máximo de diez días hábiles.',
    ],
  },
  {
    id: 'certificados',
    t: 'Certificados',
    p: [
      'En los cursos de idiomas y talleres entregamos un certificado de participación si asististe al menos al 70% de las clases, rendiste las evaluaciones y estás al día.',
      'Es un certificado de Instituto Lael: sirve como respaldo de lo que aprendiste, pero no es un título ni tiene validez oficial ante el Mineduc. En la Escuela de Sueños, el certificado oficial te lo da el Mineduc al aprobar los exámenes libres.',
    ],
  },
  {
    id: 'contacto',
    t: 'Correos oficiales',
    lista: [
      ['contacto@institutolael.cl', 'Consultas generales, solicitudes y retiros'],
      ['pagos@institutolael.cl', 'Comprobantes y dudas de pagos'],
      ['coordinacion@institutolael.cl', 'Horarios, traspasos y temas de clases'],
    ],
  },
];

export default function Condiciones() {
  return (
    <div className="w-full bg-[#F4F4F4] text-[#071D49] overflow-x-clip font-sans">
      <Helmet>
        <title>Condiciones y reglamento | Instituto Lael</title>
        <meta name="description" content="Las condiciones de Instituto Lael en lenguaje simple: matrícula, pagos, clases, grabaciones, convivencia, traspaso de cupo, certificados y correos oficiales." />
      </Helmet>

      <PageHero eyebrow="Lo que acordamos" title="Condiciones" accent="y reglamento.">
        El resumen, en simple, de lo que firmas al inscribirte. Léelo con calma antes de empezar, y si algo no te queda claro, pregúntanos.
      </PageHero>

      <section className="px-5 sm:px-6 py-12 sm:py-16">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-10">
          <nav aria-label="Secciones" className="hidden lg:block">
            <ol className="sticky top-28 space-y-1 text-sm">
              {SECCIONES.map((s, i) => (
                <li key={s.id}><a href={`#${s.id}`} className="block py-1.5 text-[#071D49]/70 hover:text-[#071D49]">{i + 1}. {s.t}</a></li>
              ))}
            </ol>
          </nav>
          <div className="lg:col-span-3 space-y-5">
            {SECCIONES.map((s, i) => (
              <article key={s.id} id={s.id} className="scroll-mt-28 bg-white rounded-[24px] p-6 sm:p-8 border border-[#071D49]/5 shadow-card">
                <h2 className="font-display text-xl sm:text-2xl font-extrabold mb-4"><span className="font-serif italic font-normal text-[#071D49]/40 mr-2">{i + 1}</span>{s.t}</h2>
                {s.p && <div className="space-y-3 text-[#071D49]/80 leading-relaxed">{s.p.map((t) => <p key={t}>{t}</p>)}</div>}
                {s.lista && (
                  <dl className="divide-y divide-[#071D49]/10">
                    {s.lista.map(([mail, d]) => (
                      <div key={mail} className="py-3 flex flex-col sm:flex-row sm:justify-between gap-1">
                        <dt><a href={`mailto:${mail}`} className="font-bold underline underline-offset-4">{mail}</a></dt>
                        <dd className="text-[#071D49]/70 text-sm">{d}</dd>
                      </div>
                    ))}
                  </dl>
                )}
                {s.link && <Link to={s.link.to} className="inline-block mt-4 font-bold underline underline-offset-4">{s.link.label} →</Link>}
              </article>
            ))}
            <p className="text-sm text-[#071D49]/60 px-2">
              Actualizado en {ACTUALIZADO}. Este resumen no reemplaza el compromiso que firmas al inscribirte: si hay diferencias, vale lo firmado. Tus datos se cuidan según la <Link to="/privacidad" className="underline">política de privacidad</Link>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
