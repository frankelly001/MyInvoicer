import {StyleSheet} from 'react-native';
import {COLORS_OBJECT_TYPES, typography} from '../../config/const';

export const appInputStyles = ({
  colors,
  isFocus,
  isDisabled,
}: {
  colors?: COLORS_OBJECT_TYPES;
  isFocus?: boolean;
  isDisabled?: boolean;
} = {}) =>
  StyleSheet.create({
    container: {
      width: '100%',
    },
    inputContainer: {
      borderWidth: isFocus ? 1.5 : 1,
      borderColor: colors?.[isFocus ? 'highlight_5' : 'neutral_light_5'],
      flexDirection: 'row',
      borderRadius: 12,
      alignItems: 'center',
      marginTop: 8,
      height: 48,
      opacity: isDisabled ? 0.5 : 1,
    },
    inputView: {
      flex: 1,
      paddingHorizontal: 16,
    },
    inputField: {
      paddingVertical: 0,
      paddingHorizontal: 0,
      flex: 1,
      color: colors?.neutral_dark_5,
      textDecorationLine: 'none',
      ...typography.body_s,
    },
    iconContainer: {paddingHorizontal: 15},
  });
