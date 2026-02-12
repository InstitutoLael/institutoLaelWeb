import React from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

export default function PlanComparator({ 
  title = "Comparativa", 
  subtitle, 
  headers = [], 
  data = [], 
  keys = [], // Keys to map from data objects to columns. First key is usually the feature name.
  highlightColumn = 1 // Index of the column to highlight (1-based, excluding the feature column usually)
}) {
  
  const renderCellContent = (content) => {
    if (typeof content === 'boolean') {
      return content ? 
        <FaCheckCircle className="inline text-emerald-500 text-xl" /> : 
        <FaTimesCircle className="inline text-rose-500/30 text-xl" />;
    }
    return content;
  };

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="text-center mb-16">
           <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4">
              {title}
           </h2>
           {subtitle && <p className="text-slate-400 font-light">{subtitle}</p>}
        </div>

        <div className="overflow-x-auto rounded-[2.5rem] border border-white/5 shadow-2xl bg-slate-900/50 backdrop-blur-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10">
                {headers.map((header, i) => (
                  <th 
                    key={i} 
                    className={`py-6 px-6 text-center font-black uppercase tracking-widest text-xs first:text-left first:pl-10 ${i === highlightColumn ? 'bg-indigo-600/10 text-white' : 'text-slate-500'}`}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-sm">
              {data.map((row, i) => (
                <tr key={i} className="border-b border-white/5 group hover:bg-white/[0.02] transition-colors last:border-0">
                  {keys.map((key, j) => (
                    <td 
                      key={j} 
                      className={`py-6 px-6 text-center transition-colors
                        ${j === 0 ? 'text-left pl-10 font-bold text-slate-300' : ''}
                        ${j === highlightColumn ? 'bg-indigo-600/5 font-black text-white group-hover:bg-indigo-600/10' : 'text-slate-500'}
                      `}
                    >
                       {renderCellContent(row[key])}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
