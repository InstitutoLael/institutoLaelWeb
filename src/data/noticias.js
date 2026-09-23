// src/data/noticias.js
// ============================================================================
// NOTICIAS Y GUÍAS DE LAEL
//
// CÓMO AGREGAR UNA NOTICIA NUEVA (sin saber programar):
//
// 1. Copia completo uno de los bloques que empiezan con { slug: ... } y
//    terminan con }, (fíjate en la coma del final).
// 2. Pégalo al principio de la lista NOTICIAS, justo después de "[".
// 3. Cambia los datos:
//    - slug: la dirección de la página, en minúsculas, sin tildes ni espacios
//      (usa guiones). Ejemplo: 'becas-2027' queda en institutolael.cl/noticias/becas-2027
//    - title: el título.
//    - excerpt: un resumen de una o dos frases (sale en las tarjetas y en Google).
//    - category: una de estas cuatro, escrita igual: 'PAES', 'Adultos', 'Homeschool' o 'Lael'.
//    - date: fecha de publicación en formato 'AAAA-MM-DD'. Ejemplo: '2026-10-05'.
//    - updated: fecha de la última revisión, mismo formato.
//    - readingMinutes: minutos aproximados de lectura (un número, sin comillas).
//    - featured: true si quieres que salga destacada arriba en /noticias (solo una a la vez).
//    - sources: (opcional) la lista de fuentes oficiales, con su nombre y link.
//    - body: el contenido, como una lista de bloques. Los tipos de bloque son:
//        { type: 'p', text: 'Un párrafo.' }
//        { type: 'h2', text: 'Un subtítulo' }
//        { type: 'list', items: ['Punto uno', 'Punto dos'] }        (agrega ordered: true para 1, 2, 3)
//        { type: 'table', head: ['Columna 1', 'Columna 2'], rows: [['a', 'b'], ['c', 'd']] }
//        { type: 'callout', title: 'Ojo', text: 'Un aviso destacado.' }
//        { type: 'cta', title: 'Título', text: 'Texto', to: '/paes', label: 'Texto del botón' }
//
//    Dentro de cualquier texto puedes usar:
//      **palabras en negrita**
//      [texto del link](https://sitio.cl)   o   [texto del link](/calculadora) para páginas de Lael
//
// 4. Guarda el archivo. La noticia aparece sola en /noticias y en la
//    sección de noticias destacadas. Recuerda agregar la dirección nueva al sitemap.
//
// Regla de oro: nunca publiques fechas o datos que no estén en una fuente
// oficial (demre.cl, ayudamineduc.cl, epja.mineduc.cl, acceso.mineduc.cl).
// ============================================================================

export const CATEGORIES = ['PAES', 'Adultos', 'Homeschool', 'Lael'];

export const NOTICIAS = [
  // ------------------------------------------------------------------------
  {
    slug: 'fechas-paes-admision-2027',
    title: 'Fechas PAES 2027: el calendario oficial de la Admisión 2027',
    excerpt:
      'Rendición de la PAES Regular, resultados, postulación y matrícula. Todas las fechas del DEMRE en un solo lugar, explicadas en simple.',
    category: 'PAES',
    date: '2026-09-23',
    updated: '2026-09-23',
    readingMinutes: 5,
    featured: true,
    sources: [
      { label: 'DEMRE: Calendario del Proceso de Admisión 2027', url: 'https://demre.cl/calendario/calendario-proceso-2027' },
      { label: 'DEMRE: Noticia "Calendario completo del Proceso de Admisión 2027" (8 de abril de 2026)', url: 'https://demre.cl/noticias/2026-04-08-difusion-calendario-admision-2027' },
      { label: 'DEMRE: Fechas y horarios PAES Regular, Proceso 2027', url: 'https://demre.cl/paes/regular/rendicion/los-dias-de-la-prueba/fechas-horarios' },
      { label: 'DEMRE: Instrucciones generales de postulación, Admisión 2027', url: 'https://demre.cl/paes/postulacion/como-postulo-a-una-universidad/instrucciones-generales-postulacion' },
      { label: 'DEMRE: Nuevo Ranking', url: 'https://demre.cl/paes/factores-seleccion/nuevo-ranking' },
    ],
    body: [
      {
        type: 'p',
        text: 'Si estás en 4° medio este 2026, tu proceso se llama **Admisión 2027**: das la PAES a fines de este año y entras a la universidad en marzo de 2027. El DEMRE publicó el calendario completo en abril y aquí te lo ordenamos por etapa.',
      },
      {
        type: 'callout',
        title: 'Lo más importante',
        text: 'La PAES Regular se rinde el **lunes 30 de noviembre, martes 1 y miércoles 2 de diciembre de 2026**. Los resultados salen el **lunes 4 de enero de 2027 a las 08:00**.',
      },
      { type: 'h2', text: 'Calendario completo de la Admisión 2027' },
      {
        type: 'table',
        head: ['Etapa', 'Fecha oficial'],
        rows: [
          ['Inscripción PAES de Invierno', '4 al 17 de marzo de 2026 (cerrada)'],
          ['Rendición PAES de Invierno', '15, 16 y 17 de junio de 2026'],
          ['Resultados PAES de Invierno', 'Viernes 17 de julio de 2026, 09:00'],
          ['Inscripción PAES Regular', '1 de junio al 27 de julio de 2026, 13:00 (cerrada; se extendió desde el 22 de julio)'],
          ['Oferta definitiva de carreras, vacantes y ponderaciones', 'Jueves 24 de septiembre de 2026'],
          ['Simulador de postulación', 'Martes 13 de octubre al martes 15 de diciembre de 2026'],
          ['Publicación de servicios y beneficios universitarios', 'Jueves 19 de noviembre de 2026'],
          ['Rendición PAES Regular', 'Lunes 30 de noviembre, martes 1 y miércoles 2 de diciembre de 2026'],
          ['Resultados PAES Regular', 'Lunes 4 de enero de 2027, 08:00'],
          ['Postulación a las universidades', 'Desde el lunes 4 de enero (09:00) hasta el jueves 7 de enero de 2027 (13:00)'],
          ['Resultados de selección', 'Lunes 18 de enero de 2027, 12:00'],
          ['Matrícula, primera etapa', 'Martes 19 al jueves 21 de enero de 2027'],
          ['Matrícula, segunda etapa', 'Viernes 22 al jueves 28 de enero de 2027'],
        ],
      },
      {
        type: 'p',
        text: 'Las horas son de Chile continental. En Rapa Nui las pruebas se aplican una hora antes.',
      },
      { type: 'h2', text: '¿Qué prueba se da cada día?' },
      {
        type: 'p',
        text: 'Al 23 de septiembre de 2026 el DEMRE todavía no publica el horario de cada prueba de la PAES Regular. En su página de [fechas y horarios](https://demre.cl/paes/regular/rendicion/los-dias-de-la-prueba/fechas-horarios) dice que lo informará próximamente. Cuando salga, actualizamos esta nota. Mientras tanto, lo seguro es que tienes que reservar los tres días completos.',
      },
      { type: 'h2', text: 'Qué puntajes te sirven para postular' },
      {
        type: 'p',
        text: 'Para la Admisión 2027 son válidos los puntajes de la PAES de Invierno 2025, PAES Regular 2025, PAES de Invierno 2026 y PAES Regular 2026. El sistema toma tu mejor puntaje en cada prueba, así que si ya diste la de invierno, la regular es otra oportunidad para subir.',
      },
      { type: 'h2', text: 'Qué hacer desde ahora hasta diciembre' },
      {
        type: 'list',
        ordered: true,
        items: [
          'Revisa el 24 de septiembre la oferta definitiva de carreras: ahí salen las ponderaciones y los puntajes mínimos de cada carrera para este proceso.',
          'Calcula con qué puntaje postularías usando nuestra [calculadora de puntaje ponderado](/calculadora).',
          'Practica la postulación en el simulador del DEMRE, que abre el 13 de octubre.',
          'Días antes de la prueba, el DEMRE habilita en el portal de inscripción una nueva tarjeta de identificación con tu local de rendición. Descárgala e imprímela.',
          'El 4 de enero revisa tus resultados y postula antes del jueves 7 a las 13:00. Puedes postular hasta a 20 carreras.',
        ],
      },
      { type: 'h2', text: '¿Y la PAES 2027 para quienes están en 3° medio?' },
      {
        type: 'p',
        text: 'Si hoy estás en 3° medio, tu proceso será la **Admisión 2028** y darás la PAES a fines de 2027. El DEMRE todavía no publica ese calendario. Como referencia, el de la Admisión 2027 salió el 8 de abril de 2026. Una novedad ya confirmada: desde la Admisión 2028 el puntaje Ranking se calculará con una fórmula nueva, el [Nuevo Ranking](https://demre.cl/paes/factores-seleccion/nuevo-ranking).',
      },
      {
        type: 'cta',
        title: 'Llega a diciembre con todo preparado',
        text: 'En el preuniversitario de Lael tienes clases en vivo por ramo, grabaciones cada semana y ensayos mensuales. Cursos de máximo 20 alumnos.',
        to: '/paes',
        label: 'Ver preuniversitario PAES',
      },
    ],
  },

  // ------------------------------------------------------------------------
  {
    slug: 'como-funciona-la-paes',
    title: 'Cómo funciona la PAES, explicado en simple',
    excerpt:
      'Qué pruebas son obligatorias, cuáles son electivas, cómo se usan el NEM y el Ranking y cómo se calcula el puntaje con que postulas.',
    category: 'PAES',
    date: '2026-09-23',
    updated: '2026-09-23',
    readingMinutes: 7,
    featured: false,
    sources: [
      { label: 'DEMRE: Factores de selección, Admisión 2027', url: 'https://demre.cl/paes/factores-seleccion/' },
      { label: 'DEMRE: Temario PAES Regular de Ciencias, Admisión 2027 (PDF)', url: 'https://demre.cl/publicaciones/pdf/2027-26-03-19-temario-paes-regular-ciencias.pdf' },
      { label: 'DEMRE: Escala de puntajes', url: 'https://demre.cl/paes/factores-seleccion/nueva-escala-puntajes' },
      { label: 'DEMRE: Puntaje Ranking', url: 'https://demre.cl/paes/factores-seleccion/puntaje-ranking' },
      { label: 'DEMRE: Criterios de habilitación para postular (pedagogías)', url: 'https://demre.cl/paes/postulacion/como-postulo-a-una-universidad/criterios-habilitacion-postulacion' },
      { label: 'DEMRE: Oferta definitiva de carreras, vacantes y ponderaciones, Proceso 2026', url: 'https://demre.cl/publicaciones/2026/2026-25-09-25-oferta-carreras-vacantes-ponderaciones-p2026' },
    ],
    body: [
      {
        type: 'p',
        text: 'La PAES (Prueba de Acceso a la Educación Superior) es el examen que te pide la mayoría de las universidades de Chile. La aplica el DEMRE de la Universidad de Chile y sirve para postular a las 47 universidades del Sistema de Acceso. Tu puntaje final para cada carrera mezcla la PAES con tus notas del colegio.',
      },
      { type: 'h2', text: 'Las pruebas: obligatorias y electivas' },
      {
        type: 'table',
        head: ['Prueba', 'Tipo', 'Qué tienes que saber'],
        rows: [
          ['Competencia Lectora', 'Obligatoria', 'La piden todas las carreras.'],
          ['Competencia Matemática 1 (M1)', 'Obligatoria', 'La piden todas las carreras. Evalúa la matemática que todos ven hasta 2° medio.'],
          ['Competencia Matemática 2 (M2)', 'Según la carrera', 'La piden sobre todo las ingenierías (incluida Ingeniería Comercial en muchas universidades) y algunas carreras científicas y pedagogías. Si la carrera la exige, en la Admisión 2027 pesa al menos 5%.'],
          ['Historia y Ciencias Sociales', 'Electiva', 'Tienes que dar al menos una electiva. Revisa cuál pide tu carrera.'],
          ['Ciencias', 'Electiva', '80 preguntas: un módulo común de Biología, Física y Química, más un módulo electivo que eliges tú (o el módulo técnico profesional, si vienes de un liceo TP).'],
        ],
      },
      {
        type: 'p',
        text: 'Algunas carreras aceptan Historia **o** Ciencias. Si diste las dos, el sistema usa automáticamente la que te salió mejor.',
      },
      { type: 'h2', text: 'La escala: de 100 a 1.000 puntos' },
      {
        type: 'p',
        text: 'Desde 2022 todos los puntajes van de 100 a 1.000: cada prueba de la PAES, el NEM y el Ranking. Como están en la misma escala, puedes mezclar puntajes de distintas aplicaciones. Para la Admisión 2027 valen la PAES de Invierno y Regular de 2025 y de 2026, y se usa tu mejor puntaje en cada prueba.',
      },
      { type: 'h2', text: 'NEM y Ranking: tus notas también cuentan' },
      {
        type: 'list',
        items: [
          '**NEM** (Notas de Enseñanza Media): es tu promedio de 1° a 4° medio, transformado a la escala de 100 a 1.000.',
          '**Ranking**: compara tus notas con las de las tres generaciones anteriores de tu mismo colegio. Si te fue mejor que el promedio de tu colegio, tu Ranking sube por sobre tu NEM.',
        ],
      },
      {
        type: 'p',
        text: 'Como el NEM y el Ranking juntos suelen pesar entre 30% y 60% del puntaje, subir las notas en 3° y 4° medio vale mucho. Desde la Admisión 2028 el Ranking se calculará con una fórmula nueva que el DEMRE llama Nuevo Ranking.',
      },
      { type: 'h2', text: 'Las ponderaciones' },
      {
        type: 'p',
        text: 'Cada universidad decide cuánto pesa cada factor en cada carrera. Esos porcentajes se llaman ponderaciones y siempre suman 100%. Los publica el DEMRE en la oferta definitiva de carreras, vacantes y ponderaciones. Para la Admisión 2027 sale el jueves 24 de septiembre de 2026.',
      },
      { type: 'h2', text: 'Cómo se calcula tu puntaje ponderado' },
      {
        type: 'p',
        text: 'Multiplicas cada puntaje por su ponderación y sumas todo. Un ejemplo con una carrera inventada que pide NEM 20%, Ranking 20%, Lectora 20%, M1 30% e Historia o Ciencias 10%:',
      },
      {
        type: 'table',
        head: ['Factor', 'Tu puntaje', 'Ponderación', 'Aporta'],
        rows: [
          ['NEM', '700', '20%', '140'],
          ['Ranking', '750', '20%', '150'],
          ['Competencia Lectora', '650', '20%', '130'],
          ['M1', '600', '30%', '180'],
          ['Historia (mejor electiva)', '680', '10%', '68'],
          ['**Puntaje ponderado**', '', '100%', '**668**'],
        ],
      },
      {
        type: 'p',
        text: 'Con ese 668 postularías a esa carrera. En otra carrera, con otras ponderaciones, el mismo alumno tendría otro puntaje. Por eso conviene calcularlo carrera por carrera en la [calculadora de Lael](/calculadora).',
      },
      { type: 'h2', text: 'Los puntajes mínimos' },
      {
        type: 'list',
        items: [
          'Cada universidad fija un mínimo para postular. En la oferta del proceso 2026, la mayoría de las carreras pedía un promedio de al menos 458 puntos entre Lectora y M1, y varias universidades pedían 485 o más.',
          'Las pedagogías tienen requisitos propios. Por ejemplo, un promedio de 528 puntos entre Lectora y M1, o estar en el 20% de mejores notas de tu colegio, entre otras vías.',
          'Cumplir el mínimo te deja postular, pero no asegura el cupo: quedas o no según cuántos postulan y con qué puntajes.',
        ],
      },
      {
        type: 'cta',
        title: 'Calcula tu puntaje para cada carrera',
        text: 'Pon tus puntajes (o los de tus ensayos) y mira al tiro con cuánto postularías a cada carrera y si cumples los mínimos.',
        to: '/calculadora',
        label: 'Abrir la calculadora',
      },
    ],
  },

  // ------------------------------------------------------------------------
  {
    slug: 'examenes-libres-adultos-guia',
    title: 'Exámenes libres para adultos: guía paso a paso para terminar el colegio',
    excerpt:
      'Si tienes 18 años o más, puedes terminar la básica o la media con los exámenes de validación del Mineduc. Requisitos, niveles, fechas y cómo inscribirte.',
    category: 'Adultos',
    date: '2026-09-23',
    updated: '2026-09-23',
    readingMinutes: 7,
    featured: false,
    sources: [
      { label: 'Ayuda Mineduc: Exámenes libres, mayores de 18 años', url: 'https://www.ayudamineduc.cl/ficha/examenes-libres-mayores-de-18-anos-12' },
      { label: 'Mineduc: Cartilla informativa VE Adultos 2026 (PDF)', url: 'https://ayudamineduc.cl/sites/default/files/cartilla_informativa_ve_adultos_2026.pdf' },
      { label: 'EPJA Mineduc: ¿En qué consiste la validación de estudios?', url: 'https://epja.mineduc.cl/validacion-de-estudios/en-que-consiste/' },
      { label: 'EPJA Mineduc: Material de apoyo y temarios', url: 'https://epja.mineduc.cl/validacion-de-estudios/material-apoyo-la-examinacion/' },
      { label: 'ChileAtiende: Exámenes libres para mayores de 18 años', url: 'https://www.chileatiende.gob.cl/fichas/2230-examenes-libres-para-mayores-de-18-anos' },
    ],
    body: [
      {
        type: 'p',
        text: 'Si dejaste el colegio a medias, puedes terminarlo sin volver a una sala de clases. El Ministerio de Educación tiene un sistema de **exámenes libres** (su nombre oficial es validación de estudios) para personas de 18 años o más. Es gratis y el certificado que recibes vale igual que el de cualquier colegio.',
      },
      { type: 'h2', text: '¿Quién puede darlos?' },
      {
        type: 'list',
        items: [
          'Tener 18 años o más al momento de inscribirte.',
          'No estar matriculado en ningún colegio ni en otra modalidad de educación de adultos.',
          'Saber leer y escribir en español: las pruebas son solo en español y no se permiten traductores.',
          'Si vas a validar un nivel de media, tener en línea los certificados de los cursos anteriores (los puedes revisar en [certificados.mineduc.cl](https://certificados.mineduc.cl/)).',
          'Tener cédula de identidad vigente. Si eres extranjero, revisa en Ayuda Mineduc los casos especiales (cédula vencida, sin RUN o con IPE).',
        ],
      },
      { type: 'h2', text: 'Los niveles que puedes validar' },
      {
        type: 'p',
        text: 'Para adultos, los cursos se agrupan en niveles. Das un examen por cada asignatura del nivel.',
      },
      {
        type: 'table',
        head: ['Nivel', 'Equivale a'],
        rows: [
          ['Primer nivel básico', '1° a 4° básico'],
          ['Segundo nivel básico', '5° y 6° básico'],
          ['Tercer nivel básico', '7° y 8° básico'],
          ['Primer nivel medio', '1° y 2° medio'],
          ['Segundo nivel medio', '3° y 4° medio'],
        ],
      },
      {
        type: 'p',
        text: 'Las asignaturas son Lenguaje y Matemática en el primer nivel básico. Desde el segundo nivel se suman Ciencias Naturales y, según el temario vigente de tu nivel, Estudios Sociales. En media se agrega Inglés. Los temarios oficiales de cada nivel, con preguntas de ejemplo, están en [epja.mineduc.cl](https://epja.mineduc.cl/validacion-de-estudios/material-apoyo-la-examinacion/).',
      },
      { type: 'h2', text: 'Continuidad de estudios o fines laborales: elige bien' },
      {
        type: 'list',
        items: [
          '**Continuidad de estudios**: te entrega la licencia de enseñanza media y te permite seguir estudiando en un instituto o universidad. Es la que casi siempre conviene.',
          '**Fines laborales** (8° básico laboral o 4° medio laboral): sirve solo para trabajar. No te da la licencia de enseñanza media ni te habilita para la educación superior. Si después quieres seguir estudiando, tienes que validar de nuevo desde el último curso que tenías aprobado.',
        ],
      },
      { type: 'h2', text: 'Fechas 2026' },
      {
        type: 'table',
        head: ['', 'Primer período', 'Segundo período'],
        rows: [
          ['Inscripción', '6 al 24 de abril', '1 al 22 de julio'],
          ['Exámenes', '3 al 7 de junio', '7 al 11 de octubre'],
          ['Resultados', 'Desde el 10 de julio', 'Desde el 2 de noviembre'],
          ['Certificados en línea', 'Desde el 20 de julio', 'Desde el 9 de noviembre'],
        ],
      },
      {
        type: 'callout',
        title: 'Si quieres entrar a la universidad',
        text: 'Si validas el segundo nivel medio (3° y 4° medio) y quieres postular a la educación superior, el Mineduc pide rendirlo en el **primer período (junio)**, para que tu certificado esté listo a tiempo para la postulación.',
      },
      {
        type: 'p',
        text: 'Las inscripciones de 2026 ya cerraron. Al 23 de septiembre de 2026 el Mineduc todavía no publica el calendario 2027. Como referencia, el de 2026 lo publicó en enero de 2026 y la primera inscripción fue en abril. Si quieres dar los exámenes en junio de 2027, lo ideal es empezar a estudiar desde ya.',
      },
      { type: 'h2', text: 'Paso a paso' },
      {
        type: 'list',
        ordered: true,
        items: [
          'Revisa qué último curso tienes aprobado en [certificados.mineduc.cl](https://certificados.mineduc.cl/). Desde ahí sabes qué nivel te toca.',
          'Inscríbete dentro del plazo en el [formulario de validación de estudios](https://inscripcion-validacion-estudios.mineduc.cl/) o en una oficina de Ayuda Mineduc. Es un trámite personal: nadie puede inscribirte por ti.',
          'Pon bien tu región, comuna, teléfono y correo. Con eso te asignan el colegio donde darás las pruebas, según los cupos.',
          'Espera el **comprobante de autorización** en tu correo (hasta 15 días hábiles si te inscribiste por internet). Revisa que el nivel y el período estén bien.',
          'Contacta al colegio que aparece en tu comprobante al menos 10 días hábiles antes para saber el día y la hora de cada prueba.',
          'El día del examen lleva tu cédula vigente, el comprobante impreso, lápiz, goma, calculadora y diccionario de inglés. El celular no se puede usar.',
          'Guarda el talón con código de barras de cada prueba. Lo necesitas si pides una recorrección.',
        ],
      },
      { type: 'h2', text: 'Cómo se aprueba' },
      {
        type: 'list',
        items: [
          'Apruebas si sacas 4,0 o más en todas las asignaturas.',
          'En media, si repruebas una sola asignatura que no sea Lenguaje ni Matemática, apruebas igual si tu promedio (contando la roja) es 4,5 o más. Si la reprobada es Lenguaje o Matemática, necesitas promedio 5,0 o más.',
          'No puedes eximirte de ninguna asignatura y no hay segunda oportunidad dentro del mismo período. Si no apruebas, te inscribes en el siguiente.',
          'Si repruebas, puedes pedir una recorrección en la Seremi de Educación de tu región dentro de 10 días hábiles desde los resultados. Revisa en Ayuda Mineduc las notas que permiten pedirla.',
        ],
      },
      {
        type: 'p',
        text: 'Los resultados se revisan en [ref.mineduc.cl](https://ref.mineduc.cl/) y el certificado se descarga gratis en [certificados.mineduc.cl](https://certificados.mineduc.cl/). Si tienes dudas, la mesa de Ayuda Mineduc atiende en el 600 600 2626.',
      },
      { type: 'h2', text: 'No tienes que estudiar solo' },
      {
        type: 'p',
        text: 'El Mineduc entrega los temarios, pero la preparación corre por tu cuenta. Para eso existe la Escuela de Sueños de Lael: te preparamos gratis para los exámenes libres, online y con clases en la noche desde las 20:00.',
      },
      {
        type: 'cta',
        title: 'Escuela de Sueños: termina el colegio gratis',
        text: 'Clases online en la noche para preparar los exámenes libres, en todos los niveles. Tu sueño no tiene fecha de vencimiento.',
        to: '/adultos',
        label: 'Conocer la Escuela de Sueños',
      },
    ],
  },

  // ------------------------------------------------------------------------
  {
    slug: 'homeschool-validar-estudios-chile',
    title: 'Homeschool en Chile: cómo validar los estudios de tus hijos',
    excerpt:
      'Si educas en casa, tus hijos certifican cada curso con los exámenes libres del Mineduc para menores de 18. Quién inscribe, qué curso corresponde, fechas y qué llevar.',
    category: 'Homeschool',
    date: '2026-09-23',
    updated: '2026-09-23',
    readingMinutes: 7,
    featured: false,
    sources: [
      { label: 'Ayuda Mineduc: Exámenes libres, menores de 18 años', url: 'https://www.ayudamineduc.cl/ficha/examenes-libres-menores-de-18-anos-11' },
      { label: 'Ayuda Mineduc: Resultados de exámenes de validación de estudios', url: 'https://www.ayudamineduc.cl/ficha/resultados-de-examenes-de-validacion-de-estudios-mayores-y-menores-de-18-anos' },
      { label: 'EPJA Mineduc: Calendario de examinación 2026', url: 'https://epja.mineduc.cl/calendario-de-examinacion-2026/' },
    ],
    body: [
      {
        type: 'p',
        text: 'Si tus hijos aprenden en casa, la forma de que sus estudios queden reconocidos en Chile es la **validación de estudios**, conocida como exámenes libres. Los niños rinden pruebas en un colegio que designa el Ministerio de Educación y, si aprueban, el curso queda certificado igual que en cualquier colegio. El trámite es gratis.',
      },
      { type: 'h2', text: 'Quién puede rendirlos' },
      {
        type: 'list',
        items: [
          'Niños y jóvenes menores de 18 años que no han ido al colegio, que interrumpieron sus estudios o que estudiaron en instituciones sin reconocimiento oficial.',
          'No pueden inscribirse si estuvieron matriculados en un colegio reconocido **durante el mismo año**, salvo por motivos de salud acreditados con certificado médico.',
          'Para 1° básico es obligatorio que el niño sepa leer y escribir en español al momento de rendir.',
        ],
      },
      { type: 'h2', text: 'El rol del apoderado' },
      {
        type: 'p',
        text: 'Solo el **padre, la madre o el tutor legal** puede inscribir al niño, por internet o en una oficina de Ayuda Mineduc. El Mineduc no acepta inscripciones hechas por instituciones privadas como programas de homeschool o escuelas libres. El apoderado también responde por la veracidad de los documentos y es quien se comunica con el colegio examinador, siempre por correo electrónico.',
      },
      { type: 'h2', text: 'Qué curso le corresponde' },
      {
        type: 'p',
        text: 'Depende de la edad cumplida al **31 de marzo** del año en que rinde y de su historia escolar:',
      },
      {
        type: 'table',
        head: ['Edad al 31 de marzo', 'Curso'],
        rows: [
          ['6 años', '1° básico'],
          ['7 años', '2° básico'],
          ['8 años', '3° básico'],
          ['9 años', '4° básico'],
          ['10 años', '5° básico'],
          ['11 años', '6° básico'],
          ['12 años', '7° básico'],
          ['13 años', '8° básico'],
          ['14 años', '1° medio'],
          ['15 años', '2° medio'],
          ['16 años', '3° medio'],
          ['17 años', '4° medio'],
        ],
      },
      {
        type: 'list',
        items: [
          'Si tu hijo viene validando año a año sin interrupciones, avanza **un curso por cada año escolar**.',
          'Si sus estudios se interrumpieron, la edad marca el curso máximo al que puede inscribirse. Si le faltan cursos de básica y de media, se hacen dos inscripciones separadas: primero termina la básica y después la media.',
          'Si reprobó el curso el año anterior, primero debe rendir ese curso.',
          'Si va adelantado respecto de su edad, la inscripción debe hacerse en forma presencial.',
        ],
      },
      { type: 'h2', text: 'Fechas 2026' },
      {
        type: 'table',
        head: ['Período', 'Quiénes', 'Inscripción', 'Exámenes', 'Resultados'],
        rows: [
          ['1°', 'Todos los cursos y estudiantes con NEE', '6 al 29 de abril', '8 al 19 de junio', 'Desde el 27 de julio'],
          ['2°', 'Solo 4° medio y estudiantes con NEE', '12 de mayo al 17 de julio', '21 de septiembre al 2 de octubre', 'Desde el 27 de octubre'],
          ['3°', 'Todos los cursos, excepto 4° medio y NEE', '12 de mayo al 17 de julio', '19 al 30 de octubre', 'Desde el 20 de noviembre'],
        ],
      },
      {
        type: 'callout',
        title: 'Si tu hijo está en 4° medio',
        text: '4° medio solo se puede rendir en el primer o segundo período (junio o septiembre), para que el certificado esté a tiempo para postular a la educación superior. Ojo: para la PAES también hay que inscribirse aparte en el DEMRE.',
      },
      {
        type: 'p',
        text: 'Las inscripciones de 2026 ya cerraron. Al 23 de septiembre de 2026 el Mineduc no ha publicado el calendario 2027. Como referencia, en 2026 la primera inscripción fue en abril.',
      },
      { type: 'h2', text: 'Cómo inscribir a tu hijo' },
      {
        type: 'list',
        ordered: true,
        items: [
          'Reúne los documentos: certificado de nacimiento del niño con menos de 3 meses de antigüedad (con el nombre de ambos padres) y tu cédula por ambos lados. Si eres tutor legal, el documento que lo acredita.',
          'Revisa que el certificado del último curso aprobado esté en línea en [certificados.mineduc.cl](https://certificados.mineduc.cl/). No hace falta adjuntarlo, pero debe estar disponible.',
          'Inscríbelo dentro del plazo en el formulario web de Ayuda Mineduc o en la oficina regional o provincial que corresponde a tu comuna.',
          'Espera el **comprobante de autorización**: llega en hasta 15 días hábiles si te inscribiste por internet y en 5 si fue presencial. Ahí aparece el colegio examinador.',
          'Escribe al colegio examinador al menos 10 días hábiles antes del período para saber el día y la hora de cada prueba.',
        ],
      },
      {
        type: 'p',
        text: 'Si tu hijo tiene necesidades educativas especiales (NEE), la inscripción es presencial y debes llevar dos certificados de un profesional competente: uno sobre el diagnóstico y otro sobre el requerimiento educativo.',
      },
      { type: 'h2', text: 'El colegio examinador y el día de la prueba' },
      {
        type: 'list',
        items: [
          'El Mineduc asigna un colegio (la entidad examinadora) según los cupos disponibles. Ese colegio toma las pruebas y pone las notas.',
          'Tu hijo debe llevar su cédula vigente (o certificado de nacimiento) y el comprobante de autorización. Sin eso no puede rendir.',
          'Materiales: lápiz, goma, calculadora (desde 5° básico) y diccionario de inglés.',
          'No hay eximiciones ni segunda oportunidad dentro del mismo período. Si no aprueba, se inscribe en el siguiente período disponible.',
        ],
      },
      { type: 'h2', text: 'Cómo preparar los exámenes' },
      {
        type: 'p',
        text: 'El Mineduc publica un temario por curso en la ficha de Ayuda Mineduc y, después de la autorización, da acceso a los textos escolares digitales. La preparación queda en manos de la familia. Estudiar con el temario al lado, hacer pruebas de práctica y reforzar a tiempo las asignaturas más difíciles marca la diferencia.',
      },
      { type: 'h2', text: 'Resultados, recorrección y certificados' },
      {
        type: 'list',
        items: [
          'Los resultados se revisan en [ref.mineduc.cl](https://ref.mineduc.cl/ref-cerlic/publicacion/busqueda).',
          'Si reprueba con una nota entre 3,0 y 3,9 en alguna asignatura, puedes pedir recorrección por correo al colegio examinador dentro de **3 días hábiles** desde la publicación de resultados.',
          'Los certificados se descargan en [certificados.mineduc.cl](https://certificados.mineduc.cl/) si el niño tiene RUT chileno. Con IPE se piden en una oficina de Ayuda Mineduc.',
        ],
      },
      {
        type: 'cta',
        title: 'Apoyo para las asignaturas que más cuestan',
        text: 'En Lael hacemos clases online en vivo. Revisa nuestro reforzamiento escolar y los talleres para acompañar a tus hijos durante el año.',
        to: '/reforzamiento',
        label: 'Ver reforzamiento',
        secondary: { to: '/talleres-ia', label: 'Ver talleres' },
      },
    ],
  },

  // ------------------------------------------------------------------------
  {
    slug: 'cuanto-necesito-para-entrar-calculadora',
    title: '¿Cuánto necesito para entrar? Cómo usar la calculadora de puntaje',
    excerpt:
      'En tres pasos sabes con qué puntaje postularías a cada carrera y si cumples los mínimos. Sirve también con los puntajes de tus ensayos.',
    category: 'PAES',
    date: '2026-09-23',
    updated: '2026-09-23',
    readingMinutes: 3,
    featured: false,
    sources: [
      { label: 'DEMRE: Factores de selección y cálculo del puntaje ponderado', url: 'https://demre.cl/paes/factores-seleccion/' },
      { label: 'DEMRE: Oferta definitiva de carreras, vacantes y ponderaciones, Proceso 2026', url: 'https://demre.cl/publicaciones/2026/2026-25-09-25-oferta-carreras-vacantes-ponderaciones-p2026' },
      { label: 'DEMRE: Calendario del Proceso de Admisión 2027', url: 'https://demre.cl/calendario/calendario-proceso-2027' },
    ],
    body: [
      {
        type: 'p',
        text: 'La pregunta que más nos hacen es "¿cuánto necesito para entrar a tal carrera?". La respuesta depende de la carrera, porque cada una pondera distinto tus puntajes. Con la [calculadora de Lael](/calculadora) lo ves en un minuto.',
      },
      { type: 'h2', text: 'Cómo usarla' },
      {
        type: 'list',
        ordered: true,
        items: [
          '**Pon tus puntajes** de 100 a 1.000: NEM, Ranking, Lectora, M1 y, si las diste, M2, Historia y Ciencias. Si todavía no das la PAES, usa los puntajes de tus ensayos.',
          '**Busca la carrera** por nombre y, si quieres, filtra por universidad.',
          '**Mira el resultado**: tu puntaje ponderado para esa carrera, las ponderaciones que usa y si cumples los mínimos que pide la universidad.',
        ],
      },
      {
        type: 'callout',
        title: 'Tus puntajes quedan guardados',
        text: 'La calculadora recuerda lo que escribiste en tu navegador, así que puedes volver después de cada ensayo y comparar.',
      },
      { type: 'h2', text: 'Cómo leer el resultado' },
      {
        type: 'list',
        items: [
          'Si **cumples los mínimos**, puedes postular a esa carrera. Quedar depende de cuántos postulan y con qué puntajes: el último seleccionado cambia cada año.',
          'Si **no los cumples**, fíjate qué prueba pesa más en esa carrera. Casi siempre subir M1 o Lectora es lo que más mueve el puntaje.',
          'Si la carrera pide **prueba especial** (por ejemplo, algunas de artes o actuación), la calculadora te avisa, porque esa parte la evalúa la universidad.',
        ],
      },
      {
        type: 'p',
        text: 'Hoy la calculadora usa las ponderaciones oficiales del proceso 2026. El DEMRE publica las de la Admisión 2027 el 24 de septiembre de 2026 y las cargaremos apenas estén disponibles. Si quieres entender de dónde sale cada número, lee [cómo funciona la PAES](/noticias/como-funciona-la-paes).',
      },
      {
        type: 'cta',
        title: 'Prueba la calculadora',
        text: 'Gratis y sin registrarte. Descubre cuántos puntos te faltan para la carrera que quieres.',
        to: '/calculadora',
        label: 'Calcular mi puntaje',
      },
    ],
  },
];

// ---- Funciones de ayuda (no hace falta tocarlas) ---------------------------

const byDateDesc = (a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0);

export const getAllNoticias = () => [...NOTICIAS].sort(byDateDesc);

export const getNoticia = (slug) => NOTICIAS.find((n) => n.slug === slug);

export const getLatestNoticias = (n = 3) => getAllNoticias().slice(0, n);

export const getRelatedNoticias = (post, n = 3) => {
  const others = getAllNoticias().filter((p) => p.slug !== post.slug);
  const same = others.filter((p) => p.category === post.category);
  const rest = others.filter((p) => p.category !== post.category);
  return [...same, ...rest].slice(0, n);
};

const MONTHS = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

// '2026-09-23' -> '23 de septiembre de 2026' (sin problemas de zona horaria)
export const formatFecha = (iso) => {
  const [y, m, d] = String(iso).split('-').map(Number);
  if (!y || !m || !d) return iso;
  return `${d} de ${MONTHS[m - 1]} de ${y}`;
};
