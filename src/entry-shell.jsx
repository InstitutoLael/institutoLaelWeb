// Páginas pre-dibujadas: este archivo se compila aparte (npm run build) y
// genera el HTML de la Home y de las páginas de programa más visitadas, que
// scripts/shell.cjs pone dentro de <div id="root">. Así el celular las ve
// antes de que cargue el JavaScript; después React las "hidrata" (adopta ese
// HTML) en src/main.jsx. Reglas para que calce: src/lib/hidratacion.js.
import React from 'react';
import { renderToPipeableStream } from 'react-dom/server';
import { Writable } from 'node:stream';
import { StaticRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.jsx';
import { colorDeRuta } from './data/catalogo';

export function render(url) {
  return new Promise((resolve, reject) => {
    let html = '';
    const destino = new Writable({
      write(chunk, _enc, cb) { html += chunk.toString(); cb(); },
      final(cb) { resolve({ html, color: colorDeRuta(url) }); cb(); },
    });
    const { pipe } = renderToPipeableStream(
      <React.StrictMode>
        <HelmetProvider context={{}}>
          <StaticRouter location={url}>
            <App />
          </StaticRouter>
        </HelmetProvider>
      </React.StrictMode>,
      {
        // Espera a que carguen las páginas "perezosas" (lazy) antes de escribir
        onAllReady() { pipe(destino); },
        onShellError: reject,
        onError(e) { reject(e); },
      },
    );
  });
}
