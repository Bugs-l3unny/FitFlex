import { business } from "@/config/business";
import { formatClock } from "@/features/schedule/schedule";

const iconProps = {
  viewBox: "0 0 40 40",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  focusable: false,
};

// Hours are drawn on a 5:00 - 21:00 axis.
const AXIS_START = 5 * 60;
const AXIS_END = 21 * 60;

export function ValueBento() {
  return (
    <div className="grid gap-4 lg:grid-cols-12 lg:grid-rows-[auto_auto_auto]">
      <article className="bento-tile flex flex-col justify-between rounded-[2rem] bg-lima p-7 text-caucho sm:p-10 lg:col-span-7 lg:row-span-2">
        <div>
          <svg {...iconProps} className="h-12 w-12">
            <rect x="9" y="6" width="22" height="30" rx="3" />
            <path d="M15 4h10v5H15zM14 18h12M14 24h12M14 30h7" />
          </svg>
          <h3 className="display mt-6 text-[clamp(1.75rem,4vw,2.75rem)]">Valoración inicial y rutinas a medida</h3>
          <p className="mt-4 max-w-[46ch] text-lg">
            Acompañamiento básico incluido en tu membresía: sin pagar entrenadores privados costosos, sabes qué hacer
            desde tu primera semana.
          </p>
        </div>
        <a href="#test" className="btn mt-8 self-start border-2 border-caucho bg-caucho text-lima hover:bg-lona">
          Hacer mi test gratis
        </a>
      </article>

      <article className="bento-tile rounded-[1.5rem] border-2 border-morado bg-[color-mix(in_oklab,var(--morado)_14%,var(--lona))] p-7 lg:col-span-5">
        <svg {...iconProps} className="h-10 w-10 text-morado-claro">
          <path d="M5 15 20 8l15 7-15 7z" />
          <path d="M11 19v8c0 2 4 4 9 4s9-2 9-4v-8" />
        </svg>
        <h3 className="display mt-5 text-2xl">Alianzas universitarias y empresariales</h3>
        <p className="mt-3 text-tiza-suave">
          {business.prices.universityDiscountPercent} % de descuento con carnet universitario, y un pase de{" "}
          {business.friendFreeDays} días gratis para invitar a un amigo.
        </p>
      </article>

      <article className="bento-tile photo-frame relative flex min-h-64 flex-col justify-end overflow-hidden rounded-xl border border-linea p-6 lg:col-span-5">
        {/* Decorative photo of the dumbbell rack, tinted green. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/dumbbell-rack.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
          loading="lazy"
        />
        <div className="photo-tint absolute inset-0 -z-10" aria-hidden="true" />
        <div className="photo-scrim-bottom absolute inset-0 -z-10" aria-hidden="true" />
        <svg {...iconProps} className="h-9 w-9 text-lima">
          <path d="M20 4 7 9v10c0 8 6 14 13 17 7-3 13-9 13-17V9z" />
          <path d="m14 20 5 5 8-9" />
        </svg>
        <h3 className="display mt-4 text-xl">Espacios seguros y equipos de cardio y musculación</h3>
        <p className="mt-2 text-tiza">Mantenimiento preventivo, protocolos de seguridad y limpieza continua.</p>
      </article>

      <article className="bento-tile rounded-xl border border-linea bg-lona p-6 sm:p-8 lg:col-span-12">
        <div className="grid gap-6 md:grid-cols-[1fr_1.4fr] md:items-center">
          <div>
            <h3 className="display text-xl sm:text-2xl">Horarios flexibles</h3>
            <p className="mt-2 max-w-[42ch] text-tiza-suave">
              Pensado para universitarios y trabajadores con agendas apretadas: abrimos los 7 días de la semana.
            </p>
          </div>
          <div className="space-y-4" role="img" aria-label={business.schedule.map((b) => `${b.label}: ${formatClock(b.openMinute)} a ${formatClock(b.closeMinute)}`).join(". ")}>
            {business.schedule.map((block) => {
              const left = ((block.openMinute - AXIS_START) / (AXIS_END - AXIS_START)) * 100;
              const width = ((block.closeMinute - block.openMinute) / (AXIS_END - AXIS_START)) * 100;
              return (
                <div key={block.label}>
                  <div className="mb-1.5 flex justify-between gap-3 text-sm">
                    <span className="text-tiza-suave">{block.label}</span>
                    <span className="tabular font-semibold">
                      {formatClock(block.openMinute)} – {formatClock(block.closeMinute)}
                    </span>
                  </div>
                  <div className="relative h-3 rounded-full bg-caucho">
                    <div
                      className="absolute inset-y-0 rounded-full bg-lima"
                      style={{ left: `${left}%`, width: `${width}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </article>
    </div>
  );
}
