import React, { useState, useCallback, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ReactPlayer from 'react-player';
import { 
  ArrowLeft, ArrowRight, CheckCircle, Circle, 
  FileText, Download, StickyNote, ChevronLeft, ChevronRight 
} from 'lucide-react';

import { ALL_COURSES } from '../../data/aulaData';
import { useProgress } from '../../hooks/useProgress';

export default function LessonView() {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const { markLessonComplete, isLessonCompleted, saveNote, getNote } = useProgress();

  const [noteText, setNoteText] = useState('');
  const [showNotes, setShowNotes] = useState(false);

  // Find course
  const course = ALL_COURSES.find(c => c.id === courseId);

  // Flatten all lessons for navigation
  const allLessons = useMemo(() => {
    if (!course) return [];
    return course.modules.flatMap(m => m.lessons.map(l => ({ ...l, moduleName: m.title })));
  }, [course]);

  const currentIndex = allLessons.findIndex(l => l.id === lessonId);
  const lesson = allLessons[currentIndex];
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  const isDone = isLessonCompleted(courseId, lessonId);

  // Load note on mount
  React.useEffect(() => {
    setNoteText(getNote(lessonId));
  }, [lessonId]);

  // Autosave notes
  const handleNoteChange = useCallback((e) => {
    const text = e.target.value;
    setNoteText(text);
    saveNote(lessonId, text);
  }, [lessonId, saveNote]);

  const handleToggleComplete = () => {
    markLessonComplete(courseId, lessonId, !isDone);
  };

  if (!course || !lesson) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-black text-white mb-4">Lección no encontrada</h2>
        <Link to="/aula" className="text-indigo-400 hover:text-white font-bold text-sm transition-colors">← Volver al Dashboard</Link>
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-slate-500 font-medium flex-wrap">
        <Link to="/aula" className="hover:text-white transition-colors">Dashboard</Link>
        <span>/</span>
        <Link to={`/aula/curso/${courseId}`} className="hover:text-white transition-colors">{course.title}</Link>
        <span>/</span>
        <span className="text-slate-300">{lesson.title}</span>
      </div>

      {/* Module Badge */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">{lesson.moduleName}</p>
        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
          Lección {currentIndex + 1} de {allLessons.length}
        </span>
      </div>

      {/* Video Player */}
      <div className="rounded-3xl overflow-hidden bg-black border border-white/10 aspect-video relative shadow-2xl">
        <ReactPlayer
          url={lesson.videoUrl}
          width="100%"
          height="100%"
          controls
          onEnded={() => {
            if (!isDone) markLessonComplete(courseId, lessonId, true);
          }}
          config={{
            youtube: { playerVars: { modestbranding: 1, rel: 0 } }
          }}
        />
      </div>

      {/* Title + Actions */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <h1 className="text-2xl md:text-3xl font-black text-white tracking-tighter">{lesson.title}</h1>
        
        <div className="flex items-center gap-3">
          {/* Notes Toggle */}
          <button 
            onClick={() => setShowNotes(!showNotes)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all border ${
              showNotes ? 'bg-amber-500/10 border-amber-500/20 text-amber-400' : 'bg-white/5 border-white/5 text-slate-400 hover:text-white'
            }`}
          >
            <StickyNote size={14} /> Notas
          </button>

          {/* Mark Complete */}
          <button 
            onClick={handleToggleComplete}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${
              isDone 
                ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400' 
                : 'bg-indigo-600 hover:bg-indigo-500 text-white border border-transparent'
            }`}
          >
            {isDone ? <CheckCircle size={14} /> : <Circle size={14} />}
            {isDone ? 'Completada' : 'Marcar Completa'}
          </button>
        </div>
      </div>

      {/* Description */}
      <p className="text-slate-400 text-sm leading-relaxed max-w-3xl">{lesson.description}</p>

      {/* Notes Panel (Collapsible) */}
      {showNotes && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="bg-[#18181b] border border-amber-500/10 rounded-2xl p-6"
        >
          <h3 className="text-sm font-black text-amber-400 uppercase tracking-wider mb-4 flex items-center gap-2">
            <StickyNote size={16} /> Mis Notas
          </h3>
          <textarea 
            value={noteText}
            onChange={handleNoteChange}
            placeholder="Escribe tus notas aquí... Se guardan automáticamente."
            className="w-full h-40 bg-black/40 border border-white/5 rounded-xl p-4 text-sm text-slate-300 placeholder:text-slate-600 resize-none focus:border-amber-500/30 focus:outline-none transition-colors"
          />
          <p className="text-[9px] text-slate-600 font-bold uppercase tracking-widest mt-2">Autoguardado en tu navegador</p>
        </motion.div>
      )}

      {/* Resources */}
      {lesson.resources && lesson.resources.length > 0 && (
        <div className="bg-[#18181b] border border-white/5 rounded-2xl p-6">
          <h3 className="text-sm font-black text-white uppercase tracking-wider mb-4 flex items-center gap-2">
            <FileText size={16} className="text-indigo-400" /> Recursos de la Lección
          </h3>
          <div className="space-y-3">
            {lesson.resources.map((res, i) => (
              <a key={i} href={res.url} className="flex items-center justify-between p-3 bg-white/[0.02] border border-white/5 rounded-xl hover:border-indigo-500/20 transition-all group">
                <span className="text-sm text-slate-300 font-medium group-hover:text-white transition-colors">{res.title}</span>
                <Download size={14} className="text-slate-500 group-hover:text-indigo-400 transition-colors" />
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Navigation: Previous / Next */}
      <div className="flex items-center justify-between gap-4 pt-6 border-t border-white/5">
        {prevLesson ? (
          <Link 
            to={`/aula/leccion/${courseId}/${prevLesson.id}`}
            className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors group"
          >
            <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <div className="text-right">
              <p className="text-[9px] font-bold uppercase tracking-widest text-slate-600">Anterior</p>
              <p className="text-sm font-bold">{prevLesson.title}</p>
            </div>
          </Link>
        ) : <div />}
        
        {nextLesson ? (
          <Link 
            to={`/aula/leccion/${courseId}/${nextLesson.id}`}
            className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors group text-right"
          >
            <div>
              <p className="text-[9px] font-bold uppercase tracking-widest text-slate-600">Siguiente</p>
              <p className="text-sm font-bold">{nextLesson.title}</p>
            </div>
            <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        ) : (
          <Link 
            to={`/aula/curso/${courseId}`}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-black px-6 py-3 rounded-xl text-xs uppercase tracking-widest transition-colors"
          >
            Volver al Curso <ArrowRight size={14} />
          </Link>
        )}
      </div>

    </motion.div>
  );
}
