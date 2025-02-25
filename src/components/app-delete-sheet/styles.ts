import {StyleSheet} from 'react-native';
import {COLORS_OBJECT_TYPES, isAndroid} from '../../config/const';

export const appDeleteSheetStyles = ({
  colors,
}: {colors?: COLORS_OBJECT_TYPES} = {}) =>
  StyleSheet.create({
    overlay: {backgroundColor: 'transparent'},
    modal: {
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
      backgroundColor: colors?.neutral_light_1,
    },
    container: {
      height: isAndroid ? 'auto' : 92,
      alignItems: 'center',
      paddingHorizontal: 24,
      paddingTop: isAndroid ? 0 : 11,
      borderTopWidth: isAndroid ? 0 : 0.3,
      borderColor: colors?.neutral_light_4,
      // ...(isAndroid && {marginBottom: 10}),
    },
    btnContainer: {
      alignItems: 'center',
      flexDirection: 'row',
      padding: 16,
      columnGap: 8,
    },
  });
