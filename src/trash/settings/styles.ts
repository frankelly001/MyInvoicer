import {StyleSheet} from 'react-native';
import {
  COLORS_OBJECT_TYPES,
  HEADER_TITLE_HEIGHT,
  MAIN_HEADER_HEIGHT,
} from '../../../../config/const';

export const settingsStyles = ({colors}: {colors?: COLORS_OBJECT_TYPES} = {}) =>
  StyleSheet.create({
    container: {},
    screenTitle: {
      paddingVertical: 10,
      paddingHorizontal: 24,
    },
    profileLabelContainer: {
      paddingHorizontal: 16,
      marginTop: HEADER_TITLE_HEIGHT,
    },
    profileCard: {
      marginVertical: 8,
      marginHorizontal: 24,
      borderColor: colors?.neutral_light_4,
      backgroundColor: colors?.highlight_1,
    },
    optionsContainer: {padding: 16},
    othersContainer: {paddingTop: 0},
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
    contentContainer: {backgroundColor: colors?.highlight_1, top: 16},
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
