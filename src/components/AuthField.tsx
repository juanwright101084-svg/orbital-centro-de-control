import type { InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label: string;
  error?: string;
  hint?: string;
};

export function AuthField({ name, label, error, hint, ...props }: Props) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-xs uppercase tracking-[0.25em] text-white/60"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        aria-invalid={error ? true : undefined}
        {...props}
        className="w-full border border-white/30 bg-transparent px-4 py-3 text-base text-white placeholder:text-white/30 focus:border-white focus:outline-none"
      />
      {hint && !error && <p className="mt-1 text-xs text-white/40">{hint}</p>}
      {error && <p className="mt-1 text-sm text-red-300">{error}</p>}
    </div>
  );
}
