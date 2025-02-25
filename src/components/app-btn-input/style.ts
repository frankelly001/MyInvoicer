import {StyleSheet} from 'react-native';
import {COLORS_OBJECT_TYPES, COLOR_TYPES} from '../../config/const';

export const inputBtnStyles = ({
  colors,
  isFocus,
  borderColor,
  buttonColor = 'transparent',
  disabled,
}: {
  colors?: COLORS_OBJECT_TYPES;
  isFocus?: boolean;
  disabled?: boolean;
  buttonColor?: COLOR_TYPES | 'transparent';
  borderColor?: COLOR_TYPES | 'transparent';
} = {}) =>
  StyleSheet.create({
    container: {
      width: '100%',
    },
    inputContainer: {
      borderWidth: isFocus ? 1.5 : 1,
      borderColor:
        borderColor === 'transparent'
          ? 'transparent'
          : colors?.[isFocus ? 'highlight_5' : 'neutral_light_5'],
      flexDirection: 'row',
      borderRadius: 12,
      alignItems: 'center',
      marginTop: 8,
      maxHeight: 48,
      minHeight: 48,
      paddingHorizontal: 16,
      opacity: disabled ? 0.5 : 1,
      backgroundColor:
        buttonColor === 'transparent' ? 'transparent' : colors?.[buttonColor],
    },
    text: {flex: 1},
  });
