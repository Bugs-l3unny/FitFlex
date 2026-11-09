import { describe, expect, it } from "vitest";
import { buildWhatsappMessage, diagnose, DIAGNOSIS_DISCLAIMER } from "./diagnose";
import { isComplete, QUESTIONS, type Answers } from "./questions";

const base: Answers = {
  inactivity: "1-6-months",
  sessionTime: "one-hour",
  preference: "cardio",
  goal: "lose-weight",
};

describe("questions", () => {
  it("keeps the exact goal labels", () => {
    const goal = QUESTIONS.find((q) => q.id === "goal");
    expect(goal?.options.map((o) => o.label)).toEqual([
      "Perder peso",
      "Mejorar la condición física",
      "Ganar fuerza",
    ]);
  });
  it("detects complete answers", () => {
    expect(isComplete(base)).toBe(true);
    expect(isComplete({ goal: "fitness" })).toBe(false);
  });
});

describe("diagnose", () => {
  it("maps goals to focus", () => {
    expect(diagnose({ ...base, goal: "lose-weight" }).focus.name).toBe("Quema y constancia");
    expect(diagnose({ ...base, goal: "fitness" }).focus.name).toBe("Base atlética");
    expect(diagnose({ ...base, goal: "strength" }).focus.name).toBe("Fuerza progresiva");
  });

  it("maps inactivity to level", () => {
    expect(diagnose({ ...base, inactivity: "lt-1-month" }).level.name).toBe("Retomas el ritmo");
    expect(diagnose({ ...base, inactivity: "1-6-months" }).level.name).toBe("Reinicio gradual");
    expect(diagnose({ ...base, inactivity: "gt-6-months" }).level.name).toBe(
      "Principiante: 2 semanas de adaptación y técnica",
    );
  });

  it("maps session time to format", () => {
    const express = diagnose({ ...base, sessionTime: "express" }).format;
    expect(`${express.name}, ${express.daysPerWeek}`).toBe("Circuito express, 4 días/semana");
    const full = diagnose({ ...base, sessionTime: "one-hour" }).format;
    expect(`${full.name}, ${full.daysPerWeek}`).toBe("Sesión completa, 3-4 días/semana");
    const split = diagnose({ ...base, sessionTime: "over-hour" }).format;
    expect(`${split.name}, ${split.daysPerWeek}`).toBe("Rutina dividida, 4-5 días/semana");
  });

  it("recommends the monthly membership and mentions the university price", () => {
    const d = diagnose(base);
    expect(d.plan.name).toBe("Membresía mensual");
    expect(d.plan.detail).toContain("$49.500");
    expect(d.plan.detail).toContain("$55.000");
  });

  it("says when the preference matches the focus", () => {
    expect(diagnose({ ...base, goal: "lose-weight", preference: "cardio" }).preferenceNote).toContain("coincide");
  });

  it("adapts the plan when the preference differs from the focus", () => {
    const note = diagnose({ ...base, goal: "lose-weight", preference: "weights" }).preferenceNote;
    expect(note).toContain("circuitos con pesas");
    expect(note).not.toContain("coincide");
  });

  it("always includes the disclaimer", () => {
    expect(diagnose(base).disclaimer).toBe(DIAGNOSIS_DISCLAIMER);
  });

  it("is deterministic for all 81 answer combinations", () => {
    for (const a of QUESTIONS[0].options)
      for (const b of QUESTIONS[1].options)
        for (const c of QUESTIONS[2].options)
          for (const d of QUESTIONS[3].options) {
            const answers: Answers = { inactivity: a.id, sessionTime: b.id, preference: c.id, goal: d.id };
            expect(diagnose(answers)).toEqual(diagnose(answers));
            expect(diagnose(answers).preferenceNote.length).toBeGreaterThan(10);
          }
  });
});

describe("buildWhatsappMessage", () => {
  it("includes the four answers and the diagnosis", () => {
    const answers: Answers = {
      inactivity: "gt-6-months",
      sessionTime: "express",
      preference: "mixed",
      goal: "strength",
    };
    const message = buildWhatsappMessage(answers, diagnose(answers));
    expect(message).toContain("Más de 6 meses / Nunca he entrenado");
    expect(message).toContain("30 - 45 min (Express)");
    expect(message).toContain("Mixto / Funcional");
    expect(message).toContain("Ganar fuerza");
    expect(message).toContain("Fuerza progresiva");
    expect(message).toContain("Principiante: 2 semanas de adaptación y técnica");
    expect(message).toContain("Membresía mensual");
  });
});
