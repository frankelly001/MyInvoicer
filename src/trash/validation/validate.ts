import * as Yup from 'yup';

export const validate = (async (
  validationSchema: Yup.AnyObject,
  data: Object,
) => {
  try {
    await validationSchema.validate(data, {
      abortEarly: false,
    });

    return null;
  } catch (errors: any) {
    const allErr = errors.inner.reduce(
      (allErrors: any, currentError: any) => ({
        ...allErrors,
        [currentError.path]: {
          type: currentError.type ?? 'validation',
          message: currentError.message,
          ref: {name: currentError.path},
        },
      }),
      {},
    );

    return allErr;
  }
}) as (validationSchema: Yup.AnyObject, data: Object) => Promise<any>;
