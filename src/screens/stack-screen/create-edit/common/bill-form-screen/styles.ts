import {StyleSheet} from 'react-native';
import {COLORS_OBJECT_TYPES, SCREEN_WIDTH} from '../../../../../config/const';

export const createInvoicestyles = ({}: {colors?: COLORS_OBJECT_TYPES} = {}) =>
  StyleSheet.create({
    mb16: {
      marginBottom: 16,
    },
    addItemSubmit: {
      marginTop: 8,
      marginBottom: 16,
    },
    deleteBtn: {
      marginLeft: 16,
    },
    pv0: {paddingVertical: 0},
    sectionContainer: {
      flex: 1,
      paddingHorizontal: 16,
      width: SCREEN_WIDTH,
      paddingVertical: 16,
    },
    fieldContainer: {
      rowGap: 16,
    },
    mt16: {marginTop: 16},
    addItemHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 8,
      paddingVertical: 16,
    },
    inputFields: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      rowGap: 16,
    },
    fieldTitleContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    fieldTitleBtn: {flexDirection: 'row', alignItems: 'center'},
    ml5: {marginLeft: 5},
    footer: {
      paddingHorizontal: 16,
      paddingBottom: 16,
      paddingTop: 12,
      rowGap: 16,
    },
    submitBtns: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      columnGap: 16,
    },
    previewBtn: {
      paddingHorizontal: 16,
      paddingTop: 24,
      paddingBottom: 16,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    priceSum: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 12,
      paddingVertical: 8,
    },
    btn: {flex: 1},
    addedItemContainer: {
      paddingVertical: 16,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 8,
    },
    addedItemPrice: {alignItems: 'flex-end'},
    addedItemDetails: {flex: 1},
    mt24: {marginTop: 24},
    delAddContainer: {
      borderColor: 'transparent',
    },
  });
