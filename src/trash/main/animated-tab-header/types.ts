import {ReactNode} from 'react';
import {Animated, ViewStyle} from 'react-native';
import {AppHeaderProps} from '../app-header/type';

export type AnimatedTabHeaderProps = {
  screenTitle?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  translateY?: Animated.AnimatedInterpolation<string | number>;
  scrollHeaderProps?: AppHeaderProps;
  screenRightTitle?: string;
  screenRightContent?: ReactNode;
  screenOnPressRight?: () => void;
} & AppHeaderProps;
