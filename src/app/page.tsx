import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { SpaceBackdrop } from "@/components/SpaceBackdrop";

const facts = [
  "Sesión en cookies httpOnly, secure y sameSite",
  "Validación de datos en el servidor con Zod",
  "Rutas privadas protegidas por el proxy de Next.js",
];

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <main className="relative flex min-h-screen w-full flex-1 flex-col justify-center px-5 pb-48 pt-28 sm:px-10 sm:pb-40 lg:px-24">
      <SpaceBackdrop />

      <div className="relative z-10 max-w-3xl">
        <h1 className="text-5xl font-light uppercase leading-[1.05] tracking-[0.12em] sm:text-7xl">
          Centro
          <br />
          de control
        </h1>

        <p className="mt-6 max-w-md text-lg text-white/70">
          Inicia sesión para ver el estado de las misiones y la telemetría en
          tiempo real.
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          {user ? (
            <Link
              href="/dashboard"
              className="bg-white px-7 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-black hover:bg-white/85"
            >
              Ir al dashboard
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className="border border-white/60 bg-black px-7 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white hover:bg-white hover:text-black"
              >
                Iniciar sesión
              </Link>

              <Link
                href="/register"
                className="border border-white/60 px-7 py-3 text-xs uppercase tracking-[0.3em] hover:bg-white hover:text-black"
              >
                Crear cuenta
              </Link>
            </>
          )}
        </div>
      </div>

      <ul className="absolute inset-x-0 bottom-0 z-10 grid border-t border-white/20 text-sm text-white/70 sm:grid-cols-3">
        {facts.map((fact) => (
          <li
            key={fact}
            className="border-b border-white/10 px-5 py-4 last:border-b-0 sm:border-b-0 sm:border-l sm:px-8 sm:py-6 sm:first:border-l-0"
          >
            {fact}
          </li>
        ))}
      </ul>
    </main>
  );
}