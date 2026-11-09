import { business } from "@/config/business";

export const MIN_DAYS_PER_WEEK = 1;
export const MAX_DAYS_PER_WEEK = 7;
export const DEFAULT_DAYS_PER_WEEK = 3;
const WEEKS_PER_MONTH = 4;

export type RecommendedPlan = "membership" | "daily-pass";

export interface SavingsResult {
  daysPerWeek: number;
  monthlyDailyPasses: number;
  membership: number;
  recommended: RecommendedPlan;
  /** Absolute difference between both options, per month. */
  savings: number;
}

/** Compares a month of daily passes against the monthly membership. */
export function calculateSavings(daysPerWeek: number, isStudent: boolean): SavingsResult {
  const days = Math.min(MAX_DAYS_PER_WEEK, Math.max(MIN_DAYS_PER_WEEK, Math.round(daysPerWeek)));
  const monthlyDailyPasses = days * WEEKS_PER_MONTH * business.prices.daily;
  const membership = isStudent ? business.prices.universityMonthly : business.prices.monthly;
  return {
    daysPerWeek: days,
    monthlyDailyPasses,
    membership,
    recommended: membership < monthlyDailyPasses ? "membership" : "daily-pass",
    savings: Math.abs(monthlyDailyPasses - membership),
  };
}
