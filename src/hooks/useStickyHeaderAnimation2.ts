/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useMemo, useRef} from 'react';
import {Animated} from 'react-native';

export const useStickyHeaderAnimation = (containerHeight: number) => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const offsetAnim = useRef(new Animated.Value(0)).current;
  const clampedScroll = Animated.diffClamp(
    Animated.add(
      scrollY.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
        extrapolateLeft: 'clamp',
      }),
      offsetAnim,
    ),
    0,
    containerHeight,
  );

  var clampedScrollValue = 0;
  var offSetvalue = 0;
  var scrollValue = 0;

  useEffect(() => {
    scrollY.addListener(({value}) => {
      const diff = value - scrollValue;
      scrollValue = value;

      clampedScrollValue = Math.min(
        Math.max(clampedScrollValue * diff, 0),
        containerHeight,
      );
    });

    offsetAnim.addListener(({value}) => {
      offSetvalue = value;
    });
  }, []);

  // eslint-disable-next-line no-undef-init
  var scrollEndTImer: string | number | NodeJS.Timeout | undefined = undefined;

  const onMomentumScrollBegin = () => {
    clearTimeout(scrollEndTImer);
  };

  const onMomentumScrollEnd = () => {
    const toValue =
      scrollValue > containerHeight && clampedScrollValue > containerHeight
        ? offSetvalue + containerHeight
        : offSetvalue - containerHeight;

    Animated.timing(offsetAnim, {
      toValue,
      duration: 1000, // 500
      useNativeDriver: true,
    }).start();
  };

  const translateY = clampedScroll.interpolate({
    inputRange: [0, containerHeight],
    outputRange: [0, -containerHeight],
    extrapolate: 'clamp',
  });

  const onScrollEndDrag = () => {
    scrollEndTImer = setTimeout(onMomentumScrollEnd, 500); // 250
  };

  const onScroll = Animated.event(
    [{nativeEvent: {contentOffset: {y: scrollY}}}],
    {
      useNativeDriver: true,
    },
  );

  return useMemo(
    () => ({
      translateY,
      onMomentumScrollBegin,
      onMomentumScrollEnd,
      onScrollEndDrag,
      onScroll,
    }),
    [],
  );
};
