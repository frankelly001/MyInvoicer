import {StyleSheet} from 'react-native';
import {COLORS_OBJECT_TYPES} from '../../config/const';

export const imageInputStyles = ({
  colors,
}: {colors?: COLORS_OBJECT_TYPES} = {}) =>
  StyleSheet.create({
    container: {
      // padding: 28,
      height: 85,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 2,
      borderColor: colors?.neutral_light_5,
      width: '100%',
      borderStyle: 'dashed',
      borderRadius: 16,
    },
    label: {marginBottom: 3},
  });
