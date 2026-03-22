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
  { src: gws, alt: "Google Workspace" },
  { src: transbank, alt: "Transbank" },
  { src: onepay, alt: "Onepay" },
  { src: u1, alt: "Universidad asociada 1" },
  { src: u2, alt: "Universidad asociada 2" },
  { src: naama, alt: "Naamá Studio" },
  { src: ino, alt: "Instituto Nacional de Ortodoncia" },
  { src: losolivos, alt: "Los Olivos HomeSchool" },
];

const SCALE = {
  "Naamá Studio": 2.40,
  "Instituto Nacional de Ortodoncia": 1.38,
  "Universidad asociada 1": 1.18,
  "Transbank": 2.30,
  "Universidad asociada 2": 1.18,
};

export default function PartnersMarquee({ height = 32, gap = 40 }) {
  // We duplicate the list enough times to ensure smooth scrolling
  const list = [...LOGOS, ...LOGOS, ...LOGOS, ...LOGOS];

  return (
    <section 
      className="relative overflow-hidden rounded-[18px] bg-white border border-[#e6e8ff] shadow-[0_0_30px_rgba(255,255,255,0.9)] group"
      aria-label="Alianzas y colaboradores"
      style={{
        maskImage: "linear-gradient(to right, transparent 0, #000 6%, #000 94%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to right, transparent 0, #000 6%, #000 94%, transparent 100%)"
      }}
    >
      <div className="flex w-max py-[14px] px-[22px] animate-marquee group-hover:[animation-play-state:paused]" style={{ gap: `${gap}px` }}>
        {list.map((item, i) => (
          <div className="flex-none grid place-items-center px-[6px]" key={i} style={{ height: `${height + 10}px` }}>
            <img
              className="block w-auto object-contain drop-shadow-[0_0_2px_rgba(255,255,255,0.5)] transition-all duration-200 hover:scale-105 hover:drop-shadow-[0_0_4px_rgba(255,255,255,1)]"
              src={item.src}
              alt={item.alt}
              loading="lazy"
              decoding="async"
              style={{ 
                height: `${height}px`,
                transform: `scale(${SCALE[item.alt] || 1})` 
              }}
              onError={(e) => { e.currentTarget.style.opacity = ".4"; }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}