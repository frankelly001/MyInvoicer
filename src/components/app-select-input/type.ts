import {ReactNode} from 'react';
import {ViewStyle} from 'react-native';
import {DropdownProps} from 'react-native-element-dropdown/lib/typescript/components/Dropdown/model';

export type AppSelectInputProps = {
  containerStyle?: ViewStyle;
  inputContainerStyle?: ViewStyle;
  placeholder?: string;
  label?: string;
  enableSearchInput?: boolean;
  RightContent?: ReactNode;
  LeftContent?: ReactNode;
} & Omit<
  DropdownProps<{label: string; value: string}>,
  'labelField' | 'valueField'
>;
