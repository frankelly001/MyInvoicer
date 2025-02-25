import {StyleSheet} from 'react-native';
import {COLORS_OBJECT_TYPES, COLOR_TYPES} from '../../config/const';

export const profileCardStyles = ({
  colors,
  backgroundColor,
}: {
  colors: COLORS_OBJECT_TYPES;
  backgroundColor: COLOR_TYPES;
}) =>
  StyleSheet.create({
    profileCardContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
      borderRadius: 16,
      backgroundColor: colors?.[backgroundColor],
    },

    img: {flex: 1},
    verifiedIcon: {position: 'absolute', bottom: 5, right: 0},
    profileDetails: {flex: 1, paddingHorizontal: 18},
    name: {marginBottom: 4},
  });
