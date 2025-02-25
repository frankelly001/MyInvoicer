/* eslint-disable react-hooks/exhaustive-deps */
import {useMemo, useRef} from 'react';
import {Animated} from 'react-native';

export const useStickyHeaderAnimation = (containerHeight: number) => {
  const scrollY = useRef(new Animated.Value(0)).current;

  const translateY = scrollY.interpolate({
    inputRange: [0, containerHeight],
    outputRange: [0, -containerHeight],
    extrapolate: 'clamp',
  });

  const onScroll = Animated.event(
    [{nativeEvent: {contentOffset: {y: scrollY}}}],
    {
      useNativeDriver: false,
    },
  );

  return useMemo(
    () => ({
      translateY,
      onScroll,
      setTranslateY: (num: number) => scrollY.setValue(num),
    }),
    [],
  );
};
