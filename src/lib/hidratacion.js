// La portada (/) llega dibujada en el HTML (ver src/entry-shell.jsx) y React
// la "hidrata": adopta ese HTML en vez de dibujarlo de nuevo. Para eso, el
// primer dibujo en el navegador tiene que ser idéntico al del servidor, así
// que lo que depende del navegador (sessionStorage, tema, "reducir
// movimiento"…) se decide recién después, en un efecto.
//
// primeraPintura(): true en el servidor y en el navegador mientras dura esa
// primera hidratación (App.jsx apaga la marca apenas termina).
export const enServidor = typeof window === 'undefined';

export function primeraPintura() {
  return enServidor || !!window.__laelShell;
}

// "Ahora" para lo que depende de la fecha (cuenta regresiva, intensivo…):
// en la primera pintura se usa la hora en que se pre-dibujó la página, así
// el resultado es idéntico; después, la hora real.
export function ahora() {
  if (enServidor && globalThis.__laelShellT) return globalThis.__laelShellT;
  if (!enServidor && window.__laelShell && window.__laelShellT) return window.__laelShellT;
  return Date.now();
}
