import {ReactNode} from 'react';
import {ViewStyle} from 'react-native';
import {COLOR_TYPES} from '../../config/const';

export type SwipeActionBtnsProps = {
  btnStyle?: ViewStyle;
  actions: {
    name: string;
    Icon: ReactNode;
    onPress?: () => void;
    color1: COLOR_TYPES;
    color2: COLOR_TYPES;
  }[];
};
