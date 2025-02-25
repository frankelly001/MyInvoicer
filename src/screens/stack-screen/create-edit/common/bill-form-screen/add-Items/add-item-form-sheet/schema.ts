import {z} from 'zod';
import {
  floatNumberValidation,
  nameValidation,
  numberValidation,
  stringValidation,
} from '../../../../../../../utils/schema';

export const addBillItemSchema = z.object({
  productName: stringValidation({label: 'Product name'}).min(3, {
    message: 'Product name must contain atleast 3 characters ',
  }),
  description: stringValidation({label: 'Product description'}).min(3, {
    message: 'Product description must contain atleast 3 characters ',
  }),
  price: numberValidation({label: 'Price'}),
  unit: nameValidation({label: 'Unit'}),
  quantity: floatNumberValidation({label: 'Quantity'}),
  total: floatNumberValidation({label: 'Total'}),
});

export type AddBillItemSchemaType = z.infer<typeof addBillItemSchema>;
