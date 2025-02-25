import {z} from 'zod';
export const signupSchema = z.object({
  fullname: z
    .string({required_error: 'Full name is required'})
    .min(3, {message: 'Full name length should be abouve 3'}),
  email: z
    .string({required_error: 'Email is required'})
    .email({message: 'Email is invalid'}),
  password: z
    .string({required_error: 'Password is required'})
    .min(6, {message: 'Password must be aleast 6'}),
  acceptTC: z
    .boolean({required_error: 'Accept terms & condition must be checked'})
    .refine(val => !!val, {
      message: 'Accept terms & condition must be checked',
    }),
});

export type SignupSchemaType = z.infer<typeof signupSchema>;
