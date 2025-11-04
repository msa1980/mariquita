import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email({ message: 'Por favor, insira um email válido.' }),
  password: z.string().min(6, { message: 'A senha deve ter pelo menos 6 caracteres.' }),
});

export const registerSchema = z.object({
  fullName: z.string().min(3, { message: 'O nome completo é obrigatório.' }),
  email: z.string().email({ message: 'Por favor, insira um email válido.' }),
  password: z.string().min(6, { message: 'A senha deve ter pelo menos 6 caracteres.' }),
  confirmPassword: z.string(),
  cep: z.string().regex(/^\d{5}-\d{3}$/, { message: 'CEP inválido.' }),
  street: z.string().min(1, { message: 'A rua é obrigatória.' }),
  number: z.string().min(1, { message: 'O número é obrigatório.' }),
  complement: z.string().optional(),
  neighborhood: z.string().min(1, { message: 'O bairro é obrigatório.' }),
  city: z.string().min(1, { message: 'A cidade é obrigatória.' }),
  state: z.string().min(1, { message: 'O estado é obrigatório.' }),
}).refine(data => data.password === data.confirmPassword, {
  message: 'As senhas não coincidem.',
  path: ['confirmPassword'],
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
