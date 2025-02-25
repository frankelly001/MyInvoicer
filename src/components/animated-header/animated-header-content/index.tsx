import React, {FunctionComponent, ReactNode} from 'react';
import {Animated, FlexAlignType, StyleSheet, ViewStyle} from 'react-native';
import {HEADER_SEARCH_HEIGHT, HEADER_TITLE_HEIGHT} from '../../../config/const';

const AnimatedHeaderContent: FunctionComponent<{
  translateY?: number | Animated.AnimatedInterpolation<string | number>;
  children: ReactNode;
  containerStyle?: ViewStyle;
  alignItems?: FlexAlignType;
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
    | undefined;
}> = ({
  translateY = 0,
  children,
  containerStyle,
  alignItems = 'center',
  justifyContent = 'center',
}) => {
  const animatedStyle = StyleSheet.create([
    {
      width: '100%',
      height: '100%',
      alignItems,
      justifyContent,
      top: -(HEADER_TITLE_HEIGHT + HEADER_SEARCH_HEIGHT),
      ...containerStyle,
    },
    {
      transform: [{translateY: Animated.multiply(translateY, -1)}],
    },
  ]);
  return <Animated.View style={animatedStyle}>{children}</Animated.View>;
};

export default AnimatedHeaderContent;

// const AnimatedHeaderContent: FunctionComponent<{
//   translateY?: number | Animated.AnimatedInterpolation<string | number>;
//   children: ReactNode;
//   containerStyle?: ViewStyle;
//   alignItems?: FlexAlignType;
//   justifyContent?:
//     | 'flex-start'
//     | 'flex-end'
//     | 'center'
//     | 'space-between'
//     | 'space-around'
//     | 'space-evenly'
//     | undefined;
// }> = ({
//   translateY = 0,
//   children,
//   containerStyle,
//   alignItems = 'center',
//   justifyContent = 'center',
// }) => {
//   const animatedStyle = StyleSheet.create([
//     {
//       width: '100%',
//       height: '100%',
//       alignItems,
//       justifyContent,
//       top: HEADER_TITLE_HEIGHT + HEADER_SEARCH_HEIGHT,
//       ...containerStyle,
//     },
//     {
//       transform: [{translateY: Animated.multiply(translateY, 1)}],
//     },
//   ]);
//   return <Animated.View style={animatedStyle}>{children}</Animated.View>;
// };
