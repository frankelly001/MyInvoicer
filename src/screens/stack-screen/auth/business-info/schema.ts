import {z} from 'zod';
import CustomRegex from '../../../../utils/constants/customRegex';
import {imageFileValidation} from '../../../../utils/schema';
export const businessInfoRegSchema = z.object({
  logoUrl: imageFileValidation({label: 'Business logo'}),
  businessName: z
    .string({required_error: 'Business name is required'})
    .min(3, {message: 'Full name length should be abouve 3'}),
  phone: z
    .string({required_error: 'Phone number is required'})
    .min(11, 'Phone number should be at least 11 characters long')
    .regex(CustomRegex.number, 'Please enter a valid phone number'),
  address: z
    .string({required_error: 'Business name is required'})
    .min(3, {message: 'Full name length should be abouve 3'}),
  website: z.optional(
    z
      .string({required_error: 'Website url is required'})
      .regex(CustomRegex.website, 'Website url is invalid'),
  ),
});

export type BusinessInfoRegSchemaType = z.infer<typeof businessInfoRegSchema>;
