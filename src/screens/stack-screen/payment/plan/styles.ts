import {StyleSheet} from 'react-native';
import {COLORS_OBJECT_TYPES} from '../../../../config/const';

export const paymentPlanStyles = ({
  colors,
}: {colors?: COLORS_OBJECT_TYPES} = {}) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
    },
    payPlansContainer: {
      paddingHorizontal: 24,
      paddingBottom: 6,
    },
    description: {marginTop: 24, marginBottom: 32},
    contentContainer: {flex: 1, width: '100%'},
    scrollContainer: {paddingTop: 0}, //30
    titleContainer: {paddingTop: 18, paddingHorizontal: 32},
    mb8: {
      marginBottom: 8,
    },
    mb16: {
      marginBottom: 16,
    },
    mb4: {
      marginBottom: 4,
    },
    info: {
      marginBottom: 12,
    },
    mv6: {marginVertical: 6},
    payOffer: {flexDirection: 'row', alignItems: 'center'},
    offers: {
      padding: 24,
      backgroundColor: colors?.neutral_light_2,
      borderRadius: 16,
      marginTop: 32,
    },
    offerTitle: {paddingHorizontal: 12},
    subBtnContainer: {width: '100%', padding: 24},
  });

export const payPlanCardStyles = ({
  colors,
  selected,
}: {colors?: COLORS_OBJECT_TYPES; selected?: boolean} = {}) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      padding: 16,
      alignItems: 'center',
      backgroundColor: selected ? colors?.highlight_1 : 'transparent',
      borderColor: selected ? colors?.highlight_1 : colors?.neutral_light_4,
      borderWidth: 0.5,
      borderRadius: 16,
    },
    mv6: {marginVertical: 6},
    titleContainer: {paddingHorizontal: 12, flex: 1},
    h100: {
      height: '100%',
    },
    mt4: {marginTop: 4},
    priceContainer: {
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      flex: 1,
    },
    recommendedIcon: {position: 'absolute', right: -10, top: -10},
  });
