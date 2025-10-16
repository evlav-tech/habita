import { z } from 'zod';

export const FormDataSchema = z.object({
  name: z.string()
    .min(1, 'Nome é obrigatório')
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(255, 'Nome muito longo')
    .trim(),
  
  email: z.string()
    .email('Email inválido')
    .max(255, 'Email muito longo')
    .trim()
    .optional()
    .or(z.literal('')),
  
  whatsapp: z.string()
    .min(1, 'WhatsApp é obrigatório')
    .regex(/^\(\d{2}\)\s\d{4,5}-\d{4}$|^\d{10,11}$/, 'Formato de WhatsApp inválido')
    .max(20, 'WhatsApp muito longo')
    .trim(),
  
  perfil: z.string()
    .min(1, 'Perfil é obrigatório')
    .max(50, 'Perfil muito longo')
    .trim(),
  
  acceptedTerm: z.boolean()
    .refine((val) => val === true, {
      message: 'Você deve aceitar os termos'
    })
});

export type FormData = z.infer<typeof FormDataSchema>;