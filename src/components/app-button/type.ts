import {ReactNode} from 'react';
import {TouchableOpacityProps} from 'react-native';
import {COLOR_TYPES, TEXT_SIZES} from '../../config/const';

export type appButtonProps = {
  readonly?: boolean;
  isLoading?: boolean;
  text: string | undefined;
  textColor?: COLOR_TYPES;
  buttonColor?: COLOR_TYPES | 'transparent';
  borderColor?: COLOR_TYPES | 'transparent';
  borderWidth?: number;
  textTransform?: 'none' | 'capitalize' | 'uppercase' | 'lowercase' | undefined;
  textSize?: TEXT_SIZES;
  LeftView?: ReactNode;
  borderRadius?: number;
} & TouchableOpacityProps;
