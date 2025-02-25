import {StyleSheet} from 'react-native';
import {COLORS_OBJECT_TYPES} from '../../config/const';

export const invoiceCardStyles = ({
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
    subContainer1: {flex: 1},
    invoiceId: {marginVertical: 8},
    subContainer2: {
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
    },
  });
