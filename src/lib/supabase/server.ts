import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = await cookies();

  // 🔧 DEBUG TEMPORAL: verificar que las variables estén cargando bien
  console.log("🔍 SUPABASE SERVER CLIENT DEBUG:");
  console.log("  NODE_ENV:", process.env.NODE_ENV);
  console.log("  SUPABASE_URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
  console.log(
    "  ANON_KEY prefix:",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.slice(0, 25) + "..."
  );
  console.log(
    "  ANON_KEY length:",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.length
  );
  console.log("  SITE_URL:", process.env.NEXT_PUBLIC_SITE_URL);

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              // 🔧 DEBUG TEMPORAL: ver qué cookies se están guardando
              console.log(`  🍪 Setting cookie: ${name}`);
              console.log(`     - Value length: ${value.length}`);
              console.log(`     - Options:`, options);

              cookieStore.set(name, value, {
                ...options,
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                path: "/",
              });
            });
          } catch (err) {
            // Se ignora en Server Components (solo lectura);
            // el proxy se encarga de refrescar la sesión.
            console.log("  ⚠️ Cookie set failed:", err);
          }
        },
      },
    }
  );
}