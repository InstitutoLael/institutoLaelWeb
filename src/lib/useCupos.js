import { useEffect, useState } from 'react';
import { getCupos } from './backend';

// Devuelve { [codigoCurso]: { nombre, maximo, quedan } } o null si no hay datos.
export default function useCupos() {
  const [cupos, setCupos] = useState(null);
  useEffect(() => {
    let alive = true;
    getCupos().then((c) => { if (alive) setCupos(c); });
    return () => { alive = false; };
  }, []);
  return cupos;
}
