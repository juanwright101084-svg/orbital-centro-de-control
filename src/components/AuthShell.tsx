import type { ReactNode } from "react";
import { SpaceBackdrop } from "./SpaceBackdrop";

type Props = {
  title: string;
  description: string;
  children: ReactNode;
  footer?: ReactNode;
};

export function AuthShell({ title, description, children, footer }: Props) {
  return (
    <main className="relative flex min-h-screen w-full flex-1 items-center justify-center px-5 pb-16 pt-28 lg:justify-start lg:px-24">
      <SpaceBackdrop />
      <section className="relative z-10 w-full max-w-sm">
        <h1 className="text-3xl font-light uppercase tracking-[0.18em] sm:text-4xl">
          {title}
        </h1>
        <p className="mt-3 text-sm text-white/60">{description}</p>
        <div className="mt-8">{children}</div>
        {footer && (
          <div className="mt-8 space-y-2 border-t border-white/20 pt-5 text-sm text-white/60">
            {footer}
          </div>
        )}
      </section>
    </main>
  );
}
