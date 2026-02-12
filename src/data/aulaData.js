// Helper to generate lessons for a module
var generateLessons = function(moduleId, count, startNum) {
  startNum = startNum || 1;
  var result = [];
  for (var i = 0; i < count; i++) {
    result.push({
      id: moduleId + '-l' + (startNum + i),
      title: 'Clase ' + (startNum + i) + ': Conceptos Fundamentales',
      duration: '45:00',
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      isCompleted: false,
      description: 'En esta clase abordaremos los pilares teóricos fundamentales del tema, con ejemplos prácticos y resolución de dudas frecuentes.',
      resources: [
        { title: 'Guía de Ejercicios PDF', url: '#' },
        { title: 'Resumen de Clase', url: '#' }
      ]
    });
  }
  return result;
};

function buildCourses(defs, instructor) {
  return defs.map(function(c) {
    return {
      id: c.id,
      title: c.title,
      icon: c.icon,
      color: c.color,
      instructor: instructor,
      progress: 0,
      image: 'https://ui-avatars.com/api/?name=' + encodeURIComponent(c.title) + '&background=random&size=512',
      modules: (c.mods || []).map(function(m) {
        return {
          id: c.id + '-m' + m.n,
          title: m.title,
          lessons: generateLessons(c.id + '-m' + m.n, m.count, m.start)
        };
      })
    };
  });
}

// --- 1. PAES (7 Materias) ---
var PAES_COURSES = buildCourses([
  { id: 'paes-m1', title: 'Matemática M1', icon: '📐', color: 'blue',
    mods: [{ n:1, title:'Eje Temático 1: Números y Álgebra', count:10, start:1 },
           { n:2, title:'Eje Temático 2: Geometría y Datos', count:10, start:11 },
           { n:3, title:'Eje Temático 3: Resolución de Problemas', count:10, start:21 }] },
  { id: 'paes-len', title: 'Comprensión Lectora', icon: '📚', color: 'orange',
    mods: [{ n:1, title:'Eje 1: Lectura Comprensiva', count:10, start:1 },
           { n:2, title:'Eje 2: Análisis Textual', count:10, start:11 },
           { n:3, title:'Eje 3: Producción y Síntesis', count:10, start:21 }] },
  { id: 'paes-m2', title: 'Matemática M2', icon: '🚀', color: 'violet',
    mods: [{ n:1, title:'Eje 1: Cálculo Diferencial', count:10, start:1 },
           { n:2, title:'Eje 2: Probabilidades', count:10, start:11 },
           { n:3, title:'Eje 3: Problemas Avanzados', count:10, start:21 }] },
  { id: 'paes-his', title: 'Historia y Cs. Sociales', icon: '🏛️', color: 'purple',
    mods: [{ n:1, title:'Eje 1: Chile y el Mundo', count:10, start:1 },
           { n:2, title:'Eje 2: Democracia y Ciudadanía', count:10, start:11 },
           { n:3, title:'Eje 3: Geografía y Economía', count:10, start:21 }] },
  { id: 'paes-bio', title: 'Ciencias - Biología', icon: '🧬', color: 'emerald',
    mods: [{ n:1, title:'Eje 1: Célula y Organismo', count:10, start:1 },
           { n:2, title:'Eje 2: Genética y Evolución', count:10, start:11 },
           { n:3, title:'Eje 3: Ecología', count:10, start:21 }] },
  { id: 'paes-fis', title: 'Ciencias - Física', icon: '⚡', color: 'red',
    mods: [{ n:1, title:'Eje 1: Mecánica', count:10, start:1 },
           { n:2, title:'Eje 2: Ondas y Electricidad', count:10, start:11 },
           { n:3, title:'Eje 3: Termodinámica', count:10, start:21 }] },
  { id: 'paes-qui', title: 'Ciencias - Química', icon: '🧪', color: 'cyan',
    mods: [{ n:1, title:'Eje 1: Estructura Atómica', count:10, start:1 },
           { n:2, title:'Eje 2: Reacciones Químicas', count:10, start:11 },
           { n:3, title:'Eje 3: Estequiometría', count:10, start:21 }] }
], 'Equipo PAES');

// --- 2. IDIOMAS (3 Idiomas) ---
var LANG_COURSES = buildCourses([
  { id: 'lang-eng', title: 'English Booster A1-A2', icon: '🇺🇸', color: 'blue',
    mods: [{ n:1, title:'Unit 1: Foundations & Greetings', count:8, start:1 },
           { n:2, title:'Unit 2: Grammar & Structure', count:8, start:9 },
           { n:3, title:'Unit 3: Conversational Skills', count:8, start:17 },
           { n:4, title:'Unit 4: Advanced Practice', count:6, start:25 }] },
  { id: 'lang-kor', title: 'Coreano Inicial + Cultura', icon: '🇰🇷', color: 'pink',
    mods: [{ n:1, title:'Unit 1: Hangul & Saludos', count:8, start:1 },
           { n:2, title:'Unit 2: Gramática Básica', count:8, start:9 },
           { n:3, title:'Unit 3: Conversación', count:8, start:17 },
           { n:4, title:'Unit 4: Cultura Coreana', count:6, start:25 }] },
  { id: 'lang-esp', title: 'Spanish for Expats', icon: '🇨🇱', color: 'amber',
    mods: [{ n:1, title:'Unit 1: Basics & Pronunciation', count:8, start:1 },
           { n:2, title:'Unit 2: Grammar Essentials', count:8, start:9 },
           { n:3, title:'Unit 3: Conversational Practice', count:8, start:17 },
           { n:4, title:'Unit 4: Chilean Spanish', count:6, start:25 }] }
], 'Language Team');

// --- 3. LSCh (3 Niveles) ---
var LSCH_COURSES = buildCourses([
  { id: 'lsch-a1', title: 'LSCh Nivel A1: Iniciación', icon: '👋', color: 'cyan',
    mods: [{ n:1, title:'Módulo 1: Fundamentos Visuales', count:10, start:1 },
           { n:2, title:'Módulo 2: Vocabulario Temático', count:10, start:11 },
           { n:3, title:'Módulo 3: Práctica de Señas', count:5, start:21 }] },
  { id: 'lsch-a2', title: 'LSCh Nivel A2: Gramática Espacial', icon: '🤟', color: 'violet',
    mods: [{ n:1, title:'Módulo 1: Gramática Espacial', count:10, start:1 },
           { n:2, title:'Módulo 2: Expresiones Idiomáticas', count:10, start:11 },
           { n:3, title:'Módulo 3: Diálogos', count:5, start:21 }] },
  { id: 'lsch-b1', title: 'LSCh Nivel B1: Contexto Profesional', icon: '🎓', color: 'rose',
    mods: [{ n:1, title:'Módulo 1: LSCh Profesional', count:10, start:1 },
           { n:2, title:'Módulo 2: Interpretación', count:10, start:11 },
           { n:3, title:'Módulo 3: Práctica Final', count:5, start:21 }] }
], 'Fernanda');

// --- 4. NIVELACIÓN (4 Ciclos) ---
var NIVELACION_COURSES = buildCourses([
  { id: 'niv-eb1', title: 'Nivelación Básica 1 (5º-6º)', icon: '📖', color: 'stone',
    mods: [{ n:1, title:'Módulo 1: Lenguaje y Comunicación', count:8, start:1 },
           { n:2, title:'Módulo 2: Matemáticas', count:8, start:9 },
           { n:3, title:'Módulo 3: Ciencias Integradas', count:8, start:17 },
           { n:4, title:'Módulo 4: Estudios Sociales', count:6, start:25 }] },
  { id: 'niv-eb2', title: 'Nivelación Básica 2 (7º-8º)', icon: '🖊️', color: 'stone',
    mods: [{ n:1, title:'Módulo 1: Lenguaje Avanzado', count:8, start:1 },
           { n:2, title:'Módulo 2: Álgebra Básica', count:8, start:9 },
           { n:3, title:'Módulo 3: Ciencias Naturales', count:8, start:17 },
           { n:4, title:'Módulo 4: Historia', count:6, start:25 }] },
  { id: 'niv-em1', title: 'Nivelación Media 1 (1º-2º)', icon: '🔬', color: 'sky',
    mods: [{ n:1, title:'Módulo 1: Comprensión Lectora', count:8, start:1 },
           { n:2, title:'Módulo 2: Matemáticas Intermedias', count:8, start:9 },
           { n:3, title:'Módulo 3: Ciencias', count:8, start:17 },
           { n:4, title:'Módulo 4: Formación Ciudadana', count:6, start:25 }] },
  { id: 'niv-em2', title: 'Nivelación Media 2 (3º-4º)', icon: '🎓', color: 'amber',
    mods: [{ n:1, title:'Módulo 1: Lenguaje y Expresión', count:8, start:1 },
           { n:2, title:'Módulo 2: Cálculo', count:8, start:9 },
           { n:3, title:'Módulo 3: Biología y Física', count:8, start:17 },
           { n:4, title:'Módulo 4: Historia y Geografía', count:6, start:25 }] }
], 'Profe Caminos');

// --- 5. EMPRESAS (Soft Skills) ---
var EMPRESAS_COURSES = buildCourses([
  { id: 'emp-soft', title: 'Liderazgo y Habilidades Blandas', icon: '⚡', color: 'amber',
    mods: [{ n:1, title:'Workshop 1: Comunicación Efectiva', count:5, start:1 },
           { n:2, title:'Workshop 2: Gestión del Tiempo', count:5, start:6 }] },
  { id: 'emp-eng', title: 'Inglés de Negocios', icon: '🌍', color: 'indigo',
    mods: [{ n:1, title:'Workshop 1: Business Vocabulary', count:5, start:1 },
           { n:2, title:'Workshop 2: Presentations & Meetings', count:5, start:6 }] }
], 'Lael Corporate');


// === MASTER COURSE LIST ===
export var ALL_COURSES = [].concat(
  PAES_COURSES,
  LANG_COURSES,
  LSCH_COURSES,
  NIVELACION_COURSES,
  EMPRESAS_COURSES
);


// === DASHBOARD DATA ===
export var AULA_DATA = {
  student: {
    name: 'Estudiante Demo',
    streak: 15,
    points: 1250,
    level: 'Estudiante Constante',
    avatar: 'https://ui-avatars.com/api/?name=Estudiante+Demo&background=0D8ABC&color=fff'
  },
  announcements: [
    { id: 1, title: '📅 Ensayo Masivo PAES', date: 'Sáb 15 Mayo', type: 'ensayo' },
    { id: 2, title: '🚀 Nueva unidad de Inglés disponible', date: 'Ayer', type: 'content' },
    { id: 3, title: '💡 Tip de estudio: Técnica Pomodoro', date: 'Hace 2 días', type: 'tip' }
  ],
  upcomingClasses: [
    { id: 101, title: 'Repaso Álgebra', time: '18:30', teacher: 'Diego Chaparro', subject: 'Matemática M1' },
    { id: 102, title: 'Conversation Club', time: '20:00', teacher: 'Javiera', subject: 'Inglés' }
  ]
};
