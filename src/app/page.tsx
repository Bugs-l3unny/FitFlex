import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { Section, SectionHeading } from "@/components/layout/Section";
import { business } from "@/config/business";
import { formatCOP } from "@/lib/format";
import { Pricing } from "@/features/pricing/Pricing";
import { RoutineWizard } from "@/features/routine-test/RoutineWizard";
import { SavingsCalculator } from "@/features/savings-calculator/SavingsCalculator";
import { LiveStatus } from "@/features/schedule/LiveStatus";
import { Showcase } from "@/features/shop/Showcase";
import { ValueBento } from "@/features/value-proposition/ValueBento";

const EXCUSES = [
  { question: "¿Es muy costoso?", answer: `${formatCOP(business.prices.monthly)} al mes` },
  { question: "¿No tienes tiempo?", answer: "Abierto los 7 días" },
  { question: "¿No sabes cómo empezar?", answer: "Rutina a tu medida incluida" },
] as const;

export default function Home() {
  return (
    <>
      <a
        href="#contenido"
        className="sr-only-focusable fixed left-4 top-4 z-[70] rounded-full bg-lima px-4 py-2 font-bold text-caucho"
      >
        Saltar al contenido
      </a>
      <Navbar />
      <main id="contenido">
        <section id="inicio" aria-labelledby="hero-titulo" className="hero relative -mt-16 pb-10 pt-28 md:pb-12 md:pt-32">
          <div className="wrap">
            <div>
              <p className="inline-block rounded-full border border-linea bg-lona px-4 py-2 text-sm">
                Cali • Alineados con el ODS 3: Salud y Bienestar
              </p>
              <h1 id="hero-titulo" className="display text-wrap mt-7 space-y-5 md:space-y-6 text-[clamp(2.1rem,6vw,4.75rem)]">
                {EXCUSES.map((item, index) => (
                  <span key={item.question} className="block" style={{ "--i": index } as React.CSSProperties}>
                    <span className="excuse-q">{item.question}</span>
                    <span
                      className="excuse-a mt-2 block text-[clamp(1.15rem,2.6vw,1.9rem)] text-tiza"
                    >
                      {item.answer}
                      <span className="sr-only">.</span>
                    </span>
                  </span>
                ))}
              </h1>
              <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-12">
                <div>
                  <p className="prose-fit text-lg text-tiza-suave">
                    Gimnasio de bajo costo en Cali con horarios flexibles y acompañamiento personalizado incluido.
                  </p>
                  <div className="mt-6 flex flex-col gap-3 whitespace-nowrap sm:flex-row">
                    <a href="#test" className="btn btn-primary">
                      Hacer mi test gratis
                    </a>
                    <a href="#calculadora" className="btn btn-ghost">
                      Calcular mi ahorro
                    </a>
                  </div>
                </div>
                <LiveStatus />
              </div>
            </div>
          </div>
        </section>

        <Section id="calculadora" labelledBy="calculadora-titulo">
          <SectionHeading id="calculadora-titulo" title="Calcula cuánto ahorras al mes">
            Mueve la barra con los días que planeas entrenar y compara en tiempo real el pase diario con la membresía.
          </SectionHeading>
          <SavingsCalculator />
        </Section>

        <Section id="propuesta" labelledBy="propuesta-titulo" className="bg-lona/40">
          <SectionHeading id="propuesta-titulo" title="Todo lo que necesitas para empezar">
            Entrenamiento acompañado, precio claro y un horario que se ajusta al tuyo.
          </SectionHeading>
          <ValueBento />
        </Section>

        <Section id="test" labelledBy="test-titulo">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.35fr] lg:gap-14">
            <SectionHeading id="test-titulo" title="Tu rutina en 1 minuto">
              Responde 4 preguntas y recibe un diagnóstico preliminar con el enfoque y el plan que te conviene. Si
              quieres, lo envías a tu entrenador por WhatsApp.
            </SectionHeading>
            <RoutineWizard />
          </div>
        </Section>

        <Section id="convenios" labelledBy="convenios-titulo" className="bg-lona/40">
          <SectionHeading id="convenios-titulo" title="Planes y convenios">
            Precios en pesos colombianos. Elige según cuántos días entrenas.
          </SectionHeading>
          <Pricing />
        </Section>

        <section id="productos" aria-labelledby="productos-titulo" className="shop-backdrop relative py-20 md:py-28">
          {/* Decorative photo, tinted green with a blend layer. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/hydration.jpg"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 -z-10 h-full w-full object-cover"
            loading="lazy"
          />
          <div className="shop-tint absolute inset-0 -z-10" aria-hidden="true" />
          <div className="shop-scrim absolute inset-0 -z-10" aria-hidden="true" />
          <div className="wrap">
            <SectionHeading id="productos-titulo" title="Recarga energía antes y después de entrenar">
              Hidratación y suplementación básica. Arma tu pedido y recógelo hoy en recepción.
            </SectionHeading>
            <Showcase />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
