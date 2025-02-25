import {z} from 'zod';
import CustomRegex from '../../../../utils/constants/customRegex';
import {
  emailValidation,
  fullNameValidation,
  numberValidation,
  phoneNumberValidation,
  stringValidation,
} from '../../../../utils/schema';

export const createCustomerSchema = z.object({
  fullName: fullNameValidation({label: 'Fullname'}).min(3, {
    message: 'Full name length should be abouve 3',
  }),
  phone: phoneNumberValidation,
  email: emailValidation,
  address: stringValidation({label: 'Address'}).min(3, {
    message: 'Address length should be abouve 3',
  }),
  businessName: stringValidation({label: 'Business name'}).min(3, {
    message: 'Business name length should be abouve 3',
  }),
  website: z.optional(
    stringValidation({label: 'Website url'}).regex(
      CustomRegex.website,
      'Website url is invalid',
    ),
  ),
  country: stringValidation({label: 'Country'}).min(1, {
    message: 'Country length should be above 3',
  }),
  taxRate: z.optional(numberValidation({label: 'Tax rate'})),
});

export type CreateCustomerSchemaType = z.infer<typeof createCustomerSchema>;
