"use client";
import { useActionState } from "react";
import { resetPassword, type ActionState } from "@/lib/actions/auth";
import { SubmitButton } from "@/components/SubmitButton";
import { AuthField } from "@/components/AuthField";

const initial: ActionState = {};

export function ChangePasswordForm() {
  const [state, action] = useActionState(resetPassword, initial);

  return (
    <form action={action} className="space-y-5" noValidate>
      <AuthField
        name="password"
        label="Nueva contraseña"
        type="password"
        autoComplete="new-password"
        required
        hint="Mínimo 8 caracteres, una mayúscula y un número."
        error={state.fieldErrors?.password?.[0]}
      />
      <AuthField
        name="confirmPassword"
        label="Confirmar contraseña"
        type="password"
        autoComplete="new-password"
        required
        error={state.fieldErrors?.confirmPassword?.[0]}
      />

      {state.error && (
        <p
          role="alert"
          className="border-l-2 border-red-500 bg-red-500/10 px-3 py-2 text-sm text-red-200"
        >
          {state.error}
        </p>
      )}
      {state.success && (
        <p
          role="status"
          className="border-l-2 border-emerald-400 bg-emerald-400/10 px-3 py-2 text-sm text-emerald-200"
        >
          {state.success}
        </p>
      )}

      <SubmitButton>Actualizar contraseña</SubmitButton>
    </form>
  );
}
