import React from 'react';
import { PAES_SUBJECTS } from '../../data/paes';

export default function ModuleSelector({ selectedModules, setSelectedModules }) {
  const toggleSubject = (id) => {
    if (selectedModules.includes(id)) {
      setSelectedModules(selectedModules.filter(s => s !== id));
    } else {
      setSelectedModules([...selectedModules, id]);
    }
  };

  return (
    <div>
      {PAES_SUBJECTS.map(subject => (
        <div key={subject.id} onClick={() => toggleSubject(subject.id)}>
          <input 
            type="checkbox" 
            checked={selectedModules.includes(subject.id)} 
            readOnly 
          />
          <h3>{subject.name}</h3>
          <p>{subject.category}</p>
          <p>{subject.desc}</p>
        </div>
      ))}
    </div>
  );
}
