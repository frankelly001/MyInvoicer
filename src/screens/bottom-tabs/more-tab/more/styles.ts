import {StyleSheet} from 'react-native';
import {COLORS_OBJECT_TYPES, wp} from '../../../../config/const';

export const settingsStyles = ({colors}: {colors?: COLORS_OBJECT_TYPES} = {}) =>
  StyleSheet.create({
    headerRight: {flexDirection: 'row', gap: 24},
    otherContainer: {paddingTop: 0},
    profileCard: {
      marginHorizontal: 24,
      borderBottomWidth: 0.5,
      borderColor: colors?.neutral_light_4,
    },
    optionsContainer: {padding: 16},
    optionBtn: {
      paddingHorizontal: 10,
      marginHorizontal: 6,
      paddingVertical: 16,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderColor: colors?.neutral_light_4,
    },
    notification: {
      flexDirection: 'row',
      width: wp(18),
      height: wp(18),
      backgroundColor: colors?.support_error_3,
      position: 'absolute',
      top: -wp(8),
      right: -wp(5),
      borderRadius: wp(18) / 2,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
