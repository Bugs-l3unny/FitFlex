import { describe, expect, it } from "vitest";
import { calculateSavings } from "./calculate-savings";

describe("calculateSavings", () => {
  it("1 day: daily passes are cheaper (32.000 vs 55.000)", () => {
    const r = calculateSavings(1, false);
    expect(r.monthlyDailyPasses).toBe(32_000);
    expect(r.membership).toBe(55_000);
    expect(r.recommended).toBe("daily-pass");
    expect(r.savings).toBe(23_000);
  });

  it("2 days: membership saves 9.000", () => {
    const r = calculateSavings(2, false);
    expect(r.monthlyDailyPasses).toBe(64_000);
    expect(r.recommended).toBe("membership");
    expect(r.savings).toBe(9_000);
  });

  it("2 days + student: membership saves 14.500", () => {
    const r = calculateSavings(2, true);
    expect(r.membership).toBe(49_500);
    expect(r.recommended).toBe("membership");
    expect(r.savings).toBe(14_500);
  });

  it("7 days: membership saves 169.000 (224.000 vs 55.000)", () => {
    const r = calculateSavings(7, false);
    expect(r.monthlyDailyPasses).toBe(224_000);
    expect(r.recommended).toBe("membership");
    expect(r.savings).toBe(169_000);
  });

  it("1 day + student: daily pass still cheaper", () => {
    const r = calculateSavings(1, true);
    expect(r.recommended).toBe("daily-pass");
    expect(r.savings).toBe(17_500);
  });

  it("clamps out-of-range input", () => {
    expect(calculateSavings(0, false).daysPerWeek).toBe(1);
    expect(calculateSavings(12, false).daysPerWeek).toBe(7);
  });
});
