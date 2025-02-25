import {AppSelectInputProps} from '../app-select-input/type';

export type DataType = 'countries' | 'currencies' | 'businesses' | 'customers';

export type CustomSelectInputProps = Omit<
  AppSelectInputProps,
  'data' | 'isDataloading'
>;
export type AppCustomSelectInputProps = {
  dataType: DataType;
} & CustomSelectInputProps;
