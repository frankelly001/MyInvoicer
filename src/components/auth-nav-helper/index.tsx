import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {FunctionComponent} from 'react';
import {TouchableOpacity} from 'react-native';
import {COLOR_TYPES, detectTouch, TEXT_SIZES} from '../../config/const';
import {routesNames} from '../../navigation/routes';
import AppText from '../app-text';
import {AuthNavHelperProps} from './type';

const authHelper = {
  ['sign_up']: {
    routeName: routesNames.SIGNUP,
    label: "Don't have an account? ",
    btnText: 'Sign up now',
  },
  ['sign_in']: {
    routeName: routesNames.SIGNIN,
    label: 'Already have an account? ',
    btnText: 'Sign in',
  },
};

const AuthNavHelper: FunctionComponent<AuthNavHelperProps> = ({
  authType = 'sign_in',
}) => {
  const navigation = useNavigation() as StackNavigationProp<
    Record<string, object | undefined>,
    string
  >;

  const texts: {
    text: string;
    color: COLOR_TYPES;
    size: TEXT_SIZES;
    routeName?: string;
  }[] = [
    {text: authHelper[authType].label, color: 'neutral_dark_2', size: 'body_s'},
    {
      text: authHelper[authType].btnText,
      color: 'highlight_5',
      routeName: authHelper[authType].routeName,
      size: 'action_m',
    },
  ];
  return (
    <AppText
      text={texts.map((el, i) => (
        <TouchableOpacity
          key={i}
          disabled={!el.routeName}
          hitSlop={detectTouch}
          onPress={() =>
            el.routeName ? navigation.navigate(el.routeName) : null
          }>
          <AppText key={i} text={el.text} type={el.size} color={el.color} />
        </TouchableOpacity>
      ))}
      align="center"
    />
  );
};

export default AuthNavHelper;
