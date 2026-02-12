import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, CheckCircle, Circle, PlayCircle, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ModuleAccordion({ module, courseId, progressData = {} }) {
  const [isOpen, setIsOpen] = useState(false);
  
  // Calculate module completion based on provided progressData map
  const completedCount = module.lessons.filter(l => progressData[l.id]).length;
  const totalCount = module.lessons.length;
  const isCompleted = totalCount > 0 && completedCount === totalCount;

  return (
    <div className="border border-white/5 bg-white/[0.02] rounded-2xl overflow-hidden mb-4">
      
      {/* Header Trigger */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 hover:bg-white/[0.02] transition-colors text-left"
      >
        <div className="flex items-center gap-4">
           {isCompleted ? (
              <CheckCircle className="text-emerald-500" size={20} />
           ) : (
              <div className="w-5 h-5 rounded-full border-2 border-slate-600" />
           )}
           <div>
              <h4 className={`font-bold text-sm ${isCompleted ? 'text-slate-400 line-through' : 'text-white'}`}>
                 {module.title}
              </h4>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">
                 {completedCount} / {totalCount} Lecciones
              </p>
           </div>
        </div>
        
        <ChevronDown 
           className={`text-slate-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
           size={20} 
        />
      </button>

      {/* Content */}
      <AnimatePresence>
        {isOpen && (
           <motion.div
             initial={{ height: 0 }}
             animate={{ height: "auto" }}
             exit={{ height: 0 }}
             className="overflow-hidden"
           >
              <div className="p-2 pb-4 space-y-1 bg-black/20 border-t border-white/5">
                 {module.lessons.map((lesson, i) => {
                    const isLessonDone = !!progressData[lesson.id];
                    // Optional: Lock logic could go here (e.g. if previous not done)
                    const isLocked = false; 

                    return (
                       <Link 
                          key={lesson.id}
                          to={`/aula/leccion/${courseId}/${lesson.id}`}
                          className={`
                             flex items-center gap-4 p-3 rounded-xl mx-2 transition-all group
                             ${isLessonDone ? 'opacity-60 hover:opacity-100' : 'hover:bg-white/5'}
                          `}
                       >
                          <div className="min-w-[24px]">
                             {isLessonDone ? (
                                <CheckCircle size={16} className="text-emerald-500" />
                             ) : isLocked ? (
                                <Lock size={16} className="text-slate-700" />
                             ) : (
                                <PlayCircle size={16} className="text-indigo-400 group-hover:scale-110 transition-transform" />
                             )}
                          </div>
                          
                          <div className="flex-1">
                             <p className={`text-sm font-medium ${isLessonDone ? 'text-slate-500' : 'text-slate-300 group-hover:text-white'}`}>
                                {lesson.title}
                             </p>
                             <span className="text-[10px] text-slate-600 font-bold uppercase tracking-wider">
                                {lesson.duration}
                             </span>
                          </div>
                       </Link>
                    );
                 })}
              </div>
           </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
