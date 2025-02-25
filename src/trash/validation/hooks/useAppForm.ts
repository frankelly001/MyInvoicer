import {useEffect, useMemo, useState} from 'react';
import {AnyObjectSchema} from 'yup';
import {useFormValidation} from './useFormValidation';

export const useAppForm = ({
  defaultValues,
  validationSchema,
}: {
  defaultValues: {[key: string]: any};
  validationSchema: AnyObjectSchema;
}) => {
  const [values, setValues] = useState<{[key: string]: any}>(defaultValues);

  const {errors, isValid, validateField, isFormError, isError} =
    useFormValidation(validationSchema);

  isFormError(values);

  const _handleSetValue = async (name: string, value: any) => {
    setValues(values => {
      return {...values, [name]: value};
    });
    validateField({
      values: {...values, [name]: value},
      field: name,
      initialize: true,
    });
  };

  const _handleSubmit = async (
    onSubmit: (values: {[key: string]: string}, onReset: () => void) => void,
  ) => {
    const valid = await isValid(values);
    if (!valid) return;
    return onSubmit(values, () => setValues(defaultValues));
  };

  return {values, _handleSetValue, _handleSubmit, errors, isError};
};
