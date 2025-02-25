import {StyleSheet} from 'react-native';
import {COLORS_OBJECT_TYPES, fontSz, typography} from '../../config/const';

export const selectInputStyles = ({
  colors,
  isFocus,
}: {colors?: COLORS_OBJECT_TYPES; isFocus?: boolean} = {}) =>
  StyleSheet.create({
    container: {
      width: '100%',
    },
    label: {marginBottom: 8},
    inputContainer: {
      borderWidth: isFocus ? 1.5 : 1,
      borderColor: colors?.[isFocus ? 'highlight_5' : 'neutral_light_5'],
      flexDirection: 'row',
      borderRadius: 12,
      alignItems: 'center',
      height: 48,
    },
    selectInputView: {
      flex: 1,
    },

    iconPosition: {
      position: 'absolute',
      right: 16,
      top: 0,
      bottom: 0,
      alignItems: 'center',
      justifyContent: 'center',
    },
    dropdown: {
      width: '100%',

      paddingHorizontal: 16,
    },
    dropdownContainer: {
      borderRadius: 10,
      overflow: 'hidden',
      backgroundColor: colors?.neutral_light_1,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 6,
      },
      shadowOpacity: 0.37,
      shadowRadius: 7.49,

      elevation: 12,
    },
    icon: {
      marginRight: 5,
    },
    placeholderStyle: {
      color: colors?.neutral_dark_1,
      ...typography.body_s,
    },
    selectedTextStyle: {
      textTransform: 'capitalize',
      color: colors?.neutral_dark_5,
      ...typography.body_s,
    },
    inputSearchStyle: {
      color: colors?.neutral_dark_5,
      fontSize: fontSz(11),
      borderRadius: 5,
    },
    iconStyle: {
      display: 'none',
    },
    item: {
      padding: 15,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  });
