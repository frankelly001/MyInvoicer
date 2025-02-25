import {z} from 'zod';
import {numberValidation, stringValidation} from '../../../../utils/schema';
import {DefaultValuesType} from '../common/type';
export const invoiceInfoSchema = {
  orderDate: z.date({required_error: 'Order date is required'}),
  expiryDate: z.date({required_error: 'Expiry date is required'}),
  currency: stringValidation({label: 'Currency'}).min(1),
  billLabel: stringValidation({label: 'Estimate label'}).min(1),
};

export const otherInfoSchema = {
  discount: numberValidation({label: 'Discount'}).min(1),
  tax: numberValidation({label: 'Tax'}).min(1),
  billNote: stringValidation({label: 'Estimate note'}).min(3),
  termsAndConditions: stringValidation({label: 'terms & Condition'}).min(3),
};

export const orderFormSchema = z.object({
  ...invoiceInfoSchema,
  ...otherInfoSchema,
});

export type OrderFormSchemaType = DefaultValuesType<
  z.infer<typeof orderFormSchema>
>;
export type OrderFormFields = z.infer<typeof orderFormSchema>;
