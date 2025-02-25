import {ReactNode} from 'react';
import {ViewStyle} from 'react-native';
import {COLOR_TYPES, TEXT_SIZES} from '../../config/const';
import {TEXT_TRANSFORM} from '../app-text/type';

export type AppListButtonProps = {
  onPress?: () => void;
  title?: ReactNode;
  LeftIcon?: ReactNode;
  RightIcon?: ReactNode;
  titleSize?: TEXT_SIZES;
  titleColor?: COLOR_TYPES;
  disabled?: boolean;
  borderType?: 'Top' | 'Bottom';
  style?: ViewStyle;
  textTranform?: TEXT_TRANSFORM;
};
