import React, {FunctionComponent} from 'react';
import AppText from '../app-text';
import {errorMessageStyles} from './styles';
import {errorMsgProps} from './type';

const ErrorMessage: FunctionComponent<errorMsgProps> = ({
  error,
  message,
  align,
}) => {
  if (!error) {
    return null;
  }

  return (
    <AppText
      text={message}
      type={'body_xs'}
      color="support_error_2"
      align={align}
      style={errorMessageStyles.text}
    />
  );
};

export default ErrorMessage;
