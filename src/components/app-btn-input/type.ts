import {ReactNode} from 'react';
import {ViewStyle} from 'react-native';
import {COLOR_TYPES, TEXT_SIZES} from '../../config/const';

export type AppBtnInputProps = {
  RightContent?: ReactNode;
  placeholder?: string;
  label?: string;
  value?: string | number;
  onPress?: () => void;
  isFocused?: boolean;
  style?: ViewStyle;
  textSize?: TEXT_SIZES;
  textColor?: COLOR_TYPES;
  buttonColor?: COLOR_TYPES | 'transparent';
  borderColor?: COLOR_TYPES | 'transparent';
  disabled?: boolean;
};
