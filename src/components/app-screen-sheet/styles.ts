import {StyleSheet} from 'react-native';
import {COLORS_OBJECT_TYPES, isIOS, SCREEN_HEIGHT} from '../../config/const';

export const appScreenSheetStyles = ({
  colors,
}: {colors?: COLORS_OBJECT_TYPES} = {}) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors?.neutral_light_1,
      flex: 1,
      height: SCREEN_HEIGHT * 0.95,
      paddingBottom: isIOS ? 20 : 50,
    },
    modal: {backgroundColor: colors?.neutral_light_1, flex: 1},
    headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 20,
    },
    header: {flex: 1},
    closeBtn: {
      position: 'absolute',
      right: 24,
      justifyContent: 'center',
    },
    contentContainer: {padding: 16, flex: 1},
  });
