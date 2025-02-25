import {ReactNode} from 'react';
import {TextInputProps, TextStyle, ViewStyle} from 'react-native/types';

export type AppTextInputProps = {
  containerStyle?: ViewStyle;
  inputContainerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  placeholder?: string;
  label?: string;
  LeftSuffixIcon?: ReactNode;
  RightSuffixIcon?: ReactNode;
  leftIconOnPress?: () => void;
  rightIconOnPress?: () => void;
  enableLeftIconOnPress?: boolean;
  enableRightIconOnPress?: boolean;
  disabled?: boolean;
} & Omit<TextInputProps, 'editable'>;
