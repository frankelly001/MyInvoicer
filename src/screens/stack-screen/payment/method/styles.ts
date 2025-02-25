import {StyleSheet} from 'react-native';
import {COLORS_OBJECT_TYPES, SCREEN_HEIGHT} from '../../../../config/const';

export const paymentMethodStyles = ({
  colors,
}: {colors?: COLORS_OBJECT_TYPES} = {}) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
    },
    contentContainer: {flex: 1, width: '100%'},

    titleContainer: {padding: 24},
    mb8: {
      marginBottom: 8,
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
      paddingHorizontal: 24,
      paddingVertical: 8,
      backgroundColor: colors?.neutral_light_2,
      borderRadius: 16,
      marginTop: 32,
    },
    offerTitle: {paddingHorizontal: 12},
    subBtnContainer: {
      width: '100%',
      padding: 24,
      paddingBottom: 10,

      borderTopWidth: 0.7,
      borderColor: colors?.neutral_light_4,
    },
  });

export const payMethodCardStyles = ({
  colors,
  selected,
}: {colors?: COLORS_OBJECT_TYPES; selected?: boolean} = {}) =>
  StyleSheet.create({
    container: {},
  });
