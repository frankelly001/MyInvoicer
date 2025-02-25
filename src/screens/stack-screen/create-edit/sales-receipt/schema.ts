import {z} from 'zod';
import {numberValidation, stringValidation} from '../../../../utils/schema';
import {DefaultValuesType} from '../common/type';

export const invoiceInfoSchema = {
  receiptDate: z.date({required_error: 'Receipt date is required'}),
  currency: stringValidation({label: 'Currency'}).min(1),
  billLabel: stringValidation({label: 'Estimate label'}).min(1),
};

export const otherInfoSchema = {
  discount: numberValidation({label: 'Discount'}).min(1),
  tax: numberValidation({label: 'Tax'}).min(1),
  billNote: stringValidation({label: 'Estimate note'}).min(3),
  paymentMode: stringValidation({label: 'Payment mode'}).min(1),
  // termsAndConditions: stringValidation({label: 'terms & Condition'}).min(3),
};

export const receiptFormSchema = z.object({
  ...invoiceInfoSchema,
  ...otherInfoSchema,
});

export type ReceiptFormSchemaType = DefaultValuesType<
  z.infer<typeof receiptFormSchema>
>;
export type ReceiptFormFields = z.infer<typeof receiptFormSchema>;
