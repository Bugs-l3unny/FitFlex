export type QuestionId = "inactivity" | "sessionTime" | "preference" | "goal";

export interface QuestionOption {
  id: string;
  label: string;
}

export interface Question {
  id: QuestionId;
  /** Short name used in the WhatsApp message. */
  shortLabel: string;
  prompt: string;
  options: readonly QuestionOption[];
}

export const QUESTIONS: readonly Question[] = [
  {
    id: "inactivity",
    shortLabel: "Tiempo sin hacer ejercicio",
    prompt: "¿Cuánto tiempo llevas sin hacer ejercicio?",
    options: [
      { id: "lt-1-month", label: "Menos de 1 mes" },
      { id: "1-6-months", label: "De 1 a 6 meses" },
      { id: "gt-6-months", label: "Más de 6 meses / Nunca he entrenado" },
    ],
  },
  {
    id: "sessionTime",
    shortLabel: "Tiempo por sesión",
    prompt: "¿Cuánto tiempo tienes disponible para ejercitarte por sesión?",
    options: [
      { id: "express", label: "30 - 45 min (Express)" },
      { id: "one-hour", label: "1 hora" },
      { id: "over-hour", label: "Más de 1 hora" },
    ],
  },
  {
    id: "preference",
    shortLabel: "Tipo de ejercicio",
    prompt: "¿Qué tipo de ejercicio te gustaría realizar?",
    options: [
      { id: "cardio", label: "Cardio y resistencia" },
      { id: "weights", label: "Musculación y pesas" },
      { id: "mixed", label: "Mixto / Funcional" },
    ],
  },
  {
    id: "goal",
    shortLabel: "Objetivo principal",
    prompt: "¿Cuál es tu objetivo principal?",
    options: [
      { id: "lose-weight", label: "Perder peso" },
      { id: "fitness", label: "Mejorar la condición física" },
      { id: "strength", label: "Ganar fuerza" },
    ],
  },
];

export type Answers = Record<QuestionId, string>;
export type PartialAnswers = Partial<Answers>;

export function getOptionLabel(questionId: QuestionId, optionId: string): string {
  const question = QUESTIONS.find((q) => q.id === questionId);
  return question?.options.find((o) => o.id === optionId)?.label ?? optionId;
}

export function isComplete(answers: PartialAnswers): answers is Answers {
  return QUESTIONS.every((q) => typeof answers[q.id] === "string");
}
