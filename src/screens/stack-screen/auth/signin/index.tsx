/* eslint-disable react/no-unstable-nested-components */
import React, {FunctionComponent} from 'react';
import {useForm} from 'react-hook-form';
import {TouchableOpacity, View} from 'react-native';
import {AppleIcon, GoogleIcon} from '../../../../assets/svg';
import {
  AppButton,
  AppLoading,
  AppScreen,
  AppText,
  AppTextInput,
  AuthNavHelper,
} from '../../../../components';
import {routesNames} from '../../../../navigation/routes';
import {useColors} from '../../../../hooks/useColors';
import {SigninSchemaType, signinSchema} from './schema';
import {signinStyles} from './styles';
import {zodResolver} from '@hookform/resolvers/zod';
import {FormFieldController} from '../../../../components/form-field-controller';
import {useSignin} from './useSignin';
import {AuthScreenProps} from '../../../../navigation/auth-stack/type';
import {TextInputFields} from '../../../../types/Fields';

const inputFields: TextInputFields<SigninSchemaType> = [
  {
    name: 'email',
    label: 'Email Address',
    placeholder: 'name@email.com',
    type: 'text',
    textContentType: 'emailAddress',
  },
  {
    name: 'password',
    label: 'Password',
    placeholder: 'Enter password',
    type: 'text',
    textContentType: 'password',
  },
];

const Signin: FunctionComponent<AuthScreenProps<'SIGNIN'>> = ({navigation}) => {
  const colors = useColors();
  const styles = signinStyles({colors});
  const {handleSubmit, control} = useForm<SigninSchemaType>({
    // defaultValues: {
    //   email: 'fetiyih764@roborena.com',
    //   password: 'fetiyih764@roborena.com',
    // },
    resolver: zodResolver(signinSchema),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });

  const {isLoading, submit} = useSignin();

  const socialAuthBtns = [
    {
      title: 'Continue with Google',
      style: styles.mb16,
      Icon: <GoogleIcon fill={colors.neutral_dark_5} />,
    },
    {
      title: 'Continue with Apple',
      Icon: <AppleIcon fill={colors.neutral_dark_5} />,
    },
  ];
  return (
    <AppScreen>
      <AppLoading visible={isLoading} />
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <AppText text={'Welcome!'} type="heading_h1" style={styles.mb24} />
          {socialAuthBtns.map(item => (
            <AppButton
              key={item.title}
              text={item.title}
              textColor="neutral_dark_1"
              LeftView={<View style={styles.socialIcon}>{item.Icon}</View>}
              borderWidth={1.5}
              buttonColor="transparent"
              borderColor="neutral_dark_2"
              style={item.style}
            />
          ))}

          <AppText
            text={'Or'}
            type="body_s"
            color="neutral_dark_2"
            align="center"
            style={styles.or}
          />

          {inputFields.map(item => (
            <FormFieldController
              key={item.name}
              name={item.name}
              control={control}
              style={styles.mb16}
              Field={({value, onChange}) => (
                <AppTextInput
                  label={item.label}
                  placeholder={item.placeholder}
                  value={value}
                  onChangeText={text => onChange(text)}
                  textContentType={item.textContentType}
                />
              )}
            />
          ))}

          <TouchableOpacity
            style={styles.forgotPassword}
            onPress={() => navigation.navigate(routesNames.FORGOT_PASSWORD)}>
            <AppText
              text={'Forgot password?'}
              type="action_m"
              color="highlight_5"
            />
          </TouchableOpacity>
          <AppButton
            text="Login"
            style={styles.mb16}
            onPress={handleSubmit(submit)}
          />

          <AuthNavHelper authType="sign_up" />
        </View>
      </View>
    </AppScreen>
  );
};

export default Signin;
