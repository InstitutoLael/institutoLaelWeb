import React, { lazy } from 'react';

// Páginas de programas nuevos, alianzas, referidos y alumnos.
// App.jsx carga este arreglo automáticamente (y ya lo envuelve en Suspense).
const Reforzamiento = lazy(() => import('../pages/Programas/Reforzamiento'));
const Orientacion = lazy(() => import('../pages/Programas/Orientacion'));
const Apoderados = lazy(() => import('../pages/Programas/Apoderados'));
const EnsayoGratis = lazy(() => import('../pages/Programas/EnsayoGratis'));
const TalleresIA = lazy(() => import('../pages/Programas/TalleresIA'));
const Alianzas = lazy(() => import('../pages/Programas/Alianzas'));
const TraeUnAmigo = lazy(() => import('../pages/Programas/TraeUnAmigo'));
const Alumnos = lazy(() => import('../pages/Programas/Alumnos'));

export const routes = [
  { path: '/reforzamiento', element: <Reforzamiento /> },
  { path: '/orientacion', element: <Orientacion /> },
  { path: '/apoderados', element: <Apoderados /> },
  { path: '/ensayo-gratis', element: <EnsayoGratis /> },
  { path: '/talleres-ia', element: <TalleresIA /> },
  { path: '/alianzas', element: <Alianzas /> },
  { path: '/trae-un-amigo', element: <TraeUnAmigo /> },
  { path: '/alumnos', element: <Alumnos /> },
];
