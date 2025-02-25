import {StyleSheet} from 'react-native';
import {COLORS_OBJECT_TYPES, typography, wp} from '../../config/const';

export const otpInputStyles = ({colors}: {colors?: COLORS_OBJECT_TYPES} = {}) =>
  StyleSheet.create({
    input: {
      height: wp(55),
    },
    codeInputField: {
      borderRadius: 12,
      width: wp(50),
      height: wp(50),
      color: colors?.neutral_dark_5,
      borderWidth: 1,
      ...typography.body_m,
    },
    codeInputHighlight: {
      color: colors?.highlight_5,
      borderWidth: 1.5,
      borderColor: colors?.highlight_5,
    },
  });
