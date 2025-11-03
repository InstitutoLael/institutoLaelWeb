// src/components/ThemeToggle.jsx
import { useEffect, useMemo, useState } from "react";

const KEY = "lael:theme"; // "light" | "dark" | "system"

export default function ThemeToggle() {
  const mql = typeof window !== "undefined"
    ? window.matchMedia("(prefers-color-scheme: dark)")
    : { matches: false, addEventListener() {}, removeEventListener() {} };

  const [mode, setMode] = useState(() => {
    try { return localStorage.getItem(KEY) || "system"; } catch { return "system"; }
  });

  const resolved = useMemo(() => (mode === "system" ? (mql.matches ? "dark" : "light") : mode), [mode, mql.matches]);

  useEffect(() => {
    document.documentElement.style.colorScheme = resolved;
    document.documentElement.setAttribute("data-theme", resolved);
  }, [resolved]);

  useEffect(() => {
    const onChange = () => mode === "system" && setMode("system");
    mql.addEventListener?.("change", onChange);
    return () => mql.removeEventListener?.("change", onChange);
  }, [mode]);

  const cycle = () => {
    const order = ["light", "system", "dark"];
    const next = order[(order.indexOf(mode) + 1) % order.length];
    setMode(next);
    try { localStorage.setItem(KEY, next); } catch {}
  };

  return (
    <button className="btn btn-sm btn-outline-light" onClick={cycle} title="Cambiar tema (claro/auto/oscuro)">
      {mode === "light" && "☀️ Claro"}
      {mode === "system" && "🖥️ Auto"}
      {mode === "dark" && "🌙 Oscuro"}
    </button>
  );
}
