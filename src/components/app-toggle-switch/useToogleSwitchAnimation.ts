import {useEffect, useState} from 'react';
import {Animated, I18nManager} from 'react-native';
import {OnTogglePress} from './type';

export const useToogleSwitchAnimation = ({
  isOn,
  animationSpeed,
  useNativeDriver,
  onToggle,
  dimensions,
}: {
  isOn: boolean;
  animationSpeed: number;
  useNativeDriver: boolean;
  onToggle?: OnTogglePress;
  dimensions: {
    width: number;
    padding: number;
    circleWidth: number;
    circleHeight: number;
    translateX: number;
  };
}) => {
  const [offsetX] = useState(new Animated.Value(0));

  useEffect(() => {}, []);

  const _handleToggleSwitch = () => {
    let toValue;
    if (!I18nManager.isRTL && !isOn) {
      toValue = dimensions.width - dimensions.translateX;
    } else if (I18nManager.isRTL && !isOn) {
      toValue = -dimensions.width + dimensions.translateX;
    } else {
      toValue = -1;
    }

    Animated.timing(offsetX, {
      toValue,
      duration: animationSpeed,
      useNativeDriver,
    }).start();

    if (onToggle) {
      onToggle(!isOn);
    }
  };

  return {offsetX, _handleToggleSwitch};
};
