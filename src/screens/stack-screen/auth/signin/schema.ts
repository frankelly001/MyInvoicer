import {z} from 'zod';
export const signinSchema = z.object({
  email: z
    .string({required_error: 'Email is required'})
    .email({message: 'Email is invalid'}),
  password: z
    .string({required_error: 'Password is required'})
    .min(6, {message: 'Password must be aleast 6'}),
});

export type SigninSchemaType = z.infer<typeof signinSchema>;
