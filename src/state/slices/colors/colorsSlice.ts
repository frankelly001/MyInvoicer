import {createSlice} from '@reduxjs/toolkit';
import {dark_mode_colors, light_mode_colors} from '../../../config/colors';
import {COLORS_OBJECT_TYPES, COLOR_MODE_TYPES} from '../../../config/const';
import {ColorsState} from './types';
import {Appearance} from 'react-native';

const initialState: ColorsState = {
  mode: 'custom',
  colors:
    Appearance.getColorScheme() === 'dark'
      ? dark_mode_colors
      : light_mode_colors,
};

export const colorsSlice = createSlice({
  name: 'colors',
  initialState,
  reducers: {
    setColorMode: (
      state: {colors: COLORS_OBJECT_TYPES; mode: COLOR_MODE_TYPES},
      action: {payload: COLOR_MODE_TYPES},
    ) => {
      state.mode = !action.payload
        ? Appearance.getColorScheme() || 'light'
        : action.payload;
      state.colors =
        ((!action.payload || action.payload === 'custom') &&
          Appearance.getColorScheme() === 'dark') ||
        action.payload === 'dark'
          ? dark_mode_colors
          : light_mode_colors;
    },
  },
});

export const {setColorMode} = colorsSlice.actions;
export default colorsSlice.reducer;
