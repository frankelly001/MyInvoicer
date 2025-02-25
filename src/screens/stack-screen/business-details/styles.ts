import {StyleSheet} from 'react-native';
import {COLORS_OBJECT_TYPES, SCREEN_WIDTH} from '../../../config/const';

export const businessDetailsStyles = ({
  colors,
}: {colors?: COLORS_OBJECT_TYPES} = {}) =>
  StyleSheet.create({
    sectionContainer: {
      flex: 1,
      width: SCREEN_WIDTH,
      paddingHorizontal: 16,
    },
    profileContainer: {padding: 16},
    imgContainer: {
      padding: 12,
      backgroundColor: colors?.highlight_1,
      alignItems: 'center',
      borderRadius: 12,
    },
    tabSwitcher: {paddingVertical: 8, paddingHorizontal: 18},

    submitBtn: {
      paddingHorizontal: 16,
      paddingBottom: 16,
      paddingTop: 30,
      borderTopWidth: 0.5,
      borderColor: colors?.neutral_light_4,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    btn: {flex: 1, marginHorizontal: 8},
    detailContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 16,
      borderColor: colors?.neutral_light_3,
    },
  });

export const settingsSheetStyles = ({}: {colors?: COLORS_OBJECT_TYPES} = {}) =>
  StyleSheet.create({
    inputFields: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      paddingHorizontal: 5,
      marginTop: 24,
    },
    mb16: {
      marginBottom: 16,
    },
    submit: {
      marginTop: 8,
      marginBottom: 16,
    },
  });
