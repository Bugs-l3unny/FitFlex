import { business } from "@/config/business";
import { buildWhatsappLink, formatCOP } from "@/lib/format";

const link = (message: string) => buildWhatsappLink(`Hola, equipo de ${business.name}. ${message}`);

export function Pricing() {
  const { prices, friendFreeDays } = business;

  return (
    <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
      <div className="divide-y divide-linea overflow-hidden rounded-[1.5rem] border border-linea bg-lona">
        <article className="flex flex-col gap-5 bg-caucho p-6 outline outline-2 -outline-offset-2 outline-lima sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div className="max-w-[36ch]">
            <h3 className="display text-2xl sm:text-3xl">Membresía mensual</h3>
            <p className="mt-2 text-tiza-suave">
              Acceso los 7 días, valoración inicial y rutina a tu medida. Desde 2 días por semana ya te sale más barata
              que los pases diarios.
            </p>
          </div>
          <div className="flex flex-col gap-4 sm:items-end">
            <p className="num text-4xl text-lima sm:text-5xl">
              {formatCOP(prices.monthly)}
              <span className="ml-1 text-base font-semibold text-tiza-suave normal-width">
                /mes
              </span>
            </p>
            <a
              href={link("Quiero inscribirme en la membresía mensual.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              Quiero la membresía
            </a>
          </div>
        </article>

        <article className="flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div className="max-w-[36ch]">
            <h3 className="display text-xl sm:text-2xl">Pase diario</h3>
            <p className="mt-2 text-tiza-suave">Entrena un día sin compromiso. Ideal para conocer el gimnasio.</p>
          </div>
          <div className="flex flex-col gap-4 sm:items-end">
            <p className="num text-3xl sm:text-4xl">
              {formatCOP(prices.daily)}
              <span className="ml-1 text-base font-semibold text-tiza-suave normal-width">
                /día
              </span>
            </p>
            <a
              href={link("Quiero un pase diario.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost"
            >
              Quiero un pase diario
            </a>
          </div>
        </article>
      </div>

      <div className="grid gap-4 self-start">
        <article className="rounded-[1.25rem] border-2 border-morado bg-[color-mix(in_oklab,var(--morado)_14%,var(--lona))] p-6">
          <h3 className="display text-xl">Convenio universitario</h3>
          <p className="num mt-3 text-4xl">
            {formatCOP(prices.universityMonthly)}
            <span className="ml-1 text-base font-semibold text-tiza-suave normal-width">
              /mes
            </span>
          </p>
          <p className="mt-2 text-tiza-suave">
            {prices.universityDiscountPercent} % de descuento en la membresía mensual presentando tu carnet universitario.
          </p>
          <a
            href={link("Tengo carnet universitario y quiero el convenio.")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost mt-5 !border-morado hover:!bg-morado/20"
          >
            Quiero el convenio
          </a>
        </article>

        <article className="rounded-[1.25rem] border-2 border-dashed border-morado p-6">
          <h3 className="display text-xl">Plus Amigo</h3>
          <p className="mt-2 text-tiza-suave">
            Si eres miembro activo, invita a un amigo gratis durante {friendFreeDays} días.
          </p>
        </article>
      </div>
    </div>
  );
}
