/* eslint-disable react/no-unstable-nested-components */
import React, {FunctionComponent} from 'react';
import {View} from 'react-native';
import {
  AppButton,
  AppLoading,
  AppScreen,
  AppText,
  AppTextInput,
  AuthNavHelper,
} from '../../../../components';
import {useColors} from '../../../../hooks/useColors';
import {forgotPasswordStyles} from './styles';
import {forgetPasswordSchema, forgotPasswordSchemaType} from './shema';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {useSendPasswordResetCodeApiMutation} from '../../../../state/services/auth/api';
import {FormFieldController} from '../../../../components/form-field-controller';
import {useResponseHandler} from '../../../../hooks/useRequestHandler';
import {showToast} from '../../../../components/app-toast';
import {GeneralScreenProps} from '../../../../navigation/types';

const ForgotPassword: FunctionComponent<
  GeneralScreenProps<'FORGOT_PASSWORD'>
> = ({navigation}) => {
  const colors = useColors();

  const {handleSubmit, control} = useForm<forgotPasswordSchemaType>({
    defaultValues: {email: ''},
    resolver: zodResolver(forgetPasswordSchema),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });

  const styles = forgotPasswordStyles({colors});

  const [sendResetCode, {isLoading, isError, isSuccess, reset, data}] =
    useSendPasswordResetCodeApiMutation();

  useResponseHandler({
    success: {
      value: isSuccess,
      trigger: () => {
        showToast('SUCCESS', {
          message: 'Reset code',
          title: data?.message,
        });
        navigation.goBack();
      },
    },
    error: {
      value: isError,
      trigger: () => {
        showToast('ERROR', {
          message: 'Error encounted!',
          title: 'error',
        });
      },
    },
    reset,
  });

  const submit = (values: forgotPasswordSchemaType) => {
    sendResetCode({
      sendPasswordResetCode: values,
    });
  };

  return (
    <AppScreen isScrollable={false}>
      <AppLoading visible={isLoading} />
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <AppText
            text={'Forgot Password'}
            type="heading_h1"
            style={styles.mb8}
          />
          <AppText
            text={
              'Enter your email and we will send a link to reset your password.'
            }
            type="body_s"
            color="neutral_dark_2"
            style={styles.info}
          />
          <FormFieldController
            name={'email'}
            control={control}
            style={styles.mv12}
            Field={({value, onChange}) => (
              <AppTextInput
                label={'Email Address'}
                placeholder={'name@email.com'}
                value={value}
                onChangeText={text => onChange(text)}
              />
            )}
          />
        </View>

        <AppButton
          text="Done"
          onPress={handleSubmit(submit)}
          style={styles.mv12}
        />
        <AuthNavHelper authType="sign_up" />
      </View>
    </AppScreen>
  );
};

export default ForgotPassword;
