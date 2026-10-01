// Página de inicio pre-dibujada: este archivo se compila aparte (npm run build)
// y genera el HTML de la Home completa, que scripts/shell.cjs pone dentro de
// <div id="root"> en dist/index.html. Así el celular la ve antes de que cargue
// el JavaScript; después React la "hidrata" (adopta ese HTML) en src/main.jsx.
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.jsx';

export function render() {
  return renderToString(
    <React.StrictMode>
      <HelmetProvider context={{}}>
        <StaticRouter location="/">
          <App />
        </StaticRouter>
      </HelmetProvider>
    </React.StrictMode>
  );
}
