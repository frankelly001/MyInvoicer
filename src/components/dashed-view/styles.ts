import {StyleSheet} from 'react-native';
import {COLORS_OBJECT_TYPES} from '../../config/const';

export const dashedViewstyles = ({
  colors,
}: {colors?: COLORS_OBJECT_TYPES} = {}) =>
  StyleSheet.create({
    billCard: {
      padding: 16,
      alignItems: 'center',
      flex: 1,

      borderWidth: 0.5,
      borderStyle: 'dashed',
      borderRadius: 10,
      borderColor: colors?.neutral_light_5,
    },
    price: {marginBottom: 8},
  });
