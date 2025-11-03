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

// Escalado fino por logo
const SCALE = {
  "Naamá Studio": 2.4,
  "Instituto Nacional de Ortodoncia": 1.38,
  "Universidad asociada 1": 1.18,
  "Transbank": 2.3,
  "Universidad asociada 2": 1.18,
};

// Animación CSS con Tailwind
const marqueeAnim = `
@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
`;

export default function PartnersMarquee({ height = 36, gap = 40, speed = 100 }) {
  const list = [...LOGOS, ...LOGOS, ...LOGOS, ...LOGOS]; // repetición para efecto continuo

  return (
    <section
      aria-label="Alianzas y colaboradores"
      className="relative overflow-hidden bg-white border border-slate-200 rounded-2xl shadow-[0_0_30px_rgba(255,255,255,0.9)] my-10"
    >
      <style>{marqueeAnim}</style>

      <div
        className="flex w-max animate-[marquee_linear_infinite] py-4 px-6"
        style={{
          gap: `${gap}px`,
          animationDuration: `${speed}s`,
        }}
      >
        {list.map((item, i) => (
          <div
            key={i}
            className="flex-none grid place-items-center"
            style={{ height: `${height + 8}px` }}
          >
            <img
              src={item.src}
              alt={item.alt}
              loading="lazy"
              decoding="async"
              className="h-auto object-contain transition-transform duration-200 ease-out hover:scale-105"
              style={{
                height: `${height}px`,
                transform: `scale(${SCALE[item.alt] || 1})`,
                filter: "drop-shadow(0 0 4px rgba(255,255,255,0.9))",
              }}
              onError={(e) => (e.currentTarget.style.opacity = ".4")}
            />
          </div>
        ))}
      </div>
    </section>
  );
}