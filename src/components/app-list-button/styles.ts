import {StyleSheet} from 'react-native';
import {COLORS_OBJECT_TYPES} from '../../config/const';

export const listButtonStyles = ({
  colors,
}: {colors?: COLORS_OBJECT_TYPES} = {}) =>
  StyleSheet.create({
    container: {
      padding: 16,
      flexDirection: 'row',
      alignItems: 'center',
      borderColor: colors?.neutral_light_4,
    },
    title: {flex: 1},
    leftIcon: {marginRight: 16},
  });
