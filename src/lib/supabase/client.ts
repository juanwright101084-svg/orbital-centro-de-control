import { createBrowserClient } from "@supabase/ssr";

// Solo para datos no sensibles. Como las cookies de sesión son httpOnly,
// este cliente no ve la sesión: toda la autenticación va por Server Actions.
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
