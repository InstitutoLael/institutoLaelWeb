// src/components/MultiHello.jsx
import { useEffect, useState } from "react";

const WORDS = [
  "Hola",        // ES
  "Hello",       // EN
  "안녕하세요",     // KO
  "Bonjour",     // FR
  "Olá",         // PT
  "Ciao",        // IT
  "Hallo",       // DE
  "你好",          // ZH
  "こんにちは",      // JA
  "مرحبا",         // AR
];

export default function MultiHello({ intervalMs = 8000 }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % WORDS.length), intervalMs);
    return () => clearInterval(t);
  }, [intervalMs]);

  return (
    <span className="multihello" aria-label="Saludo en varios idiomas">
      {WORDS[i]}
      <style>{`
        .multihello{
          display:inline-block;
          font-weight:1000;
          color:#fff;
          padding:0 .2rem;
          position:relative;
        }
        .multihello{
          animation: fadeIn .4s ease;
        }
        @keyframes fadeIn{
          from{ opacity:0; transform: translateY(6px); }
          to  { opacity:1; transform: translateY(0); }
        }
      `}</style>
    </span>
  );
}