// src/hooks/useReveal.js
import { useEffect } from "react";
export default function useReveal(selector = ".reveal", rootMargin = "0px 0px -8% 0px"){
  useEffect(() => {
    const els = Array.from(document.querySelectorAll(selector));
    if (!("IntersectionObserver" in window) || els.length === 0) return;
    els.forEach(el => el.classList.add("reveal--prep"));
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting){ e.target.classList.add("reveal--in"); io.unobserve(e.target); }
      });
    }, { rootMargin, threshold: 0.08 });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, [selector, rootMargin]);
}