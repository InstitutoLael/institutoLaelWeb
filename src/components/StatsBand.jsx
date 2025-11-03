// src/components/StatsBand.jsx
export default function StatsBand({
  items = [
    { kpi: "+1500", label: "Estudiantes activos" },
    { kpi: "98%", label: "Satisfacción" },
    { kpi: "8+", label: "Programas de estudio" },
  ],
}) {
  return (
    <section
      className="relative py-8 bg-[#0b1220] border-y border-slate-800 overflow-hidden"
      aria-label="Indicadores de confianza del Instituto Lael"
    >
      {/* Gradientes decorativos */}
      <div className="absolute inset-0 bg-[radial-gradient(80%_40%_at_10%_-30%,rgba(88,80,236,0.18),transparent_60%),radial-gradient(80%_40%_at_90%_-30%,rgba(22,163,74,0.14),transparent_60%)] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6 grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {items.map((it, i) => (
          <figure
            key={i}
            className="flex flex-col items-center justify-center text-center bg-[#0e1424] border border-slate-700 rounded-xl shadow-[0_8px_24px_rgba(2,6,23,0.35)] py-6 px-4 transition hover:scale-[1.02]"
            role="group"
            aria-labelledby={`stat-${i}-label`}
          >
            <p
              className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-emerald-400 tracking-tight"
              id={`stat-${i}-value`}
            >
              {it.kpi}
            </p>
            <figcaption
              id={`stat-${i}-label`}
              className="text-slate-300 text-sm mt-1 opacity-90"
            >
              {it.label}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}