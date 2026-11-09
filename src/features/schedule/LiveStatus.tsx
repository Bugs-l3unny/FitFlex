"use client";

import { business } from "@/config/business";
import { formatClock, getScheduleStatus, getZonedMoment } from "./schedule";
import { useNow } from "./use-now";

/**
 * Timetable-board card: live open/closed status plus both schedule rows.
 * Stacked on small screens; a compact two-column strip from lg up so it
 * sits beside the hero CTAs without stretching the row.
 */
export function LiveStatus() {
  const now = useNow();
  const status = now ? getScheduleStatus(now) : null;
  const today = now ? getZonedMoment(now).day : null;

  return (
    <section
      aria-labelledby="horarios-titulo"
      className="rounded-[1.25rem] border border-linea bg-lona p-5 lg:flex lg:items-center lg:gap-6"
    >
      <h2 id="horarios-titulo" className="sr-only">
        Horarios de atención
      </h2>
      <div
        className="flex items-start gap-3 border-b border-linea pb-4 lg:min-w-44 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-6"
        role="status"
      >
        <span className="live-dot mt-2" data-open={status?.isOpen ? "true" : "false"} aria-hidden="true" />
        {status ? (
          <p className="text-lg font-semibold leading-snug">
            {status.headline}
            <span className="sr-only"> · </span>
            <span className="block text-sm font-normal text-tiza-suave">{status.detail}</span>
          </p>
        ) : (
          <p className="text-lg text-tiza-suave">Consultando horario…</p>
        )}
      </div>
      <dl className="mt-4 space-y-2 lg:mt-0">
        {business.schedule.map((block) => {
          const isToday = today !== null && block.days.includes(today);
          return (
            <div
              key={block.label}
              className={`flex flex-wrap items-baseline justify-between gap-x-6 gap-y-0.5 border-l-2 pl-3 lg:flex-col lg:gap-0 ${
                isToday ? "border-lima" : "border-transparent"
              }`}
            >
              <dt className={isToday ? "font-semibold" : "text-tiza-suave"}>
                {block.label}
                {isToday && <span className="sr-only"> (hoy)</span>}
              </dt>
              <dd className={`tabular whitespace-nowrap ${isToday ? "font-semibold" : "text-tiza-suave"}`}>
                {formatClock(block.openMinute)} – {formatClock(block.closeMinute)}
              </dd>
            </div>
          );
        })}
      </dl>
    </section>
  );
}
