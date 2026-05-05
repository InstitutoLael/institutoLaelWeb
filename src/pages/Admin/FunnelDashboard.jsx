import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getFunnelStats } from '../../utils/funnel';
import { BarChart, Users, CheckCircle, MessageCircle, ArrowRight, TrendingUp } from 'lucide-react';

const ease = [0.16, 1, 0.3, 1];

export default function FunnelDashboard() {
  const [stats, setStats] = useState(getFunnelStats());

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(getFunnelStats());
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const completionRate = stats.starts > 0 ? ((stats.completions / stats.starts) * 100).toFixed(1) : 0;
  const conversionRate = stats.completions > 0 ? ((stats.whatsapp_clicks / stats.completions) * 100).toFixed(1) : 0;
  const overallConversion = stats.starts > 0 ? ((stats.whatsapp_clicks / stats.starts) * 100).toFixed(1) : 0;

  return (
    <div className="bg-[#0D0D0D] min-h-screen pt-32 pb-20 px-6 text-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <p className="text-lael-accent text-[10px] tracking-[0.4em] uppercase mb-2 font-bold">Admin Panel</p>
            <h1 className="font-display text-4xl font-bold">Funnel Performance</h1>
          </div>
          <div className="px-4 py-2 bg-lael-accent/10 border border-lael-accent/20 rounded-full flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-lael-accent animate-pulse"></span>
            <span className="text-[10px] uppercase tracking-widest font-bold">Live Data</span>
          </div>
        </div>

        {/* High Level Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'Inicios', value: stats.starts, icon: <Users size={20} />, color: 'text-blue-400' },
            { label: 'Finalizados', value: stats.completions, icon: <CheckCircle size={20} />, color: 'text-emerald-400' },
            { label: 'Clicks WA', value: stats.whatsapp_clicks, icon: <MessageCircle size={20} />, color: 'text-lael-accent' },
            { label: 'Conv. Final', value: `${overallConversion}%`, icon: <TrendingUp size={20} />, color: 'text-lael-rust' },
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, ease }}
              className="p-8 bg-lael-secondary rounded-3xl border border-lael-bd"
            >
              <div className={`mb-4 ${stat.color}`}>{stat.icon}</div>
              <p className="text-3xl font-display font-bold mb-1">{stat.value}</p>
              <p className="text-[10px] text-lael-muted uppercase tracking-widest font-bold">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Funnel Visualization */}
          <div className="lg:col-span-2 p-10 bg-lael-secondary rounded-3xl border border-lael-bd">
            <h3 className="font-display text-2xl mb-10 flex items-center gap-3">
              <BarChart className="text-lael-accent" /> Drop-off Analysis
            </h3>
            <div className="space-y-12">
               {/* Start to Complete */}
               <div>
                  <div className="flex justify-between mb-4 text-xs uppercase tracking-widest font-bold">
                    <span className="text-lael-muted">Completitud del Test</span>
                    <span className="text-lael-accent">{completionRate}%</span>
                  </div>
                  <div className="h-4 bg-lael-primary rounded-full overflow-hidden border border-lael-bd">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${completionRate}%` }}
                      className="h-full bg-gradient-to-r from-blue-500 to-emerald-500"
                    />
                  </div>
                  <p className="mt-4 text-[10px] text-lael-muted leading-relaxed">
                    Si este número es bajo, el diagnóstico es demasiado largo o las preguntas no son atractivas.
                  </p>
               </div>

               {/* Complete to WA */}
               <div>
                  <div className="flex justify-between mb-4 text-xs uppercase tracking-widest font-bold">
                    <span className="text-lael-muted">Conversión a WhatsApp (Dashboard -> Lead)</span>
                    <span className="text-lael-accent">{conversionRate}%</span>
                  </div>
                  <div className="h-4 bg-lael-primary rounded-full overflow-hidden border border-lael-bd">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${conversionRate}%` }}
                      className="h-full bg-gradient-to-r from-emerald-500 to-lael-accent"
                    />
                  </div>
                  <p className="mt-4 text-[10px] text-lael-muted leading-relaxed">
                    Si este número es bajo, el resultado del diagnóstico no está generando suficiente impacto o urgencia.
                  </p>
               </div>
            </div>
          </div>

          {/* Insights Card */}
          <div className="p-10 bg-lael-accent rounded-3xl text-white">
            <h3 className="font-display text-2xl mb-8">Estrategia</h3>
            <div className="space-y-8">
               <div className="flex gap-4">
                  <ArrowRight className="flex-shrink-0" />
                  <p className="text-sm leading-relaxed">
                    <strong>Foco actual:</strong> {parseFloat(overallConversion) < 5 ? 'Aumentar urgencia en el Dashboard.' : 'Aumentar tráfico al Diagnóstico.'}
                  </p>
               </div>
               <div className="p-6 bg-white/10 rounded-2xl border border-white/20">
                  <p className="text-[10px] uppercase tracking-widest font-bold mb-4">Próximo Test A/B sugerido</p>
                  <p className="text-sm italic">"Cambiar el perfil 'Inconsistente Crónico' por algo más agresivo para ver si aumenta el click a WA."</p>
               </div>
            </div>
          </div>
        </div>

        {/* Step Breakdown */}
        <div className="mt-12 p-10 bg-lael-secondary rounded-3xl border border-lael-bd">
           <h3 className="font-display text-2xl mb-8">Abandonos por Paso</h3>
           <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {Object.entries(stats.steps).map(([step, count], i) => (
                <div key={step} className="p-6 bg-lael-primary rounded-2xl border border-lael-bd text-center">
                  <p className="text-lael-muted text-[10px] uppercase tracking-widest mb-2 truncate">{step}</p>
                  <p className="text-2xl font-display font-bold">{count}</p>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
}
