import {TextInputProps, ViewStyle} from 'react-native';

export type AppSearchInputProps = {
  onPress?: () => void;
  inputRef?: any;
  containerStyle?: ViewStyle;
} & TextInputProps;
