import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

// Política de privacidad según la Ley 19.628 y la Ley 21.719 (vigente desde
// el 1 de diciembre de 2026). Si cambia qué datos se piden o con quién se
// comparten, actualizar esta página y la fecha.
const UPDATED = '23 de septiembre de 2026';
const EMAIL = 'contacto@institutolael.cl';

const SECTIONS = [
  {
    title: '1. Quiénes somos',
    body: [
      `Instituto Lael SpA ("Lael") es responsable de los datos personales que nos entregas. Somos un instituto online con base en Santiago de Chile. Para cualquier tema de privacidad escríbenos a ${EMAIL} o por WhatsApp al +56 9 6462 6568.`,
    ],
  },
  {
    title: '2. Qué datos pedimos',
    list: [
      'Cuando te inscribes, postulas a una beca o nos dejas un testimonio (formularios de Google): nombre, correo, teléfono, curso o nivel, programa que te interesa y, si eres menor de 18, los datos de tu apoderado.',
      'Cuando nos escribes por WhatsApp o correo: lo que nos cuentes y tu número o correo.',
      'Si eres alumno: tu asistencia, tus resultados en ensayos y las grabaciones de clases en que participas.',
      'Si postulas a una beca: la información sobre tu situación que decidas compartir para evaluarla.',
      'Cuando navegas el sitio: datos de uso anónimos a través de Google Analytics (páginas visitadas, tipo de dispositivo, ciudad aproximada). El diagnóstico gratuito guarda tus respuestas solo en tu navegador.',
    ],
  },
  {
    title: '3. Para qué los usamos',
    list: [
      'Inscribirte, organizar tus clases y darte acceso a Google Meet, Classroom y las grabaciones.',
      'Contactarte a ti o a tu apoderado sobre clases, pagos y avisos importantes.',
      'Evaluar postulaciones a becas.',
      'Publicar testimonios, solo si nos diste permiso y de la forma que elegiste (nombre completo o iniciales).',
      'Mejorar el sitio con estadísticas generales de visitas.',
    ],
    after: 'No vendemos tus datos ni los usamos para nada distinto de lo que dice aquí.',
  },
  {
    title: '4. En qué nos basamos para usarlos',
    body: [
      'Usamos tus datos porque tú los entregas para inscribirte o contactarnos (tu consentimiento) y porque los necesitamos para darte el servicio que contratas. Las boletas y registros de pago los guardamos porque la ley tributaria lo exige.',
    ],
  },
  {
    title: '5. Menores de edad',
    body: [
      'Muchos de nuestros alumnos son menores de edad. Si tienes menos de 14 años, tu madre, padre o apoderado debe autorizar la inscripción. Entre los 14 y 17 años pedimos igual los datos de tu apoderado para mantenerlo informado. Los datos de menores los tratamos con especial cuidado y nunca los publicamos sin autorización.',
    ],
  },
  {
    title: '6. Con quién los compartimos',
    list: [
      'Google (Forms, Meet, Classroom, Workspace y Analytics), que usamos para las inscripciones, las clases y las estadísticas del sitio.',
      'WhatsApp (Meta), cuando nos escribes por ahí.',
      'MercadoPago, si pagas por ese medio.',
      'Los profesores de tus ramos, solo lo necesario para hacerte clases.',
    ],
    after: 'Algunos de estos servicios guardan información fuera de Chile. Los elegimos porque cumplen estándares reconocidos de seguridad.',
  },
  {
    title: '7. Cuánto tiempo los guardamos',
    body: [
      'Mientras seas alumno y hasta 2 años después de terminar, por si vuelves o necesitas un certificado. Las grabaciones de clases se guardan durante el año académico. Los registros de pago se guardan por el plazo que exige la ley tributaria. Si no te inscribes, borramos tus datos de contacto dentro de 1 año.',
    ],
  },
  {
    title: '8. Tus derechos',
    body: [
      'Puedes pedirnos en cualquier momento:',
    ],
    list: [
      'Acceso: saber qué datos tuyos tenemos.',
      'Rectificación: corregir datos equivocados.',
      'Supresión: que borremos tus datos.',
      'Oposición: que dejemos de usarlos para algo.',
      'Portabilidad: recibir tus datos en un formato que puedas llevar a otro lugar.',
      'Bloqueo: que suspendamos su uso mientras revisamos una solicitud.',
    ],
    after: `Escríbenos a ${EMAIL} indicando qué necesitas. Te responderemos dentro del plazo que fija la ley. Si no quedas conforme, puedes recurrir a la Agencia de Protección de Datos Personales.`,
  },
  {
    title: '9. Cómo los cuidamos',
    body: [
      'Solo el equipo de Lael que los necesita tiene acceso a tus datos, usamos cuentas institucionales protegidas y no guardamos contraseñas ni datos de tarjetas: los pagos los procesa MercadoPago o se hacen por transferencia.',
    ],
  },
  {
    title: '10. Cambios a esta política',
    body: [
      'Si cambiamos algo importante, lo publicaremos en esta página y te avisaremos si eres alumno.',
    ],
  },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
});

export default function Privacidad() {
  return (
    <div className="w-full bg-[#F4F4F4] text-[#071D49] font-sans">
      <Helmet>
        <title>Política de Privacidad | Instituto Lael</title>
        <meta name="description" content="Qué datos personales pide Instituto Lael, para qué los usa, con quién los comparte y cómo puedes ejercer tus derechos." />
      </Helmet>

      <section className="px-6 pt-32 pb-12">
        <div className="max-w-3xl mx-auto">
          <motion.p {...fadeUp(0)} className="text-[10px] font-bold uppercase tracking-[0.4em] mb-4">Tus datos</motion.p>
          <motion.h1 {...fadeUp(0.1)} className="font-display text-4xl sm:text-5xl font-extrabold uppercase tracking-[-0.03em] mb-6">
            Política de privacidad
          </motion.h1>
          <motion.p {...fadeUp(0.2)} className="text-[#8D8D8D] leading-relaxed">
            Te contamos en simple qué datos te pedimos, para qué y qué puedes hacer con ellos. Última actualización: {UPDATED}.
          </motion.p>
        </div>
      </section>

      <section className="px-6 pb-28">
        <div className="max-w-3xl mx-auto bg-white rounded-[32px] p-8 sm:p-12 border border-[#071D49]/5 space-y-10">
          {SECTIONS.map((s) => (
            <div key={s.title}>
              <h2 className="font-display text-lg sm:text-xl font-extrabold uppercase tracking-tight mb-4">{s.title}</h2>
              {s.body?.map((p) => (
                <p key={p} className="text-[#071D49]/80 leading-relaxed mb-3">{p}</p>
              ))}
              {s.list && (
                <ul className="space-y-2 mb-3">
                  {s.list.map((li) => (
                    <li key={li} className="flex gap-3 text-[#071D49]/80 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#071D49] mt-2.5 flex-shrink-0" />
                      <span>{li}</span>
                    </li>
                  ))}
                </ul>
              )}
              {s.after && <p className="text-[#071D49]/80 leading-relaxed">{s.after}</p>}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
