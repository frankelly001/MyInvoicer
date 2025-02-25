import {KeyboardType} from 'react-native';
import {ViewStyle} from 'react-native';
import {DataType} from '../components/app-custom-select-input/type';

export type NonSelectFieldType = 'image' | 'button' | 'date';
export type TextFieldType = 'text' | 'text_area';
export type SelectFieldType = 'select';
export type CustumSelectFieldType = 'custom_select';

export type TextContentType =
  | 'none'
  | 'URL'
  | 'addressCity'
  | 'addressCityAndState'
  | 'addressState'
  | 'countryName'
  | 'creditCardNumber'
  | 'emailAddress'
  | 'familyName'
  | 'fullStreetAddress'
  | 'givenName'
  | 'jobTitle'
  | 'location'
  | 'middleName'
  | 'name'
  | 'namePrefix'
  | 'nameSuffix'
  | 'nickname'
  | 'organizationName'
  | 'postalCode'
  | 'streetAddressLine1'
  | 'streetAddressLine2'
  | 'sublocality'
  | 'telephoneNumber'
  | 'username'
  | 'password'
  | 'newPassword'
  | 'oneTimeCode'
  | undefined;

type BaseField<T> = {
  name: keyof T;
  placeholder?: string;
  label?: string;
  style?: ViewStyle;
};

export type SelectField<T> = BaseField<T> & {
  data: {label: string; value: string}[];
  type: SelectFieldType;
  search?: boolean;
};
export type CustomSelectField<T> = BaseField<T> & {
  dataType: DataType;
  type: CustumSelectFieldType;
  search?: boolean;
};
export type TextField<T> = BaseField<T> & {
  type: TextFieldType;
  keyBoardType?: KeyboardType;
  textContentType?: TextContentType;
};

export type OtherFields<T> = BaseField<T> & {
  type: NonSelectFieldType;
};

export type TextInputFields<T> = TextField<T>[];
export type SelectInputFields<T> = SelectField<T>[];
export type AllInputFields<T> = (
  | TextField<T>
  | SelectField<T>
  | CustomSelectField<T>
  | OtherFields<T>
)[];
