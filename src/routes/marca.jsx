import React, { lazy } from 'react';

// Página de marca (logo, variantes de color, paleta y tipografía).
// App.jsx carga este arreglo automáticamente.
const Marca = lazy(() => import('../pages/Marca'));

export const routes = [
  { path: '/marca', element: <Marca /> },
];
