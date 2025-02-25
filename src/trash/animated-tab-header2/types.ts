import {Animated} from 'react-native';
import {AppHeaderProps} from '../../components/app-header/type';

export type AnimatedTabHeaderProps = {
  // screenTitle?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  // translateY: Animated.AnimatedInterpolation<string | number>;
} & AppHeaderProps;
