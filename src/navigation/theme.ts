import {DefaultTheme, Theme} from '@react-navigation/native';
import {COLORS_OBJECT_TYPES} from '../config/const';

export const navigationTheme = ({
  colors,
}: {
  colors: COLORS_OBJECT_TYPES;
}): Theme => ({
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.highlight_5,
    background: colors.neutral_light_1,
  },
});
