import {COLORS_OBJECT_TYPES} from './const';

export const colors = {
  transparent: 'transparent',
  highlight_1: '#EAF2FF',
  highlight_2: '#B4DBFF',
  highlight_3: '#6FBAFF',
  highlight_4: '#2897FF',
  highlight_5: '#3454D1',

  light_1: '#FFFFFF',
  light_2: '#F8F9FE',
  light_3: '#E8E9F1',
  light_4: '#D4D6DD',
  light_5: '#C5C6CC',

  dark_1: '#8F9098',
  dark_2: '#71727A',
  dark_3: '#494A50',
  dark_4: '#2F3036',
  dark_5: '#1F2024',

  dark_tranparent_1: '#949191a2',
  dark_tranparent_2: '#9491912d',
  dark_tranparent_3: '#1b1b1b7e',

  sucess_1: '#E7F4E8',
  sucess_2: '#3AC0A0',
  sucess_3: '#298267',

  warning_1: '#FFF4E4',
  warning_2: '#FFB37C',
  warning_3: '#E86339',

  error_1: '#FFE2E5',
  error_2: '#FF616D',
  error_3: '#ED3241',
  danger: '#ED3241',
};

export const light_mode_colors: COLORS_OBJECT_TYPES = {
  button: colors.light_1,
  transparent: colors.transparent,
  highlight_1: colors.highlight_1,
  highlight_2: colors.highlight_2,
  highlight_3: colors.highlight_3,
  highlight_4: colors.highlight_4,
  highlight_5: colors.highlight_5,

  neutral_light_1: colors.light_1,
  neutral_light_2: colors.light_2,
  neutral_light_3: colors.light_3,
  neutral_light_4: colors.light_4,
  neutral_light_5: colors.light_5,

  neutral_dark_1: colors.dark_1,
  neutral_dark_2: colors.dark_2,
  neutral_dark_3: colors.dark_3,
  neutral_dark_4: colors.dark_4,
  neutral_dark_5: colors.dark_5,

  dark_tranparent_1: colors.dark_tranparent_1,
  dark_tranparent_2: colors.dark_tranparent_2,
  dark_tranparent_3: colors.dark_tranparent_3,

  support_sucess_1: colors.sucess_1,
  support_sucess_2: colors.sucess_2,
  support_sucess_3: colors.sucess_3,

  support_warning_1: colors.warning_1,
  support_warning_2: colors.warning_2,
  support_warning_3: colors.warning_3,

  support_error_1: colors.error_1,
  support_error_2: colors.error_2,
  support_error_3: colors.error_3,
  danger: colors.danger,
};

export const dark_mode_colors: COLORS_OBJECT_TYPES = {
  button: colors.light_1,
  transparent: colors.transparent,
  highlight_1: colors.dark_4,
  highlight_2: colors.highlight_2,
  highlight_3: colors.highlight_3,
  highlight_4: colors.highlight_4,
  highlight_5: colors.highlight_5,

  neutral_light_1: colors.dark_5,
  neutral_light_2: colors.dark_4,
  neutral_light_3: colors.dark_3,
  neutral_light_4: colors.dark_2,
  neutral_light_5: colors.dark_1,

  neutral_dark_1: colors.light_5,
  neutral_dark_2: colors.light_4,
  neutral_dark_3: colors.light_3,
  neutral_dark_4: colors.light_2,
  neutral_dark_5: colors.light_1,

  dark_tranparent_1: colors.dark_tranparent_1,
  dark_tranparent_2: colors.dark_tranparent_2,
  dark_tranparent_3: colors.dark_tranparent_3,

  support_sucess_1: colors.sucess_3,
  support_sucess_2: colors.sucess_2,
  support_sucess_3: colors.sucess_1,

  support_warning_1: colors.warning_3,
  support_warning_2: colors.warning_2,
  support_warning_3: colors.warning_1,

  support_error_1: colors.error_3,
  support_error_2: colors.error_2,
  support_error_3: colors.error_1,
  danger: colors.danger,
};
