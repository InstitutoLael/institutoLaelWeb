// src/utils/analytics.js
// Utility functions for Google Analytics and Meta Pixel

export const trackEvent = (eventName, params = {}) => {
  // Google Analytics
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, params);
  }

  // Meta Pixel (Facebook)
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('trackCustom', eventName, params);
  }

  // Debugging
  if (process.env.NODE_ENV === 'development') {
    console.debug(`[Analytics] Event Tracked: ${eventName}`, params);
  }
};

export const track = {
  // Diagnostic Flow
  diagnosticStart: () => trackEvent('diagnostic_start'),
  diagnosticComplete: (category) => trackEvent('diagnostic_complete', { category }),
  
  // Conversion Events
  leadGenerated: (type, profile) => trackEvent('lead_generated', { type, profile }),
  
  // Specific Interactions
  accessGateView: () => trackEvent('access_gate_view'),
  pricingView: (program) => trackEvent('pricing_view', { program }),
  whatsappClick: (intent) => trackEvent('whatsapp_click', { intent }),
  ctaScroll: (section) => trackEvent('cta_scroll_view', { section }),
};

