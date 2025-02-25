import {StyleSheet} from 'react-native';
import {COLORS_OBJECT_TYPES} from '../../config/const';

export const appConfirmStyles = ({
  colors,
}: {colors?: COLORS_OBJECT_TYPES} = {}) =>
  StyleSheet.create({
    container: {
      marginHorizontal: 30,
      backgroundColor: colors?.neutral_light_1,
      borderRadius: 16,
      padding: 16,
    },
    textContainer: {padding: 5},
    noticeDesc: {marginTop: 8},
    btnContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 20,
    },
    btn: {
      width: '48%',
      borderRadius: 12,
    },
  });
