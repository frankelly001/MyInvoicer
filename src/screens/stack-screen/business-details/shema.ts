import {z} from 'zod';
import {stringValidation} from '../../../utils/schema';

export const predefinedNoteSchema = z.object({
  predefinedNote: stringValidation({label: 'Predefined note'}).min(1),
});

export const predefinedNoteTermsSchema = z
  .object({
    predefinedTerms: stringValidation({label: 'Predefined terms'}).min(1),
  })
  .and(predefinedNoteSchema);

export const reasonSchema = z.object({
  reasons: stringValidation({label: 'Reasons'}).min(1),
});

export type PredefinedNoteSchemaSchemaType = z.infer<
  typeof predefinedNoteSchema
>;
export type PredefinedNoteTermsSchemaSchemaType = z.infer<
  typeof predefinedNoteTermsSchema
>;
export type ReasonSchemaSchemaType = z.infer<typeof reasonSchema>;
