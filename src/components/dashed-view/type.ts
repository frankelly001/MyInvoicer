import {ViewStyle} from 'react-native';
import {COLOR_TYPES} from '../../config/const';

export type DashedViewProps = {
  value: string;
  label: string;
  valueColor?: COLOR_TYPES;
  labelColor?: COLOR_TYPES;
  style?: ViewStyle;
};
