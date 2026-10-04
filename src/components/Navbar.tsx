import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { logout } from "@/lib/actions/auth";

const linkClass =
  "text-xs uppercase tracking-[0.25em] text-white/80 hover:text-white";

export async function Navbar() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <nav className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-5 py-5 sm:px-10">
      <Link
        href="/"
        className="text-lg font-semibold uppercase tracking-[0.4em]"
      >
        Orbital
      </Link>

      {user ? (
        <div className="flex items-center gap-4 sm:gap-6">
          <Link href="/dashboard" className={linkClass}>
            Dashboard
          </Link>
          <form action={logout}>
            <button
              type="submit"
              className="border border-white/60 px-4 py-2 text-xs uppercase tracking-[0.25em] hover:bg-white hover:text-black"
            >
              Cerrar sesión
            </button>
          </form>
        </div>
      ) : (
        <div className="flex items-center gap-4 sm:gap-6">
          <Link href="/login" className={linkClass}>
            Entrar
          </Link>
          <Link
            href="/register"
            className="border border-white/60 px-4 py-2 text-xs uppercase tracking-[0.25em] hover:bg-white hover:text-black"
          >
            Registrarse
          </Link>
        </div>
      )}
    </nav>
  );
}
