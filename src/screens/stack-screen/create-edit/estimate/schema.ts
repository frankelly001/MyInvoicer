import {z} from 'zod';
import {numberValidation, stringValidation} from '../../../../utils/schema';
import {DefaultValuesType} from '../common/type';
export const invoiceInfoSchema = {
  estimateDate: z.date({required_error: 'Issued date is required'}),
  expiryDate: z.date({required_error: 'Due date is required'}),
  currency: stringValidation({label: 'Currency'}).min(1),
  billLabel: stringValidation({label: 'Estimate label'}).min(1),
};

export const otherInfoSchema = {
  discount: numberValidation({label: 'Discount'}).min(1),
  tax: numberValidation({label: 'Tax'}).min(1),
  // amtDeposited: numberValidation({label: 'Amount deposited'}).min(1),
  billNote: stringValidation({label: 'Estimate note'}).min(3),
  termsAndConditions: stringValidation({label: 'terms & Condition'}).min(3),
};

export const estimateFormSchema = z.object({
  ...invoiceInfoSchema,
  ...otherInfoSchema,
});

export type EstimateFormSchemaType = DefaultValuesType<
  z.infer<typeof estimateFormSchema>
>;
export type EstimateFormFields = z.infer<typeof estimateFormSchema>;
