import {StyleSheet} from 'react-native';
import {COLORS_OBJECT_TYPES, wp} from '../../../../config/const';

export const billMetricsCarouselStyles = ({
  colors,
}: {colors?: COLORS_OBJECT_TYPES} = {}) =>
  StyleSheet.create({
    scrollContentContainer: {gap: 16, paddingHorizontal: 20},
    card: {
      width: wp(200),
      height: wp(76),
      justifyContent: 'center',
      paddingHorizontal: 16,
      backgroundColor: colors?.neutral_light_2,
      borderRadius: 16,
      gap: 3,
    },
    loader: {paddingHorizontal: 0, overflow: 'hidden'},
  });
