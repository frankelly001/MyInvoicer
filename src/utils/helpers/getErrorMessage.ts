export const getErrorMessage = (error: any) =>
  error?.data?.data?.message ??
  error?.data?.message ??
  error?.message ??
  error?.error ??
  'Something went wrong';
