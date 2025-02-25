import {ReactNode} from 'react';
import {ViewStyle} from 'react-native';

export type AppAlertProps = {
  Icon?: ReactNode;
  title?: string;
  description?: string;
  containerStyle?: ViewStyle;
  removeButton?: boolean;
  onPress?: () => void;
  buttonText?: string;
};
