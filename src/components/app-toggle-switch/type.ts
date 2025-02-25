import {TextStyle, ViewStyle} from 'react-native';
import {COLOR_TYPES, TEXT_SIZES} from '../../config/const';

export type ToggleSize = 'small' | 'medium' | 'large';
export type OnTogglePress = (isOn: boolean) => void;
export type ToggleDimensions = {
  width: number;
  padding: number;
  circleWidth: number;
  circleHeight: number;
  translateX: number;
};

export type ToggleSwitchProps = {
  isOn: boolean;
  label?: string;
  labelTyle?: TEXT_SIZES;
  labelColor?: COLOR_TYPES;
  labelPosition?: 'left' | 'right';
  onColor?: string;
  offColor?: string;
  size?: ToggleSize;
  labelStyle?: TextStyle | TextStyle[];
  thumbOnStyle?: ViewStyle | ViewStyle[];
  thumbOffStyle?: ViewStyle | ViewStyle[];
  trackOnStyle?: ViewStyle | ViewStyle[];
  trackOffStyle?: ViewStyle | ViewStyle[];
  onToggle?: OnTogglePress;
  icon?: React.ReactNode;
  disabled?: boolean;
  animationSpeed?: number;
  useNativeDriver?: boolean;
  circleColor?: string;
  hitSlop?:
    | {
        top?: number;
        bottom?: number;
        left?: number;
        right?: number;
      }
    | number;
};
