import {TextStyle, TextProps} from 'react-native';
import {ALIGN_TYPES, COLOR_TYPES, TEXT_SIZES} from '../../config/const';
import {ReactNode} from 'react';

export type TEXT_TRANSFORM = 'none' | 'capitalize' | 'uppercase' | 'lowercase';

export type AppTextProps = {
  text?: ReactNode;
  style?: TextStyle;
  color?: COLOR_TYPES;
  align?: ALIGN_TYPES;
  type?: TEXT_SIZES;
  children?: React.ReactNode;
  onPress?: () => void;
  textTransform?: TEXT_TRANSFORM;
} & TextProps;
