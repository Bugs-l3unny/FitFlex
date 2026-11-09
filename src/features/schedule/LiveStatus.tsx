"use client";

import { business } from "@/config/business";
import { formatClock, getScheduleStatus, getZonedMoment } from "./schedule";
import { useNow } from "./use-now";

/** Timetable-board card: live open/closed status plus both schedule rows. */
export function LiveStatus() {
  const now = useNow();
  const status = now ? getScheduleStatus(now) : null;
  const today = now ? getZonedMoment(now).day : null;

  return (
    <section aria-labelledby="horarios-titulo" className="rounded-[1.25rem] border border-linea bg-lona p-5">
      <h2 id="horarios-titulo" className="sr-only">
        Horarios de atención
      </h2>
      <div className="flex min-h-14 items-start gap-3 border-b border-linea pb-4" role="status">
        <span className="live-dot mt-2" data-open={status?.isOpen ? "true" : "false"} aria-hidden="true" />
        {status ? (
          <p className="text-lg font-semibold leading-snug">
            {status.headline}
            <span className="sr-only"> · </span>
            <span className="block text-base font-normal text-tiza-suave">{status.detail}</span>
          </p>
        ) : (
          <p className="text-lg text-tiza-suave">Consultando horario…</p>
        )}
      </div>
      <dl className="mt-4 space-y-3">
        {business.schedule.map((block) => {
          const isToday = today !== null && block.days.includes(today);
          return (
            <div
              key={block.label}
              className={`flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5 rounded-lg px-3 py-2 ${
                isToday ? "bg-caucho outline outline-1 outline-lima/50" : ""
              }`}
            >
              <dt className={isToday ? "font-semibold" : "text-tiza-suave"}>{block.label}</dt>
              <dd className="tabular whitespace-nowrap font-semibold">
                {formatClock(block.openMinute)} – {formatClock(block.closeMinute)}
              </dd>
            </div>
          );
        })}
      </dl>
    </section>
  );
}
