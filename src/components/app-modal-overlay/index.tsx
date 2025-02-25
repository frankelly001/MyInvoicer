import React, {FunctionComponent} from 'react';
import {Portal} from 'react-native-portalize';
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated';
import {useColorMode, useColors} from '../../hooks/useColors';
import {modalOverlayStyles} from './styles';
import {ModalOverlayProps} from './type';
import {StatusBar} from 'react-native';

const AppModalOverlay: FunctionComponent<ModalOverlayProps> = ({
  visible,
  children,
  modalStyle,
}) => {
  const colors = useColors();
  const {colorMode} = useColorMode();
  const mpdalViewStyle = useAnimatedStyle(() => {
    return {opacity: withTiming(visible ? 1 : 0)};
  }, [visible]);
  if (!visible) {
    return null;
  }

  return (
    <Portal>
      <StatusBar
        backgroundColor={colors?.dark_tranparent_3}
        barStyle={`${colorMode === 'light' ? 'dark' : 'light'}-content`}
      />
      <Animated.View
        style={[
          modalOverlayStyles({colors}).overlay,
          modalStyle,
          mpdalViewStyle,
        ]}>
        {children}
      </Animated.View>
    </Portal>
  );
};

export default AppModalOverlay;
