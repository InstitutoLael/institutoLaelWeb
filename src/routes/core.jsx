import React, { lazy } from 'react';

const Gracias = lazy(() => import('../pages/Gracias'));
const Testimonio = lazy(() => import('../pages/Testimonio'));

export const routes = [
  { path: '/gracias', element: <Gracias /> },
  { path: '/testimonio', element: <Testimonio /> },
];
