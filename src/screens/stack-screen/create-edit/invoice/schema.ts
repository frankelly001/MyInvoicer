import {z} from 'zod';
import {numberValidation, stringValidation} from '../../../../utils/schema';
import {DefaultValuesType} from '../common/type';
export const invoiceInfoSchema = {
  issueDate: z.date({required_error: 'Issued date is required'}),
  dueDate: z.date({required_error: 'Due date is required'}),
  currency: stringValidation({label: 'Currency'}).min(1),
  billLabel: stringValidation({label: 'Invoice label'}).min(1),
};
export const otherInfoSchema = {
  discount: numberValidation({label: 'Discount'}).min(1),
  tax: numberValidation({label: 'Tax'}).min(1),
  amtDeposited: z.optional(
    numberValidation({label: 'Amount deposited'}).min(1),
  ),
  billNote: stringValidation({label: 'Invoice note'}).min(3),
  termsAndConditions: stringValidation({label: 'terms & Condition'}).min(3),
  paymentMode: stringValidation({label: 'Payment mode'}).min(1),
};

export const invoiceFormSchema = z.object({
  ...invoiceInfoSchema,
  ...otherInfoSchema,
});

export type InvoiceFormSchemaType = DefaultValuesType<
  z.infer<typeof invoiceFormSchema>
>;
export type InvoiceFormFields = z.infer<typeof invoiceFormSchema>;
