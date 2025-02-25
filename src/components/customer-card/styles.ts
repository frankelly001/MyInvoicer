import {StyleSheet} from 'react-native';
import {COLORS_OBJECT_TYPES} from '../../config/const';

export const customerCardStyles = ({
  colors,
}: {colors?: COLORS_OBJECT_TYPES} = {}) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 24,
      paddingVertical: 16,
      backgroundColor: colors?.neutral_light_1,
    },
    selectIcon: {paddingRight: 16},
    subContainer1: {flex: 1, flexDirection: 'row', alignItems: 'center'},
    profile: {
      paddingHorizontal: 16,
      flex: 1,
      justifyContent: 'space-evenly',
    },
    email: {marginTop: 12},
    swipeBtn: {paddingTop: 16},
  });
