// import AnimatedLottieView from 'lottie-react-native';
import React, {FunctionComponent} from 'react';
import {Platform, TouchableOpacity, View} from 'react-native';
import Toast, {
  ToastConfig,
  ToastConfigParams,
} from 'react-native-toast-message';
import {
  CloseIcon,
  ErrorIcon,
  InfoIcon,
  SuccessIcon,
  WarningIcon,
} from '../../assets/svg';
import {detectTouch} from '../../config/const';
import {useColors} from '../../hooks/useColors';
import AppText from '../app-text';
import {appToastViewStyles} from './styles';
import {appToastViewProps, toastTypeProps} from './types';

export const toastTypes: {[key in toastTypeProps]: toastTypeProps} = {
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
  WARNING: 'WARNING',
  INFO: 'INFO',
};

const IconSources = {
  [toastTypes.SUCCESS]: <SuccessIcon />,
  [toastTypes.WARNING]: <WarningIcon />,
  [toastTypes.ERROR]: <ErrorIcon />,
  [toastTypes.INFO]: <InfoIcon />,
};

const AppToastView: FunctionComponent<appToastViewProps> = ({
  message,
  title = 'Title',
  type = 'INFO',
  onHide,
}) => {
  const colors = useColors();

  const toastColors = {
    [toastTypes.SUCCESS]: colors.support_sucess_1,
    [toastTypes.ERROR]: colors.support_error_1,
    [toastTypes.WARNING]: colors.support_warning_1,
    [toastTypes.INFO]: colors.highlight_1,
  };

  return (
    <View style={appToastViewStyles().container}>
      <View
        style={[
          appToastViewStyles().toast,
          {backgroundColor: toastColors[type]},
        ]}>
        {IconSources[type]}
        <View style={appToastViewStyles().textContainer}>
          <AppText
            text={title}
            type={'heading_h5'}
            color={'neutral_dark_5'}
            style={appToastViewStyles().title}
          />
          <AppText text={message} type={'body_s'} color={'neutral_dark_5'} />
        </View>
        <TouchableOpacity
          hitSlop={detectTouch}
          style={appToastViewStyles().hideBtn}
          onPress={onHide}>
          <CloseIcon fill={colors.neutral_dark_2} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const showToast = (
  toastType: toastTypeProps,
  {message, title}: {title: string | undefined; message: string | undefined},
) => {
  return Toast.show({
    type: 'appToast',
    text1: title,
    text2: message,
    props: {toastType},
  });
};

const toastConfig: ToastConfig = {
  appToast: (obj: ToastConfigParams<any>) => {
    const {text2, text1, props, hide} = obj;

    return (
      <AppToastView
        message={text2}
        title={text1}
        type={props.toastType}
        onHide={hide}
      />
    );
  },
};

const AppToast: FunctionComponent = () => {
  return (
    <Toast config={toastConfig} topOffset={Platform.OS === 'ios' ? 70 : 5} />
  );
};

export default AppToast;
