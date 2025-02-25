import React, {FunctionComponent, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {
  AppButton,
  AppLoading,
  AppOtpInput,
  AppScreen,
  AppText,
} from '../../../../components';
import {detectTouch} from '../../../../config/const';
import {useColors} from '../../../../hooks/useColors';
import {verifyStyles} from './styles';
import {AuthScreenProps} from '../../../../navigation/auth-stack/type';
import {useVerifyEmailApiMutation} from '../../../../state/services/auth/api';
import {showToast} from '../../../../components/app-toast';
import {useResponseHandler} from '../../../../hooks/useRequestHandler';

const Verify: FunctionComponent<AuthScreenProps<'VERIFY'>> = ({
  navigation,
  route,
}) => {
  const colors = useColors();
  const [pin, setPin] = useState('');

  const [verifyEmail, {isError, isSuccess, reset, isLoading}] =
    useVerifyEmailApiMutation();

  useResponseHandler({
    success: {
      value: isSuccess,
      trigger: () => {
        showToast('SUCCESS', {
          message: 'Account verify successfully',
          title: 'Your account have been verified successfully',
        });
        navigation.replace('SIGNIN');
      },
    },
    error: {
      value: isError,
      trigger: () => {
        showToast('ERROR', {
          message: 'Error encounted!',
          title: 'Verification Failed',
        });
      },
    },
    reset,
  });

  const submit = async (filledCode: string) => {
    if (route.params.accountID && filledCode?.length === 6) {
      await verifyEmail({
        verifyEmail: {
          id: route?.params?.accountID,
          emailCode: Number(filledCode),
        },
      }).unwrap();
    }
  };

  return (
    <AppScreen>
      <AppLoading visible={isLoading} />
      <View style={verifyStyles({colors}).container}>
        <AppText
          text={'Enter confirmation code'}
          type="heading_h3"
          align="center"
          style={verifyStyles().mb8}
        />
        <AppText
          text={`A 6-digit code was sent to ${route?.params?.email}`}
          type="body_s"
          color="neutral_dark_2"
          style={verifyStyles().info}
          align={'center'}
        />

        <AppOtpInput
          pinCount={6}
          pin={pin}
          onCodeChanged={code => setPin(code)}
          onCodeFilled={filledCode => submit(filledCode)}
          autoFocusOnLoad
        />

        <TouchableOpacity hitSlop={detectTouch} style={verifyStyles().resend}>
          <AppText text={'Resend code'} type="action_m" color="highlight_5" />
        </TouchableOpacity>

        <AppButton text="Continue" onPress={() => submit(pin)} />
      </View>
    </AppScreen>
  );
};

export default Verify;
