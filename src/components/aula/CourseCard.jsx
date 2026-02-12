import React from 'react';
import { Link } from 'react-router-dom';
import { Play } from 'lucide-react';
import ProgressRing from './ProgressRing';

export default function CourseCard({ course, progress = 0 }) {
  // Determine gradient based on color prop
  const getGradient = (color) => {
    switch (color) {
      case 'blue': return 'from-blue-600 to-indigo-600';
      case 'orange': return 'from-orange-500 to-red-500';
      case 'violet': return 'from-violet-600 to-fuchsia-600';
      case 'emerald': return 'from-emerald-500 to-teal-500';
      case 'cyan': return 'from-cyan-500 to-blue-500';
      case 'amber': return 'from-amber-500 to-orange-500';
      default: return 'from-indigo-600 to-purple-600';
    }
  };

  return (
    <Link 
      to={`/aula/curso/${course.id}`}
      className="group relative bg-[#18181b] border border-white/5 rounded-3xl overflow-hidden hover:border-white/20 transition-all duration-300 hover:-translate-y-1 block"
    >
      {/* Header / Image Placeholder */}
      <div className={`h-24 bg-gradient-to-r ${getGradient(course.color)} opacity-20 group-hover:opacity-30 transition-opacity`} />
      
      <div className="absolute top-4 left-4">
         <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center text-xl shadow-lg border border-white/10">
            {course.icon}
         </div>
      </div>

      <div className="absolute top-4 right-4">
        <ProgressRing progress={progress} radius={24} stroke={3} color={course.color === 'emerald' ? '#10b981' : '#6366f1'} />
      </div>
      
      <div className="p-6 pt-2">
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">{course.instructor}</p>
        <h3 className="text-white font-bold text-lg leading-tight mb-4 group-hover:text-amber-400 transition-colors">
          {course.title}
        </h3>
        
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
           <span className="text-xs text-slate-400 font-medium">
              {course.modules?.length || 0} Módulos
           </span>
           <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white group-hover:bg-amber-500 group-hover:text-black transition-colors">
              <Play size={14} fill="currentColor" />
           </div>
        </div>
      </div>
    </Link>
  );
}
