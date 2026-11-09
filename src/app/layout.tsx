import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Archivo variable (wght 100-900, wdth 62-125), self-hosted so the build works offline.
const archivo = localFont({
  src: "./fonts/archivo-variable.woff2",
  weight: "100 900",
  style: "normal",
  variable: "--font-archivo",
  display: "swap",
});

const title = "FitFlex — Gimnasio en Cali de bajo costo";
const description =
  "Gimnasio en Cali con membresía desde $55.000 al mes, abierto los 7 días, valoración inicial y rutina a tu medida incluida. Calcula tu ahorro y haz tu test de rutina gratis.";

export const metadata: Metadata = {
  title,
  description,
  keywords: ["gimnasio en Cali", "gimnasio económico", "membresía gimnasio Cali", "FitFlex"],
  openGraph: {
    title,
    description,
    type: "website",
    locale: "es_CO",
    siteName: "FitFlex",
  },
  twitter: { card: "summary", title, description },
};

export const viewport: Viewport = {
  themeColor: "#101814",
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-CO" className={archivo.variable}>
      <body>{children}</body>
    </html>
  );
}
