import {StyleSheet} from 'react-native';
import {COLORS_OBJECT_TYPES} from '../../config/const';

export const appChartFilterBtnStyles = ({
  colors,
}: {colors?: COLORS_OBJECT_TYPES} = {}) =>
  StyleSheet.create({
    optionsContainer: {
      flex: 1,
      paddingVertical: 8,
    },
    optionItem: {
      alignItems: 'center',
      paddingVertical: 8,
      paddingHorizontal: 16,

      marginVertical: 8,
      borderRadius: 8,
      borderWidth: 0.5,
      borderStyle: 'dashed',
      borderColor: colors?.neutral_light_5,
    },
    itemTitle: {marginBottom: 8},
  });
