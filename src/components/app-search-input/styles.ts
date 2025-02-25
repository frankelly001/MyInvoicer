import {StyleSheet} from 'react-native';
import {
  COLORS_OBJECT_TYPES,
  HEADER_INPUT_HEIGHT,
  typography,
} from '../../config/const';

export const appSearchInputStyles = ({
  colors,
}: {colors?: COLORS_OBJECT_TYPES} = {}) =>
  StyleSheet.create({
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors?.neutral_light_2,
      paddingHorizontal: 16,
      borderRadius: 24,
      height: HEADER_INPUT_HEIGHT,
    },
    inputView: {
      paddingHorizontal: 16,
      flex: 1,
    },
    input: {
      paddingVertical: 0,
      paddingHorizontal: 0,
      color: colors?.neutral_dark_5,
      textDecorationLine: 'none',
      flex: 1,
      ...typography.body_m,
      lineHeight: undefined,
    },
  });
