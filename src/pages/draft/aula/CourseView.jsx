import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Award, Clock, BookOpen, Users } from 'lucide-react';

import { ALL_COURSES } from '../../data/aulaData';
import { useProgress } from '../../hooks/useProgress';
import ModuleAccordion from '../../components/aula/ModuleAccordion';
import ProgressRing from '../../components/aula/ProgressRing';

export default function CourseView() {
  const { courseId } = useParams();
  const { progress, getCourseProgress } = useProgress();

  const course = ALL_COURSES.find(c => c.id === courseId);

  if (!course) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-black text-white mb-4">Curso no encontrado</h2>
        <Link to="/aula" className="text-indigo-400 hover:text-white font-bold text-sm transition-colors">← Volver al Dashboard</Link>
      </div>
    );
  }

  const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);
  const courseProgress = getCourseProgress(courseId, totalLessons);
  const courseProgressData = progress[courseId] || {};
  const completedCount = Object.values(courseProgressData).filter(Boolean).length;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-10">

      {/* Back Link */}
      <Link to="/aula" className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm font-bold transition-colors group">
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Mis Cursos
      </Link>

      {/* Course Hero */}
      <div className="relative bg-[#18181b] border border-white/5 rounded-3xl p-8 md:p-12 overflow-hidden">
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-indigo-500/5 blur-[80px] rounded-full" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="flex items-start gap-6">
            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-3xl border border-white/10 flex-shrink-0">
              {course.icon || '📚'}
            </div>
            <div>
              <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-2">{course.instructor}</p>
              <h1 className="text-3xl md:text-4xl font-black text-white tracking-tighter leading-tight mb-3">{course.title}</h1>
              <div className="flex flex-wrap gap-4 text-xs text-slate-400 font-medium">
                <span className="flex items-center gap-1"><BookOpen size={14} /> {course.modules.length} Módulos</span>
                <span className="flex items-center gap-1"><Clock size={14} /> {totalLessons} Lecciones</span>
                <span className="flex items-center gap-1"><Users size={14} /> En curso</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6 flex-shrink-0">
            <ProgressRing progress={courseProgress} radius={40} stroke={5} color="#6366f1" />
            <div>
              <p className="text-2xl font-black text-white">{completedCount}/{totalLessons}</p>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Completadas</p>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-8 h-2 bg-white/5 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${courseProgress}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-indigo-600 to-violet-500 rounded-full"
          />
        </div>
      </div>

      {/* Certificate CTA (when 100%) */}
      {courseProgress === 100 && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-r from-amber-900/30 to-yellow-900/30 border border-amber-500/20 rounded-2xl p-6 flex items-center gap-4"
        >
          <Award className="text-amber-400 flex-shrink-0" size={32} />
          <div>
            <p className="text-white font-bold">¡Curso Completado! 🎉</p>
            <p className="text-xs text-amber-300/70">Tu certificado digital está listo para descargar.</p>
          </div>
          <button className="ml-auto bg-amber-500 hover:bg-amber-400 text-black font-black px-6 py-3 rounded-xl text-xs uppercase tracking-widest transition-colors flex-shrink-0">
            Ver Certificado
          </button>
        </motion.div>
      )}

      {/* Module List */}
      <div>
        <h2 className="text-xl font-black text-white uppercase tracking-tighter mb-6">Contenido del Curso</h2>
        <div className="space-y-2">
          {course.modules.map((mod) => (
            <ModuleAccordion 
              key={mod.id} 
              module={mod} 
              courseId={courseId}
              progressData={courseProgressData}
            />
          ))}
        </div>
      </div>

      {/* Resources Sidebar (simplified inline) */}
      <div className="bg-[#18181b] border border-white/5 rounded-2xl p-6">
        <h3 className="text-sm font-black text-white uppercase tracking-wider mb-4">Recursos del Curso</h3>
        <div className="space-y-3">
          <a href="#" className="flex items-center gap-3 text-sm text-slate-400 hover:text-white transition-colors">
            <BookOpen size={16} className="text-indigo-400" /> Guía de Estudio Completa (PDF)
          </a>
          <a href="#" className="flex items-center gap-3 text-sm text-slate-400 hover:text-white transition-colors">
            <BookOpen size={16} className="text-indigo-400" /> Resumen de Fórmulas
          </a>
          <a href="#" className="flex items-center gap-3 text-sm text-slate-400 hover:text-white transition-colors">
            <BookOpen size={16} className="text-indigo-400" /> Banco de Ejercicios
          </a>
        </div>
      </div>

    </motion.div>
  );
}
