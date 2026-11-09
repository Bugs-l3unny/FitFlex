"use client";

import { useId, useState } from "react";
import { business } from "@/config/business";
import { formatCOP } from "@/lib/format";
import {
  calculateSavings,
  DEFAULT_DAYS_PER_WEEK,
  MAX_DAYS_PER_WEEK,
  MIN_DAYS_PER_WEEK,
} from "./calculate-savings";

const SCALE_MAX = MAX_DAYS_PER_WEEK * 4 * business.prices.daily;
const DAY_MARKS = Array.from({ length: MAX_DAYS_PER_WEEK }, (_, i) => i + 1);

interface BarProps {
  label: string;
  value: number;
  highlighted: boolean;
}

function CompareBar({ label, value, highlighted }: BarProps) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <span className={highlighted ? "font-semibold" : "text-tiza-suave"}>{label}</span>
        <span className={`num text-2xl sm:text-3xl ${highlighted ? "text-lima" : "text-tiza"}`}>
          {formatCOP(value)}
        </span>
      </div>
      <div className="mt-2 h-3 overflow-hidden rounded-full bg-caucho" aria-hidden="true">
        <div
          className={`compare-fill h-full w-full rounded-full ${highlighted ? "bg-lima" : "bg-tiza-suave/60"}`}
          style={{ transform: `scaleX(${Math.min(1, value / SCALE_MAX)})` }}
        />
      </div>
    </div>
  );
}

export function SavingsCalculator() {
  const [days, setDays] = useState(DEFAULT_DAYS_PER_WEEK);
  const [isStudent, setIsStudent] = useState(false);
  const sliderId = useId();

  const result = calculateSavings(days, isStudent);
  const ratio = (days - MIN_DAYS_PER_WEEK) / (MAX_DAYS_PER_WEEK - MIN_DAYS_PER_WEEK);
  const winnerName = result.recommended === "membership" ? "la membresía mensual" : "pases diarios";
  const daysLabel = days === 1 ? "1 día" : `${days} días`;

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
      <div className="rounded-[1.5rem] border border-linea bg-lona p-6 sm:p-8">
        <label htmlFor={sliderId} className="text-lg font-semibold">
          ¿Cuántos días a la semana planeas entrenar?
        </label>
        <p className="num mt-4 text-5xl sm:text-6xl" aria-hidden="true">
          {days}
          <span className="ml-3 text-xl font-semibold text-tiza-suave normal-width">
            {days === 1 ? "día" : "días"} por semana
          </span>
        </p>

        <div className="mt-6">
          <input
            id={sliderId}
            type="range"
            min={MIN_DAYS_PER_WEEK}
            max={MAX_DAYS_PER_WEEK}
            step={1}
            value={days}
            onChange={(event) => setDays(Number(event.target.value))}
            className="barbell"
            style={{ "--ratio": ratio } as React.CSSProperties}
            aria-valuetext={`${daysLabel} por semana`}
          />
          <div className="tabular relative mt-1 flex h-6 justify-between px-[1.125rem] text-sm text-tiza-suave" aria-hidden="true">
            {DAY_MARKS.map((mark) => (
              <span key={mark} className="relative block w-0">
                <span className="absolute left-1/2 -translate-x-1/2">{mark}</span>
              </span>
            ))}
          </div>
        </div>

        <button
          type="button"
          role="switch"
          aria-checked={isStudent}
          onClick={() => setIsStudent((value) => !value)}
          className="mt-8 flex w-full items-center gap-4 rounded-2xl border-2 border-linea bg-caucho p-4 text-left aria-checked:border-morado"
        >
          <span className="switch-track" aria-hidden="true" />
          <span>
            <span className="block font-semibold">Tengo carnet universitario (-10 % Dto.)</span>
            <span className="block text-sm text-tiza-suave">
              Tu membresía baja a {formatCOP(business.prices.universityMonthly)} al mes.
            </span>
          </span>
        </button>
      </div>

      <div className="rounded-[1.5rem] border border-linea bg-lona p-6 sm:p-8">
        <div className="space-y-7">
          <CompareBar
            label="Pases diarios en el mes"
            value={result.monthlyDailyPasses}
            highlighted={result.recommended === "daily-pass"}
          />
          <CompareBar
            label={isStudent ? "Membresía mensual con carnet" : "Membresía mensual"}
            value={result.membership}
            highlighted={result.recommended === "membership"}
          />
        </div>
        <p className="mt-3 text-sm text-tiza-suave">
          Pases diarios: {daysLabel} × 4 semanas × {formatCOP(business.prices.daily)}.
        </p>

        <div aria-live="polite" className="mt-7">
          <p className="rounded-2xl bg-lima px-5 py-4 text-caucho">
            <span className="num block text-2xl sm:text-3xl">
              {result.savings === 0
                ? "Cuestan lo mismo"
                : `Ahorras ${formatCOP(result.savings)} al mes con ${winnerName}`}
            </span>
          </p>
          <p className="mt-4 rounded-2xl border border-morado bg-[color-mix(in_oklab,var(--morado)_14%,var(--lona))] px-5 py-3 text-sm">
            <span className="font-semibold text-morado-claro">Plus Amigo.</span> La membresía incluye{" "}
            {business.friendFreeDays} días gratis para invitar a un amigo.
          </p>
        </div>
      </div>
    </div>
  );
}
