"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import {
  registerSchema,
  loginSchema,
  forgotSchema,
  resetSchema,
} from "@/lib/validations/auth";

export type ActionState = {
  error?: string;
  fieldErrors?: Record<string, string[] | undefined>;
  success?: string;
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL!;

export async function register(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const parsed = registerSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { fieldErrors: parsed.error.flatten().fieldErrors };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
    options: { emailRedirectTo: `${SITE_URL}/auth/callback` },
  });

  if (error) {
    // 🔧 TEMPORAL: mostrar error real de Supabase para debug
    return { error: `Error: ${error.message}` };
  }

  return { success: "Revisa tu correo para confirmar tu cuenta." };
}

export async function login(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const parsed = loginSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { fieldErrors: parsed.error.flatten().fieldErrors };
  }

  // 🔧 DEBUG TEMPORAL
  console.log("🔍 LOGIN ACTION DEBUG:");
  console.log("  Email:", parsed.data.email);
  console.log("  Password length:", parsed.data.password.length);

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword(parsed.data);

  // 🔧 DEBUG TEMPORAL
  console.log("  Supabase error message:", error?.message);
  console.log("  Supabase error status:", error?.status);
  console.log("  Supabase error code:", error?.code);
  console.log("  User ID (si funciona):", data?.user?.id);
  console.log(
    "  Session (si funciona):",
    data?.session ? "✅ Creada" : "❌ Nula"
  );

  if (error) {
    return { error: "Correo o contraseña incorrectos." };
  }

  revalidatePath("/", "layout");
  redirect("/dashboard");
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/login");
}

export async function forgotPassword(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const parsed = forgotSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { fieldErrors: parsed.error.flatten().fieldErrors };
  }

  const supabase = await createClient();
  await supabase.auth.resetPasswordForEmail(parsed.data.email, {
    redirectTo: `${SITE_URL}/auth/callback?next=/auth/reset-password`,
  });

  // Siempre la misma respuesta, exista o no el correo
  return {
    success:
      "Si el correo existe, recibirás un enlace para restablecer tu contraseña.",
  };
}

export async function resetPassword(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const parsed = resetSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { fieldErrors: parsed.error.flatten().fieldErrors };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({
    password: parsed.data.password,
  });

  // ✅ Mostrar el error real de Supabase
  if (error) return { error: error.message };

  // ✅ Devolver mensaje de éxito
  return { success: "Contraseña actualizada correctamente." };
}