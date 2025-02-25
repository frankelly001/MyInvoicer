import {z} from 'zod';
import {stringValidation} from '../../../../utils/schema';
import CustomRegex from '../../../../utils/constants/customRegex';

export const addTimeSheetSchema = z.object({
  time: z.string().regex(CustomRegex.timeFormatRegex, {
    message: 'Invalid time format. Expected format is HH:MM:SS',
  }),
  title: stringValidation({label: 'Title'}).min(1, {
    message: 'Title must contain atleast 3 characters ',
  }),
  rate: stringValidation({label: 'Rate'}).min(1, {
    message: 'Rate must contain atleast 3 characters ',
  }),
  currency: stringValidation({label: 'Currency'}).min(1, {
    message: 'Currency must contain atleast 3 characters ',
  }),
  billTo: stringValidation({label: 'Customer'}).min(3, {
    message: 'Customer must contain atleast 3 characters ',
  }),
  note: stringValidation({label: 'Note'}).min(3, {
    message: 'Note must contain atleast 3 characters ',
  }),
});

export type AddTimesheetSchemaType = z.infer<typeof addTimeSheetSchema>;
