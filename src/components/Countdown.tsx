"use client";
import { useEffect, useState } from "react";

const pad = (n: number) => String(n).padStart(2, "0");

export function Countdown({ target }: { target: string }) {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setNow(Date.now());
    const first = setTimeout(tick, 0);
    const id = setInterval(tick, 1000);
    return () => {
      clearTimeout(first);
      clearInterval(id);
    };
  }, []);

  const diff =
    now === null ? null : Math.max(0, new Date(target).getTime() - now);

  const parts =
    diff === null
      ? ["--", "--", "--", "--"]
      : [
          String(Math.floor(diff / 86_400_000)),
          pad(Math.floor((diff % 86_400_000) / 3_600_000)),
          pad(Math.floor((diff % 3_600_000) / 60_000)),
          pad(Math.floor((diff % 60_000) / 1000)),
        ];
  const labels = ["Días", "Horas", "Min", "Seg"];

  return (
    <div
      role="timer"
      aria-label="Cuenta regresiva para la próxima misión"
      className="flex gap-4 sm:gap-8"
    >
      {parts.map((value, i) => (
        <div key={labels[i]}>
          <div className="text-5xl font-light tabular-nums sm:text-7xl lg:text-8xl">
            {value}
          </div>
          <div className="mt-2 text-xs uppercase tracking-[0.25em] text-white/50">
            {labels[i]}
          </div>
        </div>
      ))}
    </div>
  );
}
