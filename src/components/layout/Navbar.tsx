"use client";

import { useEffect, useRef, useState } from "react";
import { business } from "@/config/business";
import { PlateMark } from "./Logo";

const LINKS = [
  { href: "#propuesta", label: "Propuesta de valor" },
  { href: "#calculadora", label: "Calculadora de ahorro" },
  { href: "#test", label: "Test de rutina" },
  { href: "#productos", label: "Productos" },
  { href: "#convenios", label: "Convenios" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <div className="scroll-progress" aria-hidden="true" />
      <header className="site-header sticky top-0 z-50">
        <div className="wrap flex h-16 items-center justify-between gap-4">
          <a href="#inicio" className="flex items-center gap-3" aria-label="FitFlex, ir al inicio">
            <PlateMark />
            <span className="display text-xl leading-none">{business.name}</span>
            <span className="hidden whitespace-nowrap text-sm text-tiza-suave md:inline xl:hidden 2xl:inline">{business.tagline}</span>
          </a>

          <nav aria-label="Principal" className="hidden xl:block">
            <ul className="flex items-center gap-6">
              {LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="whitespace-nowrap text-[0.95rem] text-tiza-suave transition-colors hover:text-tiza">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <a href="#test" className="btn btn-primary hidden !min-h-11 !px-5 !py-2 text-[0.95rem] whitespace-nowrap sm:inline-flex">
              Hacer mi test gratis
            </a>
            <button
              ref={buttonRef}
              type="button"
              className="btn btn-ghost !min-h-11 !px-4 !py-2 xl:hidden"
              aria-expanded={open}
              aria-controls="menu-movil"
              onClick={() => setOpen((value) => !value)}
            >
              {open ? "Cerrar menú" : "Menú"}
            </button>
          </div>
        </div>

        {open ? (
          <div id="menu-movil" className="border-t border-linea bg-lona xl:hidden">
            <nav aria-label="Principal móvil" className="wrap py-4">
              <p className="pb-2 text-sm text-tiza-suave">{business.tagline}</p>
              <ul className="flex flex-col">
                {LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={close}
                      className="block border-b border-linea py-3.5 text-lg"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
              <a href="#test" onClick={close} className="btn btn-primary mt-5 w-full sm:hidden">
                Hacer mi test gratis
              </a>
            </nav>
          </div>
        ) : null}
      </header>
    </>
  );
}
