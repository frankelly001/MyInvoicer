import {StyleSheet} from 'react-native';
import {COLORS_OBJECT_TYPES} from '../../config/const';

export const timerViewStyles = ({colors}: {colors: COLORS_OBJECT_TYPES}) =>
  StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      backgroundColor: colors?.highlight_1,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      padding: 16,
      gap: 16,
    },
    details: {flex: 1, gap: 4},
  });
