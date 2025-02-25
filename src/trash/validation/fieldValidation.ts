import {AnyObject} from 'yup';
import {validate} from './validate';

export const fieldValidation = async ({
  values,
  field,
  validationSchema,
}: {
  values: {[key in string]: any};
  field: string;
  validationSchema: AnyObject;
}) => {
  const errs = await validate(validationSchema, values);
  if (errs) return {[field]: errs[field]};
};
