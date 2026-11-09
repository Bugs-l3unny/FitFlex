import { describe, expect, it } from "vitest";
import { buildWhatsappLink, formatCOP } from "./format";
import { business } from "@/config/business";

describe("formatCOP", () => {
  it("formats thousands with dots", () => {
    expect(formatCOP(55000)).toBe("$55.000");
    expect(formatCOP(1500)).toBe("$1.500");
    expect(formatCOP(800)).toBe("$800");
    expect(formatCOP(1234567)).toBe("$1.234.567");
  });
  it("keeps the sign on negatives", () => {
    expect(formatCOP(-9000)).toBe("-$9.000");
  });
});

describe("buildWhatsappLink", () => {
  it("uses the number when provided", () => {
    expect(buildWhatsappLink("Hola mundo", "+57 300 123 4567")).toBe(
      "https://wa.me/573001234567?text=Hola%20mundo",
    );
  });
  it("falls back to the contact picker when there is no number", () => {
    expect(buildWhatsappLink("Hola", "")).toBe("https://wa.me/?text=Hola");
  });
  it("encodes line breaks and symbols", () => {
    expect(buildWhatsappLink("a\nb & c", "")).toBe("https://wa.me/?text=a%0Ab%20%26%20c");
  });
});

describe("business config", () => {
  it("computes the university price from the discount", () => {
    expect(business.prices.universityMonthly).toBe(49500);
  });
});
