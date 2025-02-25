import {StyleSheet} from 'react-native';
import {COLORS_OBJECT_TYPES} from '../../../../config/const';

export const oboardingStyles = ({
  colors,
}: {colors?: COLORS_OBJECT_TYPES} = {}) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors?.neutral_light_1,
      height: '100%',
    },
    onBoard: {
      backgroundColor: colors?.highlight_1,
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    subContainer: {
      padding: 24,
      paddingBottom: 40,
      alignItems: 'center',
      justifyContent: 'center',
    },
    description: {
      paddingVertical: 16,
      paddingHorizontal: 8,
      alignItems: 'center',
      marginBottom: 32,
    },
    subText: {paddingTop: 24},
  });
