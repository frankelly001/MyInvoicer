import {StyleSheet} from 'react-native';
import {COLORS_OBJECT_TYPES} from '../../../../config/const';

export const timeSheetFormStyles = ({
  colors,
}: {colors?: COLORS_OBJECT_TYPES} = {}) =>
  StyleSheet.create({
    mb16: {
      marginBottom: 16,
    },
    addItemSubmit: {
      flex: 1,
    },
    inputFields: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      paddingHorizontal: 6,
      rowGap: 16,
    },
    timeForm: {marginTop: 24, marginBottom: 16, paddingHorizontal: 6},
    mt24: {marginTop: 24},
    pv8: {paddingVertical: 8},
    handle: {
      top: 28,
      width: 48,
      height: 5,
      backgroundColor: colors?.highlight_1,
      alignSelf: 'center',
    },
    footerContanier: {
      flexDirection: 'row',
      paddingTop: 12,
      paddingBottom: 30,
      justifyContent: 'space-between',
      columnGap: 16,
      paddingHorizontal: 20,
    },
  });
