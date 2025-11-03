/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";

const KEY = "lael:theme"; // "light" | "dark" | "system"
const ThemeCtx = createContext(null);

export function ThemeProvider({ children }) {
  const mqlRef = useRef(
    typeof window !== "undefined" ? window.matchMedia("(prefers-color-scheme: dark)") : null
  );

  const [mode, setMode] = useState(() => {
    try { return localStorage.getItem(KEY) || "system"; }
    catch { return "system"; }
  });

  const resolved = useMemo(() => (mode === "system" ? (mqlRef.current?.matches ? "dark" : "light") : mode), [mode]);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", resolved);
    root.style.colorScheme = resolved;
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", resolved === "dark" ? "#0b1020" : "#ffffff");
  }, [resolved]);

  useEffect(() => {
    const mql = mqlRef.current; if (!mql) return;
    const onChange = () => { if (mode === "system") setMode((m) => m); };
    mql.addEventListener?.("change", onChange);
    return () => mql.removeEventListener?.("change", onChange);
  }, [mode]);

  const setAndSave = useCallback((v) => {
    setMode(v);
    try { localStorage.setItem(KEY, v); } catch {}
  }, []);

  const cycle = useCallback(() => {
    const order = ["light", "system", "dark"];
    const idx = order.indexOf(mode);
    setAndSave(order[(idx + 1) % order.length]);
  }, [mode, setAndSave]);

  const value = useMemo(() => ({ mode, resolved, setMode: setAndSave, cycle }), [mode, resolved, setAndSave, cycle]);

  return <ThemeCtx.Provider value={value}>{children}</ThemeCtx.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeCtx);
  if (!ctx) throw new Error("useTheme debe usarse dentro de <ThemeProvider>");
  return ctx;
}
