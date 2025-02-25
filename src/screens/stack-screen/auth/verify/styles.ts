import {StyleSheet} from 'react-native';
import {COLORS_OBJECT_TYPES} from '../../../../config/const';

export const verifyStyles = ({colors}: {colors?: COLORS_OBJECT_TYPES} = {}) =>
  StyleSheet.create({
    container: {
      flex: 1,
      height: '100%',
      paddingHorizontal: 24,
      paddingVertical: 80,
      alignItems: 'center',
    },
    mb8: {
      marginBottom: 8,
    },
    info: {
      marginBottom: 20,
      paddingHorizontal: 20,
    },
    resend: {marginTop: 80, marginBottom: 28},
  });
