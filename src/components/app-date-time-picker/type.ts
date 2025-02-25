import {ViewStyle} from 'react-native';
import {AppBtnInputProps} from '../app-btn-input/type';

export type AppDatePickerProps = {
  style?: ViewStyle;
  onChange?: (date: Date) => void;
  value?: Date;
  mode?: 'date' | 'time' | 'datetime';
  maximumDate?: Date;
  minimumDate?: Date;
} & Omit<AppBtnInputProps, 'value'>;
