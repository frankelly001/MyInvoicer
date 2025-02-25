import {ReactNode} from 'react';
import {ViewStyle} from 'react-native';
import {ALIGN_TYPES} from '../../config/const';

export type AppFormFieldProps = {
  isError?: boolean;
  errorMessage?: string;
  style?: ViewStyle;
  children: ReactNode;
  errorTextAlign?: ALIGN_TYPES;
};
