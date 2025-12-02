// src/components/PartnersMarquee.jsx

import gws from "../assets/img/Partners/GoogleWorkspace.png";
import transbank from "../assets/img/Partners/Transbank.png";
import onepay from "../assets/img/Partners/onepay.png";
import ino from "../assets/img/Partners/INO.png";
import u1 from "../assets/img/Partners/u1.png";
import u2 from "../assets/img/Partners/u2.png";
import naama from "../assets/img/Partners/naama-studio.png";
import losolivos from "../assets/img/Partners/LosOlivos.png";

const LOGOS = [
  { src: gws,       alt: "Google Workspace" },
  { src: transbank, alt: "Transbank" },
  { src: onepay,    alt: "Onepay" },
  { src: u1,        alt: "Universidad asociada 1" },
  { src: u2,        alt: "Universidad asociada 2" },
  { src: naama,     alt: "Naamá Studio" },
  { src: ino,       alt: "Instituto Nacional de Ortodoncia" },
  { src: losolivos, alt: "Los Olivos HomeSchool" },
];

// MANTUVIMOS TU LÓGICA DE ESCALA (Es excelente)
const SCALE = {
  "Naamá Studio": 2.40,
  "Instituto Nacional de Ortodoncia": 1.38,
  "Universidad asociada 1": 1.18,
  "Transbank": 2.30,
  "Universidad asociada 2": 1.18,
};

export default function PartnersMarquee({ height = 30, gap = 50, speed = 80 }) {
  // Cuadruplicamos para asegurar loop infinito perfecto en pantallas 4K
  const list = [...LOGOS, ...LOGOS, ...LOGOS, ...LOGOS];

  const css = `
    .marquee {
      position: relative; 
      overflow: hidden; 
      border-radius: 16px;
      
      /* ESTILO GLASS DARK */
      background: rgba(255, 255, 255, 0.03); /* Casi transparente */
      border: 1px solid rgba(255, 255, 255, 0.08); /* Borde sutil */
      backdrop-filter: blur(5px); /* Desenfoque detrás */
      
      /* MÁSCARA DE DESVANECIMIENTO LATERAL */
      -webkit-mask-image: linear-gradient(to right, transparent 0, black 10%, black 90%, transparent 100%);
      mask-image: linear-gradient(to right, transparent 0, black 10%, black 90%, transparent 100%);
      
      margin: 2rem 0; /* Espaciado vertical seguro */
    }

    .marquee__track {
      display: flex; 
      gap: ${gap}px; 
      width: max-content;
      padding: 18px 0; /* Padding vertical equilibrado */
      will-change: transform;
      animation: marquee-scroll ${speed}s linear infinite;
    }

    /* Pausar animación al pasar el mouse por encima del contenedor */
    .marquee:hover .marquee__track { 
      animation-play-state: paused; 
    }

    .marquee__item {
      flex: 0 0 auto; 
      display: grid; 
      place-items: center;
      /* Altura fija para evitar saltos */
      height: ${height + 20}px; 
    }

    .marquee__logo {
      display: block;
      height: ${height}px; 
      width: auto; 
      object-fit: contain;
      
      /* MAGIA VISUAL: Todos los logos en blanco monocromático (o gris claro) */
      filter: grayscale(100%) brightness(10) opacity(0.6); 
      /* Nota: Si tus logos son oscuros, brightness(10) los vuelve blancos. 
         Si ya son blancos, se quedan igual. */
      
      transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      cursor: pointer;
    }

    /* AL HACER HOVER EN EL LOGO ESPECÍFICO */
    .marquee__logo:hover {
      transform: scale(1.1); /* Efecto pop */
      filter: grayscale(0%) brightness(1) opacity(1); /* Color original */
      z-index: 10;
    }

    /* Animación Infinita */
    @keyframes marquee-scroll {
      0%   { transform: translate3d(0, 0, 0); }
      100% { transform: translate3d(-50%, 0, 0); } 
      /* -50% funciona perfecto porque la lista está cuadruplicada, 
         así que mover el 50% es mover 2 listas enteras */
    }

    @media (max-width: 768px){
      .marquee { border-radius: 0; border-left: 0; border-right: 0; } /* Full width en móvil */
      .marquee__track { gap: 30px; }
      .marquee__logo { height: ${Math.max(22, height - 5)}px; }
    }
  `;

  return (
    <section className="marquee" aria-label="Nuestras alianzas estratégicas">
      <style>{css}</style>
      <div className="marquee__track">
        {list.map((item, i) => (
          <div className="marquee__item" key={i}>
            <img
              className="marquee__logo"
              src={item.src}
              alt={item.alt}
              loading="lazy"
              decoding="async"
              // Tu lógica de escala intacta
              style={{ transform: `scale(${SCALE[item.alt] || 1})` }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}