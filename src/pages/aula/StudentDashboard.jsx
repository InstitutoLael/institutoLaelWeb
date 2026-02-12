import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Flame, BookOpen, Clock, Trophy, ArrowRight, 
  Video, Bell, Zap, MessageCircle 
} from 'lucide-react';

import { ALL_COURSES, AULA_DATA } from '../../data/aulaData';
import { useProgress } from '../../hooks/useProgress';
import { useAuth } from '../../context/AuthContext';
import CourseCard from '../../components/aula/CourseCard';
import ProgressRing from '../../components/aula/ProgressRing';
import { LIVE_MEET_LINK, LIVE_STATUS } from '../../data/configAula';

const container = { hidden: {}, show: { transition: { staggerChildren: 0.05 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

export default function StudentDashboard() {
  const { profile } = useAuth();
  const { streak, getCourseProgress, progress } = useProgress();

  const firstName = profile?.full_name?.split(' ')[0] || AULA_DATA.student.name;

  // Calculate global stats
  const totalLessons = ALL_COURSES.reduce((acc, c) => acc + c.modules.reduce((a, m) => a + m.lessons.length, 0), 0);
  const completedLessons = Object.values(progress).reduce((acc, courseData) => acc + Object.values(courseData).filter(Boolean).length, 0);
  const totalHours = Math.round(completedLessons * 0.75 * 10) / 10; // ~45min per lesson

  const STATS = [
    { icon: <BookOpen size={20} />, value: ALL_COURSES.length, label: "Cursos", color: "text-indigo-400" },
    { icon: <Clock size={20} />, value: `${totalHours}h`, label: "Estudiadas", color: "text-emerald-400" },
    { icon: <Trophy size={20} />, value: completedLessons, label: "Lecciones", color: "text-amber-400" },
    { icon: <Flame size={20} />, value: streak || AULA_DATA.student.streak, label: "Días Racha", color: "text-red-400" },
  ];

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-10">

      {/* 1. WELCOME HEADER */}
      <motion.div variants={item} className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-none mb-3">
            ¡Hola, <span className="text-amber-400">{firstName}</span>! 👋
          </h1>
          <p className="text-slate-400 text-sm font-medium">Bienvenido de vuelta a tu espacio de aprendizaje. ¿Listo para avanzar?</p>
        </div>
        <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 px-5 py-3 rounded-2xl">
          <Flame className="text-red-500" size={20} />
          <div>
            <p className="text-white font-black text-lg leading-none">{streak || AULA_DATA.student.streak}</p>
            <p className="text-[9px] text-red-400 font-bold uppercase tracking-widest">Días Racha</p>
          </div>
        </div>
      </motion.div>

      {/* 2. STATS ROW */}
      <motion.div variants={item} className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {STATS.map((stat, i) => (
          <div key={i} className="bg-[#18181b] border border-white/5 rounded-2xl p-5 text-center hover:border-white/10 transition-all">
            <div className={`${stat.color} mx-auto mb-3`}>{stat.icon}</div>
            <p className="text-2xl font-black text-white">{stat.value}</p>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{stat.label}</p>
          </div>
        ))}
      </motion.div>

      {/* 3. LIVE CLASS BANNER */}
      <motion.div variants={item}>
        <a 
          href={LIVE_MEET_LINK} 
          target="_blank" 
          rel="noreferrer"
          className="block relative bg-gradient-to-r from-indigo-900/40 to-violet-900/40 border border-indigo-500/20 rounded-3xl p-8 overflow-hidden group hover:border-indigo-500/40 transition-all"
        >
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-indigo-500/10 blur-[60px] rounded-full group-hover:bg-indigo-500/20 transition-all" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 flex items-center justify-center border border-indigo-500/20">
                <Video className="text-indigo-400" size={24} />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  {LIVE_STATUS && <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />}
                  <span className="text-[10px] font-black uppercase tracking-widest text-indigo-300">
                    {LIVE_STATUS ? 'EN VIVO AHORA' : 'PRÓXIMA CLASE'}
                  </span>
                </div>
                <p className="text-white font-bold text-lg">
                  {AULA_DATA.upcomingClasses[0]?.title} — <span className="text-slate-400">{AULA_DATA.upcomingClasses[0]?.teacher}</span>
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-black px-6 py-3 rounded-xl text-xs uppercase tracking-widest transition-colors">
              Unirse <ArrowRight size={14} />
            </div>
          </div>
        </a>
      </motion.div>

      {/* 4. ANNOUNCEMENTS */}
      {AULA_DATA.announcements.length > 0 && (
        <motion.div variants={item}>
          <div className="flex items-center gap-2 mb-4">
            <Bell size={16} className="text-amber-400" />
            <h3 className="text-sm font-black text-white uppercase tracking-wider">Novedades</h3>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {AULA_DATA.announcements.map(a => (
              <div key={a.id} className="min-w-[250px] bg-[#18181b] border border-white/5 rounded-2xl p-4 flex-shrink-0">
                <p className="text-white font-bold text-sm mb-1">{a.title}</p>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{a.date}</p>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* 5. MY COURSES GRID */}
      <motion.div variants={item}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Mis Cursos</h2>
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{ALL_COURSES.length} Cursos Activos</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {ALL_COURSES.map(course => {
            const totalL = course.modules.reduce((a, m) => a + m.lessons.length, 0);
            const p = getCourseProgress(course.id, totalL);
            return <CourseCard key={course.id} course={course} progress={p} />;
          })}
        </div>
      </motion.div>

      {/* 6. QUICK ACCESS */}
      <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
        <a href="https://drive.google.com" target="_blank" rel="noreferrer" 
           className="flex items-center gap-4 bg-[#18181b] border border-white/5 rounded-2xl p-5 hover:border-blue-500/30 transition-all group">
          <Zap className="text-blue-400" size={20} />
          <div>
            <p className="text-white font-bold text-sm group-hover:text-blue-400 transition-colors">Material Teórico</p>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Google Drive</p>
          </div>
        </a>
        <a href="https://wa.me/56964626568" target="_blank" rel="noreferrer"
           className="flex items-center gap-4 bg-[#18181b] border border-white/5 rounded-2xl p-5 hover:border-emerald-500/30 transition-all group">
          <MessageCircle className="text-emerald-400" size={20} />
          <div>
            <p className="text-white font-bold text-sm group-hover:text-emerald-400 transition-colors">Tutoría Personal</p>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">WhatsApp Tutor</p>
          </div>
        </a>
        <Link to="/aula/live"
           className="flex items-center gap-4 bg-[#18181b] border border-white/5 rounded-2xl p-5 hover:border-indigo-500/30 transition-all group">
          <Video className="text-indigo-400" size={20} />
          <div>
            <p className="text-white font-bold text-sm group-hover:text-indigo-400 transition-colors">Clases en Vivo</p>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Google Meet</p>
          </div>
        </Link>
      </motion.div>

    </motion.div>
  );
}
