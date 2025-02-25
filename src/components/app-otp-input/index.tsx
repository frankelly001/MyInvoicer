import React, {FunctionComponent} from 'react';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {otpInputStyles} from './styles';
import {OtpProps} from './type';
import {useColors} from '../../hooks/useColors';

const AppOtpInput: FunctionComponent<OtpProps> = ({
  pin,
  pinCount = 6,
  onCodeFilled,
  ref,
  onCodeChanged,
  clearInputs = false,
  autoFocusOnLoad = true,
}) => {
  const colors = useColors();
  return (
    <>
      <OTPInputView
        secureTextEntry={false}
        ref={ref}
        style={otpInputStyles().input}
        pinCount={pinCount}
        codeInputFieldStyle={otpInputStyles({colors}).codeInputField}
        codeInputHighlightStyle={otpInputStyles({colors}).codeInputHighlight}
        selectionColor={colors.neutral_dark_5}
        onCodeChanged={onCodeChanged}
        onCodeFilled={onCodeFilled}
        autoFocusOnLoad={autoFocusOnLoad}
        clearInputs={clearInputs}
        code={pin}
        editable={true}
      />
    </>
  );
};

export default AppOtpInput;
