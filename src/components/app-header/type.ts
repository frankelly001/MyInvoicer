import {ReactNode} from 'react';
import {ViewStyle} from 'react-native';

export type AppHeaderProps = {
  LeftContent?: ReactNode;
  MiddleContent?: ReactNode;
  RightContent?: ReactNode;
  popupContent?: ReactNode;
  leftTitle?: string;
  middleTitle?: string;
  middleTopTitle?: string;
  rightTitle?: string;
  onPressLeft?: () => void;
  onPressMiddle?: () => void;
  onPressRight?: () => void;
  containerStyles?: ViewStyle;
};
