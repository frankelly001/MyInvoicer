import {StyleSheet} from 'react-native';
import {COLORS_OBJECT_TYPES, HEADER_TITLE_HEIGHT} from '../../config/const';

export const tabTitleHeaderStyles = ({
  colors,
}: {colors?: COLORS_OBJECT_TYPES; searchToggle?: boolean} = {}) =>
  StyleSheet.create({
    screenTitle: {
      paddingHorizontal: 24,
      justifyContent: 'space-between',
      backgroundColor: colors?.neutral_light_1,

      height: HEADER_TITLE_HEIGHT,
      flexDirection: 'row',
    },
    right: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    rightTitle: {textTransform: 'capitalize'},
  });
