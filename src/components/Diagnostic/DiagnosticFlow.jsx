import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DIAGNOSTIC_QUESTIONS } from '../../data/diagnostic';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ArrowLeft } from 'lucide-react';

const ease = [0.16, 1, 0.3, 1];

export default function DiagnosticFlow() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();

  const filteredQuestions = DIAGNOSTIC_QUESTIONS.filter(q => {
    if (!q.dependsOn) return true;
    const dependKey = Object.keys(q.dependsOn)[0];
    return answers[dependKey] === q.dependsOn[dependKey];
  });

  const question = filteredQuestions[currentStep];

  const handleSelect = (value) => {
    const newAnswers = { ...answers, [question.id]: value };
    setAnswers(newAnswers);

    if (currentStep < filteredQuestions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Finalize
      navigate('/resultado-diagnostico', { state: { answers: newAnswers } });
    }
  };

  const goBack = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  if (!question) return null;

  return (
    <div className="w-full max-w-3xl mx-auto px-6 py-20 min-h-[600px] flex flex-col justify-center">
      <div className="mb-12 flex items-center justify-between">
        <button 
          onClick={goBack} 
          className={`text-lael-muted flex items-center gap-2 text-xs uppercase tracking-widest hover:text-lael-accent transition-colors ${currentStep === 0 ? 'opacity-0 pointer-events-none' : ''}`}
        >
          <ArrowLeft size={14} /> Atrás
        </button>
        <span className="text-lael-accent font-display text-sm font-bold">
          Sesión Táctica {currentStep + 1}/{filteredQuestions.length}
        </span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={question.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.5, ease }}
          className="space-y-10"
        >
          <h2 className="font-display text-3xl lg:text-5xl text-lael-light leading-tight">
            {question.question}
          </h2>

          <div className="grid grid-cols-1 gap-4">
            {question.options.map((opt, i) => (
              <motion.button
                key={opt.value}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => handleSelect(opt.value)}
                className="group p-6 bg-lael-secondary border border-lael-bd rounded-2xl text-left hover:border-lael-accent hover:bg-lael-accent/5 transition-all duration-300 flex items-center justify-between"
              >
                <div className="flex items-center gap-6">
                  {opt.icon && <span className="text-3xl">{opt.icon}</span>}
                  <div>
                    <p className="text-lael-light font-bold text-lg">{opt.label}</p>
                    {opt.desc && <p className="text-lael-muted text-sm mt-1">{opt.desc}</p>}
                  </div>
                </div>
                <ChevronRight className="text-lael-muted group-hover:text-lael-accent group-hover:translate-x-1 transition-all" size={20} />
              </motion.button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="mt-20 w-full bg-lael-bd/20 h-1 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${((currentStep + 1) / filteredQuestions.length) * 100}%` }}
          className="h-full bg-lael-accent"
        />
      </div>
    </div>
  );
}
