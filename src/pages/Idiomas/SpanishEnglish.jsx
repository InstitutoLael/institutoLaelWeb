import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Check, MessageCircle } from 'lucide-react';
import PageHero, { SectionTitle, fadeUp, SECTION, BTN_YELLOW } from '../../components/ui/PageHero';
import BrandArcs from '../../components/ui/BrandArcs';
import { whatsappUrl } from '../../lib/backend';

// English version of /espanol, for people who search for Spanish classes in
// English. Same program, same price.
const FOR_YOU = [
  { t: 'You just moved to Chile', d: 'Chilean Spanish sounds different: it is fast, people drop letters and use words you won\'t find in a textbook.' },
  { t: 'You work with a Chilean team', d: 'Meetings, emails and small talk at the office. We practice the situations you actually face at work.' },
  { t: 'You want to feel at home', d: 'Talk to your neighbours, go to the doctor, sort out paperwork and make friends without switching to English.' },
];

const LEVELS = [
  { code: 'A1', t: 'Getting started', d: 'Introduce yourself, numbers, daily routines, shopping and asking for directions.' },
  { code: 'A2', t: 'Getting by', d: 'Past and future, telling stories, dealing with services and appointments.' },
  { code: 'B1', t: 'Holding a conversation', d: 'Opinions, work meetings, job interviews and the Chilean expressions everyone uses.' },
];

const INCLUDES = ['Live classes on Google Meet with Diego Chaparro', 'Chilean slang and expressions ("cachai", "al tiro", "fome")', 'Job interview and work meeting practice', 'Weekly class recordings', 'Study material in Google Classroom', 'Lael certificate for each level'];

const FAQ = [
  { q: 'Do I need to speak some Spanish already?', a: 'No. If you are starting from zero you begin at A1. If you already speak some Spanish, we check your level in the first class.' },
  { q: 'When are the classes?', a: 'Classes are live on Google Meet, on Chile time. We agree on the schedule when you sign up, and every class is recorded.' },
  { q: 'How do I pay?', a: 'By monthly bank transfer to Instituto Lael SpA, a Chilean company. You get the payment details by email when your spot is confirmed. There is no enrollment fee.' },
  { q: 'Is the certificate official?', a: 'It is a certificate from Instituto Lael stating the level you reached (CEFR). It is useful for your CV, but it is not an official government exam.' },
];

export default function SpanishEnglish() {
  return (
    <div lang="en" className="w-full bg-[#F4F4F4] text-[#071D49] overflow-x-clip font-sans">
      <Helmet>
        <title>Spanish classes in Chile, online and live | Instituto Lael</title>
        <meta name="description" content="Online Spanish classes for foreigners living in Chile or working with Chilean teams. Live on Google Meet, Chilean slang included. CLP $14,990 per month, no enrollment fee." />
        <link rel="alternate" hrefLang="es" href="https://www.institutolael.cl/espanol" />
        <link rel="alternate" hrefLang="en" href="https://www.institutolael.cl/en/spanish" />
      </Helmet>

      <PageHero eyebrow="Spanish for foreigners" title="Chile can feel" accent="like home." size="lg">
        <p>Learn the Spanish people actually speak here. Live online classes, lots of conversation and all the Chilean expressions nobody explains to you.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
          <a href="/inscripcion?programa=espanol" className={BTN_YELLOW}>Sign up <ArrowRight size={16} /></a>
          <a href={whatsappUrl('Hi! I would like more information about the Spanish classes.')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 min-h-[48px] px-7 py-4 rounded-2xl font-display font-extrabold text-xs sm:text-sm uppercase tracking-wider text-white border-2 border-white/30 hover:bg-white/10">
            <MessageCircle size={16} /> Ask on WhatsApp
          </a>
        </div>
        <p className="mt-6 text-sm"><Link to="/espanol" lang="es" hrefLang="es" className="underline underline-offset-4 text-white/80 hover:text-white">Ver esta página en español</Link></p>
      </PageHero>

      <section className={`${SECTION} bg-white`}>
        <div className="max-w-6xl mx-auto">
          <SectionTitle eyebrow="Who it is for" title="Sound" accent="familiar?" className="text-center mb-10" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {FOR_YOU.map((f, i) => (
              <motion.div key={f.t} {...fadeUp(i * 0.05)} className="rounded-[24px] p-6 bg-[#F4F4F4] border border-[#071D49]/5">
                <h3 className="font-display font-extrabold text-lg mb-2">{f.t}</h3>
                <p className="text-[#071D49]/70 text-sm leading-relaxed">{f.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className={SECTION}>
        <div className="max-w-5xl mx-auto">
          <SectionTitle eyebrow="Levels" title="Step by" accent="step." className="text-center mb-10" />
          <ol className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {LEVELS.map((l, i) => (
              <motion.li key={l.code} {...fadeUp(i * 0.05)} className="rounded-[24px] p-6 bg-white border border-[#071D49]/5 shadow-card">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-12 h-12 rounded-2xl bg-[#071D49] text-programa font-display font-extrabold flex items-center justify-center">{l.code}</span>
                  <h3 className="font-display font-extrabold text-lg">{l.t}</h3>
                </div>
                <p className="text-[#071D49]/70 text-sm leading-relaxed">{l.d}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      <section className={`${SECTION} relative bg-[#071D49] text-white overflow-hidden`}>
        <BrandArcs />
        <div className="relative max-w-3xl mx-auto text-center">
          <SectionTitle eyebrow="No enrollment fee" title="CLP $14,990" accent="a month." dark />
          <p className="text-white/75 mt-3 mb-8">Or CLP $11,990 a month if you pay three months at a time.</p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-left max-w-2xl mx-auto mb-10">
            {INCLUDES.map((t) => <li key={t} className="flex gap-2 text-white/85 text-sm"><Check size={16} className="text-programa flex-shrink-0 mt-0.5" aria-hidden="true" /> {t}</li>)}
          </ul>
          <a href="/inscripcion?programa=espanol" className={BTN_YELLOW}>Save my spot <ArrowRight size={16} /></a>
          <p className="text-white/60 text-xs mt-4">The sign-up form is in Spanish. If you get stuck, message us on WhatsApp and we will help you in English.</p>
        </div>
      </section>

      <section className={SECTION}>
        <div className="max-w-3xl mx-auto">
          <SectionTitle title="Questions" accent="& answers." className="text-center mb-8" />
          <div className="space-y-3">
            {FAQ.map((q) => (
              <details key={q.q} className="group rounded-2xl bg-white border border-[#071D49]/5 p-5 open:shadow-card">
                <summary className="font-display font-bold cursor-pointer list-none flex justify-between gap-4">{q.q}<span aria-hidden="true" className="transition-transform group-open:rotate-45 text-xl leading-none">+</span></summary>
                <p className="mt-3 text-[#071D49]/75 leading-relaxed">{q.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
