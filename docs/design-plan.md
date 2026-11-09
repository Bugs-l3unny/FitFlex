# FitFlex landing page: design plan

Static landing page (Next.js App Router, `output: 'export'`) for a low-cost gym in Cali, Colombia. UI copy is in Spanish (es-CO, "tú"); code and docs are in English.

## Direction

The brief pins dark-first with neon green and subtle violet. The distinctive choices come from the subject (a gym floor, plates, a barbell, a price board) and from giving violet a single meaning.

## Color tokens

Defined as CSS custom properties in `src/app/globals.css` and exposed to Tailwind v4 through `@theme inline`.

| Token | Value | Role |
| --- | --- | --- |
| `--caucho` | `#101814` | Page background (gym rubber floor, green-black) |
| `--lona` | `#18231D` | Raised surfaces |
| `--linea` | `#2A3A31` | Borders and dividers |
| `--lima` | `#C6FF3D` | Neon accent: primary CTAs, key numbers, focus ring. Text on lima is always `--caucho` |
| `--morado` | `#8B5CF6` | Violet, only for the university agreement, the student toggle and Plus Amigo |
| `--morado-claro` | `#B79CFF` | Readable violet for small text on dark (added for AA contrast; `--morado` alone is about 3.8:1 on `--caucho`) |
| `--tiza` | `#EEF3EC` | Text |
| `--tiza-suave` | `#9AAAA0` | Muted text (about 7:1 on `--caucho`) |

## Type

One family: **Archivo** variable (weight 100-900, width 62-125), self-hosted from `src/app/fonts/` through `next/font/local` so the build works offline.

- Display headings: width 125 (expanded), weight 800, line-height about 0.95, fluid `clamp()` sizes.
- Body: width 100, 16-18px, line-height 1.6, measure capped around 62ch.
- Prices and numbers: expanded 800 with `font-variant-numeric: tabular-nums`.
- Sentence case everywhere. No all-caps tracked labels, no monospace labels, no arrows appended to buttons.

## Layout

Left-aligned throughout. Mobile-first, checked down to 360px with no horizontal scroll.

```
Navbar (sticky)  logo + tagline | 5 anchors | CTA "Hacer mi test gratis"
Hero             badge / three excuses struck through, each with its answer / CTAs + live schedule board
Calculadora      barbell slider + student switch | compare bars + savings badge
Propuesta        bento: one large lima tile, one violet tile, two quieter tiles
Test             heading | wizard with four plates loading onto a bar
Convenios        price-board rows (monthly, daily) | violet cards (university, Plus Amigo)
Productos        product rows with steppers | order summary (tinted B/W photo behind)
Footer           schedule, location, socials, WhatsApp
```

## Principles

1. **One memorable moment: the hero.** The three excuses are the headline. On load a lima strike-through draws across each one, staggered, and the answer appears beneath. Under `prefers-reduced-motion` the struck final state is shown immediately. The strike is a `background-size` animation on the inline text (not a pseudo-element) so it follows wrapped lines on narrow screens.
2. **Subject-grounded details.** The range input is a barbell (track = bar, thumb = weight plate). The wizard progress is four plates. The hours are a timetable board. Prices read like a gym price list.
3. **Violet has a meaning.** It only marks the university discount, the student toggle and Plus Amigo.
4. **Hierarchy through variation.** Bento tiles differ in size, fill and corner radius; there are no identical card grids, no grey drop shadows and no gradient washes.
5. **Restrained scroll motion, native CSS only** (`animation-timeline`, with `@supports` guards and hidden states only inside `@supports`): a thin lima reading-progress bar, the header solidifying as the hero exits (named `view-timeline` plus `timeline-scope`), and one subtle reveal on the bento tiles.
6. **JS motion only where the user acts:** `motion/react` drives the wizard step transitions and the result reveal, honoring `useReducedMotion`.
7. **Quality floor:** visible lima focus rings, real labels and radio-group semantics (fieldset/legend), `aria-live` on computed results, `lang="es-CO"`, semantic landmarks, skip link, smooth scroll disabled under reduced motion, `scroll-margin-top` for the sticky nav.

## Architecture

Feature-first, with pure logic separated from UI and covered by Vitest (`*.test.ts` next to the code).

- `src/config/business.ts`: all business data (prices, discounts, schedule, products, WhatsApp, socials, location).
- `src/lib/format.ts`: `formatCOP`, `buildWhatsappLink` (works without a number: `https://wa.me/?text=...`).
- `src/features/*`: schedule, savings-calculator, routine-test, shop, value-proposition, pricing.
- `src/components/layout`: Navbar, Footer, Section primitives.

## Pending owner data

- [ ] WhatsApp number (`business.whatsappNumber`, digits with country code, e.g. `573001234567`). Until then every WhatsApp button opens `wa.me/?text=...` and lets the user pick a contact.
- [ ] Social profile URLs for Instagram, TikTok and Facebook (`business.socials[].url`). Until then they link to each platform's homepage.
- [ ] Exact street address (`business.location.address`). The footer shows "Cali, Colombia" only.
- [ ] Logo. The wordmark "FitFlex" plus a plate glyph is a placeholder.
- [ ] Confirm the weekday closing time (6:00 p. m.) and the weekend hours (7:00 a. m. to 8:00 p. m.).
- [ ] Confirm the product list and prices, and whether orders are paid at reception.
- [ ] Open Graph image (none is set yet).
