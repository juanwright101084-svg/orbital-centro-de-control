"use client";
import { useActionState } from "react";
import { resetPassword, type ActionState } from "@/lib/actions/auth";
import { SubmitButton } from "@/components/SubmitButton";

const initial: ActionState = {};

export default function ResetPasswordPage() {
  const [state, action] = useActionState(resetPassword, initial);

  return (
    <main className="mx-auto max-w-sm p-6">
      <h1 className="mb-4 text-2xl font-bold">Nueva contraseña</h1>
      <form action={action} className="space-y-3" noValidate>
        <div>
          <input
            name="password"
            type="password"
            placeholder="Nueva contraseña"
            required
            autoComplete="new-password"
            className="w-full rounded border p-2"
          />
          {state.fieldErrors?.password && (
            <p className="text-sm text-red-600">{state.fieldErrors.password[0]}</p>
          )}
        </div>
        <div>
          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirmar contraseña"
            required
            autoComplete="new-password"
            className="w-full rounded border p-2"
          />
          {state.fieldErrors?.confirmPassword && (
            <p className="text-sm text-red-600">
              {state.fieldErrors.confirmPassword[0]}
            </p>
          )}
        </div>
        {state.error && (
          <p role="alert" className="text-sm text-red-600">
            {state.error}
          </p>
        )}
        <SubmitButton>Actualizar contraseña</SubmitButton>
      </form>
    </main>
  );
}
