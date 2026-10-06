import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ChangePasswordForm } from "@/components/ChangePasswordForm";

export const metadata: Metadata = { title: "Configuración" };

export default async function SettingsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login"); // defensa en profundidad

  return (
    <main className="relative w-full flex-1 px-5 pb-16 pt-28 sm:px-10 lg:px-24">
      <div
        aria-hidden
        className="stars pointer-events-none absolute inset-x-0 top-0 h-[60vh] opacity-60"
      />

      <div className="relative z-10 mx-auto max-w-2xl">
        <header className="flex flex-wrap items-end justify-between gap-4 border-b border-white/20 pb-6">
          <div className="min-w-0">
            <p className="text-sm text-white/60">Configuración</p>
            <h1 className="mt-1 text-3xl font-light uppercase tracking-[0.18em] sm:text-4xl">
              Cuenta
            </h1>
          </div>
          <Link
            href="/dashboard"
            className="text-sm text-white/60 hover:text-white"
          >
            ← Volver al dashboard
          </Link>
        </header>

        <section className="max-w-sm py-10">
          <h2 className="mb-6 text-sm uppercase tracking-[0.25em] text-white/60">
            Cambiar contraseña
          </h2>
          <ChangePasswordForm />
        </section>
      </div>
    </main>
  );
}
