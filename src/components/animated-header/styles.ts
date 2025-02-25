import {StyleSheet} from 'react-native';
import {
  COLORS_OBJECT_TYPES,
  HEADER_SEARCH_HEIGHT,
  HEADER_TITLE_HEIGHT,
  MAIN_HEADER_HEIGHT,
} from '../../config/const';

export const animatedHeaderStyles = ({
  colors,
  searchToggle,
}: {colors?: COLORS_OBJECT_TYPES; searchToggle?: boolean} = {}) =>
  StyleSheet.create({
    container: {},
    screenTitle: {
      paddingHorizontal: 24,
      justifyContent: 'space-between',
      backgroundColor: colors?.neutral_light_1,
      // backgroundColor: 'yellow',
      height: HEADER_TITLE_HEIGHT,
      flexDirection: 'row',
    },
    animatedHiddenHeader: {
      ...(!searchToggle && {
        position: 'absolute',
        left: 0,
        right: 0,
        top: MAIN_HEADER_HEIGHT,
      }),
      zIndex: 1,
    },
    searchContainer: {
      paddingHorizontal: 16,
      backgroundColor: colors?.neutral_light_1,
      flexDirection: 'row',
      alignItems: 'center',
      // backgroundColor: 'pink',
      height: HEADER_SEARCH_HEIGHT,
    },
    resultSesultContainer: {
      backgroundColor: colors?.neutral_light_1,
      width: '100%',
      zIndex: 1,
      overflow: 'hidden',
      top: 0,
      bottom: 0,
      left: 0,
      display: !searchToggle ? 'none' : 'flex',
    },
    result: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 16,
    },
    right: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
  });
