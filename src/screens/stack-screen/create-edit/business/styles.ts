import {StyleSheet} from 'react-native';
import {COLORS_OBJECT_TYPES} from '../../../../config/const';

export const accountSettingsStyles = ({
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
    },

    mb16: {
      marginBottom: 16,
    },
    contentContainer: {
      paddingVertical: 16,
      paddingHorizontal: 24,
      gap: 16,
      paddingBottom: 30,
    },
  });
