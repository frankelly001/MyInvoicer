import {StyleSheet} from 'react-native';
import {COLORS_OBJECT_TYPES} from '../../config/const';

export const customerBillCardStyles = ({
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
    profile: {
      paddingRight: 16,
      flex: 1,
      justifyContent: 'space-evenly',
    },
    email: {marginTop: 12},
    h100p: {
      height: '100%',
    },
    subContainer2Content: {
      flex: 1,
      alignItems: 'flex-end',
      justifyContent: 'space-between',
    },
    status: {
      paddingHorizontal: 8,
      paddingVertical: 6,
      borderRadius: 12,
      marginBottom: 8,
    },
    swipeBtn: {paddingTop: 16},
  });
