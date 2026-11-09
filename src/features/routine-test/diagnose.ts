import { business } from "@/config/business";
import { formatCOP } from "@/lib/format";
import { getOptionLabel, QUESTIONS, type Answers } from "./questions";

export interface Diagnosis {
  focus: { name: string; description: string };
  /** Line that explains how the plan reflects the preferred type of exercise. */
  preferenceNote: string;
  level: { name: string; description: string };
  format: { name: string; daysPerWeek: string };
  plan: { name: string; detail: string };
  disclaimer: string;
}

export const DIAGNOSIS_DISCLAIMER =
  "Este diagnóstico es orientativo y no reemplaza una valoración profesional. Tu entrenador lo ajusta en la valoración presencial.";

const FOCUS_BY_GOAL: Record<string, { name: string; description: string; matches: string }> = {
  "lose-weight": {
    name: "Quema y constancia",
    description: "Cardio y circuitos metabólicos para elevar el gasto de energía semana a semana.",
    matches: "cardio",
  },
  fitness: {
    name: "Base atlética",
    description: "Entrenamiento mixto y funcional para ganar resistencia, movilidad y control corporal.",
    matches: "mixed",
  },
  strength: {
    name: "Fuerza progresiva",
    description: "Ejercicios compuestos con sobrecarga progresiva para subir tus cargas de forma segura.",
    matches: "weights",
  },
};

const PREFERENCE_NOTE: Record<string, Record<string, string>> = {
  "lose-weight": {
    cardio: "Tu preferencia por el cardio coincide con este enfoque: será la base de tus sesiones.",
    weights: "Como prefieres las pesas, adaptamos el enfoque con circuitos con pesas para quemar energía sin dejar la musculación.",
    mixed: "Como prefieres el trabajo mixto, combinamos cardio con ejercicios funcionales en cada circuito.",
  },
  fitness: {
    cardio: "Como prefieres el cardio, le damos más peso a la resistencia dentro del trabajo mixto.",
    weights: "Como prefieres las pesas, incluimos ejercicios con carga dentro del trabajo funcional.",
    mixed: "Tu preferencia por el trabajo mixto coincide con este enfoque: será la base de tus sesiones.",
  },
  strength: {
    cardio: "Como prefieres el cardio, añadimos bloques cortos de resistencia como calentamiento y cierre.",
    weights: "Tu preferencia por las pesas coincide con este enfoque: será la base de tus sesiones.",
    mixed: "Como prefieres el trabajo mixto, combinamos los ejercicios de fuerza con movimientos funcionales.",
  },
};

const LEVEL_BY_INACTIVITY: Record<string, { name: string; description: string }> = {
  "lt-1-month": {
    name: "Retomas el ritmo",
    description: "Tu cuerpo aún recuerda el movimiento: puedes arrancar con intensidad moderada.",
  },
  "1-6-months": {
    name: "Reinicio gradual",
    description: "Subimos cargas y duración poco a poco durante las primeras semanas.",
  },
  "gt-6-months": {
    name: "Principiante: 2 semanas de adaptación y técnica",
    description: "Empiezas aprendiendo la técnica de cada ejercicio antes de aumentar la carga.",
  },
};

const FORMAT_BY_SESSION: Record<string, { name: string; daysPerWeek: string }> = {
  express: { name: "Circuito express", daysPerWeek: "4 días/semana" },
  "one-hour": { name: "Sesión completa", daysPerWeek: "3-4 días/semana" },
  "over-hour": { name: "Rutina dividida", daysPerWeek: "4-5 días/semana" },
};

/** Deterministic, rule-based preliminary diagnosis. */
export function diagnose(answers: Answers): Diagnosis {
  const focus = FOCUS_BY_GOAL[answers.goal];
  const level = LEVEL_BY_INACTIVITY[answers.inactivity];
  const format = FORMAT_BY_SESSION[answers.sessionTime];
  if (!focus || !level || !format) {
    throw new Error("Respuestas no válidas para el diagnóstico");
  }

  // Every format trains at least 3 days a week, so the monthly membership always beats daily passes.
  const plan = {
    name: "Membresía mensual",
    detail: `${formatCOP(business.prices.monthly)} al mes, o ${formatCOP(business.prices.universityMonthly)} con carnet universitario. Incluye ${business.friendFreeDays} días gratis para invitar a un amigo.`,
  };

  return {
    focus: { name: focus.name, description: focus.description },
    preferenceNote:
      PREFERENCE_NOTE[answers.goal]?.[answers.preference] ?? "Adaptamos el plan a tus preferencias.",
    level,
    format: { name: format.name, daysPerWeek: format.daysPerWeek },
    plan,
    disclaimer: DIAGNOSIS_DISCLAIMER,
  };
}

/** Pre-written WhatsApp message with the four answers and the diagnosis. */
export function buildWhatsappMessage(answers: Answers, diagnosis: Diagnosis): string {
  const answerLines = QUESTIONS.map(
    (q, index) => `${index + 1}. ${q.shortLabel}: ${getOptionLabel(q.id, answers[q.id])}`,
  );
  return [
    `Hola, equipo de ${business.name}. Hice el test de rutina en su página y quiero mi valoración.`,
    "",
    "Mis respuestas:",
    ...answerLines,
    "",
    "Diagnóstico preliminar:",
    `- Enfoque: ${diagnosis.focus.name}`,
    `- Nivel: ${diagnosis.level.name}`,
    `- Formato: ${diagnosis.format.name}, ${diagnosis.format.daysPerWeek}`,
    `- Plan sugerido: ${diagnosis.plan.name}`,
    "",
    "¿Cuándo puedo ir a mi valoración presencial?",
  ].join("\n");
}
