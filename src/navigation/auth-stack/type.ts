import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type AuthStackParamList = {
  ONBOARDING: undefined;
  SIGNIN: undefined;
  SIGNUP: undefined;
  VERIFY: {accountID: string; email: string};
  BUSINESS_INFO_REG: undefined;
  FORGOT_PASSWORD: undefined;
};

export type AuthNavigationProps<T extends keyof AuthStackParamList> =
  NativeStackNavigationProp<AuthStackParamList, T>;

export type AuthRouteProps<T extends keyof AuthStackParamList> = RouteProp<
  AuthStackParamList,
  T
>;

export type AuthScreenProps<T extends keyof AuthStackParamList> = {
  navigation: NativeStackNavigationProp<AuthStackParamList, T>;
  route: RouteProp<AuthStackParamList, T>;
};
