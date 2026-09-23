import React, { lazy } from 'react';

// Rutas de "Noticias y guías". App.jsx carga este archivo solo.
const NoticiasIndex = lazy(() => import('../pages/noticias/NoticiasIndex'));
const NoticiaArticle = lazy(() => import('../pages/noticias/NoticiaArticle'));

export const routes = [
  { path: '/noticias', element: <NoticiasIndex /> },
  { path: '/noticias/:slug', element: <NoticiaArticle /> },
];

