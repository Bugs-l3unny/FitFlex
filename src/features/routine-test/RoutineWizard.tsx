"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { diagnose } from "./diagnose";
import { DiagnosisCard } from "./DiagnosisCard";
import { PlatesProgress } from "./PlatesProgress";
import { isComplete, QUESTIONS, type PartialAnswers } from "./questions";

export function RoutineWizard() {
  const reduce = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const hasInteracted = useRef(false);
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [answers, setAnswers] = useState<PartialAnswers>({});

  const total = QUESTIONS.length;
  const complete = isComplete(answers) ? answers : null;
  const finished = step >= total && complete !== null;
  const question = QUESTIONS[Math.min(step, total - 1)];
  const selected = answers[question.id];

  // Move focus to the new step heading once it has entered, so keyboard and screen reader users follow the flow.
  const focusHeading = () => {
    if (!hasInteracted.current) return;
    containerRef.current?.querySelector<HTMLElement>("[data-focus-target]")?.focus();
  };

  const go = (nextStep: number, nextDirection: number) => {
    hasInteracted.current = true;
    setDirection(nextDirection);
    setStep(nextStep);
  };

  const restart = () => {
    setAnswers({});
    go(0, -1);
  };

  const offset = reduce ? 0 : 32;
  const variants = {
    enter: (d: number) => ({ opacity: 0, x: d * offset }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => ({ opacity: 0, x: -d * offset }),
  };

  return (
    <div
      ref={containerRef}
      className="rounded-[1.5rem] border border-linea bg-lona p-5 sm:p-8"
    >
      <PlatesProgress step={finished ? total : step} />

      <div className="mt-8">
        <AnimatePresence mode="wait" custom={direction} initial={false}>
          {finished && complete ? (
            <motion.div
              key="result"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              onAnimationComplete={focusHeading}
              transition={{ duration: reduce ? 0 : 0.22, ease: "easeOut" }}
            >
              <DiagnosisCard answers={complete} diagnosis={diagnose(complete)} onRestart={restart} />
            </motion.div>
          ) : (
            <motion.form
              key={question.id}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              onAnimationComplete={focusHeading}
              transition={{ duration: reduce ? 0 : 0.22, ease: "easeOut" }}
              onSubmit={(event) => {
                event.preventDefault();
                if (selected) go(step + 1, 1);
              }}
            >
              <fieldset className="min-w-0">
                <legend
                  data-focus-target
                  tabIndex={-1}
                  className="display mb-5 text-2xl outline-none sm:text-3xl"
                >
                  {question.prompt}
                </legend>
                <div className="grid gap-3">
                  {question.options.map((option) => (
                    <label key={option.id} className="option-card">
                      <input
                        type="radio"
                        className="sr-only"
                        name={question.id}
                        value={option.id}
                        checked={selected === option.id}
                        onChange={() => setAnswers((prev) => ({ ...prev, [question.id]: option.id }))}
                      />
                      <span className="option-mark" aria-hidden="true" />
                      <span className="text-lg">{option.label}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className="mt-7 flex items-center justify-between gap-3">
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => go(step - 1, -1)}
                  disabled={step === 0}
                >
                  Atrás
                </button>
                <button type="submit" className="btn btn-primary" disabled={!selected}>
                  {step === total - 1 ? "Ver mi diagnóstico" : "Siguiente"}
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
