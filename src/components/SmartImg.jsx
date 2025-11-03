// src/components/SmartImg.jsx
import { useState } from "react";

export default function SmartImg({ src, alt = "", className = "", ...rest }) {
  const [ok, setOk] = useState(false);
  const [err, setErr] = useState(false);
  return (
    <div className={"smartimg " + className}>
      {!ok && !err && <div className="ph" aria-hidden />}
      {!err ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={() => setOk(true)}
          onError={() => setErr(true)}
          style={{ opacity: ok ? 1 : 0, transition: "opacity .25s ease" }}
          {...rest}
        />
      ) : (
        <div className="fallback">Imagen no disponible</div>
      )}
      <style>{css}</style>
    </div>
  );
}

const css = `
.smartimg{ position:relative; display:block; }
.smartimg .ph{
  width:100%; padding-bottom:62%; border:1px solid #22304d; border-radius:12px;
  background:linear-gradient(180deg,#0f172a,#0b1220);
}
.smartimg img{ width:100%; height:auto; display:block; }
.fallback{ padding:18px; border:1px dashed #334155; border-radius:12px; color:#cbd5e1 }
`;