import {ReactNode} from 'react';
import {TextStyle} from 'react-native';

export type TabTitleHeaderProps = {
  screenTitle?: string;
  rightContent?: ReactNode;
  rightTitle?: string;
  onPressRight?: () => void;
  titleStyle?: TextStyle;
};
