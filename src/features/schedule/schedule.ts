import { business, type ScheduleBlock } from "@/config/business";

const DAY_NAMES = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"] as const;
const WEEKDAY_INDEX: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

export interface ZonedMoment {
  /** 0 = Sunday ... 6 = Saturday. */
  day: number;
  /** Minutes from midnight. */
  minute: number;
}

export interface ScheduleStatus {
  isOpen: boolean;
  /** Short headline, e.g. "Abierto ahora". */
  headline: string;
  /** Detail, e.g. "cierra a las 6:00 p. m.". */
  detail: string;
  /** Headline and detail joined for single-line use. */
  text: string;
}

/** Formats minutes from midnight as "6:00 a. m." / "6:00 p. m.". */
export function formatClock(totalMinutes: number): string {
  const hours24 = Math.floor(totalMinutes / 60) % 24;
  const minutes = totalMinutes % 60;
  const suffix = hours24 < 12 ? "a. m." : "p. m.";
  const hours12 = hours24 % 12 === 0 ? 12 : hours24 % 12;
  return `${hours12}:${String(minutes).padStart(2, "0")} ${suffix}`;
}

/** Reads weekday and minute-of-day for an instant in the given time zone. */
export function getZonedMoment(date: Date, timeZone: string = business.timezone): ZonedMoment {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "0";
  return {
    day: WEEKDAY_INDEX[get("weekday")] ?? 0,
    minute: (Number(get("hour")) % 24) * 60 + Number(get("minute")),
  };
}

function blockForDay(day: number, schedule: readonly ScheduleBlock[]): ScheduleBlock | undefined {
  return schedule.find((block) => block.days.includes(day));
}

/** True when the gym is open at the given instant (America/Bogota by default). */
export function isOpenNow(
  date: Date,
  schedule: readonly ScheduleBlock[] = business.schedule,
  timeZone: string = business.timezone,
): boolean {
  const { day, minute } = getZonedMoment(date, timeZone);
  const block = blockForDay(day, schedule);
  return !!block && minute >= block.openMinute && minute < block.closeMinute;
}

function nextOpeningText(
  { day, minute }: ZonedMoment,
  schedule: readonly ScheduleBlock[],
): string {
  for (let offset = 0; offset <= 7; offset += 1) {
    const candidateDay = (day + offset) % 7;
    const block = blockForDay(candidateDay, schedule);
    if (!block) continue;
    if (offset === 0 && block.openMinute <= minute) continue;
    const when = offset === 0 ? "hoy" : offset === 1 ? "mañana" : `el ${DAY_NAMES[candidateDay]}`;
    return `abre ${when} a las ${formatClock(block.openMinute)}`;
  }
  return "consulta nuestros horarios";
}

/** Live status with the closing or next opening text. */
export function getScheduleStatus(
  date: Date,
  schedule: readonly ScheduleBlock[] = business.schedule,
  timeZone: string = business.timezone,
): ScheduleStatus {
  const moment = getZonedMoment(date, timeZone);
  const block = blockForDay(moment.day, schedule);
  const open = !!block && moment.minute >= block.openMinute && moment.minute < block.closeMinute;
  if (open && block) {
    const detail = `cierra a las ${formatClock(block.closeMinute)}`;
    return { isOpen: true, headline: "Abierto ahora", detail, text: `Abierto ahora · ${detail}` };
  }
  const detail = nextOpeningText(moment, schedule);
  return { isOpen: false, headline: "Cerrado", detail, text: `Cerrado · ${detail}` };
}
