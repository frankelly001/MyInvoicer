import {z} from 'zod';
import {
  emailValidation,
  fullNameValidation,
  phoneNumberValidation,
  stringValidation,
} from '../../../../../utils/schema';
import {addBillItemSchema} from './add-Items/add-item-form-sheet/schema';

const itemsSchema = z
  .array(addBillItemSchema)
  .min(1, {message: 'Please add atleast one item'});

export const generalBillFormSchema = z.object({
  billFrom: stringValidation({label: 'Bill from'}).min(1),
  fullname: fullNameValidation({label: 'Fullname'}),
  email: emailValidation,
  phone: phoneNumberValidation,
  address: stringValidation({label: 'Address'}),
  items: itemsSchema,
});

export type GeneralBillFormSchemaType = z.infer<typeof generalBillFormSchema>;
export type ItemsSchemaType = z.infer<typeof itemsSchema>;
