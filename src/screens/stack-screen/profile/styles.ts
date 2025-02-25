import {StyleSheet} from 'react-native';
import {COLORS_OBJECT_TYPES, wp} from '../../../config/const';

export const settingsStyles = ({colors}: {colors?: COLORS_OBJECT_TYPES} = {}) =>
  StyleSheet.create({
    optionsContainer: {paddingHorizontal: 16},
    profileIcon: {
      position: 'absolute',
      backgroundColor: colors?.highlight_4,
      width: wp(28),
      height: wp(28),
      borderRadius: wp(28) / 2,
      alignItems: 'center',
      justifyContent: 'center',
      bottom: 0,
      right: 0,
    },
    profileDetailsContainer: {marginVertical: 16},
    email: {marginTop: 4},
    profileContainer: {
      paddingHorizontal: 16,
      paddingTop: 8,
      alignItems: 'center',
    },
  });

export const bottomSheetStyle = ({
  colors,
}: {colors?: COLORS_OBJECT_TYPES} = {}) =>
  StyleSheet.create({
    profileModal: {backgroundColor: 'transparent'},
    profileModalContainer: {
      paddingVertical: 24,
      paddingHorizontal: 20,
      paddingBottom: 50,
      backgroundColor: colors?.neutral_light_1,
      borderRadius: 20,
    },
    mb8: {marginBottom: 8},
    bankCard: {
      borderWidth: 0.5,
      borderStyle: 'dashed',
      padding: 10,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 8,
      marginVertical: 8,
      borderColor: colors?.neutral_light_5,
    },
    detailCard: {
      borderBottomWidth: 0.5,
      flexDirection: 'row',
      padding: 16,
      alignItems: 'center',
      justifyContent: 'space-between',
      borderColor: colors?.neutral_light_5,
    },
  });

export const importSheetStyles = ({
  colors,
}: {colors?: COLORS_OBJECT_TYPES} = {}) =>
  StyleSheet.create({
    createItemBtnContainer: {flex: 1},
    createItem: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
    },
    createItemBtn: {
      borderWidth: 0.5,
      borderRadius: 12,
      marginVertical: 4,
      borderColor: colors?.neutral_light_5,
    },
    createItemSelected: {
      backgroundColor: colors?.highlight_1,
      borderColor: colors?.highlight_1,
    },
    itemTitle: {paddingHorizontal: 16, flex: 1},
  });
