import React, {FunctionComponent} from 'react';
import AppTextInput from '../app-text-input';
import {AppTextInputProps} from '../app-text-input/type';
import {appTextAreaStyles} from './styles';

const AppTextarea: FunctionComponent<AppTextInputProps> = ({
  ...appTextInputProps
}) => {
  return (
    <AppTextInput
      underlineColorAndroid="transparent"
      numberOfLines={10}
      multiline={true}
      inputStyle={appTextAreaStyles.input}
      inputContainerStyle={appTextAreaStyles.container}
      {...appTextInputProps}
    />
  );
};

export default AppTextarea;
