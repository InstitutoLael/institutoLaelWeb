import React from 'react';
import { motion } from 'framer-motion';

export default function TeacherCard({ name, role, bio, image, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="group relative bg-white/[0.02] border border-white/5 rounded-3xl p-6 hover:bg-white/[0.05] transition-colors"
    >
      <div className="w-24 h-24 mx-auto mb-6 rounded-full overflow-hidden border-2 border-indigo-500/20 group-hover:border-indigo-500 transition-colors bg-slate-800 flex items-center justify-center text-4xl">
         {image ? (
            <img src={image} alt={name} className="w-full h-full object-cover" loading="lazy" />
         ) : (
            <span>👩‍🏫</span> // Fallback placeholder
         )}
      </div>
      
      <div className="text-center">
        <h3 className="text-xl font-black text-white uppercase tracking-tight mb-1">{name}</h3>
        <p className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-4">{role}</p>
        <p className="text-slate-400 text-sm leading-relaxed">{bio}</p>
      </div>
    </motion.div>
  );
}
