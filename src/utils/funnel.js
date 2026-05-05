// src/utils/funnel.js

const KEY = 'lael_funnel_stats';

export const getFunnelStats = () => {
  const stats = localStorage.getItem(KEY);
  if (!stats) {
    return {
      starts: 0,
      completions: 0,
      whatsapp_clicks: 0,
      steps: {} // e.g. { 'category': 100, 'paes_pain': 80 }
    };
  }
  return JSON.parse(stats);
};

export const trackFunnelEvent = (event, detail = null) => {
  const stats = getFunnelStats();

  if (event === 'start') stats.starts++;
  if (event === 'complete') stats.completions++;
  if (event === 'whatsapp') stats.whatsapp_clicks++;
  if (event === 'step_view' && detail) {
    stats.steps[detail] = (stats.steps[detail] || 0) + 1;
  }

  localStorage.setItem(KEY, JSON.stringify(stats));
};
