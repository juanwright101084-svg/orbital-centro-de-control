"use client";
import { useFormStatus } from "react-dom";
import type { ReactNode } from "react";

export function SubmitButton({ children }: { children: ReactNode }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-white px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-black hover:bg-white/85 disabled:opacity-50"
    >
      {pending ? "Procesando..." : children}
    </button>
  );
}
