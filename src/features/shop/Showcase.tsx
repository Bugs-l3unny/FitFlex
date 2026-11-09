"use client";

import { useReducer } from "react";
import { business, type Product } from "@/config/business";
import { buildWhatsappLink, formatCOP } from "@/lib/format";
import { buildOrderMessage, cartReducer, emptyCart, getCartLines, getCartTotal, getItemCount } from "./cart";

function ProductIcon({ id }: { id: Product["id"] }) {
  const common = {
    viewBox: "0 0 40 40",
    className: "h-10 w-10 flex-none text-lima",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    focusable: false,
  };
  if (id === "water") {
    return (
      <svg {...common}>
        <path d="M16 4h8v5l3 4v21a3 3 0 0 1-3 3h-8a3 3 0 0 1-3-3V13l3-4z" />
        <path d="M13 20h14" />
      </svg>
    );
  }
  if (id === "hydration-stick") {
    return (
      <svg {...common}>
        <rect x="14" y="3" width="12" height="34" rx="3" />
        <path d="M14 10h12M14 30h12" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path d="M12 4h16v6l3 4v20a3 3 0 0 1-3 3H12a3 3 0 0 1-3-3V14l3-4z" />
      <path d="M9 20h22M9 28h22" />
    </svg>
  );
}

interface StepperProps {
  product: Product;
  quantity: number;
  onAdd: () => void;
  onRemove: () => void;
}

function Stepper({ product, quantity, onAdd, onRemove }: StepperProps) {
  const buttonClass =
    "grid h-11 w-11 place-items-center rounded-full border-2 border-linea bg-caucho text-xl font-bold transition-colors hover:border-lima disabled:cursor-not-allowed disabled:text-tiza-suave disabled:hover:border-linea";
  return (
    <div className="flex items-center gap-3" role="group" aria-label={`Cantidad de ${product.name}`}>
      <button
        type="button"
        className={buttonClass}
        onClick={onRemove}
        disabled={quantity === 0}
        aria-label={`Quitar una unidad de ${product.name}`}
      >
        <span aria-hidden="true">−</span>
      </button>
      <output className="num w-8 text-center text-2xl" aria-label={`${quantity} unidades`}>
        {quantity}
      </output>
      <button type="button" className={buttonClass} onClick={onAdd} aria-label={`Agregar una unidad de ${product.name}`}>
        <span aria-hidden="true">+</span>
      </button>
    </div>
  );
}

export function Showcase() {
  const [cart, dispatch] = useReducer(cartReducer, emptyCart);
  const lines = getCartLines(cart);
  const total = getCartTotal(cart);
  const count = getItemCount(cart);
  const href = buildWhatsappLink(buildOrderMessage(cart));

  return (
    <div className="grid gap-6 lg:grid-cols-[1.35fr_1fr]">
      <ul className="divide-y divide-linea overflow-hidden rounded-[1.25rem] border border-linea bg-lona/90">
        {business.products.map((product) => (
          <li key={product.id} className="flex flex-wrap items-center gap-x-5 gap-y-4 p-5 sm:p-6">
            <ProductIcon id={product.id} />
            <div className="min-w-[10rem] flex-1">
              <h3 className="display text-xl leading-tight">{product.name}</h3>
              <p className="mt-1 text-sm text-tiza-suave">{product.description}</p>
              <p className="num mt-2 text-2xl text-lima">{formatCOP(product.price)}</p>
            </div>
            <Stepper
              product={product}
              quantity={cart[product.id] ?? 0}
              onAdd={() => dispatch({ type: "add", id: product.id })}
              onRemove={() => dispatch({ type: "remove", id: product.id })}
            />
          </li>
        ))}
      </ul>

      <div className="self-start rounded-[1.25rem] border border-linea bg-lona p-6">
        <h3 className="display text-2xl">Tu pedido</h3>
        <div aria-live="polite">
          {lines.length === 0 ? (
            <p className="mt-4 text-tiza-suave">Aún no agregas productos. Usa el botón + para armar tu pedido.</p>
          ) : (
            <ul className="mt-4 space-y-2">
              {lines.map((line) => (
                <li key={line.product.id} className="flex justify-between gap-4">
                  <span>
                    {line.quantity} × {line.product.name}
                  </span>
                  <span className="tabular font-semibold">{formatCOP(line.subtotal)}</span>
                </li>
              ))}
            </ul>
          )}
          <p className="mt-5 flex items-baseline justify-between gap-4 border-t border-linea pt-4">
            <span className="text-tiza-suave">Total{count > 0 ? ` (${count} ${count === 1 ? "producto" : "productos"})` : ""}</span>
            <span className="num text-3xl text-lima">{formatCOP(total)}</span>
          </p>
        </div>

        {count > 0 ? (
          <a href={href} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-6 w-full">
            Pedir para recoger hoy en recepción
          </a>
        ) : (
          <>
            <button
              type="button"
              className="btn mt-6 w-full"
              aria-disabled="true"
              aria-describedby="pedido-ayuda"
              onClick={(event) => event.preventDefault()}
            >
              Pedir para recoger hoy en recepción
            </button>
            <p id="pedido-ayuda" className="mt-3 text-sm text-tiza-suave">
              Agrega al menos un producto para enviar tu pedido por WhatsApp.
            </p>
          </>
        )}
        <p className="mt-4 text-sm text-tiza-suave">Tu pedido se recoge hoy en recepción.</p>
      </div>
    </div>
  );
}
