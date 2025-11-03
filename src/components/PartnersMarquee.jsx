// src/components/PartnersMarquee.jsx

import gws from "../assets/img/Partners/GoogleWorkspace.png";
import transbank from "../assets/img/Partners/Transbank.png";
import onepay from "../assets/img/Partners/onepay.png";
import ino from "../assets/img/Partners/INO.png";
import u1 from "../assets/img/Partners/u1.png";
import u2 from "../assets/img/Partners/u2.png";
import naama from "../assets/img/Partners/naama-studio.png";

const LOGOS = [
  { src: gws,       alt: "Google Workspace" },
  { src: transbank, alt: "Transbank" },
  { src: onepay,    alt: "Onepay" },
  { src: u1,        alt: "Universidad asociada 1" },
  { src: u2,        alt: "Universidad asociada 2" },
  { src: naama,     alt: "Naamá Studio" },
  { src: ino,       alt: "Instituto Nacional de Ortodoncia" },
];

// Corrección fina
const SCALE = {
  "Naamá Studio": 2.40,
  "Instituto Nacional de Ortodoncia": 1.38,
  "Universidad asociada 1": 1.18,
  "Transbank": 2.30,
  "Universidad asociada 2": 1.18,
};

export default function PartnersMarquee({ height = 32, gap = 40, speed = 100 }) {
  const list = [...LOGOS, ...LOGOS, ...LOGOS, ...LOGOS];

  const css = `
    .marquee{
      position:relative; overflow:hidden; border-radius:18px;
      background:#fff; /* fondo blanco sólido */
      border:1px solid #e6e8ff;
      box-shadow:0 0 30px rgba(255,255,255,.9); /* halo blanco difuminado */
      -webkit-mask-image: linear-gradient(to right, transparent 0, #000 6%, #000 94%, transparent 100%);
              mask-image: linear-gradient(to right, transparent 0, #000 6%, #000 94%, transparent 100%);
    }
    .marquee__track{
      display:flex; gap:${gap}px; width:max-content;
      padding:14px 22px;
      will-change: transform;
      animation: marquee-scroll ${speed}s linear infinite;
    }
    .marquee:hover .marquee__track{ animation-play-state: paused; }

    .marquee__item{
      flex:0 0 auto; display:grid; place-items:center;
      padding:0 6px; height:${height + 10}px;
    }
    .marquee__logo{
      display:block;
      height:${height}px; width:auto; object-fit:contain;
      filter: drop-shadow(0 0 4px rgba(255,255,255,.9)); /* resalta logos oscuros */
      transition: transform .22s ease, filter .22s ease;
    }
    .marquee__logo:hover{
      transform: scale(1.05);
      filter: drop-shadow(0 0 6px rgba(255,255,255,1));
    }

    @keyframes marquee-scroll{
      0%   { transform: translate3d(0,0,0); }
      100% { transform: translate3d(-50%,0,0); }
    }

    @media (max-width:576px){
      .marquee__track { gap: 28px; }
      .marquee__item  { height: ${Math.max(24, height-8) + 10}px; }
      .marquee__logo  { height: ${Math.max(24, height-8)}px; }
    }
  `;

  return (
    <section className="marquee" aria-label="Alianzas y colaboradores">
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
              style={{ transform: `scale(${SCALE[item.alt] || 1})` }}
              onError={(e)=>{ e.currentTarget.style.opacity = ".4"; }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}