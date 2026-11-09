import { describe, expect, it } from "vitest";
import { formatClock, getScheduleStatus, isOpenNow } from "./schedule";

// Bogota is UTC-5 all year (no DST). Helper builds an instant from Bogota local time.
// 2026-11-09 is a Monday.
function bogota(day: number, hour: number, minute = 0): Date {
  return new Date(Date.UTC(2026, 10, day, hour + 5, minute));
}

describe("formatClock", () => {
  it("formats Spanish 12-hour clock", () => {
    expect(formatClock(6 * 60)).toBe("6:00 a. m.");
    expect(formatClock(18 * 60)).toBe("6:00 p. m.");
    expect(formatClock(20 * 60 + 5)).toBe("8:05 p. m.");
    expect(formatClock(12 * 60)).toBe("12:00 p. m.");
  });
});

describe("isOpenNow", () => {
  it("is open on a weekday at noon", () => {
    expect(isOpenNow(bogota(9, 12))).toBe(true);
  });
  it("is closed on a weekday before 6 a. m. and from 6 p. m.", () => {
    expect(isOpenNow(bogota(9, 5, 59))).toBe(false);
    expect(isOpenNow(bogota(9, 6))).toBe(true);
    expect(isOpenNow(bogota(9, 17, 59))).toBe(true);
    expect(isOpenNow(bogota(9, 18))).toBe(false);
  });
  it("uses weekend hours (7 a. m. - 8 p. m.)", () => {
    expect(isOpenNow(bogota(14, 6, 30))).toBe(false); // Saturday
    expect(isOpenNow(bogota(14, 19, 30))).toBe(true);
    expect(isOpenNow(bogota(15, 20))).toBe(false); // Sunday
  });
  it("converts from UTC using the Bogota time zone", () => {
    // 2026-11-09T04:00Z is Sunday 11-08 23:00 in Bogota -> closed.
    expect(isOpenNow(new Date("2026-11-09T04:00:00Z"))).toBe(false);
    // 2026-11-09T15:00Z is Monday 10:00 in Bogota -> open.
    expect(isOpenNow(new Date("2026-11-09T15:00:00Z"))).toBe(true);
  });
});

describe("getScheduleStatus", () => {
  it("reports the closing time when open", () => {
    expect(getScheduleStatus(bogota(9, 12)).text).toBe("Abierto ahora · cierra a las 6:00 p. m.");
  });
  it("reports opening later today", () => {
    expect(getScheduleStatus(bogota(9, 4)).text).toBe("Cerrado · abre hoy a las 6:00 a. m.");
  });
  it("reports opening tomorrow", () => {
    // Saturday night -> Sunday 7:00 a. m.
    expect(getScheduleStatus(bogota(14, 21)).text).toBe("Cerrado · abre mañana a las 7:00 a. m.");
  });
  it("names the weekday when the next opening is further away", () => {
    const empty = [{ label: "x", days: [3], openMinute: 360, closeMinute: 1080 }];
    expect(getScheduleStatus(bogota(9, 12), empty).text).toBe("Cerrado · abre el miércoles a las 6:00 a. m.");
  });
});
