import {StyleSheet} from 'react-native';
import {COLORS_OBJECT_TYPES} from '../../config/const';

export const appToastViewStyles = ({}: {colors?: COLORS_OBJECT_TYPES} = {}) =>
  StyleSheet.create({
    container: {
      width: '100%',
      backgroundColor: 'transparent',
      paddingHorizontal: 20,
    },
    toast: {
      height: '100%',
      borderRadius: 15,
      paddingVertical: 16,
      paddingLeft: 16,
      paddingRight: 11,
      flexDirection: 'row',
      alignItems: 'center',
    },
    textContainer: {
      flex: 1,
      paddingHorizontal: 12,
    },
    title: {marginBottom: 3},
    hideBtn: {
      padding: 5,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
