/**
 * Single source of truth for FitFlex business data.
 * Prices are in Colombian pesos (COP), integers.
 */

export interface ScheduleBlock {
  /** Spanish label shown in the UI. */
  label: string;
  /** Days covered, 0 = Sunday ... 6 = Saturday. */
  days: readonly number[];
  /** Opening time in minutes from midnight (America/Bogota). */
  openMinute: number;
  /** Closing time in minutes from midnight (America/Bogota). */
  closeMinute: number;
}

export interface Product {
  id: "water" | "hydration-stick" | "protein-drink";
  name: string;
  description: string;
  price: number;
}

export interface SocialLink {
  id: "instagram" | "tiktok" | "facebook";
  label: string;
  /** Owner profile URL. Empty until provided. */
  url: string;
  /** Fallback used while `url` is empty. */
  fallbackUrl: string;
}

const MONTHLY_PRICE = 55_000;
const DAILY_PRICE = 8_000;
const UNIVERSITY_DISCOUNT_PERCENT = 10;

export const business = {
  name: "FitFlex",
  tagline: "Tu bienestar, a tu ritmo",
  timezone: "America/Bogota",
  prices: {
    monthly: MONTHLY_PRICE,
    daily: DAILY_PRICE,
    universityDiscountPercent: UNIVERSITY_DISCOUNT_PERCENT,
    universityMonthly: Math.round(MONTHLY_PRICE * (1 - UNIVERSITY_DISCOUNT_PERCENT / 100)),
  },
  friendFreeDays: 3,
  // The owner may change opening hours here.
  schedule: [
    { label: "Lunes a viernes", days: [1, 2, 3, 4, 5], openMinute: 6 * 60, closeMinute: 18 * 60 },
    { label: "Sábados y domingos", days: [6, 0], openMinute: 7 * 60, closeMinute: 20 * 60 },
  ] satisfies ScheduleBlock[],
  // TODO: owner will provide the WhatsApp number (digits only, with country code, e.g. 573001234567).
  whatsappNumber: "",
  socials: [
    // TODO: owner will provide the profile URLs.
    { id: "instagram", label: "Instagram", url: "", fallbackUrl: "https://www.instagram.com" },
    { id: "tiktok", label: "TikTok", url: "", fallbackUrl: "https://www.tiktok.com" },
    { id: "facebook", label: "Facebook", url: "", fallbackUrl: "https://www.facebook.com" },
  ] satisfies SocialLink[],
  location: {
    city: "Cali, Colombia",
    // TODO: owner will provide the exact street address.
    address: "",
  },
  products: [
    {
      id: "water",
      name: "Agua mineral",
      description: "Para hidratarte entre series.",
      price: 1_500,
    },
    {
      id: "hydration-stick",
      name: "Stick hidratante",
      description: "Para recargar la hidratación mientras entrenas.",
      price: 3_300,
    },
    {
      id: "protein-drink",
      name: "Bebida de proteína",
      description: "Para acompañar tu recuperación después de entrenar.",
      price: 17_000,
    },
  ] satisfies Product[],
} as const;

export type Business = typeof business;
