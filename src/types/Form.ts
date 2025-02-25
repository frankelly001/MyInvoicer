import {ZodType, z} from 'zod';

export type FormValidationShemaType<T extends ZodType<any, any, any>> =
  z.infer<T>;
