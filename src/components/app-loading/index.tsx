import AnimatedLottieView from 'lottie-react-native';
import React, {FunctionComponent} from 'react';
import {View} from 'react-native';
import AppModalOverlay from '../app-modal-overlay';
import {appLoadingStyles} from './styles';
import {AppLoadinTypes} from './type';

const AppLoading: FunctionComponent<AppLoadinTypes> = ({
  extraLoadingStyles,
  visible = true,
  loadingIcon = require('../../assets/svg/animated/invoice.json'),
}) => {
  return (
    <AppModalOverlay visible={visible}>
      <View style={[appLoadingStyles.container, extraLoadingStyles]}>
        <AnimatedLottieView
          style={appLoadingStyles.lottie}
          autoPlay
          loop
          source={loadingIcon}
        />
      </View>
    </AppModalOverlay>
  );
};

export default AppLoading;
