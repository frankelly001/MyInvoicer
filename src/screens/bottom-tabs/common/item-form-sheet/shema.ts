import {z} from 'zod';
import {
  nameValidation,
  numberValidation,
  stringValidation,
} from '../../../../utils/schema';

export const addItemSchema = z.object({
  productName: stringValidation({label: 'Product name'}).min(3, {
    message: 'Product name must contain atleast 3 characters ',
  }),
  description: stringValidation({label: 'Product description'}).min(3, {
    message: 'Product description must contain atleast 3 characters ',
  }),
  currency: stringValidation({label: 'Currency'}).min(1),
  price: numberValidation({label: 'Price'}),
  unit: nameValidation({label: 'Unit'}),
});

export type AddItemSchemaType = z.infer<typeof addItemSchema>;
