"use client";

import { motion, useReducedMotion } from "motion/react";
import { buildWhatsappLink } from "@/lib/format";
import { buildWhatsappMessage, type Diagnosis } from "./diagnose";
import type { Answers } from "./questions";

interface DiagnosisCardProps {
  answers: Answers;
  diagnosis: Diagnosis;
  onRestart: () => void;
}

export function DiagnosisCard({ answers, diagnosis, onRestart }: DiagnosisCardProps) {
  const reduce = useReducedMotion();
  const href = buildWhatsappLink(buildWhatsappMessage(answers, diagnosis));

  const container = {
    hidden: { opacity: 0, y: reduce ? 0 : 18 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0 : 0.35, ease: "easeOut" as const, staggerChildren: reduce ? 0 : 0.08 },
    },
  };
  const row = {
    hidden: { opacity: 0, y: reduce ? 0 : 10 },
    show: { opacity: 1, y: 0, transition: { duration: reduce ? 0 : 0.3 } },
  };

  const rows = [
    { term: "Enfoque", name: diagnosis.focus.name, text: `${diagnosis.focus.description} ${diagnosis.preferenceNote}` },
    { term: "Nivel", name: diagnosis.level.name, text: diagnosis.level.description },
    { term: "Formato", name: `${diagnosis.format.name}, ${diagnosis.format.daysPerWeek}`, text: "" },
    { term: "Plan recomendado", name: diagnosis.plan.name, text: diagnosis.plan.detail },
  ];

  return (
    <motion.div variants={container} initial="hidden" animate="show">
      <motion.h3
        variants={row}
        data-focus-target
        tabIndex={-1}
        className="display text-3xl outline-none sm:text-4xl"
      >
        Diagnóstico preliminar
      </motion.h3>

      <dl className="mt-6 divide-y divide-linea border-y border-linea">
        {rows.map((item) => (
          <motion.div key={item.term} variants={row} className="grid gap-1 py-4 sm:grid-cols-[9.5rem_1fr] sm:gap-6">
            <dt className="text-tiza-suave">{item.term}</dt>
            <dd>
              <span className="display block text-xl leading-tight">{item.name}</span>
              {item.text ? <span className="mt-1 block text-tiza-suave">{item.text}</span> : null}
            </dd>
          </motion.div>
        ))}
      </dl>

      <motion.p variants={row} className="mt-5 text-sm text-tiza-suave">
        {diagnosis.disclaimer}
      </motion.p>

      <motion.div variants={row} className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
        <a href={href} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
          Enviar mis respuestas por WhatsApp
        </a>
        <button type="button" onClick={onRestart} className="btn btn-ghost">
          Repetir el test
        </button>
      </motion.div>
      <motion.p variants={row} className="mt-4 text-sm text-tiza-suave">
        Tus respuestas no se guardan en este sitio; solo se envían si tocas el botón.
      </motion.p>
    </motion.div>
  );
}
