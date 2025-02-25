import React, {FunctionComponent, ReactNode, memo, useRef} from 'react';
import {Animated, PanResponder} from 'react-native';
import {useColors} from '../../../hooks/useColors';
import {draggableStyles} from './styles';

const DraggableView: FunctionComponent<{children: ReactNode}> = ({
  children,
}) => {
  const colors = useColors();
  const pan: any = useRef(new Animated.ValueXY()).current;
  const styles = draggableStyles({
    colors,
    transform: pan.getTranslateTransform(),
  });
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}], {
        useNativeDriver: false,
      }),

      onPanResponderRelease: () => {
        // This is where you can add any additional logic after the view is released
        // For example, snapping to a grid or restricting to a certain area
        // For now, we just set the final position
        pan.flattenOffset();
      },
      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan?.x?.__getValue(),
          y: pan?.y?.__getValue(),
        });
        pan.setValue({x: 0, y: 0});
      },
    }),
  ).current;

  return (
    <Animated.View style={styles.container} {...panResponder.panHandlers}>
      {children}
    </Animated.View>
  );
};

export default memo(DraggableView);
