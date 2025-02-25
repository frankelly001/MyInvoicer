import {StyleSheet} from 'react-native';
import {
  COLORS_OBJECT_TYPES,
  HEADER_INPUT_HEIGHT,
  HEADER_SEARCH_HEIGHT,
  HEADER_TITLE_HEIGHT,
  MAIN_HEADER_HEIGHT,
  typography,
} from '../../config/const';

export const animatedHeaderStyles = ({
  colors,
  searchToggle,
}: {colors?: COLORS_OBJECT_TYPES; searchToggle?: boolean} = {}) =>
  StyleSheet.create({
    container: {},
    screenTitle: {
      paddingHorizontal: 24,
      justifyContent: 'center',
      backgroundColor: colors?.neutral_light_1,
      // backgroundColor: 'yellow',
      height: HEADER_TITLE_HEIGHT,
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
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors?.neutral_light_2,
      paddingHorizontal: 16,
      borderRadius: 24,
      height: HEADER_INPUT_HEIGHT,
    },
    inputView: {
      paddingHorizontal: 16,
      flex: 1,
    },
    input: {
      paddingVertical: 0,
      paddingHorizontal: 0,
      color: colors?.neutral_dark_5,
      textDecorationLine: 'none',
      ...typography.body_m,
    },
    resultSesultContainer: {
      backgroundColor: colors?.neutral_light_1,
      width: '100%',
      zIndex: 1,
      overflow: 'hidden',
      top: 0,
      bottom: 0,
      left: 0,
    },
    result: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 16,
    },
  });
