import type { Metadata } from "next";
import { Barlow } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    default: "Orbital | Centro de control",
    template: "%s | Orbital",
  },
  description:
    "Acceso seguro al centro de control: cookies httpOnly, Server Actions y rutas protegidas con Next.js y Supabase.",
  openGraph: {
    title: "Orbital | Centro de control",
    description:
      "Registro, login y recuperación de contraseña con cookies httpOnly.",
    type: "website",
    locale: "es_SV",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${barlow.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-black font-sans text-white">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
