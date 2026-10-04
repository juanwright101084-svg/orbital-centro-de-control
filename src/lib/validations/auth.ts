import { z } from "zod";

const passwordRule = z
  .string()
  .min(8, "Mínimo 8 caracteres")
  .regex(/[A-Z]/, "Debe incluir una mayúscula")
  .regex(/[0-9]/, "Debe incluir un número");

export const registerSchema = z
  .object({
    email: z.string().email("Correo inválido"),
    password: passwordRule,
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z.string().email("Correo inválido"),
  password: z.string().min(1, "La contraseña es obligatoria"),
});

export const forgotSchema = z.object({
  email: z.string().email("Correo inválido"),
});

export const resetSchema = z
  .object({
    password: passwordRule,
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });
