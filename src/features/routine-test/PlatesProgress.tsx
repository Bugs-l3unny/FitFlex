import { QUESTIONS } from "./questions";

interface PlatesProgressProps {
  /** Index of the current question; equals the number of questions when finished. */
  step: number;
}

/** Four plates loaded onto a bar: one per answered question. */
export function PlatesProgress({ step }: PlatesProgressProps) {
  const total = QUESTIONS.length;
  const fill = Math.min(1, step / (total - 1));

  return (
    <div className="relative">
      <div className="absolute inset-x-5 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-linea" aria-hidden="true">
        <div
          className="compare-fill h-full w-full rounded-full bg-lima"
          style={{ transform: `scaleX(${fill})` }}
        />
      </div>
      <ol aria-label="Progreso del test" className="relative flex justify-between">
        {QUESTIONS.map((question, index) => {
          const state = index < step ? "done" : index === step ? "current" : "pending";
          return (
            <li key={question.id} aria-current={state === "current" ? "step" : undefined}>
              <span className="plate" data-state={state}>
                <span aria-hidden="true">{index + 1}</span>
                <span className="sr-only">
                  Paso {index + 1} de {total}: {question.shortLabel}
                  {state === "done" ? ", respondido" : state === "current" ? ", actual" : ""}
                </span>
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
