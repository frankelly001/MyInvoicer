import {ViewStyle} from 'react-native';
import {COLOR_TYPES} from '../../config/const';

export type AppDisplayImageProps = {
  uri: string | undefined | null;
  size?: number;
  style?: ViewStyle;
  isCircular?: boolean;
  borderWidth?: number;
  borderColor?: COLOR_TYPES;
};
