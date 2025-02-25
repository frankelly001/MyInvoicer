import React, {FunctionComponent} from 'react';
import {View} from 'react-native';
import ErrorMessage from '../error-message';
import {AppFormFieldProps} from './type';

const AppFormField: FunctionComponent<AppFormFieldProps> = ({
  isError,
  errorMessage,
  style,
  children,
  errorTextAlign,
}) => {
  return (
    <View style={[{width: '100%'}, style]}>
      {children}
      <ErrorMessage
        error={isError}
        message={errorMessage}
        align={errorTextAlign}
      />
    </View>
  );
};

export default AppFormField;
