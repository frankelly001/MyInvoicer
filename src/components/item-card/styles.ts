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
      paddingVertical: 12,
      backgroundColor: colors?.neutral_light_1,
    },
    selectIcon: {paddingRight: 16},
    subContainer1: {flex: 1, flexDirection: 'row', alignItems: 'center'},
    listNum: {paddingRight: 16},
    profile: {
      paddingRight: 16,
      flex: 1,
      justifyContent: 'space-evenly',
    },
    email: {marginTop: 12},

    swipeBtn: {paddingTop: 15},
  });
