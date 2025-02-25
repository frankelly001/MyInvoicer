import {z} from 'zod';
import CustomRegex from '../../../../utils/constants/customRegex';
import {
  emailValidation,
  phoneNumberValidation,
  stringValidation,
} from '../../../../utils/schema';
export const businessInfoRegSchema = z.object({
  logoUrl: z.object(
    {
      path: z.string().min(1, {message: 'logoUrl path is missing'}),
      mime: z.string().min(1, {message: 'logoUrl mime mime is missing'}),
      name: z.string().min(1, {message: 'logoUrl name is missing'}),
    },
    {required_error: 'Business logo is required'},
  ),
  email: emailValidation,
  phone: phoneNumberValidation,
  businessName: stringValidation({label: 'Business name'}).min(3, {
    message: 'Business name length should be abouve 3',
  }),
  address: z
    .string({required_error: 'Business name is required'})
    .min(3, {message: 'Full name length should be abouve 3'}),
  website: z.optional(
    stringValidation({label: 'Website url'}).regex(
      CustomRegex.website,
      'Website url is invalid',
    ),
  ),
  currency: stringValidation({label: 'Currency'}).min(1),
  bankActNum: stringValidation({label: 'Bank account number'}).min(3, {
    message: 'Bank account number length should be abouve 3',
  }),
  bankActName: stringValidation({label: 'Bank account name'}).min(3, {
    message: 'Bank account name should be abouve 3',
  }),
  bankName: stringValidation({label: 'Bank name'}).min(3, {
    message: 'Bank name should be abouve 3',
  }),
});

export type BusinessInfoRegSchemaType = z.infer<typeof businessInfoRegSchema>;
