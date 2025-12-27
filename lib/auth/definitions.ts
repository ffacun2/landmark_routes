import { z } from 'zod';

export const LoginSchema = z.object({
  email: z.string().email({ message: "Email inválido" }).trim(),
  password: z.string().min(1, { message: "La contraseña es requerida" }),
});

export const RegisterSchema = z.object({
  name: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres" }).trim(),
  email: z.string().email({ message: "Email inválido" }).trim(),
  password: z.string().min(8, { message: "Mínimo 8 caracteres" }).trim(),
});

export type LoginFormValues = z.infer<typeof LoginSchema>;
export type RegisterFormValues = z.infer<typeof RegisterSchema>;

export interface User {
  id?: string;
  name?: string;
  email?: string;
  password?:string;
}