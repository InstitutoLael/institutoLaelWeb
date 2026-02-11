// src/lib/analytics.js

/**
 * Sends an event to Google Tag Manager / Google Analytics 4
 * @param {string} eventName - The name of the event (e.g., 'add_to_cart', 'purchase', 'generate_lead')
 * @param {object} params - The parameters valid for that event (e.g., currency, value, items)
 */
export const trackEvent = (eventName, params = {}) => {
  // 1. Log to console in development for debugging
  if (import.meta.env.DEV) {
    console.log(`[Analytics] Track: ${eventName}`, params);
  }

  // 2. Push to dataLayer if available (GTM method)
  if (typeof window !== "undefined" && window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      ...params,
    });
  } else {
    // Fallback if dataLayer isn't initialized yet
    // console.warn("[Analytics] dataLayer not found");
  }

  // 3. Fallback/Direct gtag call if you are using gtag directly instead of just GTM events
  // if (typeof window.gtag === 'function') {
  //   window.gtag('event', eventName, params);
  // }
};

// Pre-defined helpers for common e-commerce events
export const trackAddToCart = (product) => {
  trackEvent("add_to_cart", {
    currency: "CLP",
    value: product.price,
    items: [
      {
        item_id: product.id,
        item_name: product.title || product.name,
        price: product.price,
        item_category: product.type || "General",
        quantity: 1,
      },
    ],
  });
};

export const trackRemoveFromCart = (product) => {
  trackEvent("remove_from_cart", {
    currency: "CLP",
    value: product.price,
    items: [
      {
        item_id: product.id,
        item_name: product.title || product.name,
        price: product.price,
        quantity: 1,
      },
    ],
  });
};

export const trackBeginCheckout = (cartItems, totalValue) => {
  trackEvent("begin_checkout", {
    currency: "CLP",
    value: totalValue,
    items: cartItems.map((item) => ({
      item_id: item.id,
      item_name: item.title || item.name,
      price: item.price,
      quantity: 1,
    })),
  });
};

export const trackPurchase = (transactionId, totalValue, cartItems) => {
  trackEvent("purchase", {
    transaction_id: transactionId,
    currency: "CLP",
    value: totalValue,
    items: cartItems.map((item) => ({
      item_id: item.id,
      item_name: item.title || item.name,
      price: item.price,
      quantity: 1,
    })),
  });
};

export const trackLeadGeneration = (source) => {
  trackEvent("generate_lead", {
    source: source || "checkout_abandoned",
  });
};
