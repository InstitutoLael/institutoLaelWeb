// src/data/inscripcion.js
// Programas del formulario de inscripción (/inscripcion?programa=<id>).
// Para agregar un programa, suma un objeto a PROGRAMAS. Los códigos de curso
// (cupo) deben coincidir con la hoja "Cursos" de la planilla de inscripciones.
import { OBLIGATORIA_PRICE, ELECTIVA_PRICE, PACK_PRICE, PACK_MIN_SUBJECTS, clp } from './paes';
import { VERANO_COURSES } from './verano';

export const PAES_RAMOS = [
  { cupo: 'paes-m1', nombre: 'Matemática M1', obligatoria: true },
  { cupo: 'paes-cl', nombre: 'Competencia Lectora', obligatoria: true },
  { cupo: 'paes-m2', nombre: 'Matemática M2' },
  { cupo: 'paes-bio', nombre: 'Biología' },
  { cupo: 'paes-qui', nombre: 'Química' },
  { cupo: 'paes-fis', nombre: 'Física' },
  { cupo: 'paes-his', nombre: 'Historia' },
];

// Precio mensual PAES según los ramos elegidos (misma regla que la página /paes)
export function precioPaes(cupos) {
  const ramos = PAES_RAMOS.filter((r) => cupos.includes(r.cupo));
  const suma = ramos.reduce((t, r) => t + (r.obligatoria ? OBLIGATORIA_PRICE : ELECTIVA_PRICE), 0);
  const completo = ramos.length >= PACK_MIN_SUBJECTS && suma > PACK_PRICE;
  return { total: completo ? PACK_PRICE : suma, suma, completo, cantidad: ramos.length };
}

export { clp };

// tipo: 'inscripcion' (cuenta cupo) | 'clase-prueba' | 'aviso' (próximamente) | 'registro' (charlas y eventos gratis)
export const PROGRAMAS = [
  { id: 'paes', nombre: 'Preu PAES 2027', tipo: 'inscripcion', eleccion: 'ramos', nota: 'Partimos la primera semana de marzo. Máximo 20 alumnos por curso.' },
  { id: 'clase-prueba', nombre: 'Clase de prueba gratis', tipo: 'clase-prueba', eleccion: 'prueba', nota: 'Vas a una clase en vivo sin compromiso y después decides.' },
  { id: 'ingles', nombre: 'Inglés · Hablar sin miedo', tipo: 'inscripcion', cupo: 'ingles', nota: '$14.990 al mes, o $11.990 al mes pagando el trimestre. Matrícula gratis.' },
  { id: 'espanol', nombre: 'Español para extranjeros', tipo: 'inscripcion', cupo: 'espanol', nota: 'Clases en vivo con Diego Chaparro.' },
  { id: 'adultos', nombre: 'Escuela de Sueños (nivelación de estudios)', tipo: 'inscripcion', cupo: 'adultos', eleccion: 'nivel', nota: 'Gratis. Para mayores de 18. Clases en la noche desde las 20:00.' },
  { id: 'nivelacion-paes', nombre: 'Nivelación + PAES', tipo: 'inscripcion', cupo: 'adultos', nota: 'Terminas la media gratis y sigues a la PAES.' },
  { id: 'verano', nombre: 'Verano Lael 2027', tipo: 'inscripcion', eleccion: 'verano', nota: 'Cursos cortos en enero.' },
  { id: 'reforzamiento', nombre: 'Reforzamiento escolar (7° básico a 2° medio)', tipo: 'inscripcion', cupo: 'reforzamiento', eleccion: 'asignatura' },
  { id: 'talleres-ia', nombre: 'Talleres de IA para estudiantes', tipo: 'inscripcion', cupo: 'talleres-ia' },
  { id: 'orientacion', nombre: 'Orientación vocacional', tipo: 'inscripcion', cupo: 'orientacion' },
  { id: 'apoderados', nombre: 'Charla para apoderados (gratis)', tipo: 'registro' },
  { id: 'ensayo-gratis', nombre: 'Ensayo PAES gratis', tipo: 'registro' },
  { id: 'lsch', nombre: 'Lengua de Señas Chilena (avísame cuando abra)', tipo: 'aviso' },
  { id: 'coreano', nombre: 'Coreano (avísame cuando abra)', tipo: 'aviso' },
];

export const NIVELES_ADULTOS = ['Enseñanza básica', 'Primer Nivel Medio (1° y 2° medio)', 'Segundo Nivel Medio (3° y 4° medio)', 'No sé, necesito orientación'];
export const ASIGNATURAS_REFORZAMIENTO = ['Matemática', 'Lenguaje', 'Ciencias', 'Inglés'];
export const PRUEBA_OPCIONES = ['PAES · Matemática M1', 'PAES · Competencia Lectora', 'PAES · otra asignatura', 'Inglés', 'Reforzamiento escolar'];
export const VERANO_OPCIONES = VERANO_COURSES.map((c) => ({ cupo: `verano-${c.id}`, nombre: c.name, precio: c.price }));
export const COMO_CONOCIO = ['Instagram', 'YouTube', 'Google', 'Un amigo o familiar', 'Mi colegio', 'Mi iglesia o comunidad', 'Ya fui alumno', 'Otro'];

export const programaPorId = (id) => PROGRAMAS.find((p) => p.id === id) || PROGRAMAS[0];
