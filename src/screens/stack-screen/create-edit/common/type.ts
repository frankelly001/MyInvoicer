import {GeneralBillFormSchemaType} from './bill-form-screen/schema';

export type SubmitProps<T> = {
  values: T;
  reset: () => void;
};

export type BillFormSubmitProps<T> = SubmitProps<T & GeneralBillFormSchemaType>;

export type DefaultValuesType<T> = T & T & GeneralBillFormSchemaType;

export type FormType = 'add' | 'create' | 'edit';
