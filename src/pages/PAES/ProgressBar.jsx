import React from 'react';

export default function ProgressBar({ step }) {
  return (
    <nav>
      <ul>
        <li>
          <span>1</span>
          <span>Diagnóstico</span>
          {step >= 1 && <span>(Activo)</span>}
        </li>
        <li>
          <span>2</span>
          <span>Estrategia</span>
          {step >= 2 && <span>(Activo)</span>}
        </li>
        <li>
          <span>3</span>
          <span>Activación</span>
          {step >= 3 && <span>(Activo)</span>}
        </li>
      </ul>
    </nav>
  );
}
