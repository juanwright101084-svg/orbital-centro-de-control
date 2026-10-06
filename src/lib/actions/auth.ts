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
    console.error("signUp error:", {
      status: error.status,
      code: error.code,
      message: error.message,
    });

    if (error.code === "over_email_send_rate_limit") {
      return {
        error: "Se enviaron demasiados correos. Espera unos minutos.",
      };
    }

    if (error.code === "weak_password") {
      return { error: "La contraseña es demasiado débil." };
    }

    if (error.message.toLowerCase().includes("sending confirmation email")) {
      return {
        error:
          "No pudimos enviar el correo de confirmación. Intenta más tarde.",
      };
    }

    return { error: "No se pudo completar el registro. Intenta de nuevo." };
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

  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword(parsed.data);

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

  redirect("/");
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

  if (error) {
    console.error("updateUser error:", {
      status: error.status,
      code: error.code,
      message: error.message,
    });

    if (error.code === "same_password") {
      return {
        error: "La nueva contraseña debe ser distinta de la anterior.",
      };
    }

    if (error.code === "weak_password") {
      return { error: "La contraseña es demasiado débil." };
    }

    return {
      error: "No se pudo actualizar la contraseña. Intenta de nuevo.",
    };
  }

  return { success: "Contraseña actualizada correctamente." };
}