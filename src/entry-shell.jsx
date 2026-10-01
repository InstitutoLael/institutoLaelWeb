// Portada pre-dibujada: este archivo se compila aparte (npm run build) y
// genera el HTML de la portada de la Home, que scripts/shell.cjs pone dentro
// de <div id="root"> en dist/index.html. Así el celular ve la portada antes de
// que cargue el JavaScript; después React la toma sin parpadeo.
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import HomeHero from './components/home/HomeHero';

export function render() {
  return renderToStaticMarkup(
    <MemoryRouter>
      {/* Mismos contenedores que App.jsx → main → PageTransition → Home */}
      <div className="flex flex-col min-h-screen relative z-10">
        <main className="flex-grow pt-20">
          <div className="w-full h-full">
            <div className="overflow-x-clip">
              <HomeHero modo="css" />
            </div>
          </div>
        </main>
      </div>
    </MemoryRouter>
  );
}
