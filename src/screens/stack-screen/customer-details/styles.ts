import {StyleSheet} from 'react-native';
import {COLORS_OBJECT_TYPES, SCREEN_WIDTH} from '../../../config/const';

export const customerDetailsStyles = ({
  colors,
}: {colors?: COLORS_OBJECT_TYPES} = {}) =>
  StyleSheet.create({
    sectionContainer: {
      flex: 1,
      width: SCREEN_WIDTH,
      paddingHorizontal: 16,
      backgroundColor: colors?.neutral_light_1,
    },
    tabSwitcher: {
      paddingVertical: 8,
      paddingHorizontal: 18,
      backgroundColor: colors?.neutral_light_1,
    },
    submitBtn: {
      paddingHorizontal: 16,
      paddingBottom: 16,
      paddingTop: 30,
      borderTopWidth: 0.5,
      borderColor: colors?.neutral_light_4,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    btn: {flex: 1, marginHorizontal: 8},
    profileBillContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 12,
      paddingBottom: 0,
    },
    billCard: {
      margin: 8,
    },
    profileBtnsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 14,
      paddingVertical: 12,
    },
    profileBtn: {flex: 1, margin: 4, height: undefined},
    detailContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 16,
      borderColor: colors?.neutral_light_3,
    },
  });
