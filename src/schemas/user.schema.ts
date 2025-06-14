import { z } from 'zod';

export const UserSchema = z.object({
  name: z.string()
    .min(2, { message: 'Nome deve ter pelo menos 2 caracteres' })
    .max(100, { message: 'Nome deve ter no máximo 100 caracteres' })
    .trim(),
  email: z.string()
    .email({ message: 'Email inválido' })
    .toLowerCase()
    .trim(),
  password: z.string()
    .min(8, { message: 'Senha deve ter pelo menos 8 caracteres' })
    .regex(/[A-Z]/, { message: 'Senha deve conter pelo menos uma letra maiúscula' })
    .regex(/[0-9]/, { message: 'Senha deve conter pelo menos um número' })
    .regex(/[^A-Za-z0-9]/, { message: 'Senha deve conter pelo menos um caractere especial' })
});

export const LoginSchema = z.object({
  email: z.string()
    .email({ message: 'Email inválido' })
    .toLowerCase()
    .trim(),
  password: z.string()
    .min(1, { message: 'Senha é obrigatória' })
});

export type UserInput = z.infer<typeof UserSchema>;
export type LoginInput = z.infer<typeof LoginSchema>;