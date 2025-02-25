import {useState} from 'react';
import {AnyObjectSchema} from 'yup';
import {fieldValidation} from '../fieldValidation';
import {validate} from '../validate';

export const useFormValidation = (validationSchema: AnyObjectSchema) => {
  const [errors, setErrors] = useState<{[key in string]: any} | null>(null);
  const [isError, setIsError] = useState(false);

  const validateField = async ({
    values,
    field,
  }: {
    values: {[key in string]: any};
    field: string;
    initialize?: boolean;
  }) => {
    const fieldsError = await fieldValidation({
      field,
      validationSchema,
      values,
    });
    setErrors(ers => {
      return fieldsError
        ? {
            ...(ers || {}),
            [field]: fieldsError[field],
          }
        : null;
    });
    return fieldsError;
  };

  const isFormError = async (values: {[key: string]: any}) => {
    const errs = await validate(validationSchema, values);
    setIsError(!!errs);
  };

  const isValid = async (values: {[key: string]: any}) => {
    const errs = await validate(validationSchema, values);
    setErrors(errs);
    return !errs;
  };

  return {
    errors,
    validateField,
    isValid,
    isFormError,
    isError,
  };
};
