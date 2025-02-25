import {StyleSheet} from 'react-native';
import {COLORS_OBJECT_TYPES} from '../../../../../config/const';
import {generateShadow} from '../../../../../utils/helpers/generateShadow';

export const previewInvoicestyles = ({
  colors,
}: {colors?: COLORS_OBJECT_TYPES} = {}) =>
  StyleSheet.create({
    submitBtn: {
      paddingHorizontal: 24,
      paddingBottom: 16,
      paddingTop: 30,
      borderTopWidth: 0.5,
      borderColor: colors?.neutral_light_4,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 16,
    },
    pdfView: {
      backgroundColor: colors?.neutral_light_1,
      flex: 1,
      padding: 10,
      alignItems: 'center',
      justifyContent: 'center',

      ...generateShadow({depth: 3}),
    },
    appAlert: {marginTop: 0},
    flex1: {flex: 1},
    icon: {marginRight: -4},
    btn: {flex: 1},
  });
