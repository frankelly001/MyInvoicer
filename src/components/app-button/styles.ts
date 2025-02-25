import {StyleSheet} from 'react-native';
import {COLORS_OBJECT_TYPES, COLOR_TYPES} from '../../config/const';

export const appBtnStyles = ({
  colors,
  buttonColor = 'highlight_5',
  disabled,
  borderRadius,
  borderWidth,
  borderColor = 'transparent',
}: {
  colors?: COLORS_OBJECT_TYPES;
  disabled?: boolean;
  buttonColor?: COLOR_TYPES | 'transparent';
  borderRadius?: number;
  borderWidth?: number;
  borderColor?: COLOR_TYPES | 'transparent';
} = {}) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 16,
      paddingVertical: 12,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      width: '100%',
      height: 48,
      opacity: disabled ? 0.5 : 1,
      backgroundColor:
        buttonColor === 'transparent' ? 'transparent' : colors?.[buttonColor],
      borderRadius,
      borderWidth,
      borderColor:
        borderColor === 'transparent' ? 'transparent' : colors?.[borderColor],
    },
  });
