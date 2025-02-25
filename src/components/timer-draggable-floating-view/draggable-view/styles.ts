import {StyleSheet} from 'react-native';
import {COLORS_OBJECT_TYPES, wp} from '../../../config/const';
import {generateShadow} from '../../../utils/helpers';

export const draggableStyles = ({
  colors,
  transform,
}: {colors?: COLORS_OBJECT_TYPES; transform?: any} = {}) =>
  StyleSheet.create({
    container: {
      transform,
      position: 'absolute',
      bottom: 90,
      right: 40,
      width: wp(300),
      // height: wp(92),
      backgroundColor: colors?.neutral_light_1,
      borderRadius: 16,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      overflow: 'hidden',
      ...generateShadow({depth: 5, color: colors?.neutral_light_1}),
    },
  });
