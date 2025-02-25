import {StyleSheet} from 'react-native';
import {colors} from '../../config/colors';
import {COLORS_OBJECT_TYPES} from '../../config/const';
import {generateShadow} from '../../utils/helpers/generateShadow';

export const bottomTabStyles = ({}: {colors?: COLORS_OBJECT_TYPES} = {}) =>
  StyleSheet.create({
    createTabBtn: {
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
      borderRadius: 50,
      backgroundColor: colors?.highlight_5,
      ...generateShadow({depth: 8, color: colors?.highlight_5}),
    },
    tabBtnContainer: {flex: 1, alignSelf: 'center'},
  });
