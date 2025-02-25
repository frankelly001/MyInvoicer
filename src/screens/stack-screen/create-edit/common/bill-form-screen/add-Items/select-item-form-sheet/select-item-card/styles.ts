import {StyleSheet} from 'react-native';
import {COLORS_OBJECT_TYPES} from '../../../../../../../../config/const';

export const selectItemCardStyles = ({
  colors,
  isSelected,
}: {colors?: COLORS_OBJECT_TYPES; isSelected?: boolean} = {}) =>
  StyleSheet.create({
    container: {
      padding: 16,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: colors?.[isSelected ? 'highlight_1' : 'transparent'],
      borderColor: colors?.[isSelected ? 'highlight_1' : 'neutral_light_5'],
      borderRadius: 12,
      borderWidth: 0.5,
      gap: 16,
    },
    subContainer: {gap: 8},
    itemDetails: {
      flexDirection: 'row',
      alignItems: 'center',
      columnGap: 6,
    },
    details: {flex: 1},
    actionBtn: {
      padding: 10,
      borderRadius: 26,
      backgroundColor: colors?.highlight_1,
    },
    quantity: {
      paddingVertical: 6,
      paddingHorizontal: 4,
    },
    priceSumContainer: {alignItems: 'flex-end'},
  });
