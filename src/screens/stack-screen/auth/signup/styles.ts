import {StyleSheet} from 'react-native';
import {COLORS_OBJECT_TYPES, SCREEN_HEIGHT} from '../../../../config/const';

export const signupStyles = ({colors}: {colors?: COLORS_OBJECT_TYPES} = {}) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingBottom: 10,
      paddingTop: SCREEN_HEIGHT * 0.1,
    },

    subContainer: {
      paddingHorizontal: 24,
      paddingTop: 40,
      paddingBottom: 10,
    },
    or: {
      paddingVertical: 24,
    },
    mb8: {
      marginBottom: 8,
    },
    mb16: {
      marginBottom: 16,
    },
    mb24: {
      marginBottom: 24,
    },
    acceptTC: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    socialBtn: {marginRight: 24},
    checkBtn: {marginRight: 12},
    terms: {flex: 1, alignItems: 'center'},
  });
