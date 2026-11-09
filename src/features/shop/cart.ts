import { business, type Product } from "@/config/business";
import { formatCOP } from "@/lib/format";

export const MAX_QTY_PER_PRODUCT = 20;

export type Cart = Readonly<Record<string, number>>;

export type CartAction =
  | { type: "add"; id: string }
  | { type: "remove"; id: string }
  | { type: "clear" };

export const emptyCart: Cart = {};

export function cartReducer(cart: Cart, action: CartAction): Cart {
  switch (action.type) {
    case "add": {
      const next = Math.min(MAX_QTY_PER_PRODUCT, (cart[action.id] ?? 0) + 1);
      return { ...cart, [action.id]: next };
    }
    case "remove": {
      const current = cart[action.id] ?? 0;
      if (current <= 1) {
        const rest = { ...cart };
        delete rest[action.id];
        return rest;
      }
      return { ...cart, [action.id]: current - 1 };
    }
    case "clear":
      return emptyCart;
  }
}

export interface CartLine {
  product: Product;
  quantity: number;
  subtotal: number;
}

export function getCartLines(
  cart: Cart,
  products: readonly Product[] = business.products,
): CartLine[] {
  return products
    .filter((p) => (cart[p.id] ?? 0) > 0)
    .map((product) => ({
      product,
      quantity: cart[product.id],
      subtotal: product.price * cart[product.id],
    }));
}

export function getCartTotal(cart: Cart, products: readonly Product[] = business.products): number {
  return getCartLines(cart, products).reduce((sum, line) => sum + line.subtotal, 0);
}

export function getItemCount(cart: Cart): number {
  return Object.values(cart).reduce((sum, qty) => sum + qty, 0);
}

export function buildOrderMessage(
  cart: Cart,
  products: readonly Product[] = business.products,
): string {
  const lines = getCartLines(cart, products);
  return [
    `Hola, equipo de ${business.name}. Quiero pedir para recoger hoy en recepción:`,
    "",
    ...lines.map(
      (l) => `- ${l.quantity} x ${l.product.name} (${formatCOP(l.product.price)} c/u): ${formatCOP(l.subtotal)}`,
    ),
    "",
    `Total: ${formatCOP(getCartTotal(cart, products))}`,
  ].join("\n");
}
