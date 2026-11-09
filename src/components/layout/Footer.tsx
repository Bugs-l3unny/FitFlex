import { business } from "@/config/business";
import { formatClock } from "@/features/schedule/schedule";
import { buildWhatsappLink } from "@/lib/format";
import { PlateMark } from "./Logo";

export function Footer() {
  const whatsappHref = buildWhatsappLink(
    `Hola, equipo de ${business.name}. Quiero más información sobre el gimnasio.`,
  );
  const { address, city } = business.location;

  return (
    <footer className="border-t border-linea bg-lona pb-10 pt-16">
      <div className="wrap grid gap-12 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <p className="flex items-center gap-3">
            <PlateMark className="h-8 w-8" />
            <span className="display text-2xl leading-none">{business.name}</span>
          </p>
          <p className="mt-4 text-tiza-suave">{business.tagline}</p>
          <p className="prose-fit mt-6 text-sm text-tiza-suave">
            Gimnasio de bajo costo en Cali, alineado con el ODS 3: Salud y Bienestar.
          </p>
        </div>

        <div>
          <h2 className="display text-lg">Horarios</h2>
          <dl className="mt-4 space-y-3">
            {business.schedule.map((block) => (
              <div key={block.label}>
                <dt className="text-tiza-suave">{block.label}</dt>
                <dd className="tabular font-semibold">
                  {formatClock(block.openMinute)} a {formatClock(block.closeMinute)}
                </dd>
              </div>
            ))}
          </dl>
          <h2 className="display mt-8 text-lg">Ubicación</h2>
          <p className="mt-3">{city}</p>
          {address ? <p className="text-tiza-suave">{address}</p> : null}
        </div>

        <div>
          <h2 className="display text-lg">Escríbenos</h2>
          <ul className="mt-4 flex flex-wrap gap-3">
            <li>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary !min-h-11 !px-5 !py-2"
              >
                WhatsApp
              </a>
            </li>
            {business.socials.map((social) => (
              <li key={social.id}>
                <a
                  href={social.url || social.fallbackUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost !min-h-11 !px-5 !py-2"
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p className="wrap mt-14 text-sm text-tiza-suave">
        © {business.name}. Todos los derechos reservados.
      </p>
    </footer>
  );
}
