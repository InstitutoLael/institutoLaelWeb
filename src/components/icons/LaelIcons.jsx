import React from 'react';

/*
 * Íconos propios de Instituto Lael.
 *
 * Estilo: grilla 24×24, trazo redondeado de 2px en `currentColor`
 * y UN solo acento relleno (por defecto amarillo Lael #D7E400):
 * un destello, un punto, un ala de paloma… guiños al logo.
 *
 * Uso:  <ClaseEnVivo size={24} className="text-white" />
 *       <Beca accent="#FFFFFF" />             // p. ej. sobre fondo amarillo
 *       <Paloma title="Instituto Lael" />      // con título => deja de ser decorativo
 *
 * Sobre azul marino: trazo blanco (text-white) + acento amarillo.
 * Sobre blanco: trazo azul marino; el acento amarillo es solo decoración,
 * el significado siempre lo lleva el trazo.
 */

export const LAEL_YELLOW = '#D7E400';

// Destello de 4 puntas (la "luz" de Lael).
const spark = (cx, cy, r) => {
  const k = r * 0.2;
  return `M${cx} ${cy - r}Q${cx + k} ${cy - k} ${cx + r} ${cy}Q${cx + k} ${cy + k} ${cx} ${cy + r}Q${cx - k} ${cy + k} ${cx - r} ${cy}Q${cx - k} ${cy - k} ${cx} ${cy - r}Z`;
};

function createIcon(displayName, render) {
  const Icon = React.forwardRef(function LaelIcon(
    { size = 24, className, accent = LAEL_YELLOW, strokeWidth = 2, title, color, style, ...rest },
    ref,
  ) {
    const a11y = title
      ? { role: 'img', 'aria-label': title }
      : { 'aria-hidden': rest['aria-hidden'] ?? true, focusable: 'false' };
    return (
      <svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        style={color ? { color, ...style } : style}
        {...rest}
        {...a11y}
      >
        {title ? <title>{title}</title> : null}
        {render(accent)}
      </svg>
    );
  });
  Icon.displayName = displayName;
  return Icon;
}

/* ── Clases y estudio ─────────────────────────────────────────────── */

export const ClaseEnVivo = createIcon('ClaseEnVivo', (a) => (
  <>
    <rect x="2.5" y="3.5" width="19" height="13.5" rx="3" />
    <path d="M9 21h6M12 17v4" />
    <circle cx="10" cy="9" r="2.1" />
    <path d="M6.3 14c.6-1.5 2-2.3 3.7-2.3s3.1.8 3.7 2.3" />
    <circle cx="17.2" cy="7.6" r="1.9" fill={a} stroke="none" />
  </>
));

export const Grabacion = createIcon('Grabacion', (a) => (
  <>
    <path d="M3.5 12a8.5 8.5 0 1 0 2.6-6.1L3.5 8.4" />
    <path d="M3.5 3.8v4.6h4.6" />
    <path d="M10.2 8.9v6.2a.6.6 0 0 0 .9.5l4.8-3.1a.6.6 0 0 0 0-1l-4.8-3.1a.6.6 0 0 0-.9.5z" fill={a} strokeWidth="1.6" />
  </>
));

export const Recuperativa = createIcon('Recuperativa', (a) => (
  <>
    <path d="M3.5 12a8.5 8.5 0 1 0 2.6-6.1L3.5 8.4" />
    <path d="M3.5 3.8v4.6h4.6" />
    <path d="M12 7.8V12l2.8 1.8" />
    <circle cx="12" cy="12" r="1.5" fill={a} stroke="none" />
  </>
));

export const Ensayo = createIcon('Ensayo', (a) => (
  <>
    <path d="M14 2.5H7A2.5 2.5 0 0 0 4.5 5v14A2.5 2.5 0 0 0 7 21.5h10a2.5 2.5 0 0 0 2.5-2.5V8z" />
    <path d="M14 2.5V6a2 2 0 0 0 2 2h3.5" />
    <circle cx="8.9" cy="8" r="1.7" fill={a} stroke="none" />
    <path d="M8 12.5h4M8 16.5h2.5" />
    <path d="M12.5 16.2l1.8 1.8 3.2-3.6" />
  </>
));

export const Guia = createIcon('Guia', (a) => (
  <>
    <path d="M12 6.6C10.2 5.1 7.6 4.5 3 4.5v13.2c4.6 0 7.2.6 9 2.1 1.8-1.5 4.4-2.1 9-2.1V4.5c-4.6 0-7.2.6-9 2.1z" />
    <path d="M12 6.6v13.2" />
    <path d="M15.2 5.3v6.2l1.7-1.3 1.7 1.3V4.9" fill={a} strokeWidth="1.6" />
  </>
));

export const Documento = createIcon('Documento', (a) => (
  <>
    <path d="M14 2.5H7A2.5 2.5 0 0 0 4.5 5v14A2.5 2.5 0 0 0 7 21.5h10a2.5 2.5 0 0 0 2.5-2.5V8z" />
    <path d="M14 2.5V6a2 2 0 0 0 2 2h3.5" />
    <path d="M8 11.5h7M8 15h4" />
    <circle cx="15.5" cy="17.2" r="1.9" fill={a} stroke="none" />
  </>
));

export const Lista = createIcon('Lista', (a) => (
  <>
    <path d="M11 6h9.5M11 12h9.5M11 18h9.5" />
    <path d="M3.5 6l1.6 1.6 3-3.2M3.5 12l1.6 1.6 3-3.2" />
    <circle cx="5.6" cy="18" r="1.9" fill={a} stroke="none" />
  </>
));

export const Calculadora = createIcon('Calculadora', (a) => (
  <>
    <rect x="4.5" y="2.5" width="15" height="19" rx="3" />
    <rect x="7.5" y="5.5" width="9" height="4" rx="1.2" fill={a} strokeWidth="1.6" />
    <g fill="currentColor" stroke="none">
      <circle cx="8.7" cy="13.3" r="1.05" />
      <circle cx="12" cy="13.3" r="1.05" />
      <circle cx="15.3" cy="13.3" r="1.05" />
      <circle cx="8.7" cy="17.3" r="1.05" />
      <circle cx="12" cy="17.3" r="1.05" />
    </g>
    <path d="M15.3 16.6v1.4" />
  </>
));

export const Diagnostico = createIcon('Diagnostico', (a) => (
  <>
    <circle cx="12" cy="12" r="8" />
    <circle cx="12" cy="12" r="4.2" />
    <path d="M12 1.8v2.7M12 19.5v2.7M1.8 12h2.7M19.5 12h2.7" />
    <circle cx="12" cy="12" r="1.7" fill={a} stroke="none" />
  </>
));

export const Ruta = createIcon('Ruta', (a) => (
  <>
    <circle cx="5" cy="19" r="2" />
    <path d="M7 19h6.5a3 3 0 0 0 0-6h-3a3 3 0 0 1 0-6H13" />
    <path d="M18 11s-3.2-3-3.2-5.4a3.2 3.2 0 0 1 6.4 0C21.2 8 18 11 18 11z" fill={a} strokeWidth="1.6" />
  </>
));

export const Resultados = createIcon('Resultados', (a) => (
  <>
    <path d="M3.5 3.5v14a3 3 0 0 0 3 3h14" />
    <path d="M7.5 15.5l3.4-4 3 2.4 4.1-5" />
    <path d={spark(18.6, 5.6, 2.6)} fill={a} stroke="none" />
  </>
));

export const IA = createIcon('IA', (a) => (
  <>
    <rect x="5" y="5" width="14" height="14" rx="3.2" />
    <path d="M9 2.5V5M15 2.5V5M9 19v2.5M15 19v2.5M2.5 9H5M2.5 15H5M19 9h2.5M19 15h2.5" />
    <path d={spark(12, 12, 4.2)} fill={a} strokeWidth="1.4" />
  </>
));

export const Crear = createIcon('Crear', (a) => (
  <>
    <path d="M12 3a9 9 0 0 0 0 18c1.1 0 1.9-.8 1.9-1.8 0-.5-.2-.9-.5-1.2a1.9 1.9 0 0 1 1.4-3.2H17a4 4 0 0 0 4-4C21 6.6 17 3 12 3z" />
    <g fill="currentColor" stroke="none">
      <circle cx="7.4" cy="11.6" r="1.2" />
      <circle cx="9.4" cy="7.4" r="1.2" />
      <circle cx="14.4" cy="7.2" r="1.2" />
    </g>
    <circle cx="17.2" cy="10.6" r="1.7" fill={a} stroke="none" />
  </>
));

export const Idioma = createIcon('Idioma', (a) => (
  <>
    <path d="M5 3h7.5A2.5 2.5 0 0 1 15 5.5v4a2.5 2.5 0 0 1-2.5 2.5H8.2L5 14.6V12a2.5 2.5 0 0 1-2.5-2.5v-4A2.5 2.5 0 0 1 5 3z" />
    <path d="M6.6 10l2.1-4.8 2.1 4.8M7.4 8.3h2.6" strokeWidth="1.6" />
    <path d="M11.5 10.5h7A2.5 2.5 0 0 1 21 13v3.5a2.5 2.5 0 0 1-2.5 2.5V21.5L15.3 19h-3.8A2.5 2.5 0 0 1 9 16.5V13a2.5 2.5 0 0 1 2.5-2.5z" fill={a} />
  </>
));

export const Graduacion = createIcon('Graduacion', (a) => (
  <>
    <path d="M12 4.5L2.5 9.2 12 14l9.5-4.8z" />
    <path d="M6.2 11.3v4.4c0 1.5 2.6 3 5.8 3s5.8-1.5 5.8-3v-4.4" />
    <path d="M19.8 10.1v4.3" />
    <circle cx="19.8" cy="16.4" r="1.8" fill={a} stroke="none" />
  </>
));

export const Certificado = createIcon('Certificado', (a) => (
  <>
    <circle cx="12" cy="9" r="6.3" />
    <path d="M8.6 14.3L7.2 21.5l4.8-2.4 4.8 2.4-1.4-7.2" />
    <path d={spark(12, 9, 3.3)} fill={a} stroke="none" />
  </>
));

/* ── Personas y comunidad ─────────────────────────────────────────── */

export const Grupo = createIcon('Grupo', (a) => (
  <>
    <circle cx="12" cy="7.5" r="3" fill={a} />
    <path d="M6.3 20c.4-3.2 2.8-5.5 5.7-5.5s5.3 2.3 5.7 5.5" />
    <circle cx="5" cy="9.8" r="2.1" />
    <circle cx="19" cy="9.8" r="2.1" />
    <path d="M2 17.5c.2-1.9 1.3-3.3 3-3.8M22 17.5c-.2-1.9-1.3-3.3-3-3.8" />
  </>
));

export const Amigo = createIcon('Amigo', (a) => (
  <>
    <circle cx="8.3" cy="8.3" r="2.9" />
    <path d="M2.8 20c.3-3 2.6-5.1 5.5-5.1 1.4 0 2.6.5 3.6 1.3" />
    <circle cx="15.2" cy="11.4" r="2.3" fill={a} />
    <path d="M11.2 20.5c.3-2.4 1.9-4 4-4s3.7 1.6 4 4" />
    <path d="M19 2.8v4.4M16.8 5h4.4" />
  </>
));

export const Familia = createIcon('Familia', (a) => (
  <>
    <circle cx="6.5" cy="6" r="2.5" />
    <circle cx="17.5" cy="6" r="2.5" />
    <path d="M2.5 19.5v-4.8a4 4 0 0 1 6.9-2.8M21.5 19.5v-4.8a4 4 0 0 0-6.9-2.8" />
    <circle cx="12" cy="13" r="2" fill={a} />
    <path d="M8.8 21a3.2 3.2 0 0 1 6.4 0" />
  </>
));

export const Cuenta = createIcon('Cuenta', (a) => (
  <>
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="10" r="3" fill={a} />
    <path d="M6.6 18.2a6.3 6.3 0 0 1 10.8 0" />
  </>
));

export const Acompanamiento = createIcon('Acompanamiento', (a) => (
  <>
    <path d="M12 12.6s-3.6-2.1-3.6-4.8A1.95 1.95 0 0 1 12 6.7a1.95 1.95 0 0 1 3.6 1.1c0 2.7-3.6 4.8-3.6 4.8z" fill={a} strokeWidth="1.6" />
    <path d="M3.5 9.5v5.9a4 4 0 0 0 1.2 2.9l2.6 2.6" />
    <path d="M3.5 9.5a1.5 1.5 0 0 1 3 0v4l3 3" />
    <path d="M20.5 9.5v5.9a4 4 0 0 1-1.2 2.9l-2.6 2.6" />
    <path d="M20.5 9.5a1.5 1.5 0 0 0-3 0v4l-3 3" />
  </>
));

export const Beca = createIcon('Beca', (a) => (
  <>
    <circle cx="15.5" cy="6.5" r="3.4" fill={a} />
    <path d="M2.5 16.5l3.3-3.3a3 3 0 0 1 2.1-.9H13a1.8 1.8 0 0 1 0 3.6h-2.5" />
    <path d="M6.5 20.5l1.2-1a3 3 0 0 1 1.9-.7h4.2c.9 0 1.8-.4 2.4-1l4-4a1.7 1.7 0 0 0-2.4-2.4l-3.3 3.2" />
  </>
));

export const Senas = createIcon('Senas', (a) => (
  <>
    <path d="M9 12.5V5a1.5 1.5 0 0 1 3 0v6" />
    <path d="M12 10.5V3.8a1.5 1.5 0 0 1 3 0v6.7" />
    <path d="M15 10.5V5.8a1.5 1.5 0 0 1 3 0V14a7.5 7.5 0 0 1-7.5 7.5h-.6a7 7 0 0 1-5.5-2.7l-2.6-3.4a1.6 1.6 0 0 1 2.4-2.1L9 16" />
    <path d={spark(5, 5.2, 2.5)} fill={a} stroke="none" />
  </>
));

export const Corazon = createIcon('Corazon', (a) => (
  <>
    <path d="M12 20.5s-8.5-4.8-8.5-11A4.6 4.6 0 0 1 12 6.9a4.6 4.6 0 0 1 8.5 2.6c0 6.2-8.5 11-8.5 11z" />
    <path d={spark(12, 12.2, 3)} fill={a} stroke="none" />
  </>
));

/* ── Tiempo y lugar ───────────────────────────────────────────────── */

export const Calendario = createIcon('Calendario', (a) => (
  <>
    <rect x="3" y="4.5" width="18" height="16.5" rx="3" />
    <path d="M8 2.5v4M16 2.5v4M3 9.8h18" />
    <g fill="currentColor" stroke="none">
      <circle cx="7.6" cy="13.8" r="1.05" />
      <circle cx="11.2" cy="13.8" r="1.05" />
      <circle cx="7.6" cy="17.3" r="1.05" />
      <circle cx="11.2" cy="17.3" r="1.05" />
    </g>
    <rect x="14" y="12.6" width="3.9" height="3.9" rx="1.1" fill={a} stroke="none" />
  </>
));

export const Reloj = createIcon('Reloj', (a) => (
  <>
    <path d="M12 13.5V8.2a5.3 5.3 0 0 1 4.6 2.65z" fill={a} stroke="none" />
    <circle cx="12" cy="13.5" r="8" />
    <path d="M10 2.5h4M12 2.5v3M18.4 6.2l1.3-1.3" />
    <path d="M12 13.5V9.5" />
  </>
));

export const HorarioNoche = createIcon('HorarioNoche', (a) => (
  <>
    <path d="M20 14.6A8.5 8.5 0 1 1 9.4 4a6.8 6.8 0 0 0 10.6 10.6z" />
    <path d={spark(17.6, 5.4, 2.7)} fill={a} stroke="none" />
  </>
));

export const Online = createIcon('Online', (a) => (
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3c-2.4 2.5-3.7 5.5-3.7 9s1.3 6.5 3.7 9M12 3c2.4 2.5 3.7 5.5 3.7 9s-1.3 6.5-3.7 9" />
    <circle cx="19" cy="5" r="2.4" fill={a} />
  </>
));

export const Conexion = createIcon('Conexion', (a) => (
  <>
    <path d="M2.5 9a13.5 13.5 0 0 1 19 0M5.6 12.4a9 9 0 0 1 12.8 0M8.8 15.8a4.5 4.5 0 0 1 6.4 0" />
    <circle cx="12" cy="19.6" r="1.8" fill={a} stroke="none" />
  </>
));

export const Dispositivo = createIcon('Dispositivo', (a) => (
  <>
    <path d="M13 16.5H4.5V6A1.5 1.5 0 0 1 6 4.5h12A1.5 1.5 0 0 1 19.5 6v2.5" />
    <path d="M2.5 19.5H13" />
    <rect x="15.5" y="10.5" width="6" height="10.5" rx="1.6" fill={a} />
  </>
));

/* ── Lugares ──────────────────────────────────────────────────────── */

export const Escuela = createIcon('Escuela', (a) => (
  <>
    <path d="M2.5 10.2L12 5l9.5 5.2M4.8 9v12M19.2 9v12M2.5 21h19" />
    <path d="M10 21v-3.2a2 2 0 0 1 4 0V21" />
    <circle cx="12" cy="11.6" r="1.8" />
    <path d="M12 5V1.8" />
    <path d="M12 1.8h3.6l-1 1.3 1 1.3H12z" fill={a} strokeWidth="1.4" />
  </>
));

export const Iglesia = createIcon('Iglesia', (a) => (
  <>
    <path d="M12 1.8v4.2M10.2 3.6h3.6" />
    <path d="M7.5 21v-9L12 7.5l4.5 4.5v9" />
    <path d="M7.5 14.3L3.5 16.5V21M16.5 14.3l4 2.2V21M2.5 21h19" />
    <path d="M10.4 21v-2.4a1.6 1.6 0 0 1 3.2 0V21z" fill={a} strokeWidth="1.6" />
  </>
));

export const Empresa = createIcon('Empresa', (a) => (
  <>
    <path d="M4.5 21V5a2 2 0 0 1 2-2h6.5a2 2 0 0 1 2 2v16" />
    <path d="M15 9h2.5a2 2 0 0 1 2 2v10M2.5 21h19" />
    <path d="M8 7.5h3.5M8 11.5h3.5M8 15.5h3.5" />
    <rect x="16" y="12.6" width="2.3" height="2.3" rx=".6" fill={a} stroke="none" />
  </>
));

export const Megafono = createIcon('Megafono', (a) => (
  <>
    <path d="M3.5 10v3.5A1.5 1.5 0 0 0 5 15h2l7 4.5v-15L7 8.5H5A1.5 1.5 0 0 0 3.5 10z" />
    <path d="M7.3 15.2l1.1 4.8" />
    <path d="M17.5 9.2a3.8 3.8 0 0 1 0 5.6" />
    <path d={spark(20.2, 5.4, 2.4)} fill={a} stroke="none" />
  </>
));

/* ── Comunicación, pagos y confianza ─────────────────────────────── */

export const Mensaje = createIcon('Mensaje', (a) => (
  <>
    <path d="M15.5 4h-9A2.5 2.5 0 0 0 4 6.5V14a2.5 2.5 0 0 0 2.5 2.5v4l4.5-4h6.5A2.5 2.5 0 0 0 20 14v-3.5" />
    <g fill="currentColor" stroke="none">
      <circle cx="8.4" cy="10.3" r="1.1" />
      <circle cx="12" cy="10.3" r="1.1" />
    </g>
    <circle cx="19.2" cy="4.8" r="2.5" fill={a} />
  </>
));

export const Correo = createIcon('Correo', (a) => (
  <>
    <rect x="2.5" y="5" width="19" height="14.5" rx="3" />
    <path d="M3.5 7l7 5.3a2.5 2.5 0 0 0 3 0l7-5.3" />
    <path d={spark(18.3, 15.6, 2.2)} fill={a} stroke="none" />
  </>
));

export const Pago = createIcon('Pago', (a) => (
  <>
    <rect x="2.5" y="5" width="19" height="14" rx="3" />
    <path d="M2.5 9.5h19M14 15.3h4" />
    <rect x="5.5" y="12.6" width="4.4" height="3.3" rx="1" fill={a} stroke="none" />
  </>
));

export const Regalo = createIcon('Regalo', (a) => (
  <>
    <rect x="3" y="7.8" width="18" height="4" rx="1.2" />
    <path d="M4.5 11.8V19a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-7.2M12 7.8V21" />
    <path d="M12 7.8C10 7.8 7.5 7 7.5 5.1a1.8 1.8 0 0 1 3-1.3c1 .9 1.5 2.6 1.5 4zM12 7.8c2 0 4.5-.8 4.5-2.7a1.8 1.8 0 0 0-3-1.3c-1 .9-1.5 2.6-1.5 4z" fill={a} strokeWidth="1.6" />
  </>
));

export const Escudo = createIcon('Escudo', (a) => (
  <>
    <path d="M11 21.5s-7-3-7-9.2V6.1l7-3 7 3v6.2c0 6.2-7 9.2-7 9.2z" />
    <path d="M8 12l2.1 2.1 4-4.2" />
    <path d={spark(19.6, 4.2, 2.4)} fill={a} stroke="none" />
  </>
));

export const Check = createIcon('Check', (a) => (
  <>
    <path d="M20.3 10.6A8.5 8.5 0 1 1 15.6 4.3" />
    <path d="M8 12.2l2.8 2.8 5.4-5.8" />
    <path d={spark(19.4, 4.7, 2.5)} fill={a} stroke="none" />
  </>
));

/* ── Marca ───────────────────────────────────────────────────────── */

// Paloma en vuelo, como la del logo (sobre la "E").
export const Paloma = createIcon('Paloma', (a) => (
  <>
    <path d="M11.4 13.2C10.6 8.9 8.4 5.6 4.6 3.7c-.7 4.4 1.4 8.3 5.3 10.3" fill={a} strokeWidth="1.6" />
    <path d="M21.3 7.4l-2-.5a2.7 2.7 0 0 0-4.9.9l-.4 1.7c-.7 2.9-3.2 5.3-6.2 5.6L3 15.6c1.7 2.8 4.8 4.4 8 4.1a7.2 7.2 0 0 0 6.6-6.4l.4-3.6 3.3-2.3z" />
    <circle cx="16.4" cy="7.6" r=".4" fill="currentColor" stroke="none" />
  </>
));

// La onda infinita de las letras del logo.
export const Infinito = createIcon('Infinito', (a) => (
  <>
    <path d="M12 12.5c-1.7-2.5-3.2-4-5.2-4a4 4 0 0 0 0 8c2 0 3.5-1.5 5.2-4s3.2-4 5.2-4a4 4 0 0 1 0 8c-2 0-3.5-1.5-5.2-4z" />
    <path d={spark(12, 4.6, 2.5)} fill={a} stroke="none" />
  </>
));

/* ── Mapa para el catálogo /iconos ─────────────────────────────────── */

export const ICONS = {
  ClaseEnVivo,
  Grabacion,
  Recuperativa,
  Ensayo,
  Guia,
  Documento,
  Lista,
  Calculadora,
  Diagnostico,
  Ruta,
  Resultados,
  IA,
  Crear,
  Idioma,
  Graduacion,
  Certificado,
  Grupo,
  Amigo,
  Familia,
  Cuenta,
  Acompanamiento,
  Beca,
  Senas,
  Corazon,
  Calendario,
  Reloj,
  HorarioNoche,
  Online,
  Conexion,
  Dispositivo,
  Escuela,
  Iglesia,
  Empresa,
  Megafono,
  Mensaje,
  Correo,
  Pago,
  Regalo,
  Escudo,
  Check,
  Paloma,
  Infinito,
};
