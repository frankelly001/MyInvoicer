import {StyleSheet} from 'react-native';
import {COLORS_OBJECT_TYPES, wp} from '../../config/const';

export const appTabSwitcherStyles = ({
  colors,
  width,
}: {colors?: COLORS_OBJECT_TYPES; width?: number} = {}) =>
  StyleSheet.create({
    tabContainer: {
      backgroundColor: colors?.neutral_light_2,
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: wp(16),
      padding: wp(4),
      width: width ? wp(width) : undefined,
    },
    tab: {
      flex: 1,
      alignItems: 'center',
      padding: wp(8),
      borderRadius: wp(12),
    },
    divider: {
      position: 'absolute',
      alignItems: 'center',
      justifyContent: 'center',
      top: 0,
      bottom: 0,
      right: 0,
      zIndex: -10,
    },
  });
