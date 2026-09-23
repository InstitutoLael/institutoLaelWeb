import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DIAGNOSTIC_QUESTIONS } from '../../data/diagnostic';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ArrowLeft } from 'lucide-react';
import { trackFunnelEvent } from '../../utils/funnel';

const ease = [0.16, 1, 0.3, 1];

export default function DiagnosticFlow() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();
  // Al cambiar de pregunta, el foco pasa al título nuevo (lectores de pantalla
  // y teclado saben que hay una pregunta nueva).
  const headingRef = useRef(null);
  const moved = useRef(false);

  useEffect(() => {
    trackFunnelEvent('start');
  }, []);

  const filteredQuestions = DIAGNOSTIC_QUESTIONS.filter(q => {
    if (!q.dependsOn) return true;
    const dependKey = Object.keys(q.dependsOn)[0];
    return answers[dependKey] === q.dependsOn[dependKey];
  });

  const question = filteredQuestions[currentStep];

  useEffect(() => {
    if (question) {
      trackFunnelEvent('step_view', question.id);
    }
  }, [currentStep, question]);

  // En celular, cada pregunta nueva parte arriba de la pantalla.
  useEffect(() => {
    if (currentStep > 0) window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  const handleSelect = (value) => {
    const newAnswers = { ...answers, [question.id]: value };
    setAnswers(newAnswers);
    moved.current = true;

    if (currentStep < filteredQuestions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Finalize
      trackFunnelEvent('complete');
      navigate('/resultado-diagnostico', { state: { answers: newAnswers } });
    }
  };

  const goBack = () => {
    if (currentStep > 0) { moved.current = true; setCurrentStep(currentStep - 1); }
  };

  if (!question) return null;

  const progress = ((currentStep + 1) / filteredQuestions.length) * 100;

  return (
    <div className="w-full max-w-2xl mx-auto px-5 sm:px-6 pt-8 sm:pt-12 pb-16 sm:pb-20 min-h-[calc(100vh-5rem)] flex flex-col">
      {/* Progreso */}
      <div className="mb-8 sm:mb-10">
        <div className="flex items-center justify-between mb-3">
          <button
            type="button"
            onClick={goBack}
            aria-hidden={currentStep === 0}
            tabIndex={currentStep === 0 ? -1 : 0}
            className={`-ml-2 min-h-[44px] px-2 rounded-xl flex items-center gap-2 text-sm font-semibold text-[#071D49]/70 hover:text-[#071D49] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#071D49]/15 transition-colors ${currentStep === 0 ? 'invisible' : ''}`}
          >
            <ArrowLeft size={16} /> Atrás
          </button>
          <span className="inline-flex items-center rounded-full bg-[#071D49] text-[#D7E400] px-3 py-1.5 font-display text-xs font-extrabold uppercase tracking-wider">
            Pregunta {currentStep + 1}{answers.category ? `/${filteredQuestions.length}` : ""}
          </span>
        </div>
        <div
          className="w-full bg-[#071D49]/10 h-2 rounded-full overflow-hidden"
          role="progressbar"
          aria-label="Avance del diagnóstico"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress)}
        >
          <motion.div
            initial={false}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease }}
            className="h-full bg-[#071D49] rounded-full"
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={question.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.35, ease }}
          className="space-y-6 sm:space-y-8"
          onAnimationComplete={(def) => {
            if (def && def.opacity === 1 && moved.current && headingRef.current) {
              moved.current = false;
              headingRef.current.focus({ preventScroll: true });
            }
          }}
        >
          <h1 ref={headingRef} tabIndex={-1} className="focus:outline-none font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.1] text-[#071D49]">
            {question.question}
          </h1>

          <div className="grid grid-cols-1 gap-3 sm:gap-4">
            {question.options.map((opt, i) => (
              <motion.button
                type="button"
                data-diag-option
                key={opt.value}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06, duration: 0.3 }}
                onClick={() => handleSelect(opt.value)}
                className="group w-full min-h-[76px] p-4 sm:p-6 bg-white border-2 border-[#071D49]/10 rounded-[24px] shadow-card text-left hover:border-[#071D49] active:scale-[0.99] focus:outline-none focus-visible:border-[#071D49] focus-visible:ring-4 focus-visible:ring-[#071D49]/15 transition-all duration-200 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4 sm:gap-5 min-w-0">
                  {opt.icon && (
                    <span className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#F4F4F4] flex items-center justify-center text-2xl sm:text-3xl flex-shrink-0" aria-hidden="true">
                      {opt.icon}
                    </span>
                  )}
                  <div className="min-w-0">
                    <p className="text-[#071D49] font-bold text-base sm:text-lg leading-snug">{opt.label}</p>
                    {opt.desc && <p className="text-[#071D49]/70 text-sm sm:text-base mt-1 leading-snug">{opt.desc}</p>}
                  </div>
                </div>
                <span className="w-10 h-10 rounded-full bg-[#F4F4F4] text-[#071D49] group-hover:bg-[#071D49] group-hover:text-[#D7E400] flex items-center justify-center flex-shrink-0 transition-colors" aria-hidden="true">
                  <ChevronRight size={20} />
                </span>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
