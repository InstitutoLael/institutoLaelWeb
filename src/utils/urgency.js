// src/utils/urgency.js

/**
 * Calculates the next Sunday at 23:59:59
 */
export const getNextCycleEnd = () => {
  const now = new Date();
  const resultDate = new Date(now.getTime());
  resultDate.setDate(now.getDate() + (7 - now.getDay()) % 7);
  resultDate.setHours(23, 59, 59, 999);
  
  // If it's already Sunday, we might want the NEXT Sunday if it's late, 
  // but for urgency, "Today" is better.
  return resultDate;
};

/**
 * Returns a believable number of spots left based on the day of the week
 */
export const getRemainingSpots = () => {
  const day = new Date().getDay(); // 0 (Sun) to 6 (Sat)
  // Fewer spots as the week progresses
  const spots = [2, 12, 10, 8, 5, 4, 3];
  return spots[day];
};

/**
 * Formats time until next cycle
 */
export const getTimeUntilNextCycle = () => {
  const end = getNextCycleEnd();
  const now = new Date();
  const diff = end - now;
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  
  if (days > 0) return `${days} días y ${hours} horas`;
  return `${hours} horas`;
};
