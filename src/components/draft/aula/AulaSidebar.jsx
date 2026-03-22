import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, BookOpen, Video, FileText, Settings, 
  HelpCircle, LogOut, ChevronRight, X 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

function getNavClass(isActive) {
  const base = 'flex items-center gap-3 px-3 py-3 rounded-xl transition-all group';
  return isActive
    ? base + ' bg-indigo-600/10 text-indigo-400 border border-indigo-500/20'
    : base + ' text-slate-400 hover:text-white hover:bg-white/5';
}

function getBottomNavClass(isActive) {
  const base = 'flex items-center gap-3 px-3 py-3 rounded-xl transition-all';
  return isActive ? base + ' text-white' : base + ' text-slate-500 hover:text-slate-300';
}

export default function AulaSidebar({ isOpen, onClose }) {
  const { signOut } = useAuth();

  const MENU_ITEMS = [
    { icon: <Home size={20} />, label: 'Dashboard', path: '/aula', exact: true },
    { icon: <BookOpen size={20} />, label: 'Mis Cursos', path: '/aula/mis-cursos' },
    { icon: <Video size={20} />, label: 'Clases en Vivo', path: '/aula/live' },
    { icon: <FileText size={20} />, label: 'Recursos', path: '/aula/recursos' },
  ];

  const BOTTOM_ITEMS = [
    { icon: <Settings size={20} />, label: 'Mi Perfil', path: '/aula/perfil' },
    { icon: <HelpCircle size={20} />, label: 'Ayuda', path: '/aula/soporte' },
  ];

  const sidebarClass = 'fixed top-0 left-0 h-full w-64 bg-[#09090b] border-r border-white/10 z-50 transition-transform duration-300 ease-spring '
    + (isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0');

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside className={sidebarClass}>
        <div className="flex flex-col h-full p-6">
          
          {/* Header */}
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-black">L</div>
              <span className="text-white font-black text-lg tracking-tight">AULA 2.0</span>
            </div>
            <button onClick={onClose} className="lg:hidden text-slate-400 hover:text-white">
              <X size={20} />
            </button>
          </div>

          {/* Main Menu */}
          <nav className="space-y-2 flex-1">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-3 mb-4">Menú Principal</p>
            {MENU_ITEMS.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.exact}
                onClick={() => window.innerWidth < 1024 && onClose()}
                className={({ isActive }) => getNavClass(isActive)}
              >
                {item.icon}
                <span className="text-sm font-bold">{item.label}</span>
                <ChevronRight 
                  size={16} 
                  className="ml-auto opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" 
                />
              </NavLink>
            ))}
          </nav>

          {/* Bottom Menu */}
          <div className="space-y-2 pt-6 border-t border-white/5">
            {BOTTOM_ITEMS.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => getBottomNavClass(isActive)}
              >
                {item.icon}
                <span className="text-xs font-bold">{item.label}</span>
              </NavLink>
            ))}
            
            <button 
              onClick={signOut}
              className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all mt-4"
            >
              <LogOut size={16} />
              <span className="text-xs font-bold">Cerrar Sesión</span>
            </button>
          </div>

        </div>
      </aside>
    </>
  );
}
