import {StyleSheet} from 'react-native';
import {COLORS_OBJECT_TYPES} from '../config/const';

export const styleSheet = (
  styles: (params: {
    colors?: COLORS_OBJECT_TYPES;
    otherProps?: any;
  }) => StyleSheet.NamedStyles<any>,
) => StyleSheet.create(styles);
// const a = styleSheet(() => {
//   a: {

//   }
// });

// export const styleSheet = (
//     styles: (
//       colors?: COLORS_OBJECT_TYPES,
//       otherProps?: any,
//     ) => StyleSheet.NamedStyles<any>,
//   ) => StyleSheet.create(styles({colors, ...otherProps}));
