import {StyleSheet} from 'react-native';
import {COLORS_OBJECT_TYPES, wp} from '../../config/const';

export const appNumberTabStyles = ({}: {colors?: COLORS_OBJECT_TYPES} = {}) =>
  StyleSheet.create({
    container: {flexDirection: 'row', alignItems: 'center', padding: 8},
    barCardContainer: {
      flex: 1,
      alignItems: 'center',
      padding: 8,
    },
    barCard: {
      width: wp(25),
      height: wp(25),
      borderRadius: wp(25) / 2,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 12,
    },
    errorIndicator: {
      width: 8,
      height: 8,
      borderRadius: 4,
      position: 'absolute',
      backgroundColor: 'red',
      top: 0,
      right: 0,
    },
  });
