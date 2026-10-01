import React from 'react';

// Foto en duotono: sombras en azul Lael y luces en el color del programa.
// Une fotos de distinto origen bajo una misma dirección de arte. Con el mouse
// encima (group-hover del contenedor) vuelve de a poco a su color original.
export default function Duotone({ src, alt = '', color = '#D7E400', className = '', imgClassName = '', loading = 'lazy', hoverColor = true }) {
  const fade = hoverColor ? 'transition-opacity duration-700 group-hover:opacity-0' : '';
  return (
    <div className={`relative overflow-hidden bg-[#071D49] ${className}`} data-keep-light>
      <img src={src} alt={alt} loading={loading} decoding="async" className={`absolute inset-0 w-full h-full object-cover ${imgClassName}`} />
      <img src={src} alt="" aria-hidden="true" loading={loading} decoding="async" className={`absolute inset-0 w-full h-full object-cover grayscale contrast-[1.15] ${fade} ${imgClassName}`} />
      <div aria-hidden="true" className={`absolute inset-0 mix-blend-multiply ${fade}`} style={{ backgroundColor: color }} />
      <div aria-hidden="true" className={`absolute inset-0 mix-blend-screen ${fade}`} style={{ backgroundColor: '#071D49' }} />
    </div>
  );
}
