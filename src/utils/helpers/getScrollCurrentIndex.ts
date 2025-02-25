import {NativeScrollEvent, NativeSyntheticEvent} from 'react-native';

export const getScrollCurrentIndex = (
  event: NativeSyntheticEvent<NativeScrollEvent>,
) => {
  // width of the viewSize
  const viewSize = event.nativeEvent.layoutMeasurement.width;
  // get current position of the scrollview
  const contentOffset = event.nativeEvent.contentOffset.x;
  const currentIndex = Math.floor(contentOffset / viewSize);
  return currentIndex;
};
