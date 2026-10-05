"use client";

import { useActionState } from "react";
import Link from "next/link";
import { resetPassword, type ActionState } from "@/lib/actions/auth";
import { SubmitButton } from "@/components/SubmitButton";

const initial: ActionState = {};

export default function SettingsPage() {
  const [state, action] = useActionState(resetPassword, initial);

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
            className="text-sm text-white/60 hover:text-white transition"
          >
            ← Volver al dashboard
          </Link>
        </header>

        <section className="py-10">
          <h2 className="text-sm uppercase tracking-[0.25em] text-white/60 mb-6">
            Cambiar contraseña
          </h2>

          <form action={action} className="space-y-4" noValidate>
            <div>
              <label className="mb-2 block text-sm text-white/70">
                Nueva contraseña
              </label>
              <input
                type="password"
                name="password"
                required
                minLength={6}
                autoComplete="new-password"
                className="w-full rounded border border-white/20 bg-black/50 p-3 text-white placeholder-gray-400 backdrop-blur-md focus:border-blue-500 focus:outline-none transition"
              />
              {state.fieldErrors?.password && (
                <p className="mt-1 text-sm text-red-400">
                  {state.fieldErrors.password[0]}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm text-white/70">
                Confirmar contraseña
              </label>
              <input
                type="password"
                name="confirmPassword"
                required
                minLength={6}
                autoComplete="new-password"
                className="w-full rounded border border-white/20 bg-black/50 p-3 text-white placeholder-gray-400 backdrop-blur-md focus:border-blue-500 focus:outline-none transition"
              />
              {state.fieldErrors?.confirmPassword && (
                <p className="mt-1 text-sm text-red-400">
                  {state.fieldErrors.confirmPassword[0]}
                </p>
              )}
            </div>

            {state.error && (
              <p role="alert" className="text-sm text-red-400">
                {state.error}
              </p>
            )}
            {state.success && (
              <p role="status" className="text-sm text-green-400">
                ✅ {state.success}
              </p>
            )}

            <SubmitButton>Actualizar contraseña</SubmitButton>
          </form>
        </section>
      </div>
    </main>
  );
}