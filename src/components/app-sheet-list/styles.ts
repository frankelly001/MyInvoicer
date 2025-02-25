import {StyleSheet} from 'react-native';
import {COLORS_OBJECT_TYPES} from '../../config/const';

export const appSheetListStyle = ({
  colors,
}: {colors?: COLORS_OBJECT_TYPES} = {}) =>
  StyleSheet.create({
    modal: {
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      backgroundColor: colors?.neutral_light_1,
    },
    modalContainer: {
      paddingBottom: 24,
      paddingHorizontal: 16,
      borderRadius: 20,
      flex: 1,
    },
    modalHeader: {
      flexDirection: 'row',
      paddingTop: 26,
      paddingBottom: 16,
      justifyContent: 'space-between',
    },
    overLay: {backgroundColor: 'rgba(0, 0, 0, 0.7)'},
    headerContainer: {
      paddingHorizontal: 16,
    },
    footer: {height: 40},
  });
