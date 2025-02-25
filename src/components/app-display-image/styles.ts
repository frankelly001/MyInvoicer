import {StyleSheet} from 'react-native';
import {COLORS_OBJECT_TYPES, COLOR_TYPES, wp} from '../../config/const';

export const displayImageStyles = ({
  size = 60,
  isCircular,
  borderColor = 'transparent',
  borderWidth,
  colors,
}: {
  colors?: COLORS_OBJECT_TYPES;
  size?: number;
  borderWidth?: number;
  borderColor?: COLOR_TYPES;
  isCircular?: boolean;
} = {}) =>
  StyleSheet.create({
    imgContainer: {
      width: wp(size),
      height: wp(size),
      borderColor: colors?.[borderColor],
      borderWidth,
      overflow: 'hidden',
      borderRadius: isCircular ? wp(size) / 2 : 0,
    },
    img: {flex: 1},
  });
