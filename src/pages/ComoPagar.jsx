import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Mail, CalendarClock, Landmark, Receipt, BadgePercent } from 'lucide-react';
import PageHero, { SectionTitle, fadeUp, SECTION, BTN_YELLOW } from '../components/ui/PageHero';
import { whatsappUrl } from '../lib/backend';
import { DESCUENTO_SEMESTRE, DESCUENTO_ANIO, DESCUENTO_HERMANOS, DESCUENTOS_NOTA } from '../data/paes';

// Cómo se paga en Lael. El número de cuenta NO se publica aquí: llega por
// correo a quien se inscribe (así nadie lo copia para estafar).
const PASOS = [
  { icon: Receipt, t: 'Te inscribes', d: 'La matrícula es gratis. Te escribimos para confirmar tus ramos y tu horario.' },
  { icon: Landmark, t: 'Transfieres la mensualidad', d: 'A la cuenta de Instituto Lael SpA en Mercado Pago. Los datos completos te llegan por correo cuando confirmamos tu cupo.' },
  { icon: Mail, t: 'Mandas el comprobante', d: 'A pagos@institutolael.cl, con tu nombre y tu programa. Con eso quedas al día.' },
];

const REGLAS = [
  { t: 'Se paga por adelantado', d: `La mensualidad se paga antes de que termine cada mes, para las clases del mes siguiente. Si prefieres, pagas el semestre (${DESCUENTO_SEMESTRE}% menos) o el año (${DESCUENTO_ANIO}% menos) de una vez.` },
  { t: 'Pagas el programa, no la clase', d: 'El valor es el mismo si un mes vas a todas las clases o faltas a alguna. Para eso están las grabaciones.' },
  { t: 'Si te atrasas', d: 'El acceso a clases y grabaciones se pausa hasta que te pongas al día. Si estás complicado, escríbenos antes: casi siempre hay una solución.' },
  { t: 'Si una clase no se hace', d: 'La reprogramamos. Estás pagando por ella.' },
];

const DESCUENTOS = [
  { t: 'Plan Completo PAES', d: 'Con 4 ramos o más, nunca pagas sobre $34.990 al mes, y la orientación vocacional va incluida.', to: '/paes' },
  { t: 'Pago por adelantado', d: `Pagando el semestre ahorras un ${DESCUENTO_SEMESTRE}%. Pagando el año, un ${DESCUENTO_ANIO}%.`, to: '/paes#planes' },
  { t: 'Hermanos', d: `Desde el segundo hermano en Lael, cada uno paga un ${DESCUENTO_HERMANOS}% menos.`, to: '/paes#planes' },
  { t: 'Vienes del verano', d: 'Si hiciste el Arranque PAES en enero, tu primer mes de marzo sale a mitad de precio.', to: '/verano' },
  { t: 'Trae un amigo', d: 'Por cada amigo que se inscribe y paga, tu siguiente mes baja un 20%.', to: '/trae-un-amigo' },
  { t: 'Inglés trimestral', d: 'Pagando el trimestre, el mes te sale $11.990 en vez de $14.990.', to: '/idiomas' },
  { t: 'Becas parciales', d: 'Si el costo es un problema, postula. Lo revisamos caso a caso.', to: '/becas' },
  { t: 'Escuela de Sueños', d: 'Terminar el colegio con nosotros es gratis, para mayores de 18.', to: '/adultos' },
];

export default function ComoPagar() {
  return (
    <div className="w-full bg-[#F4F4F4] text-[#071D49] overflow-x-clip font-sans">
      <Helmet>
        <title>Cómo pagar | Instituto Lael</title>
        <meta name="description" content="Cómo se paga en Instituto Lael: matrícula gratis, mensualidad por transferencia a Instituto Lael SpA y comprobante a pagos@institutolael.cl. Descuentos y becas." />
      </Helmet>

      <PageHero eyebrow="Para apoderados y alumnos" title="Cómo" accent="pagar.">
        Sin letra chica: la matrícula es gratis, la mensualidad se paga por transferencia y el comprobante va a un solo correo.
      </PageHero>

      <section className={`${SECTION} bg-white`}>
        <div className="max-w-5xl mx-auto">
          <SectionTitle eyebrow="Paso a paso" title="Tres pasos" accent="y listo." className="text-center mb-10" />
          <ol className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {PASOS.map((p, i) => (
              <motion.li key={p.t} {...fadeUp(i * 0.05)} className="rounded-[24px] p-6 bg-[#F4F4F4] border border-[#071D49]/5">
                <div className="w-12 h-12 rounded-2xl bg-[#071D49] flex items-center justify-center mb-4"><p.icon size={22} className="text-white" /></div>
                <h3 className="font-display font-extrabold text-lg mb-1.5">{i + 1}. {p.t}</h3>
                <p className="text-[#071D49]/70 text-sm leading-relaxed">{p.d}</p>
              </motion.li>
            ))}
          </ol>
          <div className="mt-8 rounded-[24px] bg-[#071D49] text-white p-6 sm:p-8 grid sm:grid-cols-3 gap-5">
            <div><p className="text-xs uppercase tracking-[0.15em] font-bold text-white/60 mb-1">Titular</p><p className="font-bold">Instituto Lael SpA</p></div>
            <div><p className="text-xs uppercase tracking-[0.15em] font-bold text-white/60 mb-1">RUT</p><p className="font-bold">78.084.019-6</p></div>
            <div><p className="text-xs uppercase tracking-[0.15em] font-bold text-white/60 mb-1">Comprobantes</p><a href="mailto:pagos@institutolael.cl" className="font-bold underline underline-offset-4 text-[#D7E400]">pagos@institutolael.cl</a></div>
            <p className="sm:col-span-3 text-sm text-white/70 border-t border-white/10 pt-4">
              Por seguridad, el número de cuenta no lo publicamos aquí: te llega por correo cuando confirmamos tu cupo. Si alguien te pide transferir a otra cuenta o a nombre de otra persona, no lo hagas y avísanos.
            </p>
          </div>
        </div>
      </section>

      <section className={SECTION}>
        <div className="max-w-5xl mx-auto">
          <SectionTitle eyebrow="Lo importante" title="Cómo funciona" accent="la mensualidad." className="mb-8" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {REGLAS.map((r, i) => (
              <motion.div key={r.t} {...fadeUp(i * 0.04)} className="rounded-[24px] p-6 bg-white border border-[#071D49]/5 shadow-card">
                <CalendarClock size={22} className="mb-3" aria-hidden="true" />
                <h3 className="font-display font-extrabold text-lg mb-1">{r.t}</h3>
                <p className="text-[#071D49]/70 leading-relaxed">{r.d}</p>
              </motion.div>
            ))}
          </div>
          <p className="mt-6 text-sm text-[#071D49]/70">Todo esto también está en las <Link to="/condiciones" className="underline font-semibold">condiciones y reglamento</Link>.</p>
        </div>
      </section>

      <section className={`${SECTION} bg-white`}>
        <div className="max-w-5xl mx-auto">
          <SectionTitle eyebrow="Para que te alcance" title="Descuentos" accent="y becas." className="mb-8" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {DESCUENTOS.map((d) => (
              <Link key={d.t} to={d.to} className="group rounded-[24px] p-6 bg-[#F4F4F4] border border-[#071D49]/5 hover:border-[#071D49]/20 transition-colors flex gap-4">
                <BadgePercent size={24} className="flex-shrink-0 mt-0.5" aria-hidden="true" />
                <span>
                  <span className="block font-display font-extrabold text-lg mb-1">{d.t}</span>
                  <span className="block text-[#071D49]/70 leading-relaxed">{d.d}</span>
                </span>
              </Link>
            ))}
          </div>
          <p className="mt-5 text-sm text-[#071D49]/70">{DESCUENTOS_NOTA}</p>
          <div className="mt-10 flex flex-col sm:flex-row gap-3 items-center justify-center">
            <a href="/inscripcion" className={BTN_YELLOW}>Inscribirme <ArrowRight size={16} /></a>
            <a href={whatsappUrl('Hola, tengo una duda sobre los pagos en Lael')} target="_blank" rel="noopener noreferrer" className="min-h-[44px] inline-flex items-center font-semibold underline">Tengo una duda sobre pagos</a>
          </div>
        </div>
      </section>
    </div>
  );
}
