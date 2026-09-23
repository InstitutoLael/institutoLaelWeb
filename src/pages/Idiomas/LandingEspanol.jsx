import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Users, ChevronRight, Award, GraduationCap, Bookmark } from 'lucide-react';
import languagesBg from '../../assets/img/Home/idiomas_execution_bg_1777948997295.webp';
import igPost2 from '../../assets/img/Home/media_ig_post_1780733562637.webp';
import CertificateSection from '../../components/CertificateSection';
import {
  fadeUp,
  SECTION,
  EYEBROW_DARK,
  H2,
  BTN_PRIMARY,
  ProgramHero,
  ProgramBlock,
  ReasonsSection,
  PriceCard,
} from './LandingIdiomas';

const BLUE = '#071D49';

const reasons = [
  {
    title: "Profe chileno",
    desc: "Clases con Diego Chaparro, fundador de Lael, que enseña español como segunda lengua y te corrige en el momento.",
    icon: GraduationCap,
  },
  {
    title: "Progresión por niveles",
    desc: "Niveles basados en el Marco Común Europeo (MCER), con lo que vas a aprender en cada etapa definido desde el inicio.",
    icon: Bookmark,
  },
  {
    title: "Certificación Lael",
    desc: "Al aprobar cada nivel recibes un certificado del Instituto Lael que indica el nivel alcanzado.",
    icon: Award,
  },
  {
    title: "Comunidad de práctica",
    desc: "Sesiones de conversación con otros alumnos, para que uses el español como lo harías en la calle o en la pega.",
    icon: Users,
  },
];

const plan = {
  name: 'Español para Extranjeros',
  flag: '🇨🇱',
  enrollment: 'gratis',
  priceMonthly: '$14.990',
  features: ['Modismos y chilenismos', 'Práctica de entrevistas de trabajo', 'Material de estudio incluido', 'Dudas por WhatsApp en horario hábil'],
  link: 'https://forms.gle/H86nFAQ2DJ8CCQ7y6',
};

export default function LandingEspanol() {
  return (
    <div className="w-full bg-[#F4F4F4] text-[#071D49] overflow-x-clip font-sans">
      <Helmet>
        <title>Español para Extranjeros | Instituto Lael - Chile</title>
        <meta name="description" content="Curso online de español para extranjeros que viven en Chile o trabajan con equipos chilenos. Clases en vivo, modismos y español para el trabajo." />
      </Helmet>

      {/* ── 1. HERO ─────────────────────────────────────────────────── */}
      <ProgramHero
        bg={languagesBg}
        eyebrow="ESPAÑOL PARA EXTRANJEROS"
        heading={<>Chile también <br /> es tu <span className="text-[#D7E400]">casa.</span></>}
        desc="Llegaste a un país donde el español suena distinto. Te enseñamos a entender los chilenismos, a moverte en el trabajo y a conversar tranquilo con tus vecinos y amigos."
      >
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => document.getElementById('detalles')?.scrollIntoView({ behavior: 'smooth' })}
            className={BTN_PRIMARY}
          >
            <span>CONOCER PROGRAMA</span>
            <ChevronRight size={16} aria-hidden="true" />
          </button>
        </div>
      </ProgramHero>

      {/* ── 2. DETALLES DEL PROGRAMA ────────────────────────────────── */}
      <ProgramBlock
        id="detalles"
        badge="ESPAÑOL EN CHILE"
        title="Español para Extranjeros"
        desc="Es para ti si vives en Chile o trabajas con un equipo chileno. En clase practicamos reuniones de pega, conversaciones del día a día, modismos y cómo se trabaja acá."
        levelsTitle="Tus niveles de español"
        levels={[['A1', 'Nivel 1'], ['A2', 'Nivel 2'], ['B1', 'Intermedio']]}
        ig={{ img: igPost2, tag: 'Español', caption: '¿Te perdiste con un "cachai" o un "al tiro"? Te lo explicamos. Clases en vivo, con harta conversación.', ago: 'hace 1 día' }}
      />

      {/* ── 3. ¿POR QUÉ APRENDER CON LAEL? ──────────────────────────── */}
      <ReasonsSection reasons={reasons} gray />

      {/* ── 4. CERTIFICADOS POR NIVEL ───────────────────────────────── */}
      <CertificateSection defaultLevel="B1" defaultLanguage="Español para Extranjeros" />

      {/* ── 5. PRECIO ───────────────────────────────────────────────── */}
      <section className={`${SECTION} text-center`} style={{ backgroundColor: BLUE }}>
        <div className="max-w-6xl mx-auto w-full">
          <motion.p {...fadeUp(0)} className={`${EYEBROW_DARK} mb-4`}>Precio</motion.p>
          <motion.h2 {...fadeUp(0.1)} className={`${H2} text-white mb-10 sm:mb-14`}>CUÁNTO CUESTA</motion.h2>
          <div className="max-w-md mx-auto">
            <PriceCard plan={plan} note="✨ Trimestral: $11.990/mes (ahorra pagando 3 meses juntos)" />
          </div>
        </div>
      </section>
    </div>
  );
}
