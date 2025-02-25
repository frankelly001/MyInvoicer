import {StyleSheet} from 'react-native';
import {COLORS_OBJECT_TYPES, SCREEN_HEIGHT} from '../../../../config/const';

export const forgotPasswordStyles = ({
  colors,
}: {colors?: COLORS_OBJECT_TYPES} = {}) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 24,
      paddingBottom: 10,
      alignItems: 'center',
    },
    contentContainer: {width: '100%', paddingTop: 40},
    mb8: {
      marginBottom: 8,
    },
    info: {
      marginBottom: 12,
    },
    mv12: {marginVertical: 12},
  });
