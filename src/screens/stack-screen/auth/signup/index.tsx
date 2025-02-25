/* eslint-disable react/no-unstable-nested-components */
import React, {FunctionComponent} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {
  AppleIcon,
  CheckedBoxIcon,
  GoogleIcon,
  UnCheckedBoxIcon,
} from '../../../../assets/svg';
import {
  AppButton,
  AppLoading,
  AppScreen,
  AppText,
  AppTextInput,
  AuthNavHelper,
} from '../../../../components';
import {showToast} from '../../../../components/app-toast';
import {routesNames} from '../../../../navigation/routes';
import {useColors} from '../../../../hooks/useColors';
import {signupStyles} from './styles';
import {SignupSchemaType, signupSchema} from './schema';
import {FormFieldController} from '../../../../components/form-field-controller';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {useCreateAccountApiMutation} from '../../../../state/services/auth/api';
import {AuthScreenProps} from '../../../../navigation/auth-stack/type';
import {useResponseHandler} from '../../../../hooks/useRequestHandler';
import {getErrorMessage, logThis} from '../../../../utils/helpers';
import {TextInputFields} from '../../../../types/Fields';
import {isIOS} from '../../../../config/const';

const inputFields: TextInputFields<SignupSchemaType> = [
  {
    name: 'fullname',
    label: 'Full name',
    placeholder: 'John Doe',
    textContentType: 'none',
    type: 'text',
  },
  {
    name: 'email',
    label: 'Email Address',
    placeholder: 'name@email.com',
    textContentType: 'none',
    type: 'text',
  },
  {
    name: 'password',
    label: 'Password',
    placeholder: 'Create a password',
    textContentType: 'password',
    type: 'text',
  },
];

const acceptTCTexts = [
  {
    text: "I've read and agree with the ",
    isPressable: false,
  },
  {
    text: 'Terms and Conditions ',
    isPressable: true,
  },
  {
    text: 'and the ',
    isPressable: false,
  },
  {
    text: 'Privacy Policy.',
    isPressable: true,
  },
];
const acceptTCfield = {name: 'acceptTC', label: acceptTCTexts};

const Signup: FunctionComponent<AuthScreenProps<'SIGNUP'>> = ({navigation}) => {
  const colors = useColors();

  const {handleSubmit, control} = useForm<SignupSchemaType>({
    // defaultValues: {
    //   email: '',
    //   password: '',
    //   acceptTC: false,
    //   fullname: '',
    // },
    resolver: zodResolver(signupSchema),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });

  const [
    createAccount,
    {isLoading, isSuccess, isError, data, reset, error: createActError},
  ] = useCreateAccountApiMutation();
  const styles = signupStyles({colors});

  const socialAuthBtns = [
    {
      title: 'Continue with Google',
      style: styles.mb16,
      Icon: <GoogleIcon fill={colors.neutral_dark_5} />,
    },
    ...(isIOS
      ? [
          {
            title: 'Continue with Apple',
            Icon: <AppleIcon fill={colors.neutral_dark_5} />,
          },
        ]
      : []),
  ];

  useResponseHandler({
    success: {
      value: isSuccess,
      trigger: () => {
        showToast('SUCCESS', {
          message: 'Create account success',
          title: 'Your account have been created successfully',
        });
        if (data) {
          navigation.replace(routesNames.VERIFY, {
            accountID: data?.data?.id,
            email: data?.data?.email,
          });
        }
      },
    },
    error: {
      value: isError,
      trigger: () => {
        showToast('ERROR', {
          title: 'Error encounted!',
          message: getErrorMessage(createActError),
        });
      },
    },
    reset,
  });

  const submit = (values: SignupSchemaType) => {
    createAccount({
      createAccount: {
        fullName: values.fullname,
        email: values.email,
        password: values.password,
        agreeToTerms: values.acceptTC,
        receiveEmail: false,
      },
    });
  };

  return (
    <AppScreen>
      <AppLoading visible={isLoading} />
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <AppText text={'Sign up'} type="heading_h1" style={styles.mb8} />
          <AppText
            text={'Create an account to get started'}
            type="body_s"
            color="neutral_dark_2"
            style={styles.mb24}
          />
          {socialAuthBtns.map(item => (
            <AppButton
              key={item.title}
              text={item.title}
              textColor="neutral_dark_1"
              LeftView={<View style={styles.socialBtn}>{item.Icon}</View>}
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

          <FormFieldController
            name={'acceptTC'}
            control={control}
            style={styles.mb16}
            Field={({value, onChange}) => (
              <View style={styles.acceptTC}>
                <TouchableOpacity
                  style={styles.checkBtn}
                  onPress={() => onChange(!value)}>
                  {value ? <CheckedBoxIcon /> : <UnCheckedBoxIcon />}
                </TouchableOpacity>
                <AppText
                  text={acceptTCfield.label.map(item => (
                    <AppText
                      key={item.text}
                      text={item.text}
                      onPress={() =>
                        item.isPressable ? logThis(item.text) : null
                      }
                      disabled={!item.isPressable}
                      type={item.isPressable ? 'action_m' : 'body_s'}
                      color={
                        item.isPressable ? 'highlight_5' : 'neutral_dark_2'
                      }
                    />
                  ))}
                  style={styles.terms}
                />
              </View>
            )}
          />
          <AppButton
            text="Sign up"
            style={styles.mb16}
            onPress={handleSubmit(submit)}
            // onPress={() => navigation.navigate(routesNames.VERIFY)}
          />

          <AuthNavHelper authType="sign_in" />
        </View>
      </View>
    </AppScreen>
  );
};

export default Signup;
