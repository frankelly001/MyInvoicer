import {StyleSheet} from 'react-native';
import {COLORS_OBJECT_TYPES, SCREEN_HEIGHT} from '../../../../config/const';

export const signinStyles = ({}: {colors?: COLORS_OBJECT_TYPES} = {}) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingBottom: 10,
      paddingTop: SCREEN_HEIGHT * 0.1,
    },
    socialIcon: {marginRight: 24},
    subContainer: {
      paddingHorizontal: 24,
      paddingTop: 40,
      paddingBottom: 10,
    },
    or: {
      paddingVertical: 24,
    },
    mb16: {
      marginBottom: 16,
    },
    mb24: {
      marginBottom: 24,
    },
    forgotPassword: {
      paddingHorizontal: 5,
      marginBottom: 24,
      alignSelf: 'flex-start',
    },
  });
