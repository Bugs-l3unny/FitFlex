import { describe, expect, it } from "vitest";
import {
  buildOrderMessage,
  cartReducer,
  emptyCart,
  getCartLines,
  getCartTotal,
  getItemCount,
  MAX_QTY_PER_PRODUCT,
} from "./cart";

describe("cartReducer", () => {
  it("adds and increments", () => {
    let cart = cartReducer(emptyCart, { type: "add", id: "water" });
    cart = cartReducer(cart, { type: "add", id: "water" });
    expect(cart).toEqual({ water: 2 });
  });

  it("removes one unit and drops the line at zero", () => {
    let cart = cartReducer({ water: 2 }, { type: "remove", id: "water" });
    expect(cart).toEqual({ water: 1 });
    cart = cartReducer(cart, { type: "remove", id: "water" });
    expect(cart).toEqual({});
  });

  it("ignores removing something that is not in the cart", () => {
    expect(cartReducer(emptyCart, { type: "remove", id: "water" })).toEqual({});
  });

  it("caps the quantity", () => {
    const cart = cartReducer({ water: MAX_QTY_PER_PRODUCT }, { type: "add", id: "water" });
    expect(cart.water).toBe(MAX_QTY_PER_PRODUCT);
  });

  it("clears", () => {
    expect(cartReducer({ water: 3 }, { type: "clear" })).toEqual({});
  });

  it("does not mutate the previous state", () => {
    const prev = { water: 1 };
    cartReducer(prev, { type: "add", id: "water" });
    expect(prev).toEqual({ water: 1 });
  });
});

describe("totals", () => {
  const cart = { water: 2, "protein-drink": 1 };
  it("computes the total", () => {
    expect(getCartTotal(cart)).toBe(2 * 1_500 + 17_000);
    expect(getCartTotal(emptyCart)).toBe(0);
  });
  it("lists lines with subtotals in catalog order", () => {
    const lines = getCartLines(cart);
    expect(lines.map((l) => [l.product.id, l.quantity, l.subtotal])).toEqual([
      ["water", 2, 3_000],
      ["protein-drink", 1, 17_000],
    ]);
  });
  it("counts items", () => {
    expect(getItemCount(cart)).toBe(3);
  });
});

describe("buildOrderMessage", () => {
  it("lists items, quantities, subtotals and total", () => {
    const message = buildOrderMessage({ water: 2, "hydration-stick": 1 });
    expect(message).toContain("2 x Agua mineral ($1.500 c/u): $3.000");
    expect(message).toContain("1 x Stick hidratante ($3.300 c/u): $3.300");
    expect(message).toContain("Total: $6.300");
    expect(message).toContain("recoger hoy en recepción");
  });
});
