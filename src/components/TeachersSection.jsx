import React from 'react';
import TeacherCard from './TeacherCard';

const TEAM = [
  { name: "Javiera", role: "Head of English", bio: "Especialista en reducción de acento y Business English.", img: null }, // Fallback emoji
  { name: "Fernanda", role: "Korean Tutor", bio: "Enseña con K-Pop y situaciones de la vida real.", img: null },
  { name: "Carlos", role: "Profe de M1/M2", bio: "Ingeniero Civil. Te enseña a hackear la PAES.", img: null },
  { name: "Valentina", role: "Profe de Biología", bio: "Dra. en Ciencias. Hace que la célula sea fácil.", img: null },
];

export default function TeachersSection() {
  return (
    <section className="py-24 bg-[#020617] border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4">
            Conoce a tus Mentores
          </h2>
          <p className="text-slate-400">
             Más que profesores, somos compañeros de ruta.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TEAM.map((member, i) => (
             <TeacherCard key={i} {...member} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}
