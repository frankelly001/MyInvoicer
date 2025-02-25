import {StyleSheet} from 'react-native';
import {COLORS_OBJECT_TYPES} from '../../config/const';

export const appScreenStyles = ({
  colors,
}: {colors?: COLORS_OBJECT_TYPES} = {}) =>
  StyleSheet.create({
    flex1: {flex: 1},
    container: {overflow: 'hidden'},
    screenBackground: {backgroundColor: colors?.neutral_light_1},
  });
