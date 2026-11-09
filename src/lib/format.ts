import { business } from "@/config/business";

/** Formats an integer amount as Colombian pesos, e.g. 55000 -> "$55.000". */
export function formatCOP(amount: number): string {
  const rounded = Math.round(amount);
  const sign = rounded < 0 ? "-" : "";
  const digits = Math.abs(rounded).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return `${sign}$${digits}`;
}

/**
 * Builds a WhatsApp click-to-chat link. When no number is configured the link
 * still works: WhatsApp lets the user pick the contact.
 */
export function buildWhatsappLink(
  message: string,
  number: string = business.whatsappNumber,
): string {
  const digits = number.replace(/\D/g, "");
  const text = encodeURIComponent(message);
  return digits ? `https://wa.me/${digits}?text=${text}` : `https://wa.me/?text=${text}`;
}
