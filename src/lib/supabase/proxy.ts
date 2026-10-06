import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const PUBLIC_AUTH_ROUTES = ["/login", "/register", "/forgot-password"];

// Redirige conservando las cookies de sesión refrescadas en la respuesta
function redirectTo(
  request: NextRequest,
  pathname: string,
  session: NextResponse
) {
  const url = request.nextUrl.clone();
  url.pathname = pathname;

  const redirect = NextResponse.redirect(url);
  session.cookies.getAll().forEach((cookie) => redirect.cookies.set(cookie));
  return redirect;
}

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, {
              ...options,
              httpOnly: true,
              secure: process.env.NODE_ENV === "production",
              sameSite: "lax",
              path: "/",
            })
          );
        },
      },
    }
  );

  // IMPORTANTE: getUser() valida el token contra Supabase.
  // No uses getSession() para proteger rutas en el servidor.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;
  const isProtected = pathname.startsWith("/dashboard");
  const isAuthRoute = PUBLIC_AUTH_ROUTES.includes(pathname);

  if (!user && isProtected) {
    return redirectTo(request, "/login", response);
  }

  if (user && isAuthRoute) {
    return redirectTo(request, "/dashboard", response);
  }

  return response;
}