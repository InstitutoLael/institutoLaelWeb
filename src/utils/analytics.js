// src/utils/analytics.js
// Utility functions for Google Analytics

export const trackEvent = (eventName, params = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, params);
  } else {
    console.debug(`[Analytics] Event Tracked: ${eventName}`, params);
  }
};

export const track = {
  accessGateView: () => trackEvent('access_gate_view'),
  pricingView: (program) => trackEvent('pricing_view', { program }),
  whatsappClick: (program) => trackEvent('whatsapp_click', { program }),
};
