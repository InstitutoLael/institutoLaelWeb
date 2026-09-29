import React, { lazy } from 'react';

// Páginas de apoyo: becas, pagos, condiciones, calendario, glosario, test de
// inglés, versión en inglés de Español, encuesta y "así es una clase".
// App.jsx carga este arreglo automáticamente.
const Becas = lazy(() => import('../pages/Becas'));
const ComoPagar = lazy(() => import('../pages/ComoPagar'));
const Condiciones = lazy(() => import('../pages/Condiciones'));
const CalendarioAdmision = lazy(() => import('../pages/CalendarioAdmision'));
const GlosarioPaes = lazy(() => import('../pages/GlosarioPaes'));
const TestNivel = lazy(() => import('../pages/Idiomas/TestNivel'));
const SpanishEnglish = lazy(() => import('../pages/Idiomas/SpanishEnglish'));
const Encuesta = lazy(() => import('../pages/Encuesta'));
const MetodoLael = lazy(() => import('../pages/MetodoLael'));

export const routes = [
  { path: '/becas', element: <Becas /> },
  { path: '/como-pagar', element: <ComoPagar /> },
  { path: '/condiciones', element: <Condiciones /> },
  { path: '/reglamento', element: <Condiciones /> },
  { path: '/calendario-admision', element: <CalendarioAdmision /> },
  { path: '/glosario-paes', element: <GlosarioPaes /> },
  { path: '/idiomas/test', element: <TestNivel /> },
  { path: '/test-ingles', element: <TestNivel /> },
  { path: '/en/spanish', element: <SpanishEnglish /> },
  { path: '/encuesta', element: <Encuesta /> },
  { path: '/como-es-una-clase', element: <MetodoLael /> },
];
