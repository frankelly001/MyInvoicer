import {z} from 'zod';
export const forgetPasswordSchema = z.object({
  email: z.string().email({message: 'Email is invalid'}),
});

export type forgotPasswordSchemaType = z.infer<typeof forgetPasswordSchema>;
